/**
 * Simulate Q&A School Finder combinations and count results
 *
 * Run with: npx tsx scripts/simulate-qa.ts
 */

import { schools } from "../data/schools";
import { kindergartens } from "../data/kg/kg-database";
import type { KGSession, KGCurriculumCategoryFilter, KGCurriculumSubtypeFilter, KGPedagogyTag, KGLanguageEnv } from "../constants/kg-filters";

// Create KG lookup map
const kgMap = new Map<string, typeof kindergartens[0]>();
for (const kg of kindergartens) {
  kgMap.set(kg.id, kg);
  for (const variantId of kg.variantIds) {
    kgMap.set(variantId, kg);
  }
}

// Get all KG schools
const kgSchools = schools.filter(s => s.level === "幼稚園");

interface FilterState {
  kgSession: KGSession[];
  kgCurriculumCategory: KGCurriculumCategoryFilter[];
  kgCurriculumType: KGCurriculumSubtypeFilter[];
  kgLanguageEnv: KGLanguageEnv[];
  kgPedagogy: KGPedagogyTag[];
}

// Apply filters and count matching schools
function countMatchingSchools(filters: FilterState): number {
  return kgSchools.filter(school => {
    const kgData = kgMap.get(school.id);
    if (!kgData) return false;

    // Session filter
    if (filters.kgSession.length > 0) {
      const hasSession = filters.kgSession.some(s => kgData.sessions.includes(s));
      if (!hasSession) return false;
    }

    // Curriculum category filter
    if (filters.kgCurriculumCategory.length > 0) {
      if (!filters.kgCurriculumCategory.includes(kgData.curriculumCategory as KGCurriculumCategoryFilter)) {
        return false;
      }
    }

    // Curriculum type filter
    if (filters.kgCurriculumType.length > 0) {
      if (!filters.kgCurriculumType.includes(kgData.curriculumType as KGCurriculumSubtypeFilter)) {
        return false;
      }
    }

    // Language environment filter
    // Special logic for putonghua: exclude Cantonese-only schools, keep all others
    if (filters.kgLanguageEnv.length > 0) {
      const isPutonghuaFilter = filters.kgLanguageEnv.includes("putonghua");

      if (isPutonghuaFilter && filters.kgLanguageEnv.length === 1) {
        // Putonghua filter: exclude Cantonese-only schools
        const isCantoneseOnly = kgData.languageEnv.length === 1 && kgData.languageEnv[0] === "cantonese";
        if (isCantoneseOnly) return false;
      } else {
        // Standard OR logic for other language filters
        const hasLang = filters.kgLanguageEnv.some(l => kgData.languageEnv.includes(l));
        if (!hasLang) return false;
      }
    }

    // Pedagogy filter
    if (filters.kgPedagogy.length > 0) {
      const hasPedagogy = filters.kgPedagogy.some(p => kgData.pedagogyTags.includes(p));
      if (!hasPedagogy) return false;
    }

    return true;
  }).length;
}

// Simulate Q&A answers and build filter state
interface QAAnswers {
  q1_session: "need_wd" | "no_preference";
  q2_budget: "limited" | "flexible";
  q3_putonghua: "yes" | "no_preference";
  q4_curriculum: "local" | "ib" | "british" | "montessori" | "other";
  q5_pedagogy: KGPedagogyTag[];
}

function answersToFilters(answers: QAAnswers): FilterState {
  const filters: FilterState = {
    kgSession: [],
    kgCurriculumCategory: [],
    kgCurriculumType: [],
    kgLanguageEnv: [],
    kgPedagogy: [],
  };

  // Q1: Session
  if (answers.q1_session === "need_wd") {
    filters.kgSession = ["WD"];
  }

  // Q2: Budget -> sets initial curriculum
  let curriculumCategory: KGCurriculumCategoryFilter = "local";
  let curriculumType: KGCurriculumSubtypeFilter | null = answers.q2_budget === "limited" ? "kgp" : "non_kgp";

  // Q3: Putonghua
  if (answers.q3_putonghua === "yes") {
    filters.kgLanguageEnv = ["putonghua"];
  }

  // Q4: Curriculum (may override Q2)
  if (answers.q4_curriculum === "local") {
    // Keep Q2's setting
    filters.kgCurriculumCategory = ["local"];
    filters.kgCurriculumType = [curriculumType!];
  } else {
    // Override with non-local
    filters.kgCurriculumCategory = ["non_local"];
    filters.kgCurriculumType = [answers.q4_curriculum as KGCurriculumSubtypeFilter];
  }

  // Q5: Pedagogy
  filters.kgPedagogy = answers.q5_pedagogy;

  return filters;
}

// Generate all combinations
const q1Options: ("need_wd" | "no_preference")[] = ["need_wd", "no_preference"];
const q2Options: ("limited" | "flexible")[] = ["limited", "flexible"];
const q3Options: ("yes" | "no_preference")[] = ["yes", "no_preference"];
const q4Options: ("local" | "ib" | "british" | "montessori" | "other")[] = ["local", "ib", "british", "montessori", "other"];
const pedagogyTags: KGPedagogyTag[] = ["special_curriculum", "play_explore", "project_learn", "language_dev", "holistic"];

// For simplicity, test with no pedagogy filter first (most common case)
console.log("=".repeat(80));
console.log("Q&A SCHOOL FINDER - SIMULATION RESULTS");
console.log("=".repeat(80));
console.log(`\nTotal KG schools in database: ${kgSchools.length}`);
console.log(`Total unique KG entries: ${kindergartens.length}`);

console.log("\n" + "=".repeat(80));
console.log("PART 1: Base combinations (without pedagogy filter - Q5 skipped)");
console.log("=".repeat(80));

interface ResultSummary {
  description: string;
  filters: FilterState;
  count: number;
}

const results: ResultSummary[] = [];

for (const q1 of q1Options) {
  for (const q2 of q2Options) {
    for (const q3 of q3Options) {
      for (const q4 of q4Options) {
        const answers: QAAnswers = {
          q1_session: q1,
          q2_budget: q2,
          q3_putonghua: q3,
          q4_curriculum: q4,
          q5_pedagogy: [],
        };

        const filters = answersToFilters(answers);
        const count = countMatchingSchools(filters);

        const q1Label = q1 === "need_wd" ? "全日班" : "不限時段";
        const q2Label = q2 === "limited" ? "預算有限" : "預算彈性";
        const q3Label = q3 === "yes" ? "需要普通話" : "不限語言";
        const q4Labels: Record<string, string> = {
          local: "本地課程",
          ib: "IB",
          british: "英國",
          montessori: "蒙特梭利",
          other: "其他國際",
        };
        const q4Label = q4Labels[q4];

        // Effective curriculum
        let effectiveCurriculum = "";
        if (q4 === "local") {
          effectiveCurriculum = q2 === "limited" ? "local+kgp" : "local+non_kgp";
        } else {
          effectiveCurriculum = `non_local+${q4}`;
        }

        const description = `${q1Label} | ${q3Label} | ${effectiveCurriculum}`;

        results.push({
          description: `Q1:${q1Label} Q2:${q2Label} Q3:${q3Label} Q4:${q4Label}`,
          filters,
          count,
        });
      }
    }
  }
}

// Sort by count descending
results.sort((a, b) => b.count - a.count);

console.log("\n排名 | 結果數量 | 答案組合");
console.log("-".repeat(80));
results.forEach((r, i) => {
  console.log(`${String(i + 1).padStart(3)} | ${String(r.count).padStart(6)} | ${r.description}`);
});

// Group by unique counts
const countGroups = new Map<number, number>();
for (const r of results) {
  countGroups.set(r.count, (countGroups.get(r.count) || 0) + 1);
}

console.log("\n" + "=".repeat(80));
console.log("SUMMARY: Distribution of result counts");
console.log("=".repeat(80));
console.log("\n結果數量 | 出現次數");
console.log("-".repeat(30));
Array.from(countGroups.entries())
  .sort((a, b) => b[0] - a[0])
  .forEach(([count, freq]) => {
    console.log(`${String(count).padStart(6)} | ${String(freq).padStart(6)}`);
  });

console.log(`\nTotal unique combinations: ${results.length}`);
console.log(`Distinct result counts: ${countGroups.size}`);

// Now test with pedagogy filters
console.log("\n" + "=".repeat(80));
console.log("PART 2: Impact of pedagogy filters (sample combinations)");
console.log("=".repeat(80));

// Test a few representative base combinations with pedagogy
const sampleBases = [
  { q1: "no_preference" as const, q2: "limited" as const, q3: "no_preference" as const, q4: "local" as const },
  { q1: "need_wd" as const, q2: "limited" as const, q3: "yes" as const, q4: "local" as const },
  { q1: "no_preference" as const, q2: "flexible" as const, q3: "no_preference" as const, q4: "ib" as const },
];

for (const base of sampleBases) {
  const baseAnswers: QAAnswers = { ...base, q5_pedagogy: [] };
  const baseFilters = answersToFilters(baseAnswers);
  const baseCount = countMatchingSchools(baseFilters);

  console.log(`\n基礎組合: Q1:${base.q1} Q2:${base.q2} Q3:${base.q3} Q4:${base.q4}`);
  console.log(`無教學特色篩選: ${baseCount} 所`);

  // Test each single pedagogy
  for (const tag of pedagogyTags) {
    const answers: QAAnswers = { ...base, q5_pedagogy: [tag] };
    const filters = answersToFilters(answers);
    const count = countMatchingSchools(filters);
    const tagLabels: Record<KGPedagogyTag, string> = {
      special_curriculum: "特色課程",
      play_explore: "遊戲探索",
      project_learn: "專題學習",
      language_dev: "語言發展",
      holistic: "全人發展",
    };
    console.log(`  + ${tagLabels[tag]}: ${count} 所 (${((count / baseCount) * 100).toFixed(1)}%)`);
  }
}

// Calculate total theoretical combinations
const totalCombinations = q1Options.length * q2Options.length * q3Options.length * q4Options.length * Math.pow(2, pedagogyTags.length);
console.log("\n" + "=".repeat(80));
console.log("TOTAL THEORETICAL COMBINATIONS");
console.log("=".repeat(80));
console.log(`Q1 options: ${q1Options.length}`);
console.log(`Q2 options: ${q2Options.length}`);
console.log(`Q3 options: ${q3Options.length}`);
console.log(`Q4 options: ${q4Options.length}`);
console.log(`Q5 options: 2^${pedagogyTags.length} = ${Math.pow(2, pedagogyTags.length)} (including none)`);
console.log(`Total: ${totalCombinations} theoretical combinations`);
console.log(`\nNote: Many combinations result in 0 schools due to filter constraints.`);
