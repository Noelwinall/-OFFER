/**
 * Search Query Handling for School Groups
 *
 * When user searches for a group name (e.g., "ESF", "英基"),
 * we identify this as a GROUP SEARCH and handle it specially.
 *
 * RULES:
 * - Group searches use canonical group membership, NOT keyword matching
 * - This prevents false positives (e.g., "白普理" matching non-ESF schools)
 * - Regular text searches still work normally
 */

import { isEsfSchool, ESF_CANONICAL_LIST, SCHOOL_GROUPS } from "@/lib/school-classification";
import type { School } from "@/types/school";

/**
 * Group search triggers
 * Key: normalized query (lowercase)
 * Value: group identifier
 */
export const GROUP_SEARCH_TRIGGERS: Record<string, string> = {
  // ESF triggers (English)
  "esf": "ESF",
  "english schools foundation": "ESF",
  // ESF triggers (Chinese)
  "英基": "ESF",
  "英基學校": "ESF",
  "英基學校協會": "ESF",
};

/**
 * Check if a search query is a group search
 * @returns The group ID if it's a group search, null otherwise
 */
export function getGroupSearchId(query: string): string | null {
  const normalized = query.toLowerCase().trim();
  return GROUP_SEARCH_TRIGGERS[normalized] || null;
}

/**
 * Check if a school matches a group search
 */
export function matchesGroupSearch(school: Pick<School, "nameEn">, groupId: string): boolean {
  if (groupId === "ESF") {
    return isEsfSchool(school);
  }
  // Add other group checks here
  return false;
}

/**
 * Get expanded search terms for a query
 *
 * For group searches: returns all canonical school names in the group
 * For regular searches: returns the original query only
 *
 * @param query - Original search query
 * @returns Array of terms to search
 */
export function expandSearchQuery(query: string): string[] {
  const groupId = getGroupSearchId(query);

  if (groupId === "ESF") {
    // Return all ESF school names for matching
    const esfNames: string[] = [];
    for (const entry of ESF_CANONICAL_LIST) {
      esfNames.push(entry.nameEn);
      esfNames.push(...entry.aliasesEn);
      // Also add Chinese name for matching
      if (entry.nameTc) {
        esfNames.push(entry.nameTc);
      }
    }
    // Include original query and group name
    return [query, "ESF", "ENGLISH SCHOOLS FOUNDATION", "英基", ...esfNames];
  }

  // Regular search - return original query only
  return [query];
}

/**
 * Check if a query triggers group-based filtering
 * This is used by the filter logic to enable group-based search
 */
export function isGroupSearch(query: string): boolean {
  return getGroupSearchId(query) !== null;
}
