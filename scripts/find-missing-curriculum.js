const fs = require('fs');
const content = fs.readFileSync('data/schools_raw.ts', 'utf-8');
const mapContent = fs.readFileSync('data/mappings/curriculum-map.ts', 'utf-8');

// Get all mapped IDs
const mappedIds = new Set();
const mapMatches = mapContent.match(/"edb_[^"]+"/g) || [];
for (const m of mapMatches) {
  mappedIds.add(m.replace(/"/g, ''));
}
console.log('Schools with curriculum mapping:', mappedIds.size);

// Extract all school objects
const schoolMatches = content.match(/\{[^{}]*"id"[^{}]*\}/g) || [];
let needsMapping = [];

for (const match of schoolMatches) {
  const levelMatch = match.match(/"level":\s*"([^"]+)"/);
  const categoryMatch = match.match(/"category":\s*"([^"]+)"/);
  const idMatch = match.match(/"id":\s*"([^"]+)"/);
  const nameMatch = match.match(/"name":\s*"([^"]+)"/);

  const level = levelMatch ? levelMatch[1] : '';
  const category = categoryMatch ? categoryMatch[1] : '';
  const id = idMatch ? idMatch[1] : '';
  const name = nameMatch ? nameMatch[1] : '';

  // Schools that need curriculum mapping: DSS/Private + Primary/Secondary
  if ((category === '直資' || category === '私立' || category === '國際') &&
      (level === '小學' || level === '中學')) {
    if (!mappedIds.has(id)) {
      needsMapping.push({ id, name, level, category });
    }
  }
}

console.log('Schools still needing mapping:', needsMapping.length);
console.log('\n=== MISSING SCHOOLS ===\n');

// Group by category
const byCategory = {};
for (const s of needsMapping) {
  if (!byCategory[s.category]) byCategory[s.category] = [];
  byCategory[s.category].push(s);
}

for (const [cat, schools] of Object.entries(byCategory)) {
  console.log('\n--- ' + cat + ' (' + schools.length + ') ---');
  for (const s of schools) {
    console.log(s.id + ',' + s.name + ',' + s.level);
  }
}
