/**
 * Add MIXED gender to all kindergartens
 */

import * as fs from 'fs';
import * as path from 'path';
import { schools } from '../data/schools';

const SCHOOLS_FILE = path.join(__dirname, '..', 'data', 'schools.ts');

function main() {
  console.log('=== Adding MIXED gender to Kindergartens ===\n');

  // Get all KG school IDs
  const kgSchools = schools.filter(s => s.level === '幼稚園');
  console.log(`Total kindergartens: ${kgSchools.length}`);

  let schoolsContent = fs.readFileSync(SCHOOLS_FILE, 'utf-8');
  let addedCount = 0;

  for (const kg of kgSchools) {
    const idPattern = `"id": "${kg.id}"`;
    const idIndex = schoolsContent.indexOf(idPattern);

    if (idIndex === -1) continue;

    // Find the school block
    const searchStart = idIndex;
    const nextSchoolPattern = /\n  \{[\s\n]*"id":/g;
    nextSchoolPattern.lastIndex = searchStart + 10;
    const nextMatch = nextSchoolPattern.exec(schoolsContent);
    const searchEnd = nextMatch ? nextMatch.index : schoolsContent.length;

    const schoolBlock = schoolsContent.substring(searchStart, searchEnd);

    // Check if gender already exists
    if (schoolBlock.includes('"gender":')) continue;

    // Add gender field after instructionLanguages
    const insertPattern = /("instructionLanguages": \[[^\]]*\])/;
    const insertMatch = schoolBlock.match(insertPattern);

    if (insertMatch) {
      const newBlock = schoolBlock.replace(
        insertPattern,
        `$1,\n    "gender": "MIXED"`
      );
      schoolsContent = schoolsContent.substring(0, searchStart) + newBlock + schoolsContent.substring(searchEnd);
      addedCount++;
    }
  }

  fs.writeFileSync(SCHOOLS_FILE, schoolsContent, 'utf-8');
  console.log(`Added MIXED to: ${addedCount} kindergartens`);

  // Verify
  const totalGender = (schoolsContent.match(/"gender":/g) || []).length;
  console.log(`Total schools with gender: ${totalGender}`);
}

main();
