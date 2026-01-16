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

  // 教學語言篩選（單選）
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
      // 學費由低到高
      return sorted.sort((a, b) => {
        const avgA = (a.tuitionMin + a.tuitionMax) / 2;
        const avgB = (b.tuitionMin + b.tuitionMax) / 2;
        return avgA - avgB;
      });

    case "tuition_high":
      // 學費由高到低
      return sorted.sort((a, b) => {
        const avgA = (a.tuitionMin + a.tuitionMax) / 2;
        const avgB = (b.tuitionMin + b.tuitionMax) / 2;
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
