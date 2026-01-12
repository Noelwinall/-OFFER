/**
 * Phase R3: Tag international schools with sector field
 *
 * Source: EDB International Schools list (internationalschools.edb.gov.hk)
 * Strategy: Match by nameEn patterns against official list
 *
 * Output:
 * - Updated schools.ts with sector field
 * - Match statistics
 * - Unmatched schools list
 */

const fs = require('fs');
const path = require('path');

// EDB Official International Schools List (53 schools + campuses)
// Source: https://internationalschools.edb.gov.hk/en/schools/is.html
const EDB_INTERNATIONAL_SCHOOLS = [
  // American / Australian / Canadian
  { pattern: /AMERICAN INTERNATIONAL SCHOOL/i, name: "American International School" },
  { pattern: /AMERICAN SCHOOL HONG KONG/i, name: "American School Hong Kong" },
  { pattern: /AUSTRALIAN INTERNATIONAL SCHOOL/i, name: "Australian International School Hong Kong" },
  { pattern: /CANADIAN INTERNATIONAL SCHOOL/i, name: "Canadian International School" },

  // Religious / Cultural
  { pattern: /CARMEL SCHOOL/i, name: "Carmel School" },
  { pattern: /CHINESE INTERNATIONAL SCHOOL/i, name: "Chinese International School" },
  { pattern: /CHRISTIAN ALLIANCE.*INTERNATIONAL/i, name: "Christian Alliance International School" },
  { pattern: /CONCORDIA INTERNATIONAL/i, name: "Concordia International School" },

  // Discovery Bay / DSC
  { pattern: /DISCOVERY BAY INTERNATIONAL/i, name: "Discovery Bay International School" },
  { pattern: /DSC INTERNATIONAL/i, name: "DSC International School" },

  // ESF Schools (21 schools)
  { pattern: /ESF|ENGLISH SCHOOLS FOUNDATION/i, name: "ESF School" },
  { pattern: /BEACON HILL SCHOOL/i, name: "ESF Beacon Hill School" },
  { pattern: /BRADBURY SCHOOL/i, name: "ESF Bradbury School" },
  { pattern: /CLEARWATER BAY SCHOOL/i, name: "ESF Clearwater Bay School" },
  { pattern: /GLENEALY SCHOOL/i, name: "ESF Glenealy School" },
  { pattern: /ISLAND SCHOOL/i, name: "ESF Island School" },
  { pattern: /JOCKEY CLUB SARAH ROE/i, name: "ESF Jockey Club Sarah Roe School" },
  { pattern: /KENNEDY SCHOOL/i, name: "ESF Kennedy School" },
  { pattern: /KING GEORGE V SCHOOL/i, name: "ESF King George V School" },
  { pattern: /KOWLOON JUNIOR SCHOOL/i, name: "ESF Kowloon Junior School" },
  { pattern: /PEAK SCHOOL/i, name: "ESF Peak School" },
  { pattern: /QUARRY BAY SCHOOL/i, name: "ESF Quarry Bay School" },
  { pattern: /SHA TIN COLLEGE/i, name: "ESF Sha Tin College" },
  { pattern: /SHA TIN JUNIOR/i, name: "ESF Sha Tin Junior School" },
  { pattern: /SOUTH ISLAND SCHOOL/i, name: "ESF South Island School" },
  { pattern: /WEST ISLAND SCHOOL/i, name: "ESF West Island School" },
  { pattern: /RENAISSANCE COLLEGE/i, name: "ESF Renaissance College" },

  // German / French / Norwegian
  { pattern: /GERMAN SWISS INTERNATIONAL/i, name: "German Swiss International School" },
  { pattern: /LYCEE FRANCAIS|LYC[EÉ]E FRAN[CÇ]AIS/i, name: "Lycée Français International" },
  { pattern: /FRENCH INTERNATIONAL SCHOOL/i, name: "French International School" },
  { pattern: /NORWEGIAN INTERNATIONAL/i, name: "Norwegian International School" },

  // British Schools
  { pattern: /HARROW INTERNATIONAL/i, name: "Harrow International School Hong Kong" },
  { pattern: /HARROW LITTLE LIONS/i, name: "Harrow Little Lions (affiliated)" },
  { pattern: /KELLETT SCHOOL/i, name: "Kellett School" },
  { pattern: /MALVERN COLLEGE/i, name: "Malvern College Hong Kong" },
  { pattern: /SHREWSBURY INTERNATIONAL/i, name: "Shrewsbury International School" },

  // Hong Kong Named
  { pattern: /HONG KONG ACADEMY(?! FOR)/i, name: "Hong Kong Academy" },
  { pattern: /HONG KONG INTERNATIONAL SCHOOL/i, name: "Hong Kong International School" },

  // Japanese / Korean
  { pattern: /HONG KONG JAPANESE SCHOOL/i, name: "Hong Kong Japanese School" },
  { pattern: /JAPANESE INTERNATIONAL SCHOOL/i, name: "Japanese International School" },
  { pattern: /KOREAN INTERNATIONAL SCHOOL/i, name: "Korean International School" },

  // Other International
  { pattern: /INTERNATIONAL COLLEGE HONG KONG/i, name: "International College Hong Kong" },
  { pattern: /KIANGSU.*CHEKIANG/i, name: "Kiangsu & Chekiang Primary School" },
  { pattern: /KINGSTON INTERNATIONAL/i, name: "Kingston International School" },
  { pattern: /LANTAU INTERNATIONAL/i, name: "Lantau International School" },
  { pattern: /NORD ANGLIA INTERNATIONAL/i, name: "Nord Anglia International School" },
  { pattern: /SEAR ROGERS INTERNATIONAL/i, name: "Sear Rogers International School" },
  { pattern: /SINGAPORE INTERNATIONAL SCHOOL/i, name: "Singapore International School" },
  { pattern: /THE HARBOUR SCHOOL/i, name: "The Harbour School" },
  { pattern: /INTERNATIONAL MONTESSORI/i, name: "The International Montessori School" },
  { pattern: /YEW CHUNG INTERNATIONAL/i, name: "Yew Chung International School" },

  // Private Independent Schools offering international curriculum
  { pattern: /VICTORIA SHANGHAI ACADEMY/i, name: "Victoria Shanghai Academy (PIS)" },
  { pattern: /PO LEUNG KUK.*INTERNATIONAL/i, name: "Po Leung Kuk International (PIS)" },
];

// Read current schools data
const SCHOOLS_PATH = path.join(__dirname, '../data/schools.ts');
const OUTPUT_PATH = path.join(__dirname, '../data/schools.ts');
const REPORT_PATH = path.join(__dirname, '../docs/rebuild/international-match-report.md');

console.log('Reading schools data...');
const content = fs.readFileSync(SCHOOLS_PATH, 'utf-8');

// Extract the JSON array from TypeScript
const match = content.match(/export const schools: School\[\] = (\[[\s\S]*\]);/);
if (!match) {
  console.error('Could not parse schools array from file');
  process.exit(1);
}

const schools = JSON.parse(match[1]);
console.log(`Loaded ${schools.length} schools`);

// Match schools
const matchedSchools = new Map(); // nameEn -> matched pattern name
const unmatchedInternational = []; // Schools with "INTERNATIONAL" in name but not matched

schools.forEach(school => {
  const nameEn = school.nameEn || '';
  let matched = false;

  for (const rule of EDB_INTERNATIONAL_SCHOOLS) {
    if (rule.pattern.test(nameEn)) {
      matchedSchools.set(school.id, {
        school: school,
        matchedAs: rule.name
      });
      matched = true;
      break;
    }
  }

  // Track unmatched schools that have "INTERNATIONAL" in name
  if (!matched && /INTERNATIONAL/i.test(nameEn)) {
    unmatchedInternational.push(school);
  }
});

console.log(`\n=== Match Statistics ===`);
console.log(`Total schools: ${schools.length}`);
console.log(`Matched as INTERNATIONAL: ${matchedSchools.size}`);
console.log(`Unmatched with "INTERNATIONAL" in name: ${unmatchedInternational.length}`);

// Add sector field to all schools
const updatedSchools = schools.map(school => ({
  ...school,
  sector: matchedSchools.has(school.id) ? 'INTERNATIONAL' : 'LOCAL'
}));

// Count by sector
const sectorCounts = {
  INTERNATIONAL: updatedSchools.filter(s => s.sector === 'INTERNATIONAL').length,
  LOCAL: updatedSchools.filter(s => s.sector === 'LOCAL').length
};

console.log(`\nSector breakdown:`);
console.log(`  INTERNATIONAL: ${sectorCounts.INTERNATIONAL}`);
console.log(`  LOCAL: ${sectorCounts.LOCAL}`);

// Cross-check with original category
const categoryBreakdown = {};
updatedSchools.filter(s => s.sector === 'INTERNATIONAL').forEach(s => {
  categoryBreakdown[s.category] = (categoryBreakdown[s.category] || 0) + 1;
});
console.log(`\nInternational schools by original category:`);
Object.entries(categoryBreakdown).forEach(([cat, count]) => {
  console.log(`  ${cat}: ${count}`);
});

// Generate report
const reportContent = `# International School Match Report

> Generated: ${new Date().toISOString().split('T')[0]}
> Source: EDB International Schools (internationalschools.edb.gov.hk)

## Statistics

| Metric | Count |
|--------|-------|
| Total schools | ${schools.length} |
| Matched as INTERNATIONAL | ${matchedSchools.size} |
| LOCAL | ${sectorCounts.LOCAL} |

## International Schools by Original Category

| Category | Count |
|----------|-------|
${Object.entries(categoryBreakdown).map(([cat, count]) => `| ${cat} | ${count} |`).join('\n')}

## Matched International Schools (${matchedSchools.size})

| ID | Name | English Name | Matched As |
|----|------|--------------|------------|
${Array.from(matchedSchools.values()).map(m =>
  `| ${m.school.id} | ${m.school.name} | ${m.school.nameEn} | ${m.matchedAs} |`
).join('\n')}

## Unmatched Schools with "INTERNATIONAL" in Name (${unmatchedInternational.length})

These schools have "INTERNATIONAL" in their English name but were NOT matched as international schools.
Review manually to determine if they should be added to the pattern list.

| ID | Name | English Name | Category |
|----|------|--------------|----------|
${unmatchedInternational.map(s =>
  `| ${s.id} | ${s.name} | ${s.nameEn} | ${s.category} |`
).join('\n')}

---

## Notes

1. **sector** field is independent of **category**
   - category = 辦學類別 (資助/公立/直資/私立)
   - sector = 學校性質 (INTERNATIONAL/LOCAL)

2. International schools are typically \`私立\` in category but now tagged separately in sector

3. To re-run matching: \`node scripts/tag-international-schools.js\`
`;

// Write report
fs.writeFileSync(REPORT_PATH, reportContent, 'utf-8');
console.log(`\nReport written to: ${REPORT_PATH}`);

// Generate updated TypeScript
const tsContent = `// 香港學校數據庫
// Schema: types/school.ts
// Source: EDB baseline-schools.csv (Phase R1) + international tagging (Phase R3)
// Generated: ${new Date().toISOString().split('T')[0]}
// Total: ${updatedSchools.length} schools
// Sector: INTERNATIONAL ${sectorCounts.INTERNATIONAL} / LOCAL ${sectorCounts.LOCAL}

import { School } from "@/types/school";

export const schools: School[] = ${JSON.stringify(updatedSchools, null, 2)};
`;

fs.writeFileSync(OUTPUT_PATH, tsContent, 'utf-8');
console.log(`Updated schools written to: ${OUTPUT_PATH}`);

console.log('\n=== Done ===');
