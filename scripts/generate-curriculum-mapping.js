/**
 * Generate Curriculum Mapping V1.2 with correct edb_ IDs
 *
 * This script reads schools.ts and generates a proper curriculum mapping
 * for known international schools based on their actual curricula.
 */

const fs = require('fs');
const path = require('path');

const SCHOOLS_FILE = path.join(__dirname, '..', 'data', 'schools.ts');
const OUTPUT_FILE = path.join(__dirname, '..', 'data', 'curriculum_mapping_v1.2.csv');

// Known curriculum mappings based on actual school programs
// Source: School websites and official information
const CURRICULUM_BY_SCHOOL_PATTERN = [
  // ESF Schools - British curriculum (IGCSE/A-Level) + IB
  { pattern: /BEACON HILL SCHOOL/i, curriculum: 'BRITISH', confidence: 'HIGH' },
  { pattern: /BRADBURY SCHOOL/i, curriculum: 'BRITISH', confidence: 'HIGH' },
  { pattern: /CLEARWATER BAY SCHOOL/i, curriculum: 'BRITISH', confidence: 'HIGH' },
  { pattern: /GLENEALY SCHOOL/i, curriculum: 'BRITISH', confidence: 'HIGH' },
  { pattern: /KENNEDY SCHOOL/i, curriculum: 'BRITISH', confidence: 'HIGH' },
  { pattern: /KOWLOON JUNIOR SCHOOL/i, curriculum: 'BRITISH', confidence: 'HIGH' },
  { pattern: /PEAK SCHOOL/i, curriculum: 'BRITISH', confidence: 'HIGH' },
  { pattern: /QUARRY BAY SCHOOL/i, curriculum: 'BRITISH', confidence: 'HIGH' },
  { pattern: /SHA\s*TIN JUNIOR SCHOOL/i, curriculum: 'BRITISH', confidence: 'HIGH' },
  { pattern: /ISLAND SCHOOL/i, curriculum: 'IB', confidence: 'HIGH' },
  { pattern: /KING GEORGE V SCHOOL/i, curriculum: 'IB', confidence: 'HIGH' },
  { pattern: /SHA\s*TIN COLLEGE/i, curriculum: 'IB', confidence: 'HIGH' },
  { pattern: /SOUTH ISLAND SCHOOL/i, curriculum: 'IB', confidence: 'HIGH' },
  { pattern: /WEST ISLAND SCHOOL/i, curriculum: 'IB', confidence: 'HIGH' },
  { pattern: /DISCOVERY COLLEGE/i, curriculum: 'IB', confidence: 'HIGH' },
  { pattern: /RENAISSANCE COLLEGE/i, curriculum: 'IB', confidence: 'HIGH' },

  // American schools
  { pattern: /AMERICAN INTERNATIONAL SCHOOL/i, curriculum: 'AMERICAN', confidence: 'HIGH' },
  { pattern: /HONG KONG INTERNATIONAL SCHOOL/i, curriculum: 'AMERICAN', confidence: 'HIGH' },
  { pattern: /STAMFORD AMERICAN/i, curriculum: 'AMERICAN', confidence: 'HIGH' },
  { pattern: /CONCORDIA INTERNATIONAL/i, curriculum: 'AMERICAN', confidence: 'HIGH' },

  // Canadian schools
  { pattern: /CANADIAN INTERNATIONAL SCHOOL/i, curriculum: 'CANADIAN', confidence: 'HIGH' },

  // Australian schools
  { pattern: /AUSTRALIAN INTERNATIONAL SCHOOL/i, curriculum: 'AUSTRALIAN', confidence: 'HIGH' },

  // British schools
  { pattern: /HARROW INTERNATIONAL/i, curriculum: 'BRITISH', confidence: 'HIGH' },
  { pattern: /KELLETT SCHOOL/i, curriculum: 'BRITISH', confidence: 'HIGH' },
  { pattern: /MALVERN COLLEGE/i, curriculum: 'BRITISH', confidence: 'HIGH' },
  { pattern: /SHREWSBURY INTERNATIONAL/i, curriculum: 'BRITISH', confidence: 'HIGH' },
  { pattern: /NORD ANGLIA INTERNATIONAL/i, curriculum: 'BRITISH', confidence: 'HIGH' },

  // IB schools
  { pattern: /CHINESE INTERNATIONAL SCHOOL/i, curriculum: 'IB', confidence: 'HIGH' },
  { pattern: /GERMAN SWISS INTERNATIONAL/i, curriculum: 'IB', confidence: 'HIGH' },
  { pattern: /VICTORIA SHANGHAI ACADEMY/i, curriculum: 'IB', confidence: 'HIGH' },
  { pattern: /HONG KONG ACADEMY/i, curriculum: 'IB', confidence: 'HIGH' },
  { pattern: /CHRISTIAN ALLIANCE INTERNATIONAL/i, curriculum: 'IB', confidence: 'HIGH' },
  { pattern: /DSC INTERNATIONAL/i, curriculum: 'IB', confidence: 'HIGH' },
  { pattern: /INTERNATIONAL COLLEGE HONG KONG/i, curriculum: 'IB', confidence: 'HIGH' },

  // Other international
  { pattern: /FRENCH INTERNATIONAL/i, curriculum: 'OTHER_INTL', confidence: 'HIGH' },
  { pattern: /LYC.*FRANCAIS/i, curriculum: 'OTHER_INTL', confidence: 'HIGH' },
  { pattern: /JAPANESE INTERNATIONAL/i, curriculum: 'OTHER_INTL', confidence: 'HIGH' },
  { pattern: /KOREAN INTERNATIONAL/i, curriculum: 'OTHER_INTL', confidence: 'HIGH' },
  { pattern: /SINGAPORE INTERNATIONAL/i, curriculum: 'OTHER_INTL', confidence: 'HIGH' },
  { pattern: /NORWEGIAN INTERNATIONAL/i, curriculum: 'OTHER_INTL', confidence: 'HIGH' },
  { pattern: /YEW CHUNG INTERNATIONAL/i, curriculum: 'IB', confidence: 'HIGH' },
  { pattern: /CARMEL SCHOOL/i, curriculum: 'OTHER_INTL', confidence: 'HIGH' },

  // Dual-track schools (offer both local DSE and international)
  { pattern: /INDEPENDENT SCHOOLS FOUNDATION ACADEMY|弘立書院/i, curriculum: 'DUAL_TRACK', confidence: 'HIGH' },

  // Local DSE schools (資助/官立/直資 that are not international)
  // These will be handled separately
];

// Extract school data from schools.ts
function extractSchools(content) {
  const schools = [];
  const regex = /\{\s*"id":\s*"([^"]+)"[\s\S]*?"nameEn":\s*"([^"]+)"[\s\S]*?"name":\s*"([^"]+)"[\s\S]*?"level":\s*"([^"]+)"[\s\S]*?"category":\s*"([^"]+)"/g;

  let match;
  while ((match = regex.exec(content)) !== null) {
    schools.push({
      id: match[1],
      nameEn: match[2],
      name: match[3],
      level: match[4],
      category: match[5],
    });
  }
  return schools;
}

// Alternative extraction - more robust
function extractSchoolsRobust(content) {
  const schools = [];
  // Match each school object
  const schoolBlocks = content.match(/\{\s*"id":\s*"edb_[^}]+\}/g) || [];

  for (const block of schoolBlocks) {
    const idMatch = block.match(/"id":\s*"([^"]+)"/);
    const nameEnMatch = block.match(/"nameEn":\s*"([^"]+)"/);
    const nameMatch = block.match(/"name":\s*"([^"]+)"/);
    const levelMatch = block.match(/"level":\s*"([^"]+)"/);
    const categoryMatch = block.match(/"category":\s*"([^"]+)"/);

    if (idMatch && nameEnMatch) {
      schools.push({
        id: idMatch[1],
        nameEn: nameEnMatch[1],
        name: nameMatch ? nameMatch[1] : '',
        level: levelMatch ? levelMatch[1] : '',
        category: categoryMatch ? categoryMatch[1] : '',
      });
    }
  }
  return schools;
}

function main() {
  console.log('=== Generating Curriculum Mapping V1.2 ===\n');

  // Read schools.ts
  const schoolsContent = fs.readFileSync(SCHOOLS_FILE, 'utf-8');
  const schools = extractSchoolsRobust(schoolsContent);

  console.log(`Total schools found: ${schools.length}`);

  // Filter to Primary and Secondary only (exclude Kindergarten)
  const eligibleSchools = schools.filter(s => s.level === '小學' || s.level === '中學');
  console.log(`Eligible schools (Primary/Secondary): ${eligibleSchools.length}`);

  // Generate mappings
  const mappings = [];
  const matched = new Set();

  for (const school of eligibleSchools) {
    for (const rule of CURRICULUM_BY_SCHOOL_PATTERN) {
      if (rule.pattern.test(school.nameEn) || rule.pattern.test(school.name)) {
        // Avoid duplicates for same school
        const key = `${school.id}-${rule.curriculum}`;
        if (!matched.has(key)) {
          matched.add(key);
          mappings.push({
            school_id: school.id,
            school_name_en: school.nameEn,
            school_name_zh: school.name,
            stage: school.level,
            curriculums: rule.curriculum,
            confidence: rule.confidence,
            source: 'school website',
            reason: `Matched pattern: ${rule.pattern.source}`,
          });
        }
      }
    }
  }

  console.log(`Mappings generated: ${mappings.length}`);

  // Write CSV
  const header = 'school_id,school_name_en,school_name_zh,stage,curriculums,confidence,source,reason';
  const rows = mappings.map(m =>
    `${m.school_id},"${m.school_name_en.replace(/"/g, '""')}","${m.school_name_zh.replace(/"/g, '""')}",${m.stage},${m.curriculums},${m.confidence},${m.source},"${m.reason.replace(/"/g, '""')}"`
  );

  const csv = [header, ...rows].join('\n');
  fs.writeFileSync(OUTPUT_FILE, csv, 'utf-8');

  console.log(`\nWritten to: ${OUTPUT_FILE}`);
  console.log(`Total rows: ${mappings.length}`);

  // Summary by curriculum
  const summary = {};
  for (const m of mappings) {
    summary[m.curriculums] = (summary[m.curriculums] || 0) + 1;
  }
  console.log('\nBy curriculum:');
  for (const [curr, count] of Object.entries(summary).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${curr}: ${count}`);
  }
}

main();
