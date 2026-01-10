/**
 * Phase 2A: Generate master-issues.csv
 * Covers all fields for all schools
 * 依据：BOSS.md v1
 */

const fs = require('fs');
const path = require('path');

// Read schools data
const schoolsPath = path.join(__dirname, '..', 'data', 'schools.ts');
const schoolsContent = fs.readFileSync(schoolsPath, 'utf-8');

// Extract JSON array from TypeScript file
const match = schoolsContent.match(/export const schools: School\[\] = (\[[\s\S]*\]);?/);
if (!match) {
  console.error('Failed to parse schools data');
  process.exit(1);
}

let schools;
try {
  // Clean up the content for JSON parsing
  let jsonStr = match[1];
  // Remove trailing semicolon if present
  jsonStr = jsonStr.replace(/;$/, '');
  schools = JSON.parse(jsonStr);
} catch (e) {
  console.error('JSON parse error:', e.message);
  process.exit(1);
}

console.log(`Processing ${schools.length} schools...`);

// Expected fields based on types/school.ts interface
const expectedFields = [
  'id', 'name', 'nameEn', 'searchKeywords', 'category', 'district', 'level',
  'tuitionMin', 'tuitionMax', 'curriculum', 'language', 'highlights',
  'address', 'phone', 'website', 'applicationMaterials', 'applicationLink',
  'latitude', 'longitude', 'articulation'
];

// Field mapping from actual data to expected interface
const fieldMapping = {
  'type': 'category',
  'fundingType': 'category', // combined with type
  'features': 'highlights',
  'tuition': 'tuitionMin', // single value maps to min
  'region': 'district' // district in data is 18-区, region is 港島/九龍/新界
};

// Validation rules
const validators = {
  id: (v) => /^sch_\d{5}$/.test(v) ? 'PASS' : 'FAIL',
  name: (v, school) => {
    if (!v) return 'FAIL';
    // Check for synthetic patterns
    if (/（第\d+校）|（.+分校）/.test(v)) return 'NEED_REVIEW';
    return 'NEED_REVIEW'; // Can't verify without official source
  },
  nameEn: (v) => v ? 'NEED_REVIEW' : 'FAIL',
  searchKeywords: (v) => Array.isArray(v) && v.length > 0 ? 'PASS' : 'NEED_REVIEW',
  category: (v, school) => {
    // Check if using old field names
    if (school.type || school.fundingType) return 'FAIL';
    const valid = ['國際', '資助', '直資', '私立', '公立'];
    return valid.includes(v) ? 'PASS' : 'FAIL';
  },
  district: (v, school) => {
    // Expected: 港島/九龍/新界, but data has 18-区
    const valid = ['港島', '九龍', '新界'];
    if (valid.includes(v)) return 'PASS';
    if (school.region && valid.includes(school.region)) return 'FAIL'; // Wrong field used
    return 'FAIL';
  },
  level: (v) => {
    const valid = ['幼稚園', '小學', '中學'];
    return valid.includes(v) ? 'PASS' : 'FAIL';
  },
  tuitionMin: (v, school) => {
    if (school.tuition !== undefined && school.tuitionMin === undefined) return 'FAIL';
    if (typeof v !== 'number') return 'FAIL';
    return 'UNKNOWN'; // No evidence
  },
  tuitionMax: (v, school) => {
    if (school.tuitionMax === undefined) return 'FAIL';
    if (typeof v !== 'number') return 'FAIL';
    return 'UNKNOWN'; // No evidence
  },
  curriculum: (v) => {
    if (typeof v === 'string') return 'FAIL'; // Should be array
    if (!Array.isArray(v)) return 'FAIL';
    return 'NEED_REVIEW';
  },
  language: (v) => {
    const valid = ['全英文', '中英雙語', '以中文為主'];
    if (valid.includes(v)) return 'PASS';
    if (v === '雙語') return 'FAIL'; // Should be '中英雙語'
    return 'FAIL';
  },
  highlights: (v, school) => {
    if (school.features && !school.highlights) return 'FAIL';
    if (!Array.isArray(v)) return 'FAIL';
    return 'NEED_REVIEW';
  },
  address: (v) => {
    if (!v) return 'FAIL';
    if (/某街道/.test(v)) return 'FAIL'; // Placeholder
    return 'NEED_REVIEW';
  },
  phone: (v) => {
    if (!v) return 'FAIL';
    if (!/^\d{8}$/.test(v)) return 'FAIL';
    return 'NEED_REVIEW'; // Format OK, validity unknown
  },
  website: (v) => {
    if (!v) return 'FAIL';
    if (/school\d+\.edu\.hk/.test(v)) return 'FAIL'; // Placeholder
    if (!/^https?:\/\//.test(v)) return 'FAIL';
    return 'NEED_REVIEW';
  },
  applicationMaterials: (v) => {
    if (!v || !Array.isArray(v)) return 'UNKNOWN';
    return v.length > 0 ? 'NEED_REVIEW' : 'UNKNOWN';
  },
  applicationLink: (v) => {
    if (!v) return 'FAIL';
    if (/school\d+\.edu\.hk/.test(v)) return 'FAIL'; // Placeholder
    return 'NEED_REVIEW';
  },
  latitude: (v) => {
    if (typeof v !== 'number') return 'FAIL';
    if (v < 22.1 || v > 22.6) return 'FAIL'; // Outside HK
    return 'NEED_REVIEW'; // In range but can't verify accuracy
  },
  longitude: (v) => {
    if (typeof v !== 'number') return 'FAIL';
    if (v < 113.8 || v > 114.5) return 'FAIL'; // Outside HK
    return 'NEED_REVIEW';
  },
  articulation: (v) => {
    if (!v) return 'UNKNOWN'; // Missing module
    return 'NEED_REVIEW';
  }
};

// Generate CSV rows
const rows = [];
rows.push('schoolId,field,status,currentValue,proposedValue,sourceUrl,notes');

for (const school of schools) {
  // Check each expected field
  for (const field of expectedFields) {
    let currentValue = school[field];
    let status = 'UNKNOWN';
    let proposedValue = '';
    let sourceUrl = '';
    let notes = '';

    // Handle field mapping (old field names in data)
    if (field === 'category') {
      currentValue = school.category || `type:${school.type}|funding:${school.fundingType}`;
      if (!school.category && (school.type || school.fundingType)) {
        status = 'FAIL';
        notes = 'Schema mismatch: use category not type/fundingType';
      } else if (validators[field]) {
        status = validators[field](school.category, school);
      }
    } else if (field === 'district') {
      // Data has 18-区 in district, 3-区 in region
      currentValue = school.district || '';
      if (school.region) {
        currentValue = `district:${school.district}|region:${school.region}`;
        status = 'FAIL';
        proposedValue = school.region;
        notes = 'Use region value for district field';
      } else {
        status = validators[field] ? validators[field](currentValue, school) : 'UNKNOWN';
      }
    } else if (field === 'tuitionMin') {
      if (school.tuition !== undefined && school.tuitionMin === undefined) {
        currentValue = `tuition:${school.tuition}`;
        status = 'FAIL';
        notes = 'Schema: split tuition into tuitionMin/Max';
      } else {
        currentValue = school.tuitionMin;
        status = 'UNKNOWN';
        notes = 'No evidence';
      }
    } else if (field === 'tuitionMax') {
      if (school.tuitionMax === undefined) {
        currentValue = 'MISSING';
        status = 'FAIL';
        notes = 'Field missing in data';
      } else {
        currentValue = school.tuitionMax;
        status = 'UNKNOWN';
        notes = 'No evidence';
      }
    } else if (field === 'curriculum') {
      currentValue = school.curriculum;
      if (typeof currentValue === 'string') {
        status = 'FAIL';
        proposedValue = `["${currentValue}"]`;
        notes = 'Should be array not string';
      } else {
        status = 'NEED_REVIEW';
      }
    } else if (field === 'highlights') {
      if (school.features && !school.highlights) {
        currentValue = `features:${JSON.stringify(school.features)}`;
        status = 'FAIL';
        proposedValue = JSON.stringify(school.features);
        notes = 'Rename features to highlights';
      } else {
        currentValue = school.highlights;
        status = validators[field] ? validators[field](currentValue, school) : 'UNKNOWN';
      }
    } else if (field === 'articulation') {
      currentValue = school.articulation || 'MISSING';
      status = 'UNKNOWN';
      notes = 'Module not implemented';
    } else {
      currentValue = school[field];
      if (validators[field]) {
        status = validators[field](currentValue, school);
      }
    }

    // Specific notes for common issues
    if (field === 'website' && status === 'FAIL' && /school\d+/.test(currentValue)) {
      notes = 'Placeholder URL';
    }
    if (field === 'applicationLink' && status === 'FAIL' && /school\d+/.test(currentValue)) {
      notes = 'Placeholder URL';
    }
    if (field === 'address' && status === 'FAIL' && /某街道/.test(currentValue)) {
      notes = 'Placeholder address';
    }
    if (field === 'name' && /（第\d+校）|（.+分校）/.test(currentValue)) {
      notes = 'Synthetic name pattern';
    }

    // Format currentValue for CSV
    let csvCurrentValue = currentValue;
    if (typeof currentValue === 'object') {
      csvCurrentValue = JSON.stringify(currentValue);
    }
    if (csvCurrentValue === undefined || csvCurrentValue === null) {
      csvCurrentValue = 'MISSING';
    }

    // Escape CSV values
    const escapeCSV = (val) => {
      if (val === null || val === undefined) return '';
      const str = String(val);
      if (str.includes(',') || str.includes('"') || str.includes('\n')) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    };

    rows.push([
      school.id,
      field,
      status,
      escapeCSV(csvCurrentValue),
      escapeCSV(proposedValue),
      escapeCSV(sourceUrl),
      escapeCSV(notes)
    ].join(','));
  }
}

// Write output
const outputPath = path.join(__dirname, '..', 'docs', 'factcheck', 'master-issues.csv');
fs.writeFileSync(outputPath, rows.join('\n'), 'utf-8');

// Generate summary
const stats = { PASS: 0, FAIL: 0, UNKNOWN: 0, NEED_REVIEW: 0 };
for (const row of rows.slice(1)) {
  const parts = row.split(',');
  const status = parts[2];
  if (stats[status] !== undefined) stats[status]++;
}

console.log(`\nGenerated ${rows.length - 1} issue rows for ${schools.length} schools`);
console.log(`Output: ${outputPath}`);
console.log(`\nSummary:`);
console.log(`  PASS: ${stats.PASS} (${(stats.PASS / (rows.length - 1) * 100).toFixed(1)}%)`);
console.log(`  FAIL: ${stats.FAIL} (${(stats.FAIL / (rows.length - 1) * 100).toFixed(1)}%)`);
console.log(`  UNKNOWN: ${stats.UNKNOWN} (${(stats.UNKNOWN / (rows.length - 1) * 100).toFixed(1)}%)`);
console.log(`  NEED_REVIEW: ${stats.NEED_REVIEW} (${(stats.NEED_REVIEW / (rows.length - 1) * 100).toFixed(1)}%)`);
