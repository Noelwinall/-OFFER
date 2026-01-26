/**
 * School Name Aliases Mapping
 *
 * Maps common abbreviated/colloquial school names to their official database names or IDs.
 * This helps with matching when external data sources (like CSV files, web scraping, user input)
 * use different names than the official EDB registry.
 *
 * Format: lowercase alias -> { nameEn, nameZh, schoolIdPattern }
 * - nameEn: Official English name in database (for reference)
 * - nameZh: Official Chinese name in database (for reference)
 * - schoolIdPattern: Partial school ID to match (allows matching multiple campus entries)
 *
 * To add a new alias:
 * 1. Find the official name and ID in the SCHOOLS data
 * 2. Add the common alias(es) as keys (lowercase)
 * 3. Include the school ID pattern for matching
 */

export interface SchoolAlias {
  nameEn: string;      // Official English name (for reference)
  nameZh: string;      // Official Chinese name (for reference)
  schoolIdPattern: string;  // Partial ID to match (e.g., "553190" matches all edb_553190* entries)
}

/**
 * Common school name aliases
 * Key: lowercase common name/abbreviation
 * Value: official school information
 */
export const SCHOOL_ALIASES: Record<string, SchoolAlias> = {
  // ISF - Independent Schools Foundation
  "the isf academy": {
    nameEn: "THE INDEPENDENT SCHOOLS FOUNDATION ACADEMY",
    nameZh: "弘立書院",
    schoolIdPattern: "553190",
  },
  "isf academy": {
    nameEn: "THE INDEPENDENT SCHOOLS FOUNDATION ACADEMY",
    nameZh: "弘立書院",
    schoolIdPattern: "553190",
  },
  "isf": {
    nameEn: "THE INDEPENDENT SCHOOLS FOUNDATION ACADEMY",
    nameZh: "弘立書院",
    schoolIdPattern: "553190",
  },
  "弘立书院": {  // Simplified Chinese variant
    nameEn: "THE INDEPENDENT SCHOOLS FOUNDATION ACADEMY",
    nameZh: "弘立書院",
    schoolIdPattern: "553190",
  },

  // CDNIS - Canadian International School
  "cdnis": {
    nameEn: "CANADIAN INTERNATIONAL SCHOOL",
    nameZh: "加拿大國際學校",
    schoolIdPattern: "216011",
  },
  "canadian international school of hong kong": {
    nameEn: "CANADIAN INTERNATIONAL SCHOOL",
    nameZh: "加拿大國際學校",
    schoolIdPattern: "216011",
  },

  // GSIS - German Swiss International School
  "gsis": {
    nameEn: "GERMAN SWISS INTERNATIONAL SCHOOL",
    nameZh: "德瑞國際學校",
    schoolIdPattern: "214558",
  },

  // HKIS - Hong Kong International School
  "hkis": {
    nameEn: "HONG KONG INTERNATIONAL SCHOOL",
    nameZh: "香港國際學校",
    schoolIdPattern: "214078",
  },
  "hong kong international school": {
    nameEn: "HONG KONG INTERNATIONAL SCHOOL",
    nameZh: "香港國際學校",
    schoolIdPattern: "214078",
  },

  // FIS - French International School / Lycée Français International
  "fis": {
    nameEn: "LYC'EE FRANCAIS INTERNATIONAL (FRENCH INTERNATIONAL SCHOOL)",
    nameZh: "法國國際學校",
    schoolIdPattern: "214949",
  },
  "french international school": {
    nameEn: "LYC'EE FRANCAIS INTERNATIONAL (FRENCH INTERNATIONAL SCHOOL)",
    nameZh: "法國國際學校",
    schoolIdPattern: "214949",
  },
  "lycee francais": {
    nameEn: "LYC'EE FRANCAIS INTERNATIONAL (FRENCH INTERNATIONAL SCHOOL)",
    nameZh: "法國國際學校",
    schoolIdPattern: "214949",
  },

  // VSA - Victoria Shanghai Academy
  "vsa": {
    nameEn: "VICTORIA SHANGHAI ACADEMY",
    nameZh: "滬江維多利亞學校",
    schoolIdPattern: "560138",
  },

  // ASHK - American School Hong Kong
  "ashk": {
    nameEn: "AMERICAN SCHOOL HONG KONG",
    nameZh: "美國學校",
    schoolIdPattern: "603902",
  },

  // ESF Schools (English Schools Foundation)
  "esf": {
    nameEn: "ENGLISH SCHOOLS FOUNDATION",
    nameZh: "英基學校協會",
    schoolIdPattern: "esf_",  // ESF schools may have different ID pattern
  },

  // Yew Chung / YCIS
  "ycis": {
    nameEn: "YEW CHUNG INTERNATIONAL SCHOOL",
    nameZh: "耀中國際學校",
    schoolIdPattern: "215186",
  },
  "yew chung": {
    nameEn: "YEW CHUNG INTERNATIONAL SCHOOL",
    nameZh: "耀中國際學校",
    schoolIdPattern: "215186",
  },

  // CAIS - Christian Alliance International School
  "cais": {
    nameEn: "CHRISTIAN ALLIANCE INTERNATIONAL SCHOOL",
    nameZh: "宣道國際學校",
    schoolIdPattern: "566870",
  },

  // Harrow
  "harrow": {
    nameEn: "HARROW INTERNATIONAL SCHOOL HONG KONG",
    nameZh: "哈羅香港國際學校",
    schoolIdPattern: "597384",
  },

  // AIS - American International School
  "ais": {
    nameEn: "AMERICAN INTERNATIONAL SCHOOL",
    nameZh: "美國國際學校",
    schoolIdPattern: "214060",
  },

  // SIS - Singapore International School
  "sis hong kong": {
    nameEn: "SINGAPORE INTERNATIONAL SCHOOL (HONG KONG)",
    nameZh: "新加坡國際學校",
    schoolIdPattern: "215214",
  },

  // KGV - King George V School (ESF)
  "kgv": {
    nameEn: "KING GEORGE V SCHOOL",
    nameZh: "英皇佐治五世學校",
    schoolIdPattern: "214124",
  },

  // DBS - Diocesan Boys' School
  "dbs": {
    nameEn: "DIOCESAN BOYS' SCHOOL",
    nameZh: "拔萃男書院",
    schoolIdPattern: "191510",
  },

  // DGS - Diocesan Girls' School
  "dgs": {
    nameEn: "DIOCESAN GIRLS' SCHOOL",
    nameZh: "拔萃女書院",
    schoolIdPattern: "191499",
  },

  // SPCC - St. Paul's Co-educational College
  "spcc": {
    nameEn: "ST. PAUL'S CO-EDUCATIONAL COLLEGE",
    nameZh: "聖保羅男女中學",
    schoolIdPattern: "191293",
  },
};

/**
 * Build a lookup map from aliases to school ID patterns
 */
export function buildAliasLookup(): Map<string, string> {
  const lookup = new Map<string, string>();
  for (const [alias, info] of Object.entries(SCHOOL_ALIASES)) {
    lookup.set(alias.toLowerCase(), info.schoolIdPattern);
  }
  return lookup;
}

/**
 * Find school ID pattern by alias
 */
export function findSchoolByAlias(name: string): string | null {
  const normalized = name.toLowerCase().trim();
  const alias = SCHOOL_ALIASES[normalized];
  return alias?.schoolIdPattern ?? null;
}
