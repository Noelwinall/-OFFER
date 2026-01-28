/**
 * Merge EDB contact data into schools data
 * EDB data has: TELEPHONE, FAX NUMBER, WEBSITE for all school types
 */

import * as fs from "fs";
import * as path from "path";

// Read EDB CSV
const edbCsvPath = path.join(__dirname, "../data/edb_schools_contact.csv");
const edbCsv = fs.readFileSync(edbCsvPath, "utf-8");

// Parse CSV
const lines = edbCsv.split("\n").filter(l => l.trim());
const headers = lines[0].split(",");

console.log("EDB CSV Headers:", headers.slice(0, 10).join(", "), "...");

// Find column indices
const schoolNoIdx = headers.findIndex(h => h.includes("SCHOOL NO"));
const engNameIdx = headers.findIndex(h => h === "ENGLISH NAME");
const chnNameIdx = headers.findIndex(h => h.includes("中文名稱"));
const phoneIdx = headers.findIndex(h => h.includes("TELEPHONE"));
const faxIdx = headers.findIndex(h => h.includes("FAX NUMBER"));
const websiteIdx = headers.findIndex(h => h === "WEBSITE");
const levelIdx = headers.findIndex(h => h.includes("SCHOOL LEVEL"));

console.log("\nColumn indices:");
console.log("  School No:", schoolNoIdx);
console.log("  Eng Name:", engNameIdx);
console.log("  Chinese Name:", chnNameIdx);
console.log("  Phone:", phoneIdx);
console.log("  Fax:", faxIdx);
console.log("  Website:", websiteIdx);
console.log("  Level:", levelIdx);

// Parse data rows
interface EDBSchool {
  schoolNo: string;
  nameEn: string;
  nameCn: string;
  phone: string;
  fax: string;
  website: string;
  level: string;
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

const edbSchools: EDBSchool[] = [];
for (let i = 1; i < lines.length; i++) {
  const cols = parseCSVLine(lines[i]);
  if (cols.length > websiteIdx) {
    const phone = cols[phoneIdx]?.replace(/\s/g, "") || "";
    const fax = cols[faxIdx]?.replace(/\s/g, "") || "";
    const website = cols[websiteIdx] || "";

    // Skip if all contact info is N.A. or empty
    if ((phone === "N.A." || !phone) && (fax === "N.A." || !fax) && (website === "N.A." || !website)) {
      continue;
    }

    edbSchools.push({
      schoolNo: cols[schoolNoIdx] || "",
      nameEn: cols[engNameIdx] || "",
      nameCn: cols[chnNameIdx] || "",
      phone: phone === "N.A." ? "" : phone,
      fax: fax === "N.A." ? "" : fax,
      website: website === "N.A." ? "" : website,
      level: cols[levelIdx] || "",
    });
  }
}

console.log("\nTotal EDB schools parsed:", edbSchools.length);

// Count by level
const byLevel: Record<string, number> = {};
edbSchools.forEach(s => {
  byLevel[s.level] = (byLevel[s.level] || 0) + 1;
});
console.log("By level:", byLevel);

// Count contact coverage
const withPhone = edbSchools.filter(s => s.phone && s.phone.length > 0).length;
const withFax = edbSchools.filter(s => s.fax && s.fax.length > 0).length;
const withWebsite = edbSchools.filter(s => s.website && s.website.length > 0).length;

console.log("\nEDB Contact coverage:");
console.log(`  Phone: ${withPhone}/${edbSchools.length}`);
console.log(`  Fax: ${withFax}/${edbSchools.length}`);
console.log(`  Website: ${withWebsite}/${edbSchools.length}`);

// Create lookup by Chinese name
const edbByName = new Map<string, EDBSchool>();
edbSchools.forEach(s => {
  if (s.nameCn) {
    edbByName.set(s.nameCn, s);
  }
});

console.log("\nEDB lookup by name created:", edbByName.size, "entries");

// Sample matches
console.log("\nSample EDB data (first 5):");
edbSchools.slice(0, 5).forEach(s => {
  console.log(`  ${s.nameCn}: phone=${s.phone}, fax=${s.fax}, website=${s.website?.substring(0, 30)}`);
});

// Now match with our schools data
import { schools } from "../data/schools";

console.log("\n=== MATCHING WITH SCHOOLS DATA ===");
console.log("Our schools count:", schools.length);

// Match stats
let matchedTotal = 0;
let phoneFilled = 0;
let faxFilled = 0;
let websiteFilled = 0;

const updates: Array<{
  name: string;
  id: string;
  level: string;
  phoneBefore: string;
  phoneAfter: string;
  faxBefore: string;
  faxAfter: string;
  websiteBefore: string;
  websiteAfter: string;
}> = [];

schools.forEach(school => {
  const edb = edbByName.get(school.name);
  if (edb) {
    matchedTotal++;

    const update: any = {
      name: school.name,
      id: school.id,
      level: school.level,
      phoneBefore: school.phone || "",
      phoneAfter: school.phone || "",
      faxBefore: "", // We don't have fax in schools data
      faxAfter: "",
      websiteBefore: school.website || "",
      websiteAfter: school.website || "",
    };

    // Fill phone if missing
    if ((!school.phone || school.phone.trim() === "") && edb.phone) {
      update.phoneAfter = edb.phone;
      phoneFilled++;
    }

    // Fax is always new (we don't have it)
    if (edb.fax) {
      update.faxAfter = edb.fax;
      faxFilled++;
    }

    // Fill website if missing
    if ((!school.website || school.website.trim() === "") && edb.website) {
      update.websiteAfter = edb.website;
      websiteFilled++;
    }

    if (update.phoneAfter !== update.phoneBefore || update.faxAfter || update.websiteAfter !== update.websiteBefore) {
      updates.push(update);
    }
  }
});

console.log("\nMatching results:");
console.log(`  Matched schools: ${matchedTotal}/${schools.length} (${(matchedTotal/schools.length*100).toFixed(1)}%)`);
console.log(`  Phone can be filled: ${phoneFilled}`);
console.log(`  Fax can be filled: ${faxFilled}`);
console.log(`  Website can be filled: ${websiteFilled}`);

// Show unmatched schools
const unmatchedSchools = schools.filter(s => !edbByName.has(s.name));
console.log(`\nUnmatched schools: ${unmatchedSchools.length}`);

// By level
const unmatchedByLevel: Record<string, number> = {};
unmatchedSchools.forEach(s => {
  unmatchedByLevel[s.level] = (unmatchedByLevel[s.level] || 0) + 1;
});
console.log("Unmatched by level:", unmatchedByLevel);

// Export fax data for CHSC update
const chscUpdates: Record<string, { phone?: string; fax?: string; email?: string }> = {};
updates.forEach(u => {
  if (u.faxAfter) {
    chscUpdates[u.name] = {
      fax: u.faxAfter,
    };
    // Also add phone if EDB has it
    const edb = edbByName.get(u.name);
    if (edb?.phone) {
      chscUpdates[u.name].phone = edb.phone;
    }
  }
});

console.log("\n=== CHSC DATA UPDATE PREVIEW ===");
console.log(`Schools with new fax data: ${Object.keys(chscUpdates).length}`);

// Write chsc update file
const chscUpdatePath = path.join(__dirname, "../data/chsc-edb-merge.json");
fs.writeFileSync(chscUpdatePath, JSON.stringify(chscUpdates, null, 2));
console.log(`\nCHSC update data written to: ${chscUpdatePath}`);

// Summary
console.log("\n=== SUMMARY ===");
console.log("After merging EDB data:");

const currentPhoneMissing = schools.filter(s => !s.phone || s.phone.trim() === "").length;
const currentWebsiteMissing = schools.filter(s => !s.website || s.website.trim() === "").length;

console.log(`  Current phone missing: ${currentPhoneMissing}`);
console.log(`  After merge phone missing: ${currentPhoneMissing - phoneFilled}`);
console.log(`  Current website missing: ${currentWebsiteMissing}`);
console.log(`  After merge website missing: ${currentWebsiteMissing - websiteFilled}`);
console.log(`  Fax available: ${faxFilled} (new field)`);

// Sample updates
console.log("\nSample updates (first 10):");
updates.slice(0, 10).forEach(u => {
  const changes: string[] = [];
  if (u.phoneAfter !== u.phoneBefore) changes.push(`phone: ${u.phoneBefore || "(empty)"} -> ${u.phoneAfter}`);
  if (u.faxAfter) changes.push(`fax: (new) ${u.faxAfter}`);
  if (u.websiteAfter !== u.websiteBefore) changes.push(`website: ${u.websiteBefore || "(empty)"} -> ${u.websiteAfter}`);
  if (changes.length > 0) {
    console.log(`  ${u.name}: ${changes.join(", ")}`);
  }
});
