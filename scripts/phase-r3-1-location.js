/**
 * Phase R3-1: Update schools.ts with address/phone/lat/lng from EDB official data
 * Source: http://www.edb.gov.hk/attachment/en/student-parents/sch-info/sch-search/sch-location-info/SCH_LOC_EDB.csv
 *
 * Usage: node scripts/phase-r3-1-location.js
 *
 * This script is idempotent - can be run multiple times safely.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Paths
const EDB_CSV_URL = 'http://www.edb.gov.hk/attachment/en/student-parents/sch-info/sch-search/sch-location-info/SCH_LOC_EDB.csv';
const LOCAL_CSV_PATH = path.join(__dirname, '../docs/factcheck/edb-school-location.csv');
const SCHOOLS_PATH = path.join(__dirname, '../data/schools.ts');

// Statistics
const stats = {
  totalSchools: 0,
  totalEdbRecords: 0,
  matched: 0,
  unmatched: 0,
  addressFilled: 0,
  phoneFilled: 0,
  latLngFilled: 0,
  addressEmpty: 0,
  phoneEmpty: 0,
  latLngEmpty: 0,
};

/**
 * Download CSV from EDB (with encoding fix)
 */
async function downloadCSV() {
  return new Promise((resolve, reject) => {
    console.log('Downloading EDB school location CSV...');

    const request = http.get(EDB_CSV_URL, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`HTTP ${response.statusCode}`));
        return;
      }

      let data = '';
      response.setEncoding('utf16le'); // EDB uses UTF-16LE

      response.on('data', chunk => data += chunk);
      response.on('end', () => {
        // Remove BOM and null bytes
        data = data.replace(/^\uFEFF/, '').replace(/\x00/g, '');
        fs.writeFileSync(LOCAL_CSV_PATH, data, 'utf8');
        console.log(`Downloaded and saved to ${LOCAL_CSV_PATH}`);
        resolve(data);
      });
    });

    request.on('error', reject);
    request.setTimeout(30000, () => {
      request.destroy();
      reject(new Error('Download timeout'));
    });
  });
}

/**
 * Parse CSV content
 */
function parseCSV(content) {
  // Remove BOM and normalize line endings
  content = content.replace(/^\uFEFF/, '').replace(/^\xEF\xBB\xBF/, '').replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  const lines = content.trim().split('\n');
  let headerLine = lines[0];

  // Clean header - remove any BOM or special chars at start
  headerLine = headerLine.replace(/^[^\x20-\x7E]+/, '');

  const headers = parseCSVLine(headerLine);

  const records = [];
  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    if (values.length === headers.length) {
      const record = {};
      headers.forEach((h, idx) => {
        record[h.trim()] = (values[idx] || '').trim();
      });
      records.push(record);
    }
  }

  return records;
}

/**
 * Parse a single CSV line (handles quoted fields)
 */
function parseCSVLine(line) {
  const values = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      values.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  values.push(current);

  return values;
}

/**
 * Build lookup map from EDB data (by school ID)
 */
function buildEdbLookup(records) {
  const lookup = new Map();

  for (const record of records) {
    const schoolNo = record['SCHOOL NO.'];
    if (!schoolNo) continue;

    // Clean and validate data
    const addressEn = record['ENGLISH ADDRESS'] || '';
    const addressZh = record['中文地址'] || '';
    const phone = cleanPhone(record['TELEPHONE']);
    const lat = parseFloat(record['LATITUDE']) || 0;
    const lng = parseFloat(record['LONGITUDE']) || 0;

    // Use Chinese address if available, fallback to English
    const address = addressZh || addressEn;

    lookup.set(schoolNo, {
      address: cleanAddress(address),
      phone,
      latitude: lat,
      longitude: lng,
    });
  }

  return lookup;
}

/**
 * Clean phone number
 */
function cleanPhone(phone) {
  if (!phone || phone === 'N.A.' || phone === 'N/A') return '';
  // Remove spaces and keep only digits
  return phone.replace(/\s+/g, '').replace(/[^\d]/g, '');
}

/**
 * Clean address
 */
function cleanAddress(address) {
  if (!address || address === 'N.A.' || address === 'N/A') return '';
  // Remove extra whitespace
  return address.replace(/\s+/g, ' ').trim();
}

/**
 * Extract school ID from our edb_XXXXXX format
 */
function extractSchoolNo(id) {
  if (id.startsWith('edb_')) {
    return id.substring(4);
  }
  return id;
}

/**
 * Update schools.ts file
 */
function updateSchoolsFile(edbLookup) {
  console.log('\nReading schools.ts...');
  let content = fs.readFileSync(SCHOOLS_PATH, 'utf8');

  // Extract schools array using regex
  const schoolsMatch = content.match(/export const schools: School\[\] = (\[[\s\S]*\]);/);
  if (!schoolsMatch) {
    throw new Error('Could not find schools array in schools.ts');
  }

  // Parse the schools array
  const schoolsJson = schoolsMatch[1];
  const schools = eval(schoolsJson); // Safe here since we control the file

  stats.totalSchools = schools.length;
  stats.totalEdbRecords = edbLookup.size;

  console.log(`Processing ${schools.length} schools against ${edbLookup.size} EDB records...`);

  // Update each school
  for (const school of schools) {
    const schoolNo = extractSchoolNo(school.id);
    const edbData = edbLookup.get(schoolNo);

    if (edbData) {
      stats.matched++;

      // Update address
      if (edbData.address) {
        school.address = edbData.address;
        stats.addressFilled++;
      } else {
        stats.addressEmpty++;
      }

      // Update phone
      if (edbData.phone) {
        school.phone = edbData.phone;
        stats.phoneFilled++;
      } else {
        stats.phoneEmpty++;
      }

      // Update lat/lng
      if (edbData.latitude && edbData.longitude) {
        school.latitude = edbData.latitude;
        school.longitude = edbData.longitude;
        stats.latLngFilled++;
      } else {
        stats.latLngEmpty++;
      }
    } else {
      stats.unmatched++;
    }
  }

  // Regenerate the schools.ts content
  const header = `// 香港學校數據庫
// Schema: types/school.ts
// Source: EDB baseline-schools.csv (Phase R1 Rebuild v0)
// Location data: EDB SCH_LOC_EDB.csv (Phase R3-1)
// Generated: ${new Date().toISOString().split('T')[0]}
// Total: ${schools.length} schools
// Note: tuition/articulation/highlights NOT filled (v0)

import { School } from "@/types/school";

export const schools: School[] = `;

  const schoolsStr = JSON.stringify(schools, null, 2);
  const newContent = header + schoolsStr + ';\n';

  fs.writeFileSync(SCHOOLS_PATH, newContent, 'utf8');
  console.log('Updated schools.ts');
}

/**
 * Print statistics
 */
function printStats() {
  console.log('\n========================================');
  console.log('Phase R3-1 Location Update Statistics');
  console.log('========================================');
  console.log(`Total schools in database: ${stats.totalSchools}`);
  console.log(`Total EDB records: ${stats.totalEdbRecords}`);
  console.log('');
  console.log(`Matched by ID: ${stats.matched} (${(stats.matched / stats.totalSchools * 100).toFixed(1)}%)`);
  console.log(`Unmatched: ${stats.unmatched} (${(stats.unmatched / stats.totalSchools * 100).toFixed(1)}%)`);
  console.log('');
  console.log('Field fill rates (among matched):');
  console.log(`  Address: ${stats.addressFilled} filled, ${stats.addressEmpty} empty (${(stats.addressFilled / stats.matched * 100).toFixed(1)}% fill rate)`);
  console.log(`  Phone: ${stats.phoneFilled} filled, ${stats.phoneEmpty} empty (${(stats.phoneFilled / stats.matched * 100).toFixed(1)}% fill rate)`);
  console.log(`  Lat/Lng: ${stats.latLngFilled} filled, ${stats.latLngEmpty} empty (${(stats.latLngFilled / stats.matched * 100).toFixed(1)}% fill rate)`);
  console.log('========================================');
}

/**
 * Main
 */
async function main() {
  try {
    // Download or use local CSV
    let csvContent;
    if (fs.existsSync(LOCAL_CSV_PATH)) {
      console.log('Using local CSV file...');
      csvContent = fs.readFileSync(LOCAL_CSV_PATH, 'utf8');
    } else {
      csvContent = await downloadCSV();
    }

    // Parse CSV
    console.log('Parsing EDB CSV...');
    const edbRecords = parseCSV(csvContent);
    console.log(`Parsed ${edbRecords.length} EDB records`);

    // Build lookup
    const edbLookup = buildEdbLookup(edbRecords);

    // Update schools.ts
    updateSchoolsFile(edbLookup);

    // Print stats
    printStats();

  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
