import { schools } from '../../data/schools.ts';
import * as fs from 'fs';

// Read CSV
const csv = fs.readFileSync('./data/instruction_language_mapping_v1.csv', 'utf-8');
const lines = csv.trim().split('\n').slice(1); // skip header
const mappedIds = new Set(lines.map(line => line.split(',')[0]));

// Filter primary and secondary
const primary = schools.filter(s => s.level === '小學');
const secondary = schools.filter(s => s.level === '中學');

const unmatchedPrimary = primary.filter(s => !mappedIds.has(s.id));
const unmatchedSecondary = secondary.filter(s => !mappedIds.has(s.id));

console.log('=== MOI Mapping Coverage ===');
console.log(`Primary: ${primary.length} total | ${primary.length - unmatchedPrimary.length} mapped | ${unmatchedPrimary.length} missing`);
console.log(`Secondary: ${secondary.length} total | ${secondary.length - unmatchedSecondary.length} mapped | ${unmatchedSecondary.length} missing`);

if (unmatchedPrimary.length > 0) {
  console.log(`\n=== Primary Schools Missing MOI (${unmatchedPrimary.length}) ===`);
  unmatchedPrimary.forEach(s => console.log(`${s.id} | ${s.name} | ${s.category}`));
}

if (unmatchedSecondary.length > 0) {
  console.log(`\n=== Secondary Schools Missing MOI (${unmatchedSecondary.length}) ===`);
  unmatchedSecondary.forEach(s => console.log(`${s.id} | ${s.name} | ${s.category}`));
}
