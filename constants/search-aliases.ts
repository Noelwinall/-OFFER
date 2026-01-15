/**
 * Search Query Alias Expansion
 * R3-8: Fix search semantics for school groups (ESF, etc.)
 *
 * When user searches for a group name (e.g., "ESF"),
 * expand to include all schools in that group.
 */

/**
 * Query aliases for school group searches
 * Key: normalized query (lowercase)
 * Value: array of expanded search terms
 */
export const SEARCH_ALIASES: Record<string, string[]> = {
  // ESF (English Schools Foundation) - 22 schools
  "esf": [
    "ENGLISH SCHOOLS FOUNDATION",
    "ESF",
    "BEACON HILL",
    "BRADBURY",
    "CLEARWATER BAY SCHOOL",
    "GLENEALY",
    "KENNEDY SCHOOL",
    "PEAK SCHOOL",
    "QUARRY BAY SCHOOL",
    "SHA TIN JUNIOR",
    "ISLAND SCHOOL",
    "KING GEORGE V",
    "SOUTH ISLAND SCHOOL",
    "WEST ISLAND SCHOOL",
    "RENAISSANCE COLLEGE",
    "DISCOVERY COLLEGE",
    "JOCKEY CLUB SARAH ROE",
  ],
  "英基": [
    "ENGLISH SCHOOLS FOUNDATION",
    "ESF",
    "BEACON HILL",
    "BRADBURY",
    "CLEARWATER BAY SCHOOL",
    "GLENEALY",
    "KENNEDY SCHOOL",
    "PEAK SCHOOL",
    "QUARRY BAY SCHOOL",
    "SHA TIN JUNIOR",
    "ISLAND SCHOOL",
    "KING GEORGE V",
    "SOUTH ISLAND SCHOOL",
    "WEST ISLAND SCHOOL",
    "RENAISSANCE COLLEGE",
    "DISCOVERY COLLEGE",
    "JOCKEY CLUB SARAH ROE",
  ],
  "english schools foundation": [
    "ENGLISH SCHOOLS FOUNDATION",
    "ESF",
    "BEACON HILL",
    "BRADBURY",
    "CLEARWATER BAY SCHOOL",
    "GLENEALY",
    "KENNEDY SCHOOL",
    "PEAK SCHOOL",
    "QUARRY BAY SCHOOL",
    "SHA TIN JUNIOR",
    "ISLAND SCHOOL",
    "KING GEORGE V",
    "SOUTH ISLAND SCHOOL",
    "WEST ISLAND SCHOOL",
    "RENAISSANCE COLLEGE",
    "DISCOVERY COLLEGE",
    "JOCKEY CLUB SARAH ROE",
  ],
};

/**
 * Get expanded search terms for a query
 * @param query - Original search query
 * @returns Array of terms to search (original + aliases)
 */
export function expandSearchQuery(query: string): string[] {
  const normalized = query.toLowerCase().trim();
  const aliases = SEARCH_ALIASES[normalized];

  if (aliases) {
    // Return both original query and all aliases
    return [query, ...aliases];
  }

  return [query];
}
