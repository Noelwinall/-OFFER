import { schools } from '../data/schools';
import { curriculumMap } from '../data/mappings/curriculum-map';

// Check curriculum mapping stats
const curriculumCounts: Record<string, number> = {};
Object.values(curriculumMap).flat().forEach(c => {
  curriculumCounts[c] = (curriculumCounts[c] || 0) + 1;
});
console.log('=== CURRICULUM MAPPING STATS ===');
console.log('Total schools mapped:', Object.keys(curriculumMap).length);
console.log('Curriculum counts:');
Object.entries(curriculumCounts).sort((a,b) => b[1] - a[1]).forEach(([k,v]) => {
  console.log('  ' + k + ': ' + v);
});

// Check for HK_LOCAL
console.log('\nHK_LOCAL entries:', curriculumCounts['HK_LOCAL'] || 0);

// Find DUAL_TRACK schools
console.log('\n=== DUAL_TRACK SCHOOLS ===');
Object.entries(curriculumMap).filter(([id, curr]) => curr.includes('DUAL_TRACK')).forEach(([id, curr]) => {
  const school = schools.find(s => s.id === id);
  console.log('  ' + id + ': ' + (school?.name || 'NOT FOUND'));
});

// Find ESF schools and their curriculums
console.log('\n=== ESF SCHOOLS IN MAPPING ===');
const esfPattern = /GLENEALY|KENNEDY|PEAK|BEACON HILL|CLEARWATER BAY|QUARRY BAY|BRADBURY|SHA.*TIN|KOWLOON JUNIOR|ISLAND SCHOOL|WEST ISLAND|SOUTH ISLAND|KING GEORGE/i;
Object.entries(curriculumMap).forEach(([id, curr]) => {
  const school = schools.find(s => s.id === id);
  if (school && (esfPattern.test(school.name) || esfPattern.test(school.nameEn))) {
    console.log('  ' + school.name + ' (' + school.level + '): ' + curr.join(', '));
  }
});

// Sample schools with MOI data for verification
console.log('\n=== SAMPLE SCHOOLS WITH MOI DATA ===');
const samplesWithMOI = schools.filter(s => s.instructionLanguages && s.instructionLanguages.length > 0).slice(0, 5);
samplesWithMOI.forEach(s => {
  console.log('  ' + s.name + ': ' + s.instructionLanguages.join(', '));
});
