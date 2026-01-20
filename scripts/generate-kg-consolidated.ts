/**
 * Generate Consolidated Kindergarten Database
 *
 * Combines multiple data sources into a unified KG database:
 * 1. schools_raw.ts - Basic school info, session variants (AM/PM/WD)
 * 2. EDB KGP Profile CSV - Curriculum, pedagogy, teaching methods
 * 3. Existing mappings - Instruction language, metadata
 *
 * Output:
 * - data/kg/kg-database.ts - TypeScript database with full types
 * - data/kg/kg-database.csv - CSV export for data management
 * - data/kg/kg-summary.md - Documentation and statistics
 *
 * Usage: npx tsx scripts/generate-kg-consolidated.ts
 */

import * as fs from "fs";
import * as path from "path";

// ============================================
// Types
// ============================================

export type KGNature = "international" | "non_profit" | "private";

// Two-level curriculum structure
// Level 1: Category (local vs non_local vs unknown)
export type KGCurriculumCategory = "local" | "non_local" | "unknown";

// Level 2: Specific type within each category
// - local: kgp (joined KGP) | non_kgp (not joined KGP)
// - non_local: ib | montessori | british | other (includes Japanese, etc.)
export type KGLocalCurriculumType = "kgp" | "non_kgp";
export type KGNonLocalCurriculumType = "ib" | "montessori" | "british" | "other";
export type KGCurriculumType = KGLocalCurriculumType | KGNonLocalCurriculumType | null;

export type KGSession = "AM" | "PM" | "WD";

export interface KindergartenEntry {
  // Core identification
  id: string;
  schoolCode: string;
  campusCode: string;
  name: string;
  nameEn: string;

  // Location
  district: string;
  district18: string;
  address: string;

  // Classification
  nature: KGNature;
  curriculumCategory: KGCurriculumCategory;
  curriculumType: KGCurriculumType;
  joinedKGP: boolean;

  // Sessions (merged AM/PM/WD variants)
  sessions: KGSession[];
  variantIds: string[];

  // Pedagogy & Teaching
  pedagogyTags: string[];
  languageEnv: string[];

  // Fees
  tuitionMin: number;
  tuitionMax: number;

  // Metadata
  religion?: string;
  phone: string;
  website: string;

  // Audit info
  dataQuality: {
    curriculumConfidence: "high" | "medium" | "low";
    pedagogyConfidence: "high" | "medium" | "low";
    languageConfidence: "high" | "medium" | "low";
    needsReview: boolean;
  };
}

// ============================================
// Constants & Patterns
// ============================================

const EDB_SOURCE_URL = "https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/free-quality-kg-edu/KGP_2025_tc.csv";

const SESSION_CODE_MAP: Record<string, KGSession> = {
  "11": "AM",
  "12": "PM",
  "13": "WD",
};

const KGP_FEE_CAP = 50000;

// Pedagogy category labels (Traditional Chinese)
const PEDAGOGY_LABELS: Record<string, string> = {
  special_curriculum: "特色課程",
  play_explore: "遊戲探索",
  project_learn: "專題學習",
  language_dev: "語言發展",
  holistic: "全人發展",
};

// International school patterns
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
  "ESF ABACUS INTERNATIONAL KINDERGARTEN",
  "ESF INTERNATIONAL KINDERGARTEN",
  "ESF HILLSIDE INTERNATIONAL KINDERGARTEN",
  "ESF TSING YI INTERNATIONAL KINDERGARTEN",
  "ESF WU KAI SHA INTERNATIONAL KINDERGARTEN",
];

// Pedagogy extraction patterns - consolidated into 5 categories
// 1. special_curriculum (特色課程) - Named methodologies (Montessori, Reggio, etc.)
// 2. play_explore (遊戲探索) - Play & exploration based
// 3. project_learn (專題學習) - Project & thematic learning
// 4. language_dev (語言發展) - Language development focus
// 5. holistic (全人發展) - Holistic child development
const PEDAGOGY_PATTERNS: Array<{ pattern: RegExp; tag: string }> = [
  // special_curriculum (特色課程) - Named methodologies
  { pattern: /蒙特梭利|蒙特索利|Montessori/i, tag: "special_curriculum" },
  { pattern: /瑞吉歐|Reggio/i, tag: "special_curriculum" },
  { pattern: /高瞻|HighScope|High\s*Scope/i, tag: "special_curriculum" },
  { pattern: /華德福|Waldorf/i, tag: "special_curriculum" },
  { pattern: /IB|國際文憑/i, tag: "special_curriculum" },
  // play_explore (遊戲探索) - Play & exploration
  { pattern: /遊戲中學習|從遊戲中學習|遊戲學習|自由遊戲/i, tag: "play_explore" },
  { pattern: /活動教學|活動學習/i, tag: "play_explore" },
  { pattern: /感官學習|感官探索|多感官/i, tag: "play_explore" },
  { pattern: /探究式|探索式|探索學習|探究學習/i, tag: "play_explore" },
  // project_learn (專題學習) - Project & thematic
  { pattern: /專題研習|方案教學|Project/i, tag: "project_learn" },
  { pattern: /主題教學|主題綜合/i, tag: "project_learn" },
  { pattern: /建構/i, tag: "project_learn" },
  // language_dev (語言發展) - Language development
  { pattern: /繪本教學|繪本/i, tag: "language_dev" },
  { pattern: /全語文/i, tag: "language_dev" },
  // holistic (全人發展) - Holistic development
  { pattern: /兒童為本|以兒童為中心|兒童為中心/i, tag: "holistic" },
  { pattern: /品德教育|德育/i, tag: "holistic" },
  { pattern: /多元智能/i, tag: "holistic" },
  { pattern: /藝術綜合|藝術教育/i, tag: "holistic" },
  { pattern: /小組學習|小組活動/i, tag: "holistic" },
  { pattern: /混齡|跨級/i, tag: "holistic" },
  { pattern: /STEM|STEAM|創客|Maker/i, tag: "holistic" },
];

// Language extraction patterns
const LANGUAGE_PATTERNS: Array<{ pattern: RegExp; lang: string }> = [
  { pattern: /兩文三語/i, lang: "trilingual" },
  { pattern: /普通話|國語/i, lang: "putonghua" },
  { pattern: /英語|英文|English/i, lang: "english" },
  { pattern: /粵語|廣東話/i, lang: "cantonese" },
  { pattern: /外籍.*英語|NET.*英語|外籍英語/i, lang: "native_english" },
  { pattern: /中英雙語|雙語/i, lang: "bilingual" },
];

// ============================================
// Data Loading
// ============================================

// @ts-ignore
const { schoolsRaw } = require("../data/schools_raw");
// @ts-ignore
const { instructionLanguageMap } = require("../data/mappings/instruction-language-map");
// @ts-ignore
const { schoolMetadataMap } = require("../data/mappings/school-metadata-map");

let feesData: Record<string, any> = {};
try {
  // @ts-ignore
  const { schoolFees } = require("../data/fees-2025-26");
  feesData = schoolFees || {};
} catch (e) {
  console.warn("Warning: Could not load fees data");
}

// ============================================
// CSV Parser
// ============================================

function parseCSV(content: string): string[][] {
  const lines = content.split("\n");
  const result: string[][] = [];

  for (const line of lines) {
    if (!line.trim()) continue;

    const fields: string[] = [];
    let current = "";
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];

      if (char === '"' && !inQuotes) {
        inQuotes = true;
      } else if (char === '"' && inQuotes) {
        if (line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else if (char === "^" && !inQuotes) {
        fields.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }
    fields.push(current.trim());
    result.push(fields);
  }

  return result;
}

// ============================================
// Helper Functions
// ============================================

function normalizeForMatch(name: string): string {
  return name.toUpperCase().replace(/\s+/g, " ").replace(/^THE\s+/, "").trim();
}

function isInternational(nameEn: string): boolean {
  if (!nameEn) return false;
  const normalized = normalizeForMatch(nameEn);

  // Check ESF
  if (ESF_SCHOOLS.some((esf) => normalized.includes(normalizeForMatch(esf)))) {
    return true;
  }

  // Check non-group international schools
  if (NON_GROUP_INTERNATIONAL_SCHOOLS.some((pattern) =>
    normalized.includes(normalizeForMatch(pattern))
  )) {
    return true;
  }

  return false;
}

function getSessionFromId(id: string): KGSession | null {
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

function determineNature(nameEn: string, tuitionMax: number): KGNature {
  if (isInternational(nameEn)) {
    return "international";
  }
  if (tuitionMax > KGP_FEE_CAP) {
    return "private";
  }
  return "non_profit";
}

function extractPedagogyTags(text: string): { tags: string[]; confidence: "high" | "medium" | "low" } {
  const tags: string[] = [];

  for (const { pattern, tag } of PEDAGOGY_PATTERNS) {
    if (pattern.test(text)) {
      tags.push(tag);
    }
  }

  let confidence: "high" | "medium" | "low" = "high";
  if (tags.length === 0) {
    if (!text || text.includes("沒有資料")) {
      confidence = "low";
    } else {
      confidence = "medium";
    }
  } else if (tags.length > 5) {
    confidence = "medium";
  }

  return { tags, confidence };
}

function extractLanguageEnv(text: string, curriculumType: string): { langs: string[]; confidence: "high" | "medium" | "low" } {
  const langs: string[] = [];

  for (const { pattern, lang } of LANGUAGE_PATTERNS) {
    if (pattern.test(text) && !langs.includes(lang)) {
      langs.push(lang);
    }
  }

  // Infer from curriculum type
  if (curriculumType === "非本地" && !langs.includes("english")) {
    langs.push("english");
  }

  let confidence: "high" | "medium" | "low" = "high";
  if (langs.length === 0) {
    if (!text || text.includes("沒有資料")) {
      confidence = "low";
    } else {
      langs.push("cantonese");
      confidence = "medium";
    }
  }

  return { langs, confidence };
}

// ============================================
// CSV Writer
// ============================================

function escapeCSV(value: any): string {
  const str = String(value ?? "");
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

// ============================================
// Main Processing
// ============================================

function main() {
  console.log("========================================");
  console.log("Generating Consolidated KG Database");
  console.log("========================================\n");

  // 1. Load EDB KGP Profile data
  console.log("1. Loading EDB KGP Profile data...");
  const edbPath = path.join(__dirname, "../data/kg/edb_kgp_2025_tc.csv");
  let edbProfiles: Map<string, any> = new Map();

  if (fs.existsSync(edbPath)) {
    const edbContent = fs.readFileSync(edbPath, "utf-8");
    const edbRows = parseCSV(edbContent);
    const headers = edbRows[0];
    const colIndex: Record<string, number> = {};
    headers.forEach((h, i) => { colIndex[h] = i; });

    for (let i = 1; i < edbRows.length; i++) {
      const row = edbRows[i];
      if (row.length < 10) continue;

      const schoolCode = row[colIndex["學校編號"]] || "";
      const campusCode = row[colIndex["校址編號"]] || "";
      if (!schoolCode) continue;

      const id = `edb_${schoolCode}${campusCode}`;
      edbProfiles.set(id, {
        curriculumType: row[colIndex["課程類別"]] || "",
        curriculumPlanning: row[colIndex["課程規劃"]] || "",
        teachingMethods: row[colIndex["學習_教學模式及活動"]] || "",
        joinKGP: row[colIndex["參加幼稚園教育計劃"]] || "",
        schoolType: row[colIndex["學校類別"]] || "",
      });
    }
    console.log(`   Loaded ${edbProfiles.size} EDB profiles`);
  } else {
    console.log("   Warning: EDB profile data not found");
  }

  // 2. Process schools_raw kindergartens with session grouping
  console.log("\n2. Processing schools_raw kindergartens...");
  const allKGs = schoolsRaw.filter(
    (s: any) => s.level && String(s.level).includes("幼稚園")
  );
  console.log(`   Found ${allKGs.length} kindergarten variants (including AM/PM/WD)`);

  // Group by school
  const groupedMap = new Map<string, KindergartenEntry>();

  for (const kg of allKGs) {
    const groupKey = getGroupKey(kg.id);
    if (!groupKey) continue;

    const session = getSessionFromId(kg.id);
    const fees = feesData[kg.id];
    const languages = instructionLanguageMap[kg.id] || [];
    const metadata = schoolMetadataMap[kg.id];

    // Get tuition
    let tuitionMin = 0;
    let tuitionMax = 0;
    if (fees?.tuition?.bands && fees.tuition.bands.length > 0) {
      tuitionMin = Math.min(...fees.tuition.bands.map((b: any) => b.amountMin || 0));
      tuitionMax = Math.max(...fees.tuition.bands.map((b: any) => b.amountMax || 0));
    } else if (kg.tuitionMin || kg.tuitionMax) {
      tuitionMin = kg.tuitionMin || 0;
      tuitionMax = kg.tuitionMax || 0;
    }

    // Get EDB profile data
    const edbProfile = edbProfiles.get(groupKey);
    const curriculumType = edbProfile?.curriculumType || "";
    const curriculumText = `${edbProfile?.curriculumPlanning || ""} ${edbProfile?.teachingMethods || ""}`;
    const joinedKGP = edbProfile?.joinKGP === "有參加";

    // Extract pedagogy and language
    const { tags: pedagogyTags, confidence: pedagogyConf } = extractPedagogyTags(curriculumText);
    const { langs: languageEnv, confidence: langConf } = extractLanguageEnv(
      `${curriculumText} ${kg.nameEn || ""}`,
      curriculumType
    );

    // Determine curriculum (two-level structure)
    let curriculumCategory: KGCurriculumCategory = "unknown";
    let curriculumTypeVal: KGCurriculumType = null;
    let curriculumConf: "high" | "medium" | "low" = "low";

    if (curriculumType === "本地") {
      curriculumCategory = "local";
      curriculumTypeVal = joinedKGP ? "kgp" : "non_kgp";
      curriculumConf = "high";
    } else if (curriculumType === "非本地") {
      curriculumCategory = "non_local";
      curriculumConf = "medium";

      // Determine specific non-local curriculum type
      if (curriculumText.includes("國際文憑") || curriculumText.includes("IB")) {
        curriculumTypeVal = "ib";
        curriculumConf = "high";
      } else if (kg.nameEn && (kg.nameEn.includes("Montessori") || kg.name?.includes("蒙特梭利"))) {
        curriculumTypeVal = "montessori";
        curriculumConf = "high";
      } else if (curriculumText.includes("英國") || kg.nameEn?.includes("British")) {
        curriculumTypeVal = "british";
        curriculumConf = "medium";
      } else {
        // Includes Japanese, German, American, etc.
        curriculumTypeVal = "other";
      }
    } else {
      // Unknown - infer from school name (no EDB profile data)
      const nameEn = (kg.nameEn || "").toUpperCase();
      const nameTc = kg.name || "";

      // Check for international/non-local indicators in name
      const isLikelyNonLocal =
        nameEn.includes("INTERNATIONAL") ||
        nameEn.includes("MONTESSORI") ||
        nameTc.includes("國際") ||
        nameTc.includes("蒙特梭利");

      if (isLikelyNonLocal) {
        curriculumCategory = "non_local";
        curriculumTypeVal = "other";
        curriculumConf = "low";
      } else {
        // Default to local non-KGP (private local schools)
        curriculumCategory = "local";
        curriculumTypeVal = "non_kgp";
        curriculumConf = "low";
      }
    }

    if (groupedMap.has(groupKey)) {
      // Add session variant to existing entry
      const existing = groupedMap.get(groupKey)!;
      if (session && !existing.sessions.includes(session)) {
        existing.sessions.push(session);
      }
      existing.variantIds.push(kg.id);

      // Update tuition if better data
      if (tuitionMax > existing.tuitionMax) {
        existing.tuitionMax = tuitionMax;
      }
      if (tuitionMin > 0 && (existing.tuitionMin === 0 || tuitionMin < existing.tuitionMin)) {
        existing.tuitionMin = tuitionMin;
      }
    } else {
      // Create new entry
      const nature = determineNature(kg.nameEn || "", tuitionMax);

      const entry: KindergartenEntry = {
        id: groupKey,
        schoolCode: groupKey.replace("edb_", "").slice(0, 6),
        campusCode: groupKey.replace("edb_", "").slice(6, 10),
        name: kg.name || "",
        nameEn: kg.nameEn || "",
        district: kg.district || "",
        district18: kg.district18 || "",
        address: kg.address || "",
        nature,
        curriculumCategory,
        curriculumType: curriculumTypeVal,
        joinedKGP,
        sessions: session ? [session] : [],
        variantIds: [kg.id],
        pedagogyTags,
        languageEnv,
        tuitionMin,
        tuitionMax,
        religion: metadata?.religion,
        phone: kg.phone || "",
        website: kg.website || "",
        dataQuality: {
          curriculumConfidence: curriculumConf,
          pedagogyConfidence: pedagogyConf,
          languageConfidence: langConf,
          needsReview: curriculumConf === "low" || pedagogyConf === "low" || !edbProfile,
        },
      };

      groupedMap.set(groupKey, entry);
    }
  }

  // Convert to array and sort
  const kindergartens = Array.from(groupedMap.values());

  // Sort sessions consistently
  const sessionOrder: KGSession[] = ["AM", "PM", "WD"];
  for (const kg of kindergartens) {
    kg.sessions.sort((a, b) => sessionOrder.indexOf(a) - sessionOrder.indexOf(b));
    kg.variantIds.sort();
  }

  // Sort by district, then name
  kindergartens.sort((a, b) => {
    if (a.district !== b.district) return a.district.localeCompare(b.district);
    return a.name.localeCompare(b.name);
  });

  console.log(`   Consolidated into ${kindergartens.length} unique kindergartens`);

  // 3. Generate statistics
  console.log("\n3. Generating statistics...");

  const stats = {
    total: kindergartens.length,
    byNature: {
      international: kindergartens.filter((k) => k.nature === "international").length,
      non_profit: kindergartens.filter((k) => k.nature === "non_profit").length,
      private: kindergartens.filter((k) => k.nature === "private").length,
    },
    byCurriculumCategory: {} as Record<string, number>,
    byCurriculumType: {} as Record<string, number>,
    byPedagogy: {} as Record<string, number>,
    byLanguage: {} as Record<string, number>,
    joinedKGP: kindergartens.filter((k) => k.joinedKGP).length,
    withFees: kindergartens.filter((k) => k.tuitionMax > 0).length,
    needsReview: kindergartens.filter((k) => k.dataQuality.needsReview).length,
    byDistrict: {} as Record<string, number>,
  };

  for (const kg of kindergartens) {
    stats.byCurriculumCategory[kg.curriculumCategory] = (stats.byCurriculumCategory[kg.curriculumCategory] || 0) + 1;
    if (kg.curriculumType) {
      stats.byCurriculumType[kg.curriculumType] = (stats.byCurriculumType[kg.curriculumType] || 0) + 1;
    }
    stats.byDistrict[kg.district18] = (stats.byDistrict[kg.district18] || 0) + 1;

    for (const tag of kg.pedagogyTags) {
      stats.byPedagogy[tag] = (stats.byPedagogy[tag] || 0) + 1;
    }
    for (const lang of kg.languageEnv) {
      stats.byLanguage[lang] = (stats.byLanguage[lang] || 0) + 1;
    }
  }

  // 4. Output files
  console.log("\n4. Writing output files...");
  const outputDir = path.join(__dirname, "../data/kg");

  // 4a. TypeScript database
  const tsOutput = `// Consolidated Kindergarten Database
// Generated: ${new Date().toISOString().split("T")[0]}
// Total: ${stats.total} unique kindergartens
// Sources: schools_raw.ts, EDB KGP Profile 2025
//
// DO NOT EDIT MANUALLY - Run "npx tsx scripts/generate-kg-consolidated.ts" to regenerate

export type KGNature = "international" | "non_profit" | "private";

// Two-level curriculum structure
export type KGCurriculumCategory = "local" | "non_local" | "unknown";
export type KGLocalCurriculumType = "kgp" | "non_kgp";
export type KGNonLocalCurriculumType = "ib" | "montessori" | "british" | "other";
export type KGCurriculumType = KGLocalCurriculumType | KGNonLocalCurriculumType | null;

export type KGSession = "AM" | "PM" | "WD";

export interface KindergartenEntry {
  id: string;
  schoolCode: string;
  campusCode: string;
  name: string;
  nameEn: string;
  district: string;
  district18: string;
  address: string;
  nature: KGNature;
  curriculumCategory: KGCurriculumCategory;
  curriculumType: KGCurriculumType;
  joinedKGP: boolean;
  sessions: KGSession[];
  variantIds: string[];
  pedagogyTags: string[];
  languageEnv: string[];
  tuitionMin: number;
  tuitionMax: number;
  religion?: string;
  phone: string;
  website: string;
  dataQuality: {
    curriculumConfidence: "high" | "medium" | "low";
    pedagogyConfidence: "high" | "medium" | "low";
    languageConfidence: "high" | "medium" | "low";
    needsReview: boolean;
  };
}

/**
 * Complete kindergarten database (deduplicated, session variants merged)
 */
export const kindergartens: KindergartenEntry[] = ${JSON.stringify(kindergartens, null, 2)};

/**
 * Quick lookup by group ID
 */
export const kindergartenMap: Record<string, KindergartenEntry> = Object.fromEntries(
  kindergartens.map((k) => [k.id, k])
);

/**
 * Quick lookup by any variant ID (including session suffix)
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
 * Get kindergartens by curriculum category
 */
export function getKindergartensByCurriculumCategory(category: KGCurriculumCategory): KindergartenEntry[] {
  return kindergartens.filter((k) => k.curriculumCategory === category);
}

/**
 * Get kindergartens by curriculum type
 */
export function getKindergartensByCurriculumType(type: KGCurriculumType): KindergartenEntry[] {
  return kindergartens.filter((k) => k.curriculumType === type);
}

/**
 * Get kindergartens by pedagogy tag
 */
export function getKindergartensByPedagogy(tag: string): KindergartenEntry[] {
  return kindergartens.filter((k) => k.pedagogyTags.includes(tag));
}

/**
 * Get kindergartens by district
 */
export function getKindergartensByDistrict(district: string): KindergartenEntry[] {
  return kindergartens.filter((k) => k.district18 === district || k.district === district);
}

/**
 * Statistics
 */
export const kindergartenStats = ${JSON.stringify(stats, null, 2)};
`;

  const tsPath = path.join(outputDir, "kg-database.ts");
  fs.writeFileSync(tsPath, tsOutput, "utf-8");
  console.log(`   Written: ${tsPath}`);

  // 4b. CSV export
  const csvHeaders = [
    "id", "school_code", "campus_code", "name", "name_en",
    "district", "district18", "address",
    "nature", "curriculum_category", "curriculum_type", "joined_kgp",
    "sessions", "variant_ids",
    "pedagogy_tags", "language_env",
    "tuition_min", "tuition_max",
    "religion", "phone", "website",
    "curriculum_confidence", "pedagogy_confidence", "language_confidence", "needs_review"
  ];

  const csvRows = kindergartens.map((kg) => [
    kg.id,
    kg.schoolCode,
    kg.campusCode,
    kg.name,
    kg.nameEn,
    kg.district,
    kg.district18,
    kg.address,
    kg.nature,
    kg.curriculumCategory,
    kg.curriculumType || "",
    kg.joinedKGP ? "Y" : "N",
    kg.sessions.join("|"),
    kg.variantIds.join("|"),
    kg.pedagogyTags.join("|"),
    kg.languageEnv.join("|"),
    kg.tuitionMin,
    kg.tuitionMax,
    kg.religion || "",
    kg.phone,
    kg.website,
    kg.dataQuality.curriculumConfidence,
    kg.dataQuality.pedagogyConfidence,
    kg.dataQuality.languageConfidence,
    kg.dataQuality.needsReview ? "Y" : "N",
  ].map(escapeCSV).join(","));

  const csvContent = [csvHeaders.join(","), ...csvRows].join("\n");
  const csvPath = path.join(outputDir, "kg-database.csv");
  fs.writeFileSync(csvPath, "\uFEFF" + csvContent, "utf-8");
  console.log(`   Written: ${csvPath}`);

  // 4c. Summary markdown
  const summaryContent = `# Consolidated Kindergarten Database

Generated: ${new Date().toISOString()}

## Overview

| Metric | Count |
|--------|-------|
| Total Unique KGs | ${stats.total} |
| Session Variants | ${allKGs.length} |
| Joined KGP (幼稚園教育計劃) | ${stats.joinedKGP} |
| With Fees Data | ${stats.withFees} |
| Needs Review | ${stats.needsReview} |

## By Nature

| Nature | Count | % |
|--------|-------|---|
| International | ${stats.byNature.international} | ${(stats.byNature.international / stats.total * 100).toFixed(1)}% |
| Non-profit (KGP) | ${stats.byNature.non_profit} | ${(stats.byNature.non_profit / stats.total * 100).toFixed(1)}% |
| Private | ${stats.byNature.private} | ${(stats.byNature.private / stats.total * 100).toFixed(1)}% |

## By Curriculum Category

| Category | Count | % |
|----------|-------|---|
${Object.entries(stats.byCurriculumCategory)
  .sort((a, b) => b[1] - a[1])
  .map(([k, v]) => `| ${k} | ${v} | ${(v / stats.total * 100).toFixed(1)}% |`)
  .join("\n")}

## By Curriculum Type

| Type | Count | % |
|------|-------|---|
${Object.entries(stats.byCurriculumType)
  .sort((a, b) => b[1] - a[1])
  .map(([k, v]) => `| ${k} | ${v} | ${(v / stats.total * 100).toFixed(1)}% |`)
  .join("\n")}

## Top Pedagogy Tags

| Tag | Count | % |
|-----|-------|---|
${Object.entries(stats.byPedagogy)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 15)
  .map(([k, v]) => `| ${k} | ${v} | ${(v / stats.total * 100).toFixed(1)}% |`)
  .join("\n")}

## Language Environment

| Language | Count | % |
|----------|-------|---|
${Object.entries(stats.byLanguage)
  .sort((a, b) => b[1] - a[1])
  .map(([k, v]) => `| ${k} | ${v} | ${(v / stats.total * 100).toFixed(1)}% |`)
  .join("\n")}

## By District (18 Districts)

| District | Count |
|----------|-------|
${Object.entries(stats.byDistrict)
  .sort((a, b) => b[1] - a[1])
  .map(([k, v]) => `| ${k} | ${v} |`)
  .join("\n")}

## Data Sources

1. **schools_raw.ts** - Basic school info, session variants (AM/PM/WD)
2. **EDB KGP Profile 2025** - Curriculum type, pedagogy, teaching methods
   - Source: ${EDB_SOURCE_URL}
3. **instruction-language-map.ts** - Instruction language mapping
4. **school-metadata-map.ts** - Religion and other metadata

## Data Quality

Confidence levels:
- **high**: Direct match from authoritative data
- **medium**: Inferred from patterns/context
- **low**: Missing or ambiguous source data

Schools marked \`needs_review\` require manual verification.

## Files

| File | Description |
|------|-------------|
| \`kg-database.ts\` | TypeScript database with full types and helper functions |
| \`kg-database.csv\` | CSV export for data management (Excel-compatible) |
| \`kg-summary.md\` | This documentation file |
`;

  const summaryPath = path.join(outputDir, "kg-summary.md");
  fs.writeFileSync(summaryPath, summaryContent, "utf-8");
  console.log(`   Written: ${summaryPath}`);

  // 5. Print summary
  console.log("\n========================================");
  console.log("SUMMARY");
  console.log("========================================\n");

  console.log(`Total: ${stats.total} unique kindergartens`);
  console.log(`  - International: ${stats.byNature.international}`);
  console.log(`  - Non-profit (KGP): ${stats.byNature.non_profit}`);
  console.log(`  - Private: ${stats.byNature.private}`);
  console.log(`  - Joined KGP: ${stats.joinedKGP}`);
  console.log(`  - Needs review: ${stats.needsReview}`);

  console.log("\nCurriculum Category:");
  for (const [k, v] of Object.entries(stats.byCurriculumCategory).sort((a, b) => b[1] - a[1])) {
    console.log(`  - ${k}: ${v}`);
  }

  console.log("\nCurriculum Type:");
  for (const [k, v] of Object.entries(stats.byCurriculumType).sort((a, b) => b[1] - a[1])) {
    console.log(`  - ${k}: ${v}`);
  }

  console.log("\nTop pedagogy tags:");
  for (const [k, v] of Object.entries(stats.byPedagogy).sort((a, b) => b[1] - a[1]).slice(0, 10)) {
    console.log(`  - ${k}: ${v}`);
  }

  console.log("\n========================================");
  console.log("DONE");
  console.log("========================================");
}

main();
