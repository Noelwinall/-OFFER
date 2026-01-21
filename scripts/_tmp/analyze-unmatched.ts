import { schools } from '../../data/schools.ts';
import * as fs from 'fs';

// Read mapping CSV
const csv = fs.readFileSync('./data/instruction_language_mapping_v1.csv', 'utf-8');
const lines = csv.trim().split('\n').slice(1);
const mappedIds = new Set(lines.map(line => line.split(',')[0]));

// Read needs_review CSV
const reviewCsv = fs.readFileSync('./data/instruction_language_needs_review_v1.csv', 'utf-8');
const reviewLines = reviewCsv.trim().split('\n').slice(1);
const reviewReasons: Record<string, string> = {};
for (const line of reviewLines) {
  const parts = line.split(',');
  const schoolId = parts[0];
  const reason = parts[2]?.replace(/"/g, '') || 'unknown';
  reviewReasons[schoolId] = reason;
}

// Filter primary and secondary
const primary = schools.filter(s => s.level === '小學');
const secondary = schools.filter(s => s.level === '中學');

const unmatchedPrimary = primary.filter(s => !mappedIds.has(s.id));
const unmatchedSecondary = secondary.filter(s => !mappedIds.has(s.id));

// Categorize by reason and category
interface UnmatchedSchool {
  id: string;
  name: string;
  nameEn: string;
  category: string;
  level: string;
  reason: string;
}

function categorizeUnmatched(schoolList: typeof primary): UnmatchedSchool[] {
  return schoolList.map(s => ({
    id: s.id,
    name: s.name,
    nameEn: s.nameEn,
    category: s.category,
    level: s.level,
    reason: reviewReasons[s.id] || 'Not in needs_review (possibly not processed)'
  }));
}

const unmatchedPrimaryDetailed = categorizeUnmatched(unmatchedPrimary);
const unmatchedSecondaryDetailed = categorizeUnmatched(unmatchedSecondary);

// Group by category
const byCategory: Record<string, number> = {};
const byReason: Record<string, number> = {};
const byCategoryAndReason: Record<string, Record<string, number>> = {};

for (const s of [...unmatchedPrimaryDetailed, ...unmatchedSecondaryDetailed]) {
  byCategory[s.category] = (byCategory[s.category] || 0) + 1;
  byReason[s.reason] = (byReason[s.reason] || 0) + 1;

  if (!byCategoryAndReason[s.category]) {
    byCategoryAndReason[s.category] = {};
  }
  byCategoryAndReason[s.category][s.reason] = (byCategoryAndReason[s.category][s.reason] || 0) + 1;
}

console.log('=== Summary: Unmatched Schools Analysis ===\n');
console.log(`Primary missing: ${unmatchedPrimary.length}`);
console.log(`Secondary missing: ${unmatchedSecondary.length}`);
console.log(`Total missing: ${unmatchedPrimary.length + unmatchedSecondary.length}\n`);

console.log('=== By School Category ===');
for (const [cat, count] of Object.entries(byCategory).sort((a, b) => b[1] - a[1])) {
  console.log(`${cat}: ${count}`);
}

console.log('\n=== By Reason ===');
for (const [reason, count] of Object.entries(byReason).sort((a, b) => b[1] - a[1])) {
  console.log(`${reason}: ${count}`);
}

console.log('\n=== By Category + Reason ===');
for (const [cat, reasons] of Object.entries(byCategoryAndReason).sort((a, b) => {
  const totalA = Object.values(a[1]).reduce((sum, v) => sum + v, 0);
  const totalB = Object.values(b[1]).reduce((sum, v) => sum + v, 0);
  return totalB - totalA;
})) {
  console.log(`\n${cat}:`);
  for (const [reason, count] of Object.entries(reasons).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${reason}: ${count}`);
  }
}

// Check how many "Not in needs_review" schools exist - these should be in CHSC but weren't processed
const notInReview = [...unmatchedPrimaryDetailed, ...unmatchedSecondaryDetailed].filter(
  s => s.reason === 'Not in needs_review (possibly not processed)'
);

if (notInReview.length > 0) {
  console.log(`\n=== Schools NOT in needs_review file (${notInReview.length}) ===`);
  console.log('These schools were not processed by the mapping script:');
  for (const s of notInReview.slice(0, 20)) {
    console.log(`  ${s.id} | ${s.name} | ${s.category}`);
  }
  if (notInReview.length > 20) {
    console.log(`  ... and ${notInReview.length - 20} more`);
  }
}
