/**
 * Hong Kong Schools Database
 *
 * Architecture:
 * - schools_raw.ts: Raw school data from CHSC/EDB/IMS sources
 * - mappings/instruction-language-map.ts: MOI data from CHSC
 * - mappings/gender-map.ts: Gender data from CHSC
 * - mappings/curriculum-map.ts: Curriculum data (international schools)
 * - mappings/school-metadata-map.ts: Religion, school net, special school, relationship data
 * - mappings/international-school-map.ts: International school overrides (category, tuition)
 *
 * This file merges raw data with all mappings at module load time.
 *
 * IMPORTANT - Data Field Usage:
 * - instructionLanguages / curriculumV2: PRIMARY SOURCES - use these for new UI code
 * - language / curriculum: LEGACY FIELDS - derived from primary sources for backward compatibility
 *   These are kept for filter logic compatibility but should NOT be used in new UI code
 */

import type { School, InstructionLanguage, SchoolGender, CurriculumV2, SchoolRelationship, SchoolCategory, Language, Curriculum } from "@/types/school";
import { schoolsRaw } from "./schools_raw";
import { instructionLanguageMap } from "./mappings/instruction-language-map";
import { genderMap } from "./mappings/gender-map";
import { curriculumMap } from "./mappings/curriculum-map";
import { schoolMetadataMap } from "./mappings/school-metadata-map";
import { relationshipMap } from "./mappings/relationship-map";
import { internationalSchools } from "./mappings/international-school-map";

/**
 * Default values for unmapped schools
 */
const DEFAULT_INSTRUCTION_LANGUAGES: InstructionLanguage[] = [];
const DEFAULT_GENDER: SchoolGender = "MIXED";
const DEFAULT_CURRICULUM_V2: CurriculumV2[] = [];

/**
 * Derive legacy Language field from InstructionLanguage[]
 * This ensures legacy filters continue to work with correct data
 */
function deriveLanguage(instructionLanguages: InstructionLanguage[]): Language {
  if (!instructionLanguages || instructionLanguages.length === 0) {
    return "以中文為主"; // Default fallback
  }
  const hasEnglish = instructionLanguages.includes("ENGLISH");
  const hasChinese = instructionLanguages.includes("CANTONESE") || instructionLanguages.includes("PUTONGHUA");

  if (hasEnglish && !hasChinese) return "全英文";
  if (hasEnglish && hasChinese) return "中英雙語";
  return "以中文為主";
}

/**
 * Map CurriculumV2 to legacy Curriculum type
 */
const CURRICULUM_V2_TO_LEGACY: Record<CurriculumV2, Curriculum[]> = {
  HK_LOCAL: ["DSE"],
  IB: ["IB"],
  BRITISH: ["IGCSE", "A-Level", "英式課程"],
  AMERICAN: ["AP", "美式課程"],
  CANADIAN: ["加拿大課程"],
  AUSTRALIAN: ["澳洲課程"],
  OTHER_INTL: ["其他"],
  DUAL_TRACK: ["DSE", "IB"], // Typically DSE + international
};

/**
 * Derive legacy Curriculum[] field from CurriculumV2[]
 */
function deriveCurriculum(curriculumV2: CurriculumV2[]): Curriculum[] {
  if (!curriculumV2 || curriculumV2.length === 0) {
    return [];
  }
  const result: Curriculum[] = [];
  for (const cv2 of curriculumV2) {
    const legacyValues = CURRICULUM_V2_TO_LEGACY[cv2];
    if (legacyValues) {
      for (const lv of legacyValues) {
        if (!result.includes(lv)) {
          result.push(lv);
        }
      }
    }
  }
  return result;
}

/**
 * Build international school lookup map for efficient merging
 * Provides correct category, tuition, curriculum, and instruction languages
 */
const internationalSchoolMap = new Map(
  internationalSchools.map((s) => [s.id, s])
);

/**
 * Merge raw school data with all mappings
 * Legacy fields (language, curriculum) are DERIVED from new fields for backward compatibility
 */
function mergeSchoolData(): School[] {
  return schoolsRaw.map((raw) => {
    const metadata = schoolMetadataMap[raw.id];
    const relationshipEntry = relationshipMap[raw.id];
    const intlData = internationalSchoolMap.get(raw.id);

    // For international schools, use their specific data for category and tuition
    const category: SchoolCategory = intlData?.category ?? raw.category as SchoolCategory;
    const tuitionMin = intlData?.tuitionMin ?? raw.tuitionMin;
    const tuitionMax = intlData?.tuitionMax ?? raw.tuitionMax;

    // Use international school data for curriculum and languages if available,
    // otherwise fall back to the mapping files
    const instructionLanguages = intlData?.instructionLanguages?.length
      ? intlData.instructionLanguages
      : (instructionLanguageMap[raw.id] ?? DEFAULT_INSTRUCTION_LANGUAGES);
    const curriculumV2 = intlData?.curriculumV2?.length
      ? intlData.curriculumV2
      : ((curriculumMap[raw.id] as CurriculumV2[]) ?? DEFAULT_CURRICULUM_V2);

    // Derive legacy fields from new fields (for backward compatibility with filters)
    const language = deriveLanguage(instructionLanguages);
    const curriculum = deriveCurriculum(curriculumV2);

    // Exclude raw legacy fields, we'll add derived ones
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { language: _rawLanguage, curriculum: _rawCurriculum, ...rawWithoutLegacy } = raw;

    return {
      ...rawWithoutLegacy,
      // Override category and tuition for international schools
      category,
      tuitionMin,
      tuitionMax,
      // New fields (correct sources) - USE THESE FOR NEW UI CODE
      instructionLanguages,
      curriculumV2,
      // Legacy fields (derived from new fields) - for backward compatibility only
      language,
      curriculum,
      gender: (genderMap[raw.id] as SchoolGender) ?? DEFAULT_GENDER,
      // Metadata fields (R4)
      religion: metadata?.religion,
      schoolNet: metadata?.schoolNet,
      isSpecialSchool: metadata?.isSpecialSchool,
      // Relationship fields - prefer relationshipMap over metadata
      relationship: relationshipEntry?.relationType ?? metadata?.relationship as SchoolRelationship | undefined,
      relatedSchoolIds: relationshipEntry?.relatedSchoolIds,
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
