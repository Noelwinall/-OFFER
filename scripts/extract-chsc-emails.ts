/**
 * Extract all school emails from CHSC CSV files
 */

import * as fs from "fs";
import * as path from "path";

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

interface SchoolContact {
  name: string;
  phone?: string;
  fax?: string;
  email?: string;
  website?: string;
}

function extractFromCSV(filePath: string): SchoolContact[] {
  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.split("\n").filter(l => l.trim());
  const headers = parseCSVLine(lines[0]);

  // Find column indices
  const nameIdx = headers.findIndex(h => h.includes("學校名稱"));
  const phoneIdx = headers.findIndex(h => h.includes("學校電話"));
  const faxIdx = headers.findIndex(h => h.includes("學校傳真"));
  const emailIdx = headers.findIndex(h => h.includes("學校電郵"));
  const websiteIdx = headers.findIndex(h => h.includes("學校網址"));

  console.log(`  File: ${path.basename(filePath)}`);
  console.log(`  Columns: name=${nameIdx}, phone=${phoneIdx}, fax=${faxIdx}, email=${emailIdx}, website=${websiteIdx}`);

  const schools: SchoolContact[] = [];

  for (let i = 1; i < lines.length; i++) {
    const cols = parseCSVLine(lines[i]);
    const name = cols[nameIdx]?.trim();
    if (!name) continue;

    const email = cols[emailIdx]?.trim();
    const phone = cols[phoneIdx]?.trim();
    const fax = cols[faxIdx]?.trim();
    const website = cols[websiteIdx]?.trim();

    schools.push({
      name,
      phone: phone && phone !== "不適用" ? phone.replace(/\s/g, "") : undefined,
      fax: fax && fax !== "不適用" ? fax.replace(/\s/g, "") : undefined,
      email: email && email !== "不適用" && email.includes("@") ? email : undefined,
      website: website && website !== "不適用" ? website : undefined,
    });
  }

  return schools;
}

async function main() {
  console.log("=== EXTRACTING EMAILS FROM CHSC CSV FILES ===\n");

  const chscDir = path.join(__dirname, "../data/CHSC");
  const csvFiles = [
    "psp_2025_tc.csv",
    "ssp_2025_2026_tc.csv",
  ];

  const allSchools: Map<string, SchoolContact> = new Map();

  for (const file of csvFiles) {
    const filePath = path.join(chscDir, file);
    if (fs.existsSync(filePath)) {
      const schools = extractFromCSV(filePath);
      console.log(`  Found ${schools.length} schools`);

      schools.forEach(s => {
        // Only add if has useful contact info
        if (s.email || s.phone || s.fax) {
          allSchools.set(s.name, s);
        }
      });
    }
  }

  console.log(`\nTotal unique schools: ${allSchools.size}`);

  // Count coverage
  const withEmail = [...allSchools.values()].filter(s => s.email).length;
  const withPhone = [...allSchools.values()].filter(s => s.phone).length;
  const withFax = [...allSchools.values()].filter(s => s.fax).length;

  console.log(`  With email: ${withEmail}`);
  console.log(`  With phone: ${withPhone}`);
  console.log(`  With fax: ${withFax}`);

  // Show sample emails
  console.log("\nSample emails (first 20):");
  [...allSchools.entries()]
    .filter(([_, s]) => s.email)
    .slice(0, 20)
    .forEach(([name, s]) => {
      console.log(`  ${name}: ${s.email}`);
    });

  // Generate TypeScript code to add to chsc-data.ts
  const emailMap: Record<string, { phone?: string; fax?: string; email?: string }> = {};

  allSchools.forEach((school, name) => {
    if (school.email || school.phone || school.fax) {
      emailMap[name] = {};
      if (school.phone) emailMap[name].phone = school.phone;
      if (school.fax) emailMap[name].fax = school.fax;
      if (school.email) emailMap[name].email = school.email;
    }
  });

  // Save as JSON for further processing
  const outputPath = path.join(__dirname, "../data/chsc-extracted-contacts.json");
  fs.writeFileSync(outputPath, JSON.stringify(emailMap, null, 2));
  console.log(`\nSaved to: ${outputPath}`);
}

main().catch(console.error);
