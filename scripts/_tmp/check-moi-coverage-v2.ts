import { schools } from '../../data/schools.ts';
import * as fs from 'fs';

// Read V2 CSV
const csv = fs.readFileSync('./data/instruction_language_mapping_v2.csv', 'utf-8');
const lines = csv.trim().split('\n').slice(1);
const mappedIds = new Set(lines.map(line => line.split(',')[0]));

// Filter primary and secondary
const primary = schools.filter(s => s.level === '小學');
const secondary = schools.filter(s => s.level === '中學');

const mappedPrimary = primary.filter(s => mappedIds.has(s.id));
const mappedSecondary = secondary.filter(s => mappedIds.has(s.id));
const unmatchedPrimary = primary.filter(s => !mappedIds.has(s.id));
const unmatchedSecondary = secondary.filter(s => !mappedIds.has(s.id));

console.log('=== MOI Mapping Coverage V2 ===\n');
console.log(`Primary: ${primary.length} total | ${mappedPrimary.length} mapped | ${unmatchedPrimary.length} missing (${(mappedPrimary.length/primary.length*100).toFixed(1)}% coverage)`);
console.log(`Secondary: ${secondary.length} total | ${mappedSecondary.length} mapped | ${unmatchedSecondary.length} missing (${(mappedSecondary.length/secondary.length*100).toFixed(1)}% coverage)`);
console.log(`\nTotal: ${primary.length + secondary.length} | ${mappedPrimary.length + mappedSecondary.length} mapped | ${unmatchedPrimary.length + unmatchedSecondary.length} missing`);

// Categorize unmatched by category
const byCategory: Record<string, { primary: number; secondary: number }> = {};
for (const s of unmatchedPrimary) {
  if (!byCategory[s.category]) byCategory[s.category] = { primary: 0, secondary: 0 };
  byCategory[s.category].primary++;
}
for (const s of unmatchedSecondary) {
  if (!byCategory[s.category]) byCategory[s.category] = { primary: 0, secondary: 0 };
  byCategory[s.category].secondary++;
}

console.log('\n=== Unmatched by Category ===');
for (const [cat, counts] of Object.entries(byCategory).sort((a, b) => (b[1].primary + b[1].secondary) - (a[1].primary + a[1].secondary))) {
  console.log(`${cat}: ${counts.primary} primary, ${counts.secondary} secondary (total: ${counts.primary + counts.secondary})`);
}

// Show sample of unmatched
console.log('\n=== Sample Unmatched Schools ===');
console.log('Primary (first 10):');
for (const s of unmatchedPrimary.slice(0, 10)) {
  console.log(`  ${s.id} | ${s.name} | ${s.category}`);
}
console.log('\nSecondary (first 10):');
for (const s of unmatchedSecondary.slice(0, 10)) {
  console.log(`  ${s.id} | ${s.name} | ${s.category}`);
}
