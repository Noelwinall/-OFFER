/**
 * Analyze school names to identify real vs synthetic patterns
 */

const fs = require('fs');
const path = require('path');

const schoolsPath = path.join(__dirname, '..', 'data', 'schools.ts');
const content = fs.readFileSync(schoolsPath, 'utf-8');
const match = content.match(/export const schools: School\[\] = (\[[\s\S]*\]);?/);
const schools = JSON.parse(match[1].replace(/;$/, ''));

console.log('=== School Name Analysis ===\n');
console.log('Total schools:', schools.length);

// Patterns indicating synthetic names
const syntheticPatterns = [
  /（第\d+校）/,           // (第N校)
  /（.+分校）/,            // (XX分校)
  /（.+區）$/,             // (XX區) at end
  /國際.+區/,              // 國際XX區 pattern
];

// Known real school brands in HK
const realBrands = [
  { pattern: /^維多利亞/, brand: 'Victoria', realUrl: 'https://www.victoria.edu.hk/' },
  { pattern: /^耀中/, brand: 'YCIS', realUrl: 'https://www.ycis-hk.com/' },
  { pattern: /^漢基/, brand: 'CIS', realUrl: 'https://www.cis.edu.hk/' },
  { pattern: /^德瑞/, brand: 'GSIS', realUrl: 'https://www.gsis.edu.hk/' },
  { pattern: /^弘立/, brand: 'ISF', realUrl: 'https://www.isf.edu.hk/' },
  { pattern: /^哈羅/, brand: 'Harrow', realUrl: 'https://www.harrowschool.hk/' },
  { pattern: /^英基/, brand: 'ESF', realUrl: 'https://www.esf.edu.hk/' },
  { pattern: /^聖保羅/, brand: 'St Paul', realUrl: null }, // Multiple schools
  { pattern: /^拔萃/, brand: 'DBS/DGS', realUrl: null }, // Multiple schools
  { pattern: /^喇沙/, brand: 'La Salle', realUrl: null },
  { pattern: /^瑪利諾/, brand: 'Maryknoll', realUrl: null },
];

let synthetic = 0;
let realBrand = 0;
let unknown = 0;

const brandCounts = {};
const syntheticExamples = [];
const realBrandExamples = [];

schools.forEach(school => {
  const name = school.name;

  // Check for synthetic patterns
  const isSynthetic = syntheticPatterns.some(p => p.test(name));

  // Check for real brand
  const matchedBrand = realBrands.find(b => b.pattern.test(name));

  if (isSynthetic) {
    synthetic++;
    if (syntheticExamples.length < 20) {
      syntheticExamples.push(name);
    }
  } else if (matchedBrand) {
    realBrand++;
    brandCounts[matchedBrand.brand] = (brandCounts[matchedBrand.brand] || 0) + 1;
    if (realBrandExamples.length < 20) {
      realBrandExamples.push({ name, brand: matchedBrand.brand, realUrl: matchedBrand.realUrl });
    }
  } else {
    unknown++;
  }
});

console.log('\n--- Classification ---');
console.log('Clearly Synthetic (第N校/分校 pattern):', synthetic);
console.log('Contains Real Brand Name:', realBrand);
console.log('Unknown/Other:', unknown);

console.log('\n--- Real Brand Distribution ---');
Object.entries(brandCounts).sort((a, b) => b[1] - a[1]).forEach(([brand, count]) => {
  console.log(`  ${brand}: ${count}`);
});

console.log('\n--- Synthetic Name Examples (first 20) ---');
syntheticExamples.forEach((name, i) => {
  console.log(`  ${i + 1}. ${name}`);
});

console.log('\n--- Real Brand Examples (first 20) ---');
realBrandExamples.forEach((item, i) => {
  console.log(`  ${i + 1}. ${item.name} [${item.brand}] -> ${item.realUrl || 'needs lookup'}`);
});

// Check placeholder URLs
const placeholderUrls = schools.filter(s => /school\d+\.edu\.hk/.test(s.website)).length;
console.log('\n--- URL Status ---');
console.log('Placeholder URLs:', placeholderUrls);
console.log('Real URLs:', schools.length - placeholderUrls);
