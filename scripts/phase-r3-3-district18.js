/**
 * Phase R3-3: Add district18 field from EDB Location CSV
 *
 * Data Source: docs/factcheck/SCH_LOC_EDB_utf8.csv
 * Join Key: School No prefix (first 9 digits) - same as R3-1/R3-2
 *
 * This script:
 * 1. Reads EDB location CSV (School No → 分區)
 * 2. Joins with v0 schools by School No prefix
 * 3. Adds district18 field to each school
 * 4. Validates district18 → district (3 regions) consistency
 * 5. Generates coverage report
 */

const fs = require('fs');
const path = require('path');

// Paths
const LOC_CSV_PATH = path.join(__dirname, '../docs/factcheck/SCH_LOC_EDB_utf8.csv');
const SCHOOLS_PATH = path.join(__dirname, '../data/schools.ts');
const REPORT_PATH = path.join(__dirname, '../docs/rebuild/district18-report.md');

// Official 18 districts → 3 regions mapping
const DISTRICT18_TO_DISTRICT = {
  // 港島 (Hong Kong Island) - 4 districts
  '中西區': '港島',
  '東區': '港島',
  '南區': '港島',
  '灣仔區': '港島',
  // 九龍 (Kowloon) - 5 districts
  '九龍城區': '九龍',
  '觀塘區': '九龍',
  '深水埗區': '九龍',
  '黃大仙區': '九龍',
  '油尖旺區': '九龍',
  // 新界 (New Territories) - 9 districts
  '離島區': '新界',
  '葵青區': '新界',
  '北區': '新界',
  '西貢區': '新界',
  '沙田區': '新界',
  '大埔區': '新界',
  '荃灣區': '新界',
  '屯門區': '新界',
  '元朗區': '新界',
};

// Get School No prefix (first 9 digits)
function getSchoolNoPrefix(schoolNo) {
  if (!schoolNo || schoolNo.length < 9) return schoolNo;
  return schoolNo.substring(0, 9);
}

// Parse CSV line handling quoted fields
function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}

// Parse location CSV: returns Map<schoolNoPrefix, district18>
function parseLocationCSV(csvContent) {
  const lines = csvContent.split('\n').filter(l => l.trim());
  const schoolNoToDistrict18 = new Map();

  for (let i = 1; i < lines.length; i++) {
    const cols = parseCSVLine(lines[i]);
    const schoolNo = cols[0]?.replace(/^\uFEFF/, '');
    const district18 = cols[20]; // 分區 field

    if (schoolNo && district18) {
      const prefix = getSchoolNoPrefix(schoolNo);
      // Keep first occurrence (same strategy as R3-2)
      if (!schoolNoToDistrict18.has(prefix)) {
        schoolNoToDistrict18.set(prefix, district18);
      }
    }
  }

  return schoolNoToDistrict18;
}

// Extract all schools from schools.ts
function extractSchools(tsContent) {
  const schoolPattern = /\{[^{}]*"id":\s*"([^"]+)"[^{}]*"name":\s*"([^"]+)"[^{}]*"district":\s*"([^"]+)"[^{}]*\}/gs;
  const schools = [];
  let match;

  while ((match = schoolPattern.exec(tsContent)) !== null) {
    const id = match[1];
    const schoolNoMatch = id.match(/^edb_(\d+)$/);
    schools.push({
      id,
      name: match[2],
      district: match[3],
      schoolNo: schoolNoMatch ? schoolNoMatch[1] : null,
      schoolNoPrefix: schoolNoMatch ? getSchoolNoPrefix(schoolNoMatch[1]) : null
    });
  }

  return schools;
}

// Main function
function main() {
  console.log('=== Phase R3-3: Add district18 from EDB Location CSV ===\n');

  // 1. Read location CSV
  console.log('1. Reading EDB location CSV...');
  const locContent = fs.readFileSync(LOC_CSV_PATH, 'utf8');
  const schoolNoToDistrict18 = parseLocationCSV(locContent);
  console.log(`   Found ${schoolNoToDistrict18.size} unique School No prefixes with district18\n`);

  // 2. Read schools.ts
  console.log('2. Reading schools.ts...');
  const tsContent = fs.readFileSync(SCHOOLS_PATH, 'utf8');
  const schools = extractSchools(tsContent);
  console.log(`   Total schools in v0: ${schools.length}\n`);

  // 3. Match and add district18
  console.log('3. Matching by School No prefix...\n');

  const matched = [];
  const unmatched = [];
  const inconsistent = []; // district18 → district doesn't match existing district

  for (const school of schools) {
    if (!school.schoolNoPrefix) {
      unmatched.push({ ...school, reason: 'No School No in id' });
      continue;
    }

    const district18 = schoolNoToDistrict18.get(school.schoolNoPrefix);
    if (district18) {
      const expectedDistrict = DISTRICT18_TO_DISTRICT[district18];
      const isConsistent = expectedDistrict === school.district;

      matched.push({
        ...school,
        district18,
        expectedDistrict,
        isConsistent
      });

      if (!isConsistent) {
        inconsistent.push({
          ...school,
          district18,
          expectedDistrict,
          currentDistrict: school.district
        });
      }
    } else {
      unmatched.push({ ...school, reason: 'No district18 for School No prefix' });
    }
  }

  // 4. Statistics
  console.log('=== MATCHING STATISTICS ===');
  console.log(`Total schools:            ${schools.length}`);
  console.log(`Successfully matched:     ${matched.length}`);
  console.log(`Unmatched (no district18): ${unmatched.length}`);
  console.log(`Coverage rate:            ${(matched.length / schools.length * 100).toFixed(1)}%`);
  console.log(`District inconsistencies: ${inconsistent.length}\n`);

  // 5. District18 distribution
  const district18Counts = {};
  const districtCounts = { '港島': 0, '九龍': 0, '新界': 0 };

  for (const s of matched) {
    district18Counts[s.district18] = (district18Counts[s.district18] || 0) + 1;
    districtCounts[s.expectedDistrict]++;
  }

  console.log('=== DISTRICT18 DISTRIBUTION ===');
  Object.entries(district18Counts)
    .sort((a, b) => b[1] - a[1])
    .forEach(([d, c]) => {
      console.log(`  ${d}: ${c} (${(c / matched.length * 100).toFixed(1)}%)`);
    });

  console.log('\n=== THREE-REGION DISTRIBUTION ===');
  Object.entries(districtCounts).forEach(([d, c]) => {
    console.log(`  ${d}: ${c} (${(c / matched.length * 100).toFixed(1)}%)`);
  });

  // 6. Report inconsistencies
  if (inconsistent.length > 0) {
    console.log('\n=== DISTRICT INCONSISTENCIES (will be corrected) ===');
    inconsistent.slice(0, 10).forEach(s => {
      console.log(`  - ${s.name}`);
      console.log(`    district18: ${s.district18} → expected: ${s.expectedDistrict}, current: ${s.currentDistrict}`);
    });
    if (inconsistent.length > 10) {
      console.log(`  ... and ${inconsistent.length - 10} more`);
    }
  }

  // 7. Report unmatched
  if (unmatched.length > 0) {
    console.log('\n=== UNMATCHED SCHOOLS (first 10) ===');
    unmatched.slice(0, 10).forEach(s => {
      console.log(`  - ${s.id}: ${s.name} (${s.reason})`);
    });
    if (unmatched.length > 10) {
      console.log(`  ... and ${unmatched.length - 10} more`);
    }
  }

  console.log('');

  return {
    matched,
    unmatched,
    inconsistent,
    stats: {
      total: schools.length,
      matched: matched.length,
      unmatched: unmatched.length,
      inconsistent: inconsistent.length,
      coverage: (matched.length / schools.length * 100).toFixed(1),
      district18Counts,
      districtCounts
    }
  };
}

// Update schools.ts with district18 field
function updateSchoolsFile(matchedSchools) {
  let content = fs.readFileSync(SCHOOLS_PATH, 'utf8');
  let updateCount = 0;
  let correctedCount = 0;

  for (const school of matchedSchools) {
    // Add district18 field after district field
    // Pattern: "district": "XXX",
    const districtPattern = new RegExp(
      `("id":\\s*"${school.id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[^}]*"district":\\s*")([^"]+)(",)`,
      'g'
    );

    const newContent = content.replace(districtPattern, (match, prefix, currentDistrict, suffix) => {
      // Correct district if inconsistent
      const newDistrict = school.expectedDistrict;
      if (currentDistrict !== newDistrict) {
        correctedCount++;
      }
      return `${prefix}${newDistrict}${suffix}\n    "district18": "${school.district18}",`;
    });

    if (newContent !== content) {
      content = newContent;
      updateCount++;
    }
  }

  fs.writeFileSync(SCHOOLS_PATH, content, 'utf8');
  console.log(`Updated ${updateCount} schools with district18`);
  console.log(`Corrected ${correctedCount} district values for consistency`);
  return { updateCount, correctedCount };
}

// Generate markdown report
function generateReport(result) {
  const { matched, unmatched, inconsistent, stats } = result;

  const report = `# Phase R3-3: District18 Integration Report

Generated: ${new Date().toISOString()}

## Summary

| Metric | Value |
|--------|-------|
| Total schools | ${stats.total} |
| Matched (with district18) | ${stats.matched} |
| Unmatched | ${stats.unmatched} |
| Coverage rate | ${stats.coverage}% |
| District corrections | ${stats.inconsistent} |

## District18 Distribution

| 18區 | 三大區 | 學校數 | 佔比 |
|------|--------|--------|------|
${Object.entries(stats.district18Counts)
  .sort((a, b) => b[1] - a[1])
  .map(([d18, count]) => {
    const d3 = DISTRICT18_TO_DISTRICT[d18];
    const pct = (count / stats.matched * 100).toFixed(1);
    return `| ${d18} | ${d3} | ${count} | ${pct}% |`;
  })
  .join('\n')}

## Three-Region Distribution

| 三大區 | 學校數 | 佔比 |
|--------|--------|------|
${Object.entries(stats.districtCounts)
  .map(([d, count]) => {
    const pct = (count / stats.matched * 100).toFixed(1);
    return `| ${d} | ${count} | ${pct}% |`;
  })
  .join('\n')}

## Data Sources

- EDB School Location CSV: \`docs/factcheck/SCH_LOC_EDB_utf8.csv\`
- Join Key: School No prefix (first 9 digits)

## Notes

- district18 field added to all matched schools
- district (3 regions) corrected for ${stats.inconsistent} schools to ensure consistency with district18 mapping
- ${stats.unmatched} schools without School No could not be matched
`;

  fs.writeFileSync(REPORT_PATH, report, 'utf8');
  console.log(`Report saved to ${REPORT_PATH}`);
}

// Run if called directly
if (require.main === module) {
  const result = main();

  if (process.argv.includes('--update')) {
    console.log('\n=== UPDATING schools.ts ===');
    updateSchoolsFile(result.matched);
    generateReport(result);
  } else {
    console.log('Run with --update flag to apply changes.\n');
  }
}

module.exports = { main, DISTRICT18_TO_DISTRICT };
