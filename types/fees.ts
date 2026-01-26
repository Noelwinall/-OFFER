/**
 * Phase R3-5: 國際/私校費用結構類型定義
 *
 * 本文件定義學費 + 強制性費用的結構化體系
 * - 不修改現有 tuitionMin/tuitionMax 的 DSS 邏輯
 * - 僅錄入有明確證據、標明學年 2025/26 的費用數據
 */

/**
 * 學費區段（按年級分）
 */
export interface TuitionBand {
  /** 年級標籤，如 "Y1–Y2"、"S1–S3" */
  label: string;
  /** 最低金額（港幣） */
  amountMin: number;
  /** 最高金額（港幣） */
  amountMax: number;
}

/**
 * 強制性費用類型
 */
export type MandatoryChargeType =
  | "CAPITAL_LEVY"           // Capital Levy / Building Levy / Development Fee
  | "REFUNDABLE_DEBENTURE"   // 可退回債券
  | "OTHER_MANDATORY";       // 其他強制性費用

/**
 * 可退回狀態
 */
export type RefundableStatus = true | false | "UNKNOWN";

/**
 * 繳費頻率
 */
export type ChargeFrequency = "ONE_OFF" | "ANNUAL" | "UNKNOWN";

/**
 * 強制性費用項目
 */
export interface MandatoryCharge {
  /** 費用類型 */
  type: MandatoryChargeType;
  /** 顯示標籤 */
  label: string;
  /** 最低金額 */
  amountMin: number;
  /** 最高金額 */
  amountMax: number;
  /** 幣種（目前只支持 HKD） */
  currency: "HKD";
  /** 是否可退回 */
  refundable: RefundableStatus;
  /** 繳費頻率 */
  frequency: ChargeFrequency;
  /** 備註（簡短說明） */
  note?: string;
}

/**
 * 證據來源等級
 */
export type EvidenceLevel = "SCHOOL_SITE" | "DOCUMENT_PDF";

/**
 * 資料來源記錄
 */
export interface SourceNote {
  /** 來源標題 */
  title: string;
  /** 來源網址 */
  url: string;
  /** 資料獲取日期 */
  retrievedAt: string; // YYYY-MM-DD
  /** 證據等級 */
  evidenceLevel: EvidenceLevel;
}

/**
 * 學費結構
 */
export interface TuitionStructure {
  /** 幣種 */
  currency: "HKD";
  /** 按年級段區分的學費 */
  bands: TuitionBand[];
}

/**
 * 學校費用完整結構
 */
export interface SchoolFees {
  /** 學年 */
  schoolYear: "2024/25" | "2025/26";
  /** 學費結構 */
  tuition: TuitionStructure;
  /** 強制性費用列表 */
  mandatoryCharges: MandatoryCharge[];
  /** 資料來源 */
  sourceNotes: SourceNote[];
}

/**
 * 費用數據映射表類型
 * key 為學校 ID
 */
export type FeesDataMap = Record<string, SchoolFees>;

/**
 * 計算總體學費區間
 * overallMin = tuitionMin + mandatoryMin
 * overallMax = tuitionMax + mandatoryMax
 */
export interface OverallTuitionRange {
  /** 最低總費用 */
  min: number;
  /** 最高總費用 */
  max: number;
  /** 是否有完整數據 */
  isComplete: boolean;
}

/**
 * 計算總體學費
 * @param fees 學校費用結構
 * @returns 總體學費區間，若數據不完整則 isComplete 為 false
 */
export function calculateOverallTuition(fees: SchoolFees | undefined): OverallTuitionRange {
  if (!fees) {
    return { min: 0, max: 0, isComplete: false };
  }

  // 計算學費區間
  const tuitionBands = fees.tuition.bands;
  if (tuitionBands.length === 0) {
    return { min: 0, max: 0, isComplete: false };
  }

  // 取所有 band 的最低和最高
  const tuitionMin = Math.min(...tuitionBands.map((b) => b.amountMin));
  const tuitionMax = Math.max(...tuitionBands.map((b) => b.amountMax));

  // 計算強制性費用總和（僅計算一次性和年度費用）
  let mandatoryMin = 0;
  let mandatoryMax = 0;

  for (const charge of fees.mandatoryCharges) {
    // 只計算一次性費用（首年）或年度費用
    if (charge.frequency === "ONE_OFF" || charge.frequency === "ANNUAL") {
      mandatoryMin += charge.amountMin;
      mandatoryMax += charge.amountMax;
    } else if (charge.frequency === "UNKNOWN") {
      // 未確認的也要算入
      mandatoryMin += charge.amountMin;
      mandatoryMax += charge.amountMax;
    }
  }

  const overallMin = tuitionMin + mandatoryMin;
  const overallMax = tuitionMax + mandatoryMax;

  // 檢查是否有效
  if (overallMin <= 0 || overallMax <= 0) {
    return { min: 0, max: 0, isComplete: false };
  }

  return { min: overallMin, max: overallMax, isComplete: true };
}
