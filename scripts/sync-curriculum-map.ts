/**
 * Sync curriculum mapping to curriculum-map.ts
 * Merges existing international school mappings with new HK non-intl mappings
 */

import * as fs from 'fs';
import * as path from 'path';

// Existing mappings from curriculum-map.ts (international schools)
const existingMappings: Record<string, string[]> = {
  "edb_190543000123": ["BRITISH"],
  "edb_170887000123": ["BRITISH"],
  "edb_171034000123": ["BRITISH"],
  "edb_170879000123": ["BRITISH"],
  "edb_170860000123": ["BRITISH"],
  "edb_171034000223": ["BRITISH"],
  "edb_170348000123": ["BRITISH"],
  "edb_170895000123": ["BRITISH"],
  "edb_170909000123": ["BRITISH"],
  "edb_170747000123": ["BRITISH"],
  "edb_170399000133": ["IB"],
  "edb_190314000233": ["IB"],
  "edb_170836000133": ["IB"],
  "edb_170992000133": ["IB"],
  "edb_170917000133": ["IB"],
  "edb_216186000423": ["OTHER_INTL"],
  "edb_215406000423": ["BRITISH"],
  "edb_605557000123": ["IB"],
  "edb_325147000223": ["IB"],
  "edb_215791000123": ["IB"],
  "edb_215406000123": ["BRITISH"],
  "edb_214558000221": ["IB"],
  "edb_216011000523": ["CANADIAN"],
  "edb_527882000123": ["AMERICAN"],
  "edb_216186000323": ["OTHER_INTL"],
  "edb_590800000123": ["BRITISH"],
  "edb_287695000223": ["AMERICAN"],
  "edb_216003000223": ["OTHER_INTL"],
  "edb_598356000223": ["BRITISH"],
  "edb_213772000123": ["AMERICAN"],
  "edb_215520000123": ["OTHER_INTL"],
  "edb_214558000123": ["IB"],
  "edb_216275000623": ["AUSTRALIAN"],
  "edb_325147000623": ["IB"],
  "edb_522775000123": ["OTHER_INTL"],
  "edb_539155000323": ["IB"],
  "edb_325147000423": ["IB"],
  "edb_216216000123": ["OTHER_INTL"],
  "edb_215589000123": ["IB"],
  "edb_214949000523": ["OTHER_INTL"],
  "edb_214558000121": ["IB"],
  "edb_214949000123": ["OTHER_INTL"],
  "edb_606766000123": ["BRITISH"],
  "edb_607525000123": ["BRITISH"],
  "edb_214949000723": ["OTHER_INTL"],
  "edb_230979000123": ["IB"],
  "edb_215406000433": ["BRITISH"],
  "edb_216186000433": ["OTHER_INTL"],
  "edb_598356000333": ["BRITISH"],
  "edb_605557000133": ["IB"],
  "edb_215791000133": ["IB"],
  "edb_216003000433": ["OTHER_INTL"],
  "edb_216011000533": ["CANADIAN"],
  "edb_287695000233": ["AMERICAN"],
  "edb_215996000133": ["AMERICAN"],
  "edb_539155000333": ["IB"],
  "edb_214558000133": ["IB"],
  "edb_215589000133": ["IB"],
  "edb_216275000633": ["AUSTRALIAN"],
  "edb_216216000133": ["OTHER_INTL"],
  "edb_213772000233": ["AMERICAN"],
  "edb_590800000133": ["BRITISH"],
  "edb_214949000433": ["OTHER_INTL"],
  "edb_578789000133": ["IB"],
  "edb_606766000133": ["BRITISH"],
  "edb_214949000733": ["OTHER_INTL"],
  "edb_605638000123": ["AMERICAN"],
  "edb_567485000123": ["IB"],
  "edb_569747000223": ["IB"],
  "edb_560138000223": ["IB"],
  "edb_553190000323": ["DUAL_TRACK"],
  "edb_626864000133": ["AMERICAN"],
  "edb_567485000133": ["IB"],
  "edb_567450000133": ["IB"],
  "edb_553190000333": ["DUAL_TRACK"],
  "edb_560138000233": ["IB"],
  "edb_569747000233": ["IB"],
  "edb_605638000133": ["AMERICAN"],
};

// Read the new CSV mapping
const csvPath = path.join(__dirname, '../data/curriculum_mapping_hk_nonintl_v1.csv');
const csvContent = fs.readFileSync(csvPath, 'utf-8');

// Parse CSV and merge
const lines = csvContent.split('\n').filter(line => line.trim());
const newMappings: Record<string, string[]> = { ...existingMappings };

let added = 0;
let skipped = 0;

for (let i = 1; i < lines.length; i++) { // Skip header
  const parts = lines[i].split(',');
  if (parts.length >= 3) {
    const schoolId = parts[0].trim();
    const curriculum = parts[2].trim();

    if (schoolId && curriculum) {
      if (newMappings[schoolId]) {
        // Already exists - check if same curriculum
        if (!newMappings[schoolId].includes(curriculum)) {
          console.log(`Conflict: ${schoolId} has ${newMappings[schoolId]} but CSV says ${curriculum}`);
        }
        skipped++;
      } else {
        newMappings[schoolId] = [curriculum];
        added++;
      }
    }
  }
}

// Sort by school_id for consistent output
const sortedIds = Object.keys(newMappings).sort();

// Generate TypeScript file
const today = new Date().toISOString().split('T')[0];
let output = `// Curriculum Mapping V2
// Source: data/curriculum_mapping_v1.2.csv + data/curriculum_mapping_hk_nonintl_v1.csv
// Generated: ${today}
// Total mappings: ${sortedIds.length}
//
// DO NOT EDIT - Run \`npx tsx scripts/sync-curriculum-map.ts\` to regenerate

import type { CurriculumV2 } from "@/types/school";

export const curriculumMap: Record<string, CurriculumV2[]> = {
`;

for (const id of sortedIds) {
  const curricula = newMappings[id];
  output += `  "${id}": [\n`;
  for (const c of curricula) {
    output += `    "${c}"\n`;
  }
  output += `  ],\n`;
}

output += `};\n`;

// Write output
const outputPath = path.join(__dirname, '../data/mappings/curriculum-map.ts');
fs.writeFileSync(outputPath, output);

console.log('\n========== SYNC COMPLETE ==========\n');
console.log(`Existing mappings: ${Object.keys(existingMappings).length}`);
console.log(`New mappings added: ${added}`);
console.log(`Skipped (duplicates): ${skipped}`);
console.log(`Total mappings: ${sortedIds.length}`);
console.log(`\nOutput: ${outputPath}`);

// Breakdown by curriculum type
const breakdown: Record<string, number> = {};
for (const id of sortedIds) {
  for (const c of newMappings[id]) {
    breakdown[c] = (breakdown[c] || 0) + 1;
  }
}

console.log('\n========== BREAKDOWN BY CURRICULUM TYPE ==========\n');
for (const [curriculum, count] of Object.entries(breakdown).sort((a, b) => b[1] - a[1])) {
  console.log(`${curriculum}: ${count}`);
}
