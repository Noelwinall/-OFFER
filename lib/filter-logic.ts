import type { School } from "@/types/school";
import type { FilterState, SortOption } from "@/lib/filter-context";

/**
 * 檢查學校是否符合進階篩選條件
 */
export function matchesAdvancedFilters(
  school: School,
  filters: FilterState
): boolean {
  // 學費篩選
  if (filters.tuitionRange) {
    const { min, max } = filters.tuitionRange;
    const hasOverlap =
      school.tuitionMin <= max && school.tuitionMax >= min;
    if (!hasOverlap) return false;
  }

  // 課程篩選（多選，任一匹配即可）
  if (filters.curriculum.length > 0) {
    const hasMatchingCurriculum = filters.curriculum.some((c) =>
      school.curriculum.includes(c)
    );
    if (!hasMatchingCurriculum) return false;
  }

  // 教學語言篩選（單選）
  if (filters.language && school.language !== filters.language) {
    return false;
  }

  // 學校類型篩選（多選，任一匹配即可）
  if (filters.category.length > 0) {
    if (!filters.category.includes(school.category)) return false;
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
  return schools
    .filter((school) => {
      // 文字搜尋（支援中英文名稱和關鍵字）
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          school.name.toLowerCase().includes(query) ||
          school.nameEn.toLowerCase().includes(query) ||
          school.searchKeywords.some(kw => kw.toLowerCase().includes(query)) ||
          school.district.toLowerCase().includes(query) ||
          school.category.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // 進階篩選
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

  // 課程匹配（加分）
  if (
    filters.curriculum.length > 0 &&
    filters.curriculum.some((c) => school.curriculum.includes(c))
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
