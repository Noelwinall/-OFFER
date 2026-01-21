/**
 * missing-intl-fees.js
 *
 * 生成"国际学校费用尚未录入"清单
 *
 * 使用方式: node scripts/missing-intl-fees.js
 *
 * ============================================
 * 国际学校筛选条件 (isInternationalSchool):
 * ============================================
 * 使用字段:
 *   - category: 排除 "資助" 和 "公立" (官立/资助学校不视为国际学校)
 *   - nameEn: 包含 "INTERNATIONAL" (不区分大小写)
 *   - name: 包含 "國際"
 *
 * 排除条件:
 *   - nameEn 包含 "LIONS CLUBS INTERNATIONAL" (狮子会非学校)
 *
 * 逻辑: (nameEn 含 INTERNATIONAL 或 name 含 國際) 且 category 非資助/公立
 * ============================================
 */

const fs = require('fs');
const path = require('path');

// ============================================
// 1. 读取数据文件
// ============================================
const schoolsPath = path.join(__dirname, '..', 'data', 'schools.ts');
const feesPath = path.join(__dirname, '..', 'data', 'fees-2025-26.ts');

let schoolsContent, feesContent;
try {
  schoolsContent = fs.readFileSync(schoolsPath, 'utf-8');
  feesContent = fs.readFileSync(feesPath, 'utf-8');
} catch (err) {
  console.error('读取数据文件失败:', err.message);
  process.exit(1);
}

// ============================================
// 2. 解析 fees-2025-26.ts 获取已录入的 edb_id
// ============================================
const doneIds = new Set();
const feesIdRegex = /"(edb_[^"]+)":\s*\{/g;
let feesMatch;
while ((feesMatch = feesIdRegex.exec(feesContent)) !== null) {
  doneIds.add(feesMatch[1]);
}

// ============================================
// 3. 解析 schools.ts 提取学校信息
// ============================================
// 使用多行正则提取字段 (基于已知的 JSON-like 结构)
const schools = [];

// 更健壮的正则: 逐个学校对象提取
// 匹配 { "id": "...", ... } 块
const schoolBlockRegex = /\{\s*"id":\s*"([^"]+)"[\s\S]*?"name":\s*"([^"]+)"[\s\S]*?"nameEn":\s*"([^"]+)"[\s\S]*?"category":\s*"([^"]+)"[\s\S]*?"district":\s*"([^"]+)"[\s\S]*?"district18":\s*"([^"]+)"[\s\S]*?"level":\s*"([^"]+)"/g;

let schoolMatch;
while ((schoolMatch = schoolBlockRegex.exec(schoolsContent)) !== null) {
  schools.push({
    id: schoolMatch[1],
    name: schoolMatch[2],
    nameEn: schoolMatch[3],
    category: schoolMatch[4],
    district: schoolMatch[5],
    district18: schoolMatch[6],
    level: schoolMatch[7]
  });
}

if (schools.length === 0) {
  console.error('无法从 schools.ts 提取学校数据，请检查文件格式');
  process.exit(1);
}

console.log(`成功解析 ${schools.length} 所学校\n`);

// ============================================
// 4. 国际学校筛选函数
// ============================================
function isInternationalSchool(s) {
  // 排除官立/资助学校
  if (s.category === '資助' || s.category === '公立') {
    return false;
  }

  // 排除狮子会 (非学校)
  if (s.nameEn.includes('LIONS CLUBS INTERNATIONAL')) {
    return false;
  }

  // 名称包含"国际"
  const nameEnUpper = s.nameEn.toUpperCase();
  const hasInternationalEn = nameEnUpper.includes('INTERNATIONAL');
  const hasInternationalZh = s.name.includes('國際');

  return hasInternationalEn || hasInternationalZh;
}

// ============================================
// 5. 筛选国际学校并分类
// ============================================
const internationalSchools = schools.filter(isInternationalSchool);
const missingSchools = internationalSchools.filter(s => !doneIds.has(s.id));
const recordedSchools = internationalSchools.filter(s => doneIds.has(s.id));

const missingIds = new Set(missingSchools.map(s => s.id));

// ============================================
// 6. 输出统计总览
// ============================================
console.log('═'.repeat(60));
console.log('  国际学校费用录入情况统计');
console.log('═'.repeat(60));
console.log('');

const stats = {
  international_total: internationalSchools.length,
  fees_recorded: recordedSchools.length,
  fees_missing: missingSchools.length,
  missing_ratio: ((missingSchools.length / internationalSchools.length) * 100).toFixed(1) + '%'
};

console.table([stats]);
console.log('');

// ============================================
// 7. 缺失清单表格 (按学校英文名排序)
// ============================================
console.log('═'.repeat(60));
console.log('  缺失费用的国际学校清单');
console.log('═'.repeat(60));
console.log('');

// 按 nameEn 排序
const sortedMissing = [...missingSchools].sort((a, b) =>
  a.nameEn.localeCompare(b.nameEn)
);

// 准备表格数据
const missingTable = sortedMissing.map((s, idx) => ({
  '#': idx + 1,
  'school_name_en': s.nameEn.length > 45 ? s.nameEn.substring(0, 42) + '...' : s.nameEn,
  'school_name_zh': s.name,
  'edb_id': s.id,
  'level': s.level,
  'district': s.district18
}));

console.table(missingTable);
console.log('');

// ============================================
// 8. 同集团多校区聚合表
// ============================================
console.log('═'.repeat(60));
console.log('  可能重复/同集团多校区聚合');
console.log('═'.repeat(60));
console.log('');

// 提取 baseName (去掉括号和 campus 后缀)
function getBaseName(nameEn) {
  return nameEn
    .replace(/\s*\([^)]*\)\s*/g, '')  // 去掉括号内容
    .replace(/\s*-\s*[A-Za-z].*$/g, '') // 去掉 "- xxx" 后缀
    .replace(/\s+(CAMPUS|BRANCH|CENTRE|CENTER)$/i, '') // 去掉常见后缀
    .trim();
}

const groupedByBaseName = {};
missingSchools.forEach(s => {
  const baseName = getBaseName(s.nameEn);
  if (!groupedByBaseName[baseName]) {
    groupedByBaseName[baseName] = [];
  }
  groupedByBaseName[baseName].push(s);
});

// 只显示有多个校区的集团
const multiCampusGroups = Object.entries(groupedByBaseName)
  .filter(([_, arr]) => arr.length > 1)
  .sort((a, b) => b[1].length - a[1].length);

if (multiCampusGroups.length === 0) {
  console.log('(无多校区集团)');
} else {
  console.log(`共 ${multiCampusGroups.length} 个多校区集团:\n`);

  multiCampusGroups.forEach(([baseName, arr], idx) => {
    console.log(`${idx + 1}. ${baseName} (${arr.length} 个校区)`);
    arr.forEach(s => {
      console.log(`   - ${s.id} | ${s.name} | ${s.level}`);
    });
    console.log('');
  });
}

// ============================================
// 9. 可选: 输出 CSV
// ============================================
const outputDir = path.join(__dirname, '_output');
const csvPath = path.join(outputDir, 'missing-intl-fees.csv');

// 确保输出目录存在
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 生成 CSV 内容
const csvHeader = 'school_name_en,school_name_zh,edb_id,level,district,baseName';
const csvRows = sortedMissing.map(s => {
  const baseName = getBaseName(s.nameEn);
  // 转义包含逗号或引号的字段
  const escape = (str) => {
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return '"' + str.replace(/"/g, '""') + '"';
    }
    return str;
  };
  return [
    escape(s.nameEn),
    escape(s.name),
    s.id,
    s.level,
    s.district18,
    escape(baseName)
  ].join(',');
});

const csvContent = [csvHeader, ...csvRows].join('\n');
fs.writeFileSync(csvPath, csvContent, 'utf-8');

console.log('═'.repeat(60));
console.log(`CSV 已输出到: ${csvPath}`);
console.log('═'.repeat(60));
