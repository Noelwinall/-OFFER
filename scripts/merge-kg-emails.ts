/**
 * Merge kindergarten emails from schooland into the contact data system
 */

import * as fs from "fs";
import * as path from "path";
import { schools } from "../data/schools";
import { getCHSCData } from "../data/chsc-data";

// Load scraped KG emails
const kgEmailsPath = path.join(__dirname, "../data/schooland-kg-emails.json");
const kgEmails: Record<string, { email?: string; phone?: string; fax?: string }> = JSON.parse(
  fs.readFileSync(kgEmailsPath, "utf-8")
);

console.log("=== MERGING KINDERGARTEN EMAILS ===\n");
console.log(`Scraped KG data entries: ${Object.keys(kgEmails).length}`);

// Create a mapping from school name variations to email
const emailByName = new Map<string, { email?: string; phone?: string; fax?: string }>();

Object.entries(kgEmails).forEach(([name, data]) => {
  // Store the original name
  emailByName.set(name, data);

  // Also store with common variations removed
  const cleanedName = name
    .replace(/\s*\([^)]+\)\s*/g, "") // Remove parenthetical remarks
    .replace(/\s+/g, "")
    .trim();

  if (cleanedName !== name) {
    emailByName.set(cleanedName, data);
  }
});

// Match with our kindergartens
const kgSchools = schools.filter(s => s.level === "幼稚園");
console.log(`Our kindergartens: ${kgSchools.length}`);

let matched = 0;
let emailsAdded = 0;

const emailMap: Record<string, string> = {};

kgSchools.forEach(school => {
  // Check if already has email from CHSC
  const chsc = getCHSCData(school.name);
  if (chsc?.email) {
    return; // Already has email
  }

  // Try to find email from schooland data
  let found = emailByName.get(school.name);

  // Try with name variations
  if (!found) {
    // Remove parenthetical
    const cleanName = school.name.replace(/\s*\([^)]+\)\s*/g, "").trim();
    found = emailByName.get(cleanName);
  }

  // Try fuzzy match
  if (!found) {
    for (const [scrapedName, data] of emailByName) {
      // Check if our school name contains the scraped name or vice versa
      if (school.name.includes(scrapedName) || scrapedName.includes(school.name)) {
        found = data;
        break;
      }
    }
  }

  if (found) {
    matched++;
    if (found.email) {
      emailMap[school.name] = found.email;
      emailsAdded++;
    }
  }
});

console.log(`\nMatched: ${matched}/${kgSchools.length}`);
console.log(`Emails to add: ${emailsAdded}`);

// Generate TypeScript code for KG email data
const outputPath = path.join(__dirname, "../data/kg-email-data.ts");

let output = `/**
 * Kindergarten email data scraped from schooland.hk
 *
 * Auto-generated, do not edit manually
 * Generated: ${new Date().toISOString().split("T")[0]}
 */

export const kgEmailMap: Record<string, string> = {
`;

Object.entries(emailMap).forEach(([name, email], index, arr) => {
  output += `  "${name}": "${email}"`;
  if (index < arr.length - 1) output += ",";
  output += "\n";
});

output += `};

/**
 * Get kindergarten email
 */
export function getKGEmail(schoolName: string): string | undefined {
  return kgEmailMap[schoolName];
}
`;

fs.writeFileSync(outputPath, output);
console.log(`\nGenerated: ${outputPath}`);

// Show sample
console.log("\nSample emails (first 20):");
Object.entries(emailMap).slice(0, 20).forEach(([name, email]) => {
  console.log(`  ${name}: ${email}`);
});
