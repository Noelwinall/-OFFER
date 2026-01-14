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
 * key: school.id
 * value: SchoolFees
 *
 * Commit 1: 只建立框架，不錄入真實數據
 * Commit 2: 將錄入 10-20 所有明確證據的學校
 */
export const feesData202526: FeesDataMap = {
  // 暫無數據 - Commit 2 將錄入有證據的學校費用
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
