import type { School } from "@/types/school";
import type { FilterState } from "@/lib/filter-context";

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
      // 文字搜尋
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          school.name.toLowerCase().includes(query) ||
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
  if (school.name.toLowerCase() === searchQuery.toLowerCase()) {
    score += 100;
  }

  // 名稱包含搜尋詞（中分）
  if (school.name.toLowerCase().includes(searchQuery.toLowerCase())) {
    score += 50;
  }

  // 地區匹配（加分）
  if (filters.district.length > 0 && filters.district.includes(school.district)) {
    score += 20;
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
 * 對搜尋結果進行排序
 */
export function sortSearchResults(
  schools: School[],
  searchQuery: string,
  filters: FilterState
): School[] {
  return [...schools].sort((a, b) => {
    const scoreA = calculateSearchRelevance(a, searchQuery, filters);
    const scoreB = calculateSearchRelevance(b, searchQuery, filters);
    return scoreB - scoreA;
  });
}
