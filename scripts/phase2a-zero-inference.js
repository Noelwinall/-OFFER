/**
 * Phase 2A: Zero-Inference Fact Check
 *
 * 严格遵守零推断原则：
 * - 无官方原文 = UNKNOWN
 * - 只有可自动验证的字段才标 PASS
 * - 不得推断、不得补全、不得猜测
 *
 * 依据：BOSS.md v1 + data-dictionary.md (zero-inference v1)
 */

const fs = require('fs');
const path = require('path');

// Read schools data
const schoolsPath = path.join(__dirname, '..', 'data', 'schools.ts');
const schoolsContent = fs.readFileSync(schoolsPath, 'utf-8');

const match = schoolsContent.match(/export const schools: School\[\] = (\[[\s\S]*\]);?/);
if (!match) {
  console.error('Failed to parse schools data');
  process.exit(1);
}

let schools;
try {
  let jsonStr = match[1].replace(/;$/, '');
  schools = JSON.parse(jsonStr);
} catch (e) {
  console.error('JSON parse error:', e.message);
  process.exit(1);
}

console.log(`Processing ${schools.length} schools with ZERO-INFERENCE principle...`);

/**
 * 按 data-dictionary.md 定义的默认状态：
 *
 * PASS (可自动验证):
 *   - id: 系统生成，格式检查
 *   - searchKeywords: 辅助字段
 *   - district: 可从地址推导
 *   - phone: 格式正确即可
 *   - latitude/longitude: 可自动生成
 *
 * UNKNOWN (需外部验证，无 evidence 一律 UNKNOWN):
 *   - name, nameEn: 需 EDB 确认
 *   - category: 需 EDB 确认
 *   - level: 需官方确认
 *   - tuitionMin/Max: 需 Evidence 三件套
 *   - curriculum: 需官网确认
 *   - language: 需官网确认
 *   - highlights: 主观性强
 *   - address: 需官方确认
 *   - website: 需可访问验证
 *   - applicationMaterials: 需官网列出
 *   - applicationLink: 需可访问验证
 *   - articulation: 需 Evidence 三件套
 */

const fieldRules = {
  // PASS - 可自动验证
  id: (v) => /^sch_\d{5}$/.test(v) ? 'PASS' : 'FAIL',
  searchKeywords: (v) => Array.isArray(v) ? 'PASS' : 'FAIL',
  district: (v) => ['港島', '九龍', '新界'].includes(v) ? 'PASS' : 'FAIL',
  phone: (v) => /^\d{8}$/.test(v) ? 'PASS' : 'FAIL',
  latitude: (v) => (typeof v === 'number' && v >= 22.1 && v <= 22.6) ? 'PASS' : 'FAIL',
  longitude: (v) => (typeof v === 'number' && v >= 113.8 && v <= 114.5) ? 'PASS' : 'FAIL',

  // UNKNOWN - 需外部验证，无 evidence 一律 UNKNOWN
  name: () => 'UNKNOWN',
  nameEn: () => 'UNKNOWN',
  category: () => 'UNKNOWN',
  level: () => 'UNKNOWN',
  tuitionMin: () => 'UNKNOWN',
  tuitionMax: () => 'UNKNOWN',
  curriculum: () => 'UNKNOWN',
  language: () => 'UNKNOWN',
  highlights: () => 'UNKNOWN',
  address: () => 'UNKNOWN',
  website: () => 'UNKNOWN',
  applicationMaterials: () => 'UNKNOWN',
  applicationLink: () => 'UNKNOWN',
  articulation: () => 'UNKNOWN'
};

// 按零推断原则的备注
const fieldNotes = {
  id: '',
  searchKeywords: '',
  district: '',
  phone: '',
  latitude: '',
  longitude: '',
  name: 'needs EDB confirmation',
  nameEn: 'needs official confirmation',
  category: 'needs EDB confirmation',
  level: 'needs official confirmation',
  tuitionMin: 'needs evidence (sourceUrl/capturedAt/confidence)',
  tuitionMax: 'needs evidence (sourceUrl/capturedAt/confidence)',
  curriculum: 'needs official website confirmation',
  language: 'needs official website confirmation',
  highlights: 'subjective - needs review',
  address: 'needs official confirmation',
  website: 'needs accessibility verification',
  applicationMaterials: 'needs official listing',
  applicationLink: 'needs accessibility verification',
  articulation: 'needs evidence (sourceUrl/capturedAt/confidence)'
};

// 需要检查的字段
const fieldsToCheck = [
  'id', 'name', 'nameEn', 'searchKeywords', 'category', 'district', 'level',
  'tuitionMin', 'tuitionMax', 'curriculum', 'language', 'highlights',
  'address', 'phone', 'website', 'applicationMaterials', 'applicationLink',
  'latitude', 'longitude', 'articulation'
];

// CSV 转义
const escapeCSV = (val) => {
  if (val === null || val === undefined) return '';
  const str = String(val);
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
};

// 生成 master-issues.csv
const issueRows = ['schoolId,field,status,currentValue,proposedValue,sourceUrl,capturedAt,confidence,notes'];

for (const school of schools) {
  for (const field of fieldsToCheck) {
    let currentValue = school[field];
    if (currentValue === undefined) currentValue = 'MISSING';

    const rule = fieldRules[field];
    const status = rule ? rule(currentValue) : 'UNKNOWN';
    const notes = fieldNotes[field] || '';

    // 按零推断原则：没有 evidence，不提 proposedValue
    const proposedValue = '';
    const sourceUrl = '';
    const capturedAt = '';
    const confidence = '';

    // 格式化 currentValue
    let csvValue = currentValue;
    if (typeof currentValue === 'object') {
      csvValue = JSON.stringify(currentValue);
    }

    issueRows.push([
      school.id,
      field,
      status,
      escapeCSV(csvValue),
      escapeCSV(proposedValue),
      escapeCSV(sourceUrl),
      escapeCSV(capturedAt),
      escapeCSV(confidence),
      escapeCSV(notes)
    ].join(','));
  }
}

// 写入 master-issues.csv
const issuesPath = path.join(__dirname, '..', 'docs', 'factcheck', 'master-issues.csv');
fs.writeFileSync(issuesPath, issueRows.join('\n'), 'utf-8');

// 生成 evidence-record.csv（空，因为没有实际 evidence）
const evidenceRows = ['schoolId,field,sourceUrl,capturedAt,confidence,rawText,verifiedBy,verifiedAt'];
// 零推断原则：没有实际访问官网，不能捏造 evidence
const evidencePath = path.join(__dirname, '..', 'docs', 'factcheck', 'evidence-record.csv');
fs.writeFileSync(evidencePath, evidenceRows.join('\n'), 'utf-8');

// 统计
const stats = { PASS: 0, FAIL: 0, UNKNOWN: 0 };
for (const row of issueRows.slice(1)) {
  const status = row.split(',')[2];
  if (stats[status] !== undefined) stats[status]++;
}

const total = issueRows.length - 1;
console.log(`\n=== Phase 2A Complete (Zero-Inference) ===`);
console.log(`Total checks: ${total} (${schools.length} schools × ${fieldsToCheck.length} fields)`);
console.log(`\nResults:`);
console.log(`  PASS:    ${stats.PASS} (${(stats.PASS / total * 100).toFixed(1)}%) - auto-verifiable`);
console.log(`  FAIL:    ${stats.FAIL} (${(stats.FAIL / total * 100).toFixed(1)}%) - format/range error`);
console.log(`  UNKNOWN: ${stats.UNKNOWN} (${(stats.UNKNOWN / total * 100).toFixed(1)}%) - needs external verification`);
console.log(`\nOutput files:`);
console.log(`  - docs/factcheck/master-issues.csv`);
console.log(`  - docs/factcheck/evidence-record.csv (empty - no evidence collected)`);
console.log(`\nNote: UNKNOWN means "needs official source verification"`);
console.log(`      Per zero-inference principle, no proposedValue without evidence.`);
