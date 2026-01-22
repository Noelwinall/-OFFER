/**
 * School Classification Module
 *
 * Centralized classification logic for Hong Kong schools.
 * All school type determination functions are exported from here.
 *
 * DATA FLOW:
 * ┌─────────────────────────────────────────────────────────────┐
 * │  data/schools_raw.ts (SINGLE SOURCE OF TRUTH - 3509 schools)│
 * └─────────────────────────────────────────────────────────────┘
 *                              ↓
 * ┌─────────────────────────────────────────────────────────────┐
 * │  Classification Functions (this module)                     │
 * │  ├── isInternational()      → 209 schools (after grouping)  │
 * │  ├── getKGNature()          → international/private/non_profit│
 * │  ├── getSchoolGroup()       → ESF, etc.                     │
 * │  └── groupSchoolsBySession() → merge AM/PM/WD variants      │
 * └─────────────────────────────────────────────────────────────┘
 *                              ↓
 * ┌─────────────────────────────────────────────────────────────┐
 * │  Filter/Display Logic                                       │
 * │  ├── lib/filter-logic.ts                                   │
 * │  └── lib/district-map-data.ts                              │
 * └─────────────────────────────────────────────────────────────┘
 *
 * CATEGORY SYSTEMS:
 *
 * KG (幼稚園):
 *   - 國際 (International)
 *   - 私立幼稚園 (Private KG - high fees, non-KGP)
 *   - 非牟利幼稚園 (Non-profit KG - KGP participant)
 *
 * Primary/Secondary (小學/中學):
 *   - 國際 (International)
 *   - 私立 (Private)
 *   - 直資 (DSS - Direct Subsidy Scheme)
 *   - 資助 (Aided)
 *   - 公立 (Government)
 *
 * USAGE:
 * ```typescript
 * import {
 *   isInternational,
 *   getKGNature,
 *   groupSchoolsBySession,
 *   isEsfSchool,
 * } from "@/lib/school-classification";
 * ```
 */

// ============================================
// International School Classification
// ============================================
export {
  isInternational,
  getSchoolDisplayType,
  isEsfSchool,
  getSchoolGroup,
  NON_GROUP_INTERNATIONAL_SCHOOLS,
} from "./international";

// ============================================
// School Groups (ESF, etc.)
// ============================================
export {
  SCHOOL_GROUPS,
  ESF_CANONICAL_LIST,
  getEsfEntry,
  getEsfSchoolNames,
} from "./school-groups";
export type {
  SchoolGroupId,
  SchoolGroup,
  CanonicalSchoolEntry,
} from "./school-groups";

// ============================================
// Kindergarten Nature Classification
// ============================================
export {
  getKGNature,
  getKGNatureLabel,
  getKGNatureColor,
  matchesKGCategory,
  isNonInternationalKG,
  KG_NATURE_LABELS,
  KG_NATURE_COLORS,
  KG_CATEGORY_PRIVATE,
  KG_CATEGORY_NONPROFIT,
  KG_CATEGORY_OPTIONS,
  NON_KG_CATEGORY_OPTIONS,
} from "./kg-nature";
export type {
  KGNature,
  ExtendedCategory,
} from "./kg-nature";

// ============================================
// Session Grouping (AM/PM/WD)
// ============================================
export {
  groupSchoolsBySession,
  getSessionFromId,
  getGroupKey,
  isKindergarten,
  isPrimary,
  isSecondary,
  defaultPredicate,
  SESSION_LABELS,
  SESSION_COLORS,
} from "./session-grouping";
export type {
  SessionType,
  GroupedSchool,
  GroupPredicate,
} from "./session-grouping";
