/**
 * Verify international school matching
 * Run: node scripts/verify-international-schools.js
 */

const fs = require("fs");
const path = require("path");

// Read schools data
const schoolsPath = path.join(__dirname, "../data/schools.ts");
const schoolsContent = fs.readFileSync(schoolsPath, "utf-8");

// Extract school objects (simple regex extraction)
const schoolMatches = schoolsContent.matchAll(
  /"nameEn":\s*"([^"]+)"/g
);
const allNames = [...schoolMatches].map((m) => m[1]);

// International school patterns from EDB
const patterns = [
  "ESF",
  "BEACON HILL SCHOOL",
  "BRADBURY SCHOOL",
  "CLEARWATER BAY SCHOOL",
  "GLENEALY SCHOOL",
  "KENNEDY SCHOOL",
  "PEAK SCHOOL",
  "QUARRY BAY SCHOOL",
  "SHA TIN JUNIOR SCHOOL",
  "ISLAND SCHOOL",
  "KING GEORGE V SCHOOL",
  "SOUTH ISLAND SCHOOL",
  "WEST ISLAND SCHOOL",
  "RENAISSANCE COLLEGE",
  "AMERICAN INTERNATIONAL SCHOOL",
  "AUSTRALIAN INTERNATIONAL SCHOOL HONG KONG",
  "CANADIAN INTERNATIONAL SCHOOL",
  "CARMEL SCHOOL",
  "CHINESE INTERNATIONAL SCHOOL",
  "CHRISTIAN ALLIANCE INTERNATIONAL SCHOOL",
  "CONCORDIA INTERNATIONAL SCHOOL",
  "DSC INTERNATIONAL SCHOOL",
  "DISCOVERY BAY INTERNATIONAL SCHOOL",
  "FRENCH INTERNATIONAL SCHOOL",
  "GERMAN SWISS INTERNATIONAL SCHOOL",
  "HARROW INTERNATIONAL SCHOOL HONG KONG",
  "HONG KONG ACADEMY",
  "HONG KONG INTERNATIONAL SCHOOL",
  "INTERNATIONAL CHRISTIAN SCHOOL",
  "INTERNATIONAL COLLEGE HONG KONG",
  "INTERNATIONAL MONTESSORI SCHOOL",
  "JAPANESE INTERNATIONAL SCHOOL",
  "KELLETT SCHOOL",
  "KOREAN INTERNATIONAL SCHOOL",
  "LANTAU INTERNATIONAL SCHOOL",
  "MALVERN COLLEGE HONG KONG",
  "MULBERRY HOUSE",
  "NORD ANGLIA INTERNATIONAL SCHOOL",
  "NORWEGIAN INTERNATIONAL SCHOOL",
  "SEAR ROGERS INTERNATIONAL SCHOOL",
  "SHREWSBURY INTERNATIONAL SCHOOL",
  "SINGAPORE INTERNATIONAL SCHOOL",
  "STAMFORD AMERICAN SCHOOL HONG KONG",
  "ST. STEPHEN'S COLLEGE INTERNATIONAL",
  "THE INDEPENDENT SCHOOLS FOUNDATION ACADEMY",
  "VICTORIA SHANGHAI ACADEMY",
  "WOODLAND PRE-SCHOOLS",
  "YEW CHUNG INTERNATIONAL SCHOOL",
];

const regexPatterns = patterns.map(
  (p) => new RegExp(p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i")
);

function isInternational(nameEn) {
  return regexPatterns.some((pattern) => pattern.test(nameEn));
}

// Find matches
const matched = new Set();
const matchedSchools = [];

for (const name of allNames) {
  if (isInternational(name)) {
    if (!matched.has(name)) {
      matched.add(name);
      matchedSchools.push(name);
    }
  }
}

console.log("=== International School Matching Statistics ===\n");
console.log(`Total schools in database: ${allNames.length}`);
console.log(`Unique school names matched: ${matched.size}`);
console.log(`Total entries matched (with duplicates): ${allNames.filter(isInternational).length}`);
console.log("\n=== Matched Schools ===\n");
matchedSchools.sort().forEach((name, i) => {
  console.log(`${i + 1}. ${name}`);
});

// Check for schools with "INTERNATIONAL" that weren't matched
console.log("\n=== Unmatched schools containing 'INTERNATIONAL' ===\n");
const unmatched = allNames.filter(
  (name) =>
    name.toUpperCase().includes("INTERNATIONAL") && !isInternational(name)
);
const uniqueUnmatched = [...new Set(unmatched)];
if (uniqueUnmatched.length === 0) {
  console.log("None - all INTERNATIONAL schools are matched!");
} else {
  uniqueUnmatched.forEach((name, i) => {
    console.log(`${i + 1}. ${name}`);
  });
}
