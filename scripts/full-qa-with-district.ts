/**
 * Calculate distribution of all Q&A combinations including Q6 (district)
 * Only show Q6 when results > 30
 */

import { schools } from "../data/schools";
import { kindergartens } from "../data/kg/kg-database";
import { DISTRICT_TO_DISTRICT18 } from "../types/school";

const kgMap = new Map<string, typeof kindergartens[0]>();
for (const kg of kindergartens) {
  kgMap.set(kg.id, kg);
  for (const variantId of kg.variantIds) {
    kgMap.set(variantId, kg);
  }
}

const kgSchools = schools.filter(s => s.level === "幼稚園");

type District = "港島" | "九龍" | "新界";

function count(
  session: string[],
  curriculum: string[],
  type: string[],
  lang: string[],
  pedagogy: string[],
  districts: District[]
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
    if (districts.length > 0) {
      const district18List = districts.flatMap(d => DISTRICT_TO_DISTRICT18[d]);
      if (!district18List.includes(school.district18 as any)) return false;
    }
    return true;
  }).length;
}

// Q1: Session
const sessionOptions = [
  { label: "不限", value: [] as string[] },
  { label: "全日", value: ["WD"] },
];

// Q2: Budget
const budgetOptions = [
  { label: "有限", value: "limited" },
  { label: "彈性", value: "flexible" },
];

// Q3: Putonghua
const langOptions = [
  { label: "不限", value: [] as string[] },
  { label: "需要", value: ["putonghua"] },
];

// Q4: Curriculum
const curriculumOptions = [
  { label: "本地", c: ["local"], getType: (budget: string) => budget === "limited" ? ["kgp"] : ["non_kgp"], skipPedagogy: false },
  { label: "IB", c: ["non_local"], getType: () => ["ib"], skipPedagogy: true },
  { label: "英國", c: ["non_local"], getType: () => ["british"], skipPedagogy: true },
  { label: "蒙特梭利", c: ["non_local"], getType: () => ["montessori"], skipPedagogy: true },
  { label: "其他國際", c: ["non_local"], getType: () => ["other"], skipPedagogy: false },
];

// Q5: Pedagogy (skip for IB/英國/蒙特梭利)
const pedagogyOptions = [
  { label: "不限", value: [] as string[] },
  { label: "特色課程", value: ["special_curriculum"] },
  { label: "遊戲探索", value: ["play_explore"] },
  { label: "專題學習", value: ["project_learn"] },
  { label: "語言發展", value: ["language_dev"] },
  { label: "全人發展", value: ["holistic"] },
];

// Q6: District (only if results > 30)
const districtOptions: { label: string; value: District[] }[] = [
  { label: "不限", value: [] },
  { label: "港島", value: ["港島"] },
  { label: "九龍", value: ["九龍"] },
  { label: "新界", value: ["新界"] },
];

const THRESHOLD = 30;

interface Result {
  combo: string;
  count: number;
  questions: number;
}

const results: Result[] = [];

for (const q1 of sessionOptions) {
  for (const q2 of budgetOptions) {
    for (const q3 of langOptions) {
      for (const q4 of curriculumOptions) {
        const baseC = q4.c;
        const baseT = q4.getType(q2.value);

        if (q4.skipPedagogy) {
          // Skip Q5 for IB/英國/蒙特梭利
          const baseCount = count(q1.value, baseC, baseT, q3.value, [], []);

          if (baseCount > THRESHOLD) {
            // Need Q6
            for (const q6 of districtOptions) {
              const c = count(q1.value, baseC, baseT, q3.value, [], q6.value);
              results.push({
                combo: `${q1.label}|${q2.label}|${q3.label}|${q4.label}|跳過|${q6.label}`,
                count: c,
                questions: 5,
              });
            }
          } else {
            // No Q6 needed
            results.push({
              combo: `${q1.label}|${q2.label}|${q3.label}|${q4.label}|跳過|N/A`,
              count: baseCount,
              questions: 4,
            });
          }
        } else {
          // Show Q5 for 本地 and 其他國際
          for (const q5 of pedagogyOptions) {
            const countAfterQ5 = count(q1.value, baseC, baseT, q3.value, q5.value, []);

            if (countAfterQ5 > THRESHOLD) {
              // Need Q6
              for (const q6 of districtOptions) {
                const c = count(q1.value, baseC, baseT, q3.value, q5.value, q6.value);
                results.push({
                  combo: `${q1.label}|${q2.label}|${q3.label}|${q4.label}|${q5.label}|${q6.label}`,
                  count: c,
                  questions: 6,
                });
              }
            } else {
              // No Q6 needed
              results.push({
                combo: `${q1.label}|${q2.label}|${q3.label}|${q4.label}|${q5.label}|N/A`,
                count: countAfterQ5,
                questions: 5,
              });
            }
          }
        }
      }
    }
  }
}

// Count distribution
const dist = new Map<number, number>();
for (const r of results) {
  dist.set(r.count, (dist.get(r.count) || 0) + 1);
}

// Sort by count descending
const sorted = Array.from(dist.entries()).sort((a, b) => b[0] - a[0]);

console.log("## Q&A Results Distribution (with Q6 District Filter)\n");
console.log(`Total combinations: ${results.length}`);
console.log(`Distinct result counts: ${dist.size}`);
console.log(`Range: ${Math.min(...results.map(r => r.count))} ~ ${Math.max(...results.map(r => r.count))}`);
console.log("");

// Summary by question count
const by4Q = results.filter(r => r.questions === 4);
const by5Q = results.filter(r => r.questions === 5);
const by6Q = results.filter(r => r.questions === 6);
console.log("### By Question Count");
console.log(`- 4 questions (IB/英國/蒙特梭利, ≤30): ${by4Q.length} combinations`);
console.log(`- 5 questions (skip Q6 or skip Q5+Q6): ${by5Q.length} combinations`);
console.log(`- 6 questions (full flow): ${by6Q.length} combinations`);
console.log("");

console.log("### Result Distribution");
console.log("| 學校數量 | 出現次數 |");
console.log("|----------|----------|");
for (const [schoolCount, freq] of sorted) {
  console.log(`| ${schoolCount} | ${freq} |`);
}

// Show sample combinations for different ranges
console.log("\n### Sample Combinations by Result Range\n");

const ranges = [
  { min: 0, max: 10, label: "0-10 schools" },
  { min: 11, max: 30, label: "11-30 schools" },
  { min: 31, max: 100, label: "31-100 schools" },
  { min: 101, max: 300, label: "101-300 schools" },
  { min: 301, max: 1000, label: "301-1000 schools" },
];

for (const range of ranges) {
  const inRange = results.filter(r => r.count >= range.min && r.count <= range.max);
  if (inRange.length > 0) {
    console.log(`**${range.label}** (${inRange.length} combinations)`);
    // Show up to 3 examples
    const examples = inRange.slice(0, 3);
    for (const ex of examples) {
      console.log(`- ${ex.combo} → ${ex.count} schools`);
    }
    console.log("");
  }
}

// Zero results
const zeros = results.filter(r => r.count === 0);
if (zeros.length > 0) {
  console.log(`\n### Zero-result combinations (${zeros.length}):`);
  for (const z of zeros) {
    console.log(`- ${z.combo}`);
  }
}
