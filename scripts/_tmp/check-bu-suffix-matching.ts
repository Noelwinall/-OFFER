import { schools } from '../../data/schools.ts';
import * as fs from 'fs';

// Read CHSC CSVs
const primaryTcCsv = fs.readFileSync('./data/psp_2025_tc.csv', 'utf-8');
const secondaryTcCsv = fs.readFileSync('./data/ssp_2025_2026_tc.csv', 'utf-8');

// Parse CSV
function parseCSV(content: string): Record<string, string>[] {
  const lines = content.split('\n');
  const headers = lines[0].split(',').map(h => h.trim().replace(/^\ufeff/, ''));
  const rows: Record<string, string>[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    const values = line.split(',');
    const row: Record<string, string> = {};
    headers.forEach((h, idx) => {
      row[h] = values[idx]?.trim() || '';
    });
    rows.push(row);
  }
  return rows;
}

const primaryChsc = parseCSV(primaryTcCsv);
const secondaryChsc = parseCSV(secondaryTcCsv);

// Get all CHSC school names
const chscPrimaryNames = new Set(primaryChsc.map(r => r['學校名稱']).filter(Boolean));
const chscSecondaryNames = new Set(secondaryChsc.map(r => r['學校名稱']).filter(Boolean));

// Get schools with (小學部)/(中學部) suffix
const schoolsWithBuSuffix = schools.filter(s =>
  (s.level === '小學' || s.level === '中學') &&
  (s.name.includes('(小學部)') || s.name.includes('(中學部)') ||
   s.name.includes('（小學部）') || s.name.includes('（中學部）'))
);

console.log(`Schools with 部 suffix: ${schoolsWithBuSuffix.length}\n`);

// Try to find matches by removing the suffix
let matched = 0;
let notMatched = 0;
const notMatchedSchools: any[] = [];

for (const school of schoolsWithBuSuffix) {
  // Remove the suffix
  const baseName = school.name
    .replace(/\(小學部\)/g, '')
    .replace(/\(中學部\)/g, '')
    .replace(/（小學部）/g, '')
    .replace(/（中學部）/g, '')
    .trim();

  const chscNames = school.level === '小學' ? chscPrimaryNames : chscSecondaryNames;

  // Check exact match
  if (chscNames.has(baseName)) {
    matched++;
  } else {
    // Check if CHSC has a similar school (partial match)
    let foundSimilar = false;
    for (const chscName of chscNames) {
      if (chscName.includes(baseName) || baseName.includes(chscName)) {
        foundSimilar = true;
        console.log(`Similar: ${school.name} -> ${chscName}`);
        break;
      }
    }
    if (!foundSimilar) {
      notMatched++;
      notMatchedSchools.push({ id: school.id, name: school.name, baseName, level: school.level });
    }
  }
}

console.log(`\n=== Summary ===`);
console.log(`Matched after removing suffix: ${matched}`);
console.log(`Not matched (not in CHSC at all): ${notMatched}`);

if (notMatchedSchools.length > 0 && notMatchedSchools.length <= 20) {
  console.log('\n=== Schools not in CHSC ===');
  for (const s of notMatchedSchools) {
    console.log(`${s.id} | ${s.name} | base: ${s.baseName}`);
  }
}

// Now check the 5 regular schools needing investigation
console.log('\n\n=== Investigating 5 Regular Schools ===');
const regularSchools = [
  { id: 'edb_114707000123', name: '新界婦孺福利會有限公司梁省德學校', nameEn: 'NEW TERRITORIES WOMEN & JUVENILES WELFARE ASSOCIATION LTD. LEUNG SING TAK PRIMARY SCHOOL' },
  { id: 'edb_522066000123', name: '寶安商會溫浩根小學', nameEn: 'PO ON COMMERCIAL ASSOCIATION WAN HO KAN PRIMARY SCHOOL' },
  { id: 'edb_513083000123', name: '啓基學校(港島)', nameEn: "CHAN'S CREATIVE SCHOOL (HONG KONG ISLAND)" },
  { id: 'edb_114510000223', name: '保良局莊啓程第二小學', nameEn: 'PO LEUNG KUK VICWOOD K.T. CHONG NO.2 PRIMARY SCHOOL' },
  { id: 'edb_260282000133', name: '香港青少年培育會陳南昌紀念學校', nameEn: 'HONG KONG JUVENILE CARE CENTRE CHAN NAM CHEONG MEMORIAL SCHOOL' },
];

for (const school of regularSchools) {
  const chscNames = school.id.endsWith('23') ? chscPrimaryNames : chscSecondaryNames;

  console.log(`\nSearching for: ${school.name}`);

  // Check for partial matches
  for (const chscName of chscNames) {
    // Check if key parts match
    const schoolParts = school.name.replace(/[（）()]/g, '').split('');
    const matchScore = schoolParts.filter(char => chscName.includes(char)).length / schoolParts.length;

    if (matchScore > 0.6) {
      console.log(`  Potential match (${(matchScore*100).toFixed(0)}%): ${chscName}`);
    }
  }
}
