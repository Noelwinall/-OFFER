/**
 * International School Lookup
 * Source: EDB official list of 53 international schools
 * https://www.edb.gov.hk/en/edu-system/primary-secondary/applicable-to-primary-secondary/sbm/international-schools/index.html
 *
 * NOTE: This is an independent lookup file. DO NOT modify types/school.ts or data/schools.ts.
 */

import type { School } from "@/types/school";

/**
 * Official EDB international school name patterns
 * These are matched against school.nameEn (case-insensitive)
 */
const INTERNATIONAL_SCHOOL_PATTERNS: string[] = [
  // ESF (English Schools Foundation) - 22 schools
  "ESF",
  "BEACON HILL SCHOOL",
  "BRADBURY SCHOOL",
  "CLEARWATER BAY SCHOOL",
  "GLENEALY SCHOOL",
  "KENNEDY SCHOOL",
  "PEAK SCHOOL",
  "QUARRY BAY SCHOOL",
  "SHA TIN JUNIOR SCHOOL",
  "ISLAND SCHOOL",
  "KING GEORGE V SCHOOL",
  "SOUTH ISLAND SCHOOL",
  "WEST ISLAND SCHOOL",
  "RENAISSANCE COLLEGE",

  // Major International Schools
  "AMERICAN INTERNATIONAL SCHOOL",
  "AUSTRALIAN INTERNATIONAL SCHOOL HONG KONG",
  "CANADIAN INTERNATIONAL SCHOOL",
  "CARMEL SCHOOL",
  "CHINESE INTERNATIONAL SCHOOL",
  "CHRISTIAN ALLIANCE INTERNATIONAL SCHOOL",
  "CONCORDIA INTERNATIONAL SCHOOL",
  "DSC INTERNATIONAL SCHOOL",
  "DISCOVERY BAY INTERNATIONAL SCHOOL",
  "FRENCH INTERNATIONAL SCHOOL",
  "GERMAN SWISS INTERNATIONAL SCHOOL",
  "HARROW INTERNATIONAL SCHOOL HONG KONG",
  "HONG KONG ACADEMY",
  "HONG KONG INTERNATIONAL SCHOOL",
  "INTERNATIONAL CHRISTIAN SCHOOL",
  "INTERNATIONAL COLLEGE HONG KONG",
  "INTERNATIONAL MONTESSORI SCHOOL",
  "JAPANESE INTERNATIONAL SCHOOL",
  "KELLETT SCHOOL",
  "KOREAN INTERNATIONAL SCHOOL",
  "LANTAU INTERNATIONAL SCHOOL",
  "MALVERN COLLEGE HONG KONG",
  "MULBERRY HOUSE",
  "NORD ANGLIA INTERNATIONAL SCHOOL",
  "NORWEGIAN INTERNATIONAL SCHOOL",
  "SEAR ROGERS INTERNATIONAL SCHOOL",
  "SHREWSBURY INTERNATIONAL SCHOOL",
  "SINGAPORE INTERNATIONAL SCHOOL",
  "STAMFORD AMERICAN SCHOOL HONG KONG",
  "ST. STEPHEN'S COLLEGE INTERNATIONAL",
  "THE INDEPENDENT SCHOOLS FOUNDATION ACADEMY",
  "VICTORIA SHANGHAI ACADEMY",
  "WOODLAND PRE-SCHOOLS",
  "YEW CHUNG INTERNATIONAL SCHOOL",
];

/**
 * Compiled regex patterns for efficient matching
 */
const internationalPatterns = INTERNATIONAL_SCHOOL_PATTERNS.map(
  (pattern) => new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i")
);

/**
 * Check if a school is an international school
 * @param school - School object with nameEn
 * @returns true if school matches EDB international school list
 */
export function isInternational(school: Pick<School, "nameEn">): boolean {
  if (!school.nameEn) return false;
  const nameEn = school.nameEn.toUpperCase();
  return internationalPatterns.some((pattern) => pattern.test(nameEn));
}

/**
 * Get display type for a school
 * Returns "國際學校" for international schools, otherwise the original category
 * @param school - School object
 * @returns Display string for school type
 */
export function getSchoolDisplayType(
  school: Pick<School, "nameEn" | "category">
): string {
  return isInternational(school) ? "國際學校" : school.category;
}

/**
 * Export patterns for debugging/statistics
 */
export const INTERNATIONAL_PATTERNS = INTERNATIONAL_SCHOOL_PATTERNS;
