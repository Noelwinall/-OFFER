/**
 * Analyze pedagogy filter impact on Q&A results
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

const pedagogyLabels: Record<string, string> = {
  special_curriculum: "特色課程",
  play_explore: "遊戲探索",
  project_learn: "專題學習",
  language_dev: "語言發展",
  holistic: "全人發展",
};

const tags = ["special_curriculum", "play_explore", "project_learn", "language_dev", "holistic"];

console.log("## 教學特色對各基礎組合的影響\n");
console.log("| 基礎組合 | 無篩選 | 特色課程 | 遊戲探索 | 專題學習 | 語言發展 | 全人發展 |");
console.log("|----------|--------|----------|----------|----------|----------|----------|");

const bases = [
  { l: "不限+有限+不限+本地KGP", s: [], c: ["local"], t: ["kgp"], lg: [] },
  { l: "全日+有限+普通話+本地KGP", s: ["WD"], c: ["local"], t: ["kgp"], lg: ["putonghua"] },
  { l: "不限+彈性+不限+本地non-KGP", s: [], c: ["local"], t: ["non_kgp"], lg: [] },
  { l: "不限+不限+不限+IB", s: [], c: ["non_local"], t: ["ib"], lg: [] },
  { l: "不限+不限+不限+英國", s: [], c: ["non_local"], t: ["british"], lg: [] },
  { l: "不限+不限+不限+蒙特梭利", s: [], c: ["non_local"], t: ["montessori"], lg: [] },
  { l: "不限+不限+不限+其他國際", s: [], c: ["non_local"], t: ["other"], lg: [] },
];

for (const b of bases) {
  const base = count(b.s, b.c, b.t, b.lg, []);
  const vals = tags.map(tag => count(b.s, b.c, b.t, b.lg, [tag]));
  console.log(`| ${b.l} | ${base} | ${vals.join(" | ")} |`);
}

console.log("\n## 多選教學特色組合 (基礎: 不限+有限+不限+本地KGP)\n");
console.log("| 選擇組合 | 學校數量 | 佔比 |");
console.log("|----------|----------|------|");

const baseCount = count([], ["local"], ["kgp"], [], []);
console.log(`| 無篩選 | ${baseCount} | 100% |`);

// Single selections
for (const tag of tags) {
  const c = count([], ["local"], ["kgp"], [], [tag]);
  const pct = ((c / baseCount) * 100).toFixed(1);
  console.log(`| ${pedagogyLabels[tag]} | ${c} | ${pct}% |`);
}

// Common multi-selections
const multiCombos = [
  ["play_explore", "project_learn"],
  ["play_explore", "holistic"],
  ["project_learn", "holistic"],
  ["play_explore", "project_learn", "holistic"],
];

for (const combo of multiCombos) {
  const c = count([], ["local"], ["kgp"], [], combo);
  const pct = ((c / baseCount) * 100).toFixed(1);
  const label = combo.map(t => pedagogyLabels[t]).join(" + ");
  console.log(`| ${label} | ${c} | ${pct}% |`);
}

// All 5 tags
const allCount = count([], ["local"], ["kgp"], [], tags);
const allPct = ((allCount / baseCount) * 100).toFixed(1);
console.log(`| 全部5項 | ${allCount} | ${allPct}% |`);
