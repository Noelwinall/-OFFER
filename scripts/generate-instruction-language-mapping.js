/**
 * Generate Instruction Language Mapping V1 - CHSC CSV Only
 *
 * STRICT: Only assigns instruction language from CHSC CSV fields.
 * NO inference from school type/category/group/name/tuition.
 *
 * Sources:
 * - data/psp_2025_en.csv (Primary EN) -> medium_of_instruction
 * - data/psp_2025_tc.csv (Primary TC) -> 教學語言
 * - data/ssp_2025_2026_en.csv (Secondary EN) -> language_policy
 * - data/ssp_2025_2026_tc.csv (Secondary TC) -> 全校語文政策
 *
 * Matching strategy:
 * 1. Try English name + district match
 * 2. Try Chinese name match from TC CSV
 */

const fs = require('fs');
const path = require('path');

const PRIMARY_EN_CSV = path.join(__dirname, '..', 'data', 'psp_2025_en.csv');
const PRIMARY_TC_CSV = path.join(__dirname, '..', 'data', 'psp_2025_tc.csv');
const SECONDARY_EN_CSV = path.join(__dirname, '..', 'data', 'ssp_2025_2026_en.csv');
const SECONDARY_TC_CSV = path.join(__dirname, '..', 'data', 'ssp_2025_2026_tc.csv');
const SCHOOLS_FILE = path.join(__dirname, '..', 'data', 'schools.ts');
const OUTPUT_FILE = path.join(__dirname, '..', 'data', 'instruction_language_mapping_v1.csv');
const NEEDS_REVIEW_FILE = path.join(__dirname, '..', 'data', 'instruction_language_needs_review_v1.csv');

/**
 * Parse CSV with proper handling of quoted fields
 */
function parseCSV(content) {
  const lines = content.split('\n');
  const headers = parseCSVLine(lines[0]);
  const rows = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const values = parseCSVLine(line);
    const row = {};
    headers.forEach((h, idx) => {
      row[h.trim()] = values[idx]?.trim() || '';
    });
    rows.push(row);
  }

  return rows;
}

function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
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

/**
 * Normalize school name for matching (English)
 */
function normalizeNameEn(name) {
  return name
    .toLowerCase()
    .replace(/['']/g, "'")
    .replace(/[""]/g, '"')
    .replace(/\s+/g, ' ')
    .replace(/[^\w\s'"-]/g, '')
    .trim();
}

/**
 * Normalize Chinese name for matching
 */
function normalizeNameCn(name) {
  return name
    .replace(/\s+/g, '')
    .replace(/（/g, '(')
    .replace(/）/g, ')')
    .trim();
}

/**
 * Parse medium_of_instruction from primary school CSV (English)
 */
function parsePrimaryMOI_EN(moi) {
  if (!moi) return [];
  const languages = [];
  const moiLower = moi.toLowerCase();

  if (moiLower.includes('english')) languages.push('ENGLISH');
  if (moiLower.includes('putonghua')) {
    languages.push('PUTONGHUA');
    if (moiLower.includes('chinese')) languages.push('CANTONESE');
  } else if (moiLower.includes('chinese')) {
    languages.push('CANTONESE');
  }

  return [...new Set(languages)];
}

/**
 * Parse 教學語言 from primary school CSV (TC)
 */
function parsePrimaryMOI_TC(moi) {
  if (!moi) return [];
  const languages = [];

  if (moi.includes('英文') || moi.includes('英語')) languages.push('ENGLISH');
  if (moi.includes('普通話')) {
    languages.push('PUTONGHUA');
    if (moi.includes('中文')) languages.push('CANTONESE');
  } else if (moi.includes('中文')) {
    languages.push('CANTONESE');
  }

  return [...new Set(languages)];
}

/**
 * Parse language_policy from secondary school CSV (English)
 */
function parseSecondaryMOI_EN(policy) {
  if (!policy) return [];
  const languages = [];
  const policyLower = policy.toLowerCase();

  const englishIndicators = [
    'english is the official medium of instruction',
    'english is the medium of instruction',
    'english has been adopted as the medium of instruction',
    'english is used as the medium of instruction',
    'using english as the medium of instruction'
  ];

  for (const indicator of englishIndicators) {
    if (policyLower.includes(indicator)) {
      languages.push('ENGLISH');
      break;
    }
  }

  const chineseIndicators = [
    'chinese is the medium of instruction',
    'using chinese as the medium of instruction'
  ];

  for (const indicator of chineseIndicators) {
    if (policyLower.includes(indicator)) {
      languages.push('CANTONESE');
      break;
    }
  }

  if (policyLower.includes('putonghua') &&
      (policyLower.includes('teaching') || policyLower.includes('instruction'))) {
    languages.push('PUTONGHUA');
  }

  return [...new Set(languages)];
}

/**
 * Parse 全校語文政策 from secondary school CSV (TC)
 */
function parseSecondaryMOI_TC(policy) {
  if (!policy) return [];
  const languages = [];

  // Check for English medium indicators
  const englishIndicators = [
    '以英語授課',
    '英語教學',
    '英文為教學語言',
    '以英文為教學語言',
    '所有科目均以英語授課',
    '英語為主要教學語言'
  ];

  for (const indicator of englishIndicators) {
    if (policy.includes(indicator)) {
      languages.push('ENGLISH');
      break;
    }
  }

  // Check for Chinese medium indicators
  const chineseIndicators = [
    '以中文為教學語言',
    '中文為教學語言',
    '以母語教學'
  ];

  for (const indicator of chineseIndicators) {
    if (policy.includes(indicator)) {
      languages.push('CANTONESE');
      break;
    }
  }

  // Check for Putonghua
  if (policy.includes('普通話') && (policy.includes('教授') || policy.includes('教學'))) {
    languages.push('PUTONGHUA');
  }

  return [...new Set(languages)];
}

/**
 * Extract schools from schools.ts
 */
function extractSchools(content) {
  const schools = [];
  const schoolRegex = /\{\s*"id":\s*"(edb_[^"]+)"[\s\S]*?"nameEn":\s*"([^"]+)"[\s\S]*?"name":\s*"([^"]+)"[\s\S]*?"level":\s*"([^"]+)"[\s\S]*?"district18":\s*"([^"]+)"/g;

  let match;
  while ((match = schoolRegex.exec(content)) !== null) {
    schools.push({
      id: match[1],
      nameEn: match[2],
      name: match[3],
      level: match[4],
      district18: match[5],
    });
  }
  return schools;
}

/**
 * Map district18 to CHSC district names (English)
 */
function mapDistrictToEn(district18) {
  const mapping = {
    '中西區': 'Central & Western',
    '東區': 'Eastern',
    '南區': 'Southern',
    '灣仔區': 'Wan Chai',
    '九龍城區': 'Kowloon City',
    '觀塘區': 'Kwun Tong',
    '深水埗區': 'Sham Shui Po',
    '黃大仙區': 'Wong Tai Sin',
    '油尖旺區': 'Yau Tsim Mong',
    '離島區': 'Islands',
    '葵青區': 'Kwai Tsing',
    '北區': 'North',
    '西貢區': 'Sai Kung',
    '沙田區': 'Sha Tin',
    '大埔區': 'Tai Po',
    '荃灣區': 'Tsuen Wan',
    '屯門區': 'Tuen Mun',
    '元朗區': 'Yuen Long',
  };
  return mapping[district18] || '';
}

/**
 * Map district18 to CHSC district names (TC - without 區)
 */
function mapDistrictToTc(district18) {
  // TC CSV uses district without 區 suffix
  return district18.replace('區', '');
}

function main() {
  console.log('=== Generating Instruction Language Mapping V1 (CHSC CSV - EN + TC) ===\n');

  // Check CSV files exist
  const csvFiles = [PRIMARY_EN_CSV, PRIMARY_TC_CSV, SECONDARY_EN_CSV, SECONDARY_TC_CSV];
  for (const file of csvFiles) {
    if (!fs.existsSync(file)) {
      console.error('ERROR: CSV not found:', file);
      process.exit(1);
    }
  }

  // Read and parse CSV files
  const primaryEnRows = parseCSV(fs.readFileSync(PRIMARY_EN_CSV, 'utf-8'));
  const primaryTcRows = parseCSV(fs.readFileSync(PRIMARY_TC_CSV, 'utf-8'));
  const secondaryEnRows = parseCSV(fs.readFileSync(SECONDARY_EN_CSV, 'utf-8'));
  const secondaryTcRows = parseCSV(fs.readFileSync(SECONDARY_TC_CSV, 'utf-8'));

  console.log(`Primary EN CSV: ${primaryEnRows.length} rows`);
  console.log(`Primary TC CSV: ${primaryTcRows.length} rows`);
  console.log(`Secondary EN CSV: ${secondaryEnRows.length} rows`);
  console.log(`Secondary TC CSV: ${secondaryTcRows.length} rows`);

  // Build lookup maps
  // Primary EN: normalized(school_name)|district -> moi
  const primaryEnMap = new Map();
  for (const row of primaryEnRows) {
    const name = normalizeNameEn(row.school_name || '');
    const district = (row.district || '').toLowerCase();
    const moi = parsePrimaryMOI_EN(row.medium_of_instruction || '');
    if (name && moi.length > 0) {
      primaryEnMap.set(`${name}|${district}`, { moi, source: 'CHSC primary EN' });
    }
  }

  // Primary TC: normalized(學校名稱) -> moi
  const primaryTcMap = new Map();
  for (const row of primaryTcRows) {
    const name = normalizeNameCn(row['學校名稱'] || row['\ufeff學校名稱'] || '');
    const moi = parsePrimaryMOI_TC(row['教學語言'] || '');
    if (name && moi.length > 0) {
      primaryTcMap.set(name, { moi, source: 'CHSC primary TC' });
    }
  }

  // Secondary EN: normalized(school_name)|district -> moi
  const secondaryEnMap = new Map();
  for (const row of secondaryEnRows) {
    const name = normalizeNameEn(row.school_name || '');
    const district = (row.district || '').toLowerCase();
    const moi = parseSecondaryMOI_EN(row.language_policy || '');
    if (name) {
      secondaryEnMap.set(`${name}|${district}`, { moi, source: 'CHSC secondary EN' });
    }
  }

  // Secondary TC: normalized(學校名稱) -> moi
  const secondaryTcMap = new Map();
  for (const row of secondaryTcRows) {
    const name = normalizeNameCn(row['學校名稱'] || row['\ufeff學校名稱'] || '');
    const moi = parseSecondaryMOI_TC(row['全校語文政策'] || '');
    if (name) {
      secondaryTcMap.set(name, { moi, source: 'CHSC secondary TC' });
    }
  }

  console.log(`\nPrimary EN map: ${primaryEnMap.size} with MOI`);
  console.log(`Primary TC map: ${primaryTcMap.size} with MOI`);
  console.log(`Secondary EN map: ${secondaryEnMap.size} entries`);
  console.log(`Secondary TC map: ${secondaryTcMap.size} entries`);

  // Read schools.ts
  const schoolsContent = fs.readFileSync(SCHOOLS_FILE, 'utf-8');
  const schools = extractSchools(schoolsContent);

  console.log(`\nTotal schools in schools.ts: ${schools.length}`);

  const eligibleSchools = schools.filter(s => s.level === '小學' || s.level === '中學');
  console.log(`Eligible schools (Primary/Secondary): ${eligibleSchools.length}`);

  const mappings = [];
  const needsReview = [];
  const processed = new Set();

  for (const school of eligibleSchools) {
    if (processed.has(school.id)) continue;
    processed.add(school.id);

    const normalizedNameEn = normalizeNameEn(school.nameEn);
    const normalizedNameCn = normalizeNameCn(school.name);
    const mappedDistrictEn = mapDistrictToEn(school.district18);
    const lookupKeyEn = `${normalizedNameEn}|${mappedDistrictEn.toLowerCase()}`;

    let found = false;
    let csvData = null;

    if (school.level === '小學') {
      // Try EN exact match
      if (primaryEnMap.has(lookupKeyEn)) {
        csvData = primaryEnMap.get(lookupKeyEn);
        found = true;
      }
      // Try EN name-only match
      if (!found) {
        for (const [key, data] of primaryEnMap) {
          if (key.startsWith(normalizedNameEn + '|')) {
            csvData = data;
            found = true;
            break;
          }
        }
      }
      // Try TC name match
      if (!found && primaryTcMap.has(normalizedNameCn)) {
        csvData = primaryTcMap.get(normalizedNameCn);
        found = true;
      }
    } else if (school.level === '中學') {
      // Try EN exact match
      if (secondaryEnMap.has(lookupKeyEn)) {
        const data = secondaryEnMap.get(lookupKeyEn);
        if (data.moi.length > 0) {
          csvData = data;
          found = true;
        }
      }
      // Try EN name-only match
      if (!found) {
        for (const [key, data] of secondaryEnMap) {
          if (key.startsWith(normalizedNameEn + '|') && data.moi.length > 0) {
            csvData = data;
            found = true;
            break;
          }
        }
      }
      // Try TC name match
      if (!found && secondaryTcMap.has(normalizedNameCn)) {
        const data = secondaryTcMap.get(normalizedNameCn);
        if (data.moi.length > 0) {
          csvData = data;
          found = true;
        }
      }
    }

    if (found && csvData && csvData.moi && csvData.moi.length > 0) {
      mappings.push({
        school_id: school.id,
        stage: school.level,
        instruction_languages: csvData.moi.join('|'),
        confidence: 'HIGH',
        source: csvData.source,
      });
    } else {
      needsReview.push({
        school_id: school.id,
        stage: school.level,
        reason: found ? 'CHSC match but no MOI field parsed' : 'No CHSC match',
        candidate_info: `${school.nameEn} | ${school.name} | ${school.district18}`,
      });
    }
  }

  console.log(`\nMappings generated (HIGH confidence): ${mappings.length}`);
  console.log(`Needs review: ${needsReview.length}`);

  // Write mapping CSV
  const mappingHeader = 'school_id,stage,instruction_languages,confidence,source';
  const mappingRows = mappings.map(m =>
    `${m.school_id},${m.stage},${m.instruction_languages},${m.confidence},"${m.source}"`
  );
  fs.writeFileSync(OUTPUT_FILE, [mappingHeader, ...mappingRows].join('\n'), 'utf-8');
  console.log(`\nWritten mappings to: ${OUTPUT_FILE}`);

  // Write needs_review CSV
  const reviewHeader = 'school_id,stage,reason,candidate_info';
  const reviewRows = needsReview.map(r =>
    `${r.school_id},${r.stage},"${r.reason.replace(/"/g, '""')}","${r.candidate_info.replace(/"/g, '""')}"`
  );
  fs.writeFileSync(NEEDS_REVIEW_FILE, [reviewHeader, ...reviewRows].join('\n'), 'utf-8');
  console.log(`Written needs_review to: ${NEEDS_REVIEW_FILE}`);

  // Summary by language
  const summary = {};
  for (const m of mappings) {
    const langs = m.instruction_languages;
    summary[langs] = (summary[langs] || 0) + 1;
  }
  console.log('\nBy instruction language combination:');
  for (const [langs, count] of Object.entries(summary).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${langs}: ${count}`);
  }

  // Summary by source
  const sourceStats = {};
  for (const m of mappings) {
    sourceStats[m.source] = (sourceStats[m.source] || 0) + 1;
  }
  console.log('\nBy source:');
  for (const [src, count] of Object.entries(sourceStats).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${src}: ${count}`);
  }
}

main();
