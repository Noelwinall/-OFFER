/**
 * Report Router - AI-powered quiz report generation
 *
 * Provides endpoints for generating school recommendation reports after quiz completion.
 * - Simple report: Free version with match scores and brief summaries
 * - Pro report: Comprehensive analysis with personalized insights and strategy
 *
 * Features:
 * - Membership tier gating (free vs pro)
 * - Persistent cache (MySQL-backed)
 * - Rate limiting (per-user)
 * - Quota logging
 */

import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { eq, and, gt } from "drizzle-orm";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { invokeLLM } from "./_core/llm";
import { ENV } from "./_core/env";
import { getDb } from "./db";
import { aiReportCache, aiRequestLog } from "../drizzle/schema";
import { createHash } from "crypto";
import { SCHOOLS } from "../data/schools";
import type { School, QuizFilters } from "../types/school";
import { calculateMatchScore, getMatchDescription } from "../lib/recommendation";

// ============================================================================
// Constants & Versioning
// ============================================================================

const MODEL_VERSION = "gpt-4o-mini-v1";
const PROMPT_VERSION_SIMPLE = "report-simple-v1";
const PROMPT_VERSION_PRO = "report-pro-v1";

/** Cache TTL: 48 hours for reports */
const CACHE_TTL_MS = 48 * 60 * 60 * 1000;

// ============================================================================
// Types & Schemas
// ============================================================================

// Zod schema that matches QuizFilters type
const quizFiltersSchema = z.object({
  level: z.enum(["幼稚園", "小學", "中學"]).optional(),
  district: z.enum(["港島", "九龍", "新界"]).optional(),
  tuitionRange: z.object({
    min: z.number(),
    max: z.number(),
  }).optional(),
  category: z.enum(["國際", "資助", "直資", "私立", "公立"]).optional(),
  curriculum: z.enum(["IB", "DSE", "IGCSE", "A-Level", "AP", "美式課程", "英式課程", "德式課程", "澳洲課程", "新加坡課程", "法式課程", "加拿大課程", "其他"]).optional(),
  language: z.enum(["全英文", "中英雙語", "以中文為主"]).optional(),
});

const simpleReportInputSchema = z.object({
  filters: quizFiltersSchema,
  schoolIds: z.array(z.string()).max(20), // Limit to top 20 schools
  locale: z.enum(["zh-TW", "zh-HK", "en"]).default("zh-TW"),
});

const proReportInputSchema = z.object({
  filters: quizFiltersSchema,
  schoolIds: z.array(z.string()).max(10), // Pro report for up to 10 schools
  locale: z.enum(["zh-TW", "zh-HK", "en"]).default("zh-TW"),
});

// Simple report output structure
interface SimpleReportSchool {
  id: string;
  name: string;
  matchScore: number;
  matchDescription: string;
  matchSummary: string; // AI-generated 2-3 sentence summary
}

interface SimpleReportResponse {
  generatedAt: string;
  filters: QuizFilters;
  totalSchools: number;
  schools: SimpleReportSchool[];
  fromCache: boolean;
}

// Pro report output structure
interface ProReportSchool {
  id: string;
  name: string;
  matchScore: number;
  personalizedAnalysis: string;
  strengths: string[];
  considerations: string[];
  applicationTips: string;
}

interface ProReportStrategy {
  topRecommendation: string;
  backupSchools: string[];
  applicationTimeline: string;
  preparationAdvice: string;
}

interface ProReportActionItem {
  step: number;
  action: string;
  priority: "high" | "medium" | "low";
}

interface ProReportResponse {
  generatedAt: string;
  filters: QuizFilters;
  summary: string;
  schools: ProReportSchool[];
  strategy: ProReportStrategy;
  actionPlan: ProReportActionItem[];
  fromCache: boolean;
}

// LLM response schemas
const simpleReportLLMSchema = {
  name: "simple_report",
  strict: true,
  schema: {
    type: "object",
    properties: {
      schools: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: { type: "string" },
            matchSummary: {
              type: "string",
              description: "2-3 sentence summary explaining why this school matches the user's criteria",
            },
          },
          required: ["id", "matchSummary"],
          additionalProperties: false,
        },
      },
    },
    required: ["schools"],
    additionalProperties: false,
  },
};

const proReportLLMSchema = {
  name: "pro_report",
  strict: true,
  schema: {
    type: "object",
    properties: {
      summary: {
        type: "string",
        description: "Executive summary of the overall recommendations (3-5 sentences)",
      },
      schools: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: { type: "string" },
            personalizedAnalysis: {
              type: "string",
              description: "Detailed personalized analysis of why this school fits the user (4-6 sentences)",
            },
            strengths: {
              type: "array",
              items: { type: "string" },
              description: "3-5 key strengths/pros of this school",
            },
            considerations: {
              type: "array",
              items: { type: "string" },
              description: "2-4 things to consider/potential concerns",
            },
            applicationTips: {
              type: "string",
              description: "Specific application advice for this school",
            },
          },
          required: ["id", "personalizedAnalysis", "strengths", "considerations", "applicationTips"],
          additionalProperties: false,
        },
      },
      strategy: {
        type: "object",
        properties: {
          topRecommendation: {
            type: "string",
            description: "Explanation of the top recommended school and why",
          },
          backupSchools: {
            type: "array",
            items: { type: "string" },
            description: "2-3 recommended backup school names with brief reasons",
          },
          applicationTimeline: {
            type: "string",
            description: "Recommended timeline and key dates for applications",
          },
          preparationAdvice: {
            type: "string",
            description: "How to prepare for applications and interviews",
          },
        },
        required: ["topRecommendation", "backupSchools", "applicationTimeline", "preparationAdvice"],
        additionalProperties: false,
      },
      actionPlan: {
        type: "array",
        items: {
          type: "object",
          properties: {
            step: { type: "number" },
            action: { type: "string" },
            priority: { type: "string", enum: ["high", "medium", "low"] },
          },
          required: ["step", "action", "priority"],
          additionalProperties: false,
        },
        description: "5-8 actionable steps for the parent to take",
      },
    },
    required: ["summary", "schools", "strategy", "actionPlan"],
    additionalProperties: false,
  },
};

// ============================================================================
// Membership Check
// ============================================================================

interface UserWithMembership {
  id: number;
  role: "user" | "admin";
  membershipTier?: "free" | "pro" | null;
  membershipExpiresAt?: Date | null;
}

function isProMember(user: UserWithMembership): boolean {
  // Admin always has access
  if (user.role === "admin") {
    return true;
  }

  // Check membership tier
  if (user.membershipTier === "pro") {
    // Check if not expired
    if (!user.membershipExpiresAt || user.membershipExpiresAt > new Date()) {
      return true;
    }
  }

  return false;
}

// ============================================================================
// Rate Limiting
// ============================================================================

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const reportRateLimitMap = new Map<string, RateLimitEntry>();

function checkReportRateLimit(userId: number, reportType: "simple" | "pro"): { allowed: boolean; reason?: string } {
  const key = `${userId}_${reportType}`;
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 hour window
  const maxRequests = reportType === "simple" ? 20 : 5; // More generous for simple reports

  let entry = reportRateLimitMap.get(key);

  if (!entry || now > entry.resetAt) {
    entry = { count: 0, resetAt: now + windowMs };
    reportRateLimitMap.set(key, entry);
  }

  if (entry.count >= maxRequests) {
    return {
      allowed: false,
      reason: `已達到每小時${maxRequests}次報告生成限制，請稍後再試`,
    };
  }

  entry.count++;
  return { allowed: true };
}

// ============================================================================
// Cache Functions
// ============================================================================

function generateReportCacheKey(
  filters: QuizFilters,
  schoolIds: string[],
  reportType: "simple" | "pro",
  locale: string
): string {
  const filtersHash = createHash("md5")
    .update(JSON.stringify(filters))
    .digest("hex")
    .slice(0, 8);
  const schoolsHash = createHash("md5")
    .update(schoolIds.sort().join(","))
    .digest("hex")
    .slice(0, 8);
  const promptVersion = reportType === "simple" ? PROMPT_VERSION_SIMPLE : PROMPT_VERSION_PRO;
  return `report_${reportType}_${filtersHash}_${schoolsHash}_${locale}_${MODEL_VERSION}_${promptVersion}`;
}

async function getCachedReport<T>(cacheKey: string): Promise<T | null> {
  const db = await getDb();
  if (!db) return null;

  try {
    const results = await db
      .select()
      .from(aiReportCache)
      .where(
        and(
          eq(aiReportCache.cacheKey, cacheKey),
          gt(aiReportCache.expiresAt, new Date())
        )
      )
      .limit(1);

    if (results.length === 0) return null;
    return JSON.parse(results[0].responseJson) as T;
  } catch (error) {
    console.warn("[ReportCache] Failed to get cached report:", error);
    return null;
  }
}

async function setCachedReport(
  cacheKey: string,
  reportType: "simple" | "pro",
  data: unknown
): Promise<void> {
  const db = await getDb();
  if (!db) return;

  try {
    const expiresAt = new Date(Date.now() + CACHE_TTL_MS);
    const responseJson = JSON.stringify(data);

    await db
      .insert(aiReportCache)
      .values({
        cacheKey,
        reportType,
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
    console.warn("[ReportCache] Failed to set cached report:", error);
  }
}

// ============================================================================
// School Data Lookup
// ============================================================================

const schoolMap = new Map<string, School>();
for (const school of SCHOOLS) {
  schoolMap.set(school.id, school);
}

function getSchoolById(id: string): School | undefined {
  return schoolMap.get(id);
}

function formatSchoolForPrompt(school: School, filters: QuizFilters): string {
  const matchScore = calculateMatchScore(school, filters);
  return `
[ID: ${school.id}]
名稱: ${school.name}
英文名: ${school.nameEn}
類型: ${school.category}
學段: ${school.level}
地區: ${school.district}
課程: ${school.curriculum.join(", ")}
教學語言: ${school.language}
學費: HKD ${school.tuitionMin.toLocaleString()} - ${school.tuitionMax.toLocaleString()}
匹配度: ${matchScore}%
${school.highlights?.length ? `特色: ${school.highlights.join(", ")}` : ""}
`.trim();
}

// ============================================================================
// Prompt Builders
// ============================================================================

function buildSimpleReportSystemPrompt(): string {
  return `你是香港學校選擇專家，專門幫助家長理解學校推薦結果。

你的任務是為每所推薦學校生成簡短的匹配摘要，解釋為什麼這所學校符合家長的需求。

規則：
1. 所有內容必須使用繁體中文
2. 每個matchSummary應該是2-3句話，重點說明：
   - 為什麼這所學校符合家長的篩選條件
   - 這所學校的主要特色或優勢
3. 語氣要客觀、實用，不要過度推銷
4. 根據學校實際數據來寫，不要編造信息`;
}

function buildSimpleReportUserPrompt(schools: School[], filters: QuizFilters): string {
  const filtersDesc = [];
  if (filters.level) filtersDesc.push(`學段: ${filters.level}`);
  if (filters.district) filtersDesc.push(`地區: ${filters.district}`);
  if (filters.category) filtersDesc.push(`類型: ${filters.category}`);
  if (filters.curriculum) filtersDesc.push(`課程: ${filters.curriculum}`);
  if (filters.language) filtersDesc.push(`教學語言: ${filters.language}`);
  if (filters.tuitionRange) {
    filtersDesc.push(`學費預算: HKD ${filters.tuitionRange.min.toLocaleString()} - ${filters.tuitionRange.max.toLocaleString()}`);
  }

  const schoolsData = schools.map((s) => formatSchoolForPrompt(s, filters)).join("\n\n---\n\n");

  return `家長的篩選條件：
${filtersDesc.join("\n")}

以下是匹配的學校，請為每所學校生成簡短的匹配摘要：

${schoolsData}`;
}

function buildProReportSystemPrompt(): string {
  return `你是香港資深升學顧問，擁有豐富的學校申請經驗。

你的任務是生成一份全面的學校推薦報告，包括：
1. 總體建議摘要
2. 每所學校的深度分析（優缺點、申請建議）
3. 申請策略（首選、備選、時間規劃）
4. 具體行動計劃

規則：
1. 所有內容必須使用繁體中文
2. 分析要具體、有針對性，結合家長的需求
3. 優缺點要客觀平衡，不要只說好話
4. 申請建議要實用、可操作
5. 時間規劃要符合香港學校的申請週期
6. 行動計劃要清晰、有優先級`;
}

function buildProReportUserPrompt(schools: School[], filters: QuizFilters): string {
  const filtersDesc = [];
  if (filters.level) filtersDesc.push(`學段: ${filters.level}`);
  if (filters.district) filtersDesc.push(`地區: ${filters.district}`);
  if (filters.category) filtersDesc.push(`類型: ${filters.category}`);
  if (filters.curriculum) filtersDesc.push(`課程: ${filters.curriculum}`);
  if (filters.language) filtersDesc.push(`教學語言: ${filters.language}`);
  if (filters.tuitionRange) {
    filtersDesc.push(`學費預算: HKD ${filters.tuitionRange.min.toLocaleString()} - ${filters.tuitionRange.max.toLocaleString()}`);
  }

  const schoolsData = schools.map((s) => formatSchoolForPrompt(s, filters)).join("\n\n---\n\n");

  return `家長的需求和篩選條件：
${filtersDesc.join("\n")}

以下是匹配的學校，請生成一份完整的深度報告：

${schoolsData}

請特別注意：
- 根據匹配度分析每所學校的適合程度
- 指出每所學校的獨特優勢和需要考慮的因素
- 提供實際可行的申請策略和時間規劃
- 生成5-8個具體的行動步驟`;
}

// ============================================================================
// Quota Logging
// ============================================================================

async function logReportRequest(params: {
  userId: number;
  reportType: "simple" | "pro";
  cacheHit: boolean;
  schoolCount: number;
}): Promise<void> {
  const db = await getDb();
  if (!db) return;

  try {
    await db.insert(aiRequestLog).values({
      userId: params.userId,
      schoolId: `report_${params.reportType}_${params.schoolCount}`,
      cacheHit: params.cacheHit,
      mode: `report_${params.reportType}`,
      modelVersion: MODEL_VERSION,
      promptVersion: params.reportType === "simple" ? PROMPT_VERSION_SIMPLE : PROMPT_VERSION_PRO,
    });
  } catch (error) {
    console.warn("[Quota] Failed to log report request:", error);
  }
}

// ============================================================================
// Router
// ============================================================================

export const reportRouter = router({
  /**
   * Generate simple (free) report with match summaries
   */
  generateSimple: protectedProcedure
    .input(simpleReportInputSchema)
    .mutation(async ({ ctx, input }) => {
      const user = ctx.user;

      // Rate limit check
      const rateLimit = checkReportRateLimit(user.id, "simple");
      if (!rateLimit.allowed) {
        throw new TRPCError({
          code: "TOO_MANY_REQUESTS",
          message: rateLimit.reason,
        });
      }

      const { filters, schoolIds, locale } = input;

      // Get school data
      const schools = schoolIds
        .map((id) => getSchoolById(id))
        .filter((s): s is School => s !== undefined);

      if (schools.length === 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "沒有找到有效的學校",
        });
      }

      // Check cache
      const cacheKey = generateReportCacheKey(filters, schoolIds, "simple", locale);
      const cached = await getCachedReport<{ schools: Array<{ id: string; matchSummary: string }> }>(cacheKey);

      if (cached) {
        await logReportRequest({
          userId: user.id,
          reportType: "simple",
          cacheHit: true,
          schoolCount: schools.length,
        });

        // Build response with cached summaries
        const response: SimpleReportResponse = {
          generatedAt: new Date().toISOString(),
          filters: filters as QuizFilters,
          totalSchools: schools.length,
          schools: schools.map((school) => {
            const cachedSchool = cached.schools.find((s) => s.id === school.id);
            const matchScore = calculateMatchScore(school, filters as QuizFilters);
            return {
              id: school.id,
              name: school.name,
              matchScore,
              matchDescription: getMatchDescription(matchScore),
              matchSummary: cachedSchool?.matchSummary || "",
            };
          }),
          fromCache: true,
        };

        return response;
      }

      // Generate via LLM
      try {
        const result = await invokeLLM({
          messages: [
            { role: "system", content: buildSimpleReportSystemPrompt() },
            { role: "user", content: buildSimpleReportUserPrompt(schools, filters as QuizFilters) },
          ],
          responseFormat: {
            type: "json_schema",
            json_schema: simpleReportLLMSchema,
          },
        });

        const content = result.choices[0]?.message?.content;
        if (!content || typeof content !== "string") {
          throw new Error("Empty response from LLM");
        }

        const parsed = JSON.parse(content) as { schools: Array<{ id: string; matchSummary: string }> };

        // Cache the result
        await setCachedReport(cacheKey, "simple", parsed);

        // Log request
        await logReportRequest({
          userId: user.id,
          reportType: "simple",
          cacheHit: false,
          schoolCount: schools.length,
        });

        // Build response
        const response: SimpleReportResponse = {
          generatedAt: new Date().toISOString(),
          filters: filters as QuizFilters,
          totalSchools: schools.length,
          schools: schools.map((school) => {
            const llmSchool = parsed.schools.find((s) => s.id === school.id);
            const matchScore = calculateMatchScore(school, filters as QuizFilters);
            return {
              id: school.id,
              name: school.name,
              matchScore,
              matchDescription: getMatchDescription(matchScore),
              matchSummary: llmSchool?.matchSummary || "暫無分析",
            };
          }),
          fromCache: false,
        };

        return response;
      } catch (error) {
        console.error("Simple report generation failed:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "報告生成失敗，請稍後再試",
        });
      }
    }),

  /**
   * Generate pro (paid) comprehensive report
   */
  generatePro: protectedProcedure
    .input(proReportInputSchema)
    .mutation(async ({ ctx, input }) => {
      const user = ctx.user;

      // Check pro membership
      if (!isProMember(user)) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "UPGRADE_REQUIRED",
        });
      }

      // Rate limit check
      const rateLimit = checkReportRateLimit(user.id, "pro");
      if (!rateLimit.allowed) {
        throw new TRPCError({
          code: "TOO_MANY_REQUESTS",
          message: rateLimit.reason,
        });
      }

      const { filters, schoolIds, locale } = input;

      // Get school data
      const schools = schoolIds
        .map((id) => getSchoolById(id))
        .filter((s): s is School => s !== undefined);

      if (schools.length === 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "沒有找到有效的學校",
        });
      }

      // Check cache
      const cacheKey = generateReportCacheKey(filters, schoolIds, "pro", locale);
      type ProLLMResponse = {
        summary: string;
        schools: Array<{
          id: string;
          personalizedAnalysis: string;
          strengths: string[];
          considerations: string[];
          applicationTips: string;
        }>;
        strategy: ProReportStrategy;
        actionPlan: ProReportActionItem[];
      };
      const cached = await getCachedReport<ProLLMResponse>(cacheKey);

      if (cached) {
        await logReportRequest({
          userId: user.id,
          reportType: "pro",
          cacheHit: true,
          schoolCount: schools.length,
        });

        // Build response with cached data
        const response: ProReportResponse = {
          generatedAt: new Date().toISOString(),
          filters: filters as QuizFilters,
          summary: cached.summary,
          schools: schools.map((school) => {
            const cachedSchool = cached.schools.find((s) => s.id === school.id);
            const matchScore = calculateMatchScore(school, filters as QuizFilters);
            return {
              id: school.id,
              name: school.name,
              matchScore,
              personalizedAnalysis: cachedSchool?.personalizedAnalysis || "",
              strengths: cachedSchool?.strengths || [],
              considerations: cachedSchool?.considerations || [],
              applicationTips: cachedSchool?.applicationTips || "",
            };
          }),
          strategy: cached.strategy,
          actionPlan: cached.actionPlan,
          fromCache: true,
        };

        return response;
      }

      // Generate via LLM
      try {
        const result = await invokeLLM({
          messages: [
            { role: "system", content: buildProReportSystemPrompt() },
            { role: "user", content: buildProReportUserPrompt(schools, filters as QuizFilters) },
          ],
          responseFormat: {
            type: "json_schema",
            json_schema: proReportLLMSchema,
          },
        });

        const content = result.choices[0]?.message?.content;
        if (!content || typeof content !== "string") {
          throw new Error("Empty response from LLM");
        }

        const parsed = JSON.parse(content) as ProLLMResponse;

        // Cache the result
        await setCachedReport(cacheKey, "pro", parsed);

        // Log request
        await logReportRequest({
          userId: user.id,
          reportType: "pro",
          cacheHit: false,
          schoolCount: schools.length,
        });

        // Build response
        const response: ProReportResponse = {
          generatedAt: new Date().toISOString(),
          filters: filters as QuizFilters,
          summary: parsed.summary,
          schools: schools.map((school) => {
            const llmSchool = parsed.schools.find((s) => s.id === school.id);
            const matchScore = calculateMatchScore(school, filters as QuizFilters);
            return {
              id: school.id,
              name: school.name,
              matchScore,
              personalizedAnalysis: llmSchool?.personalizedAnalysis || "",
              strengths: llmSchool?.strengths || [],
              considerations: llmSchool?.considerations || [],
              applicationTips: llmSchool?.applicationTips || "",
            };
          }),
          strategy: parsed.strategy,
          actionPlan: parsed.actionPlan,
          fromCache: false,
        };

        return response;
      } catch (error) {
        console.error("Pro report generation failed:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "報告生成失敗，請稍後再試",
        });
      }
    }),

  /**
   * Get pro report preview (blurred/partial) for free users
   */
  getProPreview: protectedProcedure
    .input(proReportInputSchema)
    .query(async ({ ctx, input }) => {
      const { filters, schoolIds } = input;

      // Get school data
      const schools = schoolIds
        .map((id) => getSchoolById(id))
        .filter((s): s is School => s !== undefined)
        .slice(0, 3); // Only first 3 schools for preview

      if (schools.length === 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "沒有找到有效的學校",
        });
      }

      // Return preview structure (partial data, rest is blurred on frontend)
      const preview = {
        totalSchools: schoolIds.length,
        previewSchools: schools.map((school) => {
          const matchScore = calculateMatchScore(school, filters as QuizFilters);
          return {
            id: school.id,
            name: school.name,
            matchScore,
            // Only show truncated preview for first school
            personalizedAnalysisPreview: schools.indexOf(school) === 0
              ? "根據您的需求分析，這所學校在課程設置和教學環境方面..."
              : null,
          };
        }),
        strategyPreview: {
          hasTopRecommendation: true,
          hasBackupSchools: true,
          hasTimeline: true,
          hasActionPlan: true,
        },
        isProMember: isProMember(ctx.user),
      };

      return preview;
    }),
});

export type ReportRouter = typeof reportRouter;
