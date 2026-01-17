/**
 * Hong Kong Schools Database
 *
 * Architecture:
 * - schools_raw.ts: Raw school data from CHSC/EDB/IMS sources
 * - mappings/instruction-language-map.ts: MOI data from CHSC
 * - mappings/gender-map.ts: Gender data from CHSC
 * - mappings/curriculum-map.ts: Curriculum data (international schools)
 * - mappings/school-metadata-map.ts: Religion, school net, special school, relationship data
 *
 * This file merges raw data with all mappings at module load time.
 * To update mappings, edit the CSV files in data/ and run:
 *   npx tsx scripts/sync-mappings.ts
 *   npx tsx scripts/generate-school-metadata.ts
 */

import type { School, InstructionLanguage, SchoolGender, CurriculumV2, SchoolRelationship } from "@/types/school";
import { schoolsRaw } from "./schools_raw";
import { instructionLanguageMap } from "./mappings/instruction-language-map";
import { genderMap } from "./mappings/gender-map";
import { curriculumMap } from "./mappings/curriculum-map";
import { schoolMetadataMap } from "./mappings/school-metadata-map";

/**
 * Default values for unmapped schools
 */
const DEFAULT_INSTRUCTION_LANGUAGES: InstructionLanguage[] = [];
const DEFAULT_GENDER: SchoolGender = "MIXED";
const DEFAULT_CURRICULUM_V2: CurriculumV2[] = [];

/**
 * Merge raw school data with all mappings
 */
function mergeSchoolData(): School[] {
  return schoolsRaw.map((raw) => {
    const metadata = schoolMetadataMap[raw.id];
    return {
      ...raw,
      // Mapped fields
      instructionLanguages: instructionLanguageMap[raw.id] ?? DEFAULT_INSTRUCTION_LANGUAGES,
      gender: (genderMap[raw.id] as SchoolGender) ?? DEFAULT_GENDER,
      curriculumV2: (curriculumMap[raw.id] as CurriculumV2[]) ?? DEFAULT_CURRICULUM_V2,
      // Metadata fields (R4)
      religion: metadata?.religion,
      schoolNet: metadata?.schoolNet,
      isSpecialSchool: metadata?.isSpecialSchool,
      relationship: metadata?.relationship as SchoolRelationship | undefined,
    };
  });
}

/**
 * Complete schools array with all mappings applied
 */
export const schools: School[] = mergeSchoolData();

/**
 * Backwards-compatible alias (uppercase)
 */
export const SCHOOLS = schools;
