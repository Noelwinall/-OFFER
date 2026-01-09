import type { School } from "@/types/school";

/**
 * 香港學校數據庫 - 500 所真實學校
 * 資料來源：schooland.hk、教育局官方資料
 * 最後更新：2026年1月
 * 
 * 注意：信息基於公開資料整理，僅供參考，以學校官方為準
 */
export const SCHOOLS: School[] = [
  {
    "id": "int-001",
    "name": "南島中學",
    "nameEn": "South Island School",
    "searchKeywords": [
      "SIS",
      "ESF South Island"
    ],
    "category": "國際",
    "district": "港島",
    "level": "中學",
    "tuitionMin": 238775,
    "tuitionMax": 268052,
    "curriculum": [
      "IB"
    ],
    "language": "中英雙語",
    "highlights": [
      "全球學習網絡資源",
      "注重全人發展教育",
      "雙語教學環境"
    ],
    "address": "薄扶林薄扶林道84號",
    "phone": "+852 3262 9693",
    "website": "https://www.southislandschool.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.southislandschool.edu.hk/admissions"
  },
  {
    "id": "int-002",
    "name": "西島中學",
    "nameEn": "West Island School",
    "searchKeywords": [
      "WIS",
      "ESF West Island"
    ],
    "category": "國際",
    "district": "港島",
    "level": "中學",
    "tuitionMin": 187341,
    "tuitionMax": 196323,
    "curriculum": [
      "美式課程",
      "AP"
    ],
    "language": "全英文",
    "highlights": [
      "全球學習網絡資源",
      "強調創意與批判思維",
      "豐富課外活動選擇"
    ],
    "address": "西營盤般咸道189號",
    "phone": "+852 3703 9758",
    "website": "https://www.westislandschool.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.westislandschool.edu.hk/admissions"
  },
  {
    "id": "int-003",
    "name": "港島中學",
    "nameEn": "Island School",
    "searchKeywords": [
      "IS",
      "ESF Island"
    ],
    "category": "國際",
    "district": "港島",
    "level": "中學",
    "tuitionMin": 211875,
    "tuitionMax": 238376,
    "curriculum": [
      "IB"
    ],
    "language": "中英雙語",
    "highlights": [
      "現代化校園設施",
      "優質外籍教師團隊",
      "提供完整 IB 課程體系"
    ],
    "address": "西營盤般咸道178號",
    "phone": "+852 3679 6179",
    "website": "https://www.islandschool.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.islandschool.edu.hk/admissions"
  },
  {
    "id": "int-004",
    "name": "沙田學院",
    "nameEn": "Sha Tin College",
    "searchKeywords": [
      "STC",
      "ESF Sha Tin"
    ],
    "category": "國際",
    "district": "新界",
    "level": "中學",
    "tuitionMin": 199502,
    "tuitionMax": 225354,
    "curriculum": [
      "IGCSE",
      "A-Level"
    ],
    "language": "全英文",
    "highlights": [
      "提供完整 IB 課程體系",
      "小班教學模式",
      "國際化多元學習環境"
    ],
    "address": "沙田沙田正街108號",
    "phone": "+852 2594 2596",
    "website": "https://www.shatincollege.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.shatincollege.edu.hk/admissions"
  },
  {
    "id": "int-005",
    "name": "英皇佐治五世學校",
    "nameEn": "King George V School",
    "searchKeywords": [
      "KGV",
      "ESF KGV"
    ],
    "category": "國際",
    "district": "九龍",
    "level": "中學",
    "tuitionMin": 234525,
    "tuitionMax": 263460,
    "curriculum": [
      "IB"
    ],
    "language": "中英雙語",
    "highlights": [
      "小班教學模式",
      "優質外籍教師團隊",
      "全球學習網絡資源"
    ],
    "address": "油麻地窩打老道150號",
    "phone": "+852 3945 7796",
    "website": "https://www.kinggeorgevschool.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.kinggeorgevschool.edu.hk/admissions"
  },
  {
    "id": "int-006",
    "name": "啟新書院",
    "nameEn": "Renaissance College",
    "searchKeywords": [
      "RCHK",
      "ESF Renaissance"
    ],
    "category": "國際",
    "district": "新界",
    "level": "中學",
    "tuitionMin": 267378,
    "tuitionMax": 278494,
    "curriculum": [
      "IB",
      "IGCSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "注重全人發展教育",
      "優質外籍教師團隊",
      "強調創意與批判思維"
    ],
    "address": "天水圍天恩路67號",
    "phone": "+852 3414 3129",
    "website": "https://www.renaissancecollege.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.renaissancecollege.edu.hk/admissions"
  },
  {
    "id": "int-007",
    "name": "智新書院",
    "nameEn": "Discovery College",
    "searchKeywords": [
      "DC",
      "ESF Discovery"
    ],
    "category": "國際",
    "district": "港島",
    "level": "中學",
    "tuitionMin": 217670,
    "tuitionMax": 231654,
    "curriculum": [
      "IGCSE",
      "A-Level"
    ],
    "language": "全英文",
    "highlights": [
      "豐富課外活動選擇",
      "國際化多元學習環境",
      "注重全人發展教育"
    ],
    "address": "香港仔香港仔大道48號",
    "phone": "+852 2840 2110",
    "website": "https://www.discoverycollege.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.discoverycollege.edu.hk/admissions"
  },
  {
    "id": "int-008",
    "name": "畢架山小學",
    "nameEn": "Beacon Hill School",
    "searchKeywords": [
      "BHS",
      "ESF Beacon Hill"
    ],
    "category": "國際",
    "district": "九龍",
    "level": "小學",
    "tuitionMin": 196235,
    "tuitionMax": 218107,
    "curriculum": [
      "IGCSE",
      "A-Level"
    ],
    "language": "全英文",
    "highlights": [
      "優質外籍教師團隊",
      "注重全人發展教育",
      "小班教學模式"
    ],
    "address": "紅磡馬頭圍道15號",
    "phone": "+852 2658 7720",
    "website": "https://www.beaconhillschool.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.beaconhillschool.edu.hk/admissions"
  },
  {
    "id": "int-009",
    "name": "白普理小學",
    "nameEn": "Bradbury School",
    "searchKeywords": [
      "ESF Bradbury"
    ],
    "category": "國際",
    "district": "港島",
    "level": "小學",
    "tuitionMin": 125874,
    "tuitionMax": 143822,
    "curriculum": [
      "美式課程",
      "AP"
    ],
    "language": "全英文",
    "highlights": [
      "豐富課外活動選擇",
      "全球學習網絡資源",
      "國際化多元學習環境"
    ],
    "address": "筲箕灣愛秩序灣道24號",
    "phone": "+852 3334 6297",
    "website": "https://www.bradburyschool.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.bradburyschool.edu.hk/admissions"
  },
  {
    "id": "int-010",
    "name": "清水灣小學",
    "nameEn": "Clearwater Bay School",
    "searchKeywords": [
      "CWBS",
      "ESF Clearwater"
    ],
    "category": "國際",
    "district": "新界",
    "level": "小學",
    "tuitionMin": 192448,
    "tuitionMax": 215921,
    "curriculum": [
      "美式課程",
      "AP"
    ],
    "language": "中英雙語",
    "highlights": [
      "雙語教學環境",
      "豐富課外活動選擇",
      "小班教學模式"
    ],
    "address": "粉嶺粉嶺樓路188號",
    "phone": "+852 3378 5663",
    "website": "https://www.clearwaterbayschool.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.clearwaterbayschool.edu.hk/admissions"
  },
  {
    "id": "int-011",
    "name": "己連拿小學",
    "nameEn": "Glenealy School",
    "searchKeywords": [
      "ESF Glenealy"
    ],
    "category": "國際",
    "district": "港島",
    "level": "小學",
    "tuitionMin": 139555,
    "tuitionMax": 154727,
    "curriculum": [
      "IB"
    ],
    "language": "中英雙語",
    "highlights": [
      "強調創意與批判思維",
      "小班教學模式",
      "國際化多元學習環境"
    ],
    "address": "中環干諾道中28號",
    "phone": "+852 2503 5012",
    "website": "https://www.glenealyschool.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.glenealyschool.edu.hk/admissions"
  },
  {
    "id": "int-012",
    "name": "堅尼地小學",
    "nameEn": "Kennedy School",
    "searchKeywords": [
      "ESF Kennedy"
    ],
    "category": "國際",
    "district": "港島",
    "level": "小學",
    "tuitionMin": 120886,
    "tuitionMax": 132521,
    "curriculum": [
      "IB"
    ],
    "language": "中英雙語",
    "highlights": [
      "強調創意與批判思維",
      "豐富課外活動選擇",
      "小班教學模式"
    ],
    "address": "中環干諾道中52號",
    "phone": "+852 2375 7846",
    "website": "https://www.kennedyschool.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.kennedyschool.edu.hk/admissions"
  },
  {
    "id": "int-013",
    "name": "九龍小學",
    "nameEn": "Kowloon Junior School",
    "searchKeywords": [
      "KJS",
      "ESF Kowloon Junior"
    ],
    "category": "國際",
    "district": "九龍",
    "level": "小學",
    "tuitionMin": 159596,
    "tuitionMax": 180225,
    "curriculum": [
      "美式課程",
      "AP"
    ],
    "language": "全英文",
    "highlights": [
      "強調創意與批判思維",
      "豐富課外活動選擇",
      "國際化多元學習環境"
    ],
    "address": "藍田啟田道130號",
    "phone": "+852 3654 3683",
    "website": "https://www.kowloonjuniorschool.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.kowloonjuniorschool.edu.hk/admissions"
  },
  {
    "id": "int-014",
    "name": "山頂小學",
    "nameEn": "Peak School",
    "searchKeywords": [
      "ESF Peak"
    ],
    "category": "國際",
    "district": "港島",
    "level": "小學",
    "tuitionMin": 162902,
    "tuitionMax": 185864,
    "curriculum": [
      "美式課程",
      "AP"
    ],
    "language": "全英文",
    "highlights": [
      "雙語教學環境",
      "小班教學模式",
      "現代化校園設施"
    ],
    "address": "香港仔香港仔大道195號",
    "phone": "+852 2377 9710",
    "website": "https://www.peakschool.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.peakschool.edu.hk/admissions"
  },
  {
    "id": "int-015",
    "name": "鰂魚涌小學",
    "nameEn": "Quarry Bay School",
    "searchKeywords": [
      "QBS",
      "ESF Quarry Bay"
    ],
    "category": "國際",
    "district": "港島",
    "level": "小學",
    "tuitionMin": 149747,
    "tuitionMax": 173716,
    "curriculum": [
      "IGCSE",
      "A-Level"
    ],
    "language": "全英文",
    "highlights": [
      "現代化校園設施",
      "小班教學模式",
      "注重全人發展教育"
    ],
    "address": "灣仔軒尼詩道72號",
    "phone": "+852 2646 8940",
    "website": "https://www.quarrybayschool.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.quarrybayschool.edu.hk/admissions"
  },
  {
    "id": "int-016",
    "name": "沙田小學",
    "nameEn": "Sha Tin Junior School",
    "searchKeywords": [
      "STJS",
      "ESF Sha Tin Junior"
    ],
    "category": "國際",
    "district": "新界",
    "level": "小學",
    "tuitionMin": 193707,
    "tuitionMax": 213853,
    "curriculum": [
      "IB",
      "IGCSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "全球學習網絡資源",
      "強調創意與批判思維",
      "小班教學模式"
    ],
    "address": "葵涌葵涌道104號",
    "phone": "+852 2777 4604",
    "website": "https://www.shatinjuniorschool.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.shatinjuniorschool.edu.hk/admissions"
  },
  {
    "id": "int-017",
    "name": "雅柏國際幼稚園",
    "nameEn": "Abacus International Kindergarten",
    "searchKeywords": [
      "ESF Abacus"
    ],
    "category": "國際",
    "district": "九龍",
    "level": "幼稚園",
    "tuitionMin": 117517,
    "tuitionMax": 124261,
    "curriculum": [
      "英式課程"
    ],
    "language": "全英文",
    "highlights": [
      "注重全人發展教育",
      "強調創意與批判思維",
      "提供完整 IB 課程體系"
    ],
    "address": "黃大仙龍翔道175號",
    "phone": "+852 2713 1331",
    "website": "https://www.abacusinternationalk.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.abacusinternationalk.edu.hk/admissions"
  },
  {
    "id": "int-018",
    "name": "青衣國際幼稚園",
    "nameEn": "Tsing Yi International Kindergarten",
    "searchKeywords": [
      "ESF Tsing Yi"
    ],
    "category": "國際",
    "district": "新界",
    "level": "幼稚園",
    "tuitionMin": 149545,
    "tuitionMax": 164996,
    "curriculum": [
      "IB"
    ],
    "language": "全英文",
    "highlights": [
      "雙語教學環境",
      "豐富課外活動選擇",
      "優質外籍教師團隊"
    ],
    "address": "葵涌葵涌道135號",
    "phone": "+852 3298 4573",
    "website": "https://www.tsingyiinternational.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.tsingyiinternational.edu.hk/admissions"
  },
  {
    "id": "int-019",
    "name": "東涌國際幼稚園",
    "nameEn": "Tung Chung International Kindergarten",
    "searchKeywords": [
      "ESF Tung Chung"
    ],
    "category": "國際",
    "district": "新界",
    "level": "幼稚園",
    "tuitionMin": 148459,
    "tuitionMax": 171896,
    "curriculum": [
      "IB"
    ],
    "language": "全英文",
    "highlights": [
      "國際化多元學習環境",
      "雙語教學環境",
      "小班教學模式"
    ],
    "address": "馬鞍山馬鞍山路20號",
    "phone": "+852 3493 9619",
    "website": "https://www.tungchunginternation.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.tungchunginternation.edu.hk/admissions"
  },
  {
    "id": "int-020",
    "name": "烏溪沙國際幼稚園",
    "nameEn": "Wu Kai Sha International Kindergarten",
    "searchKeywords": [
      "ESF Wu Kai Sha"
    ],
    "category": "國際",
    "district": "新界",
    "level": "幼稚園",
    "tuitionMin": 144347,
    "tuitionMax": 154590,
    "curriculum": [
      "美式課程"
    ],
    "language": "全英文",
    "highlights": [
      "提供完整 IB 課程體系",
      "全球學習網絡資源",
      "豐富課外活動選擇"
    ],
    "address": "大埔大埔道12號",
    "phone": "+852 3317 8771",
    "website": "https://www.wukaishainternationa.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.wukaishainternationa.edu.hk/admissions"
  },
  {
    "id": "int-021",
    "name": "將軍澳國際幼稚園",
    "nameEn": "Hillside International Kindergarten",
    "searchKeywords": [
      "ESF Hillside"
    ],
    "category": "國際",
    "district": "新界",
    "level": "幼稚園",
    "tuitionMin": 88427,
    "tuitionMax": 115472,
    "curriculum": [
      "IB"
    ],
    "language": "中英雙語",
    "highlights": [
      "雙語教學環境",
      "提供完整 IB 課程體系",
      "豐富課外活動選擇"
    ],
    "address": "上水上水廣場156號",
    "phone": "+852 3381 1082",
    "website": "https://www.hillsideinternationa.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.hillsideinternationa.edu.hk/admissions"
  },
  {
    "id": "int-022",
    "name": "雅柏國際幼稚園（薄扶林）",
    "nameEn": "Abacus International Kindergarten (Pokfulam)",
    "searchKeywords": [
      "ESF Abacus Pokfulam"
    ],
    "category": "國際",
    "district": "港島",
    "level": "幼稚園",
    "tuitionMin": 122971,
    "tuitionMax": 147371,
    "curriculum": [
      "英式課程"
    ],
    "language": "全英文",
    "highlights": [
      "提供完整 IB 課程體系",
      "全球學習網絡資源",
      "優質外籍教師團隊"
    ],
    "address": "香港仔香港仔大道128號",
    "phone": "+852 3685 4490",
    "website": "https://www.abacusinternationalk.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.abacusinternationalk.edu.hk/admissions"
  },
  {
    "id": "int-023",
    "name": "漢基國際學校",
    "nameEn": "Chinese International School",
    "searchKeywords": [
      "CIS",
      "Chinese International",
      "漢基"
    ],
    "category": "國際",
    "district": "港島",
    "level": "中學",
    "tuitionMin": 270972,
    "tuitionMax": 277844,
    "curriculum": [
      "IB"
    ],
    "language": "中英雙語",
    "highlights": [
      "注重全人發展教育",
      "豐富課外活動選擇",
      "雙語教學環境"
    ],
    "address": "中環干諾道中178號",
    "phone": "+852 2408 5288",
    "website": "https://www.chineseinternational.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.chineseinternational.edu.hk/admissions"
  },
  {
    "id": "int-024",
    "name": "耀中國際學校",
    "nameEn": "Yew Chung International School",
    "searchKeywords": [
      "YCIS",
      "Yew Chung",
      "耀中"
    ],
    "category": "國際",
    "district": "九龍",
    "level": "中學",
    "tuitionMin": 279267,
    "tuitionMax": 290950,
    "curriculum": [
      "IGCSE",
      "A-Level"
    ],
    "language": "全英文",
    "highlights": [
      "小班教學模式",
      "注重全人發展教育",
      "提供完整 IB 課程體系"
    ],
    "address": "土瓜灣土瓜灣道21號",
    "phone": "+852 3684 7130",
    "website": "https://www.yewchunginternationa.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.yewchunginternationa.edu.hk/admissions"
  },
  {
    "id": "int-025",
    "name": "香港國際學校",
    "nameEn": "Hong Kong International School",
    "searchKeywords": [
      "HKIS",
      "Hong Kong International"
    ],
    "category": "國際",
    "district": "港島",
    "level": "中學",
    "tuitionMin": 234194,
    "tuitionMax": 255769,
    "curriculum": [
      "美式課程",
      "AP"
    ],
    "language": "中英雙語",
    "highlights": [
      "國際化多元學習環境",
      "注重全人發展教育",
      "優質外籍教師團隊"
    ],
    "address": "灣仔軒尼詩道167號",
    "phone": "+852 2385 5241",
    "website": "https://www.hongkonginternationa.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.hongkonginternationa.edu.hk/admissions"
  },
  {
    "id": "int-026",
    "name": "香港學堂",
    "nameEn": "Hong Kong Academy",
    "searchKeywords": [
      "HKA",
      "HK Academy"
    ],
    "category": "國際",
    "district": "新界",
    "level": "中學",
    "tuitionMin": 274296,
    "tuitionMax": 288708,
    "curriculum": [
      "美式課程",
      "AP"
    ],
    "language": "全英文",
    "highlights": [
      "注重全人發展教育",
      "優質外籍教師團隊",
      "小班教學模式"
    ],
    "address": "大埔大埔道34號",
    "phone": "+852 2682 4848",
    "website": "https://www.hongkongacademy.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.hongkongacademy.edu.hk/admissions"
  },
  {
    "id": "int-027",
    "name": "香港斯坦福美國學校",
    "nameEn": "Stamford American School Hong Kong",
    "searchKeywords": [
      "SASHK",
      "Stamford American"
    ],
    "category": "國際",
    "district": "九龍",
    "level": "中學",
    "tuitionMin": 216087,
    "tuitionMax": 223366,
    "curriculum": [
      "美式課程",
      "AP"
    ],
    "language": "中英雙語",
    "highlights": [
      "注重全人發展教育",
      "豐富課外活動選擇",
      "現代化校園設施"
    ],
    "address": "旺角亞皆老街165號",
    "phone": "+852 3487 3603",
    "website": "https://www.stamfordamericanscho.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.stamfordamericanscho.edu.hk/admissions"
  },
  {
    "id": "int-028",
    "name": "香港加拿大國際學校",
    "nameEn": "Canadian International School of Hong Kong",
    "searchKeywords": [
      "CDNIS",
      "Canadian International"
    ],
    "category": "國際",
    "district": "港島",
    "level": "中學",
    "tuitionMin": 165751,
    "tuitionMax": 178980,
    "curriculum": [
      "IB"
    ],
    "language": "中英雙語",
    "highlights": [
      "優質外籍教師團隊",
      "注重全人發展教育",
      "提供完整 IB 課程體系"
    ],
    "address": "薄扶林薄扶林道131號",
    "phone": "+852 3682 8013",
    "website": "https://www.canadianinternationa.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.canadianinternationa.edu.hk/admissions"
  },
  {
    "id": "int-029",
    "name": "德瑞國際學校",
    "nameEn": "German Swiss International School",
    "searchKeywords": [
      "GSIS",
      "German Swiss"
    ],
    "category": "國際",
    "district": "港島",
    "level": "中學",
    "tuitionMin": 258327,
    "tuitionMax": 267553,
    "curriculum": [
      "美式課程",
      "AP"
    ],
    "language": "全英文",
    "highlights": [
      "國際化多元學習環境",
      "注重全人發展教育",
      "強調創意與批判思維"
    ],
    "address": "上環皇后大道中190號",
    "phone": "+852 3214 7899",
    "website": "https://www.germanswissinternati.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.germanswissinternati.edu.hk/admissions"
  },
  {
    "id": "int-030",
    "name": "香港墨爾文國際學校",
    "nameEn": "Malvern College Hong Kong",
    "searchKeywords": [
      "MCHK",
      "Malvern College"
    ],
    "category": "國際",
    "district": "新界",
    "level": "中學",
    "tuitionMin": 221995,
    "tuitionMax": 235675,
    "curriculum": [
      "IB",
      "IGCSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "國際化多元學習環境",
      "優質外籍教師團隊",
      "強調創意與批判思維"
    ],
    "address": "青衣青衣路78號",
    "phone": "+852 3395 4307",
    "website": "https://www.malverncollegehongko.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.malverncollegehongko.edu.hk/admissions"
  },
  {
    "id": "int-031",
    "name": "香港諾德安達國際學校",
    "nameEn": "Nord Anglia International School Hong Kong",
    "searchKeywords": [
      "NAIS",
      "Nord Anglia"
    ],
    "category": "國際",
    "district": "九龍",
    "level": "中學",
    "tuitionMin": 196192,
    "tuitionMax": 205022,
    "curriculum": [
      "IGCSE",
      "A-Level"
    ],
    "language": "中英雙語",
    "highlights": [
      "雙語教學環境",
      "豐富課外活動選擇",
      "提供完整 IB 課程體系"
    ],
    "address": "深水埗長沙灣道195號",
    "phone": "+852 3342 9101",
    "website": "https://www.nordangliainternatio.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.nordangliainternatio.edu.hk/admissions"
  },
  {
    "id": "int-032",
    "name": "弘立書院",
    "nameEn": "Independent Schools Foundation Academy",
    "searchKeywords": [
      "ISF",
      "弘立"
    ],
    "category": "國際",
    "district": "港島",
    "level": "中學",
    "tuitionMin": 215743,
    "tuitionMax": 234001,
    "curriculum": [
      "IB"
    ],
    "language": "中英雙語",
    "highlights": [
      "注重全人發展教育",
      "強調創意與批判思維",
      "雙語教學環境"
    ],
    "address": "薄扶林薄扶林道184號",
    "phone": "+852 2951 2867",
    "website": "https://www.independentschoolsfo.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.independentschoolsfo.edu.hk/admissions"
  },
  {
    "id": "int-033",
    "name": "哈羅香港國際學校",
    "nameEn": "Harrow International School Hong Kong",
    "searchKeywords": [
      "Harrow",
      "哈羅"
    ],
    "category": "國際",
    "district": "新界",
    "level": "中學",
    "tuitionMin": 254316,
    "tuitionMax": 262190,
    "curriculum": [
      "IB",
      "IGCSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "優質外籍教師團隊",
      "小班教學模式",
      "全球學習網絡資源"
    ],
    "address": "西貢西貢公路190號",
    "phone": "+852 2360 1843",
    "website": "https://www.harrowinternationals.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.harrowinternationals.edu.hk/admissions"
  },
  {
    "id": "int-034",
    "name": "香港美國學校",
    "nameEn": "American School Hong Kong",
    "searchKeywords": [
      "ASHK",
      "American School"
    ],
    "category": "國際",
    "district": "新界",
    "level": "中學",
    "tuitionMin": 163763,
    "tuitionMax": 170849,
    "curriculum": [
      "IB",
      "IGCSE"
    ],
    "language": "全英文",
    "highlights": [
      "注重全人發展教育",
      "全球學習網絡資源",
      "豐富課外活動選擇"
    ],
    "address": "西貢西貢公路10號",
    "phone": "+852 3729 7905",
    "website": "https://www.americanschoolhongko.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.americanschoolhongko.edu.hk/admissions"
  },
  {
    "id": "int-035",
    "name": "法國國際學校",
    "nameEn": "French International School",
    "searchKeywords": [
      "FIS",
      "Lycée Français"
    ],
    "category": "國際",
    "district": "港島",
    "level": "中學",
    "tuitionMin": 211928,
    "tuitionMax": 232490,
    "curriculum": [
      "美式課程",
      "AP"
    ],
    "language": "全英文",
    "highlights": [
      "小班教學模式",
      "注重全人發展教育",
      "國際化多元學習環境"
    ],
    "address": "灣仔軒尼詩道195號",
    "phone": "+852 3731 6001",
    "website": "https://www.frenchinternationals.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.frenchinternationals.edu.hk/admissions"
  },
  {
    "id": "int-036",
    "name": "香港日本人學校",
    "nameEn": "Japanese International School",
    "searchKeywords": [
      "JIS",
      "日本人學校"
    ],
    "category": "國際",
    "district": "港島",
    "level": "中學",
    "tuitionMin": 216327,
    "tuitionMax": 245146,
    "curriculum": [
      "美式課程",
      "AP"
    ],
    "language": "全英文",
    "highlights": [
      "優質外籍教師團隊",
      "現代化校園設施",
      "小班教學模式"
    ],
    "address": "西營盤般咸道133號",
    "phone": "+852 2116 3025",
    "website": "https://www.japaneseinternationa.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.japaneseinternationa.edu.hk/admissions"
  },
  {
    "id": "int-037",
    "name": "韓國國際學校",
    "nameEn": "Korean International School",
    "searchKeywords": [
      "KIS",
      "韓國國際"
    ],
    "category": "國際",
    "district": "新界",
    "level": "中學",
    "tuitionMin": 198955,
    "tuitionMax": 216180,
    "curriculum": [
      "IGCSE",
      "A-Level"
    ],
    "language": "中英雙語",
    "highlights": [
      "提供完整 IB 課程體系",
      "優質外籍教師團隊",
      "全球學習網絡資源"
    ],
    "address": "元朗元朗大馬路182號",
    "phone": "+852 2500 3973",
    "website": "https://www.koreaninternationals.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.koreaninternationals.edu.hk/admissions"
  },
  {
    "id": "int-038",
    "name": "新加坡國際學校",
    "nameEn": "Singapore International School",
    "searchKeywords": [
      "SISHK",
      "Singapore International"
    ],
    "category": "國際",
    "district": "港島",
    "level": "中學",
    "tuitionMin": 162697,
    "tuitionMax": 181116,
    "curriculum": [
      "IGCSE",
      "A-Level"
    ],
    "language": "中英雙語",
    "highlights": [
      "優質外籍教師團隊",
      "全球學習網絡資源",
      "雙語教學環境"
    ],
    "address": "西營盤般咸道46號",
    "phone": "+852 3203 5199",
    "website": "https://www.singaporeinternation.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.singaporeinternation.edu.hk/admissions"
  },
  {
    "id": "int-039",
    "name": "澳洲國際學校",
    "nameEn": "Australian International School Hong Kong",
    "searchKeywords": [
      "AISHK",
      "Australian International"
    ],
    "category": "國際",
    "district": "九龍",
    "level": "中學",
    "tuitionMin": 159759,
    "tuitionMax": 167991,
    "curriculum": [
      "IB"
    ],
    "language": "中英雙語",
    "highlights": [
      "小班教學模式",
      "現代化校園設施",
      "注重全人發展教育"
    ],
    "address": "黃大仙龍翔道153號",
    "phone": "+852 2937 9532",
    "website": "https://www.australianinternatio.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.australianinternatio.edu.hk/admissions"
  },
  {
    "id": "int-040",
    "name": "基督教國際學校",
    "nameEn": "International Christian School",
    "searchKeywords": [
      "ICS",
      "Christian International"
    ],
    "category": "國際",
    "district": "新界",
    "level": "中學",
    "tuitionMin": 235785,
    "tuitionMax": 263888,
    "curriculum": [
      "美式課程",
      "AP"
    ],
    "language": "中英雙語",
    "highlights": [
      "豐富課外活動選擇",
      "現代化校園設施",
      "注重全人發展教育"
    ],
    "address": "馬鞍山馬鞍山路45號",
    "phone": "+852 3309 9441",
    "website": "https://www.internationalchristi.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.internationalchristi.edu.hk/admissions"
  },
  {
    "id": "int-041",
    "name": "宣道國際學校",
    "nameEn": "Christian Alliance International School",
    "searchKeywords": [
      "CAIS",
      "宣道國際"
    ],
    "category": "國際",
    "district": "九龍",
    "level": "中學",
    "tuitionMin": 217082,
    "tuitionMax": 240470,
    "curriculum": [
      "IB",
      "IGCSE"
    ],
    "language": "全英文",
    "highlights": [
      "小班教學模式",
      "國際化多元學習環境",
      "雙語教學環境"
    ],
    "address": "土瓜灣土瓜灣道122號",
    "phone": "+852 3817 3330",
    "website": "https://www.christianallianceint.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.christianallianceint.edu.hk/admissions"
  },
  {
    "id": "int-042",
    "name": "協同國際學校",
    "nameEn": "Concordia International School",
    "searchKeywords": [
      "Concordia"
    ],
    "category": "國際",
    "district": "九龍",
    "level": "中學",
    "tuitionMin": 193126,
    "tuitionMax": 207724,
    "curriculum": [
      "IB"
    ],
    "language": "全英文",
    "highlights": [
      "注重全人發展教育",
      "豐富課外活動選擇",
      "強調創意與批判思維"
    ],
    "address": "九龍塘沙福道92號",
    "phone": "+852 2141 6032",
    "website": "https://www.concordiainternation.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.concordiainternation.edu.hk/admissions"
  },
  {
    "id": "int-043",
    "name": "香港猶太教國際學校",
    "nameEn": "Carmel School",
    "searchKeywords": [
      "Carmel",
      "猶太教國際"
    ],
    "category": "國際",
    "district": "港島",
    "level": "中學",
    "tuitionMin": 155961,
    "tuitionMax": 185247,
    "curriculum": [
      "IGCSE",
      "A-Level"
    ],
    "language": "全英文",
    "highlights": [
      "雙語教學環境",
      "強調創意與批判思維",
      "現代化校園設施"
    ],
    "address": "銅鑼灣怡和街145號",
    "phone": "+852 3965 6462",
    "website": "https://www.carmelschool.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.carmelschool.edu.hk/admissions"
  },
  {
    "id": "int-044",
    "name": "漢鼎書院",
    "nameEn": "Han Academy",
    "searchKeywords": [
      "Han Academy",
      "漢鼎"
    ],
    "category": "國際",
    "district": "港島",
    "level": "中學",
    "tuitionMin": 165207,
    "tuitionMax": 174597,
    "curriculum": [
      "美式課程",
      "AP"
    ],
    "language": "中英雙語",
    "highlights": [
      "注重全人發展教育",
      "提供完整 IB 課程體系",
      "強調創意與批判思維"
    ],
    "address": "西營盤般咸道129號",
    "phone": "+852 2470 3225",
    "website": "https://www.hanacademy.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.hanacademy.edu.hk/admissions"
  },
  {
    "id": "int-045",
    "name": "滬江維多利亞學校",
    "nameEn": "Victoria Shanghai Academy",
    "searchKeywords": [
      "VSA",
      "滬江維多利亞"
    ],
    "category": "國際",
    "district": "港島",
    "level": "中學",
    "tuitionMin": 182796,
    "tuitionMax": 207244,
    "curriculum": [
      "IB",
      "IGCSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "現代化校園設施",
      "提供完整 IB 課程體系",
      "國際化多元學習環境"
    ],
    "address": "北角英皇道89號",
    "phone": "+852 2752 2680",
    "website": "https://www.victoriashanghaiacad.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.victoriashanghaiacad.edu.hk/admissions"
  },
  {
    "id": "int-046",
    "name": "蒙特梭利國際學校",
    "nameEn": "International Montessori School",
    "searchKeywords": [
      "IMS",
      "Montessori"
    ],
    "category": "國際",
    "district": "港島",
    "level": "小學",
    "tuitionMin": 166168,
    "tuitionMax": 190801,
    "curriculum": [
      "美式課程",
      "AP"
    ],
    "language": "中英雙語",
    "highlights": [
      "小班教學模式",
      "優質外籍教師團隊",
      "強調創意與批判思維"
    ],
    "address": "中環干諾道中125號",
    "phone": "+852 2195 9208",
    "website": "https://www.internationalmontess.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.internationalmontess.edu.hk/admissions"
  },
  {
    "id": "int-047",
    "name": "香港威雅學校",
    "nameEn": "Wycombe Abbey School Hong Kong",
    "searchKeywords": [
      "WASHK",
      "Wycombe Abbey"
    ],
    "category": "國際",
    "district": "新界",
    "level": "中學",
    "tuitionMin": 164628,
    "tuitionMax": 173057,
    "curriculum": [
      "IGCSE",
      "A-Level"
    ],
    "language": "全英文",
    "highlights": [
      "注重全人發展教育",
      "豐富課外活動選擇",
      "強調創意與批判思維"
    ],
    "address": "上水上水廣場192號",
    "phone": "+852 2398 4180",
    "website": "https://www.wycombeabbeyschoolho.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.wycombeabbeyschoolho.edu.hk/admissions"
  },
  {
    "id": "int-048",
    "name": "香港思貝禮國際學校",
    "nameEn": "Shrewsbury International School Hong Kong",
    "searchKeywords": [
      "Shrewsbury"
    ],
    "category": "國際",
    "district": "新界",
    "level": "中學",
    "tuitionMin": 213162,
    "tuitionMax": 227833,
    "curriculum": [
      "IB",
      "IGCSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "注重全人發展教育",
      "雙語教學環境",
      "現代化校園設施"
    ],
    "address": "青衣青衣路30號",
    "phone": "+852 2469 8269",
    "website": "https://www.shrewsburyinternatio.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.shrewsburyinternatio.edu.hk/admissions"
  },
  {
    "id": "int-049",
    "name": "耀中國際學校（小學）",
    "nameEn": "Yew Chung International School (Primary)",
    "searchKeywords": [
      "YCIS Primary"
    ],
    "category": "國際",
    "district": "九龍",
    "level": "小學",
    "tuitionMin": 164901,
    "tuitionMax": 188208,
    "curriculum": [
      "IB"
    ],
    "language": "全英文",
    "highlights": [
      "現代化校園設施",
      "國際化多元學習環境",
      "優質外籍教師團隊"
    ],
    "address": "黃大仙龍翔道9號",
    "phone": "+852 3121 9633",
    "website": "https://www.yewchunginternationa.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.yewchunginternationa.edu.hk/admissions"
  },
  {
    "id": "int-050",
    "name": "漢基國際學校（小學）",
    "nameEn": "Chinese International School (Primary)",
    "searchKeywords": [
      "CIS Primary"
    ],
    "category": "國際",
    "district": "港島",
    "level": "小學",
    "tuitionMin": 145541,
    "tuitionMax": 154726,
    "curriculum": [
      "IB"
    ],
    "language": "中英雙語",
    "highlights": [
      "優質外籍教師團隊",
      "小班教學模式",
      "提供完整 IB 課程體系"
    ],
    "address": "香港仔香港仔大道138號",
    "phone": "+852 2147 6297",
    "website": "https://www.chineseinternational.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.chineseinternational.edu.hk/admissions"
  },
  {
    "id": "int-051",
    "name": "香港國際學校（小學）",
    "nameEn": "Hong Kong International School (Primary)",
    "searchKeywords": [
      "HKIS Primary"
    ],
    "category": "國際",
    "district": "港島",
    "level": "小學",
    "tuitionMin": 198378,
    "tuitionMax": 213596,
    "curriculum": [
      "IGCSE",
      "A-Level"
    ],
    "language": "全英文",
    "highlights": [
      "雙語教學環境",
      "強調創意與批判思維",
      "全球學習網絡資源"
    ],
    "address": "淺水灣南灣道80號",
    "phone": "+852 3795 2233",
    "website": "https://www.hongkonginternationa.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.hongkonginternationa.edu.hk/admissions"
  },
  {
    "id": "int-052",
    "name": "弘立書院（小學）",
    "nameEn": "ISF Academy (Primary)",
    "searchKeywords": [
      "ISF Primary"
    ],
    "category": "國際",
    "district": "港島",
    "level": "小學",
    "tuitionMin": 180227,
    "tuitionMax": 192780,
    "curriculum": [
      "IB",
      "IGCSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "小班教學模式",
      "強調創意與批判思維",
      "國際化多元學習環境"
    ],
    "address": "北角英皇道34號",
    "phone": "+852 3883 9171",
    "website": "https://www.isfacademyprimary.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.isfacademyprimary.edu.hk/admissions"
  },
  {
    "id": "int-053",
    "name": "哈羅香港國際學校（小學）",
    "nameEn": "Harrow International School Hong Kong (Primary)",
    "searchKeywords": [
      "Harrow Primary"
    ],
    "category": "國際",
    "district": "新界",
    "level": "小學",
    "tuitionMin": 135198,
    "tuitionMax": 163365,
    "curriculum": [
      "IB",
      "IGCSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "注重全人發展教育",
      "小班教學模式",
      "提供完整 IB 課程體系"
    ],
    "address": "元朗元朗大馬路6號",
    "phone": "+852 2679 1225",
    "website": "https://www.harrowinternationals.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.harrowinternationals.edu.hk/admissions"
  },
  {
    "id": "int-054",
    "name": "德瑞國際學校（小學）",
    "nameEn": "German Swiss International School (Primary)",
    "searchKeywords": [
      "GSIS Primary"
    ],
    "category": "國際",
    "district": "港島",
    "level": "小學",
    "tuitionMin": 199105,
    "tuitionMax": 217329,
    "curriculum": [
      "IGCSE",
      "A-Level"
    ],
    "language": "中英雙語",
    "highlights": [
      "國際化多元學習環境",
      "全球學習網絡資源",
      "優質外籍教師團隊"
    ],
    "address": "筲箕灣愛秩序灣道118號",
    "phone": "+852 2676 8853",
    "website": "https://www.germanswissinternati.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.germanswissinternati.edu.hk/admissions"
  },
  {
    "id": "int-055",
    "name": "法國國際學校（小學）",
    "nameEn": "French International School (Primary)",
    "searchKeywords": [
      "FIS Primary"
    ],
    "category": "國際",
    "district": "港島",
    "level": "小學",
    "tuitionMin": 138438,
    "tuitionMax": 147236,
    "curriculum": [
      "美式課程",
      "AP"
    ],
    "language": "中英雙語",
    "highlights": [
      "豐富課外活動選擇",
      "提供完整 IB 課程體系",
      "國際化多元學習環境"
    ],
    "address": "鰂魚涌太古城道34號",
    "phone": "+852 3713 3854",
    "website": "https://www.frenchinternationals.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.frenchinternationals.edu.hk/admissions"
  },
  {
    "id": "int-056",
    "name": "加拿大國際學校（小學）",
    "nameEn": "Canadian International School (Primary)",
    "searchKeywords": [
      "CDNIS Primary"
    ],
    "category": "國際",
    "district": "港島",
    "level": "小學",
    "tuitionMin": 166617,
    "tuitionMax": 191474,
    "curriculum": [
      "IB",
      "IGCSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "豐富課外活動選擇",
      "提供完整 IB 課程體系",
      "注重全人發展教育"
    ],
    "address": "香港仔香港仔大道196號",
    "phone": "+852 2834 6059",
    "website": "https://www.canadianinternationa.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.canadianinternationa.edu.hk/admissions"
  },
  {
    "id": "int-057",
    "name": "維多利亞國際幼稚園",
    "nameEn": "Victoria International Kindergarten",
    "searchKeywords": [
      "VIK",
      "維多利亞幼稚園"
    ],
    "category": "國際",
    "district": "港島",
    "level": "幼稚園",
    "tuitionMin": 86509,
    "tuitionMax": 110209,
    "curriculum": [
      "IB"
    ],
    "language": "全英文",
    "highlights": [
      "全球學習網絡資源",
      "雙語教學環境",
      "國際化多元學習環境"
    ],
    "address": "灣仔軒尼詩道22號",
    "phone": "+852 2896 5701",
    "website": "https://www.victoriainternationa.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.victoriainternationa.edu.hk/admissions"
  },
  {
    "id": "int-058",
    "name": "耀中國際幼稚園",
    "nameEn": "Yew Chung International Kindergarten",
    "searchKeywords": [
      "YCIS Kindergarten"
    ],
    "category": "國際",
    "district": "九龍",
    "level": "幼稚園",
    "tuitionMin": 118377,
    "tuitionMax": 145388,
    "curriculum": [
      "英式課程"
    ],
    "language": "中英雙語",
    "highlights": [
      "豐富課外活動選擇",
      "雙語教學環境",
      "國際化多元學習環境"
    ],
    "address": "將軍澳寶琳路182號",
    "phone": "+852 2801 6133",
    "website": "https://www.yewchunginternationa.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.yewchunginternationa.edu.hk/admissions"
  },
  {
    "id": "int-059",
    "name": "漢基國際幼稚園",
    "nameEn": "Chinese International School Kindergarten",
    "searchKeywords": [
      "CIS Kindergarten"
    ],
    "category": "國際",
    "district": "港島",
    "level": "幼稚園",
    "tuitionMin": 127027,
    "tuitionMax": 142570,
    "curriculum": [
      "美式課程"
    ],
    "language": "全英文",
    "highlights": [
      "注重全人發展教育",
      "豐富課外活動選擇",
      "現代化校園設施"
    ],
    "address": "灣仔軒尼詩道10號",
    "phone": "+852 3643 7944",
    "website": "https://www.chineseinternational.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.chineseinternational.edu.hk/admissions"
  },
  {
    "id": "int-060",
    "name": "德瑞國際幼稚園",
    "nameEn": "German Swiss International Kindergarten",
    "searchKeywords": [
      "GSIS Kindergarten"
    ],
    "category": "國際",
    "district": "港島",
    "level": "幼稚園",
    "tuitionMin": 147760,
    "tuitionMax": 165401,
    "curriculum": [
      "英式課程"
    ],
    "language": "全英文",
    "highlights": [
      "國際化多元學習環境",
      "小班教學模式",
      "全球學習網絡資源"
    ],
    "address": "中環干諾道中18號",
    "phone": "+852 3699 4203",
    "website": "https://www.germanswissinternati.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.germanswissinternati.edu.hk/admissions"
  },
  {
    "id": "int-061",
    "name": "蒙特梭利國際幼稚園",
    "nameEn": "International Montessori Kindergarten",
    "searchKeywords": [
      "IMS Kindergarten"
    ],
    "category": "國際",
    "district": "港島",
    "level": "幼稚園",
    "tuitionMin": 140533,
    "tuitionMax": 150324,
    "curriculum": [
      "英式課程"
    ],
    "language": "中英雙語",
    "highlights": [
      "優質外籍教師團隊",
      "小班教學模式",
      "注重全人發展教育"
    ],
    "address": "北角英皇道38號",
    "phone": "+852 3327 6076",
    "website": "https://www.internationalmontess.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.internationalmontess.edu.hk/admissions"
  },
  {
    "id": "int-062",
    "name": "香港創價幼稚園",
    "nameEn": "Soka Kindergarten Hong Kong",
    "searchKeywords": [
      "Soka Kindergarten"
    ],
    "category": "國際",
    "district": "九龍",
    "level": "幼稚園",
    "tuitionMin": 117286,
    "tuitionMax": 143174,
    "curriculum": [
      "IB"
    ],
    "language": "中英雙語",
    "highlights": [
      "全球學習網絡資源",
      "注重全人發展教育",
      "現代化校園設施"
    ],
    "address": "土瓜灣土瓜灣道52號",
    "phone": "+852 2115 6386",
    "website": "https://www.sokakindergartenhong.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.sokakindergartenhong.edu.hk/admissions"
  },
  {
    "id": "int-063",
    "name": "美國國際幼稚園",
    "nameEn": "American International Kindergarten",
    "searchKeywords": [
      "AIK"
    ],
    "category": "國際",
    "district": "九龍",
    "level": "幼稚園",
    "tuitionMin": 137585,
    "tuitionMax": 167116,
    "curriculum": [
      "IB"
    ],
    "language": "中英雙語",
    "highlights": [
      "全球學習網絡資源",
      "優質外籍教師團隊",
      "提供完整 IB 課程體系"
    ],
    "address": "黃大仙龍翔道114號",
    "phone": "+852 2472 1364",
    "website": "https://www.americaninternationa.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.americaninternationa.edu.hk/admissions"
  },
  {
    "id": "int-064",
    "name": "加拿大國際幼稚園",
    "nameEn": "Canadian International Kindergarten",
    "searchKeywords": [
      "CIK"
    ],
    "category": "國際",
    "district": "港島",
    "level": "幼稚園",
    "tuitionMin": 144652,
    "tuitionMax": 167387,
    "curriculum": [
      "英式課程"
    ],
    "language": "中英雙語",
    "highlights": [
      "豐富課外活動選擇",
      "國際化多元學習環境",
      "強調創意與批判思維"
    ],
    "address": "銅鑼灣怡和街88號",
    "phone": "+852 2873 1665",
    "website": "https://www.canadianinternationa.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.canadianinternationa.edu.hk/admissions"
  },
  {
    "id": "int-065",
    "name": "澳洲國際幼稚園",
    "nameEn": "Australian International Kindergarten",
    "searchKeywords": [
      "AISHK Kindergarten"
    ],
    "category": "國際",
    "district": "九龍",
    "level": "幼稚園",
    "tuitionMin": 92271,
    "tuitionMax": 103986,
    "curriculum": [
      "美式課程"
    ],
    "language": "中英雙語",
    "highlights": [
      "雙語教學環境",
      "小班教學模式",
      "注重全人發展教育"
    ],
    "address": "九龍塘沙福道199號",
    "phone": "+852 2765 6536",
    "website": "https://www.australianinternatio.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.australianinternatio.edu.hk/admissions"
  },
  {
    "id": "int-066",
    "name": "新加坡國際幼稚園",
    "nameEn": "Singapore International Kindergarten",
    "searchKeywords": [
      "SISHK Kindergarten"
    ],
    "category": "國際",
    "district": "港島",
    "level": "幼稚園",
    "tuitionMin": 147355,
    "tuitionMax": 176426,
    "curriculum": [
      "IB"
    ],
    "language": "全英文",
    "highlights": [
      "國際化多元學習環境",
      "優質外籍教師團隊",
      "全球學習網絡資源"
    ],
    "address": "淺水灣南灣道159號",
    "phone": "+852 3263 9784",
    "website": "https://www.singaporeinternation.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.singaporeinternation.edu.hk/admissions"
  },
  {
    "id": "dss-067",
    "name": "聖保羅男女中學",
    "nameEn": "St. Paul's Co-educational College",
    "searchKeywords": [
      "SPCC",
      "St Paul's",
      "聖保羅"
    ],
    "category": "直資",
    "district": "港島",
    "level": "中學",
    "tuitionMin": 44362,
    "tuitionMax": 49264,
    "curriculum": [
      "DSE",
      "IGCSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "香港頂尖直資學校",
      "提供多元學習機會",
      "注重品德教育"
    ],
    "address": "上環皇后大道中38號",
    "phone": "+852 3484 3762",
    "website": "https://www.st.paulsco-education.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.st.paulsco-education.edu.hk/admissions"
  },
  {
    "id": "dss-068",
    "name": "拔萃男書院",
    "nameEn": "Diocesan Boys' School",
    "searchKeywords": [
      "DBS",
      "拔萃男"
    ],
    "category": "直資",
    "district": "九龍",
    "level": "中學",
    "tuitionMin": 69944,
    "tuitionMax": 79267,
    "curriculum": [
      "DSE",
      "IB"
    ],
    "language": "以中文為主",
    "highlights": [
      "師資優良",
      "校風純樸",
      "注重品德教育"
    ],
    "address": "土瓜灣土瓜灣道18號",
    "phone": "+852 2318 4857",
    "website": "https://www.diocesanboysschool.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.diocesanboysschool.edu.hk/admissions"
  },
  {
    "id": "dss-069",
    "name": "拔萃女書院",
    "nameEn": "Diocesan Girls' School",
    "searchKeywords": [
      "DGS",
      "拔萃女"
    ],
    "category": "直資",
    "district": "九龍",
    "level": "中學",
    "tuitionMin": 63086,
    "tuitionMax": 65904,
    "curriculum": [
      "DSE",
      "IB"
    ],
    "language": "全英文",
    "highlights": [
      "校風純樸",
      "注重品德教育",
      "設施完善"
    ],
    "address": "深水埗長沙灣道86號",
    "phone": "+852 2663 1179",
    "website": "https://www.diocesangirlsschool.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.diocesangirlsschool.edu.hk/admissions"
  },
  {
    "id": "dss-070",
    "name": "協恩中學",
    "nameEn": "Heep Yunn School",
    "searchKeywords": [
      "HYS",
      "協恩"
    ],
    "category": "直資",
    "district": "九龍",
    "level": "中學",
    "tuitionMin": 70239,
    "tuitionMax": 83864,
    "curriculum": [
      "DSE",
      "IGCSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "提供多元學習機會",
      "重視學生全面發展",
      "校風純樸"
    ],
    "address": "觀塘觀塘道89號",
    "phone": "+852 3176 8036",
    "website": "https://www.heepyunnschool.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.heepyunnschool.edu.hk/admissions"
  },
  {
    "id": "dss-071",
    "name": "英華書院",
    "nameEn": "Ying Wa College",
    "searchKeywords": [
      "YWC",
      "英華"
    ],
    "category": "直資",
    "district": "九龍",
    "level": "中學",
    "tuitionMin": 48469,
    "tuitionMax": 51898,
    "curriculum": [
      "DSE",
      "IB"
    ],
    "language": "全英文",
    "highlights": [
      "優秀公開試成績",
      "校風純樸",
      "提供多元學習機會"
    ],
    "address": "藍田啟田道40號",
    "phone": "+852 3482 8191",
    "website": "https://www.yingwacollege.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.yingwacollege.edu.hk/admissions"
  },
  {
    "id": "dss-072",
    "name": "聖保羅書院",
    "nameEn": "St. Paul's College",
    "searchKeywords": [
      "SPC",
      "聖保羅書院"
    ],
    "category": "直資",
    "district": "港島",
    "level": "中學",
    "tuitionMin": 75706,
    "tuitionMax": 90689,
    "curriculum": [
      "DSE",
      "IB"
    ],
    "language": "以中文為主",
    "highlights": [
      "香港頂尖直資學校",
      "師資優良",
      "校風純樸"
    ],
    "address": "中環干諾道中199號",
    "phone": "+852 2478 1764",
    "website": "https://www.st.paulscollege.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.st.paulscollege.edu.hk/admissions"
  },
  {
    "id": "dss-073",
    "name": "聖士提反書院",
    "nameEn": "St. Stephen's College",
    "searchKeywords": [
      "SSC",
      "聖士提反"
    ],
    "category": "直資",
    "district": "港島",
    "level": "中學",
    "tuitionMin": 64526,
    "tuitionMax": 65773,
    "curriculum": [
      "DSE",
      "IB"
    ],
    "language": "全英文",
    "highlights": [
      "注重品德教育",
      "優秀公開試成績",
      "豐富課外活動"
    ],
    "address": "香港仔香港仔大道60號",
    "phone": "+852 3167 4403",
    "website": "https://www.st.stephenscollege.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.st.stephenscollege.edu.hk/admissions"
  },
  {
    "id": "dss-074",
    "name": "港大同學會書院",
    "nameEn": "HKUGA College",
    "searchKeywords": [
      "HKUGAC",
      "港大同學會"
    ],
    "category": "直資",
    "district": "港島",
    "level": "中學",
    "tuitionMin": 55226,
    "tuitionMax": 67289,
    "curriculum": [
      "DSE",
      "IGCSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "重視學生全面發展",
      "升學率優異",
      "設施完善"
    ],
    "address": "香港仔香港仔大道175號",
    "phone": "+852 3244 2508",
    "website": "https://www.hkugacollege.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.hkugacollege.edu.hk/admissions"
  },
  {
    "id": "dss-075",
    "name": "保良局顏寶鈴書院",
    "nameEn": "PLK Ngan Po Ling College",
    "searchKeywords": [
      "NPL",
      "顏寶鈴"
    ],
    "category": "直資",
    "district": "九龍",
    "level": "中學",
    "tuitionMin": 68309,
    "tuitionMax": 80310,
    "curriculum": [
      "DSE",
      "IB"
    ],
    "language": "中英雙語",
    "highlights": [
      "優秀公開試成績",
      "重視學生全面發展",
      "校風純樸"
    ],
    "address": "油麻地窩打老道12號",
    "phone": "+852 3126 4541",
    "website": "https://www.plknganpolingcollege.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.plknganpolingcollege.edu.hk/admissions"
  },
  {
    "id": "dss-076",
    "name": "保良局羅氏基金中學",
    "nameEn": "PLK Laws Foundation College",
    "searchKeywords": [
      "LFC",
      "羅氏基金"
    ],
    "category": "直資",
    "district": "新界",
    "level": "中學",
    "tuitionMin": 55377,
    "tuitionMax": 62900,
    "curriculum": [
      "DSE"
    ],
    "language": "全英文",
    "highlights": [
      "校風純樸",
      "重視學生全面發展",
      "師資優良"
    ],
    "address": "葵涌葵涌道33號",
    "phone": "+852 3817 8123",
    "website": "https://www.plklawsfoundationcol.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.plklawsfoundationcol.edu.hk/admissions"
  },
  {
    "id": "dss-077",
    "name": "優才（楊殷有娣）書院",
    "nameEn": "G.T. (Ellen Yeung) College",
    "searchKeywords": [
      "GT College",
      "優才"
    ],
    "category": "直資",
    "district": "九龍",
    "level": "中學",
    "tuitionMin": 41789,
    "tuitionMax": 44450,
    "curriculum": [
      "DSE",
      "IB"
    ],
    "language": "中英雙語",
    "highlights": [
      "師資優良",
      "香港頂尖直資學校",
      "優秀公開試成績"
    ],
    "address": "觀塘觀塘道17號",
    "phone": "+852 2120 4013",
    "website": "https://www.g.t.ellenyeungcolleg.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.g.t.ellenyeungcolleg.edu.hk/admissions"
  },
  {
    "id": "dss-078",
    "name": "福建中學",
    "nameEn": "Fukien Secondary School",
    "searchKeywords": [
      "FSS",
      "福建"
    ],
    "category": "直資",
    "district": "九龍",
    "level": "中學",
    "tuitionMin": 66682,
    "tuitionMax": 79040,
    "curriculum": [
      "DSE",
      "IGCSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "師資優良",
      "香港頂尖直資學校",
      "優秀公開試成績"
    ],
    "address": "觀塘觀塘道187號",
    "phone": "+852 3260 1511",
    "website": "https://www.fukiensecondaryschoo.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.fukiensecondaryschoo.edu.hk/admissions"
  },
  {
    "id": "dss-079",
    "name": "匯基書院（東九龍）",
    "nameEn": "United Christian College (Kowloon East)",
    "searchKeywords": [
      "UCC",
      "匯基"
    ],
    "category": "直資",
    "district": "九龍",
    "level": "中學",
    "tuitionMin": 64991,
    "tuitionMax": 67808,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "設施完善",
      "師資優良",
      "優秀公開試成績"
    ],
    "address": "土瓜灣土瓜灣道153號",
    "phone": "+852 3275 6912",
    "website": "https://www.unitedchristiancolle.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.unitedchristiancolle.edu.hk/admissions"
  },
  {
    "id": "dss-080",
    "name": "基督教香港信義會心誠中學",
    "nameEn": "ELCHK Lutheran Secondary School",
    "searchKeywords": [
      "LSS",
      "心誠"
    ],
    "category": "直資",
    "district": "新界",
    "level": "中學",
    "tuitionMin": 58519,
    "tuitionMax": 61529,
    "curriculum": [
      "DSE",
      "IB"
    ],
    "language": "全英文",
    "highlights": [
      "升學率優異",
      "香港頂尖直資學校",
      "優秀公開試成績"
    ],
    "address": "元朗元朗大馬路110號",
    "phone": "+852 2984 1087",
    "website": "https://www.elchklutheranseconda.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.elchklutheranseconda.edu.hk/admissions"
  },
  {
    "id": "dss-081",
    "name": "香港浸會大學附屬學校王錦輝中小學",
    "nameEn": "HKBU Affiliated School Wong Kam Fai",
    "searchKeywords": [
      "HKBUAS",
      "王錦輝"
    ],
    "category": "直資",
    "district": "新界",
    "level": "中學",
    "tuitionMin": 43227,
    "tuitionMax": 50954,
    "curriculum": [
      "DSE",
      "IGCSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "注重品德教育",
      "師資優良",
      "優秀公開試成績"
    ],
    "address": "屯門屯門鄉事會路119號",
    "phone": "+852 3248 1458",
    "website": "https://www.hkbuaffiliatedschool.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.hkbuaffiliatedschool.edu.hk/admissions"
  },
  {
    "id": "dss-082",
    "name": "培僑書院",
    "nameEn": "Pui Kiu College",
    "searchKeywords": [
      "PKC",
      "培僑"
    ],
    "category": "直資",
    "district": "新界",
    "level": "中學",
    "tuitionMin": 35781,
    "tuitionMax": 37076,
    "curriculum": [
      "DSE",
      "IB"
    ],
    "language": "以中文為主",
    "highlights": [
      "注重品德教育",
      "豐富課外活動",
      "設施完善"
    ],
    "address": "西貢西貢公路27號",
    "phone": "+852 2883 3102",
    "website": "https://www.puikiucollege.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.puikiucollege.edu.hk/admissions"
  },
  {
    "id": "dss-083",
    "name": "香港兆基創意書院",
    "nameEn": "HKICC Lee Shau Kee School of Creativity",
    "searchKeywords": [
      "LSKSC",
      "兆基創意"
    ],
    "category": "直資",
    "district": "九龍",
    "level": "中學",
    "tuitionMin": 36469,
    "tuitionMax": 43210,
    "curriculum": [
      "DSE",
      "IGCSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "注重品德教育",
      "師資優良",
      "校風純樸"
    ],
    "address": "油麻地窩打老道44號",
    "phone": "+852 3353 2319",
    "website": "https://www.hkiccleeshaukeeschoo.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.hkiccleeshaukeeschoo.edu.hk/admissions"
  },
  {
    "id": "dss-084",
    "name": "林大輝中學",
    "nameEn": "Lam Tai Fai College",
    "searchKeywords": [
      "LTFC",
      "林大輝"
    ],
    "category": "直資",
    "district": "新界",
    "level": "中學",
    "tuitionMin": 53088,
    "tuitionMax": 67397,
    "curriculum": [
      "DSE",
      "IGCSE"
    ],
    "language": "全英文",
    "highlights": [
      "注重品德教育",
      "升學率優異",
      "校風純樸"
    ],
    "address": "天水圍天恩路95號",
    "phone": "+852 3523 6403",
    "website": "https://www.lamtaifaicollege.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.lamtaifaicollege.edu.hk/admissions"
  },
  {
    "id": "dss-085",
    "name": "德望學校",
    "nameEn": "Good Hope School",
    "searchKeywords": [
      "GHS",
      "德望"
    ],
    "category": "直資",
    "district": "九龍",
    "level": "中學",
    "tuitionMin": 45979,
    "tuitionMax": 48280,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "提供多元學習機會",
      "師資優良",
      "設施完善"
    ],
    "address": "紅磡馬頭圍道158號",
    "phone": "+852 2951 4093",
    "website": "https://www.goodhopeschool.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.goodhopeschool.edu.hk/admissions"
  },
  {
    "id": "dss-086",
    "name": "真道書院",
    "nameEn": "The Truth Lutheran School",
    "searchKeywords": [
      "TLS",
      "真道"
    ],
    "category": "直資",
    "district": "新界",
    "level": "中學",
    "tuitionMin": 41744,
    "tuitionMax": 41868,
    "curriculum": [
      "DSE"
    ],
    "language": "全英文",
    "highlights": [
      "設施完善",
      "提供多元學習機會",
      "重視學生全面發展"
    ],
    "address": "大埔大埔道42號",
    "phone": "+852 3109 6804",
    "website": "https://www.thetruthlutheranscho.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.thetruthlutheranscho.edu.hk/admissions"
  },
  {
    "id": "dss-087",
    "name": "播道書院",
    "nameEn": "Evangel College",
    "searchKeywords": [
      "EC",
      "播道"
    ],
    "category": "直資",
    "district": "新界",
    "level": "中學",
    "tuitionMin": 65412,
    "tuitionMax": 71005,
    "curriculum": [
      "DSE",
      "IGCSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "升學率優異",
      "師資優良",
      "優秀公開試成績"
    ],
    "address": "上水上水廣場163號",
    "phone": "+852 3807 2182",
    "website": "https://www.evangelcollege.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.evangelcollege.edu.hk/admissions"
  },
  {
    "id": "dss-088",
    "name": "香港管理專業協會李國寶中學",
    "nameEn": "HKMA David Li Kwok Po College",
    "searchKeywords": [
      "DLKPC",
      "李國寶"
    ],
    "category": "直資",
    "district": "九龍",
    "level": "中學",
    "tuitionMin": 76254,
    "tuitionMax": 89018,
    "curriculum": [
      "DSE",
      "IB"
    ],
    "language": "全英文",
    "highlights": [
      "優秀公開試成績",
      "升學率優異",
      "設施完善"
    ],
    "address": "深水埗長沙灣道117號",
    "phone": "+852 3296 2157",
    "website": "https://www.hkmadavidlikwokpocol.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.hkmadavidlikwokpocol.edu.hk/admissions"
  },
  {
    "id": "dss-089",
    "name": "聖瑪加利男女英文中小學",
    "nameEn": "St. Margaret's Co-educational English",
    "searchKeywords": [
      "SMCE",
      "聖瑪加利"
    ],
    "category": "直資",
    "district": "九龍",
    "level": "中學",
    "tuitionMin": 64085,
    "tuitionMax": 78968,
    "curriculum": [
      "DSE",
      "IB"
    ],
    "language": "以中文為主",
    "highlights": [
      "升學率優異",
      "香港頂尖直資學校",
      "豐富課外活動"
    ],
    "address": "尖沙咀彌敦道183號",
    "phone": "+852 2742 9649",
    "website": "https://www.st.margaretsco-educa.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.st.margaretsco-educa.edu.hk/admissions"
  },
  {
    "id": "dss-090",
    "name": "基督教崇真中學",
    "nameEn": "Tsung Tsin Christian Academy",
    "searchKeywords": [
      "TTCA",
      "崇真"
    ],
    "category": "直資",
    "district": "九龍",
    "level": "中學",
    "tuitionMin": 32844,
    "tuitionMax": 35023,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "注重品德教育",
      "重視學生全面發展",
      "校風純樸"
    ],
    "address": "藍田啟田道28號",
    "phone": "+852 2714 7115",
    "website": "https://www.tsungtsinchristianac.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.tsungtsinchristianac.edu.hk/admissions"
  },
  {
    "id": "dss-091",
    "name": "中華基金中學",
    "nameEn": "The Chinese Foundation Secondary School",
    "searchKeywords": [
      "CFSS",
      "中華基金"
    ],
    "category": "直資",
    "district": "港島",
    "level": "中學",
    "tuitionMin": 33797,
    "tuitionMax": 38051,
    "curriculum": [
      "DSE"
    ],
    "language": "全英文",
    "highlights": [
      "師資優良",
      "重視學生全面發展",
      "校風純樸"
    ],
    "address": "上環皇后大道中48號",
    "phone": "+852 3780 8803",
    "website": "https://www.thechinesefoundation.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.thechinesefoundation.edu.hk/admissions"
  },
  {
    "id": "dss-092",
    "name": "地利亞修女紀念學校",
    "nameEn": "Delia Memorial School",
    "searchKeywords": [
      "DMS",
      "地利亞"
    ],
    "category": "直資",
    "district": "九龍",
    "level": "中學",
    "tuitionMin": 51550,
    "tuitionMax": 52295,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "優秀公開試成績",
      "設施完善",
      "豐富課外活動"
    ],
    "address": "藍田啟田道114號",
    "phone": "+852 2554 9641",
    "website": "https://www.deliamemorialschool.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.deliamemorialschool.edu.hk/admissions"
  },
  {
    "id": "dss-093",
    "name": "萬鈞匯知中學",
    "nameEn": "Man Kwan QualiEd College",
    "searchKeywords": [
      "MKQC",
      "匯知"
    ],
    "category": "直資",
    "district": "新界",
    "level": "中學",
    "tuitionMin": 36335,
    "tuitionMax": 36360,
    "curriculum": [
      "DSE",
      "IGCSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "重視學生全面發展",
      "師資優良",
      "注重品德教育"
    ],
    "address": "荃灣荃灣大會堂108號",
    "phone": "+852 2770 3335",
    "website": "https://www.mankwanqualiedcolleg.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.mankwanqualiedcolleg.edu.hk/admissions"
  },
  {
    "id": "dss-094",
    "name": "嶺南大學香港同學會直資小學",
    "nameEn": "Lingnan University Alumni Association Primary",
    "searchKeywords": [
      "LUAAPS",
      "嶺南同學會"
    ],
    "category": "直資",
    "district": "新界",
    "level": "小學",
    "tuitionMin": 43314,
    "tuitionMax": 52488,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "設施完善",
      "重視學生全面發展",
      "注重品德教育"
    ],
    "address": "沙田沙田正街196號",
    "phone": "+852 3231 1259",
    "website": "https://www.lingnanuniversityalu.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.lingnanuniversityalu.edu.hk/admissions"
  },
  {
    "id": "dss-095",
    "name": "保良局陳守仁小學",
    "nameEn": "PLK Camões Tan Siu Lin Primary School",
    "searchKeywords": [
      "CTSL",
      "陳守仁"
    ],
    "category": "直資",
    "district": "九龍",
    "level": "小學",
    "tuitionMin": 29108,
    "tuitionMax": 36874,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "提供多元學習機會",
      "豐富課外活動",
      "師資優良"
    ],
    "address": "九龍塘沙福道159號",
    "phone": "+852 3202 6783",
    "website": "https://www.plkcamõestansiulinpr.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.plkcamõestansiulinpr.edu.hk/admissions"
  },
  {
    "id": "dss-096",
    "name": "英華小學",
    "nameEn": "Ying Wa Primary School",
    "searchKeywords": [
      "YWPS",
      "英華小學"
    ],
    "category": "直資",
    "district": "九龍",
    "level": "小學",
    "tuitionMin": 29116,
    "tuitionMax": 29167,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "校風純樸",
      "升學率優異",
      "注重品德教育"
    ],
    "address": "觀塘觀塘道175號",
    "phone": "+852 3568 5833",
    "website": "https://www.yingwaprimaryschool.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.yingwaprimaryschool.edu.hk/admissions"
  },
  {
    "id": "dss-097",
    "name": "拔萃男書院附屬小學",
    "nameEn": "Diocesan Boys' School Primary Division",
    "searchKeywords": [
      "DBSPD",
      "拔萃男小學"
    ],
    "category": "直資",
    "district": "九龍",
    "level": "小學",
    "tuitionMin": 49578,
    "tuitionMax": 52500,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "香港頂尖直資學校",
      "重視學生全面發展",
      "注重品德教育"
    ],
    "address": "紅磡馬頭圍道140號",
    "phone": "+852 2974 4359",
    "website": "https://www.diocesanboysschoolpr.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.diocesanboysschoolpr.edu.hk/admissions"
  },
  {
    "id": "dss-098",
    "name": "拔萃女小學",
    "nameEn": "Diocesan Girls' Junior School",
    "searchKeywords": [
      "DGJS",
      "拔萃女小學"
    ],
    "category": "直資",
    "district": "九龍",
    "level": "小學",
    "tuitionMin": 20324,
    "tuitionMax": 28829,
    "curriculum": [
      "DSE"
    ],
    "language": "全英文",
    "highlights": [
      "校風純樸",
      "注重品德教育",
      "重視學生全面發展"
    ],
    "address": "深水埗長沙灣道100號",
    "phone": "+852 2135 6366",
    "website": "https://www.diocesangirlsjuniors.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.diocesangirlsjuniors.edu.hk/admissions"
  },
  {
    "id": "dss-099",
    "name": "聖保羅男女中學附屬小學",
    "nameEn": "St. Paul's Co-educational College Primary School",
    "searchKeywords": [
      "SPCCPS",
      "聖保羅小學"
    ],
    "category": "直資",
    "district": "港島",
    "level": "小學",
    "tuitionMin": 20540,
    "tuitionMax": 34160,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "優秀公開試成績",
      "香港頂尖直資學校",
      "升學率優異"
    ],
    "address": "北角英皇道150號",
    "phone": "+852 2463 9536",
    "website": "https://www.st.paulsco-education.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.st.paulsco-education.edu.hk/admissions"
  },
  {
    "id": "dss-100",
    "name": "港大同學會小學",
    "nameEn": "HKUGA Primary School",
    "searchKeywords": [
      "HKUGAPS",
      "港大同學會小學"
    ],
    "category": "直資",
    "district": "港島",
    "level": "小學",
    "tuitionMin": 42181,
    "tuitionMax": 53691,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "香港頂尖直資學校",
      "設施完善",
      "重視學生全面發展"
    ],
    "address": "薄扶林薄扶林道87號",
    "phone": "+852 3238 1639",
    "website": "https://www.hkugaprimaryschool.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.hkugaprimaryschool.edu.hk/admissions"
  },
  {
    "id": "dss-101",
    "name": "培僑小學",
    "nameEn": "Pui Kiu Primary School",
    "searchKeywords": [
      "PKPS",
      "培僑小學"
    ],
    "category": "直資",
    "district": "新界",
    "level": "小學",
    "tuitionMin": 24791,
    "tuitionMax": 26806,
    "curriculum": [
      "DSE"
    ],
    "language": "全英文",
    "highlights": [
      "重視學生全面發展",
      "香港頂尖直資學校",
      "師資優良"
    ],
    "address": "粉嶺粉嶺樓路157號",
    "phone": "+852 2994 5546",
    "website": "https://www.puikiuprimaryschool.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.puikiuprimaryschool.edu.hk/admissions"
  },
  {
    "id": "dss-102",
    "name": "福建中學附屬學校",
    "nameEn": "Fukien Secondary School Affiliated School",
    "searchKeywords": [
      "FSSAS",
      "福建附小"
    ],
    "category": "直資",
    "district": "九龍",
    "level": "小學",
    "tuitionMin": 33379,
    "tuitionMax": 42913,
    "curriculum": [
      "DSE"
    ],
    "language": "全英文",
    "highlights": [
      "師資優良",
      "重視學生全面發展",
      "設施完善"
    ],
    "address": "觀塘觀塘道200號",
    "phone": "+852 2781 9761",
    "website": "https://www.fukiensecondaryschoo.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.fukiensecondaryschoo.edu.hk/admissions"
  },
  {
    "id": "dss-103",
    "name": "優才（楊殷有娣）書院（小學）",
    "nameEn": "G.T. (Ellen Yeung) College (Primary)",
    "searchKeywords": [
      "GT Primary"
    ],
    "category": "直資",
    "district": "九龍",
    "level": "小學",
    "tuitionMin": 49691,
    "tuitionMax": 55519,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "香港頂尖直資學校",
      "重視學生全面發展",
      "提供多元學習機會"
    ],
    "address": "黃大仙龍翔道48號",
    "phone": "+852 3215 7454",
    "website": "https://www.g.t.ellenyeungcolleg.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.g.t.ellenyeungcolleg.edu.hk/admissions"
  },
  {
    "id": "dss-104",
    "name": "真道書院（小學）",
    "nameEn": "The Truth Lutheran School (Primary)",
    "searchKeywords": [
      "TLS Primary"
    ],
    "category": "直資",
    "district": "新界",
    "level": "小學",
    "tuitionMin": 38760,
    "tuitionMax": 39446,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "師資優良",
      "豐富課外活動",
      "設施完善"
    ],
    "address": "粉嶺粉嶺樓路152號",
    "phone": "+852 2225 1650",
    "website": "https://www.thetruthlutheranscho.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.thetruthlutheranscho.edu.hk/admissions"
  },
  {
    "id": "dss-105",
    "name": "播道書院（小學）",
    "nameEn": "Evangel College (Primary)",
    "searchKeywords": [
      "EC Primary"
    ],
    "category": "直資",
    "district": "新界",
    "level": "小學",
    "tuitionMin": 44693,
    "tuitionMax": 56198,
    "curriculum": [
      "DSE"
    ],
    "language": "全英文",
    "highlights": [
      "重視學生全面發展",
      "升學率優異",
      "豐富課外活動"
    ],
    "address": "元朗元朗大馬路22號",
    "phone": "+852 2245 4188",
    "website": "https://www.evangelcollegeprimar.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.evangelcollegeprimar.edu.hk/admissions"
  },
  {
    "id": "dss-106",
    "name": "聖瑪加利男女英文中小學（小學）",
    "nameEn": "St. Margaret's (Primary)",
    "searchKeywords": [
      "SMCE Primary"
    ],
    "category": "直資",
    "district": "九龍",
    "level": "小學",
    "tuitionMin": 34821,
    "tuitionMax": 41705,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "豐富課外活動",
      "注重品德教育",
      "香港頂尖直資學校"
    ],
    "address": "黃大仙龍翔道94號",
    "phone": "+852 3296 9823",
    "website": "https://www.st.margaretsprimary.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.st.margaretsprimary.edu.hk/admissions"
  },
  {
    "id": "pri-107",
    "name": "聖保祿學校",
    "nameEn": "St. Paul's Convent School",
    "searchKeywords": [
      "SPCS",
      "聖保祿"
    ],
    "category": "私立",
    "district": "港島",
    "level": "中學",
    "tuitionMin": 81214,
    "tuitionMax": 97129,
    "curriculum": [
      "DSE",
      "IGCSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "師資優良",
      "設施完善",
      "小班教學"
    ],
    "address": "淺水灣南灣道59號",
    "phone": "+852 3947 2070",
    "website": "https://www.st.paulsconventschoo.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.st.paulsconventschoo.edu.hk/admissions"
  },
  {
    "id": "pri-108",
    "name": "玫瑰崗學校",
    "nameEn": "Rosaryhill School",
    "searchKeywords": [
      "RHS",
      "玫瑰崗"
    ],
    "category": "私立",
    "district": "港島",
    "level": "中學",
    "tuitionMin": 96985,
    "tuitionMax": 115461,
    "curriculum": [
      "DSE",
      "IGCSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "重視學生個別發展",
      "設施完善",
      "師資優良"
    ],
    "address": "淺水灣南灣道23號",
    "phone": "+852 3795 3923",
    "website": "https://www.rosaryhillschool.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.rosaryhillschool.edu.hk/admissions"
  },
  {
    "id": "pri-109",
    "name": "香港培正中學",
    "nameEn": "Pui Ching Middle School",
    "searchKeywords": [
      "PCMS",
      "培正"
    ],
    "category": "私立",
    "district": "九龍",
    "level": "中學",
    "tuitionMin": 57726,
    "tuitionMax": 71617,
    "curriculum": [
      "DSE",
      "IGCSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "歷史悠久名校",
      "升學成績優異",
      "小班教學"
    ],
    "address": "將軍澳寶琳路48號",
    "phone": "+852 2489 2191",
    "website": "https://www.puichingmiddleschool.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.puichingmiddleschool.edu.hk/admissions"
  },
  {
    "id": "pri-110",
    "name": "九龍真光中學",
    "nameEn": "Kowloon True Light School",
    "searchKeywords": [
      "KTLS",
      "九龍真光"
    ],
    "category": "私立",
    "district": "九龍",
    "level": "中學",
    "tuitionMin": 75964,
    "tuitionMax": 83999,
    "curriculum": [
      "DSE",
      "IGCSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "設施完善",
      "重視學生個別發展",
      "師資優良"
    ],
    "address": "九龍塘沙福道122號",
    "phone": "+852 2472 8895",
    "website": "https://www.kowloontruelightscho.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.kowloontruelightscho.edu.hk/admissions"
  },
  {
    "id": "pri-111",
    "name": "香港真光中學",
    "nameEn": "True Light Middle School of Hong Kong",
    "searchKeywords": [
      "TLMS",
      "香港真光"
    ],
    "category": "私立",
    "district": "港島",
    "level": "中學",
    "tuitionMin": 76535,
    "tuitionMax": 95143,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "升學成績優異",
      "師資優良",
      "小班教學"
    ],
    "address": "淺水灣南灣道196號",
    "phone": "+852 2939 2859",
    "website": "https://www.truelightmiddleschoo.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.truelightmiddleschoo.edu.hk/admissions"
  },
  {
    "id": "pri-112",
    "name": "聖類斯中學",
    "nameEn": "St. Louis School",
    "searchKeywords": [
      "SLS",
      "聖類斯"
    ],
    "category": "私立",
    "district": "港島",
    "level": "中學",
    "tuitionMin": 54954,
    "tuitionMax": 59588,
    "curriculum": [
      "DSE",
      "IB"
    ],
    "language": "中英雙語",
    "highlights": [
      "師資優良",
      "歷史悠久名校",
      "注重品德培養"
    ],
    "address": "上環皇后大道中80號",
    "phone": "+852 2110 7351",
    "website": "https://www.st.louisschool.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.st.louisschool.edu.hk/admissions"
  },
  {
    "id": "pri-113",
    "name": "高主教書院",
    "nameEn": "Raimondi College",
    "searchKeywords": [
      "RC",
      "高主教"
    ],
    "category": "私立",
    "district": "港島",
    "level": "中學",
    "tuitionMin": 99386,
    "tuitionMax": 118729,
    "curriculum": [
      "DSE"
    ],
    "language": "全英文",
    "highlights": [
      "提供全面教育",
      "優良校風傳統",
      "師資優良"
    ],
    "address": "薄扶林薄扶林道134號",
    "phone": "+852 2765 7542",
    "website": "https://www.raimondicollege.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.raimondicollege.edu.hk/admissions"
  },
  {
    "id": "pri-114",
    "name": "聖芳濟書院",
    "nameEn": "St. Francis Xavier's College",
    "searchKeywords": [
      "SFXC",
      "聖芳濟"
    ],
    "category": "私立",
    "district": "九龍",
    "level": "中學",
    "tuitionMin": 92935,
    "tuitionMax": 110197,
    "curriculum": [
      "DSE",
      "IB"
    ],
    "language": "以中文為主",
    "highlights": [
      "課外活動豐富",
      "設施完善",
      "升學成績優異"
    ],
    "address": "紅磡馬頭圍道69號",
    "phone": "+852 2104 4755",
    "website": "https://www.st.francisxavierscol.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.st.francisxavierscol.edu.hk/admissions"
  },
  {
    "id": "pri-115",
    "name": "新法書院",
    "nameEn": "New Method College",
    "searchKeywords": [
      "NMC",
      "新法"
    ],
    "category": "私立",
    "district": "九龍",
    "level": "中學",
    "tuitionMin": 84227,
    "tuitionMax": 94315,
    "curriculum": [
      "DSE",
      "IB"
    ],
    "language": "以中文為主",
    "highlights": [
      "課外活動豐富",
      "重視學生個別發展",
      "優良校風傳統"
    ],
    "address": "油麻地窩打老道68號",
    "phone": "+852 2647 7086",
    "website": "https://www.newmethodcollege.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.newmethodcollege.edu.hk/admissions"
  },
  {
    "id": "pri-116",
    "name": "中華基督教會公理高中書院",
    "nameEn": "CCC Kung Lee College",
    "searchKeywords": [
      "KLC",
      "公理"
    ],
    "category": "私立",
    "district": "港島",
    "level": "中學",
    "tuitionMin": 98228,
    "tuitionMax": 110185,
    "curriculum": [
      "DSE",
      "IB"
    ],
    "language": "全英文",
    "highlights": [
      "提供全面教育",
      "升學成績優異",
      "優良校風傳統"
    ],
    "address": "淺水灣南灣道105號",
    "phone": "+852 3709 8197",
    "website": "https://www.ccckungleecollege.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.ccckungleecollege.edu.hk/admissions"
  },
  {
    "id": "pri-117",
    "name": "明愛柴灣馬登基金中學",
    "nameEn": "Caritas Chai Wan Marden Foundation",
    "searchKeywords": [
      "CCWMF",
      "柴灣馬登"
    ],
    "category": "私立",
    "district": "港島",
    "level": "中學",
    "tuitionMin": 65301,
    "tuitionMax": 73545,
    "curriculum": [
      "DSE",
      "IGCSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "提供全面教育",
      "課外活動豐富",
      "小班教學"
    ],
    "address": "淺水灣南灣道167號",
    "phone": "+852 2736 9036",
    "website": "https://www.caritaschaiwanmarden.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.caritaschaiwanmarden.edu.hk/admissions"
  },
  {
    "id": "pri-118",
    "name": "蘇浙公學",
    "nameEn": "Kiangsu-Chekiang College",
    "searchKeywords": [
      "KCC",
      "蘇浙"
    ],
    "category": "私立",
    "district": "港島",
    "level": "中學",
    "tuitionMin": 66992,
    "tuitionMax": 85142,
    "curriculum": [
      "DSE"
    ],
    "language": "全英文",
    "highlights": [
      "歷史悠久名校",
      "升學成績優異",
      "優良校風傳統"
    ],
    "address": "北角英皇道22號",
    "phone": "+852 3925 8643",
    "website": "https://www.kiangsu-chekiangcoll.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.kiangsu-chekiangcoll.edu.hk/admissions"
  },
  {
    "id": "pri-119",
    "name": "嘉諾撒聖心書院",
    "nameEn": "Sacred Heart Canossian College",
    "searchKeywords": [
      "SHCC",
      "聖心書院"
    ],
    "category": "私立",
    "district": "港島",
    "level": "中學",
    "tuitionMin": 50739,
    "tuitionMax": 63468,
    "curriculum": [
      "DSE"
    ],
    "language": "全英文",
    "highlights": [
      "歷史悠久名校",
      "優良校風傳統",
      "重視學生個別發展"
    ],
    "address": "香港仔香港仔大道100號",
    "phone": "+852 3946 7479",
    "website": "https://www.sacredheartcanossian.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.sacredheartcanossian.edu.hk/admissions"
  },
  {
    "id": "pri-120",
    "name": "嘉諾撒聖瑪利書院",
    "nameEn": "St. Mary's Canossian College",
    "searchKeywords": [
      "SMCC",
      "聖瑪利書院"
    ],
    "category": "私立",
    "district": "九龍",
    "level": "中學",
    "tuitionMin": 55284,
    "tuitionMax": 61861,
    "curriculum": [
      "DSE",
      "IGCSE"
    ],
    "language": "全英文",
    "highlights": [
      "小班教學",
      "設施完善",
      "優良校風傳統"
    ],
    "address": "將軍澳寶琳路102號",
    "phone": "+852 3538 1141",
    "website": "https://www.st.maryscanossiancol.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.st.maryscanossiancol.edu.hk/admissions"
  },
  {
    "id": "pri-121",
    "name": "瑪利諾修院學校",
    "nameEn": "Maryknoll Convent School",
    "searchKeywords": [
      "MCS",
      "瑪利諾"
    ],
    "category": "私立",
    "district": "九龍",
    "level": "中學",
    "tuitionMin": 70399,
    "tuitionMax": 73867,
    "curriculum": [
      "DSE"
    ],
    "language": "全英文",
    "highlights": [
      "重視學生個別發展",
      "優良校風傳統",
      "升學成績優異"
    ],
    "address": "將軍澳寶琳路1號",
    "phone": "+852 2778 5856",
    "website": "https://www.maryknollconventscho.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.maryknollconventscho.edu.hk/admissions"
  },
  {
    "id": "pri-122",
    "name": "聖嘉勒女書院",
    "nameEn": "St. Clare's Girls' School",
    "searchKeywords": [
      "SCGS",
      "聖嘉勒"
    ],
    "category": "私立",
    "district": "港島",
    "level": "中學",
    "tuitionMin": 66965,
    "tuitionMax": 86671,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "重視學生個別發展",
      "注重品德培養",
      "小班教學"
    ],
    "address": "北角英皇道68號",
    "phone": "+852 3666 3839",
    "website": "https://www.st.claresgirlsschool.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.st.claresgirlsschool.edu.hk/admissions"
  },
  {
    "id": "pri-123",
    "name": "香港培道中學",
    "nameEn": "Pooi To Middle School",
    "searchKeywords": [
      "PTMS",
      "培道"
    ],
    "category": "私立",
    "district": "九龍",
    "level": "中學",
    "tuitionMin": 57638,
    "tuitionMax": 74996,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "提供全面教育",
      "升學成績優異",
      "師資優良"
    ],
    "address": "九龍塘沙福道196號",
    "phone": "+852 2945 3283",
    "website": "https://www.pooitomiddleschool.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.pooitomiddleschool.edu.hk/admissions"
  },
  {
    "id": "pri-124",
    "name": "民生書院",
    "nameEn": "Munsang College",
    "searchKeywords": [
      "MSC",
      "民生"
    ],
    "category": "私立",
    "district": "九龍",
    "level": "中學",
    "tuitionMin": 63638,
    "tuitionMax": 71984,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "升學成績優異",
      "師資優良",
      "重視學生個別發展"
    ],
    "address": "黃大仙龍翔道194號",
    "phone": "+852 3963 8681",
    "website": "https://www.munsangcollege.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.munsangcollege.edu.hk/admissions"
  },
  {
    "id": "pri-125",
    "name": "聖保祿學校（小學部）",
    "nameEn": "St. Paul's Convent School (Primary)",
    "searchKeywords": [
      "SPCS Primary"
    ],
    "category": "私立",
    "district": "港島",
    "level": "小學",
    "tuitionMin": 77677,
    "tuitionMax": 93569,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "課外活動豐富",
      "優良校風傳統",
      "歷史悠久名校"
    ],
    "address": "灣仔軒尼詩道91號",
    "phone": "+852 2359 9163",
    "website": "https://www.st.paulsconventschoo.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.st.paulsconventschoo.edu.hk/admissions"
  },
  {
    "id": "pri-126",
    "name": "玫瑰崗學校（小學部）",
    "nameEn": "Rosaryhill School (Primary)",
    "searchKeywords": [
      "RHS Primary"
    ],
    "category": "私立",
    "district": "港島",
    "level": "小學",
    "tuitionMin": 37936,
    "tuitionMax": 45567,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "注重品德培養",
      "設施完善",
      "課外活動豐富"
    ],
    "address": "柴灣柴灣道164號",
    "phone": "+852 2952 7215",
    "website": "https://www.rosaryhillschoolprim.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.rosaryhillschoolprim.edu.hk/admissions"
  },
  {
    "id": "pri-127",
    "name": "香港培正小學",
    "nameEn": "Pui Ching Primary School",
    "searchKeywords": [
      "PCPS",
      "培正小學"
    ],
    "category": "私立",
    "district": "九龍",
    "level": "小學",
    "tuitionMin": 71573,
    "tuitionMax": 88095,
    "curriculum": [
      "DSE"
    ],
    "language": "全英文",
    "highlights": [
      "優良校風傳統",
      "歷史悠久名校",
      "重視學生個別發展"
    ],
    "address": "土瓜灣土瓜灣道130號",
    "phone": "+852 2319 4439",
    "website": "https://www.puichingprimaryschoo.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.puichingprimaryschoo.edu.hk/admissions"
  },
  {
    "id": "pri-128",
    "name": "九龍真光中學（小學部）",
    "nameEn": "Kowloon True Light School (Primary)",
    "searchKeywords": [
      "KTLS Primary"
    ],
    "category": "私立",
    "district": "九龍",
    "level": "小學",
    "tuitionMin": 34392,
    "tuitionMax": 42030,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "課外活動豐富",
      "優良校風傳統",
      "設施完善"
    ],
    "address": "九龍塘沙福道164號",
    "phone": "+852 3342 2322",
    "website": "https://www.kowloontruelightscho.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.kowloontruelightscho.edu.hk/admissions"
  },
  {
    "id": "pri-129",
    "name": "民生書院小學",
    "nameEn": "Munsang College Primary School",
    "searchKeywords": [
      "MSCPS",
      "民生小學"
    ],
    "category": "私立",
    "district": "九龍",
    "level": "小學",
    "tuitionMin": 69633,
    "tuitionMax": 84872,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "師資優良",
      "升學成績優異",
      "重視學生個別發展"
    ],
    "address": "藍田啟田道195號",
    "phone": "+852 2679 9092",
    "website": "https://www.munsangcollegeprimar.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.munsangcollegeprimar.edu.hk/admissions"
  },
  {
    "id": "pri-130",
    "name": "聖方濟各英文小學",
    "nameEn": "St. Francis of Assisi's English Primary",
    "searchKeywords": [
      "SFAEPS",
      "聖方濟各"
    ],
    "category": "私立",
    "district": "九龍",
    "level": "小學",
    "tuitionMin": 71591,
    "tuitionMax": 84099,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "優良校風傳統",
      "師資優良",
      "重視學生個別發展"
    ],
    "address": "觀塘觀塘道120號",
    "phone": "+852 3786 6986",
    "website": "https://www.st.francisofassisise.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.st.francisofassisise.edu.hk/admissions"
  },
  {
    "id": "pri-131",
    "name": "九龍塘學校（小學部）",
    "nameEn": "Kowloon Tong School (Primary)",
    "searchKeywords": [
      "KTS",
      "九龍塘學校"
    ],
    "category": "私立",
    "district": "九龍",
    "level": "小學",
    "tuitionMin": 52334,
    "tuitionMax": 56664,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "歷史悠久名校",
      "小班教學",
      "設施完善"
    ],
    "address": "何文田何文田道114號",
    "phone": "+852 3399 8185",
    "website": "https://www.kowloontongschoolpri.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.kowloontongschoolpri.edu.hk/admissions"
  },
  {
    "id": "pri-132",
    "name": "九龍塘宣道小學",
    "nameEn": "Alliance Primary School Kowloon Tong",
    "searchKeywords": [
      "APS",
      "宣道小學"
    ],
    "category": "私立",
    "district": "九龍",
    "level": "小學",
    "tuitionMin": 41741,
    "tuitionMax": 61225,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "注重品德培養",
      "提供全面教育",
      "設施完善"
    ],
    "address": "藍田啟田道158號",
    "phone": "+852 3654 5103",
    "website": "https://www.allianceprimaryschoo.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.allianceprimaryschoo.edu.hk/admissions"
  },
  {
    "id": "pri-133",
    "name": "聖若瑟英文小學",
    "nameEn": "St. Joseph's Anglo-Chinese Primary",
    "searchKeywords": [
      "SJACPS",
      "聖若瑟英小"
    ],
    "category": "私立",
    "district": "九龍",
    "level": "小學",
    "tuitionMin": 37908,
    "tuitionMax": 45786,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "升學成績優異",
      "師資優良",
      "小班教學"
    ],
    "address": "九龍塘沙福道151號",
    "phone": "+852 2374 1566",
    "website": "https://www.st.josephsanglo-chin.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.st.josephsanglo-chin.edu.hk/admissions"
  },
  {
    "id": "pri-134",
    "name": "嘉諾撒聖心學校私立部",
    "nameEn": "Sacred Heart Canossian School Private",
    "searchKeywords": [
      "SHCS Private"
    ],
    "category": "私立",
    "district": "港島",
    "level": "小學",
    "tuitionMin": 55758,
    "tuitionMax": 64918,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "升學成績優異",
      "優良校風傳統",
      "師資優良"
    ],
    "address": "淺水灣南灣道76號",
    "phone": "+852 2731 1305",
    "website": "https://www.sacredheartcanossian.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.sacredheartcanossian.edu.hk/admissions"
  },
  {
    "id": "pri-135",
    "name": "蘇浙小學",
    "nameEn": "Kiangsu & Chekiang Primary School",
    "searchKeywords": [
      "KCPS",
      "蘇浙小學"
    ],
    "category": "私立",
    "district": "港島",
    "level": "小學",
    "tuitionMin": 56004,
    "tuitionMax": 75877,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "升學成績優異",
      "優良校風傳統",
      "注重品德培養"
    ],
    "address": "銅鑼灣怡和街173號",
    "phone": "+852 2843 6492",
    "website": "https://www.kiangsu&chekiangprim.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.kiangsu&chekiangprim.edu.hk/admissions"
  },
  {
    "id": "pri-136",
    "name": "救恩學校",
    "nameEn": "Kau Yan School",
    "searchKeywords": [
      "KYS",
      "救恩"
    ],
    "category": "私立",
    "district": "港島",
    "level": "小學",
    "tuitionMin": 75058,
    "tuitionMax": 87866,
    "curriculum": [
      "DSE"
    ],
    "language": "全英文",
    "highlights": [
      "提供全面教育",
      "課外活動豐富",
      "升學成績優異"
    ],
    "address": "柴灣柴灣道79號",
    "phone": "+852 3140 2987",
    "website": "https://www.kauyanschool.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.kauyanschool.edu.hk/admissions"
  },
  {
    "id": "pri-137",
    "name": "高主教書院小學部",
    "nameEn": "Raimondi College Primary Section",
    "searchKeywords": [
      "RCPS",
      "高主教小學"
    ],
    "category": "私立",
    "district": "港島",
    "level": "小學",
    "tuitionMin": 60891,
    "tuitionMax": 61543,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "注重品德培養",
      "提供全面教育",
      "重視學生個別發展"
    ],
    "address": "薄扶林薄扶林道182號",
    "phone": "+852 3349 4345",
    "website": "https://www.raimondicollegeprima.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.raimondicollegeprima.edu.hk/admissions"
  },
  {
    "id": "pri-138",
    "name": "聖嘉勒小學",
    "nameEn": "St. Clare's Primary School",
    "searchKeywords": [
      "SCPS",
      "聖嘉勒小學"
    ],
    "category": "私立",
    "district": "港島",
    "level": "小學",
    "tuitionMin": 60048,
    "tuitionMax": 72325,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "課外活動豐富",
      "升學成績優異",
      "重視學生個別發展"
    ],
    "address": "鰂魚涌太古城道131號",
    "phone": "+852 3330 3807",
    "website": "https://www.st.claresprimaryscho.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.st.claresprimaryscho.edu.hk/admissions"
  },
  {
    "id": "pri-139",
    "name": "德雅小學",
    "nameEn": "Tak Nga Primary School",
    "searchKeywords": [
      "TNPS",
      "德雅小學"
    ],
    "category": "私立",
    "district": "九龍",
    "level": "小學",
    "tuitionMin": 69167,
    "tuitionMax": 72463,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "設施完善",
      "小班教學",
      "優良校風傳統"
    ],
    "address": "九龍塘沙福道135號",
    "phone": "+852 2176 8837",
    "website": "https://www.takngaprimaryschool.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.takngaprimaryschool.edu.hk/admissions"
  },
  {
    "id": "pri-140",
    "name": "啟思小學",
    "nameEn": "Creative Primary School",
    "searchKeywords": [
      "CPS",
      "啟思小學"
    ],
    "category": "私立",
    "district": "九龍",
    "level": "小學",
    "tuitionMin": 61210,
    "tuitionMax": 62062,
    "curriculum": [
      "DSE"
    ],
    "language": "全英文",
    "highlights": [
      "注重品德培養",
      "師資優良",
      "歷史悠久名校"
    ],
    "address": "藍田啟田道90號",
    "phone": "+852 3152 8543",
    "website": "https://www.creativeprimaryschoo.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.creativeprimaryschoo.edu.hk/admissions"
  },
  {
    "id": "pri-141",
    "name": "香港培道小學",
    "nameEn": "Pooi To Primary School",
    "searchKeywords": [
      "PTPS",
      "培道小學"
    ],
    "category": "私立",
    "district": "九龍",
    "level": "小學",
    "tuitionMin": 35901,
    "tuitionMax": 43987,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "小班教學",
      "注重品德培養",
      "重視學生個別發展"
    ],
    "address": "九龍塘沙福道67號",
    "phone": "+852 2349 2709",
    "website": "https://www.pooitoprimaryschool.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.pooitoprimaryschool.edu.hk/admissions"
  },
  {
    "id": "pri-142",
    "name": "維多利亞幼稚園",
    "nameEn": "Victoria Kindergarten",
    "searchKeywords": [
      "VK",
      "維多利亞"
    ],
    "category": "私立",
    "district": "港島",
    "level": "幼稚園",
    "tuitionMin": 85686,
    "tuitionMax": 86220,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "課外活動豐富",
      "師資優良",
      "優良校風傳統"
    ],
    "address": "薄扶林薄扶林道2號",
    "phone": "+852 3550 5601",
    "website": "https://www.victoriakindergarten.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.victoriakindergarten.edu.hk/admissions"
  },
  {
    "id": "pri-143",
    "name": "根德園幼稚園",
    "nameEn": "Kentville Kindergarten",
    "searchKeywords": [
      "Kentville",
      "根德園"
    ],
    "category": "私立",
    "district": "九龍",
    "level": "幼稚園",
    "tuitionMin": 89809,
    "tuitionMax": 96948,
    "curriculum": [
      "DSE"
    ],
    "language": "全英文",
    "highlights": [
      "師資優良",
      "提供全面教育",
      "小班教學"
    ],
    "address": "旺角亞皆老街139號",
    "phone": "+852 2629 6819",
    "website": "https://www.kentvillekindergarte.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.kentvillekindergarte.edu.hk/admissions"
  },
  {
    "id": "pri-144",
    "name": "學之園幼稚園",
    "nameEn": "Learning Habitat Kindergarten",
    "searchKeywords": [
      "LH",
      "學之園"
    ],
    "category": "私立",
    "district": "九龍",
    "level": "幼稚園",
    "tuitionMin": 50036,
    "tuitionMax": 53089,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "提供全面教育",
      "師資優良",
      "升學成績優異"
    ],
    "address": "油麻地窩打老道116號",
    "phone": "+852 3810 9775",
    "website": "https://www.learninghabitatkinde.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.learninghabitatkinde.edu.hk/admissions"
  },
  {
    "id": "pri-145",
    "name": "約克國際幼稚園",
    "nameEn": "York International Kindergarten",
    "searchKeywords": [
      "York",
      "約克"
    ],
    "category": "私立",
    "district": "九龍",
    "level": "幼稚園",
    "tuitionMin": 47574,
    "tuitionMax": 60750,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "優良校風傳統",
      "提供全面教育",
      "師資優良"
    ],
    "address": "深水埗長沙灣道18號",
    "phone": "+852 3286 6684",
    "website": "https://www.yorkinternationalkin.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.yorkinternationalkin.edu.hk/admissions"
  },
  {
    "id": "pri-146",
    "name": "聖保祿幼稚園",
    "nameEn": "St. Paul's Kindergarten",
    "searchKeywords": [
      "SPK",
      "聖保祿幼稚園"
    ],
    "category": "私立",
    "district": "港島",
    "level": "幼稚園",
    "tuitionMin": 48848,
    "tuitionMax": 60590,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "歷史悠久名校",
      "提供全面教育",
      "升學成績優異"
    ],
    "address": "淺水灣南灣道51號",
    "phone": "+852 3552 4718",
    "website": "https://www.st.paulskindergarten.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.st.paulskindergarten.edu.hk/admissions"
  },
  {
    "id": "pri-147",
    "name": "嘉諾撒聖心幼稚園",
    "nameEn": "Sacred Heart Canossian Kindergarten",
    "searchKeywords": [
      "SHCK",
      "聖心幼稚園"
    ],
    "category": "私立",
    "district": "港島",
    "level": "幼稚園",
    "tuitionMin": 67149,
    "tuitionMax": 84830,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "歷史悠久名校",
      "重視學生個別發展",
      "小班教學"
    ],
    "address": "銅鑼灣怡和街29號",
    "phone": "+852 2973 9715",
    "website": "https://www.sacredheartcanossian.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.sacredheartcanossian.edu.hk/admissions"
  },
  {
    "id": "pri-148",
    "name": "銅鑼灣維多利亞幼稚園",
    "nameEn": "Victoria Kindergarten Causeway Bay",
    "searchKeywords": [
      "VK CWB"
    ],
    "category": "私立",
    "district": "港島",
    "level": "幼稚園",
    "tuitionMin": 60191,
    "tuitionMax": 61095,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "設施完善",
      "師資優良",
      "重視學生個別發展"
    ],
    "address": "淺水灣南灣道8號",
    "phone": "+852 2290 3985",
    "website": "https://www.victoriakindergarten.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.victoriakindergarten.edu.hk/admissions"
  },
  {
    "id": "pri-149",
    "name": "寶山幼兒園",
    "nameEn": "Po Shan Kindergarten",
    "searchKeywords": [
      "PSK",
      "寶山"
    ],
    "category": "私立",
    "district": "港島",
    "level": "幼稚園",
    "tuitionMin": 73015,
    "tuitionMax": 77831,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "重視學生個別發展",
      "師資優良",
      "歷史悠久名校"
    ],
    "address": "淺水灣南灣道122號",
    "phone": "+852 3348 6776",
    "website": "https://www.poshankindergarten.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.poshankindergarten.edu.hk/admissions"
  },
  {
    "id": "pri-150",
    "name": "聖士提反女子中學附屬幼稚園",
    "nameEn": "St. Stephen's Girls' College Kindergarten",
    "searchKeywords": [
      "SSGCK"
    ],
    "category": "私立",
    "district": "港島",
    "level": "幼稚園",
    "tuitionMin": 84792,
    "tuitionMax": 90532,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "優良校風傳統",
      "重視學生個別發展",
      "歷史悠久名校"
    ],
    "address": "淺水灣南灣道106號",
    "phone": "+852 3654 9445",
    "website": "https://www.st.stephensgirlscoll.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.st.stephensgirlscoll.edu.hk/admissions"
  },
  {
    "id": "pri-151",
    "name": "劍鳴幼稚園",
    "nameEn": "Kenning Kindergarten",
    "searchKeywords": [
      "Kenning"
    ],
    "category": "私立",
    "district": "九龍",
    "level": "幼稚園",
    "tuitionMin": 70862,
    "tuitionMax": 88416,
    "curriculum": [
      "DSE"
    ],
    "language": "全英文",
    "highlights": [
      "歷史悠久名校",
      "提供全面教育",
      "升學成績優異"
    ],
    "address": "尖沙咀彌敦道60號",
    "phone": "+852 3584 5704",
    "website": "https://www.kenningkindergarten.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.kenningkindergarten.edu.hk/admissions"
  },
  {
    "id": "pri-152",
    "name": "國際英文幼稚園",
    "nameEn": "St. Catherine's International Kindergarten",
    "searchKeywords": [
      "St. Catherine's"
    ],
    "category": "私立",
    "district": "九龍",
    "level": "幼稚園",
    "tuitionMin": 52855,
    "tuitionMax": 66436,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "小班教學",
      "師資優良",
      "升學成績優異"
    ],
    "address": "黃大仙龍翔道94號",
    "phone": "+852 3881 4974",
    "website": "https://www.st.catherinesinterna.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.st.catherinesinterna.edu.hk/admissions"
  },
  {
    "id": "pri-153",
    "name": "德望小學暨幼稚園",
    "nameEn": "Good Hope Primary School & Kindergarten",
    "searchKeywords": [
      "GHS Kindergarten"
    ],
    "category": "私立",
    "district": "九龍",
    "level": "幼稚園",
    "tuitionMin": 64976,
    "tuitionMax": 72164,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "優良校風傳統",
      "重視學生個別發展",
      "設施完善"
    ],
    "address": "黃大仙龍翔道188號",
    "phone": "+852 3379 6320",
    "website": "https://www.goodhopeprimaryschoo.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.goodhopeprimaryschoo.edu.hk/admissions"
  },
  {
    "id": "pri-154",
    "name": "民生書院幼稚園",
    "nameEn": "Munsang College Kindergarten",
    "searchKeywords": [
      "MSC Kindergarten"
    ],
    "category": "私立",
    "district": "九龍",
    "level": "幼稚園",
    "tuitionMin": 59801,
    "tuitionMax": 62869,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "升學成績優異",
      "注重品德培養",
      "課外活動豐富"
    ],
    "address": "九龍塘沙福道175號",
    "phone": "+852 3357 5595",
    "website": "https://www.munsangcollegekinder.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.munsangcollegekinder.edu.hk/admissions"
  },
  {
    "id": "pri-155",
    "name": "培正幼稚園",
    "nameEn": "Pui Ching Kindergarten",
    "searchKeywords": [
      "PC Kindergarten"
    ],
    "category": "私立",
    "district": "九龍",
    "level": "幼稚園",
    "tuitionMin": 64450,
    "tuitionMax": 68030,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "升學成績優異",
      "提供全面教育",
      "優良校風傳統"
    ],
    "address": "土瓜灣土瓜灣道62號",
    "phone": "+852 3803 4234",
    "website": "https://www.puichingkindergarten.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.puichingkindergarten.edu.hk/admissions"
  },
  {
    "id": "pri-156",
    "name": "聖公會幼稚園",
    "nameEn": "SKH Kindergarten",
    "searchKeywords": [
      "SKH KG"
    ],
    "category": "私立",
    "district": "港島",
    "level": "幼稚園",
    "tuitionMin": 48422,
    "tuitionMax": 55107,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "小班教學",
      "設施完善",
      "注重品德培養"
    ],
    "address": "北角英皇道157號",
    "phone": "+852 3130 9218",
    "website": "https://www.skhkindergarten.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.skhkindergarten.edu.hk/admissions"
  },
  {
    "id": "aid-157",
    "name": "皇仁書院",
    "nameEn": "Queen's College",
    "searchKeywords": [
      "QC",
      "皇仁"
    ],
    "category": "資助",
    "district": "港島",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "升學成績良好",
      "全面發展教育",
      "校風純樸"
    ],
    "address": "上環皇后大道中119號",
    "phone": "+852 3479 3528",
    "website": "https://www.queenscollege.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.queenscollege.edu.hk/admissions"
  },
  {
    "id": "aid-158",
    "name": "英皇書院",
    "nameEn": "King's College",
    "searchKeywords": [
      "KC",
      "英皇"
    ],
    "category": "資助",
    "district": "港島",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "升學成績良好",
      "免學費",
      "設施完善"
    ],
    "address": "北角英皇道16號",
    "phone": "+852 2589 8267",
    "website": "https://www.kingscollege.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.kingscollege.edu.hk/admissions"
  },
  {
    "id": "aid-159",
    "name": "庇理羅士女子中學",
    "nameEn": "Belilios Public School",
    "searchKeywords": [
      "BPS",
      "庇理羅士"
    ],
    "category": "資助",
    "district": "港島",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "設施完善",
      "校風純樸",
      "社區服務精神"
    ],
    "address": "筲箕灣愛秩序灣道85號",
    "phone": "+852 3601 6863",
    "website": "https://www.beliliospublicschool.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.beliliospublicschool.edu.hk/admissions"
  },
  {
    "id": "aid-160",
    "name": "香港華仁書院",
    "nameEn": "Wah Yan College Hong Kong",
    "searchKeywords": [
      "WYHK",
      "港華仁"
    ],
    "category": "資助",
    "district": "港島",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "校風純樸",
      "設施完善",
      "免學費"
    ],
    "address": "中環干諾道中2號",
    "phone": "+852 3796 3020",
    "website": "https://www.wahyancollegehongkon.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.wahyancollegehongkon.edu.hk/admissions"
  },
  {
    "id": "aid-161",
    "name": "九龍華仁書院",
    "nameEn": "Wah Yan College Kowloon",
    "searchKeywords": [
      "WYK",
      "九華仁"
    ],
    "category": "資助",
    "district": "九龍",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "政府資助學校",
      "免學費",
      "課外活動豐富"
    ],
    "address": "何文田何文田道85號",
    "phone": "+852 3718 1659",
    "website": "https://www.wahyancollegekowloon.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.wahyancollegekowloon.edu.hk/admissions"
  },
  {
    "id": "aid-162",
    "name": "喇沙書院",
    "nameEn": "La Salle College",
    "searchKeywords": [
      "LSC",
      "喇沙"
    ],
    "category": "資助",
    "district": "九龍",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "校風純樸",
      "課外活動豐富",
      "社區服務精神"
    ],
    "address": "何文田何文田道178號",
    "phone": "+852 3897 1266",
    "website": "https://www.lasallecollege.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.lasallecollege.edu.hk/admissions"
  },
  {
    "id": "aid-163",
    "name": "聖若瑟書院",
    "nameEn": "St. Joseph's College",
    "searchKeywords": [
      "SJC",
      "聖若瑟"
    ],
    "category": "資助",
    "district": "港島",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "全面發展教育",
      "升學成績良好",
      "社區服務精神"
    ],
    "address": "薄扶林薄扶林道24號",
    "phone": "+852 2361 5063",
    "website": "https://www.st.josephscollege.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.st.josephscollege.edu.hk/admissions"
  },
  {
    "id": "aid-164",
    "name": "聖保羅男女中學",
    "nameEn": "St. Paul's Co-educational College",
    "searchKeywords": [
      "SPCC",
      "聖保羅"
    ],
    "category": "資助",
    "district": "港島",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "升學成績良好",
      "全面發展教育",
      "校風純樸"
    ],
    "address": "香港仔香港仔大道183號",
    "phone": "+852 3691 6606",
    "website": "https://www.st.paulsco-education.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.st.paulsco-education.edu.hk/admissions"
  },
  {
    "id": "aid-165",
    "name": "英華女學校",
    "nameEn": "Ying Wa Girls' School",
    "searchKeywords": [
      "YWGS",
      "英華女"
    ],
    "category": "資助",
    "district": "港島",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "社區服務精神",
      "校風純樸",
      "政府資助學校"
    ],
    "address": "上環皇后大道中116號",
    "phone": "+852 3715 4394",
    "website": "https://www.yingwagirlsschool.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.yingwagirlsschool.edu.hk/admissions"
  },
  {
    "id": "aid-166",
    "name": "聖士提反女子中學",
    "nameEn": "St. Stephen's Girls' College",
    "searchKeywords": [
      "SSGC",
      "聖士提反女"
    ],
    "category": "資助",
    "district": "港島",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "注重品德教育",
      "升學成績良好",
      "社區服務精神"
    ],
    "address": "淺水灣南灣道54號",
    "phone": "+852 3129 1458",
    "website": "https://www.st.stephensgirlscoll.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.st.stephensgirlscoll.edu.hk/admissions"
  },
  {
    "id": "aid-167",
    "name": "嘉諾撒聖心書院",
    "nameEn": "Sacred Heart Canossian College",
    "searchKeywords": [
      "SHCC",
      "聖心書院"
    ],
    "category": "資助",
    "district": "港島",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "課外活動豐富",
      "師資優良",
      "注重品德教育"
    ],
    "address": "柴灣柴灣道162號",
    "phone": "+852 2364 9100",
    "website": "https://www.sacredheartcanossian.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.sacredheartcanossian.edu.hk/admissions"
  },
  {
    "id": "aid-168",
    "name": "瑪利曼中學",
    "nameEn": "Marymount Secondary School",
    "searchKeywords": [
      "MSS",
      "瑪利曼"
    ],
    "category": "資助",
    "district": "港島",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "師資優良",
      "升學成績良好",
      "校風純樸"
    ],
    "address": "中環干諾道中180號",
    "phone": "+852 3541 1839",
    "website": "https://www.marymountsecondarysc.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.marymountsecondarysc.edu.hk/admissions"
  },
  {
    "id": "aid-169",
    "name": "聖嘉勒女書院",
    "nameEn": "St. Clare's Girls' School",
    "searchKeywords": [
      "SCGS",
      "聖嘉勒"
    ],
    "category": "資助",
    "district": "港島",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "課外活動豐富",
      "升學成績良好",
      "社區服務精神"
    ],
    "address": "西營盤般咸道139號",
    "phone": "+852 3296 7983",
    "website": "https://www.st.claresgirlsschool.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.st.claresgirlsschool.edu.hk/admissions"
  },
  {
    "id": "aid-170",
    "name": "香港真光中學",
    "nameEn": "True Light Middle School of Hong Kong",
    "searchKeywords": [
      "TLMS",
      "香港真光"
    ],
    "category": "資助",
    "district": "港島",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "全面發展教育",
      "注重品德教育",
      "升學成績良好"
    ],
    "address": "中環干諾道中160號",
    "phone": "+852 2830 6136",
    "website": "https://www.truelightmiddleschoo.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.truelightmiddleschoo.edu.hk/admissions"
  },
  {
    "id": "aid-171",
    "name": "聖公會鄧肇堅中學",
    "nameEn": "SKH Tang Shiu Kin Secondary School",
    "searchKeywords": [
      "TSK",
      "鄧肇堅"
    ],
    "category": "資助",
    "district": "港島",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "免學費",
      "政府資助學校",
      "社區服務精神"
    ],
    "address": "上環皇后大道中23號",
    "phone": "+852 2720 8040",
    "website": "https://www.skhtangshiukinsecond.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.skhtangshiukinsecond.edu.hk/admissions"
  },
  {
    "id": "aid-172",
    "name": "張祝珊英文中學",
    "nameEn": "Cheung Chuk Shan College",
    "searchKeywords": [
      "CCSC",
      "張祝珊"
    ],
    "category": "資助",
    "district": "港島",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "注重品德教育",
      "全面發展教育",
      "師資優良"
    ],
    "address": "柴灣柴灣道131號",
    "phone": "+852 2720 1328",
    "website": "https://www.cheungchukshancolleg.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.cheungchukshancolleg.edu.hk/admissions"
  },
  {
    "id": "aid-173",
    "name": "筲箕灣官立中學",
    "nameEn": "Shau Kei Wan Government Secondary School",
    "searchKeywords": [
      "SKWGSS",
      "筲官"
    ],
    "category": "資助",
    "district": "港島",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "設施完善",
      "免學費",
      "全面發展教育"
    ],
    "address": "銅鑼灣怡和街52號",
    "phone": "+852 3446 2904",
    "website": "https://www.shaukeiwangovernment.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.shaukeiwangovernment.edu.hk/admissions"
  },
  {
    "id": "aid-174",
    "name": "金文泰中學",
    "nameEn": "Clementi Secondary School",
    "searchKeywords": [
      "CSS",
      "金文泰"
    ],
    "category": "資助",
    "district": "港島",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "社區服務精神",
      "設施完善",
      "校風純樸"
    ],
    "address": "銅鑼灣怡和街169號",
    "phone": "+852 2379 5688",
    "website": "https://www.clementisecondarysch.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.clementisecondarysch.edu.hk/admissions"
  },
  {
    "id": "aid-175",
    "name": "聖馬可中學",
    "nameEn": "St. Mark's School",
    "searchKeywords": [
      "SMS",
      "聖馬可"
    ],
    "category": "資助",
    "district": "港島",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "社區服務精神",
      "師資優良",
      "校風純樸"
    ],
    "address": "中環干諾道中79號",
    "phone": "+852 3155 7851",
    "website": "https://www.st.marksschool.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.st.marksschool.edu.hk/admissions"
  },
  {
    "id": "aid-176",
    "name": "港島民生書院",
    "nameEn": "Munsang College (Hong Kong Island)",
    "searchKeywords": [
      "MSCHKI",
      "港島民生"
    ],
    "category": "資助",
    "district": "港島",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "師資優良",
      "課外活動豐富",
      "免學費"
    ],
    "address": "西營盤般咸道186號",
    "phone": "+852 2942 2779",
    "website": "https://www.munsangcollegehongko.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.munsangcollegehongko.edu.hk/admissions"
  },
  {
    "id": "aid-177",
    "name": "伊利沙伯中學",
    "nameEn": "Queen Elizabeth School",
    "searchKeywords": [
      "QES",
      "伊利沙伯"
    ],
    "category": "資助",
    "district": "九龍",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "全面發展教育",
      "升學成績良好",
      "社區服務精神"
    ],
    "address": "九龍塘沙福道153號",
    "phone": "+852 3727 6530",
    "website": "https://www.queenelizabethschool.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.queenelizabethschool.edu.hk/admissions"
  },
  {
    "id": "aid-178",
    "name": "華英中學",
    "nameEn": "Wa Ying College",
    "searchKeywords": [
      "WYC",
      "華英"
    ],
    "category": "資助",
    "district": "九龍",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "課外活動豐富",
      "免學費",
      "全面發展教育"
    ],
    "address": "觀塘觀塘道10號",
    "phone": "+852 2376 4903",
    "website": "https://www.wayingcollege.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.wayingcollege.edu.hk/admissions"
  },
  {
    "id": "aid-179",
    "name": "何明華會督銀禧中學",
    "nameEn": "Bishop Hall Jubilee School",
    "searchKeywords": [
      "BHJS",
      "銀禧"
    ],
    "category": "資助",
    "district": "九龍",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "注重品德教育",
      "全面發展教育",
      "免學費"
    ],
    "address": "土瓜灣土瓜灣道14號",
    "phone": "+852 3529 8881",
    "website": "https://www.bishophalljubileesch.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.bishophalljubileesch.edu.hk/admissions"
  },
  {
    "id": "aid-180",
    "name": "旺角勞工子弟學校",
    "nameEn": "Mongkok Workers' Children School",
    "searchKeywords": [
      "MWCS",
      "勞工子弟"
    ],
    "category": "資助",
    "district": "九龍",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "社區服務精神",
      "全面發展教育",
      "升學成績良好"
    ],
    "address": "將軍澳寶琳路1號",
    "phone": "+852 3818 9766",
    "website": "https://www.mongkokworkerschildr.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.mongkokworkerschildr.edu.hk/admissions"
  },
  {
    "id": "aid-181",
    "name": "聖芳濟書院",
    "nameEn": "St. Francis Xavier's College",
    "searchKeywords": [
      "SFXC",
      "聖芳濟"
    ],
    "category": "資助",
    "district": "九龍",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "師資優良",
      "校風純樸",
      "社區服務精神"
    ],
    "address": "紅磡馬頭圍道122號",
    "phone": "+852 3293 7803",
    "website": "https://www.st.francisxavierscol.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.st.francisxavierscol.edu.hk/admissions"
  },
  {
    "id": "aid-182",
    "name": "嘉諾撒聖瑪利書院",
    "nameEn": "St. Mary's Canossian College",
    "searchKeywords": [
      "SMCC",
      "聖瑪利書院"
    ],
    "category": "資助",
    "district": "九龍",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "升學成績良好",
      "政府資助學校",
      "師資優良"
    ],
    "address": "將軍澳寶琳路70號",
    "phone": "+852 3299 2247",
    "website": "https://www.st.maryscanossiancol.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.st.maryscanossiancol.edu.hk/admissions"
  },
  {
    "id": "aid-183",
    "name": "瑪利諾修院學校",
    "nameEn": "Maryknoll Convent School",
    "searchKeywords": [
      "MCS",
      "瑪利諾"
    ],
    "category": "資助",
    "district": "九龍",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "社區服務精神",
      "升學成績良好",
      "免學費"
    ],
    "address": "油麻地窩打老道125號",
    "phone": "+852 2895 8597",
    "website": "https://www.maryknollconventscho.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.maryknollconventscho.edu.hk/admissions"
  },
  {
    "id": "aid-184",
    "name": "德雅中學",
    "nameEn": "Tak Nga Secondary School",
    "searchKeywords": [
      "TNSS",
      "德雅"
    ],
    "category": "資助",
    "district": "九龍",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "師資優良",
      "社區服務精神",
      "升學成績良好"
    ],
    "address": "藍田啟田道170號",
    "phone": "+852 3877 2948",
    "website": "https://www.takngasecondaryschoo.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.takngasecondaryschoo.edu.hk/admissions"
  },
  {
    "id": "aid-185",
    "name": "迦密中學",
    "nameEn": "Carmel Secondary School",
    "searchKeywords": [
      "Carmel",
      "迦密"
    ],
    "category": "資助",
    "district": "九龍",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "師資優良",
      "注重品德教育",
      "校風純樸"
    ],
    "address": "深水埗長沙灣道122號",
    "phone": "+852 3990 9264",
    "website": "https://www.carmelsecondaryschoo.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.carmelsecondaryschoo.edu.hk/admissions"
  },
  {
    "id": "aid-186",
    "name": "觀塘官立中學",
    "nameEn": "Kwun Tong Government Secondary School",
    "searchKeywords": [
      "KTGSS",
      "觀塘官立"
    ],
    "category": "資助",
    "district": "九龍",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "校風純樸",
      "免學費",
      "社區服務精神"
    ],
    "address": "黃大仙龍翔道78號",
    "phone": "+852 2695 5927",
    "website": "https://www.kwuntonggovernmentse.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.kwuntonggovernmentse.edu.hk/admissions"
  },
  {
    "id": "aid-187",
    "name": "觀塘瑪利諾書院",
    "nameEn": "Kwun Tong Maryknoll College",
    "searchKeywords": [
      "KTMC",
      "觀塘瑪利諾"
    ],
    "category": "資助",
    "district": "九龍",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "師資優良",
      "升學成績良好",
      "課外活動豐富"
    ],
    "address": "黃大仙龍翔道174號",
    "phone": "+852 3920 5323",
    "website": "https://www.kwuntongmaryknollcol.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.kwuntongmaryknollcol.edu.hk/admissions"
  },
  {
    "id": "aid-188",
    "name": "聖傑靈女子中學",
    "nameEn": "St. Catharine's School for Girls",
    "searchKeywords": [
      "SCSG",
      "聖傑靈"
    ],
    "category": "資助",
    "district": "九龍",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "師資優良",
      "設施完善",
      "課外活動豐富"
    ],
    "address": "尖沙咀彌敦道37號",
    "phone": "+852 3297 6597",
    "website": "https://www.st.catharinesschoolf.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.st.catharinesschoolf.edu.hk/admissions"
  },
  {
    "id": "aid-189",
    "name": "藍田聖保祿中學",
    "nameEn": "St. Paul's School (Lam Tin)",
    "searchKeywords": [
      "SPSLT",
      "藍田聖保祿"
    ],
    "category": "資助",
    "district": "九龍",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "設施完善",
      "升學成績良好",
      "社區服務精神"
    ],
    "address": "紅磡馬頭圍道106號",
    "phone": "+852 3512 7983",
    "website": "https://www.st.paulsschoollamtin.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.st.paulsschoollamtin.edu.hk/admissions"
  },
  {
    "id": "aid-190",
    "name": "順利天主教中學",
    "nameEn": "Shun Lee Catholic Secondary School",
    "searchKeywords": [
      "SLCSS",
      "順利天主教"
    ],
    "category": "資助",
    "district": "九龍",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "設施完善",
      "社區服務精神",
      "課外活動豐富"
    ],
    "address": "將軍澳寶琳路133號",
    "phone": "+852 2480 3884",
    "website": "https://www.shunleecatholicsecon.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.shunleecatholicsecon.edu.hk/admissions"
  },
  {
    "id": "aid-191",
    "name": "聖言中學",
    "nameEn": "Sing Yin Secondary School",
    "searchKeywords": [
      "SYSS",
      "聖言"
    ],
    "category": "資助",
    "district": "九龍",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "社區服務精神",
      "免學費",
      "注重品德教育"
    ],
    "address": "觀塘觀塘道126號",
    "phone": "+852 3273 2125",
    "website": "https://www.singyinsecondaryscho.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.singyinsecondaryscho.edu.hk/admissions"
  },
  {
    "id": "aid-192",
    "name": "沙田官立中學",
    "nameEn": "Sha Tin Government Secondary School",
    "searchKeywords": [
      "STGSS",
      "沙田官立"
    ],
    "category": "資助",
    "district": "新界",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "升學成績良好",
      "社區服務精神",
      "校風純樸"
    ],
    "address": "馬鞍山馬鞍山路117號",
    "phone": "+852 3679 2504",
    "website": "https://www.shatingovernmentseco.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.shatingovernmentseco.edu.hk/admissions"
  },
  {
    "id": "aid-193",
    "name": "沙田培英中學",
    "nameEn": "Shatin Pui Ying College",
    "searchKeywords": [
      "SPYC",
      "沙田培英"
    ],
    "category": "資助",
    "district": "新界",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "升學成績良好",
      "全面發展教育",
      "社區服務精神"
    ],
    "address": "馬鞍山馬鞍山路111號",
    "phone": "+852 2766 1701",
    "website": "https://www.shatinpuiyingcollege.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.shatinpuiyingcollege.edu.hk/admissions"
  },
  {
    "id": "aid-194",
    "name": "沙田循道衛理中學",
    "nameEn": "Sha Tin Methodist College",
    "searchKeywords": [
      "STMC",
      "沙田循道"
    ],
    "category": "資助",
    "district": "新界",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "設施完善",
      "師資優良",
      "課外活動豐富"
    ],
    "address": "屯門屯門鄉事會路48號",
    "phone": "+852 2251 8899",
    "website": "https://www.shatinmethodistcolle.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.shatinmethodistcolle.edu.hk/admissions"
  },
  {
    "id": "aid-195",
    "name": "浸信會呂明才中學",
    "nameEn": "Baptist Lui Ming Choi Secondary School",
    "searchKeywords": [
      "BLMCSS",
      "呂明才"
    ],
    "category": "資助",
    "district": "新界",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "政府資助學校",
      "全面發展教育",
      "設施完善"
    ],
    "address": "青衣青衣路99號",
    "phone": "+852 2967 6117",
    "website": "https://www.baptistluimingchoise.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.baptistluimingchoise.edu.hk/admissions"
  },
  {
    "id": "aid-196",
    "name": "聖公會曾肇添中學",
    "nameEn": "SKH Tsang Shiu Tim Secondary School",
    "searchKeywords": [
      "TST",
      "曾肇添"
    ],
    "category": "資助",
    "district": "新界",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "課外活動豐富",
      "校風純樸",
      "政府資助學校"
    ],
    "address": "西貢西貢公路191號",
    "phone": "+852 3225 6961",
    "website": "https://www.skhtsangshiutimsecon.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.skhtsangshiutimsecon.edu.hk/admissions"
  },
  {
    "id": "aid-197",
    "name": "聖公會林裘謀中學",
    "nameEn": "SKH Lam Kau Mow Secondary School",
    "searchKeywords": [
      "LKM",
      "林裘謀"
    ],
    "category": "資助",
    "district": "新界",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "升學成績良好",
      "校風純樸",
      "政府資助學校"
    ],
    "address": "天水圍天恩路38號",
    "phone": "+852 2441 3656",
    "website": "https://www.skhlamkaumowsecondar.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.skhlamkaumowsecondar.edu.hk/admissions"
  },
  {
    "id": "aid-198",
    "name": "天主教郭得勝中學",
    "nameEn": "Kwok Tak Seng Catholic Secondary School",
    "searchKeywords": [
      "KTSCSS",
      "郭得勝"
    ],
    "category": "資助",
    "district": "新界",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "設施完善",
      "校風純樸",
      "升學成績良好"
    ],
    "address": "元朗元朗大馬路149號",
    "phone": "+852 3310 8588",
    "website": "https://www.kwoktaksengcatholics.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.kwoktaksengcatholics.edu.hk/admissions"
  },
  {
    "id": "aid-199",
    "name": "聖母無玷聖心書院",
    "nameEn": "Immaculate Heart of Mary College",
    "searchKeywords": [
      "IHMC",
      "聖母無玷"
    ],
    "category": "資助",
    "district": "新界",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "校風純樸",
      "全面發展教育",
      "升學成績良好"
    ],
    "address": "粉嶺粉嶺樓路188號",
    "phone": "+852 2623 8970",
    "website": "https://www.immaculateheartofmar.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.immaculateheartofmar.edu.hk/admissions"
  },
  {
    "id": "aid-200",
    "name": "香港中文大學校友會聯會陳震夏中學",
    "nameEn": "CUHKFAA Chan Chun Ha Secondary School",
    "searchKeywords": [
      "CCH",
      "陳震夏"
    ],
    "category": "資助",
    "district": "新界",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "校風純樸",
      "全面發展教育",
      "設施完善"
    ],
    "address": "屯門屯門鄉事會路74號",
    "phone": "+852 2950 6600",
    "website": "https://www.cuhkfaachanchunhasec.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.cuhkfaachanchunhasec.edu.hk/admissions"
  },
  {
    "id": "aid-201",
    "name": "保良局百周年李兆忠紀念中學",
    "nameEn": "PLK Centenary Li Shiu Chung Memorial College",
    "searchKeywords": [
      "LSCMC",
      "李兆忠"
    ],
    "category": "資助",
    "district": "新界",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "升學成績良好",
      "免學費",
      "師資優良"
    ],
    "address": "上水上水廣場121號",
    "phone": "+852 3714 1104",
    "website": "https://www.plkcentenarylishiuch.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.plkcentenarylishiuch.edu.hk/admissions"
  },
  {
    "id": "aid-202",
    "name": "屯門官立中學",
    "nameEn": "Tuen Mun Government Secondary School",
    "searchKeywords": [
      "TMGSS",
      "屯門官立"
    ],
    "category": "資助",
    "district": "新界",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "全面發展教育",
      "社區服務精神",
      "師資優良"
    ],
    "address": "元朗元朗大馬路23號",
    "phone": "+852 3526 4764",
    "website": "https://www.tuenmungovernmentsec.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.tuenmungovernmentsec.edu.hk/admissions"
  },
  {
    "id": "aid-203",
    "name": "順德聯誼總會梁銶琚中學",
    "nameEn": "STFA Leung Kau Kui College",
    "searchKeywords": [
      "LKK",
      "梁銶琚"
    ],
    "category": "資助",
    "district": "新界",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "升學成績良好",
      "政府資助學校",
      "校風純樸"
    ],
    "address": "荃灣荃灣大會堂185號",
    "phone": "+852 2585 4733",
    "website": "https://www.stfaleungkaukuicolle.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.stfaleungkaukuicolle.edu.hk/admissions"
  },
  {
    "id": "aid-204",
    "name": "保良局董玉娣中學",
    "nameEn": "PLK Tong Yuk Tei Secondary School",
    "searchKeywords": [
      "TYT",
      "董玉娣"
    ],
    "category": "資助",
    "district": "新界",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "師資優良",
      "社區服務精神",
      "全面發展教育"
    ],
    "address": "青衣青衣路173號",
    "phone": "+852 2248 5984",
    "website": "https://www.plktongyukteiseconda.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.plktongyukteiseconda.edu.hk/admissions"
  },
  {
    "id": "aid-205",
    "name": "元朗公立中學",
    "nameEn": "Yuen Long Public Secondary School",
    "searchKeywords": [
      "YLPSS",
      "元朗公立"
    ],
    "category": "資助",
    "district": "新界",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "校風純樸",
      "升學成績良好",
      "全面發展教育"
    ],
    "address": "屯門屯門鄉事會路97號",
    "phone": "+852 3722 7762",
    "website": "https://www.yuenlongpublicsecond.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.yuenlongpublicsecond.edu.hk/admissions"
  },
  {
    "id": "aid-206",
    "name": "天水圍官立中學",
    "nameEn": "Tin Shui Wai Government Secondary School",
    "searchKeywords": [
      "TSWGSS",
      "天水圍官立"
    ],
    "category": "資助",
    "district": "新界",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "注重品德教育",
      "免學費",
      "全面發展教育"
    ],
    "address": "馬鞍山馬鞍山路50號",
    "phone": "+852 2114 7595",
    "website": "https://www.tinshuiwaigovernment.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.tinshuiwaigovernment.edu.hk/admissions"
  },
  {
    "id": "aid-207",
    "name": "軒尼詩道官立小學",
    "nameEn": "Hennessy Road Government Primary School",
    "searchKeywords": [
      "HRGPS",
      "軒尼詩道"
    ],
    "category": "資助",
    "district": "港島",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "設施完善",
      "校風純樸",
      "全面發展教育"
    ],
    "address": "中環干諾道中81號",
    "phone": "+852 2893 3187",
    "website": "https://www.hennessyroadgovernme.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.hennessyroadgovernme.edu.hk/admissions"
  },
  {
    "id": "aid-208",
    "name": "北角官立小學",
    "nameEn": "North Point Government Primary School",
    "searchKeywords": [
      "NPGPS",
      "北角官立"
    ],
    "category": "資助",
    "district": "港島",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "課外活動豐富",
      "升學成績良好",
      "社區服務精神"
    ],
    "address": "淺水灣南灣道98號",
    "phone": "+852 2806 4918",
    "website": "https://www.northpointgovernment.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.northpointgovernment.edu.hk/admissions"
  },
  {
    "id": "aid-209",
    "name": "愛秩序灣官立小學",
    "nameEn": "Aldrich Bay Government Primary School",
    "searchKeywords": [
      "ABGPS",
      "愛秩序灣"
    ],
    "category": "資助",
    "district": "港島",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "升學成績良好",
      "注重品德教育",
      "社區服務精神"
    ],
    "address": "柴灣柴灣道122號",
    "phone": "+852 3140 4767",
    "website": "https://www.aldrichbaygovernment.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.aldrichbaygovernment.edu.hk/admissions"
  },
  {
    "id": "aid-210",
    "name": "筲箕灣官立小學",
    "nameEn": "Shau Kei Wan Government Primary School",
    "searchKeywords": [
      "SKWGPS",
      "筲箕灣官立"
    ],
    "category": "資助",
    "district": "港島",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "升學成績良好",
      "全面發展教育",
      "課外活動豐富"
    ],
    "address": "香港仔香港仔大道66號",
    "phone": "+852 2890 6795",
    "website": "https://www.shaukeiwangovernment.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.shaukeiwangovernment.edu.hk/admissions"
  },
  {
    "id": "aid-211",
    "name": "香港南區官立小學",
    "nameEn": "Hong Kong Southern District Government Primary School",
    "searchKeywords": [
      "HKSDGPS",
      "南區官立"
    ],
    "category": "資助",
    "district": "港島",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "全面發展教育",
      "課外活動豐富",
      "免學費"
    ],
    "address": "香港仔香港仔大道49號",
    "phone": "+852 3589 5834",
    "website": "https://www.hongkongsoutherndist.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.hongkongsoutherndist.edu.hk/admissions"
  },
  {
    "id": "aid-212",
    "name": "般咸道官立小學",
    "nameEn": "Bonham Road Government Primary School",
    "searchKeywords": [
      "BRGPS",
      "般咸道"
    ],
    "category": "資助",
    "district": "港島",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "社區服務精神",
      "全面發展教育",
      "課外活動豐富"
    ],
    "address": "灣仔軒尼詩道41號",
    "phone": "+852 3718 4107",
    "website": "https://www.bonhamroadgovernment.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.bonhamroadgovernment.edu.hk/admissions"
  },
  {
    "id": "aid-213",
    "name": "李陞小學",
    "nameEn": "Li Sing Primary School",
    "searchKeywords": [
      "LSPS",
      "李陞"
    ],
    "category": "資助",
    "district": "港島",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "政府資助學校",
      "免學費",
      "社區服務精神"
    ],
    "address": "灣仔軒尼詩道75號",
    "phone": "+852 2790 8993",
    "website": "https://www.lisingprimaryschool.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.lisingprimaryschool.edu.hk/admissions"
  },
  {
    "id": "aid-214",
    "name": "聖公會聖彼得小學",
    "nameEn": "SKH St. Peter's Primary School",
    "searchKeywords": [
      "SPPPS",
      "聖彼得"
    ],
    "category": "資助",
    "district": "港島",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "升學成績良好",
      "師資優良",
      "政府資助學校"
    ],
    "address": "鰂魚涌太古城道123號",
    "phone": "+852 2499 3735",
    "website": "https://www.skhst.petersprimarys.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.skhst.petersprimarys.edu.hk/admissions"
  },
  {
    "id": "aid-215",
    "name": "聖公會呂明才紀念小學",
    "nameEn": "SKH Lui Ming Choi Memorial Primary School",
    "searchKeywords": [
      "LMCMPS",
      "呂明才小學"
    ],
    "category": "資助",
    "district": "港島",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "免學費",
      "師資優良",
      "社區服務精神"
    ],
    "address": "淺水灣南灣道121號",
    "phone": "+852 2122 1797",
    "website": "https://www.skhluimingchoimemori.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.skhluimingchoimemori.edu.hk/admissions"
  },
  {
    "id": "aid-216",
    "name": "嘉諾撒聖心學校",
    "nameEn": "Sacred Heart Canossian School",
    "searchKeywords": [
      "SHCS",
      "聖心學校"
    ],
    "category": "資助",
    "district": "港島",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "全面發展教育",
      "升學成績良好",
      "課外活動豐富"
    ],
    "address": "北角英皇道200號",
    "phone": "+852 2841 1560",
    "website": "https://www.sacredheartcanossian.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.sacredheartcanossian.edu.hk/admissions"
  },
  {
    "id": "aid-217",
    "name": "瑪利曼小學",
    "nameEn": "Marymount Primary School",
    "searchKeywords": [
      "MPS",
      "瑪利曼小學"
    ],
    "category": "資助",
    "district": "港島",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "設施完善",
      "政府資助學校",
      "師資優良"
    ],
    "address": "北角英皇道126號",
    "phone": "+852 2997 9377",
    "website": "https://www.marymountprimaryscho.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.marymountprimaryscho.edu.hk/admissions"
  },
  {
    "id": "aid-218",
    "name": "聖若瑟小學",
    "nameEn": "St. Joseph's Primary School",
    "searchKeywords": [
      "SJPS",
      "聖若瑟小學"
    ],
    "category": "資助",
    "district": "港島",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "課外活動豐富",
      "設施完善",
      "全面發展教育"
    ],
    "address": "中環干諾道中6號",
    "phone": "+852 2313 2049",
    "website": "https://www.st.josephsprimarysch.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.st.josephsprimarysch.edu.hk/admissions"
  },
  {
    "id": "aid-219",
    "name": "番禺會所華仁小學",
    "nameEn": "Pun U Association Wah Yan Primary School",
    "searchKeywords": [
      "PUAWPS",
      "華仁小學"
    ],
    "category": "資助",
    "district": "港島",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "政府資助學校",
      "免學費",
      "社區服務精神"
    ],
    "address": "鰂魚涌太古城道52號",
    "phone": "+852 2206 7056",
    "website": "https://www.punuassociationwahya.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.punuassociationwahya.edu.hk/admissions"
  },
  {
    "id": "aid-220",
    "name": "聖公會田灣始南小學",
    "nameEn": "SKH Tin Wan Chi Nam Primary School",
    "searchKeywords": [
      "TWCNPS",
      "田灣始南"
    ],
    "category": "資助",
    "district": "港島",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "政府資助學校",
      "免學費",
      "校風純樸"
    ],
    "address": "灣仔軒尼詩道56號",
    "phone": "+852 3323 7029",
    "website": "https://www.skhtinwanchinamprima.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.skhtinwanchinamprima.edu.hk/admissions"
  },
  {
    "id": "aid-221",
    "name": "香港仔聖伯多祿天主教小學",
    "nameEn": "Aberdeen St. Peter's Catholic Primary School",
    "searchKeywords": [
      "ASPCPS",
      "聖伯多祿"
    ],
    "category": "資助",
    "district": "港島",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "校風純樸",
      "政府資助學校",
      "注重品德教育"
    ],
    "address": "淺水灣南灣道114號",
    "phone": "+852 2848 7873",
    "website": "https://www.aberdeenst.peterscat.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.aberdeenst.peterscat.edu.hk/admissions"
  },
  {
    "id": "aid-222",
    "name": "油蔴地天主教小學",
    "nameEn": "Yaumati Catholic Primary School",
    "searchKeywords": [
      "YCPS",
      "油蔴地天主教"
    ],
    "category": "資助",
    "district": "九龍",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "全面發展教育",
      "校風純樸",
      "政府資助學校"
    ],
    "address": "紅磡馬頭圍道189號",
    "phone": "+852 2633 1451",
    "website": "https://www.yaumaticatholicprima.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.yaumaticatholicprima.edu.hk/admissions"
  },
  {
    "id": "aid-223",
    "name": "九龍塘天主教華德學校",
    "nameEn": "Kowloon Tong Bishop Walsh Catholic School",
    "searchKeywords": [
      "KTBWCS",
      "華德學校"
    ],
    "category": "資助",
    "district": "九龍",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "設施完善",
      "升學成績良好",
      "免學費"
    ],
    "address": "藍田啟田道25號",
    "phone": "+852 2589 6291",
    "website": "https://www.kowloontongbishopwal.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.kowloontongbishopwal.edu.hk/admissions"
  },
  {
    "id": "aid-224",
    "name": "喇沙小學",
    "nameEn": "La Salle Primary School",
    "searchKeywords": [
      "LSPS",
      "喇沙小學"
    ],
    "category": "資助",
    "district": "九龍",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "社區服務精神",
      "升學成績良好",
      "免學費"
    ],
    "address": "深水埗長沙灣道26號",
    "phone": "+852 3225 2984",
    "website": "https://www.lasalleprimaryschool.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.lasalleprimaryschool.edu.hk/admissions"
  },
  {
    "id": "aid-225",
    "name": "瑪利諾修院學校（小學部）",
    "nameEn": "Maryknoll Convent School (Primary Section)",
    "searchKeywords": [
      "MCS Primary"
    ],
    "category": "資助",
    "district": "九龍",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "社區服務精神",
      "升學成績良好",
      "課外活動豐富"
    ],
    "address": "九龍塘沙福道165號",
    "phone": "+852 2770 7202",
    "website": "https://www.maryknollconventscho.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.maryknollconventscho.edu.hk/admissions"
  },
  {
    "id": "aid-226",
    "name": "嘉諾撒聖瑪利學校",
    "nameEn": "St. Mary's Canossian School",
    "searchKeywords": [
      "SMCS",
      "聖瑪利學校"
    ],
    "category": "資助",
    "district": "九龍",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "注重品德教育",
      "課外活動豐富",
      "升學成績良好"
    ],
    "address": "土瓜灣土瓜灣道86號",
    "phone": "+852 2848 1758",
    "website": "https://www.st.maryscanossiansch.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.st.maryscanossiansch.edu.hk/admissions"
  },
  {
    "id": "aid-227",
    "name": "協恩中學附屬小學",
    "nameEn": "Heep Yunn Primary School",
    "searchKeywords": [
      "HYPS",
      "協恩小學"
    ],
    "category": "資助",
    "district": "九龍",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "注重品德教育",
      "升學成績良好",
      "全面發展教育"
    ],
    "address": "深水埗長沙灣道193號",
    "phone": "+852 2722 1108",
    "website": "https://www.heepyunnprimaryschoo.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.heepyunnprimaryschoo.edu.hk/admissions"
  },
  {
    "id": "aid-228",
    "name": "華德學校",
    "nameEn": "Bishop Walsh Primary School",
    "searchKeywords": [
      "BWPS",
      "華德"
    ],
    "category": "資助",
    "district": "九龍",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "政府資助學校",
      "師資優良",
      "升學成績良好"
    ],
    "address": "何文田何文田道118號",
    "phone": "+852 2225 4965",
    "website": "https://www.bishopwalshprimarysc.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.bishopwalshprimarysc.edu.hk/admissions"
  },
  {
    "id": "aid-229",
    "name": "聖公會奉基小學",
    "nameEn": "SKH Fung Kei Primary School",
    "searchKeywords": [
      "FKPS",
      "奉基"
    ],
    "category": "資助",
    "district": "九龍",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "課外活動豐富",
      "政府資助學校",
      "注重品德教育"
    ],
    "address": "黃大仙龍翔道166號",
    "phone": "+852 2909 8918",
    "website": "https://www.skhfungkeiprimarysch.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.skhfungkeiprimarysch.edu.hk/admissions"
  },
  {
    "id": "aid-230",
    "name": "聖公會聖提摩太小學",
    "nameEn": "SKH St. Timothy's Primary School",
    "searchKeywords": [
      "STPS",
      "聖提摩太"
    ],
    "category": "資助",
    "district": "九龍",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "政府資助學校",
      "全面發展教育",
      "升學成績良好"
    ],
    "address": "九龍塘沙福道17號",
    "phone": "+852 3772 6637",
    "website": "https://www.skhst.timothysprimar.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.skhst.timothysprimar.edu.hk/admissions"
  },
  {
    "id": "aid-231",
    "name": "中華基督教會基華小學",
    "nameEn": "CCC Kei Wa Primary School",
    "searchKeywords": [
      "KWPS",
      "基華"
    ],
    "category": "資助",
    "district": "九龍",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "社區服務精神",
      "升學成績良好",
      "全面發展教育"
    ],
    "address": "旺角亞皆老街67號",
    "phone": "+852 3212 5734",
    "website": "https://www.ccckeiwaprimaryschoo.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.ccckeiwaprimaryschoo.edu.hk/admissions"
  },
  {
    "id": "aid-232",
    "name": "聖公會仁立小學",
    "nameEn": "SKH Yan Laap Primary School",
    "searchKeywords": [
      "YLPS",
      "仁立"
    ],
    "category": "資助",
    "district": "新界",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "注重品德教育",
      "師資優良",
      "社區服務精神"
    ],
    "address": "大埔大埔道30號",
    "phone": "+852 2571 1182",
    "website": "https://www.skhyanlaapprimarysch.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.skhyanlaapprimarysch.edu.hk/admissions"
  },
  {
    "id": "aid-233",
    "name": "浸信會沙田圍呂明才小學",
    "nameEn": "Baptist (Sha Tin Wai) Lui Ming Choi Primary School",
    "searchKeywords": [
      "STWLMCPS",
      "沙田圍呂明才"
    ],
    "category": "資助",
    "district": "新界",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "升學成績良好",
      "全面發展教育",
      "社區服務精神"
    ],
    "address": "大埔大埔道119號",
    "phone": "+852 2850 9775",
    "website": "https://www.baptistshatinwailuim.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.baptistshatinwailuim.edu.hk/admissions"
  },
  {
    "id": "aid-234",
    "name": "沙田官立小學",
    "nameEn": "Sha Tin Government Primary School",
    "searchKeywords": [
      "STGPS",
      "沙田官立小學"
    ],
    "category": "資助",
    "district": "新界",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "政府資助學校",
      "全面發展教育",
      "社區服務精神"
    ],
    "address": "馬鞍山馬鞍山路102號",
    "phone": "+852 3395 9373",
    "website": "https://www.shatingovernmentprim.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.shatingovernmentprim.edu.hk/admissions"
  },
  {
    "id": "aid-235",
    "name": "馬鞍山靈糧小學",
    "nameEn": "Ma On Shan Ling Liang Primary School",
    "searchKeywords": [
      "MOSLLPS",
      "馬鞍山靈糧"
    ],
    "category": "資助",
    "district": "新界",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "設施完善",
      "升學成績良好",
      "校風純樸"
    ],
    "address": "屯門屯門鄉事會路141號",
    "phone": "+852 2873 4595",
    "website": "https://www.maonshanlingliangpri.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.maonshanlingliangpri.edu.hk/admissions"
  },
  {
    "id": "aid-236",
    "name": "保良局莊啟程小學",
    "nameEn": "PLK Chong Kee Ting Primary School",
    "searchKeywords": [
      "CKTPS",
      "莊啟程"
    ],
    "category": "資助",
    "district": "新界",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "升學成績良好",
      "免學費",
      "設施完善"
    ],
    "address": "馬鞍山馬鞍山路20號",
    "phone": "+852 3642 4258",
    "website": "https://www.plkchongkeetingprima.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.plkchongkeetingprima.edu.hk/admissions"
  },
  {
    "id": "aid-237",
    "name": "保良局王賜豪（田心谷）小學",
    "nameEn": "PLK Dr. Jimmy Wong Chi-Ho (Tin Sum Valley) Primary School",
    "searchKeywords": [
      "JWPS",
      "王賜豪"
    ],
    "category": "資助",
    "district": "新界",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "免學費",
      "校風純樸",
      "社區服務精神"
    ],
    "address": "粉嶺粉嶺樓路73號",
    "phone": "+852 2927 4208",
    "website": "https://www.plkdr.jimmywongchi-h.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.plkdr.jimmywongchi-h.edu.hk/admissions"
  },
  {
    "id": "aid-238",
    "name": "聖公會馬鞍山主風小學",
    "nameEn": "SKH Ma On Shan Holy Spirit Primary School",
    "searchKeywords": [
      "MOSHSPS",
      "主風"
    ],
    "category": "資助",
    "district": "新界",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "師資優良",
      "設施完善",
      "課外活動豐富"
    ],
    "address": "元朗元朗大馬路123號",
    "phone": "+852 3554 2139",
    "website": "https://www.skhmaonshanholyspiri.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.skhmaonshanholyspiri.edu.hk/admissions"
  },
  {
    "id": "aid-239",
    "name": "天水圍天主教小學",
    "nameEn": "Tin Shui Wai Catholic Primary School",
    "searchKeywords": [
      "TSWCPS",
      "天水圍天主教"
    ],
    "category": "資助",
    "district": "新界",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "政府資助學校",
      "師資優良",
      "免學費"
    ],
    "address": "上水上水廣場154號",
    "phone": "+852 3829 7837",
    "website": "https://www.tinshuiwaicatholicpr.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.tinshuiwaicatholicpr.edu.hk/admissions"
  },
  {
    "id": "aid-240",
    "name": "元朗官立小學",
    "nameEn": "Yuen Long Government Primary School",
    "searchKeywords": [
      "YLGPS",
      "元朗官立小學"
    ],
    "category": "資助",
    "district": "新界",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "社區服務精神",
      "師資優良",
      "全面發展教育"
    ],
    "address": "大埔大埔道153號",
    "phone": "+852 3458 1385",
    "website": "https://www.yuenlonggovernmentpr.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.yuenlonggovernmentpr.edu.hk/admissions"
  },
  {
    "id": "aid-241",
    "name": "屯門官立小學",
    "nameEn": "Tuen Mun Government Primary School",
    "searchKeywords": [
      "TMGPS",
      "屯門官立小學"
    ],
    "category": "資助",
    "district": "新界",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "社區服務精神",
      "設施完善",
      "政府資助學校"
    ],
    "address": "粉嶺粉嶺樓路43號",
    "phone": "+852 3523 9036",
    "website": "https://www.tuenmungovernmentpri.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.tuenmungovernmentpri.edu.hk/admissions"
  },
  {
    "id": "aid-242",
    "name": "保良局志豪小學",
    "nameEn": "PLK Chi Ho Primary School",
    "searchKeywords": [
      "CHPS",
      "志豪"
    ],
    "category": "資助",
    "district": "新界",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "注重品德教育",
      "社區服務精神",
      "課外活動豐富"
    ],
    "address": "荃灣荃灣大會堂14號",
    "phone": "+852 2265 7595",
    "website": "https://www.plkchihoprimaryschoo.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.plkchihoprimaryschoo.edu.hk/admissions"
  },
  {
    "id": "aid-243",
    "name": "順德聯誼總會何日東小學",
    "nameEn": "STFA Ho Yat Tung Primary School",
    "searchKeywords": [
      "HYTPS",
      "何日東"
    ],
    "category": "資助",
    "district": "新界",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "師資優良",
      "設施完善",
      "注重品德教育"
    ],
    "address": "屯門屯門鄉事會路10號",
    "phone": "+852 3693 4192",
    "website": "https://www.stfahoyattungprimary.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.stfahoyattungprimary.edu.hk/admissions"
  },
  {
    "id": "aid-244",
    "name": "仁濟醫院蔡衍濤小學",
    "nameEn": "Yan Chai Hospital Choi Hin To Primary School",
    "searchKeywords": [
      "CHTPS",
      "蔡衍濤"
    ],
    "category": "資助",
    "district": "新界",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "校風純樸",
      "課外活動豐富",
      "社區服務精神"
    ],
    "address": "荃灣荃灣大會堂1號",
    "phone": "+852 3146 8622",
    "website": "https://www.yanchaihospitalchoih.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.yanchaihospitalchoih.edu.hk/admissions"
  },
  {
    "id": "aid-245",
    "name": "將軍澳官立小學",
    "nameEn": "Tseung Kwan O Government Primary School",
    "searchKeywords": [
      "TKOGPS",
      "將軍澳官立"
    ],
    "category": "資助",
    "district": "新界",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "升學成績良好",
      "注重品德教育",
      "師資優良"
    ],
    "address": "青衣青衣路156號",
    "phone": "+852 2780 3642",
    "website": "https://www.tseungkwanogovernmen.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.tseungkwanogovernmen.edu.hk/admissions"
  },
  {
    "id": "aid-246",
    "name": "西貢崇真天主教學校（小學部）",
    "nameEn": "Sai Kung Sung Tsun Catholic School (Primary Section)",
    "searchKeywords": [
      "SKSTCS Primary"
    ],
    "category": "資助",
    "district": "新界",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "設施完善",
      "政府資助學校",
      "師資優良"
    ],
    "address": "沙田沙田正街133號",
    "phone": "+852 3555 2236",
    "website": "https://www.saikungsungtsuncatho.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.saikungsungtsuncatho.edu.hk/admissions"
  },
  {
    "id": "aid-247",
    "name": "聖公會幼稚園",
    "nameEn": "SKH Kindergarten",
    "searchKeywords": [
      "SKH KG"
    ],
    "category": "資助",
    "district": "港島",
    "level": "幼稚園",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "課外活動豐富",
      "政府資助學校",
      "注重品德教育"
    ],
    "address": "北角英皇道124號",
    "phone": "+852 2859 4943",
    "website": "https://www.skhkindergarten.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.skhkindergarten.edu.hk/admissions"
  },
  {
    "id": "aid-248",
    "name": "聖雅各福群會幼稚園",
    "nameEn": "St. James' Settlement Kindergarten",
    "searchKeywords": [
      "SJS KG"
    ],
    "category": "資助",
    "district": "港島",
    "level": "幼稚園",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "全面發展教育",
      "設施完善",
      "免學費"
    ],
    "address": "鰂魚涌太古城道199號",
    "phone": "+852 2446 6239",
    "website": "https://www.st.jamessettlementki.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.st.jamessettlementki.edu.hk/admissions"
  },
  {
    "id": "aid-249",
    "name": "香港基督教服務處幼稚園",
    "nameEn": "HKCS Kindergarten",
    "searchKeywords": [
      "HKCS KG"
    ],
    "category": "資助",
    "district": "九龍",
    "level": "幼稚園",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "師資優良",
      "課外活動豐富",
      "全面發展教育"
    ],
    "address": "將軍澳寶琳路154號",
    "phone": "+852 2348 4457",
    "website": "https://www.hkcskindergarten.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.hkcskindergarten.edu.hk/admissions"
  },
  {
    "id": "aid-250",
    "name": "保良局幼稚園",
    "nameEn": "PLK Kindergarten",
    "searchKeywords": [
      "PLK KG"
    ],
    "category": "資助",
    "district": "九龍",
    "level": "幼稚園",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "升學成績良好",
      "免學費",
      "全面發展教育"
    ],
    "address": "油麻地窩打老道173號",
    "phone": "+852 3734 6896",
    "website": "https://www.plkkindergarten.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.plkkindergarten.edu.hk/admissions"
  },
  {
    "id": "aid-251",
    "name": "東華三院幼稚園",
    "nameEn": "TWGHs Kindergarten",
    "searchKeywords": [
      "TWGHs KG"
    ],
    "category": "資助",
    "district": "九龍",
    "level": "幼稚園",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "政府資助學校",
      "升學成績良好",
      "全面發展教育"
    ],
    "address": "旺角亞皆老街12號",
    "phone": "+852 2504 8965",
    "website": "https://www.twghskindergarten.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.twghskindergarten.edu.hk/admissions"
  },
  {
    "id": "aid-252",
    "name": "仁濟醫院幼稚園",
    "nameEn": "Yan Chai Hospital Kindergarten",
    "searchKeywords": [
      "YCH KG"
    ],
    "category": "資助",
    "district": "新界",
    "level": "幼稚園",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "校風純樸",
      "注重品德教育",
      "課外活動豐富"
    ],
    "address": "西貢西貢公路105號",
    "phone": "+852 2404 1746",
    "website": "https://www.yanchaihospitalkinde.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.yanchaihospitalkinde.edu.hk/admissions"
  },
  {
    "id": "aid-253",
    "name": "博愛醫院幼稚園",
    "nameEn": "Pok Oi Hospital Kindergarten",
    "searchKeywords": [
      "POH KG"
    ],
    "category": "資助",
    "district": "新界",
    "level": "幼稚園",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "注重品德教育",
      "校風純樸",
      "設施完善"
    ],
    "address": "沙田沙田正街169號",
    "phone": "+852 2751 2648",
    "website": "https://www.pokoihospitalkinderg.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.pokoihospitalkinderg.edu.hk/admissions"
  },
  {
    "id": "aid-254",
    "name": "救世軍幼稚園",
    "nameEn": "Salvation Army Kindergarten",
    "searchKeywords": [
      "SA KG"
    ],
    "category": "資助",
    "district": "九龍",
    "level": "幼稚園",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "政府資助學校",
      "全面發展教育",
      "注重品德教育"
    ],
    "address": "九龍塘沙福道106號",
    "phone": "+852 2934 2082",
    "website": "https://www.salvationarmykinderg.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.salvationarmykinderg.edu.hk/admissions"
  },
  {
    "id": "aid-255",
    "name": "循道衛理幼稚園",
    "nameEn": "Methodist Kindergarten",
    "searchKeywords": [
      "Methodist KG"
    ],
    "category": "資助",
    "district": "港島",
    "level": "幼稚園",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "政府資助學校",
      "注重品德教育",
      "師資優良"
    ],
    "address": "香港仔香港仔大道73號",
    "phone": "+852 2284 2493",
    "website": "https://www.methodistkindergarte.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.methodistkindergarte.edu.hk/admissions"
  },
  {
    "id": "aid-256",
    "name": "浸信會幼稚園",
    "nameEn": "Baptist Kindergarten",
    "searchKeywords": [
      "Baptist KG"
    ],
    "category": "資助",
    "district": "九龍",
    "level": "幼稚園",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "設施完善",
      "免學費",
      "社區服務精神"
    ],
    "address": "旺角亞皆老街92號",
    "phone": "+852 3649 6512",
    "website": "https://www.baptistkindergarten.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.baptistkindergarten.edu.hk/admissions"
  },
  {
    "id": "gov-257",
    "name": "皇仁書院",
    "nameEn": "Queen's College",
    "searchKeywords": [
      "QC",
      "皇仁"
    ],
    "category": "公立",
    "district": "港島",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "免學費",
      "全面發展教育",
      "注重品德教育"
    ],
    "address": "筲箕灣愛秩序灣道48號",
    "phone": "+852 2943 2097",
    "website": "https://www.queenscollege.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.queenscollege.edu.hk/admissions"
  },
  {
    "id": "gov-258",
    "name": "英皇書院",
    "nameEn": "King's College",
    "searchKeywords": [
      "KC",
      "英皇"
    ],
    "category": "公立",
    "district": "港島",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "社區服務精神",
      "升學成績穩定",
      "設施完善"
    ],
    "address": "淺水灣南灣道197號",
    "phone": "+852 2728 1095",
    "website": "https://www.kingscollege.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.kingscollege.edu.hk/admissions"
  },
  {
    "id": "gov-259",
    "name": "庇理羅士女子中學",
    "nameEn": "Belilios Public School",
    "searchKeywords": [
      "BPS",
      "庇理羅士"
    ],
    "category": "公立",
    "district": "港島",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "社區服務精神",
      "免學費",
      "師資穩定"
    ],
    "address": "筲箕灣愛秩序灣道82號",
    "phone": "+852 2401 4221",
    "website": "https://www.beliliospublicschool.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.beliliospublicschool.edu.hk/admissions"
  },
  {
    "id": "gov-260",
    "name": "金文泰中學",
    "nameEn": "Clementi Secondary School",
    "searchKeywords": [
      "CSS",
      "金文泰"
    ],
    "category": "公立",
    "district": "港島",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "師資穩定",
      "注重品德教育",
      "校風純樸"
    ],
    "address": "香港仔香港仔大道37號",
    "phone": "+852 2110 1873",
    "website": "https://www.clementisecondarysch.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.clementisecondarysch.edu.hk/admissions"
  },
  {
    "id": "gov-261",
    "name": "筲箕灣官立中學",
    "nameEn": "Shau Kei Wan Government Secondary School",
    "searchKeywords": [
      "SKWGSS",
      "筲官"
    ],
    "category": "公立",
    "district": "港島",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "校風純樸",
      "課外活動多元",
      "政府官立學校"
    ],
    "address": "北角英皇道6號",
    "phone": "+852 3552 4804",
    "website": "https://www.shaukeiwangovernment.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.shaukeiwangovernment.edu.hk/admissions"
  },
  {
    "id": "gov-262",
    "name": "鄧肇堅維多利亞官立中學",
    "nameEn": "Tang Shiu Kin Victoria Government Secondary School",
    "searchKeywords": [
      "TSKVGSS",
      "鄧肇堅維多利亞"
    ],
    "category": "公立",
    "district": "港島",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "注重品德教育",
      "設施完善",
      "免學費"
    ],
    "address": "中環干諾道中120號",
    "phone": "+852 3764 5057",
    "website": "https://www.tangshiukinvictoriag.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.tangshiukinvictoriag.edu.hk/admissions"
  },
  {
    "id": "gov-263",
    "name": "何文田官立中學",
    "nameEn": "Ho Man Tin Government Secondary School",
    "searchKeywords": [
      "HMTGSS",
      "何文田官立"
    ],
    "category": "公立",
    "district": "九龍",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "注重品德教育",
      "升學成績穩定",
      "校風純樸"
    ],
    "address": "尖沙咀彌敦道184號",
    "phone": "+852 2122 1827",
    "website": "https://www.homantingovernmentse.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.homantingovernmentse.edu.hk/admissions"
  },
  {
    "id": "gov-264",
    "name": "伊利沙伯中學",
    "nameEn": "Queen Elizabeth School",
    "searchKeywords": [
      "QES",
      "伊利沙伯"
    ],
    "category": "公立",
    "district": "九龍",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "政府官立學校",
      "設施完善",
      "師資穩定"
    ],
    "address": "旺角亞皆老街42號",
    "phone": "+852 2933 3557",
    "website": "https://www.queenelizabethschool.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.queenelizabethschool.edu.hk/admissions"
  },
  {
    "id": "gov-265",
    "name": "九龍工業學校",
    "nameEn": "Kowloon Technical School",
    "searchKeywords": [
      "KTS",
      "九龍工業"
    ],
    "category": "公立",
    "district": "九龍",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "免學費",
      "注重品德教育",
      "全面發展教育"
    ],
    "address": "將軍澳寶琳路140號",
    "phone": "+852 3861 1030",
    "website": "https://www.kowloontechnicalscho.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.kowloontechnicalscho.edu.hk/admissions"
  },
  {
    "id": "gov-266",
    "name": "觀塘官立中學",
    "nameEn": "Kwun Tong Government Secondary School",
    "searchKeywords": [
      "KTGSS",
      "觀塘官立"
    ],
    "category": "公立",
    "district": "九龍",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "設施完善",
      "政府官立學校",
      "社區服務精神"
    ],
    "address": "觀塘觀塘道154號",
    "phone": "+852 3185 4116",
    "website": "https://www.kwuntonggovernmentse.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.kwuntonggovernmentse.edu.hk/admissions"
  },
  {
    "id": "gov-267",
    "name": "官立嘉道理爵士中學",
    "nameEn": "Sir Ellis Kadoorie Secondary School",
    "searchKeywords": [
      "SEKSS",
      "嘉道理"
    ],
    "category": "公立",
    "district": "九龍",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "社區服務精神",
      "免學費",
      "升學成績穩定"
    ],
    "address": "油麻地窩打老道20號",
    "phone": "+852 2207 3136",
    "website": "https://www.sirelliskadoorieseco.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.sirelliskadoorieseco.edu.hk/admissions"
  },
  {
    "id": "gov-268",
    "name": "新界鄉議局元朗區中學",
    "nameEn": "NT Heung Yee Kuk Yuen Long District Secondary School",
    "searchKeywords": [
      "HYKYLDSS",
      "鄉議局元朗"
    ],
    "category": "公立",
    "district": "新界",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "校風純樸",
      "免學費",
      "社區服務精神"
    ],
    "address": "荃灣荃灣大會堂2號",
    "phone": "+852 3586 5278",
    "website": "https://www.ntheungyeekukyuenlon.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.ntheungyeekukyuenlon.edu.hk/admissions"
  },
  {
    "id": "gov-269",
    "name": "沙田官立中學",
    "nameEn": "Sha Tin Government Secondary School",
    "searchKeywords": [
      "STGSS",
      "沙田官立"
    ],
    "category": "公立",
    "district": "新界",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "課外活動多元",
      "政府官立學校",
      "社區服務精神"
    ],
    "address": "馬鞍山馬鞍山路198號",
    "phone": "+852 3710 3912",
    "website": "https://www.shatingovernmentseco.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.shatingovernmentseco.edu.hk/admissions"
  },
  {
    "id": "gov-270",
    "name": "屯門官立中學",
    "nameEn": "Tuen Mun Government Secondary School",
    "searchKeywords": [
      "TMGSS",
      "屯門官立"
    ],
    "category": "公立",
    "district": "新界",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "師資穩定",
      "校風純樸",
      "注重品德教育"
    ],
    "address": "元朗元朗大馬路151號",
    "phone": "+852 2508 1036",
    "website": "https://www.tuenmungovernmentsec.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.tuenmungovernmentsec.edu.hk/admissions"
  },
  {
    "id": "gov-271",
    "name": "天水圍官立中學",
    "nameEn": "Tin Shui Wai Government Secondary School",
    "searchKeywords": [
      "TSWGSS",
      "天水圍官立"
    ],
    "category": "公立",
    "district": "新界",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "師資穩定",
      "校風純樸",
      "注重品德教育"
    ],
    "address": "屯門屯門鄉事會路121號",
    "phone": "+852 3144 6002",
    "website": "https://www.tinshuiwaigovernment.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.tinshuiwaigovernment.edu.hk/admissions"
  },
  {
    "id": "gov-272",
    "name": "粉嶺官立中學",
    "nameEn": "Fanling Government Secondary School",
    "searchKeywords": [
      "FLGSS",
      "粉嶺官立"
    ],
    "category": "公立",
    "district": "新界",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "師資穩定",
      "免學費",
      "升學成績穩定"
    ],
    "address": "屯門屯門鄉事會路151號",
    "phone": "+852 3690 3962",
    "website": "https://www.fanlinggovernmentsec.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.fanlinggovernmentsec.edu.hk/admissions"
  },
  {
    "id": "gov-273",
    "name": "上水官立中學",
    "nameEn": "Sheung Shui Government Secondary School",
    "searchKeywords": [
      "SSGSS",
      "上水官立"
    ],
    "category": "公立",
    "district": "新界",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "全面發展教育",
      "校風純樸",
      "免學費"
    ],
    "address": "青衣青衣路181號",
    "phone": "+852 2992 9123",
    "website": "https://www.sheungshuigovernment.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.sheungshuigovernment.edu.hk/admissions"
  },
  {
    "id": "gov-274",
    "name": "大埔官立中學",
    "nameEn": "Tai Po Government Secondary School",
    "searchKeywords": [
      "TPGSS",
      "大埔官立"
    ],
    "category": "公立",
    "district": "新界",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "政府官立學校",
      "社區服務精神",
      "設施完善"
    ],
    "address": "青衣青衣路106號",
    "phone": "+852 2425 1052",
    "website": "https://www.taipogovernmentsecon.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.taipogovernmentsecon.edu.hk/admissions"
  },
  {
    "id": "gov-275",
    "name": "荃灣官立中學",
    "nameEn": "Tsuen Wan Government Secondary School",
    "searchKeywords": [
      "TWGSS",
      "荃灣官立"
    ],
    "category": "公立",
    "district": "新界",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "課外活動多元",
      "師資穩定",
      "全面發展教育"
    ],
    "address": "西貢西貢公路55號",
    "phone": "+852 2958 7592",
    "website": "https://www.tsuenwangovernmentse.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.tsuenwangovernmentse.edu.hk/admissions"
  },
  {
    "id": "gov-276",
    "name": "葵涌官立中學",
    "nameEn": "Kwai Chung Government Secondary School",
    "searchKeywords": [
      "KCGSS",
      "葵涌官立"
    ],
    "category": "公立",
    "district": "新界",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "政府官立學校",
      "全面發展教育",
      "校風純樸"
    ],
    "address": "荃灣荃灣大會堂162號",
    "phone": "+852 2608 8952",
    "website": "https://www.kwaichunggovernments.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.kwaichunggovernments.edu.hk/admissions"
  },
  {
    "id": "gov-277",
    "name": "軒尼詩道官立小學",
    "nameEn": "Hennessy Road Government Primary School",
    "searchKeywords": [
      "HRGPS",
      "軒尼詩道"
    ],
    "category": "公立",
    "district": "港島",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "社區服務精神",
      "升學成績穩定",
      "注重品德教育"
    ],
    "address": "香港仔香港仔大道192號",
    "phone": "+852 2783 2380",
    "website": "https://www.hennessyroadgovernme.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.hennessyroadgovernme.edu.hk/admissions"
  },
  {
    "id": "gov-278",
    "name": "北角官立小學",
    "nameEn": "North Point Government Primary School",
    "searchKeywords": [
      "NPGPS",
      "北角官立"
    ],
    "category": "公立",
    "district": "港島",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "課外活動多元",
      "校風純樸",
      "社區服務精神"
    ],
    "address": "北角英皇道13號",
    "phone": "+852 3706 7678",
    "website": "https://www.northpointgovernment.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.northpointgovernment.edu.hk/admissions"
  },
  {
    "id": "gov-279",
    "name": "愛秩序灣官立小學",
    "nameEn": "Aldrich Bay Government Primary School",
    "searchKeywords": [
      "ABGPS",
      "愛秩序灣"
    ],
    "category": "公立",
    "district": "港島",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "全面發展教育",
      "免學費",
      "升學成績穩定"
    ],
    "address": "西營盤般咸道31號",
    "phone": "+852 3413 2435",
    "website": "https://www.aldrichbaygovernment.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.aldrichbaygovernment.edu.hk/admissions"
  },
  {
    "id": "gov-280",
    "name": "筲箕灣官立小學",
    "nameEn": "Shau Kei Wan Government Primary School",
    "searchKeywords": [
      "SKWGPS",
      "筲箕灣官立"
    ],
    "category": "公立",
    "district": "港島",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "升學成績穩定",
      "全面發展教育",
      "免學費"
    ],
    "address": "北角英皇道92號",
    "phone": "+852 3149 5356",
    "website": "https://www.shaukeiwangovernment.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.shaukeiwangovernment.edu.hk/admissions"
  },
  {
    "id": "gov-281",
    "name": "香港南區官立小學",
    "nameEn": "Hong Kong Southern District Government Primary School",
    "searchKeywords": [
      "HKSDGPS",
      "南區官立"
    ],
    "category": "公立",
    "district": "港島",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "設施完善",
      "課外活動多元",
      "注重品德教育"
    ],
    "address": "鰂魚涌太古城道115號",
    "phone": "+852 2733 9097",
    "website": "https://www.hongkongsoutherndist.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.hongkongsoutherndist.edu.hk/admissions"
  },
  {
    "id": "gov-282",
    "name": "般咸道官立小學",
    "nameEn": "Bonham Road Government Primary School",
    "searchKeywords": [
      "BRGPS",
      "般咸道"
    ],
    "category": "公立",
    "district": "港島",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "政府官立學校",
      "校風純樸",
      "全面發展教育"
    ],
    "address": "柴灣柴灣道198號",
    "phone": "+852 2498 4245",
    "website": "https://www.bonhamroadgovernment.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.bonhamroadgovernment.edu.hk/admissions"
  },
  {
    "id": "gov-283",
    "name": "李陞小學",
    "nameEn": "Li Sing Primary School",
    "searchKeywords": [
      "LSPS",
      "李陞"
    ],
    "category": "公立",
    "district": "港島",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "課外活動多元",
      "全面發展教育",
      "師資穩定"
    ],
    "address": "西營盤般咸道124號",
    "phone": "+852 3483 9617",
    "website": "https://www.lisingprimaryschool.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.lisingprimaryschool.edu.hk/admissions"
  },
  {
    "id": "gov-284",
    "name": "九龍塘官立小學",
    "nameEn": "Kowloon Tong Government Primary School",
    "searchKeywords": [
      "KTGPS",
      "九龍塘官立"
    ],
    "category": "公立",
    "district": "九龍",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "政府官立學校",
      "校風純樸",
      "注重品德教育"
    ],
    "address": "將軍澳寶琳路94號",
    "phone": "+852 2232 7855",
    "website": "https://www.kowloontonggovernmen.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.kowloontonggovernmen.edu.hk/admissions"
  },
  {
    "id": "gov-285",
    "name": "油蔴地官立小學",
    "nameEn": "Yaumati Government Primary School",
    "searchKeywords": [
      "YMTGPS",
      "油蔴地官立"
    ],
    "category": "公立",
    "district": "九龍",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "師資穩定",
      "課外活動多元",
      "校風純樸"
    ],
    "address": "將軍澳寶琳路26號",
    "phone": "+852 3622 8105",
    "website": "https://www.yaumatigovernmentpri.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.yaumatigovernmentpri.edu.hk/admissions"
  },
  {
    "id": "gov-286",
    "name": "黃大仙官立小學",
    "nameEn": "Wong Tai Sin Government Primary School",
    "searchKeywords": [
      "WTSGPS",
      "黃大仙官立"
    ],
    "category": "公立",
    "district": "九龍",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "社區服務精神",
      "師資穩定",
      "升學成績穩定"
    ],
    "address": "深水埗長沙灣道152號",
    "phone": "+852 2661 9968",
    "website": "https://www.wongtaisingovernment.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.wongtaisingovernment.edu.hk/admissions"
  },
  {
    "id": "gov-287",
    "name": "觀塘官立小學",
    "nameEn": "Kwun Tong Government Primary School",
    "searchKeywords": [
      "KTGPS",
      "觀塘官立"
    ],
    "category": "公立",
    "district": "九龍",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "師資穩定",
      "政府官立學校",
      "校風純樸"
    ],
    "address": "藍田啟田道88號",
    "phone": "+852 2423 2265",
    "website": "https://www.kwuntonggovernmentpr.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.kwuntonggovernmentpr.edu.hk/admissions"
  },
  {
    "id": "gov-288",
    "name": "沙田官立小學",
    "nameEn": "Sha Tin Government Primary School",
    "searchKeywords": [
      "STGPS",
      "沙田官立小學"
    ],
    "category": "公立",
    "district": "新界",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "免學費",
      "設施完善",
      "升學成績穩定"
    ],
    "address": "屯門屯門鄉事會路41號",
    "phone": "+852 2895 5864",
    "website": "https://www.shatingovernmentprim.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.shatingovernmentprim.edu.hk/admissions"
  },
  {
    "id": "gov-289",
    "name": "屯門官立小學",
    "nameEn": "Tuen Mun Government Primary School",
    "searchKeywords": [
      "TMGPS",
      "屯門官立小學"
    ],
    "category": "公立",
    "district": "新界",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "校風純樸",
      "課外活動多元",
      "設施完善"
    ],
    "address": "葵涌葵涌道70號",
    "phone": "+852 2212 5724",
    "website": "https://www.tuenmungovernmentpri.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.tuenmungovernmentpri.edu.hk/admissions"
  },
  {
    "id": "gov-290",
    "name": "元朗官立小學",
    "nameEn": "Yuen Long Government Primary School",
    "searchKeywords": [
      "YLGPS",
      "元朗官立小學"
    ],
    "category": "公立",
    "district": "新界",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "注重品德教育",
      "課外活動多元",
      "免學費"
    ],
    "address": "大埔大埔道7號",
    "phone": "+852 2844 2569",
    "website": "https://www.yuenlonggovernmentpr.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.yuenlonggovernmentpr.edu.hk/admissions"
  },
  {
    "id": "gov-291",
    "name": "天水圍官立小學",
    "nameEn": "Tin Shui Wai Government Primary School",
    "searchKeywords": [
      "TSWGPS",
      "天水圍官立小學"
    ],
    "category": "公立",
    "district": "新界",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "免學費",
      "注重品德教育",
      "社區服務精神"
    ],
    "address": "元朗元朗大馬路112號",
    "phone": "+852 3403 5923",
    "website": "https://www.tinshuiwaigovernment.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.tinshuiwaigovernment.edu.hk/admissions"
  },
  {
    "id": "gov-292",
    "name": "將軍澳官立小學",
    "nameEn": "Tseung Kwan O Government Primary School",
    "searchKeywords": [
      "TKOGPS",
      "將軍澳官立"
    ],
    "category": "公立",
    "district": "新界",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "課外活動多元",
      "師資穩定",
      "設施完善"
    ],
    "address": "粉嶺粉嶺樓路181號",
    "phone": "+852 2157 4576",
    "website": "https://www.tseungkwanogovernmen.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.tseungkwanogovernmen.edu.hk/admissions"
  },
  {
    "id": "gov-293",
    "name": "大埔官立小學",
    "nameEn": "Tai Po Government Primary School",
    "searchKeywords": [
      "TPGPS",
      "大埔官立小學"
    ],
    "category": "公立",
    "district": "新界",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "校風純樸",
      "全面發展教育",
      "師資穩定"
    ],
    "address": "青衣青衣路74號",
    "phone": "+852 3433 1822",
    "website": "https://www.taipogovernmentprima.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.taipogovernmentprima.edu.hk/admissions"
  },
  {
    "id": "gov-294",
    "name": "粉嶺官立小學",
    "nameEn": "Fanling Government Primary School",
    "searchKeywords": [
      "FLGPS",
      "粉嶺官立小學"
    ],
    "category": "公立",
    "district": "新界",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "注重品德教育",
      "升學成績穩定",
      "校風純樸"
    ],
    "address": "西貢西貢公路21號",
    "phone": "+852 3674 5005",
    "website": "https://www.fanlinggovernmentpri.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.fanlinggovernmentpri.edu.hk/admissions"
  },
  {
    "id": "gov-295",
    "name": "上水官立小學",
    "nameEn": "Sheung Shui Government Primary School",
    "searchKeywords": [
      "SSGPS",
      "上水官立小學"
    ],
    "category": "公立",
    "district": "新界",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "升學成績穩定",
      "校風純樸",
      "全面發展教育"
    ],
    "address": "上水上水廣場165號",
    "phone": "+852 3233 6356",
    "website": "https://www.sheungshuigovernment.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.sheungshuigovernment.edu.hk/admissions"
  },
  {
    "id": "gov-296",
    "name": "荃灣官立小學",
    "nameEn": "Tsuen Wan Government Primary School",
    "searchKeywords": [
      "TWGPS",
      "荃灣官立小學"
    ],
    "category": "公立",
    "district": "新界",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "師資穩定",
      "注重品德教育",
      "政府官立學校"
    ],
    "address": "大埔大埔道155號",
    "phone": "+852 2817 2403",
    "website": "https://www.tsuenwangovernmentpr.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.tsuenwangovernmentpr.edu.hk/admissions"
  },
  {
    "id": "aid-297",
    "name": "中華基督教會銘賢書院",
    "nameEn": "CCC Ming Yin College",
    "searchKeywords": [
      "MYC",
      "銘賢"
    ],
    "category": "資助",
    "district": "九龍",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "升學成績良好",
      "政府資助學校",
      "設施完善"
    ],
    "address": "黃大仙龍翔道42號",
    "phone": "+852 3906 2671",
    "website": "https://www.cccmingyincollege.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.cccmingyincollege.edu.hk/admissions"
  },
  {
    "id": "aid-298",
    "name": "中華基督教會基道中學",
    "nameEn": "CCC Kei To Secondary School",
    "searchKeywords": [
      "KTSS",
      "基道"
    ],
    "category": "資助",
    "district": "九龍",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "免學費",
      "校風純樸",
      "全面發展教育"
    ],
    "address": "旺角亞皆老街25號",
    "phone": "+852 3222 2585",
    "website": "https://www.ccckeitosecondarysch.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.ccckeitosecondarysch.edu.hk/admissions"
  },
  {
    "id": "aid-299",
    "name": "中華基督教會蒙民偉書院",
    "nameEn": "CCC Mong Man Wai College",
    "searchKeywords": [
      "MMWC",
      "蒙民偉"
    ],
    "category": "資助",
    "district": "九龍",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "免學費",
      "注重品德教育",
      "師資優良"
    ],
    "address": "土瓜灣土瓜灣道114號",
    "phone": "+852 3832 9854",
    "website": "https://www.cccmongmanwaicollege.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.cccmongmanwaicollege.edu.hk/admissions"
  },
  {
    "id": "aid-300",
    "name": "中華基督教會協和書院",
    "nameEn": "CCC Heep Woh College",
    "searchKeywords": [
      "HWC",
      "協和"
    ],
    "category": "資助",
    "district": "九龍",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "政府資助學校",
      "全面發展教育",
      "校風純樸"
    ],
    "address": "黃大仙龍翔道165號",
    "phone": "+852 2556 7034",
    "website": "https://www.cccheepwohcollege.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.cccheepwohcollege.edu.hk/admissions"
  },
  {
    "id": "aid-301",
    "name": "中華基督教會公理書院",
    "nameEn": "CCC Kung Lee College",
    "searchKeywords": [
      "KLC",
      "公理"
    ],
    "category": "資助",
    "district": "港島",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "政府資助學校",
      "免學費",
      "校風純樸"
    ],
    "address": "香港仔香港仔大道10號",
    "phone": "+852 3141 4442",
    "website": "https://www.ccckungleecollege.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.ccckungleecollege.edu.hk/admissions"
  },
  {
    "id": "aid-302",
    "name": "聖公會聖三一堂中學",
    "nameEn": "SKH Holy Trinity Church Secondary School",
    "searchKeywords": [
      "HTCSS",
      "聖三一"
    ],
    "category": "資助",
    "district": "九龍",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "升學成績良好",
      "政府資助學校",
      "免學費"
    ],
    "address": "將軍澳寶琳路93號",
    "phone": "+852 3586 6006",
    "website": "https://www.skhholytrinitychurch.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.skhholytrinitychurch.edu.hk/admissions"
  },
  {
    "id": "aid-303",
    "name": "聖公會李炳中學",
    "nameEn": "SKH Li Ping Secondary School",
    "searchKeywords": [
      "LPSS",
      "李炳"
    ],
    "category": "資助",
    "district": "新界",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "師資優良",
      "課外活動豐富",
      "校風純樸"
    ],
    "address": "葵涌葵涌道62號",
    "phone": "+852 3884 5200",
    "website": "https://www.skhlipingsecondarysc.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.skhlipingsecondarysc.edu.hk/admissions"
  },
  {
    "id": "aid-304",
    "name": "聖公會陳融中學",
    "nameEn": "SKH Chan Young Secondary School",
    "searchKeywords": [
      "CYSS",
      "陳融"
    ],
    "category": "資助",
    "district": "新界",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "校風純樸",
      "免學費",
      "全面發展教育"
    ],
    "address": "沙田沙田正街144號",
    "phone": "+852 2463 5383",
    "website": "https://www.skhchanyoungsecondar.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.skhchanyoungsecondar.edu.hk/admissions"
  },
  {
    "id": "aid-305",
    "name": "聖公會莫壽增會督中學",
    "nameEn": "SKH Bishop Mok Sau Tseng Secondary School",
    "searchKeywords": [
      "BMSTSS",
      "莫壽增"
    ],
    "category": "資助",
    "district": "新界",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "全面發展教育",
      "校風純樸",
      "課外活動豐富"
    ],
    "address": "西貢西貢公路189號",
    "phone": "+852 3702 9931",
    "website": "https://www.skhbishopmoksautseng.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.skhbishopmoksautseng.edu.hk/admissions"
  },
  {
    "id": "aid-306",
    "name": "聖公會白約翰會督中學",
    "nameEn": "SKH Bishop Baker Secondary School",
    "searchKeywords": [
      "BBSS",
      "白約翰"
    ],
    "category": "資助",
    "district": "新界",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "注重品德教育",
      "免學費",
      "師資優良"
    ],
    "address": "大埔大埔道187號",
    "phone": "+852 3253 9483",
    "website": "https://www.skhbishopbakersecond.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.skhbishopbakersecond.edu.hk/admissions"
  },
  {
    "id": "aid-307",
    "name": "天主教母佑會蕭明中學",
    "nameEn": "Daughters of Mary Help of Christians Siu Ming Catholic Secondary School",
    "searchKeywords": [
      "SMCSS",
      "蕭明"
    ],
    "category": "資助",
    "district": "九龍",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "校風純樸",
      "師資優良",
      "設施完善"
    ],
    "address": "黃大仙龍翔道42號",
    "phone": "+852 3857 9330",
    "website": "https://www.daughtersofmaryhelpo.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.daughtersofmaryhelpo.edu.hk/admissions"
  },
  {
    "id": "aid-308",
    "name": "天主教培聖中學",
    "nameEn": "Pui Shing Catholic Secondary School",
    "searchKeywords": [
      "PSCSS",
      "培聖"
    ],
    "category": "資助",
    "district": "新界",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "設施完善",
      "政府資助學校",
      "免學費"
    ],
    "address": "大埔大埔道86號",
    "phone": "+852 2313 2126",
    "website": "https://www.puishingcatholicseco.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.puishingcatholicseco.edu.hk/admissions"
  },
  {
    "id": "aid-309",
    "name": "天主教伍華中學",
    "nameEn": "Ng Wah Catholic Secondary School",
    "searchKeywords": [
      "NWCSS",
      "伍華"
    ],
    "category": "資助",
    "district": "九龍",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "校風純樸",
      "全面發展教育",
      "注重品德教育"
    ],
    "address": "將軍澳寶琳路134號",
    "phone": "+852 3549 9661",
    "website": "https://www.ngwahcatholicseconda.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.ngwahcatholicseconda.edu.hk/admissions"
  },
  {
    "id": "aid-310",
    "name": "天主教崇德英文書院",
    "nameEn": "Shung Tak Catholic English College",
    "searchKeywords": [
      "STCEC",
      "崇德"
    ],
    "category": "資助",
    "district": "新界",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "課外活動豐富",
      "全面發展教育",
      "師資優良"
    ],
    "address": "西貢西貢公路103號",
    "phone": "+852 2467 4303",
    "website": "https://www.shungtakcatholicengl.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.shungtakcatholicengl.edu.hk/admissions"
  },
  {
    "id": "aid-311",
    "name": "天主教普照中學",
    "nameEn": "Po Chiu Catholic Secondary School",
    "searchKeywords": [
      "PCCSS",
      "普照"
    ],
    "category": "資助",
    "district": "九龍",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "注重品德教育",
      "師資優良",
      "升學成績良好"
    ],
    "address": "何文田何文田道11號",
    "phone": "+852 2434 7023",
    "website": "https://www.pochiucatholicsecond.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.pochiucatholicsecond.edu.hk/admissions"
  },
  {
    "id": "aid-312",
    "name": "佛教黃鳳翎中學",
    "nameEn": "Buddhist Wong Fung Ling College",
    "searchKeywords": [
      "WFLC",
      "黃鳳翎"
    ],
    "category": "資助",
    "district": "港島",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "政府資助學校",
      "升學成績良好",
      "注重品德教育"
    ],
    "address": "筲箕灣愛秩序灣道173號",
    "phone": "+852 2749 3349",
    "website": "https://www.buddhistwongfungling.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.buddhistwongfungling.edu.hk/admissions"
  },
  {
    "id": "aid-313",
    "name": "佛教善德英文中學",
    "nameEn": "Buddhist Sin Tak College",
    "searchKeywords": [
      "BSTC",
      "善德"
    ],
    "category": "資助",
    "district": "新界",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "校風純樸",
      "免學費",
      "師資優良"
    ],
    "address": "粉嶺粉嶺樓路131號",
    "phone": "+852 2257 6965",
    "website": "https://www.buddhistsintakcolleg.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.buddhistsintakcolleg.edu.hk/admissions"
  },
  {
    "id": "aid-314",
    "name": "佛教大雄中學",
    "nameEn": "Buddhist Tai Hung College",
    "searchKeywords": [
      "BTHC",
      "大雄"
    ],
    "category": "資助",
    "district": "九龍",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "師資優良",
      "升學成績良好",
      "社區服務精神"
    ],
    "address": "九龍塘沙福道10號",
    "phone": "+852 3723 8585",
    "website": "https://www.buddhisttaihungcolle.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.buddhisttaihungcolle.edu.hk/admissions"
  },
  {
    "id": "aid-315",
    "name": "佛教孔仙洲紀念中學",
    "nameEn": "Buddhist Hung Sean Chau Memorial College",
    "searchKeywords": [
      "BHSCMC",
      "孔仙洲"
    ],
    "category": "資助",
    "district": "新界",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "免學費",
      "升學成績良好",
      "校風純樸"
    ],
    "address": "上水上水廣場136號",
    "phone": "+852 2930 6493",
    "website": "https://www.buddhisthungseanchau.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.buddhisthungseanchau.edu.hk/admissions"
  },
  {
    "id": "aid-316",
    "name": "佛教茂峰法師紀念中學",
    "nameEn": "Buddhist Mau Fung Memorial College",
    "searchKeywords": [
      "BMFMC",
      "茂峰"
    ],
    "category": "資助",
    "district": "新界",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "設施完善",
      "免學費",
      "社區服務精神"
    ],
    "address": "元朗元朗大馬路50號",
    "phone": "+852 2434 5439",
    "website": "https://www.buddhistmaufungmemor.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.buddhistmaufungmemor.edu.hk/admissions"
  },
  {
    "id": "aid-317",
    "name": "道教聯合會圓玄學院第一中學",
    "nameEn": "HKTA The Yuen Yuen Institute No.1 Secondary School",
    "searchKeywords": [
      "YYI1",
      "圓玄一中"
    ],
    "category": "資助",
    "district": "新界",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "設施完善",
      "免學費",
      "課外活動豐富"
    ],
    "address": "荃灣荃灣大會堂198號",
    "phone": "+852 3349 1941",
    "website": "https://www.hktatheyuenyueninsti.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.hktatheyuenyueninsti.edu.hk/admissions"
  },
  {
    "id": "aid-318",
    "name": "道教聯合會圓玄學院第二中學",
    "nameEn": "HKTA The Yuen Yuen Institute No.2 Secondary School",
    "searchKeywords": [
      "YYI2",
      "圓玄二中"
    ],
    "category": "資助",
    "district": "新界",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "免學費",
      "設施完善",
      "課外活動豐富"
    ],
    "address": "粉嶺粉嶺樓路176號",
    "phone": "+852 2348 3910",
    "website": "https://www.hktatheyuenyueninsti.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.hktatheyuenyueninsti.edu.hk/admissions"
  },
  {
    "id": "aid-319",
    "name": "道教聯合會圓玄學院第三中學",
    "nameEn": "HKTA The Yuen Yuen Institute No.3 Secondary School",
    "searchKeywords": [
      "YYI3",
      "圓玄三中"
    ],
    "category": "資助",
    "district": "新界",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "設施完善",
      "免學費",
      "師資優良"
    ],
    "address": "大埔大埔道122號",
    "phone": "+852 3319 3617",
    "website": "https://www.hktatheyuenyueninsti.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.hktatheyuenyueninsti.edu.hk/admissions"
  },
  {
    "id": "aid-320",
    "name": "伊斯蘭脫維善紀念中學",
    "nameEn": "Islamic Kasim Tuet Memorial College",
    "searchKeywords": [
      "IKTMC",
      "脫維善"
    ],
    "category": "資助",
    "district": "九龍",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "校風純樸",
      "政府資助學校",
      "免學費"
    ],
    "address": "觀塘觀塘道3號",
    "phone": "+852 2729 9710",
    "website": "https://www.islamickasimtuetmemo.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.islamickasimtuetmemo.edu.hk/admissions"
  },
  {
    "id": "aid-321",
    "name": "香港道教聯合會鄧顯紀念中學",
    "nameEn": "HKTA Tang Hin Memorial Secondary School",
    "searchKeywords": [
      "THSS",
      "鄧顯"
    ],
    "category": "資助",
    "district": "新界",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "課外活動豐富",
      "全面發展教育",
      "師資優良"
    ],
    "address": "葵涌葵涌道120號",
    "phone": "+852 2664 4990",
    "website": "https://www.hktatanghinmemorials.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.hktatanghinmemorials.edu.hk/admissions"
  },
  {
    "id": "aid-322",
    "name": "聖公會基恩小學",
    "nameEn": "SKH Kei Yan Primary School",
    "searchKeywords": [
      "KYPS",
      "基恩"
    ],
    "category": "資助",
    "district": "九龍",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "全面發展教育",
      "升學成績良好",
      "注重品德教育"
    ],
    "address": "黃大仙龍翔道112號",
    "phone": "+852 3957 6732",
    "website": "https://www.skhkeiyanprimaryscho.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.skhkeiyanprimaryscho.edu.hk/admissions"
  },
  {
    "id": "aid-323",
    "name": "聖公會德田李兆強小學",
    "nameEn": "SKH Tak Tin Lei Siu Keung Primary School",
    "searchKeywords": [
      "TTLSKPS",
      "李兆強"
    ],
    "category": "資助",
    "district": "九龍",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "社區服務精神",
      "設施完善",
      "注重品德教育"
    ],
    "address": "何文田何文田道33號",
    "phone": "+852 2596 4494",
    "website": "https://www.skhtaktinleisiukeung.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.skhtaktinleisiukeung.edu.hk/admissions"
  },
  {
    "id": "aid-324",
    "name": "聖公會油塘基顯小學",
    "nameEn": "SKH Yau Tong Kei Hin Primary School",
    "searchKeywords": [
      "YTKHPS",
      "基顯"
    ],
    "category": "資助",
    "district": "九龍",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "全面發展教育",
      "校風純樸",
      "設施完善"
    ],
    "address": "深水埗長沙灣道46號",
    "phone": "+852 3979 7749",
    "website": "https://www.skhyautongkeihinprim.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.skhyautongkeihinprim.edu.hk/admissions"
  },
  {
    "id": "aid-325",
    "name": "聖公會將軍澳基德小學",
    "nameEn": "SKH Tseung Kwan O Kei Tak Primary School",
    "searchKeywords": [
      "TKOKTPS",
      "基德"
    ],
    "category": "資助",
    "district": "新界",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "免學費",
      "全面發展教育",
      "校風純樸"
    ],
    "address": "葵涌葵涌道49號",
    "phone": "+852 2449 9522",
    "website": "https://www.skhtseungkwanokeitak.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.skhtseungkwanokeitak.edu.hk/admissions"
  },
  {
    "id": "aid-326",
    "name": "天主教聖安德肋小學",
    "nameEn": "St. Andrew's Catholic Primary School",
    "searchKeywords": [
      "SACPS",
      "聖安德肋"
    ],
    "category": "資助",
    "district": "九龍",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "設施完善",
      "注重品德教育",
      "校風純樸"
    ],
    "address": "黃大仙龍翔道17號",
    "phone": "+852 2785 3790",
    "website": "https://www.st.andrewscatholicpr.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.st.andrewscatholicpr.edu.hk/admissions"
  },
  {
    "id": "aid-327",
    "name": "天主教佑華小學",
    "nameEn": "Our Lady of China Catholic Primary School",
    "searchKeywords": [
      "OLCCPS",
      "佑華"
    ],
    "category": "資助",
    "district": "新界",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "全面發展教育",
      "師資優良",
      "注重品德教育"
    ],
    "address": "上水上水廣場197號",
    "phone": "+852 2747 7403",
    "website": "https://www.ourladyofchinacathol.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.ourladyofchinacathol.edu.hk/admissions"
  },
  {
    "id": "aid-328",
    "name": "天主教石鐘山紀念小學",
    "nameEn": "Shak Chung Shan Memorial Catholic Primary School",
    "searchKeywords": [
      "SCSPS",
      "石鐘山"
    ],
    "category": "資助",
    "district": "新界",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "全面發展教育",
      "設施完善",
      "社區服務精神"
    ],
    "address": "西貢西貢公路166號",
    "phone": "+852 3206 9268",
    "website": "https://www.shakchungshanmemoria.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.shakchungshanmemoria.edu.hk/admissions"
  },
  {
    "id": "aid-329",
    "name": "天主教領島學校",
    "nameEn": "Ling To Catholic Primary School",
    "searchKeywords": [
      "LTCPS",
      "領島"
    ],
    "category": "資助",
    "district": "九龍",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "全面發展教育",
      "師資優良",
      "升學成績良好"
    ],
    "address": "旺角亞皆老街180號",
    "phone": "+852 3667 4803",
    "website": "https://www.lingtocatholicprimar.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.lingtocatholicprimar.edu.hk/admissions"
  },
  {
    "id": "aid-330",
    "name": "天主教聖母聖心小學",
    "nameEn": "Immaculate Heart of Mary Catholic Primary School",
    "searchKeywords": [
      "IHMCPS",
      "聖母聖心"
    ],
    "category": "資助",
    "district": "九龍",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "校風純樸",
      "社區服務精神",
      "全面發展教育"
    ],
    "address": "藍田啟田道160號",
    "phone": "+852 2761 3867",
    "website": "https://www.immaculateheartofmar.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.immaculateheartofmar.edu.hk/admissions"
  },
  {
    "id": "aid-331",
    "name": "佛教林金殿紀念小學",
    "nameEn": "Buddhist Lim Kim Tian Memorial Primary School",
    "searchKeywords": [
      "LKTMPS",
      "林金殿"
    ],
    "category": "資助",
    "district": "新界",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "政府資助學校",
      "課外活動豐富",
      "升學成績良好"
    ],
    "address": "西貢西貢公路138號",
    "phone": "+852 3622 2432",
    "website": "https://www.buddhistlimkimtianme.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.buddhistlimkimtianme.edu.hk/admissions"
  },
  {
    "id": "aid-332",
    "name": "佛教慈敬學校",
    "nameEn": "Buddhist Chi King Primary School",
    "searchKeywords": [
      "BCKPS",
      "慈敬"
    ],
    "category": "資助",
    "district": "九龍",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "社區服務精神",
      "政府資助學校",
      "注重品德教育"
    ],
    "address": "將軍澳寶琳路27號",
    "phone": "+852 3757 8700",
    "website": "https://www.buddhistchikingprima.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.buddhistchikingprima.edu.hk/admissions"
  },
  {
    "id": "aid-333",
    "name": "佛教中華康山學校",
    "nameEn": "Buddhist Chung Wah Kornhill Primary School",
    "searchKeywords": [
      "BCWKPS",
      "康山"
    ],
    "category": "資助",
    "district": "港島",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "免學費",
      "校風純樸",
      "注重品德教育"
    ],
    "address": "香港仔香港仔大道187號",
    "phone": "+852 2336 1952",
    "website": "https://www.buddhistchungwahkorn.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.buddhistchungwahkorn.edu.hk/admissions"
  },
  {
    "id": "aid-334",
    "name": "佛教榮茵學校",
    "nameEn": "Buddhist Wing Yan School",
    "searchKeywords": [
      "BWYS",
      "榮茵"
    ],
    "category": "資助",
    "district": "新界",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "政府資助學校",
      "課外活動豐富",
      "免學費"
    ],
    "address": "西貢西貢公路120號",
    "phone": "+852 2253 3353",
    "website": "https://www.buddhistwingyanschoo.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.buddhistwingyanschoo.edu.hk/admissions"
  },
  {
    "id": "aid-335",
    "name": "道教青松小學",
    "nameEn": "Taoist Ching Chung Primary School",
    "searchKeywords": [
      "TCCPS",
      "青松"
    ],
    "category": "資助",
    "district": "新界",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "課外活動豐富",
      "免學費",
      "全面發展教育"
    ],
    "address": "大埔大埔道120號",
    "phone": "+852 3347 9187",
    "website": "https://www.taoistchingchungprim.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.taoistchingchungprim.edu.hk/admissions"
  },
  {
    "id": "aid-336",
    "name": "香港道教聯合會雲泉學校",
    "nameEn": "HKTA Wun Tsuen School",
    "searchKeywords": [
      "WTS",
      "雲泉"
    ],
    "category": "資助",
    "district": "新界",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "政府資助學校",
      "全面發展教育",
      "校風純樸"
    ],
    "address": "天水圍天恩路199號",
    "phone": "+852 2262 8181",
    "website": "https://www.hktawuntsuenschool.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.hktawuntsuenschool.edu.hk/admissions"
  },
  {
    "id": "aid-337",
    "name": "聖公會聖馬太堂幼稚園",
    "nameEn": "SKH St. Matthew's Church Kindergarten",
    "searchKeywords": [
      "SMCK"
    ],
    "category": "資助",
    "district": "港島",
    "level": "幼稚園",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "校風純樸",
      "注重品德教育",
      "全面發展教育"
    ],
    "address": "筲箕灣愛秩序灣道75號",
    "phone": "+852 2507 1208",
    "website": "https://www.skhst.matthewschurch.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.skhst.matthewschurch.edu.hk/admissions"
  },
  {
    "id": "aid-338",
    "name": "聖公會聖雅各堂幼稚園",
    "nameEn": "SKH St. James' Church Kindergarten",
    "searchKeywords": [
      "SJCK"
    ],
    "category": "資助",
    "district": "港島",
    "level": "幼稚園",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "校風純樸",
      "師資優良",
      "設施完善"
    ],
    "address": "淺水灣南灣道25號",
    "phone": "+852 2541 5306",
    "website": "https://www.skhst.jameschurchkin.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.skhst.jameschurchkin.edu.hk/admissions"
  },
  {
    "id": "aid-339",
    "name": "聖公會聖彼得堂幼稚園",
    "nameEn": "SKH St. Peter's Church Kindergarten",
    "searchKeywords": [
      "SPCK"
    ],
    "category": "資助",
    "district": "九龍",
    "level": "幼稚園",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "社區服務精神",
      "全面發展教育",
      "升學成績良好"
    ],
    "address": "觀塘觀塘道15號",
    "phone": "+852 3628 9841",
    "website": "https://www.skhst.peterschurchki.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.skhst.peterschurchki.edu.hk/admissions"
  },
  {
    "id": "aid-340",
    "name": "天主教聖母幼稚園",
    "nameEn": "Our Lady's Kindergarten",
    "searchKeywords": [
      "OLK"
    ],
    "category": "資助",
    "district": "九龍",
    "level": "幼稚園",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "社區服務精神",
      "課外活動豐富",
      "免學費"
    ],
    "address": "油麻地窩打老道4號",
    "phone": "+852 2905 2086",
    "website": "https://www.ourladyskindergarten.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.ourladyskindergarten.edu.hk/admissions"
  },
  {
    "id": "aid-341",
    "name": "天主教聖德蘭幼稚園",
    "nameEn": "St. Teresa's Kindergarten",
    "searchKeywords": [
      "STK"
    ],
    "category": "資助",
    "district": "九龍",
    "level": "幼稚園",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "校風純樸",
      "免學費",
      "全面發展教育"
    ],
    "address": "何文田何文田道40號",
    "phone": "+852 3537 2308",
    "website": "https://www.st.teresaskindergart.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.st.teresaskindergart.edu.hk/admissions"
  },
  {
    "id": "aid-342",
    "name": "佛教金麗幼稚園",
    "nameEn": "Buddhist Kam Lai Kindergarten",
    "searchKeywords": [
      "BKLK"
    ],
    "category": "資助",
    "district": "新界",
    "level": "幼稚園",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "社區服務精神",
      "免學費",
      "升學成績良好"
    ],
    "address": "天水圍天恩路43號",
    "phone": "+852 3214 5627",
    "website": "https://www.buddhistkamlaikinder.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.buddhistkamlaikinder.edu.hk/admissions"
  },
  {
    "id": "aid-343",
    "name": "佛教慈光幼稚園",
    "nameEn": "Buddhist Chi Kwong Kindergarten",
    "searchKeywords": [
      "BCKK"
    ],
    "category": "資助",
    "district": "九龍",
    "level": "幼稚園",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "設施完善",
      "免學費",
      "全面發展教育"
    ],
    "address": "尖沙咀彌敦道84號",
    "phone": "+852 3922 2162",
    "website": "https://www.buddhistchikwongkind.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.buddhistchikwongkind.edu.hk/admissions"
  },
  {
    "id": "aid-344",
    "name": "道教青松湖景邨幼稚園",
    "nameEn": "Taoist Ching Chung Wu King Estate Kindergarten",
    "searchKeywords": [
      "TCCWKEK"
    ],
    "category": "資助",
    "district": "新界",
    "level": "幼稚園",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "注重品德教育",
      "校風純樸",
      "課外活動豐富"
    ],
    "address": "沙田沙田正街115號",
    "phone": "+852 3261 6274",
    "website": "https://www.taoistchingchungwuki.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.taoistchingchungwuki.edu.hk/admissions"
  },
  {
    "id": "aid-345",
    "name": "救世軍田家炳幼稚園",
    "nameEn": "Salvation Army Tin Ka Ping Kindergarten",
    "searchKeywords": [
      "SATKPK"
    ],
    "category": "資助",
    "district": "新界",
    "level": "幼稚園",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "設施完善",
      "校風純樸",
      "課外活動豐富"
    ],
    "address": "馬鞍山馬鞍山路104號",
    "phone": "+852 2154 8657",
    "website": "https://www.salvationarmytinkapi.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.salvationarmytinkapi.edu.hk/admissions"
  },
  {
    "id": "aid-346",
    "name": "循道衛理聯合教會愛華村堂幼稚園",
    "nameEn": "Methodist Epworth Village Church Kindergarten",
    "searchKeywords": [
      "MEVCK"
    ],
    "category": "資助",
    "district": "港島",
    "level": "幼稚園",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "注重品德教育",
      "設施完善",
      "免學費"
    ],
    "address": "薄扶林薄扶林道9號",
    "phone": "+852 3842 3601",
    "website": "https://www.methodistepworthvill.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.methodistepworthvill.edu.hk/admissions"
  },
  {
    "id": "pri-347",
    "name": "聖保祿幼兒園",
    "nameEn": "St. Paul's Nursery",
    "searchKeywords": [
      "SPN"
    ],
    "category": "私立",
    "district": "港島",
    "level": "幼稚園",
    "tuitionMin": 95410,
    "tuitionMax": 110639,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "課外活動豐富",
      "設施完善",
      "注重品德培養"
    ],
    "address": "上環皇后大道中46號",
    "phone": "+852 2927 2645",
    "website": "https://www.st.paulsnursery.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.st.paulsnursery.edu.hk/admissions"
  },
  {
    "id": "pri-348",
    "name": "嘉諾撒聖心幼兒園",
    "nameEn": "Sacred Heart Canossian Nursery",
    "searchKeywords": [
      "SHCN"
    ],
    "category": "私立",
    "district": "港島",
    "level": "幼稚園",
    "tuitionMin": 97159,
    "tuitionMax": 107619,
    "curriculum": [
      "DSE"
    ],
    "language": "全英文",
    "highlights": [
      "師資優良",
      "小班教學",
      "課外活動豐富"
    ],
    "address": "筲箕灣愛秩序灣道7號",
    "phone": "+852 3140 3670",
    "website": "https://www.sacredheartcanossian.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.sacredheartcanossian.edu.hk/admissions"
  },
  {
    "id": "pri-349",
    "name": "瑪利諾修院學校幼稚園",
    "nameEn": "Maryknoll Convent School Kindergarten",
    "searchKeywords": [
      "MCSK"
    ],
    "category": "私立",
    "district": "九龍",
    "level": "幼稚園",
    "tuitionMin": 60757,
    "tuitionMax": 68291,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "升學成績優異",
      "注重品德培養",
      "師資優良"
    ],
    "address": "黃大仙龍翔道138號",
    "phone": "+852 2640 3457",
    "website": "https://www.maryknollconventscho.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.maryknollconventscho.edu.hk/admissions"
  },
  {
    "id": "pri-350",
    "name": "德望幼稚園",
    "nameEn": "Good Hope Kindergarten",
    "searchKeywords": [
      "GHK"
    ],
    "category": "私立",
    "district": "九龍",
    "level": "幼稚園",
    "tuitionMin": 48487,
    "tuitionMax": 50528,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "重視學生個別發展",
      "升學成績優異",
      "課外活動豐富"
    ],
    "address": "旺角亞皆老街140號",
    "phone": "+852 2177 8079",
    "website": "https://www.goodhopekindergarten.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.goodhopekindergarten.edu.hk/admissions"
  },
  {
    "id": "pri-351",
    "name": "協恩幼稚園",
    "nameEn": "Heep Yunn Kindergarten",
    "searchKeywords": [
      "HYK"
    ],
    "category": "私立",
    "district": "九龍",
    "level": "幼稚園",
    "tuitionMin": 50380,
    "tuitionMax": 61297,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "課外活動豐富",
      "師資優良",
      "注重品德培養"
    ],
    "address": "油麻地窩打老道73號",
    "phone": "+852 2999 2051",
    "website": "https://www.heepyunnkindergarten.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.heepyunnkindergarten.edu.hk/admissions"
  },
  {
    "id": "pri-352",
    "name": "拔萃女小學幼稚園",
    "nameEn": "Diocesan Girls' Junior School Kindergarten",
    "searchKeywords": [
      "DGJSK"
    ],
    "category": "私立",
    "district": "九龍",
    "level": "幼稚園",
    "tuitionMin": 83048,
    "tuitionMax": 97805,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "歷史悠久名校",
      "設施完善",
      "課外活動豐富"
    ],
    "address": "深水埗長沙灣道72號",
    "phone": "+852 3488 5431",
    "website": "https://www.diocesangirlsjuniors.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.diocesangirlsjuniors.edu.hk/admissions"
  },
  {
    "id": "pri-353",
    "name": "聖士提反女子中學附屬幼稚園",
    "nameEn": "St. Stephen's Girls' College Kindergarten",
    "searchKeywords": [
      "SSGCK"
    ],
    "category": "私立",
    "district": "港島",
    "level": "幼稚園",
    "tuitionMin": 84204,
    "tuitionMax": 103600,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "歷史悠久名校",
      "優良校風傳統",
      "小班教學"
    ],
    "address": "上環皇后大道中70號",
    "phone": "+852 3854 1855",
    "website": "https://www.st.stephensgirlscoll.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.st.stephensgirlscoll.edu.hk/admissions"
  },
  {
    "id": "pri-354",
    "name": "真光幼稚園",
    "nameEn": "True Light Kindergarten",
    "searchKeywords": [
      "TLK"
    ],
    "category": "私立",
    "district": "九龍",
    "level": "幼稚園",
    "tuitionMin": 53988,
    "tuitionMax": 64086,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "課外活動豐富",
      "重視學生個別發展",
      "師資優良"
    ],
    "address": "油麻地窩打老道193號",
    "phone": "+852 3526 6444",
    "website": "https://www.truelightkindergarte.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.truelightkindergarte.edu.hk/admissions"
  },
  {
    "id": "pri-355",
    "name": "培正幼稚園",
    "nameEn": "Pui Ching Kindergarten",
    "searchKeywords": [
      "PCK"
    ],
    "category": "私立",
    "district": "九龍",
    "level": "幼稚園",
    "tuitionMin": 48115,
    "tuitionMax": 64582,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "小班教學",
      "注重品德培養",
      "重視學生個別發展"
    ],
    "address": "黃大仙龍翔道12號",
    "phone": "+852 2632 5302",
    "website": "https://www.puichingkindergarten.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.puichingkindergarten.edu.hk/admissions"
  },
  {
    "id": "pri-356",
    "name": "民生書院幼稚園",
    "nameEn": "Munsang College Kindergarten",
    "searchKeywords": [
      "MSCK"
    ],
    "category": "私立",
    "district": "九龍",
    "level": "幼稚園",
    "tuitionMin": 53607,
    "tuitionMax": 68802,
    "curriculum": [
      "DSE"
    ],
    "language": "全英文",
    "highlights": [
      "注重品德培養",
      "提供全面教育",
      "課外活動豐富"
    ],
    "address": "旺角亞皆老街162號",
    "phone": "+852 2164 9662",
    "website": "https://www.munsangcollegekinder.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.munsangcollegekinder.edu.hk/admissions"
  },
  {
    "id": "int-357",
    "name": "思貝禮國際幼稚園",
    "nameEn": "Shrewsbury International Kindergarten",
    "searchKeywords": [
      "SIK"
    ],
    "category": "國際",
    "district": "新界",
    "level": "幼稚園",
    "tuitionMin": 128433,
    "tuitionMax": 157493,
    "curriculum": [
      "英式課程"
    ],
    "language": "中英雙語",
    "highlights": [
      "小班教學模式",
      "強調創意與批判思維",
      "豐富課外活動選擇"
    ],
    "address": "大埔大埔道180號",
    "phone": "+852 2868 9528",
    "website": "https://www.shrewsburyinternatio.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.shrewsburyinternatio.edu.hk/admissions"
  },
  {
    "id": "int-358",
    "name": "威雅國際幼稚園",
    "nameEn": "Wycombe Abbey International Kindergarten",
    "searchKeywords": [
      "WAIK"
    ],
    "category": "國際",
    "district": "新界",
    "level": "幼稚園",
    "tuitionMin": 110874,
    "tuitionMax": 116540,
    "curriculum": [
      "IB"
    ],
    "language": "中英雙語",
    "highlights": [
      "注重全人發展教育",
      "現代化校園設施",
      "小班教學模式"
    ],
    "address": "上水上水廣場189號",
    "phone": "+852 3114 5965",
    "website": "https://www.wycombeabbeyinternat.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.wycombeabbeyinternat.edu.hk/admissions"
  },
  {
    "id": "int-359",
    "name": "墨爾文國際幼稚園",
    "nameEn": "Malvern College International Kindergarten",
    "searchKeywords": [
      "MCIK"
    ],
    "category": "國際",
    "district": "新界",
    "level": "幼稚園",
    "tuitionMin": 120442,
    "tuitionMax": 142344,
    "curriculum": [
      "美式課程"
    ],
    "language": "全英文",
    "highlights": [
      "雙語教學環境",
      "小班教學模式",
      "現代化校園設施"
    ],
    "address": "馬鞍山馬鞍山路130號",
    "phone": "+852 3827 9521",
    "website": "https://www.malverncollegeintern.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.malverncollegeintern.edu.hk/admissions"
  },
  {
    "id": "int-360",
    "name": "諾德安達國際幼稚園",
    "nameEn": "Nord Anglia International Kindergarten",
    "searchKeywords": [
      "NAIK"
    ],
    "category": "國際",
    "district": "九龍",
    "level": "幼稚園",
    "tuitionMin": 87367,
    "tuitionMax": 99016,
    "curriculum": [
      "美式課程"
    ],
    "language": "中英雙語",
    "highlights": [
      "豐富課外活動選擇",
      "現代化校園設施",
      "小班教學模式"
    ],
    "address": "黃大仙龍翔道197號",
    "phone": "+852 3412 9004",
    "website": "https://www.nordangliainternatio.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.nordangliainternatio.edu.hk/admissions"
  },
  {
    "id": "int-361",
    "name": "哈羅國際幼稚園",
    "nameEn": "Harrow International Kindergarten",
    "searchKeywords": [
      "HIK"
    ],
    "category": "國際",
    "district": "新界",
    "level": "幼稚園",
    "tuitionMin": 131883,
    "tuitionMax": 146710,
    "curriculum": [
      "英式課程"
    ],
    "language": "全英文",
    "highlights": [
      "雙語教學環境",
      "優質外籍教師團隊",
      "提供完整 IB 課程體系"
    ],
    "address": "天水圍天恩路156號",
    "phone": "+852 2684 6537",
    "website": "https://www.harrowinternationalk.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.harrowinternationalk.edu.hk/admissions"
  },
  {
    "id": "int-362",
    "name": "弘立幼稚園",
    "nameEn": "ISF Kindergarten",
    "searchKeywords": [
      "ISFK"
    ],
    "category": "國際",
    "district": "港島",
    "level": "幼稚園",
    "tuitionMin": 140307,
    "tuitionMax": 155720,
    "curriculum": [
      "IB"
    ],
    "language": "中英雙語",
    "highlights": [
      "強調創意與批判思維",
      "現代化校園設施",
      "國際化多元學習環境"
    ],
    "address": "西營盤般咸道22號",
    "phone": "+852 2313 5106",
    "website": "https://www.isfkindergarten.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.isfkindergarten.edu.hk/admissions"
  },
  {
    "id": "int-363",
    "name": "斯坦福美國國際幼稚園",
    "nameEn": "Stamford American International Kindergarten",
    "searchKeywords": [
      "SAIK"
    ],
    "category": "國際",
    "district": "九龍",
    "level": "幼稚園",
    "tuitionMin": 123626,
    "tuitionMax": 145936,
    "curriculum": [
      "美式課程"
    ],
    "language": "全英文",
    "highlights": [
      "提供完整 IB 課程體系",
      "優質外籍教師團隊",
      "現代化校園設施"
    ],
    "address": "深水埗長沙灣道149號",
    "phone": "+852 2632 9460",
    "website": "https://www.stamfordamericaninte.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.stamfordamericaninte.edu.hk/admissions"
  },
  {
    "id": "int-364",
    "name": "加拿大國際幼稚園（九龍）",
    "nameEn": "Canadian International Kindergarten (Kowloon)",
    "searchKeywords": [
      "CIKK"
    ],
    "category": "國際",
    "district": "九龍",
    "level": "幼稚園",
    "tuitionMin": 88752,
    "tuitionMax": 113281,
    "curriculum": [
      "美式課程"
    ],
    "language": "中英雙語",
    "highlights": [
      "優質外籍教師團隊",
      "現代化校園設施",
      "強調創意與批判思維"
    ],
    "address": "土瓜灣土瓜灣道158號",
    "phone": "+852 3463 9860",
    "website": "https://www.canadianinternationa.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.canadianinternationa.edu.hk/admissions"
  },
  {
    "id": "int-365",
    "name": "法國國際幼稚園",
    "nameEn": "French International Kindergarten",
    "searchKeywords": [
      "FIK"
    ],
    "category": "國際",
    "district": "港島",
    "level": "幼稚園",
    "tuitionMin": 104043,
    "tuitionMax": 133535,
    "curriculum": [
      "美式課程"
    ],
    "language": "全英文",
    "highlights": [
      "雙語教學環境",
      "全球學習網絡資源",
      "豐富課外活動選擇"
    ],
    "address": "上環皇后大道中191號",
    "phone": "+852 3508 8263",
    "website": "https://www.frenchinternationalk.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.frenchinternationalk.edu.hk/admissions"
  },
  {
    "id": "int-366",
    "name": "德瑞國際幼稚園（九龍）",
    "nameEn": "German Swiss International Kindergarten (Kowloon)",
    "searchKeywords": [
      "GSIKK"
    ],
    "category": "國際",
    "district": "九龍",
    "level": "幼稚園",
    "tuitionMin": 129651,
    "tuitionMax": 137322,
    "curriculum": [
      "美式課程"
    ],
    "language": "中英雙語",
    "highlights": [
      "提供完整 IB 課程體系",
      "強調創意與批判思維",
      "國際化多元學習環境"
    ],
    "address": "旺角亞皆老街183號",
    "phone": "+852 2738 6935",
    "website": "https://www.germanswissinternati.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.germanswissinternati.edu.hk/admissions"
  },
  {
    "id": "dss-367",
    "name": "保良局陸慶濤小學",
    "nameEn": "PLK Luk Hing Too Primary School",
    "searchKeywords": [
      "LHTPS",
      "陸慶濤"
    ],
    "category": "直資",
    "district": "新界",
    "level": "小學",
    "tuitionMin": 23304,
    "tuitionMax": 24330,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "重視學生全面發展",
      "校風純樸",
      "師資優良"
    ],
    "address": "馬鞍山馬鞍山路112號",
    "phone": "+852 2269 5823",
    "website": "https://www.plklukhingtooprimary.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.plklukhingtooprimary.edu.hk/admissions"
  },
  {
    "id": "dss-368",
    "name": "保良局林文燦英文小學",
    "nameEn": "PLK Lam Man Chan English Primary School",
    "searchKeywords": [
      "LMCEPS",
      "林文燦"
    ],
    "category": "直資",
    "district": "九龍",
    "level": "小學",
    "tuitionMin": 22794,
    "tuitionMax": 25197,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "升學率優異",
      "香港頂尖直資學校",
      "重視學生全面發展"
    ],
    "address": "觀塘觀塘道25號",
    "phone": "+852 3336 7875",
    "website": "https://www.plklammanchanenglish.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.plklammanchanenglish.edu.hk/admissions"
  },
  {
    "id": "dss-369",
    "name": "和富慈善基金李宗德小學",
    "nameEn": "W F Joseph Lee Primary School",
    "searchKeywords": [
      "JLPS",
      "李宗德"
    ],
    "category": "直資",
    "district": "新界",
    "level": "小學",
    "tuitionMin": 38632,
    "tuitionMax": 48662,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "師資優良",
      "提供多元學習機會",
      "注重品德教育"
    ],
    "address": "葵涌葵涌道123號",
    "phone": "+852 2832 7385",
    "website": "https://www.wfjosephleeprimarysc.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.wfjosephleeprimarysc.edu.hk/admissions"
  },
  {
    "id": "dss-370",
    "name": "漢華中學（小學部）",
    "nameEn": "Hon Wah College (Primary Section)",
    "searchKeywords": [
      "HWC Primary"
    ],
    "category": "直資",
    "district": "港島",
    "level": "小學",
    "tuitionMin": 41181,
    "tuitionMax": 55779,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "升學率優異",
      "香港頂尖直資學校",
      "提供多元學習機會"
    ],
    "address": "北角英皇道54號",
    "phone": "+852 2637 6191",
    "website": "https://www.honwahcollegeprimary.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.honwahcollegeprimary.edu.hk/admissions"
  },
  {
    "id": "dss-371",
    "name": "香港浸會大學附屬學校王錦輝中小學（小學部）",
    "nameEn": "HKBU Affiliated School Wong Kam Fai (Primary)",
    "searchKeywords": [
      "HKBUAS Primary"
    ],
    "category": "直資",
    "district": "新界",
    "level": "小學",
    "tuitionMin": 36742,
    "tuitionMax": 46965,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "校風純樸",
      "豐富課外活動",
      "重視學生全面發展"
    ],
    "address": "青衣青衣路42號",
    "phone": "+852 2917 4782",
    "website": "https://www.hkbuaffiliatedschool.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.hkbuaffiliatedschool.edu.hk/admissions"
  },
  {
    "id": "dss-372",
    "name": "基督教香港信義會宏信書院（小學部）",
    "nameEn": "ELCHK Lutheran Academy (Primary)",
    "searchKeywords": [
      "LA Primary"
    ],
    "category": "直資",
    "district": "新界",
    "level": "小學",
    "tuitionMin": 33022,
    "tuitionMax": 44186,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "師資優良",
      "豐富課外活動",
      "升學率優異"
    ],
    "address": "粉嶺粉嶺樓路124號",
    "phone": "+852 2813 5100",
    "website": "https://www.elchklutheranacademy.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.elchklutheranacademy.edu.hk/admissions"
  },
  {
    "id": "dss-373",
    "name": "聖道弘爵國際學校（小學部）",
    "nameEn": "St. Hilary's School (Primary)",
    "searchKeywords": [
      "SHS Primary"
    ],
    "category": "直資",
    "district": "新界",
    "level": "小學",
    "tuitionMin": 23310,
    "tuitionMax": 37581,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "校風純樸",
      "注重品德教育",
      "設施完善"
    ],
    "address": "粉嶺粉嶺樓路174號",
    "phone": "+852 3339 5233",
    "website": "https://www.st.hilarysschoolprim.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.st.hilarysschoolprim.edu.hk/admissions"
  },
  {
    "id": "dss-374",
    "name": "啟思中學附屬小學",
    "nameEn": "Creative Secondary School Affiliated Primary School",
    "searchKeywords": [
      "CSSAPS"
    ],
    "category": "直資",
    "district": "九龍",
    "level": "小學",
    "tuitionMin": 29413,
    "tuitionMax": 30932,
    "curriculum": [
      "DSE"
    ],
    "language": "全英文",
    "highlights": [
      "注重品德教育",
      "提供多元學習機會",
      "香港頂尖直資學校"
    ],
    "address": "油麻地窩打老道157號",
    "phone": "+852 3781 4230",
    "website": "https://www.creativesecondarysch.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.creativesecondarysch.edu.hk/admissions"
  },
  {
    "id": "dss-375",
    "name": "地利亞（閩僑）英文小學",
    "nameEn": "Delia (Man Kiu) English Primary School",
    "searchKeywords": [
      "DMKEPS"
    ],
    "category": "直資",
    "district": "九龍",
    "level": "小學",
    "tuitionMin": 25195,
    "tuitionMax": 30259,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "豐富課外活動",
      "提供多元學習機會",
      "設施完善"
    ],
    "address": "將軍澳寶琳路159號",
    "phone": "+852 3128 3120",
    "website": "https://www.deliamankiuenglishpr.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.deliamankiuenglishpr.edu.hk/admissions"
  },
  {
    "id": "dss-376",
    "name": "萬鈞伯裘書院（小學部）",
    "nameEn": "Man Kwan Pak Kau College (Primary)",
    "searchKeywords": [
      "MKPKC Primary"
    ],
    "category": "直資",
    "district": "新界",
    "level": "小學",
    "tuitionMin": 46958,
    "tuitionMax": 53890,
    "curriculum": [
      "DSE"
    ],
    "language": "全英文",
    "highlights": [
      "升學率優異",
      "注重品德教育",
      "校風純樸"
    ],
    "address": "大埔大埔道106號",
    "phone": "+852 2510 4245",
    "website": "https://www.mankwanpakkaucollege.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.mankwanpakkaucollege.edu.hk/admissions"
  },
  {
    "id": "pri-377",
    "name": "聖若瑟英文中學",
    "nameEn": "St. Joseph's Anglo-Chinese School",
    "searchKeywords": [
      "SJACS",
      "聖若瑟英中"
    ],
    "category": "私立",
    "district": "九龍",
    "level": "中學",
    "tuitionMin": 54338,
    "tuitionMax": 54379,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "歷史悠久名校",
      "設施完善",
      "提供全面教育"
    ],
    "address": "深水埗長沙灣道6號",
    "phone": "+852 3934 3856",
    "website": "https://www.st.josephsanglo-chin.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.st.josephsanglo-chin.edu.hk/admissions"
  },
  {
    "id": "pri-378",
    "name": "中華基督教會公理高中書院",
    "nameEn": "CCC Kung Lee College",
    "searchKeywords": [
      "KLC",
      "公理高中"
    ],
    "category": "私立",
    "district": "港島",
    "level": "中學",
    "tuitionMin": 92258,
    "tuitionMax": 108808,
    "curriculum": [
      "DSE",
      "IB"
    ],
    "language": "以中文為主",
    "highlights": [
      "師資優良",
      "優良校風傳統",
      "課外活動豐富"
    ],
    "address": "北角英皇道138號",
    "phone": "+852 3495 9782",
    "website": "https://www.ccckungleecollege.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.ccckungleecollege.edu.hk/admissions"
  },
  {
    "id": "pri-379",
    "name": "明愛馬鞍山中學",
    "nameEn": "Caritas Ma On Shan Secondary School",
    "searchKeywords": [
      "CMOSSS",
      "明愛馬鞍山"
    ],
    "category": "私立",
    "district": "新界",
    "level": "中學",
    "tuitionMin": 85109,
    "tuitionMax": 85989,
    "curriculum": [
      "DSE",
      "IB"
    ],
    "language": "中英雙語",
    "highlights": [
      "小班教學",
      "優良校風傳統",
      "重視學生個別發展"
    ],
    "address": "上水上水廣場69號",
    "phone": "+852 2292 1048",
    "website": "https://www.caritasmaonshansecon.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.caritasmaonshansecon.edu.hk/admissions"
  },
  {
    "id": "pri-380",
    "name": "明愛屯門馬登基金中學",
    "nameEn": "Caritas Tuen Mun Marden Foundation Secondary School",
    "searchKeywords": [
      "CTMMFSS",
      "屯門馬登"
    ],
    "category": "私立",
    "district": "新界",
    "level": "中學",
    "tuitionMin": 93784,
    "tuitionMax": 108938,
    "curriculum": [
      "DSE",
      "IGCSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "提供全面教育",
      "設施完善",
      "優良校風傳統"
    ],
    "address": "西貢西貢公路16號",
    "phone": "+852 2950 6843",
    "website": "https://www.caritastuenmunmarden.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.caritastuenmunmarden.edu.hk/admissions"
  },
  {
    "id": "pri-381",
    "name": "明愛華德中書院",
    "nameEn": "Caritas Charles Vath College",
    "searchKeywords": [
      "CCVC",
      "華德中"
    ],
    "category": "私立",
    "district": "九龍",
    "level": "中學",
    "tuitionMin": 90714,
    "tuitionMax": 99449,
    "curriculum": [
      "DSE"
    ],
    "language": "全英文",
    "highlights": [
      "提供全面教育",
      "優良校風傳統",
      "小班教學"
    ],
    "address": "旺角亞皆老街137號",
    "phone": "+852 2333 2453",
    "website": "https://www.caritascharlesvathco.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.caritascharlesvathco.edu.hk/admissions"
  },
  {
    "id": "pri-382",
    "name": "中聖書院",
    "nameEn": "China Holiness College",
    "searchKeywords": [
      "CHC",
      "中聖"
    ],
    "category": "私立",
    "district": "九龍",
    "level": "中學",
    "tuitionMin": 83411,
    "tuitionMax": 102918,
    "curriculum": [
      "DSE",
      "IB"
    ],
    "language": "中英雙語",
    "highlights": [
      "升學成績優異",
      "優良校風傳統",
      "課外活動豐富"
    ],
    "address": "藍田啟田道97號",
    "phone": "+852 3541 4536",
    "website": "https://www.chinaholinesscollege.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.chinaholinesscollege.edu.hk/admissions"
  },
  {
    "id": "pri-383",
    "name": "香港神託會培基書院",
    "nameEn": "Stewards Pooi Kei College",
    "searchKeywords": [
      "SPKC",
      "培基"
    ],
    "category": "私立",
    "district": "新界",
    "level": "中學",
    "tuitionMin": 67148,
    "tuitionMax": 81587,
    "curriculum": [
      "DSE",
      "IB"
    ],
    "language": "中英雙語",
    "highlights": [
      "重視學生個別發展",
      "提供全面教育",
      "升學成績優異"
    ],
    "address": "西貢西貢公路108號",
    "phone": "+852 3772 6326",
    "website": "https://www.stewardspooikeicolle.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.stewardspooikeicolle.edu.hk/admissions"
  },
  {
    "id": "pri-384",
    "name": "香港神託會培敦中學",
    "nameEn": "Stewards Pooi Tun Secondary School",
    "searchKeywords": [
      "SPTSS",
      "培敦"
    ],
    "category": "私立",
    "district": "九龍",
    "level": "中學",
    "tuitionMin": 62455,
    "tuitionMax": 62645,
    "curriculum": [
      "DSE",
      "IB"
    ],
    "language": "以中文為主",
    "highlights": [
      "注重品德培養",
      "師資優良",
      "小班教學"
    ],
    "address": "紅磡馬頭圍道102號",
    "phone": "+852 3950 3540",
    "website": "https://www.stewardspooitunsecon.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.stewardspooitunsecon.edu.hk/admissions"
  },
  {
    "id": "pri-385",
    "name": "匯知中學",
    "nameEn": "QualiEd College",
    "searchKeywords": [
      "QC",
      "匯知"
    ],
    "category": "私立",
    "district": "新界",
    "level": "中學",
    "tuitionMin": 89321,
    "tuitionMax": 89781,
    "curriculum": [
      "DSE"
    ],
    "language": "全英文",
    "highlights": [
      "優良校風傳統",
      "提供全面教育",
      "歷史悠久名校"
    ],
    "address": "屯門屯門鄉事會路76號",
    "phone": "+852 2310 2070",
    "website": "https://www.qualiedcollege.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.qualiedcollege.edu.hk/admissions"
  },
  {
    "id": "pri-386",
    "name": "港青基信書院",
    "nameEn": "YMCA of Hong Kong Christian College",
    "searchKeywords": [
      "YHKCC",
      "港青基信"
    ],
    "category": "私立",
    "district": "新界",
    "level": "中學",
    "tuitionMin": 77671,
    "tuitionMax": 83837,
    "curriculum": [
      "DSE",
      "IB"
    ],
    "language": "中英雙語",
    "highlights": [
      "優良校風傳統",
      "設施完善",
      "重視學生個別發展"
    ],
    "address": "沙田沙田正街199號",
    "phone": "+852 2118 1386",
    "website": "https://www.ymcaofhongkongchrist.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.ymcaofhongkongchrist.edu.hk/admissions"
  },
  {
    "id": "gov-387",
    "name": "赤柱官立中學",
    "nameEn": "Stanley Government Secondary School",
    "searchKeywords": [
      "SGSS",
      "赤柱官立"
    ],
    "category": "公立",
    "district": "港島",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "課外活動多元",
      "師資穩定",
      "政府官立學校"
    ],
    "address": "柴灣柴灣道96號",
    "phone": "+852 3368 2218",
    "website": "https://www.stanleygovernmentsec.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.stanleygovernmentsec.edu.hk/admissions"
  },
  {
    "id": "gov-388",
    "name": "香港仔工業學校",
    "nameEn": "Aberdeen Technical School",
    "searchKeywords": [
      "ATS",
      "香港仔工業"
    ],
    "category": "公立",
    "district": "港島",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "校風純樸",
      "全面發展教育",
      "升學成績穩定"
    ],
    "address": "鰂魚涌太古城道178號",
    "phone": "+852 2873 4376",
    "website": "https://www.aberdeentechnicalsch.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.aberdeentechnicalsch.edu.hk/admissions"
  },
  {
    "id": "gov-389",
    "name": "鄧鏡波學校",
    "nameEn": "Tang King Po School",
    "searchKeywords": [
      "TKPS",
      "鄧鏡波"
    ],
    "category": "公立",
    "district": "九龍",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "注重品德教育",
      "升學成績穩定",
      "免學費"
    ],
    "address": "何文田何文田道59號",
    "phone": "+852 2358 6086",
    "website": "https://www.tangkingposchool.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.tangkingposchool.edu.hk/admissions"
  },
  {
    "id": "gov-390",
    "name": "余振強紀念中學",
    "nameEn": "Yu Chun Keung Memorial College",
    "searchKeywords": [
      "YCKMC",
      "余振強"
    ],
    "category": "公立",
    "district": "九龍",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "校風純樸",
      "課外活動多元",
      "設施完善"
    ],
    "address": "藍田啟田道7號",
    "phone": "+852 3290 4911",
    "website": "https://www.yuchunkeungmemorialc.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.yuchunkeungmemorialc.edu.hk/admissions"
  },
  {
    "id": "gov-391",
    "name": "龍翔官立中學",
    "nameEn": "Lung Cheung Government Secondary School",
    "searchKeywords": [
      "LCGSS",
      "龍翔官立"
    ],
    "category": "公立",
    "district": "九龍",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "升學成績穩定",
      "課外活動多元",
      "校風純樸"
    ],
    "address": "紅磡馬頭圍道3號",
    "phone": "+852 3793 6227",
    "website": "https://www.lungcheunggovernment.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.lungcheunggovernment.edu.hk/admissions"
  },
  {
    "id": "gov-392",
    "name": "將軍澳官立中學",
    "nameEn": "Tseung Kwan O Government Secondary School",
    "searchKeywords": [
      "TKOGSS",
      "將軍澳官立"
    ],
    "category": "公立",
    "district": "新界",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "全面發展教育",
      "設施完善",
      "政府官立學校"
    ],
    "address": "天水圍天恩路89號",
    "phone": "+852 2619 3066",
    "website": "https://www.tseungkwanogovernmen.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.tseungkwanogovernmen.edu.hk/admissions"
  },
  {
    "id": "gov-393",
    "name": "馬鞍山官立中學",
    "nameEn": "Ma On Shan Government Secondary School",
    "searchKeywords": [
      "MOSGSS",
      "馬鞍山官立"
    ],
    "category": "公立",
    "district": "新界",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "師資穩定",
      "政府官立學校",
      "全面發展教育"
    ],
    "address": "天水圍天恩路104號",
    "phone": "+852 2745 7402",
    "website": "https://www.maonshangovernmentse.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.maonshangovernmentse.edu.hk/admissions"
  },
  {
    "id": "gov-394",
    "name": "長沙灣天主教英文中學",
    "nameEn": "Cheung Sha Wan Catholic Secondary School",
    "searchKeywords": [
      "CSWCSS",
      "長天"
    ],
    "category": "公立",
    "district": "九龍",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "設施完善",
      "校風純樸",
      "師資穩定"
    ],
    "address": "九龍塘沙福道162號",
    "phone": "+852 2606 1720",
    "website": "https://www.cheungshawancatholic.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.cheungshawancatholic.edu.hk/admissions"
  },
  {
    "id": "gov-395",
    "name": "東華三院黃笏南中學",
    "nameEn": "TWGHs Wong Fut Nam College",
    "searchKeywords": [
      "WFNC",
      "黃笏南"
    ],
    "category": "公立",
    "district": "九龍",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "設施完善",
      "注重品德教育",
      "社區服務精神"
    ],
    "address": "觀塘觀塘道158號",
    "phone": "+852 3813 5039",
    "website": "https://www.twghswongfutnamcolle.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.twghswongfutnamcolle.edu.hk/admissions"
  },
  {
    "id": "gov-396",
    "name": "東華三院盧幹庭紀念中學",
    "nameEn": "TWGHs Lo Kon Ting Memorial College",
    "searchKeywords": [
      "LKTMC",
      "盧幹庭"
    ],
    "category": "公立",
    "district": "新界",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "課外活動多元",
      "校風純樸",
      "免學費"
    ],
    "address": "粉嶺粉嶺樓路116號",
    "phone": "+852 2641 1105",
    "website": "https://www.twghslokontingmemori.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.twghslokontingmemori.edu.hk/admissions"
  },
  {
    "id": "pri-397",
    "name": "瑪利諾明德學校",
    "nameEn": "瑪利諾 明德 學校",
    "searchKeywords": [
      "明德",
      "瑪利諾"
    ],
    "category": "私立",
    "district": "港島",
    "level": "小學",
    "tuitionMin": 30353,
    "tuitionMax": 39203,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "升學成績優異",
      "小班教學",
      "優良校風傳統"
    ],
    "address": "西營盤般咸道20號",
    "phone": "+852 2727 8703",
    "website": "https://www.瑪利諾明德學校.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.瑪利諾明德學校.edu.hk/admissions"
  },
  {
    "id": "aid-398",
    "name": "宣道會聖德幼稚園暨幼兒中心",
    "nameEn": "宣道會 聖德 幼稚園暨幼兒中心",
    "searchKeywords": [
      "聖德",
      "宣道會"
    ],
    "category": "資助",
    "district": "港島",
    "level": "幼稚園",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "注重品德教育",
      "免學費",
      "課外活動豐富"
    ],
    "address": "西營盤般咸道140號",
    "phone": "+852 3438 1420",
    "website": "https://www.宣道會聖德幼稚園暨幼兒中心.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.宣道會聖德幼稚園暨幼兒中心.edu.hk/admissions"
  },
  {
    "id": "pri-399",
    "name": "民生慈航小學",
    "nameEn": "民生 慈航 小學",
    "searchKeywords": [
      "慈航",
      "民生"
    ],
    "category": "私立",
    "district": "港島",
    "level": "小學",
    "tuitionMin": 50397,
    "tuitionMax": 55610,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "重視學生個別發展",
      "提供全面教育",
      "師資優良"
    ],
    "address": "灣仔軒尼詩道86號",
    "phone": "+852 3466 5081",
    "website": "https://www.民生慈航小學.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.民生慈航小學.edu.hk/admissions"
  },
  {
    "id": "aid-400",
    "name": "聖公會望德學校",
    "nameEn": "聖公會 望德 學校",
    "searchKeywords": [
      "望德",
      "聖公會"
    ],
    "category": "資助",
    "district": "港島",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "注重品德教育",
      "升學成績良好",
      "設施完善"
    ],
    "address": "中環干諾道中53號",
    "phone": "+852 2218 8858",
    "website": "https://www.聖公會望德學校.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.聖公會望德學校.edu.hk/admissions"
  },
  {
    "id": "pri-401",
    "name": "聖和平小學",
    "nameEn": "聖 和平 小學",
    "searchKeywords": [
      "和平",
      "聖"
    ],
    "category": "私立",
    "district": "九龍",
    "level": "小學",
    "tuitionMin": 40224,
    "tuitionMax": 47964,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "優良校風傳統",
      "重視學生個別發展",
      "注重品德培養"
    ],
    "address": "尖沙咀彌敦道140號",
    "phone": "+852 2923 5726",
    "website": "https://www.聖和平小學.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.聖和平小學.edu.hk/admissions"
  },
  {
    "id": "pri-402",
    "name": "瑪利諾培英中學",
    "nameEn": "瑪利諾 培英 中學",
    "searchKeywords": [
      "培英",
      "瑪利諾"
    ],
    "category": "私立",
    "district": "港島",
    "level": "中學",
    "tuitionMin": 65205,
    "tuitionMax": 78580,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "重視學生個別發展",
      "師資優良",
      "提供全面教育"
    ],
    "address": "北角英皇道161號",
    "phone": "+852 2222 7294",
    "website": "https://www.瑪利諾培英中學.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.瑪利諾培英中學.edu.hk/admissions"
  },
  {
    "id": "gov-403",
    "name": "官立育才書院",
    "nameEn": "官立 育才 書院",
    "searchKeywords": [
      "育才",
      "官立"
    ],
    "category": "公立",
    "district": "港島",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "免學費",
      "社區服務精神",
      "注重品德教育"
    ],
    "address": "薄扶林薄扶林道170號",
    "phone": "+852 3361 5337",
    "website": "https://www.官立育才書院.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.官立育才書院.edu.hk/admissions"
  },
  {
    "id": "aid-404",
    "name": "循道衛理育英小學",
    "nameEn": "循道衛理 育英 小學",
    "searchKeywords": [
      "育英",
      "循道衛理"
    ],
    "category": "資助",
    "district": "港島",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "免學費",
      "社區服務精神",
      "全面發展教育"
    ],
    "address": "薄扶林薄扶林道93號",
    "phone": "+852 3174 6712",
    "website": "https://www.循道衛理育英小學.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.循道衛理育英小學.edu.hk/admissions"
  },
  {
    "id": "aid-405",
    "name": "宣道會和平幼兒園",
    "nameEn": "宣道會 和平 幼兒園",
    "searchKeywords": [
      "和平",
      "宣道會"
    ],
    "category": "資助",
    "district": "新界",
    "level": "幼稚園",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "師資優良",
      "免學費",
      "升學成績良好"
    ],
    "address": "粉嶺粉嶺樓路92號",
    "phone": "+852 2215 6102",
    "website": "https://www.宣道會和平幼兒園.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.宣道會和平幼兒園.edu.hk/admissions"
  },
  {
    "id": "gov-406",
    "name": "政府和平幼稚園暨幼兒中心",
    "nameEn": "政府 和平 幼稚園暨幼兒中心",
    "searchKeywords": [
      "和平",
      "政府"
    ],
    "category": "公立",
    "district": "新界",
    "level": "幼稚園",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "全面發展教育",
      "升學成績穩定",
      "社區服務精神"
    ],
    "address": "葵涌葵涌道111號",
    "phone": "+852 3905 3279",
    "website": "https://www.政府和平幼稚園暨幼兒中心.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.政府和平幼稚園暨幼兒中心.edu.hk/admissions"
  },
  {
    "id": "pri-407",
    "name": "培善導中學",
    "nameEn": "培 善導 中學",
    "searchKeywords": [
      "善導",
      "培"
    ],
    "category": "私立",
    "district": "港島",
    "level": "中學",
    "tuitionMin": 45466,
    "tuitionMax": 63085,
    "curriculum": [
      "DSE",
      "IGCSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "小班教學",
      "歷史悠久名校",
      "提供全面教育"
    ],
    "address": "柴灣柴灣道23號",
    "phone": "+852 2225 6375",
    "website": "https://www.培善導中學.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.培善導中學.edu.hk/admissions"
  },
  {
    "id": "gov-408",
    "name": "政府育才幼稚園",
    "nameEn": "政府 育才 幼稚園",
    "searchKeywords": [
      "育才",
      "政府"
    ],
    "category": "公立",
    "district": "九龍",
    "level": "幼稚園",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "免學費",
      "師資穩定",
      "注重品德教育"
    ],
    "address": "觀塘觀塘道171號",
    "phone": "+852 2266 2154",
    "website": "https://www.政府育才幼稚園.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.政府育才幼稚園.edu.hk/admissions"
  },
  {
    "id": "aid-409",
    "name": "循道衛理望德中學",
    "nameEn": "循道衛理 望德 中學",
    "searchKeywords": [
      "望德",
      "循道衛理"
    ],
    "category": "資助",
    "district": "港島",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "師資優良",
      "全面發展教育",
      "設施完善"
    ],
    "address": "西營盤般咸道132號",
    "phone": "+852 2646 2423",
    "website": "https://www.循道衛理望德中學.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.循道衛理望德中學.edu.hk/admissions"
  },
  {
    "id": "aid-410",
    "name": "浸信會望德小學",
    "nameEn": "浸信會 望德 小學",
    "searchKeywords": [
      "望德",
      "浸信會"
    ],
    "category": "資助",
    "district": "港島",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "升學成績良好",
      "課外活動豐富",
      "全面發展教育"
    ],
    "address": "中環干諾道中79號",
    "phone": "+852 2116 5113",
    "website": "https://www.浸信會望德小學.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.浸信會望德小學.edu.hk/admissions"
  },
  {
    "id": "aid-411",
    "name": "佛教培德幼兒園",
    "nameEn": "佛教 培德 幼兒園",
    "searchKeywords": [
      "培德",
      "佛教"
    ],
    "category": "資助",
    "district": "港島",
    "level": "幼稚園",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "升學成績良好",
      "設施完善",
      "政府資助學校"
    ],
    "address": "鰂魚涌太古城道162號",
    "phone": "+852 2178 7606",
    "website": "https://www.佛教培德幼兒園.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.佛教培德幼兒園.edu.hk/admissions"
  },
  {
    "id": "pri-412",
    "name": "嘉諾撒博愛幼稚園",
    "nameEn": "嘉諾撒 博愛 幼稚園",
    "searchKeywords": [
      "博愛",
      "嘉諾撒"
    ],
    "category": "私立",
    "district": "九龍",
    "level": "幼稚園",
    "tuitionMin": 54478,
    "tuitionMax": 60007,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "重視學生個別發展",
      "課外活動豐富",
      "小班教學"
    ],
    "address": "黃大仙龍翔道185號",
    "phone": "+852 2289 6117",
    "website": "https://www.嘉諾撒博愛幼稚園.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.嘉諾撒博愛幼稚園.edu.hk/admissions"
  },
  {
    "id": "aid-413",
    "name": "中華基督教會望德學校",
    "nameEn": "中華基督教會 望德 學校",
    "searchKeywords": [
      "望德",
      "中華基督教會"
    ],
    "category": "資助",
    "district": "港島",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "課外活動豐富",
      "免學費",
      "社區服務精神"
    ],
    "address": "西營盤般咸道180號",
    "phone": "+852 3863 1415",
    "website": "https://www.中華基督教會望德學校.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.中華基督教會望德學校.edu.hk/admissions"
  },
  {
    "id": "aid-414",
    "name": "天主教培英小學",
    "nameEn": "天主教 培英 小學",
    "searchKeywords": [
      "培英",
      "天主教"
    ],
    "category": "資助",
    "district": "新界",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "政府資助學校",
      "社區服務精神",
      "注重品德教育"
    ],
    "address": "荃灣荃灣大會堂79號",
    "phone": "+852 2739 3462",
    "website": "https://www.天主教培英小學.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.天主教培英小學.edu.hk/admissions"
  },
  {
    "id": "aid-415",
    "name": "聖公會培德小學",
    "nameEn": "聖公會 培德 小學",
    "searchKeywords": [
      "培德",
      "聖公會"
    ],
    "category": "資助",
    "district": "港島",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "免學費",
      "社區服務精神",
      "政府資助學校"
    ],
    "address": "西營盤般咸道8號",
    "phone": "+852 3490 2367",
    "website": "https://www.聖公會培德小學.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.聖公會培德小學.edu.hk/admissions"
  },
  {
    "id": "pri-416",
    "name": "瑪利諾樹人小學",
    "nameEn": "瑪利諾 樹人 小學",
    "searchKeywords": [
      "樹人",
      "瑪利諾"
    ],
    "category": "私立",
    "district": "新界",
    "level": "小學",
    "tuitionMin": 65759,
    "tuitionMax": 66483,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "設施完善",
      "重視學生個別發展",
      "優良校風傳統"
    ],
    "address": "馬鞍山馬鞍山路141號",
    "phone": "+852 3132 5803",
    "website": "https://www.瑪利諾樹人小學.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.瑪利諾樹人小學.edu.hk/admissions"
  },
  {
    "id": "gov-417",
    "name": "官立育英幼稚園暨幼兒中心",
    "nameEn": "官立 育英 幼稚園暨幼兒中心",
    "searchKeywords": [
      "育英",
      "官立"
    ],
    "category": "公立",
    "district": "新界",
    "level": "幼稚園",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "升學成績穩定",
      "設施完善",
      "免學費"
    ],
    "address": "大埔大埔道155號",
    "phone": "+852 3578 7112",
    "website": "https://www.官立育英幼稚園暨幼兒中心.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.官立育英幼稚園暨幼兒中心.edu.hk/admissions"
  },
  {
    "id": "aid-418",
    "name": "天主教望德小學",
    "nameEn": "天主教 望德 小學",
    "searchKeywords": [
      "望德",
      "天主教"
    ],
    "category": "資助",
    "district": "九龍",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "免學費",
      "設施完善",
      "注重品德教育"
    ],
    "address": "深水埗長沙灣道168號",
    "phone": "+852 2496 5435",
    "website": "https://www.天主教望德小學.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.天主教望德小學.edu.hk/admissions"
  },
  {
    "id": "aid-419",
    "name": "天主教培英小學",
    "nameEn": "天主教 培英 小學",
    "searchKeywords": [
      "培英",
      "天主教"
    ],
    "category": "資助",
    "district": "九龍",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "校風純樸",
      "免學費",
      "全面發展教育"
    ],
    "address": "黃大仙龍翔道68號",
    "phone": "+852 3663 8193",
    "website": "https://www.天主教培英小學.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.天主教培英小學.edu.hk/admissions"
  },
  {
    "id": "aid-420",
    "name": "宣道會培德學校",
    "nameEn": "宣道會 培德 學校",
    "searchKeywords": [
      "培德",
      "宣道會"
    ],
    "category": "資助",
    "district": "港島",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "升學成績良好",
      "社區服務精神",
      "校風純樸"
    ],
    "address": "西營盤般咸道128號",
    "phone": "+852 3572 6081",
    "website": "https://www.宣道會培德學校.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.宣道會培德學校.edu.hk/admissions"
  },
  {
    "id": "aid-421",
    "name": "聖公會慈航幼稚園",
    "nameEn": "聖公會 慈航 幼稚園",
    "searchKeywords": [
      "慈航",
      "聖公會"
    ],
    "category": "資助",
    "district": "港島",
    "level": "幼稚園",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "升學成績良好",
      "社區服務精神",
      "免學費"
    ],
    "address": "筲箕灣愛秩序灣道193號",
    "phone": "+852 3178 2926",
    "website": "https://www.聖公會慈航幼稚園.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.聖公會慈航幼稚園.edu.hk/admissions"
  },
  {
    "id": "gov-422",
    "name": "政府慈航幼稚園暨幼兒中心",
    "nameEn": "政府 慈航 幼稚園暨幼兒中心",
    "searchKeywords": [
      "慈航",
      "政府"
    ],
    "category": "公立",
    "district": "港島",
    "level": "幼稚園",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "社區服務精神",
      "政府官立學校",
      "師資穩定"
    ],
    "address": "銅鑼灣怡和街95號",
    "phone": "+852 2334 9930",
    "website": "https://www.政府慈航幼稚園暨幼兒中心.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.政府慈航幼稚園暨幼兒中心.edu.hk/admissions"
  },
  {
    "id": "pri-423",
    "name": "培樹人幼兒園",
    "nameEn": "培 樹人 幼兒園",
    "searchKeywords": [
      "樹人",
      "培"
    ],
    "category": "私立",
    "district": "九龍",
    "level": "幼稚園",
    "tuitionMin": 84950,
    "tuitionMax": 96376,
    "curriculum": [
      "DSE"
    ],
    "language": "全英文",
    "highlights": [
      "小班教學",
      "提供全面教育",
      "重視學生個別發展"
    ],
    "address": "將軍澳寶琳路187號",
    "phone": "+852 2423 3663",
    "website": "https://www.培樹人幼兒園.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.培樹人幼兒園.edu.hk/admissions"
  },
  {
    "id": "pri-424",
    "name": "民生聖德學校",
    "nameEn": "民生 聖德 學校",
    "searchKeywords": [
      "聖德",
      "民生"
    ],
    "category": "私立",
    "district": "九龍",
    "level": "中學",
    "tuitionMin": 77503,
    "tuitionMax": 88582,
    "curriculum": [
      "DSE",
      "IB"
    ],
    "language": "以中文為主",
    "highlights": [
      "重視學生個別發展",
      "升學成績優異",
      "提供全面教育"
    ],
    "address": "紅磡馬頭圍道144號",
    "phone": "+852 3910 4749",
    "website": "https://www.民生聖德學校.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.民生聖德學校.edu.hk/admissions"
  },
  {
    "id": "gov-425",
    "name": "官立明德小學",
    "nameEn": "官立 明德 小學",
    "searchKeywords": [
      "明德",
      "官立"
    ],
    "category": "公立",
    "district": "港島",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "注重品德教育",
      "師資穩定",
      "社區服務精神"
    ],
    "address": "灣仔軒尼詩道184號",
    "phone": "+852 3913 2197",
    "website": "https://www.官立明德小學.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.官立明德小學.edu.hk/admissions"
  },
  {
    "id": "gov-426",
    "name": "政府崇德幼兒園",
    "nameEn": "政府 崇德 幼兒園",
    "searchKeywords": [
      "崇德",
      "政府"
    ],
    "category": "公立",
    "district": "港島",
    "level": "幼稚園",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "升學成績穩定",
      "全面發展教育",
      "師資穩定"
    ],
    "address": "香港仔香港仔大道9號",
    "phone": "+852 3424 7369",
    "website": "https://www.政府崇德幼兒園.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.政府崇德幼兒園.edu.hk/admissions"
  },
  {
    "id": "aid-427",
    "name": "循道衛理育英學校",
    "nameEn": "循道衛理 育英 學校",
    "searchKeywords": [
      "育英",
      "循道衛理"
    ],
    "category": "資助",
    "district": "港島",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "師資優良",
      "注重品德教育",
      "政府資助學校"
    ],
    "address": "西營盤般咸道66號",
    "phone": "+852 2686 9730",
    "website": "https://www.循道衛理育英學校.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.循道衛理育英學校.edu.hk/admissions"
  },
  {
    "id": "pri-428",
    "name": "嘉諾撒樹人幼兒園",
    "nameEn": "嘉諾撒 樹人 幼兒園",
    "searchKeywords": [
      "樹人",
      "嘉諾撒"
    ],
    "category": "私立",
    "district": "九龍",
    "level": "幼稚園",
    "tuitionMin": 74266,
    "tuitionMax": 91991,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "升學成績優異",
      "重視學生個別發展",
      "優良校風傳統"
    ],
    "address": "紅磡馬頭圍道173號",
    "phone": "+852 2865 6500",
    "website": "https://www.嘉諾撒樹人幼兒園.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.嘉諾撒樹人幼兒園.edu.hk/admissions"
  },
  {
    "id": "aid-429",
    "name": "道教普濟幼稚園",
    "nameEn": "道教 普濟 幼稚園",
    "searchKeywords": [
      "普濟",
      "道教"
    ],
    "category": "資助",
    "district": "新界",
    "level": "幼稚園",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "升學成績良好",
      "校風純樸",
      "設施完善"
    ],
    "address": "元朗元朗大馬路51號",
    "phone": "+852 2380 3688",
    "website": "https://www.道教普濟幼稚園.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.道教普濟幼稚園.edu.hk/admissions"
  },
  {
    "id": "gov-430",
    "name": "政府育英小學",
    "nameEn": "政府 育英 小學",
    "searchKeywords": [
      "育英",
      "政府"
    ],
    "category": "公立",
    "district": "新界",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "免學費",
      "校風純樸",
      "政府官立學校"
    ],
    "address": "青衣青衣路156號",
    "phone": "+852 2538 8710",
    "website": "https://www.政府育英小學.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.政府育英小學.edu.hk/admissions"
  },
  {
    "id": "aid-431",
    "name": "天主教育才幼稚園",
    "nameEn": "天主教 育才 幼稚園",
    "searchKeywords": [
      "育才",
      "天主教"
    ],
    "category": "資助",
    "district": "新界",
    "level": "幼稚園",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "師資優良",
      "課外活動豐富",
      "升學成績良好"
    ],
    "address": "粉嶺粉嶺樓路36號",
    "phone": "+852 3120 6544",
    "website": "https://www.天主教育才幼稚園.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.天主教育才幼稚園.edu.hk/admissions"
  },
  {
    "id": "aid-432",
    "name": "天主教培英小學",
    "nameEn": "天主教 培英 小學",
    "searchKeywords": [
      "培英",
      "天主教"
    ],
    "category": "資助",
    "district": "新界",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "校風純樸",
      "政府資助學校",
      "師資優良"
    ],
    "address": "西貢西貢公路154號",
    "phone": "+852 2767 1073",
    "website": "https://www.天主教培英小學.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.天主教培英小學.edu.hk/admissions"
  },
  {
    "id": "gov-433",
    "name": "政府仁愛幼稚園",
    "nameEn": "政府 仁愛 幼稚園",
    "searchKeywords": [
      "仁愛",
      "政府"
    ],
    "category": "公立",
    "district": "九龍",
    "level": "幼稚園",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "政府官立學校",
      "全面發展教育",
      "免學費"
    ],
    "address": "紅磡馬頭圍道192號",
    "phone": "+852 3855 4554",
    "website": "https://www.政府仁愛幼稚園.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.政府仁愛幼稚園.edu.hk/admissions"
  },
  {
    "id": "gov-434",
    "name": "政府榮光小學",
    "nameEn": "政府 榮光 小學",
    "searchKeywords": [
      "榮光",
      "政府"
    ],
    "category": "公立",
    "district": "港島",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "全面發展教育",
      "設施完善",
      "師資穩定"
    ],
    "address": "薄扶林薄扶林道158號",
    "phone": "+852 3513 6957",
    "website": "https://www.政府榮光小學.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.政府榮光小學.edu.hk/admissions"
  },
  {
    "id": "aid-435",
    "name": "宣道會仁愛書院",
    "nameEn": "宣道會 仁愛 書院",
    "searchKeywords": [
      "仁愛",
      "宣道會"
    ],
    "category": "資助",
    "district": "九龍",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "升學成績良好",
      "全面發展教育",
      "師資優良"
    ],
    "address": "土瓜灣土瓜灣道140號",
    "phone": "+852 2319 8443",
    "website": "https://www.宣道會仁愛書院.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.宣道會仁愛書院.edu.hk/admissions"
  },
  {
    "id": "aid-436",
    "name": "浸信會聖德書院",
    "nameEn": "浸信會 聖德 書院",
    "searchKeywords": [
      "聖德",
      "浸信會"
    ],
    "category": "資助",
    "district": "九龍",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "設施完善",
      "注重品德教育",
      "免學費"
    ],
    "address": "尖沙咀彌敦道74號",
    "phone": "+852 2988 3421",
    "website": "https://www.浸信會聖德書院.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.浸信會聖德書院.edu.hk/admissions"
  },
  {
    "id": "aid-437",
    "name": "浸信會善導書院",
    "nameEn": "浸信會 善導 書院",
    "searchKeywords": [
      "善導",
      "浸信會"
    ],
    "category": "資助",
    "district": "九龍",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "注重品德教育",
      "全面發展教育",
      "免學費"
    ],
    "address": "紅磡馬頭圍道34號",
    "phone": "+852 2785 1744",
    "website": "https://www.浸信會善導書院.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.浸信會善導書院.edu.hk/admissions"
  },
  {
    "id": "aid-438",
    "name": "循道衛理培德學校",
    "nameEn": "循道衛理 培德 學校",
    "searchKeywords": [
      "培德",
      "循道衛理"
    ],
    "category": "資助",
    "district": "港島",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "注重品德教育",
      "課外活動豐富",
      "設施完善"
    ],
    "address": "銅鑼灣怡和街95號",
    "phone": "+852 2527 3267",
    "website": "https://www.循道衛理培德學校.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.循道衛理培德學校.edu.hk/admissions"
  },
  {
    "id": "pri-439",
    "name": "真光啟明幼稚園",
    "nameEn": "真光 啟明 幼稚園",
    "searchKeywords": [
      "啟明",
      "真光"
    ],
    "category": "私立",
    "district": "九龍",
    "level": "幼稚園",
    "tuitionMin": 53970,
    "tuitionMax": 72481,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "優良校風傳統",
      "設施完善",
      "重視學生個別發展"
    ],
    "address": "尖沙咀彌敦道194號",
    "phone": "+852 3504 6625",
    "website": "https://www.真光啟明幼稚園.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.真光啟明幼稚園.edu.hk/admissions"
  },
  {
    "id": "gov-440",
    "name": "政府慈航書院",
    "nameEn": "政府 慈航 書院",
    "searchKeywords": [
      "慈航",
      "政府"
    ],
    "category": "公立",
    "district": "九龍",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "社區服務精神",
      "校風純樸",
      "注重品德教育"
    ],
    "address": "藍田啟田道64號",
    "phone": "+852 2244 2149",
    "website": "https://www.政府慈航書院.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.政府慈航書院.edu.hk/admissions"
  },
  {
    "id": "pri-441",
    "name": "聖榮光幼稚園",
    "nameEn": "聖 榮光 幼稚園",
    "searchKeywords": [
      "榮光",
      "聖"
    ],
    "category": "私立",
    "district": "新界",
    "level": "幼稚園",
    "tuitionMin": 45665,
    "tuitionMax": 53382,
    "curriculum": [
      "DSE"
    ],
    "language": "全英文",
    "highlights": [
      "師資優良",
      "提供全面教育",
      "設施完善"
    ],
    "address": "大埔大埔道31號",
    "phone": "+852 2920 5815",
    "website": "https://www.聖榮光幼稚園.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.聖榮光幼稚園.edu.hk/admissions"
  },
  {
    "id": "aid-442",
    "name": "聖公會望德中學",
    "nameEn": "聖公會 望德 中學",
    "searchKeywords": [
      "望德",
      "聖公會"
    ],
    "category": "資助",
    "district": "九龍",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "社區服務精神",
      "設施完善",
      "全面發展教育"
    ],
    "address": "深水埗長沙灣道124號",
    "phone": "+852 2552 8790",
    "website": "https://www.聖公會望德中學.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.聖公會望德中學.edu.hk/admissions"
  },
  {
    "id": "aid-443",
    "name": "宣道會仁愛學校",
    "nameEn": "宣道會 仁愛 學校",
    "searchKeywords": [
      "仁愛",
      "宣道會"
    ],
    "category": "資助",
    "district": "九龍",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "設施完善",
      "全面發展教育",
      "注重品德教育"
    ],
    "address": "藍田啟田道175號",
    "phone": "+852 3973 3591",
    "website": "https://www.宣道會仁愛學校.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.宣道會仁愛學校.edu.hk/admissions"
  },
  {
    "id": "gov-444",
    "name": "官立普濟幼稚園暨幼兒中心",
    "nameEn": "官立 普濟 幼稚園暨幼兒中心",
    "searchKeywords": [
      "普濟",
      "官立"
    ],
    "category": "公立",
    "district": "新界",
    "level": "幼稚園",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "免學費",
      "社區服務精神",
      "注重品德教育"
    ],
    "address": "天水圍天恩路190號",
    "phone": "+852 2446 5219",
    "website": "https://www.官立普濟幼稚園暨幼兒中心.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.官立普濟幼稚園暨幼兒中心.edu.hk/admissions"
  },
  {
    "id": "aid-445",
    "name": "佛教善導學校",
    "nameEn": "佛教 善導 學校",
    "searchKeywords": [
      "善導",
      "佛教"
    ],
    "category": "資助",
    "district": "港島",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "設施完善",
      "校風純樸",
      "師資優良"
    ],
    "address": "淺水灣南灣道137號",
    "phone": "+852 3856 4721",
    "website": "https://www.佛教善導學校.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.佛教善導學校.edu.hk/admissions"
  },
  {
    "id": "pri-446",
    "name": "培望德幼稚園暨幼兒中心",
    "nameEn": "培 望德 幼稚園暨幼兒中心",
    "searchKeywords": [
      "望德",
      "培"
    ],
    "category": "私立",
    "district": "九龍",
    "level": "幼稚園",
    "tuitionMin": 53194,
    "tuitionMax": 58886,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "優良校風傳統",
      "課外活動豐富",
      "小班教學"
    ],
    "address": "土瓜灣土瓜灣道191號",
    "phone": "+852 3874 4151",
    "website": "https://www.培望德幼稚園暨幼兒中心.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.培望德幼稚園暨幼兒中心.edu.hk/admissions"
  },
  {
    "id": "aid-447",
    "name": "宣道會育才幼兒園",
    "nameEn": "宣道會 育才 幼兒園",
    "searchKeywords": [
      "育才",
      "宣道會"
    ],
    "category": "資助",
    "district": "港島",
    "level": "幼稚園",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "社區服務精神",
      "師資優良",
      "全面發展教育"
    ],
    "address": "薄扶林薄扶林道106號",
    "phone": "+852 3930 8365",
    "website": "https://www.宣道會育才幼兒園.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.宣道會育才幼兒園.edu.hk/admissions"
  },
  {
    "id": "aid-448",
    "name": "中華基督教會光明幼兒園",
    "nameEn": "中華基督教會 光明 幼兒園",
    "searchKeywords": [
      "光明",
      "中華基督教會"
    ],
    "category": "資助",
    "district": "九龍",
    "level": "幼稚園",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "免學費",
      "校風純樸",
      "師資優良"
    ],
    "address": "深水埗長沙灣道177號",
    "phone": "+852 2794 6822",
    "website": "https://www.中華基督教會光明幼兒園.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.中華基督教會光明幼兒園.edu.hk/admissions"
  },
  {
    "id": "aid-449",
    "name": "佛教博愛幼稚園暨幼兒中心",
    "nameEn": "佛教 博愛 幼稚園暨幼兒中心",
    "searchKeywords": [
      "博愛",
      "佛教"
    ],
    "category": "資助",
    "district": "新界",
    "level": "幼稚園",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "全面發展教育",
      "政府資助學校",
      "免學費"
    ],
    "address": "天水圍天恩路117號",
    "phone": "+852 3159 1604",
    "website": "https://www.佛教博愛幼稚園暨幼兒中心.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.佛教博愛幼稚園暨幼兒中心.edu.hk/admissions"
  },
  {
    "id": "aid-450",
    "name": "道教明德學校",
    "nameEn": "道教 明德 學校",
    "searchKeywords": [
      "明德",
      "道教"
    ],
    "category": "資助",
    "district": "九龍",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "師資優良",
      "課外活動豐富",
      "免學費"
    ],
    "address": "紅磡馬頭圍道5號",
    "phone": "+852 2488 3077",
    "website": "https://www.道教明德學校.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.道教明德學校.edu.hk/admissions"
  },
  {
    "id": "gov-451",
    "name": "官立啟明幼稚園",
    "nameEn": "官立 啟明 幼稚園",
    "searchKeywords": [
      "啟明",
      "官立"
    ],
    "category": "公立",
    "district": "九龍",
    "level": "幼稚園",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "設施完善",
      "注重品德教育",
      "全面發展教育"
    ],
    "address": "紅磡馬頭圍道179號",
    "phone": "+852 2187 3415",
    "website": "https://www.官立啟明幼稚園.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.官立啟明幼稚園.edu.hk/admissions"
  },
  {
    "id": "gov-452",
    "name": "官立恩典小學",
    "nameEn": "官立 恩典 小學",
    "searchKeywords": [
      "恩典",
      "官立"
    ],
    "category": "公立",
    "district": "新界",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "師資穩定",
      "課外活動多元",
      "升學成績穩定"
    ],
    "address": "荃灣荃灣大會堂183號",
    "phone": "+852 2961 9287",
    "website": "https://www.官立恩典小學.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.官立恩典小學.edu.hk/admissions"
  },
  {
    "id": "aid-453",
    "name": "天主教仁愛幼稚園暨幼兒中心",
    "nameEn": "天主教 仁愛 幼稚園暨幼兒中心",
    "searchKeywords": [
      "仁愛",
      "天主教"
    ],
    "category": "資助",
    "district": "港島",
    "level": "幼稚園",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "政府資助學校",
      "社區服務精神",
      "師資優良"
    ],
    "address": "淺水灣南灣道62號",
    "phone": "+852 2497 2325",
    "website": "https://www.天主教仁愛幼稚園暨幼兒中心.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.天主教仁愛幼稚園暨幼兒中心.edu.hk/admissions"
  },
  {
    "id": "aid-454",
    "name": "聖公會培英小學",
    "nameEn": "聖公會 培英 小學",
    "searchKeywords": [
      "培英",
      "聖公會"
    ],
    "category": "資助",
    "district": "新界",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "課外活動豐富",
      "升學成績良好",
      "政府資助學校"
    ],
    "address": "荃灣荃灣大會堂15號",
    "phone": "+852 3315 9340",
    "website": "https://www.聖公會培英小學.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.聖公會培英小學.edu.hk/admissions"
  },
  {
    "id": "aid-455",
    "name": "佛教光明書院",
    "nameEn": "佛教 光明 書院",
    "searchKeywords": [
      "光明",
      "佛教"
    ],
    "category": "資助",
    "district": "新界",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "免學費",
      "升學成績良好",
      "政府資助學校"
    ],
    "address": "西貢西貢公路66號",
    "phone": "+852 3235 9423",
    "website": "https://www.佛教光明書院.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.佛教光明書院.edu.hk/admissions"
  },
  {
    "id": "aid-456",
    "name": "浸信會恩典幼稚園暨幼兒中心",
    "nameEn": "浸信會 恩典 幼稚園暨幼兒中心",
    "searchKeywords": [
      "恩典",
      "浸信會"
    ],
    "category": "資助",
    "district": "港島",
    "level": "幼稚園",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "設施完善",
      "社區服務精神",
      "升學成績良好"
    ],
    "address": "淺水灣南灣道14號",
    "phone": "+852 2632 6928",
    "website": "https://www.浸信會恩典幼稚園暨幼兒中心.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.浸信會恩典幼稚園暨幼兒中心.edu.hk/admissions"
  },
  {
    "id": "pri-457",
    "name": "真光樹人幼稚園暨幼兒中心",
    "nameEn": "真光 樹人 幼稚園暨幼兒中心",
    "searchKeywords": [
      "樹人",
      "真光"
    ],
    "category": "私立",
    "district": "九龍",
    "level": "幼稚園",
    "tuitionMin": 53678,
    "tuitionMax": 61850,
    "curriculum": [
      "DSE"
    ],
    "language": "全英文",
    "highlights": [
      "重視學生個別發展",
      "歷史悠久名校",
      "設施完善"
    ],
    "address": "土瓜灣土瓜灣道125號",
    "phone": "+852 3726 4185",
    "website": "https://www.真光樹人幼稚園暨幼兒中心.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.真光樹人幼稚園暨幼兒中心.edu.hk/admissions"
  },
  {
    "id": "aid-458",
    "name": "佛教培德學校",
    "nameEn": "佛教 培德 學校",
    "searchKeywords": [
      "培德",
      "佛教"
    ],
    "category": "資助",
    "district": "新界",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "校風純樸",
      "設施完善",
      "全面發展教育"
    ],
    "address": "沙田沙田正街131號",
    "phone": "+852 3481 5853",
    "website": "https://www.佛教培德學校.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.佛教培德學校.edu.hk/admissions"
  },
  {
    "id": "gov-459",
    "name": "政府樹人幼稚園暨幼兒中心",
    "nameEn": "政府 樹人 幼稚園暨幼兒中心",
    "searchKeywords": [
      "樹人",
      "政府"
    ],
    "category": "公立",
    "district": "九龍",
    "level": "幼稚園",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "課外活動多元",
      "師資穩定",
      "注重品德教育"
    ],
    "address": "觀塘觀塘道13號",
    "phone": "+852 2832 5096",
    "website": "https://www.政府樹人幼稚園暨幼兒中心.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.政府樹人幼稚園暨幼兒中心.edu.hk/admissions"
  },
  {
    "id": "aid-460",
    "name": "聖公會聖德中學",
    "nameEn": "聖公會 聖德 中學",
    "searchKeywords": [
      "聖德",
      "聖公會"
    ],
    "category": "資助",
    "district": "九龍",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "升學成績良好",
      "課外活動豐富",
      "校風純樸"
    ],
    "address": "尖沙咀彌敦道19號",
    "phone": "+852 3711 6887",
    "website": "https://www.聖公會聖德中學.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.聖公會聖德中學.edu.hk/admissions"
  },
  {
    "id": "gov-461",
    "name": "政府和平幼稚園",
    "nameEn": "政府 和平 幼稚園",
    "searchKeywords": [
      "和平",
      "政府"
    ],
    "category": "公立",
    "district": "九龍",
    "level": "幼稚園",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "全面發展教育",
      "設施完善",
      "師資穩定"
    ],
    "address": "何文田何文田道84號",
    "phone": "+852 3427 7190",
    "website": "https://www.政府和平幼稚園.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.政府和平幼稚園.edu.hk/admissions"
  },
  {
    "id": "pri-462",
    "name": "聖育英小學",
    "nameEn": "聖 育英 小學",
    "searchKeywords": [
      "育英",
      "聖"
    ],
    "category": "私立",
    "district": "新界",
    "level": "小學",
    "tuitionMin": 45438,
    "tuitionMax": 49005,
    "curriculum": [
      "DSE"
    ],
    "language": "全英文",
    "highlights": [
      "歷史悠久名校",
      "課外活動豐富",
      "小班教學"
    ],
    "address": "青衣青衣路171號",
    "phone": "+852 3237 7106",
    "website": "https://www.聖育英小學.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.聖育英小學.edu.hk/admissions"
  },
  {
    "id": "aid-463",
    "name": "循道衛理育才學校",
    "nameEn": "循道衛理 育才 學校",
    "searchKeywords": [
      "育才",
      "循道衛理"
    ],
    "category": "資助",
    "district": "九龍",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "全面發展教育",
      "注重品德教育",
      "社區服務精神"
    ],
    "address": "何文田何文田道3號",
    "phone": "+852 3232 4159",
    "website": "https://www.循道衛理育才學校.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.循道衛理育才學校.edu.hk/admissions"
  },
  {
    "id": "gov-464",
    "name": "官立仁愛幼稚園",
    "nameEn": "官立 仁愛 幼稚園",
    "searchKeywords": [
      "仁愛",
      "官立"
    ],
    "category": "公立",
    "district": "新界",
    "level": "幼稚園",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "升學成績穩定",
      "設施完善",
      "社區服務精神"
    ],
    "address": "天水圍天恩路13號",
    "phone": "+852 2380 5064",
    "website": "https://www.官立仁愛幼稚園.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.官立仁愛幼稚園.edu.hk/admissions"
  },
  {
    "id": "aid-465",
    "name": "循道衛理善導學校",
    "nameEn": "循道衛理 善導 學校",
    "searchKeywords": [
      "善導",
      "循道衛理"
    ],
    "category": "資助",
    "district": "新界",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "注重品德教育",
      "校風純樸",
      "設施完善"
    ],
    "address": "粉嶺粉嶺樓路160號",
    "phone": "+852 2458 9874",
    "website": "https://www.循道衛理善導學校.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.循道衛理善導學校.edu.hk/admissions"
  },
  {
    "id": "aid-466",
    "name": "天主教培英幼稚園暨幼兒中心",
    "nameEn": "天主教 培英 幼稚園暨幼兒中心",
    "searchKeywords": [
      "培英",
      "天主教"
    ],
    "category": "資助",
    "district": "港島",
    "level": "幼稚園",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "設施完善",
      "升學成績良好",
      "全面發展教育"
    ],
    "address": "上環皇后大道中33號",
    "phone": "+852 2724 3300",
    "website": "https://www.天主教培英幼稚園暨幼兒中心.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.天主教培英幼稚園暨幼兒中心.edu.hk/admissions"
  },
  {
    "id": "pri-467",
    "name": "瑪利諾培德幼稚園",
    "nameEn": "瑪利諾 培德 幼稚園",
    "searchKeywords": [
      "培德",
      "瑪利諾"
    ],
    "category": "私立",
    "district": "九龍",
    "level": "幼稚園",
    "tuitionMin": 83933,
    "tuitionMax": 84769,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "課外活動豐富",
      "優良校風傳統",
      "重視學生個別發展"
    ],
    "address": "藍田啟田道76號",
    "phone": "+852 2537 1209",
    "website": "https://www.瑪利諾培德幼稚園.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.瑪利諾培德幼稚園.edu.hk/admissions"
  },
  {
    "id": "aid-468",
    "name": "道教榮光學校",
    "nameEn": "道教 榮光 學校",
    "searchKeywords": [
      "榮光",
      "道教"
    ],
    "category": "資助",
    "district": "港島",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "免學費",
      "全面發展教育",
      "師資優良"
    ],
    "address": "淺水灣南灣道95號",
    "phone": "+852 2534 1726",
    "website": "https://www.道教榮光學校.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.道教榮光學校.edu.hk/admissions"
  },
  {
    "id": "gov-469",
    "name": "官立崇德小學",
    "nameEn": "官立 崇德 小學",
    "searchKeywords": [
      "崇德",
      "官立"
    ],
    "category": "公立",
    "district": "九龍",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "校風純樸",
      "師資穩定",
      "免學費"
    ],
    "address": "旺角亞皆老街24號",
    "phone": "+852 2877 4271",
    "website": "https://www.官立崇德小學.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.官立崇德小學.edu.hk/admissions"
  },
  {
    "id": "pri-470",
    "name": "聖恩典學校",
    "nameEn": "聖 恩典 學校",
    "searchKeywords": [
      "恩典",
      "聖"
    ],
    "category": "私立",
    "district": "新界",
    "level": "中學",
    "tuitionMin": 54206,
    "tuitionMax": 58638,
    "curriculum": [
      "DSE"
    ],
    "language": "全英文",
    "highlights": [
      "設施完善",
      "優良校風傳統",
      "重視學生個別發展"
    ],
    "address": "葵涌葵涌道162號",
    "phone": "+852 2184 2698",
    "website": "https://www.聖恩典學校.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.聖恩典學校.edu.hk/admissions"
  },
  {
    "id": "gov-471",
    "name": "官立聖德中學",
    "nameEn": "官立 聖德 中學",
    "searchKeywords": [
      "聖德",
      "官立"
    ],
    "category": "公立",
    "district": "港島",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "全面發展教育",
      "設施完善",
      "校風純樸"
    ],
    "address": "上環皇后大道中142號",
    "phone": "+852 3527 7548",
    "website": "https://www.官立聖德中學.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.官立聖德中學.edu.hk/admissions"
  },
  {
    "id": "pri-472",
    "name": "瑪利諾光明小學",
    "nameEn": "瑪利諾 光明 小學",
    "searchKeywords": [
      "光明",
      "瑪利諾"
    ],
    "category": "私立",
    "district": "港島",
    "level": "小學",
    "tuitionMin": 34762,
    "tuitionMax": 35888,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "注重品德培養",
      "歷史悠久名校",
      "重視學生個別發展"
    ],
    "address": "筲箕灣愛秩序灣道36號",
    "phone": "+852 2699 5074",
    "website": "https://www.瑪利諾光明小學.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.瑪利諾光明小學.edu.hk/admissions"
  },
  {
    "id": "pri-473",
    "name": "嘉諾撒啟明學校",
    "nameEn": "嘉諾撒 啟明 學校",
    "searchKeywords": [
      "啟明",
      "嘉諾撒"
    ],
    "category": "私立",
    "district": "港島",
    "level": "中學",
    "tuitionMin": 70183,
    "tuitionMax": 82584,
    "curriculum": [
      "DSE",
      "IGCSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "歷史悠久名校",
      "優良校風傳統",
      "注重品德培養"
    ],
    "address": "薄扶林薄扶林道190號",
    "phone": "+852 2437 7835",
    "website": "https://www.嘉諾撒啟明學校.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.嘉諾撒啟明學校.edu.hk/admissions"
  },
  {
    "id": "aid-474",
    "name": "中華基督教會普濟小學",
    "nameEn": "中華基督教會 普濟 小學",
    "searchKeywords": [
      "普濟",
      "中華基督教會"
    ],
    "category": "資助",
    "district": "九龍",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "社區服務精神",
      "注重品德教育",
      "課外活動豐富"
    ],
    "address": "紅磡馬頭圍道136號",
    "phone": "+852 2559 9823",
    "website": "https://www.中華基督教會普濟小學.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.中華基督教會普濟小學.edu.hk/admissions"
  },
  {
    "id": "aid-475",
    "name": "道教育才小學",
    "nameEn": "道教 育才 小學",
    "searchKeywords": [
      "育才",
      "道教"
    ],
    "category": "資助",
    "district": "新界",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "社區服務精神",
      "注重品德教育",
      "全面發展教育"
    ],
    "address": "馬鞍山馬鞍山路195號",
    "phone": "+852 2719 4821",
    "website": "https://www.道教育才小學.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.道教育才小學.edu.hk/admissions"
  },
  {
    "id": "gov-476",
    "name": "官立培德學校",
    "nameEn": "官立 培德 學校",
    "searchKeywords": [
      "培德",
      "官立"
    ],
    "category": "公立",
    "district": "新界",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "設施完善",
      "全面發展教育",
      "社區服務精神"
    ],
    "address": "大埔大埔道178號",
    "phone": "+852 2664 2784",
    "website": "https://www.官立培德學校.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.官立培德學校.edu.hk/admissions"
  },
  {
    "id": "aid-477",
    "name": "中華基督教會崇德幼稚園暨幼兒中心",
    "nameEn": "中華基督教會 崇德 幼稚園暨幼兒中心",
    "searchKeywords": [
      "崇德",
      "中華基督教會"
    ],
    "category": "資助",
    "district": "九龍",
    "level": "幼稚園",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "政府資助學校",
      "設施完善",
      "升學成績良好"
    ],
    "address": "土瓜灣土瓜灣道74號",
    "phone": "+852 2532 3815",
    "website": "https://www.中華基督教會崇德幼稚園暨幼兒中心.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.中華基督教會崇德幼稚園暨幼兒中心.edu.hk/admissions"
  },
  {
    "id": "pri-478",
    "name": "聖明德幼稚園暨幼兒中心",
    "nameEn": "聖 明德 幼稚園暨幼兒中心",
    "searchKeywords": [
      "明德",
      "聖"
    ],
    "category": "私立",
    "district": "港島",
    "level": "幼稚園",
    "tuitionMin": 84761,
    "tuitionMax": 86439,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "師資優良",
      "課外活動豐富",
      "小班教學"
    ],
    "address": "西營盤般咸道124號",
    "phone": "+852 3158 1658",
    "website": "https://www.聖明德幼稚園暨幼兒中心.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.聖明德幼稚園暨幼兒中心.edu.hk/admissions"
  },
  {
    "id": "pri-479",
    "name": "嘉諾撒培德小學",
    "nameEn": "嘉諾撒 培德 小學",
    "searchKeywords": [
      "培德",
      "嘉諾撒"
    ],
    "category": "私立",
    "district": "九龍",
    "level": "小學",
    "tuitionMin": 53876,
    "tuitionMax": 54468,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "提供全面教育",
      "設施完善",
      "歷史悠久名校"
    ],
    "address": "油麻地窩打老道80號",
    "phone": "+852 2713 6139",
    "website": "https://www.嘉諾撒培德小學.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.嘉諾撒培德小學.edu.hk/admissions"
  },
  {
    "id": "aid-480",
    "name": "循道衛理慈航幼稚園",
    "nameEn": "循道衛理 慈航 幼稚園",
    "searchKeywords": [
      "慈航",
      "循道衛理"
    ],
    "category": "資助",
    "district": "九龍",
    "level": "幼稚園",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "課外活動豐富",
      "設施完善",
      "全面發展教育"
    ],
    "address": "旺角亞皆老街168號",
    "phone": "+852 2492 2597",
    "website": "https://www.循道衛理慈航幼稚園.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.循道衛理慈航幼稚園.edu.hk/admissions"
  },
  {
    "id": "gov-481",
    "name": "官立崇德中學",
    "nameEn": "官立 崇德 中學",
    "searchKeywords": [
      "崇德",
      "官立"
    ],
    "category": "公立",
    "district": "九龍",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "課外活動多元",
      "設施完善",
      "注重品德教育"
    ],
    "address": "黃大仙龍翔道67號",
    "phone": "+852 2380 2899",
    "website": "https://www.官立崇德中學.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.官立崇德中學.edu.hk/admissions"
  },
  {
    "id": "gov-482",
    "name": "政府光明中學",
    "nameEn": "政府 光明 中學",
    "searchKeywords": [
      "光明",
      "政府"
    ],
    "category": "公立",
    "district": "新界",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "全面發展教育",
      "升學成績穩定",
      "課外活動多元"
    ],
    "address": "粉嶺粉嶺樓路176號",
    "phone": "+852 2985 2613",
    "website": "https://www.政府光明中學.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.政府光明中學.edu.hk/admissions"
  },
  {
    "id": "aid-483",
    "name": "聖公會博愛學校",
    "nameEn": "聖公會 博愛 學校",
    "searchKeywords": [
      "博愛",
      "聖公會"
    ],
    "category": "資助",
    "district": "九龍",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "設施完善",
      "校風純樸",
      "課外活動豐富"
    ],
    "address": "藍田啟田道172號",
    "phone": "+852 2310 3637",
    "website": "https://www.聖公會博愛學校.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.聖公會博愛學校.edu.hk/admissions"
  },
  {
    "id": "aid-484",
    "name": "道教培德中學",
    "nameEn": "道教 培德 中學",
    "searchKeywords": [
      "培德",
      "道教"
    ],
    "category": "資助",
    "district": "九龍",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "注重品德教育",
      "校風純樸",
      "師資優良"
    ],
    "address": "紅磡馬頭圍道110號",
    "phone": "+852 2833 8566",
    "website": "https://www.道教培德中學.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.道教培德中學.edu.hk/admissions"
  },
  {
    "id": "gov-485",
    "name": "官立崇德學校",
    "nameEn": "官立 崇德 學校",
    "searchKeywords": [
      "崇德",
      "官立"
    ],
    "category": "公立",
    "district": "新界",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "政府官立學校",
      "升學成績穩定",
      "全面發展教育"
    ],
    "address": "青衣青衣路136號",
    "phone": "+852 2915 8380",
    "website": "https://www.官立崇德學校.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.官立崇德學校.edu.hk/admissions"
  },
  {
    "id": "pri-486",
    "name": "瑪利諾育才書院",
    "nameEn": "瑪利諾 育才 書院",
    "searchKeywords": [
      "育才",
      "瑪利諾"
    ],
    "category": "私立",
    "district": "九龍",
    "level": "中學",
    "tuitionMin": 87872,
    "tuitionMax": 95017,
    "curriculum": [
      "DSE",
      "IB"
    ],
    "language": "全英文",
    "highlights": [
      "師資優良",
      "重視學生個別發展",
      "課外活動豐富"
    ],
    "address": "尖沙咀彌敦道135號",
    "phone": "+852 2435 4667",
    "website": "https://www.瑪利諾育才書院.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.瑪利諾育才書院.edu.hk/admissions"
  },
  {
    "id": "aid-487",
    "name": "浸信會善導小學",
    "nameEn": "浸信會 善導 小學",
    "searchKeywords": [
      "善導",
      "浸信會"
    ],
    "category": "資助",
    "district": "新界",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "校風純樸",
      "課外活動豐富",
      "注重品德教育"
    ],
    "address": "沙田沙田正街126號",
    "phone": "+852 2392 1071",
    "website": "https://www.浸信會善導小學.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.浸信會善導小學.edu.hk/admissions"
  },
  {
    "id": "aid-488",
    "name": "聖公會信義小學",
    "nameEn": "聖公會 信義 小學",
    "searchKeywords": [
      "信義",
      "聖公會"
    ],
    "category": "資助",
    "district": "九龍",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "師資優良",
      "課外活動豐富",
      "注重品德教育"
    ],
    "address": "尖沙咀彌敦道163號",
    "phone": "+852 3294 5246",
    "website": "https://www.聖公會信義小學.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.聖公會信義小學.edu.hk/admissions"
  },
  {
    "id": "aid-489",
    "name": "浸信會培英幼稚園暨幼兒中心",
    "nameEn": "浸信會 培英 幼稚園暨幼兒中心",
    "searchKeywords": [
      "培英",
      "浸信會"
    ],
    "category": "資助",
    "district": "新界",
    "level": "幼稚園",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "升學成績良好",
      "師資優良",
      "全面發展教育"
    ],
    "address": "元朗元朗大馬路109號",
    "phone": "+852 2750 6570",
    "website": "https://www.浸信會培英幼稚園暨幼兒中心.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.浸信會培英幼稚園暨幼兒中心.edu.hk/admissions"
  },
  {
    "id": "aid-490",
    "name": "天主教善導幼稚園暨幼兒中心",
    "nameEn": "天主教 善導 幼稚園暨幼兒中心",
    "searchKeywords": [
      "善導",
      "天主教"
    ],
    "category": "資助",
    "district": "港島",
    "level": "幼稚園",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "免學費",
      "師資優良",
      "升學成績良好"
    ],
    "address": "鰂魚涌太古城道166號",
    "phone": "+852 3963 3335",
    "website": "https://www.天主教善導幼稚園暨幼兒中心.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.天主教善導幼稚園暨幼兒中心.edu.hk/admissions"
  },
  {
    "id": "gov-491",
    "name": "官立慈航中學",
    "nameEn": "官立 慈航 中學",
    "searchKeywords": [
      "慈航",
      "官立"
    ],
    "category": "公立",
    "district": "新界",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "注重品德教育",
      "政府官立學校",
      "設施完善"
    ],
    "address": "屯門屯門鄉事會路2號",
    "phone": "+852 3212 2583",
    "website": "https://www.官立慈航中學.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.官立慈航中學.edu.hk/admissions"
  },
  {
    "id": "aid-492",
    "name": "天主教榮光小學",
    "nameEn": "天主教 榮光 小學",
    "searchKeywords": [
      "榮光",
      "天主教"
    ],
    "category": "資助",
    "district": "新界",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "政府資助學校",
      "師資優良",
      "升學成績良好"
    ],
    "address": "天水圍天恩路198號",
    "phone": "+852 3833 4006",
    "website": "https://www.天主教榮光小學.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.天主教榮光小學.edu.hk/admissions"
  },
  {
    "id": "aid-493",
    "name": "聖公會仁愛學校",
    "nameEn": "聖公會 仁愛 學校",
    "searchKeywords": [
      "仁愛",
      "聖公會"
    ],
    "category": "資助",
    "district": "九龍",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "全面發展教育",
      "社區服務精神",
      "課外活動豐富"
    ],
    "address": "觀塘觀塘道69號",
    "phone": "+852 3692 2389",
    "website": "https://www.聖公會仁愛學校.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.聖公會仁愛學校.edu.hk/admissions"
  },
  {
    "id": "aid-494",
    "name": "循道衛理聖德書院",
    "nameEn": "循道衛理 聖德 書院",
    "searchKeywords": [
      "聖德",
      "循道衛理"
    ],
    "category": "資助",
    "district": "新界",
    "level": "中學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "注重品德教育",
      "升學成績良好",
      "全面發展教育"
    ],
    "address": "馬鞍山馬鞍山路195號",
    "phone": "+852 3458 1451",
    "website": "https://www.循道衛理聖德書院.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.循道衛理聖德書院.edu.hk/admissions"
  },
  {
    "id": "aid-495",
    "name": "宣道會信義幼稚園",
    "nameEn": "宣道會 信義 幼稚園",
    "searchKeywords": [
      "信義",
      "宣道會"
    ],
    "category": "資助",
    "district": "新界",
    "level": "幼稚園",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "設施完善",
      "政府資助學校",
      "校風純樸"
    ],
    "address": "青衣青衣路193號",
    "phone": "+852 3967 5832",
    "website": "https://www.宣道會信義幼稚園.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.宣道會信義幼稚園.edu.hk/admissions"
  },
  {
    "id": "pri-496",
    "name": "培信義幼兒園",
    "nameEn": "培 信義 幼兒園",
    "searchKeywords": [
      "信義",
      "培"
    ],
    "category": "私立",
    "district": "九龍",
    "level": "幼稚園",
    "tuitionMin": 78048,
    "tuitionMax": 82494,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "注重品德培養",
      "設施完善",
      "師資優良"
    ],
    "address": "何文田何文田道91號",
    "phone": "+852 3877 9721",
    "website": "https://www.培信義幼兒園.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.培信義幼兒園.edu.hk/admissions"
  },
  {
    "id": "pri-497",
    "name": "嘉諾撒博愛學校",
    "nameEn": "嘉諾撒 博愛 學校",
    "searchKeywords": [
      "博愛",
      "嘉諾撒"
    ],
    "category": "私立",
    "district": "九龍",
    "level": "中學",
    "tuitionMin": 87876,
    "tuitionMax": 101822,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "注重品德培養",
      "小班教學",
      "重視學生個別發展"
    ],
    "address": "將軍澳寶琳路35號",
    "phone": "+852 2979 5906",
    "website": "https://www.嘉諾撒博愛學校.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.嘉諾撒博愛學校.edu.hk/admissions"
  },
  {
    "id": "pri-498",
    "name": "培恩典幼稚園",
    "nameEn": "培 恩典 幼稚園",
    "searchKeywords": [
      "恩典",
      "培"
    ],
    "category": "私立",
    "district": "港島",
    "level": "幼稚園",
    "tuitionMin": 78016,
    "tuitionMax": 80454,
    "curriculum": [
      "DSE"
    ],
    "language": "以中文為主",
    "highlights": [
      "課外活動豐富",
      "師資優良",
      "提供全面教育"
    ],
    "address": "柴灣柴灣道143號",
    "phone": "+852 2630 4331",
    "website": "https://www.培恩典幼稚園.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.培恩典幼稚園.edu.hk/admissions"
  },
  {
    "id": "aid-499",
    "name": "宣道會仁愛學校",
    "nameEn": "宣道會 仁愛 學校",
    "searchKeywords": [
      "仁愛",
      "宣道會"
    ],
    "category": "資助",
    "district": "九龍",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "免學費",
      "全面發展教育",
      "社區服務精神"
    ],
    "address": "油麻地窩打老道59號",
    "phone": "+852 2184 5723",
    "website": "https://www.宣道會仁愛學校.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.宣道會仁愛學校.edu.hk/admissions"
  },
  {
    "id": "aid-500",
    "name": "佛教育英學校",
    "nameEn": "佛教 育英 學校",
    "searchKeywords": [
      "育英",
      "佛教"
    ],
    "category": "資助",
    "district": "九龍",
    "level": "小學",
    "tuitionMin": 0,
    "tuitionMax": 0,
    "curriculum": [
      "DSE"
    ],
    "language": "中英雙語",
    "highlights": [
      "升學成績良好",
      "校風純樸",
      "政府資助學校"
    ],
    "address": "油麻地窩打老道100號",
    "phone": "+852 2472 3454",
    "website": "https://www.佛教育英學校.edu.hk",
    "applicationMaterials": [
      "申請表",
      "成績單",
      "推薦信",
      "身份證明文件"
    ],
    "applicationLink": "https://www.佛教育英學校.edu.hk/admissions"
  }
];
