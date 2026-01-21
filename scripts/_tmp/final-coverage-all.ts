import { schools } from '../../data/schools.ts';
import * as fs from 'fs';

// Read all mapping files
const v2Csv = fs.readFileSync('./data/instruction_language_mapping_v2.csv', 'utf-8');
const v2Ids = new Set(v2Csv.trim().split('\n').slice(1).map(line => line.split(',')[0]));

const specialEdCsv = fs.readFileSync('./data/instruction_language_mapping_special_ed.csv', 'utf-8');
const specialEdIds = new Set(specialEdCsv.trim().split('\n').slice(1).map(line => line.split(',')[0]));

const privateIntlCsv = fs.readFileSync('./data/instruction_language_mapping_private_intl.csv', 'utf-8');
const privateIntlIds = new Set(privateIntlCsv.trim().split('\n').slice(1).map(line => line.split(',')[0]));

// Combined set
const allMapped = new Set([...v2Ids, ...specialEdIds, ...privateIntlIds]);

// Filter primary and secondary only
const primary = schools.filter(s => s.level === '小學');
const secondary = schools.filter(s => s.level === '中學');

const mappedPrimary = primary.filter(s => allMapped.has(s.id));
const mappedSecondary = secondary.filter(s => allMapped.has(s.id));
const unmappedPrimary = primary.filter(s => !allMapped.has(s.id));
const unmappedSecondary = secondary.filter(s => !allMapped.has(s.id));

console.log('=== Final MOI Mapping Coverage (All Sources) ===\n');
console.log('Sources:');
console.log(`  V2 (CHSC): ${v2Ids.size} schools`);
console.log(`  Special Ed: ${specialEdIds.size} schools`);
console.log(`  Private/International: ${privateIntlIds.size} schools`);
console.log(`  Total unique: ${allMapped.size} schools`);

console.log('\n=== Coverage ===');
console.log(`Primary: ${primary.length} total | ${mappedPrimary.length} mapped | ${unmappedPrimary.length} missing (${(mappedPrimary.length/primary.length*100).toFixed(1)}%)`);
console.log(`Secondary: ${secondary.length} total | ${mappedSecondary.length} mapped | ${unmappedSecondary.length} missing (${(mappedSecondary.length/secondary.length*100).toFixed(1)}%)`);
console.log(`\nTotal: ${primary.length + secondary.length} | ${mappedPrimary.length + mappedSecondary.length} mapped | ${unmappedPrimary.length + unmappedSecondary.length} missing`);
console.log(`Overall coverage: ${((mappedPrimary.length + mappedSecondary.length) / (primary.length + secondary.length) * 100).toFixed(1)}%`);

// Check for any remaining unmapped
if (unmappedPrimary.length + unmappedSecondary.length > 0) {
  console.log('\n=== Remaining Unmapped Schools ===');
  for (const s of [...unmappedPrimary, ...unmappedSecondary]) {
    console.log(`${s.id} | ${s.name} | ${s.nameEn} | ${s.category} | ${s.level}`);
  }
}
