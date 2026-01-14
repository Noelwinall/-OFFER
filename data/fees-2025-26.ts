/**
 * Phase R3-5: 2025/26 學年費用數據
 *
 * 數據紀律（硬約束）：
 * - 僅錄入有明確證據、且標明學年 2025/26 的費用數據
 * - 不允許 AI 推斷、不允許跨校套用
 * - 費用幣種先只支持 HKD；非 HKD 一律標記為待確認
 * - 不修改現有 tuitionMin/tuitionMax 的 DSS 邏輯
 *
 * UI 層通過 school.id join 合併 fees
 */

import type { FeesDataMap } from "@/types/fees";

/**
 * 2025/26 學年費用數據
 * key: school.id (從 data/schools.ts 驗證)
 * value: SchoolFees
 *
 * 錄入日期: 2026-01-14
 * 驗證: node scripts/verify-fees-join.js
 */
export const feesData202526: FeesDataMap = {
  // ============================================
  // 1. CDNIS 加拿大國際學校 - 小學
  // Source: https://www.cdnis.edu.hk/admissions/tuition-fees
  // ============================================
  "edb_216011000523": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "EY1 (Half Day)", amountMin: 156300, amountMax: 156300 },
        { label: "EY2 (Full Day)", amountMin: 203100, amountMax: 203100 },
        { label: "Prep–G2", amountMin: 210900, amountMax: 210900 },
        { label: "G3", amountMin: 191800, amountMax: 191800 },
        { label: "G4–G5", amountMin: 193600, amountMax: 193600 },
        { label: "G6", amountMin: 212800, amountMax: 212800 },
      ],
    },
    mandatoryCharges: [
      {
        type: "CAPITAL_LEVY",
        label: "Annual Capital Levy",
        amountMin: 38000,
        amountMax: 38000,
        currency: "HKD",
        refundable: false,
        frequency: "ANNUAL",
        note: "EY1 及以上必須繳納；持有 debenture 可豁免",
      },
    ],
    sourceNotes: [
      {
        title: "CDNIS Tuition & Fees 2025/26",
        url: "https://www.cdnis.edu.hk/admissions/tuition-fees",
        retrievedAt: "2026-01-14",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  // ============================================
  // 2. CDNIS 加拿大國際學校 - 中學
  // ============================================
  "edb_216011000533": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "G7–G8", amountMin: 216600, amountMax: 216600 },
        { label: "G9–G10", amountMin: 237700, amountMax: 237700 },
        { label: "G11–G12", amountMin: 254300, amountMax: 254300 },
      ],
    },
    mandatoryCharges: [
      {
        type: "CAPITAL_LEVY",
        label: "Annual Capital Levy",
        amountMin: 38000,
        amountMax: 38000,
        currency: "HKD",
        refundable: false,
        frequency: "ANNUAL",
        note: "持有 debenture 可豁免",
      },
    ],
    sourceNotes: [
      {
        title: "CDNIS Tuition & Fees 2025/26",
        url: "https://www.cdnis.edu.hk/admissions/tuition-fees",
        retrievedAt: "2026-01-14",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  // ============================================
  // 3. Kellett School - 小學
  // Source: https://www.kellettschool.com/admissions/fees-debenture-information
  // ============================================
  "edb_215406000123": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "Reception", amountMin: 208800, amountMax: 208800 },
        { label: "Y1–Y6", amountMin: 214200, amountMax: 214200 },
      ],
    },
    mandatoryCharges: [
      {
        type: "CAPITAL_LEVY",
        label: "Annual Capital Levy",
        amountMin: 40000,
        amountMax: 40000,
        currency: "HKD",
        refundable: false,
        frequency: "ANNUAL",
        note: "2025年8月31日後的新錄取需繳納；不可退還",
      },
    ],
    sourceNotes: [
      {
        title: "Kellett School Fees & Debenture 2025/26",
        url: "https://www.kellettschool.com/admissions/fees-debenture-information",
        retrievedAt: "2026-01-14",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  // ============================================
  // 4. Kellett School - 中學
  // ============================================
  "edb_215406000433": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "Y7–Y11 (I/GCSE)", amountMin: 251400, amountMax: 251400 },
        { label: "Y12–Y13 (A Levels)", amountMin: 267100, amountMax: 267100 },
      ],
    },
    mandatoryCharges: [
      {
        type: "CAPITAL_LEVY",
        label: "Annual Capital Levy",
        amountMin: 40000,
        amountMax: 40000,
        currency: "HKD",
        refundable: false,
        frequency: "ANNUAL",
        note: "2025年8月31日後的新錄取需繳納；不可退還",
      },
    ],
    sourceNotes: [
      {
        title: "Kellett School Fees & Debenture 2025/26",
        url: "https://www.kellettschool.com/admissions/fees-debenture-information",
        retrievedAt: "2026-01-14",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  // ============================================
  // 5. ESF Island School - 中學
  // Source: https://www.esf.edu.hk/fee-levels-for-academic-year-2025-26-esf-schools/
  // ============================================
  "edb_170399000133": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "Y7–Y10", amountMin: 181100, amountMax: 181100 },
        { label: "Y11", amountMin: 159400, amountMax: 159400 },
        { label: "Y12–Y13", amountMin: 167600, amountMax: 167600 },
      ],
    },
    mandatoryCharges: [],
    sourceNotes: [
      {
        title: "ESF Fee Levels 2025/26",
        url: "https://www.esf.edu.hk/fee-levels-for-academic-year-2025-26-esf-schools/",
        retrievedAt: "2026-01-14",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  // ============================================
  // 6. HKIS 香港國際學校 - 小學
  // Source: https://www.hkis.edu.hk/admissions/tuition-fees
  // ============================================
  "edb_213772000123": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "R1–G5", amountMin: 224800, amountMax: 224800 },
      ],
    },
    mandatoryCharges: [
      {
        type: "CAPITAL_LEVY",
        label: "Annual Capital Levy",
        amountMin: 23000,
        amountMax: 23000,
        currency: "HKD",
        refundable: false,
        frequency: "ANNUAL",
      },
    ],
    sourceNotes: [
      {
        title: "HKIS Tuition & Fees 2025/26",
        url: "https://www.hkis.edu.hk/admissions/tuition-fees",
        retrievedAt: "2026-01-14",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  // ============================================
  // 7. HKIS 香港國際學校 - 中學
  // ============================================
  "edb_213772000233": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "G6–G8 (Middle School)", amountMin: 236200, amountMax: 236200 },
        { label: "G9–G12 (High School)", amountMin: 263300, amountMax: 263300 },
      ],
    },
    mandatoryCharges: [
      {
        type: "CAPITAL_LEVY",
        label: "Annual Capital Levy",
        amountMin: 23000,
        amountMax: 23000,
        currency: "HKD",
        refundable: false,
        frequency: "ANNUAL",
      },
    ],
    sourceNotes: [
      {
        title: "HKIS Tuition & Fees 2025/26",
        url: "https://www.hkis.edu.hk/admissions/tuition-fees",
        retrievedAt: "2026-01-14",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },
};

/**
 * 根據學校 ID 獲取費用數據
 * @param schoolId 學校 ID
 * @returns 費用數據，若無則返回 undefined
 */
export function getSchoolFees(schoolId: string) {
  return feesData202526[schoolId];
}

/**
 * 檢查學校是否有費用數據
 * @param schoolId 學校 ID
 * @returns 是否有費用數據
 */
export function hasSchoolFees(schoolId: string): boolean {
  return schoolId in feesData202526;
}
