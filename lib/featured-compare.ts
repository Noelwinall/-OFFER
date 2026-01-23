/**
 * Featured Compare Configuration (精選對比)
 *
 * Curated school lists for the Compare workbench feature.
 * - Free users: Random 2 schools from the curated list
 * - Pro users: First 5 schools from the curated list
 *
 * School typing uses existing data structure definitions.
 * DO NOT redefine school type rules here.
 *
 * @maintainer Manually curated - update school IDs if data changes
 */

import { SCHOOLS } from "@/data/schools";
import type { School } from "@/types/school";

/**
 * Featured compare categories
 */
export type FeaturedCategory = "KG" | "INTERNATIONAL" | "DSS";

/**
 * Category display info
 */
export const FEATURED_CATEGORY_INFO: Record<FeaturedCategory, { label: string; description: string }> = {
  KG: {
    label: "精選幼稚園",
    description: "香港頂尖幼稚園精選",
  },
  INTERNATIONAL: {
    label: "精選國際學校",
    description: "香港知名國際學校",
  },
  DSS: {
    label: "精選直資學校",
    description: "香港頂尖直資中學",
  },
};

/**
 * Curated school lists by category
 * Each entry: { id, nameZh, nameEn } for auditability
 */
export const FEATURED_SCHOOLS_CONFIG: Record<FeaturedCategory, Array<{
  id: string;
  nameZh: string;
  nameEn: string;
}>> = {
  /**
   * KG (幼稚園) - Top 10 Curated
   */
  KG: [
    // 1. St. Catherine's International Kindergarten (羅福道)
    { id: "edb_215120000111", nameZh: "國際英文幼稚園（羅福道）", nameEn: "St. Catherine's International Kindergarten" },
    // 2. Kiangsu & Chekiang Primary School (蘇浙小學暨幼兒園)
    { id: "edb_132730000111", nameZh: "蘇浙小學校", nameEn: "Kiangsu & Chekiang Primary School" },
    // 3. Munsang College Kindergarten
    { id: "edb_575410000111", nameZh: "民生書院幼稚園", nameEn: "Munsang College Kindergarten" },
    // 4. Yau Yat Chuen School
    { id: "edb_133850000111", nameZh: "又一村學校", nameEn: "Yau Yat Chuen School" },
    // 5. Immaculate Heart of Mary Kindergarten
    { id: "edb_151009000111", nameZh: "聖母無玷聖心幼稚園", nameEn: "Immaculate Heart of Mary Kindergarten" },
    // 6. Pui Ching Primary School (Kindergarten)
    { id: "edb_513350000111", nameZh: "香港培正小學（幼稚園）", nameEn: "Pui Ching Primary School (Kindergarten)" },
    // 7. Karlam Anglo-Chinese Kindergarten
    { id: "edb_231886000211", nameZh: "珈琳中英文幼稚園", nameEn: "Karlam Anglo-Chinese Kindergarten" },
    // 8. Cannan Kindergarten (Kowloon Tong)
    { id: "edb_531910000111", nameZh: "迦南幼稚園（九龍塘）", nameEn: "Cannan Kindergarten (Kowloon Tong)" },
    // 9. Hong Kong Ling Liang Church Kindergarten
    { id: "edb_133744000111", nameZh: "香港靈糧堂幼稚園", nameEn: "Hong Kong Ling Liang Church Kindergarten" },
    // 10. Tsung Tsin Primary School and Kindergarten
    { id: "edb_514659000112", nameZh: "崇真小學暨幼稚園", nameEn: "Tsung Tsin Primary School and Kindergarten" },
  ],

  /**
   * INTERNATIONAL - Top 10 Curated
   */
  INTERNATIONAL: [
    // 1. German Swiss International School (GSIS)
    { id: "edb_214558000221", nameZh: "德瑞國際學校", nameEn: "German Swiss International School (GSIS)" },
    // 2. Chinese International School (CIS)
    { id: "edb_215589000123", nameZh: "漢基國際學校", nameEn: "Chinese International School (CIS)" },
    // 3. The ISF Academy
    { id: "edb_553190000323", nameZh: "弘立書院", nameEn: "The ISF Academy" },
    // 4. Singapore International School (Hong Kong)
    { id: "edb_216003000223", nameZh: "新加坡國際學校", nameEn: "Singapore International School (Hong Kong)" },
    // 5. Victoria Shanghai Academy (VSA)
    { id: "edb_560138000223", nameZh: "滬江維多利亞學校", nameEn: "Victoria Shanghai Academy (VSA)" },
    // 6. American School Hong Kong (ASHK)
    { id: "edb_603902000123", nameZh: "AMERICAN SCHOOL HONG KONG", nameEn: "American School Hong Kong (ASHK)" },
    // 7. French International School (FIS)
    { id: "edb_214949000523", nameZh: "LYC'EE FRANCAIS INTERNATIONAL (FRENCH INTERNATIONAL SCHOOL)", nameEn: "French International School (FIS)" },
    // 8. Hong Kong International School (HKIS)
    { id: "edb_213772000123", nameZh: "HONG KONG INTERNATIONAL SCHOOL", nameEn: "Hong Kong International School (HKIS)" },
    // 9. Canadian International School of Hong Kong (CDNIS)
    { id: "edb_216011000523", nameZh: "加拿大國際學校", nameEn: "Canadian International School of Hong Kong (CDNIS)" },
    // 10. Harrow International School Hong Kong
    { id: "edb_590800000123", nameZh: "哈羅香港國際學校", nameEn: "Harrow International School Hong Kong" },
  ],

  /**
   * DSS (直資中學) - Top 10 Curated
   */
  DSS: [
    // 1. St Paul's Co-educational College
    { id: "edb_510980000133", nameZh: "聖保羅男女中學", nameEn: "St Paul's Co-educational College" },
    // 2. Diocesan Girls' School
    { id: "edb_511714000133", nameZh: "拔萃女書院", nameEn: "Diocesan Girls' School" },
    // 3. Diocesan Boys' School
    { id: "edb_510777000133", nameZh: "拔萃男書院", nameEn: "Diocesan Boys' School" },
    // 4. Heep Yunn School
    { id: "edb_511935000133", nameZh: "協恩中學", nameEn: "Heep Yunn School" },
    // 5. Good Hope School
    { id: "edb_132837000133", nameZh: "德望學校", nameEn: "Good Hope School" },
    // 6. St Paul's College
    { id: "edb_514209000133", nameZh: "聖保羅書院", nameEn: "St Paul's College" },
    // 7. St Paul's Convent School
    { id: "edb_514217000133", nameZh: "聖保祿學校", nameEn: "St Paul's Convent School" },
    // 8. St Stephen's College
    { id: "edb_170712000133", nameZh: "聖士提反書院", nameEn: "St Stephen's College" },
    // 9. Ying Wa College
    { id: "edb_515027000233", nameZh: "英華書院", nameEn: "Ying Wa College" },
    // 10. Evangel College
    { id: "edb_567337000133", nameZh: "播道書院", nameEn: "Evangel College" },
  ],
};

/**
 * Resolve curated school IDs to actual School objects
 * Validates that each ID exists in the database
 */
export function getResolvedFeaturedSchools(category: FeaturedCategory): School[] {
  const config = FEATURED_SCHOOLS_CONFIG[category];
  const schoolMap = new Map(SCHOOLS.map((s) => [s.id, s]));
  const resolved: School[] = [];

  for (const entry of config) {
    const school = schoolMap.get(entry.id);
    if (school) {
      resolved.push(school);
    } else {
      console.warn(
        `[FeaturedCompare] School not found: ${entry.id} (${entry.nameZh} / ${entry.nameEn})`
      );
    }
  }

  return resolved;
}

/**
 * Get featured schools for Free users (random 2)
 * Uses date-based seed for daily stability
 */
export function getFeaturedSchoolsForFree(
  category: FeaturedCategory,
  seed?: string
): School[] {
  const schools = getResolvedFeaturedSchools(category);
  if (schools.length < 2) return schools;

  // Use date-based seed for daily stability
  const today = seed || new Date().toISOString().split("T")[0];
  const seedValue = hashString(`${category}-${today}`);

  // Fisher-Yates shuffle with seeded random
  const shuffled = [...schools];
  let currentSeed = seedValue;

  for (let i = shuffled.length - 1; i > 0; i--) {
    currentSeed = (currentSeed * 1103515245 + 12345) & 0x7fffffff;
    const j = currentSeed % (i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, 2);
}

/**
 * Get featured schools for Pro users (first 5)
 */
export function getFeaturedSchoolsForPro(category: FeaturedCategory): School[] {
  const schools = getResolvedFeaturedSchools(category);
  return schools.slice(0, 5);
}

/**
 * Get a new random pair for "換一組" button
 * Uses random seed for fresh results
 */
export function getNewRandomPair(category: FeaturedCategory): School[] {
  const randomSeed = `${category}-${Date.now()}-${Math.random()}`;
  return getFeaturedSchoolsForFree(category, randomSeed);
}

/**
 * Simple string hash function for seeded randomness
 */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}
