/**
 * Generate complete CHSC data TypeScript file from CSV files
 * This replaces the manually entered data with full CSV data
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

interface CHSCSchool {
  phone?: string;
  fax?: string;
  email?: string;
  yearEstablished?: string;
  schoolMotto?: string;
}

function extractFromCSV(filePath: string, type: "primary" | "secondary"): Map<string, CHSCSchool> {
  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.split("\n").filter(l => l.trim());
  const headers = parseCSVLine(lines[0]);

  // Find column indices - different for primary vs secondary
  const nameIdx = headers.findIndex(h => h.includes("學校名稱"));
  const phoneIdx = headers.findIndex(h => h.includes("學校電話"));
  const faxIdx = headers.findIndex(h => h.includes("學校傳真"));
  const emailIdx = headers.findIndex(h => h.includes("學校電郵"));
  const yearIdx = headers.findIndex(h => h.includes("創校年份"));
  const mottoIdx = headers.findIndex(h => h.includes("校訓"));

  console.log(`Processing ${path.basename(filePath)}...`);
  console.log(`  Columns: name=${nameIdx}, phone=${phoneIdx}, fax=${faxIdx}, email=${emailIdx}, year=${yearIdx}, motto=${mottoIdx}`);

  const schools = new Map<string, CHSCSchool>();

  for (let i = 1; i < lines.length; i++) {
    const cols = parseCSVLine(lines[i]);
    const name = cols[nameIdx]?.trim();
    if (!name) continue;

    const phone = cols[phoneIdx]?.trim();
    const fax = cols[faxIdx]?.trim();
    const email = cols[emailIdx]?.trim();
    const year = cols[yearIdx]?.trim();
    const motto = cols[mottoIdx]?.trim();

    const school: CHSCSchool = {};

    if (phone && phone !== "不適用") school.phone = phone.replace(/\s/g, "");
    if (fax && fax !== "不適用") school.fax = fax.replace(/\s/g, "");
    if (email && email !== "不適用" && email.includes("@")) school.email = email;
    if (year && year !== "不適用" && /^\d{4}$/.test(year)) school.yearEstablished = year;
    if (motto && motto !== "不適用" && motto.length > 0) school.schoolMotto = motto;

    if (Object.keys(school).length > 0) {
      schools.set(name, school);
    }
  }

  console.log(`  Extracted ${schools.size} schools`);
  return schools;
}

async function main() {
  console.log("=== GENERATING COMPLETE CHSC DATA ===\n");

  const chscDir = path.join(__dirname, "../data/CHSC");

  // Extract from both CSV files
  const primarySchools = extractFromCSV(
    path.join(chscDir, "psp_2025_tc.csv"),
    "primary"
  );

  const secondarySchools = extractFromCSV(
    path.join(chscDir, "ssp_2025_2026_tc.csv"),
    "secondary"
  );

  // Merge (secondary takes priority for any conflicts)
  const allSchools = new Map([...primarySchools, ...secondarySchools]);

  console.log(`\nTotal schools: ${allSchools.size}`);

  // Generate TypeScript file
  const outputPath = path.join(__dirname, "../data/chsc-data-full.ts");

  let output = `/**
 * CHSC (學校概覽) 資料
 *
 * 數據來源：
 * - PSP (Primary School Profile) 2025: data/CHSC/psp_2025_tc.csv
 * - SSP (Secondary School Profile) 2025-2026: data/CHSC/ssp_2025_2026_tc.csv
 *
 * 涵蓋：510 小學 + 441 中學 = 951 學校
 * 提供：電話、傳真、電郵、創校年份、校訓
 *
 * 自動生成，請勿手動編輯
 * Generated: ${new Date().toISOString().split("T")[0]}
 */

// Import EDB contact data for supplementary contact info (kindergartens)
import { getEDBContactData } from "./edb-contact-data";

export interface CHSCSchoolData {
  phone?: string;
  fax?: string;
  email?: string;
  yearEstablished?: string;
  schoolMotto?: string;
}

/**
 * CHSC 資料映射表
 * Key: 學校名稱（與 schools 中的 name 字段匹配）
 */
export const chscDataMap: Record<string, CHSCSchoolData> = {
`;

  const entries = [...allSchools.entries()];
  entries.forEach(([name, data], index) => {
    const parts: string[] = [];
    if (data.phone) parts.push(`phone: "${data.phone}"`);
    if (data.fax) parts.push(`fax: "${data.fax}"`);
    if (data.email) parts.push(`email: "${data.email}"`);
    if (data.yearEstablished) parts.push(`yearEstablished: "${data.yearEstablished}"`);
    if (data.schoolMotto) {
      // Escape quotes in motto
      const escapedMotto = data.schoolMotto.replace(/"/g, '\\"').replace(/\n/g, " ");
      parts.push(`schoolMotto: "${escapedMotto}"`);
    }

    output += `  "${name}": { ${parts.join(", ")} }`;
    if (index < entries.length - 1) output += ",";
    output += "\n";
  });

  output += `};

/**
 * 獲取學校的 CHSC 資料（合併 EDB 資料）
 * @param schoolName 學校名稱
 * @returns CHSC 資料，若無則返回 undefined
 *
 * 優先順序：
 * 1. CHSC 資料（較可靠，涵蓋小學和中學）
 * 2. EDB 資料（涵蓋範圍廣，包含幼稚園）
 */
export function getCHSCData(schoolName: string): CHSCSchoolData | undefined {
  const chsc = chscDataMap[schoolName];
  const edb = getEDBContactData(schoolName);

  // If no data from either source
  if (!chsc && !edb) return undefined;

  // Merge data: CHSC takes priority
  return {
    phone: chsc?.phone || edb?.phone,
    fax: chsc?.fax || edb?.fax,
    email: chsc?.email, // Only CHSC has email
    yearEstablished: chsc?.yearEstablished,
    schoolMotto: chsc?.schoolMotto,
  };
}

/**
 * 檢查學校是否有 CHSC 資料
 * @param schoolName 學校名稱
 */
export function hasCHSCData(schoolName: string): boolean {
  return schoolName in chscDataMap || !!getEDBContactData(schoolName);
}
`;

  fs.writeFileSync(outputPath, output);
  console.log(`\nGenerated: ${outputPath}`);

  // Stats
  const withEmail = [...allSchools.values()].filter(d => d.email).length;
  const withPhone = [...allSchools.values()].filter(d => d.phone).length;
  const withFax = [...allSchools.values()].filter(d => d.fax).length;
  const withYear = [...allSchools.values()].filter(d => d.yearEstablished).length;
  const withMotto = [...allSchools.values()].filter(d => d.schoolMotto).length;

  console.log(`\nStats:`);
  console.log(`  With phone: ${withPhone}`);
  console.log(`  With fax: ${withFax}`);
  console.log(`  With email: ${withEmail}`);
  console.log(`  With year: ${withYear}`);
  console.log(`  With motto: ${withMotto}`);
}

main().catch(console.error);
