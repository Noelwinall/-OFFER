/**
 * Apply Instruction Language Mapping V1
 *
 * Reads data/instruction_language_mapping_v1.csv and applies to schools.ts
 * STRICT: Only applies rows where confidence == "HIGH"
 * First clears all existing instructionLanguages, then applies mapping.
 * Matches by school_id EXACTLY
 */

const fs = require('fs');
const path = require('path');

const MAPPING_FILE = path.join(__dirname, '..', 'data', 'instruction_language_mapping_v1.csv');
const SCHOOLS_FILE = path.join(__dirname, '..', 'data', 'schools.ts');

// Valid InstructionLanguage values
const VALID_LANGUAGES = [
  'ENGLISH',
  'CANTONESE',
  'PUTONGHUA',
  'FRENCH',
  'GERMAN',
  'JAPANESE',
  'KOREAN'
];

function parseCSV(content) {
  const lines = content.trim().split('\n');
  const headers = parseCSVLine(lines[0]);
  const rows = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    const row = {};
    headers.forEach((h, idx) => {
      row[h.trim()] = values[idx]?.trim() || '';
    });
    rows.push(row);
  }

  return rows;
}

function parseCSVLine(line) {
  const result = [];
  let current = '';
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
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current);

  return result;
}

function main() {
  console.log('=== Instruction Language Mapping V1 Application (CHSC CSV Only) ===\n');

  // Read mapping file
  if (!fs.existsSync(MAPPING_FILE)) {
    console.error('ERROR: Mapping file not found:', MAPPING_FILE);
    process.exit(1);
  }

  const mappingContent = fs.readFileSync(MAPPING_FILE, 'utf-8');
  const mappingRows = parseCSV(mappingContent);

  console.log(`Total rows read: ${mappingRows.length}`);

  // Filter HIGH confidence only
  const highConfRows = mappingRows.filter(r => r.confidence === 'HIGH');
  const skippedRows = mappingRows.length - highConfRows.length;

  console.log(`HIGH confidence rows: ${highConfRows.length}`);
  console.log(`Skipped (non-HIGH): ${skippedRows}`);

  // Build mapping: school_id -> languages[]
  const languageMap = new Map();
  let invalidLanguages = 0;

  for (const row of highConfRows) {
    const schoolId = row.school_id;
    if (!schoolId) continue;

    // Parse pipe-separated languages
    const languages = row.instruction_languages
      .split('|')
      .map(l => l.trim())
      .filter(l => {
        if (!VALID_LANGUAGES.includes(l)) {
          invalidLanguages++;
          return false;
        }
        return true;
      });

    if (languages.length > 0) {
      if (!languageMap.has(schoolId)) {
        languageMap.set(schoolId, new Set());
      }
      languages.forEach(l => languageMap.get(schoolId).add(l));
    }
  }

  console.log(`Unique school IDs in mapping: ${languageMap.size}`);
  if (invalidLanguages > 0) {
    console.log(`Invalid language values skipped: ${invalidLanguages}`);
  }

  // Read schools.ts
  let schoolsContent = fs.readFileSync(SCHOOLS_FILE, 'utf-8');

  // STEP 1: Reset all instructionLanguages to empty arrays first
  console.log('\nResetting all instructionLanguages to empty arrays...');
  const resetPattern = /"instructionLanguages":\s*\[[^\]]*\]/g;
  const resetCount = (schoolsContent.match(resetPattern) || []).length;
  schoolsContent = schoolsContent.replace(resetPattern, '"instructionLanguages": []');
  console.log(`Reset ${resetCount} instructionLanguages fields`);

  // If instructionLanguages field doesn't exist, add it
  if (resetCount === 0) {
    console.log('\nAdding instructionLanguages field to all schools...');
    schoolsContent = schoolsContent.replace(
      /("curriculumV2":\s*\[[^\]]*\]),(\s*\n\s*"language":)/g,
      '$1,\n    "instructionLanguages": [],$2'
    );
    const addedCount = (schoolsContent.match(/"instructionLanguages":/g) || []).length;
    console.log(`Added instructionLanguages field to ${addedCount} schools`);
  }

  // Extract school IDs from schools.ts
  const schoolIdRegex = /"id":\s*"([^"]+)"/g;
  const schoolIds = new Set();
  let match;
  while ((match = schoolIdRegex.exec(schoolsContent)) !== null) {
    schoolIds.add(match[1]);
  }

  console.log(`\nTotal schools in schools.ts: ${schoolIds.size}`);

  // Check for matches
  let matchedSchools = 0;
  let totalInserts = 0;
  const matchedIds = [];

  for (const [schoolId, languages] of languageMap) {
    if (schoolIds.has(schoolId)) {
      matchedSchools++;
      totalInserts += languages.size;
      matchedIds.push(schoolId);
    }
  }

  console.log(`Schools matched: ${matchedSchools}`);
  console.log(`Total language values to insert: ${totalInserts}`);

  // STEP 2: Apply the mapping for matched schools
  if (matchedSchools > 0) {
    for (const schoolId of matchedIds) {
      const languages = Array.from(languageMap.get(schoolId));
      const languageJson = JSON.stringify(languages);

      // Replace empty instructionLanguages for this specific school
      const pattern = new RegExp(
        `("id":\\s*"${schoolId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[\\s\\S]*?"instructionLanguages":\\s*)\\[\\]`,
        'g'
      );
      schoolsContent = schoolsContent.replace(pattern, `$1${languageJson}`);
    }
    console.log(`\nApplied instruction language mapping to ${matchedSchools} schools`);
  }

  // Write back
  fs.writeFileSync(SCHOOLS_FILE, schoolsContent, 'utf-8');
  console.log('schools.ts updated successfully.');

  // Generate report
  console.log('\n=== REPORT ===');
  console.log(`total_rows_read: ${mappingRows.length}`);
  console.log(`total_schools_matched: ${matchedSchools}`);
  console.log(`total_language_values_inserted: ${totalInserts}`);
  console.log(`total_rows_skipped: ${skippedRows}`);
}

main();
