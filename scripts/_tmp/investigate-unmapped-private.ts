import { schools } from '../../data/schools.ts';
import * as fs from 'fs';

// Read all mapping files
const v2Csv = fs.readFileSync('./data/instruction_language_mapping_v2.csv', 'utf-8');
const v2Ids = new Set(v2Csv.trim().split('\n').slice(1).map(line => line.split(',')[0]));

const specialEdCsv = fs.readFileSync('./data/instruction_language_mapping_special_ed.csv', 'utf-8');
const specialEdIds = new Set(specialEdCsv.trim().split('\n').slice(1).map(line => line.split(',')[0]));

// International schools from docx
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

const allMapped = new Set([...v2Ids, ...specialEdIds, ...intlSchoolIds]);

// Get unmapped primary/secondary schools
const unmapped = schools.filter(s =>
  (s.level === '小學' || s.level === '中學') &&
  !allMapped.has(s.id)
);

// Categorize
interface SchoolInfo {
  id: string;
  name: string;
  nameEn: string;
  category: string;
  level: string;
}

function categorizeSchool(s: SchoolInfo): string {
  const nameEn = s.nameEn.toUpperCase();
  const name = s.name;

  // ESF Schools
  if (nameEn.includes('ESF') || name.includes('英基')) {
    return 'ESF';
  }

  // International schools by name pattern
  if (nameEn.includes('INTERNATIONAL') || name.includes('國際')) {
    return 'International School';
  }

  // Japanese schools
  if (nameEn.includes('JAPANESE') || name.includes('日本')) {
    return 'Japanese School';
  }

  // French schools
  if (nameEn.includes('FRENCH') || nameEn.includes('LYCEE') || name.includes('法國')) {
    return 'French School';
  }

  // German Swiss
  if (nameEn.includes('GERMAN') || name.includes('德瑞')) {
    return 'German Swiss';
  }

  // Carmel/Jewish
  if (nameEn.includes('CARMEL') || name.includes('迦密')) {
    return 'Jewish School';
  }

  // Yew Chung
  if (nameEn.includes('YEW CHUNG') || name.includes('耀中')) {
    return 'Yew Chung';
  }

  // Victoria
  if (nameEn.includes('VICTORIA') || name.includes('維多利亞')) {
    return 'Victoria';
  }

  // Harrow
  if (nameEn.includes('HARROW') || name.includes('哈羅')) {
    return 'Harrow';
  }

  // Stamford
  if (nameEn.includes('STAMFORD') || name.includes('史丹福')) {
    return 'Stamford';
  }

  // Local private schools
  if (s.category === '私立') {
    // Check for common local private school patterns
    if (name.includes('書院') || nameEn.includes('COLLEGE')) {
      return 'Private College';
    }
    return 'Other Private';
  }

  // DSS
  if (s.category === '直資') {
    return 'DSS';
  }

  return 'Other';
}

// Group by category
const byCategory: Record<string, SchoolInfo[]> = {};
for (const s of unmapped) {
  const cat = categorizeSchool(s);
  if (!byCategory[cat]) byCategory[cat] = [];
  byCategory[cat].push(s);
}

console.log('=== Unmapped Schools Analysis ===\n');
console.log(`Total unmapped: ${unmapped.length}\n`);

for (const [cat, schoolList] of Object.entries(byCategory).sort((a, b) => b[1].length - a[1].length)) {
  console.log(`\n=== ${cat} (${schoolList.length}) ===`);
  for (const s of schoolList) {
    console.log(`${s.id} | ${s.name} | ${s.nameEn} | ${s.level}`);
  }
}
