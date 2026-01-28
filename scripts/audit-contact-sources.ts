/**
 * Audit contact data from both schools data and CHSC data
 */

import { schools } from "../data/schools";
import { getCHSCData, chscDataMap } from "../data/chsc-data";

console.log("=== CONTACT DATA AUDIT ===\n");
console.log("Total schools:", schools.length);

// Check CHSC data coverage
const chscSchoolNames = Object.keys(chscDataMap);
console.log("CHSC data entries:", chscSchoolNames.length);

// Audit each contact field
interface ContactStats {
  total: number;
  fromSchools: number;
  fromCHSC: number;
  combined: number; // either source
  missing: number;
}

const stats = {
  phone: { total: schools.length, fromSchools: 0, fromCHSC: 0, combined: 0, missing: 0 },
  fax: { total: schools.length, fromSchools: 0, fromCHSC: 0, combined: 0, missing: 0 },
  email: { total: schools.length, fromSchools: 0, fromCHSC: 0, combined: 0, missing: 0 },
  website: { total: schools.length, fromSchools: 0, fromCHSC: 0, combined: 0, missing: 0 },
};

const missingByLevel: Record<string, { phone: number; fax: number; email: number; website: number }> = {
  "幼稚園": { phone: 0, fax: 0, email: 0, website: 0 },
  "小學": { phone: 0, fax: 0, email: 0, website: 0 },
  "中學": { phone: 0, fax: 0, email: 0, website: 0 },
};

schools.forEach(school => {
  const chsc = getCHSCData(school.name);

  // Phone
  const hasPhoneSchools = school.phone && school.phone.trim().length > 0;
  const hasPhoneCHSC = chsc?.phone && chsc.phone.trim().length > 0;
  if (hasPhoneSchools) stats.phone.fromSchools++;
  if (hasPhoneCHSC) stats.phone.fromCHSC++;
  if (hasPhoneSchools || hasPhoneCHSC) {
    stats.phone.combined++;
  } else {
    stats.phone.missing++;
    missingByLevel[school.level].phone++;
  }

  // Fax (only CHSC has fax)
  const hasFaxCHSC = chsc?.fax && chsc.fax.trim().length > 0;
  if (hasFaxCHSC) stats.fax.fromCHSC++;
  if (hasFaxCHSC) {
    stats.fax.combined++;
  } else {
    stats.fax.missing++;
    missingByLevel[school.level].fax++;
  }

  // Email (only CHSC has email)
  const hasEmailCHSC = chsc?.email && chsc.email.trim().length > 0;
  if (hasEmailCHSC) stats.email.fromCHSC++;
  if (hasEmailCHSC) {
    stats.email.combined++;
  } else {
    stats.email.missing++;
    missingByLevel[school.level].email++;
  }

  // Website
  const hasWebsiteSchools = school.website && school.website.trim().length > 0;
  if (hasWebsiteSchools) stats.website.fromSchools++;
  if (hasWebsiteSchools) {
    stats.website.combined++;
  } else {
    stats.website.missing++;
    missingByLevel[school.level].website++;
  }
});

console.log("\n--- PHONE ---");
console.log(`  From schools data: ${stats.phone.fromSchools}`);
console.log(`  From CHSC data: ${stats.phone.fromCHSC}`);
console.log(`  Combined (either): ${stats.phone.combined}`);
console.log(`  Missing: ${stats.phone.missing}`);

console.log("\n--- FAX ---");
console.log(`  From schools data: N/A (no fax field)`);
console.log(`  From CHSC data: ${stats.fax.fromCHSC}`);
console.log(`  Combined (either): ${stats.fax.combined}`);
console.log(`  Missing: ${stats.fax.missing}`);

console.log("\n--- EMAIL ---");
console.log(`  From schools data: N/A (no email field)`);
console.log(`  From CHSC data: ${stats.email.fromCHSC}`);
console.log(`  Combined (either): ${stats.email.combined}`);
console.log(`  Missing: ${stats.email.missing}`);

console.log("\n--- WEBSITE ---");
console.log(`  From schools data: ${stats.website.fromSchools}`);
console.log(`  From CHSC data: N/A`);
console.log(`  Combined (either): ${stats.website.combined}`);
console.log(`  Missing: ${stats.website.missing}`);

console.log("\n--- MISSING BY LEVEL ---");
Object.entries(missingByLevel).forEach(([level, missing]) => {
  const total = schools.filter(s => s.level === level).length;
  console.log(`\n${level} (${total} total):`);
  console.log(`  Phone missing: ${missing.phone}`);
  console.log(`  Fax missing: ${missing.fax}`);
  console.log(`  Email missing: ${missing.email}`);
  console.log(`  Website missing: ${missing.website}`);
});

// Summary table
console.log("\n\n=== SUMMARY TABLE ===\n");
console.log("| Field   | Have   | Missing | Coverage |");
console.log("|---------|--------|---------|----------|");
console.log(`| Phone   | ${stats.phone.combined.toString().padStart(6)} | ${stats.phone.missing.toString().padStart(7)} | ${((stats.phone.combined / stats.phone.total) * 100).toFixed(1).padStart(7)}% |`);
console.log(`| Fax     | ${stats.fax.combined.toString().padStart(6)} | ${stats.fax.missing.toString().padStart(7)} | ${((stats.fax.combined / stats.fax.total) * 100).toFixed(1).padStart(7)}% |`);
console.log(`| Email   | ${stats.email.combined.toString().padStart(6)} | ${stats.email.missing.toString().padStart(7)} | ${((stats.email.combined / stats.email.total) * 100).toFixed(1).padStart(7)}% |`);
console.log(`| Website | ${stats.website.combined.toString().padStart(6)} | ${stats.website.missing.toString().padStart(7)} | ${((stats.website.combined / stats.website.total) * 100).toFixed(1).padStart(7)}% |`);
