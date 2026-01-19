/**
 * Generate International School Database
 *
 * Creates a mapping file based on existing school data,
 * using the same isInternational() logic as filters.
 *
 * Run: npx tsx scripts/generate-intl-school-db.ts
 */

import * as fs from "fs";
import * as path from "path";

// ============================================
// Inline isInternational logic (from lib/international-schools.ts)
// to avoid path alias issues with standalone scripts
// ============================================

const NON_GROUP_INTERNATIONAL_SCHOOLS: string[] = [
  "AMERICAN INTERNATIONAL SCHOOL",
  "AUSTRALIAN INTERNATIONAL SCHOOL HONG KONG",
  "CANADIAN INTERNATIONAL SCHOOL",
  "CARMEL SCHOOL",
  "CHINESE INTERNATIONAL SCHOOL",
  "CHRISTIAN ALLIANCE INTERNATIONAL SCHOOL",
  "CHRISTIAN ALLIANCE P.C. LAU MEMORIAL INTERNATIONAL SCHOOL",
  "CONCORDIA INTERNATIONAL SCHOOL",
  "DSC INTERNATIONAL SCHOOL",
  "DISCOVERY BAY INTERNATIONAL SCHOOL",
  "FRENCH INTERNATIONAL SCHOOL",
  "GERMAN SWISS INTERNATIONAL SCHOOL",
  "HARROW INTERNATIONAL SCHOOL HONG KONG",
  "HONG KONG ACADEMY",
  "HONG KONG INTERNATIONAL SCHOOL",
  "HONGKONG JAPANESE SCHOOL",
  "INTERNATIONAL CHRISTIAN SCHOOL",
  "INTERNATIONAL COLLEGE HONG KONG",
  "INTERNATIONAL MONTESSORI SCHOOL",
  "JAPANESE INTERNATIONAL SCHOOL",
  "KELLETT SCHOOL",
  "KINGSTON INTERNATIONAL SCHOOL",
  "KOREAN INTERNATIONAL SCHOOL",
  "LANTAU INTERNATIONAL SCHOOL",
  "MALVERN COLLEGE HONG KONG",
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
];

// ESF schools (from constants/school-groups.ts)
const ESF_SCHOOL_NAMES: string[] = [
  "BEACON HILL SCHOOL",
  "BRADBURY SCHOOL",
  "CLEARWATER BAY SCHOOL",
  "GLENEALY SCHOOL",
  "KENNEDY SCHOOL",
  "KOWLOON JUNIOR SCHOOL",
  "PEAK SCHOOL",
  "QUARRY BAY SCHOOL",
  "SHATIN JUNIOR SCHOOL",
  "SHA TIN JUNIOR SCHOOL",
  "ISLAND SCHOOL",
  "KING GEORGE V SCHOOL",
  "KGV",
  "SHATIN COLLEGE",
  "SHA TIN COLLEGE",
  "SOUTH ISLAND SCHOOL",
  "THE SOUTH ISLAND SCHOOL",
  "WEST ISLAND SCHOOL",
  "DISCOVERY COLLEGE",
  "ESF DISCOVERY COLLEGE",
  "RENAISSANCE COLLEGE",
  "ESF RENAISSANCE COLLEGE",
  "RENAISSANCE COLLEGE HONG KONG",
  "RCHK",
  "JOCKEY CLUB SARAH ROE SCHOOL",
  "ESF ABACUS INTERNATIONAL KINDERGARTEN",
  "ABACUS INTERNATIONAL KINDERGARTEN",
  "ESF INTERNATIONAL KINDERGARTEN",
  "ESF WU KAI SHA INTERNATIONAL KINDERGARTEN",
  "ESF TSING YI INTERNATIONAL KINDERGARTEN",
  "ESF HILLSIDE INTERNATIONAL KINDERGARTEN",
  "ESF TUNG CHUNG INTERNATIONAL KINDERGARTEN",
];

function normalizeForMatch(name: string): string {
  return name
    .toUpperCase()
    .replace(/\s+/g, " ")
    .replace(/^THE\s+/, "")
    .trim();
}

function isEsfSchool(nameEn: string): boolean {
  if (!nameEn) return false;
  const normalized = normalizeForMatch(nameEn);
  return ESF_SCHOOL_NAMES.some(esf => normalized === normalizeForMatch(esf));
}

function matchesNonGroupInternational(nameEn: string): boolean {
  if (!nameEn) return false;
  const normalized = normalizeForMatch(nameEn);
  return NON_GROUP_INTERNATIONAL_SCHOOLS.some(pattern =>
    normalized.includes(normalizeForMatch(pattern))
  );
}

function isInternational(school: { nameEn: string }): boolean {
  if (!school.nameEn) return false;
  if (isEsfSchool(school.nameEn)) return true;
  if (matchesNonGroupInternational(school.nameEn)) return true;
  return false;
}

// ============================================
// Load schools data and mappings
// ============================================

const schoolsRawPath = path.join(__dirname, "../data/schools_raw.ts");
const schoolsRawContent = fs.readFileSync(schoolsRawPath, "utf-8");

// Extract the array from the file
const arrayMatch = schoolsRawContent.match(/export const schoolsRaw[^=]*=\s*(\[[\s\S]*\]);?\s*$/);
if (!arrayMatch) {
  console.error("Failed to parse schools_raw.ts");
  process.exit(1);
}

// Use eval to parse the array (safe here since it's our own data file)
const schoolsRaw = eval(arrayMatch[1]);

// Load curriculum mapping
const curriculumMapPath = path.join(__dirname, "../data/mappings/curriculum-map.ts");
const curriculumMapContent = fs.readFileSync(curriculumMapPath, "utf-8");
const curriculumMapMatch = curriculumMapContent.match(/export const curriculumMap[^=]*=\s*(\{[\s\S]*?\n\})/);
const curriculumMap: Record<string, string[]> = curriculumMapMatch ? eval(`(${curriculumMapMatch[1]})`) : {};

// Load instruction language mapping
const instructionLangMapPath = path.join(__dirname, "../data/mappings/instruction-language-map.ts");
const instructionLangMapContent = fs.readFileSync(instructionLangMapPath, "utf-8");
const instructionLangMapMatch = instructionLangMapContent.match(/export const instructionLanguageMap[^=]*=\s*(\{[\s\S]*?\n\})/);
const instructionLanguageMap: Record<string, string[]> = instructionLangMapMatch ? eval(`(${instructionLangMapMatch[1]})`) : {};

// Load fees data (2025/26)
const feesDataPath = path.join(__dirname, "../data/fees-2025-26.ts");
const feesDataContent = fs.readFileSync(feesDataPath, "utf-8");
const feesDataMatch = feesDataContent.match(/export const feesData202526[^=]*=\s*(\{[\s\S]*?\n\})/);
const feesData: Record<string, any> = feesDataMatch ? eval(`(${feesDataMatch[1]})`) : {};

/**
 * Calculate tuition min/max from fees data bands
 */
function getTuitionFromFees(schoolId: string): { min: number; max: number } {
  const fees = feesData[schoolId];
  if (!fees || !fees.tuition || !fees.tuition.bands || fees.tuition.bands.length === 0) {
    return { min: 0, max: 0 };
  }
  const bands = fees.tuition.bands;
  const min = Math.min(...bands.map((b: any) => b.amountMin));
  const max = Math.max(...bands.map((b: any) => b.amountMax));
  return { min, max };
}

interface IntlSchoolEntry {
  id: string;
  name: string;
  nameEn: string;
  level: string;
  category: string;          // Always "國際" for display purposes
  rawCategory: string;       // Original EDB category (usually "私立")
  district: string;
  district18: string;
  curriculumV2: string[];    // Curriculum classification
  instructionLanguages: string[]; // Medium of Instruction
  tuitionMin: number;
  tuitionMax: number;
}

// Filter international schools
const intlSchools: IntlSchoolEntry[] = schoolsRaw
  .filter((s: any) => isInternational(s))
  .map((s: any) => {
    // Get tuition from fees data first, fallback to raw data
    const feeTuition = getTuitionFromFees(s.id);
    const tuitionMin = feeTuition.min > 0 ? feeTuition.min : (s.tuitionMin ?? 0);
    const tuitionMax = feeTuition.max > 0 ? feeTuition.max : (s.tuitionMax ?? 0);

    return {
      id: s.id,
      name: s.name,
      nameEn: s.nameEn,
      level: s.level,
      category: "國際",           // Display category (overrides raw "私立")
      rawCategory: s.category,    // Original EDB category
      district: s.district,
      district18: s.district18,
      curriculumV2: curriculumMap[s.id] || [],
      instructionLanguages: instructionLanguageMap[s.id] || [],
      tuitionMin,
      tuitionMax,
    };
  })
  .sort((a: IntlSchoolEntry, b: IntlSchoolEntry) => {
    const nameCompare = a.nameEn.localeCompare(b.nameEn);
    if (nameCompare !== 0) return nameCompare;
    const levelOrder: Record<string, number> = { "幼稚園": 0, "小學": 1, "中學": 2 };
    return (levelOrder[a.level] || 0) - (levelOrder[b.level] || 0);
  });

// Group by level for stats
const byLevel = intlSchools.reduce((acc: Record<string, number>, s) => {
  acc[s.level] = (acc[s.level] || 0) + 1;
  return acc;
}, {});

// Create deduplicated version (unique by nameEn, aggregating levels)
interface UniqueIntlSchool {
  name: string;
  nameEn: string;
  levels: string[];
  category: string;
  districts: string[];
  schoolIds: string[];
  curriculumV2: string[];         // Aggregated curricula
  instructionLanguages: string[]; // Aggregated MOI
  tuitionMin: number;             // Lowest tuition across levels
  tuitionMax: number;             // Highest tuition across levels
}

const uniqueSchoolsMap = new Map<string, UniqueIntlSchool>();
intlSchools.forEach(s => {
  const key = s.nameEn.toUpperCase();
  if (uniqueSchoolsMap.has(key)) {
    const existing = uniqueSchoolsMap.get(key)!;
    if (!existing.levels.includes(s.level)) {
      existing.levels.push(s.level);
    }
    if (!existing.districts.includes(s.district18)) {
      existing.districts.push(s.district18);
    }
    existing.schoolIds.push(s.id);
    // Aggregate curricula
    s.curriculumV2.forEach((c: string) => {
      if (!existing.curriculumV2.includes(c)) {
        existing.curriculumV2.push(c);
      }
    });
    // Aggregate MOI
    s.instructionLanguages.forEach((l: string) => {
      if (!existing.instructionLanguages.includes(l)) {
        existing.instructionLanguages.push(l);
      }
    });
    // Update tuition range
    if (s.tuitionMin > 0 && (existing.tuitionMin === 0 || s.tuitionMin < existing.tuitionMin)) {
      existing.tuitionMin = s.tuitionMin;
    }
    if (s.tuitionMax > existing.tuitionMax) {
      existing.tuitionMax = s.tuitionMax;
    }
  } else {
    uniqueSchoolsMap.set(key, {
      name: s.name,
      nameEn: s.nameEn,
      levels: [s.level],
      category: s.category,
      districts: [s.district18],
      schoolIds: [s.id],
      curriculumV2: [...s.curriculumV2],
      instructionLanguages: [...s.instructionLanguages],
      tuitionMin: s.tuitionMin,
      tuitionMax: s.tuitionMax,
    });
  }
});

const uniqueSchools = Array.from(uniqueSchoolsMap.values())
  .map(s => ({
    ...s,
    levels: s.levels.sort((a, b) => {
      const order: Record<string, number> = { "幼稚園": 0, "小學": 1, "中學": 2 };
      return (order[a] || 0) - (order[b] || 0);
    }),
  }))
  .sort((a, b) => a.nameEn.localeCompare(b.nameEn));

const levelStats = Object.entries(byLevel).map(([k, v]) => `${k}: ${v}`).join(", ");
const dateStr = new Date().toISOString().split("T")[0];

// Generate the mapping file
const outputPath = path.join(__dirname, "../data/mappings/international-school-map.ts");

const fileContent = `// International School Database
// Source: Generated from existing school data using isInternational() logic
// Generated: ${dateStr}
// Total: ${intlSchools.length} schools (${levelStats})
// Unique: ${uniqueSchools.length} schools (deduplicated by name)
//
// DO NOT EDIT MANUALLY - Run "npx tsx scripts/generate-intl-school-db.ts" to regenerate

import type { CurriculumV2, InstructionLanguage } from "@/types/school";

export interface InternationalSchoolEntry {
  id: string;
  name: string;
  nameEn: string;
  level: "幼稚園" | "小學" | "中學";
  category: "國際";              // Display category
  rawCategory: string;           // Original EDB category (usually "私立")
  district: string;
  district18: string;
  curriculumV2: CurriculumV2[];
  instructionLanguages: InstructionLanguage[];
  tuitionMin: number;
  tuitionMax: number;
}

export interface UniqueInternationalSchool {
  name: string;
  nameEn: string;
  levels: ("幼稚園" | "小學" | "中學")[];
  category: "國際";
  districts: string[];
  schoolIds: string[];
  curriculumV2: CurriculumV2[];
  instructionLanguages: InstructionLanguage[];
  tuitionMin: number;
  tuitionMax: number;
}

/**
 * Complete list of international schools (raw entries)
 * Aligned with filter results - same schools that appear when filtering by "國際"
 * Note: Same school may have multiple entries for different levels (KG/Primary/Secondary)
 */
export const internationalSchools: InternationalSchoolEntry[] = ${JSON.stringify(intlSchools, null, 2)};

/**
 * Deduplicated list of international schools (grouped by school name)
 * This matches the UI count when filtering by "國際" (~95 schools)
 * Each entry aggregates all levels and campuses for that school
 */
export const uniqueInternationalSchools: UniqueInternationalSchool[] = ${JSON.stringify(uniqueSchools, null, 2)};

/**
 * Set of international school IDs for quick lookup
 */
export const internationalSchoolIds: Set<string> = new Set(internationalSchools.map(s => s.id));

/**
 * Check if a school ID is an international school
 */
export function isInternationalById(schoolId: string): boolean {
  return internationalSchoolIds.has(schoolId);
}

/**
 * Get international schools by level
 */
export function getInternationalByLevel(level: "幼稚園" | "小學" | "中學"): InternationalSchoolEntry[] {
  return internationalSchools.filter(s => s.level === level);
}

/**
 * Get unique international schools that include a specific level
 */
export function getUniqueInternationalByLevel(level: "幼稚園" | "小學" | "中學"): UniqueInternationalSchool[] {
  return uniqueInternationalSchools.filter(s => s.levels.includes(level));
}
`;

fs.writeFileSync(outputPath, fileContent, "utf-8");

// Also generate CSV files
const csvPath = path.join(__dirname, "../data/mappings/international-schools.csv");
const csvHeader = "id,name,nameEn,level,category,rawCategory,district,district18,curriculumV2,instructionLanguages,tuitionMin,tuitionMax";
const csvRows = intlSchools.map(s =>
  `"${s.id}","${s.name}","${s.nameEn}","${s.level}","${s.category}","${s.rawCategory}","${s.district}","${s.district18}","${s.curriculumV2.join(";")}","${s.instructionLanguages.join(";")}",${s.tuitionMin},${s.tuitionMax}`
);
fs.writeFileSync(csvPath, [csvHeader, ...csvRows].join("\n"), "utf-8");

// Generate deduplicated CSV
const uniqueCsvPath = path.join(__dirname, "../data/mappings/international-schools-unique.csv");
const uniqueCsvHeader = "name,nameEn,levels,category,districts,schoolIds,curriculumV2,instructionLanguages,tuitionMin,tuitionMax";
const uniqueCsvRows = uniqueSchools.map(s =>
  `"${s.name}","${s.nameEn}","${s.levels.join(";")}","${s.category}","${s.districts.join(";")}","${s.schoolIds.join(";")}","${s.curriculumV2.join(";")}","${s.instructionLanguages.join(";")}",${s.tuitionMin},${s.tuitionMax}`
);
fs.writeFileSync(uniqueCsvPath, [uniqueCsvHeader, ...uniqueCsvRows].join("\n"), "utf-8");

console.log("=== International School Database Generated ===");
console.log(`TypeScript: ${outputPath}`);
console.log(`CSV (raw): ${csvPath}`);
console.log(`CSV (unique): ${uniqueCsvPath}`);
console.log(`Total: ${intlSchools.length} schools (raw entries)`);
console.log(`Unique: ${uniqueSchools.length} schools (deduplicated by name)`);
console.log(`By level:`, byLevel);
console.log("");
console.log("Sample raw entries:");
intlSchools.slice(0, 5).forEach(s => {
  console.log(`  - ${s.nameEn} (${s.level})`);
});
console.log("");
console.log("Sample unique entries:");
uniqueSchools.slice(0, 5).forEach(s => {
  console.log(`  - ${s.nameEn} (${s.levels.join(", ")})`);
});
