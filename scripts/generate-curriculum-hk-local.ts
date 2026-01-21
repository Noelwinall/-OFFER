/**
 * Generate curriculum_mapping_hk_local_v1.csv
 *
 * Rules:
 * - Exclude kindergartens (幼稚園) and international schools
 * - Government/Aided schools → HK_LOCAL, HIGH confidence
 * - DSS/Private schools → HK_LOCAL, LOW confidence (unless known IB/A-Level)
 */

import { schoolsRaw } from '../data/schools_raw';
import * as fs from 'fs';
import * as path from 'path';

// ============================================
// International School Detection (inlined)
// ============================================

/** ESF Canonical School Names */
const ESF_SCHOOLS = [
  "BEACON HILL SCHOOL",
  "BRADBURY SCHOOL",
  "CLEARWATER BAY SCHOOL",
  "GLENEALY SCHOOL",
  "KENNEDY SCHOOL",
  "KOWLOON JUNIOR SCHOOL",
  "PEAK SCHOOL",
  "QUARRY BAY SCHOOL",
  "SHATIN JUNIOR SCHOOL",
  "SHA TIN JUNIOR SCHOOL",
  "ISLAND SCHOOL",
  "KING GEORGE V SCHOOL",
  "KGV",
  "SHATIN COLLEGE",
  "SHA TIN COLLEGE",
  "SOUTH ISLAND SCHOOL",
  "THE SOUTH ISLAND SCHOOL",
  "WEST ISLAND SCHOOL",
  "DISCOVERY COLLEGE",
  "ESF DISCOVERY COLLEGE",
  "RENAISSANCE COLLEGE",
  "ESF RENAISSANCE COLLEGE",
  "RENAISSANCE COLLEGE HONG KONG",
  "RCHK",
  "JOCKEY CLUB SARAH ROE SCHOOL",
  "ESF ABACUS INTERNATIONAL KINDERGARTEN",
  "ABACUS INTERNATIONAL KINDERGARTEN",
  "ESF INTERNATIONAL KINDERGARTEN (WU KAI SHA)",
  "ESF WU KAI SHA INTERNATIONAL KINDERGARTEN",
  "ESF INTERNATIONAL KINDERGARTEN (TSING YI)",
  "ESF TSING YI INTERNATIONAL KINDERGARTEN",
  "ESF INTERNATIONAL KINDERGARTEN (HILLSIDE)",
  "ESF HILLSIDE INTERNATIONAL KINDERGARTEN",
  "ESF INTERNATIONAL KINDERGARTEN (TUNG CHUNG)",
  "ESF TUNG CHUNG INTERNATIONAL KINDERGARTEN",
];

/** Non-ESF International Schools (EDB registry) */
const NON_GROUP_INTERNATIONAL_SCHOOLS = [
  "AMERICAN INTERNATIONAL SCHOOL",
  "AUSTRALIAN INTERNATIONAL SCHOOL HONG KONG",
  "CANADIAN INTERNATIONAL SCHOOL",
  "CARMEL SCHOOL",
  "CHINESE INTERNATIONAL SCHOOL",
  "CHRISTIAN ALLIANCE INTERNATIONAL SCHOOL",
  "CONCORDIA INTERNATIONAL SCHOOL",
  "DSC INTERNATIONAL SCHOOL",
  "DISCOVERY BAY INTERNATIONAL SCHOOL",
  "FRENCH INTERNATIONAL SCHOOL",
  "GERMAN SWISS INTERNATIONAL SCHOOL",
  "HARROW INTERNATIONAL SCHOOL HONG KONG",
  "HONG KONG ACADEMY",
  "HONG KONG INTERNATIONAL SCHOOL",
  "INTERNATIONAL CHRISTIAN SCHOOL",
  "INTERNATIONAL COLLEGE HONG KONG",
  "INTERNATIONAL MONTESSORI SCHOOL",
  "JAPANESE INTERNATIONAL SCHOOL",
  "KELLETT SCHOOL",
  "KOREAN INTERNATIONAL SCHOOL",
  "LANTAU INTERNATIONAL SCHOOL",
  "MALVERN COLLEGE HONG KONG",
  "MULBERRY HOUSE",
  "NORD ANGLIA INTERNATIONAL SCHOOL",
  "NORWEGIAN INTERNATIONAL SCHOOL",
  "SEAR ROGERS INTERNATIONAL SCHOOL",
  "SHREWSBURY INTERNATIONAL SCHOOL",
  "SINGAPORE INTERNATIONAL SCHOOL",
  "STAMFORD AMERICAN SCHOOL HONG KONG",
  "VICTORIA SHANGHAI ACADEMY",
  "WOODLAND PRE-SCHOOLS",
  "YEW CHUNG INTERNATIONAL SCHOOL",
];

function normalizeForMatch(name: string): string {
  return name
    .toUpperCase()
    .replace(/\s+/g, " ")
    .replace(/^THE\s+/, "")
    .trim();
}

function isEsfSchool(nameEn: string): boolean {
  const normalizedInput = normalizeForMatch(nameEn);
  for (const esfName of ESF_SCHOOLS) {
    if (normalizedInput === normalizeForMatch(esfName)) {
      return true;
    }
  }
  return false;
}

function matchesNonGroupInternational(nameEn: string): boolean {
  const normalizedName = normalizeForMatch(nameEn);
  for (const pattern of NON_GROUP_INTERNATIONAL_SCHOOLS) {
    const normalizedPattern = normalizeForMatch(pattern);
    if (normalizedName.includes(normalizedPattern)) {
      return true;
    }
  }
  return false;
}

function isInternational(nameEn: string | undefined): boolean {
  if (!nameEn) return false;
  if (isEsfSchool(nameEn)) return true;
  if (matchesNonGroupInternational(nameEn)) return true;
  return false;
}

// ============================================
// Main Generation Logic
// ============================================

// Known DSS/Private schools offering dual curriculum (IB + HK_LOCAL)
const KNOWN_DUAL_TRACK_IDS = new Set([
  'ISF_ACADEMY', // 弘立書院 - already in international mapping
]);

// Known DSS/Private schools offering IB only
const KNOWN_IB_ONLY_IDS = new Set<string>([
  // Add any known IB-only DSS/private schools here
]);

interface CurriculumRow {
  school_id: string;
  school_name: string;
  curriculum: string;
  confidence: 'HIGH' | 'LOW';
  source: string;
}

function main() {
  const rows: CurriculumRow[] = [];

  // Stats
  let totalSchools = 0;
  let excludedKindergarten = 0;
  let excludedInternational = 0;
  let governmentAided = 0;
  let dssPrivate = 0;
  let dualTrack = 0;
  let ibOnly = 0;

  for (const school of schoolsRaw) {
    totalSchools++;

    // Exclude kindergartens
    if (school.level === '幼稚園') {
      excludedKindergarten++;
      continue;
    }

    // Exclude international schools
    if (isInternational(school.nameEn)) {
      excludedInternational++;
      continue;
    }

    // Determine curriculum based on category
    const category = school.category;

    if (category === '資助' || category === '公立' || category === '官立') {
      // Government/Aided schools → HK_LOCAL, HIGH confidence
      rows.push({
        school_id: school.id,
        school_name: school.name,
        curriculum: 'HK_LOCAL',
        confidence: 'HIGH',
        source: 'EDB/CHSC policy',
      });
      governmentAided++;
    } else if (category === '直資' || category === '私立') {
      // DSS/Private schools - check for known exceptions
      if (KNOWN_DUAL_TRACK_IDS.has(school.id)) {
        rows.push({
          school_id: school.id,
          school_name: school.name,
          curriculum: 'DUAL_TRACK',
          confidence: 'HIGH',
          source: 'known_dual_curriculum',
        });
        dualTrack++;
      } else if (KNOWN_IB_ONLY_IDS.has(school.id)) {
        rows.push({
          school_id: school.id,
          school_name: school.name,
          curriculum: 'IB',
          confidence: 'HIGH',
          source: 'known_ib_school',
        });
        ibOnly++;
      } else {
        // Default: HK_LOCAL with LOW confidence
        rows.push({
          school_id: school.id,
          school_name: school.name,
          curriculum: 'HK_LOCAL',
          confidence: 'LOW',
          source: 'assumed_local_no_evidence',
        });
        dssPrivate++;
      }
    } else {
      // Unknown category - treat as LOW confidence HK_LOCAL
      rows.push({
        school_id: school.id,
        school_name: school.name,
        curriculum: 'HK_LOCAL',
        confidence: 'LOW',
        source: 'unknown_category',
      });
      dssPrivate++;
    }
  }

  // Generate CSV content
  const header = 'school_id,school_name,curriculum,confidence,source';
  const csvLines = [header];

  for (const row of rows) {
    // Quote school_name in case it contains commas
    const quotedName = `"${row.school_name.replace(/"/g, '""')}"`;
    csvLines.push(`${row.school_id},${quotedName},${row.curriculum},${row.confidence},${row.source}`);
  }

  const csvContent = csvLines.join('\n') + '\n';

  // Write to file
  const outputPath = path.join(__dirname, '../data/curriculum_mapping_hk_local_v1.csv');
  fs.writeFileSync(outputPath, csvContent, 'utf-8');

  // Print stats
  console.log('=== CURRICULUM MAPPING HK_LOCAL GENERATION ===');
  console.log('');
  console.log('Input:');
  console.log(`  Total schools: ${totalSchools}`);
  console.log(`  Excluded kindergartens: ${excludedKindergarten}`);
  console.log(`  Excluded international: ${excludedInternational}`);
  console.log('');
  console.log('Output:');
  console.log(`  Total rows in CSV: ${rows.length}`);
  console.log('');
  console.log('Breakdown by curriculum:');
  const curriculumCounts: Record<string, number> = {};
  for (const row of rows) {
    curriculumCounts[row.curriculum] = (curriculumCounts[row.curriculum] || 0) + 1;
  }
  Object.entries(curriculumCounts).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => {
    console.log(`  ${k}: ${v}`);
  });
  console.log('');
  console.log('Breakdown by confidence:');
  const confidenceCounts: Record<string, number> = {};
  for (const row of rows) {
    confidenceCounts[row.confidence] = (confidenceCounts[row.confidence] || 0) + 1;
  }
  Object.entries(confidenceCounts).forEach(([k, v]) => {
    console.log(`  ${k}: ${v}`);
  });
  console.log('');
  console.log('Detail:');
  console.log(`  Government/Aided (HIGH): ${governmentAided}`);
  console.log(`  DSS/Private (LOW): ${dssPrivate}`);
  console.log(`  Known DUAL_TRACK: ${dualTrack}`);
  console.log(`  Known IB: ${ibOnly}`);
  console.log('');
  console.log(`Output written to: ${outputPath}`);
}

main();
