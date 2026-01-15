/**
 * Session 分組工具（通用）
 *
 * 用於合併同一學校不同班別（AM/PM/WD）的記錄
 * 目前支援幼稚園，未來可擴展到小學
 *
 * ID 格式：edb_XXXXXXXXXXXX（edb_ + 12位數字）
 * - 前 6 位 = school_no
 * - 中間 4 位 = location_no
 * - 最後 2 位 = session_code（11=AM, 12=PM, 13=WD）
 */

import type { School } from "@/types/school";

export type SessionType = "AM" | "PM" | "WD";

/** Session code 到類型的映射 */
const SESSION_CODE_MAP: Record<string, SessionType> = {
  "11": "AM",
  "12": "PM",
  "13": "WD",
};

/** Session 中文顯示名稱 */
export const SESSION_LABELS: Record<SessionType, string> = {
  AM: "上午班",
  PM: "下午班",
  WD: "全天",
};

/** Session 標籤顏色（鮮艷高飽和） */
export const SESSION_COLORS: Record<SessionType, string> = {
  AM: "#8B5CF6", // 紫色 - 上午班
  PM: "#3B82F6", // 藍色 - 下午班
  WD: "#10B981", // 綠色 - 全天
};

/** ID 正則：edb_ + 12位數字 */
const EDB_ID_REGEX = /^edb_(\d{12})$/;

/**
 * 從學校 ID 提取 session 類型
 * @returns 'AM' | 'PM' | 'WD' | null（格式不符或未知 session code）
 */
export function getSessionFromId(id: string): SessionType | null {
  const match = id.match(EDB_ID_REGEX);
  if (!match) return null;

  const digits = match[1];
  const sessionCode = digits.slice(-2); // 最後 2 位
  return SESSION_CODE_MAP[sessionCode] || null;
}

/**
 * 從學校 ID 取得分組 key
 * @returns `edb_${schoolNo}${locationNo}`（前 10 位）| null
 */
export function getGroupKey(id: string): string | null {
  const match = id.match(EDB_ID_REGEX);
  if (!match) return null;

  const digits = match[1];
  // 取前 10 位（school_no + location_no）
  return `edb_${digits.slice(0, 10)}`;
}

/** 合併後的學校類型（帶 session 元數據） */
export interface GroupedSchool extends School {
  __sessions?: SessionType[];
  __variantIds?: string[];
  /** 是否顯示 session 標籤（幼稚園=true, 小學=false） */
  __showSessions?: boolean;
}

/** 分組條件函數類型 */
export type GroupPredicate = (school: School) => boolean;

/** 檢查是否為幼稚園 */
export const isKindergarten = (school: School): boolean =>
  String(school.level ?? "").includes("幼稚園");

/** 檢查是否為小學 */
export const isPrimary = (school: School): boolean =>
  String(school.level ?? "").includes("小學");

/** 默認條件：對幼稚園和小學啟用合併 */
export const defaultPredicate: GroupPredicate = (school) =>
  isKindergarten(school) || isPrimary(school);

/**
 * 合併同校不同班別（通用函數）
 *
 * @param schools 原始學校列表
 * @param predicate 分組條件（默認只對幼稚園啟用）
 * @returns 合併後的學校列表
 *
 * 合併規則：
 * - 僅對符合 predicate 的學校執行合併
 * - 第一步：按 ID 前 10 位（school_no + location_no）分組
 * - 第二步：再按名稱合併不同 location 的同名學校
 * - 代表項優先級：WD > AM > PM > 第一條
 * - 在代表項上附加 __sessions 和 __variantIds
 */
export function groupSchoolsBySession(
  schools: School[],
  predicate: GroupPredicate = defaultPredicate
): GroupedSchool[] {
  const result: GroupedSchool[] = [];
  const groups = new Map<string, School[]>();

  for (const school of schools) {
    // 不符合條件的學校直接加入結果
    if (!predicate(school)) {
      result.push(school);
      continue;
    }

    const groupKey = getGroupKey(school.id);
    // 格式不符的學校也直接加入
    if (!groupKey) {
      result.push(school);
      continue;
    }

    // 按 key 分組
    if (!groups.has(groupKey)) {
      groups.set(groupKey, []);
    }
    groups.get(groupKey)!.push(school);
  }

  // 第一步：處理 ID 分組
  const firstPassResults: GroupedSchool[] = [];
  for (const [, variants] of groups) {
    const grouped = mergeVariants(variants);
    firstPassResults.push(grouped);
  }

  // 第二步：按名稱合併不同 location 的同名學校（幼稚園+小學）
  const nameGroups = new Map<string, GroupedSchool[]>();
  for (const school of firstPassResults) {
    // 只對符合條件的學校做名稱合併
    if (!predicate(school)) {
      result.push(school);
      continue;
    }
    const nameKey = school.name;
    if (!nameGroups.has(nameKey)) {
      nameGroups.set(nameKey, []);
    }
    nameGroups.get(nameKey)!.push(school);
  }

  // [TEMP] 調試：檢查 大埔浸信會公立學校 的合併情況
  const tpDebug = nameGroups.get("大埔浸信會公立學校");
  if (tpDebug) {
    console.log(`[TEMP-DEBUG] 大埔浸信會公立學校 name group size: ${tpDebug.length}`);
    tpDebug.forEach((s, i) => console.log(`  [${i}] id=${s.id}, level=${s.level}`));
  }

  // 合併同名學校
  for (const [, sameNameSchools] of nameGroups) {
    if (sameNameSchools.length === 1) {
      result.push(sameNameSchools[0]);
    } else {
      // 合併多個同名學校
      const merged = mergeGroupedSchools(sameNameSchools);
      result.push(merged);
    }
  }

  return result;
}

/**
 * 合併多個變體為一個 GroupedSchool
 */
function mergeVariants(variants: School[]): GroupedSchool {
  const sessions: SessionType[] = [];
  const variantIds: string[] = [];

  for (const v of variants) {
    const session = getSessionFromId(v.id);
    if (session && !sessions.includes(session)) {
      sessions.push(session);
    }
    variantIds.push(v.id);
  }

  // 排序 sessions：AM, PM, WD
  sessions.sort((a, b) => {
    const order = { AM: 0, PM: 1, WD: 2 };
    return order[a] - order[b];
  });

  // 選代表項：WD > AM > PM > 第一條
  let representative: School = variants[0];
  for (const priority of ["WD", "AM", "PM"] as SessionType[]) {
    const found = variants.find((v) => getSessionFromId(v.id) === priority);
    if (found) {
      representative = found;
      break;
    }
  }

  // 幼稚園顯示標籤，小學不顯示
  const showSessions = isKindergarten(representative);

  return {
    ...representative,
    __sessions: sessions.length > 0 ? sessions : undefined,
    __variantIds: variantIds.length > 1 ? variantIds : undefined,
    __showSessions: showSessions,
  };
}

/**
 * 合併多個已分組的 GroupedSchool（用於同名學校合併）
 */
function mergeGroupedSchools(schools: GroupedSchool[]): GroupedSchool {
  const allSessions: SessionType[] = [];
  const allVariantIds: string[] = [];

  for (const school of schools) {
    // 收集所有 sessions
    if (school.__sessions) {
      for (const s of school.__sessions) {
        if (!allSessions.includes(s)) {
          allSessions.push(s);
        }
      }
    }
    // 收集所有 variant IDs
    if (school.__variantIds) {
      allVariantIds.push(...school.__variantIds);
    } else {
      allVariantIds.push(school.id);
    }
  }

  // 排序 sessions
  allSessions.sort((a, b) => {
    const order = { AM: 0, PM: 1, WD: 2 };
    return order[a] - order[b];
  });

  // 選擇代表項：優先選有 WD 的，其次 AM，其次 PM
  let representative = schools[0];
  for (const priority of ["WD", "AM", "PM"] as SessionType[]) {
    const found = schools.find((s) => s.__sessions?.includes(priority));
    if (found) {
      representative = found;
      break;
    }
  }

  // 幼稚園顯示標籤，小學不顯示
  const showSessions = isKindergarten(representative);

  return {
    ...representative,
    __sessions: allSessions.length > 0 ? allSessions : undefined,
    __variantIds: allVariantIds.length > 1 ? allVariantIds : undefined,
    __showSessions: showSessions,
  };
}
