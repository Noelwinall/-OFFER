/**
 * List schools missing emails to find more sources
 */

import { schools } from "../data/schools";
import { getCHSCData } from "../data/chsc-data";
import { groupSchoolsBySession } from "../lib/school-classification";

const grouped = groupSchoolsBySession(schools);

const missingByLevel: Record<string, string[]> = {
  "幼稚園": [],
  "小學": [],
  "中學": [],
};

grouped.forEach(school => {
  const chsc = getCHSCData(school.name);
  if (!chsc?.email) {
    if (missingByLevel[school.level]) {
      missingByLevel[school.level].push(school.name);
    }
  }
});

console.log("=== SCHOOLS MISSING EMAIL ===\n");

Object.entries(missingByLevel).forEach(([level, names]) => {
  console.log(`\n${level} (${names.length} missing):`);
  names.slice(0, 30).forEach(name => {
    console.log(`  - ${name}`);
  });
  if (names.length > 30) {
    console.log(`  ... and ${names.length - 30} more`);
  }
});
