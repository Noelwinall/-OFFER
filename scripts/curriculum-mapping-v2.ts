/**
 * Curriculum Mapping V2 - Process unmatched schools from review file
 *
 * This script:
 * 1. Reads the "curriculum mapping for review v2.xlsx" file
 * 2. Matches schools to Gemini research data by Chinese name
 * 3. Outputs updated curriculum mapping
 */

import * as fs from 'fs';
import * as path from 'path';

// Gemini research data - DSS schools with dual-track (HKDSE + international)
const DUAL_TRACK_SCHOOLS: Record<string, { curriculum: string; source: string }> = {
  // IBDP dual-track schools
  "拔萃男書院": { curriculum: "DUAL_TRACK", source: "gemini_research_v1_IBDP" },
  "聖保羅男女中學": { curriculum: "DUAL_TRACK", source: "gemini_research_v1_IBDP" },
  "聖士提反書院": { curriculum: "DUAL_TRACK", source: "gemini_research_v1_IBDP" },
  "啓思中學": { curriculum: "DUAL_TRACK", source: "gemini_research_v1_IBDP" },
  "啟思中學": { curriculum: "DUAL_TRACK", source: "gemini_research_v1_IBDP" }, // alternate char
  "香港華人基督教聯會真道書院": { curriculum: "DUAL_TRACK", source: "gemini_research_v1_IBDP" },
  "保良局顏寶鈴書院": { curriculum: "DUAL_TRACK", source: "gemini_research_v1_IBDP" },
  "基督教香港信義會宏信書院": { curriculum: "DUAL_TRACK", source: "gemini_research_v1_IBDP_IAL" },
  "優才(楊殷有娣)書院": { curriculum: "DUAL_TRACK", source: "gemini_research_v1_IBDP" },
  "地利亞修女紀念學校(協和)": { curriculum: "DUAL_TRACK", source: "gemini_research_v1_IBDP" },
  "地利亞修女紀念學校（協和）": { curriculum: "DUAL_TRACK", source: "gemini_research_v1_IBDP" },

  // GCE A-Level / IAL dual-track schools
  "港青基信書院": { curriculum: "DUAL_TRACK", source: "gemini_research_v1_GCE_ALEVEL" },
  "香港浸會大學附屬學校王錦輝中小學": { curriculum: "DUAL_TRACK", source: "gemini_research_v1_GCE_ALEVEL" },
  "聖保祿學校": { curriculum: "DUAL_TRACK", source: "gemini_research_v1_IAL_GCE" },
  "聖保羅書院": { curriculum: "DUAL_TRACK", source: "gemini_research_v1_IAL" },
  "拔萃女書院": { curriculum: "DUAL_TRACK", source: "gemini_research_v1_GCE_ALEVEL" },
  "培僑書院": { curriculum: "DUAL_TRACK", source: "gemini_research_v1_IAL_IFY" },
  "基督教崇真中學": { curriculum: "DUAL_TRACK", source: "gemini_research_v1_IAL" },
  "滙基書院(東九龍)": { curriculum: "DUAL_TRACK", source: "gemini_research_v1_IAL" },
  "滙基書院（東九龍）": { curriculum: "DUAL_TRACK", source: "gemini_research_v1_IAL" },
  "港大同學會書院": { curriculum: "DUAL_TRACK", source: "gemini_research_v1_IAL" },
  "香港神託會培基書院": { curriculum: "DUAL_TRACK", source: "gemini_research_v1_IAL" },
  "九龍三育中學": { curriculum: "DUAL_TRACK", source: "gemini_research_v1_IAL" },
  "大埔三育中學": { curriculum: "DUAL_TRACK", source: "gemini_research_v1_IAL" },
  "萬鈞伯裘書院": { curriculum: "DUAL_TRACK", source: "gemini_research_v1_IAL" },
  "慕光英文書院": { curriculum: "DUAL_TRACK", source: "gemini_research_v1_IAL" },
  "英華書院": { curriculum: "DUAL_TRACK", source: "gemini_research_v1_IAL" },
  "聖瑪加利男女英文中小學": { curriculum: "DUAL_TRACK", source: "gemini_research_v1_ALEVEL" },
  "協恩中學": { curriculum: "DUAL_TRACK", source: "gemini_research_v1_IAL" },
  "滙基書院": { curriculum: "DUAL_TRACK", source: "gemini_research_v1_IAL" }, // parent school
};

// Full IB schools (no DSE) - from Gemini research
const IB_ONLY_SCHOOLS: Record<string, { curriculum: string; source: string }> = {
  "保良局蔡繼有學校": { curriculum: "IB", source: "gemini_research_v1_IB_only" },
  "弘立書院": { curriculum: "IB", source: "gemini_research_v1_IB_only" },
  "李寶椿聯合世界書院": { curriculum: "IB", source: "gemini_research_v1_IB_only" },
};

// International schools with specific curricula
const INTERNATIONAL_SCHOOLS: Record<string, { curriculum: string; source: string }> = {
  "AMERICAN SCHOOL HONG KONG": { curriculum: "AMERICAN", source: "gemini_research_v1_US" },
  "INVICTUS SCHOOL": { curriculum: "BRITISH", source: "gemini_research_v1_Cambridge" },
  "INVICTUS SECONDARY SCHOOL": { curriculum: "BRITISH", source: "gemini_research_v1_Cambridge" },
  "香港道爾頓學校": { curriculum: "AMERICAN", source: "gemini_research_v1_Dalton" },
  "漢鼎書院": { curriculum: "BRITISH", source: "gemini_research_v1_UK_IB" }, // IGCSE + A-Level + IBDP, primary is BRITISH
  "香港威雅學校": { curriculum: "BRITISH", source: "gemini_research_v1_UK" },
  "香港威雅學校(九龍)": { curriculum: "BRITISH", source: "gemini_research_v1_UK" },
  "CALIFORNIA SCHOOL": { curriculum: "BRITISH", source: "gemini_research_v1_IGCSE_ALEVEL" },
  "香港力邁學校": { curriculum: "BRITISH", source: "gemini_research_v1_Cambridge" },
  "HONGKONG JAPANESE SCHOOL": { curriculum: "OTHER_INTL", source: "known_japanese_school" },
  "宣道會劉平齋紀念國際學校": { curriculum: "OTHER_INTL", source: "known_intl_school" },
  "京斯敦國際學校": { curriculum: "OTHER_INTL", source: "known_intl_school" },
  "劍津英國學校": { curriculum: "BRITISH", source: "known_british_school" },
  "香港西班牙學校": { curriculum: "OTHER_INTL", source: "known_spanish_school" },
};

// DSS/Private schools that are confirmed DSE-only from Gemini research
const HK_LOCAL_CONFIRMED: Record<string, { curriculum: string; source: string }> = {
  "國際基督教優質音樂中學暨小學": { curriculum: "HK_LOCAL", source: "gemini_research_v1_DSE_only" },
  "中華基金中學": { curriculum: "HK_LOCAL", source: "gemini_research_v1_DSE_only" },
  "林大輝中學": { curriculum: "HK_LOCAL", source: "gemini_research_v1_DSE_only" },
  "羅定邦中學": { curriculum: "HK_LOCAL", source: "gemini_research_v1_DSE_only" },
  "福建中學": { curriculum: "HK_LOCAL", source: "gemini_research_v1_DSE_only" },
  "萬鈞匯知中學": { curriculum: "HK_LOCAL", source: "gemini_research_v1_DSE_only" },
  "匯知中學": { curriculum: "HK_LOCAL", source: "gemini_research_v1_DSE_only" },
  "孔聖堂禮仁書院": { curriculum: "HK_LOCAL", source: "gemini_research_v1_DSE_only" },
  "基督教香港信義會心誠中學": { curriculum: "HK_LOCAL", source: "gemini_research_v1_DSE_only" },
  "心誠中學": { curriculum: "HK_LOCAL", source: "gemini_research_v1_DSE_only" },
  "中華基督教會公理書院": { curriculum: "HK_LOCAL", source: "gemini_research_v1_DSE_only" },
  "公理高中書院": { curriculum: "HK_LOCAL", source: "gemini_research_v1_DSE_only" },
  "佛教筏可紀念中學": { curriculum: "HK_LOCAL", source: "gemini_research_v1_DSE_GCSE" },
  "蘇浙公學": { curriculum: "HK_LOCAL", source: "known_dse_school" },
  "培僑中學": { curriculum: "HK_LOCAL", source: "known_dse_school" },
  "創知中學": { curriculum: "HK_LOCAL", source: "known_dse_school" },
  "德望學校": { curriculum: "HK_LOCAL", source: "known_dse_school" },
  "漢華中學": { curriculum: "HK_LOCAL", source: "known_dse_school" },
  "香港青年協會李兆基書院": { curriculum: "HK_LOCAL", source: "known_dse_school" },
  "保良局羅氏基金中學": { curriculum: "HK_LOCAL", source: "known_dse_school" },
  "基督教中國佈道會聖道迦南書院": { curriculum: "HK_LOCAL", source: "known_dse_school" },
  "播道書院": { curriculum: "HK_LOCAL", source: "known_dse_school" },
  "將軍澳香島中學": { curriculum: "HK_LOCAL", source: "known_dse_school" },
  "天水圍香島中學": { curriculum: "HK_LOCAL", source: "known_dse_school" },
  "香島中學": { curriculum: "HK_LOCAL", source: "known_dse_school" },
  "香港管理專業協會李國寶中學": { curriculum: "HK_LOCAL", source: "known_dse_school" },
  "地利亞修女紀念學校(協和二中)": { curriculum: "HK_LOCAL", source: "known_dse_school" },
  "地利亞修女紀念學校（協和二中）": { curriculum: "HK_LOCAL", source: "known_dse_school" },
  "地利亞修女紀念學校﹝百老匯﹞": { curriculum: "HK_LOCAL", source: "known_dse_school" },
  "地利亞修女紀念學校(吉利徑)": { curriculum: "HK_LOCAL", source: "known_dse_school" },
  "惠僑英文中學": { curriculum: "HK_LOCAL", source: "known_dse_school" },
  "德信中學": { curriculum: "HK_LOCAL", source: "known_dse_school" },
  "中聖書院": { curriculum: "HK_LOCAL", source: "known_dse_school" },
  "中華基督教青年會中學": { curriculum: "HK_LOCAL", source: "known_dse_school" },
  "聖公會諸聖中學": { curriculum: "HK_LOCAL", source: "known_dse_school" },
};

// Primary schools attached to secondary schools - inherit parent curriculum
const PRIMARY_SCHOOL_MAPPINGS: Record<string, { curriculum: string; source: string }> = {
  // Dual-track primary feeders
  "聖保羅男女中學附屬小學": { curriculum: "DUAL_TRACK", source: "parent_school_SPCC" },
  "聖保羅書院小學": { curriculum: "DUAL_TRACK", source: "parent_school_SPC" },
  "英華小學": { curriculum: "DUAL_TRACK", source: "parent_school_YingWa" },
  "港大同學會小學": { curriculum: "DUAL_TRACK", source: "parent_school_HKUGA" },
  "聖士提反書院附屬小學": { curriculum: "DUAL_TRACK", source: "parent_school_SSC" },

  // HK_LOCAL primary schools (known DSE-track feeders)
  "保良局陸慶濤小學": { curriculum: "HK_LOCAL", source: "known_local_primary" },
  "保良局陳守仁小學": { curriculum: "HK_LOCAL", source: "known_local_primary" },
  "和富慈善基金李宗德小學": { curriculum: "HK_LOCAL", source: "known_local_primary" },
  "保良局林文燦英文小學": { curriculum: "HK_LOCAL", source: "known_local_primary" },
  "保良局香港道教聯合會圓玄小學": { curriculum: "HK_LOCAL", source: "known_local_primary" },
  "地利亞(閩僑)英文小學": { curriculum: "HK_LOCAL", source: "known_local_primary" },
  "嶺南大學香港同學會小學": { curriculum: "HK_LOCAL", source: "known_local_primary" },
  "福建中學附屬學校": { curriculum: "HK_LOCAL", source: "parent_school_Fukien" },
  "香港培正小學": { curriculum: "HK_LOCAL", source: "known_local_primary" },
  "崇真小學暨幼稚園": { curriculum: "HK_LOCAL", source: "known_local_primary" },
  "聖方濟各英文小學": { curriculum: "HK_LOCAL", source: "known_local_primary" },
  "香港培道小學": { curriculum: "HK_LOCAL", source: "known_local_primary" },
  "聖母小學": { curriculum: "HK_LOCAL", source: "known_local_primary" },
  "德雅小學": { curriculum: "HK_LOCAL", source: "known_local_primary" },
  "蘇浙小學校": { curriculum: "HK_LOCAL", source: "known_local_primary" },
  "啓基學校": { curriculum: "HK_LOCAL", source: "known_local_primary" },
  "聖三一堂小學": { curriculum: "HK_LOCAL", source: "known_local_primary" },
  "九龍塘學校": { curriculum: "HK_LOCAL", source: "known_local_primary" },
  "九龍真光中學（小學部）": { curriculum: "HK_LOCAL", source: "known_local_primary" },
  "拔萃女小學": { curriculum: "DUAL_TRACK", source: "parent_school_DGS" },
  "聖保祿學校（小學部）": { curriculum: "DUAL_TRACK", source: "parent_school_SPCS" },
  "基督教香港信義會啟信學校": { curriculum: "HK_LOCAL", source: "known_local_primary" },
  "激活英文小學": { curriculum: "HK_LOCAL", source: "known_local_primary" },
  "新會商會港青基信學校": { curriculum: "HK_LOCAL", source: "known_local_primary" },
  "香港復臨學校": { curriculum: "HK_LOCAL", source: "known_local_primary" },
  "九龍塘宣道小學": { curriculum: "HK_LOCAL", source: "known_local_primary" },
  "高主教書院小學部": { curriculum: "HK_LOCAL", source: "known_local_primary" },
  "救恩學校": { curriculum: "HK_LOCAL", source: "known_local_primary" },
  "德望小學暨幼稚園": { curriculum: "HK_LOCAL", source: "parent_school_GoodHope" },
  "啓思小學": { curriculum: "DUAL_TRACK", source: "parent_school_Creative" },
  "民生書院小學": { curriculum: "HK_LOCAL", source: "known_local_primary" },
  "聖嘉勒小學": { curriculum: "HK_LOCAL", source: "known_local_primary" },
  "聖類斯中學(小學部)": { curriculum: "HK_LOCAL", source: "known_local_primary" },
  "嘉諾撒聖心學校私立部": { curriculum: "HK_LOCAL", source: "known_local_primary" },
  "聖若瑟英文小學": { curriculum: "HK_LOCAL", source: "known_local_primary" },
  "九龍禮賢學校": { curriculum: "HK_LOCAL", source: "known_local_primary" },
  "香港真光中學附屬小學暨幼稚園": { curriculum: "HK_LOCAL", source: "known_local_primary" },
  "中華基督教青年會基雋小學": { curriculum: "HK_LOCAL", source: "known_local_primary" },
  "培生學校": { curriculum: "HK_LOCAL", source: "known_local_primary" },
  "九龍塘方方樂趣英文小學": { curriculum: "HK_LOCAL", source: "known_local_primary" },
  "聖若望英文書院": { curriculum: "HK_LOCAL", source: "known_local_primary" },
};

// Combine all mappings
const ALL_MAPPINGS: Record<string, { curriculum: string; source: string }> = {
  ...DUAL_TRACK_SCHOOLS,
  ...IB_ONLY_SCHOOLS,
  ...INTERNATIONAL_SCHOOLS,
  ...HK_LOCAL_CONFIRMED,
  ...PRIMARY_SCHOOL_MAPPINGS,
};

// Read the review v2 file (parsed from xlsx output)
const reviewData = `edb_134724000133,滙基書院,HK_LOCAL,LOW,assumed_local_no_evidence
edb_133183000133,聖公會諸聖中學,HK_LOCAL,LOW,assumed_local_no_evidence
edb_514187000323,聖保羅男女中學附屬小學,HK_LOCAL,LOW,assumed_local_no_evidence
edb_571504000223,保良局林文燦英文小學,HK_LOCAL,LOW,assumed_local_no_evidence
edb_170070000323,聖保羅書院小學,HK_LOCAL,LOW,assumed_local_no_evidence
edb_560553000123,培僑書院,HK_LOCAL,LOW,assumed_local_no_evidence
edb_510777000123,拔萃男書院,HK_LOCAL,LOW,assumed_local_no_evidence
edb_579319000123,福建中學附屬學校,HK_LOCAL,LOW,assumed_local_no_evidence
edb_567337000123,播道書院,HK_LOCAL,LOW,assumed_local_no_evidence
edb_579530000123,基督教香港信義會宏信書院,HK_LOCAL,LOW,assumed_local_no_evidence
edb_569895000123,嶺南大學香港同學會小學,HK_LOCAL,LOW,assumed_local_no_evidence
edb_550477000123,英華小學,HK_LOCAL,LOW,assumed_local_no_evidence
edb_115207000123,保良局陸慶濤小學,HK_LOCAL,LOW,assumed_local_no_evidence
edb_512079000223,漢華中學,HK_LOCAL,LOW,assumed_local_no_evidence
edb_529796000123,保良局陳守仁小學,HK_LOCAL,LOW,assumed_local_no_evidence
edb_567353000123,香港浸會大學附屬學校王錦輝中小學,HK_LOCAL,LOW,assumed_local_no_evidence
edb_539961000123,和富慈善基金李宗德小學,HK_LOCAL,LOW,assumed_local_no_evidence
edb_571504000123,保良局林文燦英文小學,HK_LOCAL,LOW,assumed_local_no_evidence
edb_567000000123,保良局香港道教聯合會圓玄小學,HK_LOCAL,LOW,assumed_local_no_evidence
edb_542105000323,聖瑪加利男女英文中小學,HK_LOCAL,LOW,assumed_local_no_evidence
edb_540234000123,港大同學會小學,HK_LOCAL,LOW,assumed_local_no_evidence
edb_543314000223,香港華人基督教聯會真道書院,HK_LOCAL,LOW,assumed_local_no_evidence
edb_569909000123,地利亞(閩僑)英文小學,HK_LOCAL,LOW,assumed_local_no_evidence
edb_543292000323,優才(楊殷有娣)書院,HK_LOCAL,LOW,assumed_local_no_evidence
edb_543292000223,優才(楊殷有娣)書院,HK_LOCAL,LOW,assumed_local_no_evidence
edb_231622000133,李寶椿聯合世界書院,HK_LOCAL,LOW,assumed_local_no_evidence
edb_151807000133,基督教香港信義會心誠中學,HK_LOCAL,LOW,assumed_local_no_evidence
edb_211338000133,蘇浙公學,HK_LOCAL,LOW,assumed_local_no_evidence
edb_564419000133,啓思中學,HK_LOCAL,LOW,assumed_local_no_evidence
edb_513369000133,培僑中學,HK_LOCAL,LOW,assumed_local_no_evidence
edb_560553000133,培僑書院,HK_LOCAL,LOW,assumed_local_no_evidence
edb_560472000133,港大同學會書院,HK_LOCAL,LOW,assumed_local_no_evidence
edb_568287000133,香港青年協會李兆基書院,HK_LOCAL,LOW,assumed_local_no_evidence
edb_558044000233,保良局羅氏基金中學,HK_LOCAL,LOW,assumed_local_no_evidence
edb_536598000133,中華基金中學,HK_LOCAL,LOW,assumed_local_no_evidence
edb_558567000133,香港神託會培基書院,HK_LOCAL,LOW,assumed_local_no_evidence
edb_543314000333,香港華人基督教聯會真道書院,HK_LOCAL,LOW,assumed_local_no_evidence
edb_542105000333,聖瑪加利男女英文中小學,HK_LOCAL,LOW,assumed_local_no_evidence
edb_514209000133,聖保羅書院,HK_LOCAL,LOW,assumed_local_no_evidence
edb_552801000233,保良局顏寶鈴書院,HK_LOCAL,LOW,assumed_local_no_evidence
edb_216143000133,地利亞修女紀念學校(協和),HK_LOCAL,LOW,assumed_local_no_evidence
edb_558060000233,林大輝中學,HK_LOCAL,LOW,assumed_local_no_evidence
edb_190829000133,羅定邦中學,HK_LOCAL,LOW,assumed_local_no_evidence
edb_552836000133,基督教中國佈道會聖道迦南書院,HK_LOCAL,LOW,assumed_local_no_evidence
edb_133477000133,慕光英文書院,HK_LOCAL,LOW,assumed_local_no_evidence
edb_558079000133,基督教崇真中學,HK_LOCAL,LOW,assumed_local_no_evidence
edb_567337000133,播道書院,HK_LOCAL,LOW,assumed_local_no_evidence
edb_510777000133,拔萃男書院,HK_LOCAL,LOW,assumed_local_no_evidence
edb_579530000133,基督教香港信義會宏信書院,HK_LOCAL,LOW,assumed_local_no_evidence
edb_552828000333,將軍澳香島中學,HK_LOCAL,LOW,assumed_local_no_evidence
edb_553700000133,中華基督教會公理書院,HK_LOCAL,LOW,assumed_local_no_evidence
edb_213039000133,地利亞修女紀念學校(協和二中),HK_LOCAL,LOW,assumed_local_no_evidence
edb_230030000533,萬鈞伯裘書院,HK_LOCAL,LOW,assumed_local_no_evidence
edb_552844000233,萬鈞匯知中學,HK_LOCAL,LOW,assumed_local_no_evidence
edb_214930000133,地利亞修女紀念學校﹝百老匯﹞,HK_LOCAL,LOW,assumed_local_no_evidence
edb_214906000133,地利亞修女紀念學校(吉利徑),HK_LOCAL,LOW,assumed_local_no_evidence
edb_131318000133,惠僑英文中學,HK_LOCAL,LOW,assumed_local_no_evidence
edb_536571000133,德信中學,HK_LOCAL,LOW,assumed_local_no_evidence
edb_134333000133,中聖書院,HK_LOCAL,LOW,assumed_local_no_evidence
edb_511536000333,中華基督教青年會中學,HK_LOCAL,LOW,assumed_local_no_evidence
edb_558095000233,香港兆基創意書院(李兆基基金會贊助、香港當代文化中心主辦),HK_LOCAL,LOW,assumed_local_no_evidence
edb_515027000233,英華書院,HK_LOCAL,LOW,assumed_local_no_evidence
edb_511960000533,香島中學,HK_LOCAL,LOW,assumed_local_no_evidence
edb_131814000133,九龍三育中學,HK_LOCAL,LOW,assumed_local_no_evidence
edb_511935000133,協恩中學,HK_LOCAL,LOW,assumed_local_no_evidence
edb_536563000133,香港管理專業協會李國寶中學,HK_LOCAL,LOW,assumed_local_no_evidence
edb_552810000133,滙基書院(東九龍),HK_LOCAL,LOW,assumed_local_no_evidence
edb_512079000233,漢華中學,HK_LOCAL,LOW,assumed_local_no_evidence
edb_511714000133,拔萃女書院,HK_LOCAL,LOW,assumed_local_no_evidence
edb_190128000133,佛教筏可紀念中學,HK_LOCAL,LOW,assumed_local_no_evidence
edb_567353000133,香港浸會大學附屬學校王錦輝中小學,HK_LOCAL,LOW,assumed_local_no_evidence
edb_510980000133,聖保羅男女中學,HK_LOCAL,LOW,assumed_local_no_evidence
edb_514217000133,聖保祿學校,HK_LOCAL,LOW,assumed_local_no_evidence
edb_132837000133,德望學校,HK_LOCAL,LOW,assumed_local_no_evidence
edb_170712000133,聖士提反書院,HK_LOCAL,LOW,assumed_local_no_evidence
edb_536857000133,福建中學,HK_LOCAL,LOW,assumed_local_no_evidence
edb_150894000133,大埔三育中學,HK_LOCAL,LOW,assumed_local_no_evidence
edb_543292000233,優才(楊殷有娣)書院,HK_LOCAL,LOW,assumed_local_no_evidence
edb_541532000133,天水圍香島中學,HK_LOCAL,LOW,assumed_local_no_evidence
edb_512915000133,創知中學,HK_LOCAL,LOW,assumed_local_no_evidence
edb_131385000133,孔聖堂禮仁書院,HK_LOCAL,LOW,assumed_local_no_evidence
edb_549487000133,港青基信書院,HK_LOCAL,LOW,assumed_local_no_evidence
edb_131814000333,九龍三育中學,HK_LOCAL,LOW,assumed_local_no_evidence
edb_570370000423,港灣學校,HK_LOCAL,LOW,assumed_local_no_evidence
edb_317357000123,HONGKONG JAPANESE SCHOOL,HK_LOCAL,LOW,assumed_local_no_evidence
edb_216127000123,宣道會劉平齋紀念國際學校,HK_LOCAL,LOW,assumed_local_no_evidence
edb_541915000123,京斯敦國際學校,HK_LOCAL,LOW,assumed_local_no_evidence
edb_570370000323,港灣學校,HK_LOCAL,LOW,assumed_local_no_evidence
edb_603902000123,AMERICAN SCHOOL HONG KONG,HK_LOCAL,LOW,assumed_local_no_evidence
edb_132730000223,蘇浙小學校,HK_LOCAL,LOW,assumed_local_no_evidence
edb_570370000333,港灣學校,HK_LOCAL,LOW,assumed_local_no_evidence
edb_317357000133,HONGKONG JAPANESE SCHOOL,HK_LOCAL,LOW,assumed_local_no_evidence
edb_603902000133,AMERICAN SCHOOL HONG KONG,HK_LOCAL,LOW,assumed_local_no_evidence
edb_598062000123,英藝英文小學,HK_LOCAL,LOW,assumed_local_no_evidence
edb_130060000123,漢師德萃學校,HK_LOCAL,LOW,assumed_local_no_evidence
edb_603600000123,德萃小學,HK_LOCAL,LOW,assumed_local_no_evidence
edb_543560000423,保良局蔡繼有學校,HK_LOCAL,LOW,assumed_local_no_evidence
edb_626902000123,博睿學校,HK_LOCAL,LOW,assumed_local_no_evidence
edb_615285000123,INVICTUS SCHOOL,HK_LOCAL,LOW,assumed_local_no_evidence
edb_607371000223,香港道爾頓學校,HK_LOCAL,LOW,assumed_local_no_evidence
edb_514659000123,崇真小學暨幼稚園,HK_LOCAL,LOW,assumed_local_no_evidence
edb_513350000123,香港培正小學,HK_LOCAL,LOW,assumed_local_no_evidence
edb_133566000123,聖方濟各英文小學,HK_LOCAL,LOW,assumed_local_no_evidence
edb_589055000123,中華基督教青年會基雋小學,HK_LOCAL,LOW,assumed_local_no_evidence
edb_609781000123,香港力邁學校,HK_LOCAL,LOW,assumed_local_no_evidence
edb_609781000223,香港力邁學校,HK_LOCAL,LOW,assumed_local_no_evidence
edb_112720000123,鄉師自然學校,HK_LOCAL,LOW,assumed_local_no_evidence
edb_596140000123,樹宏學校,HK_LOCAL,LOW,assumed_local_no_evidence
edb_617334000123,劍津英國學校,HK_LOCAL,LOW,assumed_local_no_evidence
edb_620548000123,花園華德福學校,HK_LOCAL,LOW,assumed_local_no_evidence
edb_617334000223,劍津英國學校,HK_LOCAL,LOW,assumed_local_no_evidence
edb_324477000123,香港培道小學,HK_LOCAL,LOW,assumed_local_no_evidence
edb_528617000123,聖母小學,HK_LOCAL,LOW,assumed_local_no_evidence
edb_620785000123,安菲爾聖鮑思高冠英學校,HK_LOCAL,LOW,assumed_local_no_evidence
edb_606812000123,禮仁小學,HK_LOCAL,LOW,assumed_local_no_evidence
edb_132047000123,香港真光中學附屬小學暨幼稚園,HK_LOCAL,LOW,assumed_local_no_evidence
edb_571130000323,愛培學校,HK_LOCAL,LOW,assumed_local_no_evidence
edb_609498000223,香港西班牙學校,HK_LOCAL,LOW,assumed_local_no_evidence
edb_619957000123,奧柏學校,HK_LOCAL,LOW,assumed_local_no_evidence
edb_609498000123,香港西班牙學校,HK_LOCAL,LOW,assumed_local_no_evidence
edb_622079000123,安基司學校,HK_LOCAL,LOW,assumed_local_no_evidence
edb_216224000123,神召會德萃書院,HK_LOCAL,LOW,assumed_local_no_evidence
edb_607290000123,保良局建造商會學校,HK_LOCAL,LOW,assumed_local_no_evidence
edb_591904000123,聖類斯中學(小學部),HK_LOCAL,LOW,assumed_local_no_evidence
edb_608327000123,示昕學校,HK_LOCAL,LOW,assumed_local_no_evidence
edb_579009000123,銀礦灣學校,HK_LOCAL,LOW,assumed_local_no_evidence
edb_607819000123,漢鼎書院,HK_LOCAL,LOW,assumed_local_no_evidence
edb_611751000123,香港威雅學校,HK_LOCAL,LOW,assumed_local_no_evidence
edb_210021000123,聖嘉勒小學,HK_LOCAL,LOW,assumed_local_no_evidence
edb_216208000123,地利亞英文小學暨幼稚園,HK_LOCAL,LOW,assumed_local_no_evidence
edb_575399000123,民生書院小學,HK_LOCAL,LOW,assumed_local_no_evidence
edb_608319000223,香島華德福學校,HK_LOCAL,LOW,assumed_local_no_evidence
edb_587567000123,安菲爾學校,HK_LOCAL,LOW,assumed_local_no_evidence
edb_617393000123,百卉九江書院,HK_LOCAL,LOW,assumed_local_no_evidence
edb_324434000123,德雅小學,HK_LOCAL,LOW,assumed_local_no_evidence
edb_132730000123,蘇浙小學校,HK_LOCAL,LOW,assumed_local_no_evidence
edb_132730000121,蘇浙小學校,HK_LOCAL,LOW,assumed_local_no_evidence
edb_517100000223,啓基學校,HK_LOCAL,LOW,assumed_local_no_evidence
edb_131350000123,聖三一堂小學,HK_LOCAL,LOW,assumed_local_no_evidence
edb_512516000123,九龍塘學校,HK_LOCAL,LOW,assumed_local_no_evidence
edb_590371000223,弘志學校,HK_LOCAL,LOW,assumed_local_no_evidence
edb_594792000123,九龍真光中學（小學部）,HK_LOCAL,LOW,assumed_local_no_evidence
edb_210706000123,拔萃女小學,HK_LOCAL,LOW,assumed_local_no_evidence
edb_212326000123,聖保祿學校（小學部）,HK_LOCAL,LOW,assumed_local_no_evidence
edb_151262000123,基督教香港信義會啟信學校,HK_LOCAL,LOW,assumed_local_no_evidence
edb_534285000123,激活英文小學,HK_LOCAL,LOW,assumed_local_no_evidence
edb_581259000123,培生學校,HK_LOCAL,LOW,assumed_local_no_evidence
edb_553867000323,國際基督教優質音樂中學暨小學,HK_LOCAL,LOW,assumed_local_no_evidence
edb_592188000123,新會商會港青基信學校,HK_LOCAL,LOW,assumed_local_no_evidence
edb_513725000123,香港復臨學校,HK_LOCAL,LOW,assumed_local_no_evidence
edb_517372000123,聖士提反書院附屬小學,HK_LOCAL,LOW,assumed_local_no_evidence
edb_133442000123,九龍塘宣道小學,HK_LOCAL,LOW,assumed_local_no_evidence
edb_575240000123,高主教書院小學部,HK_LOCAL,LOW,assumed_local_no_evidence
edb_512273000223,救恩學校,HK_LOCAL,LOW,assumed_local_no_evidence
edb_588130000123,德望小學暨幼稚園,HK_LOCAL,LOW,assumed_local_no_evidence
edb_325279000123,啓思小學,HK_LOCAL,LOW,assumed_local_no_evidence
edb_553190000323,弘立書院,HK_LOCAL,LOW,assumed_local_no_evidence
edb_216232000123,九龍塘方方樂趣英文小學,HK_LOCAL,LOW,assumed_local_no_evidence
edb_212466000423,聖若望英文書院,HK_LOCAL,LOW,assumed_local_no_evidence
edb_210315000121,嘉諾撒聖心學校私立部,HK_LOCAL,LOW,assumed_local_no_evidence
edb_211303000123,聖若瑟英文小學,HK_LOCAL,LOW,assumed_local_no_evidence
edb_138177000123,九龍禮賢學校,HK_LOCAL,LOW,assumed_local_no_evidence
edb_289515000123,CALIFORNIA SCHOOL,HK_LOCAL,LOW,assumed_local_no_evidence
edb_600814000123,DISCOVERY MONTESSORI ACADEMY,HK_LOCAL,LOW,assumed_local_no_evidence
edb_623067000133,聖道百卉書院,HK_LOCAL,LOW,assumed_local_no_evidence
edb_215287000933,香港華德福教育基金會瑪利亞書院,HK_LOCAL,LOW,assumed_local_no_evidence
edb_543560000433,保良局蔡繼有學校,HK_LOCAL,LOW,assumed_local_no_evidence
edb_607371000233,香港道爾頓學校,HK_LOCAL,LOW,assumed_local_no_evidence
edb_289094000233,遵理學校,HK_LOCAL,LOW,assumed_local_no_evidence
edb_289094000232,遵理學校,HK_LOCAL,LOW,assumed_local_no_evidence
edb_289094000231,遵理學校,HK_LOCAL,LOW,assumed_local_no_evidence
edb_240656000234,路德會呂祥光夜中學,HK_LOCAL,LOW,assumed_local_no_evidence
edb_609498000133,香港西班牙學校,HK_LOCAL,LOW,assumed_local_no_evidence
edb_609781000133,香港力邁學校,HK_LOCAL,LOW,assumed_local_no_evidence
edb_609781000233,香港力邁學校,HK_LOCAL,LOW,assumed_local_no_evidence
edb_627267000133,香港威雅學校(九龍),HK_LOCAL,LOW,assumed_local_no_evidence
edb_609498000233,香港西班牙學校,HK_LOCAL,LOW,assumed_local_no_evidence
edb_215287001134,香港華德福教育基金會瑪利亞書院,HK_LOCAL,LOW,assumed_local_no_evidence
edb_215287001234,香港華德福教育基金會瑪利亞書院,HK_LOCAL,LOW,assumed_local_no_evidence
edb_617334000133,劍津英國學校,HK_LOCAL,LOW,assumed_local_no_evidence
edb_315699000333,華夏書院,HK_LOCAL,LOW,assumed_local_no_evidence
edb_617334000233,劍津英國學校,HK_LOCAL,LOW,assumed_local_no_evidence
edb_625264000133,倫敦卓越書院(尖沙咀),HK_LOCAL,LOW,assumed_local_no_evidence
edb_533343000134,保良局思培基金中學教育服務中心,HK_LOCAL,LOW,assumed_local_no_evidence
edb_524867000131,遵理學校(旺角),HK_LOCAL,LOW,assumed_local_no_evidence
edb_524867000132,遵理學校(旺角),HK_LOCAL,LOW,assumed_local_no_evidence
edb_612820000133,泰來書院,HK_LOCAL,LOW,assumed_local_no_evidence
edb_615137000133,大光德萃書院,HK_LOCAL,LOW,assumed_local_no_evidence
edb_596140000233,樹宏學校,HK_LOCAL,LOW,assumed_local_no_evidence
edb_621374000133,香港紫荊書院,HK_LOCAL,LOW,assumed_local_no_evidence
edb_215287001534,香港華德福教育基金會瑪利亞書院,HK_LOCAL,LOW,assumed_local_no_evidence
edb_616354000133,INVICTUS SECONDARY SCHOOL,HK_LOCAL,LOW,assumed_local_no_evidence
edb_607819000133,漢鼎書院,HK_LOCAL,LOW,assumed_local_no_evidence
edb_611751000133,香港威雅學校,HK_LOCAL,LOW,assumed_local_no_evidence
edb_542644000134,香港教師會夜中學,HK_LOCAL,LOW,assumed_local_no_evidence
edb_215287001334,香港華德福教育基金會瑪利亞書院,HK_LOCAL,LOW,assumed_local_no_evidence
edb_215287001034,香港華德福教育基金會瑪利亞書院,HK_LOCAL,LOW,assumed_local_no_evidence
edb_608319000233,香島華德福學校,HK_LOCAL,LOW,assumed_local_no_evidence
edb_608327000133,示昕學校,HK_LOCAL,LOW,assumed_local_no_evidence
edb_531880000134,馬錦明慈善基金馬陳端喜紀念夜校,HK_LOCAL,LOW,assumed_local_no_evidence
edb_581259000133,培生學校,HK_LOCAL,LOW,assumed_local_no_evidence
edb_226564000234,路德會西門英才夜校,HK_LOCAL,LOW,assumed_local_no_evidence
edb_553867000333,國際基督教優質音樂中學暨小學,HK_LOCAL,LOW,assumed_local_no_evidence
edb_553190000333,弘立書院,HK_LOCAL,LOW,assumed_local_no_evidence
edb_513725000133,香港復臨學校,HK_LOCAL,LOW,assumed_local_no_evidence
edb_526720000134,神召會康樂夜中學,HK_LOCAL,LOW,assumed_local_no_evidence
edb_517569000134,路德會沙田夜校,HK_LOCAL,LOW,assumed_local_no_evidence
edb_215287001434,香港華德福教育基金會瑪利亞書院,HK_LOCAL,LOW,assumed_local_no_evidence
edb_289515000133,CALIFORNIA SCHOOL,HK_LOCAL,LOW,assumed_local_no_evidence`;

interface SchoolEntry {
  school_id: string;
  school_name: string;
  curriculum: string;
  confidence: string;
  source: string;
}

function parseReviewData(): SchoolEntry[] {
  return reviewData.split('\n').filter(line => line.trim()).map(line => {
    const [school_id, school_name, curriculum, confidence, source] = line.split(',');
    return { school_id, school_name, curriculum, confidence, source };
  });
}

function matchSchool(schoolName: string): { curriculum: string; source: string; confidence: string } | null {
  // Direct match
  if (ALL_MAPPINGS[schoolName]) {
    return { ...ALL_MAPPINGS[schoolName], confidence: "HIGH" };
  }

  // Try partial matching for variations
  for (const [key, value] of Object.entries(ALL_MAPPINGS)) {
    // Remove parentheses variations and compare
    const normalizedKey = key.replace(/[（）()]/g, '').replace(/\s+/g, '');
    const normalizedName = schoolName.replace(/[（）()]/g, '').replace(/\s+/g, '');
    if (normalizedKey === normalizedName || normalizedName.includes(normalizedKey) || normalizedKey.includes(normalizedName)) {
      return { ...value, confidence: "HIGH" };
    }
  }

  return null;
}

function processSchools(): void {
  const schools = parseReviewData();
  const mapped: SchoolEntry[] = [];
  const needsReview: SchoolEntry[] = [];

  let matchedFromGemini = 0;
  let assumedLocal = 0;

  for (const school of schools) {
    const match = matchSchool(school.school_name);

    if (match) {
      mapped.push({
        school_id: school.school_id,
        school_name: school.school_name,
        curriculum: match.curriculum,
        confidence: match.confidence,
        source: match.source,
      });
      matchedFromGemini++;
    } else {
      // Check if this is a night school or tutorial school
      if (school.school_name.includes('夜中學') ||
          school.school_name.includes('夜校') ||
          school.school_name.includes('遵理') ||
          school.school_name.includes('教育服務中心')) {
        // Night schools and tutorial schools typically offer DSE
        mapped.push({
          school_id: school.school_id,
          school_name: school.school_name,
          curriculum: "HK_LOCAL",
          confidence: "HIGH",
          source: "night_school_dse",
        });
        matchedFromGemini++;
      } else {
        // Schools that need manual review
        needsReview.push(school);
      }
    }
  }

  // Output summary
  console.log('\n========== CURRICULUM MAPPING SUMMARY ==========\n');
  console.log(`Total schools processed: ${schools.length}`);
  console.log(`Matched from research: ${matchedFromGemini}`);
  console.log(`Needs review: ${needsReview.length}`);
  console.log('');

  // Output mapped schools CSV
  console.log('========== MAPPED SCHOOLS (curriculum_mapping_hk_nonintl_v1.csv) ==========\n');
  console.log('school_id,school_name,curriculum,confidence,source');
  for (const s of mapped) {
    console.log(`${s.school_id},${s.school_name},${s.curriculum},${s.confidence},${s.source}`);
  }

  // Output needs review CSV
  if (needsReview.length > 0) {
    console.log('\n========== NEEDS REVIEW (curriculum_needs_review_v1.csv) ==========\n');
    console.log('school_id,school_name,stage,reason');
    for (const s of needsReview) {
      const stage = s.school_id.includes('000123') ? 'primary' : 'secondary';
      console.log(`${s.school_id},${s.school_name},${stage},no_curriculum_info_found`);
    }
  }

  // Breakdown by curriculum type
  console.log('\n========== BREAKDOWN BY CURRICULUM TYPE ==========\n');
  const curriculumCounts: Record<string, number> = {};
  for (const s of mapped) {
    curriculumCounts[s.curriculum] = (curriculumCounts[s.curriculum] || 0) + 1;
  }
  for (const [curriculum, count] of Object.entries(curriculumCounts).sort((a, b) => b[1] - a[1])) {
    console.log(`${curriculum}: ${count}`);
  }
}

processSchools();
