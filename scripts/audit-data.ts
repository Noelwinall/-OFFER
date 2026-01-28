/**
 * Data audit script - check missing addresses, contacts, and links
 */

import { schools } from "../data/schools";

console.log("=== DATA AUDIT ===\n");
console.log("Total schools:", schools.length);

// 1. Address audit
const withAddress = schools.filter(s => s.address && s.address.trim().length > 0);
const noAddress = schools.filter(s => !s.address || s.address.trim().length === 0);

console.log("\n--- ADDRESS AUDIT ---");
console.log("With address:", withAddress.length);
console.log("Missing address:", noAddress.length);

if (noAddress.length > 0 && noAddress.length <= 20) {
  console.log("\nSchools missing address:");
  noAddress.forEach(s => {
    console.log(`  - ${s.name} (${s.level})`);
  });
}

// 2. Application link audit
const withAppLink = schools.filter(s => s.applicationLink && s.applicationLink.trim().length > 0);
const noAppLink = schools.filter(s => !s.applicationLink || s.applicationLink.trim().length === 0);

console.log("\n--- APPLICATION LINK AUDIT ---");
console.log("With applicationLink:", withAppLink.length);
console.log("Missing applicationLink:", noAppLink.length);

// 3. Website audit
const withWebsite = schools.filter(s => s.website && s.website.trim().length > 0);
const noWebsite = schools.filter(s => !s.website || s.website.trim().length === 0);

console.log("\n--- WEBSITE AUDIT ---");
console.log("With website:", withWebsite.length);
console.log("Missing website:", noWebsite.length);

if (noWebsite.length > 0 && noWebsite.length <= 30) {
  console.log("\nSchools missing website:");
  noWebsite.forEach(s => {
    console.log(`  - ${s.name} (${s.level})`);
  });
}

// 4. Phone audit
const withPhone = schools.filter(s => s.phone && s.phone.trim().length > 0);
const noPhone = schools.filter(s => !s.phone || s.phone.trim().length === 0);

console.log("\n--- PHONE AUDIT ---");
console.log("With phone:", withPhone.length);
console.log("Missing phone:", noPhone.length);

// Summary by level
console.log("\n--- SUMMARY BY LEVEL ---");
const levels = ["幼稚園", "小學", "中學"];
levels.forEach(level => {
  const levelSchools = schools.filter(s => s.level === level);
  const levelNoAddr = levelSchools.filter(s => !s.address || s.address.trim().length === 0);
  const levelNoWeb = levelSchools.filter(s => !s.website || s.website.trim().length === 0);
  const levelNoPhone = levelSchools.filter(s => !s.phone || s.phone.trim().length === 0);
  const levelNoApp = levelSchools.filter(s => !s.applicationLink || s.applicationLink.trim().length === 0);

  console.log(`\n${level} (${levelSchools.length} total):`);
  console.log(`  Missing address: ${levelNoAddr.length}`);
  console.log(`  Missing website: ${levelNoWeb.length}`);
  console.log(`  Missing phone: ${levelNoPhone.length}`);
  console.log(`  Missing applicationLink: ${levelNoApp.length}`);
});
