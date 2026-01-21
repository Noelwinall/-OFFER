import { schools } from '../../data/schools.ts';
import * as fs from 'fs';

// Read V2 mapping to find unmatched
const v2Csv = fs.readFileSync('./data/instruction_language_mapping_v2.csv', 'utf-8');
const mappedIds = new Set(v2Csv.trim().split('\n').slice(1).map(line => line.split(',')[0]));

// Get unmatched aided schools (primary + secondary only)
const unmatchedAided = schools.filter(s =>
  (s.level === '小學' || s.level === '中學') &&
  s.category === '資助' &&
  !mappedIds.has(s.id)
);

console.log(`Unmatched aided schools: ${unmatchedAided.length}\n`);

// Read special ed data
const specialEdCsv = fs.readFileSync('./data/special_education_moi.csv', 'utf-8');
const specialEdLines = specialEdCsv.trim().split('\n').slice(1);
const specialEdSchools = specialEdLines.map(line => {
  const parts = line.split(',');
  return {
    nameEn: parts[0],
    moi: parts[1],
    confidence: parts[2],
    notes: parts[3] || ''
  };
});

// Normalize for matching
function normalizeEn(name: string): string {
  return name
    .toUpperCase()
    .replace(/['']/g, '')
    .replace(/[.,\-()[\]]/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/\bTHE\b/g, '')
    .replace(/\bPRIMARY SECTION\b/g, '')
    .replace(/\bSECONDARY SECTION\b/g, '')
    .replace(/\bSCHOOL\b/g, '')
    .replace(/\bMEMORIAL\b/g, '')
    .trim();
}

// Build lookup from special ed
const specialEdLookup = new Map<string, typeof specialEdSchools[0]>();
for (const se of specialEdSchools) {
  const normalized = normalizeEn(se.nameEn);
  specialEdLookup.set(normalized, se);
}

// Match
const matches: any[] = [];
const noMatch: any[] = [];

for (const school of unmatchedAided) {
  const normalizedEn = normalizeEn(school.nameEn);

  // Try exact match first
  let matched = specialEdLookup.get(normalizedEn);

  // Try fuzzy match - check if any special ed name is contained or contains
  if (!matched) {
    for (const [seNorm, seData] of specialEdLookup) {
      // Check key parts match
      const seTokens = seNorm.split(' ').filter(t => t.length > 2);
      const schoolTokens = normalizedEn.split(' ').filter(t => t.length > 2);

      // Count matching tokens
      const matchingTokens = seTokens.filter(t => schoolTokens.includes(t));
      const matchRatio = matchingTokens.length / Math.max(seTokens.length, 1);

      // Special handling for Hong Kong Red Cross Hospital Schools (matches all hospital schools)
      if (seData.nameEn === 'Hong Kong Red Cross Hospital Schools' &&
          normalizedEn.includes('HONG KONG RED CROSS') && normalizedEn.includes('HOSPITAL')) {
        matched = seData;
        break;
      }

      // High match ratio
      if (matchRatio >= 0.6 && matchingTokens.length >= 3) {
        matched = seData;
        break;
      }
    }
  }

  if (matched) {
    matches.push({
      school_id: school.id,
      stage: school.level,
      instruction_languages: matched.moi,
      confidence: matched.confidence,
      source: 'Special Education MOI List',
      match_method: 'special_ed_match',
      match_score: '1.000',
      chsc_name: matched.nameEn,
      school_name: school.name,
      school_name_en: school.nameEn
    });
  } else {
    noMatch.push({
      id: school.id,
      name: school.name,
      nameEn: school.nameEn,
      level: school.level
    });
  }
}

console.log(`=== Match Results ===`);
console.log(`Matched: ${matches.length}`);
console.log(`No match: ${noMatch.length}`);

// Output matched schools
console.log('\n=== Matched Schools ===');
for (const m of matches.slice(0, 20)) {
  console.log(`${m.school_id} | ${m.school_name} -> ${m.chsc_name} (${m.instruction_languages})`);
}
if (matches.length > 20) {
  console.log(`... and ${matches.length - 20} more`);
}

// Output unmatched
console.log('\n=== Still Unmatched Aided Schools ===');
for (const s of noMatch.slice(0, 30)) {
  console.log(`${s.id} | ${s.name} | ${s.nameEn}`);
}
if (noMatch.length > 30) {
  console.log(`... and ${noMatch.length - 30} more`);
}

// Write special ed mapping CSV
const header = 'school_id,stage,instruction_languages,confidence,source,match_method,match_score,chsc_name,inference_reason,notes';
const rows = matches.map(m =>
  `${m.school_id},${m.stage},${m.instruction_languages},${m.confidence},"${m.source}",${m.match_method},${m.match_score},"${m.chsc_name}",,`
);
fs.writeFileSync('./data/instruction_language_mapping_special_ed.csv', [header, ...rows].join('\n'), 'utf-8');
console.log(`\nWritten to: data/instruction_language_mapping_special_ed.csv`);
