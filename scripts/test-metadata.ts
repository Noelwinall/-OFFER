import { schools } from '../data/schools';

// Count schools with metadata
const withReligion = schools.filter(s => s.religion).length;
const withSchoolNet = schools.filter(s => s.schoolNet).length;
const withSpecial = schools.filter(s => s.isSpecialSchool).length;
const withRelationship = schools.filter(s => s.relationship).length;

console.log('Metadata counts:');
console.log('  Religion:', withReligion);
console.log('  School Net:', withSchoolNet);
console.log('  Special School:', withSpecial);
console.log('  Relationship:', withRelationship);

// Sample a school with all metadata
const sample = schools.find(s => s.religion && s.schoolNet && s.relationship);
if (sample) {
  console.log('\nSample school with full metadata:');
  console.log('  Name:', sample.name);
  console.log('  Religion:', sample.religion);
  console.log('  School Net:', sample.schoolNet);
  console.log('  Relationship:', sample.relationship);
}

// Sample by relationship type
const throughTrain = schools.filter(s => s.relationship === 'THROUGH_TRAIN');
const affiliated = schools.filter(s => s.relationship === 'AFFILIATED');
const linked = schools.filter(s => s.relationship === 'LINKED');

console.log('\nRelationship breakdown:');
console.log('  Through-train:', throughTrain.length);
console.log('  Affiliated:', affiliated.length);
console.log('  Linked:', linked.length);
