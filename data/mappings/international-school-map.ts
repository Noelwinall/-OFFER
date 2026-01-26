// International School Database
// Source: Generated from existing school data using isInternational() logic
// Generated: 2026-01-22
// Total: 386 schools (幼稚園: 279, 小學: 64, 中學: 43)
// Unique: 158 schools (deduplicated by name)
//
// DO NOT EDIT MANUALLY - Run "npx tsx scripts/generate-intl-school-db.ts" to regenerate

import type { CurriculumV2, InstructionLanguage } from "@/types/school";

export interface InternationalSchoolEntry {
  id: string;
  name: string;
  nameEn: string;
  level: "幼稚園" | "小學" | "中學";
  category: "國際";              // Display category
  rawCategory: string;           // Original EDB category (usually "私立")
  district: string;
  district18: string;
  curriculumV2: CurriculumV2[];
  instructionLanguages: InstructionLanguage[];
  tuitionMin: number;
  tuitionMax: number;
}

export interface UniqueInternationalSchool {
  name: string;
  nameEn: string;
  levels: ("幼稚園" | "小學" | "中學")[];
  category: "國際";
  districts: string[];
  schoolIds: string[];
  curriculumV2: CurriculumV2[];
  instructionLanguages: InstructionLanguage[];
  tuitionMin: number;
  tuitionMax: number;
}

/**
 * Complete list of international schools (raw entries)
 * Aligned with filter results - same schools that appear when filtering by "國際"
 * Note: Same school may have multiple entries for different levels (KG/Primary/Secondary)
 */
export const internationalSchools: InternationalSchoolEntry[] = [
  {
    "id": "edb_602329000111",
    "name": "ABC PATHWAYS INTERNATIONAL KINDERGARTEN",
    "nameEn": "ABC PATHWAYS INTERNATIONAL KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "東區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_602329000112",
    "name": "ABC PATHWAYS INTERNATIONAL KINDERGARTEN",
    "nameEn": "ABC PATHWAYS INTERNATIONAL KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "東區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_603864000211",
    "name": "ABC PATHWAYS INTERNATIONAL KINDERGARTEN (WHAMPOA GARDEN)",
    "nameEn": "ABC PATHWAYS INTERNATIONAL KINDERGARTEN (WHAMPOA GARDEN)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "九龍城區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_603864000212",
    "name": "ABC PATHWAYS INTERNATIONAL KINDERGARTEN (WHAMPOA GARDEN)",
    "nameEn": "ABC PATHWAYS INTERNATIONAL KINDERGARTEN (WHAMPOA GARDEN)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "九龍城區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_603864000213",
    "name": "ABC PATHWAYS INTERNATIONAL KINDERGARTEN (WHAMPOA GARDEN)",
    "nameEn": "ABC PATHWAYS INTERNATIONAL KINDERGARTEN (WHAMPOA GARDEN)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "九龍城區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_287695000213",
    "name": "美國國際學校",
    "nameEn": "AMERICAN INTERNATIONAL SCHOOL",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "九龍城區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 97000,
    "tuitionMax": 146800
  },
  {
    "id": "edb_287695000211",
    "name": "美國國際學校",
    "nameEn": "AMERICAN INTERNATIONAL SCHOOL",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "九龍城區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 97000,
    "tuitionMax": 146800
  },
  {
    "id": "edb_287695000223",
    "name": "美國國際學校",
    "nameEn": "AMERICAN INTERNATIONAL SCHOOL",
    "level": "小學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "九龍城區",
    "curriculumV2": [
      "AMERICAN"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 164400,
    "tuitionMax": 164400
  },
  {
    "id": "edb_287695000233",
    "name": "美國國際學校",
    "nameEn": "AMERICAN INTERNATIONAL SCHOOL",
    "level": "中學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "九龍城區",
    "curriculumV2": [
      "AMERICAN"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 180400,
    "tuitionMax": 180400
  },
  {
    "id": "edb_527882000123",
    "name": "AMERICAN INTERNATIONAL SCHOOL (PRIMARY BRANCH)",
    "nameEn": "AMERICAN INTERNATIONAL SCHOOL (PRIMARY BRANCH)",
    "level": "小學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "九龍城區",
    "curriculumV2": [
      "AMERICAN"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 152800,
    "tuitionMax": 152800
  },
  {
    "id": "edb_603902000123",
    "name": "AMERICAN SCHOOL HONG KONG",
    "nameEn": "AMERICAN SCHOOL HONG KONG",
    "level": "小學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "大埔區",
    "curriculumV2": [
      "AMERICAN"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 189600,
    "tuitionMax": 234500
  },
  {
    "id": "edb_603902000133",
    "name": "AMERICAN SCHOOL HONG KONG",
    "nameEn": "AMERICAN SCHOOL HONG KONG",
    "level": "中學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "大埔區",
    "curriculumV2": [
      "AMERICAN"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 189600,
    "tuitionMax": 234500
  },
  {
    "id": "edb_622060000112",
    "name": "安基司學校附屬國際幼稚園",
    "nameEn": "ANCHORS ACADEMY AFFILIATED INTERNATIONAL KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "元朗區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_622060000113",
    "name": "安基司學校附屬國際幼稚園",
    "nameEn": "ANCHORS ACADEMY AFFILIATED INTERNATIONAL KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "元朗區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_622060000111",
    "name": "安基司學校附屬國際幼稚園",
    "nameEn": "ANCHORS ACADEMY AFFILIATED INTERNATIONAL KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "元朗區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_565199000212",
    "name": "安基司國際幼兒園",
    "nameEn": "ANCHORS INTERNATIONAL NURSERY",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "大埔區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_565199000211",
    "name": "安基司國際幼兒園",
    "nameEn": "ANCHORS INTERNATIONAL NURSERY",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "大埔區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_565199000213",
    "name": "安基司國際幼兒園",
    "nameEn": "ANCHORS INTERNATIONAL NURSERY",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "大埔區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_565199000113",
    "name": "安基司國際幼兒園",
    "nameEn": "ANCHORS INTERNATIONAL NURSERY",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "大埔區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_565199000111",
    "name": "安基司國際幼兒園",
    "nameEn": "ANCHORS INTERNATIONAL NURSERY",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "大埔區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_565199000112",
    "name": "安基司國際幼兒園",
    "nameEn": "ANCHORS INTERNATIONAL NURSERY",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "大埔區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_535818000312",
    "name": "安菲爾國際幼稚園",
    "nameEn": "ANFIELD INTERNATIONAL KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "九龍城區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_535818000311",
    "name": "安菲爾國際幼稚園",
    "nameEn": "ANFIELD INTERNATIONAL KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "九龍城區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_535818000313",
    "name": "安菲爾國際幼稚園",
    "nameEn": "ANFIELD INTERNATIONAL KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "九龍城區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_535818000211",
    "name": "安菲爾國際幼稚園",
    "nameEn": "ANFIELD INTERNATIONAL KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "九龍城區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_535818000212",
    "name": "安菲爾國際幼稚園",
    "nameEn": "ANFIELD INTERNATIONAL KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "九龍城區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_535818000213",
    "name": "安菲爾國際幼稚園",
    "nameEn": "ANFIELD INTERNATIONAL KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "九龍城區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_587567000123",
    "name": "安菲爾學校",
    "nameEn": "ANFIELD SCHOOL",
    "level": "小學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "沙田區",
    "curriculumV2": [
      "HK_LOCAL"
    ],
    "instructionLanguages": [
      "ENGLISH",
      "CANTONESE"
    ],
    "tuitionMin": 165000,
    "tuitionMax": 165000
  },
  {
    "id": "edb_620785000123",
    "name": "安菲爾聖鮑思高冠英學校",
    "nameEn": "ANFIELD ST. BOSCO KOON YING SCHOOL",
    "level": "小學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "元朗區",
    "curriculumV2": [
      "HK_LOCAL"
    ],
    "instructionLanguages": [
      "ENGLISH",
      "CANTONESE"
    ],
    "tuitionMin": 304500,
    "tuitionMax": 304500
  },
  {
    "id": "edb_604470000111",
    "name": "雅士圖國際幼稚園",
    "nameEn": "ARISTLE INTERNATIONAL KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "深水埗區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_604470000112",
    "name": "雅士圖國際幼稚園",
    "nameEn": "ARISTLE INTERNATIONAL KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "深水埗區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_216275000612",
    "name": "香港澳洲國際學校",
    "nameEn": "AUSTRALIAN INTERNATIONAL SCHOOL HONG KONG",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "九龍城區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 148800,
    "tuitionMax": 173800
  },
  {
    "id": "edb_216275000613",
    "name": "香港澳洲國際學校",
    "nameEn": "AUSTRALIAN INTERNATIONAL SCHOOL HONG KONG",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "九龍城區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 148800,
    "tuitionMax": 173800
  },
  {
    "id": "edb_216275000611",
    "name": "香港澳洲國際學校",
    "nameEn": "AUSTRALIAN INTERNATIONAL SCHOOL HONG KONG",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "九龍城區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 148800,
    "tuitionMax": 173800
  },
  {
    "id": "edb_216275000623",
    "name": "香港澳洲國際學校",
    "nameEn": "AUSTRALIAN INTERNATIONAL SCHOOL HONG KONG",
    "level": "小學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "九龍城區",
    "curriculumV2": [
      "AUSTRALIAN"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 148800,
    "tuitionMax": 173800
  },
  {
    "id": "edb_216275000633",
    "name": "香港澳洲國際學校",
    "nameEn": "AUSTRALIAN INTERNATIONAL SCHOOL HONG KONG",
    "level": "中學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "九龍城區",
    "curriculumV2": [
      "AUSTRALIAN"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 200500,
    "tuitionMax": 252800
  },
  {
    "id": "edb_170348000123",
    "name": "BEACON HILL SCHOOL",
    "nameEn": "BEACON HILL SCHOOL",
    "level": "小學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "九龍城區",
    "curriculumV2": [
      "BRITISH"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 139000,
    "tuitionMax": 139000
  },
  {
    "id": "edb_559415000112",
    "name": "博士山（香港）國際幼稚園",
    "nameEn": "BOX HILL (HK) INTERNATIONAL KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "沙田區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 77000,
    "tuitionMax": 79200
  },
  {
    "id": "edb_559415000111",
    "name": "博士山（香港）國際幼稚園",
    "nameEn": "BOX HILL (HK) INTERNATIONAL KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "沙田區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 77000,
    "tuitionMax": 79200
  },
  {
    "id": "edb_581836000212",
    "name": "博士山(香港)國際幼稚園-將軍澳",
    "nameEn": "BOX HILL (HK) INTERNATIONAL KINDERGARTEN - TSEUNG KWAN O",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "西貢區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 74800,
    "tuitionMax": 78100
  },
  {
    "id": "edb_581836000213",
    "name": "博士山(香港)國際幼稚園-將軍澳",
    "nameEn": "BOX HILL (HK) INTERNATIONAL KINDERGARTEN - TSEUNG KWAN O",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "西貢區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 74800,
    "tuitionMax": 78100
  },
  {
    "id": "edb_581836000211",
    "name": "博士山(香港)國際幼稚園-將軍澳",
    "nameEn": "BOX HILL (HK) INTERNATIONAL KINDERGARTEN - TSEUNG KWAN O",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "西貢區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 74800,
    "tuitionMax": 78100
  },
  {
    "id": "edb_581739000212",
    "name": "博士山(香港)國際幼稚園-火炭",
    "nameEn": "BOX HILL (HK) INTERNATIONAL KINDERGARTEN-FO TAN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "沙田區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 77000,
    "tuitionMax": 79200
  },
  {
    "id": "edb_581739000211",
    "name": "博士山(香港)國際幼稚園-火炭",
    "nameEn": "BOX HILL (HK) INTERNATIONAL KINDERGARTEN-FO TAN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "沙田區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 77000,
    "tuitionMax": 79200
  },
  {
    "id": "edb_581739000112",
    "name": "博士山（香港）國際幼稚園－火炭",
    "nameEn": "BOX HILL (HK) INTERNATIONAL KINDERGARTEN-FO TAN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "沙田區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 77000,
    "tuitionMax": 79200
  },
  {
    "id": "edb_581739000111",
    "name": "博士山（香港）國際幼稚園－火炭",
    "nameEn": "BOX HILL (HK) INTERNATIONAL KINDERGARTEN-FO TAN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "沙田區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 77000,
    "tuitionMax": 79200
  },
  {
    "id": "edb_170747000123",
    "name": "白普理小學",
    "nameEn": "BRADBURY SCHOOL",
    "level": "小學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "灣仔區",
    "curriculumV2": [
      "BRITISH"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 139000,
    "tuitionMax": 139000
  },
  {
    "id": "edb_216011000512",
    "name": "加拿大國際學校",
    "nameEn": "CANADIAN INTERNATIONAL SCHOOL",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "南區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 156300,
    "tuitionMax": 203100
  },
  {
    "id": "edb_216011000511",
    "name": "加拿大國際學校",
    "nameEn": "CANADIAN INTERNATIONAL SCHOOL",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "南區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 156300,
    "tuitionMax": 203100
  },
  {
    "id": "edb_216011000611",
    "name": "加拿大國際學校",
    "nameEn": "CANADIAN INTERNATIONAL SCHOOL",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "南區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 156300,
    "tuitionMax": 203100
  },
  {
    "id": "edb_216011000612",
    "name": "加拿大國際學校",
    "nameEn": "CANADIAN INTERNATIONAL SCHOOL",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "南區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 156300,
    "tuitionMax": 203100
  },
  {
    "id": "edb_216011000523",
    "name": "加拿大國際學校",
    "nameEn": "CANADIAN INTERNATIONAL SCHOOL",
    "level": "小學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "南區",
    "curriculumV2": [
      "CANADIAN"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 156300,
    "tuitionMax": 212800
  },
  {
    "id": "edb_216011000533",
    "name": "加拿大國際學校",
    "nameEn": "CANADIAN INTERNATIONAL SCHOOL",
    "level": "中學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "南區",
    "curriculumV2": [
      "CANADIAN"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 216600,
    "tuitionMax": 254300
  },
  {
    "id": "edb_216186000211",
    "name": "CARMEL SCHOOL",
    "nameEn": "CARMEL SCHOOL",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "東區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 80500,
    "tuitionMax": 193000
  },
  {
    "id": "edb_216186000423",
    "name": "CARMEL SCHOOL",
    "nameEn": "CARMEL SCHOOL",
    "level": "小學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "東區",
    "curriculumV2": [
      "OTHER_INTL"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 193000,
    "tuitionMax": 193000
  },
  {
    "id": "edb_216186000323",
    "name": "CARMEL SCHOOL",
    "nameEn": "CARMEL SCHOOL",
    "level": "小學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "東區",
    "curriculumV2": [
      "OTHER_INTL"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 193000,
    "tuitionMax": 193000
  },
  {
    "id": "edb_216186000433",
    "name": "CARMEL SCHOOL",
    "nameEn": "CARMEL SCHOOL",
    "level": "中學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "東區",
    "curriculumV2": [
      "OTHER_INTL"
    ],
    "instructionLanguages": [
      "ENGLISH",
      "CANTONESE"
    ],
    "tuitionMin": 226090,
    "tuitionMax": 226090
  },
  {
    "id": "edb_325651000113",
    "name": "銅鑼灣維多利亞國際幼稚園",
    "nameEn": "CAUSEWAY BAY VICTORIA INTERNATIONAL KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "灣仔區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_325651000112",
    "name": "銅鑼灣維多利亞國際幼稚園",
    "nameEn": "CAUSEWAY BAY VICTORIA INTERNATIONAL KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "灣仔區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_325651000111",
    "name": "銅鑼灣維多利亞國際幼稚園",
    "nameEn": "CAUSEWAY BAY VICTORIA INTERNATIONAL KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "灣仔區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 125430,
    "tuitionMax": 137973
  },
  {
    "id": "edb_599182000111",
    "name": "新加坡卓薈國際幼稚園(界限街)",
    "nameEn": "CHATSWORTH INTERNATIONAL KINDERGARTEN (BOUNDARY STREET)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "九龍城區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_599182000112",
    "name": "新加坡卓薈國際幼稚園(界限街)",
    "nameEn": "CHATSWORTH INTERNATIONAL KINDERGARTEN (BOUNDARY STREET)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "九龍城區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_599182000113",
    "name": "新加坡卓薈國際幼稚園(界限街)",
    "nameEn": "CHATSWORTH INTERNATIONAL KINDERGARTEN (BOUNDARY STREET)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "九龍城區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_215589000112",
    "name": "漢基國際學校",
    "nameEn": "CHINESE INTERNATIONAL SCHOOL",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "東區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_215589000111",
    "name": "漢基國際學校",
    "nameEn": "CHINESE INTERNATIONAL SCHOOL",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "東區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_215589000123",
    "name": "漢基國際學校",
    "nameEn": "CHINESE INTERNATIONAL SCHOOL",
    "level": "小學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "東區",
    "curriculumV2": [
      "IB"
    ],
    "instructionLanguages": [
      "ENGLISH",
      "PUTONGHUA"
    ],
    "tuitionMin": 316800,
    "tuitionMax": 316800
  },
  {
    "id": "edb_215589000133",
    "name": "漢基國際學校",
    "nameEn": "CHINESE INTERNATIONAL SCHOOL",
    "level": "中學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "東區",
    "curriculumV2": [
      "IB"
    ],
    "instructionLanguages": [
      "ENGLISH",
      "PUTONGHUA"
    ],
    "tuitionMin": 368500,
    "tuitionMax": 373000
  },
  {
    "id": "edb_605557000123",
    "name": "宣道國際學校",
    "nameEn": "CHRISTIAN ALLIANCE INTERNATIONAL SCHOOL",
    "level": "小學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "深水埗區",
    "curriculumV2": [
      "IB"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 141500,
    "tuitionMax": 190000
  },
  {
    "id": "edb_605557000133",
    "name": "宣道國際學校",
    "nameEn": "CHRISTIAN ALLIANCE INTERNATIONAL SCHOOL",
    "level": "中學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "深水埗區",
    "curriculumV2": [
      "IB"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 205400,
    "tuitionMax": 237000
  },
  {
    "id": "edb_216127000123",
    "name": "宣道會劉平齋紀念國際學校",
    "nameEn": "CHRISTIAN ALLIANCE P.C. LAU MEMORIAL INTERNATIONAL SCHOOL",
    "level": "小學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "九龍城區",
    "curriculumV2": [
      "OTHER_INTL"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_171034000123",
    "name": "CLEARWATER BAY SCHOOL",
    "nameEn": "CLEARWATER BAY SCHOOL",
    "level": "小學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "西貢區",
    "curriculumV2": [
      "BRITISH"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 139000,
    "tuitionMax": 139000
  },
  {
    "id": "edb_171034000223",
    "name": "CLEARWATER BAY SCHOOL",
    "nameEn": "CLEARWATER BAY SCHOOL",
    "level": "小學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "西貢區",
    "curriculumV2": [
      "BRITISH"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 139000,
    "tuitionMax": 139000
  },
  {
    "id": "edb_215996000133",
    "name": "協同國際學校",
    "nameEn": "CONCORDIA INTERNATIONAL SCHOOL",
    "level": "中學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "深水埗區",
    "curriculumV2": [
      "AMERICAN"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 129500,
    "tuitionMax": 150950
  },
  {
    "id": "edb_607371000223",
    "name": "香港道爾頓學校",
    "nameEn": "DALTON SCHOOL HONG KONG",
    "level": "小學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "灣仔區",
    "curriculumV2": [
      "AMERICAN"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 205480,
    "tuitionMax": 207680
  },
  {
    "id": "edb_607371000233",
    "name": "香港道爾頓學校",
    "nameEn": "DALTON SCHOOL HONG KONG",
    "level": "中學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "灣仔區",
    "curriculumV2": [
      "AMERICAN"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 205480,
    "tuitionMax": 207680
  },
  {
    "id": "edb_567116000112",
    "name": "德寶國際幼兒學校（寶盈花園）",
    "nameEn": "DEBORAH INTERNATIONAL PRE-SCHOOL (BAUHINIA GARDEN)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "西貢區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_567116000113",
    "name": "德寶國際幼兒學校（寶盈花園）",
    "nameEn": "DEBORAH INTERNATIONAL PRE-SCHOOL (BAUHINIA GARDEN)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "西貢區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_567116000111",
    "name": "德寶國際幼兒學校（寶盈花園）",
    "nameEn": "DEBORAH INTERNATIONAL PRE-SCHOOL (BAUHINIA GARDEN)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "西貢區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_567108000112",
    "name": "德寶國際幼兒學校（將軍澳）",
    "nameEn": "DEBORAH INTERNATIONAL PRE-SCHOOL (TSEUNG KWAN O)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "西貢區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_567108000113",
    "name": "德寶國際幼兒學校（將軍澳）",
    "nameEn": "DEBORAH INTERNATIONAL PRE-SCHOOL (TSEUNG KWAN O)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "西貢區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_567108000111",
    "name": "德寶國際幼兒學校（將軍澳）",
    "nameEn": "DEBORAH INTERNATIONAL PRE-SCHOOL (TSEUNG KWAN O)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "西貢區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_230987000113",
    "name": "DISCOVERY BAY INTERNATIONAL SCHOOL",
    "nameEn": "DISCOVERY BAY INTERNATIONAL SCHOOL",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "離島區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 143700,
    "tuitionMax": 196900
  },
  {
    "id": "edb_230987000112",
    "name": "DISCOVERY BAY INTERNATIONAL SCHOOL",
    "nameEn": "DISCOVERY BAY INTERNATIONAL SCHOOL",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "離島區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 143700,
    "tuitionMax": 196900
  },
  {
    "id": "edb_230987000111",
    "name": "DISCOVERY BAY INTERNATIONAL SCHOOL",
    "nameEn": "DISCOVERY BAY INTERNATIONAL SCHOOL",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "離島區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 143700,
    "tuitionMax": 196900
  },
  {
    "id": "edb_230987000123",
    "name": "DISCOVERY BAY INTERNATIONAL SCHOOL",
    "nameEn": "DISCOVERY BAY INTERNATIONAL SCHOOL",
    "level": "小學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "離島區",
    "curriculumV2": [
      "BRITISH"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 143700,
    "tuitionMax": 196900
  },
  {
    "id": "edb_230987000233",
    "name": "DISCOVERY BAY INTERNATIONAL SCHOOL",
    "nameEn": "DISCOVERY BAY INTERNATIONAL SCHOOL",
    "level": "中學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "離島區",
    "curriculumV2": [
      "BRITISH"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 143700,
    "tuitionMax": 196900
  },
  {
    "id": "edb_230987000133",
    "name": "DISCOVERY BAY INTERNATIONAL SCHOOL",
    "nameEn": "DISCOVERY BAY INTERNATIONAL SCHOOL",
    "level": "中學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "離島區",
    "curriculumV2": [
      "BRITISH"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 143700,
    "tuitionMax": 196900
  },
  {
    "id": "edb_569747000223",
    "name": "智新書院",
    "nameEn": "DISCOVERY COLLEGE",
    "level": "小學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "離島區",
    "curriculumV2": [
      "IB"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 147200,
    "tuitionMax": 147200
  },
  {
    "id": "edb_569747000233",
    "name": "智新書院",
    "nameEn": "DISCOVERY COLLEGE",
    "level": "中學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "離島區",
    "curriculumV2": [
      "IB"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 177500,
    "tuitionMax": 191800
  },
  {
    "id": "edb_600814000111",
    "name": "DISCOVERY MONTESSORI ACADEMY",
    "nameEn": "DISCOVERY MONTESSORI ACADEMY",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "離島區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 99500,
    "tuitionMax": 205500
  },
  {
    "id": "edb_600814000112",
    "name": "DISCOVERY MONTESSORI ACADEMY",
    "nameEn": "DISCOVERY MONTESSORI ACADEMY",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "離島區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 99500,
    "tuitionMax": 205500
  },
  {
    "id": "edb_600814000113",
    "name": "DISCOVERY MONTESSORI ACADEMY",
    "nameEn": "DISCOVERY MONTESSORI ACADEMY",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "離島區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 99500,
    "tuitionMax": 205500
  },
  {
    "id": "edb_600814000123",
    "name": "DISCOVERY MONTESSORI ACADEMY",
    "nameEn": "DISCOVERY MONTESSORI ACADEMY",
    "level": "小學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "離島區",
    "curriculumV2": [
      "OTHER_INTL"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 99500,
    "tuitionMax": 205500
  },
  {
    "id": "edb_584606000113",
    "name": "香港國際蒙特梭利學校",
    "nameEn": "DISCOVERY MONTESSORI SCHOOL",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "離島區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_584606000112",
    "name": "香港國際蒙特梭利學校",
    "nameEn": "DISCOVERY MONTESSORI SCHOOL",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "離島區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_584606000111",
    "name": "香港國際蒙特梭利學校",
    "nameEn": "DISCOVERY MONTESSORI SCHOOL",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "離島區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_588032000111",
    "name": "香港國際蒙特梭利學校(中環)",
    "nameEn": "DISCOVERY MONTESSORI SCHOOL (CENTRAL)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "中西區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_588032000112",
    "name": "香港國際蒙特梭利學校(中環)",
    "nameEn": "DISCOVERY MONTESSORI SCHOOL (CENTRAL)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "中西區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_588032000113",
    "name": "香港國際蒙特梭利學校(中環)",
    "nameEn": "DISCOVERY MONTESSORI SCHOOL (CENTRAL)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "中西區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_215791000123",
    "name": "德思齊加拿大國際學校",
    "nameEn": "DSC INTERNATIONAL SCHOOL",
    "level": "小學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "東區",
    "curriculumV2": [
      "IB"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 147100,
    "tuitionMax": 155700
  },
  {
    "id": "edb_215791000133",
    "name": "德思齊加拿大國際學校",
    "nameEn": "DSC INTERNATIONAL SCHOOL",
    "level": "中學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "東區",
    "curriculumV2": [
      "IB"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 155700,
    "tuitionMax": 168100
  },
  {
    "id": "edb_615633000113",
    "name": "艾蒙特國際幼稚園",
    "nameEn": "EIS INTERNATIONAL PRE-SCHOOL",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "元朗區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_615633000111",
    "name": "艾蒙特國際幼稚園",
    "nameEn": "EIS INTERNATIONAL PRE-SCHOOL",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "元朗區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_615633000112",
    "name": "艾蒙特國際幼稚園",
    "nameEn": "EIS INTERNATIONAL PRE-SCHOOL",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "元朗區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_549240000112",
    "name": "英基雅柏國際幼稚園",
    "nameEn": "ESF ABACUS INTERNATIONAL KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "西貢區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 103000,
    "tuitionMax": 119700
  },
  {
    "id": "edb_549240000111",
    "name": "英基雅柏國際幼稚園",
    "nameEn": "ESF ABACUS INTERNATIONAL KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "西貢區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 103000,
    "tuitionMax": 119700
  },
  {
    "id": "edb_597031000112",
    "name": "伽利利國際幼稚園",
    "nameEn": "GALILEE INTERNATIONAL KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "九龍城區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_597031000111",
    "name": "伽利利國際幼稚園",
    "nameEn": "GALILEE INTERNATIONAL KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "九龍城區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_214558000211",
    "name": "德瑞國際學校",
    "nameEn": "GERMAN SWISS INTERNATIONAL SCHOOL",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "南區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 203700,
    "tuitionMax": 203700
  },
  {
    "id": "edb_214558000221",
    "name": "德瑞國際學校",
    "nameEn": "GERMAN SWISS INTERNATIONAL SCHOOL",
    "level": "小學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "南區",
    "curriculumV2": [
      "IB"
    ],
    "instructionLanguages": [
      "ENGLISH",
      "GERMAN"
    ],
    "tuitionMin": 203700,
    "tuitionMax": 203700
  },
  {
    "id": "edb_214558000123",
    "name": "德瑞國際學校",
    "nameEn": "GERMAN SWISS INTERNATIONAL SCHOOL",
    "level": "小學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "南區",
    "curriculumV2": [
      "IB"
    ],
    "instructionLanguages": [
      "ENGLISH",
      "GERMAN"
    ],
    "tuitionMin": 203700,
    "tuitionMax": 203700
  },
  {
    "id": "edb_214558000121",
    "name": "德瑞國際學校",
    "nameEn": "GERMAN SWISS INTERNATIONAL SCHOOL",
    "level": "小學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "南區",
    "curriculumV2": [
      "IB"
    ],
    "instructionLanguages": [
      "ENGLISH",
      "GERMAN"
    ],
    "tuitionMin": 203700,
    "tuitionMax": 203700
  },
  {
    "id": "edb_214558000133",
    "name": "德瑞國際學校",
    "nameEn": "GERMAN SWISS INTERNATIONAL SCHOOL",
    "level": "中學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "南區",
    "curriculumV2": [
      "IB"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 203700,
    "tuitionMax": 203700
  },
  {
    "id": "edb_170887000123",
    "name": "己連拿小學",
    "nameEn": "GLENEALY SCHOOL",
    "level": "小學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "中西區",
    "curriculumV2": [
      "BRITISH"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 139000,
    "tuitionMax": 139000
  },
  {
    "id": "edb_604585000112",
    "name": "雅惠國際幼稚園（鯉景灣）",
    "nameEn": "GRACE GARDEN INTERNATIONAL KINDERGARTEN (LEI KING WAN)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "東區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_604585000111",
    "name": "雅惠國際幼稚園（鯉景灣）",
    "nameEn": "GRACE GARDEN INTERNATIONAL KINDERGARTEN (LEI KING WAN)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "東區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_604372000112",
    "name": "綠茵英文（國際）幼稚園（日出康城）",
    "nameEn": "GREENFIELD ENGLISH (INTERNATIONAL) KINDERGARTEN (LOHAS PARK)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "西貢區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_604372000111",
    "name": "綠茵英文（國際）幼稚園（日出康城）",
    "nameEn": "GREENFIELD ENGLISH (INTERNATIONAL) KINDERGARTEN (LOHAS PARK)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "西貢區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_523984000212",
    "name": "綠茵英文（國際）幼稚園（將軍澳）",
    "nameEn": "GREENFIELD ENGLISH (INTERNATIONAL) KINDERGARTEN (TSEUNG KWAN O)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "西貢區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_523984000211",
    "name": "綠茵英文（國際）幼稚園（將軍澳）",
    "nameEn": "GREENFIELD ENGLISH (INTERNATIONAL) KINDERGARTEN (TSEUNG KWAN O)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "西貢區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_523984000213",
    "name": "綠茵英文（國際）幼稚園（將軍澳）",
    "nameEn": "GREENFIELD ENGLISH (INTERNATIONAL) KINDERGARTEN (TSEUNG KWAN O)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "西貢區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_609285000111",
    "name": "GUIDEPOST MONTESSORI INTERNATIONAL KINDERGARTEN (CHAI WAN)",
    "nameEn": "GUIDEPOST MONTESSORI INTERNATIONAL KINDERGARTEN (CHAI WAN)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "東區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_609285000112",
    "name": "GUIDEPOST MONTESSORI INTERNATIONAL KINDERGARTEN (CHAI WAN)",
    "nameEn": "GUIDEPOST MONTESSORI INTERNATIONAL KINDERGARTEN (CHAI WAN)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "東區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_583774000111",
    "name": "GUIDEPOST MONTESSORI INTERNATIONAL KINDERGARTEN (CLEARWATER BAY)",
    "nameEn": "GUIDEPOST MONTESSORI INTERNATIONAL KINDERGARTEN (CLEARWATER BAY)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "西貢區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_583774000112",
    "name": "GUIDEPOST MONTESSORI INTERNATIONAL KINDERGARTEN (CLEARWATER BAY)",
    "nameEn": "GUIDEPOST MONTESSORI INTERNATIONAL KINDERGARTEN (CLEARWATER BAY)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "西貢區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_609625000112",
    "name": "GUIDEPOST MONTESSORI INTERNATIONAL KINDERGARTEN (DISCOVERY BAY)",
    "nameEn": "GUIDEPOST MONTESSORI INTERNATIONAL KINDERGARTEN (DISCOVERY BAY)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "離島區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_609625000111",
    "name": "GUIDEPOST MONTESSORI INTERNATIONAL KINDERGARTEN (DISCOVERY BAY)",
    "nameEn": "GUIDEPOST MONTESSORI INTERNATIONAL KINDERGARTEN (DISCOVERY BAY)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "離島區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_611484000112",
    "name": "GUIDEPOST MONTESSORI INTERNATIONAL KINDERGARTEN (KENNEDY TOWN)",
    "nameEn": "GUIDEPOST MONTESSORI INTERNATIONAL KINDERGARTEN (KENNEDY TOWN)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "中西區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_611484000111",
    "name": "GUIDEPOST MONTESSORI INTERNATIONAL KINDERGARTEN (KENNEDY TOWN)",
    "nameEn": "GUIDEPOST MONTESSORI INTERNATIONAL KINDERGARTEN (KENNEDY TOWN)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "中西區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_598089000112",
    "name": "GUIDEPOST MONTESSORI INTERNATIONAL KINDERGARTEN (POK FU LAM)",
    "nameEn": "GUIDEPOST MONTESSORI INTERNATIONAL KINDERGARTEN (POK FU LAM)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "南區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_598089000111",
    "name": "GUIDEPOST MONTESSORI INTERNATIONAL KINDERGARTEN (POK FU LAM)",
    "nameEn": "GUIDEPOST MONTESSORI INTERNATIONAL KINDERGARTEN (POK FU LAM)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "南區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_564958000111",
    "name": "GUIDEPOST MONTESSORI INTERNATIONAL PRE-SCHOOL (HAPPY VALLEY HAWTHORN ROAD)",
    "nameEn": "GUIDEPOST MONTESSORI INTERNATIONAL PRE-SCHOOL (HAPPY VALLEY HAWTHORN ROAD)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "灣仔區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_564958000112",
    "name": "GUIDEPOST MONTESSORI INTERNATIONAL PRE-SCHOOL (HAPPY VALLEY HAWTHORN ROAD)",
    "nameEn": "GUIDEPOST MONTESSORI INTERNATIONAL PRE-SCHOOL (HAPPY VALLEY HAWTHORN ROAD)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "灣仔區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_594725000111",
    "name": "GUIDEPOST MONTESSORI INTERNATIONAL PRE-SCHOOL (MID-LEVELS)",
    "nameEn": "GUIDEPOST MONTESSORI INTERNATIONAL PRE-SCHOOL (MID-LEVELS)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "中西區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_594725000112",
    "name": "GUIDEPOST MONTESSORI INTERNATIONAL PRE-SCHOOL (MID-LEVELS)",
    "nameEn": "GUIDEPOST MONTESSORI INTERNATIONAL PRE-SCHOOL (MID-LEVELS)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "中西區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_602256000112",
    "name": "GUIDEPOST MONTESSORI INTERNATIONAL PRE-SCHOOL (REPULSE BAY)",
    "nameEn": "GUIDEPOST MONTESSORI INTERNATIONAL PRE-SCHOOL (REPULSE BAY)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "南區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_602256000111",
    "name": "GUIDEPOST MONTESSORI INTERNATIONAL PRE-SCHOOL (REPULSE BAY)",
    "nameEn": "GUIDEPOST MONTESSORI INTERNATIONAL PRE-SCHOOL (REPULSE BAY)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "南區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_578630000111",
    "name": "GUIDEPOST MONTESSORI INTERNATIONAL PRE-SCHOOL (SAI KUNG)",
    "nameEn": "GUIDEPOST MONTESSORI INTERNATIONAL PRE-SCHOOL (SAI KUNG)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "西貢區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_578630000112",
    "name": "GUIDEPOST MONTESSORI INTERNATIONAL PRE-SCHOOL (SAI KUNG)",
    "nameEn": "GUIDEPOST MONTESSORI INTERNATIONAL PRE-SCHOOL (SAI KUNG)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "西貢區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_590800000113",
    "name": "哈羅香港國際學校",
    "nameEn": "HARROW INTERNATIONAL SCHOOL HONG KONG",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "屯門區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_590800000123",
    "name": "哈羅香港國際學校",
    "nameEn": "HARROW INTERNATIONAL SCHOOL HONG KONG",
    "level": "小學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "屯門區",
    "curriculumV2": [
      "BRITISH"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 201314,
    "tuitionMax": 201314
  },
  {
    "id": "edb_590800000133",
    "name": "哈羅香港國際學校",
    "nameEn": "HARROW INTERNATIONAL SCHOOL HONG KONG",
    "level": "中學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "屯門區",
    "curriculumV2": [
      "BRITISH"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 229949,
    "tuitionMax": 239070
  },
  {
    "id": "edb_539155000311",
    "name": "香港學堂國際學校",
    "nameEn": "HONG KONG ACADEMY",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "西貢區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_539155000323",
    "name": "香港學堂國際學校",
    "nameEn": "HONG KONG ACADEMY",
    "level": "小學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "西貢區",
    "curriculumV2": [
      "IB"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 221800,
    "tuitionMax": 221800
  },
  {
    "id": "edb_539155000333",
    "name": "香港學堂國際學校",
    "nameEn": "HONG KONG ACADEMY",
    "level": "中學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "西貢區",
    "curriculumV2": [
      "IB"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 244100,
    "tuitionMax": 264700
  },
  {
    "id": "edb_213772000123",
    "name": "HONG KONG INTERNATIONAL SCHOOL",
    "nameEn": "HONG KONG INTERNATIONAL SCHOOL",
    "level": "小學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "南區",
    "curriculumV2": [
      "AMERICAN"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 224800,
    "tuitionMax": 224800
  },
  {
    "id": "edb_213772000233",
    "name": "HONG KONG INTERNATIONAL SCHOOL",
    "nameEn": "HONG KONG INTERNATIONAL SCHOOL",
    "level": "中學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "南區",
    "curriculumV2": [
      "AMERICAN"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 236200,
    "tuitionMax": 263300
  },
  {
    "id": "edb_317357000123",
    "name": "HONGKONG JAPANESE SCHOOL",
    "nameEn": "HONGKONG JAPANESE SCHOOL",
    "level": "小學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "灣仔區",
    "curriculumV2": [
      "OTHER_INTL"
    ],
    "instructionLanguages": [
      "JAPANESE"
    ],
    "tuitionMin": 140460,
    "tuitionMax": 140460
  },
  {
    "id": "edb_317357000133",
    "name": "HONGKONG JAPANESE SCHOOL",
    "nameEn": "HONGKONG JAPANESE SCHOOL",
    "level": "中學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "灣仔區",
    "curriculumV2": [
      "OTHER_INTL"
    ],
    "instructionLanguages": [
      "JAPANESE"
    ],
    "tuitionMin": 140460,
    "tuitionMax": 140460
  },
  {
    "id": "edb_569836000123",
    "name": "基督教國際學校",
    "nameEn": "INTERNATIONAL CHRISTIAN SCHOOL",
    "level": "小學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "沙田區",
    "curriculumV2": [
      "CANADIAN"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 148400,
    "tuitionMax": 148400
  },
  {
    "id": "edb_569836000133",
    "name": "基督教國際學校",
    "nameEn": "INTERNATIONAL CHRISTIAN SCHOOL",
    "level": "中學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "沙田區",
    "curriculumV2": [
      "CANADIAN"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 196600,
    "tuitionMax": 201500
  },
  {
    "id": "edb_542598000211",
    "name": "基督教國際學校－幼稚園",
    "nameEn": "INTERNATIONAL CHRISTIAN SCHOOL - KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "沙田區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 91000,
    "tuitionMax": 148400
  },
  {
    "id": "edb_542598000212",
    "name": "基督教國際學校－幼稚園",
    "nameEn": "INTERNATIONAL CHRISTIAN SCHOOL - KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "沙田區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 91000,
    "tuitionMax": 148400
  },
  {
    "id": "edb_578789000133",
    "name": "INTERNATIONAL COLLEGE HONG KONG (NEW TERRITORIES)",
    "nameEn": "INTERNATIONAL COLLEGE HONG KONG (NEW TERRITORIES)",
    "level": "中學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "北區",
    "curriculumV2": [
      "IB"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 184500,
    "tuitionMax": 204900
  },
  {
    "id": "edb_230944000112",
    "name": "INTERNATIONAL COLLEGE HONG KONG HONG LOK YUEN (KINDERGARTEN SECTION)",
    "nameEn": "INTERNATIONAL COLLEGE HONG KONG HONG LOK YUEN (KINDERGARTEN SECTION)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "大埔區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 25170,
    "tuitionMax": 145110
  },
  {
    "id": "edb_230944000113",
    "name": "INTERNATIONAL COLLEGE HONG KONG HONG LOK YUEN (KINDERGARTEN SECTION)",
    "nameEn": "INTERNATIONAL COLLEGE HONG KONG HONG LOK YUEN (KINDERGARTEN SECTION)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "大埔區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 25170,
    "tuitionMax": 145110
  },
  {
    "id": "edb_230944000111",
    "name": "INTERNATIONAL COLLEGE HONG KONG HONG LOK YUEN (KINDERGARTEN SECTION)",
    "nameEn": "INTERNATIONAL COLLEGE HONG KONG HONG LOK YUEN (KINDERGARTEN SECTION)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "大埔區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 25170,
    "tuitionMax": 145110
  },
  {
    "id": "edb_230979000123",
    "name": "INTERNATIONAL COLLEGE HONG KONG HONG LOK YUEN (PRIMARY SECTION)",
    "nameEn": "INTERNATIONAL COLLEGE HONG KONG HONG LOK YUEN (PRIMARY SECTION)",
    "level": "小學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "大埔區",
    "curriculumV2": [
      "IB"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 145110,
    "tuitionMax": 145110
  },
  {
    "id": "edb_615366000113",
    "name": "INVICTUS KINDERGARTEN",
    "nameEn": "INVICTUS KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "西貢區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_615285000123",
    "name": "INVICTUS SCHOOL",
    "nameEn": "INVICTUS SCHOOL",
    "level": "小學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "西貢區",
    "curriculumV2": [
      "BRITISH"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 114700,
    "tuitionMax": 114700
  },
  {
    "id": "edb_616354000133",
    "name": "INVICTUS SECONDARY SCHOOL",
    "nameEn": "INVICTUS SECONDARY SCHOOL",
    "level": "中學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "東區",
    "curriculumV2": [
      "BRITISH"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 139000,
    "tuitionMax": 141700
  },
  {
    "id": "edb_581119000111",
    "name": "港島兒童蒙特梭利幼稚園",
    "nameEn": "ISLAND CHILDREN'S MONTESSORI KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "灣仔區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_581119000112",
    "name": "港島兒童蒙特梭利幼稚園",
    "nameEn": "ISLAND CHILDREN'S MONTESSORI KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "灣仔區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_607223000111",
    "name": "港島蒙特梭利國際幼稚園",
    "nameEn": "ISLAND MONTESSORI INTERNATIONAL KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "東區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_607223000112",
    "name": "港島蒙特梭利國際幼稚園",
    "nameEn": "ISLAND MONTESSORI INTERNATIONAL KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "東區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_170399000133",
    "name": "ISLAND SCHOOL",
    "nameEn": "ISLAND SCHOOL",
    "level": "中學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "中西區",
    "curriculumV2": [
      "IB"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 159400,
    "tuitionMax": 181100
  },
  {
    "id": "edb_611646000111",
    "name": "意大利國際幼稚園",
    "nameEn": "ITALIAN INTERNATIONAL KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "南區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_611646000113",
    "name": "意大利國際幼稚園",
    "nameEn": "ITALIAN INTERNATIONAL KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "南區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_611646000112",
    "name": "意大利國際幼稚園",
    "nameEn": "ITALIAN INTERNATIONAL KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "南區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_522775000123",
    "name": "JAPANESE INTERNATIONAL SCHOOL",
    "nameEn": "JAPANESE INTERNATIONAL SCHOOL",
    "level": "小學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "大埔區",
    "curriculumV2": [
      "OTHER_INTL"
    ],
    "instructionLanguages": [
      "JAPANESE"
    ],
    "tuitionMin": 140460,
    "tuitionMax": 140460
  },
  {
    "id": "edb_587524000111",
    "name": "晶晶國際幼稚園",
    "nameEn": "JING JING INTERNATIONAL KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "屯門區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_587524000112",
    "name": "晶晶國際幼稚園",
    "nameEn": "JING JING INTERNATIONAL KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "屯門區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_587524000113",
    "name": "晶晶國際幼稚園",
    "nameEn": "JING JING INTERNATIONAL KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "屯門區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_250686000223",
    "name": "賽馬會善樂學校",
    "nameEn": "JOCKEY CLUB SARAH ROE SCHOOL",
    "level": "小學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "九龍城區",
    "curriculumV2": [
      "OTHER_INTL"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 139000,
    "tuitionMax": 181100
  },
  {
    "id": "edb_250686000233",
    "name": "賽馬會善樂學校",
    "nameEn": "JOCKEY CLUB SARAH ROE SCHOOL",
    "level": "中學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "九龍城區",
    "curriculumV2": [
      "OTHER_INTL"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 139000,
    "tuitionMax": 181100
  },
  {
    "id": "edb_615170000112",
    "name": "心怡天地國際幼稚園(屯門)",
    "nameEn": "JOYFUL WORLD INTERNATIONAL KINDERGARTEN (TUEN MUN)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "屯門區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_615170000111",
    "name": "心怡天地國際幼稚園(屯門)",
    "nameEn": "JOYFUL WORLD INTERNATIONAL KINDERGARTEN (TUEN MUN)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "屯門區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_612189000111",
    "name": "心怡天地國際幼稚園(元朗)",
    "nameEn": "JOYFUL WORLD INTERNATIONAL KINDERGARTEN (YUEN LONG)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "元朗區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_612189000112",
    "name": "心怡天地國際幼稚園(元朗)",
    "nameEn": "JOYFUL WORLD INTERNATIONAL KINDERGARTEN (YUEN LONG)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "元朗區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_215406000423",
    "name": "KELLETT SCHOOL",
    "nameEn": "KELLETT SCHOOL",
    "level": "小學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "觀塘區",
    "curriculumV2": [
      "BRITISH"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 214200,
    "tuitionMax": 214200
  },
  {
    "id": "edb_215406000123",
    "name": "KELLETT SCHOOL",
    "nameEn": "KELLETT SCHOOL",
    "level": "小學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "觀塘區",
    "curriculumV2": [
      "BRITISH"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 214200,
    "tuitionMax": 214200
  },
  {
    "id": "edb_215406000433",
    "name": "KELLETT SCHOOL",
    "nameEn": "KELLETT SCHOOL",
    "level": "中學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "觀塘區",
    "curriculumV2": [
      "BRITISH"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 214200,
    "tuitionMax": 214200
  },
  {
    "id": "edb_607703000111",
    "name": "漢迪國際幼稚園",
    "nameEn": "KENDALL INTERNATIONAL PRESCHOOL",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "深水埗區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_607703000112",
    "name": "漢迪國際幼稚園",
    "nameEn": "KENDALL INTERNATIONAL PRESCHOOL",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "深水埗區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_325783000112",
    "name": "漢廸國際幼稚園(港島東)",
    "nameEn": "KENDALL INTERNATIONAL PRESCHOOL (ISLAND EAST)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "東區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_325783000111",
    "name": "漢廸國際幼稚園(港島東)",
    "nameEn": "KENDALL INTERNATIONAL PRESCHOOL (ISLAND EAST)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "東區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_170879000123",
    "name": "KENNEDY SCHOOL",
    "nameEn": "KENNEDY SCHOOL",
    "level": "小學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "南區",
    "curriculumV2": [
      "BRITISH"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 139000,
    "tuitionMax": 139000
  },
  {
    "id": "edb_170917000133",
    "name": "KING GEORGE V SCHOOL",
    "nameEn": "KING GEORGE V SCHOOL",
    "level": "中學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "九龍城區",
    "curriculumV2": [
      "IB"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 159400,
    "tuitionMax": 181100
  },
  {
    "id": "edb_519863000312",
    "name": "京斯敦國際幼稚園",
    "nameEn": "KINGSTON INTERNATIONAL KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "九龍城區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 63800,
    "tuitionMax": 112200
  },
  {
    "id": "edb_519863000311",
    "name": "京斯敦國際幼稚園",
    "nameEn": "KINGSTON INTERNATIONAL KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "九龍城區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 63800,
    "tuitionMax": 112200
  },
  {
    "id": "edb_541915000123",
    "name": "京斯敦國際學校",
    "nameEn": "KINGSTON INTERNATIONAL SCHOOL",
    "level": "小學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "九龍城區",
    "curriculumV2": [
      "OTHER_INTL"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 155000,
    "tuitionMax": 175000
  },
  {
    "id": "edb_216216000113",
    "name": "KOREAN INTERNATIONAL SCHOOL",
    "nameEn": "KOREAN INTERNATIONAL SCHOOL",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "東區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 97100,
    "tuitionMax": 97100
  },
  {
    "id": "edb_216216000123",
    "name": "KOREAN INTERNATIONAL SCHOOL",
    "nameEn": "KOREAN INTERNATIONAL SCHOOL",
    "level": "小學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "東區",
    "curriculumV2": [
      "OTHER_INTL"
    ],
    "instructionLanguages": [
      "ENGLISH",
      "KOREAN"
    ],
    "tuitionMin": 97100,
    "tuitionMax": 122900
  },
  {
    "id": "edb_216216000133",
    "name": "KOREAN INTERNATIONAL SCHOOL",
    "nameEn": "KOREAN INTERNATIONAL SCHOOL",
    "level": "中學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "東區",
    "curriculumV2": [
      "OTHER_INTL"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 137000,
    "tuitionMax": 137000
  },
  {
    "id": "edb_170909000123",
    "name": "KOWLOON JUNIOR SCHOOL",
    "nameEn": "KOWLOON JUNIOR SCHOOL",
    "level": "小學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "九龍城區",
    "curriculumV2": [
      "BRITISH"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 139000,
    "tuitionMax": 139000
  },
  {
    "id": "edb_518620000123",
    "name": "LANTAU INTERNATIONAL SCHOOL",
    "nameEn": "LANTAU INTERNATIONAL SCHOOL",
    "level": "小學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "離島區",
    "curriculumV2": [
      "BRITISH"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 127450,
    "tuitionMax": 214340
  },
  {
    "id": "edb_518620000223",
    "name": "LANTAU INTERNATIONAL SCHOOL",
    "nameEn": "LANTAU INTERNATIONAL SCHOOL",
    "level": "小學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "離島區",
    "curriculumV2": [
      "BRITISH"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 127450,
    "tuitionMax": 214340
  },
  {
    "id": "edb_518620000423",
    "name": "LANTAU INTERNATIONAL SCHOOL",
    "nameEn": "LANTAU INTERNATIONAL SCHOOL",
    "level": "小學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "離島區",
    "curriculumV2": [
      "BRITISH"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 127450,
    "tuitionMax": 214340
  },
  {
    "id": "edb_614904000112",
    "name": "LES PETITS LASCARS FRENCH INTERNATIONAL PRESCHOOL",
    "nameEn": "LES PETITS LASCARS FRENCH INTERNATIONAL PRESCHOOL",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "中西區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_614904000111",
    "name": "LES PETITS LASCARS FRENCH INTERNATIONAL PRESCHOOL",
    "nameEn": "LES PETITS LASCARS FRENCH INTERNATIONAL PRESCHOOL",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "中西區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_614998000111",
    "name": "LES PETITS LASCARS FRENCH INTERNATIONAL PRESCHOOL (TSEUNG KWAN O)",
    "nameEn": "LES PETITS LASCARS FRENCH INTERNATIONAL PRESCHOOL (TSEUNG KWAN O)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "西貢區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_614998000112",
    "name": "LES PETITS LASCARS FRENCH INTERNATIONAL PRESCHOOL (TSEUNG KWAN O)",
    "nameEn": "LES PETITS LASCARS FRENCH INTERNATIONAL PRESCHOOL (TSEUNG KWAN O)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "西貢區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_607592000213",
    "name": "道爾頓幼稚園",
    "nameEn": "LITTLE DALTON KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "灣仔區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_607592000212",
    "name": "道爾頓幼稚園",
    "nameEn": "LITTLE DALTON KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "灣仔區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_607592000211",
    "name": "道爾頓幼稚園",
    "nameEn": "LITTLE DALTON KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "灣仔區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_587877000111",
    "name": "小大嶼山蒙特梭利幼稚園",
    "nameEn": "LITTLE LANTAU MONTESSORI KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "離島區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_214949000513",
    "name": "LYC'EE FRANCAIS INTERNATIONAL (FRENCH INTERNATIONAL SCHOOL)",
    "nameEn": "LYC'EE FRANCAIS INTERNATIONAL (FRENCH INTERNATIONAL SCHOOL)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "東區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 152239,
    "tuitionMax": 209230
  },
  {
    "id": "edb_214949000713",
    "name": "LYC'EE FRANCAIS INTERNATIONAL (FRENCH INTERNATIONAL SCHOOL)",
    "nameEn": "LYC'EE FRANCAIS INTERNATIONAL (FRENCH INTERNATIONAL SCHOOL)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "東區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 152239,
    "tuitionMax": 209230
  },
  {
    "id": "edb_214949000523",
    "name": "LYC'EE FRANCAIS INTERNATIONAL (FRENCH INTERNATIONAL SCHOOL)",
    "nameEn": "LYC'EE FRANCAIS INTERNATIONAL (FRENCH INTERNATIONAL SCHOOL)",
    "level": "小學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "東區",
    "curriculumV2": [
      "OTHER_INTL"
    ],
    "instructionLanguages": [
      "ENGLISH",
      "FRENCH"
    ],
    "tuitionMin": 152239,
    "tuitionMax": 209230
  },
  {
    "id": "edb_214949000123",
    "name": "LYC'EE FRANCAIS INTERNATIONAL (FRENCH INTERNATIONAL SCHOOL)",
    "nameEn": "LYC'EE FRANCAIS INTERNATIONAL (FRENCH INTERNATIONAL SCHOOL)",
    "level": "小學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "東區",
    "curriculumV2": [
      "OTHER_INTL"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 152239,
    "tuitionMax": 209230
  },
  {
    "id": "edb_214949000723",
    "name": "LYC'EE FRANCAIS INTERNATIONAL (FRENCH INTERNATIONAL SCHOOL)",
    "nameEn": "LYC'EE FRANCAIS INTERNATIONAL (FRENCH INTERNATIONAL SCHOOL)",
    "level": "小學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "東區",
    "curriculumV2": [
      "OTHER_INTL"
    ],
    "instructionLanguages": [
      "ENGLISH",
      "FRENCH"
    ],
    "tuitionMin": 152239,
    "tuitionMax": 209230
  },
  {
    "id": "edb_214949000433",
    "name": "LYC'EE FRANCAIS INTERNATIONAL (FRENCH INTERNATIONAL SCHOOL)",
    "nameEn": "LYC'EE FRANCAIS INTERNATIONAL (FRENCH INTERNATIONAL SCHOOL)",
    "level": "中學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "東區",
    "curriculumV2": [
      "OTHER_INTL"
    ],
    "instructionLanguages": [
      "ENGLISH",
      "FRENCH"
    ],
    "tuitionMin": 152239,
    "tuitionMax": 209230
  },
  {
    "id": "edb_214949000733",
    "name": "LYC'EE FRANCAIS INTERNATIONAL (FRENCH INTERNATIONAL SCHOOL)",
    "nameEn": "LYC'EE FRANCAIS INTERNATIONAL (FRENCH INTERNATIONAL SCHOOL)",
    "level": "中學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "東區",
    "curriculumV2": [
      "OTHER_INTL"
    ],
    "instructionLanguages": [
      "ENGLISH",
      "FRENCH"
    ],
    "tuitionMin": 152239,
    "tuitionMax": 209230
  },
  {
    "id": "edb_610623000111",
    "name": "瑪歌瑞特國際幼稚園",
    "nameEn": "MAGART INTERNATIONAL KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "九龍城區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_610623000113",
    "name": "瑪歌瑞特國際幼稚園",
    "nameEn": "MAGART INTERNATIONAL KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "九龍城區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_610623000112",
    "name": "瑪歌瑞特國際幼稚園",
    "nameEn": "MAGART INTERNATIONAL KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "九龍城區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_566241000113",
    "name": "瑪歌瑞特國際幼稚園(粉嶺)",
    "nameEn": "MAGART INTERNATIONAL KINDERGARTEN (FANLING)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "北區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_566241000111",
    "name": "瑪歌瑞特國際幼稚園(粉嶺)",
    "nameEn": "MAGART INTERNATIONAL KINDERGARTEN (FANLING)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "北區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_566241000112",
    "name": "瑪歌瑞特國際幼稚園(粉嶺)",
    "nameEn": "MAGART INTERNATIONAL KINDERGARTEN (FANLING)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "北區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_215767000111",
    "name": "瑪歌瑞特國際幼稚園(康怡)",
    "nameEn": "MAGART INTERNATIONAL KINDERGARTEN (KORNHILL)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "東區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_215767000112",
    "name": "瑪歌瑞特國際幼稚園(康怡)",
    "nameEn": "MAGART INTERNATIONAL KINDERGARTEN (KORNHILL)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "東區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_606766000123",
    "name": "香港墨爾文國際學校",
    "nameEn": "MALVERN COLLEGE HONG KONG",
    "level": "小學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "大埔區",
    "curriculumV2": [
      "BRITISH"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 198860,
    "tuitionMax": 198860
  },
  {
    "id": "edb_606766000133",
    "name": "香港墨爾文國際學校",
    "nameEn": "MALVERN COLLEGE HONG KONG",
    "level": "中學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "大埔區",
    "curriculumV2": [
      "BRITISH"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 226210,
    "tuitionMax": 226210
  },
  {
    "id": "edb_613665000111",
    "name": "楓葉小熊加拿大國際幼稚園",
    "nameEn": "MAPLE BEAR CANADIAN INTERNATIONAL KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "西貢區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_613665000113",
    "name": "楓葉小熊加拿大國際幼稚園",
    "nameEn": "MAPLE BEAR CANADIAN INTERNATIONAL KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "西貢區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_613665000112",
    "name": "楓葉小熊加拿大國際幼稚園",
    "nameEn": "MAPLE BEAR CANADIAN INTERNATIONAL KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "西貢區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_616311000112",
    "name": "楓葉小熊加拿大國際幼稚園(康城)",
    "nameEn": "MAPLE BEAR CANADIAN INTERNATIONAL KINDERGARTEN (LOHAS)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "西貢區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_616311000111",
    "name": "楓葉小熊加拿大國際幼稚園(康城)",
    "nameEn": "MAPLE BEAR CANADIAN INTERNATIONAL KINDERGARTEN (LOHAS)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "西貢區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_593788000112",
    "name": "楓葉小熊加拿大國際幼稚園(油塘)",
    "nameEn": "MAPLE BEAR CANADIAN INTERNATIONAL KINDERGARTEN (YAU TONG)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "觀塘區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_593788000111",
    "name": "楓葉小熊加拿大國際幼稚園(油塘)",
    "nameEn": "MAPLE BEAR CANADIAN INTERNATIONAL KINDERGARTEN (YAU TONG)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "觀塘區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_600334000211",
    "name": "善行國際幼稚園",
    "nameEn": "MASS INTERNATIONAL PRESCHOOL",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "灣仔區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_600334000212",
    "name": "善行國際幼稚園",
    "nameEn": "MASS INTERNATIONAL PRESCHOOL",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "灣仔區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_603643000111",
    "name": "奧恩國際幼稚園",
    "nameEn": "MIGHTY OAKS INTERNATIONAL KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "中西區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_603643000112",
    "name": "奧恩國際幼稚園",
    "nameEn": "MIGHTY OAKS INTERNATIONAL KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "中西區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_566977000111",
    "name": "明慧國際幼稚園",
    "nameEn": "MING WAI INTERNATIONAL KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "東區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_566977000112",
    "name": "明慧國際幼稚園",
    "nameEn": "MING WAI INTERNATIONAL KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "東區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_566977000113",
    "name": "明慧國際幼稚園",
    "nameEn": "MING WAI INTERNATIONAL KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "東區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_567329000112",
    "name": "明慧國際幼稚園（北角分校）",
    "nameEn": "MING WAI INTERNATIONAL KINDERGARTEN (NORTH POINT BRANCH)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "東區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_567329000111",
    "name": "明慧國際幼稚園（北角分校）",
    "nameEn": "MING WAI INTERNATIONAL KINDERGARTEN (NORTH POINT BRANCH)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "東區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_567329000113",
    "name": "明慧國際幼稚園（北角分校）",
    "nameEn": "MING WAI INTERNATIONAL KINDERGARTEN (NORTH POINT BRANCH)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "東區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_583421000112",
    "name": "明慧國際幼稚園(太子分校)",
    "nameEn": "MING WAI INTERNATIONAL KINDERGARTEN (PRINCE EDWARD BRANCH)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "油尖旺區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_583421000111",
    "name": "明慧國際幼稚園(太子分校)",
    "nameEn": "MING WAI INTERNATIONAL KINDERGARTEN (PRINCE EDWARD BRANCH)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "油尖旺區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_583421000113",
    "name": "明慧國際幼稚園(太子分校)",
    "nameEn": "MING WAI INTERNATIONAL KINDERGARTEN (PRINCE EDWARD BRANCH)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "油尖旺區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_567027000111",
    "name": "明雅國際幼兒學校",
    "nameEn": "MINK INTERNATIONAL PRE-SCHOOL",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "大埔區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_567027000112",
    "name": "明雅國際幼兒學校",
    "nameEn": "MINK INTERNATIONAL PRE-SCHOOL",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "大埔區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_567027000113",
    "name": "明雅國際幼兒學校",
    "nameEn": "MINK INTERNATIONAL PRE-SCHOOL",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "大埔區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_565466000111",
    "name": "MONTESSORI FOR CHILDREN (NURSERY)",
    "nameEn": "MONTESSORI FOR CHILDREN (NURSERY)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "南區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_565466000112",
    "name": "MONTESSORI FOR CHILDREN (NURSERY)",
    "nameEn": "MONTESSORI FOR CHILDREN (NURSERY)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "南區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_601721000112",
    "name": "懋柏禮國際幼稚園",
    "nameEn": "MULBERRY HOUSE INTERNATIONAL KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "大埔區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_601721000111",
    "name": "懋柏禮國際幼稚園",
    "nameEn": "MULBERRY HOUSE INTERNATIONAL KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "大埔區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_578053000112",
    "name": "MULBERRY HOUSE INTERNATIONAL KINDERGARTEN SOUTHSIDE",
    "nameEn": "MULBERRY HOUSE INTERNATIONAL KINDERGARTEN SOUTHSIDE",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "南區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_578053000111",
    "name": "MULBERRY HOUSE INTERNATIONAL KINDERGARTEN SOUTHSIDE",
    "nameEn": "MULBERRY HOUSE INTERNATIONAL KINDERGARTEN SOUTHSIDE",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "南區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_598054000111",
    "name": "童樂天國際幼稚園",
    "nameEn": "MULBERRY TREE INTERNATIONAL KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "沙田區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_598054000112",
    "name": "童樂天國際幼稚園",
    "nameEn": "MULBERRY TREE INTERNATIONAL KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "沙田區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_601250000111",
    "name": "麥克萊國際幼稚園",
    "nameEn": "MYNORS INTERNATIONAL KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "北區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_601250000112",
    "name": "麥克萊國際幼稚園",
    "nameEn": "MYNORS INTERNATIONAL KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "北區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_601250000113",
    "name": "麥克萊國際幼稚園",
    "nameEn": "MYNORS INTERNATIONAL KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "北區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_608475000112",
    "name": "NORD ANGLIA INTERNATIONAL PRE-SCHOOL (SAI KUNG)",
    "nameEn": "NORD ANGLIA INTERNATIONAL PRE-SCHOOL (SAI KUNG)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "西貢區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_608475000111",
    "name": "NORD ANGLIA INTERNATIONAL PRE-SCHOOL (SAI KUNG)",
    "nameEn": "NORD ANGLIA INTERNATIONAL PRE-SCHOOL (SAI KUNG)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "西貢區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_598356000223",
    "name": "NORD ANGLIA INTERNATIONAL SCHOOL, HONG KONG",
    "nameEn": "NORD ANGLIA INTERNATIONAL SCHOOL, HONG KONG",
    "level": "小學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "觀塘區",
    "curriculumV2": [
      "BRITISH"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 184380,
    "tuitionMax": 205700
  },
  {
    "id": "edb_598356000333",
    "name": "NORD ANGLIA INTERNATIONAL SCHOOL, HONG KONG",
    "nameEn": "NORD ANGLIA INTERNATIONAL SCHOOL, HONG KONG",
    "level": "中學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "觀塘區",
    "curriculumV2": [
      "BRITISH"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 212360,
    "tuitionMax": 214340
  },
  {
    "id": "edb_215520000111",
    "name": "NORWEGIAN INTERNATIONAL SCHOOL",
    "nameEn": "NORWEGIAN INTERNATIONAL SCHOOL",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "大埔區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 80850,
    "tuitionMax": 80850
  },
  {
    "id": "edb_215520000113",
    "name": "NORWEGIAN INTERNATIONAL SCHOOL",
    "nameEn": "NORWEGIAN INTERNATIONAL SCHOOL",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "大埔區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 80850,
    "tuitionMax": 80850
  },
  {
    "id": "edb_215520000112",
    "name": "NORWEGIAN INTERNATIONAL SCHOOL",
    "nameEn": "NORWEGIAN INTERNATIONAL SCHOOL",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "大埔區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 80850,
    "tuitionMax": 80850
  },
  {
    "id": "edb_215520000123",
    "name": "NORWEGIAN INTERNATIONAL SCHOOL",
    "nameEn": "NORWEGIAN INTERNATIONAL SCHOOL",
    "level": "小學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "大埔區",
    "curriculumV2": [
      "OTHER_INTL"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 133200,
    "tuitionMax": 133200
  },
  {
    "id": "edb_215937000112",
    "name": "栢基國際幼稚園",
    "nameEn": "PARKVIEW INTERNATIONAL PRE-SCHOOL",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "南區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_215937000111",
    "name": "栢基國際幼稚園",
    "nameEn": "PARKVIEW INTERNATIONAL PRE-SCHOOL",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "南區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_571490000113",
    "name": "栢基國際幼稚園(九龍)",
    "nameEn": "PARKVIEW INTERNATIONAL PRE-SCHOOL (KOWLOON)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "油尖旺區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_571490000111",
    "name": "栢基國際幼稚園(九龍)",
    "nameEn": "PARKVIEW INTERNATIONAL PRE-SCHOOL (KOWLOON)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "油尖旺區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_571490000112",
    "name": "栢基國際幼稚園(九龍)",
    "nameEn": "PARKVIEW INTERNATIONAL PRE-SCHOOL (KOWLOON)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "油尖旺區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_170860000123",
    "name": "PEAK SCHOOL",
    "nameEn": "PEAK SCHOOL",
    "level": "小學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "中西區",
    "curriculumV2": [
      "BRITISH"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 139000,
    "tuitionMax": 139000
  },
  {
    "id": "edb_613916000112",
    "name": "培僑國際幼稚園",
    "nameEn": "PUI KIU INTERNATIONAL KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "沙田區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_613916000111",
    "name": "培僑國際幼稚園",
    "nameEn": "PUI KIU INTERNATIONAL KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "沙田區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_622389000112",
    "name": "培僑國際幼稚園(碧濤花園)",
    "nameEn": "PUI KIU INTERNATIONAL KINDERGARTEN (PICTORIAL GARDEN)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "沙田區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_622389000113",
    "name": "培僑國際幼稚園(碧濤花園)",
    "nameEn": "PUI KIU INTERNATIONAL KINDERGARTEN (PICTORIAL GARDEN)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "沙田區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_622389000111",
    "name": "培僑國際幼稚園(碧濤花園)",
    "nameEn": "PUI KIU INTERNATIONAL KINDERGARTEN (PICTORIAL GARDEN)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "沙田區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_170895000123",
    "name": "鰂魚涌小學",
    "nameEn": "QUARRY BAY SCHOOL",
    "level": "小學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "東區",
    "curriculumV2": [
      "BRITISH"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 139000,
    "tuitionMax": 139000
  },
  {
    "id": "edb_567485000123",
    "name": "啓新書院",
    "nameEn": "RENAISSANCE COLLEGE",
    "level": "小學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "沙田區",
    "curriculumV2": [
      "IB"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 145800,
    "tuitionMax": 145800
  },
  {
    "id": "edb_567485000133",
    "name": "啓新書院",
    "nameEn": "RENAISSANCE COLLEGE",
    "level": "中學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "沙田區",
    "curriculumV2": [
      "IB"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 175700,
    "tuitionMax": 189900
  },
  {
    "id": "edb_597538000211",
    "name": "聖姬莉國際幼稚園",
    "nameEn": "SAINT BRIGIT INTERNATIONAL KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "九龍城區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_597538000212",
    "name": "聖姬莉國際幼稚園",
    "nameEn": "SAINT BRIGIT INTERNATIONAL KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "九龍城區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_534579000123",
    "name": "弘爵國際學校",
    "nameEn": "SEAR ROGERS INTERNATIONAL SCHOOL",
    "level": "小學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "荃灣區",
    "curriculumV2": [
      "IB"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_534579000133",
    "name": "弘爵國際學校",
    "nameEn": "SEAR ROGERS INTERNATIONAL SCHOOL",
    "level": "中學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "荃灣區",
    "curriculumV2": [
      "IB"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_190314000233",
    "name": "SHATIN COLLEGE",
    "nameEn": "SHATIN COLLEGE",
    "level": "中學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "沙田區",
    "curriculumV2": [
      "IB"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 159400,
    "tuitionMax": 181100
  },
  {
    "id": "edb_190543000123",
    "name": "SHATIN JUNIOR SCHOOL",
    "nameEn": "SHATIN JUNIOR SCHOOL",
    "level": "小學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "沙田區",
    "curriculumV2": [
      "BRITISH"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 139000,
    "tuitionMax": 139000
  },
  {
    "id": "edb_607525000123",
    "name": "思貝禮國際學校",
    "nameEn": "SHREWSBURY INTERNATIONAL SCHOOL HONG KONG",
    "level": "小學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "西貢區",
    "curriculumV2": [
      "BRITISH"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 143500,
    "tuitionMax": 177000
  },
  {
    "id": "edb_216003000211",
    "name": "新加坡國際學校",
    "nameEn": "SINGAPORE INTERNATIONAL SCHOOL (HONG KONG)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "南區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 123000,
    "tuitionMax": 123000
  },
  {
    "id": "edb_216003000212",
    "name": "新加坡國際學校",
    "nameEn": "SINGAPORE INTERNATIONAL SCHOOL (HONG KONG)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "南區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 123000,
    "tuitionMax": 123000
  },
  {
    "id": "edb_216003000223",
    "name": "新加坡國際學校",
    "nameEn": "SINGAPORE INTERNATIONAL SCHOOL (HONG KONG)",
    "level": "小學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "南區",
    "curriculumV2": [
      "OTHER_INTL"
    ],
    "instructionLanguages": [
      "ENGLISH",
      "PUTONGHUA"
    ],
    "tuitionMin": 181100,
    "tuitionMax": 181100
  },
  {
    "id": "edb_216003000433",
    "name": "新加坡國際學校",
    "nameEn": "SINGAPORE INTERNATIONAL SCHOOL (HONG KONG)",
    "level": "中學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "南區",
    "curriculumV2": [
      "OTHER_INTL"
    ],
    "instructionLanguages": [
      "ENGLISH",
      "PUTONGHUA"
    ],
    "tuitionMin": 228800,
    "tuitionMax": 274900
  },
  {
    "id": "edb_609498000223",
    "name": "香港西班牙學校",
    "nameEn": "SPANISH SCHOOL OF HONG KONG",
    "level": "小學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "大埔區",
    "curriculumV2": [
      "OTHER_INTL"
    ],
    "instructionLanguages": [
      "SPANISH",
      "ENGLISH",
      "CANTONESE"
    ],
    "tuitionMin": 85000,
    "tuitionMax": 125000
  },
  {
    "id": "edb_609498000123",
    "name": "香港西班牙學校",
    "nameEn": "SPANISH SCHOOL OF HONG KONG",
    "level": "小學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "大埔區",
    "curriculumV2": [
      "OTHER_INTL"
    ],
    "instructionLanguages": [
      "SPANISH",
      "ENGLISH",
      "CANTONESE"
    ],
    "tuitionMin": 85000,
    "tuitionMax": 125000
  },
  {
    "id": "edb_609498000133",
    "name": "香港西班牙學校",
    "nameEn": "SPANISH SCHOOL OF HONG KONG",
    "level": "中學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "大埔區",
    "curriculumV2": [
      "OTHER_INTL"
    ],
    "instructionLanguages": [
      "SPANISH",
      "ENGLISH",
      "CANTONESE"
    ],
    "tuitionMin": 128000,
    "tuitionMax": 138000
  },
  {
    "id": "edb_609498000233",
    "name": "香港西班牙學校",
    "nameEn": "SPANISH SCHOOL OF HONG KONG",
    "level": "中學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "大埔區",
    "curriculumV2": [
      "OTHER_INTL"
    ],
    "instructionLanguages": [
      "SPANISH",
      "ENGLISH",
      "CANTONESE"
    ],
    "tuitionMin": 128000,
    "tuitionMax": 138000
  },
  {
    "id": "edb_215120000111",
    "name": "國際英文幼稚園",
    "nameEn": "ST. CATHERINE'S INTERNATIONAL KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "九龍城區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_215120000211",
    "name": "國際英文幼稚園",
    "nameEn": "ST. CATHERINE'S INTERNATIONAL KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "九龍城區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_215120000212",
    "name": "國際英文幼稚園",
    "nameEn": "ST. CATHERINE'S INTERNATIONAL KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "九龍城區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_215120000112",
    "name": "國際英文幼稚園",
    "nameEn": "ST. CATHERINE'S INTERNATIONAL KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "九龍城區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_605638000123",
    "name": "STAMFORD AMERICAN SCHOOL HONG KONG",
    "nameEn": "STAMFORD AMERICAN SCHOOL HONG KONG",
    "level": "小學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "九龍城區",
    "curriculumV2": [
      "AMERICAN"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 217100,
    "tuitionMax": 220500
  },
  {
    "id": "edb_605638000133",
    "name": "STAMFORD AMERICAN SCHOOL HONG KONG",
    "nameEn": "STAMFORD AMERICAN SCHOOL HONG KONG",
    "level": "中學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "九龍城區",
    "curriculumV2": [
      "AMERICAN"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 239900,
    "tuitionMax": 264000
  },
  {
    "id": "edb_626864000133",
    "name": "STAMFORD AMERICAN SCHOOL HONG KONG (WEST KOWLOON)",
    "nameEn": "STAMFORD AMERICAN SCHOOL HONG KONG (WEST KOWLOON)",
    "level": "中學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "油尖旺區",
    "curriculumV2": [
      "AMERICAN"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 239900,
    "tuitionMax": 264000
  },
  {
    "id": "edb_548430000611",
    "name": "蒙特梭利國際學校",
    "nameEn": "THE INTERNATIONAL MONTESSORI SCHOOL - AN IMEF SCHOOL",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "南區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 143000,
    "tuitionMax": 206500
  },
  {
    "id": "edb_548430000311",
    "name": "蒙特梭利國際學校",
    "nameEn": "THE INTERNATIONAL MONTESSORI SCHOOL - AN IMEF SCHOOL",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "南區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_548430000312",
    "name": "蒙特梭利國際學校",
    "nameEn": "THE INTERNATIONAL MONTESSORI SCHOOL - AN IMEF SCHOOL",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "南區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_548430000711",
    "name": "蒙特梭利國際學校",
    "nameEn": "THE INTERNATIONAL MONTESSORI SCHOOL - AN IMEF SCHOOL",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "南區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_548430000411",
    "name": "蒙特梭利國際學校",
    "nameEn": "THE INTERNATIONAL MONTESSORI SCHOOL - AN IMEF SCHOOL",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "南區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_548430000412",
    "name": "蒙特梭利國際學校",
    "nameEn": "THE INTERNATIONAL MONTESSORI SCHOOL - AN IMEF SCHOOL",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "南區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_548430000623",
    "name": "蒙特梭利國際學校",
    "nameEn": "THE INTERNATIONAL MONTESSORI SCHOOL - AN IMEF SCHOOL",
    "level": "小學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "南區",
    "curriculumV2": [
      "OTHER_INTL"
    ],
    "instructionLanguages": [
      "ENGLISH",
      "PUTONGHUA"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_548430000633",
    "name": "蒙特梭利國際學校",
    "nameEn": "THE INTERNATIONAL MONTESSORI SCHOOL - AN IMEF SCHOOL",
    "level": "中學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "南區",
    "curriculumV2": [
      "OTHER_INTL"
    ],
    "instructionLanguages": [
      "ENGLISH",
      "PUTONGHUA"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_170836000133",
    "name": "THE SOUTH ISLAND SCHOOL",
    "nameEn": "THE SOUTH ISLAND SCHOOL",
    "level": "中學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "南區",
    "curriculumV2": [
      "IB"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 159400,
    "tuitionMax": 181100
  },
  {
    "id": "edb_216267000111",
    "name": "朗思國際幼稚園",
    "nameEn": "THINK INTERNATIONAL KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "觀塘區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_216267000113",
    "name": "朗思國際幼稚園",
    "nameEn": "THINK INTERNATIONAL KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "觀塘區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_216267000112",
    "name": "朗思國際幼稚園",
    "nameEn": "THINK INTERNATIONAL KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "觀塘區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_533360000212",
    "name": "朗思國際幼稚園（馬鞍山）",
    "nameEn": "THINK INTERNATIONAL KINDERGARTEN (MA ON SHAN)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "沙田區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_533360000211",
    "name": "朗思國際幼稚園（馬鞍山）",
    "nameEn": "THINK INTERNATIONAL KINDERGARTEN (MA ON SHAN)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "沙田區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_533360000213",
    "name": "朗思國際幼稚園（馬鞍山）",
    "nameEn": "THINK INTERNATIONAL KINDERGARTEN (MA ON SHAN)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "沙田區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_612782000113",
    "name": "朗思國際幼稚園(南昌)",
    "nameEn": "THINK INTERNATIONAL KINDERGARTEN (NAM CHEONG)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "深水埗區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_612782000111",
    "name": "朗思國際幼稚園(南昌)",
    "nameEn": "THINK INTERNATIONAL KINDERGARTEN (NAM CHEONG)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "深水埗區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_612782000112",
    "name": "朗思國際幼稚園(南昌)",
    "nameEn": "THINK INTERNATIONAL KINDERGARTEN (NAM CHEONG)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "深水埗區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_602000000113",
    "name": "德怡國際幼稚園(元朗)",
    "nameEn": "TOPKIDS INTERNATIONAL KINDERGARTEN (YUEN LONG)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "元朗區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_602000000112",
    "name": "德怡國際幼稚園（元朗）",
    "nameEn": "TOPKIDS INTERNATIONAL KINDERGARTEN (YUEN LONG)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "元朗區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_602000000111",
    "name": "德怡國際幼稚園（元朗）",
    "nameEn": "TOPKIDS INTERNATIONAL KINDERGARTEN (YUEN LONG)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "元朗區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_575852000112",
    "name": "多多寶馬山國際幼稚園",
    "nameEn": "TUTOR TIME BRAEMAR HILL INTERNATIONAL KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "東區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_575852000111",
    "name": "多多寶馬山國際幼稚園",
    "nameEn": "TUTOR TIME BRAEMAR HILL INTERNATIONAL KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "東區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_542504000111",
    "name": "多多國際幼稚園（九龍塘）",
    "nameEn": "TUTOR TIME INTERNATIONAL KINDERGARTEN (KOWLOON TONG)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "九龍城區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_542504000112",
    "name": "多多國際幼稚園（九龍塘）",
    "nameEn": "TUTOR TIME INTERNATIONAL KINDERGARTEN (KOWLOON TONG)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "九龍城區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_593133000111",
    "name": "多多國際幼稚園（半山）",
    "nameEn": "TUTOR TIME INTERNATIONAL KINDERGARTEN (MID LEVELS)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "中西區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_593133000112",
    "name": "多多國際幼稚園（半山）",
    "nameEn": "TUTOR TIME INTERNATIONAL KINDERGARTEN (MID LEVELS)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "中西區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_605794000111",
    "name": "多多國際幼稚園（形點）",
    "nameEn": "TUTOR TIME INTERNATIONAL KINDERGARTEN (YOHO)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "元朗區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_605794000112",
    "name": "多多國際幼稚園（形點）",
    "nameEn": "TUTOR TIME INTERNATIONAL KINDERGARTEN (YOHO)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "元朗區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_618039000112",
    "name": "維多利亞(何文田)國際幼稚園",
    "nameEn": "VICTORIA (HOMANTIN) INTERNATIONAL KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "九龍城區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 105280,
    "tuitionMax": 206510
  },
  {
    "id": "edb_618039000111",
    "name": "維多利亞(何文田)國際幼稚園",
    "nameEn": "VICTORIA (HOMANTIN) INTERNATIONAL KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "九龍城區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 105280,
    "tuitionMax": 206510
  },
  {
    "id": "edb_566900000112",
    "name": "維多利亞（何文田）國際幼兒園",
    "nameEn": "VICTORIA (HOMANTIN) INTERNATIONAL NURSERY",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "九龍城區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 105280,
    "tuitionMax": 206510
  },
  {
    "id": "edb_566900000113",
    "name": "維多利亞（何文田）國際幼兒園",
    "nameEn": "VICTORIA (HOMANTIN) INTERNATIONAL NURSERY",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "九龍城區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 105280,
    "tuitionMax": 206510
  },
  {
    "id": "edb_566900000111",
    "name": "維多利亞（何文田）國際幼兒園",
    "nameEn": "VICTORIA (HOMANTIN) INTERNATIONAL NURSERY",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "九龍城區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 105280,
    "tuitionMax": 206510
  },
  {
    "id": "edb_619850000111",
    "name": "維多利亞(海之戀)國際幼稚園",
    "nameEn": "VICTORIA (OCEAN PRIDE) INTERNATIONAL KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "荃灣區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 102400,
    "tuitionMax": 127919
  },
  {
    "id": "edb_619850000112",
    "name": "維多利亞(海之戀)國際幼稚園",
    "nameEn": "VICTORIA (OCEAN PRIDE) INTERNATIONAL KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "荃灣區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 102400,
    "tuitionMax": 127919
  },
  {
    "id": "edb_216194000111",
    "name": "維多利亞（海怡）國際幼稚園",
    "nameEn": "VICTORIA (SOUTH HORIZONS) INTERNATIONAL KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "南區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 110520,
    "tuitionMax": 207140
  },
  {
    "id": "edb_216194000113",
    "name": "維多利亞（海怡）國際幼稚園",
    "nameEn": "VICTORIA (SOUTH HORIZONS) INTERNATIONAL KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "南區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 110520,
    "tuitionMax": 207140
  },
  {
    "id": "edb_216194000112",
    "name": "維多利亞（海怡）國際幼稚園",
    "nameEn": "VICTORIA (SOUTH HORIZONS) INTERNATIONAL KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "南區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 110520,
    "tuitionMax": 207140
  },
  {
    "id": "edb_560138000223",
    "name": "滬江維多利亞學校",
    "nameEn": "VICTORIA SHANGHAI ACADEMY",
    "level": "小學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "南區",
    "curriculumV2": [
      "IB"
    ],
    "instructionLanguages": [
      "ENGLISH",
      "PUTONGHUA"
    ],
    "tuitionMin": 181200,
    "tuitionMax": 200700
  },
  {
    "id": "edb_560138000233",
    "name": "滬江維多利亞學校",
    "nameEn": "VICTORIA SHANGHAI ACADEMY",
    "level": "中學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "南區",
    "curriculumV2": [
      "IB"
    ],
    "instructionLanguages": [
      "ENGLISH",
      "PUTONGHUA"
    ],
    "tuitionMin": 203700,
    "tuitionMax": 255600
  },
  {
    "id": "edb_590401000111",
    "name": "宏廣國際幼稚園",
    "nameEn": "WELLCOME INTERNATIONAL KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "屯門區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_590401000113",
    "name": "宏廣國際幼稚園",
    "nameEn": "WELLCOME INTERNATIONAL KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "屯門區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_590401000112",
    "name": "宏廣國際幼稚園",
    "nameEn": "WELLCOME INTERNATIONAL KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "屯門區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_170992000133",
    "name": "WEST ISLAND SCHOOL",
    "nameEn": "WEST ISLAND SCHOOL",
    "level": "中學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "南區",
    "curriculumV2": [
      "IB"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 159400,
    "tuitionMax": 181100
  },
  {
    "id": "edb_607215000111",
    "name": "WILDERNESS INTERNATIONAL KINDERGARTEN",
    "nameEn": "WILDERNESS INTERNATIONAL KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "中西區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_607215000112",
    "name": "WILDERNESS INTERNATIONAL KINDERGARTEN",
    "nameEn": "WILDERNESS INTERNATIONAL KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "港島",
    "district18": "中西區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_566128000111",
    "name": "耀中國際幼稚園（根德道）",
    "nameEn": "YEW CHUNG INTERNATIONAL CHILDREN'S HOUSE (KENT ROAD)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "九龍城區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_566128000113",
    "name": "耀中國際幼稚園（根德道）",
    "nameEn": "YEW CHUNG INTERNATIONAL CHILDREN'S HOUSE (KENT ROAD)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "九龍城區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_566128000112",
    "name": "耀中國際幼稚園（根德道）",
    "nameEn": "YEW CHUNG INTERNATIONAL CHILDREN'S HOUSE (KENT ROAD)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "九龍城區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_566110000113",
    "name": "耀中國際幼稚園（窩打老道）",
    "nameEn": "YEW CHUNG INTERNATIONAL CHILDREN'S HOUSE (WATERLOO ROAD)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "九龍城區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_613517000111",
    "name": "耀中國際幼稚園(將軍澳)",
    "nameEn": "YEW CHUNG INTERNATIONAL KINDERGARTEN (TSEUNG KWAN O)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "西貢區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_613517000112",
    "name": "耀中國際幼稚園(將軍澳)",
    "nameEn": "YEW CHUNG INTERNATIONAL KINDERGARTEN (TSEUNG KWAN O)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "西貢區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_613517000113",
    "name": "耀中國際幼稚園(將軍澳)",
    "nameEn": "YEW CHUNG INTERNATIONAL KINDERGARTEN (TSEUNG KWAN O)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "西貢區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_325147000611",
    "name": "耀中國際學校",
    "nameEn": "YEW CHUNG INTERNATIONAL SCHOOL",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "九龍城區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 134728,
    "tuitionMax": 249216
  },
  {
    "id": "edb_325147000612",
    "name": "耀中國際學校",
    "nameEn": "YEW CHUNG INTERNATIONAL SCHOOL",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "九龍城區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 134728,
    "tuitionMax": 249216
  },
  {
    "id": "edb_325147000613",
    "name": "耀中國際學校",
    "nameEn": "YEW CHUNG INTERNATIONAL SCHOOL",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "九龍城區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 134728,
    "tuitionMax": 249216
  },
  {
    "id": "edb_325147000223",
    "name": "耀中國際學校",
    "nameEn": "YEW CHUNG INTERNATIONAL SCHOOL",
    "level": "小學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "九龍城區",
    "curriculumV2": [
      "IB"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 265420,
    "tuitionMax": 265420
  },
  {
    "id": "edb_325147000623",
    "name": "耀中國際學校",
    "nameEn": "YEW CHUNG INTERNATIONAL SCHOOL",
    "level": "小學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "九龍城區",
    "curriculumV2": [
      "IB"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 265420,
    "tuitionMax": 265420
  },
  {
    "id": "edb_325147000423",
    "name": "耀中國際學校",
    "nameEn": "YEW CHUNG INTERNATIONAL SCHOOL",
    "level": "小學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "九龍城區",
    "curriculumV2": [
      "IB"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 265420,
    "tuitionMax": 265420
  },
  {
    "id": "edb_567450000133",
    "name": "耀中國際學校（中學）",
    "nameEn": "YEW CHUNG INTERNATIONAL SCHOOL - SECONDARY",
    "level": "中學",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "九龍城區",
    "curriculumV2": [
      "IB"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 266040,
    "tuitionMax": 272140
  },
  {
    "id": "edb_216178000111",
    "name": "港青基信國際幼稚園",
    "nameEn": "YMCA OF HONG KONG CHRISTIAN INTERNATIONAL KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "油尖旺區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 71220,
    "tuitionMax": 125480
  },
  {
    "id": "edb_216178000113",
    "name": "港青基信國際幼稚園",
    "nameEn": "YMCA OF HONG KONG CHRISTIAN INTERNATIONAL KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "油尖旺區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 71220,
    "tuitionMax": 125480
  },
  {
    "id": "edb_216178000112",
    "name": "港青基信國際幼稚園",
    "nameEn": "YMCA OF HONG KONG CHRISTIAN INTERNATIONAL KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "油尖旺區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 71220,
    "tuitionMax": 125480
  },
  {
    "id": "edb_581852000111",
    "name": "約克國際幼稚園",
    "nameEn": "YORK INTERNATIONAL KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "九龍城區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_581852000112",
    "name": "約克國際幼稚園",
    "nameEn": "YORK INTERNATIONAL KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "九龍城區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_581852000311",
    "name": "約克國際幼稚園",
    "nameEn": "YORK INTERNATIONAL KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "九龍城區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_581852000312",
    "name": "約克國際幼稚園",
    "nameEn": "YORK INTERNATIONAL KINDERGARTEN",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "九龍城區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_578479000111",
    "name": "YORK INTERNATIONAL PRE-SCHOOL",
    "nameEn": "YORK INTERNATIONAL PRE-SCHOOL",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "九龍城區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_578479000112",
    "name": "YORK INTERNATIONAL PRE-SCHOOL",
    "nameEn": "YORK INTERNATIONAL PRE-SCHOOL",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "九龍城區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_616990000112",
    "name": "YORK INTERNATIONAL PRE-SCHOOL (TUEN MUN)",
    "nameEn": "YORK INTERNATIONAL PRE-SCHOOL (TUEN MUN)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "屯門區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_616990000113",
    "name": "YORK INTERNATIONAL PRE-SCHOOL (TUEN MUN)",
    "nameEn": "YORK INTERNATIONAL PRE-SCHOOL (TUEN MUN)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "屯門區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_616990000111",
    "name": "YORK INTERNATIONAL PRE-SCHOOL (TUEN MUN)",
    "nameEn": "YORK INTERNATIONAL PRE-SCHOOL (TUEN MUN)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "屯門區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_621480000112",
    "name": "YORK INTERNATIONAL PRE-SCHOOL (WETLAND)",
    "nameEn": "YORK INTERNATIONAL PRE-SCHOOL (WETLAND)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "元朗區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_621480000113",
    "name": "YORK INTERNATIONAL PRE-SCHOOL (WETLAND)",
    "nameEn": "YORK INTERNATIONAL PRE-SCHOOL (WETLAND)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "元朗區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_621480000111",
    "name": "YORK INTERNATIONAL PRE-SCHOOL (WETLAND)",
    "nameEn": "YORK INTERNATIONAL PRE-SCHOOL (WETLAND)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "元朗區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_604615000113",
    "name": "YORK MONTESSORI INTERNATIONAL PRE-SCHOOL (MEI FOO)",
    "nameEn": "YORK MONTESSORI INTERNATIONAL PRE-SCHOOL (MEI FOO)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "深水埗區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_604615000112",
    "name": "YORK MONTESSORI INTERNATIONAL PRE-SCHOOL (MEI FOO)",
    "nameEn": "YORK MONTESSORI INTERNATIONAL PRE-SCHOOL (MEI FOO)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "深水埗區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_604615000111",
    "name": "YORK MONTESSORI INTERNATIONAL PRE-SCHOOL (MEI FOO)",
    "nameEn": "YORK MONTESSORI INTERNATIONAL PRE-SCHOOL (MEI FOO)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "九龍",
    "district18": "深水埗區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_609749000112",
    "name": "YORK MONTESSORI INTERNATIONAL PRE-SCHOOL (TSEUNG KWAN O)",
    "nameEn": "YORK MONTESSORI INTERNATIONAL PRE-SCHOOL (TSEUNG KWAN O)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "西貢區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_609749000111",
    "name": "YORK MONTESSORI INTERNATIONAL PRE-SCHOOL (TSEUNG KWAN O)",
    "nameEn": "YORK MONTESSORI INTERNATIONAL PRE-SCHOOL (TSEUNG KWAN O)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "西貢區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_605441000112",
    "name": "YORK MONTESSORI INTERNATIONAL PRE-SCHOOL (YUEN LONG)",
    "nameEn": "YORK MONTESSORI INTERNATIONAL PRE-SCHOOL (YUEN LONG)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "元朗區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_605441000111",
    "name": "YORK MONTESSORI INTERNATIONAL PRE-SCHOOL (YUEN LONG)",
    "nameEn": "YORK MONTESSORI INTERNATIONAL PRE-SCHOOL (YUEN LONG)",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "元朗區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_573973000112",
    "name": "思百德國際幼稚園",
    "nameEn": "ZEBEDEE INTERNATIONAL PRESCHOOL",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "大埔區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "id": "edb_573973000111",
    "name": "思百德國際幼稚園",
    "nameEn": "ZEBEDEE INTERNATIONAL PRESCHOOL",
    "level": "幼稚園",
    "category": "國際",
    "rawCategory": "私立",
    "district": "新界",
    "district18": "大埔區",
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  }
];

/**
 * Deduplicated list of international schools (grouped by school name)
 * This matches the UI count when filtering by "國際" (~95 schools)
 * Each entry aggregates all levels and campuses for that school
 */
export const uniqueInternationalSchools: UniqueInternationalSchool[] = [
  {
    "name": "ABC PATHWAYS INTERNATIONAL KINDERGARTEN",
    "nameEn": "ABC PATHWAYS INTERNATIONAL KINDERGARTEN",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "東區"
    ],
    "schoolIds": [
      "edb_602329000111",
      "edb_602329000112"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "name": "ABC PATHWAYS INTERNATIONAL KINDERGARTEN (WHAMPOA GARDEN)",
    "nameEn": "ABC PATHWAYS INTERNATIONAL KINDERGARTEN (WHAMPOA GARDEN)",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "九龍城區"
    ],
    "schoolIds": [
      "edb_603864000211",
      "edb_603864000212",
      "edb_603864000213"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "name": "美國國際學校",
    "nameEn": "AMERICAN INTERNATIONAL SCHOOL",
    "levels": [
      "幼稚園",
      "小學",
      "中學"
    ],
    "category": "國際",
    "districts": [
      "九龍城區"
    ],
    "schoolIds": [
      "edb_287695000213",
      "edb_287695000211",
      "edb_287695000223",
      "edb_287695000233"
    ],
    "curriculumV2": [
      "AMERICAN"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 97000,
    "tuitionMax": 180400
  },
  {
    "name": "AMERICAN INTERNATIONAL SCHOOL (PRIMARY BRANCH)",
    "nameEn": "AMERICAN INTERNATIONAL SCHOOL (PRIMARY BRANCH)",
    "levels": [
      "小學"
    ],
    "category": "國際",
    "districts": [
      "九龍城區"
    ],
    "schoolIds": [
      "edb_527882000123"
    ],
    "curriculumV2": [
      "AMERICAN"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 152800,
    "tuitionMax": 152800
  },
  {
    "name": "AMERICAN SCHOOL HONG KONG",
    "nameEn": "AMERICAN SCHOOL HONG KONG",
    "levels": [
      "小學",
      "中學"
    ],
    "category": "國際",
    "districts": [
      "大埔區"
    ],
    "schoolIds": [
      "edb_603902000123",
      "edb_603902000133"
    ],
    "curriculumV2": [
      "AMERICAN"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 189600,
    "tuitionMax": 234500
  },
  {
    "name": "安基司學校附屬國際幼稚園",
    "nameEn": "ANCHORS ACADEMY AFFILIATED INTERNATIONAL KINDERGARTEN",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "元朗區"
    ],
    "schoolIds": [
      "edb_622060000112",
      "edb_622060000113",
      "edb_622060000111"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "name": "安基司國際幼兒園",
    "nameEn": "ANCHORS INTERNATIONAL NURSERY",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "大埔區"
    ],
    "schoolIds": [
      "edb_565199000212",
      "edb_565199000211",
      "edb_565199000213",
      "edb_565199000113",
      "edb_565199000111",
      "edb_565199000112"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "name": "安菲爾國際幼稚園",
    "nameEn": "ANFIELD INTERNATIONAL KINDERGARTEN",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "九龍城區"
    ],
    "schoolIds": [
      "edb_535818000312",
      "edb_535818000311",
      "edb_535818000313",
      "edb_535818000211",
      "edb_535818000212",
      "edb_535818000213"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "name": "安菲爾學校",
    "nameEn": "ANFIELD SCHOOL",
    "levels": [
      "小學"
    ],
    "category": "國際",
    "districts": [
      "沙田區"
    ],
    "schoolIds": [
      "edb_587567000123"
    ],
    "curriculumV2": [
      "HK_LOCAL"
    ],
    "instructionLanguages": [
      "ENGLISH",
      "CANTONESE"
    ],
    "tuitionMin": 165000,
    "tuitionMax": 165000
  },
  {
    "name": "安菲爾聖鮑思高冠英學校",
    "nameEn": "ANFIELD ST. BOSCO KOON YING SCHOOL",
    "levels": [
      "小學"
    ],
    "category": "國際",
    "districts": [
      "元朗區"
    ],
    "schoolIds": [
      "edb_620785000123"
    ],
    "curriculumV2": [
      "HK_LOCAL"
    ],
    "instructionLanguages": [
      "ENGLISH",
      "CANTONESE"
    ],
    "tuitionMin": 304500,
    "tuitionMax": 304500
  },
  {
    "name": "雅士圖國際幼稚園",
    "nameEn": "ARISTLE INTERNATIONAL KINDERGARTEN",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "深水埗區"
    ],
    "schoolIds": [
      "edb_604470000111",
      "edb_604470000112"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "name": "香港澳洲國際學校",
    "nameEn": "AUSTRALIAN INTERNATIONAL SCHOOL HONG KONG",
    "levels": [
      "幼稚園",
      "小學",
      "中學"
    ],
    "category": "國際",
    "districts": [
      "九龍城區"
    ],
    "schoolIds": [
      "edb_216275000612",
      "edb_216275000613",
      "edb_216275000611",
      "edb_216275000623",
      "edb_216275000633"
    ],
    "curriculumV2": [
      "AUSTRALIAN"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 148800,
    "tuitionMax": 252800
  },
  {
    "name": "BEACON HILL SCHOOL",
    "nameEn": "BEACON HILL SCHOOL",
    "levels": [
      "小學"
    ],
    "category": "國際",
    "districts": [
      "九龍城區"
    ],
    "schoolIds": [
      "edb_170348000123"
    ],
    "curriculumV2": [
      "BRITISH"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 139000,
    "tuitionMax": 139000
  },
  {
    "name": "博士山（香港）國際幼稚園",
    "nameEn": "BOX HILL (HK) INTERNATIONAL KINDERGARTEN",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "沙田區"
    ],
    "schoolIds": [
      "edb_559415000112",
      "edb_559415000111"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 77000,
    "tuitionMax": 79200
  },
  {
    "name": "博士山(香港)國際幼稚園-將軍澳",
    "nameEn": "BOX HILL (HK) INTERNATIONAL KINDERGARTEN - TSEUNG KWAN O",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "西貢區"
    ],
    "schoolIds": [
      "edb_581836000212",
      "edb_581836000213",
      "edb_581836000211"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 74800,
    "tuitionMax": 78100
  },
  {
    "name": "博士山(香港)國際幼稚園-火炭",
    "nameEn": "BOX HILL (HK) INTERNATIONAL KINDERGARTEN-FO TAN",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "沙田區"
    ],
    "schoolIds": [
      "edb_581739000212",
      "edb_581739000211",
      "edb_581739000112",
      "edb_581739000111"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 77000,
    "tuitionMax": 79200
  },
  {
    "name": "白普理小學",
    "nameEn": "BRADBURY SCHOOL",
    "levels": [
      "小學"
    ],
    "category": "國際",
    "districts": [
      "灣仔區"
    ],
    "schoolIds": [
      "edb_170747000123"
    ],
    "curriculumV2": [
      "BRITISH"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 139000,
    "tuitionMax": 139000
  },
  {
    "name": "加拿大國際學校",
    "nameEn": "CANADIAN INTERNATIONAL SCHOOL",
    "levels": [
      "幼稚園",
      "小學",
      "中學"
    ],
    "category": "國際",
    "districts": [
      "南區"
    ],
    "schoolIds": [
      "edb_216011000512",
      "edb_216011000511",
      "edb_216011000611",
      "edb_216011000612",
      "edb_216011000523",
      "edb_216011000533"
    ],
    "curriculumV2": [
      "CANADIAN"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 156300,
    "tuitionMax": 254300
  },
  {
    "name": "CARMEL SCHOOL",
    "nameEn": "CARMEL SCHOOL",
    "levels": [
      "幼稚園",
      "小學",
      "中學"
    ],
    "category": "國際",
    "districts": [
      "東區"
    ],
    "schoolIds": [
      "edb_216186000211",
      "edb_216186000423",
      "edb_216186000323",
      "edb_216186000433"
    ],
    "curriculumV2": [
      "OTHER_INTL"
    ],
    "instructionLanguages": [
      "ENGLISH",
      "CANTONESE"
    ],
    "tuitionMin": 80500,
    "tuitionMax": 226090
  },
  {
    "name": "銅鑼灣維多利亞國際幼稚園",
    "nameEn": "CAUSEWAY BAY VICTORIA INTERNATIONAL KINDERGARTEN",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "灣仔區"
    ],
    "schoolIds": [
      "edb_325651000113",
      "edb_325651000112",
      "edb_325651000111"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 125430,
    "tuitionMax": 137973
  },
  {
    "name": "新加坡卓薈國際幼稚園(界限街)",
    "nameEn": "CHATSWORTH INTERNATIONAL KINDERGARTEN (BOUNDARY STREET)",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "九龍城區"
    ],
    "schoolIds": [
      "edb_599182000111",
      "edb_599182000112",
      "edb_599182000113"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "name": "漢基國際學校",
    "nameEn": "CHINESE INTERNATIONAL SCHOOL",
    "levels": [
      "幼稚園",
      "小學",
      "中學"
    ],
    "category": "國際",
    "districts": [
      "東區"
    ],
    "schoolIds": [
      "edb_215589000112",
      "edb_215589000111",
      "edb_215589000123",
      "edb_215589000133"
    ],
    "curriculumV2": [
      "IB"
    ],
    "instructionLanguages": [
      "ENGLISH",
      "PUTONGHUA"
    ],
    "tuitionMin": 316800,
    "tuitionMax": 373000
  },
  {
    "name": "宣道國際學校",
    "nameEn": "CHRISTIAN ALLIANCE INTERNATIONAL SCHOOL",
    "levels": [
      "小學",
      "中學"
    ],
    "category": "國際",
    "districts": [
      "深水埗區"
    ],
    "schoolIds": [
      "edb_605557000123",
      "edb_605557000133"
    ],
    "curriculumV2": [
      "IB"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 141500,
    "tuitionMax": 237000
  },
  {
    "name": "宣道會劉平齋紀念國際學校",
    "nameEn": "CHRISTIAN ALLIANCE P.C. LAU MEMORIAL INTERNATIONAL SCHOOL",
    "levels": [
      "小學"
    ],
    "category": "國際",
    "districts": [
      "九龍城區"
    ],
    "schoolIds": [
      "edb_216127000123"
    ],
    "curriculumV2": [
      "OTHER_INTL"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "name": "CLEARWATER BAY SCHOOL",
    "nameEn": "CLEARWATER BAY SCHOOL",
    "levels": [
      "小學"
    ],
    "category": "國際",
    "districts": [
      "西貢區"
    ],
    "schoolIds": [
      "edb_171034000123",
      "edb_171034000223"
    ],
    "curriculumV2": [
      "BRITISH"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 139000,
    "tuitionMax": 139000
  },
  {
    "name": "協同國際學校",
    "nameEn": "CONCORDIA INTERNATIONAL SCHOOL",
    "levels": [
      "中學"
    ],
    "category": "國際",
    "districts": [
      "深水埗區"
    ],
    "schoolIds": [
      "edb_215996000133"
    ],
    "curriculumV2": [
      "AMERICAN"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 129500,
    "tuitionMax": 150950
  },
  {
    "name": "香港道爾頓學校",
    "nameEn": "DALTON SCHOOL HONG KONG",
    "levels": [
      "小學",
      "中學"
    ],
    "category": "國際",
    "districts": [
      "灣仔區"
    ],
    "schoolIds": [
      "edb_607371000223",
      "edb_607371000233"
    ],
    "curriculumV2": [
      "AMERICAN"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 205480,
    "tuitionMax": 207680
  },
  {
    "name": "德寶國際幼兒學校（寶盈花園）",
    "nameEn": "DEBORAH INTERNATIONAL PRE-SCHOOL (BAUHINIA GARDEN)",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "西貢區"
    ],
    "schoolIds": [
      "edb_567116000112",
      "edb_567116000113",
      "edb_567116000111"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "name": "德寶國際幼兒學校（將軍澳）",
    "nameEn": "DEBORAH INTERNATIONAL PRE-SCHOOL (TSEUNG KWAN O)",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "西貢區"
    ],
    "schoolIds": [
      "edb_567108000112",
      "edb_567108000113",
      "edb_567108000111"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "name": "DISCOVERY BAY INTERNATIONAL SCHOOL",
    "nameEn": "DISCOVERY BAY INTERNATIONAL SCHOOL",
    "levels": [
      "幼稚園",
      "小學",
      "中學"
    ],
    "category": "國際",
    "districts": [
      "離島區"
    ],
    "schoolIds": [
      "edb_230987000113",
      "edb_230987000112",
      "edb_230987000111",
      "edb_230987000123",
      "edb_230987000233",
      "edb_230987000133"
    ],
    "curriculumV2": [
      "BRITISH"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 143700,
    "tuitionMax": 196900
  },
  {
    "name": "智新書院",
    "nameEn": "DISCOVERY COLLEGE",
    "levels": [
      "小學",
      "中學"
    ],
    "category": "國際",
    "districts": [
      "離島區"
    ],
    "schoolIds": [
      "edb_569747000223",
      "edb_569747000233"
    ],
    "curriculumV2": [
      "IB"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 147200,
    "tuitionMax": 191800
  },
  {
    "name": "DISCOVERY MONTESSORI ACADEMY",
    "nameEn": "DISCOVERY MONTESSORI ACADEMY",
    "levels": [
      "幼稚園",
      "小學"
    ],
    "category": "國際",
    "districts": [
      "離島區"
    ],
    "schoolIds": [
      "edb_600814000111",
      "edb_600814000112",
      "edb_600814000113",
      "edb_600814000123"
    ],
    "curriculumV2": [
      "OTHER_INTL"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 99500,
    "tuitionMax": 205500
  },
  {
    "name": "香港國際蒙特梭利學校",
    "nameEn": "DISCOVERY MONTESSORI SCHOOL",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "離島區"
    ],
    "schoolIds": [
      "edb_584606000113",
      "edb_584606000112",
      "edb_584606000111"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "name": "香港國際蒙特梭利學校(中環)",
    "nameEn": "DISCOVERY MONTESSORI SCHOOL (CENTRAL)",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "中西區"
    ],
    "schoolIds": [
      "edb_588032000111",
      "edb_588032000112",
      "edb_588032000113"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "name": "德思齊加拿大國際學校",
    "nameEn": "DSC INTERNATIONAL SCHOOL",
    "levels": [
      "小學",
      "中學"
    ],
    "category": "國際",
    "districts": [
      "東區"
    ],
    "schoolIds": [
      "edb_215791000123",
      "edb_215791000133"
    ],
    "curriculumV2": [
      "IB"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 147100,
    "tuitionMax": 168100
  },
  {
    "name": "艾蒙特國際幼稚園",
    "nameEn": "EIS INTERNATIONAL PRE-SCHOOL",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "元朗區"
    ],
    "schoolIds": [
      "edb_615633000113",
      "edb_615633000111",
      "edb_615633000112"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "name": "英基雅柏國際幼稚園",
    "nameEn": "ESF ABACUS INTERNATIONAL KINDERGARTEN",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "西貢區"
    ],
    "schoolIds": [
      "edb_549240000112",
      "edb_549240000111"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 103000,
    "tuitionMax": 119700
  },
  {
    "name": "伽利利國際幼稚園",
    "nameEn": "GALILEE INTERNATIONAL KINDERGARTEN",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "九龍城區"
    ],
    "schoolIds": [
      "edb_597031000112",
      "edb_597031000111"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "name": "德瑞國際學校",
    "nameEn": "GERMAN SWISS INTERNATIONAL SCHOOL",
    "levels": [
      "幼稚園",
      "小學",
      "中學"
    ],
    "category": "國際",
    "districts": [
      "南區"
    ],
    "schoolIds": [
      "edb_214558000211",
      "edb_214558000221",
      "edb_214558000123",
      "edb_214558000121",
      "edb_214558000133"
    ],
    "curriculumV2": [
      "IB"
    ],
    "instructionLanguages": [
      "ENGLISH",
      "GERMAN"
    ],
    "tuitionMin": 203700,
    "tuitionMax": 203700
  },
  {
    "name": "己連拿小學",
    "nameEn": "GLENEALY SCHOOL",
    "levels": [
      "小學"
    ],
    "category": "國際",
    "districts": [
      "中西區"
    ],
    "schoolIds": [
      "edb_170887000123"
    ],
    "curriculumV2": [
      "BRITISH"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 139000,
    "tuitionMax": 139000
  },
  {
    "name": "雅惠國際幼稚園（鯉景灣）",
    "nameEn": "GRACE GARDEN INTERNATIONAL KINDERGARTEN (LEI KING WAN)",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "東區"
    ],
    "schoolIds": [
      "edb_604585000112",
      "edb_604585000111"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "name": "綠茵英文（國際）幼稚園（日出康城）",
    "nameEn": "GREENFIELD ENGLISH (INTERNATIONAL) KINDERGARTEN (LOHAS PARK)",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "西貢區"
    ],
    "schoolIds": [
      "edb_604372000112",
      "edb_604372000111"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "name": "綠茵英文（國際）幼稚園（將軍澳）",
    "nameEn": "GREENFIELD ENGLISH (INTERNATIONAL) KINDERGARTEN (TSEUNG KWAN O)",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "西貢區"
    ],
    "schoolIds": [
      "edb_523984000212",
      "edb_523984000211",
      "edb_523984000213"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "name": "GUIDEPOST MONTESSORI INTERNATIONAL KINDERGARTEN (CHAI WAN)",
    "nameEn": "GUIDEPOST MONTESSORI INTERNATIONAL KINDERGARTEN (CHAI WAN)",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "東區"
    ],
    "schoolIds": [
      "edb_609285000111",
      "edb_609285000112"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "name": "GUIDEPOST MONTESSORI INTERNATIONAL KINDERGARTEN (CLEARWATER BAY)",
    "nameEn": "GUIDEPOST MONTESSORI INTERNATIONAL KINDERGARTEN (CLEARWATER BAY)",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "西貢區"
    ],
    "schoolIds": [
      "edb_583774000111",
      "edb_583774000112"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "name": "GUIDEPOST MONTESSORI INTERNATIONAL KINDERGARTEN (DISCOVERY BAY)",
    "nameEn": "GUIDEPOST MONTESSORI INTERNATIONAL KINDERGARTEN (DISCOVERY BAY)",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "離島區"
    ],
    "schoolIds": [
      "edb_609625000112",
      "edb_609625000111"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "name": "GUIDEPOST MONTESSORI INTERNATIONAL KINDERGARTEN (KENNEDY TOWN)",
    "nameEn": "GUIDEPOST MONTESSORI INTERNATIONAL KINDERGARTEN (KENNEDY TOWN)",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "中西區"
    ],
    "schoolIds": [
      "edb_611484000112",
      "edb_611484000111"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "name": "GUIDEPOST MONTESSORI INTERNATIONAL KINDERGARTEN (POK FU LAM)",
    "nameEn": "GUIDEPOST MONTESSORI INTERNATIONAL KINDERGARTEN (POK FU LAM)",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "南區"
    ],
    "schoolIds": [
      "edb_598089000112",
      "edb_598089000111"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "name": "GUIDEPOST MONTESSORI INTERNATIONAL PRE-SCHOOL (HAPPY VALLEY HAWTHORN ROAD)",
    "nameEn": "GUIDEPOST MONTESSORI INTERNATIONAL PRE-SCHOOL (HAPPY VALLEY HAWTHORN ROAD)",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "灣仔區"
    ],
    "schoolIds": [
      "edb_564958000111",
      "edb_564958000112"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "name": "GUIDEPOST MONTESSORI INTERNATIONAL PRE-SCHOOL (MID-LEVELS)",
    "nameEn": "GUIDEPOST MONTESSORI INTERNATIONAL PRE-SCHOOL (MID-LEVELS)",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "中西區"
    ],
    "schoolIds": [
      "edb_594725000111",
      "edb_594725000112"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "name": "GUIDEPOST MONTESSORI INTERNATIONAL PRE-SCHOOL (REPULSE BAY)",
    "nameEn": "GUIDEPOST MONTESSORI INTERNATIONAL PRE-SCHOOL (REPULSE BAY)",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "南區"
    ],
    "schoolIds": [
      "edb_602256000112",
      "edb_602256000111"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "name": "GUIDEPOST MONTESSORI INTERNATIONAL PRE-SCHOOL (SAI KUNG)",
    "nameEn": "GUIDEPOST MONTESSORI INTERNATIONAL PRE-SCHOOL (SAI KUNG)",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "西貢區"
    ],
    "schoolIds": [
      "edb_578630000111",
      "edb_578630000112"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "name": "哈羅香港國際學校",
    "nameEn": "HARROW INTERNATIONAL SCHOOL HONG KONG",
    "levels": [
      "幼稚園",
      "小學",
      "中學"
    ],
    "category": "國際",
    "districts": [
      "屯門區"
    ],
    "schoolIds": [
      "edb_590800000113",
      "edb_590800000123",
      "edb_590800000133"
    ],
    "curriculumV2": [
      "BRITISH"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 201314,
    "tuitionMax": 239070
  },
  {
    "name": "香港學堂國際學校",
    "nameEn": "HONG KONG ACADEMY",
    "levels": [
      "幼稚園",
      "小學",
      "中學"
    ],
    "category": "國際",
    "districts": [
      "西貢區"
    ],
    "schoolIds": [
      "edb_539155000311",
      "edb_539155000323",
      "edb_539155000333"
    ],
    "curriculumV2": [
      "IB"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 221800,
    "tuitionMax": 264700
  },
  {
    "name": "HONG KONG INTERNATIONAL SCHOOL",
    "nameEn": "HONG KONG INTERNATIONAL SCHOOL",
    "levels": [
      "小學",
      "中學"
    ],
    "category": "國際",
    "districts": [
      "南區"
    ],
    "schoolIds": [
      "edb_213772000123",
      "edb_213772000233"
    ],
    "curriculumV2": [
      "AMERICAN"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 224800,
    "tuitionMax": 263300
  },
  {
    "name": "HONGKONG JAPANESE SCHOOL",
    "nameEn": "HONGKONG JAPANESE SCHOOL",
    "levels": [
      "小學",
      "中學"
    ],
    "category": "國際",
    "districts": [
      "灣仔區"
    ],
    "schoolIds": [
      "edb_317357000123",
      "edb_317357000133"
    ],
    "curriculumV2": [
      "OTHER_INTL"
    ],
    "instructionLanguages": [
      "JAPANESE"
    ],
    "tuitionMin": 140460,
    "tuitionMax": 140460
  },
  {
    "name": "基督教國際學校",
    "nameEn": "INTERNATIONAL CHRISTIAN SCHOOL",
    "levels": [
      "小學",
      "中學"
    ],
    "category": "國際",
    "districts": [
      "沙田區"
    ],
    "schoolIds": [
      "edb_569836000123",
      "edb_569836000133"
    ],
    "curriculumV2": [
      "CANADIAN"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 148400,
    "tuitionMax": 201500
  },
  {
    "name": "基督教國際學校－幼稚園",
    "nameEn": "INTERNATIONAL CHRISTIAN SCHOOL - KINDERGARTEN",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "沙田區"
    ],
    "schoolIds": [
      "edb_542598000211",
      "edb_542598000212"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 91000,
    "tuitionMax": 148400
  },
  {
    "name": "INTERNATIONAL COLLEGE HONG KONG (NEW TERRITORIES)",
    "nameEn": "INTERNATIONAL COLLEGE HONG KONG (NEW TERRITORIES)",
    "levels": [
      "中學"
    ],
    "category": "國際",
    "districts": [
      "北區"
    ],
    "schoolIds": [
      "edb_578789000133"
    ],
    "curriculumV2": [
      "IB"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 184500,
    "tuitionMax": 204900
  },
  {
    "name": "INTERNATIONAL COLLEGE HONG KONG HONG LOK YUEN (KINDERGARTEN SECTION)",
    "nameEn": "INTERNATIONAL COLLEGE HONG KONG HONG LOK YUEN (KINDERGARTEN SECTION)",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "大埔區"
    ],
    "schoolIds": [
      "edb_230944000112",
      "edb_230944000113",
      "edb_230944000111"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 25170,
    "tuitionMax": 145110
  },
  {
    "name": "INTERNATIONAL COLLEGE HONG KONG HONG LOK YUEN (PRIMARY SECTION)",
    "nameEn": "INTERNATIONAL COLLEGE HONG KONG HONG LOK YUEN (PRIMARY SECTION)",
    "levels": [
      "小學"
    ],
    "category": "國際",
    "districts": [
      "大埔區"
    ],
    "schoolIds": [
      "edb_230979000123"
    ],
    "curriculumV2": [
      "IB"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 145110,
    "tuitionMax": 145110
  },
  {
    "name": "INVICTUS KINDERGARTEN",
    "nameEn": "INVICTUS KINDERGARTEN",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "西貢區"
    ],
    "schoolIds": [
      "edb_615366000113"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "name": "INVICTUS SCHOOL",
    "nameEn": "INVICTUS SCHOOL",
    "levels": [
      "小學"
    ],
    "category": "國際",
    "districts": [
      "西貢區"
    ],
    "schoolIds": [
      "edb_615285000123"
    ],
    "curriculumV2": [
      "BRITISH"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 114700,
    "tuitionMax": 114700
  },
  {
    "name": "INVICTUS SECONDARY SCHOOL",
    "nameEn": "INVICTUS SECONDARY SCHOOL",
    "levels": [
      "中學"
    ],
    "category": "國際",
    "districts": [
      "東區"
    ],
    "schoolIds": [
      "edb_616354000133"
    ],
    "curriculumV2": [
      "BRITISH"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 139000,
    "tuitionMax": 141700
  },
  {
    "name": "港島兒童蒙特梭利幼稚園",
    "nameEn": "ISLAND CHILDREN'S MONTESSORI KINDERGARTEN",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "灣仔區"
    ],
    "schoolIds": [
      "edb_581119000111",
      "edb_581119000112"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "name": "港島蒙特梭利國際幼稚園",
    "nameEn": "ISLAND MONTESSORI INTERNATIONAL KINDERGARTEN",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "東區"
    ],
    "schoolIds": [
      "edb_607223000111",
      "edb_607223000112"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "name": "ISLAND SCHOOL",
    "nameEn": "ISLAND SCHOOL",
    "levels": [
      "中學"
    ],
    "category": "國際",
    "districts": [
      "中西區"
    ],
    "schoolIds": [
      "edb_170399000133"
    ],
    "curriculumV2": [
      "IB"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 159400,
    "tuitionMax": 181100
  },
  {
    "name": "意大利國際幼稚園",
    "nameEn": "ITALIAN INTERNATIONAL KINDERGARTEN",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "南區"
    ],
    "schoolIds": [
      "edb_611646000111",
      "edb_611646000113",
      "edb_611646000112"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "name": "JAPANESE INTERNATIONAL SCHOOL",
    "nameEn": "JAPANESE INTERNATIONAL SCHOOL",
    "levels": [
      "小學"
    ],
    "category": "國際",
    "districts": [
      "大埔區"
    ],
    "schoolIds": [
      "edb_522775000123"
    ],
    "curriculumV2": [
      "OTHER_INTL"
    ],
    "instructionLanguages": [
      "JAPANESE"
    ],
    "tuitionMin": 140460,
    "tuitionMax": 140460
  },
  {
    "name": "晶晶國際幼稚園",
    "nameEn": "JING JING INTERNATIONAL KINDERGARTEN",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "屯門區"
    ],
    "schoolIds": [
      "edb_587524000111",
      "edb_587524000112",
      "edb_587524000113"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "name": "賽馬會善樂學校",
    "nameEn": "JOCKEY CLUB SARAH ROE SCHOOL",
    "levels": [
      "小學",
      "中學"
    ],
    "category": "國際",
    "districts": [
      "九龍城區"
    ],
    "schoolIds": [
      "edb_250686000223",
      "edb_250686000233"
    ],
    "curriculumV2": [
      "OTHER_INTL"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 139000,
    "tuitionMax": 181100
  },
  {
    "name": "心怡天地國際幼稚園(屯門)",
    "nameEn": "JOYFUL WORLD INTERNATIONAL KINDERGARTEN (TUEN MUN)",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "屯門區"
    ],
    "schoolIds": [
      "edb_615170000112",
      "edb_615170000111"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "name": "心怡天地國際幼稚園(元朗)",
    "nameEn": "JOYFUL WORLD INTERNATIONAL KINDERGARTEN (YUEN LONG)",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "元朗區"
    ],
    "schoolIds": [
      "edb_612189000111",
      "edb_612189000112"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "name": "KELLETT SCHOOL",
    "nameEn": "KELLETT SCHOOL",
    "levels": [
      "小學",
      "中學"
    ],
    "category": "國際",
    "districts": [
      "觀塘區"
    ],
    "schoolIds": [
      "edb_215406000423",
      "edb_215406000123",
      "edb_215406000433"
    ],
    "curriculumV2": [
      "BRITISH"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 214200,
    "tuitionMax": 214200
  },
  {
    "name": "漢迪國際幼稚園",
    "nameEn": "KENDALL INTERNATIONAL PRESCHOOL",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "深水埗區"
    ],
    "schoolIds": [
      "edb_607703000111",
      "edb_607703000112"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "name": "漢廸國際幼稚園(港島東)",
    "nameEn": "KENDALL INTERNATIONAL PRESCHOOL (ISLAND EAST)",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "東區"
    ],
    "schoolIds": [
      "edb_325783000112",
      "edb_325783000111"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "name": "KENNEDY SCHOOL",
    "nameEn": "KENNEDY SCHOOL",
    "levels": [
      "小學"
    ],
    "category": "國際",
    "districts": [
      "南區"
    ],
    "schoolIds": [
      "edb_170879000123"
    ],
    "curriculumV2": [
      "BRITISH"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 139000,
    "tuitionMax": 139000
  },
  {
    "name": "KING GEORGE V SCHOOL",
    "nameEn": "KING GEORGE V SCHOOL",
    "levels": [
      "中學"
    ],
    "category": "國際",
    "districts": [
      "九龍城區"
    ],
    "schoolIds": [
      "edb_170917000133"
    ],
    "curriculumV2": [
      "IB"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 159400,
    "tuitionMax": 181100
  },
  {
    "name": "京斯敦國際幼稚園",
    "nameEn": "KINGSTON INTERNATIONAL KINDERGARTEN",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "九龍城區"
    ],
    "schoolIds": [
      "edb_519863000312",
      "edb_519863000311"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 63800,
    "tuitionMax": 112200
  },
  {
    "name": "京斯敦國際學校",
    "nameEn": "KINGSTON INTERNATIONAL SCHOOL",
    "levels": [
      "小學"
    ],
    "category": "國際",
    "districts": [
      "九龍城區"
    ],
    "schoolIds": [
      "edb_541915000123"
    ],
    "curriculumV2": [
      "OTHER_INTL"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 155000,
    "tuitionMax": 175000
  },
  {
    "name": "KOREAN INTERNATIONAL SCHOOL",
    "nameEn": "KOREAN INTERNATIONAL SCHOOL",
    "levels": [
      "幼稚園",
      "小學",
      "中學"
    ],
    "category": "國際",
    "districts": [
      "東區"
    ],
    "schoolIds": [
      "edb_216216000113",
      "edb_216216000123",
      "edb_216216000133"
    ],
    "curriculumV2": [
      "OTHER_INTL"
    ],
    "instructionLanguages": [
      "ENGLISH",
      "KOREAN"
    ],
    "tuitionMin": 97100,
    "tuitionMax": 137000
  },
  {
    "name": "KOWLOON JUNIOR SCHOOL",
    "nameEn": "KOWLOON JUNIOR SCHOOL",
    "levels": [
      "小學"
    ],
    "category": "國際",
    "districts": [
      "九龍城區"
    ],
    "schoolIds": [
      "edb_170909000123"
    ],
    "curriculumV2": [
      "BRITISH"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 139000,
    "tuitionMax": 139000
  },
  {
    "name": "LANTAU INTERNATIONAL SCHOOL",
    "nameEn": "LANTAU INTERNATIONAL SCHOOL",
    "levels": [
      "小學"
    ],
    "category": "國際",
    "districts": [
      "離島區"
    ],
    "schoolIds": [
      "edb_518620000123",
      "edb_518620000223",
      "edb_518620000423"
    ],
    "curriculumV2": [
      "BRITISH"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 127450,
    "tuitionMax": 214340
  },
  {
    "name": "LES PETITS LASCARS FRENCH INTERNATIONAL PRESCHOOL",
    "nameEn": "LES PETITS LASCARS FRENCH INTERNATIONAL PRESCHOOL",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "中西區"
    ],
    "schoolIds": [
      "edb_614904000112",
      "edb_614904000111"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "name": "LES PETITS LASCARS FRENCH INTERNATIONAL PRESCHOOL (TSEUNG KWAN O)",
    "nameEn": "LES PETITS LASCARS FRENCH INTERNATIONAL PRESCHOOL (TSEUNG KWAN O)",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "西貢區"
    ],
    "schoolIds": [
      "edb_614998000111",
      "edb_614998000112"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "name": "道爾頓幼稚園",
    "nameEn": "LITTLE DALTON KINDERGARTEN",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "灣仔區"
    ],
    "schoolIds": [
      "edb_607592000213",
      "edb_607592000212",
      "edb_607592000211"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "name": "小大嶼山蒙特梭利幼稚園",
    "nameEn": "LITTLE LANTAU MONTESSORI KINDERGARTEN",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "離島區"
    ],
    "schoolIds": [
      "edb_587877000111"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "name": "LYC'EE FRANCAIS INTERNATIONAL (FRENCH INTERNATIONAL SCHOOL)",
    "nameEn": "LYC'EE FRANCAIS INTERNATIONAL (FRENCH INTERNATIONAL SCHOOL)",
    "levels": [
      "幼稚園",
      "小學",
      "中學"
    ],
    "category": "國際",
    "districts": [
      "東區"
    ],
    "schoolIds": [
      "edb_214949000513",
      "edb_214949000713",
      "edb_214949000523",
      "edb_214949000123",
      "edb_214949000723",
      "edb_214949000433",
      "edb_214949000733"
    ],
    "curriculumV2": [
      "OTHER_INTL"
    ],
    "instructionLanguages": [
      "ENGLISH",
      "FRENCH"
    ],
    "tuitionMin": 152239,
    "tuitionMax": 209230
  },
  {
    "name": "瑪歌瑞特國際幼稚園",
    "nameEn": "MAGART INTERNATIONAL KINDERGARTEN",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "九龍城區"
    ],
    "schoolIds": [
      "edb_610623000111",
      "edb_610623000113",
      "edb_610623000112"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "name": "瑪歌瑞特國際幼稚園(粉嶺)",
    "nameEn": "MAGART INTERNATIONAL KINDERGARTEN (FANLING)",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "北區"
    ],
    "schoolIds": [
      "edb_566241000113",
      "edb_566241000111",
      "edb_566241000112"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "name": "瑪歌瑞特國際幼稚園(康怡)",
    "nameEn": "MAGART INTERNATIONAL KINDERGARTEN (KORNHILL)",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "東區"
    ],
    "schoolIds": [
      "edb_215767000111",
      "edb_215767000112"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "name": "香港墨爾文國際學校",
    "nameEn": "MALVERN COLLEGE HONG KONG",
    "levels": [
      "小學",
      "中學"
    ],
    "category": "國際",
    "districts": [
      "大埔區"
    ],
    "schoolIds": [
      "edb_606766000123",
      "edb_606766000133"
    ],
    "curriculumV2": [
      "BRITISH"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 198860,
    "tuitionMax": 226210
  },
  {
    "name": "楓葉小熊加拿大國際幼稚園",
    "nameEn": "MAPLE BEAR CANADIAN INTERNATIONAL KINDERGARTEN",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "西貢區"
    ],
    "schoolIds": [
      "edb_613665000111",
      "edb_613665000113",
      "edb_613665000112"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "name": "楓葉小熊加拿大國際幼稚園(康城)",
    "nameEn": "MAPLE BEAR CANADIAN INTERNATIONAL KINDERGARTEN (LOHAS)",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "西貢區"
    ],
    "schoolIds": [
      "edb_616311000112",
      "edb_616311000111"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "name": "楓葉小熊加拿大國際幼稚園(油塘)",
    "nameEn": "MAPLE BEAR CANADIAN INTERNATIONAL KINDERGARTEN (YAU TONG)",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "觀塘區"
    ],
    "schoolIds": [
      "edb_593788000112",
      "edb_593788000111"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "name": "善行國際幼稚園",
    "nameEn": "MASS INTERNATIONAL PRESCHOOL",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "灣仔區"
    ],
    "schoolIds": [
      "edb_600334000211",
      "edb_600334000212"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "name": "奧恩國際幼稚園",
    "nameEn": "MIGHTY OAKS INTERNATIONAL KINDERGARTEN",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "中西區"
    ],
    "schoolIds": [
      "edb_603643000111",
      "edb_603643000112"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "name": "明慧國際幼稚園",
    "nameEn": "MING WAI INTERNATIONAL KINDERGARTEN",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "東區"
    ],
    "schoolIds": [
      "edb_566977000111",
      "edb_566977000112",
      "edb_566977000113"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "name": "明慧國際幼稚園（北角分校）",
    "nameEn": "MING WAI INTERNATIONAL KINDERGARTEN (NORTH POINT BRANCH)",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "東區"
    ],
    "schoolIds": [
      "edb_567329000112",
      "edb_567329000111",
      "edb_567329000113"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "name": "明慧國際幼稚園(太子分校)",
    "nameEn": "MING WAI INTERNATIONAL KINDERGARTEN (PRINCE EDWARD BRANCH)",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "油尖旺區"
    ],
    "schoolIds": [
      "edb_583421000112",
      "edb_583421000111",
      "edb_583421000113"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "name": "明雅國際幼兒學校",
    "nameEn": "MINK INTERNATIONAL PRE-SCHOOL",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "大埔區"
    ],
    "schoolIds": [
      "edb_567027000111",
      "edb_567027000112",
      "edb_567027000113"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "name": "MONTESSORI FOR CHILDREN (NURSERY)",
    "nameEn": "MONTESSORI FOR CHILDREN (NURSERY)",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "南區"
    ],
    "schoolIds": [
      "edb_565466000111",
      "edb_565466000112"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "name": "懋柏禮國際幼稚園",
    "nameEn": "MULBERRY HOUSE INTERNATIONAL KINDERGARTEN",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "大埔區"
    ],
    "schoolIds": [
      "edb_601721000112",
      "edb_601721000111"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "name": "MULBERRY HOUSE INTERNATIONAL KINDERGARTEN SOUTHSIDE",
    "nameEn": "MULBERRY HOUSE INTERNATIONAL KINDERGARTEN SOUTHSIDE",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "南區"
    ],
    "schoolIds": [
      "edb_578053000112",
      "edb_578053000111"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "name": "童樂天國際幼稚園",
    "nameEn": "MULBERRY TREE INTERNATIONAL KINDERGARTEN",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "沙田區"
    ],
    "schoolIds": [
      "edb_598054000111",
      "edb_598054000112"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "name": "麥克萊國際幼稚園",
    "nameEn": "MYNORS INTERNATIONAL KINDERGARTEN",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "北區"
    ],
    "schoolIds": [
      "edb_601250000111",
      "edb_601250000112",
      "edb_601250000113"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "name": "NORD ANGLIA INTERNATIONAL PRE-SCHOOL (SAI KUNG)",
    "nameEn": "NORD ANGLIA INTERNATIONAL PRE-SCHOOL (SAI KUNG)",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "西貢區"
    ],
    "schoolIds": [
      "edb_608475000112",
      "edb_608475000111"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "name": "NORD ANGLIA INTERNATIONAL SCHOOL, HONG KONG",
    "nameEn": "NORD ANGLIA INTERNATIONAL SCHOOL, HONG KONG",
    "levels": [
      "小學",
      "中學"
    ],
    "category": "國際",
    "districts": [
      "觀塘區"
    ],
    "schoolIds": [
      "edb_598356000223",
      "edb_598356000333"
    ],
    "curriculumV2": [
      "BRITISH"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 184380,
    "tuitionMax": 214340
  },
  {
    "name": "NORWEGIAN INTERNATIONAL SCHOOL",
    "nameEn": "NORWEGIAN INTERNATIONAL SCHOOL",
    "levels": [
      "幼稚園",
      "小學"
    ],
    "category": "國際",
    "districts": [
      "大埔區"
    ],
    "schoolIds": [
      "edb_215520000111",
      "edb_215520000113",
      "edb_215520000112",
      "edb_215520000123"
    ],
    "curriculumV2": [
      "OTHER_INTL"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 80850,
    "tuitionMax": 133200
  },
  {
    "name": "栢基國際幼稚園",
    "nameEn": "PARKVIEW INTERNATIONAL PRE-SCHOOL",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "南區"
    ],
    "schoolIds": [
      "edb_215937000112",
      "edb_215937000111"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "name": "栢基國際幼稚園(九龍)",
    "nameEn": "PARKVIEW INTERNATIONAL PRE-SCHOOL (KOWLOON)",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "油尖旺區"
    ],
    "schoolIds": [
      "edb_571490000113",
      "edb_571490000111",
      "edb_571490000112"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "name": "PEAK SCHOOL",
    "nameEn": "PEAK SCHOOL",
    "levels": [
      "小學"
    ],
    "category": "國際",
    "districts": [
      "中西區"
    ],
    "schoolIds": [
      "edb_170860000123"
    ],
    "curriculumV2": [
      "BRITISH"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 139000,
    "tuitionMax": 139000
  },
  {
    "name": "培僑國際幼稚園",
    "nameEn": "PUI KIU INTERNATIONAL KINDERGARTEN",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "沙田區"
    ],
    "schoolIds": [
      "edb_613916000112",
      "edb_613916000111"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "name": "培僑國際幼稚園(碧濤花園)",
    "nameEn": "PUI KIU INTERNATIONAL KINDERGARTEN (PICTORIAL GARDEN)",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "沙田區"
    ],
    "schoolIds": [
      "edb_622389000112",
      "edb_622389000113",
      "edb_622389000111"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "name": "鰂魚涌小學",
    "nameEn": "QUARRY BAY SCHOOL",
    "levels": [
      "小學"
    ],
    "category": "國際",
    "districts": [
      "東區"
    ],
    "schoolIds": [
      "edb_170895000123"
    ],
    "curriculumV2": [
      "BRITISH"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 139000,
    "tuitionMax": 139000
  },
  {
    "name": "啓新書院",
    "nameEn": "RENAISSANCE COLLEGE",
    "levels": [
      "小學",
      "中學"
    ],
    "category": "國際",
    "districts": [
      "沙田區"
    ],
    "schoolIds": [
      "edb_567485000123",
      "edb_567485000133"
    ],
    "curriculumV2": [
      "IB"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 145800,
    "tuitionMax": 189900
  },
  {
    "name": "聖姬莉國際幼稚園",
    "nameEn": "SAINT BRIGIT INTERNATIONAL KINDERGARTEN",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "九龍城區"
    ],
    "schoolIds": [
      "edb_597538000211",
      "edb_597538000212"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "name": "弘爵國際學校",
    "nameEn": "SEAR ROGERS INTERNATIONAL SCHOOL",
    "levels": [
      "小學",
      "中學"
    ],
    "category": "國際",
    "districts": [
      "荃灣區"
    ],
    "schoolIds": [
      "edb_534579000123",
      "edb_534579000133"
    ],
    "curriculumV2": [
      "IB"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "name": "SHATIN COLLEGE",
    "nameEn": "SHATIN COLLEGE",
    "levels": [
      "中學"
    ],
    "category": "國際",
    "districts": [
      "沙田區"
    ],
    "schoolIds": [
      "edb_190314000233"
    ],
    "curriculumV2": [
      "IB"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 159400,
    "tuitionMax": 181100
  },
  {
    "name": "SHATIN JUNIOR SCHOOL",
    "nameEn": "SHATIN JUNIOR SCHOOL",
    "levels": [
      "小學"
    ],
    "category": "國際",
    "districts": [
      "沙田區"
    ],
    "schoolIds": [
      "edb_190543000123"
    ],
    "curriculumV2": [
      "BRITISH"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 139000,
    "tuitionMax": 139000
  },
  {
    "name": "思貝禮國際學校",
    "nameEn": "SHREWSBURY INTERNATIONAL SCHOOL HONG KONG",
    "levels": [
      "小學"
    ],
    "category": "國際",
    "districts": [
      "西貢區"
    ],
    "schoolIds": [
      "edb_607525000123"
    ],
    "curriculumV2": [
      "BRITISH"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 143500,
    "tuitionMax": 177000
  },
  {
    "name": "新加坡國際學校",
    "nameEn": "SINGAPORE INTERNATIONAL SCHOOL (HONG KONG)",
    "levels": [
      "幼稚園",
      "小學",
      "中學"
    ],
    "category": "國際",
    "districts": [
      "南區"
    ],
    "schoolIds": [
      "edb_216003000211",
      "edb_216003000212",
      "edb_216003000223",
      "edb_216003000433"
    ],
    "curriculumV2": [
      "OTHER_INTL"
    ],
    "instructionLanguages": [
      "ENGLISH",
      "PUTONGHUA"
    ],
    "tuitionMin": 123000,
    "tuitionMax": 274900
  },
  {
    "name": "香港西班牙學校",
    "nameEn": "SPANISH SCHOOL OF HONG KONG",
    "levels": [
      "小學",
      "中學"
    ],
    "category": "國際",
    "districts": [
      "大埔區"
    ],
    "schoolIds": [
      "edb_609498000223",
      "edb_609498000123",
      "edb_609498000133",
      "edb_609498000233"
    ],
    "curriculumV2": [
      "OTHER_INTL"
    ],
    "instructionLanguages": [
      "SPANISH",
      "ENGLISH",
      "CANTONESE"
    ],
    "tuitionMin": 85000,
    "tuitionMax": 138000
  },
  {
    "name": "國際英文幼稚園",
    "nameEn": "ST. CATHERINE'S INTERNATIONAL KINDERGARTEN",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "九龍城區"
    ],
    "schoolIds": [
      "edb_215120000111",
      "edb_215120000211",
      "edb_215120000212",
      "edb_215120000112"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "name": "STAMFORD AMERICAN SCHOOL HONG KONG",
    "nameEn": "STAMFORD AMERICAN SCHOOL HONG KONG",
    "levels": [
      "小學",
      "中學"
    ],
    "category": "國際",
    "districts": [
      "九龍城區"
    ],
    "schoolIds": [
      "edb_605638000123",
      "edb_605638000133"
    ],
    "curriculumV2": [
      "AMERICAN"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 217100,
    "tuitionMax": 264000
  },
  {
    "name": "STAMFORD AMERICAN SCHOOL HONG KONG (WEST KOWLOON)",
    "nameEn": "STAMFORD AMERICAN SCHOOL HONG KONG (WEST KOWLOON)",
    "levels": [
      "中學"
    ],
    "category": "國際",
    "districts": [
      "油尖旺區"
    ],
    "schoolIds": [
      "edb_626864000133"
    ],
    "curriculumV2": [
      "AMERICAN"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 239900,
    "tuitionMax": 264000
  },
  {
    "name": "蒙特梭利國際學校",
    "nameEn": "THE INTERNATIONAL MONTESSORI SCHOOL - AN IMEF SCHOOL",
    "levels": [
      "幼稚園",
      "小學",
      "中學"
    ],
    "category": "國際",
    "districts": [
      "南區"
    ],
    "schoolIds": [
      "edb_548430000611",
      "edb_548430000311",
      "edb_548430000312",
      "edb_548430000711",
      "edb_548430000411",
      "edb_548430000412",
      "edb_548430000623",
      "edb_548430000633"
    ],
    "curriculumV2": [
      "OTHER_INTL"
    ],
    "instructionLanguages": [
      "ENGLISH",
      "PUTONGHUA"
    ],
    "tuitionMin": 143000,
    "tuitionMax": 206500
  },
  {
    "name": "THE SOUTH ISLAND SCHOOL",
    "nameEn": "THE SOUTH ISLAND SCHOOL",
    "levels": [
      "中學"
    ],
    "category": "國際",
    "districts": [
      "南區"
    ],
    "schoolIds": [
      "edb_170836000133"
    ],
    "curriculumV2": [
      "IB"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 159400,
    "tuitionMax": 181100
  },
  {
    "name": "朗思國際幼稚園",
    "nameEn": "THINK INTERNATIONAL KINDERGARTEN",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "觀塘區"
    ],
    "schoolIds": [
      "edb_216267000111",
      "edb_216267000113",
      "edb_216267000112"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "name": "朗思國際幼稚園（馬鞍山）",
    "nameEn": "THINK INTERNATIONAL KINDERGARTEN (MA ON SHAN)",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "沙田區"
    ],
    "schoolIds": [
      "edb_533360000212",
      "edb_533360000211",
      "edb_533360000213"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "name": "朗思國際幼稚園(南昌)",
    "nameEn": "THINK INTERNATIONAL KINDERGARTEN (NAM CHEONG)",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "深水埗區"
    ],
    "schoolIds": [
      "edb_612782000113",
      "edb_612782000111",
      "edb_612782000112"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "name": "德怡國際幼稚園(元朗)",
    "nameEn": "TOPKIDS INTERNATIONAL KINDERGARTEN (YUEN LONG)",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "元朗區"
    ],
    "schoolIds": [
      "edb_602000000113",
      "edb_602000000112",
      "edb_602000000111"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "name": "多多寶馬山國際幼稚園",
    "nameEn": "TUTOR TIME BRAEMAR HILL INTERNATIONAL KINDERGARTEN",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "東區"
    ],
    "schoolIds": [
      "edb_575852000112",
      "edb_575852000111"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "name": "多多國際幼稚園（九龍塘）",
    "nameEn": "TUTOR TIME INTERNATIONAL KINDERGARTEN (KOWLOON TONG)",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "九龍城區"
    ],
    "schoolIds": [
      "edb_542504000111",
      "edb_542504000112"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "name": "多多國際幼稚園（半山）",
    "nameEn": "TUTOR TIME INTERNATIONAL KINDERGARTEN (MID LEVELS)",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "中西區"
    ],
    "schoolIds": [
      "edb_593133000111",
      "edb_593133000112"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "name": "多多國際幼稚園（形點）",
    "nameEn": "TUTOR TIME INTERNATIONAL KINDERGARTEN (YOHO)",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "元朗區"
    ],
    "schoolIds": [
      "edb_605794000111",
      "edb_605794000112"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "name": "維多利亞(何文田)國際幼稚園",
    "nameEn": "VICTORIA (HOMANTIN) INTERNATIONAL KINDERGARTEN",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "九龍城區"
    ],
    "schoolIds": [
      "edb_618039000112",
      "edb_618039000111"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 105280,
    "tuitionMax": 206510
  },
  {
    "name": "維多利亞（何文田）國際幼兒園",
    "nameEn": "VICTORIA (HOMANTIN) INTERNATIONAL NURSERY",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "九龍城區"
    ],
    "schoolIds": [
      "edb_566900000112",
      "edb_566900000113",
      "edb_566900000111"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 105280,
    "tuitionMax": 206510
  },
  {
    "name": "維多利亞(海之戀)國際幼稚園",
    "nameEn": "VICTORIA (OCEAN PRIDE) INTERNATIONAL KINDERGARTEN",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "荃灣區"
    ],
    "schoolIds": [
      "edb_619850000111",
      "edb_619850000112"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 102400,
    "tuitionMax": 127919
  },
  {
    "name": "維多利亞（海怡）國際幼稚園",
    "nameEn": "VICTORIA (SOUTH HORIZONS) INTERNATIONAL KINDERGARTEN",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "南區"
    ],
    "schoolIds": [
      "edb_216194000111",
      "edb_216194000113",
      "edb_216194000112"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 110520,
    "tuitionMax": 207140
  },
  {
    "name": "滬江維多利亞學校",
    "nameEn": "VICTORIA SHANGHAI ACADEMY",
    "levels": [
      "小學",
      "中學"
    ],
    "category": "國際",
    "districts": [
      "南區"
    ],
    "schoolIds": [
      "edb_560138000223",
      "edb_560138000233"
    ],
    "curriculumV2": [
      "IB"
    ],
    "instructionLanguages": [
      "ENGLISH",
      "PUTONGHUA"
    ],
    "tuitionMin": 181200,
    "tuitionMax": 255600
  },
  {
    "name": "宏廣國際幼稚園",
    "nameEn": "WELLCOME INTERNATIONAL KINDERGARTEN",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "屯門區"
    ],
    "schoolIds": [
      "edb_590401000111",
      "edb_590401000113",
      "edb_590401000112"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "name": "WEST ISLAND SCHOOL",
    "nameEn": "WEST ISLAND SCHOOL",
    "levels": [
      "中學"
    ],
    "category": "國際",
    "districts": [
      "南區"
    ],
    "schoolIds": [
      "edb_170992000133"
    ],
    "curriculumV2": [
      "IB"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 159400,
    "tuitionMax": 181100
  },
  {
    "name": "WILDERNESS INTERNATIONAL KINDERGARTEN",
    "nameEn": "WILDERNESS INTERNATIONAL KINDERGARTEN",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "中西區"
    ],
    "schoolIds": [
      "edb_607215000111",
      "edb_607215000112"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "name": "耀中國際幼稚園（根德道）",
    "nameEn": "YEW CHUNG INTERNATIONAL CHILDREN'S HOUSE (KENT ROAD)",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "九龍城區"
    ],
    "schoolIds": [
      "edb_566128000111",
      "edb_566128000113",
      "edb_566128000112"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "name": "耀中國際幼稚園（窩打老道）",
    "nameEn": "YEW CHUNG INTERNATIONAL CHILDREN'S HOUSE (WATERLOO ROAD)",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "九龍城區"
    ],
    "schoolIds": [
      "edb_566110000113"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "name": "耀中國際幼稚園(將軍澳)",
    "nameEn": "YEW CHUNG INTERNATIONAL KINDERGARTEN (TSEUNG KWAN O)",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "西貢區"
    ],
    "schoolIds": [
      "edb_613517000111",
      "edb_613517000112",
      "edb_613517000113"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "name": "耀中國際學校",
    "nameEn": "YEW CHUNG INTERNATIONAL SCHOOL",
    "levels": [
      "幼稚園",
      "小學"
    ],
    "category": "國際",
    "districts": [
      "九龍城區"
    ],
    "schoolIds": [
      "edb_325147000611",
      "edb_325147000612",
      "edb_325147000613",
      "edb_325147000223",
      "edb_325147000623",
      "edb_325147000423"
    ],
    "curriculumV2": [
      "IB"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 134728,
    "tuitionMax": 265420
  },
  {
    "name": "耀中國際學校（中學）",
    "nameEn": "YEW CHUNG INTERNATIONAL SCHOOL - SECONDARY",
    "levels": [
      "中學"
    ],
    "category": "國際",
    "districts": [
      "九龍城區"
    ],
    "schoolIds": [
      "edb_567450000133"
    ],
    "curriculumV2": [
      "IB"
    ],
    "instructionLanguages": [
      "ENGLISH"
    ],
    "tuitionMin": 266040,
    "tuitionMax": 272140
  },
  {
    "name": "港青基信國際幼稚園",
    "nameEn": "YMCA OF HONG KONG CHRISTIAN INTERNATIONAL KINDERGARTEN",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "油尖旺區"
    ],
    "schoolIds": [
      "edb_216178000111",
      "edb_216178000113",
      "edb_216178000112"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 71220,
    "tuitionMax": 125480
  },
  {
    "name": "約克國際幼稚園",
    "nameEn": "YORK INTERNATIONAL KINDERGARTEN",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "九龍城區"
    ],
    "schoolIds": [
      "edb_581852000111",
      "edb_581852000112",
      "edb_581852000311",
      "edb_581852000312"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "name": "YORK INTERNATIONAL PRE-SCHOOL",
    "nameEn": "YORK INTERNATIONAL PRE-SCHOOL",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "九龍城區"
    ],
    "schoolIds": [
      "edb_578479000111",
      "edb_578479000112"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "name": "YORK INTERNATIONAL PRE-SCHOOL (TUEN MUN)",
    "nameEn": "YORK INTERNATIONAL PRE-SCHOOL (TUEN MUN)",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "屯門區"
    ],
    "schoolIds": [
      "edb_616990000112",
      "edb_616990000113",
      "edb_616990000111"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "name": "YORK INTERNATIONAL PRE-SCHOOL (WETLAND)",
    "nameEn": "YORK INTERNATIONAL PRE-SCHOOL (WETLAND)",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "元朗區"
    ],
    "schoolIds": [
      "edb_621480000112",
      "edb_621480000113",
      "edb_621480000111"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "name": "YORK MONTESSORI INTERNATIONAL PRE-SCHOOL (MEI FOO)",
    "nameEn": "YORK MONTESSORI INTERNATIONAL PRE-SCHOOL (MEI FOO)",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "深水埗區"
    ],
    "schoolIds": [
      "edb_604615000113",
      "edb_604615000112",
      "edb_604615000111"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "name": "YORK MONTESSORI INTERNATIONAL PRE-SCHOOL (TSEUNG KWAN O)",
    "nameEn": "YORK MONTESSORI INTERNATIONAL PRE-SCHOOL (TSEUNG KWAN O)",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "西貢區"
    ],
    "schoolIds": [
      "edb_609749000112",
      "edb_609749000111"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "name": "YORK MONTESSORI INTERNATIONAL PRE-SCHOOL (YUEN LONG)",
    "nameEn": "YORK MONTESSORI INTERNATIONAL PRE-SCHOOL (YUEN LONG)",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "元朗區"
    ],
    "schoolIds": [
      "edb_605441000112",
      "edb_605441000111"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  },
  {
    "name": "思百德國際幼稚園",
    "nameEn": "ZEBEDEE INTERNATIONAL PRESCHOOL",
    "levels": [
      "幼稚園"
    ],
    "category": "國際",
    "districts": [
      "大埔區"
    ],
    "schoolIds": [
      "edb_573973000112",
      "edb_573973000111"
    ],
    "curriculumV2": [],
    "instructionLanguages": [],
    "tuitionMin": 0,
    "tuitionMax": 0
  }
];

/**
 * Set of international school IDs for quick lookup
 */
export const internationalSchoolIds: Set<string> = new Set(internationalSchools.map(s => s.id));

/**
 * Check if a school ID is an international school
 */
export function isInternationalById(schoolId: string): boolean {
  return internationalSchoolIds.has(schoolId);
}

/**
 * Get international schools by level
 */
export function getInternationalByLevel(level: "幼稚園" | "小學" | "中學"): InternationalSchoolEntry[] {
  return internationalSchools.filter(s => s.level === level);
}

/**
 * Get unique international schools that include a specific level
 */
export function getUniqueInternationalByLevel(level: "幼稚園" | "小學" | "中學"): UniqueInternationalSchool[] {
  return uniqueInternationalSchools.filter(s => s.levels.includes(level));
}
