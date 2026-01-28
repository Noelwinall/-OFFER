/**
 * Check KG phone data coverage
 */

import { kindergartens } from "../data/kg/kg-database";
import { schools } from "../data/schools";

// Check KG database phone coverage
const kgWithPhone = kindergartens.filter(k => k.phone && k.phone.trim().length > 0);
console.log("KG database phone coverage:", kgWithPhone.length, "/", kindergartens.length);

// Check KG database website coverage
const kgWithWebsite = kindergartens.filter(k => k.website && k.website.trim().length > 0);
console.log("KG database website coverage:", kgWithWebsite.length, "/", kindergartens.length);

// Check schools data KG phone coverage
const kgSchools = schools.filter(s => s.level === "幼稚園");
const kgSchoolsWithPhone = kgSchools.filter(s => s.phone && s.phone.trim().length > 0);
console.log("\nSchools data KG phone coverage:", kgSchoolsWithPhone.length, "/", kgSchools.length);

// Sample comparison
console.log("\nSample comparison (first 5):");
const sample = kindergartens.slice(0, 5);
sample.forEach(kg => {
  const school = schools.find(s => s.id === kg.id || s.name === kg.name);
  console.log("\n" + kg.name);
  console.log("  KG DB phone:", kg.phone || "(empty)");
  console.log("  Schools phone:", school?.phone || "(empty)");
  console.log("  KG DB website:", kg.website || "(empty)");
  console.log("  Schools website:", school?.website || "(empty)");
});
