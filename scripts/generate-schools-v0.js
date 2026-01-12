/**
 * Phase R1: Generate schools.ts from baseline-schools.csv
 * Only fills entity fields, NOT tuition/articulation/highlights
 */

const fs = require('fs');
const path = require('path');

// Paths
const CSV_PATH = path.join(__dirname, '../docs/factcheck/baseline-schools.csv');
const OUTPUT_PATH = path.join(__dirname, '../data/schools.ts');

// Mapping functions per mapping-v0.md
function mapCategory(financeType) {
  const map = {
    'AIDED': '資助',
    'GOVERNMENT': '公立',
    'DIRECT SUBSIDY SCHEME': '直資',
    'DSS': '直資',
    'PRIVATE': '私立',
    'PRIVATE INDEPENDENT': '私立',
    'ESF': '國際',
    'INTERNATIONAL': '國際',
  };
  return map[(financeType || '').toUpperCase()] || '私立';
}

function mapDistrict(district) {
  const hkIsland = ['CENTRAL AND WESTERN', 'EASTERN', 'SOUTHERN', 'WAN CHAI'];
  const kowloon = ['KOWLOON CITY', 'KWUN TONG', 'SHAM SHUI PO', 'WONG TAI SIN', 'YAU TSIM MONG'];
  const nt = ['ISLANDS', 'KWAI TSING', 'NORTH', 'SAI KUNG', 'SHA TIN', 'TAI PO', 'TSUEN WAN', 'TUEN MUN', 'YUEN LONG'];

  const d = (district || '').toUpperCase();
  if (hkIsland.some(x => d.includes(x))) return '港島';
  if (kowloon.some(x => d.includes(x))) return '九龍';
  if (nt.some(x => d.includes(x))) return '新界';
  return '九龍'; // default
}

function mapLevel(level) {
  const l = (level || '').toUpperCase();
  if (l.includes('KINDERGARTEN') || l.includes('幼稚園') || l.includes('幼兒')) return '幼稚園';
  if (l.includes('PRIMARY') || l.includes('小學')) return '小學';
  if (l.includes('SECONDARY') || l.includes('中學')) return '中學';
  return '小學'; // default
}

function generateSearchKeywords(nameZh, nameEn) {
  const keywords = [];
  if (nameZh) keywords.push(nameZh);
  if (nameEn) {
    keywords.push(nameEn);
    // Generate acronym if > 3 words
    const words = nameEn.split(/\s+/).filter(w => w.length > 0);
    if (words.length >= 3) {
      const acronym = words
        .filter(w => /^[A-Z]/.test(w)) // Only words starting with capital
        .map(w => w[0])
        .join('');
      if (acronym.length >= 2) {
        keywords.push(acronym);
      }
    }
  }
  return keywords;
}

function cleanWebsite(website) {
  if (!website || website === 'N.A.' || website === 'N/A' || website === 'n.a.') {
    return '';
  }
  return website.trim();
}

// Parse CSV
function parseCSV(content) {
  const lines = content.trim().split('\n');
  const headers = lines[0].split(',');

  return lines.slice(1).map(line => {
    // Handle potential commas in quoted fields
    const values = [];
    let current = '';
    let inQuotes = false;

    for (const char of line) {
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current.trim());

    const row = {};
    headers.forEach((h, i) => {
      row[h.trim()] = values[i] || '';
    });
    return row;
  });
}

// Main
console.log('Reading baseline CSV...');
const csvContent = fs.readFileSync(CSV_PATH, 'utf-8');
const rows = parseCSV(csvContent);
console.log(`Parsed ${rows.length} rows`);

// Transform to School objects
const schools = rows.map(row => ({
  id: `edb_${row.officialId}`,
  name: row.officialNameZh || '',
  nameEn: row.officialNameEn || '',
  searchKeywords: generateSearchKeywords(row.officialNameZh, row.officialNameEn),
  category: mapCategory(row.financeType),
  district: mapDistrict(row.district),
  level: mapLevel(row.level),
  tuitionMin: 0,
  tuitionMax: 0,
  curriculum: [],
  language: '以中文為主',
  highlights: [],
  address: '',
  phone: '',
  website: cleanWebsite(row.website),
  applicationMaterials: [],
  applicationLink: '',
  latitude: 0,
  longitude: 0,
}));

console.log(`Generated ${schools.length} school objects`);

// Generate TypeScript output
const tsContent = `// 香港學校數據庫
// Schema: types/school.ts
// Source: EDB baseline-schools.csv (Phase R1 Rebuild v0)
// Generated: ${new Date().toISOString().split('T')[0]}
// Total: ${schools.length} schools
// Note: tuition/articulation/highlights NOT filled (v0)

import { School } from "@/types/school";

export const schools: School[] = ${JSON.stringify(schools, null, 2)};
`;

fs.writeFileSync(OUTPUT_PATH, tsContent, 'utf-8');
console.log(`Written to ${OUTPUT_PATH}`);

// Stats
const stats = {
  total: schools.length,
  byLevel: {},
  byCategory: {},
  byDistrict: {},
};

schools.forEach(s => {
  stats.byLevel[s.level] = (stats.byLevel[s.level] || 0) + 1;
  stats.byCategory[s.category] = (stats.byCategory[s.category] || 0) + 1;
  stats.byDistrict[s.district] = (stats.byDistrict[s.district] || 0) + 1;
});

console.log('\n=== Stats ===');
console.log('By Level:', stats.byLevel);
console.log('By Category:', stats.byCategory);
console.log('By District:', stats.byDistrict);
