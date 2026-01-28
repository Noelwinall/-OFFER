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

/** Campus info for schools combined by website */
export interface CampusInfo {
  id: string;
  name: string;
  address: string;
}

/** 合併後的學校類型（帶 session 元數據） */
export interface GroupedSchool extends School {
  __sessions?: SessionType[];
  __variantIds?: string[];
  /** 是否顯示 session 標籤（幼稚園=true, 小學=false） */
  __showSessions?: boolean;
  /** 多校區信息（同網站合併時使用） */
  __campuses?: CampusInfo[];
}

/** 分組條件函數類型 */
export type GroupPredicate = (school: School) => boolean;

/** 檢查是否為幼稚園 */
export const isKindergarten = (school: School): boolean =>
  String(school.level ?? "").includes("幼稚園");

/** 檢查是否為小學 */
export const isPrimary = (school: School): boolean =>
  String(school.level ?? "").includes("小學");

/** 檢查是否為中學 */
export const isSecondary = (school: School): boolean =>
  String(school.level ?? "").includes("中學");

/** 默認條件：對幼稚園、小學、中學啟用合併 */
export const defaultPredicate: GroupPredicate = (school) =>
  isKindergarten(school) || isPrimary(school) || isSecondary(school);

/**
 * 正規化網站 URL（用於合併同網站學校）
 * 去除 protocol、www、路徑，只保留主域名
 */
export function normalizeWebsite(url: string | undefined): string {
  if (!url) return "";
  return url
    .replace(/^https?:\/\//, "")
    .replace(/\/.*$/, "")
    .replace(/^www\./, "")
    .toLowerCase();
}

/**
 * 從地址提取建築物名稱（用於判斷是否同一棟樓）
 * 例如：「九龍何文田迦密村街９號君逸山１樓」→「君逸山」
 * 例如：「香港北角福蔭道1，3＆5號海峰園高峰閣第1座2樓」→「海峰園高峰閣第1座」
 */
function extractBuildingName(address: string): string {
  if (!address) return "";

  // 先正規化地址：統一全形/半形數字、標點
  let normalized = address
    .replace(/０/g, "0").replace(/１/g, "1").replace(/２/g, "2")
    .replace(/３/g, "3").replace(/４/g, "4").replace(/５/g, "5")
    .replace(/６/g, "6").replace(/７/g, "7").replace(/８/g, "8").replace(/９/g, "9")
    .replace(/，/g, ",").replace(/、/g, ",").replace(/＆/g, "&")
    .replace(/\s+/g, ""); // 移除空格

  // 移除樓層信息（地下、X樓、X層等）
  let cleaned = normalized
    .replace(/地下下層.*$/, "")
    .replace(/地下.*$/, "")
    .replace(/[0-9]+樓.*$/, "")
    .replace(/[0-9]+層.*$/, "")
    .trim();

  // 提取號碼後面的建築物名稱
  // 匹配：XX號 + 建築物名
  const match = cleaned.match(/[0-9]+號(.+)$/);
  if (match && match[1]) {
    return match[1].trim();
  }

  // 如果沒有匹配到，返回清理後的整個地址用於比較
  return cleaned;
}

/**
 * 判斷學校類型（幼兒園 vs 幼稚園）
 * 幼兒園 = Nursery (0-3歲)
 * 幼稚園 = Kindergarten (3-6歲)
 */
function getSchoolSubType(name: string): "nursery" | "kindergarten" {
  // 幼兒園 in name means nursery
  if (name.includes("幼兒園")) {
    return "nursery";
  }
  // Default to kindergarten (幼稚園)
  return "kindergarten";
}

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

    // 按 key + level 分組，避免合併不同級別（幼稚園/小學/中學）
    // ID 結構：edb_XXXXXX YYYY ZZ（school_no + location_no + session_code）
    // 但 ZZ 有時也表示級別（13=幼稚園, 23=小學, 33=中學），不只是 session
    const fullGroupKey = `${groupKey}|${school.level}`;
    if (!groups.has(fullGroupKey)) {
      groups.set(fullGroupKey, []);
    }
    groups.get(fullGroupKey)!.push(school);
  }

  // 第一步：處理 ID 分組
  const firstPassResults: GroupedSchool[] = [];
  for (const [, variants] of groups) {
    const grouped = mergeVariants(variants);
    firstPassResults.push(grouped);
  }

  // 第二步：按名稱+級別合併不同 location 的同名學校（幼稚園+小學）
  // 重要：不同級別（幼稚園/小學/中學）不應合併，即使名稱相同
  const nameGroups = new Map<string, GroupedSchool[]>();
  for (const school of firstPassResults) {
    // 只對符合條件的學校做名稱合併
    if (!predicate(school)) {
      result.push(school);
      continue;
    }
    // 使用 name + level 作為 key，避免合併不同級別
    const nameKey = `${school.name}|${school.level}`;
    if (!nameGroups.has(nameKey)) {
      nameGroups.set(nameKey, []);
    }
    nameGroups.get(nameKey)!.push(school);
  }

  // 合併同名學校
  const afterNameMerge: GroupedSchool[] = [];
  for (const [, sameNameSchools] of nameGroups) {
    if (sameNameSchools.length === 1) {
      afterNameMerge.push(sameNameSchools[0]);
    } else {
      // 合併多個同名學校
      const merged = mergeGroupedSchools(sameNameSchools);
      afterNameMerge.push(merged);
    }
  }

  // 第三步：按「同網站 + 同建築物 + 同類型」合併學校（如 Victoria 同棟樓不同樓層的同類型學校）
  // 注意：幼兒園(nursery, 0-3歲) 和 幼稚園(kindergarten, 3-6歲) 不應合併
  const buildingGroups = new Map<string, GroupedSchool[]>();
  for (const school of afterNameMerge) {
    const site = normalizeWebsite(school.website);
    const building = extractBuildingName(school.address);
    const subType = getSchoolSubType(school.name);
    // 只對有效網站、有效建築物名且符合條件的學校做合併
    if (!site || site.length < 5 || !building || building.length < 2 || !predicate(school)) {
      result.push(school);
      continue;
    }
    // 使用 website + building + level + subType 作為 key
    const buildingKey = `${site}|${building}|${school.level}|${subType}`;
    if (!buildingGroups.has(buildingKey)) {
      buildingGroups.set(buildingKey, []);
    }
    buildingGroups.get(buildingKey)!.push(school);
  }

  // 合併同網站+同建築物的學校
  for (const [, sameBuildingSchools] of buildingGroups) {
    if (sameBuildingSchools.length === 1) {
      result.push(sameBuildingSchools[0]);
    } else {
      // 合併多個同建築物學校
      const merged = mergeByBuilding(sameBuildingSchools);
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

  // 只有幼稚園顯示 session 標籤
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

/**
 * 合併同建築物的學校（第三步）
 * 將同一網站 + 同一建築物的學校合併，記錄各樓層信息
 */
function mergeByBuilding(schools: GroupedSchool[]): GroupedSchool {
  // 收集所有校區信息
  const campuses: CampusInfo[] = [];
  const allSessions: SessionType[] = [];
  const allVariantIds: string[] = [];

  for (const school of schools) {
    // 添加校區信息
    campuses.push({
      id: school.id,
      name: school.name,
      address: school.address,
    });

    // 收集 sessions
    if (school.__sessions) {
      for (const s of school.__sessions) {
        if (!allSessions.includes(s)) {
          allSessions.push(s);
        }
      }
    }

    // 收集 variant IDs
    if (school.__variantIds) {
      allVariantIds.push(...school.__variantIds);
    } else {
      allVariantIds.push(school.id);
    }

    // 如果學校本身已有校區信息，也要合併
    if (school.__campuses) {
      for (const c of school.__campuses) {
        if (!campuses.some(existing => existing.id === c.id)) {
          campuses.push(c);
        }
      }
    }
  }

  // 排序 sessions
  allSessions.sort((a, b) => {
    const order = { AM: 0, PM: 1, WD: 2 };
    return order[a] - order[b];
  });

  // 選擇代表項：優先選名稱最短的（通常是主校區）
  const representative = schools.reduce((shortest, current) =>
    current.name.length < shortest.name.length ? current : shortest
  , schools[0]);

  // 幼稚園顯示 session 標籤
  const showSessions = isKindergarten(representative);

  return {
    ...representative,
    __sessions: allSessions.length > 0 ? allSessions : undefined,
    __variantIds: allVariantIds.length > 1 ? allVariantIds : undefined,
    __showSessions: showSessions,
    __campuses: campuses.length > 1 ? campuses : undefined,
  };
}
