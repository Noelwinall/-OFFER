import type { School, QuizFilters } from "@/types/school";

/**
 * 推薦演算法 - 基於規則篩選
 * 根據問答引導的篩選條件，返回符合條件的學校列表
 */
export function getRecommendedSchools(
  schools: School[],
  filters: QuizFilters
): School[] {
  return schools.filter((school) => {
    // 學段篩選
    if (filters.level && school.level !== filters.level) {
      return false;
    }

    // 地區篩選
    if (filters.district && school.district !== filters.district) {
      return false;
    }

    // 學費篩選
    if (filters.tuitionRange) {
      const { min, max } = filters.tuitionRange;
      // 學校學費範圍與篩選範圍有交集即符合
      const hasOverlap =
        (school.tuitionMin <= max || max === Infinity) &&
        school.tuitionMax >= min;
      if (!hasOverlap) {
        return false;
      }
    }

    // 學校類型篩選
    if (filters.category && school.category !== filters.category) {
      return false;
    }

    // 課程篩選
    if (filters.curriculum) {
      if (!school.curriculum.includes(filters.curriculum)) {
        return false;
      }
    }

    // 教學語言篩選
    if (filters.language && school.language !== filters.language) {
      return false;
    }

    return true;
  });
}

/**
 * 計算學校與篩選條件的匹配度（用於排序）
 */
export function calculateMatchScore(
  school: School,
  filters: QuizFilters
): number {
  let score = 0;

  if (filters.level && school.level === filters.level) score += 10;
  if (filters.district && school.district === filters.district) score += 8;
  if (filters.category && school.category === filters.category) score += 7;
  if (filters.curriculum && school.curriculum.includes(filters.curriculum))
    score += 6;
  if (filters.language && school.language === filters.language) score += 5;

  // 學費匹配度（越接近預算中位數，分數越高）
  if (filters.tuitionRange) {
    const { min, max } = filters.tuitionRange;
    const midpoint = max === Infinity ? min : (min + max) / 2;
    const schoolMidpoint = (school.tuitionMin + school.tuitionMax) / 2;
    const difference = Math.abs(schoolMidpoint - midpoint);
    const maxDifference = 300000; // 最大差異（港幣）
    const tuitionScore = Math.max(0, 5 - (difference / maxDifference) * 5);
    score += tuitionScore;
  }

  return score;
}

/**
 * 獲取推薦學校並按匹配度排序
 */
export function getSortedRecommendations(
  schools: School[],
  filters: QuizFilters
): School[] {
  const recommended = getRecommendedSchools(schools, filters);

  // 按匹配度排序
  return recommended.sort((a, b) => {
    const scoreA = calculateMatchScore(a, filters);
    const scoreB = calculateMatchScore(b, filters);
    return scoreB - scoreA;
  });
}
