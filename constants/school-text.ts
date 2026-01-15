/**
 * 学校页面中文文案常量
 * Phase R2: iOS UI
 * Phase R3-4: 学费展示规则
 * Phase R3-5: 國際/私校費用結構
 */

import type {
  SchoolFees,
  TuitionBand,
  MandatoryCharge,
  SourceNote,
  OverallTuitionRange,
  MandatoryChargeType,
  RefundableStatus,
  ChargeFrequency,
} from "@/types/fees";
import { calculateOverallTuition } from "@/types/fees";

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
  SECTION_TUITION: "學費",
  SECTION_MANDATORY_CHARGES: "強制性費用",
  SECTION_FEE_SOURCES: "資料來源",

  // 字段标签
  LABEL_LEVEL: "學段",
  LABEL_CATEGORY: "類型",
  LABEL_DISTRICT: "地區",
  LABEL_LANGUAGE: "教學語言",
  LABEL_WEBSITE: "網站",
  LABEL_TUITION: "學費",
  LABEL_OVERALL_TUITION: "總體學費",

  // 学费展示 (R3-4)
  TUITION_YEAR: "2025/26",
  TUITION_PENDING: "學費：待確認",
  TUITION_DSS_SOURCE: "資料來源：教育局直資學校學費表（2025/26）",
  TUITION_OTHER_SOURCE: "暫無統一官方學費表，稍後補充",

  // 总体学费展示 (R3-5)
  OVERALL_TUITION_LABEL: "總體學費（含強制性費用）",
  OVERALL_TUITION_PENDING: "總體學費：待確認",
  OVERALL_TUITION_NOTE: "總體學費 = 學費 + 強制性費用（capital levy / 強制性債券等）",
  OVERALL_TUITION_EXCLUDES: "不包括校車、午餐、校服及其他選擇性收費",

  // 占位文案 (R3-7)
  TUITION_NOT_PUBLISHED: "學校未公布統一學費表",
  NO_MANDATORY_CHARGES: "未發現強制性費用",

  // 强制性费用类型标签
  CHARGE_TYPE_CAPITAL_LEVY: "Capital Levy",
  CHARGE_TYPE_REFUNDABLE_DEBENTURE: "可退回債券",
  CHARGE_TYPE_OTHER_MANDATORY: "其他強制性費用",

  // 可退回状态标签
  REFUNDABLE_YES: "可退回",
  REFUNDABLE_NO: "不可退回",
  REFUNDABLE_UNKNOWN: "未確認",

  // 频率标签
  FREQUENCY_ONE_OFF: "一次性",
  FREQUENCY_ANNUAL: "每年",
  FREQUENCY_UNKNOWN: "未確認",

  // 来源等级标签
  EVIDENCE_SCHOOL_SITE: "學校官網",
  EVIDENCE_DOCUMENT_PDF: "官方 PDF",

  // 国际学校无费用数据时的兜底文案
  REFER_TO_SCHOOL_WEBSITE: "參考學校官網",
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

// ============================================
// Phase R3-5: 總體學費 + 結構化費用顯示工具函數
// ============================================

/**
 * 格式化總體學費（列表卡片用）
 * 規則：
 * - 若 overallMin/Max 均存在且 > 0：顯示 HK$min–max
 * - 若為單值（min === max）：顯示 HK$X
 * - 若任一組成部分缺失：顯示「總體學費：待確認」
 * - 絕不顯示 0 / 0-0
 *
 * @param fees 學校費用結構（可為 undefined）
 * @returns 格式化後的總體學費字符串
 */
export function formatOverallTuition(fees: SchoolFees | undefined): string {
  const range = calculateOverallTuition(fees);

  if (!range.isComplete) {
    return SCHOOL_TEXT.OVERALL_TUITION_PENDING;
  }

  if (range.min === range.max) {
    return `${SCHOOL_TEXT.OVERALL_TUITION_LABEL}：HK$${range.min.toLocaleString()}`;
  }

  return `${SCHOOL_TEXT.OVERALL_TUITION_LABEL}：HK$${range.min.toLocaleString()}-${range.max.toLocaleString()}`;
}

/**
 * 格式化學費區段列表（詳情頁用）
 * @param bands 學費區段列表
 * @returns 格式化後的學費區段數組
 */
export function formatTuitionBands(
  bands: TuitionBand[] | undefined
): Array<{ label: string; value: string }> {
  if (!bands || bands.length === 0) {
    return [{ label: "", value: SCHOOL_TEXT.TUITION_NOT_PUBLISHED }];
  }

  return bands.map((band) => {
    let value: string;
    if (band.amountMin <= 0 || band.amountMax <= 0) {
      value = SCHOOL_TEXT.PENDING;
    } else if (band.amountMin === band.amountMax) {
      value = `HK$${band.amountMin.toLocaleString()}`;
    } else {
      value = `HK$${band.amountMin.toLocaleString()}-${band.amountMax.toLocaleString()}`;
    }
    return { label: band.label, value };
  });
}

/**
 * 獲取強制性費用類型顯示標籤
 * @param type 費用類型
 * @returns 中文標籤
 */
export function getChargeTypeLabel(type: MandatoryChargeType): string {
  switch (type) {
    case "CAPITAL_LEVY":
      return SCHOOL_TEXT.CHARGE_TYPE_CAPITAL_LEVY;
    case "REFUNDABLE_DEBENTURE":
      return SCHOOL_TEXT.CHARGE_TYPE_REFUNDABLE_DEBENTURE;
    case "OTHER_MANDATORY":
      return SCHOOL_TEXT.CHARGE_TYPE_OTHER_MANDATORY;
    default:
      return type;
  }
}

/**
 * 獲取可退回狀態顯示標籤
 * @param refundable 可退回狀態
 * @returns 中文標籤
 */
export function getRefundableLabel(refundable: RefundableStatus): string {
  if (refundable === true) return SCHOOL_TEXT.REFUNDABLE_YES;
  if (refundable === false) return SCHOOL_TEXT.REFUNDABLE_NO;
  return SCHOOL_TEXT.REFUNDABLE_UNKNOWN;
}

/**
 * 獲取繳費頻率顯示標籤
 * @param frequency 繳費頻率
 * @returns 中文標籤
 */
export function getFrequencyLabel(frequency: ChargeFrequency): string {
  switch (frequency) {
    case "ONE_OFF":
      return SCHOOL_TEXT.FREQUENCY_ONE_OFF;
    case "ANNUAL":
      return SCHOOL_TEXT.FREQUENCY_ANNUAL;
    case "UNKNOWN":
      return SCHOOL_TEXT.FREQUENCY_UNKNOWN;
    default:
      return frequency;
  }
}

/**
 * 格式化強制性費用列表（詳情頁用）
 * @param charges 強制性費用列表
 * @returns 格式化後的費用項目數組
 */
export function formatMandatoryCharges(
  charges: MandatoryCharge[] | undefined
): Array<{
  label: string;
  amount: string;
  refundable: string;
  frequency: string;
  note?: string;
}> {
  if (!charges || charges.length === 0) {
    return [];
  }

  return charges.map((charge) => {
    let amount: string;
    if (charge.amountMin <= 0 || charge.amountMax <= 0) {
      amount = SCHOOL_TEXT.PENDING;
    } else if (charge.amountMin === charge.amountMax) {
      amount = `HK$${charge.amountMin.toLocaleString()}`;
    } else {
      amount = `HK$${charge.amountMin.toLocaleString()}-${charge.amountMax.toLocaleString()}`;
    }

    return {
      label: charge.label || getChargeTypeLabel(charge.type),
      amount,
      refundable: getRefundableLabel(charge.refundable),
      frequency: getFrequencyLabel(charge.frequency),
      note: charge.note,
    };
  });
}

/**
 * 格式化資料來源列表（詳情頁用）
 * @param sources 資料來源列表
 * @returns 格式化後的來源數組
 */
export function formatSourceNotes(
  sources: SourceNote[] | undefined
): Array<{
  title: string;
  url: string;
  retrievedAt: string;
  evidenceLabel: string;
}> {
  if (!sources || sources.length === 0) {
    return [];
  }

  return sources.map((source) => ({
    title: source.title,
    url: source.url,
    retrievedAt: source.retrievedAt,
    evidenceLabel:
      source.evidenceLevel === "SCHOOL_SITE"
        ? SCHOOL_TEXT.EVIDENCE_SCHOOL_SITE
        : SCHOOL_TEXT.EVIDENCE_DOCUMENT_PDF,
  }));
}

/**
 * 檢查是否有有效的費用數據可展示
 * @param fees 學校費用結構
 * @returns 是否有有效數據
 */
export function hasValidFeesData(fees: SchoolFees | undefined): boolean {
  if (!fees) return false;
  const range = calculateOverallTuition(fees);
  return range.isComplete;
}
