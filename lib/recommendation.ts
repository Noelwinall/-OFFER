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
    // 學段篩選（必須匹配）
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
      // 免費選項特殊處理
      if (min === 0 && max === 0) {
        if (school.tuitionMin > 0) return false;
      } else {
        // 學校學費範圍與篩選範圍有交集即符合
        const hasOverlap =
          (school.tuitionMin <= max || max === Infinity) &&
          school.tuitionMax >= min;
        if (!hasOverlap) {
          return false;
        }
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
 * 返回 0-100 的匹配分數
 */
export function calculateMatchScore(
  school: School,
  filters: QuizFilters
): number {
  let score = 0;
  let maxScore = 0;

  // 學段匹配（權重最高）
  if (filters.level) {
    maxScore += 25;
    if (school.level === filters.level) score += 25;
  }

  // 地區匹配
  if (filters.district) {
    maxScore += 20;
    if (school.district === filters.district) score += 20;
  }

  // 學校類型匹配
  if (filters.category) {
    maxScore += 18;
    if (school.category === filters.category) score += 18;
  }

  // 課程匹配
  if (filters.curriculum) {
    maxScore += 15;
    if (school.curriculum.includes(filters.curriculum)) score += 15;
  }

  // 教學語言匹配
  if (filters.language) {
    maxScore += 12;
    if (school.language === filters.language) score += 12;
  }

  // 學費匹配度
  if (filters.tuitionRange) {
    maxScore += 10;
    const { min, max } = filters.tuitionRange;
    
    // 免費選項
    if (min === 0 && max === 0) {
      if (school.tuitionMin === 0) score += 10;
    } else {
      const hasOverlap =
        (school.tuitionMin <= max || max === Infinity) &&
        school.tuitionMax >= min;
      if (hasOverlap) {
        // 計算重疊程度
        const midpoint = max === Infinity ? min : (min + max) / 2;
        const schoolMidpoint = (school.tuitionMin + school.tuitionMax) / 2;
        const difference = Math.abs(schoolMidpoint - midpoint);
        const maxDifference = 200000;
        const tuitionScore = Math.max(0, 10 - (difference / maxDifference) * 10);
        score += tuitionScore;
      }
    }
  }

  // 返回百分比分數
  return maxScore > 0 ? Math.round((score / maxScore) * 100) : 100;
}

/**
 * 獲取推薦學校並按匹配度排序
 * 改進版：當精確匹配為0時，逐步放寬條件
 */
export function getSortedRecommendations(
  schools: School[],
  filters: QuizFilters
): School[] {
  // 先嘗試精確匹配
  let recommended = getRecommendedSchools(schools, filters);

  // 如果精確匹配結果為0，逐步放寬條件
  if (recommended.length === 0) {
    // 策略1：只保留學段和地區
    const relaxedFilters1: QuizFilters = {
      level: filters.level,
      district: filters.district,
    };
    recommended = getRecommendedSchools(schools, relaxedFilters1);

    // 如果還是0，只保留學段
    if (recommended.length === 0 && filters.level) {
      const relaxedFilters2: QuizFilters = {
        level: filters.level,
      };
      recommended = getRecommendedSchools(schools, relaxedFilters2);
    }

    // 如果還是0，返回所有學校（按匹配度排序）
    if (recommended.length === 0) {
      recommended = [...schools];
    }
  }

  // 按匹配度排序（使用原始完整篩選條件計算分數）
  return recommended.sort((a, b) => {
    const scoreA = calculateMatchScore(a, filters);
    const scoreB = calculateMatchScore(b, filters);
    return scoreB - scoreA;
  });
}

/**
 * 獲取匹配度描述
 */
export function getMatchDescription(score: number): string {
  if (score >= 90) return "完美匹配";
  if (score >= 70) return "高度匹配";
  if (score >= 50) return "部分匹配";
  if (score >= 30) return "可供參考";
  return "僅供參考";
}
