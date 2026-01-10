/**
 * Phase 0: School Reality Check
 *
 * Compare project schools against official EDB baseline
 * 依据：BOSS.md v1
 */

const fs = require('fs');
const path = require('path');

console.log('=== Phase 0: School Reality Check ===\n');

// ============ STEP 1: Load EDB Baseline Data ============
console.log('Loading EDB baseline data...');

const edbCsvPath = path.join(__dirname, '..', 'docs', 'factcheck', 'SCH_LOC_EDB_utf8.csv');
const edbContent = fs.readFileSync(edbCsvPath, 'utf-8');
const edbLines = edbContent.split('\n').filter(line => line.trim());

// Parse CSV header
const headerLine = edbLines[0].replace(/^\uFEFF/, ''); // Remove BOM
const headers = parseCSVLine(headerLine);

console.log('EDB CSV headers:', headers.slice(0, 10).join(', '), '...');

// Parse EDB schools
const edbSchools = [];
for (let i = 1; i < edbLines.length; i++) {
  const values = parseCSVLine(edbLines[i]);
  if (values.length < 10) continue;

  const school = {
    officialId: values[0],
    categoryEn: values[1],
    categoryZh: values[2],
    nameEn: values[3],
    nameZh: values[4],
    addressEn: values[5],
    addressZh: values[6],
    district: values[19] || '',
    financeType: values[21] || '',
    level: values[23] || '',
    phone: values[25] || '',
    website: values[29] || ''
  };

  // Normalize names for matching
  school.nameZhNorm = normalizeName(school.nameZh);
  school.nameEnNorm = normalizeName(school.nameEn);

  edbSchools.push(school);
}

console.log('Loaded EDB schools:', edbSchools.length);

// ============ STEP 2: Generate Baseline CSV ============
console.log('\nGenerating baseline-schools.csv...');

const baselineRows = ['officialId,officialNameZh,officialNameEn,schoolType,level,district,financeType,website'];
edbSchools.forEach(s => {
  baselineRows.push([
    escapeCSV(s.officialId),
    escapeCSV(s.nameZh),
    escapeCSV(s.nameEn),
    escapeCSV(s.categoryZh),
    escapeCSV(s.level),
    escapeCSV(s.district),
    escapeCSV(s.financeType),
    escapeCSV(s.website)
  ].join(','));
});

const baselinePath = path.join(__dirname, '..', 'docs', 'factcheck', 'baseline-schools.csv');
fs.writeFileSync(baselinePath, baselineRows.join('\n'), 'utf-8');
console.log('Written:', baselinePath);

// ============ STEP 3: Load Project Schools ============
console.log('\nLoading project schools...');

const schoolsPath = path.join(__dirname, '..', 'data', 'schools.ts');
const schoolsContent = fs.readFileSync(schoolsPath, 'utf-8');
const match = schoolsContent.match(/export const schools: School\[\] = (\[[\s\S]*\]);?/);
const projectSchools = JSON.parse(match[1].replace(/;$/, ''));

console.log('Loaded project schools:', projectSchools.length);

// ============ STEP 4: Match Schools ============
console.log('\nMatching schools...');

// Create lookup maps for EDB schools
const edbByNameZh = new Map();
const edbByNameEn = new Map();
const edbByNormZh = new Map();
const edbByNormEn = new Map();

edbSchools.forEach(s => {
  // Exact match maps
  if (s.nameZh) {
    if (!edbByNameZh.has(s.nameZh)) edbByNameZh.set(s.nameZh, []);
    edbByNameZh.get(s.nameZh).push(s);
  }
  if (s.nameEn) {
    const key = s.nameEn.toUpperCase();
    if (!edbByNameEn.has(key)) edbByNameEn.set(key, []);
    edbByNameEn.get(key).push(s);
  }
  // Normalized match maps
  if (s.nameZhNorm) {
    if (!edbByNormZh.has(s.nameZhNorm)) edbByNormZh.set(s.nameZhNorm, []);
    edbByNormZh.get(s.nameZhNorm).push(s);
  }
  if (s.nameEnNorm) {
    if (!edbByNormEn.has(s.nameEnNorm)) edbByNormEn.set(s.nameEnNorm, []);
    edbByNormEn.get(s.nameEnNorm).push(s);
  }
});

// Match each project school
const matchResults = [];
let matched = 0, unmatched = 0, ambiguous = 0;

projectSchools.forEach(ps => {
  const result = {
    schoolId: ps.id,
    currentName: ps.name,
    currentNameEn: ps.nameEn,
    matchStatus: 'UNMATCHED',
    matchedOfficialName: '',
    matchedOfficialId: '',
    matchScore: 0,
    notes: ''
  };

  // Try exact match on Chinese name
  let matches = edbByNameZh.get(ps.name);
  if (matches && matches.length === 1) {
    result.matchStatus = 'MATCHED';
    result.matchedOfficialName = matches[0].nameZh;
    result.matchedOfficialId = matches[0].officialId;
    result.matchScore = 100;
    result.notes = 'exact match (zh)';
    matched++;
    matchResults.push(result);
    return;
  } else if (matches && matches.length > 1) {
    result.matchStatus = 'AMBIGUOUS';
    result.matchedOfficialName = matches.map(m => m.nameZh).join(' | ');
    result.matchScore = 90;
    result.notes = 'multiple matches (zh): ' + matches.length;
    ambiguous++;
    matchResults.push(result);
    return;
  }

  // Try exact match on English name
  matches = edbByNameEn.get((ps.nameEn || '').toUpperCase());
  if (matches && matches.length === 1) {
    result.matchStatus = 'MATCHED';
    result.matchedOfficialName = matches[0].nameZh;
    result.matchedOfficialId = matches[0].officialId;
    result.matchScore = 95;
    result.notes = 'exact match (en)';
    matched++;
    matchResults.push(result);
    return;
  } else if (matches && matches.length > 1) {
    result.matchStatus = 'AMBIGUOUS';
    result.matchedOfficialName = matches.map(m => m.nameZh).join(' | ');
    result.matchScore = 85;
    result.notes = 'multiple matches (en): ' + matches.length;
    ambiguous++;
    matchResults.push(result);
    return;
  }

  // Try normalized match on Chinese name
  const normNameZh = normalizeName(ps.name);
  matches = edbByNormZh.get(normNameZh);
  if (matches && matches.length === 1) {
    result.matchStatus = 'MATCHED';
    result.matchedOfficialName = matches[0].nameZh;
    result.matchedOfficialId = matches[0].officialId;
    result.matchScore = 80;
    result.notes = 'fuzzy match (zh normalized)';
    matched++;
    matchResults.push(result);
    return;
  } else if (matches && matches.length > 1) {
    result.matchStatus = 'AMBIGUOUS';
    result.matchedOfficialName = matches.map(m => m.nameZh).join(' | ');
    result.matchScore = 70;
    result.notes = 'multiple fuzzy matches (zh): ' + matches.length;
    ambiguous++;
    matchResults.push(result);
    return;
  }

  // Try partial match - check if any EDB school name contains the project school name (or vice versa)
  const partialMatches = [];
  for (const edb of edbSchools) {
    if (edb.nameZh && ps.name) {
      // Remove common suffixes and check containment
      const cleanProject = ps.name.replace(/（.*）/g, '').replace(/\(.*\)/g, '');
      const cleanEdb = edb.nameZh.replace(/（.*）/g, '').replace(/\(.*\)/g, '');

      if (cleanEdb.includes(cleanProject) || cleanProject.includes(cleanEdb)) {
        if (cleanProject.length >= 4 && cleanEdb.length >= 4) { // Avoid short matches
          partialMatches.push(edb);
        }
      }
    }
  }

  if (partialMatches.length === 1) {
    result.matchStatus = 'MATCHED';
    result.matchedOfficialName = partialMatches[0].nameZh;
    result.matchedOfficialId = partialMatches[0].officialId;
    result.matchScore = 60;
    result.notes = 'partial match';
    matched++;
    matchResults.push(result);
    return;
  } else if (partialMatches.length > 1 && partialMatches.length <= 3) {
    result.matchStatus = 'AMBIGUOUS';
    result.matchedOfficialName = partialMatches.map(m => m.nameZh).slice(0, 3).join(' | ');
    result.matchScore = 50;
    result.notes = 'multiple partial matches: ' + partialMatches.length;
    ambiguous++;
    matchResults.push(result);
    return;
  }

  // No match found - likely synthetic/non-existent
  result.matchStatus = 'UNMATCHED';
  result.notes = detectSyntheticPattern(ps.name);
  unmatched++;
  matchResults.push(result);
});

console.log('Match results:');
console.log('  MATCHED:', matched);
console.log('  UNMATCHED:', unmatched);
console.log('  AMBIGUOUS:', ambiguous);

// ============ STEP 5: Generate Match Results CSV ============
console.log('\nGenerating match-results.csv...');

const matchRows = ['schoolId,currentName,currentNameEn,matchStatus,matchedOfficialName,matchedOfficialId,matchScore,notes'];
matchResults.forEach(r => {
  matchRows.push([
    r.schoolId,
    escapeCSV(r.currentName),
    escapeCSV(r.currentNameEn),
    r.matchStatus,
    escapeCSV(r.matchedOfficialName),
    escapeCSV(r.matchedOfficialId),
    r.matchScore,
    escapeCSV(r.notes)
  ].join(','));
});

const matchPath = path.join(__dirname, '..', 'docs', 'factcheck', 'match-results.csv');
fs.writeFileSync(matchPath, matchRows.join('\n'), 'utf-8');
console.log('Written:', matchPath);

// ============ STEP 6: Generate Summary ============
console.log('\nGenerating reality-check-summary.md...');

// Analyze unmatched patterns
const unmatchedSchools = matchResults.filter(r => r.matchStatus === 'UNMATCHED');
const patternCounts = {};
unmatchedSchools.forEach(r => {
  const pattern = r.notes || 'unknown';
  patternCounts[pattern] = (patternCounts[pattern] || 0) + 1;
});

const sortedPatterns = Object.entries(patternCounts).sort((a, b) => b[1] - a[1]);

// Get top 50 unmatched
const unmatchedTop50 = unmatchedSchools.slice(0, 50);

// Get top 50 ambiguous
const ambiguousSchools = matchResults.filter(r => r.matchStatus === 'AMBIGUOUS');
const ambiguousTop50 = ambiguousSchools.slice(0, 50);

const summary = `# School Reality Check Summary

> Phase 0: 官方基准对账结果
> 生成时间: ${new Date().toISOString().split('T')[0]}
> 依据: BOSS.md v1

---

## 概要

| 指标 | 数量 | 比例 |
|------|------|------|
| **项目学校总数** | ${projectSchools.length} | 100% |
| **EDB 官方学校数** | ${edbSchools.length} | - |
| **MATCHED** | ${matched} | ${(matched/projectSchools.length*100).toFixed(1)}% |
| **UNMATCHED** | ${unmatched} | ${(unmatched/projectSchools.length*100).toFixed(1)}% |
| **AMBIGUOUS** | ${ambiguous} | ${(ambiguous/projectSchools.length*100).toFixed(1)}% |

---

## 结论

${matched === 0 ? '**严重问题：0 所学校与官方数据匹配**' : ''}

项目中 **${unmatched} 所学校 (${(unmatched/projectSchools.length*100).toFixed(1)}%)** 无法在 EDB 官方数据中找到对应记录，
这些学校很可能是**合成/虚构数据**。

---

## UNMATCHED 模式分析

| 模式 | 数量 |
|------|------|
${sortedPatterns.slice(0, 10).map(([pattern, count]) => `| ${pattern} | ${count} |`).join('\n')}

---

## UNMATCHED Top 50

| # | 学校ID | 名称 | 模式/原因 |
|---|--------|------|----------|
${unmatchedTop50.map((r, i) => `| ${i+1} | ${r.schoolId} | ${r.currentName.substring(0, 30)} | ${r.notes.substring(0, 40)} |`).join('\n')}

---

## AMBIGUOUS Top 50 (需人工确认)

| # | 学校ID | 名称 | 可能匹配 | 分数 |
|---|--------|------|----------|------|
${ambiguousTop50.map((r, i) => `| ${i+1} | ${r.schoolId} | ${r.currentName.substring(0, 25)} | ${r.matchedOfficialName.substring(0, 40)} | ${r.matchScore} |`).join('\n')}

---

## 数据来源

- EDB School Location and Information: [data.gov.hk](https://data.gov.hk/en-data/dataset/hk-edb-schinfo-school-location-and-information)
- 下载时间: ${new Date().toISOString().split('T')[0]}
- 学校数量: ${edbSchools.length}

---

## 输出文件

- \`baseline-schools.csv\`: 官方基准学校库 (${edbSchools.length} 所)
- \`match-results.csv\`: 匹配结果 (${projectSchools.length} 条)
- \`reality-check-summary.md\`: 本摘要

---

*报告版本: v1*
`;

const summaryPath = path.join(__dirname, '..', 'docs', 'factcheck', 'reality-check-summary.md');
fs.writeFileSync(summaryPath, summary, 'utf-8');
console.log('Written:', summaryPath);

console.log('\n=== Phase 0 Complete ===');

// ============ Helper Functions ============

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
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }

  result.push(current.trim());
  return result;
}

function normalizeName(name) {
  if (!name) return '';
  return name
    .replace(/（.*）/g, '')      // Remove Chinese parentheses content
    .replace(/\(.*\)/g, '')     // Remove English parentheses content
    .replace(/第\d+校/g, '')    // Remove 第N校
    .replace(/分校/g, '')       // Remove 分校
    .replace(/校舍/g, '')       // Remove 校舍
    .replace(/\s+/g, '')        // Remove whitespace
    .trim();
}

function detectSyntheticPattern(name) {
  if (/（第\d+校）/.test(name)) return 'synthetic: 第N校 pattern';
  if (/（.+分校）/.test(name)) return 'synthetic: 分校 pattern';
  if (/（.+區）$/.test(name)) return 'synthetic: 區 suffix pattern';
  if (/國際.+區/.test(name)) return 'synthetic: 國際+區 pattern';
  if (/美國國際|法國國際|澳洲國際|加拿大國際|新加坡國際/.test(name)) {
    return 'synthetic: fake international pattern';
  }
  return 'no match in EDB database';
}

function escapeCSV(val) {
  if (val === null || val === undefined) return '';
  const str = String(val);
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return '"' + str.replace(/"/g, '""') + '"';
  }
  return str;
}
