import type { School } from "@/types/school";
import type { FilterState, SortOption } from "@/lib/filter-context";
import { isInternational } from "@/lib/international-schools";
import { getGroupSearchId, matchesGroupSearch, expandSearchQuery } from "@/constants/search-aliases";
import {
  KG_CATEGORY_PRIVATE,
  KG_CATEGORY_NONPROFIT,
  matchesKGCategory,
  isNonInternationalKG,
} from "@/constants/kg-nature";
import { feesData202526 } from "@/data/fees-2025-26";
import { calculateOverallTuition } from "@/types/fees";
import { kindergartens, type KindergartenEntry } from "@/data/kg/kg-database";
import { SUBTYPE_TO_CATEGORY, type KGCurriculumCategoryFilter, type KGCurriculumSubtypeFilter } from "@/constants/kg-curriculum";

// Create lookup map for KG curriculum data by school ID (including variant IDs)
const kgCurriculumMap = new Map<string, KindergartenEntry>();
for (const kg of kindergartens) {
  kgCurriculumMap.set(kg.id, kg);
  // Also map variant IDs to the same entry
  for (const variantId of kg.variantIds) {
    kgCurriculumMap.set(variantId, kg);
  }
}

/**
 * Get KG curriculum data for a school by ID
 */
function getKGData(schoolId: string): KindergartenEntry | undefined {
  return kgCurriculumMap.get(schoolId);
}

/**
 * 檢查學校是否符合進階篩選條件
 */
export function matchesAdvancedFilters(
  school: School,
  filters: FilterState
): boolean {
  // 階段篩選（單選）
  if (filters.stage && school.level !== filters.stage) {
    return false;
  }

  // 課程篩選 V2（多選，任一匹配即可）
  // DUAL_TRACK is standalone - do NOT auto-include when filtering IB or BRITISH
  if (filters.curriculumV2.length > 0) {
    const hasMatchingCurriculumV2 = filters.curriculumV2.some((c) =>
      school.curriculumV2.includes(c)
    );
    if (!hasMatchingCurriculumV2) return false;
  }

  // 授課語言篩選（多選，任一匹配即可）
  // Only applies to Primary/Secondary - KG schools have empty instructionLanguages
  if (filters.instructionLanguages.length > 0) {
    const hasMatchingLanguage = filters.instructionLanguages.some((l) =>
      school.instructionLanguages.includes(l)
    );
    if (!hasMatchingLanguage) return false;
  }

  // 學校性別篩選（多選，任一匹配即可）
  // Only BOYS and GIRLS are filterable - MIXED schools are excluded from results
  if (filters.gender.length > 0) {
    const matchesGender = filters.gender.includes(school.gender);
    if (!matchesGender) return false;
  }

  // 教學語言篩選（單選）- legacy filter
  if (filters.language && school.language !== filters.language) {
    return false;
  }

  // 學校類型篩選（多選，任一匹配即可）
  // R3-8: "國際" 需用 isInternational() 判定，其他類型用 category 字段
  // KG Category System: Non-international KGs use new categories (私立幼稚園/非牟利幼稚園)
  if (filters.category.length > 0) {
    const matchesCategory = filters.category.some((cat) => {
      // KG-specific categories
      if (cat === KG_CATEGORY_PRIVATE || cat === KG_CATEGORY_NONPROFIT) {
        return matchesKGCategory(school, cat);
      }

      if (cat === "國際") {
        // 國際學校通過名稱模式判定，非 category 字段
        return isInternational(school);
      }

      // Original 5 categories: exclude non-international KGs
      // Non-international KGs should only appear in KG-specific categories
      if (isNonInternationalKG(school)) {
        return false;
      }

      // 其他類型：直接比對 category 字段
      // 注意：若選了"私立"但學校是國際學校，應排除（國際學校單獨一類）
      if (cat === "私立" && isInternational(school)) {
        return false;
      }
      return school.category === cat;
    });
    if (!matchesCategory) return false;
  }

  // 地區篩選（多選，任一匹配即可）
  if (filters.district.length > 0) {
    if (!filters.district.includes(school.district)) return false;
  }

  // 18區篩選（多選，任一匹配即可）
  if (filters.district18.length > 0) {
    if (!filters.district18.includes(school.district18)) return false;
  }

  // KG-specific filters (only apply when stage = 幼稚園)
  if (filters.stage === "幼稚園") {
    const kgData = getKGData(school.id);

    // KG Session filter
    if (filters.kgSession.length > 0) {
      if (!kgData || !kgData.sessions) return false;
      const hasMatchingSession = filters.kgSession.some((s) => kgData.sessions.includes(s));
      if (!hasMatchingSession) return false;
    }

    // KG Curriculum filter (2-level hierarchy)
    if (filters.kgCurriculumCategory.length > 0 || filters.kgCurriculumType.length > 0) {
      if (!kgData || !kgData.curriculumCategory) return false;

      // Build matching logic:
      // - If only Level-1 is selected: match any record with that category
      // - If Level-2 is selected: match records with that specific subtype
      let matchesCurriculum = false;

      for (const category of filters.kgCurriculumCategory) {
        // Check if any Level-2 subtypes are selected for this category
        const selectedSubtypes = filters.kgCurriculumType.filter(
          (t) => SUBTYPE_TO_CATEGORY[t as KGCurriculumSubtypeFilter] === category
        );

        if (selectedSubtypes.length > 0) {
          // Level-2 selected: match only specific subtypes
          if (selectedSubtypes.includes(kgData.curriculumType as KGCurriculumSubtypeFilter)) {
            matchesCurriculum = true;
            break;
          }
        } else {
          // Only Level-1 selected: match any record with this category
          if (kgData.curriculumCategory === category) {
            matchesCurriculum = true;
            break;
          }
        }
      }

      // Also check for subtypes selected without their parent category
      // (in case user directly selects subtypes)
      for (const subtype of filters.kgCurriculumType) {
        const parentCategory = SUBTYPE_TO_CATEGORY[subtype as KGCurriculumSubtypeFilter];
        if (!filters.kgCurriculumCategory.includes(parentCategory)) {
          // Subtype selected without parent - match directly
          if (kgData.curriculumType === subtype) {
            matchesCurriculum = true;
            break;
          }
        }
      }

      if (!matchesCurriculum) return false;
    }

    // KG Pedagogy filter (Teaching Features - OR logic)
    if (filters.kgPedagogy.length > 0) {
      if (!kgData || !kgData.pedagogyTags || kgData.pedagogyTags.length === 0) return false;
      const hasMatchingPedagogy = filters.kgPedagogy.some((p) => kgData.pedagogyTags.includes(p));
      if (!hasMatchingPedagogy) return false;
    }

    // KG Language Environment filter
    // Special logic for putonghua: exclude Cantonese-only schools, keep all others
    // (English/international/Montessori schools should not be excluded)
    if (filters.kgLanguageEnv.length > 0) {
      if (!kgData || !kgData.languageEnv || kgData.languageEnv.length === 0) return false;

      const isPutonghuaFilter = filters.kgLanguageEnv.includes("putonghua");

      if (isPutonghuaFilter && filters.kgLanguageEnv.length === 1) {
        // Putonghua-only filter: exclude Cantonese-only schools
        // A school is Cantonese-only if it ONLY has "cantonese" in languageEnv
        const isCantoneseOnly = kgData.languageEnv.length === 1 && kgData.languageEnv[0] === "cantonese";
        if (isCantoneseOnly) return false;
      } else {
        // Standard OR logic for other language filters
        const hasMatchingLang = filters.kgLanguageEnv.some((l) => kgData.languageEnv.includes(l));
        if (!hasMatchingLang) return false;
      }
    }
  }

  return true;
}

/**
 * 結合文字搜尋和進階篩選的完整篩選邏輯
 */
export function filterSchools(
  schools: School[],
  searchQuery: string,
  filters: FilterState
): School[] {
  const trimmedQuery = searchQuery.trim();

  // Check if this is a group search (e.g., "ESF", "英基")
  const groupId = trimmedQuery ? getGroupSearchId(trimmedQuery) : null;

  return schools
    .filter((school) => {
      // Text search (supports Chinese/English names and keywords)
      if (trimmedQuery) {
        // GROUP SEARCH: Use strict group membership matching
        if (groupId) {
          if (!matchesGroupSearch(school, groupId)) {
            return false;
          }
        } else {
          // REGULAR SEARCH: Use keyword matching
          const expandedQueries = expandSearchQuery(trimmedQuery);
          const matchesSearch = expandedQueries.some((q) => {
            const query = q.toLowerCase();
            return (
              school.name.toLowerCase().includes(query) ||
              school.nameEn.toLowerCase().includes(query) ||
              school.searchKeywords.some(kw => kw.toLowerCase().includes(query)) ||
              school.district.toLowerCase().includes(query) ||
              school.category.toLowerCase().includes(query)
            );
          });
          if (!matchesSearch) return false;
        }
      }

      // Advanced filters
      return matchesAdvancedFilters(school, filters);
    });
}

/**
 * 計算搜尋結果與篩選條件的相關度
 * 用於排序搜尋結果
 */
export function calculateSearchRelevance(
  school: School,
  searchQuery: string,
  filters: FilterState
): number {
  let score = 0;

  // 名稱完全匹配（高分）
  if (school.name.toLowerCase() === searchQuery.toLowerCase() ||
      school.nameEn.toLowerCase() === searchQuery.toLowerCase()) {
    score += 100;
  }

  // 關鍵字完全匹配（高分）
  if (school.searchKeywords.some(kw => kw.toLowerCase() === searchQuery.toLowerCase())) {
    score += 90;
  }

  // 名稱包含搜尋詞（中分）
  if (school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      school.nameEn.toLowerCase().includes(searchQuery.toLowerCase())) {
    score += 50;
  }

  // 關鍵字包含搜尋詞（中分）
  if (school.searchKeywords.some(kw => kw.toLowerCase().includes(searchQuery.toLowerCase()))) {
    score += 40;
  }

  // 階段匹配（加分）
  if (filters.stage && school.level === filters.stage) {
    score += 30;
  }

  // 地區匹配（加分）
  if (filters.district.length > 0 && filters.district.includes(school.district)) {
    score += 20;
  }

  // 18區匹配（加分）
  if (filters.district18.length > 0 && filters.district18.includes(school.district18)) {
    score += 25;
  }

  // 類型匹配（加分）
  if (filters.category.length > 0 && filters.category.includes(school.category)) {
    score += 15;
  }

  // 課程匹配 V2（加分）
  if (
    filters.curriculumV2.length > 0 &&
    filters.curriculumV2.some((c) => school.curriculumV2.includes(c))
  ) {
    score += 10;
  }

  // 語言匹配（加分）
  if (filters.language && school.language === filters.language) {
    score += 5;
  }

  return score;
}

/**
 * 獲取學校的有效學費（優先使用 fees data，其次用 raw data）
 */
function getEffectiveTuition(school: School): { min: number; max: number } {
  // 優先從 fees data 獲取
  const fees = feesData202526[school.id];
  if (fees) {
    const overall = calculateOverallTuition(fees);
    if (overall.isComplete && overall.min > 0) {
      return { min: overall.min, max: overall.max };
    }
  }
  // Fallback 到 raw data
  return { min: school.tuitionMin, max: school.tuitionMax };
}

/**
 * 根據排序選項對學校列表進行排序
 */
export function sortSchools(
  schools: School[],
  sortBy: SortOption,
  searchQuery: string,
  filters: FilterState
): School[] {
  const sorted = [...schools];

  switch (sortBy) {
    case "relevance":
      // 按相關度排序（預設）
      return sorted.sort((a, b) => {
        const scoreA = calculateSearchRelevance(a, searchQuery, filters);
        const scoreB = calculateSearchRelevance(b, searchQuery, filters);
        return scoreB - scoreA;
      });

    case "tuition_low":
      // 學費由低到高（無學費資料的排最後）
      return sorted.sort((a, b) => {
        const tuitionA = getEffectiveTuition(a);
        const tuitionB = getEffectiveTuition(b);
        const avgA = tuitionA.min > 0 ? (tuitionA.min + tuitionA.max) / 2 : Infinity;
        const avgB = tuitionB.min > 0 ? (tuitionB.min + tuitionB.max) / 2 : Infinity;
        return avgA - avgB;
      });

    case "tuition_high":
      // 學費由高到低（無學費資料的排最後）
      return sorted.sort((a, b) => {
        const tuitionA = getEffectiveTuition(a);
        const tuitionB = getEffectiveTuition(b);
        const avgA = tuitionA.min > 0 ? (tuitionA.min + tuitionA.max) / 2 : -Infinity;
        const avgB = tuitionB.min > 0 ? (tuitionB.min + tuitionB.max) / 2 : -Infinity;
        return avgB - avgA;
      });

    case "name_asc":
      // 名稱 A-Z（按拼音/筆畫）
      return sorted.sort((a, b) => a.name.localeCompare(b.name, "zh-Hant"));

    case "name_desc":
      // 名稱 Z-A
      return sorted.sort((a, b) => b.name.localeCompare(a.name, "zh-Hant"));

    default:
      return sorted;
  }
}

/**
 * 對搜尋結果進行排序（兼容舊版 API）
 */
export function sortSearchResults(
  schools: School[],
  searchQuery: string,
  filters: FilterState
): School[] {
  return sortSchools(schools, filters.sortBy, searchQuery, filters);
}
