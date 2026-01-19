// International School Database
// Source: Generated from existing school data using isInternational() logic
// Generated: 2026-01-19
// Total: 144 schools (幼稚園: 46, 小學: 58, 中學: 40)
// Unique: 60 schools (deduplicated by name)
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
    "tuitionMin": 0,
    "tuitionMax": 0
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
    "tuitionMin": 0,
    "tuitionMax": 0
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
    "tuitionMin": 0,
    "tuitionMax": 0
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
    "tuitionMax": 143700
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
    "tuitionMin": 190700,
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
    "tuitionMin": 0,
    "tuitionMax": 0
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
    "tuitionMin": 0,
    "tuitionMax": 0
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
    "tuitionMin": 0,
    "tuitionMax": 0
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
    "tuitionMin": 0,
    "tuitionMax": 0
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
    "tuitionMin": 0,
    "tuitionMax": 0
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
    "tuitionMin": 0,
    "tuitionMax": 0
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
    "tuitionMin": 0,
    "tuitionMax": 0
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
    "tuitionMin": 208800,
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
    "tuitionMin": 251400,
    "tuitionMax": 267100
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
    "tuitionMin": 79100,
    "tuitionMax": 103000
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
    "tuitionMin": 0,
    "tuitionMax": 0
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
    "tuitionMin": 146093,
    "tuitionMax": 151218
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
    "tuitionMin": 146093,
    "tuitionMax": 151984
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
    "tuitionMin": 0,
    "tuitionMax": 0
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
    "tuitionMin": 151984,
    "tuitionMax": 161373
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
    "tuitionMin": 0,
    "tuitionMax": 0
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
    "tuitionMin": 202000,
    "tuitionMax": 217599
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
  }
];

/**
 * Deduplicated list of international schools (grouped by school name)
 * This matches the UI count when filtering by "國際" (~95 schools)
 * Each entry aggregates all levels and campuses for that school
 */
export const uniqueInternationalSchools: UniqueInternationalSchool[] = [
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
    "tuitionMin": 208800,
    "tuitionMax": 267100
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
    "tuitionMin": 79100,
    "tuitionMax": 103000
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
    "tuitionMin": 146093,
    "tuitionMax": 217599
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
