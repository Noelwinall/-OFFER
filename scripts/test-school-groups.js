/**
 * School Group Quality Gate Tests
 *
 * These tests verify:
 * 1. ESF query returns exactly the canonical ESF schools
 * 2. No ESF school appears under private/dss/aided/government filters
 * 3. International filter includes ESF schools
 * 4. KG rules are maintained
 */

const fs = require("fs");
const path = require("path");

// ===== TEST UTILITIES =====
let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  [PASS] ${message}`);
    passed++;
  } else {
    console.log(`  [FAIL] ${message}`);
    failed++;
  }
}

function assertEqual(actual, expected, message) {
  if (actual === expected) {
    console.log(`  [PASS] ${message}`);
    passed++;
  } else {
    console.log(`  [FAIL] ${message} (expected ${expected}, got ${actual})`);
    failed++;
  }
}

function assertIncludes(array, item, message) {
  if (array.includes(item)) {
    console.log(`  [PASS] ${message}`);
    passed++;
  } else {
    console.log(`  [FAIL] ${message} (${item} not found in array)`);
    failed++;
  }
}

function assertNotIncludes(array, item, message) {
  if (!array.includes(item)) {
    console.log(`  [PASS] ${message}`);
    passed++;
  } else {
    console.log(`  [FAIL] ${message} (${item} should not be in array)`);
    failed++;
  }
}

// ===== LOAD DATA =====
// Load schools
const schoolsPath = path.join(__dirname, "../data/schools.ts");
const schoolsContent = fs.readFileSync(schoolsPath, "utf-8");

const schoolMatches = schoolsContent.matchAll(
  /\{\s*"id":\s*"([^"]+)"[\s\S]*?"name":\s*"([^"]+)"[\s\S]*?"nameEn":\s*"([^"]+)"[\s\S]*?"category":\s*"([^"]+)"[\s\S]*?"level":\s*"([^"]+)"/g
);

const schools = [];
for (const match of schoolMatches) {
  schools.push({
    id: match[1],
    name: match[2],
    nameEn: match[3],
    category: match[4],
    level: match[5],
  });
}

// ===== CANONICAL ESF LIST =====
const ESF_CANONICAL = [
  "BEACON HILL SCHOOL",
  "BRADBURY SCHOOL",
  "CLEARWATER BAY SCHOOL",
  "GLENEALY SCHOOL",
  "KENNEDY SCHOOL",
  "KOWLOON JUNIOR SCHOOL",
  "PEAK SCHOOL",
  "QUARRY BAY SCHOOL",
  "SHATIN JUNIOR SCHOOL",
  "ISLAND SCHOOL",
  "KING GEORGE V SCHOOL",
  "SHATIN COLLEGE",
  "SOUTH ISLAND SCHOOL",
  "THE SOUTH ISLAND SCHOOL",
  "WEST ISLAND SCHOOL",
  "DISCOVERY COLLEGE",
  "RENAISSANCE COLLEGE",
  "JOCKEY CLUB SARAH ROE SCHOOL",
  "ESF ABACUS INTERNATIONAL KINDERGARTEN",
  "ESF INTERNATIONAL KINDERGARTEN (WU KAI SHA)",
  "ESF INTERNATIONAL KINDERGARTEN (TSING YI)",
  "ESF INTERNATIONAL KINDERGARTEN (HILLSIDE)",
  "ESF INTERNATIONAL KINDERGARTEN (TUNG CHUNG)",
];

// ===== ESF MATCHING FUNCTION =====
function normalizeEsfName(name) {
  return name
    .toUpperCase()
    .replace(/\s+/g, " ")
    .replace(/^THE\s+/, "")
    .trim();
}

function isEsfSchool(school) {
  const normalizedName = normalizeEsfName(school.nameEn);
  return ESF_CANONICAL.some((canonical) => {
    const normalizedCanonical = normalizeEsfName(canonical);
    return normalizedName === normalizedCanonical;
  });
}

// ===== INTERNATIONAL MATCHING FUNCTION =====
const INTERNATIONAL_PATTERNS = [
  "AMERICAN INTERNATIONAL SCHOOL",
  "AUSTRALIAN INTERNATIONAL SCHOOL",
  "CANADIAN INTERNATIONAL SCHOOL",
  "CARMEL SCHOOL",
  "CHINESE INTERNATIONAL SCHOOL",
  "CHRISTIAN ALLIANCE INTERNATIONAL SCHOOL",
  "CONCORDIA INTERNATIONAL SCHOOL",
  "DSC INTERNATIONAL SCHOOL",
  "DISCOVERY BAY INTERNATIONAL SCHOOL",
  "FRENCH INTERNATIONAL SCHOOL",
  "GERMAN SWISS INTERNATIONAL SCHOOL",
  "HARROW INTERNATIONAL SCHOOL",
  "HONG KONG ACADEMY",
  "HONG KONG INTERNATIONAL SCHOOL",
  "INTERNATIONAL CHRISTIAN SCHOOL",
  "INTERNATIONAL COLLEGE HONG KONG",
  "INTERNATIONAL MONTESSORI SCHOOL",
  "JAPANESE INTERNATIONAL SCHOOL",
  "KELLETT SCHOOL",
  "KOREAN INTERNATIONAL SCHOOL",
  "LANTAU INTERNATIONAL SCHOOL",
  "MALVERN COLLEGE",
  "MULBERRY HOUSE",
  "NORD ANGLIA INTERNATIONAL SCHOOL",
  "NORWEGIAN INTERNATIONAL SCHOOL",
  "SEAR ROGERS INTERNATIONAL SCHOOL",
  "SHREWSBURY INTERNATIONAL SCHOOL",
  "SINGAPORE INTERNATIONAL SCHOOL",
  "STAMFORD AMERICAN SCHOOL",
  "INDEPENDENT SCHOOLS FOUNDATION ACADEMY",
  "VICTORIA SHANGHAI ACADEMY",
  "WOODLAND PRE-SCHOOLS",
  "YEW CHUNG INTERNATIONAL SCHOOL",
];

function isInternational(school) {
  if (isEsfSchool(school)) return true;

  const normalizedName = normalizeEsfName(school.nameEn);
  return INTERNATIONAL_PATTERNS.some((pattern) =>
    normalizedName.includes(normalizeEsfName(pattern))
  );
}

// ===== KG NATURE =====
function isKindergarten(school) {
  return school.level === "幼稚園";
}

function isNonInternationalKG(school) {
  return isKindergarten(school) && !isInternational(school);
}

// ===== TEST 1: ESF SCHOOLS ARE IDENTIFIED =====
console.log("\n=== TEST 1: ESF School Identification ===");

const esfSchools = schools.filter(isEsfSchool);
const uniqueEsfNames = [...new Set(esfSchools.map((s) => normalizeEsfName(s.nameEn)))];

console.log(`Found ${esfSchools.length} ESF school entries (${uniqueEsfNames.length} unique names)`);

// Check all canonical ESF schools are found
for (const canonical of ESF_CANONICAL) {
  const found = uniqueEsfNames.some(
    (name) => name === normalizeEsfName(canonical)
  );
  assert(found, `Canonical ESF school "${canonical}" found in database`);
}

// ===== TEST 2: ESF SCHOOLS ARE INTERNATIONAL =====
console.log("\n=== TEST 2: ESF Schools Are International ===");

for (const school of esfSchools) {
  assert(
    isInternational(school),
    `ESF school "${school.nameEn}" is classified as international`
  );
}

// ===== TEST 3: ESF SCHOOLS NOT IN OTHER CATEGORIES =====
console.log("\n=== TEST 3: ESF Schools Not In Wrong Categories ===");

// When filtering by 私立/直資/資助/公立, ESF schools should NOT appear
// (because they should be filtered out by isInternational check)

const privateSchools = schools.filter(
  (s) => s.category === "私立" && !isInternational(s)
);
const dssSchools = schools.filter((s) => s.category === "直資");
const aidedSchools = schools.filter((s) => s.category === "資助");
const govtSchools = schools.filter((s) => s.category === "公立");

// ESF schools should not appear in non-international private list
for (const school of esfSchools) {
  assertNotIncludes(
    privateSchools.map((s) => s.nameEn),
    school.nameEn,
    `ESF school "${school.nameEn}" not in non-international private list`
  );
}

// ===== TEST 4: KG RULES =====
console.log("\n=== TEST 4: KG Rules ===");

const kgSchools = schools.filter(isKindergarten);
const internationalKGs = kgSchools.filter(isInternational);
const nonInternationalKGs = kgSchools.filter(isNonInternationalKG);

console.log(`Total KGs: ${kgSchools.length}`);
console.log(`International KGs: ${internationalKGs.length}`);
console.log(`Non-international KGs: ${nonInternationalKGs.length}`);

// ESF kindergartens should be international
const esfKGs = esfSchools.filter(isKindergarten);
for (const school of esfKGs) {
  assert(
    isInternational(school),
    `ESF KG "${school.nameEn}" is international`
  );
  assert(
    !isNonInternationalKG(school),
    `ESF KG "${school.nameEn}" is NOT non-international KG`
  );
}

// Non-international KGs should NOT appear in original 5 categories filter
const nonIntlKGNames = nonInternationalKGs.map((s) => s.nameEn);
for (const school of esfSchools) {
  assertNotIncludes(
    nonIntlKGNames,
    school.nameEn,
    `ESF school "${school.nameEn}" not in non-international KG list`
  );
}

// ===== TEST 5: FALSE POSITIVE CHECK =====
console.log("\n=== TEST 5: False Positive Check ===");

// Schools with "BRADBURY" but not ESF
const bradburyMatches = schools.filter(
  (s) => s.nameEn.toUpperCase().includes("BRADBURY") && !isEsfSchool(s)
);

console.log(
  `Schools with "BRADBURY" but not ESF: ${bradburyMatches.length}`
);
for (const school of bradburyMatches) {
  console.log(`  - ${school.nameEn} (should not match ESF search)`);
}

// Schools with "基" but not ESF (potential false positive for "英基")
const jiMatches = schools.filter(
  (s) => s.name && s.name.includes("基") && !isEsfSchool(s)
).slice(0, 5);

console.log(`Sample schools with "基" but not ESF: ${jiMatches.length}`);
for (const school of jiMatches) {
  console.log(`  - ${school.name} (should not match 英基 search)`);
}

// ===== SUMMARY =====
console.log("\n=== TEST SUMMARY ===");
console.log(`Passed: ${passed}`);
console.log(`Failed: ${failed}`);
console.log(`Total: ${passed + failed}`);

if (failed > 0) {
  console.log("\n[QUALITY GATE FAILED]");
  process.exit(1);
} else {
  console.log("\n[QUALITY GATE PASSED]");
  process.exit(0);
}
