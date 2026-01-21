import { schools } from '../../data/schools.ts';
import * as fs from 'fs';

// Normalize function (same as in mapping script)
function normalizeNameZh(name: string): string {
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
    .trim();
}

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
    headers.forEach((h, idx) => { row[h] = values[idx]?.trim() || ''; });
    rows.push(row);
  }
  return rows;
}

const primaryTcCsv = fs.readFileSync('./data/psp_2025_tc.csv', 'utf-8');
const secondaryTcCsv = fs.readFileSync('./data/ssp_2025_2026_tc.csv', 'utf-8');
const primaryChsc = parseCSV(primaryTcCsv);
const secondaryChsc = parseCSV(secondaryTcCsv);

// Get normalized CHSC names
const chscPrimaryNormalized = new Map<string, string>();
for (const r of primaryChsc) {
  const name = r['學校名稱'];
  if (name) chscPrimaryNormalized.set(normalizeNameZh(name), name);
}

const chscSecondaryNormalized = new Map<string, string>();
for (const r of secondaryChsc) {
  const name = r['學校名稱'];
  if (name) chscSecondaryNormalized.set(normalizeNameZh(name), name);
}

// Check specific schools with 部 suffix
const testSchools = [
  '瑪利諾神父教會學校(小學部)',
  '西貢崇真天主教學校(小學部)',
  '三水同鄉會劉本章學校(小學部)',
  '明愛樂進學校(小學部)',
];

console.log('=== Testing 部 Suffix Matching ===\n');
for (const name of testSchools) {
  const normalized = normalizeNameZh(name);
  console.log(`School: ${name}`);
  console.log(`  Normalized: ${normalized}`);

  const match = chscPrimaryNormalized.get(normalized);
  if (match) {
    console.log(`  MATCH: ${match}`);
  } else {
    // Find similar
    console.log(`  No exact match. Similar entries:`);
    for (const [normChsc, origChsc] of chscPrimaryNormalized) {
      if (normChsc.includes(normalized.replace('(小學部)', '')) || normalized.includes(normChsc)) {
        console.log(`    - ${origChsc} (normalized: ${normChsc})`);
      }
    }
  }
  console.log('');
}

// Check if CHSC has any schools with 部 suffix
console.log('=== CHSC Schools with 部 suffix ===');
let count = 0;
for (const [norm, orig] of chscPrimaryNormalized) {
  if (orig.includes('部')) {
    console.log(`  ${orig}`);
    count++;
  }
}
console.log(`Total: ${count}`);

console.log('\n=== CHSC Secondary Schools with 部 suffix ===');
count = 0;
for (const [norm, orig] of chscSecondaryNormalized) {
  if (orig.includes('部')) {
    console.log(`  ${orig}`);
    count++;
  }
}
console.log(`Total: ${count}`);
