/**
 * @deprecated Import from "@/lib/school-classification" instead
 * This file re-exports for backwards compatibility
 */
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
} from "@/lib/school-classification";
export type {
  SessionType,
  GroupedSchool,
  GroupPredicate,
} from "@/lib/school-classification";
