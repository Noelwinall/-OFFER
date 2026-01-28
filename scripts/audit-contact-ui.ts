/**
 * Audit contact data from UI perspective (session-grouped schools)
 */

import { schools } from "../data/schools";
import { getCHSCData } from "../data/chsc-data";
import { groupSchoolsBySession } from "../lib/school-classification";

console.log("=== CONTACT DATA AUDIT (UI PERSPECTIVE) ===\n");
console.log("Total raw schools:", schools.length);

// Group schools by session (how UI presents them)
const grouped = groupSchoolsBySession(schools);
console.log("Session-grouped schools (UI count):", grouped.length);

// Stats for grouped schools
const stats = {
  phone: { have: 0, missing: 0 },
  fax: { have: 0, missing: 0 },
  email: { have: 0, missing: 0 },
  website: { have: 0, missing: 0 },
};

const missingByLevel: Record<string, { phone: number; fax: number; email: number; website: number }> = {
  "幼稚園": { phone: 0, fax: 0, email: 0, website: 0 },
  "小學": { phone: 0, fax: 0, email: 0, website: 0 },
  "中學": { phone: 0, fax: 0, email: 0, website: 0 },
};

grouped.forEach(school => {
  // GroupedSchool extends School directly
  const chsc = getCHSCData(school.name);

  // Phone - from school data or CHSC
  const hasPhone = (school.phone && school.phone.trim().length > 0) || (chsc?.phone && chsc.phone.trim().length > 0);
  if (hasPhone) {
    stats.phone.have++;
  } else {
    stats.phone.missing++;
    if (missingByLevel[school.level]) missingByLevel[school.level].phone++;
  }

  // Fax - from CHSC
  const hasFax = chsc?.fax && chsc.fax.trim().length > 0;
  if (hasFax) {
    stats.fax.have++;
  } else {
    stats.fax.missing++;
    if (missingByLevel[school.level]) missingByLevel[school.level].fax++;
  }

  // Email - from CHSC
  const hasEmail = chsc?.email && chsc.email.trim().length > 0;
  if (hasEmail) {
    stats.email.have++;
  } else {
    stats.email.missing++;
    if (missingByLevel[school.level]) missingByLevel[school.level].email++;
  }

  // Website - from school data
  const hasWebsite = school.website && school.website.trim().length > 0;
  if (hasWebsite) {
    stats.website.have++;
  } else {
    stats.website.missing++;
    if (missingByLevel[school.level]) missingByLevel[school.level].website++;
  }
});

// Count by level
const byLevel: Record<string, number> = {};
grouped.forEach(school => {
  byLevel[school.level] = (byLevel[school.level] || 0) + 1;
});

console.log("\nSchools by level (grouped):");
Object.entries(byLevel).forEach(([level, count]) => {
  console.log(`  ${level}: ${count}`);
});

console.log("\n--- PHONE ---");
console.log(`  Have: ${stats.phone.have}`);
console.log(`  Missing: ${stats.phone.missing}`);

console.log("\n--- FAX ---");
console.log(`  Have: ${stats.fax.have}`);
console.log(`  Missing: ${stats.fax.missing}`);

console.log("\n--- EMAIL ---");
console.log(`  Have: ${stats.email.have}`);
console.log(`  Missing: ${stats.email.missing}`);

console.log("\n--- WEBSITE ---");
console.log(`  Have: ${stats.website.have}`);
console.log(`  Missing: ${stats.website.missing}`);

console.log("\n--- MISSING BY LEVEL ---");
Object.entries(missingByLevel).forEach(([level, missing]) => {
  const total = byLevel[level] || 0;
  console.log(`\n${level} (${total} total):`);
  console.log(`  Phone missing: ${missing.phone}`);
  console.log(`  Fax missing: ${missing.fax}`);
  console.log(`  Email missing: ${missing.email}`);
  console.log(`  Website missing: ${missing.website}`);
});

const total = grouped.length;
console.log("\n\n=== UI SUMMARY TABLE ===\n");
console.log("| Field   | Have   | Missing | Coverage |");
console.log("|---------|--------|---------|----------|");
console.log(`| Phone   | ${stats.phone.have.toString().padStart(6)} | ${stats.phone.missing.toString().padStart(7)} | ${((stats.phone.have / total) * 100).toFixed(1).padStart(7)}% |`);
console.log(`| Fax     | ${stats.fax.have.toString().padStart(6)} | ${stats.fax.missing.toString().padStart(7)} | ${((stats.fax.have / total) * 100).toFixed(1).padStart(7)}% |`);
console.log(`| Email   | ${stats.email.have.toString().padStart(6)} | ${stats.email.missing.toString().padStart(7)} | ${((stats.email.have / total) * 100).toFixed(1).padStart(7)}% |`);
console.log(`| Website | ${stats.website.have.toString().padStart(6)} | ${stats.website.missing.toString().padStart(7)} | ${((stats.website.have / total) * 100).toFixed(1).padStart(7)}% |`);
