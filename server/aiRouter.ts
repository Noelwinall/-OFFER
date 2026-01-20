/**
 * AI Router - Hardened for Production
 *
 * Provides AI-powered endpoints for school analysis.
 * Currently supports KG (kindergarten) enhanced briefs.
 *
 * Features:
 * - Pro user gating (allowlist-based for beta)
 * - Persistent cache (MySQL-backed, survives restarts)
 * - Rate limiting (per-user, configurable)
 * - Quota logging (for analytics and future billing)
 * - Evidence keys in responses (anti-hallucination)
 * - Prompt versioning
 */

import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { eq, and, gt, gte, sql } from "drizzle-orm";
import { protectedProcedure, router } from "./_core/trpc";
import { invokeLLM } from "./_core/llm";
import { ENV } from "./_core/env";
import { getDb } from "./db";
import { kindergartens, type KindergartenEntry } from "../data/kg/kg-database";
import { aiEnhancedBriefCache, aiRequestLog } from "../drizzle/schema";
import { createHash } from "crypto";

// ============================================================================
// Constants & Versioning
// ============================================================================

/** Model version - bump when switching LLM models */
const MODEL_VERSION = "gemini-2.5-flash-v1";

/** Prompt version - bump when changing system/user prompts */
const PROMPT_VERSION = "kg-enhanced-v1";

/** Cache TTL in milliseconds (7 days) */
const CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000;

// ============================================================================
// Types
// ============================================================================

// Input schema for enhanced brief request
const enhancedBriefInputSchema = z.object({
  schoolId: z.string(),
  preferences: z
    .object({
      sessions: z.array(z.string()).optional(),
      curriculumCategory: z.array(z.string()).optional(),
      curriculumType: z.array(z.string()).optional(),
      languageEnv: z.array(z.string()).optional(),
      pedagogy: z.array(z.string()).optional(),
      districts: z.array(z.string()).optional(),
    })
    .optional(),
  locale: z.enum(["zh-TW", "zh-HK", "en"]).default("zh-TW"),
});

// Output schema for structured JSON response from LLM (with evidence keys)
const enhancedBriefOutputSchema = {
  name: "kg_enhanced_brief",
  strict: true,
  schema: {
    type: "object",
    properties: {
      title: {
        type: "string",
        description: "School name with brief descriptor (e.g. curriculum type)",
      },
      one_liner: {
        type: "string",
        description: "One sentence summary of the school's key characteristics",
      },
      grounded_highlights: {
        type: "array",
        items: {
          type: "object",
          properties: {
            text: {
              type: "string",
              description: "The highlight statement in Traditional Chinese",
            },
            evidence_keys: {
              type: "array",
              items: { type: "string" },
              description:
                "List of input data field names that support this highlight (e.g. 'sessions', 'curriculumType', 'tuition')",
            },
          },
          required: ["text", "evidence_keys"],
          additionalProperties: false,
        },
        description:
          "3-6 key highlights based ONLY on the provided school data fields. Each item MUST cite evidence_keys from input.",
      },
      watch_out: {
        type: "array",
        items: {
          type: "object",
          properties: {
            text: {
              type: "string",
              description: "The watch-out item in Traditional Chinese",
            },
            evidence_keys: {
              type: "array",
              items: { type: "string" },
              description:
                "List of input data field names related to this watch-out (e.g. 'dataQuality.needsReview')",
            },
          },
          required: ["text", "evidence_keys"],
          additionalProperties: false,
        },
        description:
          "0-5 items to note, especially regarding missing or needs_review data. Each item MUST cite evidence_keys.",
      },
      to_verify: {
        type: "array",
        items: { type: "string" },
        description:
          "3-8 suggested questions/checklist for parents to verify (details NOT in our data: teacher ratios, class sizes, admissions difficulty, etc.)",
      },
      citations: {
        type: "array",
        items: { type: "string" },
        description: "Source citations (empty for now, placeholder for future web research)",
      },
    },
    required: ["title", "one_liner", "grounded_highlights", "watch_out", "to_verify", "citations"],
    additionalProperties: false,
  },
};

// Response type from LLM (with evidence keys)
interface GroundedItem {
  text: string;
  evidence_keys: string[];
}

interface EnhancedBriefLLMResponse {
  title: string;
  one_liner: string;
  grounded_highlights: GroundedItem[];
  watch_out: GroundedItem[];
  to_verify: string[];
  citations: string[];
}

// ============================================================================
// Pro User Gating
// ============================================================================

/** Parse comma-separated env var into Set for O(1) lookup */
function parseAllowlist(envValue: string): Set<string> {
  if (!envValue.trim()) return new Set();
  return new Set(
    envValue
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean)
  );
}

const PRO_USER_IDS = parseAllowlist(ENV.proUserIds);
const PRO_EMAILS = parseAllowlist(ENV.proEmails);

/**
 * Check if user has Pro access.
 *
 * Priority:
 * 1. Admin role always has Pro access
 * 2. User ID in PRO_USER_IDS allowlist
 * 3. User email in PRO_EMAILS allowlist
 * 4. Otherwise: not Pro
 */
function isPro(user: { id: number; role: string; email?: string | null }): boolean {
  // Admins always have Pro access
  if (user.role === "admin") {
    return true;
  }

  // Check ID allowlist
  if (PRO_USER_IDS.has(String(user.id))) {
    return true;
  }

  // Check email allowlist
  if (user.email && PRO_EMAILS.has(user.email.toLowerCase())) {
    return true;
  }

  return false;
}

// ============================================================================
// Rate Limiting (In-Memory)
// ============================================================================

interface RateLimitEntry {
  minuteCount: number;
  minuteResetAt: number;
  dayCount: number;
  dayResetAt: number;
}

const rateLimitMap = new Map<number, RateLimitEntry>();

/**
 * Check and update rate limit for a user.
 * Returns { allowed, reason } where reason explains why if not allowed.
 */
function checkRateLimit(userId: number): { allowed: boolean; reason?: string } {
  const now = Date.now();
  const minuteWindow = 60 * 1000; // 1 minute
  const dayWindow = 24 * 60 * 60 * 1000; // 24 hours

  let entry = rateLimitMap.get(userId);

  if (!entry) {
    entry = {
      minuteCount: 0,
      minuteResetAt: now + minuteWindow,
      dayCount: 0,
      dayResetAt: now + dayWindow,
    };
    rateLimitMap.set(userId, entry);
  }

  // Reset counters if windows have passed
  if (now > entry.minuteResetAt) {
    entry.minuteCount = 0;
    entry.minuteResetAt = now + minuteWindow;
  }
  if (now > entry.dayResetAt) {
    entry.dayCount = 0;
    entry.dayResetAt = now + dayWindow;
  }

  // Check limits
  if (entry.minuteCount >= ENV.aiRateLimitPerMinute) {
    return {
      allowed: false,
      reason: `Rate limit exceeded: max ${ENV.aiRateLimitPerMinute} requests per minute`,
    };
  }
  if (entry.dayCount >= ENV.aiRateLimitPerDay) {
    return {
      allowed: false,
      reason: `Daily limit exceeded: max ${ENV.aiRateLimitPerDay} requests per day`,
    };
  }

  // Increment counters
  entry.minuteCount++;
  entry.dayCount++;

  return { allowed: true };
}

// ============================================================================
// Persistent Cache (MySQL)
// ============================================================================

/**
 * Generate cache key including all relevant factors.
 */
function generateCacheKey(
  schoolId: string,
  preferences: unknown,
  locale: string
): string {
  const preferencesHash = createHash("md5")
    .update(JSON.stringify(preferences || {}))
    .digest("hex")
    .slice(0, 8);
  return `kg_enhanced_${schoolId}_${preferencesHash}_${locale}_${MODEL_VERSION}_${PROMPT_VERSION}`;
}

/**
 * Get cached response from database.
 */
async function getCachedResponse(
  cacheKey: string
): Promise<EnhancedBriefLLMResponse | null> {
  const db = await getDb();
  if (!db) return null;

  try {
    const now = new Date();
    const results = await db
      .select()
      .from(aiEnhancedBriefCache)
      .where(
        and(
          eq(aiEnhancedBriefCache.cacheKey, cacheKey),
          gt(aiEnhancedBriefCache.expiresAt, now)
        )
      )
      .limit(1);

    if (results.length === 0) return null;

    return JSON.parse(results[0].responseJson) as EnhancedBriefLLMResponse;
  } catch (error) {
    console.warn("[Cache] Failed to get cached response:", error);
    return null;
  }
}

/**
 * Store response in database cache.
 */
async function setCachedResponse(
  cacheKey: string,
  data: EnhancedBriefLLMResponse
): Promise<void> {
  const db = await getDb();
  if (!db) return;

  try {
    const expiresAt = new Date(Date.now() + CACHE_TTL_MS);
    const responseJson = JSON.stringify(data);

    await db
      .insert(aiEnhancedBriefCache)
      .values({
        cacheKey,
        responseJson,
        expiresAt,
      })
      .onDuplicateKeyUpdate({
        set: {
          responseJson,
          expiresAt,
        },
      });
  } catch (error) {
    console.warn("[Cache] Failed to set cached response:", error);
  }
}

// ============================================================================
// Quota Logging
// ============================================================================

/**
 * Log an AI request for quota tracking and analytics.
 */
async function logAiRequest(params: {
  userId: number;
  schoolId: string;
  cacheHit: boolean;
  mode: string;
}): Promise<void> {
  const db = await getDb();
  if (!db) return;

  try {
    await db.insert(aiRequestLog).values({
      userId: params.userId,
      schoolId: params.schoolId,
      cacheHit: params.cacheHit,
      mode: params.mode,
      modelVersion: MODEL_VERSION,
      promptVersion: PROMPT_VERSION,
    });
  } catch (error) {
    console.warn("[Quota] Failed to log AI request:", error);
  }
}

// ============================================================================
// KG Data Lookup
// ============================================================================

// Create lookup map for fast access
const kgMap = new Map<string, KindergartenEntry>();
for (const kg of kindergartens) {
  kgMap.set(kg.id, kg);
  for (const variantId of kg.variantIds) {
    kgMap.set(variantId, kg);
  }
}

function getKgById(schoolId: string): KindergartenEntry | undefined {
  return kgMap.get(schoolId);
}

// ============================================================================
// Prompt Generation (with evidence key instructions)
// ============================================================================

/** Available evidence keys that can be cited */
const EVIDENCE_KEYS = [
  "name",
  "nameEn",
  "district18",
  "address",
  "nature",
  "curriculumCategory",
  "curriculumType",
  "joinedKGP",
  "sessions",
  "pedagogyTags",
  "languageEnv",
  "tuition",
  "religion",
  "phone",
  "website",
  "dataQuality.curriculumConfidence",
  "dataQuality.pedagogyConfidence",
  "dataQuality.languageConfidence",
  "dataQuality.needsReview",
];

function formatSchoolDataForPrompt(kg: KindergartenEntry): string {
  const lines: string[] = [];

  lines.push(`[name] School Name: ${kg.name}`);
  lines.push(`[nameEn] English Name: ${kg.nameEn}`);
  lines.push(`[district18] District: ${kg.district18}`);
  lines.push(`[address] Address: ${kg.address}`);
  lines.push(`[nature] Nature: ${kg.nature}`);
  lines.push(`[curriculumCategory] Curriculum Category: ${kg.curriculumCategory}`);
  lines.push(`[curriculumType] Curriculum Type: ${kg.curriculumType || "not specified"}`);
  lines.push(`[joinedKGP] Joined KGP: ${kg.joinedKGP ? "Yes" : "No"}`);
  lines.push(`[sessions] Sessions: ${kg.sessions.join(", ")}`);
  lines.push(
    `[pedagogyTags] Pedagogy Tags: ${kg.pedagogyTags.length > 0 ? kg.pedagogyTags.join(", ") : "none"}`
  );
  lines.push(
    `[languageEnv] Language Environment: ${kg.languageEnv.length > 0 ? kg.languageEnv.join(", ") : "none"}`
  );

  if (kg.tuitionMin === 0 && kg.tuitionMax === 0) {
    lines.push(`[tuition] Tuition: Free (KGP subsidized)`);
  } else if (kg.tuitionMin > 0 || kg.tuitionMax > 0) {
    lines.push(`[tuition] Tuition Range: HKD ${kg.tuitionMin} - ${kg.tuitionMax} per year`);
  } else {
    lines.push(`[tuition] Tuition: Not available`);
  }

  if (kg.religion) {
    lines.push(`[religion] Religion: ${kg.religion}`);
  }

  lines.push(`[phone] Phone: ${kg.phone}`);
  lines.push(`[website] Website: ${kg.website}`);

  // Data quality
  lines.push(`\nData Quality:`);
  lines.push(
    `[dataQuality.curriculumConfidence] Curriculum Confidence: ${kg.dataQuality.curriculumConfidence}`
  );
  lines.push(
    `[dataQuality.pedagogyConfidence] Pedagogy Confidence: ${kg.dataQuality.pedagogyConfidence}`
  );
  lines.push(
    `[dataQuality.languageConfidence] Language Confidence: ${kg.dataQuality.languageConfidence}`
  );
  lines.push(
    `[dataQuality.needsReview] Needs Review: ${kg.dataQuality.needsReview ? "Yes" : "No"}`
  );

  return lines.join("\n");
}

function buildSystemPrompt(): string {
  return `You are an expert Hong Kong kindergarten advisor helping parents understand schools.

Your task is to generate a structured analysis report for a kindergarten based ONLY on the provided structured data fields.

CRITICAL RULES FOR EVIDENCE-BASED OUTPUT:

1. All content must be in Traditional Chinese (繁體中文).

2. ONLY use information from the provided data fields. Do NOT invent or assume facts not present in the data.

3. For "grounded_highlights" and "watch_out":
   - Each item MUST include "evidence_keys" listing the data field(s) that support the statement.
   - Use the field names in square brackets from the input (e.g., "sessions", "curriculumType", "tuition").
   - If you cannot cite evidence from the input, the item belongs in "to_verify" instead, NOT in grounded_highlights.

4. For "to_verify":
   - List questions about information NOT available in our data (teacher ratios, class sizes, admissions competitiveness, specific curriculum details, etc.).
   - These items do NOT need evidence_keys because they are explicitly unverified.

5. Keep the tone helpful and objective, not promotional.

6. The "citations" array should be empty for now (placeholder for future web research).

Available evidence keys you can cite:
${EVIDENCE_KEYS.join(", ")}`;
}

function buildUserPrompt(kg: KindergartenEntry, preferences?: unknown): string {
  const schoolData = formatSchoolDataForPrompt(kg);

  let prompt = `Please analyze this kindergarten and generate a structured report:\n\n${schoolData}`;

  if (preferences && Object.keys(preferences).length > 0) {
    prompt += `\n\nParent's preferences:\n${JSON.stringify(preferences, null, 2)}`;
    prompt += `\n\nConsider how well this school matches the parent's preferences in your analysis.`;
  }

  return prompt;
}

// ============================================================================
// Router
// ============================================================================

export const aiRouter = router({
  kg: router({
    /**
     * Generate enhanced brief for a single KG school.
     *
     * Requirements:
     * - Authenticated user with Pro access
     * - Rate limited per user
     * - Responses cached for 7 days
     * - All requests logged for quota tracking
     */
    enhancedBrief: protectedProcedure
      .input(enhancedBriefInputSchema)
      .mutation(async ({ ctx, input }) => {
        const user = ctx.user;

        // 1. Check Pro access (server-enforced)
        if (!isPro(user)) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "Pro subscription required for enhanced analysis",
          });
        }

        // 2. Check rate limit
        const rateLimit = checkRateLimit(user.id);
        if (!rateLimit.allowed) {
          throw new TRPCError({
            code: "TOO_MANY_REQUESTS",
            message: rateLimit.reason || "Rate limit exceeded",
          });
        }

        const { schoolId, preferences, locale } = input;

        // 3. Look up school data
        const kg = getKgById(schoolId);
        if (!kg) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: `Kindergarten with ID "${schoolId}" not found`,
          });
        }

        // 4. Check persistent cache
        const cacheKey = generateCacheKey(schoolId, preferences, locale);
        const cached = await getCachedResponse(cacheKey);

        if (cached) {
          // Log cache hit
          await logAiRequest({
            userId: user.id,
            schoolId: kg.id,
            cacheHit: true,
            mode: "enhanced",
          });

          return {
            schoolId: kg.id,
            schoolName: kg.name,
            ...cached,
            fromCache: true,
            modelVersion: MODEL_VERSION,
            promptVersion: PROMPT_VERSION,
          };
        }

        // 5. Generate via LLM
        try {
          const result = await invokeLLM({
            messages: [
              { role: "system", content: buildSystemPrompt() },
              { role: "user", content: buildUserPrompt(kg, preferences) },
            ],
            responseFormat: {
              type: "json_schema",
              json_schema: enhancedBriefOutputSchema,
            },
          });

          // Parse response
          const content = result.choices[0]?.message?.content;
          if (!content || typeof content !== "string") {
            throw new Error("Empty response from LLM");
          }

          const parsed: EnhancedBriefLLMResponse = JSON.parse(content);

          // 6. Store in persistent cache
          await setCachedResponse(cacheKey, parsed);

          // 7. Log cache miss (new generation)
          await logAiRequest({
            userId: user.id,
            schoolId: kg.id,
            cacheHit: false,
            mode: "enhanced",
          });

          return {
            schoolId: kg.id,
            schoolName: kg.name,
            ...parsed,
            fromCache: false,
            modelVersion: MODEL_VERSION,
            promptVersion: PROMPT_VERSION,
          };
        } catch (error) {
          console.error("Enhanced brief generation failed:", error);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to generate enhanced analysis. Please try again later.",
          });
        }
      }),
  }),
});

export type AiRouter = typeof aiRouter;
