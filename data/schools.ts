/**
 * Hong Kong Schools Database
 *
 * Architecture:
 * - schools_raw.ts: Raw school data from CHSC/EDB/IMS sources
 * - mappings/instruction-language-map.ts: MOI data from CHSC
 * - mappings/gender-map.ts: Gender data from CHSC
 * - mappings/curriculum-map.ts: Curriculum data (international schools)
 *
 * This file merges raw data with all mappings at module load time.
 * To update mappings, edit the CSV files in data/ and run:
 *   npx tsx scripts/sync-mappings.ts
 */

import type { School, InstructionLanguage, SchoolGender, CurriculumV2 } from "@/types/school";
import { schoolsRaw } from "./schools_raw";
import { instructionLanguageMap } from "./mappings/instruction-language-map";
import { genderMap } from "./mappings/gender-map";
import { curriculumMap } from "./mappings/curriculum-map";

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
  return schoolsRaw.map((raw) => ({
    ...raw,
    // Mapped fields
    instructionLanguages: instructionLanguageMap[raw.id] ?? DEFAULT_INSTRUCTION_LANGUAGES,
    gender: (genderMap[raw.id] as SchoolGender) ?? DEFAULT_GENDER,
    curriculumV2: (curriculumMap[raw.id] as CurriculumV2[]) ?? DEFAULT_CURRICULUM_V2,
  }));
}

/**
 * Complete schools array with all mappings applied
 */
export const schools: School[] = mergeSchoolData();

/**
 * Backwards-compatible alias (uppercase)
 */
export const SCHOOLS = schools;
