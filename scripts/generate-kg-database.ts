/**
 * Generate Kindergarten Database
 *
 * Extracts all kindergartens from schools_raw.ts and creates a
 * comprehensive kindergarten mapping file for data management.
 *
 * Features:
 * - Groups session variants (AM/PM/WD) into single entries
 * - Classifies by nature (international/non_profit/private)
 * - Includes fees, instruction language, and metadata
 *
 * Usage: npx tsx scripts/generate-kg-database.ts
 * Output: data/mappings/kindergarten-map.ts
 */

import * as fs from "fs";
import * as path from "path";

// ============================================
// Inline data imports (avoid path alias issues)
// ============================================

// @ts-ignore - dynamic import
const { schoolsRaw } = require("../data/schools_raw");
// @ts-ignore
const { instructionLanguageMap } = require("../data/mappings/instruction-language-map");
// @ts-ignore
const { schoolMetadataMap } = require("../data/mappings/school-metadata-map");

// ============================================
// Inline isInternational logic
// (from lib/international-schools.ts + constants/school-groups.ts)
// ============================================

const NON_GROUP_INTERNATIONAL_SCHOOLS: string[] = [
  "AMERICAN INTERNATIONAL SCHOOL",
  "AMERICAN SCHOOL HONG KONG",
  "ANFIELD",
  "AUSTRALIAN INTERNATIONAL SCHOOL HONG KONG",
  "CANADIAN INTERNATIONAL SCHOOL",
  "CARMEL SCHOOL",
  "CHINESE INTERNATIONAL SCHOOL",
  "CHRISTIAN ALLIANCE INTERNATIONAL SCHOOL",
  "CHRISTIAN ALLIANCE P.C. LAU MEMORIAL INTERNATIONAL SCHOOL",
  "CONCORDIA INTERNATIONAL SCHOOL",
  "DALTON SCHOOL HONG KONG",
  "DISCOVERY BAY INTERNATIONAL SCHOOL",
  "DISCOVERY MONTESSORI",
  "DSC INTERNATIONAL SCHOOL",
  "FRENCH INTERNATIONAL SCHOOL",
  "GERMAN SWISS INTERNATIONAL SCHOOL",
  "GUIDEPOST MONTESSORI",
  "HARROW INTERNATIONAL SCHOOL HONG KONG",
  "HONG KONG ACADEMY",
  "HONG KONG INTERNATIONAL SCHOOL",
  "HONGKONG JAPANESE SCHOOL",
  "INTERNATIONAL CHRISTIAN SCHOOL",
  "INTERNATIONAL COLLEGE HONG KONG",
  "INTERNATIONAL MONTESSORI SCHOOL",
  "INVICTUS",
  "ISLAND CHILDREN'S MONTESSORI",
  "ISLAND MONTESSORI INTERNATIONAL",
  "JAPANESE INTERNATIONAL SCHOOL",
  "KELLETT SCHOOL",
  "KINGSTON INTERNATIONAL SCHOOL",
  "KOREAN INTERNATIONAL SCHOOL",
  "LANTAU INTERNATIONAL SCHOOL",
  "LITTLE DALTON KINDERGARTEN",
  "LITTLE LANTAU MONTESSORI",
  "MALVERN COLLEGE HONG KONG",
  "MONTESSORI FOR CHILDREN",
  "MULBERRY HOUSE",
  "NORD ANGLIA INTERNATIONAL SCHOOL",
  "NORWEGIAN INTERNATIONAL SCHOOL",
  "SEAR ROGERS INTERNATIONAL SCHOOL",
  "SHREWSBURY INTERNATIONAL SCHOOL",
  "SINGAPORE INTERNATIONAL SCHOOL",
  "SPANISH SCHOOL OF HONG KONG",
  "STAMFORD AMERICAN SCHOOL HONG KONG",
  "VICTORIA SHANGHAI ACADEMY",
  "WOODLAND PRE-SCHOOLS",
  "YEW CHUNG INTERNATIONAL SCHOOL",
  "YORK MONTESSORI",
];

const ESF_SCHOOLS = [
  "BEACON HILL SCHOOL",
  "BRADBURY SCHOOL",
  "CLEARWATER BAY SCHOOL",
  "GLENEALY SCHOOL",
  "KENNEDY SCHOOL",
  "KOWLOON JUNIOR SCHOOL",
  "PEAK SCHOOL",
  "QUARRY BAY SCHOOL",
  "SHA TIN JUNIOR SCHOOL",
  "ISLAND SCHOOL",
  "KING GEORGE V SCHOOL",
  "SHA TIN COLLEGE",
  "SOUTH ISLAND SCHOOL",
  "WEST ISLAND SCHOOL",
  "RENAISSANCE COLLEGE",
  "DISCOVERY COLLEGE",
  "ESF ABACUS INTERNATIONAL KINDERGARTEN",
  "ESF INTERNATIONAL KINDERGARTEN",
  "ESF HILLSIDE INTERNATIONAL KINDERGARTEN",
  "ESF TSING YI INTERNATIONAL KINDERGARTEN",
  "ESF WU KAI SHA INTERNATIONAL KINDERGARTEN",
];

function normalizeForMatch(name: string): string {
  return name.toUpperCase().replace(/\s+/g, " ").replace(/^THE\s+/, "").trim();
}

function isEsfSchool(nameEn: string): boolean {
  if (!nameEn) return false;
  const normalized = normalizeForMatch(nameEn);
  return ESF_SCHOOLS.some((esf) => normalized.includes(normalizeForMatch(esf)));
}

function matchesNonGroupInternational(nameEn: string): boolean {
  if (!nameEn) return false;
  const normalized = normalizeForMatch(nameEn);
  return NON_GROUP_INTERNATIONAL_SCHOOLS.some((pattern) =>
    normalized.includes(normalizeForMatch(pattern))
  );
}

function isInternational(school: { nameEn?: string }): boolean {
  if (!school.nameEn) return false;
  if (isEsfSchool(school.nameEn)) return true;
  if (matchesNonGroupInternational(school.nameEn)) return true;
  return false;
}

// ============================================
// Inline fees lookup (simplified)
// ============================================

let feesData: Record<string, any> = {};
try {
  // @ts-ignore
  const { schoolFees } = require("../data/fees-2025-26");
  feesData = schoolFees || {};
} catch (e) {
  console.warn("Warning: Could not load fees data");
}

function getSchoolFees(id: string): any {
  return feesData[id];
}

// ============================================
// Session handling
// ============================================

const SESSION_CODE_MAP: Record<string, string> = {
  "11": "AM",
  "12": "PM",
  "13": "WD",
};

const KGP_FEE_CAP = 50000;

interface KindergartenEntry {
  id: string;
  name: string;
  nameEn: string;
  nature: "international" | "non_profit" | "private";
  district: string;
  district18: string;
  sessions: string[];
  variantIds: string[];
  instructionLanguages: string[];
  tuitionMin: number;
  tuitionMax: number;
  religion?: string;
  address: string;
  phone: string;
  website: string;
}

function getSessionFromId(id: string): string | null {
  const match = id.match(/^edb_(\d{12})$/);
  if (!match) return null;
  const sessionCode = match[1].slice(-2);
  return SESSION_CODE_MAP[sessionCode] || null;
}

function getGroupKey(id: string): string | null {
  const match = id.match(/^edb_(\d{12})$/);
  if (!match) return null;
  return `edb_${match[1].slice(0, 10)}`;
}

function determineNature(
  school: { nameEn?: string },
  tuitionMax: number
): "international" | "non_profit" | "private" {
  if (isInternational(school)) {
    return "international";
  }
  if (tuitionMax > KGP_FEE_CAP) {
    return "private";
  }
  return "non_profit";
}

function main() {
  console.log("Generating Kindergarten Database...\n");

  // Filter kindergartens
  const allKGs = schoolsRaw.filter(
    (s: any) => s.level && String(s.level).includes("幼稚園")
  );
  console.log(`Found ${allKGs.length} kindergarten entries (including session variants)`);

  // Group by school (merge AM/PM/WD variants)
  const groupedMap = new Map<string, KindergartenEntry>();

  for (const kg of allKGs) {
    const groupKey = getGroupKey(kg.id);
    if (!groupKey) continue;

    const session = getSessionFromId(kg.id);
    const fees = getSchoolFees(kg.id);
    const languages = instructionLanguageMap[kg.id] || [];
    const metadata = schoolMetadataMap[kg.id];

    // Get tuition from fees data or raw school data
    let tuitionMin = 0;
    let tuitionMax = 0;
    if (fees?.tuition?.bands && fees.tuition.bands.length > 0) {
      tuitionMin = Math.min(...fees.tuition.bands.map((b: any) => b.amountMin || 0));
      tuitionMax = Math.max(...fees.tuition.bands.map((b: any) => b.amountMax || 0));
    } else if (kg.tuitionMin || kg.tuitionMax) {
      tuitionMin = kg.tuitionMin || 0;
      tuitionMax = kg.tuitionMax || 0;
    }

    if (groupedMap.has(groupKey)) {
      // Add session variant to existing entry
      const existing = groupedMap.get(groupKey)!;
      if (session && !existing.sessions.includes(session)) {
        existing.sessions.push(session);
      }
      existing.variantIds.push(kg.id);

      // Update tuition if this variant has data and existing doesn't
      if (tuitionMax > existing.tuitionMax) {
        existing.tuitionMax = tuitionMax;
      }
      if (tuitionMin > 0 && (existing.tuitionMin === 0 || tuitionMin < existing.tuitionMin)) {
        existing.tuitionMin = tuitionMin;
      }

      // Merge instruction languages
      for (const lang of languages) {
        if (!existing.instructionLanguages.includes(lang)) {
          existing.instructionLanguages.push(lang);
        }
      }
    } else {
      // Create new entry
      const nature = determineNature({ nameEn: kg.nameEn }, tuitionMax);

      const entry: KindergartenEntry = {
        id: groupKey,
        name: kg.name || "",
        nameEn: kg.nameEn || "",
        nature,
        district: kg.district || "",
        district18: kg.district18 || "",
        sessions: session ? [session] : [],
        variantIds: [kg.id],
        instructionLanguages: [...languages],
        tuitionMin,
        tuitionMax,
        religion: metadata?.religion,
        address: kg.address || "",
        phone: kg.phone || "",
        website: kg.website || "",
      };

      groupedMap.set(groupKey, entry);
    }
  }

  // Convert to array and sort
  const kindergartens = Array.from(groupedMap.values());

  // Sort sessions consistently
  const sessionOrder = ["AM", "PM", "WD"];
  for (const kg of kindergartens) {
    kg.sessions.sort((a, b) => sessionOrder.indexOf(a) - sessionOrder.indexOf(b));
    kg.variantIds.sort();
  }

  // Sort by district, then name
  kindergartens.sort((a, b) => {
    if (a.district !== b.district) return a.district.localeCompare(b.district);
    return a.name.localeCompare(b.name);
  });

  // Calculate stats
  const stats = {
    total: kindergartens.length,
    international: kindergartens.filter((k) => k.nature === "international").length,
    nonProfit: kindergartens.filter((k) => k.nature === "non_profit").length,
    private: kindergartens.filter((k) => k.nature === "private").length,
    withFees: kindergartens.filter((k) => k.tuitionMax > 0).length,
    byDistrict: {} as Record<string, number>,
  };

  for (const kg of kindergartens) {
    stats.byDistrict[kg.district] = (stats.byDistrict[kg.district] || 0) + 1;
  }

  console.log(`\nGrouped into ${stats.total} unique kindergartens`);
  console.log(`  - International: ${stats.international}`);
  console.log(`  - Non-profit (KGP): ${stats.nonProfit}`);
  console.log(`  - Private: ${stats.private}`);
  console.log(`  - With fees data: ${stats.withFees}`);
  console.log(`\nBy district:`);
  for (const [district, count] of Object.entries(stats.byDistrict)) {
    console.log(`  - ${district}: ${count}`);
  }

  // Generate output file
  const outputPath = path.join(__dirname, "../data/mappings/kindergarten-map.ts");
  const timestamp = new Date().toISOString().split("T")[0];

  const output = `// Kindergarten Database
// Source: Generated from schools_raw.ts with session grouping
// Generated: ${timestamp}
// Total: ${stats.total} unique kindergartens (${allKGs.length} session variants)
// Nature: ${stats.international} international, ${stats.nonProfit} non-profit (KGP), ${stats.private} private
// Fees: ${stats.withFees} with tuition data
//
// DO NOT EDIT MANUALLY - Run "npx tsx scripts/generate-kg-database.ts" to regenerate

import type { InstructionLanguage } from "@/types/school";

export type KGNature = "international" | "non_profit" | "private";

export interface KindergartenEntry {
  /** Group ID (without session suffix) */
  id: string;
  /** Chinese name */
  name: string;
  /** English name */
  nameEn: string;
  /** Nature classification */
  nature: KGNature;
  /** Region (港島/九龍/新界) */
  district: string;
  /** 18 districts */
  district18: string;
  /** Available sessions (AM/PM/WD) */
  sessions: ("AM" | "PM" | "WD")[];
  /** All variant IDs including session codes */
  variantIds: string[];
  /** Instruction languages */
  instructionLanguages: InstructionLanguage[];
  /** Annual tuition min (HKD) */
  tuitionMin: number;
  /** Annual tuition max (HKD) */
  tuitionMax: number;
  /** Religion affiliation */
  religion?: string;
  /** Address */
  address: string;
  /** Phone */
  phone: string;
  /** Website */
  website: string;
}

/**
 * Complete list of kindergartens (deduplicated by school, session variants merged)
 */
export const kindergartens: KindergartenEntry[] = ${JSON.stringify(kindergartens, null, 2)};

/**
 * Quick lookup by group ID
 */
export const kindergartenMap: Record<string, KindergartenEntry> = Object.fromEntries(
  kindergartens.map((k) => [k.id, k])
);

/**
 * Quick lookup by any variant ID
 */
export const kindergartenByVariantId: Record<string, KindergartenEntry> = Object.fromEntries(
  kindergartens.flatMap((k) => k.variantIds.map((vid) => [vid, k]))
);

/**
 * Get kindergartens by nature
 */
export function getKindergartensByNature(nature: KGNature): KindergartenEntry[] {
  return kindergartens.filter((k) => k.nature === nature);
}

/**
 * Get kindergartens by district
 */
export function getKindergartensByDistrict(district: string): KindergartenEntry[] {
  return kindergartens.filter((k) => k.district === district);
}

/**
 * Stats
 */
export const kindergartenStats = {
  total: ${stats.total},
  international: ${stats.international},
  nonProfit: ${stats.nonProfit},
  private: ${stats.private},
  withFees: ${stats.withFees},
  byDistrict: ${JSON.stringify(stats.byDistrict)},
};
`;

  fs.writeFileSync(outputPath, output, "utf-8");
  console.log(`\n✅ Generated: ${outputPath}`);
}

main();
