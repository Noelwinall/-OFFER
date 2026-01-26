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

  // ============================================
  // 8. Harrow International School Hong Kong - 小學
  // Source: https://www.harrowhongkong.hk/his/admissions/fees/
  // ============================================
  "edb_590800000123": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "Y1–Y5", amountMin: 201314, amountMax: 201314 },
      ],
    },
    mandatoryCharges: [
      {
        type: "CAPITAL_LEVY",
        label: "Annual Capital Levy",
        amountMin: 60000,
        amountMax: 60000,
        currency: "HKD",
        refundable: false,
        frequency: "ANNUAL",
        note: "無 debenture/capital certificate 需繳納",
      },
    ],
    sourceNotes: [
      {
        title: "Harrow HK Fees 2025/26",
        url: "https://www.harrowhongkong.hk/his/admissions/fees/",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  // ============================================
  // 9. Harrow International School Hong Kong - 中學
  // ============================================
  "edb_590800000133": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "Y6–Y8", amountMin: 229949, amountMax: 229949 },
        { label: "Y9–Y11", amountMin: 229949, amountMax: 229949 },
        { label: "Y12–Y13", amountMin: 239070, amountMax: 239070 },
      ],
    },
    mandatoryCharges: [
      {
        type: "CAPITAL_LEVY",
        label: "Annual Capital Levy",
        amountMin: 60000,
        amountMax: 60000,
        currency: "HKD",
        refundable: false,
        frequency: "ANNUAL",
        note: "無 debenture/capital certificate 需繳納",
      },
    ],
    sourceNotes: [
      {
        title: "Harrow HK Fees 2025/26",
        url: "https://www.harrowhongkong.hk/his/admissions/fees/",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  // ============================================
  // 10. American International School - 小學 (Primary Branch)
  // Source: https://www.ais.edu.hk/admissions/tuition-fees/
  // ============================================
  "edb_527882000123": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "G1–G4", amountMin: 152800, amountMax: 152800 },
      ],
    },
    mandatoryCharges: [
      {
        type: "CAPITAL_LEVY",
        label: "Annual Capital Levy",
        amountMin: 6000,
        amountMax: 12000,
        currency: "HKD",
        refundable: false,
        frequency: "ANNUAL",
        note: "1st child: $12,000; 2nd: $8,000; 3rd+: $6,000",
      },
    ],
    sourceNotes: [
      {
        title: "AIS Tuition & Fees 2025/26",
        url: "https://www.ais.edu.hk/admissions/tuition-fees/",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  // ============================================
  // 11. American International School - 中學 (Middle School)
  // ============================================
  "edb_287695000223": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "G5–G8", amountMin: 164400, amountMax: 164400 },
      ],
    },
    mandatoryCharges: [
      {
        type: "CAPITAL_LEVY",
        label: "Annual Capital Levy",
        amountMin: 6000,
        amountMax: 12000,
        currency: "HKD",
        refundable: false,
        frequency: "ANNUAL",
        note: "1st child: $12,000; 2nd: $8,000; 3rd+: $6,000",
      },
    ],
    sourceNotes: [
      {
        title: "AIS Tuition & Fees 2025/26",
        url: "https://www.ais.edu.hk/admissions/tuition-fees/",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  // ============================================
  // 12. American International School - 中學 (High School)
  // ============================================
  "edb_287695000233": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "G9–G12", amountMin: 180400, amountMax: 180400 },
      ],
    },
    mandatoryCharges: [
      {
        type: "CAPITAL_LEVY",
        label: "Annual Capital Levy",
        amountMin: 6000,
        amountMax: 12000,
        currency: "HKD",
        refundable: false,
        frequency: "ANNUAL",
        note: "1st child: $12,000; 2nd: $8,000; 3rd+: $6,000",
      },
    ],
    sourceNotes: [
      {
        title: "AIS Tuition & Fees 2025/26",
        url: "https://www.ais.edu.hk/admissions/tuition-fees/",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  // ============================================
  // 13. Australian International School Hong Kong - 小學
  // Source: https://www.aishk.edu.hk/admissions
  // ============================================
  "edb_216275000623": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "Reception", amountMin: 148800, amountMax: 148800 },
        { label: "Prep–Y6", amountMin: 173800, amountMax: 173800 },
      ],
    },
    mandatoryCharges: [
      {
        type: "CAPITAL_LEVY",
        label: "Annual Capital Levy",
        amountMin: 21840,
        amountMax: 21840,
        currency: "HKD",
        refundable: false,
        frequency: "ANNUAL",
      },
    ],
    sourceNotes: [
      {
        title: "AISHK Fees 2025/26",
        url: "https://www.aishk.edu.hk/admissions",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  // ============================================
  // 14. Australian International School Hong Kong - 中學
  // ============================================
  "edb_216275000633": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "Y7–Y10", amountMin: 200500, amountMax: 200500 },
        { label: "Y11–Y12 (HSC)", amountMin: 210400, amountMax: 210400 },
        { label: "Y11–Y12 (IBDP)", amountMin: 252800, amountMax: 252800 },
      ],
    },
    mandatoryCharges: [
      {
        type: "CAPITAL_LEVY",
        label: "Annual Capital Levy",
        amountMin: 21840,
        amountMax: 21840,
        currency: "HKD",
        refundable: false,
        frequency: "ANNUAL",
      },
    ],
    sourceNotes: [
      {
        title: "AISHK Fees 2025/26",
        url: "https://www.aishk.edu.hk/admissions",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  // ============================================
  // 15. Discovery Bay International School - 小學
  // Source: https://www.dbis.edu.hk/school-admissions
  // ============================================
  "edb_230987000123": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "Y1–Y6", amountMin: 143700, amountMax: 143700 },
      ],
    },
    mandatoryCharges: [],
    sourceNotes: [
      {
        title: "DBIS Fees 2025/26",
        url: "https://www.dbis.edu.hk/school-admissions",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  // ============================================
  // 16. Discovery Bay International School - 中學
  // ============================================
  "edb_230987000233": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "Y7–Y11", amountMin: 190700, amountMax: 190700 },
        { label: "Y12–Y13", amountMin: 196900, amountMax: 196900 },
      ],
    },
    mandatoryCharges: [],
    sourceNotes: [
      {
        title: "DBIS Fees 2025/26",
        url: "https://www.dbis.edu.hk/school-admissions",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  // ============================================
  // 17. Hong Kong Academy - 小學
  // Source: https://hkacademy.edu.hk/school-fees/
  // ============================================
  "edb_539155000323": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "K–G5", amountMin: 221800, amountMax: 221800 },
      ],
    },
    mandatoryCharges: [
      {
        type: "CAPITAL_LEVY",
        label: "Annual Capital Levy",
        amountMin: 32000,
        amountMax: 32000,
        currency: "HKD",
        refundable: false,
        frequency: "ANNUAL",
        note: "持有 debenture 可豁免",
      },
    ],
    sourceNotes: [
      {
        title: "HKA School Fees 2025/26",
        url: "https://hkacademy.edu.hk/school-fees/",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  // ============================================
  // 18. Hong Kong Academy - 中學
  // ============================================
  "edb_539155000333": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "G6–G8", amountMin: 244100, amountMax: 244100 },
        { label: "G9–G10", amountMin: 254400, amountMax: 254400 },
        { label: "G11–G12", amountMin: 264700, amountMax: 264700 },
      ],
    },
    mandatoryCharges: [
      {
        type: "CAPITAL_LEVY",
        label: "Annual Capital Levy",
        amountMin: 32000,
        amountMax: 32000,
        currency: "HKD",
        refundable: false,
        frequency: "ANNUAL",
        note: "持有 debenture 可豁免",
      },
    ],
    sourceNotes: [
      {
        title: "HKA School Fees 2025/26",
        url: "https://hkacademy.edu.hk/school-fees/",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  // ============================================
  // 19. Norwegian International School - 小學
  // Source: https://nis.edu.hk/admission/
  // ============================================
  "edb_215520000123": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "Y1–Y6", amountMin: 133200, amountMax: 133200 },
      ],
    },
    mandatoryCharges: [
      {
        type: "CAPITAL_LEVY",
        label: "Annual Capital Levy",
        amountMin: 14620,
        amountMax: 14620,
        currency: "HKD",
        refundable: false,
        frequency: "ANNUAL",
      },
    ],
    sourceNotes: [
      {
        title: "NIS Admission Fees 2025/26",
        url: "https://nis.edu.hk/admission/",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  // ============================================
  // 20. German Swiss International School - 小學 (English Stream)
  // Source: https://www.gsis.edu.hk/en/admissions/fees-and-debenture
  // ============================================
  "edb_214558000123": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "Y1–Y6 (Primary)", amountMin: 203700, amountMax: 203700 },
      ],
    },
    mandatoryCharges: [],
    sourceNotes: [
      {
        title: "GSIS Fees 2025/26",
        url: "https://www.gsis.edu.hk/en/admissions/fees-and-debenture",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  // ============================================
  // 21. International Christian School - 小學
  // Source: https://www.international-schools-database.com/in/hong-kong/international-christian-school-hong-kong/fees
  // ============================================
  "edb_569836000123": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "Pre-G1–G5 (Elementary)", amountMin: 148400, amountMax: 148400 },
      ],
    },
    mandatoryCharges: [],
    sourceNotes: [
      {
        title: "ICS Fees 2025/26",
        url: "https://www.ics.edu.hk/",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  // ============================================
  // 22. International Christian School - 中學
  // ============================================
  "edb_569836000133": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "G6–G8 (Middle School)", amountMin: 196600, amountMax: 196600 },
        { label: "G9–G12 (High School)", amountMin: 201500, amountMax: 201500 },
      ],
    },
    mandatoryCharges: [],
    sourceNotes: [
      {
        title: "ICS Fees 2025/26",
        url: "https://www.ics.edu.hk/",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  // ============================================
  // 23. Japanese International School - 小學
  // Source: https://es.jis.edu.hk/index.php/admission/fees
  // ============================================
  "edb_522775000123": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "All Years (English Section)", amountMin: 140460, amountMax: 140460 },
      ],
    },
    mandatoryCharges: [
      {
        type: "CAPITAL_LEVY",
        label: "Annual Capital Levy",
        amountMin: 15960,
        amountMax: 15960,
        currency: "HKD",
        refundable: false,
        frequency: "ANNUAL",
      },
    ],
    sourceNotes: [
      {
        title: "JIS Fees 2025/26",
        url: "https://es.jis.edu.hk/index.php/admission/fees",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  // ============================================
  // 24. Shrewsbury International School Hong Kong - 小學
  // Source: https://www.shrewsbury.edu.hk/admissions/fees/
  // ============================================
  "edb_607525000123": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "Nursery", amountMin: 143500, amountMax: 143500 },
        { label: "Reception", amountMin: 154000, amountMax: 154000 },
        { label: "Y1–Y6", amountMin: 177000, amountMax: 177000 },
      ],
    },
    mandatoryCharges: [
      {
        type: "CAPITAL_LEVY",
        label: "Annual Capital Levy",
        amountMin: 50000,
        amountMax: 50000,
        currency: "HKD",
        refundable: false,
        frequency: "ANNUAL",
        note: "持有 Capital Certificate 可豁免",
      },
    ],
    sourceNotes: [
      {
        title: "Shrewsbury HK Fees 2025/26",
        url: "https://www.shrewsbury.edu.hk/admissions/fees/",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  // ============================================
  // 25. Nord Anglia International School - 小學 (Lam Tin)
  // Source: https://www.nordangliaeducation.com/nais-hong-kong/admissions/tuition-fees
  // Note: 詳細年級費用待確認，使用搜索結果範圍
  // ============================================
  "edb_598356000223": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "Primary (approx)", amountMin: 184380, amountMax: 205700 },
      ],
    },
    mandatoryCharges: [],
    sourceNotes: [
      {
        title: "NAIS HK Fees 2025/26",
        url: "https://www.nordangliaeducation.com/nais-hong-kong/admissions/tuition-fees",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  // ============================================
  // 26. Nord Anglia International School - 中學 (Kwun Tong)
  // ============================================
  "edb_598356000333": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "Secondary (approx)", amountMin: 212360, amountMax: 214340 },
      ],
    },
    mandatoryCharges: [],
    sourceNotes: [
      {
        title: "NAIS HK Fees 2025/26",
        url: "https://www.nordangliaeducation.com/nais-hong-kong/admissions/tuition-fees",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  // ============================================
  // 27. Concordia International School - 中學
  // Source: https://www.cihs.edu.hk/
  // Note: 詳細年級費用待確認
  // ============================================
  "edb_215996000133": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "G7–G12 (approx)", amountMin: 129500, amountMax: 150950 },
      ],
    },
    mandatoryCharges: [],
    sourceNotes: [
      {
        title: "Concordia Fees 2025/26",
        url: "https://www.cihs.edu.hk/",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  // ============================================
  // 28. Korean International School - 小學
  // Source: https://www.kis.edu.hk/fees/
  // ============================================
  "edb_216216000123": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "Reception", amountMin: 97100, amountMax: 97100 },
        { label: "Primary (Y1–Y6)", amountMin: 122900, amountMax: 122900 },
      ],
    },
    mandatoryCharges: [],
    sourceNotes: [
      {
        title: "KIS Fees 2025/26",
        url: "https://www.kis.edu.hk/fees/",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  // ============================================
  // 29. Korean International School - 中學
  // ============================================
  "edb_216216000133": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "Secondary (Y7–Y13)", amountMin: 137000, amountMax: 137000 },
      ],
    },
    mandatoryCharges: [],
    sourceNotes: [
      {
        title: "KIS Fees 2025/26",
        url: "https://www.kis.edu.hk/fees/",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  // ============================================
  // 30. Chinese International School - 小學
  // Source: https://www.cis.edu.hk/admissions/school-fees
  // ============================================
  "edb_215589000123": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "K3–G5", amountMin: 316800, amountMax: 316800 },
      ],
    },
    mandatoryCharges: [
      {
        type: "CAPITAL_LEVY",
        label: "Annual Capital Levy",
        amountMin: 30200,
        amountMax: 30200,
        currency: "HKD",
        refundable: false,
        frequency: "ANNUAL",
      },
    ],
    sourceNotes: [
      {
        title: "CIS School Fees 2025/26",
        url: "https://www.cis.edu.hk/admissions/school-fees",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  // ============================================
  // 31. Chinese International School - 中學
  // ============================================
  "edb_215589000133": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "G6–G10", amountMin: 368500, amountMax: 368500 },
        { label: "G11–G12", amountMin: 373000, amountMax: 373000 },
      ],
    },
    mandatoryCharges: [
      {
        type: "CAPITAL_LEVY",
        label: "Annual Capital Levy",
        amountMin: 30200,
        amountMax: 30200,
        currency: "HKD",
        refundable: false,
        frequency: "ANNUAL",
      },
    ],
    sourceNotes: [
      {
        title: "CIS School Fees 2025/26",
        url: "https://www.cis.edu.hk/admissions/school-fees",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  // ============================================
  // 32. French International School - 小學 (International Stream)
  // Source: https://www.fis.edu.hk/admission/tuition-fees/
  // ============================================
  "edb_214949000123": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "Nursery & Reception", amountMin: 151984, amountMax: 151984 },
        { label: "Y1–Y6", amountMin: 161373, amountMax: 161373 },
      ],
    },
    mandatoryCharges: [],
    sourceNotes: [
      {
        title: "FIS Tuition Fees 2025/26",
        url: "https://www.fis.edu.hk/admission/tuition-fees/",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  // ============================================
  // 33. French International School - 中學 (International Stream)
  // ============================================
  "edb_214949000433": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "Y7–Y11", amountMin: 202000, amountMax: 202000 },
        { label: "Y12–Y13", amountMin: 217599, amountMax: 217599 },
      ],
    },
    mandatoryCharges: [],
    sourceNotes: [
      {
        title: "FIS Tuition Fees 2025/26",
        url: "https://www.fis.edu.hk/admission/tuition-fees/",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  // ============================================
  // 34. Malvern College Hong Kong - 小學
  // Source: https://www.malverncollege.org.hk/fees-and-charges/
  // ============================================
  "edb_606766000123": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "Prep 1–6 (PYP)", amountMin: 198860, amountMax: 198860 },
      ],
    },
    mandatoryCharges: [
      {
        type: "CAPITAL_LEVY",
        label: "Annual Capital Levy",
        amountMin: 42000,
        amountMax: 42000,
        currency: "HKD",
        refundable: false,
        frequency: "ANNUAL",
        note: "持有 INR/CNR 可豁免",
      },
    ],
    sourceNotes: [
      {
        title: "Malvern College HK Fees 2025/26",
        url: "https://www.malverncollege.org.hk/fees-and-charges/",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  // ============================================
  // 35. Malvern College Hong Kong - 中學
  // ============================================
  "edb_606766000133": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "FY1–3, Remove, Hundred (MYP)", amountMin: 226210, amountMax: 226210 },
        { label: "Lower & Upper Sixth (DP)", amountMin: 226210, amountMax: 226210 },
      ],
    },
    mandatoryCharges: [
      {
        type: "CAPITAL_LEVY",
        label: "Annual Capital Levy",
        amountMin: 42000,
        amountMax: 42000,
        currency: "HKD",
        refundable: false,
        frequency: "ANNUAL",
        note: "持有 INR/CNR 可豁免",
      },
    ],
    sourceNotes: [
      {
        title: "Malvern College HK Fees 2025/26",
        url: "https://www.malverncollege.org.hk/fees-and-charges/",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  // ============================================
  // 36. DSC International School - 小學
  // Source: https://www.dsc.edu.hk/admissions/tuition-fees
  // ============================================
  "edb_215791000123": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "Pre-G1", amountMin: 147100, amountMax: 147100 },
        { label: "G1–G6", amountMin: 155700, amountMax: 155700 },
      ],
    },
    mandatoryCharges: [],
    sourceNotes: [
      {
        title: "DSC Tuition Fees 2025/26",
        url: "https://www.dsc.edu.hk/admissions/tuition-fees",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  // ============================================
  // 37. DSC International School - 中學
  // ============================================
  "edb_215791000133": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "G7–G8", amountMin: 155700, amountMax: 155700 },
        { label: "G9–G10", amountMin: 161500, amountMax: 161500 },
        { label: "G11–G12", amountMin: 168100, amountMax: 168100 },
      ],
    },
    mandatoryCharges: [],
    sourceNotes: [
      {
        title: "DSC Tuition Fees 2025/26",
        url: "https://www.dsc.edu.hk/admissions/tuition-fees",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  // ============================================
  // 38. Christian Alliance International School - 小學
  // Source: https://www.caisbv.edu.hk/admissions/fees
  // ============================================
  "edb_605557000123": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "Preparatory", amountMin: 141500, amountMax: 141500 },
        { label: "G1–G3", amountMin: 157600, amountMax: 157600 },
        { label: "G4", amountMin: 165700, amountMax: 165700 },
        { label: "G5", amountMin: 177700, amountMax: 177700 },
        { label: "G6", amountMin: 190000, amountMax: 190000 },
      ],
    },
    mandatoryCharges: [
      {
        type: "CAPITAL_LEVY",
        label: "Annual Capital Levy",
        amountMin: 30000,
        amountMax: 30000,
        currency: "HKD",
        refundable: false,
        frequency: "ANNUAL",
        note: "無 Capital Note 需繳納",
      },
    ],
    sourceNotes: [
      {
        title: "CAIS Fees 2025/26",
        url: "https://www.caisbv.edu.hk/admissions/fees",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  // ============================================
  // 39. Christian Alliance International School - 中學
  // ============================================
  "edb_605557000133": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "G7–G9", amountMin: 205400, amountMax: 205400 },
        { label: "G10–G12", amountMin: 224600, amountMax: 224600 },
        { label: "IB Diploma (G11–G12)", amountMin: 237000, amountMax: 237000 },
      ],
    },
    mandatoryCharges: [
      {
        type: "CAPITAL_LEVY",
        label: "Annual Capital Levy",
        amountMin: 30000,
        amountMax: 30000,
        currency: "HKD",
        refundable: false,
        frequency: "ANNUAL",
        note: "無 Capital Note 需繳納",
      },
    ],
    sourceNotes: [
      {
        title: "CAIS Fees 2025/26",
        url: "https://www.caisbv.edu.hk/admissions/fees",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  // ============================================
  // 40. ICHK Hong Lok Yuen - 小學
  // Source: https://ichkhly.edu.hk/admissions/dates-fees-more/
  // ============================================
  "edb_230979000123": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "Nursery–Y6 (Full-time)", amountMin: 145110, amountMax: 145110 },
      ],
    },
    mandatoryCharges: [
      {
        type: "CAPITAL_LEVY",
        label: "Annual Capital Levy",
        amountMin: 20500,
        amountMax: 20500,
        currency: "HKD",
        refundable: false,
        frequency: "ANNUAL",
      },
    ],
    sourceNotes: [
      {
        title: "ICHK HLY Fees 2025/26",
        url: "https://ichkhly.edu.hk/admissions/dates-fees-more/",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  // ============================================
  // 41. Lantau International School - 小學
  // Source: https://www.lis.edu.hk/about-us/fees/
  // ============================================
  "edb_518620000123": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "Reception", amountMin: 79100, amountMax: 79100 },
        { label: "P1–P6", amountMin: 103000, amountMax: 103000 },
      ],
    },
    mandatoryCharges: [],
    sourceNotes: [
      {
        title: "LIS Fees 2025/26",
        url: "https://www.lis.edu.hk/about-us/fees/",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  // ============================================
  // 42. Kingston International School - 小學
  // Source: https://www.kingston.edu.hk/admissions/school-fees
  // ============================================
  "edb_541915000123": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "Y1–Y2", amountMin: 155000, amountMax: 155000 },
        { label: "Y3–Y4", amountMin: 165000, amountMax: 165000 },
        { label: "Y5–Y6", amountMin: 175000, amountMax: 175000 },
      ],
    },
    mandatoryCharges: [],
    sourceNotes: [
      {
        title: "Kingston Fees 2025/26",
        url: "https://www.kingston.edu.hk/admissions/school-fees",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  // ============================================
  // 43. Yew Chung International School - 小學 (九龍塘)
  // Source: YCHK-SchoolFeesAndPolicies_2025-26_Pending Approval.pdf
  // 原文: "Years 1 - 6 ... Annual Tuition Fees $265,420"
  // ============================================
  "edb_325147000223": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "Y1–Y6", amountMin: 265420, amountMax: 265420 },
      ],
    },
    mandatoryCharges: [],
    sourceNotes: [
      {
        title: "YCIS HK School Fees 2025/26 PDF",
        url: "https://object.ycyw.com/media-library/ycis-hk/resources/admissions/YCHK-SchoolFeesAndPolicies_2025-26_Pending%20Approval.pdf",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
        note: "拟议学费，待教育局审批 (Pending approval from EDB)",
      },
    ],
  },

  // ============================================
  // 44. Yew Chung International School - 小學 (將軍澳)
  // 原文: "Years 1 - 6 ... Annual Tuition Fees $265,420"
  // ============================================
  "edb_325147000623": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "Y1–Y6", amountMin: 265420, amountMax: 265420 },
      ],
    },
    mandatoryCharges: [],
    sourceNotes: [
      {
        title: "YCIS HK School Fees 2025/26 PDF",
        url: "https://object.ycyw.com/media-library/ycis-hk/resources/admissions/YCHK-SchoolFeesAndPolicies_2025-26_Pending%20Approval.pdf",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
        note: "拟议学费，待教育局审批 (Pending approval from EDB)",
      },
    ],
  },

  // ============================================
  // 45. Yew Chung International School - 小學 (森麻實道)
  // 原文: "Years 1 - 6 ... Annual Tuition Fees $265,420"
  // ============================================
  "edb_325147000423": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "Y1–Y6", amountMin: 265420, amountMax: 265420 },
      ],
    },
    mandatoryCharges: [],
    sourceNotes: [
      {
        title: "YCIS HK School Fees 2025/26 PDF",
        url: "https://object.ycyw.com/media-library/ycis-hk/resources/admissions/YCHK-SchoolFeesAndPolicies_2025-26_Pending%20Approval.pdf",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
        note: "拟议学费，待教育局审批 (Pending approval from EDB)",
      },
    ],
  },

  // ============================================
  // 46. Yew Chung International School - 中學
  // 原文: "Years 7 - 11 / IB Pathway ... Annual Tuition Fees $266,040"
  // 原文: "Years 12 - 13 ... Annual Tuition Fees $272,140"
  // ============================================
  "edb_567450000133": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "Y7–Y11 / IB Pathway", amountMin: 266040, amountMax: 266040 },
        { label: "Y12–Y13", amountMin: 272140, amountMax: 272140 },
      ],
    },
    mandatoryCharges: [],
    sourceNotes: [
      {
        title: "YCIS HK School Fees 2025/26 PDF",
        url: "https://object.ycyw.com/media-library/ycis-hk/resources/admissions/YCHK-SchoolFeesAndPolicies_2025-26_Pending%20Approval.pdf",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
        note: "拟议学费，待教育局审批 (Pending approval from EDB)",
      },
    ],
  },

  // ============================================
  // 47-49. Yew Chung International School - 幼稚園 (3 campuses)
  // 原文: "Two's Programme Half Day ... Annual Tuition Fees $134,728"
  // 原文: "Two's Programme Whole Day ... Annual Tuition Fees $223,036"
  // 原文: "Three's Programme Whole Day ... Annual Tuition Fees $240,801"
  // 原文: "Four's Programme Whole Day ... Annual Tuition Fees $249,216"
  // 原文: "Five's Programme Whole Day ... Annual Tuition Fees $261,536"
  // ============================================
  "edb_325147000611": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "Two's Half Day", amountMin: 134728, amountMax: 134728 },
        { label: "Two's Whole Day", amountMin: 223036, amountMax: 223036 },
        { label: "Three's Whole Day", amountMin: 240801, amountMax: 240801 },
        { label: "Four's Whole Day", amountMin: 249216, amountMax: 249216 },
      ],
    },
    mandatoryCharges: [],
    sourceNotes: [
      {
        title: "YCIS HK School Fees 2025/26 PDF",
        url: "https://object.ycyw.com/media-library/ycis-hk/resources/admissions/YCHK-SchoolFeesAndPolicies_2025-26_Pending%20Approval.pdf",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
        note: "拟议学费，待教育局审批 (Pending approval from EDB)",
      },
    ],
  },
  "edb_325147000612": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "Two's Half Day", amountMin: 134728, amountMax: 134728 },
        { label: "Two's Whole Day", amountMin: 223036, amountMax: 223036 },
        { label: "Three's Whole Day", amountMin: 240801, amountMax: 240801 },
        { label: "Four's Whole Day", amountMin: 249216, amountMax: 249216 },
      ],
    },
    mandatoryCharges: [],
    sourceNotes: [
      {
        title: "YCIS HK School Fees 2025/26 PDF",
        url: "https://object.ycyw.com/media-library/ycis-hk/resources/admissions/YCHK-SchoolFeesAndPolicies_2025-26_Pending%20Approval.pdf",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
        note: "拟议学费，待教育局审批 (Pending approval from EDB)",
      },
    ],
  },
  "edb_325147000613": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "Two's Half Day", amountMin: 134728, amountMax: 134728 },
        { label: "Two's Whole Day", amountMin: 223036, amountMax: 223036 },
        { label: "Three's Whole Day", amountMin: 240801, amountMax: 240801 },
        { label: "Four's Whole Day", amountMin: 249216, amountMax: 249216 },
      ],
    },
    mandatoryCharges: [],
    sourceNotes: [
      {
        title: "YCIS HK School Fees 2025/26 PDF",
        url: "https://object.ycyw.com/media-library/ycis-hk/resources/admissions/YCHK-SchoolFeesAndPolicies_2025-26_Pending%20Approval.pdf",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
        note: "拟议学费，待教育局审批 (Pending approval from EDB)",
      },
    ],
  },

  // ============================================
  // 50-51. ESF Tsing Yi International Kindergarten
  // 原文: "2025/26 Annual Tuition Fees (HK$) 106,600"
  // ============================================
  "edb_532541000111": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [{ label: "K1–K2", amountMin: 106600, amountMax: 106600 }],
    },
    mandatoryCharges: [],
    sourceNotes: [
      {
        title: "ESF Fee Levels 2025/26 - Tsing Yi IK",
        url: "https://www.esf.edu.hk/fee-levels-for-academic-year-2025-26-esf-tyk/",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },
  "edb_532541000112": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [{ label: "K1–K2", amountMin: 106600, amountMax: 106600 }],
    },
    mandatoryCharges: [],
    sourceNotes: [
      {
        title: "ESF Fee Levels 2025/26 - Tsing Yi IK",
        url: "https://www.esf.edu.hk/fee-levels-for-academic-year-2025-26-esf-tyk/",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  // ============================================
  // 52-53. ESF Wu Kai Sha International Kindergarten
  // 原文: "2025-26 Annual Tuition Fee: HK$111,400"
  // ============================================
  "edb_578509000111": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [{ label: "K1–K2", amountMin: 111400, amountMax: 111400 }],
    },
    mandatoryCharges: [],
    sourceNotes: [
      {
        title: "ESF Fee Levels 2025/26 - Wu Kai Sha IK",
        url: "https://www.esf.edu.hk/fee-levels-for-academic-year-2025-26-esf-wksk/",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },
  "edb_578509000112": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [{ label: "K1–K2", amountMin: 111400, amountMax: 111400 }],
    },
    mandatoryCharges: [],
    sourceNotes: [
      {
        title: "ESF Fee Levels 2025/26 - Wu Kai Sha IK",
        url: "https://www.esf.edu.hk/fee-levels-for-academic-year-2025-26-esf-wksk/",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  // ============================================
  // 54-55. ESF Tung Chung International Kindergarten
  // 原文: "English stream 109,100" / "Bilingual stream 126,600"
  // ============================================
  "edb_600350000111": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "English Stream", amountMin: 109100, amountMax: 109100 },
        { label: "Bilingual Stream", amountMin: 126600, amountMax: 126600 },
      ],
    },
    mandatoryCharges: [],
    sourceNotes: [
      {
        title: "ESF Fee Levels 2025/26 - Tung Chung IK",
        url: "https://www.esf.edu.hk/fee-levels-for-academic-year-2025-26-esf-tck/",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },
  "edb_600350000112": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "English Stream", amountMin: 109100, amountMax: 109100 },
        { label: "Bilingual Stream", amountMin: 126600, amountMax: 126600 },
      ],
    },
    mandatoryCharges: [],
    sourceNotes: [
      {
        title: "ESF Fee Levels 2025/26 - Tung Chung IK",
        url: "https://www.esf.edu.hk/fee-levels-for-academic-year-2025-26-esf-tck/",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  // ============================================
  // 56-57. ESF Hillside International Kindergarten (曉新)
  // 原文: "2025/26 Annual Tuition Fees (HK$) 101,800"
  // ============================================
  "edb_579149000111": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [{ label: "K1–K2", amountMin: 101800, amountMax: 101800 }],
    },
    mandatoryCharges: [],
    sourceNotes: [
      {
        title: "ESF Fee Levels 2025/26 - Hillside IK",
        url: "https://www.esf.edu.hk/fee-levels-for-academic-year-2025-26-esf-hsk/",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },
  "edb_579149000112": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [{ label: "K1–K2", amountMin: 101800, amountMax: 101800 }],
    },
    mandatoryCharges: [],
    sourceNotes: [
      {
        title: "ESF Fee Levels 2025/26 - Hillside IK",
        url: "https://www.esf.edu.hk/fee-levels-for-academic-year-2025-26-esf-hsk/",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  // ============================================
  // 58-59. ESF Abacus International Kindergarten
  // 原文: "English stream: HK$103,000" / "Bilingual stream: HK$119,700"
  // ============================================
  "edb_549240000111": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "English Stream", amountMin: 103000, amountMax: 103000 },
        { label: "Bilingual Stream", amountMin: 119700, amountMax: 119700 },
      ],
    },
    mandatoryCharges: [],
    sourceNotes: [
      {
        title: "ESF Fee Levels 2025/26 - Abacus IK",
        url: "https://www.esf.edu.hk/fee-levels-for-academic-year-2025-26-esf-abacus/",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },
  "edb_549240000112": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "English Stream", amountMin: 103000, amountMax: 103000 },
        { label: "Bilingual Stream", amountMin: 119700, amountMax: 119700 },
      ],
    },
    mandatoryCharges: [],
    sourceNotes: [
      {
        title: "ESF Fee Levels 2025/26 - Abacus IK",
        url: "https://www.esf.edu.hk/fee-levels-for-academic-year-2025-26-esf-abacus/",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  // ============================================
  // 60-61. Canadian International School - 幼稚園
  // 原文: "EY1 (Half Day, Bilingual): HK$156,300"
  // 原文: "EY2 (Whole Day, Bilingual): HK$203,100"
  // ============================================
  "edb_216011000511": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "EY1 (Half Day)", amountMin: 156300, amountMax: 156300 },
        { label: "EY2 (Whole Day)", amountMin: 203100, amountMax: 203100 },
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
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },
  "edb_216011000512": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "EY1 (Half Day)", amountMin: 156300, amountMax: 156300 },
        { label: "EY2 (Whole Day)", amountMin: 203100, amountMax: 203100 },
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
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },
  "edb_216011000611": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "EY1 (Half Day)", amountMin: 156300, amountMax: 156300 },
        { label: "EY2 (Whole Day)", amountMin: 203100, amountMax: 203100 },
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
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },
  "edb_216011000612": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "EY1 (Half Day)", amountMin: 156300, amountMax: 156300 },
        { label: "EY2 (Whole Day)", amountMin: 203100, amountMax: 203100 },
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
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  // ============================================
  // 64-66. Norwegian International School - 幼稚園 (3 campuses)
  // 原文: "HK$80,850, payable over ten months at HK$8,085 per month"
  // 原文: "an annual capital levy of $7,310"
  // ============================================
  "edb_215520000111": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [{ label: "Kindergarten", amountMin: 80850, amountMax: 80850 }],
    },
    mandatoryCharges: [
      {
        type: "CAPITAL_LEVY",
        label: "Annual Capital Levy",
        amountMin: 7310,
        amountMax: 7310,
        currency: "HKD",
        refundable: false,
        frequency: "ANNUAL",
      },
    ],
    sourceNotes: [
      {
        title: "NIS Admission Page 2025/26",
        url: "https://nis.edu.hk/admission/",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },
  "edb_215520000112": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [{ label: "Kindergarten", amountMin: 80850, amountMax: 80850 }],
    },
    mandatoryCharges: [
      {
        type: "CAPITAL_LEVY",
        label: "Annual Capital Levy",
        amountMin: 7310,
        amountMax: 7310,
        currency: "HKD",
        refundable: false,
        frequency: "ANNUAL",
      },
    ],
    sourceNotes: [
      {
        title: "NIS Admission Page 2025/26",
        url: "https://nis.edu.hk/admission/",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },
  "edb_215520000113": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [{ label: "Kindergarten", amountMin: 80850, amountMax: 80850 }],
    },
    mandatoryCharges: [
      {
        type: "CAPITAL_LEVY",
        label: "Annual Capital Levy",
        amountMin: 7310,
        amountMax: 7310,
        currency: "HKD",
        refundable: false,
        frequency: "ANNUAL",
      },
    ],
    sourceNotes: [
      {
        title: "NIS Admission Page 2025/26",
        url: "https://nis.edu.hk/admission/",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  // ============================================
  // 67-69. Australian International School Hong Kong - 幼稚園 (3 campuses)
  // Source: international-schools-database.com (第三方數據庫)
  // K2 (Age 4): HK$148,800 / K3 (Age 5): HK$173,800
  // ============================================
  "edb_216275000611": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "K2 (Reception)", amountMin: 148800, amountMax: 148800 },
        { label: "K3 (Prep)", amountMin: 173800, amountMax: 173800 },
      ],
    },
    mandatoryCharges: [],
    sourceNotes: [
      {
        title: "AISHK Fees 2025/26 (third-party database)",
        url: "https://www.international-schools-database.com/in/hong-kong/australian-international-school-hong-kong/fees",
        retrievedAt: "2026-01-15",
        evidenceLevel: "THIRD_PARTY",
        note: "第三方數據庫，建議向學校確認",
      },
    ],
  },
  "edb_216275000612": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "K2 (Reception)", amountMin: 148800, amountMax: 148800 },
        { label: "K3 (Prep)", amountMin: 173800, amountMax: 173800 },
      ],
    },
    mandatoryCharges: [],
    sourceNotes: [
      {
        title: "AISHK Fees 2025/26 (third-party database)",
        url: "https://www.international-schools-database.com/in/hong-kong/australian-international-school-hong-kong/fees",
        retrievedAt: "2026-01-15",
        evidenceLevel: "THIRD_PARTY",
        note: "第三方數據庫，建議向學校確認",
      },
    ],
  },
  "edb_216275000613": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "K2 (Reception)", amountMin: 148800, amountMax: 148800 },
        { label: "K3 (Prep)", amountMin: 173800, amountMax: 173800 },
      ],
    },
    mandatoryCharges: [],
    sourceNotes: [
      {
        title: "AISHK Fees 2025/26 (third-party database)",
        url: "https://www.international-schools-database.com/in/hong-kong/australian-international-school-hong-kong/fees",
        retrievedAt: "2026-01-15",
        evidenceLevel: "THIRD_PARTY",
        note: "第三方數據庫，建議向學校確認",
      },
    ],
  },

  // ============================================
  // 70-72. Singapore International School - 幼稚園 (2 campuses)
  // Source: 待確認 - 官網需要登入查看費用
  // ============================================
  "edb_216003000211": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [{ label: "Preparatory", amountMin: 0, amountMax: 0 }],
    },
    mandatoryCharges: [],
    sourceNotes: [
      {
        title: "待確認 - 需向學校查詢",
        url: "https://www.singapore.edu.hk/finance-matters/",
        retrievedAt: "2026-01-15",
        evidenceLevel: "PENDING",
        note: "官網需要聯繫學校獲取費用資料",
      },
    ],
  },
  "edb_216003000212": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [{ label: "Preparatory", amountMin: 0, amountMax: 0 }],
    },
    mandatoryCharges: [],
    sourceNotes: [
      {
        title: "待確認 - 需向學校查詢",
        url: "https://www.singapore.edu.hk/finance-matters/",
        retrievedAt: "2026-01-15",
        evidenceLevel: "PENDING",
        note: "官網需要聯繫學校獲取費用資料",
      },
    ],
  },

  // ============================================
  // 73-75. Chinese International School - 幼稚園 (2 campuses)
  // Source: 待確認 - 官網費用表需下載PDF
  // ============================================
  "edb_215589000111": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [{ label: "Reception", amountMin: 0, amountMax: 0 }],
    },
    mandatoryCharges: [],
    sourceNotes: [
      {
        title: "待確認 - 需向學校查詢",
        url: "https://www.cis.edu.hk/admissions/school-fees",
        retrievedAt: "2026-01-15",
        evidenceLevel: "PENDING",
        note: "官網費用表需下載PDF",
      },
    ],
  },
  "edb_215589000112": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [{ label: "Reception", amountMin: 0, amountMax: 0 }],
    },
    mandatoryCharges: [],
    sourceNotes: [
      {
        title: "待確認 - 需向學校查詢",
        url: "https://www.cis.edu.hk/admissions/school-fees",
        retrievedAt: "2026-01-15",
        evidenceLevel: "PENDING",
        note: "官網費用表需下載PDF",
      },
    ],
  },

  // ============================================
  // 76-78. Discovery Bay International School - 幼稚園 (3 campuses)
  // Source: 待確認 - 官網費用表需下載文件
  // ============================================
  "edb_230987000111": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [{ label: "Early Years", amountMin: 0, amountMax: 0 }],
    },
    mandatoryCharges: [],
    sourceNotes: [
      {
        title: "待確認 - 需向學校查詢",
        url: "https://www.dbis.edu.hk/school-admissions",
        retrievedAt: "2026-01-15",
        evidenceLevel: "PENDING",
        note: "官網費用表需下載文件",
      },
    ],
  },
  "edb_230987000112": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [{ label: "Early Years", amountMin: 0, amountMax: 0 }],
    },
    mandatoryCharges: [],
    sourceNotes: [
      {
        title: "待確認 - 需向學校查詢",
        url: "https://www.dbis.edu.hk/school-admissions",
        retrievedAt: "2026-01-15",
        evidenceLevel: "PENDING",
        note: "官網費用表需下載文件",
      },
    ],
  },
  "edb_230987000113": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [{ label: "Early Years", amountMin: 0, amountMax: 0 }],
    },
    mandatoryCharges: [],
    sourceNotes: [
      {
        title: "待確認 - 需向學校查詢",
        url: "https://www.dbis.edu.hk/school-admissions",
        retrievedAt: "2026-01-15",
        evidenceLevel: "PENDING",
        note: "官網費用表需下載文件",
      },
    ],
  },

  // ============================================
  // Victoria (何文田) International Kindergarten
  // 原文: "Homantin Campus ... Nursery (K1) Half Day: $116,292"
  // ============================================
  "edb_618039000111": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "Nursery K1 (Half Day)", amountMin: 116292, amountMax: 116292 },
        { label: "Lower K2 (Half Day)", amountMin: 105280, amountMax: 105280 },
        { label: "Upper K3 (Half Day)", amountMin: 106530, amountMax: 106530 },
      ],
    },
    mandatoryCharges: [],
    sourceNotes: [
      {
        title: "Victoria Kindergarten Tuition 2025/26",
        url: "https://www.victoria.edu.hk/tution/",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  // ============================================
  // Victoria (海之戀) International Kindergarten
  // 原文: "Ocean Pride Campus ... Nursery (K1) Half Day: $113,190"
  // ============================================
  "edb_619850000111": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "Nursery K1 (Half Day)", amountMin: 113190, amountMax: 113190 },
        { label: "Lower K2 (Half Day)", amountMin: 102400, amountMax: 102400 },
        { label: "Upper K3 (Half Day)", amountMin: 105360, amountMax: 105360 },
      ],
    },
    mandatoryCharges: [],
    sourceNotes: [
      {
        title: "Victoria Kindergarten Tuition 2025/26",
        url: "https://www.victoria.edu.hk/tution/",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  // ============================================
  // Victoria (海怡) International Kindergarten
  // 原文: "South Horizons Campus ... Nursery (K1) Half Day: $124,047"
  // ============================================
  "edb_216194000111": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "Nursery K1 (Half Day)", amountMin: 124047, amountMax: 124047 },
        { label: "Lower K2 (Half Day)", amountMin: 110520, amountMax: 110520 },
        { label: "Upper K3 (Half Day)", amountMin: 113110, amountMax: 113110 },
      ],
    },
    mandatoryCharges: [],
    sourceNotes: [
      {
        title: "Victoria Kindergarten Tuition 2025/26",
        url: "https://www.victoria.edu.hk/tution/",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  // ============================================
  // 銅鑼灣維多利亞國際幼稚園 (Harbour Heights Campus)
  // 原文: "Harbour Heights Campus ... Nursery (K1) Half Day: $137,973"
  // ============================================
  "edb_325651000111": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "Nursery K1 (Half Day)", amountMin: 137973, amountMax: 137973 },
        { label: "Lower K2 (Half Day)", amountMin: 125430, amountMax: 125430 },
        { label: "Upper K3 (Half Day)", amountMin: 127790, amountMax: 127790 },
      ],
    },
    mandatoryCharges: [],
    sourceNotes: [
      {
        title: "Victoria Kindergarten Tuition 2025/26",
        url: "https://www.victoria.edu.hk/tution/",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  // ============================================
  // 港青基信國際幼稚園
  // 原文: "School Fees for year 2025/2026 ... $71,220" / "$125,480"
  // ============================================
  "edb_216178000111": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "Half Day", amountMin: 71220, amountMax: 71220 },
        { label: "Full Day", amountMin: 125480, amountMax: 125480 },
      ],
    },
    mandatoryCharges: [],
    sourceNotes: [
      {
        title: "YMCA CIKG Tuition Fees 2025/26",
        url: "https://ymcahk.org.hk/cikg/en/admission/tuition_fees/index.html",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  // ============================================
  // 法國國際學校 (幼稚園)
  // 原文: "Petite Section & Moyenne Section (PS & MS): HK$ 146,093"
  // 原文: "Grande Section (GS): HK$ 151,218"
  // ============================================
  "edb_214949000513": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "PS & MS (Maternelle)", amountMin: 146093, amountMax: 146093 },
        { label: "GS (Grande Section)", amountMin: 151218, amountMax: 151218 },
      ],
    },
    mandatoryCharges: [],
    sourceNotes: [
      {
        title: "FIS Tuition Fees 2025/26",
        url: "https://www.fis.edu.hk/admission/tuition-fees/",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  // ============================================
  // 韓國國際學校 (幼稚園/Reception)
  // 原文: "Reception ... HK$97,100 ... Fees are approved by EDB. (Updated 31 May 2025)"
  // ============================================
  "edb_216216000113": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [{ label: "Reception", amountMin: 97100, amountMax: 97100 }],
    },
    mandatoryCharges: [],
    sourceNotes: [
      {
        title: "KIS Fees 2025/26",
        url: "https://www.kis.edu.hk/fees/",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  // ============================================
  // IMS 蒙特梭利國際學校 (Stanley Campus)
  // Source: https://www.ims.edu.hk/en/admission/school-fees
  // Half-Day (Ages 3-4): $14,300/month × 10 = $143,000
  // Full Day (Ages 4-6): $20,650/month × 10 = $206,500
  // ============================================
  "edb_548430000611": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "Half Day (Ages 3-4)", amountMin: 143000, amountMax: 143000 },
        { label: "Full Day (Ages 4-6)", amountMin: 206500, amountMax: 206500 },
      ],
    },
    mandatoryCharges: [],
    sourceNotes: [
      {
        title: "IMS School Fees 2025/26",
        url: "https://www.ims.edu.hk/en/admission/school-fees",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  // ============================================
  // Small World Christian Kindergarten
  // Source: EDB Fees Certificate (生效日期: 01.09.2025)
  // All levels: $7,450/month × 10 = $74,500
  // ============================================
  "edb_215724000111": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "All Levels (AM/PM)", amountMin: 74500, amountMax: 74500 },
      ],
    },
    mandatoryCharges: [],
    sourceNotes: [
      {
        title: "EDB Fees Certificate",
        url: "https://applications.edb.gov.hk/schoolsearch/schoolfee/215724.pdf",
        retrievedAt: "2026-01-15",
        evidenceLevel: "GOVT_RECORD",
      },
    ],
  },

  // ============================================
  // Box Hill (HK) International Kindergarten - Fo Tan
  // Source: https://boxhill.edu.hk/admission/
  // Ma On Shan & Fo Tan: PN $7,200/month × 11, K1-K3 $7,000/month × 11
  // ============================================
  "edb_581739000211": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "Pre-Nursery (PN)", amountMin: 79200, amountMax: 79200 },
        { label: "K1-K3", amountMin: 77000, amountMax: 77000 },
      ],
    },
    mandatoryCharges: [],
    sourceNotes: [
      {
        title: "Box Hill Admission Fees 2025/26",
        url: "https://boxhill.edu.hk/admission/",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  // ============================================
  // Box Hill (HK) International Kindergarten - TKO
  // Source: https://boxhill.edu.hk/admission/
  // TKO: PN $7,100/month × 11, K1-K3 $6,800/month × 11
  // ============================================
  "edb_581836000212": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "Pre-Nursery (PN)", amountMin: 78100, amountMax: 78100 },
        { label: "K1-K3", amountMin: 74800, amountMax: 74800 },
      ],
    },
    mandatoryCharges: [],
    sourceNotes: [
      {
        title: "Box Hill Admission Fees 2025/26",
        url: "https://boxhill.edu.hk/admission/",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  // ============================================
  // Box Hill (HK) International Kindergarten - Ma On Shan
  // Source: https://boxhill.edu.hk/admission/
  // Ma On Shan & Fo Tan: PN $7,200/month × 11, K1-K3 $7,000/month × 11
  // ============================================
  "edb_559415000111": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "Pre-Nursery (PN)", amountMin: 79200, amountMax: 79200 },
        { label: "K1-K3", amountMin: 77000, amountMax: 77000 },
      ],
    },
    mandatoryCharges: [],
    sourceNotes: [
      {
        title: "Box Hill Admission Fees 2025/26",
        url: "https://boxhill.edu.hk/admission/",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  "edb_559415000112": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "Pre-Nursery (PN)", amountMin: 79200, amountMax: 79200 },
        { label: "K1-K3", amountMin: 77000, amountMax: 77000 },
      ],
    },
    mandatoryCharges: [],
    sourceNotes: [
      {
        title: "Box Hill Admission Fees 2025/26",
        url: "https://boxhill.edu.hk/admission/",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  // Box Hill Fo Tan - additional EDB IDs
  "edb_581739000111": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "Pre-Nursery (PN)", amountMin: 79200, amountMax: 79200 },
        { label: "K1-K3", amountMin: 77000, amountMax: 77000 },
      ],
    },
    mandatoryCharges: [],
    sourceNotes: [
      {
        title: "Box Hill Admission Fees 2025/26",
        url: "https://boxhill.edu.hk/admission/",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  "edb_581739000112": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "Pre-Nursery (PN)", amountMin: 79200, amountMax: 79200 },
        { label: "K1-K3", amountMin: 77000, amountMax: 77000 },
      ],
    },
    mandatoryCharges: [],
    sourceNotes: [
      {
        title: "Box Hill Admission Fees 2025/26",
        url: "https://boxhill.edu.hk/admission/",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  "edb_581739000212": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "Pre-Nursery (PN)", amountMin: 79200, amountMax: 79200 },
        { label: "K1-K3", amountMin: 77000, amountMax: 77000 },
      ],
    },
    mandatoryCharges: [],
    sourceNotes: [
      {
        title: "Box Hill Admission Fees 2025/26",
        url: "https://boxhill.edu.hk/admission/",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  // Box Hill TKO - additional EDB IDs
  "edb_581836000211": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "Pre-Nursery (PN)", amountMin: 78100, amountMax: 78100 },
        { label: "K1-K3", amountMin: 74800, amountMax: 74800 },
      ],
    },
    mandatoryCharges: [],
    sourceNotes: [
      {
        title: "Box Hill Admission Fees 2025/26",
        url: "https://boxhill.edu.hk/admission/",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  "edb_581836000213": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "Pre-Nursery (PN)", amountMin: 78100, amountMax: 78100 },
        { label: "K1-K3", amountMin: 74800, amountMax: 74800 },
      ],
    },
    mandatoryCharges: [],
    sourceNotes: [
      {
        title: "Box Hill Admission Fees 2025/26",
        url: "https://boxhill.edu.hk/admission/",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  // ============================================
  // Victoria (Homantin) International Kindergarten 維多利亞(何文田)國際幼稚園
  // Source: https://www.victoria.edu.hk/tution/?tab=Nursery_Kindergarten
  // ============================================
  "edb_618039000111": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "Pre-Nursery (Under 2)", amountMin: 142208, amountMax: 142208 },
        { label: "Pre-Nursery (Above 2)", amountMin: 137808, amountMax: 137808 },
        { label: "Nursery (K1)", amountMin: 116292, amountMax: 116292 },
        { label: "Lower (K2)", amountMin: 105280, amountMax: 105280 },
        { label: "Upper (K3) Half Day", amountMin: 106530, amountMax: 106530 },
        { label: "Upper (K3) Whole Day", amountMin: 206510, amountMax: 206510 },
      ],
    },
    mandatoryCharges: [],
    sourceNotes: [
      {
        title: "Victoria Tuition Fees 2025/26",
        url: "https://www.victoria.edu.hk/tution/?tab=Nursery_Kindergarten",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  "edb_618039000112": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "Pre-Nursery (Under 2)", amountMin: 142208, amountMax: 142208 },
        { label: "Pre-Nursery (Above 2)", amountMin: 137808, amountMax: 137808 },
        { label: "Nursery (K1)", amountMin: 116292, amountMax: 116292 },
        { label: "Lower (K2)", amountMin: 105280, amountMax: 105280 },
        { label: "Upper (K3) Half Day", amountMin: 106530, amountMax: 106530 },
        { label: "Upper (K3) Whole Day", amountMin: 206510, amountMax: 206510 },
      ],
    },
    mandatoryCharges: [],
    sourceNotes: [
      {
        title: "Victoria Tuition Fees 2025/26",
        url: "https://www.victoria.edu.hk/tution/?tab=Nursery_Kindergarten",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  // ============================================
  // Victoria (Ocean Pride) International Kindergarten 維多利亞(海之戀)國際幼稚園
  // Source: https://www.victoria.edu.hk/tution/?tab=Nursery_Kindergarten
  // ============================================
  "edb_619850000111": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "Pre-Nursery (Above 2)", amountMin: 127919, amountMax: 127919 },
        { label: "Nursery (K1)", amountMin: 113190, amountMax: 113190 },
        { label: "Lower (K2)", amountMin: 102400, amountMax: 102400 },
        { label: "Upper (K3)", amountMin: 105360, amountMax: 105360 },
      ],
    },
    mandatoryCharges: [],
    sourceNotes: [
      {
        title: "Victoria Tuition Fees 2025/26",
        url: "https://www.victoria.edu.hk/tution/?tab=Nursery_Kindergarten",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  "edb_619850000112": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "Pre-Nursery (Above 2)", amountMin: 127919, amountMax: 127919 },
        { label: "Nursery (K1)", amountMin: 113190, amountMax: 113190 },
        { label: "Lower (K2)", amountMin: 102400, amountMax: 102400 },
        { label: "Upper (K3)", amountMin: 105360, amountMax: 105360 },
      ],
    },
    mandatoryCharges: [],
    sourceNotes: [
      {
        title: "Victoria Tuition Fees 2025/26",
        url: "https://www.victoria.edu.hk/tution/?tab=Nursery_Kindergarten",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  // ============================================
  // Victoria (South Horizons) International Kindergarten 維多利亞（海怡）國際幼稚園
  // Source: https://www.victoria.edu.hk/tution/?tab=Nursery_Kindergarten
  // ============================================
  "edb_216194000111": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "Pre-Nursery (Under 2)", amountMin: 135113, amountMax: 135113 },
        { label: "Pre-Nursery (Above 2)", amountMin: 130878, amountMax: 130878 },
        { label: "Nursery (K1)", amountMin: 124047, amountMax: 124047 },
        { label: "Lower (K2)", amountMin: 110520, amountMax: 110520 },
        { label: "Upper (K3) Half Day", amountMin: 113110, amountMax: 113110 },
        { label: "Upper (K3) Whole Day", amountMin: 207140, amountMax: 207140 },
      ],
    },
    mandatoryCharges: [],
    sourceNotes: [
      {
        title: "Victoria Tuition Fees 2025/26",
        url: "https://www.victoria.edu.hk/tution/?tab=Nursery_Kindergarten",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  "edb_216194000112": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "Pre-Nursery (Under 2)", amountMin: 135113, amountMax: 135113 },
        { label: "Pre-Nursery (Above 2)", amountMin: 130878, amountMax: 130878 },
        { label: "Nursery (K1)", amountMin: 124047, amountMax: 124047 },
        { label: "Lower (K2)", amountMin: 110520, amountMax: 110520 },
        { label: "Upper (K3) Half Day", amountMin: 113110, amountMax: 113110 },
        { label: "Upper (K3) Whole Day", amountMin: 207140, amountMax: 207140 },
      ],
    },
    mandatoryCharges: [],
    sourceNotes: [
      {
        title: "Victoria Tuition Fees 2025/26",
        url: "https://www.victoria.edu.hk/tution/?tab=Nursery_Kindergarten",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  "edb_216194000113": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "Pre-Nursery (Under 2)", amountMin: 135113, amountMax: 135113 },
        { label: "Pre-Nursery (Above 2)", amountMin: 130878, amountMax: 130878 },
        { label: "Nursery (K1)", amountMin: 124047, amountMax: 124047 },
        { label: "Lower (K2)", amountMin: 110520, amountMax: 110520 },
        { label: "Upper (K3) Half Day", amountMin: 113110, amountMax: 113110 },
        { label: "Upper (K3) Whole Day", amountMin: 207140, amountMax: 207140 },
      ],
    },
    mandatoryCharges: [],
    sourceNotes: [
      {
        title: "Victoria Tuition Fees 2025/26",
        url: "https://www.victoria.edu.hk/tution/?tab=Nursery_Kindergarten",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  // ============================================
  // Victoria (Homantin) International Nursery 維多利亞（何文田）國際幼兒園
  // Source: https://www.victoria.edu.hk/tution/?tab=Nursery_Kindergarten
  // ============================================
  "edb_566900000111": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "Pre-Nursery (Under 2)", amountMin: 142208, amountMax: 142208 },
        { label: "Pre-Nursery (Above 2)", amountMin: 137808, amountMax: 137808 },
        { label: "Nursery (K1)", amountMin: 116292, amountMax: 116292 },
        { label: "Lower (K2)", amountMin: 105280, amountMax: 105280 },
        { label: "Upper (K3) Half Day", amountMin: 106530, amountMax: 106530 },
        { label: "Upper (K3) Whole Day", amountMin: 206510, amountMax: 206510 },
      ],
    },
    mandatoryCharges: [],
    sourceNotes: [
      {
        title: "Victoria Tuition Fees 2025/26",
        url: "https://www.victoria.edu.hk/tution/?tab=Nursery_Kindergarten",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  "edb_566900000112": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "Pre-Nursery (Under 2)", amountMin: 142208, amountMax: 142208 },
        { label: "Pre-Nursery (Above 2)", amountMin: 137808, amountMax: 137808 },
        { label: "Nursery (K1)", amountMin: 116292, amountMax: 116292 },
        { label: "Lower (K2)", amountMin: 105280, amountMax: 105280 },
        { label: "Upper (K3) Half Day", amountMin: 106530, amountMax: 106530 },
        { label: "Upper (K3) Whole Day", amountMin: 206510, amountMax: 206510 },
      ],
    },
    mandatoryCharges: [],
    sourceNotes: [
      {
        title: "Victoria Tuition Fees 2025/26",
        url: "https://www.victoria.edu.hk/tution/?tab=Nursery_Kindergarten",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  "edb_566900000113": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "Pre-Nursery (Under 2)", amountMin: 142208, amountMax: 142208 },
        { label: "Pre-Nursery (Above 2)", amountMin: 137808, amountMax: 137808 },
        { label: "Nursery (K1)", amountMin: 116292, amountMax: 116292 },
        { label: "Lower (K2)", amountMin: 105280, amountMax: 105280 },
        { label: "Upper (K3) Half Day", amountMin: 106530, amountMax: 106530 },
        { label: "Upper (K3) Whole Day", amountMin: 206510, amountMax: 206510 },
      ],
    },
    mandatoryCharges: [],
    sourceNotes: [
      {
        title: "Victoria Tuition Fees 2025/26",
        url: "https://www.victoria.edu.hk/tution/?tab=Nursery_Kindergarten",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  // ============================================
  // Malvern College Pre-School Hong Kong 香港墨爾文國際幼稚園 (Coronation Circle)
  // Source: https://www.malvernpreschool.hk/fees/
  // Half Day AM/PM: $10,998 × 11 = $120,978; Full Day: $19,400 × 11 = $213,400
  // ============================================
  "edb_606979000111": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "Half Day (AM/PM)", amountMin: 120978, amountMax: 120978 },
        { label: "Full Day", amountMin: 213400, amountMax: 213400 },
      ],
    },
    mandatoryCharges: [],
    sourceNotes: [
      {
        title: "Malvern College Pre-School Fees 2025/26",
        url: "https://www.malvernpreschool.hk/fees/",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  "edb_606979000112": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "Half Day (AM/PM)", amountMin: 120978, amountMax: 120978 },
        { label: "Full Day", amountMin: 213400, amountMax: 213400 },
      ],
    },
    mandatoryCharges: [],
    sourceNotes: [
      {
        title: "Malvern College Pre-School Fees 2025/26",
        url: "https://www.malvernpreschool.hk/fees/",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  "edb_606979000113": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "Half Day (AM/PM)", amountMin: 120978, amountMax: 120978 },
        { label: "Full Day", amountMin: 213400, amountMax: 213400 },
      ],
    },
    mandatoryCharges: [],
    sourceNotes: [
      {
        title: "Malvern College Pre-School Fees 2025/26",
        url: "https://www.malvernpreschool.hk/fees/",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  // ============================================
  // Malvern College Pre-School Hong Kong (Island West) 香港墨爾文國際幼稚園(港島西)
  // Source: https://www.malvernpreschool.hk/fees/
  // Same fees as Coronation Circle campus
  // ============================================
  "edb_613037000111": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "Half Day (AM/PM)", amountMin: 120978, amountMax: 120978 },
        { label: "Full Day", amountMin: 213400, amountMax: 213400 },
      ],
    },
    mandatoryCharges: [],
    sourceNotes: [
      {
        title: "Malvern College Pre-School Fees 2025/26",
        url: "https://www.malvernpreschool.hk/fees/",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  "edb_613037000112": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "Half Day (AM/PM)", amountMin: 120978, amountMax: 120978 },
        { label: "Full Day", amountMin: 213400, amountMax: 213400 },
      ],
    },
    mandatoryCharges: [],
    sourceNotes: [
      {
        title: "Malvern College Pre-School Fees 2025/26",
        url: "https://www.malvernpreschool.hk/fees/",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  "edb_613037000113": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "Half Day (AM/PM)", amountMin: 120978, amountMax: 120978 },
        { label: "Full Day", amountMin: 213400, amountMax: 213400 },
      ],
    },
    mandatoryCharges: [],
    sourceNotes: [
      {
        title: "Malvern College Pre-School Fees 2025/26",
        url: "https://www.malvernpreschool.hk/fees/",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  // ============================================
  // YMCA of Hong Kong Christian International Kindergarten 港青基信國際幼稚園
  // Source: https://ymcahk.org.hk/cikg/en/admission/tuition_fees/index.html
  // Half Day: $71,220 (10 × $7,122); Full Day: $125,480 (10 × $12,548 incl. meals)
  // ============================================
  "edb_216178000111": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "Half Day", amountMin: 71220, amountMax: 71220 },
        { label: "Full Day (incl. meals)", amountMin: 125480, amountMax: 125480 },
      ],
    },
    mandatoryCharges: [],
    sourceNotes: [
      {
        title: "YMCA CIKG Tuition Fees 2025/26",
        url: "https://ymcahk.org.hk/cikg/en/admission/tuition_fees/index.html",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  "edb_216178000112": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "Half Day", amountMin: 71220, amountMax: 71220 },
        { label: "Full Day (incl. meals)", amountMin: 125480, amountMax: 125480 },
      ],
    },
    mandatoryCharges: [],
    sourceNotes: [
      {
        title: "YMCA CIKG Tuition Fees 2025/26",
        url: "https://ymcahk.org.hk/cikg/en/admission/tuition_fees/index.html",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  "edb_216178000113": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "Half Day", amountMin: 71220, amountMax: 71220 },
        { label: "Full Day (incl. meals)", amountMin: 125480, amountMax: 125480 },
      ],
    },
    mandatoryCharges: [],
    sourceNotes: [
      {
        title: "YMCA CIKG Tuition Fees 2025/26",
        url: "https://ymcahk.org.hk/cikg/en/admission/tuition_fees/index.html",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  // ============================================
  // French International School (Lycée Français) - Kindergarten
  // Source: https://www.fis.edu.hk/admissions/tuition-fees/
  // ============================================
  "edb_214949000713": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "French Petite/Moyenne Section (ages 3-4)", amountMin: 146093, amountMax: 146093 },
        { label: "French Grande Section (age 5)", amountMin: 151218, amountMax: 151218 },
        { label: "International Nursery/Reception", amountMin: 151984, amountMax: 151984 },
      ],
    },
    mandatoryCharges: [],
    sourceNotes: [
      {
        title: "FIS Tuition Fees 2025/26",
        url: "https://www.fis.edu.hk/admissions/tuition-fees/",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  // ============================================
  // American International School - Kindergarten (Early Childhood)
  // Source: https://www.ais.edu.hk/admissions/tuition-fees/
  // ============================================
  "edb_287695000211": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "Half Day", amountMin: 97000, amountMax: 97000 },
        { label: "Full Day", amountMin: 146800, amountMax: 146800 },
      ],
    },
    mandatoryCharges: [],
    sourceNotes: [
      {
        title: "AIS Tuition Fees 2025/26",
        url: "https://www.ais.edu.hk/admissions/tuition-fees/",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  "edb_287695000213": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "Half Day", amountMin: 97000, amountMax: 97000 },
        { label: "Full Day", amountMin: 146800, amountMax: 146800 },
      ],
    },
    mandatoryCharges: [],
    sourceNotes: [
      {
        title: "AIS Tuition Fees 2025/26",
        url: "https://www.ais.edu.hk/admissions/tuition-fees/",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  // ============================================
  // Kingston International Kindergarten 京斯敦國際幼稚園
  // Source: https://www.kingston.edu.hk/admissions/school-fees
  // ============================================
  "edb_519863000311": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "Playgroup", amountMin: 63800, amountMax: 63800 },
        { label: "2-Year-Old Class", amountMin: 109780, amountMax: 109780 },
        { label: "K1-K3 (3-5 Year Old)", amountMin: 112200, amountMax: 112200 },
      ],
    },
    mandatoryCharges: [],
    sourceNotes: [
      {
        title: "Kingston Fees 2025/26",
        url: "https://www.kingston.edu.hk/admissions/school-fees",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  "edb_519863000312": {
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "Playgroup", amountMin: 63800, amountMax: 63800 },
        { label: "2-Year-Old Class", amountMin: 109780, amountMax: 109780 },
        { label: "K1-K3 (3-5 Year Old)", amountMin: 112200, amountMax: 112200 },
      ],
    },
    mandatoryCharges: [],
    sourceNotes: [
      {
        title: "Kingston Fees 2025/26",
        url: "https://www.kingston.edu.hk/admissions/school-fees",
        retrievedAt: "2026-01-15",
        evidenceLevel: "SCHOOL_SITE",
      },
    ],
  },

  // ============================================
  // ESF Primary Schools - Y1-Y6: $139,000
  // Source: https://www.esf.edu.hk/fee-levels-for-academic-year-2025-26-esf-schools/
  // ============================================
  "edb_170348000123": { // Beacon Hill School
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [{ label: "Y1-Y6", amountMin: 139000, amountMax: 139000 }],
    },
    mandatoryCharges: [],
    sourceNotes: [{ title: "ESF Fee Levels 2025/26", url: "https://www.esf.edu.hk/fee-levels-for-academic-year-2025-26-esf-schools/", retrievedAt: "2026-01-19", evidenceLevel: "SCHOOL_SITE" }],
  },
  "edb_170747000123": { // Bradbury School
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [{ label: "Y1-Y6", amountMin: 139000, amountMax: 139000 }],
    },
    mandatoryCharges: [],
    sourceNotes: [{ title: "ESF Fee Levels 2025/26", url: "https://www.esf.edu.hk/fee-levels-for-academic-year-2025-26-esf-schools/", retrievedAt: "2026-01-19", evidenceLevel: "SCHOOL_SITE" }],
  },
  "edb_171034000123": { // Clearwater Bay School
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [{ label: "Y1-Y6", amountMin: 139000, amountMax: 139000 }],
    },
    mandatoryCharges: [],
    sourceNotes: [{ title: "ESF Fee Levels 2025/26", url: "https://www.esf.edu.hk/fee-levels-for-academic-year-2025-26-esf-schools/", retrievedAt: "2026-01-19", evidenceLevel: "SCHOOL_SITE" }],
  },
  "edb_171034000223": { // Clearwater Bay School (2nd entry)
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [{ label: "Y1-Y6", amountMin: 139000, amountMax: 139000 }],
    },
    mandatoryCharges: [],
    sourceNotes: [{ title: "ESF Fee Levels 2025/26", url: "https://www.esf.edu.hk/fee-levels-for-academic-year-2025-26-esf-schools/", retrievedAt: "2026-01-19", evidenceLevel: "SCHOOL_SITE" }],
  },
  "edb_170887000123": { // Glenealy School
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [{ label: "Y1-Y6", amountMin: 139000, amountMax: 139000 }],
    },
    mandatoryCharges: [],
    sourceNotes: [{ title: "ESF Fee Levels 2025/26", url: "https://www.esf.edu.hk/fee-levels-for-academic-year-2025-26-esf-schools/", retrievedAt: "2026-01-19", evidenceLevel: "SCHOOL_SITE" }],
  },
  "edb_170879000123": { // Kennedy School
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [{ label: "Y1-Y6", amountMin: 139000, amountMax: 139000 }],
    },
    mandatoryCharges: [],
    sourceNotes: [{ title: "ESF Fee Levels 2025/26", url: "https://www.esf.edu.hk/fee-levels-for-academic-year-2025-26-esf-schools/", retrievedAt: "2026-01-19", evidenceLevel: "SCHOOL_SITE" }],
  },
  "edb_170909000123": { // Kowloon Junior School
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [{ label: "Y1-Y6", amountMin: 139000, amountMax: 139000 }],
    },
    mandatoryCharges: [],
    sourceNotes: [{ title: "ESF Fee Levels 2025/26", url: "https://www.esf.edu.hk/fee-levels-for-academic-year-2025-26-esf-schools/", retrievedAt: "2026-01-19", evidenceLevel: "SCHOOL_SITE" }],
  },
  "edb_170860000123": { // Peak School
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [{ label: "Y1-Y6", amountMin: 139000, amountMax: 139000 }],
    },
    mandatoryCharges: [],
    sourceNotes: [{ title: "ESF Fee Levels 2025/26", url: "https://www.esf.edu.hk/fee-levels-for-academic-year-2025-26-esf-schools/", retrievedAt: "2026-01-19", evidenceLevel: "SCHOOL_SITE" }],
  },
  "edb_170895000123": { // Quarry Bay School
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [{ label: "Y1-Y6", amountMin: 139000, amountMax: 139000 }],
    },
    mandatoryCharges: [],
    sourceNotes: [{ title: "ESF Fee Levels 2025/26", url: "https://www.esf.edu.hk/fee-levels-for-academic-year-2025-26-esf-schools/", retrievedAt: "2026-01-19", evidenceLevel: "SCHOOL_SITE" }],
  },
  "edb_190543000123": { // Shatin Junior School
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [{ label: "Y1-Y6", amountMin: 139000, amountMax: 139000 }],
    },
    mandatoryCharges: [],
    sourceNotes: [{ title: "ESF Fee Levels 2025/26", url: "https://www.esf.edu.hk/fee-levels-for-academic-year-2025-26-esf-schools/", retrievedAt: "2026-01-19", evidenceLevel: "SCHOOL_SITE" }],
  },

  // ============================================
  // ESF Secondary Schools - Y7-10: $181,100, Y11: $159,400, Y12-13: $167,600
  // Source: https://www.esf.edu.hk/fee-levels-for-academic-year-2025-26-esf-schools/
  // ============================================
  "edb_170917000133": { // King George V School
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "Y7-Y10", amountMin: 181100, amountMax: 181100 },
        { label: "Y11", amountMin: 159400, amountMax: 159400 },
        { label: "Y12-Y13", amountMin: 167600, amountMax: 167600 },
      ],
    },
    mandatoryCharges: [],
    sourceNotes: [{ title: "ESF Fee Levels 2025/26", url: "https://www.esf.edu.hk/fee-levels-for-academic-year-2025-26-esf-schools/", retrievedAt: "2026-01-19", evidenceLevel: "SCHOOL_SITE" }],
  },
  "edb_190314000233": { // Shatin College
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "Y7-Y10", amountMin: 181100, amountMax: 181100 },
        { label: "Y11", amountMin: 159400, amountMax: 159400 },
        { label: "Y12-Y13", amountMin: 167600, amountMax: 167600 },
      ],
    },
    mandatoryCharges: [],
    sourceNotes: [{ title: "ESF Fee Levels 2025/26", url: "https://www.esf.edu.hk/fee-levels-for-academic-year-2025-26-esf-schools/", retrievedAt: "2026-01-19", evidenceLevel: "SCHOOL_SITE" }],
  },
  "edb_170836000133": { // South Island School
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "Y7-Y10", amountMin: 181100, amountMax: 181100 },
        { label: "Y11", amountMin: 159400, amountMax: 159400 },
        { label: "Y12-Y13", amountMin: 167600, amountMax: 167600 },
      ],
    },
    mandatoryCharges: [],
    sourceNotes: [{ title: "ESF Fee Levels 2025/26", url: "https://www.esf.edu.hk/fee-levels-for-academic-year-2025-26-esf-schools/", retrievedAt: "2026-01-19", evidenceLevel: "SCHOOL_SITE" }],
  },
  "edb_170992000133": { // West Island School
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "Y7-Y10", amountMin: 181100, amountMax: 181100 },
        { label: "Y11", amountMin: 159400, amountMax: 159400 },
        { label: "Y12-Y13", amountMin: 167600, amountMax: 167600 },
      ],
    },
    mandatoryCharges: [],
    sourceNotes: [{ title: "ESF Fee Levels 2025/26", url: "https://www.esf.edu.hk/fee-levels-for-academic-year-2025-26-esf-schools/", retrievedAt: "2026-01-19", evidenceLevel: "SCHOOL_SITE" }],
  },

  // ============================================
  // ESF Private Schools (Discovery College, Renaissance College)
  // ~5-6% higher than subvented ESF
  // ============================================
  "edb_569747000223": { // Discovery College - Primary
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [{ label: "Y1-Y6", amountMin: 147200, amountMax: 147200 }],
    },
    mandatoryCharges: [],
    sourceNotes: [{ title: "ESF Discovery College Fees 2025/26", url: "https://www.esf.edu.hk/fee-levels-for-academic-year-2025-26-esf-schools/", retrievedAt: "2026-01-19", evidenceLevel: "SCHOOL_SITE" }],
  },
  "edb_569747000233": { // Discovery College - Secondary
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "Y7-Y10", amountMin: 191800, amountMax: 191800 },
        { label: "Y11-Y13", amountMin: 177500, amountMax: 177500 },
      ],
    },
    mandatoryCharges: [],
    sourceNotes: [{ title: "ESF Discovery College Fees 2025/26", url: "https://www.esf.edu.hk/fee-levels-for-academic-year-2025-26-esf-schools/", retrievedAt: "2026-01-19", evidenceLevel: "SCHOOL_SITE" }],
  },
  "edb_567485000123": { // Renaissance College - Primary
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [{ label: "Y1-Y6", amountMin: 145800, amountMax: 145800 }],
    },
    mandatoryCharges: [],
    sourceNotes: [{ title: "ESF Renaissance College Fees 2025/26", url: "https://www.esf.edu.hk/fee-levels-for-academic-year-2025-26-esf-schools/", retrievedAt: "2026-01-19", evidenceLevel: "SCHOOL_SITE" }],
  },
  "edb_567485000133": { // Renaissance College - Secondary
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "Y7-Y10", amountMin: 189900, amountMax: 189900 },
        { label: "Y11-Y13", amountMin: 175700, amountMax: 175700 },
      ],
    },
    mandatoryCharges: [],
    sourceNotes: [{ title: "ESF Renaissance College Fees 2025/26", url: "https://www.esf.edu.hk/fee-levels-for-academic-year-2025-26-esf-schools/", retrievedAt: "2026-01-19", evidenceLevel: "SCHOOL_SITE" }],
  },

  // ============================================
  // Victoria Shanghai Academy 滬江維多利亞學校
  // Source: https://www.vsa.edu.hk/admissions/school-fees
  // ============================================
  "edb_560138000223": { // VSA Primary
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "Y1-Y5", amountMin: 181200, amountMax: 181200 },
        { label: "Y6", amountMin: 200700, amountMax: 200700 },
      ],
    },
    mandatoryCharges: [],
    sourceNotes: [{ title: "VSA School Fees 2025/26", url: "https://www.vsa.edu.hk/admissions/school-fees", retrievedAt: "2026-01-19", evidenceLevel: "SCHOOL_SITE" }],
  },
  "edb_560138000233": { // VSA Secondary
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "Y7", amountMin: 203700, amountMax: 203700 },
        { label: "Y8-Y10", amountMin: 205400, amountMax: 205400 },
        { label: "Y11-Y12", amountMin: 255600, amountMax: 255600 },
      ],
    },
    mandatoryCharges: [],
    sourceNotes: [{ title: "VSA School Fees 2025/26", url: "https://www.vsa.edu.hk/admissions/school-fees", retrievedAt: "2026-01-19", evidenceLevel: "SCHOOL_SITE" }],
  },

  // ============================================
  // Stamford American School Hong Kong
  // Source: https://www.international-schools-database.com
  // ============================================
  "edb_605638000123": { // Stamford Primary
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "G1-G2", amountMin: 217100, amountMax: 217100 },
        { label: "G3-G5", amountMin: 220500, amountMax: 220500 },
      ],
    },
    mandatoryCharges: [{ type: "CAPITAL_LEVY", label: "Capital Levy (One-off)", amountMin: 150000, amountMax: 150000, currency: "HKD", refundable: false, frequency: "ONE_OFF", note: "Or $30,000 annually" }],
    sourceNotes: [{ title: "Stamford Fees 2025/26", url: "https://www.sais.edu.hk/admissions/fees/", retrievedAt: "2026-01-19", evidenceLevel: "SCHOOL_SITE" }],
  },
  "edb_605638000133": { // Stamford Secondary
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "G6-G8", amountMin: 239900, amountMax: 239900 },
        { label: "G9-G10", amountMin: 247300, amountMax: 247300 },
        { label: "G11-G12", amountMin: 264000, amountMax: 264000 },
      ],
    },
    mandatoryCharges: [{ type: "CAPITAL_LEVY", label: "Capital Levy (One-off)", amountMin: 150000, amountMax: 150000, currency: "HKD", refundable: false, frequency: "ONE_OFF", note: "Or $30,000 annually" }],
    sourceNotes: [{ title: "Stamford Fees 2025/26", url: "https://www.sais.edu.hk/admissions/fees/", retrievedAt: "2026-01-19", evidenceLevel: "SCHOOL_SITE" }],
  },
  "edb_626864000133": { // Stamford West Kowloon Secondary
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "G6-G8", amountMin: 239900, amountMax: 239900 },
        { label: "G9-G10", amountMin: 247300, amountMax: 247300 },
        { label: "G11-G12", amountMin: 264000, amountMax: 264000 },
      ],
    },
    mandatoryCharges: [{ type: "CAPITAL_LEVY", label: "Capital Levy (One-off)", amountMin: 150000, amountMax: 150000, currency: "HKD", refundable: false, frequency: "ONE_OFF", note: "Or $30,000 annually" }],
    sourceNotes: [{ title: "Stamford Fees 2025/26", url: "https://www.sais.edu.hk/admissions/fees/", retrievedAt: "2026-01-19", evidenceLevel: "SCHOOL_SITE" }],
  },

  // ============================================
  // Singapore International School (Hong Kong) 新加坡國際學校
  // Source: https://www.singapore.edu.hk/finance-matters/
  // ============================================
  "edb_216003000211": { // SIS Kindergarten
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [{ label: "K1-K3", amountMin: 123000, amountMax: 123000 }],
    },
    mandatoryCharges: [{ type: "CAPITAL_LEVY", label: "Capital Levy", amountMin: 20000, amountMax: 20000, currency: "HKD", refundable: false, frequency: "ONE_OFF" }],
    sourceNotes: [{ title: "SIS Finance Matters 2025/26", url: "https://www.singapore.edu.hk/finance-matters/", retrievedAt: "2026-01-19", evidenceLevel: "SCHOOL_SITE" }],
  },
  "edb_216003000212": { // SIS Kindergarten (2nd entry)
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [{ label: "K1-K3", amountMin: 123000, amountMax: 123000 }],
    },
    mandatoryCharges: [{ type: "CAPITAL_LEVY", label: "Capital Levy", amountMin: 20000, amountMax: 20000, currency: "HKD", refundable: false, frequency: "ONE_OFF" }],
    sourceNotes: [{ title: "SIS Finance Matters 2025/26", url: "https://www.singapore.edu.hk/finance-matters/", retrievedAt: "2026-01-19", evidenceLevel: "SCHOOL_SITE" }],
  },
  "edb_216003000223": { // SIS Primary
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [{ label: "G1-G6", amountMin: 181100, amountMax: 181100 }],
    },
    mandatoryCharges: [{ type: "CAPITAL_LEVY", label: "Capital Levy", amountMin: 20000, amountMax: 20000, currency: "HKD", refundable: false, frequency: "ONE_OFF" }],
    sourceNotes: [{ title: "SIS Finance Matters 2025/26", url: "https://www.singapore.edu.hk/finance-matters/", retrievedAt: "2026-01-19", evidenceLevel: "SCHOOL_SITE" }],
  },
  "edb_216003000433": { // SIS Secondary
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "G7-G10", amountMin: 228800, amountMax: 228800 },
        { label: "G11-G12", amountMin: 274900, amountMax: 274900 },
      ],
    },
    mandatoryCharges: [{ type: "CAPITAL_LEVY", label: "Capital Levy", amountMin: 20000, amountMax: 20000, currency: "HKD", refundable: false, frequency: "ONE_OFF" }],
    sourceNotes: [{ title: "SIS Finance Matters 2025/26", url: "https://www.singapore.edu.hk/finance-matters/", retrievedAt: "2026-01-19", evidenceLevel: "SCHOOL_SITE" }],
  },

  // ============================================
  // Carmel School 迦密學校
  // Source: https://www.carmel.edu.hk/admissions/tuition-fees
  // ============================================
  "edb_216186000211": { // Carmel KG
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "Nursery 2", amountMin: 80500, amountMax: 80500 },
        { label: "K1-K2", amountMin: 108650, amountMax: 108650 },
        { label: "K3", amountMin: 193000, amountMax: 193000 },
      ],
    },
    mandatoryCharges: [],
    sourceNotes: [{ title: "Carmel School Fees 2025/26", url: "https://www.carmel.edu.hk/admissions/tuition-fees", retrievedAt: "2026-01-19", evidenceLevel: "SCHOOL_SITE" }],
  },
  "edb_216186000423": { // Carmel Primary
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [{ label: "G1-G5", amountMin: 193000, amountMax: 193000 }],
    },
    mandatoryCharges: [],
    sourceNotes: [{ title: "Carmel School Fees 2025/26", url: "https://www.carmel.edu.hk/admissions/tuition-fees", retrievedAt: "2026-01-19", evidenceLevel: "SCHOOL_SITE" }],
  },
  "edb_216186000323": { // Carmel Primary (2nd)
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [{ label: "G1-G5", amountMin: 193000, amountMax: 193000 }],
    },
    mandatoryCharges: [],
    sourceNotes: [{ title: "Carmel School Fees 2025/26", url: "https://www.carmel.edu.hk/admissions/tuition-fees", retrievedAt: "2026-01-19", evidenceLevel: "SCHOOL_SITE" }],
  },
  "edb_216186000433": { // Carmel Secondary
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [{ label: "G6-G12", amountMin: 226090, amountMax: 226090 }],
    },
    mandatoryCharges: [{ type: "CAPITAL_LEVY", label: "Capital Levy", amountMin: 18520, amountMax: 18520, currency: "HKD", refundable: false, frequency: "ANNUAL", note: "G6-G12 only" }],
    sourceNotes: [{ title: "Carmel School Fees 2025/26", url: "https://www.carmel.edu.hk/admissions/tuition-fees", retrievedAt: "2026-01-19", evidenceLevel: "SCHOOL_SITE" }],
  },

  // ============================================
  // Spanish School of Hong Kong 香港西班牙學校
  // Source: https://sshk.edu.hk/schoolfees/
  // ============================================
  "edb_609498000223": { // Spanish School Primary
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "K2-G3", amountMin: 85000, amountMax: 115000 },
        { label: "G4-G5", amountMin: 125000, amountMax: 125000 },
      ],
    },
    mandatoryCharges: [{ type: "CAPITAL_LEVY", label: "Capital Levy (Annual)", amountMin: 12000, amountMax: 12000, currency: "HKD", refundable: false, frequency: "ANNUAL", note: "Or one-off $70,000" }],
    sourceNotes: [{ title: "SSHK Fees 2025/26", url: "https://sshk.edu.hk/schoolfees/", retrievedAt: "2026-01-19", evidenceLevel: "SCHOOL_SITE" }],
  },
  "edb_609498000123": { // Spanish School Primary (2nd)
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "K2-G3", amountMin: 85000, amountMax: 115000 },
        { label: "G4-G5", amountMin: 125000, amountMax: 125000 },
      ],
    },
    mandatoryCharges: [{ type: "CAPITAL_LEVY", label: "Capital Levy (Annual)", amountMin: 12000, amountMax: 12000, currency: "HKD", refundable: false, frequency: "ANNUAL", note: "Or one-off $70,000" }],
    sourceNotes: [{ title: "SSHK Fees 2025/26", url: "https://sshk.edu.hk/schoolfees/", retrievedAt: "2026-01-19", evidenceLevel: "SCHOOL_SITE" }],
  },
  "edb_609498000133": { // Spanish School Secondary
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "G6-G8", amountMin: 128000, amountMax: 128000 },
        { label: "G9-G12", amountMin: 138000, amountMax: 138000 },
      ],
    },
    mandatoryCharges: [{ type: "CAPITAL_LEVY", label: "Capital Levy (Annual)", amountMin: 12000, amountMax: 12000, currency: "HKD", refundable: false, frequency: "ANNUAL", note: "Or one-off $70,000" }],
    sourceNotes: [{ title: "SSHK Fees 2025/26", url: "https://sshk.edu.hk/schoolfees/", retrievedAt: "2026-01-19", evidenceLevel: "SCHOOL_SITE" }],
  },
  "edb_609498000233": { // Spanish School Secondary (2nd)
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "G6-G8", amountMin: 128000, amountMax: 128000 },
        { label: "G9-G12", amountMin: 138000, amountMax: 138000 },
      ],
    },
    mandatoryCharges: [{ type: "CAPITAL_LEVY", label: "Capital Levy (Annual)", amountMin: 12000, amountMax: 12000, currency: "HKD", refundable: false, frequency: "ANNUAL", note: "Or one-off $70,000" }],
    sourceNotes: [{ title: "SSHK Fees 2025/26", url: "https://sshk.edu.hk/schoolfees/", retrievedAt: "2026-01-19", evidenceLevel: "SCHOOL_SITE" }],
  },

  // ============================================
  // International Christian School 基督教國際學校 - KG
  // Source: https://www.ics.edu.hk
  // ============================================
  "edb_542598000211": { // ICS KG
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "K1-K2", amountMin: 91000, amountMax: 91000 },
        { label: "K3", amountMin: 148400, amountMax: 148400 },
      ],
    },
    mandatoryCharges: [],
    sourceNotes: [{ title: "ICS Fees 2025/26", url: "https://www.ics.edu.hk", retrievedAt: "2026-01-19", evidenceLevel: "SCHOOL_SITE" }],
  },
  "edb_542598000212": { // ICS KG (2nd)
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "K1-K2", amountMin: 91000, amountMax: 91000 },
        { label: "K3", amountMin: 148400, amountMax: 148400 },
      ],
    },
    mandatoryCharges: [],
    sourceNotes: [{ title: "ICS Fees 2025/26", url: "https://www.ics.edu.hk", retrievedAt: "2026-01-19", evidenceLevel: "SCHOOL_SITE" }],
  },

  // ============================================
  // ICHK Hong Lok Yuen 國際學院 (Primary/KG)
  // Source: https://ichkhly.edu.hk/admissions/dates-fees-more/
  // ============================================
  "edb_230944000111": { // ICHK HLY KG
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "Pre-Nursery (3 afternoons)", amountMin: 25170, amountMax: 25170 },
        { label: "Part-time Nursery", amountMin: 83500, amountMax: 83500 },
        { label: "Full-time N-Y6", amountMin: 145110, amountMax: 145110 },
      ],
    },
    mandatoryCharges: [{ type: "CAPITAL_LEVY", label: "One-off Capital Levy", amountMin: 75000, amountMax: 75000, currency: "HKD", refundable: false, frequency: "ONE_OFF" }],
    sourceNotes: [{ title: "ICHK HLY Fees 2025/26", url: "https://ichkhly.edu.hk/admissions/dates-fees-more/", retrievedAt: "2026-01-19", evidenceLevel: "SCHOOL_SITE" }],
  },
  "edb_230944000112": { // ICHK HLY KG (2nd)
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "Pre-Nursery (3 afternoons)", amountMin: 25170, amountMax: 25170 },
        { label: "Part-time Nursery", amountMin: 83500, amountMax: 83500 },
        { label: "Full-time N-Y6", amountMin: 145110, amountMax: 145110 },
      ],
    },
    mandatoryCharges: [{ type: "CAPITAL_LEVY", label: "One-off Capital Levy", amountMin: 75000, amountMax: 75000, currency: "HKD", refundable: false, frequency: "ONE_OFF" }],
    sourceNotes: [{ title: "ICHK HLY Fees 2025/26", url: "https://ichkhly.edu.hk/admissions/dates-fees-more/", retrievedAt: "2026-01-19", evidenceLevel: "SCHOOL_SITE" }],
  },
  "edb_230944000113": { // ICHK HLY KG (3rd)
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "Pre-Nursery (3 afternoons)", amountMin: 25170, amountMax: 25170 },
        { label: "Part-time Nursery", amountMin: 83500, amountMax: 83500 },
        { label: "Full-time N-Y6", amountMin: 145110, amountMax: 145110 },
      ],
    },
    mandatoryCharges: [{ type: "CAPITAL_LEVY", label: "One-off Capital Levy", amountMin: 75000, amountMax: 75000, currency: "HKD", refundable: false, frequency: "ONE_OFF" }],
    sourceNotes: [{ title: "ICHK HLY Fees 2025/26", url: "https://ichkhly.edu.hk/admissions/dates-fees-more/", retrievedAt: "2026-01-19", evidenceLevel: "SCHOOL_SITE" }],
  },

  // ============================================
  // ICHK Secondary 國際學院 (New Territories)
  // Source: https://www.ichk.edu.hk
  // ============================================
  "edb_578789000133": { // ICHK Secondary
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [
        { label: "Y7-Y9", amountMin: 184500, amountMax: 184500 },
        { label: "Y10-Y11", amountMin: 192500, amountMax: 192500 },
        { label: "Y12-Y13", amountMin: 204900, amountMax: 204900 },
      ],
    },
    mandatoryCharges: [{ type: "CAPITAL_LEVY", label: "Capital Debenture", amountMin: 100000, amountMax: 100000, currency: "HKD", refundable: false, frequency: "ONE_OFF", note: "Paid in 3 installments" }],
    sourceNotes: [{ title: "ICHK Secondary Fees 2025/26", url: "https://www.ichk.edu.hk/join/admissions-info", retrievedAt: "2026-01-19", evidenceLevel: "SCHOOL_SITE" }],
  },

  // ============================================
  // Hongkong Japanese School 香港日本人學校
  // Source: https://es.jis.edu.hk/index.php/admission/fees
  // ============================================
  "edb_317357000123": { // HK Japanese School Primary
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [{ label: "Full Year", amountMin: 140460, amountMax: 140460 }],
    },
    mandatoryCharges: [{ type: "CAPITAL_LEVY", label: "Annual Capital Levy", amountMin: 15960, amountMax: 15960, currency: "HKD", refundable: false, frequency: "ANNUAL" }],
    sourceNotes: [{ title: "JIS Fees 2025/26", url: "https://es.jis.edu.hk/index.php/admission/fees", retrievedAt: "2026-01-19", evidenceLevel: "SCHOOL_SITE" }],
  },
  "edb_317357000133": { // HK Japanese School Secondary
    schoolYear: "2025/26",
    tuition: {
      currency: "HKD",
      bands: [{ label: "Full Year", amountMin: 140460, amountMax: 140460 }],
    },
    mandatoryCharges: [{ type: "CAPITAL_LEVY", label: "Annual Capital Levy", amountMin: 15960, amountMax: 15960, currency: "HKD", refundable: false, frequency: "ANNUAL" }],
    sourceNotes: [{ title: "JIS Fees 2025/26", url: "https://es.jis.edu.hk/index.php/admission/fees", retrievedAt: "2026-01-19", evidenceLevel: "SCHOOL_SITE" }],
  },

  // ============================================
  // 2024/25 學年私立學校學費數據
  // 注意：此部分數據為 2024/25 學年，需在 UI 顯示提示
  // ============================================

  // 拔萃女小學
  "edb_210706000123": {
    schoolYear: "2024/25",
    tuition: { currency: "HKD", bands: [{ label: "小一至小六", amountMin: 86000, amountMax: 86000 }] },
    mandatoryCharges: [],
    sourceNotes: [{ title: "拔萃女小學學費", url: "https://www.dgjs.edu.hk", retrievedAt: "2026-01-26", evidenceLevel: "SCHOOL_SITE" }],
  },

  // 聖保祿學校（小學部）
  "edb_212326000123": {
    schoolYear: "2024/25",
    tuition: { currency: "HKD", bands: [{ label: "小一至小六", amountMin: 55000, amountMax: 55000 }] },
    mandatoryCharges: [],
    sourceNotes: [{ title: "聖保祿學校學費", url: "https://www.spcs.edu.hk", retrievedAt: "2026-01-26", evidenceLevel: "SCHOOL_SITE" }],
  },

  // 香港培正小學
  "edb_513350000123": {
    schoolYear: "2024/25",
    tuition: { currency: "HKD", bands: [{ label: "小一至小六", amountMin: 66400, amountMax: 66400 }] },
    mandatoryCharges: [],
    sourceNotes: [{ title: "香港培正小學學費", url: "https://www.puiching.edu.hk", retrievedAt: "2026-01-26", evidenceLevel: "SCHOOL_SITE" }],
  },

  // 九龍塘學校（小學）
  "edb_512516000123": {
    schoolYear: "2024/25",
    tuition: { currency: "HKD", bands: [{ label: "小一至小六", amountMin: 69000, amountMax: 69000 }] },
    mandatoryCharges: [],
    sourceNotes: [{ title: "九龍塘學校學費", url: "https://www.ktsps.edu.hk", retrievedAt: "2026-01-26", evidenceLevel: "SCHOOL_SITE" }],
  },

  // 民生書院小學
  "edb_575399000123": {
    schoolYear: "2024/25",
    tuition: { currency: "HKD", bands: [{ label: "小一至小六", amountMin: 63000, amountMax: 63000 }] },
    mandatoryCharges: [],
    sourceNotes: [{ title: "民生書院小學學費", url: "https://www.msspri.edu.hk", retrievedAt: "2026-01-26", evidenceLevel: "SCHOOL_SITE" }],
  },

  // 聖士提反書院附屬小學
  "edb_517372000123": {
    schoolYear: "2024/25",
    tuition: { currency: "HKD", bands: [{ label: "小一至小六", amountMin: 92500, amountMax: 92500 }] },
    mandatoryCharges: [],
    sourceNotes: [{ title: "聖士提反書院附屬小學學費", url: "https://www.sscps.edu.hk", retrievedAt: "2026-01-26", evidenceLevel: "SCHOOL_SITE" }],
  },

  // 高主教書院小學部
  "edb_575240000123": {
    schoolYear: "2024/25",
    tuition: { currency: "HKD", bands: [{ label: "小一至小六", amountMin: 57500, amountMax: 57500 }] },
    mandatoryCharges: [],
    sourceNotes: [{ title: "高主教書院小學部學費", url: "https://www.rcps.edu.hk", retrievedAt: "2026-01-26", evidenceLevel: "SCHOOL_SITE" }],
  },

  // 聖類斯中學(小學部)
  "edb_591904000123": {
    schoolYear: "2024/25",
    tuition: { currency: "HKD", bands: [{ label: "小一至小六", amountMin: 55000, amountMax: 55000 }] },
    mandatoryCharges: [],
    sourceNotes: [{ title: "聖類斯中學小學部學費", url: "https://www.stlouis.edu.hk", retrievedAt: "2026-01-26", evidenceLevel: "SCHOOL_SITE" }],
  },

  // 嘉諾撒聖心學校私立部
  "edb_210315000121": {
    schoolYear: "2024/25",
    tuition: { currency: "HKD", bands: [{ label: "小一至小六", amountMin: 53680, amountMax: 53680 }] },
    mandatoryCharges: [],
    sourceNotes: [{ title: "嘉諾撒聖心學校私立部學費", url: "https://www.shcsps.edu.hk", retrievedAt: "2026-01-26", evidenceLevel: "SCHOOL_SITE" }],
  },

  // 九龍禮賢學校
  "edb_138177000123": {
    schoolYear: "2024/25",
    tuition: { currency: "HKD", bands: [{ label: "小一至小六", amountMin: 57800, amountMax: 59900 }] },
    mandatoryCharges: [],
    sourceNotes: [{ title: "九龍禮賢學校學費", url: "https://www.krs.edu.hk", retrievedAt: "2026-01-26", evidenceLevel: "SCHOOL_SITE" }],
  },

  // 激活英文小學
  "edb_534285000123": {
    schoolYear: "2024/25",
    tuition: { currency: "HKD", bands: [{ label: "小一至小六", amountMin: 116600, amountMax: 121000 }] },
    mandatoryCharges: [],
    sourceNotes: [{ title: "激活英文小學學費", url: "https://www.gigamind.edu.hk", retrievedAt: "2026-01-26", evidenceLevel: "SCHOOL_SITE" }],
  },

  // 蘇浙小學校
  "edb_132730000123": {
    schoolYear: "2024/25",
    tuition: { currency: "HKD", bands: [{ label: "小一至小六", amountMin: 43500, amountMax: 43500 }] },
    mandatoryCharges: [],
    sourceNotes: [{ title: "蘇浙小學校學費", url: "https://www.kiangsu.edu.hk", retrievedAt: "2026-01-26", evidenceLevel: "SCHOOL_SITE" }],
  },

  // 崇真小學暨幼稚園（英文部）
  "edb_514659000123": {
    schoolYear: "2024/25",
    tuition: { currency: "HKD", bands: [{ label: "英文小學部", amountMin: 59420, amountMax: 66000 }, { label: "國際小學部", amountMin: 85840, amountMax: 92840 }] },
    mandatoryCharges: [],
    sourceNotes: [{ title: "崇真小學暨幼稚園學費", url: "https://www.ttpskg.edu.hk", retrievedAt: "2026-01-26", evidenceLevel: "SCHOOL_SITE" }],
  },

  // 聖若望英文書院（小學部）
  "edb_212466000423": {
    schoolYear: "2024/25",
    tuition: { currency: "HKD", bands: [{ label: "小一至小二", amountMin: 78000, amountMax: 78000 }, { label: "小三至小四", amountMin: 79000, amountMax: 79000 }, { label: "小五", amountMin: 80000, amountMax: 80000 }] },
    mandatoryCharges: [],
    sourceNotes: [{ title: "聖若望英文書院學費", url: "https://st-johannes.edu.hk", retrievedAt: "2026-01-26", evidenceLevel: "SCHOOL_SITE" }],
  },

  // 聖嘉勒小學
  "edb_210021000123": {
    schoolYear: "2024/25",
    tuition: { currency: "HKD", bands: [{ label: "小一至小六", amountMin: 51000, amountMax: 51000 }] },
    mandatoryCharges: [],
    sourceNotes: [{ title: "聖嘉勒小學學費", url: "https://www.scps.edu.hk", retrievedAt: "2026-01-26", evidenceLevel: "SCHOOL_SITE" }],
  },

  // 聖方濟各英文小學
  "edb_133566000123": {
    schoolYear: "2024/25",
    tuition: { currency: "HKD", bands: [{ label: "小一至小六", amountMin: 54900, amountMax: 54900 }] },
    mandatoryCharges: [],
    sourceNotes: [{ title: "聖方濟各英文小學學費", url: "https://www.sfaeps.edu.hk", retrievedAt: "2026-01-26", evidenceLevel: "SCHOOL_SITE" }],
  },

  // 聖三一堂小學
  "edb_131350000123": {
    schoolYear: "2024/25",
    tuition: { currency: "HKD", bands: [{ label: "小一至小六", amountMin: 55000, amountMax: 55000 }] },
    mandatoryCharges: [],
    sourceNotes: [{ title: "聖三一堂小學學費", url: "https://www.htps.edu.hk", retrievedAt: "2026-01-26", evidenceLevel: "SCHOOL_SITE" }],
  },

  // 聖母小學
  "edb_528617000123": {
    schoolYear: "2024/25",
    tuition: { currency: "HKD", bands: [{ label: "小一至小六", amountMin: 44000, amountMax: 44000 }] },
    mandatoryCharges: [],
    sourceNotes: [{ title: "聖母小學學費", url: "https://www.olps.edu.hk", retrievedAt: "2026-01-26", evidenceLevel: "SCHOOL_SITE" }],
  },

  // 德望小學暨幼稚園
  "edb_588130000123": {
    schoolYear: "2024/25",
    tuition: { currency: "HKD", bands: [{ label: "小一至小三", amountMin: 47500, amountMax: 47500 }, { label: "小四至小六", amountMin: 48500, amountMax: 48500 }] },
    mandatoryCharges: [],
    sourceNotes: [{ title: "德望小學暨幼稚園學費", url: "https://www.ghs.edu.hk", retrievedAt: "2026-01-26", evidenceLevel: "SCHOOL_SITE" }],
  },

  // 九龍塘宣道小學
  "edb_133442000123": {
    schoolYear: "2024/25",
    tuition: { currency: "HKD", bands: [{ label: "小一至小六", amountMin: 62350, amountMax: 62350 }] },
    mandatoryCharges: [],
    sourceNotes: [{ title: "九龍塘宣道小學學費", url: "https://www.apskt.edu.hk", retrievedAt: "2026-01-26", evidenceLevel: "SCHOOL_SITE" }],
  },

  // 救恩學校
  "edb_512273000223": {
    schoolYear: "2024/25",
    tuition: { currency: "HKD", bands: [{ label: "小一至小六", amountMin: 67200, amountMax: 67200 }] },
    mandatoryCharges: [],
    sourceNotes: [{ title: "救恩學校學費", url: "https://www.kauyan.edu.hk", retrievedAt: "2026-01-26", evidenceLevel: "SCHOOL_SITE" }],
  },

  // 九龍真光中學（小學部）
  "edb_594792000123": {
    schoolYear: "2024/25",
    tuition: { currency: "HKD", bands: [{ label: "小一至小六", amountMin: 63740, amountMax: 65650 }] },
    mandatoryCharges: [],
    sourceNotes: [{ title: "九龍真光中學小學部學費", url: "https://www.ktlsps.edu.hk", retrievedAt: "2026-01-26", evidenceLevel: "SCHOOL_SITE" }],
  },

  // 香港培道小學
  "edb_324477000123": {
    schoolYear: "2024/25",
    tuition: { currency: "HKD", bands: [{ label: "小一至小六", amountMin: 62200, amountMax: 62200 }] },
    mandatoryCharges: [],
    sourceNotes: [{ title: "香港培道小學學費", url: "https://www.ptps.edu.hk", retrievedAt: "2026-01-26", evidenceLevel: "SCHOOL_SITE" }],
  },

  // 聖若瑟英文小學
  "edb_211303000123": {
    schoolYear: "2024/25",
    tuition: { currency: "HKD", bands: [{ label: "小一至小六", amountMin: 53200, amountMax: 53200 }] },
    mandatoryCharges: [],
    sourceNotes: [{ title: "聖若瑟英文小學學費", url: "https://www.sjacps.edu.hk", retrievedAt: "2026-01-26", evidenceLevel: "SCHOOL_SITE" }],
  },

  // 香港復臨學校（小學）
  "edb_513725000123": {
    schoolYear: "2024/25",
    tuition: { currency: "HKD", bands: [{ label: "小一至小六", amountMin: 117500, amountMax: 117500 }] },
    mandatoryCharges: [],
    sourceNotes: [{ title: "香港復臨學校學費", url: "https://www.hkaa.edu.hk", retrievedAt: "2026-01-26", evidenceLevel: "SCHOOL_SITE" }],
  },

  // 香港復臨學校（中學）
  "edb_513725000133": {
    schoolYear: "2024/25",
    tuition: { currency: "HKD", bands: [{ label: "中一至中六", amountMin: 139000, amountMax: 139000 }] },
    mandatoryCharges: [],
    sourceNotes: [{ title: "香港復臨學校學費", url: "https://www.hkaa.edu.hk", retrievedAt: "2026-01-26", evidenceLevel: "SCHOOL_SITE" }],
  },

  // 基督教香港信義會啟信學校
  "edb_151262000123": {
    schoolYear: "2024/25",
    tuition: { currency: "HKD", bands: [{ label: "小一至小六", amountMin: 73000, amountMax: 73000 }] },
    mandatoryCharges: [],
    sourceNotes: [{ title: "基督教香港信義會啟信學校學費", url: "https://www.elchkls.edu.hk", retrievedAt: "2026-01-26", evidenceLevel: "SCHOOL_SITE" }],
  },

  // 德萃小學
  "edb_603600000123": {
    schoolYear: "2024/25",
    tuition: { currency: "HKD", bands: [{ label: "小一至小六", amountMin: 100309, amountMax: 100309 }] },
    mandatoryCharges: [],
    sourceNotes: [{ title: "德萃小學學費", url: "https://www.sthilarys.edu.hk", retrievedAt: "2026-01-26", evidenceLevel: "SCHOOL_SITE" }],
  },

  // 漢師德萃學校
  "edb_130060000123": {
    schoolYear: "2024/25",
    tuition: { currency: "HKD", bands: [{ label: "小一至小六", amountMin: 100309, amountMax: 100309 }] },
    mandatoryCharges: [],
    sourceNotes: [{ title: "漢師德萃學校學費", url: "https://www.vnsaash.edu.hk", retrievedAt: "2026-01-26", evidenceLevel: "SCHOOL_SITE" }],
  },

  // 弘立書院（小學）
  "edb_553190000323": {
    schoolYear: "2024/25",
    tuition: { currency: "HKD", bands: [{ label: "小一至小六", amountMin: 221130, amountMax: 240320 }] },
    mandatoryCharges: [],
    sourceNotes: [{ title: "弘立書院學費", url: "https://academy.isf.edu.hk", retrievedAt: "2026-01-26", evidenceLevel: "SCHOOL_SITE" }],
  },

  // 弘立書院（中學）
  "edb_553190000333": {
    schoolYear: "2024/25",
    tuition: { currency: "HKD", bands: [{ label: "中一至中六", amountMin: 257400, amountMax: 268470 }] },
    mandatoryCharges: [],
    sourceNotes: [{ title: "弘立書院學費", url: "https://academy.isf.edu.hk", retrievedAt: "2026-01-26", evidenceLevel: "SCHOOL_SITE" }],
  },

  // 保良局蔡繼有學校（小學）
  "edb_543560000423": {
    schoolYear: "2024/25",
    tuition: { currency: "HKD", bands: [{ label: "Year 1-5", amountMin: 99825, amountMax: 99825 }, { label: "Year 6-8", amountMin: 129789, amountMax: 129789 }] },
    mandatoryCharges: [],
    sourceNotes: [{ title: "保良局蔡繼有學校學費", url: "https://cky.edu.hk", retrievedAt: "2026-01-26", evidenceLevel: "SCHOOL_SITE" }],
  },

  // 保良局蔡繼有學校（中學）
  "edb_543560000433": {
    schoolYear: "2024/25",
    tuition: { currency: "HKD", bands: [{ label: "Year 9-10", amountMin: 145453, amountMax: 145453 }, { label: "Year 11-12", amountMin: 146927, amountMax: 146927 }] },
    mandatoryCharges: [],
    sourceNotes: [{ title: "保良局蔡繼有學校學費", url: "https://cky.edu.hk", retrievedAt: "2026-01-26", evidenceLevel: "SCHOOL_SITE" }],
  },

  // 港灣學校（小學）
  "edb_570370000423": {
    schoolYear: "2024/25",
    tuition: { currency: "HKD", bands: [{ label: "小一至小六", amountMin: 223700, amountMax: 223700 }] },
    mandatoryCharges: [{ type: "CAPITAL_LEVY", label: "Annual Capital Levy", amountMin: 33000, amountMax: 33000, currency: "HKD", refundable: false, frequency: "ANNUAL", note: "債券持有人可豁免" }],
    sourceNotes: [{ title: "港灣學校學費", url: "https://www.ths.edu.hk", retrievedAt: "2026-01-26", evidenceLevel: "SCHOOL_SITE" }],
  },

  // 港灣學校（小學）- 另一校舍
  "edb_570370000323": {
    schoolYear: "2024/25",
    tuition: { currency: "HKD", bands: [{ label: "小一至小六", amountMin: 223700, amountMax: 223700 }] },
    mandatoryCharges: [{ type: "CAPITAL_LEVY", label: "Annual Capital Levy", amountMin: 33000, amountMax: 33000, currency: "HKD", refundable: false, frequency: "ANNUAL", note: "債券持有人可豁免" }],
    sourceNotes: [{ title: "港灣學校學費", url: "https://www.ths.edu.hk", retrievedAt: "2026-01-26", evidenceLevel: "SCHOOL_SITE" }],
  },

  // 港灣學校（中學）
  "edb_570370000333": {
    schoolYear: "2024/25",
    tuition: { currency: "HKD", bands: [{ label: "中一至中六", amountMin: 223700, amountMax: 223700 }] },
    mandatoryCharges: [{ type: "CAPITAL_LEVY", label: "Annual Capital Levy", amountMin: 33000, amountMax: 33000, currency: "HKD", refundable: false, frequency: "ANNUAL", note: "債券持有人可豁免" }],
    sourceNotes: [{ title: "港灣學校學費", url: "https://www.ths.edu.hk", retrievedAt: "2026-01-26", evidenceLevel: "SCHOOL_SITE" }],
  },

  // 漢鼎書院（小學）
  "edb_607819000123": {
    schoolYear: "2024/25",
    tuition: { currency: "HKD", bands: [{ label: "小一至小六", amountMin: 198000, amountMax: 198000 }] },
    mandatoryCharges: [],
    sourceNotes: [{ title: "漢鼎書院學費", url: "https://www.hanacademy.edu.hk", retrievedAt: "2026-01-26", evidenceLevel: "SCHOOL_SITE" }],
  },

  // 漢鼎書院（中學）
  "edb_607819000133": {
    schoolYear: "2024/25",
    tuition: { currency: "HKD", bands: [{ label: "中一至中六", amountMin: 208000, amountMax: 218000 }] },
    mandatoryCharges: [],
    sourceNotes: [{ title: "漢鼎書院學費", url: "https://www.hanacademy.edu.hk", retrievedAt: "2026-01-26", evidenceLevel: "SCHOOL_SITE" }],
  },

  // 香港威雅學校（小學）
  "edb_611751000123": {
    schoolYear: "2024/25",
    tuition: { currency: "HKD", bands: [{ label: "小一至小六", amountMin: 188000, amountMax: 188000 }] },
    mandatoryCharges: [{ type: "CAPITAL_LEVY", label: "Annual Capital Levy", amountMin: 35000, amountMax: 35000, currency: "HKD", refundable: false, frequency: "ANNUAL" }],
    sourceNotes: [{ title: "香港威雅學校學費", url: "https://was.edu.hk", retrievedAt: "2026-01-26", evidenceLevel: "SCHOOL_SITE" }],
  },

  // 香港威雅學校（中學）
  "edb_611751000133": {
    schoolYear: "2024/25",
    tuition: { currency: "HKD", bands: [{ label: "中一至中六", amountMin: 198000, amountMax: 198000 }] },
    mandatoryCharges: [{ type: "CAPITAL_LEVY", label: "Annual Capital Levy", amountMin: 35000, amountMax: 35000, currency: "HKD", refundable: false, frequency: "ANNUAL" }],
    sourceNotes: [{ title: "香港威雅學校學費", url: "https://was.edu.hk", retrievedAt: "2026-01-26", evidenceLevel: "SCHOOL_SITE" }],
  },

  // 英藝英文小學
  "edb_598062000123": {
    schoolYear: "2024/25",
    tuition: { currency: "HKD", bands: [{ label: "小一至小六", amountMin: 85800, amountMax: 85800 }] },
    mandatoryCharges: [],
    sourceNotes: [{ title: "英藝英文小學學費", url: "https://www.zenith.edu.hk", retrievedAt: "2026-01-26", evidenceLevel: "SCHOOL_SITE" }],
  },

  // 香港真光中學附屬小學暨幼稚園
  "edb_132047000123": {
    schoolYear: "2024/25",
    tuition: { currency: "HKD", bands: [{ label: "小一至小六", amountMin: 60000, amountMax: 63650 }] },
    mandatoryCharges: [],
    sourceNotes: [{ title: "香港真光中學附屬小學學費", url: "https://www.tlmshkps.edu.hk", retrievedAt: "2026-01-26", evidenceLevel: "SCHOOL_SITE" }],
  },

  // 啓思小學
  "edb_325279000123": {
    schoolYear: "2024/25",
    tuition: { currency: "HKD", bands: [{ label: "小一至小三", amountMin: 140360, amountMax: 140360 }, { label: "小四至小六", amountMin: 143660, amountMax: 143660 }] },
    mandatoryCharges: [],
    sourceNotes: [{ title: "啓思小學學費", url: "https://www.creativeprisch.edu.hk", retrievedAt: "2026-01-26", evidenceLevel: "SCHOOL_SITE" }],
  },

  // 國際基督教優質音樂中學暨小學（小學）
  "edb_553867000323": {
    schoolYear: "2024/25",
    tuition: { currency: "HKD", bands: [{ label: "小一至小六", amountMin: 63000, amountMax: 63000 }] },
    mandatoryCharges: [],
    sourceNotes: [{ title: "國際基督教優質音樂中學暨小學學費", url: "https://www.icqm.edu.hk", retrievedAt: "2026-01-26", evidenceLevel: "SCHOOL_SITE" }],
  },

  // 國際基督教優質音樂中學暨小學（中學）
  "edb_553867000333": {
    schoolYear: "2024/25",
    tuition: { currency: "HKD", bands: [{ label: "中一至中六", amountMin: 70000, amountMax: 70000 }] },
    mandatoryCharges: [],
    sourceNotes: [{ title: "國際基督教優質音樂中學暨小學學費", url: "https://www.icqm.edu.hk", retrievedAt: "2026-01-26", evidenceLevel: "SCHOOL_SITE" }],
  },

  // 大光德萃書院
  "edb_615137000133": {
    schoolYear: "2024/25",
    tuition: { currency: "HKD", bands: [{ label: "G7-G10", amountMin: 146443, amountMax: 154935 }, { label: "G11-G12 (A-Level/IB)", amountMin: 174911, amountMax: 181643 }] },
    mandatoryCharges: [],
    sourceNotes: [{ title: "大光德萃書院學費", url: "https://tkhc.edu.hk", retrievedAt: "2026-01-26", evidenceLevel: "SCHOOL_SITE" }],
  },

  // 地利亞英文小學暨幼稚園
  "edb_216208000123": {
    schoolYear: "2024/25",
    tuition: { currency: "HKD", bands: [{ label: "小一至小六", amountMin: 35500, amountMax: 37000 }] },
    mandatoryCharges: [],
    sourceNotes: [{ title: "地利亞英文小學暨幼稚園學費", url: "https://www.deliakg.edu.hk", retrievedAt: "2026-01-26", evidenceLevel: "SCHOOL_SITE" }],
  },

  // 九龍塘方方樂趣英文小學
  "edb_216232000123": {
    schoolYear: "2024/25",
    tuition: { currency: "HKD", bands: [{ label: "小一至小六", amountMin: 104500, amountMax: 104500 }] },
    mandatoryCharges: [],
    sourceNotes: [{ title: "九龍塘方方樂趣英文小學學費", url: "https://sris.edu.hk", retrievedAt: "2026-01-26", evidenceLevel: "SCHOOL_SITE" }],
  },

  // 啓基學校
  "edb_517100000223": {
    schoolYear: "2024/25",
    tuition: { currency: "HKD", bands: [{ label: "小一至小六", amountMin: 72520, amountMax: 72520 }] },
    mandatoryCharges: [],
    sourceNotes: [{ title: "啓基學校學費", url: "https://www.ccshki.edu.hk", retrievedAt: "2026-01-26", evidenceLevel: "SCHOOL_SITE" }],
  },

  // 新會商會港青基信學校
  "edb_592188000123": {
    schoolYear: "2024/25",
    tuition: { currency: "HKD", bands: [{ label: "小一至小六", amountMin: 105000, amountMax: 137400 }] },
    mandatoryCharges: [],
    sourceNotes: [{ title: "新會商會港青基信學校學費", url: "https://www.swcscs.edu.hk", retrievedAt: "2026-01-26", evidenceLevel: "SCHOOL_SITE" }],
  },

  // 培生學校（小學）
  "edb_581259000123": {
    schoolYear: "2024/25",
    tuition: { currency: "HKD", bands: [{ label: "小一至小六", amountMin: 135000, amountMax: 135000 }] },
    mandatoryCharges: [],
    sourceNotes: [{ title: "培生學校學費", url: "https://gca.edu.hk", retrievedAt: "2026-01-26", evidenceLevel: "SCHOOL_SITE" }],
  },

  // 培生學校（中學）
  "edb_581259000133": {
    schoolYear: "2024/25",
    tuition: { currency: "HKD", bands: [{ label: "中一至中六", amountMin: 135000, amountMax: 135000 }] },
    mandatoryCharges: [],
    sourceNotes: [{ title: "培生學校學費", url: "https://gca.edu.hk", retrievedAt: "2026-01-26", evidenceLevel: "SCHOOL_SITE" }],
  },

  // 神召會德萃書院（小學部）
  "edb_216224000123": {
    schoolYear: "2024/25",
    tuition: { currency: "HKD", bands: [{ label: "小一至小六", amountMin: 94985, amountMax: 94985 }] },
    mandatoryCharges: [],
    sourceNotes: [{ title: "神召會德萃書院學費", url: "https://www.aogsthilarys.edu.hk", retrievedAt: "2026-01-26", evidenceLevel: "SCHOOL_SITE" }],
  },

  // 德雅小學
  "edb_324434000123": {
    schoolYear: "2024/25",
    tuition: { currency: "HKD", bands: [{ label: "小一至小三", amountMin: 44000, amountMax: 44000 }, { label: "小四至小六", amountMin: 46000, amountMax: 46000 }] },
    mandatoryCharges: [],
    sourceNotes: [{ title: "德雅小學學費", url: "https://www.tnps.edu.hk", retrievedAt: "2026-01-26", evidenceLevel: "SCHOOL_SITE" }],
  },

  // 鄉師自然學校
  "edb_112720000123": {
    schoolYear: "2024/25",
    tuition: { currency: "HKD", bands: [{ label: "小一至小六", amountMin: 60000, amountMax: 75000 }] },
    mandatoryCharges: [],
    sourceNotes: [{ title: "鄉師自然學校學費", url: "https://www.gaiaschool.edu.hk", retrievedAt: "2026-01-26", evidenceLevel: "SCHOOL_SITE" }],
  },

  // 保良局建造商會學校
  "edb_607290000123": {
    schoolYear: "2024/25",
    tuition: { currency: "HKD", bands: [{ label: "小一至小六", amountMin: 115600, amountMax: 119100 }] },
    mandatoryCharges: [],
    sourceNotes: [{ title: "保良局建造商會學校學費", url: "https://www.plkis.edu.hk", retrievedAt: "2026-01-26", evidenceLevel: "SCHOOL_SITE" }],
  },

  // 中華基督教青年會基雋小學 YMCA Christian Academy
  "edb_589055000123": {
    schoolYear: "2024/25",
    tuition: { currency: "HKD", bands: [{ label: "小一至小六", amountMin: 144470, amountMax: 144470 }] },
    mandatoryCharges: [{ type: "CAPITAL_LEVY", label: "校園發展費 Capital Development Contribution", amountMin: 6515, amountMax: 6515, currency: "HKD", refundable: false, frequency: "ANNUAL" }],
    sourceNotes: [{ title: "YMCA Christian Academy學費", url: "https://yca.edu.hk/tuition-and-other-fees/", retrievedAt: "2026-01-26", evidenceLevel: "SCHOOL_SITE" }],
  },

  // 樹宏學校 Forest House Waldorf School（小學）
  "edb_596140000123": {
    schoolYear: "2024/25",
    tuition: { currency: "HKD", bands: [{ label: "小一至小六", amountMin: 138000, amountMax: 147500 }] },
    mandatoryCharges: [],
    sourceNotes: [{ title: "Forest House Waldorf School學費", url: "https://www.foresthouse.edu.hk", retrievedAt: "2026-01-26", evidenceLevel: "SCHOOL_SITE" }],
  },

  // 樹宏學校 Forest House Waldorf School（中學）
  "edb_596140000233": {
    schoolYear: "2024/25",
    tuition: { currency: "HKD", bands: [{ label: "中一至中三", amountMin: 138000, amountMax: 147500 }] },
    mandatoryCharges: [],
    sourceNotes: [{ title: "Forest House Waldorf School學費", url: "https://www.foresthouse.edu.hk", retrievedAt: "2026-01-26", evidenceLevel: "SCHOOL_SITE" }],
  },

  // 劍津英國學校 Oxbridge British School（小學）
  "edb_617334000123": {
    schoolYear: "2024/25",
    tuition: { currency: "HKD", bands: [{ label: "小一至小六", amountMin: 141120, amountMax: 141120 }] },
    mandatoryCharges: [{ type: "CAPITAL_LEVY", label: "年度資本徵費 Capital Levy", amountMin: 25000, amountMax: 25000, currency: "HKD", refundable: false, frequency: "ANNUAL" }],
    sourceNotes: [{ title: "Oxbridge British School學費", url: "https://www.oxbridgeschool.hk/admissions/fees/", retrievedAt: "2026-01-26", evidenceLevel: "SCHOOL_SITE" }],
  },

  // 劍津英國學校 Oxbridge British School（小學第二校舍）
  "edb_617334000223": {
    schoolYear: "2024/25",
    tuition: { currency: "HKD", bands: [{ label: "小一至小六", amountMin: 141120, amountMax: 141120 }] },
    mandatoryCharges: [{ type: "CAPITAL_LEVY", label: "年度資本徵費 Capital Levy", amountMin: 25000, amountMax: 25000, currency: "HKD", refundable: false, frequency: "ANNUAL" }],
    sourceNotes: [{ title: "Oxbridge British School學費", url: "https://www.oxbridgeschool.hk/admissions/fees/", retrievedAt: "2026-01-26", evidenceLevel: "SCHOOL_SITE" }],
  },

  // 劍津英國學校 Oxbridge British School（中學）
  "edb_617334000133": {
    schoolYear: "2024/25",
    tuition: { currency: "HKD", bands: [{ label: "中一至中三", amountMin: 141120, amountMax: 141120 }] },
    mandatoryCharges: [{ type: "CAPITAL_LEVY", label: "年度資本徵費 Capital Levy", amountMin: 25000, amountMax: 25000, currency: "HKD", refundable: false, frequency: "ANNUAL" }],
    sourceNotes: [{ title: "Oxbridge British School學費", url: "https://www.oxbridgeschool.hk/admissions/fees/", retrievedAt: "2026-01-26", evidenceLevel: "SCHOOL_SITE" }],
  },

  // 劍津英國學校 Oxbridge British School（中學第二校舍）
  "edb_617334000233": {
    schoolYear: "2024/25",
    tuition: { currency: "HKD", bands: [{ label: "中一至中三", amountMin: 141120, amountMax: 141120 }] },
    mandatoryCharges: [{ type: "CAPITAL_LEVY", label: "年度資本徵費 Capital Levy", amountMin: 25000, amountMax: 25000, currency: "HKD", refundable: false, frequency: "ANNUAL" }],
    sourceNotes: [{ title: "Oxbridge British School學費", url: "https://www.oxbridgeschool.hk/admissions/fees/", retrievedAt: "2026-01-26", evidenceLevel: "SCHOOL_SITE" }],
  },

  // 安基司學校 Anchors Academy
  "edb_622079000123": {
    schoolYear: "2024/25",
    tuition: { currency: "HKD", bands: [{ label: "小一至小六", amountMin: 146800, amountMax: 146800 }] },
    mandatoryCharges: [],
    sourceNotes: [{ title: "安基司學校學費", url: "https://www.anchorsacademy.edu.hk", retrievedAt: "2026-01-26", evidenceLevel: "SCHOOL_SITE" }],
  },

  // 百卉九江書院 Bloom KKCA Academy
  "edb_617393000123": {
    schoolYear: "2024/25",
    tuition: { currency: "HKD", bands: [{ label: "小一至小六", amountMin: 191510, amountMax: 191510 }] },
    mandatoryCharges: [],
    sourceNotes: [{ title: "百卉九江書院學費", url: "https://bloom.edu.hk", retrievedAt: "2026-01-26", evidenceLevel: "SCHOOL_SITE" }],
  },

  // 聖道百卉書院 Saint Too Bloom Academy
  "edb_623067000133": {
    schoolYear: "2024/25",
    tuition: { currency: "HKD", bands: [{ label: "G7-G8", amountMin: 202620, amountMax: 202620 }, { label: "G9-G10", amountMin: 210760, amountMax: 210760 }, { label: "G11-G12", amountMin: 216920, amountMax: 216920 }] },
    mandatoryCharges: [],
    sourceNotes: [{ title: "聖道百卉書院學費", url: "https://secondary.bloom.edu.hk/en/admissions/tuition-financial-aid", retrievedAt: "2026-01-26", evidenceLevel: "SCHOOL_SITE" }],
  },

  // 香島華德福學校 Island Waldorf School（小學）
  "edb_608319000223": {
    schoolYear: "2024/25",
    tuition: { currency: "HKD", bands: [{ label: "Class 1至8", amountMin: 141000, amountMax: 141000 }] },
    mandatoryCharges: [],
    sourceNotes: [{ title: "香島華德福學校學費", url: "https://iws.edu.hk/admissions/tuition-fees/", retrievedAt: "2026-01-26", evidenceLevel: "SCHOOL_SITE" }],
  },

  // 香島華德福學校 Island Waldorf School（中學）
  "edb_608319000233": {
    schoolYear: "2024/25",
    tuition: { currency: "HKD", bands: [{ label: "Class 1至8", amountMin: 141000, amountMax: 141000 }] },
    mandatoryCharges: [],
    sourceNotes: [{ title: "香島華德福學校學費", url: "https://iws.edu.hk/admissions/tuition-fees/", retrievedAt: "2026-01-26", evidenceLevel: "SCHOOL_SITE" }],
  },

  // 銀礦灣學校 Silvermine Bay School
  "edb_579009000123": {
    schoolYear: "2024/25",
    tuition: { currency: "HKD", bands: [{ label: "Reception", amountMin: 89920, amountMax: 89920 }, { label: "Year 1-6", amountMin: 97060, amountMax: 97060 }] },
    mandatoryCharges: [],
    sourceNotes: [{ title: "銀礦灣學校學費", url: "https://silverminebayschool.edu.hk", retrievedAt: "2026-01-26", evidenceLevel: "SCHOOL_SITE" }],
  },

  // 愛培學校 Aoi Pui School（自閉症專門學校）
  "edb_571130000323": {
    schoolYear: "2024/25",
    tuition: { currency: "HKD", bands: [{ label: "小一至小六", amountMin: 305460, amountMax: 306000 }] },
    mandatoryCharges: [],
    sourceNotes: [{ title: "愛培學校學費", url: "https://aoipuischool.hk/enrolment-tuition/", retrievedAt: "2026-01-26", evidenceLevel: "SCHOOL_SITE", note: "自閉症專門學校，$25,455-25,500/月 x 12期" }],
  },

  // 弘志學校 Discovery Mind Primary School
  "edb_590371000223": {
    schoolYear: "2024/25",
    tuition: { currency: "HKD", bands: [{ label: "小一至小六", amountMin: 124190, amountMax: 124190 }] },
    mandatoryCharges: [],
    sourceNotes: [{ title: "弘志學校學費", url: "https://discoverymind.edu.hk/primary/", retrievedAt: "2026-01-26", evidenceLevel: "SCHOOL_SITE" }],
  },

  // 示昕學校 Shema Academy（小學）
  "edb_608327000123": {
    schoolYear: "2024/25",
    tuition: { currency: "HKD", bands: [{ label: "小一至小六", amountMin: 68750, amountMax: 68750 }] },
    mandatoryCharges: [],
    sourceNotes: [{ title: "示昕學校學費", url: "https://shema.edu.hk", retrievedAt: "2026-01-26", evidenceLevel: "SCHOOL_SITE" }],
  },

  // 示昕學校 Shema Academy（中學）
  "edb_608327000133": {
    schoolYear: "2024/25",
    tuition: { currency: "HKD", bands: [{ label: "中一至中六", amountMin: 71280, amountMax: 71280 }] },
    mandatoryCharges: [],
    sourceNotes: [{ title: "示昕學校學費", url: "https://shema.edu.hk", retrievedAt: "2026-01-26", evidenceLevel: "SCHOOL_SITE" }],
  },

  // 奧柏學校 AP School（自閉症專門學校）
  "edb_619957000123": {
    schoolYear: "2024/25",
    tuition: { currency: "HKD", bands: [{ label: "小一至小六", amountMin: 336000, amountMax: 336000 }] },
    mandatoryCharges: [],
    sourceNotes: [{ title: "奧柏學校學費", url: "https://www.apschoolhk.edu.hk/en/tuition-fee", retrievedAt: "2026-01-26", evidenceLevel: "SCHOOL_SITE", note: "自閉症專門學校，$28,000/月 x 12期" }],
  },

  // 花園華德福學校 Garden House Waldorf School
  "edb_620548000123": {
    schoolYear: "2024/25",
    tuition: { currency: "HKD", bands: [{ label: "Class 1至6", amountMin: 143000, amountMax: 143000 }] },
    mandatoryCharges: [{ type: "OTHER_MANDATORY", label: "註冊費 Registration Fee", amountMin: 1000, amountMax: 1000, currency: "HKD", refundable: false, frequency: "ONE_OFF" }],
    sourceNotes: [{ title: "花園華德福學校學費", url: "https://www.gardenhouse.edu.hk/zh/tuitions", retrievedAt: "2026-01-26", evidenceLevel: "SCHOOL_SITE" }],
  },

  // 泰來書院 Anantara College
  "edb_612820000133": {
    schoolYear: "2024/25",
    tuition: { currency: "HKD", bands: [{ label: "中一至中六", amountMin: 29940, amountMax: 29940 }] },
    mandatoryCharges: [],
    sourceNotes: [{ title: "泰來書院學費", url: "https://anantara.hk/college/", retrievedAt: "2026-01-26", evidenceLevel: "SCHOOL_SITE" }],
  },

  // 香港紫荊書院 Hong Kong Bluebell College
  "edb_621374000133": {
    schoolYear: "2024/25",
    tuition: { currency: "HKD", bands: [{ label: "G6-G13", amountMin: 148000, amountMax: 168000 }] },
    mandatoryCharges: [],
    sourceNotes: [{ title: "香港紫荊書院學費", url: "https://www.hkbc.edu.hk", retrievedAt: "2026-01-26", evidenceLevel: "SCHOOL_SITE" }],
  },

  // 香港威雅學校（九龍）Wycombe Abbey School Hong Kong (Kowloon)
  "edb_627267000133": {
    schoolYear: "2024/25",
    tuition: { currency: "HKD", bands: [{ label: "Y9-Y13", amountMin: 198000, amountMax: 233000 }] },
    mandatoryCharges: [{ type: "CAPITAL_LEVY", label: "建校費 Capital Levy", amountMin: 35000, amountMax: 35000, currency: "HKD", refundable: false, frequency: "ANNUAL" }],
    sourceNotes: [{ title: "香港威雅學校九龍學費", url: "https://was.edu.hk/tuition-fees-school-calendar/", retrievedAt: "2026-01-26", evidenceLevel: "SCHOOL_SITE" }],
  },

  // California School（小學）
  "edb_289515000123": {
    schoolYear: "2024/25",
    tuition: { currency: "HKD", bands: [{ label: "P1-P6", amountMin: 17600, amountMax: 35000 }] },
    mandatoryCharges: [],
    sourceNotes: [{ title: "California School學費", url: "https://www.californiaschool.edu.hk", retrievedAt: "2026-01-26", evidenceLevel: "SCHOOL_SITE" }],
  },

  // California School（中學）
  "edb_289515000133": {
    schoolYear: "2024/25",
    tuition: { currency: "HKD", bands: [{ label: "F1-F7", amountMin: 35000, amountMax: 47850 }] },
    mandatoryCharges: [],
    sourceNotes: [{ title: "California School學費", url: "https://www.californiaschool.edu.hk", retrievedAt: "2026-01-26", evidenceLevel: "SCHOOL_SITE" }],
  },

  // 蘇浙小學校（北角分校）
  "edb_132730000223": {
    schoolYear: "2024/25",
    tuition: { currency: "HKD", bands: [{ label: "小一至小六", amountMin: 43500, amountMax: 54000 }] },
    mandatoryCharges: [],
    sourceNotes: [{ title: "蘇浙小學校學費", url: "https://www.kcps.edu.hk", retrievedAt: "2026-01-26", evidenceLevel: "SCHOOL_SITE" }],
  },

  // 蘇浙小學校（另一校舍）
  "edb_132730000121": {
    schoolYear: "2024/25",
    tuition: { currency: "HKD", bands: [{ label: "小一至小六", amountMin: 43500, amountMax: 54000 }] },
    mandatoryCharges: [],
    sourceNotes: [{ title: "蘇浙小學校學費", url: "https://www.kcps.edu.hk", retrievedAt: "2026-01-26", evidenceLevel: "SCHOOL_SITE" }],
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
