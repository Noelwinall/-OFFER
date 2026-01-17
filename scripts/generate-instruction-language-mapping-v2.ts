/**
 * Generate Instruction Language Mapping V2 - Fixed School Extraction
 *
 * STRICT: Only assigns instruction language from CHSC CSV fields.
 * NO inference from school type/category/group/name/tuition.
 *
 * FIX: Uses direct TypeScript import instead of broken regex extraction
 *
 * Matching Strategy (in order):
 * 1. Normalized exact name match (EN then ZH)
 * 2. Controlled fuzzy matching with strict thresholds
 *
 * Sources:
 * - data/psp_2025_en.csv (Primary EN) -> medium_of_instruction
 * - data/psp_2025_tc.csv (Primary TC) -> 教學語言
 * - data/ssp_2025_2026_en.csv (Secondary EN) -> language_policy
 * - data/ssp_2025_2026_tc.csv (Secondary TC) -> 全校語文政策
 */

import * as fs from 'fs';
import * as path from 'path';
import { schools } from '../data/schools.ts';

const PRIMARY_EN_CSV = path.join(__dirname, '..', 'data', 'psp_2025_en.csv');
const PRIMARY_TC_CSV = path.join(__dirname, '..', 'data', 'psp_2025_tc.csv');
const SECONDARY_EN_CSV = path.join(__dirname, '..', 'data', 'ssp_2025_2026_en.csv');
const SECONDARY_TC_CSV = path.join(__dirname, '..', 'data', 'ssp_2025_2026_tc.csv');
const OUTPUT_FILE = path.join(__dirname, '..', 'data', 'instruction_language_mapping_v2.csv');
const NEEDS_REVIEW_FILE = path.join(__dirname, '..', 'data', 'instruction_language_needs_review_v2.csv');

// Fuzzy matching thresholds
const FUZZY_ACCEPT_THRESHOLD = 0.85;
const FUZZY_GAP_THRESHOLD = 0.05;

interface ChscEntry {
  rowIndex: number;
  nameEn: string;
  nameZh: string;
  normalizedEn: string;
  normalizedZh: string;
  district: string;
  moi: string[];
  source: string;
}

interface MatchResult {
  match: ChscEntry | null;
  method: string;
  score: number;
  candidates: Array<ChscEntry & { score: number; method?: string }>;
}

/**
 * Parse CSV with proper handling of quoted fields
 */
function parseCSV(content: string): Record<string, string>[] {
  const lines = content.split('\n');
  const headers = parseCSVLine(lines[0]);
  const rows: Record<string, string>[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const values = parseCSVLine(line);
    const row: Record<string, string> = {};
    headers.forEach((h, idx) => {
      row[h.trim()] = values[idx]?.trim() || '';
    });
    rows.push(row);
  }

  return rows;
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
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
 * Normalize English name for matching (strict rules)
 */
function normalizeNameEn(name: string): string {
  if (!name) return '';

  let normalized = name
    .toUpperCase()
    .replace(/&/g, ' AND ')
    .replace(/['']/g, ' ')
    .replace(/[""]/g, ' ')
    .replace(/[.,()[\]/\\-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // Remove common articles/filler words
  normalized = normalized
    .replace(/\bTHE\b/g, '')
    .replace(/\bA\b/g, '')
    .replace(/\bAN\b/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  // Strip common suffix tokens at END only
  const suffixes = [
    'PRIMARY SCHOOL',
    'SECONDARY SCHOOL',
    'COLLEGE',
    'SCHOOL'
  ];

  for (const suffix of suffixes) {
    if (normalized.endsWith(' ' + suffix)) {
      normalized = normalized.slice(0, -(suffix.length + 1)).trim();
      break;
    }
    if (normalized === suffix) {
      break;
    }
  }

  return normalized;
}

/**
 * Normalize Chinese name for matching (strict rules)
 * Note: Brackets are normalized to half-width () to preserve 小學部/中學部 distinctions
 */
function normalizeNameZh(name: string): string {
  if (!name) return '';

  return name
    .replace(/[\s\u3000]/g, '')  // spaces (including full-width)
    .replace(/[（【「『《〈﹝\[]/g, '(')  // normalize opening brackets to (
    .replace(/[）】」』》〉﹞\]]/g, ')')  // normalize closing brackets to )
    .replace(/[，。、；：！？…—－·,.;:!?]/g, '')  // punctuation
    .replace(/[""''""'']/g, '')  // quotes
    // Normalize common character variants
    .replace(/啓/g, '啟')  // 啓 -> 啟
    .replace(/温/g, '溫')  // 温 -> 溫 (simplified to traditional)
    .replace(/峯/g, '峰')  // 峯 -> 峰
    .replace(/綫/g, '線')  // 綫 -> 線
    .replace(/裏/g, '裡')  // 裏 -> 裡
    .replace(/衞/g, '衛')  // 衞 -> 衛
    .replace(/羣/g, '群')  // 羣 -> 群
    .replace(/着/g, '著')  // 着 -> 著
    .trim();
}

/**
 * Get tokens from English name for fuzzy matching
 */
function getTokensEn(normalizedName: string): string[] {
  return normalizedName.split(/\s+/).filter(t => t.length > 0);
}

/**
 * Get character bigrams from Chinese name for fuzzy matching
 */
function getBigramsZh(normalizedName: string): Set<string> {
  const bigrams = new Set<string>();
  for (let i = 0; i < normalizedName.length - 1; i++) {
    bigrams.add(normalizedName.slice(i, i + 2));
  }
  return bigrams;
}

/**
 * Jaccard similarity for sets
 */
function jaccardSimilarity(setA: Set<string>, setB: Set<string>): number {
  if (setA.size === 0 && setB.size === 0) return 1;
  if (setA.size === 0 || setB.size === 0) return 0;

  const intersection = new Set([...setA].filter(x => setB.has(x)));
  const union = new Set([...setA, ...setB]);

  return intersection.size / union.size;
}

/**
 * Token-based Jaccard for English names
 */
function tokenJaccardEn(name1: string, name2: string): number {
  const tokens1 = new Set(getTokensEn(name1));
  const tokens2 = new Set(getTokensEn(name2));
  return jaccardSimilarity(tokens1, tokens2);
}

/**
 * Bigram Jaccard for Chinese names
 */
function bigramJaccardZh(name1: string, name2: string): number {
  const bigrams1 = getBigramsZh(name1);
  const bigrams2 = getBigramsZh(name2);
  return jaccardSimilarity(bigrams1, bigrams2);
}

/**
 * Parse medium_of_instruction from primary school CSV (English)
 */
function parsePrimaryMOI_EN(moi: string): string[] {
  if (!moi) return [];
  const languages: string[] = [];
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
function parsePrimaryMOI_TC(moi: string): string[] {
  if (!moi) return [];
  const languages: string[] = [];

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
 * Parse MOI from secondary school CSV (English)
 */
function parseSecondaryMOI_EN(row: Record<string, string>): string[] {
  const languages: string[] = [];

  // Check subject columns - these are authoritative
  const englishSubjectsS1S3 = row['2025_2026_subject_offered_by_english_s1_to_s3'] || '';
  const englishSubjectsS4S6 = row['2025_2026_subject_offered_by_english_s4_to_s6'] || '';
  const chineseSubjectsS1S3 = row['2025_2026_subject_offered_by_chinese_s1_to_s3'] || '';
  const chineseSubjectsS4S6 = row['2025_2026_subject_offered_by_chinese_s4_to_s6'] || '';

  const englishSubjects = (englishSubjectsS1S3 + ' ' + englishSubjectsS4S6).trim();
  if (englishSubjects.length > 0) {
    const subjectsLower = englishSubjects.toLowerCase();
    const hasNonChineseSubjects = subjectsLower.replace(/chinese language/g, '')
      .replace(/chinese history/g, '')
      .replace(/putonghua/g, '')
      .replace(/,/g, '').trim().length > 0;
    if (hasNonChineseSubjects) {
      languages.push('ENGLISH');
    }
  }

  const chineseSubjects = (chineseSubjectsS1S3 + ' ' + chineseSubjectsS4S6).trim();
  if (chineseSubjects.length > 0) {
    const subjectsLower = chineseSubjects.toLowerCase();
    if (subjectsLower.length > 0) {
      languages.push('CANTONESE');
    }
  }

  // Fallback to language_policy if subject columns are empty
  if (languages.length === 0) {
    const policy = row.language_policy || '';
    if (policy) {
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
    }
  }

  return [...new Set(languages)];
}

/**
 * Parse MOI from secondary school CSV (TC)
 */
function parseSecondaryMOI_TC(row: Record<string, string>): string[] {
  const languages: string[] = [];

  const englishSubjectsS1S3 = row['2025_2026學年開設科目_以英文為教學語言_中一至中三'] || '';
  const englishSubjectsS4S6 = row['2025_2026學年開設科目_以英文為教學語言_中四至中六'] || '';
  const chineseSubjectsS1S3 = row['2025_2026學年開設科目_以中文為教學語言_中一至中三'] || '';
  const chineseSubjectsS4S6 = row['2025_2026學年開設科目_以中文為教學語言_中四至中六'] || '';

  const englishSubjects = (englishSubjectsS1S3 + ' ' + englishSubjectsS4S6).trim();
  if (englishSubjects.length > 0) {
    const hasNonChineseSubjects = englishSubjects
      .replace(/中國語文/g, '')
      .replace(/中國歷史/g, '')
      .replace(/普通話/g, '')
      .replace(/中史/g, '')
      .replace(/[，、,]/g, '').trim().length > 0;
    if (hasNonChineseSubjects) {
      languages.push('ENGLISH');
    }
  }

  const chineseSubjects = (chineseSubjectsS1S3 + ' ' + chineseSubjectsS4S6).trim();
  if (chineseSubjects.length > 0) {
    languages.push('CANTONESE');
  }

  // Fallback to 全校語文政策 if subject columns are empty
  if (languages.length === 0) {
    const policy = row['全校語文政策'] || '';
    if (policy) {
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

      if (policy.includes('普通話') && (policy.includes('教授') || policy.includes('教學'))) {
        languages.push('PUTONGHUA');
      }
    }
  }

  return [...new Set(languages)];
}

/**
 * Find best match from CHSC entries using multi-stage matching
 */
function findBestMatch(schoolNameEn: string, schoolNameZh: string, schoolDistrict: string, chscEntries: ChscEntry[]): MatchResult {
  const normalizedEn = normalizeNameEn(schoolNameEn);
  const normalizedZh = normalizeNameZh(schoolNameZh);

  // Stage 1: Exact normalized EN match
  const exactEnMatches = chscEntries.filter(e => e.normalizedEn === normalizedEn && normalizedEn.length > 0);
  if (exactEnMatches.length === 1) {
    return {
      match: exactEnMatches[0],
      method: 'exact_en',
      score: 1.0,
      candidates: exactEnMatches.map(e => ({ ...e, score: 1.0 }))
    };
  }

  // Stage 2: Exact normalized ZH match
  const exactZhMatches = chscEntries.filter(e => e.normalizedZh === normalizedZh && normalizedZh.length > 0);
  if (exactZhMatches.length === 1) {
    return {
      match: exactZhMatches[0],
      method: 'exact_zh',
      score: 1.0,
      candidates: exactZhMatches.map(e => ({ ...e, score: 1.0 }))
    };
  }

  // If multiple exact matches, check district as tie-breaker
  if (exactEnMatches.length > 1) {
    const districtMatches = exactEnMatches.filter(e =>
      e.district.includes(schoolDistrict.replace('區', '')) ||
      schoolDistrict.includes(e.district.replace('區', ''))
    );
    if (districtMatches.length === 1) {
      return {
        match: districtMatches[0],
        method: 'exact_en_district',
        score: 1.0,
        candidates: exactEnMatches.map(e => ({ ...e, score: 1.0 }))
      };
    }
    return {
      match: null,
      method: 'ambiguous_exact_en',
      score: 1.0,
      candidates: exactEnMatches.map(e => ({ ...e, score: 1.0 }))
    };
  }

  if (exactZhMatches.length > 1) {
    const districtMatches = exactZhMatches.filter(e =>
      e.district.includes(schoolDistrict.replace('區', '')) ||
      schoolDistrict.includes(e.district.replace('區', ''))
    );
    if (districtMatches.length === 1) {
      return {
        match: districtMatches[0],
        method: 'exact_zh_district',
        score: 1.0,
        candidates: exactZhMatches.map(e => ({ ...e, score: 1.0 }))
      };
    }
    return {
      match: null,
      method: 'ambiguous_exact_zh',
      score: 1.0,
      candidates: exactZhMatches.map(e => ({ ...e, score: 1.0 }))
    };
  }

  // Stage 3: Fuzzy matching (EN token Jaccard)
  let fuzzyScores: Array<{ entry: ChscEntry; score: number; method: string }> = [];

  if (normalizedEn.length > 0) {
    for (const entry of chscEntries) {
      if (entry.normalizedEn.length > 0) {
        const score = tokenJaccardEn(normalizedEn, entry.normalizedEn);
        fuzzyScores.push({ entry, score, method: 'fuzzy_en' });
      }
    }
  }

  // Stage 4: Fuzzy matching (ZH bigram Jaccard)
  if (normalizedZh.length > 0) {
    for (const entry of chscEntries) {
      if (entry.normalizedZh.length > 0) {
        const score = bigramJaccardZh(normalizedZh, entry.normalizedZh);
        const existing = fuzzyScores.find(f => f.entry.rowIndex === entry.rowIndex);
        if (existing) {
          if (score > existing.score) {
            existing.score = score;
            existing.method = 'fuzzy_zh';
          }
        } else {
          fuzzyScores.push({ entry, score, method: 'fuzzy_zh' });
        }
      }
    }
  }

  // Sort by score descending
  fuzzyScores.sort((a, b) => b.score - a.score);

  const topCandidates = fuzzyScores.slice(0, 5).map(f => ({
    ...f.entry,
    score: f.score,
    method: f.method
  }));

  if (fuzzyScores.length === 0) {
    return {
      match: null,
      method: 'no_candidates',
      score: 0,
      candidates: []
    };
  }

  const best = fuzzyScores[0];
  const secondBest = fuzzyScores[1];

  // Check acceptance criteria
  if (best.score >= FUZZY_ACCEPT_THRESHOLD) {
    const gap = secondBest ? best.score - secondBest.score : 1.0;

    if (gap >= FUZZY_GAP_THRESHOLD) {
      return {
        match: best.entry,
        method: best.method,
        score: best.score,
        candidates: topCandidates
      };
    } else {
      // District tie-breaker for close scores
      const closeMatches = fuzzyScores.filter(f => best.score - f.score < FUZZY_GAP_THRESHOLD);
      const districtMatches = closeMatches.filter(f =>
        f.entry.district.includes(schoolDistrict.replace('區', '')) ||
        schoolDistrict.includes(f.entry.district.replace('區', ''))
      );

      if (districtMatches.length === 1) {
        return {
          match: districtMatches[0].entry,
          method: districtMatches[0].method + '_district',
          score: districtMatches[0].score,
          candidates: topCandidates
        };
      }

      return {
        match: null,
        method: 'ambiguous_fuzzy',
        score: best.score,
        candidates: topCandidates
      };
    }
  }

  // Below threshold
  return {
    match: null,
    method: 'below_threshold',
    score: best.score,
    candidates: topCandidates
  };
}

/**
 * Format candidates for CSV output
 */
function formatCandidates(candidates: Array<ChscEntry & { score: number }>): string {
  if (!candidates || candidates.length === 0) return '';

  return candidates.slice(0, 3).map(c => {
    const name = c.nameEn || c.nameZh;
    return `${name}(${c.score.toFixed(3)})`;
  }).join('; ');
}

function main() {
  console.log('=== Generating Instruction Language Mapping V2 (Fixed School Extraction) ===\n');
  console.log(`Fuzzy thresholds: accept >= ${FUZZY_ACCEPT_THRESHOLD}, gap >= ${FUZZY_GAP_THRESHOLD}\n`);

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

  // Build CHSC lookup entries
  const primaryEntries: ChscEntry[] = [];

  // Add EN entries
  for (let i = 0; i < primaryEnRows.length; i++) {
    const enRow = primaryEnRows[i];
    const nameEn = enRow.school_name || '';
    if (!nameEn) continue;

    const moi = parsePrimaryMOI_EN(enRow.medium_of_instruction || '');

    primaryEntries.push({
      rowIndex: i,
      nameEn: nameEn.trim(),
      nameZh: '',
      normalizedEn: normalizeNameEn(nameEn),
      normalizedZh: '',
      district: (enRow.district || '').trim(),
      moi,
      source: 'CHSC primary EN'
    });
  }

  // Add TC entries
  for (let i = 0; i < primaryTcRows.length; i++) {
    const tcRow = primaryTcRows[i];
    const nameZh = tcRow['學校名稱'] || tcRow['\ufeff學校名稱'] || '';
    if (!nameZh) continue;

    const moi = parsePrimaryMOI_TC(tcRow['教學語言'] || '');
    const district = tcRow['區域'] || tcRow['\ufeff區域'] || '';

    primaryEntries.push({
      rowIndex: primaryEnRows.length + i,
      nameEn: '',
      nameZh: nameZh.trim(),
      normalizedEn: '',
      normalizedZh: normalizeNameZh(nameZh),
      district: district.trim(),
      moi,
      source: 'CHSC primary TC'
    });
  }

  // Same for secondary
  const secondaryEntries: ChscEntry[] = [];

  for (let i = 0; i < secondaryEnRows.length; i++) {
    const enRow = secondaryEnRows[i];
    const nameEn = enRow.school_name || '';
    if (!nameEn) continue;

    const moi = parseSecondaryMOI_EN(enRow);

    secondaryEntries.push({
      rowIndex: i,
      nameEn: nameEn.trim(),
      nameZh: '',
      normalizedEn: normalizeNameEn(nameEn),
      normalizedZh: '',
      district: (enRow.district || '').trim(),
      moi,
      source: 'CHSC secondary EN'
    });
  }

  for (let i = 0; i < secondaryTcRows.length; i++) {
    const tcRow = secondaryTcRows[i];
    const nameZh = tcRow['學校名稱'] || tcRow['\ufeff學校名稱'] || '';
    if (!nameZh) continue;

    const moi = parseSecondaryMOI_TC(tcRow);
    const district = tcRow['區域'] || tcRow['\ufeff區域'] || '';

    secondaryEntries.push({
      rowIndex: secondaryEnRows.length + i,
      nameEn: '',
      nameZh: nameZh.trim(),
      normalizedEn: '',
      normalizedZh: normalizeNameZh(nameZh),
      district: district.trim(),
      moi,
      source: 'CHSC secondary TC'
    });
  }

  console.log(`\nPrimary CHSC entries: ${primaryEntries.length}`);
  console.log(`Secondary CHSC entries: ${secondaryEntries.length}`);

  // Use direct import from schools.ts (FIX: no more broken regex!)
  console.log(`\nTotal schools in schools.ts: ${schools.length}`);

  const eligibleSchools = schools.filter(s => s.level === '小學' || s.level === '中學');
  console.log(`Eligible schools (Primary/Secondary): ${eligibleSchools.length}`);

  const mappings: any[] = [];
  const needsReview: any[] = [];
  const processed = new Set<string>();

  // Stats for reporting
  const matchStats: Record<string, number> = {
    exact_en: 0,
    exact_zh: 0,
    exact_en_district: 0,
    exact_zh_district: 0,
    fuzzy_en: 0,
    fuzzy_zh: 0,
    fuzzy_en_district: 0,
    fuzzy_zh_district: 0,
    no_match: 0,
    ambiguous: 0,
    missing_moi: 0
  };

  for (const school of eligibleSchools) {
    if (processed.has(school.id)) continue;
    processed.add(school.id);

    const chscEntries = school.level === '小學' ? primaryEntries : secondaryEntries;
    const result = findBestMatch(school.nameEn, school.name, school.district18, chscEntries);

    if (result.match && result.match.moi && result.match.moi.length > 0) {
      mappings.push({
        school_id: school.id,
        stage: school.level,
        instruction_languages: result.match.moi.join('|'),
        confidence: 'HIGH',
        source: result.match.source,
        match_method: result.method,
        match_score: result.score.toFixed(3),
        chsc_name: result.match.nameEn || result.match.nameZh
      });

      // Update stats
      if (result.method.startsWith('exact')) {
        matchStats[result.method] = (matchStats[result.method] || 0) + 1;
      } else if (result.method.startsWith('fuzzy')) {
        matchStats[result.method] = (matchStats[result.method] || 0) + 1;
      }
    } else if (result.match) {
      // Match found but no MOI
      matchStats.missing_moi++;
      needsReview.push({
        school_id: school.id,
        stage: school.level,
        reason: 'Missing MOI field in CHSC',
        candidate_info: `${school.nameEn} | ${school.name} | ${school.district18}`,
        top_candidates: formatCandidates(result.candidates)
      });
    } else if (result.method.includes('ambiguous')) {
      matchStats.ambiguous++;
      needsReview.push({
        school_id: school.id,
        stage: school.level,
        reason: 'Ambiguous CHSC match',
        candidate_info: `${school.nameEn} | ${school.name} | ${school.district18}`,
        top_candidates: formatCandidates(result.candidates)
      });
    } else {
      matchStats.no_match++;
      needsReview.push({
        school_id: school.id,
        stage: school.level,
        reason: 'No CHSC match',
        candidate_info: `${school.nameEn} | ${school.name} | ${school.district18}`,
        top_candidates: formatCandidates(result.candidates)
      });
    }
  }

  console.log(`\n=== Results ===`);
  console.log(`Mappings generated (HIGH confidence): ${mappings.length}`);
  console.log(`Needs review: ${needsReview.length}`);

  console.log(`\n=== Match Statistics ===`);
  console.log(`Exact EN matches: ${matchStats.exact_en}`);
  console.log(`Exact ZH matches: ${matchStats.exact_zh}`);
  console.log(`Exact EN+district matches: ${matchStats.exact_en_district}`);
  console.log(`Exact ZH+district matches: ${matchStats.exact_zh_district}`);
  console.log(`Fuzzy EN matches: ${matchStats.fuzzy_en}`);
  console.log(`Fuzzy ZH matches: ${matchStats.fuzzy_zh}`);
  console.log(`Fuzzy EN+district matches: ${matchStats.fuzzy_en_district || 0}`);
  console.log(`Fuzzy ZH+district matches: ${matchStats.fuzzy_zh_district || 0}`);
  console.log(`No match: ${matchStats.no_match}`);
  console.log(`Ambiguous matches: ${matchStats.ambiguous}`);
  console.log(`Missing MOI in CHSC: ${matchStats.missing_moi}`);

  // Write mapping CSV
  const mappingHeader = 'school_id,stage,instruction_languages,confidence,source,match_method,match_score,chsc_name,inference_reason,notes';
  const mappingRows = mappings.map(m =>
    `${m.school_id},${m.stage},${m.instruction_languages},${m.confidence},"${m.source}",${m.match_method},${m.match_score},"${(m.chsc_name || '').replace(/"/g, '""')}"`
  );
  fs.writeFileSync(OUTPUT_FILE, [mappingHeader, ...mappingRows].join('\n'), 'utf-8');
  console.log(`\nWritten mappings to: ${OUTPUT_FILE}`);

  // Write needs_review CSV
  const reviewHeader = 'school_id,stage,reason,candidate_info,top_candidates';
  const reviewRows = needsReview.map(r =>
    `${r.school_id},${r.stage},"${r.reason.replace(/"/g, '""')}","${r.candidate_info.replace(/"/g, '""')}","${(r.top_candidates || '').replace(/"/g, '""')}"`
  );
  fs.writeFileSync(NEEDS_REVIEW_FILE, [reviewHeader, ...reviewRows].join('\n'), 'utf-8');
  console.log(`Written needs_review to: ${NEEDS_REVIEW_FILE}`);

  // Summary by language
  const summary: Record<string, number> = {};
  for (const m of mappings) {
    const langs = m.instruction_languages;
    summary[langs] = (summary[langs] || 0) + 1;
  }
  console.log('\nBy instruction language combination:');
  for (const [langs, count] of Object.entries(summary).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${langs}: ${count}`);
  }

  // Summary by needs_review reason
  const reviewReasons: Record<string, number> = {};
  for (const r of needsReview) {
    reviewReasons[r.reason] = (reviewReasons[r.reason] || 0) + 1;
  }
  console.log('\nNeeds review by reason:');
  for (const [reason, count] of Object.entries(reviewReasons).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${reason}: ${count}`);
  }
}

main();
