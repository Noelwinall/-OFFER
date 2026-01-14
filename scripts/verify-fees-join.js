/**
 * Phase R3-5: Verify fees data join keys
 *
 * This script verifies that all keys in feesData202526 exist in data/schools.ts
 * Run: node scripts/verify-fees-join.js
 *
 * Expected output: missingKeys = 0
 */

const fs = require("fs");
const path = require("path");

// Read schools data
const schoolsPath = path.join(__dirname, "../data/schools.ts");
const schoolsContent = fs.readFileSync(schoolsPath, "utf-8");

// Extract all school IDs from schools.ts
const idMatches = schoolsContent.matchAll(/"id":\s*"([^"]+)"/g);
const allSchoolIds = new Set([...idMatches].map((m) => m[1]));

console.log("=== Phase R3-5: Fees Join Key Verification ===\n");
console.log(`Total school IDs in data/schools.ts: ${allSchoolIds.size}\n`);

// Read fees data
const feesPath = path.join(__dirname, "../data/fees-2025-26.ts");
const feesContent = fs.readFileSync(feesPath, "utf-8");

// Extract fee keys (school IDs) from feesData202526
// Look for patterns like: "edb_XXXXXXXXX": {
const feeKeyMatches = feesContent.matchAll(/"(edb_[^"]+)":\s*\{/g);
const feeKeys = [...feeKeyMatches].map((m) => m[1]);

console.log(`Fee entries in data/fees-2025-26.ts: ${feeKeys.length}\n`);

// Verify each fee key exists in schools.ts
const missingKeys = [];
const validKeys = [];

for (const key of feeKeys) {
  if (allSchoolIds.has(key)) {
    validKeys.push(key);
  } else {
    missingKeys.push(key);
  }
}

console.log("=== Verification Results ===\n");
console.log(`Valid keys (exist in schools.ts): ${validKeys.length}`);
console.log(`Missing keys (NOT in schools.ts): ${missingKeys.length}\n`);

if (missingKeys.length > 0) {
  console.log("!!! ERROR: The following keys do NOT exist in schools.ts !!!\n");
  missingKeys.forEach((key, i) => {
    console.log(`  ${i + 1}. ${key}`);
  });
  console.log("\n!!! FIX REQUIRED: Remove or correct these keys before commit !!!");
  process.exit(1);
} else {
  console.log("SUCCESS: All fee keys are valid school IDs.\n");
}

// Show which schools have fees
if (validKeys.length > 0) {
  console.log("=== Schools with Fee Data ===\n");

  // Extract school info for each valid key
  for (const key of validKeys) {
    // Find the school entry in schools.ts
    const schoolRegex = new RegExp(
      `"id":\\s*"${key}"[^}]*?"name":\\s*"([^"]+)"[^}]*?"nameEn":\\s*"([^"]+)"[^}]*?"level":\\s*"([^"]+)"`,
      "s"
    );
    const match = schoolsContent.match(schoolRegex);

    if (match) {
      console.log(`  ${key}`);
      console.log(`    名稱: ${match[1]}`);
      console.log(`    Name: ${match[2]}`);
      console.log(`    Level: ${match[3]}`);
      console.log();
    } else {
      console.log(`  ${key} (unable to extract details)`);
    }
  }
}

console.log("=== Summary ===");
console.log(`Total fee entries: ${feeKeys.length}`);
console.log(`Missing keys: ${missingKeys.length}`);
console.log(`Status: ${missingKeys.length === 0 ? "PASS" : "FAIL"}`);
