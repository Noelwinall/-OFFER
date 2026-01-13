/**
 * Phase R3-2: DSS School Fee Data Integration
 *
 * Data Sources:
 * 1. EDB DSS School Fee CSV (2025/26)
 *    URL: https://www.edb.gov.hk/attachment/datagovhk/DSS_School_Fee_TC.csv
 * 2. EDB School Location CSV (for School No mapping)
 *    URL: http://www.edb.gov.hk/attachment/en/student-parents/sch-info/sch-search/sch-location-info/SCH_LOC_EDB.csv
 *
 * Join Strategy:
 * - DSS fee CSV has no School No (only simple serial numbers 1, 2, 3...)
 * - Use school name to bridge: fee CSV (name→fee) + location CSV (name→schoolNo)
 * - Final join key: School No (12-digit EDB code)
 * - v0 id format: edb_{schoolNo}
 *
 * This script:
 * 1. Reads EDB DSS fee CSV (name → fee data)
 * 2. Reads EDB location CSV (name → School No)
 * 3. Builds School No → fee mapping via name bridge
 * 4. Updates v0 schools.ts using School No as join key
 * 5. Only updates DSS schools (category === "直資")
 */

const fs = require('fs');
const path = require('path');

// Paths
const FEE_CSV_PATH = path.join(__dirname, '../docs/factcheck/dss-school-fee-2025-26-tc.csv');
const LOC_CSV_PATH = path.join(__dirname, '../docs/factcheck/SCH_LOC_EDB_utf8.csv');
const SCHOOLS_PATH = path.join(__dirname, '../data/schools.ts');

// Normalize school name for matching
function normalizeName(name) {
  if (!name) return '';
  return name
    .trim()
    .replace(/﹝/g, '(')
    .replace(/﹞/g, ')')
    .replace(/（/g, '(')
    .replace(/）/g, ')')
    .replace(/\s+/g, '')
    .replace(/[「」『』]/g, '"');
}

// Known name mappings for schools with different official names
// Maps: short name (fee CSV) → long name (location CSV)
const FEE_TO_LOC_NAME_MAPPINGS = {
  '香港兆基創意書院': '香港兆基創意書院(李兆基基金會贊助、香港當代文化中心主辦)',
};

// Maps: v0 name → fee CSV name (for matching v0 schools to fee data)
const NAME_MAPPINGS = {
  '香港兆基創意書院(李兆基基金會贊助、香港當代文化中心主辦)': '香港兆基創意書院',
};

// Parse DSS fee CSV: returns Map<normalizedName, {entries: [], rawName}>
function parseFeeCSV(csvContent) {
  const lines = csvContent.split('\n').filter(l => l.trim());
  const schools = new Map();

  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(',');
    if (cols.length < 7) continue;

    const rawName = cols[1];
    const level = cols[2];
    const grade = cols[3];
    const feeType = cols[4];
    const minFee = parseInt(cols[5], 10) || 0;
    const maxFee = parseInt(cols[6], 10) || 0;

    // Skip dormitory fees (宿費)
    if (grade === '宿費') continue;

    const normalizedName = normalizeName(rawName);

    if (!schools.has(normalizedName)) {
      schools.set(normalizedName, {
        rawName,
        level,
        entries: []
      });
    }

    schools.get(normalizedName).entries.push({
      grade,
      feeType,
      minFee,
      maxFee
    });
  }

  return schools;
}

// Get School No prefix (first 9 digits) - this is the stable part
// Last 3 digits are type/batch codes that may differ between records
function getSchoolNoPrefix(schoolNo) {
  if (!schoolNo || schoolNo.length < 9) return schoolNo;
  return schoolNo.substring(0, 9);
}

// Parse location CSV: returns Map<normalizedName, schoolNoPrefix>
// We use the prefix (first 9 digits) as the stable identifier
function parseLocationCSV(csvContent) {
  const lines = csvContent.split('\n').filter(l => l.trim());
  const nameToSchoolNoPrefix = new Map();

  for (let i = 1; i < lines.length; i++) {
    // Handle CSV with quoted fields
    const line = lines[i];
    const schoolNo = line.split(',')[0].replace(/^\uFEFF/, '');
    const schoolNoPrefix = getSchoolNoPrefix(schoolNo);

    // Find Chinese name (5th field, 0-indexed: 4)
    // CSV format: SCHOOL NO.,ENGLISH CATEGORY,中文類別,ENGLISH NAME,中文名稱,...
    const match = line.match(/^([^,]+),([^,]+),([^,]+),([^,]+|"[^"]*"),([^,]+)/);
    if (match) {
      const chineseName = match[5];
      const normalizedName = normalizeName(chineseName);

      // Store mapping by prefix (may have duplicates, keep first)
      if (!nameToSchoolNoPrefix.has(normalizedName)) {
        nameToSchoolNoPrefix.set(normalizedName, schoolNoPrefix);
      }
    }
  }

  return nameToSchoolNoPrefix;
}

// Calculate tuition filtered by school level
function calculateTuition(entries, schoolLevel) {
  let filtered = entries;

  if (schoolLevel === '小學') {
    filtered = entries.filter(e => e.grade.startsWith('P'));
  } else if (schoolLevel === '中學') {
    filtered = entries.filter(e => e.grade.startsWith('S'));
  }

  if (filtered.length === 0) {
    filtered = entries;
  }

  if (filtered.length === 0) return { min: 0, max: 0 };

  const allMins = filtered.map(e => e.minFee);
  const allMaxs = filtered.map(e => e.maxFee);

  return {
    min: Math.min(...allMins),
    max: Math.max(...allMaxs)
  };
}

// Extract DSS schools from schools.ts
function extractDSSSchools(tsContent) {
  const schoolPattern = /\{[^{}]*"id":\s*"([^"]+)"[^{}]*"name":\s*"([^"]+)"[^{}]*"category":\s*"([^"]+)"[^{}]*"level":\s*"([^"]+)"[^{}]*\}/gs;
  const schools = [];
  let match;

  while ((match = schoolPattern.exec(tsContent)) !== null) {
    if (match[3] === '直資') {
      const id = match[1];
      // Extract School No from id (format: edb_{schoolNo})
      const schoolNoMatch = id.match(/^edb_(\d+)$/);
      schools.push({
        id,
        name: match[2],
        level: match[4],
        schoolNo: schoolNoMatch ? schoolNoMatch[1] : null,
        normalizedName: normalizeName(match[2])
      });
    }
  }

  return schools;
}

// Main function
function main() {
  console.log('=== Phase R3-2: DSS School Fee Integration (School No Join) ===\n');

  // 1. Read and parse fee CSV
  console.log('1. Reading EDB DSS fee CSV...');
  const feeContent = fs.readFileSync(FEE_CSV_PATH, 'utf8');
  const feeData = parseFeeCSV(feeContent);
  console.log(`   Found ${feeData.size} unique schools in fee CSV\n`);

  // 2. Read and parse location CSV for name → schoolNoPrefix mapping
  console.log('2. Reading EDB location CSV for School No prefix mapping...');
  const locContent = fs.readFileSync(LOC_CSV_PATH, 'utf8');
  const nameToSchoolNoPrefix = parseLocationCSV(locContent);
  console.log(`   Found ${nameToSchoolNoPrefix.size} unique school names in location CSV\n`);

  // 3. Build School No Prefix → Fee mapping via name bridge
  console.log('3. Building School No Prefix → Fee mapping via name bridge...');
  const schoolNoPrefixToFee = new Map();
  const unmappedFeeSchools = [];

  for (const [normalizedName, data] of feeData) {
    let schoolNoPrefix = nameToSchoolNoPrefix.get(normalizedName);

    // Try alternative name mapping (fee CSV short name → location CSV long name)
    if (!schoolNoPrefix) {
      const altName = FEE_TO_LOC_NAME_MAPPINGS[data.rawName];
      if (altName) {
        schoolNoPrefix = nameToSchoolNoPrefix.get(normalizeName(altName));
      }
    }

    if (schoolNoPrefix) {
      schoolNoPrefixToFee.set(schoolNoPrefix, {
        ...data,
        schoolNoPrefix
      });
    } else {
      unmappedFeeSchools.push(data.rawName);
    }
  }
  console.log(`   Mapped ${schoolNoPrefixToFee.size} schools (School No prefix found)`);
  if (unmappedFeeSchools.length > 0) {
    console.log(`   ⚠️ ${unmappedFeeSchools.length} fee schools without School No mapping:`);
    unmappedFeeSchools.forEach(n => console.log(`      - ${n}`));
  }
  console.log('');

  // 4. Read schools.ts and find DSS schools
  console.log('4. Reading schools.ts...');
  const tsContent = fs.readFileSync(SCHOOLS_PATH, 'utf8');
  const dssSchools = extractDSSSchools(tsContent);
  console.log(`   DSS schools in v0: ${dssSchools.length}\n`);

  // 5. Match using School No prefix as join key
  console.log('5. Matching by School No prefix (first 9 digits)...\n');

  const matched = [];
  const unmatchedV0 = [];

  for (const school of dssSchools) {
    if (!school.schoolNo) {
      unmatchedV0.push({ ...school, reason: 'No School No in id' });
      continue;
    }

    const v0Prefix = getSchoolNoPrefix(school.schoolNo);
    let feeInfo = schoolNoPrefixToFee.get(v0Prefix);

    // Try alternative name mapping if no direct match
    if (!feeInfo) {
      const mappedName = NAME_MAPPINGS[school.name];
      if (mappedName) {
        const altNormalized = normalizeName(mappedName);
        const altPrefix = nameToSchoolNoPrefix.get(altNormalized);
        if (altPrefix) {
          feeInfo = schoolNoPrefixToFee.get(altPrefix);
        }
      }
    }

    if (feeInfo) {
      const tuition = calculateTuition(feeInfo.entries, school.level);
      matched.push({
        ...school,
        v0SchoolNoPrefix: v0Prefix,
        feeSchoolNoPrefix: feeInfo.schoolNoPrefix,
        csvName: feeInfo.rawName,
        tuitionMin: tuition.min,
        tuitionMax: tuition.max,
        entries: feeInfo.entries.filter(e =>
          school.level === '小學' ? e.grade.startsWith('P') :
          school.level === '中學' ? e.grade.startsWith('S') : true
        )
      });
    } else {
      unmatchedV0.push({ ...school, reason: `No fee data for School No prefix ${v0Prefix}` });
    }
  }

  // Print statistics
  console.log('=== MATCHING STATISTICS (School No Join) ===');
  console.log(`DSS schools in v0:        ${dssSchools.length}`);
  console.log(`Successfully matched:     ${matched.length}`);
  console.log(`Unmatched:                ${unmatchedV0.length}`);
  console.log(`Match rate:               ${(matched.length / dssSchools.length * 100).toFixed(1)}%\n`);

  // Print unmatched schools
  if (unmatchedV0.length > 0) {
    console.log('=== UNMATCHED SCHOOLS ===');
    unmatchedV0.forEach(s => {
      console.log(`  - ${s.id}: ${s.name} (${s.level})`);
      console.log(`    Reason: ${s.reason}`);
    });
    console.log('');
  }

  // Sample verification
  console.log('=== SAMPLE VERIFICATION (first 5 matched) ===');
  matched.slice(0, 5).forEach(s => {
    console.log(`\nSchool: ${s.name}`);
    console.log(`  v0 ID: ${s.id}`);
    console.log(`  School No prefix (v0): ${s.v0SchoolNoPrefix}`);
    console.log(`  School No prefix (fee): ${s.feeSchoolNoPrefix}`);
    console.log(`  Prefix match: ${s.v0SchoolNoPrefix === s.feeSchoolNoPrefix ? '✓' : '✗'}`);
    console.log(`  Level: ${s.level}`);
    console.log(`  Fee entries:`);
    s.entries.forEach(e => {
      console.log(`    - ${e.grade}: $${e.minFee} - $${e.maxFee} (${e.feeType})`);
    });
    console.log(`  → tuitionMin: ${s.tuitionMin}, tuitionMax: ${s.tuitionMax}`);
  });
  console.log('');

  return {
    matched,
    unmatched: unmatchedV0,
    stats: {
      totalDSS: dssSchools.length,
      matched: matched.length,
      unmatched: unmatchedV0.length,
      matchRate: (matched.length / dssSchools.length * 100).toFixed(1)
    }
  };
}

// Update schools.ts with matched fee data
function updateSchoolsFile(matchedSchools) {
  let content = fs.readFileSync(SCHOOLS_PATH, 'utf8');
  let updateCount = 0;

  for (const school of matchedSchools) {
    // Match by School No in id
    const idPattern = new RegExp(
      `("id":\\s*"${school.id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[^}]*"tuitionMin":\\s*)\\d+(,\\s*"tuitionMax":\\s*)\\d+`,
      'g'
    );

    const newContent = content.replace(idPattern, `$1${school.tuitionMin}$2${school.tuitionMax}`);

    if (newContent !== content) {
      content = newContent;
      updateCount++;
    }
  }

  fs.writeFileSync(SCHOOLS_PATH, content, 'utf8');
  console.log(`Updated ${updateCount} schools in schools.ts`);
  return updateCount;
}

// Run if called directly
if (require.main === module) {
  const result = main();

  if (result.stats.matchRate < 100) {
    console.log('⚠️  Some schools did not match. Review the unmatched list above.');
    console.log('   Run with --update flag to apply matched schools only.\n');
  }

  if (process.argv.includes('--update')) {
    if (result.matched.length === result.stats.totalDSS) {
      console.log('=== UPDATING schools.ts (100% match via School No) ===');
      updateSchoolsFile(result.matched);
    } else {
      console.log('⚠️  Not updating: Match rate is not 100%');
      console.log('   Fix unmatched schools first, or use --force-update to proceed anyway.\n');
    }
  }

  if (process.argv.includes('--force-update')) {
    console.log('=== FORCE UPDATING schools.ts ===');
    updateSchoolsFile(result.matched);
  }
}

module.exports = { main, parseFeeCSV, parseLocationCSV, calculateTuition };
