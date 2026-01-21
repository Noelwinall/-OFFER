const fs = require('fs');
const content = fs.readFileSync('data/schools.ts', 'utf-8');

// 提取所有学校
const schools = [];
const regex = /\{\s*"id":\s*"([^"]+)"[^}]*?"name":\s*"([^"]+)"[^}]*?"nameEn":\s*"([^"]+)"[^}]*?"category":\s*"([^"]+)"[^}]*?"level":\s*"([^"]+)"/gs;
let match;
while ((match = regex.exec(content)) !== null) {
  schools.push({
    id: match[1],
    name: match[2],
    nameEn: match[3],
    category: match[4],
    level: match[5]
  });
}

// 筛选国际学校
const intl = schools.filter(s =>
  (s.nameEn.toUpperCase().includes('INTERNATIONAL') || s.name.includes('國際')) &&
  !s.nameEn.includes('LIONS CLUBS INTERNATIONAL')
);

// 读取已有费用数据
const feesContent = fs.readFileSync('data/fees-2025-26.ts', 'utf-8');
const existingIds = [];
const idRegex = /"(edb_[^"]+)":\s*\{/g;
let idMatch;
while ((idMatch = idRegex.exec(feesContent)) !== null) {
  existingIds.push(idMatch[1]);
}

// 按 level 分类
const pending = intl.filter(s => !existingIds.includes(s.id));

const kindergartens = pending.filter(s => s.level === '幼稚園');
const primary = pending.filter(s => s.level === '小學');
const secondary = pending.filter(s => s.level === '中學');

console.log('=== 国际学校费用数据待处理清单（按级别分类）===');
console.log('');
console.log('统计:');
console.log('  已录入:', existingIds.length, '所');
console.log('  待录入 - 幼稚園:', kindergartens.length, '所');
console.log('  待录入 - 小學:', primary.length, '所');
console.log('  待录入 - 中學:', secondary.length, '所');
console.log('');

// 去重：按学校名分组
function groupBySchoolName(arr) {
  const groups = {};
  arr.forEach(s => {
    // 提取核心学校名（去掉分校信息）
    let baseName = s.nameEn
      .replace(/\s*\(.*?\)\s*/g, '')  // 去掉括号内容
      .replace(/\s*-\s*.*$/g, '')      // 去掉 - 后的内容
      .trim();
    if (!groups[baseName]) groups[baseName] = [];
    groups[baseName].push(s);
  });
  return groups;
}

console.log('【待录入 - 小學】(' + primary.length + ' 所)');
const primaryGroups = groupBySchoolName(primary);
let idx = 1;
for (const [name, arr] of Object.entries(primaryGroups)) {
  console.log(idx + '. ' + name);
  arr.forEach(s => {
    console.log('   - ' + s.id + ' | ' + s.nameEn);
  });
  idx++;
}
console.log('');

console.log('【待录入 - 中學】(' + secondary.length + ' 所)');
const secondaryGroups = groupBySchoolName(secondary);
idx = 1;
for (const [name, arr] of Object.entries(secondaryGroups)) {
  console.log(idx + '. ' + name);
  arr.forEach(s => {
    console.log('   - ' + s.id + ' | ' + s.nameEn);
  });
  idx++;
}
