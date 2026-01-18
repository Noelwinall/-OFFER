// School Relationship Mapping
// Source: data/through_train_mapping_v1.csv
// Generated: 2026-01-18
// Total mappings: 161
//
// DO NOT EDIT - Run `node scripts/generate-relationship-map.js` to regenerate

import type { SchoolRelationship } from "@/types/school";

export interface RelationshipEntry {
  relationType: SchoolRelationship;
  relatedSchoolIds: string[];
}

export const relationshipMap: Record<string, RelationshipEntry> = {
  "edb_112950000223": {
    relationType: "LINKED",
    relatedSchoolIds: ["edb_190195000133"]
  },
  "edb_114391000123": {
    relationType: "LINKED",
    relatedSchoolIds: ["edb_190772000133"]
  },
  "edb_114758000123": {
    relationType: "LINKED",
    relatedSchoolIds: ["edb_190284000133"]
  },
  "edb_115207000123": {
    relationType: "THROUGH_TRAIN",
    relatedSchoolIds: ["edb_558044000233"]
  },
  "edb_115290000123": {
    relationType: "THROUGH_TRAIN",
    relatedSchoolIds: ["edb_545201000133"]
  },
  "edb_115584000223": {
    relationType: "LINKED",
    relatedSchoolIds: ["edb_558567000133"]
  },
  "edb_115720000123": {
    relationType: "THROUGH_TRAIN",
    relatedSchoolIds: ["edb_518387000133", "edb_560480000133"]
  },
  "edb_130893000233": {
    relationType: "LINKED",
    relatedSchoolIds: ["edb_594792000123"]
  },
  "edb_131350000123": {
    relationType: "LINKED",
    relatedSchoolIds: ["edb_170666000133"]
  },
  "edb_131709000133": {
    relationType: "AFFILIATED",
    relatedSchoolIds: ["edb_528617000123"]
  },
  "edb_133124000133": {
    relationType: "LINKED",
    relatedSchoolIds: ["edb_511358000123"]
  },
  "edb_170054000123": {
    relationType: "AFFILIATED",
    relatedSchoolIds: ["edb_510998000133"]
  },
  "edb_170062000223": {
    relationType: "AFFILIATED",
    relatedSchoolIds: ["edb_514047000133"]
  },
  "edb_170070000323": {
    relationType: "AFFILIATED",
    relatedSchoolIds: ["edb_514209000133"]
  },
  "edb_170135000133": {
    relationType: "AFFILIATED",
    relatedSchoolIds: ["edb_513059000123"]
  },
  "edb_170151000123": {
    relationType: "AFFILIATED",
    relatedSchoolIds: ["edb_510459000133"]
  },
  "edb_170194000223": {
    relationType: "AFFILIATED",
    relatedSchoolIds: ["edb_514268000133"]
  },
  "edb_170267000233": {
    relationType: "AFFILIATED",
    relatedSchoolIds: ["edb_560529000123", "edb_514233000123"]
  },
  "edb_170569000133": {
    relationType: "AFFILIATED",
    relatedSchoolIds: ["edb_512060000223", "edb_540196000223"]
  },
  "edb_170615000133": {
    relationType: "THROUGH_TRAIN",
    relatedSchoolIds: ["edb_513750000123"]
  },
  "edb_170666000133": {
    relationType: "LINKED",
    relatedSchoolIds: ["edb_131350000123"]
  },
  "edb_170712000133": {
    relationType: "AFFILIATED",
    relatedSchoolIds: ["edb_517372000123"]
  },
  "edb_170844000233": {
    relationType: "AFFILIATED",
    relatedSchoolIds: ["edb_211303000123"]
  },
  "edb_190195000133": {
    relationType: "LINKED",
    relatedSchoolIds: ["edb_112950000223"]
  },
  "edb_190284000133": {
    relationType: "LINKED",
    relatedSchoolIds: ["edb_114758000123"]
  },
  "edb_190772000133": {
    relationType: "LINKED",
    relatedSchoolIds: ["edb_114391000123"]
  },
  "edb_210021000123": {
    relationType: "AFFILIATED",
    relatedSchoolIds: ["edb_514020000133"]
  },
  "edb_210315000121": {
    relationType: "AFFILIATED",
    relatedSchoolIds: ["edb_510203000133"]
  },
  "edb_210528000133": {
    relationType: "AFFILIATED",
    relatedSchoolIds: ["edb_513709000123"]
  },
  "edb_210536000133": {
    relationType: "AFFILIATED",
    relatedSchoolIds: ["edb_575399000123"]
  },
  "edb_210706000123": {
    relationType: "THROUGH_TRAIN",
    relatedSchoolIds: ["edb_511714000133"]
  },
  "edb_211265000133": {
    relationType: "AFFILIATED",
    relatedSchoolIds: ["edb_575240000123"]
  },
  "edb_211303000123": {
    relationType: "AFFILIATED",
    relatedSchoolIds: ["edb_170844000233"]
  },
  "edb_211990000233": {
    relationType: "THROUGH_TRAIN",
    relatedSchoolIds: ["edb_560634000123"]
  },
  "edb_212326000123": {
    relationType: "AFFILIATED",
    relatedSchoolIds: ["edb_514217000133"]
  },
  "edb_230820000133": {
    relationType: "LINKED",
    relatedSchoolIds: ["edb_510734000123", "edb_533882000123"]
  },
  "edb_316377000133": {
    relationType: "LINKED",
    relatedSchoolIds: ["edb_513385000123"]
  },
  "edb_324477000123": {
    relationType: "LINKED",
    relatedSchoolIds: ["edb_513288000133"]
  },
  "edb_510050000123": {
    relationType: "LINKED",
    relatedSchoolIds: ["edb_510394000133", "edb_510424000133"]
  },
  "edb_510084000123": {
    relationType: "LINKED",
    relatedSchoolIds: ["edb_510378000133", "edb_510432000133"]
  },
  "edb_510130000123": {
    relationType: "LINKED",
    relatedSchoolIds: ["edb_510394000133", "edb_510424000133"]
  },
  "edb_510203000133": {
    relationType: "AFFILIATED",
    relatedSchoolIds: ["edb_513687000122", "edb_210315000121"]
  },
  "edb_510378000133": {
    relationType: "LINKED",
    relatedSchoolIds: ["edb_510882000123", "edb_528781000123", "edb_536989000123", "edb_510084000123"]
  },
  "edb_510394000133": {
    relationType: "LINKED",
    relatedSchoolIds: ["edb_510130000123", "edb_510050000123", "edb_539180000123"]
  },
  "edb_510408000133": {
    relationType: "LINKED",
    relatedSchoolIds: ["edb_510882000123", "edb_528781000123", "edb_536989000123"]
  },
  "edb_510424000133": {
    relationType: "LINKED",
    relatedSchoolIds: ["edb_510130000123", "edb_510050000123", "edb_539180000123"]
  },
  "edb_510432000133": {
    relationType: "LINKED",
    relatedSchoolIds: ["edb_510084000123", "edb_534196000123"]
  },
  "edb_510459000133": {
    relationType: "AFFILIATED",
    relatedSchoolIds: ["edb_170151000123"]
  },
  "edb_510734000123": {
    relationType: "LINKED",
    relatedSchoolIds: ["edb_230820000133"]
  },
  "edb_510777000123": {
    relationType: "THROUGH_TRAIN",
    relatedSchoolIds: ["edb_510777000133"]
  },
  "edb_510777000133": {
    relationType: "THROUGH_TRAIN",
    relatedSchoolIds: ["edb_510777000123"]
  },
  "edb_510882000123": {
    relationType: "LINKED",
    relatedSchoolIds: ["edb_510408000133", "edb_510378000133"]
  },
  "edb_510912000133": {
    relationType: "AFFILIATED",
    relatedSchoolIds: ["edb_513350000123"]
  },
  "edb_510920000223": {
    relationType: "AFFILIATED",
    relatedSchoolIds: ["edb_514802000133"]
  },
  "edb_510980000133": {
    relationType: "THROUGH_TRAIN",
    relatedSchoolIds: ["edb_514187000323"]
  },
  "edb_510998000133": {
    relationType: "AFFILIATED",
    relatedSchoolIds: ["edb_170054000123"]
  },
  "edb_511293000123": {
    relationType: "THROUGH_TRAIN",
    relatedSchoolIds: ["edb_511307000133"]
  },
  "edb_511307000133": {
    relationType: "THROUGH_TRAIN",
    relatedSchoolIds: ["edb_511293000123"]
  },
  "edb_511358000123": {
    relationType: "LINKED",
    relatedSchoolIds: ["edb_133124000133"]
  },
  "edb_511714000133": {
    relationType: "THROUGH_TRAIN",
    relatedSchoolIds: ["edb_210706000123"]
  },
  "edb_512044000123": {
    relationType: "THROUGH_TRAIN",
    relatedSchoolIds: ["edb_514128000133"]
  },
  "edb_512060000223": {
    relationType: "AFFILIATED",
    relatedSchoolIds: ["edb_170569000133"]
  },
  "edb_512079000223": {
    relationType: "THROUGH_TRAIN",
    relatedSchoolIds: ["edb_512079000233"]
  },
  "edb_512079000233": {
    relationType: "THROUGH_TRAIN",
    relatedSchoolIds: ["edb_512079000223"]
  },
  "edb_512583000133": {
    relationType: "AFFILIATED",
    relatedSchoolIds: ["edb_512591000123"]
  },
  "edb_512591000123": {
    relationType: "AFFILIATED",
    relatedSchoolIds: ["edb_512583000133"]
  },
  "edb_512818000133": {
    relationType: "AFFILIATED",
    relatedSchoolIds: ["edb_512826000123"]
  },
  "edb_512826000123": {
    relationType: "AFFILIATED",
    relatedSchoolIds: ["edb_512818000133"]
  },
  "edb_512834000133": {
    relationType: "AFFILIATED",
    relatedSchoolIds: ["edb_575534000123"]
  },
  "edb_512850000123": {
    relationType: "AFFILIATED",
    relatedSchoolIds: ["edb_512869000133"]
  },
  "edb_512869000133": {
    relationType: "AFFILIATED",
    relatedSchoolIds: ["edb_512850000123"]
  },
  "edb_513059000123": {
    relationType: "AFFILIATED",
    relatedSchoolIds: ["edb_170135000133"]
  },
  "edb_513288000133": {
    relationType: "LINKED",
    relatedSchoolIds: ["edb_324477000123"]
  },
  "edb_513350000123": {
    relationType: "AFFILIATED",
    relatedSchoolIds: ["edb_510912000133"]
  },
  "edb_513385000123": {
    relationType: "LINKED",
    relatedSchoolIds: ["edb_316377000133"]
  },
  "edb_513687000122": {
    relationType: "AFFILIATED",
    relatedSchoolIds: ["edb_510203000133"]
  },
  "edb_513709000123": {
    relationType: "AFFILIATED",
    relatedSchoolIds: ["edb_210528000133"]
  },
  "edb_513750000123": {
    relationType: "THROUGH_TRAIN",
    relatedSchoolIds: ["edb_170615000133"]
  },
  "edb_514020000133": {
    relationType: "AFFILIATED",
    relatedSchoolIds: ["edb_210021000123"]
  },
  "edb_514047000133": {
    relationType: "AFFILIATED",
    relatedSchoolIds: ["edb_170062000223"]
  },
  "edb_514101000133": {
    relationType: "AFFILIATED",
    relatedSchoolIds: ["edb_591904000123"]
  },
  "edb_514128000133": {
    relationType: "THROUGH_TRAIN",
    relatedSchoolIds: ["edb_512044000123", "edb_514136000123"]
  },
  "edb_514136000123": {
    relationType: "THROUGH_TRAIN",
    relatedSchoolIds: ["edb_514128000133"]
  },
  "edb_514187000323": {
    relationType: "THROUGH_TRAIN",
    relatedSchoolIds: ["edb_510980000133"]
  },
  "edb_514209000133": {
    relationType: "AFFILIATED",
    relatedSchoolIds: ["edb_170070000323"]
  },
  "edb_514217000133": {
    relationType: "AFFILIATED",
    relatedSchoolIds: ["edb_212326000123"]
  },
  "edb_514233000123": {
    relationType: "AFFILIATED",
    relatedSchoolIds: ["edb_170267000233"]
  },
  "edb_514250000123": {
    relationType: "AFFILIATED",
    relatedSchoolIds: ["edb_530689000133"]
  },
  "edb_514268000133": {
    relationType: "AFFILIATED",
    relatedSchoolIds: ["edb_170194000223"]
  },
  "edb_514330000133": {
    relationType: "THROUGH_TRAIN",
    relatedSchoolIds: ["edb_528986000123"]
  },
  "edb_514454000123": {
    relationType: "LINKED",
    relatedSchoolIds: ["edb_536571000133"]
  },
  "edb_514802000133": {
    relationType: "AFFILIATED",
    relatedSchoolIds: ["edb_510920000223"]
  },
  "edb_515027000233": {
    relationType: "THROUGH_TRAIN",
    relatedSchoolIds: ["edb_550477000123"]
  },
  "edb_516880000123": {
    relationType: "THROUGH_TRAIN",
    relatedSchoolIds: ["edb_552666000133"]
  },
  "edb_517372000123": {
    relationType: "AFFILIATED",
    relatedSchoolIds: ["edb_170712000133"]
  },
  "edb_518387000133": {
    relationType: "THROUGH_TRAIN",
    relatedSchoolIds: ["edb_115720000123", "edb_529532000123"]
  },
  "edb_522074000223": {
    relationType: "THROUGH_TRAIN",
    relatedSchoolIds: ["edb_522074000233"]
  },
  "edb_522074000233": {
    relationType: "THROUGH_TRAIN",
    relatedSchoolIds: ["edb_522074000223"]
  },
  "edb_528617000123": {
    relationType: "AFFILIATED",
    relatedSchoolIds: ["edb_131709000133"]
  },
  "edb_528781000123": {
    relationType: "LINKED",
    relatedSchoolIds: ["edb_510408000133", "edb_510378000133"]
  },
  "edb_528986000123": {
    relationType: "THROUGH_TRAIN",
    relatedSchoolIds: ["edb_514330000133"]
  },
  "edb_529532000123": {
    relationType: "THROUGH_TRAIN",
    relatedSchoolIds: ["edb_518387000133", "edb_560480000133"]
  },
  "edb_530026000123": {
    relationType: "THROUGH_TRAIN",
    relatedSchoolIds: ["edb_545147000133"]
  },
  "edb_530409000123": {
    relationType: "THROUGH_TRAIN",
    relatedSchoolIds: ["edb_536580000133"]
  },
  "edb_530689000133": {
    relationType: "AFFILIATED",
    relatedSchoolIds: ["edb_514250000123"]
  },
  "edb_533882000123": {
    relationType: "LINKED",
    relatedSchoolIds: ["edb_230820000133"]
  },
  "edb_534196000123": {
    relationType: "LINKED",
    relatedSchoolIds: ["edb_510432000133"]
  },
  "edb_535621000223": {
    relationType: "THROUGH_TRAIN",
    relatedSchoolIds: ["edb_560499000133"]
  },
  "edb_535672000223": {
    relationType: "THROUGH_TRAIN",
    relatedSchoolIds: ["edb_552917000133"]
  },
  "edb_536547000223": {
    relationType: "THROUGH_TRAIN",
    relatedSchoolIds: ["edb_536547000233"]
  },
  "edb_536547000233": {
    relationType: "THROUGH_TRAIN",
    relatedSchoolIds: ["edb_536547000223"]
  },
  "edb_536571000133": {
    relationType: "LINKED",
    relatedSchoolIds: ["edb_514454000123"]
  },
  "edb_536580000133": {
    relationType: "THROUGH_TRAIN",
    relatedSchoolIds: ["edb_530409000123"]
  },
  "edb_536857000133": {
    relationType: "THROUGH_TRAIN",
    relatedSchoolIds: ["edb_579319000123"]
  },
  "edb_536989000123": {
    relationType: "LINKED",
    relatedSchoolIds: ["edb_510408000133", "edb_510378000133"]
  },
  "edb_539180000123": {
    relationType: "LINKED",
    relatedSchoolIds: ["edb_510394000133", "edb_510424000133"]
  },
  "edb_540170000123": {
    relationType: "THROUGH_TRAIN",
    relatedSchoolIds: ["edb_541168000133"]
  },
  "edb_540196000223": {
    relationType: "AFFILIATED",
    relatedSchoolIds: ["edb_170569000133"]
  },
  "edb_540234000123": {
    relationType: "THROUGH_TRAIN",
    relatedSchoolIds: ["edb_560472000133"]
  },
  "edb_541168000133": {
    relationType: "THROUGH_TRAIN",
    relatedSchoolIds: ["edb_540170000123"]
  },
  "edb_542105000323": {
    relationType: "THROUGH_TRAIN",
    relatedSchoolIds: ["edb_542105000333"]
  },
  "edb_542105000333": {
    relationType: "THROUGH_TRAIN",
    relatedSchoolIds: ["edb_542105000323"]
  },
  "edb_543292000233": {
    relationType: "THROUGH_TRAIN",
    relatedSchoolIds: ["edb_543292000323"]
  },
  "edb_543292000323": {
    relationType: "THROUGH_TRAIN",
    relatedSchoolIds: ["edb_543292000233"]
  },
  "edb_543314000223": {
    relationType: "THROUGH_TRAIN",
    relatedSchoolIds: ["edb_543314000333"]
  },
  "edb_543314000333": {
    relationType: "THROUGH_TRAIN",
    relatedSchoolIds: ["edb_543314000223"]
  },
  "edb_543560000423": {
    relationType: "THROUGH_TRAIN",
    relatedSchoolIds: ["edb_543560000433"]
  },
  "edb_543560000433": {
    relationType: "THROUGH_TRAIN",
    relatedSchoolIds: ["edb_543560000423"]
  },
  "edb_545147000133": {
    relationType: "THROUGH_TRAIN",
    relatedSchoolIds: ["edb_530026000123"]
  },
  "edb_545201000133": {
    relationType: "THROUGH_TRAIN",
    relatedSchoolIds: ["edb_115290000123"]
  },
  "edb_550477000123": {
    relationType: "THROUGH_TRAIN",
    relatedSchoolIds: ["edb_515027000233"]
  },
  "edb_552666000133": {
    relationType: "THROUGH_TRAIN",
    relatedSchoolIds: ["edb_516880000123"]
  },
  "edb_552917000133": {
    relationType: "THROUGH_TRAIN",
    relatedSchoolIds: ["edb_535672000223"]
  },
  "edb_553190000323": {
    relationType: "THROUGH_TRAIN",
    relatedSchoolIds: ["edb_553190000333"]
  },
  "edb_553190000333": {
    relationType: "THROUGH_TRAIN",
    relatedSchoolIds: ["edb_553190000323"]
  },
  "edb_553867000323": {
    relationType: "THROUGH_TRAIN",
    relatedSchoolIds: ["edb_553867000333"]
  },
  "edb_553867000333": {
    relationType: "THROUGH_TRAIN",
    relatedSchoolIds: ["edb_553867000323"]
  },
  "edb_558044000233": {
    relationType: "THROUGH_TRAIN",
    relatedSchoolIds: ["edb_115207000123"]
  },
  "edb_558567000133": {
    relationType: "LINKED",
    relatedSchoolIds: ["edb_115584000223"]
  },
  "edb_560138000223": {
    relationType: "THROUGH_TRAIN",
    relatedSchoolIds: ["edb_560138000233"]
  },
  "edb_560138000233": {
    relationType: "THROUGH_TRAIN",
    relatedSchoolIds: ["edb_560138000223"]
  },
  "edb_560472000133": {
    relationType: "THROUGH_TRAIN",
    relatedSchoolIds: ["edb_540234000123"]
  },
  "edb_560480000133": {
    relationType: "THROUGH_TRAIN",
    relatedSchoolIds: ["edb_115720000123", "edb_529532000123"]
  },
  "edb_560499000133": {
    relationType: "THROUGH_TRAIN",
    relatedSchoolIds: ["edb_535621000223"]
  },
  "edb_560529000123": {
    relationType: "AFFILIATED",
    relatedSchoolIds: ["edb_170267000233"]
  },
  "edb_560553000123": {
    relationType: "THROUGH_TRAIN",
    relatedSchoolIds: ["edb_560553000133"]
  },
  "edb_560553000133": {
    relationType: "THROUGH_TRAIN",
    relatedSchoolIds: ["edb_560553000123"]
  },
  "edb_560634000123": {
    relationType: "THROUGH_TRAIN",
    relatedSchoolIds: ["edb_211990000233"]
  },
  "edb_567337000123": {
    relationType: "THROUGH_TRAIN",
    relatedSchoolIds: ["edb_567337000133"]
  },
  "edb_567337000133": {
    relationType: "THROUGH_TRAIN",
    relatedSchoolIds: ["edb_567337000123"]
  },
  "edb_575240000123": {
    relationType: "AFFILIATED",
    relatedSchoolIds: ["edb_211265000133"]
  },
  "edb_575399000123": {
    relationType: "AFFILIATED",
    relatedSchoolIds: ["edb_210536000133"]
  },
  "edb_575534000123": {
    relationType: "AFFILIATED",
    relatedSchoolIds: ["edb_512834000133"]
  },
  "edb_579319000123": {
    relationType: "THROUGH_TRAIN",
    relatedSchoolIds: ["edb_536857000133"]
  },
  "edb_579530000123": {
    relationType: "THROUGH_TRAIN",
    relatedSchoolIds: ["edb_579530000133"]
  },
  "edb_579530000133": {
    relationType: "THROUGH_TRAIN",
    relatedSchoolIds: ["edb_579530000123"]
  },
  "edb_591904000123": {
    relationType: "AFFILIATED",
    relatedSchoolIds: ["edb_514101000133"]
  },
  "edb_594792000123": {
    relationType: "LINKED",
    relatedSchoolIds: ["edb_130893000233"]
  },
  "edb_607819000123": {
    relationType: "THROUGH_TRAIN",
    relatedSchoolIds: ["edb_607819000133"]
  },
  "edb_607819000133": {
    relationType: "THROUGH_TRAIN",
    relatedSchoolIds: ["edb_607819000123"]
  },
  "edb_623857000133": {
    relationType: "LINKED",
    relatedSchoolIds: ["edb_623857000133"]
  },
};
