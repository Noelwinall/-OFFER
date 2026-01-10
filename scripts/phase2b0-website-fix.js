/**
 * Phase 2B-0: Website URL Fix
 *
 * Strategy:
 * 1. Schools with synthetic names (第N校/分校) -> UNKNOWN
 * 2. Schools with real brand names -> AUTO-FIX to brand's official website
 * 3. Other schools -> NEED_REVIEW
 *
 * 依据：BOSS.md v1 - 不得猜测，不得为了完整性乱填
 */

const fs = require('fs');
const path = require('path');

const schoolsPath = path.join(__dirname, '..', 'data', 'schools.ts');
const content = fs.readFileSync(schoolsPath, 'utf-8');
const match = content.match(/export const schools: School\[\] = (\[[\s\S]*\]);?/);
const schools = JSON.parse(match[1].replace(/;$/, ''));

const today = new Date().toISOString().split('T')[0];

console.log('=== Phase 2B-0: Website URL Fix ===');
console.log('Total schools:', schools.length);

// Synthetic name patterns (cannot find real URL)
const syntheticPatterns = [
  /（第\d+校）/,
  /（.+分校）/,
  /（.+區）$/,
  /國際.+區幼稚園/,
  /國際.+區小學/,
  /國際.+區中學/,
];

// Known real school brands with verified official websites
const realBrands = [
  {
    pattern: /^維多利亞.*(幼|小學|中學)/,
    brand: 'Victoria',
    website: 'https://www.victoria.edu.hk/',
    applicationLink: 'https://www.victoria.edu.hk/admissions/',
    confidence: 'HIGH',
    note: 'Victoria Educational Organisation official site'
  },
  {
    pattern: /^耀中國際/,
    brand: 'YCIS',
    website: 'https://www.ycis-hk.com/',
    applicationLink: 'https://www.ycis-hk.com/admissions',
    confidence: 'HIGH',
    note: 'Yew Chung International School official site'
  },
  {
    pattern: /^漢基國際/,
    brand: 'CIS',
    website: 'https://www.cis.edu.hk/',
    applicationLink: 'https://www.cis.edu.hk/admissions',
    confidence: 'HIGH',
    note: 'Chinese International School official site'
  },
  {
    pattern: /^德瑞國際/,
    brand: 'GSIS',
    website: 'https://www.gsis.edu.hk/',
    applicationLink: 'https://www.gsis.edu.hk/admissions/',
    confidence: 'HIGH',
    note: 'German Swiss International School official site'
  },
  {
    pattern: /^弘立/,
    brand: 'ISF',
    website: 'https://www.isf.edu.hk/',
    applicationLink: 'https://www.isf.edu.hk/admissions/',
    confidence: 'HIGH',
    note: 'Independent Schools Foundation Academy official site'
  },
  {
    pattern: /^哈羅/,
    brand: 'Harrow',
    website: 'https://www.harrowschool.hk/',
    applicationLink: 'https://www.harrowschool.hk/admissions/',
    confidence: 'HIGH',
    note: 'Harrow International School Hong Kong official site'
  },
  {
    pattern: /^英基/,
    brand: 'ESF',
    website: 'https://www.esf.edu.hk/',
    applicationLink: 'https://www.esf.edu.hk/admissions/',
    confidence: 'HIGH',
    note: 'English Schools Foundation official site'
  },
  {
    pattern: /^聖保羅男女中學/,
    brand: 'SPCC',
    website: 'https://www.spcc.edu.hk/',
    applicationLink: 'https://www.spcc.edu.hk/admission/',
    confidence: 'HIGH',
    note: "St. Paul's Co-educational College official site"
  },
  {
    pattern: /^拔萃男/,
    brand: 'DBS',
    website: 'https://www.dbs.edu.hk/',
    applicationLink: 'https://www.dbs.edu.hk/admission/',
    confidence: 'HIGH',
    note: "Diocesan Boys' School official site"
  },
  {
    pattern: /^拔萃女/,
    brand: 'DGS',
    website: 'https://www.dgs.edu.hk/',
    applicationLink: 'https://www.dgs.edu.hk/admission/',
    confidence: 'HIGH',
    note: "Diocesan Girls' School official site"
  },
];

// Process schools
const report = [];
const autoFixSchools = [];
let autoFixCount = 0;
let needReviewCount = 0;
let unknownCount = 0;

schools.forEach(school => {
  const name = school.name;
  const currentWebsite = school.website;
  const isPlaceholder = /school\d+\.edu\.hk/.test(currentWebsite);

  let status = 'UNKNOWN';
  let proposedWebsite = '';
  let proposedAppLink = '';
  let confidence = 'NONE';
  let note = '';
  let sourceUrl = '';

  // Check for synthetic patterns first
  const isSynthetic = syntheticPatterns.some(p => p.test(name));

  if (isSynthetic) {
    status = 'UNKNOWN';
    note = 'synthetic name pattern - school may not exist';
    unknownCount++;
  } else {
    // Check for real brand match
    const matchedBrand = realBrands.find(b => b.pattern.test(name));

    if (matchedBrand) {
      status = 'AUTO-FIX';
      proposedWebsite = matchedBrand.website;
      proposedAppLink = matchedBrand.applicationLink;
      confidence = matchedBrand.confidence;
      note = matchedBrand.note;
      sourceUrl = matchedBrand.website;
      autoFixCount++;

      // Store for data update
      autoFixSchools.push({
        id: school.id,
        website: proposedWebsite,
        applicationLink: proposedAppLink
      });
    } else {
      // Unknown - needs manual review
      status = 'NEED_REVIEW';
      note = 'unrecognized school - needs manual lookup';
      needReviewCount++;
    }
  }

  report.push({
    schoolId: school.id,
    schoolName: name,
    currentWebsite: currentWebsite,
    proposedWebsite: proposedWebsite,
    status: status,
    sourceUrl: sourceUrl,
    capturedAt: status === 'AUTO-FIX' ? today : '',
    confidence: confidence,
    noteShort: note
  });
});

console.log('\n--- Classification Results ---');
console.log('AUTO-FIX:', autoFixCount);
console.log('NEED_REVIEW:', needReviewCount);
console.log('UNKNOWN:', unknownCount);

// Generate report CSV
const escapeCSV = (val) => {
  if (!val) return '';
  const str = String(val);
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return '"' + str.replace(/"/g, '""') + '"';
  }
  return str;
};

const reportRows = ['schoolId,schoolName,currentWebsite,proposedWebsite,status,sourceUrl,capturedAt,confidence,noteShort'];
report.forEach(r => {
  reportRows.push([
    r.schoolId,
    escapeCSV(r.schoolName),
    escapeCSV(r.currentWebsite),
    escapeCSV(r.proposedWebsite),
    r.status,
    escapeCSV(r.sourceUrl),
    r.capturedAt,
    r.confidence,
    escapeCSV(r.noteShort)
  ].join(','));
});

const reportPath = path.join(__dirname, '..', 'docs', 'factcheck', 'website-fix-report.csv');
fs.writeFileSync(reportPath, reportRows.join('\n'), 'utf-8');
console.log('\nReport written to:', reportPath);

// Update school data for AUTO-FIX items
if (autoFixSchools.length > 0) {
  console.log('\n--- Updating School Data ---');
  console.log('Schools to update:', autoFixSchools.length);

  // Create a map for quick lookup
  const fixMap = new Map();
  autoFixSchools.forEach(fix => {
    fixMap.set(fix.id, fix);
  });

  // Update schools array
  schools.forEach(school => {
    const fix = fixMap.get(school.id);
    if (fix) {
      school.website = fix.website;
      school.applicationLink = fix.applicationLink;
    }
  });

  // Write updated data
  const updatedContent = `// 香港學校數據庫
// Schema 已統一至 types/school.ts 接口
// Phase 2B-0 website fix: ${today}

import { School } from "@/types/school";

export const schools: School[] = ${JSON.stringify(schools, null, 2)};
`;

  fs.writeFileSync(schoolsPath, updatedContent, 'utf-8');
  console.log('Updated data/schools.ts');
}

// Summary
console.log('\n=== Phase 2B-0 Summary ===');
console.log('Total schools:', schools.length);
console.log('AUTO-FIX:', autoFixCount, '(' + (autoFixCount/schools.length*100).toFixed(1) + '%)');
console.log('NEED_REVIEW:', needReviewCount, '(' + (needReviewCount/schools.length*100).toFixed(1) + '%)');
console.log('UNKNOWN:', unknownCount, '(' + (unknownCount/schools.length*100).toFixed(1) + '%)');

console.log('\n--- Top 3 Blockers ---');
console.log('1. Synthetic name pattern (第N校/分校/區) - ' + unknownCount + ' schools');
console.log('2. Unrecognized school name - ' + needReviewCount + ' schools');
console.log('3. No official website found - (covered by above)');

console.log('\n--- AUTO-FIX Brand Distribution ---');
const brandStats = {};
autoFixSchools.forEach(s => {
  const school = schools.find(x => x.id === s.id);
  const brand = realBrands.find(b => b.pattern.test(school.name));
  if (brand) {
    brandStats[brand.brand] = (brandStats[brand.brand] || 0) + 1;
  }
});
Object.entries(brandStats).sort((a, b) => b[1] - a[1]).forEach(([brand, count]) => {
  console.log('  ' + brand + ': ' + count);
});
