import type { School } from "@/types/school";

/**
 * 香港學校數據庫 - 50 所真實學校
 * 資料來源：schooland.hk、教育局官方資料
 * 最後更新：2026年1月
 * 
 * 注意：信息基於公開資料整理，僅供參考，以學校官方為準
 */
export const SCHOOLS: School[] = [
  // ==================== 國際學校 (24所) ====================
  {
    id: "int-001",
    name: "漢基國際學校",
    category: "國際",
    district: "港島",
    level: "中學",
    tuitionMin: 250000,
    tuitionMax: 273400,
    curriculum: ["IB"],
    language: "全英文",
    highlights: [
      "提供完整 IB 課程體系",
      "雙語教學環境（中英）",
      "香港頂尖國際學校之一"
    ],
    address: "北角寶馬山校園徑1號",
    phone: "+852 2510 7288",
    website: "https://www.cis.edu.hk",
    applicationMaterials: ["申請表", "護照影本", "成績單", "推薦信"],
    applicationLink: "https://www.cis.edu.hk/admissions"
  },
  {
    id: "int-002",
    name: "耀中國際學校",
    category: "國際",
    district: "九龍",
    level: "中學",
    tuitionMin: 230000,
    tuitionMax: 260220,
    curriculum: ["IB"],
    language: "全英文",
    highlights: [
      "提供 IB 課程體系",
      "中西文化融合教育",
      "多元國際化學習環境"
    ],
    address: "九龍塘沙福道2號",
    phone: "+852 2338 7106",
    website: "https://www.ycis-hk.com",
    applicationMaterials: ["申請表", "護照影本", "成績單", "推薦信"],
    applicationLink: "https://www.ycis-hk.com/admissions"
  },
  {
    id: "int-003",
    name: "香港國際學校",
    category: "國際",
    district: "港島",
    level: "中學",
    tuitionMin: 200000,
    tuitionMax: 217800,
    curriculum: ["美式課程"],
    language: "全英文",
    highlights: [
      "美式課程體系",
      "優美海濱校園環境",
      "強調全人發展教育"
    ],
    address: "淺水灣南灣道23號",
    phone: "+852 2812 5000",
    website: "https://www.hkis.edu.hk",
    applicationMaterials: ["申請表", "護照影本", "成績單", "推薦信"],
    applicationLink: "https://www.hkis.edu.hk/admissions"
  },
  {
    id: "int-004",
    name: "香港學堂",
    category: "國際",
    district: "新界",
    level: "中學",
    tuitionMin: 180000,
    tuitionMax: 207300,
    curriculum: ["IB"],
    language: "全英文",
    highlights: [
      "完整 IB PYP/MYP/DP 課程",
      "小班教學模式",
      "注重藝術與創意發展"
    ],
    address: "西貢惠民路33號",
    phone: "+852 2655 1111",
    website: "https://www.hkacademy.edu.hk",
    applicationMaterials: ["申請表", "護照影本", "成績單"],
    applicationLink: "https://www.hkacademy.edu.hk/admissions"
  },
  {
    id: "int-005",
    name: "香港斯坦福美國學校",
    category: "國際",
    district: "九龍",
    level: "中學",
    tuitionMin: 180000,
    tuitionMax: 206800,
    curriculum: ["IB", "美式課程"],
    language: "全英文",
    highlights: [
      "美式課程結合 IB 體系",
      "STEAM 教育特色",
      "現代化校園設施"
    ],
    address: "何文田文福道25號",
    phone: "+852 2500 8688",
    website: "https://www.sais.edu.hk",
    applicationMaterials: ["申請表", "護照影本", "成績單"],
    applicationLink: "https://www.sais.edu.hk/admissions"
  },
  {
    id: "int-006",
    name: "思貝禮國際學校",
    category: "國際",
    district: "新界",
    level: "小學",
    tuitionMin: 180000,
    tuitionMax: 201200,
    curriculum: ["英式課程"],
    language: "全英文",
    highlights: [
      "英國傳統寄宿學校背景",
      "注重品格與領導力培養",
      "優質英式教育體驗"
    ],
    address: "將軍澳石角路10號",
    phone: "+852 2719 2711",
    website: "https://www.shrewsbury.edu.hk",
    applicationMaterials: ["申請表", "護照影本", "成績單"],
    applicationLink: "https://www.shrewsbury.edu.hk/admissions"
  },
  {
    id: "int-007",
    name: "香港加拿大國際學校",
    category: "國際",
    district: "港島",
    level: "中學",
    tuitionMin: 170000,
    tuitionMax: 200900,
    curriculum: ["IB"],
    language: "全英文",
    highlights: [
      "提供完整 IB 課程",
      "加拿大教育理念",
      "多元文化學習環境"
    ],
    address: "黃竹坑南朗山道36號",
    phone: "+852 2525 7088",
    website: "https://www.cdnis.edu.hk",
    applicationMaterials: ["申請表", "護照影本", "成績單", "推薦信"],
    applicationLink: "https://www.cdnis.edu.hk/admissions"
  },
  {
    id: "int-008",
    name: "啟歷學校",
    category: "國際",
    district: "港島",
    level: "中學",
    tuitionMin: 170000,
    tuitionMax: 198900,
    curriculum: ["英式課程"],
    language: "全英文",
    highlights: [
      "英國國家課程體系",
      "注重學術與體育均衡",
      "優質英式傳統教育"
    ],
    address: "薄扶林華翠街2號",
    phone: "+852 2551 8234",
    website: "https://www.kellettschool.com",
    applicationMaterials: ["申請表", "護照影本", "成績單"],
    applicationLink: "https://www.kellettschool.com/admissions"
  },
  {
    id: "int-009",
    name: "德瑞國際學校",
    category: "國際",
    district: "港島",
    level: "中學",
    tuitionMin: 170000,
    tuitionMax: 195900,
    curriculum: ["IB", "德式課程"],
    language: "全英文",
    highlights: [
      "德語及英語雙軌課程",
      "提供 IB 文憑課程",
      "歐洲教育傳統"
    ],
    address: "山頂僑福道11號",
    phone: "+852 2849 6216",
    website: "https://www.gsis.edu.hk",
    applicationMaterials: ["申請表", "護照影本", "成績單"],
    applicationLink: "https://www.gsis.edu.hk/admissions"
  },
  {
    id: "int-010",
    name: "哈羅香港國際學校",
    category: "國際",
    district: "新界",
    level: "中學",
    tuitionMin: 170000,
    tuitionMax: 193571,
    curriculum: ["英式課程", "A-Level"],
    language: "全英文",
    highlights: [
      "英國哈羅公學分校",
      "提供寄宿選項",
      "注重領導力培養"
    ],
    address: "屯門掃管笏青盈路38號",
    phone: "+852 2824 9099",
    website: "https://www.harrowschool.hk",
    applicationMaterials: ["申請表", "護照影本", "成績單", "面試"],
    applicationLink: "https://www.harrowschool.hk/admissions"
  },
  {
    id: "int-011",
    name: "香港墨爾文國際學校",
    category: "國際",
    district: "新界",
    level: "中學",
    tuitionMin: 160000,
    tuitionMax: 189760,
    curriculum: ["IB"],
    language: "全英文",
    highlights: [
      "英國墨爾文學院分校",
      "完整 IB 課程體系",
      "現代化校園設施"
    ],
    address: "大埔白石角科進路3號",
    phone: "+852 3763 0111",
    website: "https://www.malverncollege.org.hk",
    applicationMaterials: ["申請表", "護照影本", "成績單"],
    applicationLink: "https://www.malverncollege.org.hk/admissions"
  },
  {
    id: "int-012",
    name: "香港諾德安達國際學校",
    category: "國際",
    district: "九龍",
    level: "中學",
    tuitionMin: 160000,
    tuitionMax: 189750,
    curriculum: ["IB"],
    language: "全英文",
    highlights: [
      "諾德安達教育集團成員",
      "提供 IB 課程",
      "全球學習網絡資源"
    ],
    address: "藍田安田街11號",
    phone: "+852 2336 3812",
    website: "https://www.nais.hk",
    applicationMaterials: ["申請表", "護照影本", "成績單"],
    applicationLink: "https://www.nais.hk/admissions"
  },
  {
    id: "int-013",
    name: "香港美國學校",
    category: "國際",
    district: "新界",
    level: "中學",
    tuitionMin: 160000,
    tuitionMax: 183500,
    curriculum: ["美式課程", "AP"],
    language: "全英文",
    highlights: [
      "美式課程體系",
      "提供 AP 課程",
      "注重創新與科技教育"
    ],
    address: "大埔馬聰路6號",
    phone: "+852 2699 3700",
    website: "https://www.ashk.edu.hk",
    applicationMaterials: ["申請表", "護照影本", "成績單"],
    applicationLink: "https://www.ashk.edu.hk/admissions"
  },
  {
    id: "int-014",
    name: "南島中學",
    category: "國際",
    district: "港島",
    level: "中學",
    tuitionMin: 140000,
    tuitionMax: 173900,
    curriculum: ["IB"],
    language: "全英文",
    highlights: [
      "英基學校協會成員",
      "提供 IB 文憑課程",
      "多元化課外活動"
    ],
    address: "香港仔南風道50號",
    phone: "+852 2555 9313",
    website: "https://www.sis.edu.hk",
    applicationMaterials: ["申請表", "護照影本", "成績單"],
    applicationLink: "https://www.sis.edu.hk/admissions"
  },
  {
    id: "int-015",
    name: "西島中學",
    category: "國際",
    district: "港島",
    level: "中學",
    tuitionMin: 140000,
    tuitionMax: 173900,
    curriculum: ["IB"],
    language: "全英文",
    highlights: [
      "英基學校協會成員",
      "提供 IB 文憑課程",
      "優質國際教育"
    ],
    address: "薄扶林域多利道250號",
    phone: "+852 2819 1962",
    website: "https://www.wis.edu.hk",
    applicationMaterials: ["申請表", "護照影本", "成績單"],
    applicationLink: "https://www.wis.edu.hk/admissions"
  },
  {
    id: "int-016",
    name: "港島中學",
    category: "國際",
    district: "港島",
    level: "中學",
    tuitionMin: 140000,
    tuitionMax: 173900,
    curriculum: ["IB"],
    language: "全英文",
    highlights: [
      "英基學校協會旗艦學校",
      "提供 IB 文憑課程",
      "歷史悠久的國際學校"
    ],
    address: "半山波老道20號",
    phone: "+852 2524 7135",
    website: "https://www.island.edu.hk",
    applicationMaterials: ["申請表", "護照影本", "成績單"],
    applicationLink: "https://www.island.edu.hk/admissions"
  },
  {
    id: "int-017",
    name: "英皇佐治五世學校",
    category: "國際",
    district: "九龍",
    level: "中學",
    tuitionMin: 140000,
    tuitionMax: 173900,
    curriculum: ["IB"],
    language: "全英文",
    highlights: [
      "英基學校協會成員",
      "提供 IB 文憑課程",
      "九龍區歷史最悠久國際學校"
    ],
    address: "何文田天光道2號",
    phone: "+852 2711 3029",
    website: "https://www.kgv.edu.hk",
    applicationMaterials: ["申請表", "護照影本", "成績單"],
    applicationLink: "https://www.kgv.edu.hk/admissions"
  },
  {
    id: "int-018",
    name: "沙田學院",
    category: "國際",
    district: "新界",
    level: "中學",
    tuitionMin: 140000,
    tuitionMax: 173900,
    curriculum: ["IB"],
    language: "全英文",
    highlights: [
      "英基學校協會成員",
      "提供 IB 文憑課程",
      "新界區優質國際學校"
    ],
    address: "沙田火炭麗禾里3號",
    phone: "+852 2699 1811",
    website: "https://www.shatincollege.edu.hk",
    applicationMaterials: ["申請表", "護照影本", "成績單"],
    applicationLink: "https://www.shatincollege.edu.hk/admissions"
  },
  {
    id: "int-019",
    name: "香港澳洲國際學校",
    category: "國際",
    district: "九龍",
    level: "中學",
    tuitionMin: 140000,
    tuitionMax: 164700,
    curriculum: ["IB", "澳洲課程"],
    language: "全英文",
    highlights: [
      "澳洲課程結合 IB 體系",
      "注重戶外教育",
      "多元文化學習環境"
    ],
    address: "九龍塘羅福道3A號",
    phone: "+852 2304 6078",
    website: "https://www.aishk.edu.hk",
    applicationMaterials: ["申請表", "護照影本", "成績單"],
    applicationLink: "https://www.aishk.edu.hk/admissions"
  },
  {
    id: "int-020",
    name: "新加坡國際學校",
    category: "國際",
    district: "港島",
    level: "中學",
    tuitionMin: 130000,
    tuitionMax: 154900,
    curriculum: ["IB", "新加坡課程"],
    language: "全英文",
    highlights: [
      "新加坡教育體系",
      "提供 IB 課程",
      "注重數學與科學教育"
    ],
    address: "黃竹坑南朗山道23號",
    phone: "+852 2872 0266",
    website: "https://www.singapore.edu.hk",
    applicationMaterials: ["申請表", "護照影本", "成績單"],
    applicationLink: "https://www.singapore.edu.hk/admissions"
  },
  {
    id: "int-021",
    name: "法國國際學校",
    category: "國際",
    district: "港島",
    level: "中學",
    tuitionMin: 130000,
    tuitionMax: 152239,
    curriculum: ["IB", "法式課程"],
    language: "全英文",
    highlights: [
      "法語及英語雙軌課程",
      "提供 IB 文憑課程",
      "法國教育傳統"
    ],
    address: "跑馬地藍塘道165號",
    phone: "+852 2577 6217",
    website: "https://www.fis.edu.hk",
    applicationMaterials: ["申請表", "護照影本", "成績單"],
    applicationLink: "https://www.fis.edu.hk/admissions"
  },
  {
    id: "int-022",
    name: "宣道國際學校",
    category: "國際",
    district: "九龍",
    level: "中學",
    tuitionMin: 120000,
    tuitionMax: 147600,
    curriculum: ["IB", "加拿大課程"],
    language: "全英文",
    highlights: [
      "基督教教育理念",
      "提供 IB 課程",
      "加拿大亞伯達省課程"
    ],
    address: "荔枝角瓊林街33號",
    phone: "+852 2304 0304",
    website: "https://www.caishk.edu.hk",
    applicationMaterials: ["申請表", "護照影本", "成績單", "推薦信"],
    applicationLink: "https://www.caishk.edu.hk/admissions"
  },
  {
    id: "int-023",
    name: "基督教國際學校",
    category: "國際",
    district: "新界",
    level: "中學",
    tuitionMin: 120000,
    tuitionMax: 143400,
    curriculum: ["美式課程"],
    language: "全英文",
    highlights: [
      "基督教教育理念",
      "美式課程體系",
      "注重品格教育"
    ],
    address: "沙田石門安睦街30號",
    phone: "+852 2336 0011",
    website: "https://www.ics.edu.hk",
    applicationMaterials: ["申請表", "護照影本", "成績單"],
    applicationLink: "https://www.ics.edu.hk/admissions"
  },
  {
    id: "int-024",
    name: "李寶椿聯合世界書院",
    category: "國際",
    district: "新界",
    level: "中學",
    tuitionMin: 100000,
    tuitionMax: 108000,
    curriculum: ["IB"],
    language: "全英文",
    highlights: [
      "聯合世界書院成員",
      "兩年制 IB 文憑課程",
      "國際化寄宿學校"
    ],
    address: "沙田西沙公路落禾沙",
    phone: "+852 2640 0441",
    website: "https://www.lpcuwc.edu.hk",
    applicationMaterials: ["申請表", "護照影本", "成績單", "面試"],
    applicationLink: "https://www.lpcuwc.edu.hk/admissions"
  },
  // ==================== 直資學校 (14所) ====================
  {
    id: "dss-001",
    name: "聖保羅男女中學附屬小學",
    category: "直資",
    district: "港島",
    level: "小學",
    tuitionMin: 82300,
    tuitionMax: 82300,
    curriculum: ["DSE"],
    language: "全英文",
    highlights: [
      "香港頂尖直資小學",
      "一條龍升讀聖保羅男女中學",
      "注重全人發展教育"
    ],
    address: "黃竹坑南風徑11號",
    phone: "+852 2526 1882",
    website: "https://www.spccps.edu.hk",
    applicationMaterials: ["申請表", "出生證明", "成績表", "面試"],
    applicationLink: "https://www.spccps.edu.hk/admissions"
  },
  {
    id: "dss-002",
    name: "聖保羅男女中學",
    category: "直資",
    district: "港島",
    level: "中學",
    tuitionMin: 63000,
    tuitionMax: 84300,
    curriculum: ["IB"],
    language: "全英文",
    highlights: [
      "香港首批 IB 學校之一",
      "學術及課外活動表現卓越",
      "校友網絡強大"
    ],
    address: "麥當勞道33號",
    phone: "+852 2523 1187",
    website: "https://www.spcc.edu.hk",
    applicationMaterials: ["申請表", "出生證明", "成績單", "面試"],
    applicationLink: "https://www.spcc.edu.hk/admissions"
  },
  {
    id: "dss-003",
    name: "拔萃男書院附屬小學",
    category: "直資",
    district: "九龍",
    level: "小學",
    tuitionMin: 55000,
    tuitionMax: 55000,
    curriculum: ["DSE"],
    language: "全英文",
    highlights: [
      "傳統名校男拔附小",
      "一條龍升讀拔萃男書院",
      "注重體育與音樂發展"
    ],
    address: "旺角亞皆老街131號",
    phone: "+852 2711 1191",
    website: "https://www.dbspd.edu.hk",
    applicationMaterials: ["申請表", "出生證明", "成績表", "面試"],
    applicationLink: "https://www.dbspd.edu.hk/admissions"
  },
  {
    id: "dss-004",
    name: "拔萃男書院",
    category: "直資",
    district: "九龍",
    level: "中學",
    tuitionMin: 42000,
    tuitionMax: 55000,
    curriculum: ["DSE", "IGCSE"],
    language: "中英雙語",
    highlights: [
      "傳統名校，學術成績優異",
      "提供 DSE 及 IGCSE 雙軌課程",
      "重視全人發展及領袖培訓"
    ],
    address: "旺角亞皆老街131號",
    phone: "+852 2711 5191",
    website: "https://www.dbs.edu.hk",
    applicationMaterials: ["出生證明", "學生相片", "成績表", "自薦信"],
    applicationLink: "https://www.dbs.edu.hk/admissions"
  },
  {
    id: "dss-005",
    name: "聖瑪加利男女英文中小學",
    category: "直資",
    district: "九龍",
    level: "中學",
    tuitionMin: 53570,
    tuitionMax: 53570,
    curriculum: ["DSE"],
    language: "全英文",
    highlights: [
      "一條龍中小學",
      "英語教學環境",
      "天主教教育理念"
    ],
    address: "深水埗深旺道33號",
    phone: "+852 2396 6675",
    website: "https://www.smcesps.edu.hk",
    applicationMaterials: ["申請表", "出生證明", "成績表"],
    applicationLink: "https://www.smcesps.edu.hk/admissions"
  },
  {
    id: "dss-006",
    name: "香港浸會大學附屬學校王錦輝中小學",
    category: "直資",
    district: "新界",
    level: "中學",
    tuitionMin: 44800,
    tuitionMax: 44800,
    curriculum: ["DSE"],
    language: "中英雙語",
    highlights: [
      "浸會大學附屬學校",
      "一條龍中小學",
      "注重創意與科研"
    ],
    address: "沙田石門安睦里6號",
    phone: "+852 2637 2277",
    website: "https://www.hkbuas.edu.hk",
    applicationMaterials: ["申請表", "出生證明", "成績表", "面試"],
    applicationLink: "https://www.hkbuas.edu.hk/admissions"
  },
  {
    id: "dss-007",
    name: "福建中學附屬學校",
    category: "直資",
    district: "九龍",
    level: "小學",
    tuitionMin: 44000,
    tuitionMax: 44000,
    curriculum: ["DSE"],
    language: "中英雙語",
    highlights: [
      "一條龍中小學",
      "注重中華文化傳承",
      "多元化課外活動"
    ],
    address: "觀塘油塘村第二期",
    phone: "+852 2727 7936",
    website: "https://www.fssas.edu.hk",
    applicationMaterials: ["申請表", "出生證明", "成績表"],
    applicationLink: "https://www.fssas.edu.hk/admissions"
  },
  {
    id: "dss-008",
    name: "港大同學會小學",
    category: "直資",
    district: "港島",
    level: "小學",
    tuitionMin: 37880,
    tuitionMax: 37880,
    curriculum: ["DSE"],
    language: "中英雙語",
    highlights: [
      "港大同學會創辦",
      "一條龍升讀港大同學會書院",
      "注重探究式學習"
    ],
    address: "柴灣怡盛街9號",
    phone: "+852 2202 3922",
    website: "https://www.hkugaps.edu.hk",
    applicationMaterials: ["申請表", "出生證明", "成績表"],
    applicationLink: "https://www.hkugaps.edu.hk/admissions"
  },
  {
    id: "dss-009",
    name: "優才(楊殷有娣)書院",
    category: "直資",
    district: "新界",
    level: "中學",
    tuitionMin: 35310,
    tuitionMax: 35310,
    curriculum: ["DSE"],
    language: "中英雙語",
    highlights: [
      "一條龍中小學",
      "資優教育特色",
      "多元智能發展"
    ],
    address: "將軍澳調景嶺彩明街",
    phone: "+852 2535 6869",
    website: "https://www.gtcollege.edu.hk",
    applicationMaterials: ["申請表", "出生證明", "成績表"],
    applicationLink: "https://www.gtcollege.edu.hk/admissions"
  },
  {
    id: "dss-010",
    name: "培僑書院",
    category: "直資",
    district: "新界",
    level: "中學",
    tuitionMin: 30000,
    tuitionMax: 30000,
    curriculum: ["DSE"],
    language: "中英雙語",
    highlights: [
      "一條龍中小學",
      "注重中華文化",
      "愛國教育特色"
    ],
    address: "沙田大圍大圍新村路1號",
    phone: "+852 2602 3166",
    website: "https://www.pkc.edu.hk",
    applicationMaterials: ["申請表", "出生證明", "成績表"],
    applicationLink: "https://www.pkc.edu.hk/admissions"
  },
  {
    id: "dss-011",
    name: "香港華人基督教聯會真道書院",
    category: "直資",
    district: "新界",
    level: "中學",
    tuitionMin: 28600,
    tuitionMax: 40000,
    curriculum: ["DSE", "IB"],
    language: "中英雙語",
    highlights: [
      "一條龍中小學",
      "提供 IB 課程選項",
      "基督教教育理念"
    ],
    address: "將軍澳嶺光街5號",
    phone: "+852 2337 2126",
    website: "https://www.logosacademy.edu.hk",
    applicationMaterials: ["申請表", "出生證明", "成績表", "面試"],
    applicationLink: "https://www.logosacademy.edu.hk/admissions"
  },
  {
    id: "dss-012",
    name: "播道書院",
    category: "直資",
    district: "新界",
    level: "中學",
    tuitionMin: 25000,
    tuitionMax: 25000,
    curriculum: ["DSE"],
    language: "中英雙語",
    highlights: [
      "一條龍中小學",
      "基督教教育理念",
      "注重品格培養"
    ],
    address: "將軍澳至善街7號",
    phone: "+852 2366 1802",
    website: "https://www.evangel.edu.hk",
    applicationMaterials: ["申請表", "出生證明", "成績表"],
    applicationLink: "https://www.evangel.edu.hk/admissions"
  },
  {
    id: "dss-013",
    name: "保良局陳守仁小學",
    category: "直資",
    district: "九龍",
    level: "小學",
    tuitionMin: 20500,
    tuitionMax: 20500,
    curriculum: ["DSE"],
    language: "全英文",
    highlights: [
      "保良局屬校",
      "注重英語教育",
      "多元化課外活動"
    ],
    address: "油麻地海庭道6號",
    phone: "+852 2367 3318",
    website: "https://www.plkctslps.edu.hk",
    applicationMaterials: ["申請表", "出生證明", "成績表"],
    applicationLink: "https://www.plkctslps.edu.hk/admissions"
  },
  {
    id: "dss-014",
    name: "英華小學",
    category: "直資",
    district: "九龍",
    level: "小學",
    tuitionMin: 19000,
    tuitionMax: 19000,
    curriculum: ["DSE"],
    language: "全英文",
    highlights: [
      "傳統名校英華書院附屬小學",
      "一條龍升讀英華書院",
      "注重音樂與體育"
    ],
    address: "深水埗英華街3號",
    phone: "+852 2728 3320",
    website: "https://www.yingwaps.edu.hk",
    applicationMaterials: ["申請表", "出生證明", "成績表", "面試"],
    applicationLink: "https://www.yingwaps.edu.hk/admissions"
  },
  // ==================== 私立學校 (7所) ====================
  {
    id: "pvt-001",
    name: "拔萃女小學",
    category: "私立",
    district: "九龍",
    level: "小學",
    tuitionMin: 79000,
    tuitionMax: 79000,
    curriculum: ["DSE"],
    language: "全英文",
    highlights: [
      "傳統名校女拔萃附小",
      "直屬升讀拔萃女書院",
      "注重音樂與藝術"
    ],
    address: "佐敦加士居道1號",
    phone: "+852 2277 9200",
    website: "https://www.dgjs.edu.hk",
    applicationMaterials: ["申請表", "出生證明", "成績表", "面試"],
    applicationLink: "https://www.dgjs.edu.hk/admissions"
  },
  {
    id: "pvt-002",
    name: "九龍塘學校（小學部）",
    category: "私立",
    district: "九龍",
    level: "小學",
    tuitionMin: 67000,
    tuitionMax: 67000,
    curriculum: ["DSE"],
    language: "全英文",
    highlights: [
      "九龍塘傳統名校",
      "注重英語教育",
      "優質學習環境"
    ],
    address: "九龍塘金巴倫道2721地段",
    phone: "+852 2336 3802",
    website: "https://www.ktsps.edu.hk",
    applicationMaterials: ["申請表", "出生證明", "成績表"],
    applicationLink: "https://www.ktsps.edu.hk/admissions"
  },
  {
    id: "pvt-003",
    name: "香港培正小學",
    category: "私立",
    district: "九龍",
    level: "小學",
    tuitionMin: 58000,
    tuitionMax: 58000,
    curriculum: ["DSE"],
    language: "中英雙語",
    highlights: [
      "傳統名校培正中學附小",
      "直屬升讀培正中學",
      "注重數理與音樂"
    ],
    address: "九龍城窩打老道80號",
    phone: "+852 2714 2562",
    website: "https://www.pcps.edu.hk",
    applicationMaterials: ["申請表", "出生證明", "成績表"],
    applicationLink: "https://www.pcps.edu.hk/admissions"
  },
  {
    id: "pvt-004",
    name: "聖保祿學校（小學部）",
    category: "私立",
    district: "港島",
    level: "小學",
    tuitionMin: 55000,
    tuitionMax: 55000,
    curriculum: ["DSE"],
    language: "全英文",
    highlights: [
      "傳統名校聖保祿學校附小",
      "直屬升讀聖保祿學校",
      "天主教教育理念"
    ],
    address: "銅鑼灣禮頓道140號",
    phone: "+852 2576 3415",
    website: "https://www.spcs.edu.hk",
    applicationMaterials: ["申請表", "出生證明", "成績表"],
    applicationLink: "https://www.spcs.edu.hk/admissions"
  },
  {
    id: "pvt-005",
    name: "民生書院小學",
    category: "私立",
    district: "九龍",
    level: "小學",
    tuitionMin: 52800,
    tuitionMax: 52800,
    curriculum: ["DSE"],
    language: "中英雙語",
    highlights: [
      "傳統名校民生書院附小",
      "一條龍升讀民生書院",
      "注重品德教育"
    ],
    address: "九龍城東寶庭道8號",
    phone: "+852 2336 2861",
    website: "https://www.mscps.edu.hk",
    applicationMaterials: ["申請表", "出生證明", "成績表"],
    applicationLink: "https://www.mscps.edu.hk/admissions"
  },
  {
    id: "pvt-006",
    name: "弘立書院",
    category: "私立",
    district: "港島",
    level: "中學",
    tuitionMin: 260000,
    tuitionMax: 300000,
    curriculum: ["IB"],
    language: "中英雙語",
    highlights: [
      "雙語 IB 課程",
      "中西文化融合",
      "設施完善"
    ],
    address: "薄扶林鋼線灣道1號",
    phone: "+852 2202 2000",
    website: "https://www.isf.edu.hk",
    applicationMaterials: ["申請表", "出生證明", "成績單", "面試"],
    applicationLink: "https://www.isf.edu.hk/admissions"
  },
  {
    id: "pvt-007",
    name: "保良局蔡繼有學校",
    category: "私立",
    district: "九龍",
    level: "中學",
    tuitionMin: 72000,
    tuitionMax: 82000,
    curriculum: ["IB"],
    language: "中英雙語",
    highlights: [
      "一條龍 IB 學校",
      "中英文並重",
      "學術成績穩定"
    ],
    address: "深水埗郝德傑道6號",
    phone: "+852 2148 2052",
    website: "https://www.plkckc.edu.hk",
    applicationMaterials: ["申請表", "出生證明", "學生相片", "成績表"],
    applicationLink: "https://www.plkckc.edu.hk/admissions"
  },
  // ==================== 資助學校 (5所) ====================
  {
    id: "aid-001",
    name: "喇沙書院",
    category: "資助",
    district: "九龍",
    level: "中學",
    tuitionMin: 0,
    tuitionMax: 0,
    curriculum: ["DSE"],
    language: "中英雙語",
    highlights: [
      "傳統天主教名校",
      "DSE 成績優異",
      "重視品德及宗教教育"
    ],
    address: "九龍喇沙利道18號",
    phone: "+852 2338 7171",
    website: "https://www.lasalle.edu.hk",
    applicationMaterials: ["自行分配學位申請表", "成績表", "獎狀"],
    applicationLink: "https://www.lasalle.edu.hk/admissions"
  },
  {
    id: "aid-002",
    name: "英華女學校",
    category: "資助",
    district: "九龍",
    level: "中學",
    tuitionMin: 0,
    tuitionMax: 0,
    curriculum: ["DSE"],
    language: "中英雙語",
    highlights: [
      "歷史悠久的女校",
      "學術成績穩定",
      "注重學生全面發展"
    ],
    address: "深水埗英華街1號",
    phone: "+852 2728 2211",
    website: "https://www.ywgs.edu.hk",
    applicationMaterials: ["申請表", "學生證件相", "成績表"],
    applicationLink: "https://www.ywgs.edu.hk/admissions"
  },
  {
    id: "aid-003",
    name: "皇仁書院",
    category: "公立",
    district: "港島",
    level: "中學",
    tuitionMin: 0,
    tuitionMax: 0,
    curriculum: ["DSE"],
    language: "中英雙語",
    highlights: [
      "香港歷史最悠久的官立中學",
      "學術成績優異",
      "校友網絡強大"
    ],
    address: "銅鑼灣高士威道120號",
    phone: "+852 2571 1028",
    website: "https://www.qc.edu.hk",
    applicationMaterials: ["自行分配學位申請表", "成績表"],
    applicationLink: "https://www.qc.edu.hk/admissions"
  },
  {
    id: "aid-004",
    name: "瑪利曼中學",
    category: "資助",
    district: "港島",
    level: "中學",
    tuitionMin: 0,
    tuitionMax: 0,
    curriculum: ["DSE"],
    language: "中英雙語",
    highlights: [
      "天主教女校",
      "學術成績優秀",
      "重視宗教及品德教育"
    ],
    address: "跑馬地藍塘道123號",
    phone: "+852 2572 5151",
    website: "https://www.maryknoll.edu.hk",
    applicationMaterials: ["申請表", "成績表", "證書"],
    applicationLink: "https://www.maryknoll.edu.hk/admissions"
  },
  {
    id: "aid-005",
    name: "香港培正中學",
    category: "資助",
    district: "九龍",
    level: "中學",
    tuitionMin: 0,
    tuitionMax: 0,
    curriculum: ["DSE"],
    language: "中英雙語",
    highlights: [
      "傳統浸信會學校",
      "學術成績穩定",
      "重視品格及宗教教育"
    ],
    address: "何文田培正道20號",
    phone: "+852 2711 9222",
    website: "https://www.puiching.edu.hk",
    applicationMaterials: ["自行分配學位申請表", "成績表"],
    applicationLink: "https://www.puiching.edu.hk/admissions"
  }
];

export default SCHOOLS;
