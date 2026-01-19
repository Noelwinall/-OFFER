// School Metadata Mapping
// Sources: psp_2025_tc.csv, ssp_2025_2026_tc.csv, through_train schools data
// Generated: 2026-01-17
// Total mappings: 742
// Stats: 561 religions, 438 school nets, 2 special schools, 126 relationships
//
// DO NOT EDIT - Run `npx tsx scripts/generate-school-metadata.ts` to regenerate

import type { SchoolRelationship } from "@/types/school";

export interface SchoolMetadataEntry {
  religion?: string;
  schoolNet?: string;
  isSpecialSchool?: boolean;
  relationship?: SchoolRelationship;
}

export const schoolMetadataMap: Record<string, SchoolMetadataEntry> = {
  "edb_513601000123": {
    "religion": "基督教",
    "schoolNet": "11"
  },
  "edb_170070000323": {
    "religion": "基督教",
    "relationship": "AFFILIATED"
  },
  "edb_511382000123": {
    "religion": "天主教",
    "schoolNet": "11"
  },
  "edb_536377000123": {
    "schoolNet": "11"
  },
  "edb_513750000123": {
    "schoolNet": "11",
    "relationship": "THROUGH_TRAIN"
  },
  "edb_534242000123": {
    "religion": "天主教",
    "schoolNet": "11"
  },
  "edb_510882000123": {
    "schoolNet": "11",
    "relationship": "LINKED"
  },
  "edb_513687000123": {
    "religion": "天主教",
    "schoolNet": "11",
    "relationship": "AFFILIATED"
  },
  "edb_210315000121": {
    "religion": "天主教",
    "relationship": "AFFILIATED"
  },
  "edb_170194000223": {
    "religion": "基督教",
    "schoolNet": "11",
    "relationship": "AFFILIATED"
  },
  "edb_511552000123": {
    "schoolNet": "11"
  },
  "edb_512443000123": {
    "schoolNet": "11"
  },
  "edb_513539000223": {
    "religion": "基督教",
    "schoolNet": "11"
  },
  "edb_132853000123": {
    "religion": "天主教",
    "schoolNet": "11"
  },
  "edb_513555000123": {
    "religion": "基督教",
    "schoolNet": "11"
  },
  "edb_513628000123": {
    "religion": "基督教",
    "schoolNet": "11"
  },
  "edb_591904000123": {
    "religion": "天主教",
    "relationship": "AFFILIATED"
  },
  "edb_512273000223": {
    "religion": "基督教",
    "relationship": "LINKED"
  },
  "edb_513954000123": {
    "religion": "天主教",
    "schoolNet": "11"
  },
  "edb_528781000123": {
    "schoolNet": "11",
    "relationship": "LINKED"
  },
  "edb_210021000123": {
    "religion": "天主教",
    "relationship": "AFFILIATED"
  },
  "edb_513709000123": {
    "religion": "天主教",
    "schoolNet": "16",
    "relationship": "AFFILIATED"
  },
  "edb_543306000123": {
    "religion": "基督教",
    "schoolNet": "16"
  },
  "edb_513610000123": {
    "religion": "基督教",
    "schoolNet": "14"
  },
  "edb_136204000223": {
    "religion": "基督教",
    "schoolNet": "14"
  },
  "edb_510750000123": {
    "religion": "基督教",
    "schoolNet": "14"
  },
  "edb_511250000123": {
    "religion": "佛教",
    "schoolNet": "14"
  },
  "edb_515248000123": {
    "schoolNet": "16"
  },
  "edb_511358000123": {
    "religion": "天主教",
    "schoolNet": "14",
    "relationship": "LINKED"
  },
  "edb_579556000123": {
    "religion": "基督教",
    "schoolNet": "14"
  },
  "edb_510157000123": {
    "schoolNet": "14",
    "relationship": "LINKED"
  },
  "edb_571180000123": {
    "relationship": "LINKED"
  },
  "edb_513822000123": {
    "schoolNet": "14"
  },
  "edb_514446000223": {
    "schoolNet": "14"
  },
  "edb_534196000123": {
    "schoolNet": "16",
    "relationship": "LINKED"
  },
  "edb_510858000123": {
    "religion": "基督教",
    "schoolNet": "16"
  },
  "edb_511404000123": {
    "religion": "基督教",
    "schoolNet": "16"
  },
  "edb_150436000123": {
    "religion": "天主教",
    "schoolNet": "16"
  },
  "edb_535613000123": {
    "schoolNet": "16"
  },
  "edb_554618000123": {
    "religion": "基督教",
    "schoolNet": "16"
  },
  "edb_510629000123": {
    "schoolNet": "16",
    "relationship": "LINKED"
  },
  "edb_513857000123": {
    "religion": "基督教",
    "schoolNet": "16"
  },
  "edb_514497000123": {
    "schoolNet": "16"
  },
  "edb_514551000123": {
    "religion": "基督教",
    "schoolNet": "16"
  },
  "edb_540234000123": {
    "relationship": "THROUGH_TRAIN"
  },
  "edb_572365000123": {
    "religion": "基督教"
  },
  "edb_522023000123": {
    "religion": "道教",
    "schoolNet": "98"
  },
  "edb_511315000123": {
    "schoolNet": "98"
  },
  "edb_536547000233": {
    "religion": "天主教",
    "schoolNet": "98",
    "relationship": "THROUGH_TRAIN"
  },
  "edb_113433000123": {
    "religion": "天主教",
    "schoolNet": "99"
  },
  "edb_513105000123": {
    "schoolNet": "96"
  },
  "edb_150550000123": {
    "religion": "天主教",
    "schoolNet": "97"
  },
  "edb_512559000123": {
    "schoolNet": "97"
  },
  "edb_514411000123": {
    "religion": "基督教",
    "schoolNet": "98"
  },
  "edb_535672000223": {
    "schoolNet": "98",
    "relationship": "THROUGH_TRAIN"
  },
  "edb_535753000223": {
    "religion": "基督教",
    "schoolNet": "98"
  },
  "edb_115819000123": {
    "religion": "基督教",
    "schoolNet": "99"
  },
  "edb_530026000123": {
    "religion": "基督教",
    "schoolNet": "98",
    "relationship": "THROUGH_TRAIN"
  },
  "edb_511439000123": {
    "religion": "基督教",
    "schoolNet": "97"
  },
  "edb_522074000233": {
    "religion": "其他",
    "schoolNet": "98",
    "relationship": "THROUGH_TRAIN"
  },
  "edb_510149000123": {
    "schoolNet": "98"
  },
  "edb_579548000123": {
    "religion": "天主教",
    "schoolNet": "41"
  },
  "edb_512664000123": {
    "religion": "天主教",
    "schoolNet": "34"
  },
  "edb_510130000123": {
    "schoolNet": "34",
    "relationship": "LINKED"
  },
  "edb_513113000123": {
    "religion": "天主教",
    "schoolNet": "34"
  },
  "edb_514250000123": {
    "religion": "天主教",
    "schoolNet": "34",
    "relationship": "AFFILIATED"
  },
  "edb_521990000123": {
    "schoolNet": "35"
  },
  "edb_513350000123": {
    "religion": "基督教",
    "relationship": "AFFILIATED"
  },
  "edb_511862000123": {
    "religion": "基督教",
    "schoolNet": "34"
  },
  "edb_522007000123": {
    "religion": "基督教",
    "schoolNet": "35"
  },
  "edb_540218000123": {
    "religion": "基督教",
    "schoolNet": "35"
  },
  "edb_513458000123": {
    "religion": "基督教",
    "schoolNet": "35"
  },
  "edb_560642000123": {
    "religion": "基督教",
    "schoolNet": "41"
  },
  "edb_512060000123": {
    "religion": "天主教",
    "schoolNet": "41",
    "relationship": "AFFILIATED"
  },
  "edb_131806000123": {
    "schoolNet": "41"
  },
  "edb_512591000123": {
    "religion": "天主教",
    "schoolNet": "41",
    "relationship": "AFFILIATED"
  },
  "edb_512826000123": {
    "religion": "天主教",
    "schoolNet": "41",
    "relationship": "AFFILIATED"
  },
  "edb_133442000123": {
    "religion": "基督教"
  },
  "edb_594792000123": {
    "religion": "基督教",
    "relationship": "LINKED"
  },
  "edb_324477000123": {
    "religion": "基督教",
    "relationship": "LINKED"
  },
  "edb_511722000123": {
    "religion": "其他",
    "schoolNet": "41"
  },
  "edb_511420000123": {
    "religion": "天主教",
    "schoolNet": "34"
  },
  "edb_512192000123": {
    "religion": "基督教",
    "schoolNet": "34"
  },
  "edb_134872000123": {
    "religion": "基督教",
    "schoolNet": "34"
  },
  "edb_510050000123": {
    "schoolNet": "34",
    "relationship": "LINKED"
  },
  "edb_511927000223": {
    "religion": "基督教",
    "schoolNet": "34"
  },
  "edb_512052000123": {
    "religion": "基督教",
    "schoolNet": "34"
  },
  "edb_512176000223": {
    "religion": "基督教",
    "schoolNet": "34"
  },
  "edb_539171000123": {
    "schoolNet": "35",
    "relationship": "LINKED"
  },
  "edb_540196000223": {
    "religion": "天主教",
    "schoolNet": "41",
    "relationship": "AFFILIATED"
  },
  "edb_575399000123": {
    "religion": "基督教",
    "relationship": "AFFILIATED"
  },
  "edb_560634000123": {
    "religion": "基督教",
    "schoolNet": "34",
    "relationship": "THROUGH_TRAIN"
  },
  "edb_512044000123": {
    "religion": "天主教",
    "schoolNet": "35",
    "relationship": "THROUGH_TRAIN"
  },
  "edb_513644000123": {
    "religion": "基督教",
    "schoolNet": "35"
  },
  "edb_539180000123": {
    "schoolNet": "41",
    "relationship": "LINKED"
  },
  "edb_131350000123": {
    "religion": "基督教",
    "relationship": "LINKED"
  },
  "edb_511692000223": {
    "religion": "基督教",
    "schoolNet": "46"
  },
  "edb_514519000223": {
    "religion": "道教",
    "schoolNet": "46"
  },
  "edb_510564000123": {
    "religion": "天主教",
    "schoolNet": "48"
  },
  "edb_511366000123": {
    "religion": "基督教",
    "schoolNet": "46"
  },
  "edb_511242000223": {
    "religion": "佛教",
    "schoolNet": "46"
  },
  "edb_535648000123": {
    "religion": "基督教",
    "schoolNet": "48"
  },
  "edb_575615000123": {
    "religion": "天主教",
    "schoolNet": "46"
  },
  "edb_543187000123": {
    "religion": "天主教",
    "schoolNet": "46"
  },
  "edb_550248000123": {
    "religion": "天主教",
    "schoolNet": "46"
  },
  "edb_513164000123": {
    "religion": "天主教",
    "schoolNet": "46"
  },
  "edb_550396000123": {
    "religion": "基督教",
    "schoolNet": "46"
  },
  "edb_513598000223": {
    "religion": "基督教",
    "schoolNet": "48"
  },
  "edb_560448000123": {
    "religion": "基督教",
    "schoolNet": "48"
  },
  "edb_518441000123": {
    "religion": "道教",
    "schoolNet": "48"
  },
  "edb_535800000123": {
    "religion": "天主教",
    "schoolNet": "48"
  },
  "edb_512770000123": {
    "schoolNet": "48"
  },
  "edb_513474000123": {
    "religion": "基督教",
    "schoolNet": "48"
  },
  "edb_518425000123": {
    "religion": "基督教",
    "schoolNet": "48"
  },
  "edb_550400000123": {
    "religion": "基督教",
    "schoolNet": "48"
  },
  "edb_560430000123": {
    "religion": "基督教",
    "schoolNet": "48"
  },
  "edb_513768000223": {
    "religion": "天主教",
    "schoolNet": "48"
  },
  "edb_535664000123": {
    "schoolNet": "48"
  },
  "edb_513962000223": {
    "religion": "天主教",
    "schoolNet": "48"
  },
  "edb_519596000123": {
    "religion": "天主教",
    "schoolNet": "48"
  },
  "edb_540242000123": {
    "religion": "基督教",
    "schoolNet": "48"
  },
  "edb_513466000123": {
    "religion": "基督教",
    "schoolNet": "48"
  },
  "edb_512303000123": {
    "religion": "基督教",
    "schoolNet": "48"
  },
  "edb_514080000123": {
    "religion": "天主教",
    "schoolNet": "48"
  },
  "edb_510530000123": {
    "schoolNet": "48",
    "relationship": "LINKED"
  },
  "edb_211303000123": {
    "religion": "天主教",
    "relationship": "AFFILIATED"
  },
  "edb_512729000123": {
    "schoolNet": "48",
    "relationship": "LINKED"
  },
  "edb_579319000123": {
    "relationship": "THROUGH_TRAIN"
  },
  "edb_114030000123": {
    "religion": "佛教",
    "schoolNet": "65"
  },
  "edb_113190000123": {
    "religion": "基督教",
    "schoolNet": "65"
  },
  "edb_511560000123": {
    "religion": "天主教",
    "schoolNet": "65"
  },
  "edb_543195000123": {
    "religion": "基督教",
    "schoolNet": "65",
    "relationship": "LINKED"
  },
  "edb_522031000123": {
    "religion": "佛教",
    "schoolNet": "65"
  },
  "edb_115355000123": {
    "religion": "基督教",
    "schoolNet": "66"
  },
  "edb_554669000123": {
    "religion": "天主教",
    "schoolNet": "64"
  },
  "edb_115010000123": {
    "schoolNet": "66"
  },
  "edb_115770000123": {
    "religion": "基督教",
    "schoolNet": "66"
  },
  "edb_543179000123": {
    "religion": "基督教",
    "schoolNet": "66"
  },
  "edb_114936000123": {
    "schoolNet": "66"
  },
  "edb_569909000123": {
    "relationship": "THROUGH_TRAIN"
  },
  "edb_114006000223": {
    "religion": "天主教",
    "schoolNet": "64"
  },
  "edb_113980000223": {
    "religion": "基督教",
    "schoolNet": "64"
  },
  "edb_115789000123": {
    "religion": "天主教",
    "schoolNet": "64"
  },
  "edb_575720000123": {
    "religion": "天主教",
    "schoolNet": "64"
  },
  "edb_510769000123": {
    "religion": "基督教",
    "schoolNet": "65",
    "relationship": "LINKED"
  },
  "edb_114170000123": {
    "religion": "基督教",
    "schoolNet": "65"
  },
  "edb_512290000223": {
    "religion": "基督教",
    "schoolNet": "65"
  },
  "edb_114316000123": {
    "religion": "基督教",
    "schoolNet": "65"
  },
  "edb_114502000123": {
    "schoolNet": "65"
  },
  "edb_113972000123": {
    "religion": "基督教",
    "schoolNet": "65",
    "relationship": "LINKED"
  },
  "edb_114545000123": {
    "religion": "天主教",
    "schoolNet": "40"
  },
  "edb_543217000123": {
    "schoolNet": "66"
  },
  "edb_535737000123": {
    "religion": "基督教",
    "schoolNet": "66"
  },
  "edb_560685000123": {
    "schoolNet": "66"
  },
  "edb_115363000123": {
    "schoolNet": "66"
  },
  "edb_115150000123": {
    "schoolNet": "66"
  },
  "edb_115487000123": {
    "schoolNet": "66"
  },
  "edb_550450000123": {
    "religion": "佛教",
    "schoolNet": "80"
  },
  "edb_515086000123": {
    "schoolNet": "80"
  },
  "edb_115169000123": {
    "religion": "基督教",
    "schoolNet": "81"
  },
  "edb_535680000123": {
    "religion": "基督教",
    "schoolNet": "81"
  },
  "edb_510785000123": {
    "schoolNet": "81",
    "relationship": "LINKED"
  },
  "edb_115266000123": {
    "schoolNet": "80"
  },
  "edb_115398000123": {
    "schoolNet": "80"
  },
  "edb_578320000223": {
    "schoolNet": "80"
  },
  "edb_539953000123": {
    "religion": "基督教",
    "schoolNet": "81"
  },
  "edb_115592000123": {
    "schoolNet": "81"
  },
  "edb_514365000123": {
    "schoolNet": "81"
  },
  "edb_112836000223": {
    "schoolNet": "83"
  },
  "edb_114804000123": {
    "religion": "佛教",
    "schoolNet": "80"
  },
  "edb_512257000123": {
    "schoolNet": "80"
  },
  "edb_115525000123": {
    "religion": "基督教",
    "schoolNet": "80"
  },
  "edb_554596000123": {
    "schoolNet": "80"
  },
  "edb_114979000223": {
    "schoolNet": "80"
  },
  "edb_115622000123": {
    "schoolNet": "81"
  },
  "edb_115460000123": {
    "schoolNet": "83"
  },
  "edb_529540000123": {
    "religion": "基督教",
    "schoolNet": "81"
  },
  "edb_114405000123": {
    "schoolNet": "80"
  },
  "edb_566462000123": {
    "schoolNet": "80"
  },
  "edb_115681000123": {
    "schoolNet": "80"
  },
  "edb_113000000123": {
    "schoolNet": "80"
  },
  "edb_113409000223": {
    "religion": "基督教",
    "schoolNet": "81"
  },
  "edb_511749000123": {
    "schoolNet": "81"
  },
  "edb_115339000123": {
    "religion": "佛教",
    "schoolNet": "81"
  },
  "edb_112992000123": {
    "religion": "天主教",
    "schoolNet": "81"
  },
  "edb_522163000123": {
    "religion": "基督教",
    "schoolNet": "95"
  },
  "edb_115207000123": {
    "relationship": "THROUGH_TRAIN"
  },
  "edb_522040000123": {
    "schoolNet": "95"
  },
  "edb_516996000123": {
    "schoolNet": "95"
  },
  "edb_524824000123": {
    "schoolNet": "95"
  },
  "edb_115479000123": {
    "schoolNet": "95"
  },
  "edb_522171000123": {
    "religion": "基督教",
    "schoolNet": "95"
  },
  "edb_538809000123": {
    "religion": "基督教",
    "schoolNet": "95",
    "relationship": "LINKED"
  },
  "edb_115606000123": {
    "religion": "天主教",
    "schoolNet": "95"
  },
  "edb_529249000123": {
    "schoolNet": "95"
  },
  "edb_558672000123": {
    "religion": "基督教",
    "schoolNet": "95"
  },
  "edb_518506000123": {
    "schoolNet": "95"
  },
  "edb_554600000123": {
    "religion": "天主教",
    "schoolNet": "95"
  },
  "edb_518476000123": {
    "schoolNet": "95"
  },
  "edb_516864000123": {
    "schoolNet": "95"
  },
  "edb_543292000233": {
    "relationship": "THROUGH_TRAIN"
  },
  "edb_529257000123": {
    "religion": "天主教",
    "schoolNet": "95"
  },
  "edb_543314000333": {
    "religion": "基督教",
    "relationship": "THROUGH_TRAIN"
  },
  "edb_524581000123": {
    "religion": "佛教",
    "schoolNet": "95"
  },
  "edb_528986000123": {
    "religion": "天主教",
    "schoolNet": "95",
    "relationship": "THROUGH_TRAIN"
  },
  "edb_510696000123": {
    "schoolNet": "95",
    "relationship": "LINKED"
  },
  "edb_556483000123": {
    "religion": "基督教",
    "schoolNet": "95"
  },
  "edb_567337000133": {
    "religion": "基督教",
    "relationship": "THROUGH_TRAIN"
  },
  "edb_516880000123": {
    "religion": "佛教",
    "schoolNet": "95",
    "relationship": "THROUGH_TRAIN"
  },
  "edb_518468000123": {
    "schoolNet": "95"
  },
  "edb_115630000123": {
    "religion": "基督教",
    "schoolNet": "95",
    "relationship": "LINKED"
  },
  "edb_514233000123": {
    "religion": "天主教",
    "schoolNet": "18",
    "relationship": "AFFILIATED"
  },
  "edb_511137000123": {
    "schoolNet": "18"
  },
  "edb_535591000123": {
    "religion": "天主教",
    "schoolNet": "18"
  },
  "edb_513431000123": {
    "religion": "基督教",
    "schoolNet": "18"
  },
  "edb_514187000323": {
    "religion": "基督教",
    "relationship": "THROUGH_TRAIN"
  },
  "edb_536989000123": {
    "schoolNet": "18",
    "relationship": "LINKED"
  },
  "edb_513326000123": {
    "religion": "天主教"
  },
  "edb_530000000123": {
    "religion": "基督教",
    "schoolNet": "18"
  },
  "edb_512036000123": {
    "schoolNet": "18"
  },
  "edb_517372000123": {
    "religion": "基督教",
    "relationship": "AFFILIATED"
  },
  "edb_560529000123": {
    "religion": "天主教",
    "schoolNet": "18",
    "relationship": "AFFILIATED"
  },
  "edb_513385000123": {
    "religion": "天主教",
    "schoolNet": "18",
    "relationship": "LINKED"
  },
  "edb_133566000123": {
    "religion": "天主教"
  },
  "edb_543551000123": {
    "schoolNet": "40",
    "relationship": "LINKED"
  },
  "edb_513130000223": {
    "religion": "天主教",
    "schoolNet": "40"
  },
  "edb_510963000123": {
    "religion": "基督教",
    "schoolNet": "40"
  },
  "edb_513814000123": {
    "schoolNet": "40"
  },
  "edb_510505000123": {
    "schoolNet": "40",
    "relationship": "LINKED"
  },
  "edb_511129000123": {
    "religion": "基督教",
    "schoolNet": "40"
  },
  "edb_511730000123": {
    "religion": "基督教",
    "schoolNet": "40"
  },
  "edb_514500000123": {
    "schoolNet": "40",
    "relationship": "LINKED"
  },
  "edb_575534000123": {
    "religion": "天主教",
    "schoolNet": "40",
    "relationship": "AFFILIATED"
  },
  "edb_514055000323": {
    "religion": "天主教",
    "schoolNet": "40"
  },
  "edb_510971000123": {
    "religion": "天主教",
    "schoolNet": "40"
  },
  "edb_512010000123": {
    "schoolNet": "40"
  },
  "edb_512214000223": {
    "religion": "天主教",
    "schoolNet": "40"
  },
  "edb_543276000123": {
    "religion": "天主教",
    "schoolNet": "40"
  },
  "edb_510874000123": {
    "schoolNet": "40",
    "relationship": "LINKED"
  },
  "edb_554626000123": {
    "religion": "基督教",
    "schoolNet": "40"
  },
  "edb_513490000123": {
    "religion": "基督教",
    "schoolNet": "40"
  },
  "edb_554650000123": {
    "religion": "基督教",
    "schoolNet": "40"
  },
  "edb_513636000223": {
    "religion": "基督教",
    "schoolNet": "40"
  },
  "edb_550477000123": {
    "religion": "基督教",
    "relationship": "THROUGH_TRAIN"
  },
  "edb_138177000123": {
    "religion": "基督教"
  },
  "edb_542105000333": {
    "religion": "天主教",
    "relationship": "THROUGH_TRAIN"
  },
  "edb_324434000123": {
    "religion": "天主教"
  },
  "edb_514659000123": {
    "religion": "基督教"
  },
  "edb_511790000123": {
    "schoolNet": "40"
  },
  "edb_569895000123": {
    "religion": "基督教"
  },
  "edb_579513000123": {
    "religion": "基督教",
    "schoolNet": "40"
  },
  "edb_114820000123": {
    "schoolNet": "88"
  },
  "edb_115320000123": {
    "schoolNet": "88"
  },
  "edb_115215000123": {
    "religion": "基督教",
    "schoolNet": "88"
  },
  "edb_115002000223": {
    "religion": "基督教",
    "schoolNet": "88"
  },
  "edb_114901000123": {
    "religion": "基督教",
    "schoolNet": "88"
  },
  "edb_114723000123": {
    "religion": "基督教",
    "schoolNet": "88"
  },
  "edb_510602000123": {
    "schoolNet": "88",
    "relationship": "LINKED"
  },
  "edb_115193000123": {
    "schoolNet": "88"
  },
  "edb_516899000123": {
    "religion": "道教",
    "schoolNet": "89"
  },
  "edb_115410000123": {
    "religion": "基督教",
    "schoolNet": "89"
  },
  "edb_115185000123": {
    "religion": "基督教",
    "schoolNet": "89"
  },
  "edb_535605000123": {
    "religion": "基督教",
    "schoolNet": "89"
  },
  "edb_115240000123": {
    "religion": "天主教",
    "schoolNet": "89"
  },
  "edb_115649000123": {
    "schoolNet": "89"
  },
  "edb_115428000123": {
    "schoolNet": "89"
  },
  "edb_571962000123": {
    "religion": "基督教",
    "schoolNet": "89"
  },
  "edb_510734000123": {
    "religion": "基督教",
    "schoolNet": "91",
    "relationship": "LINKED"
  },
  "edb_115134000123": {
    "schoolNet": "91"
  },
  "edb_579220000123": {
    "schoolNet": "91"
  },
  "edb_115371000123": {
    "schoolNet": "91"
  },
  "edb_115614000123": {
    "religion": "基督教",
    "schoolNet": "91"
  },
  "edb_114634000223": {
    "schoolNet": "91"
  },
  "edb_115118000123": {
    "schoolNet": "91"
  },
  "edb_114472000123": {
    "religion": "基督教",
    "schoolNet": "91"
  },
  "edb_115509000123": {
    "religion": "基督教",
    "schoolNet": "91"
  },
  "edb_114871000123": {
    "religion": "基督教",
    "schoolNet": "91"
  },
  "edb_114596000123": {
    "religion": "基督教",
    "schoolNet": "91"
  },
  "edb_535702000123": {
    "schoolNet": "89"
  },
  "edb_535729000123": {
    "religion": "基督教",
    "schoolNet": "89"
  },
  "edb_115070000123": {
    "schoolNet": "88",
    "relationship": "LINKED"
  },
  "edb_112950000223": {
    "religion": "天主教",
    "schoolNet": "88",
    "relationship": "LINKED"
  },
  "edb_114987000123": {
    "religion": "基督教",
    "schoolNet": "88"
  },
  "edb_115797000123": {
    "religion": "基督教",
    "schoolNet": "89"
  },
  "edb_150720000123": {
    "religion": "佛教",
    "schoolNet": "91"
  },
  "edb_114391000123": {
    "religion": "基督教",
    "schoolNet": "91",
    "relationship": "LINKED"
  },
  "edb_115584000123": {
    "religion": "基督教",
    "schoolNet": "91",
    "relationship": "LINKED"
  },
  "edb_114561000123": {
    "religion": "天主教",
    "schoolNet": "91"
  },
  "edb_533882000123": {
    "religion": "基督教",
    "schoolNet": "91",
    "relationship": "LINKED"
  },
  "edb_567353000133": {
    "religion": "基督教"
  },
  "edb_560553000133": {
    "relationship": "THROUGH_TRAIN"
  },
  "edb_115037000123": {
    "religion": "道教",
    "schoolNet": "70"
  },
  "edb_575500000123": {
    "religion": "道教",
    "schoolNet": "70"
  },
  "edb_114880000123": {
    "schoolNet": "70"
  },
  "edb_114200000223": {
    "religion": "基督教",
    "schoolNet": "70"
  },
  "edb_115568000123": {
    "religion": "基督教",
    "schoolNet": "70"
  },
  "edb_114944000123": {
    "schoolNet": "70"
  },
  "edb_115517000123": {
    "schoolNet": "70"
  },
  "edb_115380000123": {
    "schoolNet": "70"
  },
  "edb_115177000123": {
    "schoolNet": "70"
  },
  "edb_114910000123": {
    "schoolNet": "70",
    "relationship": "LINKED"
  },
  "edb_584118000123": {
    "schoolNet": "71",
    "relationship": "LINKED"
  },
  "edb_540200000123": {
    "schoolNet": "70",
    "relationship": "LINKED"
  },
  "edb_115576000123": {
    "schoolNet": "70"
  },
  "edb_114529000123": {
    "schoolNet": "70"
  },
  "edb_510289000123": {
    "schoolNet": "70",
    "relationship": "LINKED"
  },
  "edb_114839000123": {
    "religion": "天主教",
    "schoolNet": "70",
    "relationship": "LINKED"
  },
  "edb_115053000123": {
    "schoolNet": "71"
  },
  "edb_550426000123": {
    "schoolNet": "71"
  },
  "edb_114146000123": {
    "religion": "天主教",
    "schoolNet": "71",
    "relationship": "LINKED"
  },
  "edb_112550000323": {
    "schoolNet": "71"
  },
  "edb_114642000123": {
    "religion": "伊斯蘭教",
    "schoolNet": "71"
  },
  "edb_114898000123": {
    "schoolNet": "71",
    "relationship": "LINKED"
  },
  "edb_584126000123": {
    "schoolNet": "71",
    "relationship": "LINKED"
  },
  "edb_114766000123": {
    "schoolNet": "71",
    "relationship": "LINKED"
  },
  "edb_115100000123": {
    "schoolNet": "71",
    "relationship": "LINKED"
  },
  "edb_114928000123": {
    "schoolNet": "71"
  },
  "edb_114960000123": {
    "religion": "基督教",
    "schoolNet": "70"
  },
  "edb_115304000123": {
    "schoolNet": "70",
    "relationship": "LINKED"
  },
  "edb_115258000123": {
    "schoolNet": "70",
    "relationship": "LINKED"
  },
  "edb_114758000123": {
    "religion": "基督教",
    "schoolNet": "71",
    "relationship": "LINKED"
  },
  "edb_115061000123": {
    "religion": "基督教",
    "schoolNet": "71"
  },
  "edb_511323000123": {
    "religion": "基督教",
    "schoolNet": "71"
  },
  "edb_114715000123": {
    "schoolNet": "71"
  },
  "edb_543284000123": {
    "schoolNet": "84"
  },
  "edb_115126000123": {
    "schoolNet": "84"
  },
  "edb_113328000123": {
    "schoolNet": "84"
  },
  "edb_543225000123": {
    "schoolNet": "84"
  },
  "edb_542580000123": {
    "schoolNet": "84"
  },
  "edb_115762000123": {
    "schoolNet": "84"
  },
  "edb_115045000123": {
    "religion": "道教",
    "schoolNet": "84"
  },
  "edb_115665000123": {
    "schoolNet": "84"
  },
  "edb_114995000123": {
    "religion": "基督教",
    "schoolNet": "84"
  },
  "edb_575844000123": {
    "religion": "基督教",
    "schoolNet": "84"
  },
  "edb_115657000123": {
    "religion": "天主教",
    "schoolNet": "84"
  },
  "edb_115142000123": {
    "schoolNet": "84"
  },
  "edb_115290000123": {
    "schoolNet": "84",
    "relationship": "THROUGH_TRAIN"
  },
  "edb_510254000223": {
    "schoolNet": "84",
    "relationship": "LINKED"
  },
  "edb_114855000123": {
    "religion": "基督教",
    "schoolNet": "84"
  },
  "edb_115703000123": {
    "religion": "基督教",
    "schoolNet": "84"
  },
  "edb_115401000123": {
    "schoolNet": "84"
  },
  "edb_510513000123": {
    "schoolNet": "62",
    "relationship": "LINKED"
  },
  "edb_522015000123": {
    "religion": "基督教",
    "schoolNet": "62"
  },
  "edb_575526000123": {
    "religion": "天主教",
    "schoolNet": "62"
  },
  "edb_113107000123": {
    "schoolNet": "62"
  },
  "edb_113417000223": {
    "religion": "基督教",
    "schoolNet": "62"
  },
  "edb_114790000123": {
    "religion": "基督教",
    "schoolNet": "62"
  },
  "edb_550469000123": {
    "religion": "基督教",
    "schoolNet": "62"
  },
  "edb_575607000123": {
    "religion": "天主教",
    "schoolNet": "62"
  },
  "edb_511412000123": {
    "religion": "天主教",
    "schoolNet": "62"
  },
  "edb_150819000123": {
    "religion": "基督教",
    "schoolNet": "62"
  },
  "edb_114774000123": {
    "religion": "道教",
    "schoolNet": "62"
  },
  "edb_113778000123": {
    "religion": "基督教",
    "schoolNet": "62"
  },
  "edb_522180000223": {
    "religion": "天主教",
    "schoolNet": "62"
  },
  "edb_113751000123": {
    "religion": "天主教",
    "schoolNet": "62"
  },
  "edb_528773000123": {
    "schoolNet": "62",
    "relationship": "LINKED"
  },
  "edb_514632000123": {
    "schoolNet": "62"
  },
  "edb_114413000123": {
    "religion": "天主教",
    "schoolNet": "64"
  },
  "edb_114430000123": {
    "religion": "其他",
    "schoolNet": "64"
  },
  "edb_531510000123": {
    "religion": "基督教",
    "schoolNet": "64"
  },
  "edb_114863000123": {
    "religion": "天主教",
    "schoolNet": "62"
  },
  "edb_113174000123": {
    "religion": "天主教",
    "schoolNet": "62"
  },
  "edb_511293000123": {
    "religion": "佛教",
    "schoolNet": "12",
    "relationship": "THROUGH_TRAIN"
  },
  "edb_512850000123": {
    "religion": "天主教",
    "schoolNet": "12",
    "relationship": "AFFILIATED"
  },
  "edb_575240000123": {
    "religion": "天主教",
    "relationship": "AFFILIATED"
  },
  "edb_510238000123": {
    "schoolNet": "12",
    "relationship": "LINKED"
  },
  "edb_170062000223": {
    "religion": "天主教",
    "schoolNet": "12",
    "relationship": "AFFILIATED"
  },
  "edb_170054000123": {
    "religion": "天主教",
    "schoolNet": "12",
    "relationship": "AFFILIATED"
  },
  "edb_512648000123": {
    "schoolNet": "12"
  },
  "edb_513180000123": {
    "religion": "佛教",
    "schoolNet": "12"
  },
  "edb_510190000123": {
    "schoolNet": "12"
  },
  "edb_510920000223": {
    "religion": "天主教",
    "schoolNet": "14",
    "relationship": "AFFILIATED"
  },
  "edb_513580000123": {
    "religion": "基督教",
    "schoolNet": "12"
  },
  "edb_510335000123": {
    "schoolNet": "12"
  },
  "edb_132047000123": {
    "religion": "基督教"
  },
  "edb_510084000123": {
    "schoolNet": "12"
  },
  "edb_601667000123": {
    "schoolNet": "12"
  },
  "edb_513318000123": {
    "religion": "天主教",
    "schoolNet": "12"
  },
  "edb_170151000123": {
    "religion": "天主教",
    "schoolNet": "12",
    "relationship": "AFFILIATED"
  },
  "edb_212326000123": {
    "religion": "天主教",
    "relationship": "AFFILIATED"
  },
  "edb_513253000123": {
    "religion": "天主教"
  },
  "edb_511579000123": {
    "religion": "天主教",
    "schoolNet": "45"
  },
  "edb_518492000123": {
    "religion": "其他",
    "schoolNet": "45"
  },
  "edb_535788000123": {
    "religion": "天主教",
    "schoolNet": "45",
    "relationship": "LINKED"
  },
  "edb_511676000123": {
    "religion": "孔教"
  },
  "edb_511161000123": {
    "religion": "基督教",
    "schoolNet": "34"
  },
  "edb_511196000123": {
    "religion": "天主教",
    "schoolNet": "43"
  },
  "edb_513334000123": {
    "religion": "天主教"
  },
  "edb_514926000123": {
    "religion": "天主教",
    "schoolNet": "43"
  },
  "edb_510718000123": {
    "schoolNet": "43",
    "relationship": "LINKED"
  },
  "edb_512389000123": {
    "religion": "基督教",
    "schoolNet": "45"
  },
  "edb_550418000223": {
    "religion": "天主教",
    "schoolNet": "45"
  },
  "edb_512125000123": {
    "religion": "基督教",
    "schoolNet": "45"
  },
  "edb_514004000123": {
    "religion": "天主教",
    "schoolNet": "45",
    "relationship": "LINKED"
  },
  "edb_543250000123": {
    "religion": "天主教",
    "schoolNet": "45"
  },
  "edb_512370000123": {
    "religion": "基督教",
    "schoolNet": "45"
  },
  "edb_543268000123": {
    "religion": "天主教",
    "schoolNet": "45"
  },
  "edb_588130000123": {
    "religion": "天主教"
  },
  "edb_511340000123": {
    "religion": "天主教",
    "schoolNet": "43"
  },
  "edb_513059000123": {
    "religion": "天主教",
    "schoolNet": "43",
    "relationship": "AFFILIATED"
  },
  "edb_114090000323": {
    "schoolNet": "34",
    "relationship": "LINKED"
  },
  "edb_513512000123": {
    "religion": "基督教",
    "schoolNet": "43"
  },
  "edb_514160000123": {
    "religion": "天主教",
    "schoolNet": "43"
  },
  "edb_518484000123": {
    "religion": "伊斯蘭教",
    "schoolNet": "45"
  },
  "edb_510181000223": {
    "schoolNet": "43",
    "relationship": "LINKED"
  },
  "edb_543241000123": {
    "schoolNet": "45",
    "relationship": "LINKED"
  },
  "edb_510939000223": {
    "religion": "基督教",
    "schoolNet": "34"
  },
  "edb_553867000333": {
    "religion": "基督教"
  },
  "edb_528617000123": {
    "religion": "天主教",
    "relationship": "AFFILIATED"
  },
  "edb_510017000123": {
    "religion": "天主教",
    "schoolNet": "41"
  },
  "edb_514683000123": {
    "schoolNet": "74"
  },
  "edb_112755000123": {
    "religion": "佛教",
    "schoolNet": "72"
  },
  "edb_115223000123": {
    "schoolNet": "73"
  },
  "edb_530409000123": {
    "religion": "基督教",
    "schoolNet": "72",
    "relationship": "THROUGH_TRAIN"
  },
  "edb_114685000123": {
    "schoolNet": "73"
  },
  "edb_515051000123": {
    "schoolNet": "73"
  },
  "edb_540226000123": {
    "religion": "基督教",
    "schoolNet": "74"
  },
  "edb_511609000223": {
    "religion": "基督教",
    "schoolNet": "74"
  },
  "edb_535621000223": {
    "religion": "基督教",
    "schoolNet": "72",
    "relationship": "THROUGH_TRAIN"
  },
  "edb_535699000123": {
    "religion": "基督教",
    "schoolNet": "72"
  },
  "edb_554634000123": {
    "schoolNet": "72"
  },
  "edb_115738000123": {
    "schoolNet": "72"
  },
  "edb_535630000123": {
    "schoolNet": "72"
  },
  "edb_115711000223": {
    "religion": "其他",
    "schoolNet": "72"
  },
  "edb_543233000223": {
    "religion": "基督教",
    "schoolNet": "72"
  },
  "edb_529770000123": {
    "schoolNet": "72"
  },
  "edb_115800000123": {
    "schoolNet": "72"
  },
  "edb_529532000123": {
    "schoolNet": "72",
    "relationship": "THROUGH_TRAIN"
  },
  "edb_115720000123": {
    "schoolNet": "72",
    "relationship": "THROUGH_TRAIN"
  },
  "edb_549371000223": {
    "religion": "基督教",
    "schoolNet": "72"
  },
  "edb_529591000123": {
    "schoolNet": "72"
  },
  "edb_115746000123": {
    "schoolNet": "72"
  },
  "edb_516872000123": {
    "religion": "天主教",
    "schoolNet": "72",
    "relationship": "LINKED"
  },
  "edb_516848000123": {
    "schoolNet": "72",
    "relationship": "LINKED"
  },
  "edb_550370000123": {
    "schoolNet": "72"
  },
  "edb_510955000123": {
    "religion": "基督教",
    "schoolNet": "73"
  },
  "edb_115495000123": {
    "schoolNet": "73",
    "relationship": "LINKED"
  },
  "edb_572357000123": {
    "religion": "佛教",
    "schoolNet": "73"
  },
  "edb_511625000223": {
    "schoolNet": "74"
  },
  "edb_513148000123": {
    "schoolNet": "74"
  },
  "edb_150770000223": {
    "religion": "基督教",
    "schoolNet": "74"
  },
  "edb_112666000123": {
    "schoolNet": "74"
  },
  "edb_510360000123": {
    "schoolNet": "74",
    "relationship": "LINKED"
  },
  "edb_535770000123": {
    "religion": "基督教",
    "schoolNet": "72"
  },
  "edb_540170000123": {
    "schoolNet": "72",
    "relationship": "THROUGH_TRAIN"
  },
  "edb_540188000123": {
    "schoolNet": "72"
  },
  "edb_535745000123": {
    "schoolNet": "72"
  },
  "edb_554685000123": {
    "schoolNet": "74"
  },
  "edb_543322000223": {
    "schoolNet": "72"
  },
  "edb_115347000123": {
    "schoolNet": "73"
  },
  "edb_115274000123": {
    "schoolNet": "73"
  },
  "edb_115533000123": {
    "religion": "佛教",
    "schoolNet": "74"
  },
  "edb_114847000123": {
    "religion": "基督教",
    "schoolNet": "74"
  },
  "edb_512249000123": {
    "schoolNet": "74"
  },
  "edb_534285000123": {
    "religion": "基督教"
  },
  "edb_572403000123": {
    "schoolNet": "73",
    "relationship": "LINKED"
  },
  "edb_579530000133": {
    "religion": "基督教",
    "relationship": "THROUGH_TRAIN"
  },
  "edb_510904000223": {
    "religion": "基督教",
    "schoolNet": "31"
  },
  "edb_539520000123": {
    "religion": "天主教",
    "schoolNet": "32"
  },
  "edb_514837000123": {
    "religion": "基督教",
    "schoolNet": "31"
  },
  "edb_510823000123": {
    "schoolNet": "31",
    "relationship": "LINKED"
  },
  "edb_514136000123": {
    "religion": "天主教",
    "schoolNet": "31",
    "relationship": "THROUGH_TRAIN"
  },
  "edb_510343000123": {
    "schoolNet": "31"
  },
  "edb_514454000123": {
    "religion": "天主教",
    "schoolNet": "31",
    "relationship": "LINKED"
  },
  "edb_514713000123": {
    "schoolNet": "31"
  },
  "edb_511021000123": {
    "religion": "天主教",
    "schoolNet": "31"
  },
  "edb_535796000123": {
    "religion": "天主教",
    "schoolNet": "31"
  },
  "edb_515000000123": {
    "schoolNet": "31"
  },
  "edb_317098000123": {
    "religion": "基督教",
    "schoolNet": "32"
  },
  "edb_512362000123": {
    "religion": "基督教",
    "schoolNet": "32"
  },
  "edb_511846000123": {
    "schoolNet": "32"
  },
  "edb_510947000123": {
    "religion": "基督教",
    "schoolNet": "32"
  },
  "edb_514390000123": {
    "religion": "天主教",
    "schoolNet": "32"
  },
  "edb_510688000123": {
    "schoolNet": "32",
    "relationship": "LINKED"
  },
  "edb_513849000123": {
    "religion": "基督教",
    "schoolNet": "32"
  },
  "edb_210706000123": {
    "religion": "基督教",
    "relationship": "THROUGH_TRAIN"
  },
  "edb_512524000123": {
    "schoolNet": "34"
  },
  "edb_569631000123": {
    "religion": "天主教",
    "schoolNet": "34"
  },
  "edb_610224000123": {
    "religion": "基督教"
  },
  "edb_610160000223": {
    "schoolNet": "91"
  },
  "edb_151262000123": {
    "religion": "基督教"
  },
  "edb_617407000123": {
    "schoolNet": "81"
  },
  "edb_618128000123": {
    "religion": "基督教",
    "schoolNet": "81"
  },
  "edb_623709000123": {
    "religion": "基督教",
    "schoolNet": "84"
  },
  "edb_510742000223": {
    "schoolNet": "95"
  },
  "edb_510777000133": {
    "religion": "基督教"
  },
  "edb_511714000133": {
    "religion": "基督教"
  },
  "edb_114081000133": {
    "religion": "天主教"
  },
  "edb_537152000233": {
    "religion": "佛教"
  },
  "edb_213845000133": {
    "religion": "天主教"
  },
  "edb_513300000233": {
    "religion": "天主教"
  },
  "edb_170178000133": {
    "religion": "基督教"
  },
  "edb_511170000133": {
    "religion": "基督教"
  },
  "edb_170046000133": {
    "religion": "天主教"
  },
  "edb_170291000133": {
    "religion": "天主教"
  },
  "edb_170550000133": {
    "religion": "天主教"
  },
  "edb_210137000133": {
    "religion": "基督教"
  },
  "edb_210528000133": {
    "religion": "天主教"
  },
  "edb_150894000133": {
    "religion": "基督教"
  },
  "edb_170496000133": {
    "religion": "天主教"
  },
  "edb_514276000133": {
    "religion": "天主教"
  },
  "edb_132837000133": {
    "religion": "天主教"
  },
  "edb_536571000133": {
    "religion": "天主教"
  },
  "edb_310042000133": {
    "religion": "天主教"
  },
  "edb_170852000233": {
    "religion": "天主教"
  },
  "edb_132209000133": {
    "religion": "天主教"
  },
  "edb_114120000133": {
    "religion": "天主教"
  },
  "edb_536539000133": {
    "religion": "基督教"
  },
  "edb_530034000133": {
    "religion": "基督教"
  },
  "edb_190748000133": {
    "religion": "佛教"
  },
  "edb_170372000133": {
    "religion": "佛教"
  },
  "edb_190128000133": {
    "religion": "佛教"
  },
  "edb_270172000133": {
    "religion": "佛教"
  },
  "edb_511307000133": {
    "religion": "佛教"
  },
  "edb_190268000133": {
    "religion": "佛教"
  },
  "edb_190217000133": {
    "religion": "佛教"
  },
  "edb_214973000133": {
    "religion": "佛教"
  },
  "edb_524530000133": {
    "religion": "佛教"
  },
  "edb_190101000133": {
    "religion": "佛教"
  },
  "edb_230782000133": {
    "religion": "佛教"
  },
  "edb_214965000133": {
    "religion": "佛教"
  },
  "edb_527467000233": {
    "religion": "佛教"
  },
  "edb_311863000133": {
    "religion": "基督教"
  },
  "edb_530018000133": {
    "religion": "基督教"
  },
  "edb_549487000133": {
    "religion": "基督教"
  },
  "edb_211265000133": {
    "religion": "天主教"
  },
  "edb_170518000133": {
    "religion": "天主教"
  },
  "edb_170100000133": {
    "religion": "基督教"
  },
  "edb_510475000133": {
    "religion": "天主教"
  },
  "edb_170313000133": {
    "religion": "基督教"
  },
  "edb_134724000133": {
    "religion": "基督教"
  },
  "edb_552810000133": {
    "religion": "基督教"
  },
  "edb_558079000133": {
    "religion": "基督教"
  },
  "edb_170380000133": {
    "religion": "基督教"
  },
  "edb_214957000133": {
    "religion": "基督教"
  },
  "edb_151807000133": {
    "religion": "基督教"
  },
  "edb_135712000133": {
    "religion": "基督教"
  },
  "edb_151335000133": {
    "religion": "基督教"
  },
  "edb_530247000133": {
    "religion": "基督教"
  },
  "edb_552836000133": {
    "religion": "基督教"
  },
  "edb_132764000133": {
    "religion": "基督教"
  },
  "edb_132918000133": {
    "religion": "基督教"
  },
  "edb_190357000133": {
    "religion": "基督教"
  },
  "edb_230880000133": {
    "religion": "基督教"
  },
  "edb_524573000133": {
    "religion": "基督教"
  },
  "edb_190411000133": {
    "religion": "基督教"
  },
  "edb_135968000233": {
    "religion": "基督教"
  },
  "edb_190560000133": {
    "religion": "基督教"
  },
  "edb_316377000133": {
    "religion": "天主教"
  },
  "edb_514047000133": {
    "religion": "天主教"
  },
  "edb_170569000133": {
    "religion": "天主教"
  },
  "edb_514128000133": {
    "religion": "天主教"
  },
  "edb_510203000133": {
    "religion": "天主教"
  },
  "edb_133124000133": {
    "religion": "天主教"
  },
  "edb_170534000133": {
    "religion": "天主教"
  },
  "edb_560499000133": {
    "religion": "基督教"
  },
  "edb_230820000133": {
    "religion": "基督教"
  },
  "edb_518360000133": {
    "religion": "基督教"
  },
  "edb_131814000333": {
    "religion": "基督教"
  },
  "edb_130893000233": {
    "religion": "基督教"
  },
  "edb_210129000133": {
    "religion": "基督教"
  },
  "edb_170585000133": {
    "religion": "基督教"
  },
  "edb_190799000133": {
    "religion": "其他"
  },
  "edb_190098000133": {
    "religion": "其他"
  },
  "edb_170364000133": {
    "religion": "其他"
  },
  "edb_190810000133": {
    "religion": "孔教"
  },
  "edb_230855000133": {
    "religion": "基督教"
  },
  "edb_512583000133": {
    "religion": "天主教"
  },
  "edb_170488000133": {
    "religion": "天主教"
  },
  "edb_133078000133": {
    "religion": "基督教"
  },
  "edb_170143000133": {
    "religion": "基督教"
  },
  "edb_170208000133": {
    "religion": "基督教"
  },
  "edb_230863000133": {
    "religion": "天主教"
  },
  "edb_512605000233": {
    "religion": "基督教"
  },
  "edb_170682000133": {
    "religion": "天主教"
  },
  "edb_529656000133": {
    "religion": "基督教"
  },
  "edb_545147000133": {
    "religion": "基督教"
  },
  "edb_171000000233": {
    "religion": "基督教"
  },
  "edb_171042000233": {
    "religion": "基督教"
  },
  "edb_230758000133": {
    "religion": "基督教"
  },
  "edb_230847000133": {
    "religion": "基督教"
  },
  "edb_190284000133": {
    "religion": "基督教"
  },
  "edb_170801000233": {
    "religion": "基督教"
  },
  "edb_132756000133": {
    "religion": "基督教"
  },
  "edb_190772000133": {
    "religion": "基督教"
  },
  "edb_518310000133": {
    "religion": "天主教"
  },
  "edb_524816000133": {
    "religion": "基督教"
  },
  "edb_521981000133": {
    "religion": "基督教"
  },
  "edb_512869000233": {
    "religion": "天主教"
  },
  "edb_512834000133": {
    "religion": "天主教"
  },
  "edb_512818000133": {
    "religion": "天主教"
  },
  "edb_512842000233": {
    "religion": "天主教"
  },
  "edb_152196000133": {
    "religion": "佛教"
  },
  "edb_190063000133": {
    "religion": "佛教"
  },
  "edb_210536000133": {
    "religion": "基督教"
  },
  "edb_270040000133": {
    "religion": "天主教"
  },
  "edb_270148000133": {
    "religion": "天主教"
  },
  "edb_283495000333": {
    "religion": "天主教"
  },
  "edb_523305000133": {
    "religion": "天主教"
  },
  "edb_285285000133": {
    "religion": "天主教"
  },
  "edb_270032000133": {
    "religion": "天主教"
  },
  "edb_270156000133": {
    "religion": "天主教"
  },
  "edb_282758000233": {
    "religion": "天主教"
  },
  "edb_190446000133": {
    "religion": "基督教"
  },
  "edb_516961000133": {
    "religion": "基督教"
  },
  "edb_513407000133": {
    "religion": "基督教"
  },
  "edb_210390000133": {
    "religion": "基督教"
  },
  "edb_530778000133": {
    "religion": "道教"
  },
  "edb_190012000133": {
    "religion": "天主教"
  },
  "edb_270105000133": {
    "religion": "其他"
  },
  "edb_190527000233": {
    "religion": "基督教"
  },
  "edb_230839000133": {
    "religion": "基督教"
  },
  "edb_190187000133": {
    "religion": "基督教"
  },
  "edb_510599000133": {
    "religion": "基督教"
  },
  "edb_212318000133": {
    "religion": "基督教"
  },
  "edb_170410000133": {
    "religion": "天主教"
  },
  "edb_514217000133": {
    "religion": "其他"
  },
  "edb_510998000133": {
    "religion": "天主教"
  },
  "edb_510980000133": {
    "religion": "基督教"
  },
  "edb_514209000133": {
    "religion": "基督教"
  },
  "edb_170267000233": {
    "religion": "天主教"
  },
  "edb_170771000233": {
    "religion": "天主教"
  },
  "edb_210277000133": {
    "religion": "天主教"
  },
  "edb_190470000133": {
    "religion": "基督教"
  },
  "edb_170658000133": {
    "religion": "基督教"
  },
  "edb_190721000133": {
    "religion": "基督教"
  },
  "edb_212725000133": {
    "religion": "基督教"
  },
  "edb_170720000133": {
    "religion": "基督教"
  },
  "edb_230871000133": {
    "religion": "基督教"
  },
  "edb_518395000133": {
    "religion": "基督教"
  },
  "edb_214990000133": {
    "religion": "基督教"
  },
  "edb_170542000133": {
    "religion": "基督教"
  },
  "edb_190209000133": {
    "religion": "基督教"
  },
  "edb_170690000133": {
    "religion": "基督教"
  },
  "edb_190080000133": {
    "religion": "基督教"
  },
  "edb_513997000133": {
    "religion": "基督教"
  },
  "edb_514144000233": {
    "religion": "基督教"
  },
  "edb_170666000133": {
    "religion": "基督教"
  },
  "edb_190071000133": {
    "religion": "基督教"
  },
  "edb_230790000133": {
    "religion": "基督教"
  },
  "edb_133183000133": {
    "religion": "基督教"
  },
  "edb_514020000133": {
    "religion": "天主教"
  },
  "edb_283002000133": {
    "religion": "基督教"
  },
  "edb_170321000133": {
    "religion": "基督教"
  },
  "edb_514101000133": {
    "religion": "天主教"
  },
  "edb_530689000133": {
    "religion": "天主教"
  },
  "edb_514110000233": {
    "religion": "基督教"
  },
  "edb_170500000133": {
    "religion": "天主教"
  },
  "edb_131709000133": {
    "religion": "天主教"
  },
  "edb_190195000133": {
    "religion": "天主教"
  },
  "edb_212636000133": {
    "religion": "天主教"
  },
  "edb_510459000133": {
    "religion": "天主教"
  },
  "edb_170844000233": {
    "religion": "天主教"
  },
  "edb_514268000133": {
    "religion": "基督教"
  },
  "edb_170712000133": {
    "religion": "基督教"
  },
  "edb_213195000233": {
    "religion": "基督教"
  },
  "edb_170402000133": {
    "religion": "天主教"
  },
  "edb_170445000233": {
    "religion": "天主教"
  },
  "edb_133469000133": {
    "religion": "天主教"
  },
  "edb_230456000133": {
    "religion": "天主教"
  },
  "edb_170968000133": {
    "religion": "天主教"
  },
  "edb_536580000133": {
    "religion": "基督教"
  },
  "edb_230057000133": {
    "religion": "天主教"
  },
  "edb_190055000133": {
    "religion": "天主教"
  },
  "edb_190667000233": {
    "religion": "天主教"
  },
  "edb_316628000133": {
    "religion": "天主教"
  },
  "edb_113794000133": {
    "religion": "天主教"
  },
  "edb_313076000133": {
    "religion": "天主教"
  },
  "edb_510580000233": {
    "religion": "天主教"
  },
  "edb_170429000233": {
    "religion": "天主教"
  },
  "edb_170135000133": {
    "religion": "天主教"
  },
  "edb_212067000133": {
    "religion": "天主教"
  },
  "edb_190624000133": {
    "religion": "天主教"
  },
  "edb_112810000133": {
    "religion": "基督教"
  },
  "edb_170810000233": {
    "religion": "基督教"
  },
  "edb_190438000133": {
    "religion": "基督教"
  },
  "edb_213292000133": {
    "religion": "基督教"
  },
  "edb_214426000133": {
    "religion": "基督教"
  },
  "edb_514330000133": {
    "religion": "天主教"
  },
  "edb_511943000133": {
    "religion": "基督教"
  },
  "edb_190420000133": {
    "religion": "道教"
  },
  "edb_170933000133": {
    "religion": "道教"
  },
  "edb_190683000133": {
    "religion": "道教"
  },
  "edb_524808000133": {
    "religion": "道教"
  },
  "edb_230421000133": {
    "religion": "道教"
  },
  "edb_213705000133": {
    "religion": "天主教"
  },
  "edb_514802000133": {
    "religion": "天主教"
  },
  "edb_190160000133": {
    "religion": "基督教"
  },
  "edb_190497000133": {
    "religion": "基督教"
  },
  "edb_513288000133": {
    "religion": "基督教"
  },
  "edb_510912000133": {
    "religion": "基督教"
  },
  "edb_320609000133": {
    "religion": "基督教"
  },
  "edb_558567000133": {
    "religion": "基督教"
  },
  "edb_284955000133": {
    "religion": "基督教"
  },
  "edb_512141000233": {
    "religion": "基督教"
  },
  "edb_623857000133": {
    "religion": "基督教"
  },
  "edb_511102000133": {
    "religion": "天主教"
  },
  "edb_214485000233": {
    "religion": "基督教"
  },
  "edb_190551000133": {
    "religion": "佛教"
  },
  "edb_190845000133": {
    "religion": "佛教"
  },
  "edb_552666000133": {
    "religion": "佛教"
  },
  "edb_511935000133": {
    "religion": "基督教"
  },
  "edb_190020000133": {
    "religion": "天主教"
  },
  "edb_170925000133": {
    "religion": "基督教"
  },
  "edb_530352000133": {
    "religion": "基督教"
  },
  "edb_524557000133": {
    "religion": "基督教"
  },
  "edb_311103000233": {
    "religion": "基督教"
  },
  "edb_230472000133": {
    "religion": "基督教"
  },
  "edb_510890000133": {
    "religion": "基督教"
  },
  "edb_522082000133": {
    "religion": "伊斯蘭教"
  },
  "edb_511030000133": {
    "religion": "基督教"
  },
  "edb_515027000233": {
    "religion": "基督教"
  },
  "edb_214981000133": {
    "religion": "天主教"
  },
  "edb_213209000133": {
    "religion": "天主教"
  },
  "edb_516970000133": {
    "religion": "天主教"
  },
  "edb_170526000133": {
    "religion": "天主教"
  },
  "edb_170631000133": {
    "religion": "基督教"
  },
  "edb_114111000133": {
    "religion": "基督教"
  },
  "edb_190225000133": {
    "religion": "基督教"
  },
  "edb_529990000233": {
    "religion": "基督教"
  },
  "edb_545228000133": {
    "religion": "基督教"
  },
  "edb_270130000133": {
    "religion": "基督教"
  },
  "edb_511650000133": {
    "religion": "基督教"
  },
  "edb_553700000133": {
    "religion": "基督教"
  },
  "edb_170216000133": {
    "religion": "基督教"
  },
  "edb_230120000133": {
    "religion": "基督教"
  },
  "edb_211990000233": {
    "religion": "基督教"
  },
  "edb_190250000133": {
    "religion": "基督教"
  },
  "edb_510831000133": {
    "religion": "基督教"
  },
  "edb_113182000133": {
    "religion": "基督教"
  },
  "edb_190241000133": {
    "religion": "基督教"
  },
  "edb_512281000133": {
    "religion": "基督教"
  },
  "edb_170704000133": {
    "religion": "基督教"
  },
  "edb_170305000133": {
    "religion": "基督教"
  },
  "edb_170097000133": {
    "religion": "基督教"
  },
  "edb_113840000133": {
    "religion": "基督教"
  },
  "edb_270202000133": {
    "religion": "基督教"
  },
  "edb_170470000133": {
    "religion": "基督教"
  },
  "edb_170763000233": {
    "religion": "基督教"
  },
  "edb_511536000333": {
    "religion": "基督教"
  },
  "edb_524549000133": {
    "religion": "基督教"
  },
  "edb_134333000133": {
    "religion": "基督教"
  },
  // Jockey Club Sarah Roe School (Special Education)
  "edb_250686000223": {
    "isSpecialSchool": true
  },
  "edb_250686000233": {
    "isSpecialSchool": true
  }
};
