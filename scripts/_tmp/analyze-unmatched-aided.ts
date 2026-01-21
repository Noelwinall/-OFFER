import { schools } from '../../data/schools.ts';
import * as fs from 'fs';

// Read V2 mapping CSV
const csv = fs.readFileSync('./data/instruction_language_mapping_v2.csv', 'utf-8');
const lines = csv.trim().split('\n').slice(1);
const mappedIds = new Set(lines.map(line => line.split(',')[0]));

// International schools from the docx (already have mapping in docx)
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

// Filter primary and secondary (exclude kindergartens)
const primary = schools.filter(s => s.level === '小學');
const secondary = schools.filter(s => s.level === '中學');

// Get unmatched schools (not in V2 mapping)
const unmatchedPrimary = primary.filter(s => !mappedIds.has(s.id));
const unmatchedSecondary = secondary.filter(s => !mappedIds.has(s.id));

// Filter to just aided schools (資助) that are NOT in docx international list
const unmatchedAidedPrimary = unmatchedPrimary.filter(s => s.category === '資助' && !intlSchoolIds.has(s.id));
const unmatchedAidedSecondary = unmatchedSecondary.filter(s => s.category === '資助' && !intlSchoolIds.has(s.id));

console.log('=== Unmatched Aided Schools Analysis ===\n');
console.log(`Total unmatched primary: ${unmatchedPrimary.length}`);
console.log(`Total unmatched secondary: ${unmatchedSecondary.length}`);
console.log(`\nAided schools unmatched (excluding intl from docx):`);
console.log(`  Primary: ${unmatchedAidedPrimary.length}`);
console.log(`  Secondary: ${unmatchedAidedSecondary.length}`);
console.log(`  Total: ${unmatchedAidedPrimary.length + unmatchedAidedSecondary.length}`);

// Categorize by pattern
interface SchoolInfo {
  id: string;
  name: string;
  nameEn: string;
  category: string;
  level: string;
}

function categorizeSchool(s: SchoolInfo): string {
  const name = s.name;
  const nameEn = s.nameEn;

  // Special education schools
  if (name.includes('特殊') || name.includes('匡智') || name.includes('明愛') ||
      name.includes('心光') || name.includes('視障') || name.includes('聽障') ||
      name.includes('弱智') || name.includes('智障') || name.includes('啟能') ||
      nameEn.includes('SPECIAL') || nameEn.includes('HANDICAPPED')) {
    return 'Special Education';
  }

  // Schools with (小學部)/(中學部) suffix
  if (name.includes('(小學部)') || name.includes('(中學部)') || name.includes('（小學部）') || name.includes('（中學部）')) {
    return 'Has 部 suffix';
  }

  // Nature/outdoor education centers
  if (name.includes('自然') || name.includes('郊野') || name.includes('天文') ||
      nameEn.includes('NATURE') || nameEn.includes('OUTDOOR')) {
    return 'Nature/Outdoor Education';
  }

  // Evening schools
  if (name.includes('夜') || name.includes('晚') || nameEn.includes('EVENING') || nameEn.includes('NIGHT')) {
    return 'Evening School';
  }

  // Pre-university / Sixth Form
  if (name.includes('預科') || nameEn.includes('SIXTH FORM') || nameEn.includes('PRE-U')) {
    return 'Pre-University';
  }

  return 'Regular (needs investigation)';
}

const categories: Record<string, SchoolInfo[]> = {};
for (const s of [...unmatchedAidedPrimary, ...unmatchedAidedSecondary]) {
  const cat = categorizeSchool(s);
  if (!categories[cat]) categories[cat] = [];
  categories[cat].push(s);
}

console.log('\n=== Categorized Unmatched Aided Schools ===');
for (const [cat, schoolList] of Object.entries(categories).sort((a, b) => b[1].length - a[1].length)) {
  console.log(`\n${cat}: ${schoolList.length}`);
  for (const s of schoolList.slice(0, 10)) {
    console.log(`  ${s.id} | ${s.name} | ${s.nameEn}`);
  }
  if (schoolList.length > 10) {
    console.log(`  ... and ${schoolList.length - 10} more`);
  }
}

// Output the "Regular (needs investigation)" schools for closer look
const regularSchools = categories['Regular (needs investigation)'] || [];
if (regularSchools.length > 0) {
  console.log('\n\n=== Schools Needing Investigation (Full List) ===');
  for (const s of regularSchools) {
    console.log(`${s.id},${s.name},${s.nameEn},${s.level}`);
  }
}
