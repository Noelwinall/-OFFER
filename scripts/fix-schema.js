/**
 * Phase 2B: Fix schema inconsistencies
 * Transform data/schools.ts to match types/school.ts interface
 * 依据：BOSS.md v1
 */

const fs = require('fs');
const path = require('path');

// Read schools data
const schoolsPath = path.join(__dirname, '..', 'data', 'schools.ts');
const schoolsContent = fs.readFileSync(schoolsPath, 'utf-8');

// Extract JSON array
const match = schoolsContent.match(/export const schools: School\[\] = (\[[\s\S]*\]);?/);
if (!match) {
  console.error('Failed to parse schools data');
  process.exit(1);
}

let schools;
try {
  let jsonStr = match[1].replace(/;$/, '');
  schools = JSON.parse(jsonStr);
} catch (e) {
  console.error('JSON parse error:', e.message);
  process.exit(1);
}

console.log(`Processing ${schools.length} schools...`);

// Category mapping
function mapCategory(type, fundingType) {
  // Priority: if it's 國際學校, use 國際
  if (type === '國際學校') return '國際';

  // Map fundingType to category
  const fundingMap = {
    '私立': '私立',
    '直資': '直資',
    '資助': '資助',
    '官立': '公立',
    '公立': '公立'
  };

  if (fundingType && fundingMap[fundingType]) {
    return fundingMap[fundingType];
  }

  // Fallback based on type
  if (type && type.includes('私立')) return '私立';
  if (type && type.includes('直資')) return '直資';
  if (type && type.includes('資助')) return '資助';
  if (type && type.includes('官立')) return '公立';
  if (type && type.includes('公立')) return '公立';

  return '私立'; // Default fallback
}

// Language normalization
function normalizeLanguage(lang) {
  if (lang === '雙語' || lang === '双语') return '中英雙語';
  if (lang === '全英文' || lang === '英文') return '全英文';
  if (lang === '以中文為主' || lang === '中文') return '以中文為主';
  if (lang === '中英雙語') return '中英雙語';
  return '中英雙語'; // Default
}

// Curriculum to array
function normalizeCurriculum(curr) {
  if (Array.isArray(curr)) return curr;
  if (typeof curr === 'string' && curr.trim()) {
    return [curr.trim()];
  }
  return ['其他'];
}

// Transform schools
const transformedSchools = schools.map((school, index) => {
  const transformed = {
    id: school.id,
    name: school.name,
    nameEn: school.nameEn || '',
    searchKeywords: school.searchKeywords || [],
    category: mapCategory(school.type, school.fundingType),
    district: school.region || '九龍', // Use region (3-area), fallback
    level: school.level,
    tuitionMin: typeof school.tuition === 'number' ? school.tuition : 0,
    tuitionMax: typeof school.tuition === 'number' ? school.tuition : 0,
    curriculum: normalizeCurriculum(school.curriculum),
    language: normalizeLanguage(school.language),
    highlights: school.features || school.highlights || [],
    address: school.address || '',
    phone: school.phone || '',
    website: school.website || '',
    applicationMaterials: school.applicationMaterials || [],
    applicationLink: school.applicationLink || '',
    latitude: school.latitude || 0,
    longitude: school.longitude || 0
  };

  return transformed;
});

// Generate TypeScript file content
const tsContent = `// 香港學校數據庫
// Schema 已統一至 types/school.ts 接口
// Phase 2B 修復：${new Date().toISOString().split('T')[0]}

import { School } from "@/types/school";

export const schools: School[] = ${JSON.stringify(transformedSchools, null, 2)};
`;

// Write output
fs.writeFileSync(schoolsPath, tsContent, 'utf-8');

// Generate summary
console.log(`\nSchema fix complete!`);
console.log(`Transformed ${transformedSchools.length} schools`);
console.log(`\nChanges applied:`);
console.log(`  - type + fundingType → category`);
console.log(`  - region → district (3-area)`);
console.log(`  - tuition → tuitionMin + tuitionMax`);
console.log(`  - curriculum string → array`);
console.log(`  - features → highlights`);
console.log(`  - language normalized`);
console.log(`  - Added applicationMaterials: []`);
console.log(`  - Removed: type, fundingType, region, addressEn, gender, religion`);

// Verify a sample
console.log(`\nSample (first school):`);
console.log(JSON.stringify(transformedSchools[0], null, 2));
