import { schools } from '../../data/schools.ts';
import * as fs from 'fs';

// Read all mapping files
const v2Csv = fs.readFileSync('./data/instruction_language_mapping_v2.csv', 'utf-8');
const v2Ids = new Set(v2Csv.trim().split('\n').slice(1).map(line => line.split(',')[0]));

const specialEdCsv = fs.readFileSync('./data/instruction_language_mapping_special_ed.csv', 'utf-8');
const specialEdIds = new Set(specialEdCsv.trim().split('\n').slice(1).map(line => line.split(',')[0]));

// International schools from docx (56 schools)
const intlSchoolIds = new Set([
  'edb_560553000123', 'edb_190543000123', 'edb_170879000123', 'edb_170348000123',
  'edb_170909000123', 'edb_190314000233', 'edb_170992000133', 'edb_548430000623',
  'edb_215406000423', 'edb_215791000123', 'edb_216011000523', 'edb_527882000123',
  'edb_518620000223', 'edb_216003000223', 'edb_215520000123', 'edb_216275000623',
  'edb_539155000323', 'edb_215589000123', 'edb_570370000323', 'edb_214949000123',
  'edb_607525000123', 'edb_230979000123', 'edb_548430000633', 'edb_598356000333',
  'edb_216003000433', 'edb_230987000233', 'edb_214558000133', 'edb_216216000133',
  'edb_230987000133', 'edb_317357000133', 'edb_543560000423', 'edb_609781000223',
  'edb_617334000123', 'edb_609498000223', 'edb_579009000123', 'edb_608319000223',
  'edb_569836000123', 'edb_560138000223', 'edb_216232000123', 'edb_600814000123',
  'edb_215287000933', 'edb_289094000233', 'edb_240656000234', 'edb_609781000233',
  'edb_215287001134', 'edb_315699000333', 'edb_533343000134', 'edb_612820000133',
  'edb_621374000133', 'edb_607819000133', 'edb_215287001334', 'edb_608327000133',
  'edb_567485000133', 'edb_553867000333', 'edb_513725000133', 'edb_526720000134'
]);

// Combined set
const allMapped = new Set([...v2Ids, ...specialEdIds, ...intlSchoolIds]);

// Filter primary and secondary only
const primary = schools.filter(s => s.level === '小學');
const secondary = schools.filter(s => s.level === '中學');

const mappedPrimary = primary.filter(s => allMapped.has(s.id));
const mappedSecondary = secondary.filter(s => allMapped.has(s.id));
const unmappedPrimary = primary.filter(s => !allMapped.has(s.id));
const unmappedSecondary = secondary.filter(s => !allMapped.has(s.id));

console.log('=== Final MOI Mapping Coverage ===\n');
console.log('Sources:');
console.log(`  V2 (CHSC): ${v2Ids.size} schools`);
console.log(`  Special Ed: ${specialEdIds.size} schools`);
console.log(`  International (docx): ${intlSchoolIds.size} schools`);
console.log(`  Total unique: ${allMapped.size} schools`);

console.log('\n=== Coverage ===');
console.log(`Primary: ${primary.length} total | ${mappedPrimary.length} mapped | ${unmappedPrimary.length} missing (${(mappedPrimary.length/primary.length*100).toFixed(1)}%)`);
console.log(`Secondary: ${secondary.length} total | ${mappedSecondary.length} mapped | ${unmappedSecondary.length} missing (${(mappedSecondary.length/secondary.length*100).toFixed(1)}%)`);
console.log(`\nTotal: ${primary.length + secondary.length} | ${mappedPrimary.length + mappedSecondary.length} mapped | ${unmappedPrimary.length + unmappedSecondary.length} missing`);

// Categorize remaining unmapped
if (unmappedPrimary.length + unmappedSecondary.length > 0) {
  const byCategory: Record<string, number> = {};
  for (const s of [...unmappedPrimary, ...unmappedSecondary]) {
    byCategory[s.category] = (byCategory[s.category] || 0) + 1;
  }

  console.log('\n=== Remaining Unmapped by Category ===');
  for (const [cat, count] of Object.entries(byCategory).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${cat}: ${count}`);
  }

  console.log('\n=== Remaining Unmapped Schools ===');
  for (const s of [...unmappedPrimary, ...unmappedSecondary].slice(0, 20)) {
    console.log(`  ${s.id} | ${s.name} | ${s.category}`);
  }
  const remaining = unmappedPrimary.length + unmappedSecondary.length;
  if (remaining > 20) {
    console.log(`  ... and ${remaining - 20} more`);
  }
}
