/**
 * Import Deadlines from CSV
 *
 * This script imports school deadline events from the CSV seed file into the database.
 * It matches schools by their English name against the SCHOOLS data.
 *
 * Usage:
 *   npx tsx scripts/import-deadlines.ts
 *
 * Requires:
 *   DATABASE_URL environment variable to be set
 */

import { readFileSync } from "fs";
import { drizzle } from "drizzle-orm/mysql2";
import { schoolDeadlines, unmatchedSchoolsLog, InsertSchoolDeadline, InsertUnmatchedSchoolLog } from "../drizzle/schema";
import { SCHOOLS } from "../data/schools";
import { SCHOOL_ALIASES } from "../data/school-aliases";

// CSV file path
const CSV_PATH = "./data/hk_school_deadlines_seed_2026_2027.csv";
const SOURCE_FILE = "hk_school_deadlines_seed_2026_2027.csv";

/**
 * Normalize apostrophes and quotes to a single form
 * Handles various Unicode apostrophe variants:
 * - U+0027 APOSTROPHE (')
 * - U+2018 LEFT SINGLE QUOTATION MARK (')
 * - U+2019 RIGHT SINGLE QUOTATION MARK (')
 * - U+0060 GRAVE ACCENT (`)
 * - U+02BC MODIFIER LETTER APOSTROPHE (ʼ)
 */
function normalizeApostrophes(name: string): string {
  return name.replace(/[\u0027\u2018\u2019\u0060\u02BC]/g, "'");
}

// Build a lookup map for faster school matching (with apostrophe normalization)
const schoolLookupByNameEn = new Map<string, string>();
for (const school of SCHOOLS) {
  const normalizedName = normalizeApostrophes(school.nameEn).trim().toLowerCase();
  schoolLookupByNameEn.set(normalizedName, school.id);
}

// Also build a lookup by Chinese name as fallback
const schoolLookupByNameZh = new Map<string, string>();
for (const school of SCHOOLS) {
  const normalizedName = school.name.trim();
  schoolLookupByNameZh.set(normalizedName, school.id);
}

/**
 * Normalize a school name for matching
 * - Lowercase
 * - Remove parenthetical content like (GSIS), (HKIS), etc.
 * - Remove "of Hong Kong" suffix
 * - Remove extra whitespace
 * - Remove punctuation
 */
function normalizeName(name: string): string {
  return name
    .toLowerCase()
    .replace(/\([^)]*\)/g, '')           // Remove parenthetical content
    .replace(/['']/g, '')                 // Remove apostrophes
    .replace(/[&]/g, 'and')               // Normalize ampersand
    .replace(/\s+of\s+hong\s+kong/gi, '') // Remove "of Hong Kong"
    .replace(/\s+/g, ' ')                 // Normalize whitespace
    .trim();
}

/**
 * Build a search key from a name (more aggressive normalization for fuzzy matching)
 */
function buildSearchKey(name: string): string {
  return name
    .toLowerCase()
    .replace(/\([^)]*\)/g, '')
    .replace(/[''&\-.,]/g, '')
    .replace(/\s+of\s+hong\s+kong/gi, '')
    .replace(/\s+(school|kindergarten|academy|college|preschool)\s*$/gi, '')
    .replace(/\s+/g, '')
    .trim();
}

// Build search key lookup for fuzzy matching
const schoolLookupBySearchKey = new Map<string, string>();
for (const school of SCHOOLS) {
  const searchKey = buildSearchKey(school.nameEn);
  if (!schoolLookupBySearchKey.has(searchKey)) {
    schoolLookupBySearchKey.set(searchKey, school.id);
  }
}

// Build additional lookup maps with normalized names
const schoolLookupByNormalizedEn = new Map<string, string>();
for (const school of SCHOOLS) {
  const normalizedName = normalizeName(school.nameEn);
  if (!schoolLookupByNormalizedEn.has(normalizedName)) {
    schoolLookupByNormalizedEn.set(normalizedName, school.id);
  }
}

// Build lookup for parenthetical aliases in database names
// e.g., "LYC'EE FRANCAIS INTERNATIONAL (FRENCH INTERNATIONAL SCHOOL)" -> "french international school"
const schoolLookupByParenthetical = new Map<string, string>();
for (const school of SCHOOLS) {
  const parenMatch = school.nameEn.match(/\(([^)]+)\)/);
  if (parenMatch) {
    const alias = parenMatch[1].toLowerCase().trim();
    if (!schoolLookupByParenthetical.has(alias)) {
      schoolLookupByParenthetical.set(alias, school.id);
    }
  }
}

// Build lookup for common school aliases (abbreviations like ISF, CDNIS, GSIS, etc.)
// Maps alias -> first matching school ID
const schoolLookupByAlias = new Map<string, string>();
for (const [aliasName, aliasInfo] of Object.entries(SCHOOL_ALIASES)) {
  // Find first school whose ID contains the pattern
  const matchingSchool = SCHOOLS.find(s => s.id.includes(aliasInfo.schoolIdPattern));
  if (matchingSchool) {
    schoolLookupByAlias.set(aliasName.toLowerCase(), matchingSchool.id);
  }
}

/**
 * Match a school by name against SCHOOLS data
 * Returns school ID if matched, null otherwise
 */
function matchSchool(nameEn: string, nameZh: string): string | null {
  // Normalize apostrophes first
  const cleanNameEn = nameEn ? normalizeApostrophes(nameEn) : "";

  // Try exact English name first (case-insensitive, apostrophe-normalized)
  if (cleanNameEn) {
    const normalizedEn = cleanNameEn.trim().toLowerCase();
    const matchedId = schoolLookupByNameEn.get(normalizedEn);
    if (matchedId) return matchedId;
  }

  // Try normalized English name (strips parenthetical abbreviations)
  if (cleanNameEn) {
    const normalizedEn = normalizeName(cleanNameEn);
    const matchedId = schoolLookupByNormalizedEn.get(normalizedEn);
    if (matchedId) return matchedId;
  }

  // Try common school aliases (ISF, CDNIS, GSIS, etc.)
  if (cleanNameEn) {
    const aliasKey = cleanNameEn.trim().toLowerCase();
    const matchedId = schoolLookupByAlias.get(aliasKey);
    if (matchedId) return matchedId;

    // Also try without parenthetical abbreviation suffix
    const withoutAbbr = aliasKey.replace(/\s*\([^)]*\)\s*$/, "").trim();
    if (withoutAbbr !== aliasKey) {
      const matchedId2 = schoolLookupByAlias.get(withoutAbbr);
      if (matchedId2) return matchedId2;
    }
  }

  // Try search key matching (more aggressive normalization)
  if (cleanNameEn) {
    const searchKey = buildSearchKey(cleanNameEn);
    const matchedId = schoolLookupBySearchKey.get(searchKey);
    if (matchedId) return matchedId;
  }

  // Try matching against database parenthetical aliases
  // e.g., CSV "French International School (FIS)" -> match DB "(FRENCH INTERNATIONAL SCHOOL)"
  if (cleanNameEn) {
    // Strip abbreviation from CSV name and try matching DB's parenthetical content
    const csvWithoutAbbr = cleanNameEn.replace(/\s*\([^)]*\)\s*$/, "").trim().toLowerCase();
    const matchedId = schoolLookupByParenthetical.get(csvWithoutAbbr);
    if (matchedId) return matchedId;
  }

  // Fallback to Chinese name
  if (nameZh) {
    const normalizedZh = nameZh.trim();
    const matchedId = schoolLookupByNameZh.get(normalizedZh);
    if (matchedId) return matchedId;
  }

  return null;
}

/**
 * Parse CSV content into rows
 * Handles quoted fields with commas
 */
function parseCSV(content: string): Record<string, string>[] {
  const lines = content.split("\n");
  if (lines.length < 2) return [];

  // Parse header (first line)
  const headerLine = lines[0].replace(/^\uFEFF/, ""); // Remove BOM if present
  const headers = parseCSVLine(headerLine);

  const rows: Record<string, string>[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const values = parseCSVLine(line);
    const row: Record<string, string> = {};

    headers.forEach((header, index) => {
      row[header.trim()] = values[index]?.trim() || "";
    });

    rows.push(row);
  }

  return rows;
}

/**
 * Parse a single CSV line, handling quoted fields
 */
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        // Escaped quote
        current += '"';
        i++;
      } else {
        // Toggle quote mode
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += char;
    }
  }

  result.push(current);
  return result;
}

/**
 * Convert CSV row to database insert object
 */
function rowToDeadline(row: Record<string, string>, schoolId: string | null): InsertSchoolDeadline {
  // Parse dates - handle empty strings
  const parseDate = (dateStr: string): string | null => {
    if (!dateStr || dateStr.trim() === "") return null;
    // Validate date format YYYY-MM-DD
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr.trim())) {
      return dateStr.trim();
    }
    return null;
  };

  // Parse boolean
  const parseBool = (value: string): boolean => {
    return value.toLowerCase() === "true";
  };

  // Map status
  const mapStatus = (status: string): "ok" | "needs_manual" | "fetch_error" => {
    const normalized = status.toLowerCase().trim();
    if (normalized === "needs_manual") return "needs_manual";
    if (normalized === "fetch_error") return "fetch_error";
    return "ok";
  };

  return {
    schoolNameEn: row.school_name_en || "",
    schoolNameZh: row.school_name_zh || null,
    schoolId: schoolId,
    category: row.category || null,
    stage: row.stage || null,
    academicYear: row.academic_year || "2026-2027",
    eventType: row.event_type || "unknown",
    startDate: parseDate(row.start_date),
    endDate: parseDate(row.end_date),
    isRolling: parseBool(row.is_rolling),
    sourceUrl: row.source_url || null,
    notes: row.notes || null,
    status: mapStatus(row.status),
  };
}

async function main() {
  console.log("=== Deadline Import Script ===\n");

  // Check database URL
  if (!process.env.DATABASE_URL) {
    console.error("ERROR: DATABASE_URL environment variable is not set");
    console.log("\nPlease set DATABASE_URL in your .env file or environment");
    process.exit(1);
  }

  // Read CSV file
  console.log(`Reading CSV from: ${CSV_PATH}`);
  let csvContent: string;
  try {
    csvContent = readFileSync(CSV_PATH, "utf-8");
  } catch (error) {
    console.error(`ERROR: Could not read CSV file: ${error}`);
    process.exit(1);
  }

  // Parse CSV
  const rows = parseCSV(csvContent);
  console.log(`Found ${rows.length} rows in CSV\n`);

  // Connect to database
  console.log("Connecting to database...");
  const db = drizzle(process.env.DATABASE_URL);

  // Track statistics
  let matchedCount = 0;
  let unmatchedCount = 0;
  let importedCount = 0;
  const unmatchedSchools = new Set<string>();

  // Process each row
  console.log("Processing rows...\n");

  const deadlineInserts: InsertSchoolDeadline[] = [];
  const unmatchedInserts: InsertUnmatchedSchoolLog[] = [];

  for (const row of rows) {
    const nameEn = row.school_name_en || "";
    const nameZh = row.school_name_zh || "";

    // Try to match school
    const schoolId = matchSchool(nameEn, nameZh);

    if (schoolId) {
      matchedCount++;
    } else {
      unmatchedCount++;
      // Track unique unmatched schools
      const key = nameEn || nameZh;
      if (key && !unmatchedSchools.has(key)) {
        unmatchedSchools.add(key);
        unmatchedInserts.push({
          schoolNameEn: nameEn,
          schoolNameZh: nameZh || null,
          sourceFile: SOURCE_FILE,
        });
      }
    }

    // Convert to deadline insert (include ALL rows, even unmatched)
    const deadline = rowToDeadline(row, schoolId);
    deadlineInserts.push(deadline);
  }

  // Batch insert deadlines
  console.log(`Inserting ${deadlineInserts.length} deadlines...`);
  try {
    // Insert in batches of 100 to avoid query size limits
    const BATCH_SIZE = 100;
    for (let i = 0; i < deadlineInserts.length; i += BATCH_SIZE) {
      const batch = deadlineInserts.slice(i, i + BATCH_SIZE);
      await db.insert(schoolDeadlines).values(batch);
      importedCount += batch.length;
      process.stdout.write(`  Inserted ${importedCount}/${deadlineInserts.length}\r`);
    }
    console.log(`\n  Successfully inserted ${importedCount} deadlines`);
  } catch (error) {
    console.error(`ERROR inserting deadlines:`, error);
    process.exit(1);
  }

  // Insert unmatched schools log
  if (unmatchedInserts.length > 0) {
    console.log(`\nLogging ${unmatchedInserts.length} unmatched schools...`);
    try {
      await db.insert(unmatchedSchoolsLog).values(unmatchedInserts);
      console.log(`  Successfully logged unmatched schools`);
    } catch (error) {
      console.error(`ERROR logging unmatched schools:`, error);
    }
  }

  // Print summary
  console.log("\n=== Import Summary ===");
  console.log(`Total rows processed: ${rows.length}`);
  console.log(`Matched schools: ${matchedCount}`);
  console.log(`Unmatched schools: ${unmatchedCount}`);
  console.log(`Unique unmatched: ${unmatchedSchools.size}`);
  console.log(`Total imported: ${importedCount}`);

  if (unmatchedSchools.size > 0) {
    console.log("\nUnmatched school names:");
    for (const name of unmatchedSchools) {
      console.log(`  - ${name}`);
    }
  }

  console.log("\nDone!");
  process.exit(0);
}

main();
