/**
 * Update schools_raw.ts with missing phone/website data from EDB
 */

import * as fs from "fs";
import * as path from "path";
import { schoolsRaw } from "../data/schools_raw";
import { getEDBContactData } from "../data/edb-contact-data";

console.log("=== UPDATE SCHOOLS CONTACT DATA ===\n");

interface Update {
  id: string;
  name: string;
  field: "phone" | "website";
  oldValue: string;
  newValue: string;
}

const updates: Update[] = [];

schoolsRaw.forEach(school => {
  const edb = getEDBContactData(school.name);
  if (!edb) return;

  // Phone update
  if ((!school.phone || school.phone.trim() === "") && edb.phone) {
    updates.push({
      id: school.id,
      name: school.name,
      field: "phone",
      oldValue: school.phone || "",
      newValue: edb.phone,
    });
  }

  // Website update
  if ((!school.website || school.website.trim() === "") && edb.website) {
    updates.push({
      id: school.id,
      name: school.name,
      field: "website",
      oldValue: school.website || "",
      newValue: edb.website,
    });
  }
});

console.log(`Total updates needed: ${updates.length}`);
console.log(`  Phone updates: ${updates.filter(u => u.field === "phone").length}`);
console.log(`  Website updates: ${updates.filter(u => u.field === "website").length}`);

// Read schools_raw.ts file
const schoolsPath = path.join(__dirname, "../data/schools_raw.ts");
let schoolsContent = fs.readFileSync(schoolsPath, "utf-8");

// Apply updates
let appliedPhone = 0;
let appliedWebsite = 0;

updates.forEach(update => {
  // Find the school entry and update it
  // JSON format: "id": "xxx", ... "phone": "", ...

  const idPattern = `"id": "${update.id}"`;
  const idIndex = schoolsContent.indexOf(idPattern);

  if (idIndex === -1) {
    console.log(`  Warning: Could not find school ${update.name} (${update.id})`);
    return;
  }

  // Find the closing brace of this school object
  let braceCount = 0;
  let startIndex = idIndex;
  // Find the opening brace before the id
  while (startIndex > 0 && schoolsContent[startIndex] !== '{') {
    startIndex--;
  }

  let endIndex = startIndex;
  for (let i = startIndex; i < schoolsContent.length; i++) {
    if (schoolsContent[i] === '{') braceCount++;
    if (schoolsContent[i] === '}') braceCount--;
    if (braceCount === 0) {
      endIndex = i + 1;
      break;
    }
  }

  const schoolBlock = schoolsContent.substring(startIndex, endIndex);

  if (update.field === "phone") {
    // Replace "phone": "" with new value
    const phonePattern = /"phone":\s*""/;
    if (phonePattern.test(schoolBlock)) {
      const newBlock = schoolBlock.replace(phonePattern, `"phone": "${update.newValue}"`);
      schoolsContent = schoolsContent.replace(schoolBlock, newBlock);
      appliedPhone++;
    }
  } else if (update.field === "website") {
    // Replace "website": "" with new value
    const websitePattern = /"website":\s*""/;
    if (websitePattern.test(schoolBlock)) {
      const newBlock = schoolBlock.replace(websitePattern, `"website": "${update.newValue}"`);
      schoolsContent = schoolsContent.replace(schoolBlock, newBlock);
      appliedWebsite++;
    }
  }
});

console.log(`\nApplied updates:`);
console.log(`  Phone: ${appliedPhone}`);
console.log(`  Website: ${appliedWebsite}`);

// Write back
fs.writeFileSync(schoolsPath, schoolsContent);
console.log(`\nUpdated: ${schoolsPath}`);

// Show sample updates
console.log(`\nSample updates (first 20):`);
updates.slice(0, 20).forEach(u => {
  console.log(`  ${u.name}: ${u.field} = "${u.newValue}"`);
});
