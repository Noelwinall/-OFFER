/**
 * Apply all MOI mappings to schools.ts
 *
 * Sources:
 * - data/instruction_language_mapping_v2.csv (CHSC)
 * - data/instruction_language_mapping_special_ed.csv (Special Education)
 * - data/instruction_language_mapping_private_intl.csv (Private/International)
 */

import * as fs from 'fs';
import * as path from 'path';

const SCHOOLS_FILE = path.join(__dirname, '..', 'data', 'schools.ts');
const V2_MAPPING = path.join(__dirname, '..', 'data', 'instruction_language_mapping_v2.csv');
const SPECIAL_ED_MAPPING = path.join(__dirname, '..', 'data', 'instruction_language_mapping_special_ed.csv');
const PRIVATE_INTL_MAPPING = path.join(__dirname, '..', 'data', 'instruction_language_mapping_private_intl.csv');

interface MoiMapping {
  school_id: string;
  instruction_languages: string[];
  confidence: string;
  source: string;
}

function parseMapping(csvContent: string): MoiMapping[] {
  const lines = csvContent.trim().split('\n').slice(1); // Skip header
  const mappings: MoiMapping[] = [];

  for (const line of lines) {
    if (!line.trim()) continue;

    // Parse CSV line (handle quoted fields)
    const parts: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        parts.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    parts.push(current);

    const schoolId = parts[0];
    const instructionLanguages = parts[2] ? parts[2].split('|').filter(l => l.trim()) : [];
    const confidence = parts[3] || '';
    const source = parts[4]?.replace(/"/g, '') || '';

    if (schoolId && instructionLanguages.length > 0) {
      mappings.push({
        school_id: schoolId,
        instruction_languages: instructionLanguages,
        confidence,
        source
      });
    }
  }

  return mappings;
}

function main() {
  console.log('=== Applying MOI Mappings to schools.ts ===\n');

  // Read all mapping files
  const v2Mappings = parseMapping(fs.readFileSync(V2_MAPPING, 'utf-8'));
  const specialEdMappings = parseMapping(fs.readFileSync(SPECIAL_ED_MAPPING, 'utf-8'));
  const privateIntlMappings = parseMapping(fs.readFileSync(PRIVATE_INTL_MAPPING, 'utf-8'));

  console.log(`V2 mappings: ${v2Mappings.length}`);
  console.log(`Special Ed mappings: ${specialEdMappings.length}`);
  console.log(`Private/Intl mappings: ${privateIntlMappings.length}`);

  // Combine all mappings (later sources override earlier ones)
  const allMappings = new Map<string, MoiMapping>();

  for (const m of v2Mappings) {
    allMappings.set(m.school_id, m);
  }
  for (const m of specialEdMappings) {
    allMappings.set(m.school_id, m);
  }
  for (const m of privateIntlMappings) {
    allMappings.set(m.school_id, m);
  }

  console.log(`\nTotal unique mappings: ${allMappings.size}`);

  // Read schools.ts
  let schoolsContent = fs.readFileSync(SCHOOLS_FILE, 'utf-8');

  // Track updates
  let updatedCount = 0;
  let skippedCount = 0;

  // For each mapping, update the instructionLanguages field
  for (const [schoolId, mapping] of allMappings) {
    // Find the school entry and update instructionLanguages
    // Pattern: "id": "edb_xxx"...,"instructionLanguages": [...]
    const idPattern = `"id": "${schoolId}"`;
    const idIndex = schoolsContent.indexOf(idPattern);

    if (idIndex === -1) {
      skippedCount++;
      continue;
    }

    // Find the instructionLanguages field after this id
    const searchStart = idIndex;
    const nextSchoolPattern = /\n  \{[\s\n]*"id":/g;
    nextSchoolPattern.lastIndex = searchStart + 10;
    const nextMatch = nextSchoolPattern.exec(schoolsContent);
    const searchEnd = nextMatch ? nextMatch.index : schoolsContent.length;

    const schoolBlock = schoolsContent.substring(searchStart, searchEnd);

    // Find and replace instructionLanguages in this block
    const langPattern = /"instructionLanguages": \[[^\]]*\]/;
    const langMatch = schoolBlock.match(langPattern);

    if (langMatch) {
      const newLangs = JSON.stringify(mapping.instruction_languages);
      const newLangField = `"instructionLanguages": ${newLangs}`;

      const updatedBlock = schoolBlock.replace(langPattern, newLangField);

      if (updatedBlock !== schoolBlock) {
        schoolsContent = schoolsContent.substring(0, searchStart) + updatedBlock + schoolsContent.substring(searchEnd);
        updatedCount++;
      }
    }
  }

  console.log(`\nUpdated: ${updatedCount} schools`);
  console.log(`Skipped (not found): ${skippedCount} schools`);

  // Write back to schools.ts
  fs.writeFileSync(SCHOOLS_FILE, schoolsContent, 'utf-8');
  console.log(`\nWritten to: ${SCHOOLS_FILE}`);

  // Verify by counting non-empty instructionLanguages
  const emptyPattern = /"instructionLanguages": \[\]/g;
  const emptyMatches = schoolsContent.match(emptyPattern);
  const emptyCount = emptyMatches ? emptyMatches.length : 0;

  const nonEmptyPattern = /"instructionLanguages": \[[^\]]+\]/g;
  const nonEmptyMatches = schoolsContent.match(nonEmptyPattern);
  const nonEmptyCount = nonEmptyMatches ? nonEmptyMatches.length : 0;

  console.log(`\n=== Verification ===`);
  console.log(`Schools with instructionLanguages: ${nonEmptyCount}`);
  console.log(`Schools with empty instructionLanguages: ${emptyCount}`);
}

main();
