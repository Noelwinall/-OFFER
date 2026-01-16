/**
 * Apply Curriculum Mapping V1.2
 *
 * Reads data/curriculum_mapping_v1.2.csv and applies to schools.ts
 * Only applies rows where confidence == "HIGH"
 * Matches by school_id EXACTLY
 */

const fs = require('fs');
const path = require('path');

const MAPPING_FILE = path.join(__dirname, '..', 'data', 'curriculum_mapping_v1.2.csv');
const SCHOOLS_FILE = path.join(__dirname, '..', 'data', 'schools.ts');

// Valid CurriculumV2 values
const VALID_CURRICULUMS = [
  'HK_LOCAL',
  'IB',
  'BRITISH',
  'AMERICAN',
  'CANADIAN',
  'AUSTRALIAN',
  'OTHER_INTL',
  'DUAL_TRACK'
];

function parseCSV(content) {
  const lines = content.trim().split('\n');
  const headers = lines[0].split(',');
  const rows = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    const row = {};
    headers.forEach((h, idx) => {
      row[h.trim()] = values[idx]?.trim() || '';
    });
    rows.push(row);
  }

  return rows;
}

function main() {
  console.log('=== Curriculum Mapping V1.2 Application ===\n');

  // Read mapping file
  if (!fs.existsSync(MAPPING_FILE)) {
    console.error('ERROR: Mapping file not found:', MAPPING_FILE);
    process.exit(1);
  }

  const mappingContent = fs.readFileSync(MAPPING_FILE, 'utf-8');
  const mappingRows = parseCSV(mappingContent);

  console.log(`Total rows read: ${mappingRows.length}`);

  // Filter HIGH confidence only
  const highConfRows = mappingRows.filter(r => r.confidence === 'HIGH');
  const skippedRows = mappingRows.length - highConfRows.length;

  console.log(`HIGH confidence rows: ${highConfRows.length}`);
  console.log(`Skipped (non-HIGH): ${skippedRows}`);

  // Build mapping: school_id -> curriculums[]
  const curriculumMap = new Map();
  let invalidCurriculums = 0;

  for (const row of highConfRows) {
    const schoolId = row.school_id;
    if (!schoolId) continue;

    // Parse pipe-separated curriculums
    const curriculums = row.curriculums
      .split('|')
      .map(c => c.trim())
      .filter(c => {
        if (!VALID_CURRICULUMS.includes(c)) {
          invalidCurriculums++;
          return false;
        }
        return true;
      });

    if (curriculums.length > 0) {
      if (!curriculumMap.has(schoolId)) {
        curriculumMap.set(schoolId, new Set());
      }
      curriculums.forEach(c => curriculumMap.get(schoolId).add(c));
    }
  }

  console.log(`Unique school IDs in mapping: ${curriculumMap.size}`);
  if (invalidCurriculums > 0) {
    console.log(`Invalid curriculum values skipped: ${invalidCurriculums}`);
  }

  // Read schools.ts
  let schoolsContent = fs.readFileSync(SCHOOLS_FILE, 'utf-8');

  // Check if curriculumV2 already exists
  const hasCurriculumV2 = schoolsContent.includes('"curriculumV2"');

  if (hasCurriculumV2) {
    console.log('\ncurriculumV2 field already exists in schools.ts');
  } else {
    console.log('\nAdding curriculumV2 field to all schools...');

    // Add curriculumV2: [] after each "curriculum": [...],
    schoolsContent = schoolsContent.replace(
      /("curriculum":\s*\[[^\]]*\]),(\s*\n\s*"language":)/g,
      '$1,\n    "curriculumV2": [],$2'
    );

    // Count how many we added
    const addedCount = (schoolsContent.match(/"curriculumV2":/g) || []).length;
    console.log(`Added curriculumV2 field to ${addedCount} schools`);
  }

  // Extract school IDs from schools.ts
  const schoolIdRegex = /"id":\s*"([^"]+)"/g;
  const schoolIds = new Set();
  let match;
  while ((match = schoolIdRegex.exec(schoolsContent)) !== null) {
    schoolIds.add(match[1]);
  }

  console.log(`\nTotal schools in schools.ts: ${schoolIds.size}`);

  // Check for matches
  let matchedSchools = 0;
  let totalInserts = 0;
  const matchedIds = [];

  for (const [schoolId, curriculums] of curriculumMap) {
    if (schoolIds.has(schoolId)) {
      matchedSchools++;
      totalInserts += curriculums.size;
      matchedIds.push(schoolId);
    }
  }

  console.log(`Schools matched: ${matchedSchools}`);
  console.log(`Total curriculum rows to insert: ${totalInserts}`);

  // Apply the mapping for matched schools
  if (matchedSchools > 0) {
    for (const schoolId of matchedIds) {
      const curriculums = Array.from(curriculumMap.get(schoolId));
      const curriculumJson = JSON.stringify(curriculums);

      // Replace empty curriculumV2 for this specific school
      const pattern = new RegExp(
        `("id":\\s*"${schoolId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[\\s\\S]*?"curriculumV2":\\s*)\\[\\]`,
        'g'
      );
      schoolsContent = schoolsContent.replace(pattern, `$1${curriculumJson}`);
    }
    console.log(`Applied curriculum mapping to ${matchedSchools} schools`);
  }

  // Write back
  fs.writeFileSync(SCHOOLS_FILE, schoolsContent, 'utf-8');
  console.log('\nschools.ts updated successfully.');

  // Generate report
  console.log('\n=== REPORT ===');
  console.log(`total_rows_read: ${mappingRows.length}`);
  console.log(`total_schools_matched: ${matchedSchools}`);
  console.log(`total_curriculum_rows_inserted: ${totalInserts}`);
  console.log(`total_rows_skipped: ${skippedRows}`);

  if (matchedSchools === 0) {
    console.log('\n⚠️  WARNING: No schools matched!');
    console.log('   Mapping file uses IDs like: sch_XXXXX');
    console.log('   schools.ts uses IDs like: edb_XXXXX');
    console.log('   Please update the mapping file with correct school IDs.');
  }
}

main();
