/**
 * KG Curriculum Classification Constants
 *
 * Two-level curriculum hierarchy:
 * - Level 1: local | non_local
 * - Level 2 (subtypes):
 *   - local: kgp | non_kgp
 *   - non_local: ib | montessori | british | other
 */

// Re-export types from kg-database for consistency
export type { KGCurriculumCategory, KGCurriculumType, KGLocalCurriculumType, KGNonLocalCurriculumType } from "@/data/kg/kg-database";

/** Level 1 curriculum categories */
export type KGCurriculumCategoryFilter = "local" | "non_local";

/** Level 2 curriculum subtypes for local */
export type KGLocalSubtype = "kgp" | "non_kgp";

/** Level 2 curriculum subtypes for non-local */
export type KGNonLocalSubtype = "ib" | "montessori" | "british" | "other";

/** Combined Level 2 type */
export type KGCurriculumSubtypeFilter = KGLocalSubtype | KGNonLocalSubtype;

/** Level 1 options for filter UI */
export const KG_CURRICULUM_CATEGORY_OPTIONS: { label: string; value: KGCurriculumCategoryFilter }[] = [
  { label: "本地課程", value: "local" },
  { label: "非本地課程", value: "non_local" },
];

/** Level 2 options for local curriculum */
export const KG_LOCAL_SUBTYPE_OPTIONS: { label: string; value: KGLocalSubtype }[] = [
  { label: "KGP (幼稚園教育計劃)", value: "kgp" },
  { label: "非KGP", value: "non_kgp" },
];

/** Level 2 options for non-local curriculum */
export const KG_NON_LOCAL_SUBTYPE_OPTIONS: { label: string; value: KGNonLocalSubtype }[] = [
  { label: "IB", value: "ib" },
  { label: "蒙特梭利", value: "montessori" },
  { label: "英國課程", value: "british" },
  { label: "其他國際課程", value: "other" },
];

/** Labels for display */
export const KG_CURRICULUM_CATEGORY_LABELS: Record<KGCurriculumCategoryFilter, string> = {
  local: "本地課程",
  non_local: "非本地課程",
};

export const KG_CURRICULUM_SUBTYPE_LABELS: Record<KGCurriculumSubtypeFilter, string> = {
  kgp: "KGP",
  non_kgp: "非KGP",
  ib: "IB",
  montessori: "蒙特梭利",
  british: "英國課程",
  other: "其他國際課程",
};

/**
 * Get display text for curriculum (combines category + subtype)
 * e.g., "本地課程 · KGP" or "非本地課程 · IB"
 */
export function formatKGCurriculumDisplay(
  category: KGCurriculumCategoryFilter | "unknown" | null | undefined,
  subtype: KGCurriculumSubtypeFilter | null | undefined
): string | null {
  if (!category || category === "unknown") return null;

  const categoryLabel = KG_CURRICULUM_CATEGORY_LABELS[category as KGCurriculumCategoryFilter];
  if (!categoryLabel) return null;

  if (!subtype) return categoryLabel;

  const subtypeLabel = KG_CURRICULUM_SUBTYPE_LABELS[subtype as KGCurriculumSubtypeFilter];
  if (!subtypeLabel) return categoryLabel;

  return `${categoryLabel} · ${subtypeLabel}`;
}

/**
 * Mapping from subtype to parent category
 */
export const SUBTYPE_TO_CATEGORY: Record<KGCurriculumSubtypeFilter, KGCurriculumCategoryFilter> = {
  kgp: "local",
  non_kgp: "local",
  ib: "non_local",
  montessori: "non_local",
  british: "non_local",
  other: "non_local",
};

/**
 * Get subtypes for a given category
 */
export function getSubtypesForCategory(category: KGCurriculumCategoryFilter): KGCurriculumSubtypeFilter[] {
  if (category === "local") {
    return ["kgp", "non_kgp"];
  }
  return ["ib", "montessori", "british", "other"];
}
