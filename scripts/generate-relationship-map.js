/**
 * Generate relationship-map.ts from through_train_mapping_v1.csv
 */

const fs = require('fs');
const path = require('path');

// Read the CSV
const csvContent = fs.readFileSync(path.join(__dirname, '../data/through_train_mapping_v1.csv'), 'utf-8');
const lines = csvContent.split('\n').filter(l => l.trim());

// Parse CSV
const mappings = {};
for (let i = 1; i < lines.length; i++) {
  const [school_id, stage, relation_type, related_school_ids, confidence, source] = lines[i].split(',');
  if (school_id && related_school_ids) {
    mappings[school_id] = {
      relationType: relation_type,
      relatedSchoolIds: related_school_ids.split('|').filter(id => id.trim())
    };
  }
}

// Generate TypeScript
const today = new Date().toISOString().split('T')[0];
let output = `// School Relationship Mapping
// Source: data/through_train_mapping_v1.csv
// Generated: ${today}
// Total mappings: ${Object.keys(mappings).length}
//
// DO NOT EDIT - Run \`node scripts/generate-relationship-map.js\` to regenerate

import type { SchoolRelationship } from "@/types/school";

export interface RelationshipEntry {
  relationType: SchoolRelationship;
  relatedSchoolIds: string[];
}

export const relationshipMap: Record<string, RelationshipEntry> = {
`;

for (const [id, entry] of Object.entries(mappings).sort((a, b) => a[0].localeCompare(b[0]))) {
  output += `  "${id}": {\n`;
  output += `    relationType: "${entry.relationType}",\n`;
  output += `    relatedSchoolIds: [${entry.relatedSchoolIds.map(s => `"${s}"`).join(', ')}]\n`;
  output += `  },\n`;
}

output += `};\n`;

// Write output
fs.writeFileSync(path.join(__dirname, '../data/mappings/relationship-map.ts'), output);

console.log('Generated relationship-map.ts');
console.log('Total mappings:', Object.keys(mappings).length);

// Breakdown by type
const byType = {};
for (const entry of Object.values(mappings)) {
  byType[entry.relationType] = (byType[entry.relationType] || 0) + 1;
}
console.log('\nBy type:');
for (const [type, count] of Object.entries(byType)) {
  console.log(`  ${type}: ${count}`);
}
