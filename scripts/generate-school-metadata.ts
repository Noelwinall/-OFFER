/**
 * Generate school metadata mapping from CHSC data
 *
 * Sources:
 * - data/psp_2025_tc.csv (Primary School Profile - religion, school net)
 * - data/ssp_2025_2026_tc.csv (Secondary School Profile - religion)
 * - data/through_train schools (47 total).docx (relationship data)
 *
 * Output:
 * - data/mappings/school-metadata-map.ts
 *
 * Run: npx tsx scripts/generate-school-metadata.ts
 */
import * as fs from "fs";
import * as path from "path";
import { schools } from "../data/schools";

const DATA_DIR = path.join(__dirname, "../data");
const MAPPINGS_DIR = path.join(DATA_DIR, "mappings");

// Ensure mappings directory exists
if (!fs.existsSync(MAPPINGS_DIR)) {
  fs.mkdirSync(MAPPINGS_DIR, { recursive: true });
}

interface SchoolMetadata {
  religion?: string;
  schoolNet?: string;
  isSpecialSchool?: boolean;
  relationship?: "THROUGH_TRAIN" | "AFFILIATED" | "LINKED";
}

/**
 * Parse CSV file (handles quoted fields)
 */
function parseCSV(content: string): { headers: string[]; rows: string[][] } {
  const lines = content.split("\n").filter(line => line.trim());
  const headers = parseCSVLine(lines[0]);
  const rows = lines.slice(1).map(parseCSVLine);
  return { headers, rows };
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
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

/**
 * Normalize school name for matching
 */
function normalizeSchoolName(name: string): string {
  return name
    .replace(/（/g, "(")
    .replace(/）/g, ")")
    .replace(/\s+/g, "")
    .trim();
}

/**
 * Build name -> school_id map from our schools data
 */
function buildSchoolNameMap(): Map<string, string> {
  const nameMap = new Map<string, string>();

  for (const school of schools) {
    // Add normalized Chinese name
    nameMap.set(normalizeSchoolName(school.name), school.id);

    // Add normalized English name
    if (school.nameEn) {
      nameMap.set(normalizeSchoolName(school.nameEn.toUpperCase()), school.id);
    }
  }

  return nameMap;
}

/**
 * Parse religion value - return undefined for "無" or empty
 */
function parseReligion(value: string): string | undefined {
  const cleaned = value.trim();
  if (!cleaned || cleaned === "無" || cleaned === "不適用" || cleaned === "-" || cleaned === "/") {
    return undefined;
  }
  return cleaned;
}

/**
 * Parse school net value - return undefined if empty or "/"
 */
function parseSchoolNet(value: string): string | undefined {
  const cleaned = value.trim();
  if (!cleaned || cleaned === "/" || cleaned === "-" || cleaned === "不適用") {
    return undefined;
  }
  return cleaned;
}

/**
 * Parse through-train relationship data from docx content
 * Returns: Map<primary_school_name, relationship_type>
 */
function parseRelationshipData(): Map<string, "THROUGH_TRAIN" | "AFFILIATED" | "LINKED"> {
  const relationshipMap = new Map<string, "THROUGH_TRAIN" | "AFFILIATED" | "LINKED">();

  // Through-train schools (一條龍)
  const throughTrainPrimaries = [
    "新會商會學校",
    "佛教黃焯菴小學",
    "中華基督教會灣仔堂基道小學(九龍城)",
    "天神嘉諾撒學校",
    "嘉諾撒聖瑪利學校",
    "港九街坊婦女會孫方中小學",
    "西貢崇真天主教學校(小學部)",
    "香海正覺蓮社佛教黃藻森學校",
    "天水圍循道衞理小學",
    "金巴崙長老會耀道小學",
    "順德聯誼總會伍冕端小學",
    "伊利沙伯中學舊生會小學",
    "伊利沙伯中學舊生會小學分校",
    "東涌天主教學校",
    "香港教育工作者聯會黃楚標學校",
    "嗇色園主辦可譽中學暨可譽小學",
    "靈糧堂秀德小學",
    "拔萃男書院附屬小學",
    "基督教香港信義會宏信書院",
    "保良局陸慶濤小學",
    "香港華人基督教聯會真道書院",
    "播道書院",
    "優才(楊殷有娣)書院",
    "浸大附屬學校王錦輝中小學",
    "培僑書院",
    "港大同學會小學",
    "漢華中學(小學部)",
    "聖保羅男女中學附屬小學",
    "英華小學",
    "聖瑪加利男女英文中小學",
    "地利亞(閩僑)英文小學",
    "福建中學附屬學校",
    "弘立書院",
    "漢鼎書院",
    "滬江維多利亞學校",
    "拔萃女小學",
    "保良局蔡繼有學校",
    "國際基督教優質音樂學校",
  ];

  // Affiliated schools (直屬)
  const affiliatedPrimaries = [
    "嘉諾撒聖心學校",
    "聖士提反女子中學附屬小學",
    "嘉諾撒聖心學校私立部",
    "聖嘉勒小學",
    "聖類斯中學(小學部)",
    "番禺會所華仁小學",
    "慈幼學校",
    "香港仔聖伯多祿天主教小學",
    "聖伯多祿天主教小學",
    "聖保羅書院小學",
    "聖士提反書院附屬小學",
    "瑪利曼小學",
    "嘉諾撒聖方濟各學校",
    "聖若瑟小學",
    "聖保祿天主教小學",
    "高主教書院小學部",
    "聖保祿學校(小學部)",
    "聖羅撒學校",
    "嘉諾撒聖家學校",
    "嘉諾撒聖家學校(九龍塘)",
    "喇沙小學",
    "瑪利諾修院學校(小學部)",
    "民生書院小學",
    "香港培正小學",
    "聖若瑟英文小學",
    "瑪利諾神父教會學校(小學部)",
    "天主教伍華小學",
    "聖母小學",
  ];

  // Linked schools (聯繫) - partial list of primary schools
  const linkedPrimaries = [
    "李陞小學",
    "般咸道官立小學",
    "香港南區官立小學",
    "香島道官立小學",
    "軒尼詩道官立小學(上午)",
    "軒尼詩道官立小學(下午)",
    "北角官立小學",
    "北角官立小學(雲景道)",
    "愛秩序灣官立小學",
    "筲箕灣官立小學",
    "香港嘉諾撒學校",
    "馬頭涌官立小學",
    "農圃道官立小學",
    "馬頭涌官立小學(紅磡灣)",
    "九龍塘官立小學",
    "觀塘官立小學(秀明道)",
    "觀塘官立小學",
    "將軍澳官立小學",
    "深水埗官立小學",
    "福榮街官立小學",
    "海壩街官立小學",
    "荃灣官立小學",
    "黃大仙官立小學",
    "廣東道官立小學",
    "佐敦道官立小學",
    "塘尾道官立小學",
    "香港培道小學",
    "九龍真光中學(小學部)",
    "聖三一堂小學",
    "屯門官立小學",
    "元朗官立小學",
    "南元朗官立小學",
    "天水圍官立小學",
    "天水圍天主教小學",
    "元朗公立中學校友會英業小學",
    "元朗公立中學校友會小學",
    "粉嶺官立小學",
    "大埔官立小學",
    "路德會呂祥光小學",
    "保良局莊啟程第二小學",
    "保良局梁周順琴小學",
    "保良局西區婦女福利會馮李佩瑤小學",
    "保良局志豪小學",
    "保良局方王錦全小學",
    "順德聯誼總會何日東小學",
    "順德聯誼總會李金小學",
    "順德聯誼總會胡少渠紀念小學",
    "仁德天主教小學",
    "青山天主教小學",
    "仁濟醫院何式南小學",
    "仁濟醫院羅陳楚思小學",
    "沙田官立小學",
    "聖母無玷聖心學校",
    "沙田崇真學校",
    "東莞工商總會張煌偉小學",
    "浸信會呂明才小學",
    "浸信會沙田圍呂明才小學",
    "培基小學",
    "德信學校",
    "官立嘉道理爵士小學",
    "李鄭屋官立小學",
    "香港四邑商工總會新會商會學校",
    "中華基督教會全完第二小學",
    "聖公會仁立紀念小學",
    "聖公會仁立小學",
    "救恩學校",
    "神召第一小學暨幼稚園",
    "樂善堂楊仲明學校",
    "樂善堂小學",
    "保良局錦泰小學",
    "保良局何壽南小學",
    "保良局陳南昌夫人小學",
    "慈雲山聖文德天主教小學",
    "聖文德天主教小學",
    "港澳信義會明道小學",
    "港澳信義會小學",
    "玫瑰崗學校(小學部)",
    "香港真光中學(小學部)",
    "嘉諾撒培德學校",
  ];

  // Add to map
  for (const name of throughTrainPrimaries) {
    relationshipMap.set(normalizeSchoolName(name), "THROUGH_TRAIN");
  }
  for (const name of affiliatedPrimaries) {
    relationshipMap.set(normalizeSchoolName(name), "AFFILIATED");
  }
  for (const name of linkedPrimaries) {
    relationshipMap.set(normalizeSchoolName(name), "LINKED");
  }

  return relationshipMap;
}

/**
 * Main function to generate metadata mapping
 */
function generateMetadataMapping() {
  console.log("Generating school metadata mapping...\n");

  const nameMap = buildSchoolNameMap();
  const relationshipMap = parseRelationshipData();
  const metadataMap: Record<string, SchoolMetadata> = {};

  // Track stats
  let religionCount = 0;
  let schoolNetCount = 0;
  let specialSchoolCount = 0;
  let relationshipCount = 0;

  // Parse Primary School Profile (PSP)
  const pspPath = path.join(DATA_DIR, "psp_2025_tc.csv");
  if (fs.existsSync(pspPath)) {
    console.log("Processing PSP (Primary School Profile)...");
    const content = fs.readFileSync(pspPath, "utf-8");
    const { headers, rows } = parseCSV(content);

    // Find column indices
    const nameIdx = headers.indexOf("學校名稱");
    const religionIdx = headers.indexOf("宗教");
    const schoolNetIdx = headers.indexOf("小一學校網");

    for (const row of rows) {
      const schoolName = row[nameIdx];
      if (!schoolName) continue;

      // Find matching school_id
      const normalizedName = normalizeSchoolName(schoolName);
      const schoolId = nameMap.get(normalizedName);

      if (!schoolId) continue;

      // Initialize metadata if not exists
      if (!metadataMap[schoolId]) {
        metadataMap[schoolId] = {};
      }

      // Parse religion
      const religion = parseReligion(row[religionIdx] || "");
      if (religion) {
        metadataMap[schoolId].religion = religion;
        religionCount++;
      }

      // Parse school net
      const schoolNet = parseSchoolNet(row[schoolNetIdx] || "");
      if (schoolNet) {
        metadataMap[schoolId].schoolNet = schoolNet;
        schoolNetCount++;
      }

      // Check for relationship
      const relationship = relationshipMap.get(normalizedName);
      if (relationship) {
        metadataMap[schoolId].relationship = relationship;
        relationshipCount++;
      }
    }

    console.log(`  Found ${religionCount} religions, ${schoolNetCount} school nets`);
  }

  // Parse Secondary School Profile (SSP) for religion only
  const sspPath = path.join(DATA_DIR, "ssp_2025_2026_tc.csv");
  if (fs.existsSync(sspPath)) {
    console.log("Processing SSP (Secondary School Profile)...");
    const content = fs.readFileSync(sspPath, "utf-8");
    const { headers, rows } = parseCSV(content);

    // Find column indices
    const nameIdx = headers.indexOf("學校名稱");
    const religionIdx = headers.indexOf("宗教");
    const categoryIdx = headers.indexOf("學校類別");

    let sspReligionCount = 0;

    for (const row of rows) {
      const schoolName = row[nameIdx];
      if (!schoolName) continue;

      // Find matching school_id
      const normalizedName = normalizeSchoolName(schoolName);
      const schoolId = nameMap.get(normalizedName);

      if (!schoolId) continue;

      // Initialize metadata if not exists
      if (!metadataMap[schoolId]) {
        metadataMap[schoolId] = {};
      }

      // Parse religion
      const religion = parseReligion(row[religionIdx] || "");
      if (religion && !metadataMap[schoolId].religion) {
        metadataMap[schoolId].religion = religion;
        religionCount++;
        sspReligionCount++;
      }

      // Check if special school (學校類別 contains "特殊")
      const category = row[categoryIdx] || "";
      if (category.includes("特殊")) {
        metadataMap[schoolId].isSpecialSchool = true;
        specialSchoolCount++;
      }
    }

    console.log(`  Found ${sspReligionCount} additional religions, ${specialSchoolCount} special schools`);
  }

  // Check PSP for special schools too
  if (fs.existsSync(pspPath)) {
    const content = fs.readFileSync(pspPath, "utf-8");
    const { headers, rows } = parseCSV(content);

    const nameIdx = headers.indexOf("學校名稱");
    const category1Idx = headers.indexOf("學校類別1");
    const category2Idx = headers.indexOf("學校類別2");

    for (const row of rows) {
      const schoolName = row[nameIdx];
      if (!schoolName) continue;

      const normalizedName = normalizeSchoolName(schoolName);
      const schoolId = nameMap.get(normalizedName);

      if (!schoolId) continue;

      // Check if special school
      const category1 = row[category1Idx] || "";
      const category2 = row[category2Idx] || "";
      if (category1.includes("特殊") || category2.includes("特殊")) {
        if (!metadataMap[schoolId]) {
          metadataMap[schoolId] = {};
        }
        if (!metadataMap[schoolId].isSpecialSchool) {
          metadataMap[schoolId].isSpecialSchool = true;
          specialSchoolCount++;
        }
      }
    }
  }

  // Clean up metadata - remove empty objects
  for (const [id, metadata] of Object.entries(metadataMap)) {
    if (Object.keys(metadata).length === 0) {
      delete metadataMap[id];
    }
  }

  // Generate output
  const output = `// School Metadata Mapping
// Sources: psp_2025_tc.csv, ssp_2025_2026_tc.csv, through_train schools data
// Generated: ${new Date().toISOString().split("T")[0]}
// Total mappings: ${Object.keys(metadataMap).length}
// Stats: ${religionCount} religions, ${schoolNetCount} school nets, ${specialSchoolCount} special schools, ${relationshipCount} relationships
//
// DO NOT EDIT - Run \`npx tsx scripts/generate-school-metadata.ts\` to regenerate

import type { SchoolRelationship } from "@/types/school";

export interface SchoolMetadataEntry {
  religion?: string;
  schoolNet?: string;
  isSpecialSchool?: boolean;
  relationship?: SchoolRelationship;
}

export const schoolMetadataMap: Record<string, SchoolMetadataEntry> = ${JSON.stringify(metadataMap, null, 2)};
`;

  const outputPath = path.join(MAPPINGS_DIR, "school-metadata-map.ts");
  fs.writeFileSync(outputPath, output);

  console.log(`\n[school-metadata] ${Object.keys(metadataMap).length} total mappings -> ${outputPath}`);
  console.log(`  - Religions: ${religionCount}`);
  console.log(`  - School nets: ${schoolNetCount}`);
  console.log(`  - Special schools: ${specialSchoolCount}`);
  console.log(`  - Relationships: ${relationshipCount}`);
}

// Run
generateMetadataMapping();
console.log("\nDone!");
