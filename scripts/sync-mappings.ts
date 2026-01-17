/**
 * Sync CSV mapping files to TypeScript map files
 *
 * Source CSVs (authoritative):
 * - data/instruction_language_mapping_v1.csv
 * - data/school_gender_mapping_v1.csv
 * - data/curriculum_mapping_v1.2.csv
 *
 * Output TS maps:
 * - data/mappings/instruction-language-map.ts
 * - data/mappings/gender-map.ts
 * - data/mappings/curriculum-map.ts
 *
 * Run: npx tsx scripts/sync-mappings.ts
 */
import * as fs from "fs";
import * as path from "path";

const DATA_DIR = path.join(__dirname, "../data");
const MAPPINGS_DIR = path.join(DATA_DIR, "mappings");

// Ensure mappings directory exists
if (!fs.existsSync(MAPPINGS_DIR)) {
  fs.mkdirSync(MAPPINGS_DIR, { recursive: true });
}

/**
 * Parse CSV file (handles quoted fields)
 */
function parseCSV(content: string): { headers: string[]; rows: string[][] } {
  const lines = content.split("\n").filter(line => line.trim());
  const headers = parseCSVLine(lines[0]);
  const rows = lines.slice(1).map(parseCSVLine);
  return { headers, rows };
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

/**
 * Sync instruction language mapping (merges multiple CSV files)
 * Priority order (later files override earlier):
 * 1. v1 (base CHSC data)
 * 2. v2 (additional CHSC data)
 * 3. private_intl (international schools)
 * 4. special_ed (special education schools)
 */
function syncInstructionLanguageMapping() {
  const csvFiles = [
    "instruction_language_mapping_v1.csv",
    "instruction_language_mapping_v2.csv",
    "instruction_language_mapping_private_intl.csv",
    "instruction_language_mapping_special_ed.csv",
  ];

  // Build map: school_id -> InstructionLanguage[]
  const map: Record<string, string[]> = {};
  const sources: string[] = [];

  for (const csvFile of csvFiles) {
    const csvPath = path.join(DATA_DIR, csvFile);
    if (!fs.existsSync(csvPath)) {
      console.log(`  [skip] ${csvFile} not found`);
      continue;
    }

    const content = fs.readFileSync(csvPath, "utf-8");
    const { headers, rows } = parseCSV(content);

    // Find column indices
    const idIdx = headers.indexOf("school_id");
    const langIdx = headers.indexOf("instruction_languages");

    let count = 0;
    for (const row of rows) {
      const id = row[idIdx];
      const languages = row[langIdx];
      if (id && languages) {
        map[id] = languages.split("|");
        count++;
      }
    }

    sources.push(`${csvFile} (${count})`);
    console.log(`  [loaded] ${csvFile}: ${count} entries`);
  }

  const output = `// Instruction Language Mapping
// Sources: ${sources.join(", ")}
// Generated: ${new Date().toISOString().split("T")[0]}
// Total mappings: ${Object.keys(map).length}
//
// DO NOT EDIT - Run \`npx tsx scripts/sync-mappings.ts\` to regenerate

import type { InstructionLanguage } from "@/types/school";

export const instructionLanguageMap: Record<string, InstructionLanguage[]> = ${JSON.stringify(map, null, 2)};
`;

  const outputPath = path.join(MAPPINGS_DIR, "instruction-language-map.ts");
  fs.writeFileSync(outputPath, output);
  console.log(`[instruction-language] ${Object.keys(map).length} total mappings -> ${outputPath}`);
}

/**
 * Sync gender mapping
 */
function syncGenderMapping() {
  const csvPath = path.join(DATA_DIR, "school_gender_mapping_v1.csv");
  const content = fs.readFileSync(csvPath, "utf-8");
  const { headers, rows } = parseCSV(content);

  // Find column indices
  const idIdx = headers.indexOf("school_id");
  const genderIdx = headers.indexOf("gender");

  // Build map: school_id -> SchoolGender
  const map: Record<string, string> = {};

  for (const row of rows) {
    const id = row[idIdx];
    const gender = row[genderIdx];
    if (id && gender) {
      map[id] = gender;
    }
  }

  const output = `// Gender Mapping
// Source: data/school_gender_mapping_v1.csv
// Generated: ${new Date().toISOString().split("T")[0]}
// Total mappings: ${Object.keys(map).length}
//
// DO NOT EDIT - Run \`npx tsx scripts/sync-mappings.ts\` to regenerate

import type { SchoolGender } from "@/types/school";

export const genderMap: Record<string, SchoolGender> = ${JSON.stringify(map, null, 2)};
`;

  const outputPath = path.join(MAPPINGS_DIR, "gender-map.ts");
  fs.writeFileSync(outputPath, output);
  console.log(`[gender] ${Object.keys(map).length} mappings -> ${outputPath}`);
}

/**
 * Sync curriculum mapping
 */
function syncCurriculumMapping() {
  const csvPath = path.join(DATA_DIR, "curriculum_mapping_v1.2.csv");
  const content = fs.readFileSync(csvPath, "utf-8");
  const { headers, rows } = parseCSV(content);

  // Find column indices
  const idIdx = headers.indexOf("school_id");
  const currIdx = headers.indexOf("curriculums");

  // Build map: school_id -> CurriculumV2[]
  const map: Record<string, string[]> = {};

  for (const row of rows) {
    const id = row[idIdx];
    const curriculums = row[currIdx];
    if (id && curriculums) {
      // Handle multiple curriculums separated by |
      map[id] = curriculums.split("|");
    }
  }

  const output = `// Curriculum Mapping V2
// Source: data/curriculum_mapping_v1.2.csv
// Generated: ${new Date().toISOString().split("T")[0]}
// Total mappings: ${Object.keys(map).length}
//
// DO NOT EDIT - Run \`npx tsx scripts/sync-mappings.ts\` to regenerate

import type { CurriculumV2 } from "@/types/school";

export const curriculumMap: Record<string, CurriculumV2[]> = ${JSON.stringify(map, null, 2)};
`;

  const outputPath = path.join(MAPPINGS_DIR, "curriculum-map.ts");
  fs.writeFileSync(outputPath, output);
  console.log(`[curriculum] ${Object.keys(map).length} mappings -> ${outputPath}`);
}

// Run all syncs
console.log("Syncing CSV mappings to TypeScript maps...\n");
syncInstructionLanguageMapping();
syncGenderMapping();
syncCurriculumMapping();
console.log("\nDone! Mappings synced successfully.");
