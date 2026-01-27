/**
 * Outstanding DSS/Aided/Public Schools List
 *
 * Curated list of outstanding non-international schools
 * for use in Q&A flow and school recommendations.
 *
 * Categories:
 * - DSS (直資): Direct Subsidy Scheme schools
 * - Government (公立): Government-run schools
 * - Aided (資助): Aided schools
 *
 * Levels:
 * - SECONDARY: 中學
 * - PRIMARY: 小學 (related/feeder schools to outstanding secondary)
 *
 * @maintainer Manually curated - update school IDs if data changes
 */

import { SCHOOLS } from "@/data/schools";
import type { School, Level } from "@/types/school";

/**
 * Outstanding school categories
 */
export type OutstandingCategory = "DSS" | "GOVERNMENT" | "AIDED";

/**
 * Category display info
 */
export const OUTSTANDING_CATEGORY_INFO: Record<OutstandingCategory, { label: string; description: string }> = {
  DSS: {
    label: "直資學校",
    description: "頂尖直資中學",
  },
  GOVERNMENT: {
    label: "官立學校",
    description: "優秀官立中學",
  },
  AIDED: {
    label: "資助學校",
    description: "優秀資助中學",
  },
};

/**
 * Outstanding schools config by category
 * Each entry: { id, nameZh, nameEn } for auditability
 */
export const OUTSTANDING_SCHOOLS_CONFIG: Record<OutstandingCategory, Array<{
  id: string;
  nameZh: string;
  nameEn: string;
}>> = {
  /**
   * DSS (直資) - 7 Schools
   */
  DSS: [
    // 1. St. Paul's Co-educational College
    { id: "edb_510980000133", nameZh: "聖保羅男女中學", nameEn: "St. Paul's Co-educational College" },
    // 2. Diocesan Girls' School
    { id: "edb_511714000133", nameZh: "拔萃女書院", nameEn: "Diocesan Girls' School" },
    // 3. St. Paul's Convent School
    { id: "edb_514217000133", nameZh: "聖保祿學校", nameEn: "St. Paul's Convent School" },
    // 4. Heep Yunn School
    { id: "edb_511935000133", nameZh: "協恩中學", nameEn: "Heep Yunn School" },
    // 5. Diocesan Boys' School
    { id: "edb_510777000133", nameZh: "拔萃男書院", nameEn: "Diocesan Boys' School" },
    // 6. HKUGA College
    { id: "edb_560472000133", nameZh: "港大同學會書院", nameEn: "HKUGA College" },
    // 7. Pui Kiu College
    { id: "edb_560553000133", nameZh: "培僑書院", nameEn: "Pui Kiu College" },
  ],

  /**
   * GOVERNMENT (官立/公立) - 3 Schools
   */
  GOVERNMENT: [
    // 1. Queen's College
    { id: "edb_510432000133", nameZh: "皇仁書院", nameEn: "Queen's College" },
    // 2. Tsuen Wan Government Secondary School
    { id: "edb_510467000133", nameZh: "荃灣官立中學", nameEn: "Tsuen Wan Government Secondary School" },
    // 3. Queen Elizabeth School
    { id: "edb_510424000133", nameZh: "伊利沙伯中學", nameEn: "Queen Elizabeth School" },
  ],

  /**
   * AIDED (資助) - 11 Schools
   */
  AIDED: [
    // 1. La Salle College
    { id: "edb_512583000133", nameZh: "喇沙書院", nameEn: "La Salle College" },
    // 2. St. Mary's Canossian College
    { id: "edb_514128000133", nameZh: "嘉諾撒聖瑪利書院", nameEn: "St. Mary's Canossian College" },
    // 3. Maryknoll Convent School (Secondary Section)
    { id: "edb_512818000133", nameZh: "瑪利諾修院學校(中學部)", nameEn: "Maryknoll Convent School (Secondary Section)" },
    // 4. Ying Wa Girls' School
    { id: "edb_511030000133", nameZh: "英華女學校", nameEn: "Ying Wa Girls' School" },
    // 5. S.K.H. Lam Woo Memorial Secondary School
    { id: "edb_170542000133", nameZh: "聖公會林護紀念中學", nameEn: "S.K.H. Lam Woo Memorial Secondary School" },
    // 6. Hong Kong Taoist Association Tang Hin Memorial Secondary School
    { id: "edb_190420000133", nameZh: "香港道教聯合會鄧顯紀念中學", nameEn: "Hong Kong Taoist Association Tang Hin Memorial Secondary School" },
    // 7. Sheng Kung Hui Tsang Shiu Tim Secondary School
    { id: "edb_230790000133", nameZh: "聖公會曾肇添中學", nameEn: "Sheng Kung Hui Tsang Shiu Tim Secondary School" },
    // 8. Pui Ching Middle School
    { id: "edb_510912000133", nameZh: "香港培正中學", nameEn: "Pui Ching Middle School" },
    // 9. Shatin Tsung Tsin Secondary School
    { id: "edb_190527000233", nameZh: "沙田崇真中學", nameEn: "Shatin Tsung Tsin Secondary School" },
    // 10. St. Stephen's Girls' College
    { id: "edb_514268000133", nameZh: "聖士提反女子中學", nameEn: "St. Stephen's Girls' College" },
    // 11. Po Leung Kuk Centenary Li Shiu Chung Memorial College
    { id: "edb_230774000133", nameZh: "保良局百周年李兆忠紀念中學", nameEn: "Po Leung Kuk Centenary Li Shiu Chung Memorial College" },
  ],
};

/**
 * Outstanding PRIMARY schools config by category
 * These are related/feeder schools to the outstanding secondary schools
 * Each entry: { id, nameZh, nameEn, relationship, relatedSecondaryId } for auditability
 */
export const OUTSTANDING_PRIMARY_SCHOOLS_CONFIG: Record<OutstandingCategory, Array<{
  id: string;
  nameZh: string;
  nameEn: string;
  relationship: "THROUGH_TRAIN" | "AFFILIATED" | "LINKED" | "NAME_MATCH";
  relatedSecondaryId: string;
}>> = {
  /**
   * DSS (直資) Primary - 7 Schools
   * All have through-train or affiliated relationship with outstanding secondary
   */
  DSS: [
    // 1. St. Paul's Co-educational College Primary School (→ 聖保羅男女中學)
    { id: "edb_514187000323", nameZh: "聖保羅男女中學附屬小學", nameEn: "St. Paul's Co-educational College Primary School", relationship: "THROUGH_TRAIN", relatedSecondaryId: "edb_510980000133" },
    // 2. Diocesan Girls' Junior School (→ 拔萃女書院)
    { id: "edb_210706000123", nameZh: "拔萃女小學", nameEn: "Diocesan Girls' Junior School", relationship: "THROUGH_TRAIN", relatedSecondaryId: "edb_511714000133" },
    // 3. St. Paul's Convent School (Primary Section) (→ 聖保祿學校)
    { id: "edb_212326000123", nameZh: "聖保祿學校（小學部）", nameEn: "St. Paul's Convent School (Primary Section)", relationship: "AFFILIATED", relatedSecondaryId: "edb_514217000133" },
    // 4. Heep Yunn Primary School (→ 協恩中學)
    { id: "edb_511927000223", nameZh: "協恩中學附屬小學", nameEn: "Heep Yunn Primary School", relationship: "THROUGH_TRAIN", relatedSecondaryId: "edb_511935000133" },
    // 5. Diocesan Boys' School Primary Division (→ 拔萃男書院)
    { id: "edb_510777000123", nameZh: "拔萃男書院附屬小學", nameEn: "Diocesan Boys' School Primary Division", relationship: "THROUGH_TRAIN", relatedSecondaryId: "edb_510777000133" },
    // 6. HKUGA Primary School (→ 港大同學會書院)
    { id: "edb_540234000123", nameZh: "港大同學會小學", nameEn: "HKUGA Primary School", relationship: "THROUGH_TRAIN", relatedSecondaryId: "edb_560472000133" },
    // 7. Pui Kiu College Primary Section (→ 培僑書院)
    { id: "edb_560553000123", nameZh: "培僑書院（小學部）", nameEn: "Pui Kiu College", relationship: "THROUGH_TRAIN", relatedSecondaryId: "edb_560553000133" },
  ],

  /**
   * GOVERNMENT (官立/公立) Primary - 3 Schools
   * Linked schools (聯繫學校) to outstanding government secondary
   */
  GOVERNMENT: [
    // 1. Hennessy Road Government Primary School (→ 皇仁書院)
    { id: "edb_510084000123", nameZh: "軒尼詩道官立小學", nameEn: "Hennessy Road Government Primary School", relationship: "LINKED", relatedSecondaryId: "edb_510432000133" },
    // 2. Tsuen Wan Government Primary School (→ 荃灣官立中學)
    { id: "edb_528773000123", nameZh: "荃灣官立小學", nameEn: "Tsuen Wan Government Primary School", relationship: "LINKED", relatedSecondaryId: "edb_510467000133" },
    // 3. Ma Tau Chung Government Primary School (→ 伊利沙伯中學)
    { id: "edb_510130000123", nameZh: "馬頭涌官立小學", nameEn: "Ma Tau Chung Government Primary School", relationship: "LINKED", relatedSecondaryId: "edb_510424000133" },
  ],

  /**
   * AIDED (資助) Primary - 7 Schools
   * Note: 4 outstanding secondary schools have no related primary:
   * - 聖公會林護紀念中學, 鄧顯紀念中學, 聖公會曾肇添中學, 保良局百周年李兆忠紀念中學
   */
  AIDED: [
    // 1. La Salle Primary School (→ 喇沙書院)
    { id: "edb_512591000123", nameZh: "喇沙小學", nameEn: "La Salle Primary School", relationship: "AFFILIATED", relatedSecondaryId: "edb_512583000133" },
    // 2. Holy Angels Canossian School (→ 嘉諾撒聖瑪利書院)
    { id: "edb_512044000123", nameZh: "天神嘉諾撒學校", nameEn: "Holy Angels Canossian School", relationship: "THROUGH_TRAIN", relatedSecondaryId: "edb_514128000133" },
    // 3. Maryknoll Convent School (Primary Section) (→ 瑪利諾修院學校中學部)
    { id: "edb_512826000123", nameZh: "瑪利諾修院學校(小學部)", nameEn: "Maryknoll Convent School (Primary Section)", relationship: "AFFILIATED", relatedSecondaryId: "edb_512818000133" },
    // 4. Ying Wa Primary School (→ 英華女學校)
    { id: "edb_550477000123", nameZh: "英華小學", nameEn: "Ying Wa Primary School", relationship: "AFFILIATED", relatedSecondaryId: "edb_511030000133" },
    // 5. Pui Ching Primary School (→ 香港培正中學)
    { id: "edb_513350000123", nameZh: "香港培正小學", nameEn: "Pui Ching Primary School", relationship: "AFFILIATED", relatedSecondaryId: "edb_510912000133" },
    // 6. Shatin Tsung Tsin School (→ 沙田崇真中學)
    { id: "edb_114391000123", nameZh: "沙田崇真學校", nameEn: "Shatin Tsung Tsin School", relationship: "AFFILIATED", relatedSecondaryId: "edb_190527000233" },
    // 7. St. Stephen's Girls' Primary School (→ 聖士提反女子中學)
    { id: "edb_170194000223", nameZh: "聖士提反女子中學附屬小學", nameEn: "St. Stephen's Girls' Primary School", relationship: "AFFILIATED", relatedSecondaryId: "edb_514268000133" },
  ],
};

/**
 * Get all outstanding SECONDARY school IDs as a flat list
 */
export function getAllOutstandingSecondaryIds(): string[] {
  return [
    ...OUTSTANDING_SCHOOLS_CONFIG.DSS,
    ...OUTSTANDING_SCHOOLS_CONFIG.GOVERNMENT,
    ...OUTSTANDING_SCHOOLS_CONFIG.AIDED,
  ].map(s => s.id);
}

/**
 * Get all outstanding PRIMARY school IDs as a flat list
 */
export function getAllOutstandingPrimaryIds(): string[] {
  return [
    ...OUTSTANDING_PRIMARY_SCHOOLS_CONFIG.DSS,
    ...OUTSTANDING_PRIMARY_SCHOOLS_CONFIG.GOVERNMENT,
    ...OUTSTANDING_PRIMARY_SCHOOLS_CONFIG.AIDED,
  ].map(s => s.id);
}

/**
 * Get all outstanding school IDs (both levels) as a flat list
 * @param level - Optional: filter by level ("中學" or "小學")
 */
export function getAllOutstandingSchoolIds(level?: Level): string[] {
  if (level === "中學") {
    return getAllOutstandingSecondaryIds();
  }
  if (level === "小學") {
    return getAllOutstandingPrimaryIds();
  }
  return [...getAllOutstandingSecondaryIds(), ...getAllOutstandingPrimaryIds()];
}

/**
 * Resolve curated SECONDARY school IDs to actual School objects
 * Validates that each ID exists in the database
 */
export function getResolvedOutstandingSchools(category: OutstandingCategory): School[] {
  const config = OUTSTANDING_SCHOOLS_CONFIG[category];
  const schoolMap = new Map(SCHOOLS.map((s) => [s.id, s]));
  const resolved: School[] = [];

  for (const entry of config) {
    const school = schoolMap.get(entry.id);
    if (school) {
      resolved.push(school);
    } else {
      console.warn(
        `[OutstandingSchools] Secondary school not found: ${entry.id} (${entry.nameZh} / ${entry.nameEn})`
      );
    }
  }

  return resolved;
}

/**
 * Resolve curated PRIMARY school IDs to actual School objects
 * Validates that each ID exists in the database
 */
export function getResolvedOutstandingPrimarySchools(category: OutstandingCategory): School[] {
  const config = OUTSTANDING_PRIMARY_SCHOOLS_CONFIG[category];
  const schoolMap = new Map(SCHOOLS.map((s) => [s.id, s]));
  const resolved: School[] = [];

  for (const entry of config) {
    const school = schoolMap.get(entry.id);
    if (school) {
      resolved.push(school);
    } else {
      console.warn(
        `[OutstandingSchools] Primary school not found: ${entry.id} (${entry.nameZh} / ${entry.nameEn})`
      );
    }
  }

  return resolved;
}

/**
 * Get all outstanding SECONDARY schools resolved
 */
export function getAllResolvedOutstandingSchools(): School[] {
  return [
    ...getResolvedOutstandingSchools("DSS"),
    ...getResolvedOutstandingSchools("GOVERNMENT"),
    ...getResolvedOutstandingSchools("AIDED"),
  ];
}

/**
 * Get all outstanding PRIMARY schools resolved
 */
export function getAllResolvedOutstandingPrimarySchools(): School[] {
  return [
    ...getResolvedOutstandingPrimarySchools("DSS"),
    ...getResolvedOutstandingPrimarySchools("GOVERNMENT"),
    ...getResolvedOutstandingPrimarySchools("AIDED"),
  ];
}

/**
 * Get outstanding schools by level
 * @param level - "中學" for secondary, "小學" for primary
 */
export function getOutstandingSchoolsByLevel(level: "中學" | "小學"): School[] {
  if (level === "中學") {
    return getAllResolvedOutstandingSchools();
  }
  return getAllResolvedOutstandingPrimarySchools();
}

/**
 * Check if a school is in the outstanding list
 * @param schoolId - The school ID to check
 * @param level - Optional: filter by level
 */
export function isOutstandingSchool(schoolId: string, level?: Level): boolean {
  return getAllOutstandingSchoolIds(level).includes(schoolId);
}

/**
 * Get the category of an outstanding school
 * @param schoolId - The school ID to check
 * @param level - Optional: "中學" or "小學"
 */
export function getOutstandingCategory(schoolId: string, level?: "中學" | "小學"): OutstandingCategory | null {
  // Check secondary
  if (!level || level === "中學") {
    for (const category of ["DSS", "GOVERNMENT", "AIDED"] as OutstandingCategory[]) {
      if (OUTSTANDING_SCHOOLS_CONFIG[category].some(s => s.id === schoolId)) {
        return category;
      }
    }
  }

  // Check primary
  if (!level || level === "小學") {
    for (const category of ["DSS", "GOVERNMENT", "AIDED"] as OutstandingCategory[]) {
      if (OUTSTANDING_PRIMARY_SCHOOLS_CONFIG[category].some(s => s.id === schoolId)) {
        return category;
      }
    }
  }

  return null;
}

/**
 * Get the related secondary school for an outstanding primary school
 */
export function getRelatedSecondarySchool(primarySchoolId: string): School | null {
  const schoolMap = new Map(SCHOOLS.map((s) => [s.id, s]));

  for (const category of ["DSS", "GOVERNMENT", "AIDED"] as OutstandingCategory[]) {
    const entry = OUTSTANDING_PRIMARY_SCHOOLS_CONFIG[category].find(s => s.id === primarySchoolId);
    if (entry) {
      return schoolMap.get(entry.relatedSecondaryId) || null;
    }
  }

  return null;
}
