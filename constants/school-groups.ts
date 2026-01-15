/**
 * School Group Definitions
 *
 * Authoritative canonical lists for school groups.
 * Source: Official group websites and EDB registration data.
 *
 * RULES:
 * - Group membership is defined by canonical name matching, NOT keyword search
 * - Each school can belong to at most ONE group
 * - Group membership does NOT determine school_type (international/private/etc)
 */

import type { School } from "@/types/school";

/** School group identifiers */
export type SchoolGroupId = "ESF";

/** School group metadata */
export interface SchoolGroup {
  id: SchoolGroupId;
  nameEn: string;
  nameTc: string;
  website: string;
  description: string;
}

/** School group definitions */
export const SCHOOL_GROUPS: Record<SchoolGroupId, SchoolGroup> = {
  ESF: {
    id: "ESF",
    nameEn: "English Schools Foundation",
    nameTc: "英基學校協會",
    website: "https://www.esf.edu.hk",
    description: "Hong Kong's largest English-medium international school organization (22 schools)",
  },
};

/**
 * Canonical ESF School List
 * Source: ESF official website (https://www.esf.edu.hk)
 * Last verified: 2026-01
 *
 * Categories:
 * - PRIMARY: 9 schools
 * - SECONDARY: 5 schools
 * - ALL_THROUGH: 2 schools (Discovery College, Renaissance College - Private Independent)
 * - SPECIAL: 1 school (Jockey Club Sarah Roe School)
 * - KINDERGARTEN: 5 schools
 */
export interface CanonicalSchoolEntry {
  /** Canonical English name (exact match) */
  nameEn: string;
  /** Alternative English names for matching */
  aliasesEn: string[];
  /** Chinese name */
  nameTc: string;
  /** School phase */
  phase: "PRIMARY" | "SECONDARY" | "ALL_THROUGH" | "SPECIAL" | "KINDERGARTEN";
  /** Notes about the school */
  notes?: string;
}

export const ESF_CANONICAL_LIST: CanonicalSchoolEntry[] = [
  // ===== PRIMARY SCHOOLS (9) =====
  {
    nameEn: "BEACON HILL SCHOOL",
    aliasesEn: [],
    nameTc: "畢架山學校",
    phase: "PRIMARY",
  },
  {
    nameEn: "BRADBURY SCHOOL",
    aliasesEn: [],
    nameTc: "白普理小學",
    phase: "PRIMARY",
  },
  {
    nameEn: "CLEARWATER BAY SCHOOL",
    aliasesEn: [],
    nameTc: "清水灣小學",
    phase: "PRIMARY",
  },
  {
    nameEn: "GLENEALY SCHOOL",
    aliasesEn: [],
    nameTc: "己連拿小學",
    phase: "PRIMARY",
  },
  {
    nameEn: "KENNEDY SCHOOL",
    aliasesEn: [],
    nameTc: "堅尼地小學",
    phase: "PRIMARY",
  },
  {
    nameEn: "KOWLOON JUNIOR SCHOOL",
    aliasesEn: [],
    nameTc: "九龍小學",
    phase: "PRIMARY",
  },
  {
    nameEn: "PEAK SCHOOL",
    aliasesEn: [],
    nameTc: "山頂小學",
    phase: "PRIMARY",
  },
  {
    nameEn: "QUARRY BAY SCHOOL",
    aliasesEn: [],
    nameTc: "鰂魚涌小學",
    phase: "PRIMARY",
  },
  {
    nameEn: "SHATIN JUNIOR SCHOOL",
    aliasesEn: ["SHA TIN JUNIOR SCHOOL"],
    nameTc: "沙田小學",
    phase: "PRIMARY",
  },

  // ===== SECONDARY SCHOOLS (5) =====
  {
    nameEn: "ISLAND SCHOOL",
    aliasesEn: [],
    nameTc: "港島中學",
    phase: "SECONDARY",
  },
  {
    nameEn: "KING GEORGE V SCHOOL",
    aliasesEn: ["KGV"],
    nameTc: "英皇佐治五世學校",
    phase: "SECONDARY",
  },
  {
    nameEn: "SHATIN COLLEGE",
    aliasesEn: ["SHA TIN COLLEGE"],
    nameTc: "沙田學院",
    phase: "SECONDARY",
  },
  {
    nameEn: "SOUTH ISLAND SCHOOL",
    aliasesEn: ["THE SOUTH ISLAND SCHOOL"],
    nameTc: "南島中學",
    phase: "SECONDARY",
  },
  {
    nameEn: "WEST ISLAND SCHOOL",
    aliasesEn: [],
    nameTc: "西島中學",
    phase: "SECONDARY",
  },

  // ===== ALL-THROUGH SCHOOLS (2) - Private Independent =====
  {
    nameEn: "DISCOVERY COLLEGE",
    aliasesEn: ["ESF DISCOVERY COLLEGE"],
    nameTc: "啟新書院",
    phase: "ALL_THROUGH",
    notes: "Private Independent School within ESF",
  },
  {
    nameEn: "RENAISSANCE COLLEGE",
    aliasesEn: ["ESF RENAISSANCE COLLEGE", "RENAISSANCE COLLEGE HONG KONG", "RCHK"],
    nameTc: "啟新書院",
    phase: "ALL_THROUGH",
    notes: "Private Independent School within ESF",
  },

  // ===== SPECIAL NEEDS SCHOOL (1) =====
  {
    nameEn: "JOCKEY CLUB SARAH ROE SCHOOL",
    aliasesEn: [],
    nameTc: "賽馬會善樂學校",
    phase: "SPECIAL",
    notes: "School for students with special educational needs",
  },

  // ===== KINDERGARTENS (5) =====
  {
    nameEn: "ESF ABACUS INTERNATIONAL KINDERGARTEN",
    aliasesEn: ["ABACUS INTERNATIONAL KINDERGARTEN"],
    nameTc: "英基雅柏國際幼稚園",
    phase: "KINDERGARTEN",
  },
  {
    nameEn: "ESF INTERNATIONAL KINDERGARTEN (WU KAI SHA)",
    aliasesEn: ["ESF WU KAI SHA INTERNATIONAL KINDERGARTEN"],
    nameTc: "英基烏溪沙國際幼稚園",
    phase: "KINDERGARTEN",
  },
  {
    nameEn: "ESF INTERNATIONAL KINDERGARTEN (TSING YI)",
    aliasesEn: ["ESF TSING YI INTERNATIONAL KINDERGARTEN"],
    nameTc: "英基青衣國際幼稚園",
    phase: "KINDERGARTEN",
  },
  {
    nameEn: "ESF INTERNATIONAL KINDERGARTEN (HILLSIDE)",
    aliasesEn: ["ESF HILLSIDE INTERNATIONAL KINDERGARTEN"],
    nameTc: "英基曉新國際幼稚園",
    phase: "KINDERGARTEN",
  },
  {
    nameEn: "ESF INTERNATIONAL KINDERGARTEN (TUNG CHUNG)",
    aliasesEn: ["ESF TUNG CHUNG INTERNATIONAL KINDERGARTEN"],
    nameTc: "英基東涌國際幼稚園",
    phase: "KINDERGARTEN",
  },
];

/**
 * Normalize school name for matching
 * - Uppercase
 * - Remove extra whitespace
 * - Remove "THE " prefix
 */
function normalizeSchoolName(name: string): string {
  return name
    .toUpperCase()
    .replace(/\s+/g, " ")
    .replace(/^THE\s+/, "")
    .trim();
}

/**
 * Check if a school name matches an ESF canonical entry
 */
function matchesEsfEntry(schoolNameEn: string, entry: CanonicalSchoolEntry): boolean {
  const normalizedInput = normalizeSchoolName(schoolNameEn);
  const normalizedCanonical = normalizeSchoolName(entry.nameEn);

  // Exact match with canonical name
  if (normalizedInput === normalizedCanonical) return true;

  // Match with aliases
  for (const alias of entry.aliasesEn) {
    if (normalizedInput === normalizeSchoolName(alias)) return true;
  }

  return false;
}

/**
 * Get ESF canonical entry for a school
 * @returns The matching ESF entry, or null if not an ESF school
 */
export function getEsfEntry(school: Pick<School, "nameEn">): CanonicalSchoolEntry | null {
  if (!school.nameEn) return null;

  for (const entry of ESF_CANONICAL_LIST) {
    if (matchesEsfEntry(school.nameEn, entry)) {
      return entry;
    }
  }

  return null;
}

/**
 * Check if a school is an ESF school
 */
export function isEsfSchool(school: Pick<School, "nameEn">): boolean {
  return getEsfEntry(school) !== null;
}

/**
 * Get all ESF school names (for search matching)
 */
export function getEsfSchoolNames(): string[] {
  const names: string[] = [];
  for (const entry of ESF_CANONICAL_LIST) {
    names.push(entry.nameEn);
    names.push(...entry.aliasesEn);
  }
  return names;
}

/**
 * Get school group for a school
 * @returns The group ID, or null if not in any group
 */
export function getSchoolGroup(school: Pick<School, "nameEn">): SchoolGroupId | null {
  if (isEsfSchool(school)) return "ESF";
  // Add other group checks here in the future
  return null;
}
