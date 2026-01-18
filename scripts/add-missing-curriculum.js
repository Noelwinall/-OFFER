/**
 * Add missing curriculum mappings based on research
 */

const fs = require('fs');
const path = require('path');

// New mappings based on web research
const newMappings = {
  // DSS school - HKDSE
  "edb_558095000233": "HK_LOCAL", // 香港兆基創意書院 - offers HKDSE

  // ESF Special Needs School
  "edb_250686000223": "OTHER_INTL", // 賽馬會善樂學校 (Primary) - ESF special needs
  "edb_250686000233": "OTHER_INTL", // 賽馬會善樂學校 (Secondary) - ESF special needs

  // International Schools
  "edb_534579000123": "IB", // 弘爵國際學校 (Primary) - British + IGCSE + IB
  "edb_534579000133": "IB", // 弘爵國際學校 (Secondary) - British + IGCSE + IB DP
  "edb_548430000623": "OTHER_INTL", // 蒙特梭利國際學校 (Primary) - Montessori
  "edb_548430000633": "OTHER_INTL", // 蒙特梭利國際學校 (Secondary) - Montessori
  "edb_570370000423": "AMERICAN", // 港灣學校 (Primary) - American curriculum
  "edb_570370000323": "AMERICAN", // 港灣學校 (Primary) - American curriculum
  "edb_570370000333": "AMERICAN", // 港灣學校 (Secondary) - American curriculum
  "edb_230987000123": "BRITISH", // DISCOVERY BAY INTERNATIONAL SCHOOL (Primary) - English National + IGCSE/A-Level
  "edb_230987000233": "BRITISH", // DISCOVERY BAY INTERNATIONAL SCHOOL (Secondary) - IGCSE/A-Level
  "edb_230987000133": "BRITISH", // DISCOVERY BAY INTERNATIONAL SCHOOL (Secondary) - IGCSE/A-Level
  "edb_518620000123": "BRITISH", // LANTAU INTERNATIONAL SCHOOL - British Curriculum
  "edb_518620000223": "BRITISH", // LANTAU INTERNATIONAL SCHOOL - British Curriculum
  "edb_518620000423": "BRITISH", // LANTAU INTERNATIONAL SCHOOL - British Curriculum
  "edb_569836000123": "CANADIAN", // 基督教國際學校 (Primary) - Alberta + IB
  "edb_569836000133": "CANADIAN", // 基督教國際學校 (Secondary) - Alberta + IB

  // St. Hilary's Group - International curriculum (not DSE)
  "edb_130060000123": "OTHER_INTL", // 漢師德萃學校 - St. Hilary's group
  "edb_603600000123": "OTHER_INTL", // 德萃小學 - St. Hilary's group
  "edb_216224000123": "OTHER_INTL", // 神召會德萃書院 (Primary) - St. Hilary's group
  "edb_615137000133": "IB", // 大光德萃書院 - IGCSE + IB/A-Level (IB World School)

  // IB Schools
  "edb_607290000123": "IB", // 保良局建造商會學校 - IB-PYP

  // Waldorf Schools - OTHER_INTL
  "edb_620548000123": "OTHER_INTL", // 花園華德福學校 - Waldorf
  "edb_608319000223": "OTHER_INTL", // 香島華德福學校 (Primary/Sec) - Waldorf
  "edb_608319000233": "OTHER_INTL", // 香島華德福學校 (Secondary) - Waldorf
  "edb_215287000933": "OTHER_INTL", // 香港華德福教育基金會瑪利亞書院 - Waldorf
  "edb_215287001134": "OTHER_INTL", // 香港華德福教育基金會瑪利亞書院 - Waldorf
  "edb_215287001234": "OTHER_INTL", // 香港華德福教育基金會瑪利亞書院 - Waldorf
  "edb_215287001534": "OTHER_INTL", // 香港華德福教育基金會瑪利亞書院 - Waldorf
  "edb_215287001334": "OTHER_INTL", // 香港華德福教育基金會瑪利亞書院 - Waldorf
  "edb_215287001034": "OTHER_INTL", // 香港華德福教育基金會瑪利亞書院 - Waldorf
  "edb_215287001434": "OTHER_INTL", // 香港華德福教育基金會瑪利亞書院 - Waldorf

  // Alternative/Special Education
  "edb_112720000123": "OTHER_INTL", // 鄉師自然學校 - Alternative education
  "edb_571130000323": "OTHER_INTL", // 愛培學校 - Special needs school
  "edb_622079000123": "OTHER_INTL", // 安基司學校 - EYFS + blended curriculum
  "edb_600814000123": "OTHER_INTL", // DISCOVERY MONTESSORI ACADEMY - Montessori

  // Tutorial Colleges
  "edb_315699000333": "HK_LOCAL", // 華夏書院 - Tutorial college (DSE prep)
  "edb_625264000133": "BRITISH", // 倫敦卓越書院 - UK pathways
  "edb_612820000133": "HK_LOCAL", // 泰來書院 - Tutorial college (DSE prep)

  // Local Private Schools (assumed HK_LOCAL based on private status, no intl curriculum evidence)
  "edb_598062000123": "HK_LOCAL", // 英藝英文小學 - Local private
  "edb_626902000123": "HK_LOCAL", // 博睿學校 - Local private
  "edb_596140000123": "HK_LOCAL", // 樹宏學校 (Primary) - Local private
  "edb_596140000233": "HK_LOCAL", // 樹宏學校 (Secondary) - Local private
  "edb_620785000123": "HK_LOCAL", // 安菲爾聖鮑思高冠英學校 - Local private
  "edb_606812000123": "HK_LOCAL", // 禮仁小學 - Local private
  "edb_619957000123": "HK_LOCAL", // 奧柏學校 - Local private
  "edb_608327000123": "HK_LOCAL", // 示昕學校 (Primary) - Local private
  "edb_608327000133": "HK_LOCAL", // 示昕學校 (Secondary) - Local private
  "edb_579009000123": "HK_LOCAL", // 銀礦灣學校 - Village school
  "edb_216208000123": "HK_LOCAL", // 地利亞英文小學暨幼稚園 - Local curriculum in English
  "edb_587567000123": "HK_LOCAL", // 安菲爾學校 - Local private
  "edb_617393000123": "HK_LOCAL", // 百卉九江書院 - Local private
  "edb_590371000223": "HK_LOCAL", // 弘志學校 - Local private
  "edb_623067000133": "HK_LOCAL", // 聖道百卉書院 - Local private secondary
  "edb_621374000133": "HK_LOCAL", // 香港紫荊書院 - Local private
};

// Read current curriculum-map.ts
const mapPath = path.join(__dirname, '../data/mappings/curriculum-map.ts');
let content = fs.readFileSync(mapPath, 'utf-8');

// Count existing mappings
const existingCount = (content.match(/"edb_/g) || []).length;
console.log('Existing mappings:', existingCount);

// Find the end of the curriculumMap object (before the closing };)
const insertPoint = content.lastIndexOf('};');

// Build new entries
let newEntries = '';
let addedCount = 0;

for (const [id, curriculum] of Object.entries(newMappings)) {
  // Check if already exists
  if (content.includes(`"${id}"`)) {
    console.log(`Skipping ${id} - already exists`);
    continue;
  }

  newEntries += `  "${id}": [\n    "${curriculum}"\n  ],\n`;
  addedCount++;
}

if (addedCount > 0) {
  // Insert new entries before the closing };
  content = content.slice(0, insertPoint) + newEntries + content.slice(insertPoint);

  // Update the total count in header
  const newTotal = existingCount + addedCount;
  content = content.replace(/Total mappings: \d+/, `Total mappings: ${newTotal}`);

  // Write back
  fs.writeFileSync(mapPath, content);
  console.log(`Added ${addedCount} new mappings`);
  console.log(`New total: ${newTotal}`);
} else {
  console.log('No new mappings to add');
}

// Show breakdown
const allMappings = content.match(/"edb_[^"]+": \[\n\s+"([^"]+)"/g) || [];
const breakdown = {};
for (const m of allMappings) {
  const curriculum = m.match(/"([A-Z_]+)"$/)?.[1];
  if (curriculum) {
    breakdown[curriculum] = (breakdown[curriculum] || 0) + 1;
  }
}

console.log('\n=== BREAKDOWN BY CURRICULUM TYPE ===\n');
for (const [c, count] of Object.entries(breakdown).sort((a, b) => b[1] - a[1])) {
  console.log(`${c}: ${count}`);
}
