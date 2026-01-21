/**
 * Calculate distribution of all 240 Q&A combinations
 * 40 base (2×2×2×5) × 6 pedagogy options (none + 5 single tags)
 */

import { schools } from "../data/schools";
import { kindergartens } from "../data/kg/kg-database";

const kgMap = new Map<string, typeof kindergartens[0]>();
for (const kg of kindergartens) {
  kgMap.set(kg.id, kg);
  for (const variantId of kg.variantIds) {
    kgMap.set(variantId, kg);
  }
}

const kgSchools = schools.filter(s => s.level === "幼稚園");

function count(
  session: string[],
  curriculum: string[],
  type: string[],
  lang: string[],
  pedagogy: string[]
): number {
  return kgSchools.filter(school => {
    const kgData = kgMap.get(school.id);
    if (!kgData) return false;
    if (session.length > 0 && !session.some(s => kgData.sessions.includes(s as any))) return false;
    if (curriculum.length > 0 && !curriculum.includes(kgData.curriculumCategory)) return false;
    if (type.length > 0 && !type.includes(kgData.curriculumType as string)) return false;
    if (lang.length > 0) {
      if (lang.includes("putonghua") && lang.length === 1) {
        if (kgData.languageEnv.length === 1 && kgData.languageEnv[0] === "cantonese") return false;
      } else {
        if (!lang.some(l => kgData.languageEnv.includes(l))) return false;
      }
    }
    if (pedagogy.length > 0 && !pedagogy.some(p => kgData.pedagogyTags.includes(p))) return false;
    return true;
  }).length;
}

// Q1: Session
const sessionOptions = [
  { label: "不限", value: [] },
  { label: "全日", value: ["WD"] },
];

// Q2: Budget (affects Q4 curriculum type for local)
const budgetOptions = [
  { label: "有限", value: "limited" },
  { label: "彈性", value: "flexible" },
];

// Q3: Putonghua
const langOptions = [
  { label: "不限", value: [] },
  { label: "需要", value: ["putonghua"] },
];

// Q4: Curriculum (budget determines local subtype)
const curriculumOptions = [
  { label: "本地", c: ["local"], getType: (budget: string) => budget === "limited" ? ["kgp"] : ["non_kgp"] },
  { label: "IB", c: ["non_local"], getType: () => ["ib"] },
  { label: "英國", c: ["non_local"], getType: () => ["british"] },
  { label: "蒙特梭利", c: ["non_local"], getType: () => ["montessori"] },
  { label: "其他國際", c: ["non_local"], getType: () => ["other"] },
];

// Q5: Pedagogy (none or single selection)
const pedagogyOptions = [
  { label: "不限", value: [] },
  { label: "特色課程", value: ["special_curriculum"] },
  { label: "遊戲探索", value: ["play_explore"] },
  { label: "專題學習", value: ["project_learn"] },
  { label: "語言發展", value: ["language_dev"] },
  { label: "全人發展", value: ["holistic"] },
];

const results: number[] = [];
const details: { combo: string; count: number }[] = [];

for (const q1 of sessionOptions) {
  for (const q2 of budgetOptions) {
    for (const q3 of langOptions) {
      for (const q4 of curriculumOptions) {
        for (const q5 of pedagogyOptions) {
          const c = count(
            q1.value,
            q4.c,
            q4.getType(q2.value),
            q3.value,
            q5.value
          );
          results.push(c);
          details.push({
            combo: `${q1.label}|${q2.label}|${q3.label}|${q4.label}|${q5.label}`,
            count: c,
          });
        }
      }
    }
  }
}

// Count distribution
const dist = new Map<number, number>();
for (const r of results) {
  dist.set(r, (dist.get(r) || 0) + 1);
}

// Sort by count descending
const sorted = Array.from(dist.entries()).sort((a, b) => b[0] - a[0]);

console.log("Total combinations: " + results.length);
console.log("Distinct result counts: " + dist.size);
console.log("Range: " + Math.min(...results) + " ~ " + Math.max(...results));
console.log("");
console.log("| 學校數量 | 出現次數 |");
console.log("|----------|----------|");
for (const [schoolCount, freq] of sorted) {
  console.log(`| ${schoolCount} | ${freq} |`);
}

// Show zero-result combinations
const zeros = details.filter(d => d.count === 0);
if (zeros.length > 0) {
  console.log("\n## Zero-result combinations:");
  for (const z of zeros) {
    console.log(`- ${z.combo}`);
  }
}
