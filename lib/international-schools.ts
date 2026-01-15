/**
 * International School Classification
 *
 * AUTHORITATIVE SOURCES:
 * - EDB International Schools List
 * - School group canonical lists (ESF, etc.)
 *
 * RULES:
 * - International school status is determined by:
 *   1. Membership in an international school group (e.g., ESF)
 *   2. Registration as international school with EDB
 * - NOT by curriculum (IB/A-Level) or language
 * - NOT by keyword matching
 *
 * NOTE: This module does NOT modify types/school.ts or data/schools.ts
 */

import type { School } from "@/types/school";
import { isEsfSchool, getSchoolGroup } from "@/constants/school-groups";

/**
 * Canonical list of non-ESF international schools
 * Source: EDB international school registry
 *
 * These schools are registered with EDB as international schools
 * and are NOT part of a school group (like ESF).
 */
const NON_GROUP_INTERNATIONAL_SCHOOLS: string[] = [
  // Major standalone international schools
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
  "THE INDEPENDENT SCHOOLS FOUNDATION ACADEMY",
  "VICTORIA SHANGHAI ACADEMY",
  "WOODLAND PRE-SCHOOLS",
  "YEW CHUNG INTERNATIONAL SCHOOL",
];

/**
 * Normalize school name for matching
 */
function normalizeForMatch(name: string): string {
  return name
    .toUpperCase()
    .replace(/\s+/g, " ")
    .replace(/^THE\s+/, "")
    .trim();
}

/**
 * Check if school matches a non-group international school
 */
function matchesNonGroupInternational(school: Pick<School, "nameEn">): boolean {
  if (!school.nameEn) return false;

  const normalizedName = normalizeForMatch(school.nameEn);

  for (const pattern of NON_GROUP_INTERNATIONAL_SCHOOLS) {
    const normalizedPattern = normalizeForMatch(pattern);
    // Check if the school name contains the pattern
    if (normalizedName.includes(normalizedPattern)) {
      return true;
    }
  }

  return false;
}

/**
 * Check if a school is an international school
 *
 * A school is international if:
 * 1. It belongs to an international school group (e.g., ESF)
 * 2. It is registered as a standalone international school with EDB
 *
 * @param school - School object with nameEn
 * @returns true if school is an international school
 */
export function isInternational(school: Pick<School, "nameEn">): boolean {
  if (!school.nameEn) return false;

  // Rule 1: Check school group membership
  const group = getSchoolGroup(school);
  if (group === "ESF") return true;

  // Rule 2: Check non-group international schools
  if (matchesNonGroupInternational(school)) return true;

  return false;
}

/**
 * Get display type for a school
 * Returns "國際學校" for international schools, otherwise the original category
 *
 * @param school - School object
 * @returns Display string for school type
 */
export function getSchoolDisplayType(
  school: Pick<School, "nameEn" | "category">
): string {
  return isInternational(school) ? "國際學校" : school.category;
}

/**
 * Export for testing/debugging
 */
export const INTERNATIONAL_SCHOOL_PATTERNS = NON_GROUP_INTERNATIONAL_SCHOOLS;
