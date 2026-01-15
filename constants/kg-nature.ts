/**
 * Kindergarten School Nature Classification
 *
 * Determines ONE nature label per KG:
 * - International: belongs to international school group
 * - Non-profit: participates in KGP scheme (default for non-international)
 * - Private: non-KGP private kindergartens (high fees)
 *
 * NOTE: This module only applies to kindergartens (level = "幼稚園")
 *
 * CATEGORY SYSTEM:
 * - Non-international KGs are removed from original 5 categories
 * - Two new KG-specific categories: "私立幼稚園" and "非牟利幼稚園"
 * - International KGs remain in "國際" category
 */

import type { School } from "@/types/school";
import { isInternational } from "@/lib/international-schools";
import { getSchoolFees } from "@/data/fees-2025-26";

/** School Nature enum values */
export type KGNature = "international" | "non_profit" | "private";

/** Extended category type for filter UI (includes KG-specific categories) */
export type ExtendedCategory = "國際" | "資助" | "直資" | "私立" | "公立" | "私立幼稚園" | "非牟利幼稚園";

/** Display labels (Chinese Traditional) */
export const KG_NATURE_LABELS: Record<KGNature, string> = {
  international: "國際",
  non_profit: "非牟利",
  private: "私立",
};

/** KG-specific category filter values */
export const KG_CATEGORY_PRIVATE = "私立幼稚園" as const;
export const KG_CATEGORY_NONPROFIT = "非牟利幼稚園" as const;

/** Display colors for nature badges */
export const KG_NATURE_COLORS: Record<KGNature, string> = {
  international: "#00D9FF", // Cyan - matches existing international color
  non_profit: "#10B981", // Emerald green - trustworthy, government scheme
  private: "#7C3AED", // Purple - premium/private
};

/** KGP fee cap threshold (HKD per year, 2025/26) */
const KGP_FEE_CAP = 50000; // Schools above this are likely non-KGP private

/**
 * Determine the School Nature for a kindergarten
 *
 * Rules:
 * 1. If international school → "international"
 * 2. Else if has high fees (> KGP cap) → "private"
 * 3. Else → "non_profit" (assumed KGP participant)
 *
 * @param school - School object (must be kindergarten)
 * @returns KGNature enum value, or null if not a kindergarten
 */
export function getKGNature(school: Pick<School, "id" | "nameEn" | "level">): KGNature | null {
  // Only applies to kindergartens
  if (!String(school.level ?? "").includes("幼稚園")) {
    return null;
  }

  // Rule 1: International schools
  if (isInternational(school)) {
    return "international";
  }

  // Rule 2: Check for high fees (non-KGP private)
  const fees = getSchoolFees(school.id);
  if (fees?.tuition?.bands && fees.tuition.bands.length > 0) {
    // Get the highest annual fee
    const maxFee = Math.max(...fees.tuition.bands.map((b) => b.amountMax || 0));
    if (maxFee > KGP_FEE_CAP) {
      return "private";
    }
  }

  // Rule 3: Default to non-profit (KGP participant)
  return "non_profit";
}

/**
 * Get display label for KG nature
 */
export function getKGNatureLabel(nature: KGNature): string {
  return KG_NATURE_LABELS[nature];
}

/**
 * Get display color for KG nature
 */
export function getKGNatureColor(nature: KGNature): string {
  return KG_NATURE_COLORS[nature];
}

/**
 * Check if a kindergarten matches a KG-specific category filter
 *
 * @param school - School object
 * @param kgCategory - KG category filter value ("私立幼稚園" | "非牟利幼稚園")
 * @returns true if school matches the KG category
 */
export function matchesKGCategory(
  school: Pick<School, "id" | "nameEn" | "level">,
  kgCategory: typeof KG_CATEGORY_PRIVATE | typeof KG_CATEGORY_NONPROFIT
): boolean {
  const nature = getKGNature(school);
  if (!nature) return false; // Not a kindergarten

  // International KGs don't match KG-specific categories
  if (nature === "international") return false;

  if (kgCategory === KG_CATEGORY_PRIVATE) {
    return nature === "private";
  }
  if (kgCategory === KG_CATEGORY_NONPROFIT) {
    return nature === "non_profit";
  }
  return false;
}

/**
 * Check if a school is a non-international kindergarten
 * These should be excluded from the original 5 category filters
 */
export function isNonInternationalKG(school: Pick<School, "id" | "nameEn" | "level">): boolean {
  const nature = getKGNature(school);
  return nature !== null && nature !== "international";
}
