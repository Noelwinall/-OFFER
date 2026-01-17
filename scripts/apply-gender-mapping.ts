/**
 * Apply gender mapping to schools.ts
 *
 * Source: data/school_gender_mapping_v1.csv
 */

import * as fs from 'fs';
import * as path from 'path';

const SCHOOLS_FILE = path.join(__dirname, '..', 'data', 'schools.ts');
const MAPPING_FILE = path.join(__dirname, '..', 'data', 'school_gender_mapping_v1.csv');

interface GenderMapping {
  school_id: string;
  gender: string;
}

function parseMapping(csvContent: string): Map<string, string> {
  const lines = csvContent.trim().split('\n').slice(1); // Skip header
  const mappings = new Map<string, string>();

  for (const line of lines) {
    if (!line.trim()) continue;

    const parts = line.split(',');
    const schoolId = parts[0];
    const gender = parts[1];

    if (schoolId && gender) {
      mappings.set(schoolId, gender);
    }
  }

  return mappings;
}

function main() {
  console.log('=== Applying Gender Mapping to schools.ts ===\n');

  // Read mapping file
  const mappingContent = fs.readFileSync(MAPPING_FILE, 'utf-8');
  const genderMap = parseMapping(mappingContent);

  console.log(`Loaded ${genderMap.size} gender mappings`);

  // Read schools.ts
  let schoolsContent = fs.readFileSync(SCHOOLS_FILE, 'utf-8');

  // Check if gender field already exists
  if (schoolsContent.includes('"gender":')) {
    console.log('Gender field already exists in schools.ts, updating values...');
  } else {
    console.log('Adding gender field to schools.ts...');
  }

  let updatedCount = 0;
  let addedCount = 0;

  // For each mapping, update or add the gender field
  for (const [schoolId, gender] of genderMap) {
    // Find the school entry
    const idPattern = `"id": "${schoolId}"`;
    const idIndex = schoolsContent.indexOf(idPattern);

    if (idIndex === -1) {
      continue;
    }

    // Find the school block boundaries
    const searchStart = idIndex;
    const nextSchoolPattern = /\n  \{[\s\n]*"id":/g;
    nextSchoolPattern.lastIndex = searchStart + 10;
    const nextMatch = nextSchoolPattern.exec(schoolsContent);
    const searchEnd = nextMatch ? nextMatch.index : schoolsContent.length;

    const schoolBlock = schoolsContent.substring(searchStart, searchEnd);

    // Check if gender field exists
    const genderPattern = /"gender": "[A-Z]+"/;
    const genderMatch = schoolBlock.match(genderPattern);

    if (genderMatch) {
      // Update existing gender field
      const newGenderField = `"gender": "${gender}"`;
      const updatedBlock = schoolBlock.replace(genderPattern, newGenderField);

      if (updatedBlock !== schoolBlock) {
        schoolsContent = schoolsContent.substring(0, searchStart) + updatedBlock + schoolsContent.substring(searchEnd);
        updatedCount++;
      }
    } else {
      // Add gender field after instructionLanguages
      const insertPattern = /("instructionLanguages": \[[^\]]*\])/;
      const insertMatch = schoolBlock.match(insertPattern);

      if (insertMatch) {
        const newBlock = schoolBlock.replace(
          insertPattern,
          `$1,\n    "gender": "${gender}"`
        );
        schoolsContent = schoolsContent.substring(0, searchStart) + newBlock + schoolsContent.substring(searchEnd);
        addedCount++;
      }
    }
  }

  console.log(`\nUpdated: ${updatedCount} schools`);
  console.log(`Added: ${addedCount} schools`);

  // Write back to schools.ts
  fs.writeFileSync(SCHOOLS_FILE, schoolsContent, 'utf-8');
  console.log(`\nWritten to: ${SCHOOLS_FILE}`);

  // Verify by counting gender fields
  const boysCount = (schoolsContent.match(/"gender": "BOYS"/g) || []).length;
  const girlsCount = (schoolsContent.match(/"gender": "GIRLS"/g) || []).length;
  const mixedCount = (schoolsContent.match(/"gender": "MIXED"/g) || []).length;

  console.log(`\n=== Verification ===`);
  console.log(`BOYS: ${boysCount}`);
  console.log(`GIRLS: ${girlsCount}`);
  console.log(`MIXED: ${mixedCount}`);
  console.log(`Total with gender: ${boysCount + girlsCount + mixedCount}`);
}

main();
