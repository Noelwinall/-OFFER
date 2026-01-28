/**
 * Generate EDB contact data TypeScript file from CSV
 */

import * as fs from "fs";
import * as path from "path";

// Read EDB CSV
const edbCsvPath = path.join(__dirname, "../data/edb_schools_contact.csv");
const edbCsv = fs.readFileSync(edbCsvPath, "utf-8");

// Parse CSV
const lines = edbCsv.split("\n").filter(l => l.trim());
const headers = lines[0].split(",");

// Find column indices
const engNameIdx = headers.findIndex(h => h === "ENGLISH NAME");
const chnNameIdx = headers.findIndex(h => h.includes("中文名稱"));
const phoneIdx = headers.findIndex(h => h.includes("TELEPHONE"));
const faxIdx = headers.findIndex(h => h.includes("FAX NUMBER"));
const websiteIdx = headers.findIndex(h => h === "WEBSITE");

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

interface EDBContact {
  phone?: string;
  fax?: string;
  website?: string;
}

const edbContactMap: Record<string, EDBContact> = {};

for (let i = 1; i < lines.length; i++) {
  const cols = parseCSVLine(lines[i]);
  if (cols.length > websiteIdx) {
    const nameCn = cols[chnNameIdx] || "";
    if (!nameCn) continue;

    const phone = cols[phoneIdx]?.replace(/\s/g, "") || "";
    const fax = cols[faxIdx]?.replace(/\s/g, "") || "";
    const website = cols[websiteIdx] || "";

    // Skip if all contact info is N.A. or empty
    const hasPhone = phone && phone !== "N.A.";
    const hasFax = fax && fax !== "N.A.";
    const hasWebsite = website && website !== "N.A.";

    if (!hasPhone && !hasFax && !hasWebsite) continue;

    const contact: EDBContact = {};
    if (hasPhone) contact.phone = phone;
    if (hasFax) contact.fax = fax;
    if (hasWebsite) contact.website = website;

    edbContactMap[nameCn] = contact;
  }
}

console.log(`Parsed ${Object.keys(edbContactMap).length} schools with contact info`);

// Generate TypeScript file
const outputPath = path.join(__dirname, "../data/edb-contact-data.ts");

let output = `/**
 * EDB (Education Bureau) 學校聯絡資料
 *
 * 數據來源：EDB School List with Contact Information
 * 包含：電話、傳真、網站
 * 涵蓋：幼稚園、小學、中學
 *
 * 自動生成，請勿手動編輯
 */

export interface EDBContactData {
  phone?: string;
  fax?: string;
  website?: string;
}

export const edbContactMap: Record<string, EDBContactData> = {
`;

const entries = Object.entries(edbContactMap);
entries.forEach(([name, data], index) => {
  const parts: string[] = [];
  if (data.phone) parts.push(`phone: "${data.phone}"`);
  if (data.fax) parts.push(`fax: "${data.fax}"`);
  if (data.website) parts.push(`website: "${data.website.replace(/"/g, '\\"')}"`);

  output += `  "${name}": { ${parts.join(", ")} }`;
  if (index < entries.length - 1) output += ",";
  output += "\n";
});

output += `};

/**
 * 獲取學校的 EDB 聯絡資料
 * @param schoolName 學校名稱
 */
export function getEDBContactData(schoolName: string): EDBContactData | undefined {
  return edbContactMap[schoolName];
}
`;

fs.writeFileSync(outputPath, output);
console.log(`Generated: ${outputPath}`);

// Stats
const withPhone = Object.values(edbContactMap).filter(d => d.phone).length;
const withFax = Object.values(edbContactMap).filter(d => d.fax).length;
const withWebsite = Object.values(edbContactMap).filter(d => d.website).length;

console.log(`\nStats:`);
console.log(`  Schools with phone: ${withPhone}`);
console.log(`  Schools with fax: ${withFax}`);
console.log(`  Schools with website: ${withWebsite}`);
