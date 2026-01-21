import { schools } from '../../data/schools';

// UI filter options
const UI_FILTER_LANGUAGES = [
  "ENGLISH", "CANTONESE", "PUTONGHUA", "FRENCH",
  "GERMAN", "JAPANESE", "KOREAN", "SPANISH"
];

// Filter primary and secondary only
const psSchools = schools.filter(s => s.level === '小學' || s.level === '中學');

// Schools that have at least one language matching UI filters
const filterable = psSchools.filter(s =>
  s.instructionLanguages.some(lang => UI_FILTER_LANGUAGES.includes(lang))
);

// Schools that have NO languages matching UI filters (can't be filtered)
const notFilterable = psSchools.filter(s =>
  s.instructionLanguages.length > 0 &&
  !s.instructionLanguages.some(lang => UI_FILTER_LANGUAGES.includes(lang))
);

// Schools with empty instructionLanguages
const emptyMoi = psSchools.filter(s => s.instructionLanguages.length === 0);

// Find all unique languages in the data
const allLanguages = new Set<string>();
psSchools.forEach(s => s.instructionLanguages.forEach(l => allLanguages.add(l)));

// Languages not in UI filter
const unclassifiedLanguages = [...allLanguages].filter(l => !UI_FILTER_LANGUAGES.includes(l));

console.log('=== UI Filter Coverage Report ===\n');
console.log('UI Filter Options:', UI_FILTER_LANGUAGES.join(', '));
console.log('\nAll languages in data:', [...allLanguages].join(', '));
console.log('Languages NOT in UI filter:', unclassifiedLanguages.length > 0 ? unclassifiedLanguages.join(', ') : 'None');

console.log('\n=== Coverage ===');
console.log(`Total P/S schools: ${psSchools.length}`);
console.log(`Filterable (has ≥1 UI language): ${filterable.length} (${(filterable.length/psSchools.length*100).toFixed(1)}%)`);
console.log(`Not filterable (has languages but none in UI): ${notFilterable.length}`);
console.log(`Empty MOI: ${emptyMoi.length}`);

if (notFilterable.length > 0) {
  console.log('\n=== Schools NOT Filterable (have languages not in UI) ===');
  for (const s of notFilterable) {
    console.log(`${s.id} | ${s.name} | ${s.nameEn} | MOI: ${s.instructionLanguages.join(', ')}`);
  }
}

if (emptyMoi.length > 0) {
  console.log('\n=== Schools with Empty MOI ===');
  for (const s of emptyMoi) {
    console.log(`${s.id} | ${s.name} | ${s.nameEn} | ${s.category}`);
  }
}

console.log('\n=== Conclusion ===');
if (filterable.length === psSchools.length) {
  console.log('✓ 100% coverage - selecting all UI languages will show ALL schools');
} else {
  console.log(`✗ ${psSchools.length - filterable.length} schools will NOT appear when all languages selected`);
}
