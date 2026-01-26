import { SCHOOLS } from "../data/schools";

console.log("Total schools:", SCHOOLS.length);
console.log("");

// Search for the unmatched schools with fuzzy matching
const unmatchedNames = [
  "St. Catherine's International Kindergarten",
  "Kiangsu & Chekiang Primary School (Kindergarten)",
  "The ISF Academy",
  "German Swiss International School (GSIS)",
  "Victoria Shanghai Academy (VSA)",
  "American School Hong Kong (ASHK)",
  "French International School (FIS)",
  "Hong Kong International School (HKIS)",
  "Canadian International School of Hong Kong (CDNIS)",
];

console.log("=== Searching for unmatched schools ===\n");

unmatchedNames.forEach(name => {
  console.log(`Looking for: ${name}`);

  // Extract key words from the name
  const keywords = name.toLowerCase()
    .replace(/[()]/g, ' ')
    .replace(/['']/g, '')
    .split(/\s+/)
    .filter(w => w.length > 2 && !['the', 'and', 'for'].includes(w));

  console.log("  Keywords:", keywords.join(", "));

  // Search for schools containing any of the keywords
  const matches = SCHOOLS.filter(s => {
    const schoolNameLower = s.nameEn.toLowerCase();
    const chineseNameLower = s.name.toLowerCase();
    return keywords.some(kw => schoolNameLower.includes(kw) || chineseNameLower.includes(kw));
  });

  if (matches.length > 0) {
    console.log("  Potential matches:");
    matches.slice(0, 3).forEach(m => {
      console.log(`    - ${m.nameEn} | ${m.name} | ID: ${m.id}`);
    });
  } else {
    console.log("  No matches found");
  }
  console.log("");
});
