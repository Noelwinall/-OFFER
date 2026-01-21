const fs = require('fs');
const content = fs.readFileSync('data/schools.ts', 'utf-8');
const feesContent = fs.readFileSync('data/fees-2025-26.ts', 'utf-8');

// Get existing IDs
const existingIds = [];
const idRegex = /"(edb_[^"]+)":\s*\{/g;
let idMatch;
while ((idMatch = idRegex.exec(feesContent)) !== null) {
  existingIds.push(idMatch[1]);
}

// Extract schools
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

// Filter international kindergartens
const intlKG = schools.filter(s =>
  s.level === '幼稚園' &&
  (s.nameEn.toUpperCase().includes('INTERNATIONAL') || s.name.includes('國際')) &&
  !s.nameEn.includes('LIONS CLUBS INTERNATIONAL') &&
  !existingIds.includes(s.id)
);

// Group by base name
const groups = {};
intlKG.forEach(s => {
  let baseName = s.nameEn
    .replace(/\s*\(.*?\)\s*/g, '')
    .replace(/\s*-\s*.*$/g, '')
    .trim();
  if (!groups[baseName]) groups[baseName] = [];
  groups[baseName].push(s);
});

console.log('待录入国际幼稚园（按学校分组）:');
console.log('共 ' + Object.keys(groups).length + ' 个学校集团，' + intlKG.length + ' 个校区');
console.log('');

let idx = 1;
for (const [name, arr] of Object.entries(groups)) {
  console.log(idx + '. ' + name + ' (' + arr.length + '个校区)');
  arr.forEach(s => {
    console.log('   - ' + s.id + ' | ' + s.name);
  });
  idx++;
}
