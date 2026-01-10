/**
 * Phase 2B: Evidence Collection - Batch 1 (First 20 schools)
 * Focus: tuition & articulation only
 *
 * 依据：BOSS.md v1 + data-dictionary.md
 */

const fs = require('fs');
const path = require('path');

// Read schools data
const schoolsPath = path.join(__dirname, '..', 'data', 'schools.ts');
const schoolsContent = fs.readFileSync(schoolsPath, 'utf-8');

const match = schoolsContent.match(/export const schools: School\[\] = (\[[\s\S]*\]);?/);
if (!match) {
  console.error('Failed to parse schools data');
  process.exit(1);
}

const schools = JSON.parse(match[1].replace(/;$/, ''));
const batch1 = schools.slice(0, 20);

console.log('=== Phase 2B: Evidence Collection Batch 1 ===');
console.log(`Processing ${batch1.length} schools for tuition & articulation\n`);

// Check URLs
console.log('URL Analysis:');
console.log('-------------');

const urlAnalysis = [];
batch1.forEach((school, i) => {
  const isPlaceholder = /school\d+\.edu\.hk/.test(school.website);
  urlAnalysis.push({
    id: school.id,
    name: school.name,
    website: school.website,
    isPlaceholder: isPlaceholder
  });
  console.log(`${i + 1}. ${school.id} | ${school.name.substring(0, 20).padEnd(20)} | ${isPlaceholder ? 'PLACEHOLDER' : 'REAL'} | ${school.website}`);
});

const placeholderCount = urlAnalysis.filter(u => u.isPlaceholder).length;
console.log(`\nPlaceholder URLs: ${placeholderCount}/${batch1.length} (${(placeholderCount/batch1.length*100).toFixed(0)}%)`);

// Since all URLs are placeholders, we cannot fetch real evidence
// Document this finding

// Generate evidence records (documenting the attempt)
const evidenceRows = ['schoolId,field,sourceUrl,capturedAt,confidence,quoteShort'];
const today = new Date().toISOString().split('T')[0];

// For each school, record that we attempted but found placeholder URLs
batch1.forEach(school => {
  // tuitionMin evidence attempt
  evidenceRows.push([
    school.id,
    'tuitionMin',
    school.website,
    today,
    'NONE',
    '"placeholder URL (school*.edu.hk) - cannot verify"'
  ].join(','));

  // tuitionMax evidence attempt
  evidenceRows.push([
    school.id,
    'tuitionMax',
    school.website,
    today,
    'NONE',
    '"placeholder URL (school*.edu.hk) - cannot verify"'
  ].join(','));

  // articulation evidence attempt
  evidenceRows.push([
    school.id,
    'articulation',
    school.website,
    today,
    'NONE',
    '"placeholder URL (school*.edu.hk) - cannot verify"'
  ].join(','));
});

// Write evidence-record.csv
const evidencePath = path.join(__dirname, '..', 'docs', 'factcheck', 'evidence-record.csv');
fs.writeFileSync(evidencePath, evidenceRows.join('\n'), 'utf-8');
console.log(`\nWrote ${evidenceRows.length - 1} evidence records to evidence-record.csv`);

// Update master-issues.csv for batch1 tuition/articulation fields
const issuesPath = path.join(__dirname, '..', 'docs', 'factcheck', 'master-issues.csv');
const issuesContent = fs.readFileSync(issuesPath, 'utf-8');
const issueLines = issuesContent.split('\n');
const header = issueLines[0];

// Create a set of batch1 school IDs
const batch1Ids = new Set(batch1.map(s => s.id));

// Update relevant rows
const updatedLines = [header];
const tuitionFields = ['tuitionMin', 'tuitionMax', 'articulation'];

let updatedCount = 0;
for (let i = 1; i < issueLines.length; i++) {
  const line = issueLines[i];
  if (!line.trim()) continue;

  const parts = line.split(',');
  const schoolId = parts[0];
  const field = parts[1];

  if (batch1Ids.has(schoolId) && tuitionFields.includes(field)) {
    // Update this row
    // Format: schoolId,field,status,currentValue,proposedValue,sourceUrl,capturedAt,confidence,notes
    parts[8] = '"placeholder URL - real website needed for evidence"'; // notes
    updatedCount++;
  }

  updatedLines.push(parts.join(','));
}

fs.writeFileSync(issuesPath, updatedLines.join('\n'), 'utf-8');
console.log(`Updated ${updatedCount} issue rows in master-issues.csv`);

// Summary
console.log('\n=== Batch 1 Summary ===');
console.log(`Schools processed: ${batch1.length}`);
console.log(`Evidence records created: ${evidenceRows.length - 1}`);
console.log(`Issue rows updated: ${updatedCount}`);
console.log(`\nBlocking Issue:`);
console.log(`  ALL ${placeholderCount} schools have PLACEHOLDER URLs (school*.edu.hk)`);
console.log(`  Cannot fetch real evidence without valid school websites`);
console.log(`\nConfidence Distribution:`);
console.log(`  HIGH:   0 (0%)`);
console.log(`  MEDIUM: 0 (0%)`);
console.log(`  LOW:    0 (0%)`);
console.log(`  NONE:   ${evidenceRows.length - 1} (100%) - placeholder URLs`);
console.log(`\nMost Common Blocker:`);
console.log(`  1. Placeholder URL (school*.edu.hk) - 100%`);
console.log(`\nRecommendation:`);
console.log(`  Before evidence collection can proceed, need to:`);
console.log(`  1. Replace placeholder URLs with real school websites`);
console.log(`  2. Or: Manually look up each school's official website`);
