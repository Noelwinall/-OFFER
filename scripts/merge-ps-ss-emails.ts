/**
 * Merge primary/secondary school emails from schooland into the system
 */

import * as fs from "fs";
import * as path from "path";
import { schools } from "../data/schools";
import { getCHSCData, chscDataMap } from "../data/chsc-data";

// Load scraped emails
const emailsPath = path.join(__dirname, "../data/schooland-ps-ss-emails.json");
const scrapedEmails: Record<string, string> = JSON.parse(
  fs.readFileSync(emailsPath, "utf-8")
);

console.log("=== MERGING PS/SS EMAILS ===\n");
console.log(`Scraped email entries: ${Object.keys(scrapedEmails).length}`);

// Create lookup with name variations
const emailByName = new Map<string, string>();

Object.entries(scrapedEmails).forEach(([name, email]) => {
  // Store original name
  emailByName.set(name, email);

  // Store without parenthetical
  const cleanedName = name.replace(/\s*\([^)]+\)\s*/g, "").trim();
  if (cleanedName !== name) {
    emailByName.set(cleanedName, email);
  }

  // Extract Chinese name (before English)
  const chineseMatch = name.match(/^([^\x00-\x7F]+)/);
  if (chineseMatch) {
    emailByName.set(chineseMatch[1].trim(), email);
  }
});

// Match with our primary and secondary schools
const psssSchools = schools.filter(s => s.level === "小學" || s.level === "中學");
console.log(`Our PS/SS schools: ${psssSchools.length}`);

// Check which schools don't have email in CHSC
let noEmail = 0;
let canFill = 0;
const newEmails: Record<string, string> = {};

psssSchools.forEach(school => {
  const chsc = getCHSCData(school.name);
  if (chsc?.email) return; // Already has email

  noEmail++;

  // Try to find email
  let found = emailByName.get(school.name);

  if (!found) {
    // Try fuzzy match
    for (const [scrapedName, email] of emailByName) {
      if (school.name.includes(scrapedName) || scrapedName.includes(school.name)) {
        found = email;
        break;
      }
    }
  }

  if (found) {
    newEmails[school.name] = found;
    canFill++;
  }
});

console.log(`\nSchools without email: ${noEmail}`);
console.log(`Can fill from scraped data: ${canFill}`);

// Generate updated ps-ss email data file
const outputPath = path.join(__dirname, "../data/ps-ss-email-data.ts");

let output = `/**
 * Primary and Secondary school email data scraped from schooland.hk
 *
 * Auto-generated, do not edit manually
 * Generated: ${new Date().toISOString().split("T")[0]}
 */

export const psSsEmailMap: Record<string, string> = {
`;

Object.entries(newEmails).forEach(([name, email], index, arr) => {
  output += `  "${name}": "${email}"`;
  if (index < arr.length - 1) output += ",";
  output += "\n";
});

output += `};

/**
 * Get primary/secondary school email
 */
export function getPsSsEmail(schoolName: string): string | undefined {
  return psSsEmailMap[schoolName];
}
`;

fs.writeFileSync(outputPath, output);
console.log(`\nGenerated: ${outputPath}`);

// Show sample
console.log("\nSample new emails (first 20):");
Object.entries(newEmails).slice(0, 20).forEach(([name, email]) => {
  console.log(`  ${name}: ${email}`);
});
