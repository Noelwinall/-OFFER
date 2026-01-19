/**
 * Generate KG Data Mappings from EDB Kindergarten Profile CSV
 *
 * Creates 3 audit-ready CSV files:
 * 1. curriculum_mapping_kg_v1.2.csv - Curriculum classification
 * 2. pedagogy_mapping_kg_v1.csv - Teaching approach tags
 * 3. language_env_mapping_kg_v1.csv - Language environment
 *
 * Usage: npx tsx scripts/generate-kg-mappings.ts
 */

import * as fs from "fs";
import * as path from "path";

// ============================================
// Types
// ============================================

interface KGProfile {
  schoolCode: string;
  campusCode: string;
  name: string;
  district: string;
  curriculumType: string; // 本地 | 非本地
  curriculumPlanning: string;
  teachingMethods: string;
  schoolType: string; // 非牟利 | 私立獨立
  joinKGP: string; // 有參加 | 沒有參加
}

interface CurriculumMapping {
  kg_id: string;
  curriculum: string;
  confidence: "high" | "medium" | "low";
  source_type: string;
  source_url: string;
  evidence_snippet: string;
  needs_review: boolean;
}

interface PedagogyMapping {
  kg_id: string;
  pedagogy_tags: string;
  confidence: "high" | "medium" | "low";
  source_type: string;
  source_url: string;
  evidence_snippet: string;
  needs_review: boolean;
}

interface LanguageEnvMapping {
  kg_id: string;
  language_env: string;
  confidence: "high" | "medium" | "low";
  source_type: string;
  source_url: string;
  evidence_snippet: string;
  needs_review: boolean;
}

// ============================================
// Constants
// ============================================

const SOURCE_URL = "https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/free-quality-kg-edu/KGP_2025_tc.csv";

// Curriculum type mapping
const CURRICULUM_MAP: Record<string, string> = {
  "本地": "local",
  "非本地": "non_local",
};

// Pedagogy keyword patterns
const PEDAGOGY_PATTERNS: Array<{ pattern: RegExp; tag: string }> = [
  // Specific methodologies
  { pattern: /蒙特梭利|蒙特索利|Montessori/i, tag: "montessori" },
  { pattern: /瑞吉歐|Reggio/i, tag: "reggio_emilia" },
  { pattern: /高瞻|HighScope|High\s*Scope/i, tag: "highscope" },
  { pattern: /華德福|Waldorf/i, tag: "waldorf" },
  { pattern: /IB|國際文憑/i, tag: "ib_pyp" },

  // Teaching approaches
  { pattern: /專題研習|方案教學|Project/i, tag: "project_based" },
  { pattern: /活動教學|活動學習/i, tag: "activity_based" },
  { pattern: /主題教學|主題綜合/i, tag: "thematic" },
  { pattern: /遊戲中學習|從遊戲中學習|遊戲學習|自由遊戲/i, tag: "play_based" },
  { pattern: /探究式|探索式|探索學習|探究學習/i, tag: "inquiry_based" },
  { pattern: /繪本教學|繪本/i, tag: "picture_book" },
  { pattern: /全語文/i, tag: "whole_language" },
  { pattern: /兒童為本|以兒童為中心|兒童為中心/i, tag: "child_centered" },
  { pattern: /多元智能/i, tag: "multiple_intelligences" },
  { pattern: /建構/i, tag: "constructivist" },
  { pattern: /STEM|STEAM|創客|Maker/i, tag: "stem_maker" },
  { pattern: /感官學習|感官探索|多感官/i, tag: "sensory_learning" },
  { pattern: /小組學習|小組活動/i, tag: "small_group" },
  { pattern: /混齡|跨級/i, tag: "mixed_age" },
  { pattern: /品德教育|德育/i, tag: "character_ed" },
  { pattern: /藝術綜合|藝術教育/i, tag: "arts_integrated" },
];

// Language patterns
const LANGUAGE_PATTERNS: Array<{ pattern: RegExp; lang: string }> = [
  { pattern: /兩文三語/i, lang: "trilingual" },
  { pattern: /普通話|國語/i, lang: "putonghua" },
  { pattern: /英語|英文|English/i, lang: "english" },
  { pattern: /粵語|廣東話/i, lang: "cantonese" },
  { pattern: /外籍.*英語|NET.*英語|外籍英語/i, lang: "native_english" },
  { pattern: /中英雙語|雙語/i, lang: "bilingual" },
];

// ============================================
// CSV Parser (simple ^ delimited)
// ============================================

function parseCSV(content: string): string[][] {
  const lines = content.split("\n");
  const result: string[][] = [];

  for (const line of lines) {
    if (!line.trim()) continue;

    // Handle quoted fields with ^ delimiter
    const fields: string[] = [];
    let current = "";
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];

      if (char === '"' && !inQuotes) {
        inQuotes = true;
      } else if (char === '"' && inQuotes) {
        if (line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else if (char === "^" && !inQuotes) {
        fields.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }
    fields.push(current.trim());
    result.push(fields);
  }

  return result;
}

// ============================================
// Data extraction functions
// ============================================

function extractCurriculum(profile: KGProfile): CurriculumMapping {
  const currType = profile.curriculumType.trim();

  // Map curriculum type
  let curriculum = CURRICULUM_MAP[currType] || "unknown";
  let confidence: "high" | "medium" | "low" = "high";
  let needsReview = false;

  // Check for IB schools (non-local but specific)
  if (profile.curriculumPlanning.includes("國際文憑") || profile.curriculumPlanning.includes("IB")) {
    curriculum = "ib";
    confidence = "high";
  }

  // Check for Montessori-specific curriculum
  if (profile.name.includes("蒙特梭利") || profile.name.includes("Montessori")) {
    if (currType === "非本地") {
      curriculum = "montessori_intl";
      confidence = "high";
    }
  }

  // Handle missing/unknown data
  if (!currType || currType === "沒有資料") {
    curriculum = "unknown";
    confidence = "low";
    needsReview = true;
  }

  // Schools not in KGP with non-local curriculum need review
  if (currType === "非本地" && profile.joinKGP === "沒有參加") {
    needsReview = true;
    confidence = "medium";
  }

  const evidence = currType ? `課程類別: ${currType}` : "無資料";

  return {
    kg_id: `edb_${profile.schoolCode}${profile.campusCode}`,
    curriculum,
    confidence,
    source_type: "edb_kgp_profile",
    source_url: SOURCE_URL,
    evidence_snippet: evidence.slice(0, 200),
    needs_review: needsReview,
  };
}

function extractPedagogy(profile: KGProfile): PedagogyMapping {
  const text = `${profile.curriculumPlanning} ${profile.teachingMethods}`;
  const tags: string[] = [];
  const evidenceParts: string[] = [];

  for (const { pattern, tag } of PEDAGOGY_PATTERNS) {
    const match = text.match(pattern);
    if (match) {
      tags.push(tag);
      evidenceParts.push(match[0]);
    }
  }

  // Determine confidence
  let confidence: "high" | "medium" | "low" = "high";
  let needsReview = false;

  if (tags.length === 0) {
    if (!text || text.includes("沒有資料")) {
      confidence = "low";
      needsReview = true;
    } else {
      // Has text but no matching patterns - needs review
      confidence = "medium";
      needsReview = true;
    }
  } else if (tags.length > 5) {
    // Many tags might indicate generic description
    confidence = "medium";
  }

  const evidence = evidenceParts.length > 0
    ? evidenceParts.slice(0, 5).join("; ")
    : (text.slice(0, 100) || "無資料");

  return {
    kg_id: `edb_${profile.schoolCode}${profile.campusCode}`,
    pedagogy_tags: tags.join("|") || "",
    confidence,
    source_type: "edb_kgp_profile",
    source_url: SOURCE_URL,
    evidence_snippet: evidence.slice(0, 200),
    needs_review: needsReview,
  };
}

function extractLanguageEnv(profile: KGProfile): LanguageEnvMapping {
  const text = `${profile.curriculumPlanning} ${profile.teachingMethods} ${profile.name}`;
  const langs: string[] = [];
  const evidenceParts: string[] = [];

  for (const { pattern, lang } of LANGUAGE_PATTERNS) {
    const match = text.match(pattern);
    if (match) {
      // Avoid duplicates
      if (!langs.includes(lang)) {
        langs.push(lang);
        evidenceParts.push(match[0]);
      }
    }
  }

  // Infer from school type
  if (profile.curriculumType === "非本地") {
    if (!langs.includes("english")) {
      langs.push("english");
    }
  }

  // Determine confidence
  let confidence: "high" | "medium" | "low" = "high";
  let needsReview = false;

  if (langs.length === 0) {
    if (!text || text.includes("沒有資料")) {
      confidence = "low";
    } else {
      // Assume local school with Cantonese base
      langs.push("cantonese");
      confidence = "medium";
    }
    needsReview = true;
  }

  const evidence = evidenceParts.length > 0
    ? evidenceParts.slice(0, 3).join("; ")
    : (text.slice(0, 100) || "無資料");

  return {
    kg_id: `edb_${profile.schoolCode}${profile.campusCode}`,
    language_env: langs.join("|") || "",
    confidence,
    source_type: "edb_kgp_profile",
    source_url: SOURCE_URL,
    evidence_snippet: evidence.slice(0, 200),
    needs_review: needsReview,
  };
}

// ============================================
// CSV Writer
// ============================================

function escapeCSV(value: string | boolean): string {
  const str = String(value);
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function writeCSV<T extends Record<string, any>>(
  filepath: string,
  data: T[],
  headers: (keyof T)[]
): void {
  const headerRow = headers.map(h => escapeCSV(String(h))).join(",");
  const dataRows = data.map(row =>
    headers.map(h => escapeCSV(row[h])).join(",")
  );

  const content = [headerRow, ...dataRows].join("\n");
  fs.writeFileSync(filepath, "\uFEFF" + content, "utf-8"); // BOM for Excel
}

// ============================================
// Main
// ============================================

function main() {
  console.log("Parsing EDB Kindergarten Profile CSV...\n");

  // Read CSV
  const csvPath = path.join(__dirname, "../data/edb_kgp_2025_tc.csv");
  const csvContent = fs.readFileSync(csvPath, "utf-8");
  const rows = parseCSV(csvContent);

  // Get header indices
  const headers = rows[0];
  const colIndex: Record<string, number> = {};
  headers.forEach((h, i) => { colIndex[h] = i; });

  console.log(`Found ${rows.length - 1} kindergarten records\n`);
  console.log("Header columns:");
  console.log(`  - 學校編號: col ${colIndex["學校編號"]}`);
  console.log(`  - 課程類別: col ${colIndex["課程類別"]}`);
  console.log(`  - 課程規劃: col ${colIndex["課程規劃"]}`);
  console.log(`  - 學習_教學模式及活動: col ${colIndex["學習_教學模式及活動"]}\n`);

  // Process rows
  const profiles: KGProfile[] = [];

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    if (row.length < 10) continue;

    const profile: KGProfile = {
      schoolCode: row[colIndex["學校編號"]] || "",
      campusCode: row[colIndex["校址編號"]] || "",
      name: row[colIndex["學校名稱"]] || "",
      district: row[colIndex["地區"]] || "",
      curriculumType: row[colIndex["課程類別"]] || "",
      curriculumPlanning: row[colIndex["課程規劃"]] || "",
      teachingMethods: row[colIndex["學習_教學模式及活動"]] || "",
      schoolType: row[colIndex["學校類別"]] || "",
      joinKGP: row[colIndex["參加幼稚園教育計劃"]] || "",
    };

    if (profile.schoolCode) {
      profiles.push(profile);
    }
  }

  console.log(`Parsed ${profiles.length} valid profiles\n`);

  // Generate mappings
  const curriculumMappings: CurriculumMapping[] = [];
  const pedagogyMappings: PedagogyMapping[] = [];
  const languageMappings: LanguageEnvMapping[] = [];

  for (const profile of profiles) {
    curriculumMappings.push(extractCurriculum(profile));
    pedagogyMappings.push(extractPedagogy(profile));
    languageMappings.push(extractLanguageEnv(profile));
  }

  // Write output files
  const outputDir = path.join(__dirname, "../data");

  // 1. Curriculum mapping
  const curriculumPath = path.join(outputDir, "curriculum_mapping_kg_v1.2.csv");
  writeCSV(curriculumPath, curriculumMappings, [
    "kg_id", "curriculum", "confidence", "source_type", "source_url", "evidence_snippet", "needs_review"
  ]);
  console.log(`Written: ${curriculumPath}`);

  // 2. Pedagogy mapping
  const pedagogyPath = path.join(outputDir, "pedagogy_mapping_kg_v1.csv");
  writeCSV(pedagogyPath, pedagogyMappings, [
    "kg_id", "pedagogy_tags", "confidence", "source_type", "source_url", "evidence_snippet", "needs_review"
  ]);
  console.log(`Written: ${pedagogyPath}`);

  // 3. Language environment mapping
  const languagePath = path.join(outputDir, "language_env_mapping_kg_v1.csv");
  writeCSV(languagePath, languageMappings, [
    "kg_id", "language_env", "confidence", "source_type", "source_url", "evidence_snippet", "needs_review"
  ]);
  console.log(`Written: ${languagePath}`);

  // Generate statistics
  console.log("\n========================================");
  console.log("SUMMARY STATISTICS");
  console.log("========================================\n");

  // Curriculum stats
  const curriculumStats: Record<string, number> = {};
  const curriculumNeedsReview = curriculumMappings.filter(m => m.needs_review).length;
  for (const m of curriculumMappings) {
    curriculumStats[m.curriculum] = (curriculumStats[m.curriculum] || 0) + 1;
  }

  console.log("1. CURRICULUM MAPPING");
  console.log(`   Total: ${curriculumMappings.length}`);
  for (const [type, count] of Object.entries(curriculumStats).sort((a, b) => b[1] - a[1])) {
    console.log(`   - ${type}: ${count} (${(count / curriculumMappings.length * 100).toFixed(1)}%)`);
  }
  console.log(`   Needs review: ${curriculumNeedsReview} (${(curriculumNeedsReview / curriculumMappings.length * 100).toFixed(1)}%)`);

  // Pedagogy stats
  const pedagogyTagStats: Record<string, number> = {};
  const pedagogyNeedsReview = pedagogyMappings.filter(m => m.needs_review).length;
  const pedagogyWithTags = pedagogyMappings.filter(m => m.pedagogy_tags).length;

  for (const m of pedagogyMappings) {
    if (m.pedagogy_tags) {
      for (const tag of m.pedagogy_tags.split("|")) {
        pedagogyTagStats[tag] = (pedagogyTagStats[tag] || 0) + 1;
      }
    }
  }

  console.log("\n2. PEDAGOGY MAPPING");
  console.log(`   Total: ${pedagogyMappings.length}`);
  console.log(`   With tags: ${pedagogyWithTags} (${(pedagogyWithTags / pedagogyMappings.length * 100).toFixed(1)}%)`);
  console.log("   Tag frequency:");
  for (const [tag, count] of Object.entries(pedagogyTagStats).sort((a, b) => b[1] - a[1]).slice(0, 10)) {
    console.log(`   - ${tag}: ${count} (${(count / pedagogyMappings.length * 100).toFixed(1)}%)`);
  }
  console.log(`   Needs review: ${pedagogyNeedsReview} (${(pedagogyNeedsReview / pedagogyMappings.length * 100).toFixed(1)}%)`);

  // Language stats
  const languageStats: Record<string, number> = {};
  const languageNeedsReview = languageMappings.filter(m => m.needs_review).length;
  const languageWithEnv = languageMappings.filter(m => m.language_env).length;

  for (const m of languageMappings) {
    if (m.language_env) {
      for (const lang of m.language_env.split("|")) {
        languageStats[lang] = (languageStats[lang] || 0) + 1;
      }
    }
  }

  console.log("\n3. LANGUAGE ENVIRONMENT MAPPING");
  console.log(`   Total: ${languageMappings.length}`);
  console.log(`   With data: ${languageWithEnv} (${(languageWithEnv / languageMappings.length * 100).toFixed(1)}%)`);
  console.log("   Language frequency:");
  for (const [lang, count] of Object.entries(languageStats).sort((a, b) => b[1] - a[1])) {
    console.log(`   - ${lang}: ${count} (${(count / languageMappings.length * 100).toFixed(1)}%)`);
  }
  console.log(`   Needs review: ${languageNeedsReview} (${(languageNeedsReview / languageMappings.length * 100).toFixed(1)}%)`);

  // Write summary file
  const summaryContent = `# KG Data Mapping Summary
Generated: ${new Date().toISOString()}
Source: ${SOURCE_URL}

## Overview
- Total kindergartens processed: ${profiles.length}

## 1. Curriculum Mapping (curriculum_mapping_kg_v1.2.csv)
${Object.entries(curriculumStats).sort((a, b) => b[1] - a[1]).map(([type, count]) =>
  `- ${type}: ${count} (${(count / curriculumMappings.length * 100).toFixed(1)}%)`
).join("\n")}
- Needs review: ${curriculumNeedsReview} (${(curriculumNeedsReview / curriculumMappings.length * 100).toFixed(1)}%)

## 2. Pedagogy Mapping (pedagogy_mapping_kg_v1.csv)
- Schools with pedagogy tags: ${pedagogyWithTags} (${(pedagogyWithTags / pedagogyMappings.length * 100).toFixed(1)}%)
- Top tags:
${Object.entries(pedagogyTagStats).sort((a, b) => b[1] - a[1]).slice(0, 15).map(([tag, count]) =>
  `  - ${tag}: ${count} (${(count / pedagogyMappings.length * 100).toFixed(1)}%)`
).join("\n")}
- Needs review: ${pedagogyNeedsReview} (${(pedagogyNeedsReview / pedagogyMappings.length * 100).toFixed(1)}%)

## 3. Language Environment Mapping (language_env_mapping_kg_v1.csv)
${Object.entries(languageStats).sort((a, b) => b[1] - a[1]).map(([lang, count]) =>
  `- ${lang}: ${count} (${(count / languageMappings.length * 100).toFixed(1)}%)`
).join("\n")}
- Needs review: ${languageNeedsReview} (${(languageNeedsReview / languageMappings.length * 100).toFixed(1)}%)

## Confidence Levels
- **high**: Direct match from authoritative EDB data
- **medium**: Inferred from patterns/context, may need verification
- **low**: Missing or ambiguous source data

## Patterns Used
### Pedagogy Tags
${PEDAGOGY_PATTERNS.map(p => `- ${p.tag}: ${p.pattern.source}`).join("\n")}

### Language Patterns
${LANGUAGE_PATTERNS.map(p => `- ${p.lang}: ${p.pattern.source}`).join("\n")}
`;

  const summaryPath = path.join(outputDir, "kg_mapping_summary.md");
  fs.writeFileSync(summaryPath, summaryContent, "utf-8");
  console.log(`\nWritten: ${summaryPath}`);

  console.log("\n========================================");
  console.log("DONE");
  console.log("========================================");
}

main();
