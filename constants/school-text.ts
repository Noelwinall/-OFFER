/**
 * 学校页面中文文案常量
 * Phase R2: iOS UI
 * Phase R3-4: 学费展示规则
 */

export const SCHOOL_TEXT = {
  // 加载状态
  LOADING: "載入中...",

  // 空状态
  EMPTY_LIST: "暫無學校資料",
  NO_RESULTS: "找不到符合條件的學校",
  NO_RESULTS_HINT: "請嘗試調整篩選條件或關鍵字",
  SCHOOL_NOT_FOUND: "找不到學校資訊",

  // 待确认
  PENDING: "待確認",

  // 搜索
  SEARCH_PLACEHOLDER: "搜尋學校名稱、地區或類型",

  // 筛选
  FILTER_ALL: "全部",

  // 来源声明
  DATA_SOURCE: "資料來源：教育局學校名冊",
  DATA_DISCLAIMER: "部分資料待確認，如有錯漏請聯絡我們",

  // 页面标题
  SEARCH_TITLE: "搜尋學校",
  SEARCH_SUBTITLE: "探索香港優質學校",
  DETAIL_TITLE: "學校詳情",

  // 区块标题
  SECTION_BASIC_INFO: "基本資訊",
  SECTION_CONTACT: "聯絡方式",

  // 字段标签
  LABEL_LEVEL: "學段",
  LABEL_CATEGORY: "類型",
  LABEL_DISTRICT: "地區",
  LABEL_WEBSITE: "網站",
  LABEL_TUITION: "學費",

  // 学费展示 (R3-4)
  TUITION_YEAR: "2025/26",
  TUITION_PENDING: "學費：待確認",
  TUITION_DSS_SOURCE: "資料來源：教育局直資學校學費表（2025/26）",
  TUITION_OTHER_SOURCE: "暫無統一官方學費表，稍後補充",
} as const;

/**
 * 格式化学费显示（R3-4）
 * @param category 学校类型
 * @param tuitionMin 最低学费
 * @param tuitionMax 最高学费
 * @returns 格式化后的学费字符串
 */
export function formatTuitionDisplay(
  category: string,
  tuitionMin: number,
  tuitionMax: number
): string {
  // 直資学校且有有效学费数据
  if (category === "直資" && tuitionMin > 0 && tuitionMax > 0) {
    if (tuitionMin === tuitionMax) {
      return `學費（${SCHOOL_TEXT.TUITION_YEAR}）：HK$${tuitionMin.toLocaleString()}`;
    }
    return `學費（${SCHOOL_TEXT.TUITION_YEAR}）：HK$${tuitionMin.toLocaleString()}-${tuitionMax.toLocaleString()}`;
  }
  // 其他情况显示待确认
  return SCHOOL_TEXT.TUITION_PENDING;
}

/**
 * 获取学费来源说明（R3-4）
 * @param category 学校类型
 * @param tuitionMin 最低学费
 * @param tuitionMax 最高学费
 * @returns 来源说明文字
 */
export function getTuitionSourceNote(
  category: string,
  tuitionMin: number,
  tuitionMax: number
): string {
  if (category === "直資" && tuitionMin > 0 && tuitionMax > 0) {
    return SCHOOL_TEXT.TUITION_DSS_SOURCE;
  }
  return SCHOOL_TEXT.TUITION_OTHER_SOURCE;
}

/**
 * 格式化学费值（详情页用，不含"學費"前缀）
 * @param category 学校类型
 * @param tuitionMin 最低学费
 * @param tuitionMax 最高学费
 * @returns 格式化后的学费值
 */
export function formatTuitionValue(
  category: string,
  tuitionMin: number,
  tuitionMax: number
): string {
  if (category === "直資" && tuitionMin > 0 && tuitionMax > 0) {
    if (tuitionMin === tuitionMax) {
      return `HK$${tuitionMin.toLocaleString()}（${SCHOOL_TEXT.TUITION_YEAR}）`;
    }
    return `HK$${tuitionMin.toLocaleString()}-${tuitionMax.toLocaleString()}（${SCHOOL_TEXT.TUITION_YEAR}）`;
  }
  return SCHOOL_TEXT.PENDING;
}
