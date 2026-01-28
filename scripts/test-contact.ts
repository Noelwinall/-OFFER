import { schools } from "../data/schools";
import { getCHSCData } from "../data/chsc-data";

console.log("Schools loaded:", schools.length);

const testSchools = ["大埔浸信會公立學校", "慈幼學校", "拔萃男書院"];

testSchools.forEach(name => {
  const school = schools.find(s => s.name === name);
  const chsc = getCHSCData(name);
  console.log("\n" + name + ":");
  console.log("  School phone:", school?.phone || "(empty)");
  console.log("  School website:", school?.website || "(empty)");
  console.log("  CHSC phone:", chsc?.phone || "(empty)");
  console.log("  CHSC fax:", chsc?.fax || "(empty)");
  console.log("  CHSC email:", chsc?.email || "(empty)");
});
