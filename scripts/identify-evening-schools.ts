import { schoolsRaw } from '../data/schools_raw';
import { internationalSchools } from '../data/mappings/international-school-map';

const intlIds = new Set(internationalSchools.map(s => s.id));

// Evening school patterns
const eveningPatterns = [
  /夜中學/,
  /夜校/,
  /EVENING/i,
  /遵理學校/,  // Beacon College - tutoring school
  /教育服務中心/, // Education service centers
];

function isEveningSchool(name: string, nameEn: string): boolean {
  return eveningPatterns.some(pattern =>
    pattern.test(name) || pattern.test(nameEn)
  );
}

const privateMissing = schoolsRaw.filter(s =>
  s.category === '私立' &&
  (s.level === '小學' || s.level === '中學') &&
  s.tuitionMin === 0 &&
  !intlIds.has(s.id)
);

const eveningSchools = privateMissing.filter(s => isEveningSchool(s.name, s.nameEn));
const regularSchools = privateMissing.filter(s => !isEveningSchool(s.name, s.nameEn));

console.log('='.repeat(60));
console.log('EVENING SCHOOLS (to skip, for notes later)');
console.log('='.repeat(60));
eveningSchools.forEach(s => console.log(`${s.id} | ${s.name} | ${s.nameEn} | ${s.level}`));
console.log(`\nTotal evening schools: ${eveningSchools.length}`);

console.log('\n' + '='.repeat(60));
console.log('REGULAR PRIVATE SCHOOLS (need tuition update)');
console.log('='.repeat(60));

const primaryRegular = regularSchools.filter(s => s.level === '小學');
const secondaryRegular = regularSchools.filter(s => s.level === '中學');

console.log('\n--- PRIMARY (小學) ---');
primaryRegular.forEach(s => console.log(`${s.id} | ${s.name} | ${s.nameEn}`));
console.log(`\nTotal primary: ${primaryRegular.length}`);

console.log('\n--- SECONDARY (中學) ---');
secondaryRegular.forEach(s => console.log(`${s.id} | ${s.name} | ${s.nameEn}`));
console.log(`\nTotal secondary: ${secondaryRegular.length}`);

console.log('\n' + '='.repeat(60));
console.log(`SUMMARY: ${eveningSchools.length} evening schools to skip, ${regularSchools.length} schools to update`);
console.log('='.repeat(60));

// Output evening school IDs for reference
console.log('\n// Evening school IDs for reference:');
console.log('const eveningSchoolIds = [');
eveningSchools.forEach(s => console.log(`  "${s.id}", // ${s.name}`));
console.log('];');
