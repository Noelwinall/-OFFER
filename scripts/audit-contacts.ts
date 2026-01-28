/**
 * Audit contact info in schools data and CHSC data
 */

import { schools } from "../data/schools";

// Check what contact fields exist in schools data
const sampleSchool = schools[0];
console.log("=== SAMPLE SCHOOL FIELDS ===");
console.log("Keys:", Object.keys(sampleSchool));

console.log("\n=== CONTACT FIELD AUDIT ===");

// Phone
const withPhone = schools.filter(s => s.phone && s.phone.trim().length > 0);
console.log(`Phone: ${withPhone.length}/${schools.length} have phone`);

// Website
const withWebsite = schools.filter(s => s.website && s.website.trim().length > 0);
console.log(`Website: ${withWebsite.length}/${schools.length} have website`);

// Check if schools have fax or email fields
const hasFax = "fax" in sampleSchool;
const hasEmail = "email" in sampleSchool;
console.log(`\nSchools data has 'fax' field: ${hasFax}`);
console.log(`Schools data has 'email' field: ${hasEmail}`);

// Check website URL validity (basic check)
console.log("\n=== WEBSITE URL VALIDATION ===");
const invalidUrls: string[] = [];
withWebsite.forEach(s => {
  if (!s.website.startsWith("http://") && !s.website.startsWith("https://")) {
    invalidUrls.push(`${s.name}: ${s.website}`);
  }
});

console.log(`Invalid URLs (not starting with http/https): ${invalidUrls.length}`);
if (invalidUrls.length > 0 && invalidUrls.length <= 20) {
  invalidUrls.forEach(u => console.log(`  - ${u}`));
}

// List schools missing website
const noWebsite = schools.filter(s => !s.website || s.website.trim().length === 0);
console.log(`\n=== SCHOOLS MISSING WEBSITE (${noWebsite.length}) ===`);
if (noWebsite.length <= 30) {
  noWebsite.forEach(s => console.log(`  - ${s.name} (${s.level}, ${s.category})`));
} else {
  console.log("Too many to list, showing by category:");
  const byLevel: Record<string, number> = {};
  noWebsite.forEach(s => {
    const key = `${s.level} - ${s.category}`;
    byLevel[key] = (byLevel[key] || 0) + 1;
  });
  Object.entries(byLevel).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => {
    console.log(`  ${k}: ${v}`);
  });
}
