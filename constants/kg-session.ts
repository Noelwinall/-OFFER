/**
 * 幼稚園班別（AM/PM/WD）工具函數
 *
 * ID 格式：edb_XXXXXXXXXXXX（edb_ + 12位數字）
 * - 前 6 位 = school_no
 * - 中間 4 位 = location_no
 * - 最後 2 位 = session_code（11=AM, 12=PM, 13=WD）
 *
 * 合併規則：僅對 level === '幼稚園' 執行
 */

import type { School } from "@/types/school";

export type KgSession = "AM" | "PM" | "WD";

/** Session code 到班別的映射 */
const SESSION_CODE_MAP: Record<string, KgSession> = {
  "11": "AM",
  "12": "PM",
  "13": "WD",
};

/** ID 正則：edb_ + 12位數字 */
const EDB_ID_REGEX = /^edb_(\d{12})$/;

/**
 * 從學校 ID 提取班別
 * @returns 'AM' | 'PM' | 'WD' | null（格式不符或未知 session code）
 */
export function getKgSessionFromId(id: string): KgSession | null {
  const match = id.match(EDB_ID_REGEX);
  if (!match) return null;

  const digits = match[1];
  const sessionCode = digits.slice(-2); // 最後 2 位
  return SESSION_CODE_MAP[sessionCode] || null;
}

/**
 * 從學校 ID 取得合併 key
 * @returns `edb_${schoolNo}${locationNo}`（前 10 位）| null
 */
export function getKgGroupKey(id: string): string | null {
  const match = id.match(EDB_ID_REGEX);
  if (!match) return null;

  const digits = match[1];
  // 取前 10 位（school_no + location_no）
  return `edb_${digits.slice(0, 10)}`;
}

/** 合併後的學校類型（帶班別元數據） */
export interface GroupedSchool extends School {
  __kgSessions?: KgSession[];
  __variantIds?: string[];
}

/**
 * 合併幼稚園同校不同班別
 * - 僅對 level === '幼稚園' 執行合併
 * - 其它 level 直接返回
 * - 代表項優先級：WD > AM > PM > 第一條
 */
export function groupKindergartenVariants(schools: School[]): GroupedSchool[] {
  const result: GroupedSchool[] = [];
  const kgGroups = new Map<string, School[]>();

  for (const school of schools) {
    // 非幼稚園直接加入結果
    if (school.level !== "幼稚園") {
      result.push(school);
      continue;
    }

    const groupKey = getKgGroupKey(school.id);
    // 格式不符的幼稚園也直接加入
    if (!groupKey) {
      result.push(school);
      continue;
    }

    // 按 key 分組
    if (!kgGroups.has(groupKey)) {
      kgGroups.set(groupKey, []);
    }
    kgGroups.get(groupKey)!.push(school);
  }

  // 處理幼稚園分組
  for (const [, variants] of kgGroups) {
    // 收集班別
    const sessions: KgSession[] = [];
    const variantIds: string[] = [];

    for (const v of variants) {
      const session = getKgSessionFromId(v.id);
      if (session && !sessions.includes(session)) {
        sessions.push(session);
      }
      variantIds.push(v.id);
    }

    // 排序班別：AM, PM, WD
    sessions.sort((a, b) => {
      const order = { AM: 0, PM: 1, WD: 2 };
      return order[a] - order[b];
    });

    // 選代表項：WD > AM > PM > 第一條
    let representative: School = variants[0];
    for (const priority of ["WD", "AM", "PM"] as KgSession[]) {
      const found = variants.find((v) => getKgSessionFromId(v.id) === priority);
      if (found) {
        representative = found;
        break;
      }
    }

    // 構建合併結果
    const grouped: GroupedSchool = {
      ...representative,
      __kgSessions: sessions.length > 0 ? sessions : undefined,
      __variantIds: variantIds.length > 1 ? variantIds : undefined,
    };

    result.push(grouped);
  }

  return result;
}
