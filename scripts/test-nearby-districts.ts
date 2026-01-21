/**
 * Test nearby district fallback for zero-result cases
 */

import { schools } from "../data/schools";
import { kindergartens } from "../data/kg/kg-database";
import type { District18 } from "../types/school";

const kgMap = new Map<string, typeof kindergartens[0]>();
for (const kg of kindergartens) {
  kgMap.set(kg.id, kg);
  for (const variantId of kg.variantIds) {
    kgMap.set(variantId, kg);
  }
}

const kgSchools = schools.filter(s => s.level === "幼稚園");

// Adjacent districts mapping (geographic neighbors)
const ADJACENT_DISTRICTS: Record<District18, District18[]> = {
  // 港島
  "中西區": ["灣仔區", "南區", "油尖旺區"], // 油尖旺 via harbor
  "東區": ["灣仔區", "南區", "西貢區"], // 西貢 via harbor
  "南區": ["中西區", "東區", "灣仔區", "離島區"],
  "灣仔區": ["中西區", "東區", "南區", "九龍城區"], // 九龍城 via harbor
  // 九龍
  "九龍城區": ["油尖旺區", "黃大仙區", "觀塘區", "灣仔區"],
  "觀塘區": ["黃大仙區", "九龍城區", "西貢區"],
  "深水埗區": ["油尖旺區", "九龍城區", "黃大仙區", "葵青區", "沙田區"],
  "黃大仙區": ["九龍城區", "觀塘區", "深水埗區", "沙田區"],
  "油尖旺區": ["深水埗區", "九龍城區", "中西區"],
  // 新界
  "離島區": ["南區", "荃灣區", "葵青區", "屯門區"],
  "葵青區": ["深水埗區", "荃灣區", "離島區"],
  "北區": ["大埔區", "元朗區", "沙田區"],
  "西貢區": ["沙田區", "觀塘區", "東區"],
  "沙田區": ["大埔區", "西貢區", "黃大仙區", "深水埗區", "北區"],
  "大埔區": ["沙田區", "北區", "元朗區"],
  "荃灣區": ["葵青區", "屯門區", "離島區", "元朗區"],
  "屯門區": ["元朗區", "荃灣區", "離島區"],
  "元朗區": ["屯門區", "北區", "大埔區", "荃灣區"],
};

function getSchools(
  session: string[],
  curriculum: string[],
  type: string[],
  lang: string[],
  pedagogy: string[],
  districts: District18[]
) {
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
      if (!districts.includes(school.district18 as District18)) return false;
    }
    return true;
  });
}

// Test cases that result in 0 schools
const zeroCases = [
  { session: [], curriculum: ["non_local"], type: ["other"], lang: [], pedagogy: [], district: "黃大仙區" as District18 },
  { session: [], curriculum: ["non_local"], type: ["other"], lang: [], pedagogy: [], district: "荃灣區" as District18 },
  { session: [], curriculum: ["non_local"], type: ["other"], lang: [], pedagogy: ["play_explore"], district: "中西區" as District18 },
  { session: [], curriculum: ["non_local"], type: ["other"], lang: [], pedagogy: ["play_explore"], district: "南區" as District18 },
  { session: [], curriculum: ["non_local"], type: ["other"], lang: [], pedagogy: ["project_learn"], district: "南區" as District18 },
  { session: ["WD"], curriculum: ["local"], type: ["kgp"], lang: [], pedagogy: ["special_curriculum"], district: "南區" as District18 },
];

console.log("## Testing Nearby District Fallback\n");

for (const testCase of zeroCases) {
  const originalResults = getSchools(
    testCase.session,
    testCase.curriculum,
    testCase.type,
    testCase.lang,
    testCase.pedagogy,
    [testCase.district]
  );

  console.log(`### Case: ${testCase.curriculum[0]}|${testCase.type[0]}|${testCase.pedagogy[0] || "不限"}|${testCase.district}`);
  console.log(`Original: ${originalResults.length} schools`);

  if (originalResults.length === 0) {
    // Try nearby districts
    const nearbyDistricts = ADJACENT_DISTRICTS[testCase.district];
    const nearbyResults = getSchools(
      testCase.session,
      testCase.curriculum,
      testCase.type,
      testCase.lang,
      testCase.pedagogy,
      nearbyDistricts
    );

    console.log(`Nearby districts: ${nearbyDistricts.join(", ")}`);
    console.log(`Nearby results: ${nearbyResults.length} schools`);

    if (nearbyResults.length > 0) {
      // Show top 10
      const top10 = nearbyResults.slice(0, 10);
      console.log("\nTop 10 nearby schools:");
      for (const school of top10) {
        console.log(`  - ${school.name} (${school.district18})`);
      }
    }
  }
  console.log("");
}

// Count how many zero cases can be resolved with nearby fallback
console.log("## Summary: Testing All Zero Cases\n");

const sessionOptions = [[], ["WD"]];
const curriculumOptions = [
  { c: ["local"], t: ["kgp"] },
  { c: ["local"], t: ["non_kgp"] },
  { c: ["non_local"], t: ["other"] },
];
const langOptions = [[], ["putonghua"]];
const pedagogyOptions = [[], ["special_curriculum"], ["play_explore"], ["project_learn"], ["language_dev"], ["holistic"]];
const ALL_DISTRICT18: District18[] = [
  "中西區", "東區", "南區", "灣仔區",
  "九龍城區", "觀塘區", "深水埗區", "黃大仙區", "油尖旺區",
  "離島區", "葵青區", "北區", "西貢區", "沙田區", "大埔區", "荃灣區", "屯門區", "元朗區",
];

let zeroCount = 0;
let resolvedCount = 0;
let unresolvedCount = 0;
const unresolvedCases: string[] = [];

for (const session of sessionOptions) {
  for (const curr of curriculumOptions) {
    for (const lang of langOptions) {
      for (const pedagogy of pedagogyOptions) {
        for (const district of ALL_DISTRICT18) {
          const results = getSchools(session, curr.c, curr.t, lang, pedagogy, [district]);

          if (results.length === 0) {
            zeroCount++;

            // Try nearby
            const nearbyDistricts = ADJACENT_DISTRICTS[district];
            const nearbyResults = getSchools(session, curr.c, curr.t, lang, pedagogy, nearbyDistricts);

            if (nearbyResults.length >= 10) {
              resolvedCount++;
            } else if (nearbyResults.length > 0) {
              resolvedCount++;
            } else {
              unresolvedCount++;
              unresolvedCases.push(`${session.length > 0 ? "全日" : "不限"}|${curr.t[0]}|${lang.length > 0 ? "普通話" : "不限"}|${pedagogy[0] || "不限"}|${district}`);
            }
          }
        }
      }
    }
  }
}

console.log(`Total zero-result cases: ${zeroCount}`);
console.log(`Resolved with nearby fallback: ${resolvedCount}`);
console.log(`Still unresolved (0 nearby): ${unresolvedCount}`);

if (unresolvedCases.length > 0) {
  console.log("\nUnresolved cases:");
  for (const c of unresolvedCases.slice(0, 20)) {
    console.log(`  - ${c}`);
  }
  if (unresolvedCases.length > 20) {
    console.log(`  ... and ${unresolvedCases.length - 20} more`);
  }
}
