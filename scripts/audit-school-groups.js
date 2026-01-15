/**
 * School Group Audit Script
 *
 * This script validates:
 * 1. ESF schools are correctly identified
 * 2. International schools are correctly classified
 * 3. No false positives in category assignments
 *
 * Generates:
 * - esf-audit-report.json: List of matched/unmatched ESF schools
 * - international-audit-report.json: International school classification report
 * - needs-review.json: Schools that need manual review
 */

const fs = require("fs");
const path = require("path");

// Load schools data
const schoolsPath = path.join(__dirname, "../data/schools.ts");
const schoolsContent = fs.readFileSync(schoolsPath, "utf-8");

// Extract school objects using regex (simplified parsing)
const schoolMatches = schoolsContent.matchAll(
  /\{\s*"id":\s*"([^"]+)"[\s\S]*?"nameEn":\s*"([^"]+)"[\s\S]*?"category":\s*"([^"]+)"[\s\S]*?"level":\s*"([^"]+)"/g
);

const schools = [];
for (const match of schoolMatches) {
  schools.push({
    id: match[1],
    nameEn: match[2],
    category: match[3],
    level: match[4],
  });
}

console.log(`Loaded ${schools.length} schools from database`);

// ESF Canonical List (from school-groups.ts)
const ESF_CANONICAL_LIST = [
  // PRIMARY (9)
  { nameEn: "BEACON HILL SCHOOL", phase: "PRIMARY" },
  { nameEn: "BRADBURY SCHOOL", phase: "PRIMARY" },
  { nameEn: "CLEARWATER BAY SCHOOL", phase: "PRIMARY" },
  { nameEn: "GLENEALY SCHOOL", phase: "PRIMARY" },
  { nameEn: "KENNEDY SCHOOL", phase: "PRIMARY" },
  { nameEn: "KOWLOON JUNIOR SCHOOL", phase: "PRIMARY" },
  { nameEn: "PEAK SCHOOL", phase: "PRIMARY" },
  { nameEn: "QUARRY BAY SCHOOL", phase: "PRIMARY" },
  { nameEn: "SHATIN JUNIOR SCHOOL", aliasesEn: ["SHA TIN JUNIOR SCHOOL"], phase: "PRIMARY" },
  // SECONDARY (5)
  { nameEn: "ISLAND SCHOOL", phase: "SECONDARY" },
  { nameEn: "KING GEORGE V SCHOOL", phase: "SECONDARY" },
  { nameEn: "SHATIN COLLEGE", aliasesEn: ["SHA TIN COLLEGE"], phase: "SECONDARY" },
  { nameEn: "SOUTH ISLAND SCHOOL", aliasesEn: ["THE SOUTH ISLAND SCHOOL"], phase: "SECONDARY" },
  { nameEn: "WEST ISLAND SCHOOL", phase: "SECONDARY" },
  // ALL-THROUGH (2)
  { nameEn: "DISCOVERY COLLEGE", phase: "ALL_THROUGH" },
  { nameEn: "RENAISSANCE COLLEGE", phase: "ALL_THROUGH" },
  // SPECIAL (1)
  { nameEn: "JOCKEY CLUB SARAH ROE SCHOOL", phase: "SPECIAL" },
  // KINDERGARTEN (5)
  { nameEn: "ESF ABACUS INTERNATIONAL KINDERGARTEN", phase: "KINDERGARTEN" },
  { nameEn: "ESF INTERNATIONAL KINDERGARTEN (WU KAI SHA)", phase: "KINDERGARTEN" },
  { nameEn: "ESF INTERNATIONAL KINDERGARTEN (TSING YI)", phase: "KINDERGARTEN" },
  { nameEn: "ESF INTERNATIONAL KINDERGARTEN (HILLSIDE)", phase: "KINDERGARTEN" },
  { nameEn: "ESF INTERNATIONAL KINDERGARTEN (TUNG CHUNG)", phase: "KINDERGARTEN" },
];

// Normalize name for matching
function normalizeName(name) {
  return name
    .toUpperCase()
    .replace(/\s+/g, " ")
    .replace(/^THE\s+/, "")
    .trim();
}

// Check if school matches ESF entry
function matchesEsfEntry(schoolNameEn, entry) {
  const normalizedInput = normalizeName(schoolNameEn);
  const normalizedCanonical = normalizeName(entry.nameEn);

  if (normalizedInput === normalizedCanonical) return true;

  if (entry.aliasesEn) {
    for (const alias of entry.aliasesEn) {
      if (normalizedInput === normalizeName(alias)) return true;
    }
  }

  return false;
}

// Find ESF schools in database
const esfReport = {
  timestamp: new Date().toISOString(),
  summary: {
    canonicalCount: ESF_CANONICAL_LIST.length,
    matchedCount: 0,
    unmatchedCanonical: [],
    falsePositives: [],
  },
  matched: [],
  byPhase: {
    PRIMARY: [],
    SECONDARY: [],
    ALL_THROUGH: [],
    SPECIAL: [],
    KINDERGARTEN: [],
  },
};

// Track which canonical entries have been matched
const matchedCanonical = new Set();

// Find matches for each school
for (const school of schools) {
  for (const entry of ESF_CANONICAL_LIST) {
    if (matchesEsfEntry(school.nameEn, entry)) {
      esfReport.matched.push({
        id: school.id,
        nameEn: school.nameEn,
        category: school.category,
        level: school.level,
        esfPhase: entry.phase,
        canonicalName: entry.nameEn,
      });
      esfReport.byPhase[entry.phase].push(school.nameEn);
      matchedCanonical.add(entry.nameEn);
    }
  }
}

esfReport.summary.matchedCount = esfReport.matched.length;

// Find unmatched canonical entries
for (const entry of ESF_CANONICAL_LIST) {
  if (!matchedCanonical.has(entry.nameEn)) {
    esfReport.summary.unmatchedCanonical.push({
      nameEn: entry.nameEn,
      phase: entry.phase,
    });
  }
}

// Check for false positives (schools with "ESF" or similar in name but not in canonical list)
const esfKeywords = ["ESF ", "ENGLISH SCHOOLS FOUNDATION", "白普理", "英基"];
for (const school of schools) {
  const hasEsfKeyword = esfKeywords.some(
    (kw) =>
      school.nameEn.toUpperCase().includes(kw.toUpperCase()) ||
      (school.name && school.name.includes(kw))
  );

  if (hasEsfKeyword) {
    const isRealEsf = ESF_CANONICAL_LIST.some((entry) => matchesEsfEntry(school.nameEn, entry));
    if (!isRealEsf) {
      esfReport.summary.falsePositives.push({
        id: school.id,
        nameEn: school.nameEn,
        reason: "Contains ESF-related keyword but not in canonical list",
      });
    }
  }
}

// International school audit
const internationalPatterns = [
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

const internationalReport = {
  timestamp: new Date().toISOString(),
  summary: {
    esfSchools: esfReport.matched.length,
    otherInternational: 0,
    totalInternational: 0,
    categorizedAsPrivateButInternational: [],
  },
  esfSchools: esfReport.matched.map((s) => s.nameEn),
  otherInternational: [],
};

// Find other international schools
for (const school of schools) {
  const normalizedName = normalizeName(school.nameEn);
  const isOtherIntl = internationalPatterns.some((p) =>
    normalizedName.includes(normalizeName(p))
  );

  if (isOtherIntl) {
    internationalReport.otherInternational.push({
      id: school.id,
      nameEn: school.nameEn,
      currentCategory: school.category,
      level: school.level,
    });

    // Check for misclassification
    if (school.category === "私立") {
      internationalReport.summary.categorizedAsPrivateButInternational.push({
        id: school.id,
        nameEn: school.nameEn,
        note: "Categorized as 私立 but is international school",
      });
    }
  }
}

internationalReport.summary.otherInternational =
  internationalReport.otherInternational.length;
internationalReport.summary.totalInternational =
  esfReport.matched.length + internationalReport.otherInternational.length;

// Needs review report
const needsReview = {
  timestamp: new Date().toISOString(),
  esfFalsePositives: esfReport.summary.falsePositives,
  unmatchedCanonical: esfReport.summary.unmatchedCanonical,
  categoryConflicts: internationalReport.summary.categorizedAsPrivateButInternational,
};

// Write reports
const outputDir = path.join(__dirname, "_output");
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(
  path.join(outputDir, "esf-audit-report.json"),
  JSON.stringify(esfReport, null, 2)
);

fs.writeFileSync(
  path.join(outputDir, "international-audit-report.json"),
  JSON.stringify(internationalReport, null, 2)
);

fs.writeFileSync(
  path.join(outputDir, "needs-review.json"),
  JSON.stringify(needsReview, null, 2)
);

// Print summary
console.log("\n=== ESF AUDIT REPORT ===");
console.log(`Canonical ESF schools: ${ESF_CANONICAL_LIST.length}`);
console.log(`Matched in database: ${esfReport.summary.matchedCount}`);
console.log(`Unmatched canonical: ${esfReport.summary.unmatchedCanonical.length}`);
console.log(`False positives (keyword match but not ESF): ${esfReport.summary.falsePositives.length}`);

console.log("\nBy Phase:");
for (const [phase, schools] of Object.entries(esfReport.byPhase)) {
  console.log(`  ${phase}: ${schools.length}`);
}

if (esfReport.summary.unmatchedCanonical.length > 0) {
  console.log("\nUnmatched canonical entries:");
  for (const entry of esfReport.summary.unmatchedCanonical) {
    console.log(`  - ${entry.nameEn} (${entry.phase})`);
  }
}

if (esfReport.summary.falsePositives.length > 0) {
  console.log("\nFalse positives (need review):");
  for (const fp of esfReport.summary.falsePositives) {
    console.log(`  - ${fp.nameEn}`);
  }
}

console.log("\n=== INTERNATIONAL SCHOOL REPORT ===");
console.log(`ESF schools: ${internationalReport.summary.esfSchools}`);
console.log(`Other international: ${internationalReport.summary.otherInternational}`);
console.log(`Total international: ${internationalReport.summary.totalInternational}`);

if (internationalReport.summary.categorizedAsPrivateButInternational.length > 0) {
  console.log("\nCategory conflicts (marked as 私立 but is international):");
  for (const conflict of internationalReport.summary.categorizedAsPrivateButInternational) {
    console.log(`  - ${conflict.nameEn}`);
  }
}

console.log("\n=== REPORTS GENERATED ===");
console.log(`  ${path.join(outputDir, "esf-audit-report.json")}`);
console.log(`  ${path.join(outputDir, "international-audit-report.json")}`);
console.log(`  ${path.join(outputDir, "needs-review.json")}`);
