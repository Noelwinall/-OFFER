/**
 * KG Briefs Service
 *
 * Provides AI-generated briefs for kindergarten search results.
 *
 * Two tiers:
 * 1. Safe Brief (Free + Pro): Batch summary for ALL results (deterministic/mock)
 * 2. Enhanced Brief (Pro only): Per-school on-demand analysis
 *
 * TODO: Replace mock implementations with real AI API integration
 */

import type { KGSession, KGCurriculumCategoryFilter, KGCurriculumSubtypeFilter, KGPedagogyTag, KGLanguageEnv } from "@/constants/kg-filters";
import { KG_SESSION_LABELS, KG_LANGUAGE_ENV_LABELS } from "@/constants/kg-filters";
import { KG_CURRICULUM_CATEGORY_LABELS, KG_CURRICULUM_SUBTYPE_LABELS } from "@/constants/kg-curriculum";
import { KG_PEDAGOGY_LABELS } from "@/constants/kg-pedagogy";
import type { KindergartenEntry } from "@/data/kg/kg-database";
import type { District18 } from "@/types/school";

// ============================================================================
// Types & Interfaces
// ============================================================================

/**
 * User preferences derived from Q&A answers and selected filters
 */
export interface KGBriefPreferences {
  sessions?: KGSession[];
  curriculumCategory?: KGCurriculumCategoryFilter[];
  curriculumType?: KGCurriculumSubtypeFilter[];
  languageEnv?: KGLanguageEnv[];
  pedagogy?: KGPedagogyTag[];
  districts?: District18[];
}

/**
 * Minimal school data needed for brief generation
 */
export interface KGSchoolForBrief {
  id: string;
  name: string;
  nameEn: string;
  district18: string;
  sessions: KGSession[];
  curriculumCategory: string;
  curriculumType: string | null;
  pedagogyTags: string[];
  languageEnv: string[];
  tuitionMin: number;
  tuitionMax: number;
  dataQuality: {
    curriculumConfidence: "high" | "medium" | "low";
    pedagogyConfidence: "high" | "medium" | "low";
    languageConfidence: "high" | "medium" | "low";
    needsReview: boolean;
  };
}

// ============================================================================
// Safe Brief Types (Free + Pro)
// ============================================================================

/**
 * Input for getKgSafeBatchSummary
 */
export interface SafeBatchSummaryInput {
  stage: "kg";
  preferences: KGBriefPreferences;
  schools: KGSchoolForBrief[];
}

/**
 * Safe batch summary result - covers ENTIRE result set
 */
export interface SafeBatchSummary {
  totalCount: number;
  choicesRecap: string;
  overallSummary: string;
  insights: string[];
  watchOut: string[];
}

// ============================================================================
// Enhanced Brief Types (Pro only)
// ============================================================================

/**
 * User plan type for quota gate
 */
export type UserPlan = "free" | "pro";

/**
 * Input for getKgEnhancedSchoolBrief
 */
export interface EnhancedBriefInput {
  schoolId: string;
  school: KGSchoolForBrief;
  preferences?: KGBriefPreferences;
  plan: UserPlan;
  mode: "enhanced";
}

/**
 * Grounded item with evidence keys (anti-hallucination)
 */
export interface GroundedItem {
  text: string;
  evidence_keys: string[];
}

/**
 * Enhanced brief result for a single school
 * Matches the server response from ai.kg.enhancedBrief
 */
export interface EnhancedBrief {
  schoolId: string;
  schoolName: string;
  title: string;
  one_liner: string;
  grounded_highlights: GroundedItem[];
  watch_out: GroundedItem[];
  to_verify: string[];
  citations: string[];
  fromCache?: boolean;
  modelVersion?: string;
  promptVersion?: string;
}

/**
 * Legacy enhanced brief format (for backwards compatibility during transition)
 */
export interface EnhancedBriefLegacy {
  schoolId: string;
  schoolName: string;
  title: string;
  highlights: string[];
  watchOut: string[];
  citations?: string[];
}

/**
 * Quota gate result
 */
export interface QuotaGateResult {
  allowed: boolean;
  remaining?: number;
  reason?: string;
}

// ============================================================================
// Legacy Types (kept for backwards compatibility)
// ============================================================================

export interface KGBriefInput {
  stage: "kg";
  preferences: KGBriefPreferences;
  schoolIds: string[];
  schools: KGSchoolForBrief[];
}

export interface KGSchoolBrief {
  schoolId: string;
  schoolName: string;
  fitHighlights: string[];
  watchOut: string[];
}

export interface KGBriefResult {
  overallSummary: string;
  briefs: KGSchoolBrief[];
}

// ============================================================================
// Quota Gate Function
// ============================================================================

/**
 * Check if user can generate enhanced brief
 *
 * CURRENT: Simple plan check
 * - Pro: allowed=true (unlimited)
 * - Free: allowed=false => Paywall
 *
 * TODO: Add real quota tracking when billing is implemented
 */
export function canGenerateEnhanced(plan: UserPlan): QuotaGateResult {
  if (plan === "pro") {
    return {
      allowed: true,
      // remaining: undefined, // Unlimited for pro
    };
  }

  return {
    allowed: false,
    reason: "upgrade_required",
  };
}

// ============================================================================
// Safe Brief Implementation (Mock)
// ============================================================================

/**
 * Generate choices recap string in Traditional Chinese
 * Format: "你的選擇：全日班（是/不限）｜預算（有限/不限）｜..."
 */
function generateChoicesRecap(preferences: KGBriefPreferences): string {
  const parts: string[] = [];

  // Session preference
  if (preferences.sessions && preferences.sessions.length > 0) {
    if (preferences.sessions.includes("WD")) {
      parts.push("全日班（需要）");
    } else {
      const labels = preferences.sessions.map(s => KG_SESSION_LABELS[s]).join("、");
      parts.push(`時段（${labels}）`);
    }
  } else {
    parts.push("全日班（不限）");
  }

  // Budget/Curriculum preference
  if (preferences.curriculumType && preferences.curriculumType.length > 0) {
    if (preferences.curriculumType.includes("kgp")) {
      parts.push("預算（有限）");
    } else if (preferences.curriculumType.includes("non_kgp")) {
      parts.push("預算（不限）");
    } else {
      const typeLabels = preferences.curriculumType.map(t => KG_CURRICULUM_SUBTYPE_LABELS[t]).join("、");
      parts.push(`課程（${typeLabels}）`);
    }
  } else if (preferences.curriculumCategory && preferences.curriculumCategory.length > 0) {
    const catLabels = preferences.curriculumCategory.map(c => KG_CURRICULUM_CATEGORY_LABELS[c]).join("、");
    parts.push(`課程（${catLabels}）`);
  } else {
    parts.push("課程（不限）");
  }

  // Language preference
  if (preferences.languageEnv && preferences.languageEnv.length > 0) {
    if (preferences.languageEnv.includes("putonghua")) {
      parts.push("普通話環境（需要）");
    } else {
      const langLabels = preferences.languageEnv.map(l => KG_LANGUAGE_ENV_LABELS[l] || l).join("、");
      parts.push(`語言（${langLabels}）`);
    }
  } else {
    parts.push("普通話環境（不限）");
  }

  // Pedagogy preference
  if (preferences.pedagogy && preferences.pedagogy.length > 0) {
    const pedLabels = preferences.pedagogy.map(p => KG_PEDAGOGY_LABELS[p]).join("、");
    parts.push(`教學特色（${pedLabels}）`);
  } else {
    parts.push("教學特色（不限）");
  }

  // District preference
  if (preferences.districts && preferences.districts.length > 0) {
    parts.push(`地區（${preferences.districts.join("、")}）`);
  }

  return `你的選擇：${parts.join("｜")}`;
}

/**
 * Generate insights from school distribution
 */
function generateInsights(schools: KGSchoolForBrief[]): string[] {
  const insights: string[] = [];
  const total = schools.length;
  if (total === 0) return insights;

  // Session distribution
  const sessionCounts: Record<string, number> = { AM: 0, PM: 0, WD: 0 };
  schools.forEach(s => {
    s.sessions.forEach(session => {
      sessionCounts[session]++;
    });
  });
  const wdPercent = Math.round((sessionCounts.WD / total) * 100);
  if (wdPercent > 0) {
    insights.push(`${wdPercent}% 學校提供全日班`);
  }

  // Curriculum distribution
  const curriculumCounts: Record<string, number> = {};
  schools.forEach(s => {
    const key = s.curriculumType || s.curriculumCategory;
    curriculumCounts[key] = (curriculumCounts[key] || 0) + 1;
  });
  const topCurriculum = Object.entries(curriculumCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2);
  if (topCurriculum.length > 0) {
    const currLabels = topCurriculum.map(([key, count]) => {
      const label = KG_CURRICULUM_SUBTYPE_LABELS[key as KGCurriculumSubtypeFilter] ||
        KG_CURRICULUM_CATEGORY_LABELS[key as KGCurriculumCategoryFilter] ||
        key;
      const percent = Math.round((count / total) * 100);
      return `${label}（${percent}%）`;
    });
    insights.push(`課程分布：${currLabels.join("、")}`);
  }

  // Pedagogy distribution
  const pedagogyCounts: Record<string, number> = {};
  schools.forEach(s => {
    s.pedagogyTags.forEach(tag => {
      pedagogyCounts[tag] = (pedagogyCounts[tag] || 0) + 1;
    });
  });
  const topPedagogy = Object.entries(pedagogyCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);
  if (topPedagogy.length > 0) {
    const pedLabels = topPedagogy.map(([tag, count]) => {
      const label = KG_PEDAGOGY_LABELS[tag as KGPedagogyTag] || tag;
      return label;
    });
    insights.push(`教學特色涵蓋：${pedLabels.join("、")}`);
  }

  // Language distribution
  const languageCounts: Record<string, number> = {};
  schools.forEach(s => {
    s.languageEnv.forEach(lang => {
      languageCounts[lang] = (languageCounts[lang] || 0) + 1;
    });
  });
  const trilingualCount = languageCounts["trilingual"] || 0;
  const putonghuaCount = languageCounts["putonghua"] || 0;
  if (trilingualCount > 0) {
    insights.push(`${trilingualCount} 間學校提供兩文三語環境`);
  } else if (putonghuaCount > 0) {
    insights.push(`${putonghuaCount} 間學校提供普通話教學`);
  }

  // Tuition range
  const tuitions = schools.filter(s => s.tuitionMin > 0 || s.tuitionMax > 0);
  if (tuitions.length > 0) {
    const minTuition = Math.min(...tuitions.map(s => s.tuitionMin).filter(t => t > 0));
    const maxTuition = Math.max(...tuitions.map(s => s.tuitionMax).filter(t => t > 0));
    if (minTuition > 0 && maxTuition > 0) {
      const minK = Math.round(minTuition / 1000);
      const maxK = Math.round(maxTuition / 1000);
      insights.push(`學費範圍：約 $${minK}K - $${maxK}K/年`);
    }
  }

  return insights.slice(0, 5); // Max 5 insights
}

/**
 * Generate watch-out items from data quality issues
 */
function generateBatchWatchOut(schools: KGSchoolForBrief[]): string[] {
  const watchOut: string[] = [];
  const total = schools.length;
  if (total === 0) return watchOut;

  // Count schools needing review
  const needsReviewCount = schools.filter(s => s.dataQuality.needsReview).length;
  if (needsReviewCount > 0) {
    const percent = Math.round((needsReviewCount / total) * 100);
    if (percent > 50) {
      watchOut.push(`${percent}% 學校的部分資料待確認`);
    } else if (needsReviewCount > 0) {
      watchOut.push(`${needsReviewCount} 間學校的部分資料待確認`);
    }
  }

  // Check curriculum confidence
  const lowCurriculumCount = schools.filter(s => s.dataQuality.curriculumConfidence === "low").length;
  if (lowCurriculumCount > 3) {
    watchOut.push("部分學校的課程分類資料待確認");
  }

  // Check pedagogy confidence
  const lowPedagogyCount = schools.filter(s => s.dataQuality.pedagogyConfidence === "low").length;
  if (lowPedagogyCount > 3) {
    watchOut.push("部分學校的教學特色資料待確認");
  }

  // Check language confidence
  const lowLanguageCount = schools.filter(s => s.dataQuality.languageConfidence === "low").length;
  if (lowLanguageCount > 3) {
    watchOut.push("部分學校的語言環境資料待確認（以 needs_review 標示）");
  }

  // Check for missing data
  const missingPedagogyCount = schools.filter(s => s.pedagogyTags.length === 0).length;
  if (missingPedagogyCount > 3) {
    watchOut.push(`${missingPedagogyCount} 間學校暫缺教學特色資料`);
  }

  const missingLanguageCount = schools.filter(s => s.languageEnv.length === 0).length;
  if (missingLanguageCount > 3) {
    watchOut.push(`${missingLanguageCount} 間學校暫缺語言環境資料`);
  }

  return watchOut.slice(0, 5); // Max 5 watch-outs
}

/**
 * Get Safe Batch Summary for ALL result schools
 *
 * CURRENT: Mock implementation that generates deterministic summary from structured data.
 * TODO: Replace with real AI API call
 *
 * @param input - Input containing preferences and ALL schools in result set
 * @returns Promise resolving to SafeBatchSummary
 */
export async function getKgSafeBatchSummary(input: SafeBatchSummaryInput): Promise<SafeBatchSummary> {
  // TODO: [AI API INTEGRATION POINT]
  // Replace this mock implementation with actual AI API call:
  //
  // const response = await fetch('/api/ai/kg-safe-summary', {
  //   method: 'POST',
  //   body: JSON.stringify({
  //     preferences: input.preferences,
  //     schools: input.schools,
  //   }),
  // });
  // return response.json();

  // Simulate network delay (800-1200ms)
  const delay = 800 + Math.random() * 400;
  await new Promise(resolve => setTimeout(resolve, delay));

  const total = input.schools.length;
  const choicesRecap = generateChoicesRecap(input.preferences);
  const insights = generateInsights(input.schools);
  const watchOut = generateBatchWatchOut(input.schools);

  // Generate overall summary
  let overallSummary = "";
  if (total === 0) {
    overallSummary = "暫未找到完全符合的學校，建議放寬部分條件再試。";
  } else if (total <= 5) {
    overallSummary = "已為您精選出符合條件的幼稚園，可逐一了解詳情。";
  } else if (total <= 15) {
    overallSummary = "以下學校均符合您的篩選條件，建議先從地區或特色縮小範圍。";
  } else {
    overallSummary = "符合條件的學校較多，建議使用篩選功能進一步縮窄範圍。";
  }

  return {
    totalCount: total,
    choicesRecap,
    overallSummary,
    insights,
    watchOut,
  };
}

// ============================================================================
// Enhanced Brief Implementation (Mock)
// ============================================================================

/**
 * Generate enhanced fit highlights for a single school (with evidence keys)
 */
function generateEnhancedHighlights(
  school: KGSchoolForBrief,
  preferences?: KGBriefPreferences
): GroundedItem[] {
  const highlights: GroundedItem[] = [];

  // Session info
  if (school.sessions.length > 0) {
    if (school.sessions.length === 3) {
      highlights.push({
        text: "提供全日及半日班，時段選擇靈活",
        evidence_keys: ["sessions"],
      });
    } else {
      const labels = school.sessions.map(s => KG_SESSION_LABELS[s]).join("、");
      highlights.push({
        text: `提供${labels}時段`,
        evidence_keys: ["sessions"],
      });
    }
  }

  // Curriculum match
  if (school.curriculumType === "kgp") {
    highlights.push({
      text: "參與幼稚園教育計劃（KGP），可享政府學費資助，減輕家長負擔",
      evidence_keys: ["curriculumType", "joinedKGP"],
    });
  } else if (school.curriculumType === "ib") {
    highlights.push({
      text: "提供IB國際文憑課程，培養國際視野及批判思維",
      evidence_keys: ["curriculumType"],
    });
  } else if (school.curriculumType === "montessori") {
    highlights.push({
      text: "採用蒙特梭利教學法，注重自主學習及感官發展",
      evidence_keys: ["curriculumType"],
    });
  } else if (school.curriculumType === "british") {
    highlights.push({
      text: "採用英國課程體系，銜接國際升學路徑",
      evidence_keys: ["curriculumType"],
    });
  }

  // Language environment
  if (school.languageEnv.includes("trilingual")) {
    highlights.push({
      text: "兩文三語教學環境，為孩子建立多語言基礎",
      evidence_keys: ["languageEnv"],
    });
  } else if (school.languageEnv.includes("english") && school.languageEnv.includes("cantonese")) {
    highlights.push({
      text: "中英雙語並重，平衡本地與國際元素",
      evidence_keys: ["languageEnv"],
    });
  } else if (school.languageEnv.includes("putonghua")) {
    highlights.push({
      text: "重視普通話教學，加強普通話溝通能力",
      evidence_keys: ["languageEnv"],
    });
  }

  // Pedagogy features
  if (school.pedagogyTags.length > 0) {
    const tagLabels = school.pedagogyTags
      .slice(0, 2)
      .map(t => KG_PEDAGOGY_LABELS[t as KGPedagogyTag] || t)
      .filter(Boolean);
    if (tagLabels.length > 0) {
      highlights.push({
        text: `教學特色：${tagLabels.join("、")}，注重全人發展`,
        evidence_keys: ["pedagogyTags"],
      });
    }
  }

  // Tuition info
  if (school.tuitionMin === 0 && school.tuitionMax === 0) {
    highlights.push({
      text: "學費全免（KGP資助後），適合預算有限的家庭",
      evidence_keys: ["tuition", "joinedKGP"],
    });
  } else if (school.tuitionMin > 0) {
    const minK = Math.round(school.tuitionMin / 1000);
    const maxK = Math.round(school.tuitionMax / 1000);
    if (minK === maxK) {
      highlights.push({
        text: `年費約$${minK}K，屬同區中等水平`,
        evidence_keys: ["tuition"],
      });
    } else {
      highlights.push({
        text: `年費約$${minK}K-${maxK}K，視乎時段選擇`,
        evidence_keys: ["tuition", "sessions"],
      });
    }
  }

  // Location
  highlights.push({
    text: `位於${school.district18}，交通及社區配套可參考學校網站`,
    evidence_keys: ["district18", "website"],
  });

  return highlights.slice(0, 6); // Max 6 highlights
}

/**
 * Generate enhanced watch-out items for a single school (with evidence keys)
 */
function generateEnhancedWatchOut(school: KGSchoolForBrief): GroundedItem[] {
  const watchOut: GroundedItem[] = [];

  // Data quality issues
  if (school.dataQuality.needsReview) {
    watchOut.push({
      text: "部分資料待確認，建議向學校直接查詢",
      evidence_keys: ["dataQuality.needsReview"],
    });
  }

  if (school.dataQuality.curriculumConfidence === "low") {
    watchOut.push({
      text: "課程分類資料待確認，建議參閱學校官網或概覽",
      evidence_keys: ["dataQuality.curriculumConfidence"],
    });
  }

  if (school.dataQuality.pedagogyConfidence === "low") {
    watchOut.push({
      text: "教學特色資料待確認，建議參加開放日了解",
      evidence_keys: ["dataQuality.pedagogyConfidence"],
    });
  }

  if (school.dataQuality.languageConfidence === "low") {
    watchOut.push({
      text: "語言環境資料待確認，建議向學校查詢實際安排",
      evidence_keys: ["dataQuality.languageConfidence"],
    });
  }

  // Missing data
  if (school.pedagogyTags.length === 0) {
    watchOut.push({
      text: "暫缺教學特色詳情，建議實地參觀了解",
      evidence_keys: ["pedagogyTags"],
    });
  }

  if (school.languageEnv.length === 0) {
    watchOut.push({
      text: "暫缺語言環境資料，建議向學校查詢",
      evidence_keys: ["languageEnv"],
    });
  }

  // Add generic advice if no issues
  if (watchOut.length === 0) {
    watchOut.push({
      text: "建議實地參觀及參加開放日，了解學校氛圍",
      evidence_keys: [],
    });
    watchOut.push({
      text: "面試及收生安排請參閱學校通告",
      evidence_keys: [],
    });
  }

  return watchOut.slice(0, 4); // Max 4 watch-outs
}

/**
 * Get Enhanced Brief for a single school (Pro only, on-demand)
 *
 * CURRENT: Mock implementation
 * TODO: Replace with real AI API call with web research
 *
 * POST /api/ai/school-analysis
 * Body: { plan: "pro", mode: "enhanced", stage: "kg", schoolIds: [id], preferences }
 *
 * @param input - Input containing schoolId, school data, and plan
 * @returns Promise resolving to EnhancedBrief
 */
export async function getKgEnhancedSchoolBrief(input: EnhancedBriefInput): Promise<EnhancedBrief> {
  // Check quota gate first
  const quota = canGenerateEnhanced(input.plan);
  if (!quota.allowed) {
    throw new Error("UPGRADE_REQUIRED");
  }

  // TODO: [AI API INTEGRATION POINT]
  // Replace this mock implementation with actual AI API call:
  //
  // const response = await fetch('/api/ai/school-analysis', {
  //   method: 'POST',
  //   body: JSON.stringify({
  //     plan: input.plan,
  //     mode: input.mode,
  //     stage: 'kg',
  //     schoolIds: [input.schoolId],
  //     preferences: input.preferences,
  //   }),
  // });
  // return response.json();

  // Simulate network delay (1000-1500ms for enhanced)
  const delay = 1000 + Math.random() * 500;
  await new Promise(resolve => setTimeout(resolve, delay));

  const school = input.school;
  const highlights = generateEnhancedHighlights(school, input.preferences);
  const watchOut = generateEnhancedWatchOut(school);

  // Generate title
  let title = `${school.name}分析報告`;
  if (school.curriculumType) {
    const currLabel = KG_CURRICULUM_SUBTYPE_LABELS[school.curriculumType as KGCurriculumSubtypeFilter];
    if (currLabel) {
      title = `${school.name}（${currLabel}）`;
    }
  }

  // Generate one-liner summary
  const oneLiner = school.curriculumType
    ? `${school.district18}${KG_CURRICULUM_SUBTYPE_LABELS[school.curriculumType as KGCurriculumSubtypeFilter] || school.curriculumCategory}幼稚園`
    : `${school.district18}幼稚園`;

  // Generate verification checklist
  const toVerify: string[] = [
    "實地參觀了解學校氛圍及設施",
    "查詢師生比例及班級人數",
    "了解面試及收生流程",
    "查詢課外活動及興趣班安排",
  ];

  return {
    schoolId: school.id,
    schoolName: school.name,
    title,
    one_liner: oneLiner,
    grounded_highlights: highlights,
    watch_out: watchOut,
    to_verify: toVerify,
    citations: [], // Placeholder for future web research
  };
}

// ============================================================================
// Legacy API (kept for backwards compatibility)
// ============================================================================

/**
 * @deprecated Use getKgSafeBatchSummary instead
 * Kept for backwards compatibility during transition
 */
export async function getKgBriefs(input: KGBriefInput): Promise<KGBriefResult> {
  // Simulate network delay (800-1200ms)
  const delay = 800 + Math.random() * 400;
  await new Promise(resolve => setTimeout(resolve, delay));

  // Generate mock briefs (legacy format - extract text only)
  const briefs: KGSchoolBrief[] = input.schools.map(school => ({
    schoolId: school.id,
    schoolName: school.name,
    fitHighlights: generateEnhancedHighlights(school, input.preferences).slice(0, 4).map(item => item.text),
    watchOut: generateEnhancedWatchOut(school).slice(0, 2).map(item => item.text),
  }));

  const overallSummary = generateChoicesRecap(input.preferences);

  return {
    overallSummary,
    briefs,
  };
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Convert KindergartenEntry to KGSchoolForBrief
 * Helper function to prepare school data for brief generation
 */
export function toSchoolForBrief(kg: KindergartenEntry): KGSchoolForBrief {
  return {
    id: kg.id,
    name: kg.name,
    nameEn: kg.nameEn,
    district18: kg.district18,
    sessions: kg.sessions,
    curriculumCategory: kg.curriculumCategory,
    curriculumType: kg.curriculumType,
    pedagogyTags: kg.pedagogyTags,
    languageEnv: kg.languageEnv,
    tuitionMin: kg.tuitionMin,
    tuitionMax: kg.tuitionMax,
    dataQuality: kg.dataQuality,
  };
}
