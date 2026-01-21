import { schools } from '../../data/schools';

// Filter primary and secondary only (KG don't have MOI)
const primary = schools.filter(s => s.level === '小學');
const secondary = schools.filter(s => s.level === '中學');
const kg = schools.filter(s => s.level === '幼稚園');

const primaryWithMoi = primary.filter(s => s.instructionLanguages.length > 0);
const secondaryWithMoi = secondary.filter(s => s.instructionLanguages.length > 0);

const primaryWithoutMoi = primary.filter(s => s.instructionLanguages.length === 0);
const secondaryWithoutMoi = secondary.filter(s => s.instructionLanguages.length === 0);

console.log('=== MOI Coverage Report ===\n');
console.log('Primary Schools:');
console.log(`  Total: ${primary.length}`);
console.log(`  With MOI: ${primaryWithMoi.length} (${(primaryWithMoi.length/primary.length*100).toFixed(1)}%)`);
console.log(`  Without MOI: ${primaryWithoutMoi.length}`);

console.log('\nSecondary Schools:');
console.log(`  Total: ${secondary.length}`);
console.log(`  With MOI: ${secondaryWithMoi.length} (${(secondaryWithMoi.length/secondary.length*100).toFixed(1)}%)`);
console.log(`  Without MOI: ${secondaryWithoutMoi.length}`);

console.log('\nKindergartens (excluded from MOI):');
console.log(`  Total: ${kg.length}`);

const totalPS = primary.length + secondary.length;
const totalWithMoi = primaryWithMoi.length + secondaryWithMoi.length;
console.log('\n=== Overall (Primary + Secondary) ===');
console.log(`Total: ${totalPS}`);
console.log(`With MOI: ${totalWithMoi} (${(totalWithMoi/totalPS*100).toFixed(1)}%)`);
console.log(`Without MOI: ${primaryWithoutMoi.length + secondaryWithoutMoi.length}`);

if (primaryWithoutMoi.length + secondaryWithoutMoi.length > 0) {
  console.log('\n=== Schools Without MOI ===');
  for (const s of [...primaryWithoutMoi, ...secondaryWithoutMoi]) {
    console.log(`${s.id} | ${s.name} | ${s.nameEn} | ${s.category} | ${s.level}`);
  }
}
