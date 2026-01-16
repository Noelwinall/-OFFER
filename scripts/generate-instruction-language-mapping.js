/**
 * Generate Instruction Language Mapping V1 - CHSC CSV Only
 *
 * STRICT: Only assigns instruction language from CHSC CSV fields.
 * NO inference from school type/category/group/name/tuition.
 *
 * Sources:
 * - data/psp_2025_en.csv (Primary schools) -> medium_of_instruction column
 * - data/ssp_2025_2026_en.csv (Secondary schools) -> language_policy column
 */

const fs = require('fs');
const path = require('path');

const PRIMARY_CSV = path.join(__dirname, '..', 'data', 'psp_2025_en.csv');
const SECONDARY_CSV = path.join(__dirname, '..', 'data', 'ssp_2025_2026_en.csv');
const SCHOOLS_FILE = path.join(__dirname, '..', 'data', 'schools.ts');
const OUTPUT_FILE = path.join(__dirname, '..', 'data', 'instruction_language_mapping_v1.csv');
const NEEDS_REVIEW_FILE = path.join(__dirname, '..', 'data', 'instruction_language_needs_review_v1.csv');

// Valid instruction language values
const VALID_LANGUAGES = [
  'ENGLISH',
  'CANTONESE',
  'PUTONGHUA',
  'FRENCH',
  'GERMAN',
  'JAPANESE',
  'KOREAN'
];

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

/**
 * Parse a single CSV line handling quoted fields
 */
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
 * Normalize school name for matching
 */
function normalizeName(name) {
  return name
    .toLowerCase()
    .replace(/['']/g, "'")
    .replace(/[""]/g, '"')
    .replace(/\s+/g, ' ')
    .replace(/[^\w\s'"-]/g, '')
    .trim();
}

/**
 * Parse medium_of_instruction from primary school CSV
 * Returns array of InstructionLanguage values
 */
function parsePrimaryMOI(moi) {
  if (!moi) return [];

  const languages = [];
  const moiLower = moi.toLowerCase();

  // Check for English
  if (moiLower.includes('english')) {
    languages.push('ENGLISH');
  }

  // Check for Chinese/Cantonese
  if (moiLower.includes('chinese') && !moiLower.includes('putonghua')) {
    languages.push('CANTONESE');
  }

  // Check for Putonghua
  if (moiLower.includes('putonghua')) {
    languages.push('PUTONGHUA');
    // If it says "Chinese(incl.: Putonghua)", also add Cantonese
    if (moiLower.includes('chinese')) {
      languages.push('CANTONESE');
    }
  }

  // If only "Chinese" without more specific info, assume Cantonese
  if (moiLower === 'chinese') {
    return ['CANTONESE'];
  }

  return [...new Set(languages)];
}

/**
 * Parse language_policy from secondary school CSV
 * Returns array of InstructionLanguage values
 */
function parseSecondaryMOI(languagePolicy) {
  if (!languagePolicy) return [];

  const languages = [];
  const policyLower = languagePolicy.toLowerCase();

  // Strong indicators of English medium
  const englishIndicators = [
    'english is the official medium of instruction',
    'english is the medium of instruction',
    'english has been adopted as the medium of instruction',
    'english is used as the medium of instruction',
    'english medium',
    'emi school',
    'using english as the medium of instruction'
  ];

  for (const indicator of englishIndicators) {
    if (policyLower.includes(indicator)) {
      languages.push('ENGLISH');
      break;
    }
  }

  // Check for Chinese medium indicators
  const chineseIndicators = [
    'chinese is the medium of instruction',
    'chinese medium',
    'cmi school',
    'using chinese as the medium of instruction'
  ];

  for (const indicator of chineseIndicators) {
    if (policyLower.includes(indicator)) {
      languages.push('CANTONESE');
      break;
    }
  }

  // Check for Putonghua
  if (policyLower.includes('putonghua') &&
      (policyLower.includes('teaching') || policyLower.includes('instruction') || policyLower.includes('medium'))) {
    languages.push('PUTONGHUA');
  }

  return [...new Set(languages)];
}

/**
 * Extract schools from schools.ts
 */
function extractSchools(content) {
  const schools = [];
  // Match school objects more carefully
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
 * Map district18 to CHSC district names
 */
function mapDistrict(district18) {
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

function main() {
  console.log('=== Generating Instruction Language Mapping V1 (CHSC CSV Only) ===\n');

  // Check CSV files exist
  if (!fs.existsSync(PRIMARY_CSV)) {
    console.error('ERROR: Primary CSV not found:', PRIMARY_CSV);
    process.exit(1);
  }
  if (!fs.existsSync(SECONDARY_CSV)) {
    console.error('ERROR: Secondary CSV not found:', SECONDARY_CSV);
    process.exit(1);
  }

  // Read and parse CSV files
  const primaryContent = fs.readFileSync(PRIMARY_CSV, 'utf-8');
  const secondaryContent = fs.readFileSync(SECONDARY_CSV, 'utf-8');

  const primaryRows = parseCSV(primaryContent);
  const secondaryRows = parseCSV(secondaryContent);

  console.log(`Primary schools in CSV: ${primaryRows.length}`);
  console.log(`Secondary schools in CSV: ${secondaryRows.length}`);

  // Build lookup maps from CSV data
  // Key: normalized(school_name) -> { district, moi[] }
  const csvPrimaryMap = new Map();
  const csvSecondaryMap = new Map();

  for (const row of primaryRows) {
    const name = normalizeName(row.school_name || '');
    const district = (row.district || '').trim();
    const moi = parsePrimaryMOI(row.medium_of_instruction || '');

    if (name && moi.length > 0) {
      const key = `${name}|${district.toLowerCase()}`;
      csvPrimaryMap.set(key, { district, moi, rawMOI: row.medium_of_instruction });
    }
  }

  for (const row of secondaryRows) {
    const name = normalizeName(row.school_name || '');
    const district = (row.district || '').trim();
    const moi = parseSecondaryMOI(row.language_policy || '');

    if (name) {
      const key = `${name}|${district.toLowerCase()}`;
      csvSecondaryMap.set(key, { district, moi, rawMOI: row.language_policy?.substring(0, 100) });
    }
  }

  console.log(`\nPrimary schools with MOI data: ${csvPrimaryMap.size}`);
  console.log(`Secondary schools in map: ${csvSecondaryMap.size}`);

  // Read schools.ts
  const schoolsContent = fs.readFileSync(SCHOOLS_FILE, 'utf-8');
  const schools = extractSchools(schoolsContent);

  console.log(`\nTotal schools in schools.ts: ${schools.length}`);

  // Filter to Primary and Secondary only
  const eligibleSchools = schools.filter(s => s.level === '小學' || s.level === '中學');
  console.log(`Eligible schools (Primary/Secondary): ${eligibleSchools.length}`);

  const mappings = [];
  const needsReview = [];
  const processed = new Set();

  for (const school of eligibleSchools) {
    if (processed.has(school.id)) continue;
    processed.add(school.id);

    const normalizedName = normalizeName(school.nameEn);
    const mappedDistrict = mapDistrict(school.district18);
    const lookupKey = `${normalizedName}|${mappedDistrict.toLowerCase()}`;

    let found = false;
    let csvData = null;
    let source = '';

    if (school.level === '小學') {
      // Try exact match first
      if (csvPrimaryMap.has(lookupKey)) {
        csvData = csvPrimaryMap.get(lookupKey);
        source = 'CHSC primary (exact)';
        found = true;
      } else {
        // Try name-only match
        for (const [key, data] of csvPrimaryMap) {
          if (key.startsWith(normalizedName + '|')) {
            csvData = data;
            source = 'CHSC primary (name)';
            found = true;
            break;
          }
        }
      }
    } else if (school.level === '中學') {
      // Try exact match first
      if (csvSecondaryMap.has(lookupKey)) {
        csvData = csvSecondaryMap.get(lookupKey);
        source = 'CHSC secondary (exact)';
        found = true;
      } else {
        // Try name-only match
        for (const [key, data] of csvSecondaryMap) {
          if (key.startsWith(normalizedName + '|')) {
            csvData = data;
            source = 'CHSC secondary (name)';
            found = true;
            break;
          }
        }
      }
    }

    if (found && csvData && csvData.moi && csvData.moi.length > 0) {
      mappings.push({
        school_id: school.id,
        stage: school.level,
        instruction_languages: csvData.moi.join('|'),
        confidence: 'HIGH',
        source: source,
      });
    } else {
      const reason = found
        ? 'CHSC match but no MOI field parsed'
        : 'No CHSC match';
      needsReview.push({
        school_id: school.id,
        stage: school.level,
        reason: reason,
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
}

main();
