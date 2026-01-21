/**
 * Extract raw school data from schools.ts
 * Removes mapped fields: instructionLanguages, gender, curriculumV2
 * Output: data/schools_raw.ts
 */
import * as fs from "fs";
import * as path from "path";

// Import current schools
import { schools } from "../data/schools";

interface SchoolRaw {
  id: string;
  name: string;
  nameEn: string;
  searchKeywords: string[];
  category: string;
  district: string;
  district18: string;
  level: string;
  tuitionMin: number;
  tuitionMax: number;
  curriculum: string[];
  language: string;
  highlights: string[];
  address: string;
  phone: string;
  website: string;
  applicationMaterials: string[];
  applicationLink: string;
  latitude: number;
  longitude: number;
}

// Extract raw data (without mapped fields)
const schoolsRaw: SchoolRaw[] = schools.map((school) => ({
  id: school.id,
  name: school.name,
  nameEn: school.nameEn,
  searchKeywords: school.searchKeywords,
  category: school.category,
  district: school.district,
  district18: school.district18,
  level: school.level,
  tuitionMin: school.tuitionMin,
  tuitionMax: school.tuitionMax,
  curriculum: school.curriculum,
  language: school.language,
  highlights: school.highlights,
  address: school.address,
  phone: school.phone,
  website: school.website,
  applicationMaterials: school.applicationMaterials,
  applicationLink: school.applicationLink,
  latitude: school.latitude,
  longitude: school.longitude,
}));

// Generate TypeScript output
const output = `// Raw school data from CHSC/EDB/IMS sources
// DO NOT EDIT - This is the source of truth for base school data
// Mapped fields (instructionLanguages, gender, curriculumV2) are in separate CSV files
// Generated: ${new Date().toISOString().split("T")[0]}
// Total: ${schoolsRaw.length} schools

import type { District, District18, SchoolLevel, Category, Language } from "@/types/school";

export interface SchoolRaw {
  id: string;
  name: string;
  nameEn: string;
  searchKeywords: string[];
  category: Category;
  district: District;
  district18: District18;
  level: SchoolLevel;
  tuitionMin: number;
  tuitionMax: number;
  curriculum: string[];
  language: Language;
  highlights: string[];
  address: string;
  phone: string;
  website: string;
  applicationMaterials: string[];
  applicationLink: string;
  latitude: number;
  longitude: number;
}

export const schoolsRaw: SchoolRaw[] = ${JSON.stringify(schoolsRaw, null, 2)};
`;

// Write to file
const outputPath = path.join(__dirname, "../data/schools_raw.ts");
fs.writeFileSync(outputPath, output);

console.log(`Generated ${outputPath}`);
console.log(`Total schools: ${schoolsRaw.length}`);
