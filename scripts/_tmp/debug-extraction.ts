import { schools } from '../../data/schools.ts';
import * as fs from 'fs';

// Count schools from schools.ts import
const primary = schools.filter(s => s.level === '小學');
const secondary = schools.filter(s => s.level === '中學');

console.log('=== From schools.ts import ===');
console.log(`Primary: ${primary.length}`);
console.log(`Secondary: ${secondary.length}`);
console.log(`Total (P+S): ${primary.length + secondary.length}`);

// Now test the regex extraction that the mapping script uses
const schoolsContent = fs.readFileSync('./data/schools.ts', 'utf-8');
const schoolRegex = /\{\s*"id":\s*"(edb_[^"]+)"[\s\S]*?"nameEn":\s*"([^"]+)"[\s\S]*?"name":\s*"([^"]+)"[\s\S]*?"level":\s*"([^"]+)"[\s\S]*?"district18":\s*"([^"]+)"/g;

const extractedSchools: any[] = [];
let match;
while ((match = schoolRegex.exec(schoolsContent)) !== null) {
  extractedSchools.push({
    id: match[1],
    nameEn: match[2],
    name: match[3],
    level: match[4],
    district18: match[5],
  });
}

const extractedPrimary = extractedSchools.filter(s => s.level === '小學');
const extractedSecondary = extractedSchools.filter(s => s.level === '中學');

console.log('\n=== From regex extraction (like mapping script) ===');
console.log(`Total extracted: ${extractedSchools.length}`);
console.log(`Primary: ${extractedPrimary.length}`);
console.log(`Secondary: ${extractedSecondary.length}`);

// Find schools NOT extracted
const extractedIds = new Set(extractedSchools.map(s => s.id));
const notExtracted = schools.filter(s => !extractedIds.has(s.id) && (s.level === '小學' || s.level === '中學'));

console.log(`\nNot extracted: ${notExtracted.length}`);
if (notExtracted.length > 0) {
  console.log('First 10 not extracted:');
  for (const s of notExtracted.slice(0, 10)) {
    console.log(`  ${s.id} | ${s.name} | ${s.level}`);
  }
}

// Also check the CHSC CSV counts
const primaryEnCsv = fs.readFileSync('./data/psp_2025_en.csv', 'utf-8');
const primaryTcCsv = fs.readFileSync('./data/psp_2025_tc.csv', 'utf-8');
const secondaryEnCsv = fs.readFileSync('./data/ssp_2025_2026_en.csv', 'utf-8');
const secondaryTcCsv = fs.readFileSync('./data/ssp_2025_2026_tc.csv', 'utf-8');

console.log('\n=== CHSC CSV row counts (excluding header) ===');
console.log(`Primary EN: ${primaryEnCsv.trim().split('\n').length - 1}`);
console.log(`Primary TC: ${primaryTcCsv.trim().split('\n').length - 1}`);
console.log(`Secondary EN: ${secondaryEnCsv.trim().split('\n').length - 1}`);
console.log(`Secondary TC: ${secondaryTcCsv.trim().split('\n').length - 1}`);

// Gap analysis
const totalChscPrimary = primaryEnCsv.trim().split('\n').length - 1;
const totalChscSecondary = secondaryEnCsv.trim().split('\n').length - 1;

console.log('\n=== Gap Analysis ===');
console.log(`Primary gap: ${primary.length} (schools.ts) - ${totalChscPrimary} (CHSC) = ${primary.length - totalChscPrimary} schools not in CHSC`);
console.log(`Secondary gap: ${secondary.length} (schools.ts) - ${totalChscSecondary} (CHSC) = ${secondary.length - totalChscSecondary} schools not in CHSC`);
