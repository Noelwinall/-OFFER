/**
 * Generate school gender mapping from CHSC data
 *
 * Sources:
 * - data/psp_2025_tc.csv (Primary School Profiles)
 * - data/ssp_2025_2026_tc.csv (Secondary School Profiles)
 */

import * as fs from 'fs';
import * as path from 'path';
import { schools } from '../data/schools';

const PSP_FILE = path.join(__dirname, '..', 'data', 'psp_2025_tc.csv');
const SSP_FILE = path.join(__dirname, '..', 'data', 'ssp_2025_2026_tc.csv');
const OUTPUT_FILE = path.join(__dirname, '..', 'data', 'school_gender_mapping_v1.csv');

interface ChscSchool {
  name: string;
  gender: string;
  source: string;
}

// Parse CSV with proper handling of quoted fields
function parseCSV(content: string): string[][] {
  const rows: string[][] = [];
  const lines = content.split('\n');

  for (const line of lines) {
    if (!line.trim()) continue;

    const row: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        row.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    row.push(current.trim());
    rows.push(row);
  }

  return rows;
}

// Normalize school name for matching
function normalizeName(name: string): string {
  if (!name) return '';
  return name
    .replace(/[\s\u3000]/g, '')
    .replace(/[（【「『《〈﹝\[]/g, '(')
    .replace(/[）】」』》〉﹞\]]/g, ')')
    .replace(/[，。、；：！？…—－·,.;:!?]/g, '')
    .replace(/[""''""'']/g, '')
    .replace(/啓/g, '啟')
    .replace(/温/g, '溫')
    .replace(/峯/g, '峰')
    .replace(/綫/g, '線')
    .replace(/裏/g, '裡')
    .replace(/衞/g, '衛')
    .replace(/羣/g, '群')
    .replace(/着/g, '著')
    .trim()
    .toLowerCase();
}

function main() {
  console.log('=== Generating Gender Mapping ===\n');

  // Parse CHSC files
  const chscSchools: ChscSchool[] = [];

  // PSP (Primary): school_name at col 1 (0-indexed), student_gender at col 16
  const pspContent = fs.readFileSync(PSP_FILE, 'utf-8');
  const pspRows = parseCSV(pspContent);
  const pspHeader = pspRows[0];

  // Find column indices
  let pspNameCol = pspHeader.findIndex(h => h.includes('學校名稱'));
  let pspGenderCol = pspHeader.findIndex(h => h.includes('學生性別'));

  console.log(`PSP: name col=${pspNameCol}, gender col=${pspGenderCol}`);

  for (let i = 1; i < pspRows.length; i++) {
    const row = pspRows[i];
    const name = row[pspNameCol];
    const gender = row[pspGenderCol];

    if (name && gender && (gender === '男' || gender === '女' || gender === '男女')) {
      chscSchools.push({ name, gender, source: 'CHSC_PSP' });
    }
  }

  // SSP (Secondary): school_name at col 1, student_gender at col 14
  const sspContent = fs.readFileSync(SSP_FILE, 'utf-8');
  const sspRows = parseCSV(sspContent);
  const sspHeader = sspRows[0];

  let sspNameCol = sspHeader.findIndex(h => h.includes('學校名稱'));
  let sspGenderCol = sspHeader.findIndex(h => h.includes('學生性別'));

  console.log(`SSP: name col=${sspNameCol}, gender col=${sspGenderCol}`);

  for (let i = 1; i < sspRows.length; i++) {
    const row = sspRows[i];
    const name = row[sspNameCol];
    const gender = row[sspGenderCol];

    if (name && gender && (gender === '男' || gender === '女' || gender === '男女')) {
      chscSchools.push({ name, gender, source: 'CHSC_SSP' });
    }
  }

  console.log(`\nTotal CHSC schools with gender: ${chscSchools.length}`);

  // Count by gender type
  const genderCounts = { '男': 0, '女': 0, '男女': 0 };
  chscSchools.forEach(s => genderCounts[s.gender as keyof typeof genderCounts]++);
  console.log('CHSC gender distribution:', genderCounts);

  // Build lookup map by normalized name
  const chscByName = new Map<string, ChscSchool>();
  for (const s of chscSchools) {
    chscByName.set(normalizeName(s.name), s);
  }

  // Match to schools.ts
  const psSchools = schools.filter(s => s.level === '小學' || s.level === '中學');
  const mappings: { school_id: string; gender: string; source: string; confidence: string; chsc_name: string }[] = [];

  let matched = 0;
  let unmatched = 0;

  for (const school of psSchools) {
    const normalizedName = normalizeName(school.name);
    const chsc = chscByName.get(normalizedName);

    if (chsc) {
      // Map gender values
      let genderValue: string;
      switch (chsc.gender) {
        case '男': genderValue = 'BOYS'; break;
        case '女': genderValue = 'GIRLS'; break;
        case '男女': genderValue = 'MIXED'; break;
        default: genderValue = 'UNKNOWN';
      }

      mappings.push({
        school_id: school.id,
        gender: genderValue,
        source: chsc.source,
        confidence: 'HIGH',
        chsc_name: chsc.name
      });
      matched++;
    } else {
      unmatched++;
    }
  }

  console.log(`\nMatched: ${matched}`);
  console.log(`Unmatched: ${unmatched}`);

  // Write CSV
  const csvHeader = 'school_id,gender,source,confidence,chsc_name';
  const csvRows = mappings.map(m =>
    `${m.school_id},${m.gender},${m.source},${m.confidence},"${m.chsc_name}"`
  );

  fs.writeFileSync(OUTPUT_FILE, [csvHeader, ...csvRows].join('\n'), 'utf-8');
  console.log(`\nWritten to: ${OUTPUT_FILE}`);

  // Summary by gender
  const mappedCounts = { BOYS: 0, GIRLS: 0, MIXED: 0 };
  mappings.forEach(m => mappedCounts[m.gender as keyof typeof mappedCounts]++);
  console.log('\nMapped gender distribution:', mappedCounts);

  // Add unmatched schools with MIXED as default (most schools are co-ed)
  if (unmatched > 0) {
    console.log('\n=== Unmatched Schools (assigning MIXED with LOW confidence) ===');
    for (const school of psSchools) {
      const normalizedName = normalizeName(school.name);
      if (!chscByName.has(normalizedName)) {
        mappings.push({
          school_id: school.id,
          gender: 'MIXED',
          source: 'DEFAULT',
          confidence: 'LOW',
          chsc_name: ''
        });
      }
    }
  }

  // Re-write CSV with all schools
  const csvHeader2 = 'school_id,gender,source,confidence,chsc_name';
  const csvRows2 = mappings.map(m =>
    `${m.school_id},${m.gender},${m.source},${m.confidence},"${m.chsc_name}"`
  );

  fs.writeFileSync(OUTPUT_FILE, [csvHeader2, ...csvRows2].join('\n'), 'utf-8');
  console.log(`\nFinal written to: ${OUTPUT_FILE}`);
  console.log(`Total mappings: ${mappings.length}`);

  // Final summary
  const finalCounts = { BOYS: 0, GIRLS: 0, MIXED: 0 };
  mappings.forEach(m => finalCounts[m.gender as keyof typeof finalCounts]++);
  console.log('Final gender distribution:', finalCounts);
}

main();
