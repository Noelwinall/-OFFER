// Consolidated Kindergarten Database
// Generated: 2026-01-20
// Total: 983 unique kindergartens
// Sources: schools_raw.ts, EDB KGP Profile 2025
//
// DO NOT EDIT MANUALLY - Run "npx tsx scripts/generate-kg-consolidated.ts" to regenerate

export type KGNature = "international" | "non_profit" | "private";

// Two-level curriculum structure
export type KGCurriculumCategory = "local" | "non_local" | "unknown";
export type KGLocalCurriculumType = "kgp" | "non_kgp";
export type KGNonLocalCurriculumType = "ib" | "montessori" | "british" | "other";
export type KGCurriculumType = KGLocalCurriculumType | KGNonLocalCurriculumType | null;

export type KGSession = "AM" | "PM" | "WD";

export interface KindergartenEntry {
  id: string;
  schoolCode: string;
  campusCode: string;
  name: string;
  nameEn: string;
  district: string;
  district18: string;
  address: string;
  nature: KGNature;
  curriculumCategory: KGCurriculumCategory;
  curriculumType: KGCurriculumType;
  joinedKGP: boolean;
  sessions: KGSession[];
  variantIds: string[];
  pedagogyTags: string[];
  languageEnv: string[];
  tuitionMin: number;
  tuitionMax: number;
  religion?: string;
  phone: string;
  website: string;
  dataQuality: {
    curriculumConfidence: "high" | "medium" | "low";
    pedagogyConfidence: "high" | "medium" | "low";
    languageConfidence: "high" | "medium" | "low";
    needsReview: boolean;
  };
}

/**
 * Complete kindergarten database (deduplicated, session variants merged)
 */
export const kindergartens: KindergartenEntry[] = [
  {
    "id": "edb_3249220001",
    "schoolCode": "324922",
    "campusCode": "0001",
    "name": "愛群道浸信會呂郭碧鳳幼稚園",
    "nameEn": "OI KWAN ROAD BAPTIST CHURCH LUI KWOK PAT FONG KINDERGARTEN",
    "district": "港島",
    "district18": "灣仔區",
    "address": "香港灣仔愛群道36號地下 三樓、四樓及五樓活動室",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_324922000111",
      "edb_324922000112",
      "edb_324922000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "project_learn",
      "language_dev",
      "holistic",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "2893271528912172",
    "website": "http://www.lkpfkg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_6036430001",
    "schoolCode": "603643",
    "campusCode": "0001",
    "name": "奧恩國際幼稚園",
    "nameEn": "MIGHTY OAKS INTERNATIONAL KINDERGARTEN",
    "district": "港島",
    "district18": "中西區",
    "address": "香港堅尼地城卑路乍街４６Ａ號隆基大廈１樓及１樓平台",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_603643000111",
      "edb_603643000112"
    ],
    "pedagogyTags": [
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "28068383",
    "website": "http://mightyoaks.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_2156940001",
    "schoolCode": "215694",
    "campusCode": "0001",
    "name": "奧伊斯嘉日本語幼稚園",
    "nameEn": "OISCA JAPANESE KINDERGARTEN",
    "district": "港島",
    "district18": "東區",
    "address": "香港北角孔雀路明園大廈２６－４８號地下",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "WD"
    ],
    "variantIds": [
      "edb_215694000111",
      "edb_215694000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27755899",
    "website": "http://www.oisca-youchien.com",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "low",
      "languageConfidence": "high",
      "needsReview": true
    }
  },
  {
    "id": "edb_2159370001",
    "schoolCode": "215937",
    "campusCode": "0001",
    "name": "栢基國際幼稚園",
    "nameEn": "PARKVIEW INTERNATIONAL PRE-SCHOOL",
    "district": "港島",
    "district18": "南區",
    "address": "香港大潭水塘道八十八號陽明山莊十八座地下(幼兒園專用部份除外)",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "ib",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_215937000111",
      "edb_215937000112"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "play_explore"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "28126023",
    "website": "http://www.pips.edu.hk/hk/index.asp",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5673450001",
    "schoolCode": "567345",
    "campusCode": "0001",
    "name": "保良局慧妍雅集幼稚園",
    "nameEn": "PO LEUNG KUK WAI YIN KINDERGARTEN",
    "district": "港島",
    "district18": "東區",
    "address": "香港鰂魚涌基利路１號鰂魚涌社區綜合大樓１樓Ａ",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_567345000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "play_explore",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "english",
      "native_english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25906332",
    "website": "http://www.poleungkuk.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_6072900001",
    "schoolCode": "607290",
    "campusCode": "0001",
    "name": "保良局建造商會學校",
    "nameEn": "HKCA PO LEUNG KUK SCHOOL",
    "district": "港島",
    "district18": "灣仔區",
    "address": "香港天后廟道62號",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "ib",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_607290000111",
      "edb_607290000112"
    ],
    "pedagogyTags": [
      "special_curriculum"
    ],
    "languageEnv": [
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "28071770",
    "website": "https://www.plkis.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5636410001",
    "schoolCode": "563641",
    "campusCode": "0001",
    "name": "保良局朱李月華幼稚園",
    "nameEn": "PO LEUNG KUK CHU LEE YUET WAH KINDERGARTEN",
    "district": "港島",
    "district18": "灣仔區",
    "address": "香港銅鑼灣禮頓道６６號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_563641000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "22778383",
    "website": "http://www.poleungkuk.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5637730001",
    "schoolCode": "563773",
    "campusCode": "0001",
    "name": "保良局莊啓程夫人（華貴）幼稚園",
    "nameEn": "PO LEUNG KUK MRS VICWOOD K T CHONG (WAH KWAI) KINDERGARTEN",
    "district": "港島",
    "district18": "南區",
    "address": "香港薄扶林華貴邨華貴社區中心４樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_563773000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "play_explore",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "putonghua",
      "english",
      "native_english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25516908",
    "website": "http://www.poleungkuk.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_3238960001",
    "schoolCode": "323896",
    "campusCode": "0001",
    "name": "保良局莊啓程幼稚園",
    "nameEn": "PO LEUNG KUK VICWOOD CHONG KEE TING KINDERGARTEN",
    "district": "港島",
    "district18": "灣仔區",
    "address": "香港禮頓道６６號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_323896000111",
      "edb_323896000112",
      "edb_323896000113"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "28949921",
    "website": "https://www.plkkgs.edu.hk/plkvcktkg",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5661010001",
    "schoolCode": "566101",
    "campusCode": "0001",
    "name": "寶寶幼兒學校",
    "nameEn": "BO BO NURSERY SCHOOL",
    "district": "港島",
    "district18": "東區",
    "address": "香港太古城太古灣道星輝台平台Ｐ１０１２－Ｐ１０１６",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_566101000111",
      "edb_566101000112",
      "edb_566101000113"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "project_learn"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25689706",
    "website": "http://www.bobonursery.com.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5659380002",
    "schoolCode": "565938",
    "campusCode": "0002",
    "name": "寶山幼兒園",
    "nameEn": "BRAEMAR HILL NURSERY SCHOOL",
    "district": "港島",
    "district18": "灣仔區",
    "address": "香港渣甸山春暉道9號春暉中心1樓連天台",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_565938000211",
      "edb_565938000212"
    ],
    "pedagogyTags": [],
    "languageEnv": [],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25787922",
    "website": "http://www.braemarhillnurseryschool.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "low",
      "languageConfidence": "low",
      "needsReview": true
    }
  },
  {
    "id": "edb_1330190001",
    "schoolCode": "133019",
    "campusCode": "0001",
    "name": "寶血幼稚園",
    "nameEn": "PRECIOUS BLOOD KINDERGARTEN",
    "district": "港島",
    "district18": "灣仔區",
    "address": "香港跑馬地冬青道９號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_133019000111",
      "edb_133019000112"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "trilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25723773",
    "website": "http://www.pbk.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_3154350001",
    "schoolCode": "315435",
    "campusCode": "0001",
    "name": "北角聖彼得堂幼稚園",
    "nameEn": "ST. PETER'S CHURCH KINDERGARTEN",
    "district": "港島",
    "district18": "東區",
    "address": "香港北角炮台山道２３號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_315435000111",
      "edb_315435000112"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "project_learn",
      "project_learn",
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25704963",
    "website": "https://www.stpnpkg.edu.hk/zh_tw/site/index",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_3146840001",
    "schoolCode": "314684",
    "campusCode": "0001",
    "name": "北角衞理堂幼稚園",
    "nameEn": "NORTH POINT METHODIST CHURCH KINDERGARTEN",
    "district": "港島",
    "district18": "東區",
    "address": "香港北角長康街11號地下部分、一樓及二樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_314684000111",
      "edb_314684000112"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25719015",
    "website": "http://www.npmc.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_6044020001",
    "schoolCode": "604402",
    "campusCode": "0001",
    "name": "北角衞理堂幼稚園（炮台山）",
    "nameEn": "NORTH POINT METHODIST CHURCH KINDERGARTEN (FORTRESS HILL)",
    "district": "港島",
    "district18": "東區",
    "address": "香港北角英皇道１６５號公主大廈一樓１至１１號室",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_604402000111",
      "edb_604402000112",
      "edb_604402000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25787913",
    "website": "http://www.npmc.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "low",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": true
    }
  },
  {
    "id": "edb_3255970001",
    "schoolCode": "325597",
    "campusCode": "0001",
    "name": "柴灣浸信會學前教育中心呂明才幼稚園",
    "nameEn": "CHAI WAN BAPTIST CHURCH PRE-SCHOOL EDUCATION LUI MING CHOI KINDERGARTEN",
    "district": "港島",
    "district18": "東區",
    "address": "香港柴灣翡翠道３０號１樓及４樓天台（包括幼兒中心）",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_325597000111",
      "edb_325597000112",
      "edb_325597000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "2558029925580199",
    "website": "http://www.cwbc.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5781260001",
    "schoolCode": "578126",
    "campusCode": "0001",
    "name": "柴灣浸信會學前教育中心呂明才幼稚園(小西灣)",
    "nameEn": "CHAI WAN BAPTIST CHURCH PRE-SCHOOL EDUCATION LUI MING CHOI KINDERGARTEN (SIU SAI WAN)",
    "district": "港島",
    "district18": "東區",
    "address": "香港柴灣小西灣邨瑞富樓地下1-10號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_578126000111",
      "edb_578126000112",
      "edb_578126000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25566909",
    "website": "http://www.cwbc.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "low",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": true
    }
  },
  {
    "id": "edb_5646480001",
    "schoolCode": "564648",
    "campusCode": "0001",
    "name": "潮陽幼稚園",
    "nameEn": "CHIU YANG KINDERGARTEN",
    "district": "港島",
    "district18": "中西區",
    "address": "香港上環德輔道西３８號２字樓Ａ室",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_564648000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "project_learn",
      "project_learn"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25436796",
    "website": "http://www.cyk.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_6075920002",
    "schoolCode": "607592",
    "campusCode": "0002",
    "name": "道爾頓幼稚園",
    "nameEn": "LITTLE DALTON KINDERGARTEN",
    "district": "港島",
    "district18": "灣仔區",
    "address": "香港灣仔司徒拔道41B號地下部分及1樓部分",
    "nature": "international",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_607592000211",
      "edb_607592000212",
      "edb_607592000213"
    ],
    "pedagogyTags": [
      "play_explore"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "36125760",
    "website": "https://littledalton.com",
    "dataQuality": {
      "curriculumConfidence": "low",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": true
    }
  },
  {
    "id": "edb_2145580002",
    "schoolCode": "214558",
    "campusCode": "0002",
    "name": "德瑞國際學校",
    "nameEn": "GERMAN SWISS INTERNATIONAL SCHOOL",
    "district": "港島",
    "district18": "南區",
    "address": "香港薄扶林薄扶林道１６２號",
    "nature": "international",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM"
    ],
    "variantIds": [
      "edb_214558000211"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "28496217",
    "website": "http://www.gsis.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "low",
      "languageConfidence": "high",
      "needsReview": true
    }
  },
  {
    "id": "edb_3258480001",
    "schoolCode": "325848",
    "campusCode": "0001",
    "name": "帝京香港幼稚園",
    "nameEn": "TEIKYO HONG KONG KINDERGARTEN",
    "district": "港島",
    "district18": "灣仔區",
    "address": "香港跑馬地成和道８１號",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM"
    ],
    "variantIds": [
      "edb_325848000111"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "28339963",
    "website": "http://www.teikyo.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "low",
      "languageConfidence": "high",
      "needsReview": true
    }
  },
  {
    "id": "edb_5641330001",
    "schoolCode": "564133",
    "campusCode": "0001",
    "name": "東華三院方樹泉幼兒園",
    "nameEn": "TWGHS FONG SHU CHUEN NURSERY SCHOOL",
    "district": "港島",
    "district18": "東區",
    "address": "香港銅鑼灣福蔭道７號銅鑼灣社區中心地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_564133000113"
    ],
    "pedagogyTags": [
      "language_dev"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "28872106",
    "website": "http://www.tungwahcsd.org",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5640950001",
    "schoolCode": "564095",
    "campusCode": "0001",
    "name": "東華三院捷和鄭氏幼兒園",
    "nameEn": "TWGHS CHIAP HUA CHENG'S NURSERY SCHOOL",
    "district": "港島",
    "district18": "東區",
    "address": "香港柴灣道３３８號柴灣市政大廈３樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_564095000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "language_dev"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25586639",
    "website": "http://www.tungwahcsd.org",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_6149200001",
    "schoolCode": "614920",
    "campusCode": "0001",
    "name": "東華三院李賢義伉儷幼兒園",
    "nameEn": "TUNG WAH GROUP OF HOSPITALS MR. & MRS. LEE YIN YEE NURSERY SCHOOL",
    "district": "港島",
    "district18": "灣仔區",
    "address": "香港灣仔謝斐道158—172號及菲林明道20號東基大廈地下至1樓A—C舖",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_614920000113"
    ],
    "pedagogyTags": [
      "project_learn",
      "project_learn",
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25073997",
    "website": "http://www.tungwahcsd.org/tc/our-services/youth-and-family-services/day-nursery-services/WCKG/introduction",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5281610001",
    "schoolCode": "528161",
    "campusCode": "0001",
    "name": "東華三院田灣(一九九六至一九九七總理)幼稚園",
    "nameEn": "TWGHS TIN WAN (1996 - 1997 DIRECTORS) KINDERGARTEN",
    "district": "港島",
    "district18": "南區",
    "address": "香港香港仔田灣邨田健樓地下１－１０室",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_528161000111",
      "edb_528161000112",
      "edb_528161000113"
    ],
    "pedagogyTags": [
      "language_dev",
      "language_dev"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25385867",
    "website": "http://twghtwkg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5641840001",
    "schoolCode": "564184",
    "campusCode": "0001",
    "name": "東華三院蕭旺李滿福幼兒園",
    "nameEn": "TWGHS SHIU WONG LEE MOON FOOK NURSERY SCHOOL",
    "district": "港島",
    "district18": "南區",
    "address": "香港仔漁暉道１８號港暉中心高層地下１－２號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_564184000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25802273",
    "website": "http://www.tungwah.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5758520001",
    "schoolCode": "575852",
    "campusCode": "0001",
    "name": "多多寶馬山國際幼稚園",
    "nameEn": "TUTOR TIME BRAEMAR HILL INTERNATIONAL KINDERGARTEN",
    "district": "港島",
    "district18": "東區",
    "address": "香港北角寶馬山道４５號賽西湖商場地下低層６－１０號舖",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_575852000111",
      "edb_575852000112"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25291833",
    "website": "http://www.tutortime.com.hk/en/home",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "low",
      "languageConfidence": "high",
      "needsReview": true
    }
  },
  {
    "id": "edb_5931330001",
    "schoolCode": "593133",
    "campusCode": "0001",
    "name": "多多國際幼稚園（半山）",
    "nameEn": "TUTOR TIME INTERNATIONAL KINDERGARTEN (MID LEVELS)",
    "district": "港島",
    "district18": "中西區",
    "address": "香港半山堅道５號寶林閣地下Ｂ號舖",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_593133000111",
      "edb_593133000112"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25292288",
    "website": "https://www.tutortime.com.hk",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "low",
      "languageConfidence": "high",
      "needsReview": true
    }
  },
  {
    "id": "edb_6050260001",
    "schoolCode": "605026",
    "campusCode": "0001",
    "name": "楓薈幼稚園",
    "nameEn": "FAIRCHILD KINDERGARTEN",
    "district": "港島",
    "district18": "中西區",
    "address": "香港干諾道西185號至185號B德輔道西351至351號C及屈地街3-7號光前大廈地下8號舖及1樓全層(包括附設於1樓的部份平台)",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_605026000111",
      "edb_605026000112"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "holistic"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "28032638",
    "website": "http://www.fairchild.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5811190001",
    "schoolCode": "581119",
    "campusCode": "0001",
    "name": "港島兒童蒙特梭利幼稚園",
    "nameEn": "ISLAND CHILDREN'S MONTESSORI KINDERGARTEN",
    "district": "港島",
    "district18": "灣仔區",
    "address": "香港天后廟道16號龍景花園地下低層C舖及地下高層B舖",
    "nature": "international",
    "curriculumCategory": "non_local",
    "curriculumType": "montessori",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_581119000111",
      "edb_581119000112"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "",
    "website": "http://icms.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "low",
      "languageConfidence": "high",
      "needsReview": true
    }
  },
  {
    "id": "edb_6072230001",
    "schoolCode": "607223",
    "campusCode": "0001",
    "name": "港島蒙特梭利國際幼稚園",
    "nameEn": "ISLAND MONTESSORI INTERNATIONAL KINDERGARTEN",
    "district": "港島",
    "district18": "東區",
    "address": "香港天后廟道151-173號百福花園地下商業單位",
    "nature": "international",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_607223000111",
      "edb_607223000112"
    ],
    "pedagogyTags": [
      "special_curriculum"
    ],
    "languageEnv": [
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "34279100",
    "website": "http://icms.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5638970001",
    "schoolCode": "563897",
    "campusCode": "0001",
    "name": "港九街坊婦女會丁毓珠幼稚園",
    "nameEn": "HONG KONG & KOWLOON KAIFONG WOMEN'S ASSOCIATION TING YUK CHEE KINDERGARTEN",
    "district": "港島",
    "district18": "東區",
    "address": "香港筲箕灣寶文街峻峰花園第６層平台",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_563897000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english",
      "native_english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "28859622",
    "website": "http://www.hkkkwatyc.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5638890001",
    "schoolCode": "563889",
    "campusCode": "0001",
    "name": "港九街坊婦女會環翠幼稚園",
    "nameEn": "HONG KONG & KOWLOON KAIFONG WOMEN'S ASSOCIATION WAN TSUI KINDERGARTEN",
    "district": "港島",
    "district18": "東區",
    "address": "香港柴灣環翠邨喜翠樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_563889000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "28988241",
    "website": "http://www.wantsuikg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_2155380001",
    "schoolCode": "215538",
    "campusCode": "0001",
    "name": "高主教書院幼稚園部",
    "nameEn": "RAIMONDI COLLEGE KINDERGARTEN SECTION",
    "district": "港島",
    "district18": "東區",
    "address": "香港北角建華街３０號地下至２樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_215538000111",
      "edb_215538000112",
      "edb_215538000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25661879",
    "website": "http://www.rckg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_3257830001",
    "schoolCode": "325783",
    "campusCode": "0001",
    "name": "漢廸國際幼稚園(港島東)",
    "nameEn": "KENDALL INTERNATIONAL PRESCHOOL (ISLAND EAST)",
    "district": "港島",
    "district18": "東區",
    "address": "香港鰂魚涌基利路柏蕙苑地下",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_325783000111",
      "edb_325783000112"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "",
    "website": "https://www.kendall.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "low",
      "languageConfidence": "high",
      "needsReview": true
    }
  },
  {
    "id": "edb_2155890001",
    "schoolCode": "215589",
    "campusCode": "0001",
    "name": "漢基國際學校",
    "nameEn": "CHINESE INTERNATIONAL SCHOOL",
    "district": "港島",
    "district18": "東區",
    "address": "香港北角寶馬山校園徑１號",
    "nature": "international",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_215589000111",
      "edb_215589000112"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25107288",
    "website": "http://www.cis.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "low",
      "languageConfidence": "high",
      "needsReview": true
    }
  },
  {
    "id": "edb_3251630001",
    "schoolCode": "325163",
    "campusCode": "0001",
    "name": "合一堂陳伯宏紀念幼稚園",
    "nameEn": "HOP YAT CHURCH CHAN PAK WANG MEMORIAL KINDERGARTEN",
    "district": "港島",
    "district18": "東區",
    "address": "香港北角雲景道４８號地下－２樓及３－４樓平台（包括幼兒中心）",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_325163000111",
      "edb_325163000112",
      "edb_325163000113"
    ],
    "pedagogyTags": [
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25785759",
    "website": "http://hyckg.ccc.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_6006010002",
    "schoolCode": "600601",
    "campusCode": "0002",
    "name": "弘立幼稚園",
    "nameEn": "THE INDEPENDENT SCHOOLS FOUNDATION PRE-SCHOOL",
    "district": "港島",
    "district18": "中西區",
    "address": "香港堅尼地城卑路乍街97號地下G01號舖及1樓101號舖",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_600601000211",
      "edb_600601000212"
    ],
    "pedagogyTags": [
      "project_learn"
    ],
    "languageEnv": [
      "putonghua",
      "english",
      "bilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25598518",
    "website": "https://preschool.isf.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_3239690002",
    "schoolCode": "323969",
    "campusCode": "0002",
    "name": "懷恩浸信會幼稚園",
    "nameEn": "GRACE BAPTIST KINDERGARTEN",
    "district": "港島",
    "district18": "東區",
    "address": "香港北角書局街２８號國賓大厦１字樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_323969000211",
      "edb_323969000212",
      "edb_323969000213"
    ],
    "pedagogyTags": [
      "project_learn",
      "language_dev",
      "holistic",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25784275",
    "website": "https://www.gbkg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_3255700001",
    "schoolCode": "325570",
    "campusCode": "0001",
    "name": "基督教海面傳道會仁愛幼稚園",
    "nameEn": "THE HONG KONG HARBOUR MISSION CHURCH YAN OI KINDERGARTEN",
    "district": "港島",
    "district18": "南區",
    "address": "香港鴨脷洲新市街３８號地下（包括幼兒中心）",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_325570000111",
      "edb_325570000112",
      "edb_325570000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25547808",
    "website": "http://www.yanoikin.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_2158480001",
    "schoolCode": "215848",
    "campusCode": "0001",
    "name": "基督教康山中英文幼稚園",
    "nameEn": "KORNHILL CHRISTIAN ANGLO-CHINESE KINDERGARTEN",
    "district": "港島",
    "district18": "東區",
    "address": "香港鰂魚涌康山道1號康怡廣場(北)1樓平台幼稚園(1號課室、2號課室及2號課室內的儲物室除外)",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_215848000111",
      "edb_215848000112",
      "edb_215848000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "language_dev",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "28855836",
    "website": "http://www.kcackg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5648500001",
    "schoolCode": "564850",
    "campusCode": "0001",
    "name": "基督教香港信義會基恩幼兒學校",
    "nameEn": "ELCHK AMAZING GRACE NURSERY SCHOOL",
    "district": "港島",
    "district18": "中西區",
    "address": "香港高街２號西營盤社區綜合大樓３樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_564850000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25407583",
    "website": "http://agns.elchk.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5648000001",
    "schoolCode": "564800",
    "campusCode": "0001",
    "name": "基督教香港信義會興華幼兒學校",
    "nameEn": "ELCHK HING WAH NURSERY SCHOOL",
    "district": "港島",
    "district18": "東區",
    "address": "香港柴灣興華一邨美華樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_564800000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24215859",
    "website": "http://hwns.elchk.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5645830001",
    "schoolCode": "564583",
    "campusCode": "0001",
    "name": "基督教香港信義會興民幼兒學校",
    "nameEn": "ELCHK, HING MAN NURSERY SCHOOL",
    "district": "港島",
    "district18": "東區",
    "address": "香港柴灣興民邨社區中心第3層",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "WD"
    ],
    "variantIds": [
      "edb_564583000111",
      "edb_564583000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "play_explore",
      "project_learn",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25588070",
    "website": "http://www.lphccs.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5658490001",
    "schoolCode": "565849",
    "campusCode": "0001",
    "name": "基督教宣道會海怡幼兒學校",
    "nameEn": "CHRISTIAN & MISSIONARY ALLIANCE SOUTH HORIZONS NURSERY SCHOOL",
    "district": "港島",
    "district18": "南區",
    "address": "香港鴨脷洲怡南路海怡半島第４期２９座高層地面",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_565849000113"
    ],
    "pedagogyTags": [
      "project_learn"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "28733026",
    "website": "http://southhorizons.cmasshk.org",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5658650001",
    "schoolCode": "565865",
    "campusCode": "0001",
    "name": "基督教宣道會利東幼兒學校",
    "nameEn": "CHRISTIAN & MISSIONARY ALLIANCE LEI TUNG NURSERY SCHOOL",
    "district": "港島",
    "district18": "南區",
    "address": "香港鴨脷洲利東邨東興樓地下１０２－１１２室",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_565865000113"
    ],
    "pedagogyTags": [
      "project_learn"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "28712791",
    "website": "http://www.leitung.cmasshk.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_2160110005",
    "schoolCode": "216011",
    "campusCode": "0005",
    "name": "加拿大國際學校",
    "nameEn": "CANADIAN INTERNATIONAL SCHOOL",
    "district": "港島",
    "district18": "南區",
    "address": "香港香港仔南朗山道36號及加拿大國際學校第二期",
    "nature": "international",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_216011000511",
      "edb_216011000512"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25257088",
    "website": "http://www.cdnis.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "low",
      "languageConfidence": "high",
      "needsReview": true
    }
  },
  {
    "id": "edb_2160110006",
    "schoolCode": "216011",
    "campusCode": "0006",
    "name": "加拿大國際學校",
    "nameEn": "CANADIAN INTERNATIONAL SCHOOL",
    "district": "港島",
    "district18": "南區",
    "address": "香港黃竹坑香葉道11號THE SOUTHSIDE地下G21—24號舖",
    "nature": "international",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_216011000611",
      "edb_216011000612"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "",
    "website": "",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "low",
      "languageConfidence": "high",
      "needsReview": true
    }
  },
  {
    "id": "edb_3259960001",
    "schoolCode": "325996",
    "campusCode": "0001",
    "name": "迦南幼稚園(小西灣)",
    "nameEn": "CANNAN KINDERGARTEN (SIU SAI WAN)",
    "district": "港島",
    "district18": "東區",
    "address": "香港小西灣小西灣道１８號富景花園地下部分及１樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_325996000111",
      "edb_325996000112"
    ],
    "pedagogyTags": [
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "english",
      "bilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25052818",
    "website": "http://www.cannan.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_6198410001",
    "schoolCode": "619841",
    "campusCode": "0001",
    "name": "迦南幼稚園(中環堅道)",
    "nameEn": "CANNAN KINDERGARTEN (CENTRAL CAINE ROAD)",
    "district": "港島",
    "district18": "中西區",
    "address": "香港中環堅道99號豐樂閣一樓前座",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_619841000111",
      "edb_619841000112"
    ],
    "pedagogyTags": [
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "english",
      "bilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "",
    "website": "https://www.cannan.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_3259700001",
    "schoolCode": "325970",
    "campusCode": "0001",
    "name": "嘉諾撒聖心幼稚園",
    "nameEn": "SACRED HEART CANOSSIAN KINDERGARTEN",
    "district": "港島",
    "district18": "中西區",
    "address": "香港中環羅便臣道",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_325970000111",
      "edb_325970000112"
    ],
    "pedagogyTags": [
      "play_explore"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25210813",
    "website": "http://www.shck.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_3119100001",
    "schoolCode": "311910",
    "campusCode": "0001",
    "name": "浸信會培理學校",
    "nameEn": "BAPTIST PUI LI SCHOOL",
    "district": "港島",
    "district18": "東區",
    "address": "香港西灣河街１７５－１８１號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_311910000111",
      "edb_311910000112",
      "edb_311910000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "project_learn",
      "language_dev",
      "language_dev",
      "holistic",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25673289",
    "website": "http://www.puili.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5122730002",
    "schoolCode": "512273",
    "campusCode": "0002",
    "name": "救恩學校",
    "nameEn": "KAU YAN SCHOOL",
    "district": "港島",
    "district18": "中西區",
    "address": "香港西營盤高街９７號Ａ１字樓禮堂及高街９７號Ｂ地下第二層至４字樓５字樓及６字樓及地下第一層遊戲場",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_512273000211",
      "edb_512273000212",
      "edb_512273000213"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "project_learn"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "28030304",
    "website": "http://www.kauyan.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5631610001",
    "schoolCode": "563161",
    "campusCode": "0001",
    "name": "救世軍北角幼兒學校",
    "nameEn": "THE SALVATION ARMY NORTH POINT NURSERY SCHOOL",
    "district": "港島",
    "district18": "東區",
    "address": "香港北角健康中街６號健康邨平台２層",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_563161000113"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "project_learn",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "28560892",
    "website": "https://www.salvationarmy.org.hk/esd/npnsc/home.html",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5631450001",
    "schoolCode": "563145",
    "campusCode": "0001",
    "name": "救世軍華富幼兒學校",
    "nameEn": "THE SALVATION ARMY WAH FU NURSERY SCHOOL",
    "district": "港島",
    "district18": "南區",
    "address": "香港華富邨華生樓123-127及223-229室",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_563145000113"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "project_learn",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25516341",
    "website": "http://salvationarmy.org.hk/esd/wfns",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_3238530002",
    "schoolCode": "323853",
    "campusCode": "0002",
    "name": "卡莎迪曼幼稚園",
    "nameEn": "KHALSA DIWAN KINDERGARTEN",
    "district": "港島",
    "district18": "灣仔區",
    "address": "香港天后永興街10-12號田華閣3樓B室",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM"
    ],
    "variantIds": [
      "edb_323853000211"
    ],
    "pedagogyTags": [
      "project_learn",
      "language_dev"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27020366",
    "website": "https://www.kdkkindergarten.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5698280001",
    "schoolCode": "569828",
    "campusCode": "0001",
    "name": "康怡維多利亞幼稚園",
    "nameEn": "KORNHILL VICTORIA KINDERGARTEN",
    "district": "港島",
    "district18": "東區",
    "address": "香港鰂魚涌康怡花園康安街１８號２樓部份（包括幼兒中心共用範圍）",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_569828000111",
      "edb_569828000112",
      "edb_569828000113"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "play_explore",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "28851888",
    "website": "http://www.victoria.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_6226990001",
    "schoolCode": "622699",
    "campusCode": "0001",
    "name": "樂沛兒幼稚園 — 柴灣",
    "nameEn": "HONG KONG NOBEL PRESCHOOL - CHAI WAN",
    "district": "港島",
    "district18": "東區",
    "address": "香港柴灣泰民街14號康翠臺第7座地下低層部分及平台",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_622699000111",
      "edb_622699000112",
      "edb_622699000113"
    ],
    "pedagogyTags": [
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "36188980",
    "website": "",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5937700002",
    "schoolCode": "593770",
    "campusCode": "0002",
    "name": "樂䔄幼稚園",
    "nameEn": "PODS KINDERGARTEN",
    "district": "港島",
    "district18": "灣仔區",
    "address": "香港北角天后廟道4號景香樓1樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_593770000211",
      "edb_593770000212"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "",
    "website": "http://www.pods.com.hk/school.php",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5134230001",
    "schoolCode": "513423",
    "campusCode": "0001",
    "name": "禮賢會學校",
    "nameEn": "RHENISH MISSION SCHOOL",
    "district": "港島",
    "district18": "中西區",
    "address": "香港般咸道86號A來恩樓地下至四樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_513423000111",
      "edb_513423000112",
      "edb_513423000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "play_explore",
      "project_learn",
      "project_learn",
      "project_learn",
      "language_dev",
      "holistic",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "trilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25470608",
    "website": "",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_3256190001",
    "schoolCode": "325619",
    "campusCode": "0001",
    "name": "勵志會陳鄭潔雲幼稚園",
    "nameEn": "THE ENDEAVOURERS CHAN CHENG KIT WAN KINDERGARTEN",
    "district": "港島",
    "district18": "東區",
    "address": "香港柴灣翠灣邨翠壽樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_325619000111",
      "edb_325619000112",
      "edb_325619000113"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "project_learn",
      "project_learn",
      "language_dev"
    ],
    "languageEnv": [
      "putonghua",
      "english",
      "native_english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "2556353625578224",
    "website": "https://www.tekg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5891440001",
    "schoolCode": "589144",
    "campusCode": "0001",
    "name": "嶺南幼稚園(小西灣)",
    "nameEn": "LINGNAN KINDERGARTEN (SIU SAI WAN)",
    "district": "港島",
    "district18": "東區",
    "address": "香港小西灣道23號富怡花園幼稚園大樓1樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_589144000111",
      "edb_589144000112",
      "edb_589144000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "28932686",
    "website": "https://lingnankn.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_6105340001",
    "schoolCode": "610534",
    "campusCode": "0001",
    "name": "嶺南幼稚園(小西灣)二校",
    "nameEn": "LINGNAN NO.2 KINDERGARTEN (SIU SAI WAN)",
    "district": "港島",
    "district18": "東區",
    "address": "香港小西灣道23號富怡花園幼稚園大樓地下104、105室(包括幼兒中心共用範圍)",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_610534000111",
      "edb_610534000112"
    ],
    "pedagogyTags": [
      "play_explore",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "28932322",
    "website": "http://www.lingnankn.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5657500001",
    "schoolCode": "565750",
    "campusCode": "0001",
    "name": "路德會利東幼兒園",
    "nameEn": "LEI TUNG LUTHERAN DAY NURSERY",
    "district": "港島",
    "district18": "南區",
    "address": "香港鴨脷洲利東邨東茂樓地下１１３－１２３號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "WD"
    ],
    "variantIds": [
      "edb_565750000111",
      "edb_565750000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "28713164",
    "website": "http://leitung-nursery.hklss.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5360400001",
    "schoolCode": "536040",
    "campusCode": "0001",
    "name": "路德會聖雅各幼稚園",
    "nameEn": "ST. JAMES LUTHERAN KINDERGARTEN",
    "district": "港島",
    "district18": "東區",
    "address": "香港柴灣興華（一）邨卓華樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_536040000111",
      "edb_536040000112",
      "edb_536040000113"
    ],
    "pedagogyTags": [
      "play_explore"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "28982128",
    "website": "https://www.sjlk.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_3166600001",
    "schoolCode": "316660",
    "campusCode": "0001",
    "name": "路德會錫安堂幼稚園",
    "nameEn": "ZION LUTHERAN KINDERGARTEN",
    "district": "港島",
    "district18": "東區",
    "address": "香港英皇道２７５號３樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_316660000111",
      "edb_316660000112"
    ],
    "pedagogyTags": [
      "play_explore",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25712570",
    "website": "http://kindergarten.zionluth.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5658300001",
    "schoolCode": "565830",
    "campusCode": "0001",
    "name": "路德會杏花邨幼兒園",
    "nameEn": "HENG FA CHUEN LUTHERAN DAY NURSERY",
    "district": "港島",
    "district18": "東區",
    "address": "香港柴灣杏花邨盛泰道１００號地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "WD"
    ],
    "variantIds": [
      "edb_565830000111",
      "edb_565830000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "28976225",
    "website": "http://www.hengfakids.org",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_2157670001",
    "schoolCode": "215767",
    "campusCode": "0001",
    "name": "瑪歌瑞特國際幼稚園(康怡)",
    "nameEn": "MAGART INTERNATIONAL KINDERGARTEN (KORNHILL)",
    "district": "港島",
    "district18": "東區",
    "address": "香港鰂魚涌康盛街16號康怡花園",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "british",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_215767000111",
      "edb_215767000112"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "play_explore",
      "project_learn"
    ],
    "languageEnv": [
      "putonghua",
      "english",
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27869152",
    "website": "http://www.magartedu.com",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5484300006",
    "schoolCode": "548430",
    "campusCode": "0006",
    "name": "蒙特梭利國際學校",
    "nameEn": "THE INTERNATIONAL MONTESSORI SCHOOL - AN IMEF SCHOOL",
    "district": "港島",
    "district18": "南區",
    "address": "香港赤柱馬坑邨第三期",
    "nature": "international",
    "curriculumCategory": "non_local",
    "curriculumType": "montessori",
    "joinedKGP": false,
    "sessions": [
      "AM"
    ],
    "variantIds": [
      "edb_548430000611"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "play_explore",
      "play_explore",
      "holistic"
    ],
    "languageEnv": [
      "english",
      "bilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25667196",
    "website": "https://www.ims.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5484300003",
    "schoolCode": "548430",
    "campusCode": "0003",
    "name": "蒙特梭利國際學校",
    "nameEn": "THE INTERNATIONAL MONTESSORI SCHOOL - AN IMEF SCHOOL",
    "district": "港島",
    "district18": "南區",
    "address": "香港鴨脷洲海怡半島海怡路17-23A號第3期二層平台幼稚園校舍",
    "nature": "international",
    "curriculumCategory": "non_local",
    "curriculumType": "montessori",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_548430000311",
      "edb_548430000312"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "play_explore",
      "play_explore",
      "holistic"
    ],
    "languageEnv": [
      "english",
      "bilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "28610339",
    "website": "https://www.ims.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5484300007",
    "schoolCode": "548430",
    "campusCode": "0007",
    "name": "蒙特梭利國際學校",
    "nameEn": "THE INTERNATIONAL MONTESSORI SCHOOL - AN IMEF SCHOOL",
    "district": "港島",
    "district18": "南區",
    "address": "香港筲箕灣道１５５號譽‧東２樓６號舖",
    "nature": "international",
    "curriculumCategory": "non_local",
    "curriculumType": "montessori",
    "joinedKGP": false,
    "sessions": [
      "AM"
    ],
    "variantIds": [
      "edb_548430000711"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "play_explore",
      "play_explore",
      "holistic"
    ],
    "languageEnv": [
      "english",
      "bilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "21569033",
    "website": "http://www.ims.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5484300004",
    "schoolCode": "548430",
    "campusCode": "0004",
    "name": "蒙特梭利國際學校",
    "nameEn": "THE INTERNATIONAL MONTESSORI SCHOOL - AN IMEF SCHOOL",
    "district": "港島",
    "district18": "南區",
    "address": "香港上環普仁街17號東輝花園1樓1室及閣樓",
    "nature": "international",
    "curriculumCategory": "non_local",
    "curriculumType": "montessori",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_548430000411",
      "edb_548430000412"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "play_explore",
      "play_explore",
      "holistic"
    ],
    "languageEnv": [
      "english",
      "bilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "28577007",
    "website": "https://www.ims.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5659540001",
    "schoolCode": "565954",
    "campusCode": "0001",
    "name": "明愛堅尼地城幼兒學校",
    "nameEn": "CARITAS NURSERY SCHOOL - KENNEDY TOWN",
    "district": "港島",
    "district18": "中西區",
    "address": "香港蒲飛路27號堅尼地城明愛服務中心A座2樓，B座1樓部份，M1樓部份及2樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_565954000113"
    ],
    "pedagogyTags": [
      "project_learn",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "28168008",
    "website": "http://ktns.caritas.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_3222700001",
    "schoolCode": "322270",
    "campusCode": "0001",
    "name": "明愛凌月仙幼稚園",
    "nameEn": "CARITAS LING YUET SIN KINDERGARTEN",
    "district": "港島",
    "district18": "中西區",
    "address": "香港薄扶林道５４號地下至２樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "WD"
    ],
    "variantIds": [
      "edb_322270000111",
      "edb_322270000113"
    ],
    "pedagogyTags": [
      "project_learn",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25178785",
    "website": "http://lyskg.caritas.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5660390001",
    "schoolCode": "566039",
    "campusCode": "0001",
    "name": "明愛香港太平洋獅子會幼兒學校",
    "nameEn": "CARITAS LIONS CLUB OF HONG KONG (PACIFIC) NURSERY SCHOOL",
    "district": "港島",
    "district18": "東區",
    "address": "香港柴灣小西灣道９號富欣花園停車場地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_566039000113"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "play_explore",
      "project_learn",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25053553",
    "website": "http://lcns.caritas.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5669770001",
    "schoolCode": "566977",
    "campusCode": "0001",
    "name": "明慧國際幼稚園",
    "nameEn": "MING WAI INTERNATIONAL KINDERGARTEN",
    "district": "港島",
    "district18": "東區",
    "address": "香港北角七姊妹道10-12號雅利閣地下及1樓 A及B室",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_566977000111",
      "edb_566977000112",
      "edb_566977000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "putonghua",
      "english",
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25615008",
    "website": "http://www.mingwai.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "low",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": true
    }
  },
  {
    "id": "edb_5673290001",
    "schoolCode": "567329",
    "campusCode": "0001",
    "name": "明慧國際幼稚園（北角分校）",
    "nameEn": "MING WAI INTERNATIONAL KINDERGARTEN (NORTH POINT BRANCH)",
    "district": "港島",
    "district18": "東區",
    "address": "香港北角七姊妹道５－１３號昌輝閣地下１號舖及１樓",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_567329000111",
      "edb_567329000112",
      "edb_567329000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "putonghua",
      "english",
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "29040638",
    "website": "http://www.mingwai.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_3210870001",
    "schoolCode": "321087",
    "campusCode": "0001",
    "name": "明慧幼稚園",
    "nameEn": "MING WAI KINDERGARTEN",
    "district": "港島",
    "district18": "東區",
    "address": "香港七姊妹道２－８號二樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_321087000111",
      "edb_321087000112"
    ],
    "pedagogyTags": [
      "play_explore",
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "putonghua",
      "english",
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25615804",
    "website": "http://www.mingwai.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_3242300001",
    "schoolCode": "324230",
    "campusCode": "0001",
    "name": "明我幼稚園",
    "nameEn": "DOMINIC SAVIO KINDERGARTEN",
    "district": "港島",
    "district18": "東區",
    "address": "香港筲箕灣海寧街３號１樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_324230000111",
      "edb_324230000112",
      "edb_324230000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25680181",
    "website": "http://www.dominicsaviokg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "low",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": true
    }
  },
  {
    "id": "edb_3242300002",
    "schoolCode": "324230",
    "campusCode": "0002",
    "name": "明我幼稚園",
    "nameEn": "DOMINIC SAVIO KINDERGARTEN",
    "district": "港島",
    "district18": "東區",
    "address": "香港筲箕灣西灣河街９６號１樓及２樓Ａ、Ｂ、Ｄ室",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_324230000211",
      "edb_324230000212",
      "edb_324230000213"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25680181",
    "website": "http://www.dominicsaviokg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "low",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": true
    }
  },
  {
    "id": "edb_5182470001",
    "schoolCode": "518247",
    "campusCode": "0001",
    "name": "穆斯林幼稚園",
    "nameEn": "MUSLIM COMMUNITY KINDERGARTEN",
    "district": "港島",
    "district18": "灣仔區",
    "address": "香港灣仔愛群道４０號地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_518247000111",
      "edb_518247000112"
    ],
    "pedagogyTags": [
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "28910552",
    "website": "http://www.mck.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5600900001",
    "schoolCode": "560090",
    "campusCode": "0001",
    "name": "啓思幼稚園（深灣軒）",
    "nameEn": "CREATIVE KINDERGARTEN (SHAM WAN TOWERS)",
    "district": "港島",
    "district18": "南區",
    "address": "香港鴨脷洲鴨脷洲徑３號深灣軒地下（包括幼兒中心）",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_560090000111",
      "edb_560090000112",
      "edb_560090000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "holistic",
      "holistic",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "28731333",
    "website": "http://www.creative.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_2158300001",
    "schoolCode": "215830",
    "campusCode": "0001",
    "name": "啓思幼稚園﹝杏花邨﹞",
    "nameEn": "CREATIVE KINDERGARTEN (HENG FA CHUEN)",
    "district": "港島",
    "district18": "東區",
    "address": "香港杏花邨盛泰道１００號幼稚園Ｂ（幼兒中心專用範圍除外）",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_215830000111",
      "edb_215830000112",
      "edb_215830000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "holistic",
      "holistic",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25950638",
    "website": "http://www.creative.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5654400001",
    "schoolCode": "565440",
    "campusCode": "0001",
    "name": "仁濟醫院方江輝幼稚園",
    "nameEn": "YAN CHAI HOSPITAL FONG KONG FAI KINDERGARTEN",
    "district": "港島",
    "district18": "中西區",
    "address": "香港堅尼地城海旁２６號龍翔花園地下Ａ舖",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_565440000113"
    ],
    "pedagogyTags": [
      "project_learn",
      "project_learn",
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "28182069",
    "website": "http://www.ychfkf.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5634390001",
    "schoolCode": "563439",
    "campusCode": "0001",
    "name": "仁濟醫院郭子樑幼稚園",
    "nameEn": "YAN CHAI HOSPITAL KWOK CHI LEUNG KINDERGARTEN",
    "district": "港島",
    "district18": "中西區",
    "address": "香港西營盤高街９號地下上層（南）",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_563439000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "project_learn",
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25478250",
    "website": "http://www.ychkclkg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_3248500001",
    "schoolCode": "324850",
    "campusCode": "0001",
    "name": "嗇色園主辦可仁幼稚園",
    "nameEn": "HO YAN KINDERGARTEN (SPONSORED BY SIK SIK YUEN)",
    "district": "港島",
    "district18": "南區",
    "address": "香港鴨脷洲邨利添樓地下21-40號室",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_324850000111",
      "edb_324850000112",
      "edb_324850000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "project_learn",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25552191",
    "website": "http://www.hoyankg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_6003340002",
    "schoolCode": "600334",
    "campusCode": "0002",
    "name": "善行國際幼稚園",
    "nameEn": "MASS INTERNATIONAL PRESCHOOL",
    "district": "港島",
    "district18": "灣仔區",
    "address": "香港大坑勵德邨道2號勵德坊8座地下及低層地下2號舖",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_600334000211",
      "edb_600334000212"
    ],
    "pedagogyTags": [],
    "languageEnv": [],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "39551588",
    "website": "https://www.masspreschool.com",
    "dataQuality": {
      "curriculumConfidence": "low",
      "pedagogyConfidence": "low",
      "languageConfidence": "low",
      "needsReview": true
    }
  },
  {
    "id": "edb_5664200001",
    "schoolCode": "566420",
    "campusCode": "0001",
    "name": "筲箕灣崇真幼兒學校",
    "nameEn": "SHAUKIWAN TSUNG TSIN NURSERY SCHOOL",
    "district": "港島",
    "district18": "東區",
    "address": "香港筲箕灣巴色道４號筲箕灣崇真堂２樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_566420000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25676880",
    "website": "http://www.skwttns.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5169100001",
    "schoolCode": "516910",
    "campusCode": "0001",
    "name": "筲箕灣街坊福利會張錦添紀念幼稚園",
    "nameEn": "SHAUKIWAN KAI FONG WELFARE COMMUNITY CENTRE CHEUNG KAM TIM MEMORIAL KINDERGARTEN",
    "district": "港島",
    "district18": "東區",
    "address": "香港筲箕灣南安街一零三號地下及一樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_516910000111",
      "edb_516910000112",
      "edb_516910000113"
    ],
    "pedagogyTags": [
      "language_dev",
      "holistic",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25693112",
    "website": "http://www.elementiedu.org",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5433570001",
    "schoolCode": "543357",
    "campusCode": "0001",
    "name": "筲箕灣循道衞理幼稚園",
    "nameEn": "SHAU KEI WAN METHODIST KINDERGARTEN",
    "district": "港島",
    "district18": "東區",
    "address": "香港筲箕灣愛東邨愛旭樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_543357000111",
      "edb_543357000112",
      "edb_543357000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "31562523",
    "website": "http://www.skwmk.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_2136320002",
    "schoolCode": "213632",
    "campusCode": "0002",
    "name": "聖安多尼中英文小學暨幼稚園",
    "nameEn": "ST ANTHONY'S ANGLO-CHINESE PRIMARY SCHOOL & KINDERGARTEN",
    "district": "港島",
    "district18": "中西區",
    "address": "香港西環日富里7—13號富基大廈1樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_213632000211",
      "edb_213632000212",
      "edb_213632000213"
    ],
    "pedagogyTags": [
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24948848",
    "website": "https://www.central-western.stanthonyskg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_2157400001",
    "schoolCode": "215740",
    "campusCode": "0001",
    "name": "聖安娜中英文幼稚園",
    "nameEn": "ST ANNA ANGLO-CHINESE KINDERGARTEN",
    "district": "港島",
    "district18": "東區",
    "address": "香港鰂魚涌太古城道８號觀海台東海閣２樓Ｐ９０１號舖及太榮路２號南海閣平台（包括幼兒中心）",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_215740000111",
      "edb_215740000112",
      "edb_215740000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25699269",
    "website": "http://stanna.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5631880001",
    "schoolCode": "563188",
    "campusCode": "0001",
    "name": "聖保祿幼兒園",
    "nameEn": "ST PAUL'S DAY NURSERY",
    "district": "港島",
    "district18": "灣仔區",
    "address": "香港銅鑼灣禮頓道140A號地下部份 3字樓 4字樓及6字樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_563188000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25770406",
    "website": "http://www.spn.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_2146120001",
    "schoolCode": "214612",
    "campusCode": "0001",
    "name": "聖保祿幼稚園",
    "nameEn": "ST. PAUL'S KINDERGARTEN",
    "district": "港島",
    "district18": "灣仔區",
    "address": "香港禮頓道１０１８地段地下至２樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_214612000111",
      "edb_214612000112"
    ],
    "pedagogyTags": [
      "project_learn"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25763793",
    "website": "http://www.spk.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_1314660001",
    "schoolCode": "131466",
    "campusCode": "0001",
    "name": "聖保羅堂幼稚園",
    "nameEn": "ST. PAUL'S CHURCH KINDERGARTEN",
    "district": "港島",
    "district18": "中西區",
    "address": "香港己連拿利(鐵崗)聖保羅堂伍庭芳堂及活動室及約翰馬利樓地下至三樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_131466000111",
      "edb_131466000112"
    ],
    "pedagogyTags": [
      "play_explore",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24533766",
    "website": "http://www.stpaulchurchkg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_3254570001",
    "schoolCode": "325457",
    "campusCode": "0001",
    "name": "聖道明中英文幼稚園",
    "nameEn": "ST. DOMINIC ANGLO-CHINESE KINDERGARTEN",
    "district": "港島",
    "district18": "東區",
    "address": "香港柴灣盛泰路100號杏花邨一座側幼稚園A(包括幼兒中心)",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_325457000111",
      "edb_325457000112",
      "edb_325457000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "28980803",
    "website": "http://www.stdominic.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_3136370001",
    "schoolCode": "313637",
    "campusCode": "0001",
    "name": "聖德蘭幼稚園",
    "nameEn": "ST. TERESA'S KINDERGARTEN",
    "district": "港島",
    "district18": "南區",
    "address": "香港赤柱東頭灣道1號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_313637000111",
      "edb_313637000112",
      "edb_313637000113"
    ],
    "pedagogyTags": [
      "holistic"
    ],
    "languageEnv": [
      "trilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "28138567",
    "website": "http://www.sttkg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_3260030001",
    "schoolCode": "326003",
    "campusCode": "0001",
    "name": "聖公會聖彼得堂幼稚園（赤柱分校）",
    "nameEn": "ST. PETER'S CHURCH KINDERGARTEN (STANLEY)",
    "district": "港島",
    "district18": "南區",
    "address": "香港赤柱馬坑邨健馬樓地下１號舖",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_326003000111",
      "edb_326003000112",
      "edb_326003000113"
    ],
    "pedagogyTags": [
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "28136130",
    "website": "http://stpstkg.edu.hk/zh_tw/site/index",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5697120001",
    "schoolCode": "569712",
    "campusCode": "0001",
    "name": "聖公會聖基道幼兒園(灣仔)",
    "nameEn": "S K H ST CHRISTOPHER'S NURSERY (WAN CHAI)",
    "district": "港島",
    "district18": "灣仔區",
    "address": "香港灣仔灣仔道３號３樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_569712000113"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "play_explore",
      "project_learn",
      "language_dev",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english",
      "native_english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "28327101",
    "website": "http://www.skhsch.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_1316360002",
    "schoolCode": "131636",
    "campusCode": "0002",
    "name": "聖公會幼稚園",
    "nameEn": "SHENG KUNG HUI KINDERGARTEN",
    "district": "港島",
    "district18": "灣仔區",
    "address": "香港銅鑼灣東院道7號 地下有蓋遊戲場 101-103室 201-203室 301-303室及4樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_131636000211",
      "edb_131636000212"
    ],
    "pedagogyTags": [
      "project_learn",
      "language_dev",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25234905",
    "website": "http://www.skhkg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_3226870001",
    "schoolCode": "322687",
    "campusCode": "0001",
    "name": "聖公會主誕堂幼稚園",
    "nameEn": "SHENG KUNG HUI HOLY NATIVITY CHURCH KINDERGARTEN",
    "district": "港島",
    "district18": "東區",
    "address": "香港筲箕灣阿公岩道２５號地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_322687000111",
      "edb_322687000112",
      "edb_322687000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25601713",
    "website": "http://www.skhhnck.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "low",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": true
    }
  },
  {
    "id": "edb_2100210001",
    "schoolCode": "210021",
    "campusCode": "0001",
    "name": "聖嘉勒小學",
    "nameEn": "ST. CLARE'S PRIMARY SCHOOL",
    "district": "港島",
    "district18": "中西區",
    "address": "香港般咸道光景台3-6號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_210021000111",
      "edb_210021000112"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "project_learn",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "putonghua",
      "english",
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25472751",
    "website": "https://kg.scps.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_3198130001",
    "schoolCode": "319813",
    "campusCode": "0001",
    "name": "聖馬太堂幼稚園",
    "nameEn": "ST. MATTHEW'S CHURCH KINDERGARTEN",
    "district": "港島",
    "district18": "中西區",
    "address": "香港荷李活道232-234號及新街29-31號地下、1樓及4樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_319813000111",
      "edb_319813000112",
      "edb_319813000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "project_learn",
      "project_learn",
      "language_dev",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25484777",
    "website": "https://stmattkg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_1328960001",
    "schoolCode": "132896",
    "campusCode": "0001",
    "name": "聖士提反女子中學附屬幼稚園",
    "nameEn": "ST. STEPHEN'S GIRLS' COLLEGE KINDERGARTEN",
    "district": "港島",
    "district18": "中西區",
    "address": "香港柏道３３號地下部份車庫及一樓全層",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_132896000111",
      "edb_132896000112"
    ],
    "pedagogyTags": [
      "project_learn",
      "language_dev",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25486607",
    "website": "http://www.ssgc.edu.hk/kg",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_1314400001",
    "schoolCode": "131440",
    "campusCode": "0001",
    "name": "聖士提反堂小學暨幼稚園",
    "nameEn": "ST. STEPHEN'S CHURCH PRIMARY SCHOOL & KINDERGARTEN",
    "district": "港島",
    "district18": "中西區",
    "address": "香港般咸道71號及薄扶林道62號小學座(2樓 3樓303-305室及教員室除外)及教堂座地下地庫1樓及2樓及地庫3樓活動室",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_131440000111",
      "edb_131440000112",
      "edb_131440000113"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "play_explore",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "putonghua",
      "english",
      "native_english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25462863",
    "website": "http://www.ssck.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_2158990001",
    "schoolCode": "215899",
    "campusCode": "0001",
    "name": "聖文嘉中英文幼稚園",
    "nameEn": "ST. MONICA'S ANGLO-CHINESE KINDERGARTEN",
    "district": "港島",
    "district18": "南區",
    "address": "香港鴨脷洲利東邨第２期東昇樓地下及１樓３１７至３２４及４１７至４２４號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_215899000111",
      "edb_215899000112",
      "edb_215899000113"
    ],
    "pedagogyTags": [
      "project_learn",
      "language_dev",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "28746187",
    "website": "http://www.stmonicaskg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_2160380001",
    "schoolCode": "216038",
    "campusCode": "0001",
    "name": "聖文嘉中英文幼稚園（華貴邨）",
    "nameEn": "ST. MONICA'S ANGLO-CHINESE KINDERGARTEN (WAH KWAI ESTATE)",
    "district": "港島",
    "district18": "南區",
    "address": "香港奇力灣華貴邨第２期華賢樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_216038000111",
      "edb_216038000112",
      "edb_216038000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25519796",
    "website": "http://www.stmonicawk.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5643540001",
    "schoolCode": "564354",
    "campusCode": "0001",
    "name": "聖雅各福群會寶翠園幼稚園",
    "nameEn": "ST JAMES' SETTLEMENT BELCHER KINDERGARTEN",
    "district": "港島",
    "district18": "中西區",
    "address": "香港西環卑路乍街８號西寶城商場平台２樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_564354000113"
    ],
    "pedagogyTags": [
      "project_learn",
      "project_learn",
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "trilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "2542760825427678",
    "website": "http://www.sjsbelcher.org",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5643380003",
    "schoolCode": "564338",
    "campusCode": "0003",
    "name": "聖雅各福群會麥潔蓮幼稚園",
    "nameEn": "ST JAMES' SETTLEMENT KATHLEEN MCDOUALL KINDERGARTEN",
    "district": "港島",
    "district18": "灣仔區",
    "address": "香港灣仔堅尼地道１００號３樓至６樓部份",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_564338000311",
      "edb_564338000312",
      "edb_564338000313"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "project_learn",
      "language_dev",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25962523",
    "website": "http://kmccc.sjs.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5643460001",
    "schoolCode": "564346",
    "campusCode": "0001",
    "name": "聖雅各福群會銅鑼灣幼稚園",
    "nameEn": "ST JAMES' SETTLEMENT CAUSEWAY BAY KINDERGARTEN",
    "district": "港島",
    "district18": "灣仔區",
    "address": "香港銅鑼灣伊榮街７－１７號欣榮商業大廈地下３及８－１０號舖及１樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_564346000113"
    ],
    "pedagogyTags": [
      "project_learn",
      "language_dev"
    ],
    "languageEnv": [
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "28081391",
    "website": "http://cbccc.sjs.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_1327300001",
    "schoolCode": "132730",
    "campusCode": "0001",
    "name": "蘇浙小學校",
    "nameEn": "KIANGSU & CHEKIANG PRIMARY SCHOOL",
    "district": "港島",
    "district18": "東區",
    "address": "香港北角清華街３０號（幼兒中心專用範圍除外）",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_132730000111",
      "edb_132730000112",
      "edb_132730000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "project_learn"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25704173",
    "website": "http://www.kcs.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "low",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": true
    }
  },
  {
    "id": "edb_5527390002",
    "schoolCode": "552739",
    "campusCode": "0002",
    "name": "太陽島英文幼稚園(西營盤分校)",
    "nameEn": "SUN ISLAND ENGLISH KINDERGARTEN (SAI YING PUN BRANCH)",
    "district": "港島",
    "district18": "中西區",
    "address": "香港皇后大道西323號安達中心1樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_552739000211",
      "edb_552739000212",
      "edb_552739000213"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "trilingual",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "28187074",
    "website": "",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5527390001",
    "schoolCode": "552739",
    "campusCode": "0001",
    "name": "太陽島英文幼稚園(西營盤分校)",
    "nameEn": "SUN ISLAND ENGLISH KINDERGARTEN (SAI YING PUN BRANCH)",
    "district": "港島",
    "district18": "中西區",
    "address": "香港西環卑路乍街56號嘉明大廈地下入口及1至3樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_552739000111",
      "edb_552739000112",
      "edb_552739000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "28187074",
    "website": "http://www.sunisland.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "low",
      "pedagogyConfidence": "medium",
      "languageConfidence": "high",
      "needsReview": true
    }
  },
  {
    "id": "edb_3240940001",
    "schoolCode": "324094",
    "campusCode": "0001",
    "name": "天主教海星幼稚園",
    "nameEn": "STAR OF THE SEA CATHOLIC KINDERGARTEN",
    "district": "港島",
    "district18": "東區",
    "address": "香港柴灣道200號4樓及5樓部份範圍(包括521至525室)",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_324094000111",
      "edb_324094000112",
      "edb_324094000113"
    ],
    "pedagogyTags": [
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25588836",
    "website": "http://www.starkg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_3121340002",
    "schoolCode": "312134",
    "campusCode": "0002",
    "name": "天主教聖伯多祿幼稚園",
    "nameEn": "ST. PETER'S CATHOLIC KINDERGARTEN",
    "district": "港島",
    "district18": "南區",
    "address": "香港石排灣邨碧輝樓地下３號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_312134000211",
      "edb_312134000212",
      "edb_312134000213"
    ],
    "pedagogyTags": [
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25537823",
    "website": "http://www.sppkg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_3253680001",
    "schoolCode": "325368",
    "campusCode": "0001",
    "name": "天主教聖瑪加利大幼稚園",
    "nameEn": "ST. MARGARET MARY'S CATHOLIC KINDERGARTEN",
    "district": "港島",
    "district18": "灣仔區",
    "address": "香港跑馬地樂活道２號Ａ聖瑪加利大堂區中心３樓及４樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_325368000111",
      "edb_325368000112"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "project_learn",
      "holistic",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25769824",
    "website": "http://www.stmkg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5669420001",
    "schoolCode": "566942",
    "campusCode": "0001",
    "name": "銅鑼灣維多利亞(海峰園)幼兒園",
    "nameEn": "CAUSEWAY BAY VICTORIA NURSERY (HARBOUR HEIGHTS)",
    "district": "港島",
    "district18": "東區",
    "address": "香港北角福蔭道1、3 ＆ 5 號海峰園高峰閣第1座1樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_566942000111",
      "edb_566942000112",
      "edb_566942000113"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "project_learn",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25717888",
    "website": "http://www.victoria.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_3256510001",
    "schoolCode": "325651",
    "campusCode": "0001",
    "name": "銅鑼灣維多利亞國際幼稚園",
    "nameEn": "CAUSEWAY BAY VICTORIA INTERNATIONAL KINDERGARTEN",
    "district": "港島",
    "district18": "灣仔區",
    "address": "香港銅鑼灣興發街32-36號三樓及天台",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "ib",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_325651000111",
      "edb_325651000112",
      "edb_325651000113"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "holistic"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25789998",
    "website": "https://www.cbvictoria.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_3247790001",
    "schoolCode": "324779",
    "campusCode": "0001",
    "name": "銅鑼灣維多利亞幼稚園",
    "nameEn": "CAUSEWAY BAY VICTORIA KINDERGARTEN",
    "district": "港島",
    "district18": "灣仔區",
    "address": "香港銅鑼灣興發街32-36號地下及二樓",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "ib",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_324779000111",
      "edb_324779000112",
      "edb_324779000113"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "holistic"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25789998",
    "website": "https://www.cbvictoria.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5421640001",
    "schoolCode": "542164",
    "campusCode": "0001",
    "name": "維多利亞(寶翠園)幼稚園",
    "nameEn": "VICTORIA (BELCHER) KINDERGARTEN",
    "district": "港島",
    "district18": "中西區",
    "address": "香港卑路乍街８號西寶城３樓（幼稚園）（包括幼兒中心）",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_542164000111",
      "edb_542164000112",
      "edb_542164000113"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "play_explore",
      "project_learn",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25427001",
    "website": "http://www.victoria.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5669340001",
    "schoolCode": "566934",
    "campusCode": "0001",
    "name": "維多利亞(海峰園)幼兒園",
    "nameEn": "VICTORIA NURSERY (HARBOUR HEIGHTS)",
    "district": "港島",
    "district18": "東區",
    "address": "香港北角福蔭道1，3＆5號海峰園高峰閣第1座2樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_566934000111",
      "edb_566934000112"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "project_learn",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25713456",
    "website": "http://www.victoria.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_2161940001",
    "schoolCode": "216194",
    "campusCode": "0001",
    "name": "維多利亞（海怡）國際幼稚園",
    "nameEn": "VICTORIA (SOUTH HORIZONS) INTERNATIONAL KINDERGARTEN",
    "district": "港島",
    "district18": "南區",
    "address": "香港鴨脷洲海怡半島第２期平台（包括幼兒中心）",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_216194000111",
      "edb_216194000112",
      "edb_216194000113"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english",
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25808633",
    "website": "http://www.victoria.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5663650001",
    "schoolCode": "566365",
    "campusCode": "0001",
    "name": "維多利亞（康怡）幼兒園",
    "nameEn": "VICTORIA (KORNHILL) NURSERY",
    "district": "港島",
    "district18": "東區",
    "address": "香港鰂魚涌康怡花園康愉街１４號地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_566365000111",
      "edb_566365000112",
      "edb_566365000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25131108",
    "website": "http://www.victoria.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "low",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": true
    }
  },
  {
    "id": "edb_3254810001",
    "schoolCode": "325481",
    "campusCode": "0001",
    "name": "維多利亞幼稚園",
    "nameEn": "VICTORIA KINDERGARTEN",
    "district": "港島",
    "district18": "東區",
    "address": "香港鰂魚涌康山康安街２－８號康怡花園Ｒ座地下及地下下層（包括幼兒中心）",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_325481000111",
      "edb_325481000112",
      "edb_325481000113"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "play_explore",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "28853331",
    "website": "http://www.victoria.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5662840001",
    "schoolCode": "566284",
    "campusCode": "0001",
    "name": "偉思幼兒園",
    "nameEn": "WISELY NURSERY",
    "district": "港島",
    "district18": "中西區",
    "address": "香港中環堅道１２９－１３３號地下及１樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_566284000111",
      "edb_566284000112",
      "edb_566284000113"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "play_explore",
      "project_learn",
      "project_learn",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25462022",
    "website": "http://www.wisely.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_2142480001",
    "schoolCode": "214248",
    "campusCode": "0001",
    "name": "偉思幼稚園",
    "nameEn": "WISELY KINDERGARTEN",
    "district": "港島",
    "district18": "中西區",
    "address": "香港堅道１２９－１３３號地庫１－３層",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_214248000111",
      "edb_214248000112",
      "edb_214248000113"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "play_explore",
      "project_learn",
      "project_learn",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25462022",
    "website": "http://www.wisely.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_6083190001",
    "schoolCode": "608319",
    "campusCode": "0001",
    "name": "香島華德福學校",
    "nameEn": "ISLAND WALDORF SCHOOL",
    "district": "港島",
    "district18": "中西區",
    "address": "香港士美菲路71-77號嘉輝花園低層地下入口及地下1號舖",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_608319000111",
      "edb_608319000112"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "51141451",
    "website": "https://iws.edu.hk/?gclid=EAIaIQobChMIx6P01ujS-wIVEdGWCh0h1AD1EAAYASAAEgJue_D_BwE",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "low",
      "languageConfidence": "high",
      "needsReview": true
    }
  },
  {
    "id": "edb_5652530001",
    "schoolCode": "565253",
    "campusCode": "0001",
    "name": "香港保護兒童會譚雅士幼兒學校",
    "nameEn": "HONG KONG SOCIETY FOR THE PROTECTION OF CHILDREN THOMAS TAM NURSERY SCHOOL",
    "district": "港島",
    "district18": "中西區",
    "address": "香港西營盤醫院道佐治五世紀念公園",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_565253000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25495107",
    "website": "http://www.hkspc.org",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5642300001",
    "schoolCode": "564230",
    "campusCode": "0001",
    "name": "香港東區婦女福利會黎桂添幼兒園",
    "nameEn": "WOMEN'S WELFARE CLUB (EASTERN DISTRICT) HONG KONG LAI KWAI TIM DAY NURSERY",
    "district": "港島",
    "district18": "東區",
    "address": "香港北角丹拿道５３號港運城２樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_564230000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "28563192",
    "website": "http://lktnursery.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5642220001",
    "schoolCode": "564222",
    "campusCode": "0001",
    "name": "香港東區婦女福利會幼兒園",
    "nameEn": "THE WOMEN'S WELFARE CLUB (EASTERN DISTRICT) NURSERY HONG KONG",
    "district": "港島",
    "district18": "東區",
    "address": "香港筲箕灣愛東邨愛平樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_564222000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "putonghua",
      "english",
      "native_english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25613409",
    "website": "http://www.ednursery.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5880320001",
    "schoolCode": "588032",
    "campusCode": "0001",
    "name": "香港國際蒙特梭利學校(中環)",
    "nameEn": "DISCOVERY MONTESSORI SCHOOL (CENTRAL)",
    "district": "港島",
    "district18": "中西區",
    "address": "香港上環文咸東街35-43號文華大廈3樓(課室3及遊戲場除外)",
    "nature": "international",
    "curriculumCategory": "non_local",
    "curriculumType": "montessori",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_588032000111",
      "edb_588032000112",
      "edb_588032000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "28508006",
    "website": "https://www.montessori-ami.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "low",
      "languageConfidence": "high",
      "needsReview": true
    }
  },
  {
    "id": "edb_5653850001",
    "schoolCode": "565385",
    "campusCode": "0001",
    "name": "香港基督教服務處時代幼兒學校",
    "nameEn": "HONG KONG CHRISTIAN SERVICE TIMES NURSERY SCHOOL",
    "district": "港島",
    "district18": "灣仔區",
    "address": "香港灣仔謝斐道３９１－４０７號新時代中心地下Ｂ舖及１樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_565385000113"
    ],
    "pedagogyTags": [
      "project_learn",
      "project_learn"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "28336600",
    "website": "http://www.hkcschild.edu.hk/tns",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5644350001",
    "schoolCode": "564435",
    "campusCode": "0001",
    "name": "香港基督教女青年會戴翰芬幼兒學校",
    "nameEn": "HONG KONG YOUNG WOMEN'S CHRISTIAN ASSOCIATION TAI HON FAN NURSERY SCHOOL",
    "district": "港島",
    "district18": "中西區",
    "address": "香港中環皇后大道中９９號中環中心地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_564435000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25451177",
    "website": "http://nsthf.ywca.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_1337440001",
    "schoolCode": "133744",
    "campusCode": "0001",
    "name": "香港靈糧堂幼稚園",
    "nameEn": "HONG KONG LING LIANG CHURCH KINDERGARTEN",
    "district": "港島",
    "district18": "灣仔區",
    "address": "香港銅鑼灣禮頓里６號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_133744000111",
      "edb_133744000112"
    ],
    "pedagogyTags": [
      "project_learn",
      "project_learn",
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25765881",
    "website": "http://www.lingliang.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_3249650001",
    "schoolCode": "324965",
    "campusCode": "0001",
    "name": "香港民生幼稚園(北角)",
    "nameEn": "HONG KONG MAN SANG KINDERGARTEN (NORTH POINT)",
    "district": "港島",
    "district18": "東區",
    "address": "香港北角渣華道５２－６０號胡曰皆大廈２樓（包括幼兒中心）",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_324965000111",
      "edb_324965000112",
      "edb_324965000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english",
      "cantonese",
      "native_english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25786763",
    "website": "http://www.mansangkg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_6037240001",
    "schoolCode": "603724",
    "campusCode": "0001",
    "name": "香港民生幼稚園(西區)",
    "nameEn": "HONG KONG MAN SANG KINDERGARTEN (WESTERN DISTRICT)",
    "district": "港島",
    "district18": "中西區",
    "address": "香港皇后大道西513-519號尼斯花園地下A舖及一樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_603724000111",
      "edb_603724000112",
      "edb_603724000113"
    ],
    "pedagogyTags": [
      "play_explore"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english",
      "cantonese",
      "native_english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "2336323223488366",
    "website": "http://www.mansangkg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_6130370001",
    "schoolCode": "613037",
    "campusCode": "0001",
    "name": "香港墨爾文國際幼稚園(港島西)",
    "nameEn": "MALVERN COLLEGE PRE-SCHOOL HONG KONG (ISLAND WEST)",
    "district": "港島",
    "district18": "中西區",
    "address": "香港干諾道西165—166號偉景閣地下C舖及一樓",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_613037000111",
      "edb_613037000112",
      "edb_613037000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "38984670",
    "website": "https://www.malvernpreschool.hk",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "low",
      "languageConfidence": "high",
      "needsReview": true
    }
  },
  {
    "id": "edb_5633310001",
    "schoolCode": "563331",
    "campusCode": "0001",
    "name": "香港青年協會青樂幼稚園",
    "nameEn": "THE HONG KONG FEDERATION OF YOUTH GROUPS CHING LOK KINDERGARTEN",
    "district": "港島",
    "district18": "東區",
    "address": "香港西灣河西灣河街１２９號利基大廈地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_563331000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "project_learn",
      "language_dev"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "28868856",
    "website": "http://clswh.hkfyg.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5637140001",
    "schoolCode": "563714",
    "campusCode": "0001",
    "name": "香港西區婦女福利會鴨脷洲邨幼稚園",
    "nameEn": "WOMEN'S WELFARE CLUB WESTERN DISTRICT HONG KONG AP LEI CHAU KINDERGARTEN",
    "district": "港島",
    "district18": "南區",
    "address": "香港鴨脷洲西邨利寧樓地下１－１２號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_563714000113"
    ],
    "pedagogyTags": [
      "project_learn",
      "language_dev",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25543470",
    "website": "http://www.alcnursery.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5636920001",
    "schoolCode": "563692",
    "campusCode": "0001",
    "name": "香港西區婦女福利會幼稚園",
    "nameEn": "WOMEN'S WELFARE CLUB WESTERN DISTRICT HONG KONG KINDERGARTEN",
    "district": "港島",
    "district18": "中西區",
    "address": "香港上環必列啫士街六十號地下、一樓及三樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_563692000113"
    ],
    "pedagogyTags": [
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25461030",
    "website": "http://www.wwcwdnursery.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5634470001",
    "schoolCode": "563447",
    "campusCode": "0001",
    "name": "香港小童群益會樂緻幼稚園（灣仔）",
    "nameEn": "THE BOYS' AND GIRLS' CLUBS ASSOCIATION OF HONG KONG CHEERLAND KINDERGARTEN (WANCHAI)",
    "district": "港島",
    "district18": "灣仔區",
    "address": "香港灣仔駱克道３號２樓及４樓（天台遊戲場）",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_563447000111",
      "edb_563447000112",
      "edb_563447000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "project_learn",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25298484",
    "website": "http://nursery.bgca.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5369110001",
    "schoolCode": "536911",
    "campusCode": "0001",
    "name": "香港真光幼稚園（堅道）",
    "nameEn": "HONG KONG TRUE LIGHT KINDERGARTEN (CAINE ROAD)",
    "district": "港島",
    "district18": "中西區",
    "address": "香港堅道７５號地下至二樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_536911000111",
      "edb_536911000112",
      "edb_536911000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "trilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "",
    "website": "http://www.truelightk-c.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_1320470001",
    "schoolCode": "132047",
    "campusCode": "0001",
    "name": "香港真光中學附屬小學暨幼稚園",
    "nameEn": "THE TRUE LIGHT SCHOOL OF HONG KONG, PRIMARY AND KINDERGARTEN SECTION",
    "district": "港島",
    "district18": "灣仔區",
    "address": "香港大坑道50號小學及幼稚園部，小學部和幼稚園操場、有蓋操場、游泳池、1座(6樓和7樓)、2座(G21-23及G23A室除外)、百齡堂 (小學課室)、福群道入口",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_132047000111",
      "edb_132047000112"
    ],
    "pedagogyTags": [
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25773569",
    "website": "http://www.tlmshkps.edu.hk/kindergarten",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5647450001",
    "schoolCode": "564745",
    "campusCode": "0001",
    "name": "香港中國婦女會幼稚園",
    "nameEn": "THE HONG KONG CHINESE WOMEN'S CLUB KINDERGARTEN",
    "district": "港島",
    "district18": "東區",
    "address": "香港筲箕灣耀東邨耀福樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_564745000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "project_learn",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "trilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25682110",
    "website": "http://www.hkcwckg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5230890001",
    "schoolCode": "523089",
    "campusCode": "0001",
    "name": "香港仔浸信會白光幼稚園",
    "nameEn": "ABERDEEN BAPTIST CHURCH PAK KWONG KINDERGARTEN",
    "district": "港島",
    "district18": "南區",
    "address": "香港香港仔水塘道十一號(擴建部份)",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_523089000111",
      "edb_523089000112",
      "edb_523089000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "project_learn",
      "project_learn",
      "language_dev",
      "language_dev"
    ],
    "languageEnv": [
      "putonghua",
      "english",
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25535750",
    "website": "http://www.pkkg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5421990001",
    "schoolCode": "542199",
    "campusCode": "0001",
    "name": "欣苗幼稚園",
    "nameEn": "SPRING VIEW KINDERGARTEN",
    "district": "港島",
    "district18": "東區",
    "address": "香港筲箕灣愛禮街２號愛蝶灣第三座地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_542199000111",
      "edb_542199000112",
      "edb_542199000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "language_dev"
    ],
    "languageEnv": [
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "3196408131964082",
    "website": "http://www.springview.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_3255890001",
    "schoolCode": "325589",
    "campusCode": "0001",
    "name": "新翠培元幼稚園",
    "nameEn": "NEW JADE ELEMENTI KINDERGARTEN",
    "district": "港島",
    "district18": "東區",
    "address": "香港柴灣吉勝街新翠商場政府大樓第４層及第五層遊戲場（包括幼兒中心）",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_325589000111",
      "edb_325589000112",
      "edb_325589000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "language_dev",
      "holistic",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "28979157",
    "website": "http://www.elementiedu.org",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_2160030002",
    "schoolCode": "216003",
    "campusCode": "0002",
    "name": "新加坡國際學校",
    "nameEn": "SINGAPORE INTERNATIONAL SCHOOL (HONG KONG)",
    "district": "港島",
    "district18": "南區",
    "address": "香港香港仔南朗山道23號(包括新增一層校舍及新增L7樓辦公室)",
    "nature": "international",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_216003000211",
      "edb_216003000212"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "putonghua",
      "english",
      "bilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "28720266",
    "website": "http://www.singapore.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "medium",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_2161350001",
    "schoolCode": "216135",
    "campusCode": "0001",
    "name": "宣道會上書房中英文幼稚園",
    "nameEn": "THE CHRISTIAN & MISSIONARY ALLIANCE SCHOLARS' ANGLO-CHINESE KINDERGARTEN",
    "district": "港島",
    "district18": "東區",
    "address": "香港杏花邨盛泰路100號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_216135000111",
      "edb_216135000112",
      "edb_216135000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "language_dev"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25560171",
    "website": "",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_6136810001",
    "schoolCode": "613681",
    "campusCode": "0001",
    "name": "學之園幼稚園(君豪峰)",
    "nameEn": "LEARNING HABITAT KINDERGARTEN (NOVUM EAST)",
    "district": "港島",
    "district18": "東區",
    "address": "香港英皇道856號君豪峰商業發展項目1樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_613681000111",
      "edb_613681000112"
    ],
    "pedagogyTags": [
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "english",
      "bilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25015108",
    "website": "http://learninghabitat.org",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_3258990001",
    "schoolCode": "325899",
    "campusCode": "0001",
    "name": "循道衛理聯合教會愛華村堂幼稚園",
    "nameEn": "EPWORTH VILLAGE METHODIST CHURCH KINDERGARTEN",
    "district": "港島",
    "district18": "東區",
    "address": "香港柴灣柴灣道１００號１樓（包括幼兒中心）",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_325899000111",
      "edb_325899000112",
      "edb_325899000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "holistic",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25572373",
    "website": "https://www.evmck.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5656440001",
    "schoolCode": "565644",
    "campusCode": "0001",
    "name": "循道衛理田灣幼稚園",
    "nameEn": "TIN WAN METHODIST KINDERGARTEN",
    "district": "港島",
    "district18": "南區",
    "address": "香港香港仔田灣邨田康樓地下１－１０號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_565644000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "holistic"
    ],
    "languageEnv": [
      "putonghua"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25388669",
    "website": "http://www.twmkgdn.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_6045850001",
    "schoolCode": "604585",
    "campusCode": "0001",
    "name": "雅惠國際幼稚園（鯉景灣）",
    "nameEn": "GRACE GARDEN INTERNATIONAL KINDERGARTEN (LEI KING WAN)",
    "district": "港島",
    "district18": "東區",
    "address": "香港西灣河鯉景灣Ａ區太康街５５號地下ＧＡ１２Ｂ－１４號舖",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "british",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_604585000111",
      "edb_604585000112"
    ],
    "pedagogyTags": [
      "play_explore"
    ],
    "languageEnv": [
      "putonghua",
      "english",
      "bilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27029778",
    "website": "http://www.gracegarden.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_3260110001",
    "schoolCode": "326011",
    "campusCode": "0001",
    "name": "耀東浸信會幼稚園",
    "nameEn": "YIU TUNG BAPTIST KINDERGARTEN",
    "district": "港島",
    "district18": "東區",
    "address": "香港筲箕灣耀東邨耀富樓Ｂ翼及Ｃ翼地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_326011000111",
      "edb_326011000112",
      "edb_326011000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25358493",
    "website": "http://www.yiutung-bapkg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_2158720001",
    "schoolCode": "215872",
    "campusCode": "0001",
    "name": "怡寶中英文幼稚園",
    "nameEn": "EPOCH ANGLO-CHINESE KINDERGARTEN",
    "district": "港島",
    "district18": "東區",
    "address": "香港英皇道９５５－９５７號惠芳閣２－３樓Ａ及Ｂ室",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_215872000111",
      "edb_215872000112",
      "edb_215872000113"
    ],
    "pedagogyTags": [
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "28111686",
    "website": "http://www.epochkg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_6116460001",
    "schoolCode": "611646",
    "campusCode": "0001",
    "name": "意大利國際幼稚園",
    "nameEn": "ITALIAN INTERNATIONAL KINDERGARTEN",
    "district": "港島",
    "district18": "南區",
    "address": "香港鴨脷洲海怡半島第1期第4座平台第1層",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_611646000111",
      "edb_611646000112",
      "edb_611646000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "english",
      "bilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26623066",
    "website": "https://iikg.edu.hk/en",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "medium",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5791490001",
    "schoolCode": "579149",
    "campusCode": "0001",
    "name": "英基國際幼稚園（曉新）",
    "nameEn": "ESF INTERNATIONAL KINDERGARTEN (HILLSIDE)",
    "district": "港島",
    "district18": "灣仔區",
    "address": "香港司徒拔道４３Ｂ號（三樓除外）",
    "nature": "international",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_579149000111",
      "edb_579149000112"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25400066",
    "website": "http://www.esf.edu.hk/our-schools/kindergarten/hillside",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "low",
      "languageConfidence": "high",
      "needsReview": true
    }
  },
  {
    "id": "edb_6209980001",
    "schoolCode": "620998",
    "campusCode": "0001",
    "name": "英藝幼稚園(西環)",
    "nameEn": "ZENITH KINDERGARTEN (SAI WAN)",
    "district": "港島",
    "district18": "中西區",
    "address": "香港堅尼地城海傍路20號益豐花園地下1號舖及1樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_620998000111",
      "edb_620998000112",
      "edb_620998000113"
    ],
    "pedagogyTags": [
      "play_explore"
    ],
    "languageEnv": [
      "trilingual",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "21528112",
    "website": "http://www.zenith.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5906730001",
    "schoolCode": "590673",
    "campusCode": "0001",
    "name": "盈思幼稚園",
    "nameEn": "WITTY KINDERGARTEN",
    "district": "港島",
    "district18": "中西區",
    "address": "香港卑路乍街１６－１８號再輝大廈地下高層",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_590673000111",
      "edb_590673000112",
      "edb_590673000113"
    ],
    "pedagogyTags": [
      "project_learn"
    ],
    "languageEnv": [
      "english",
      "native_english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "28178132",
    "website": "http://www.witty.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_3259610002",
    "schoolCode": "325961",
    "campusCode": "0002",
    "name": "右思維幼稚園",
    "nameEn": "RIGHTMIND KINDERGARTEN",
    "district": "港島",
    "district18": "南區",
    "address": "香港鴨脷洲海怡半島第四期第２６－２８座地下上層部份幼稚園校舍",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_325961000211",
      "edb_325961000212"
    ],
    "pedagogyTags": [
      "project_learn"
    ],
    "languageEnv": [],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "28750452",
    "website": "http://www.rmkg.org",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "low",
      "needsReview": false
    }
  },
  {
    "id": "edb_5661520001",
    "schoolCode": "566152",
    "campusCode": "0001",
    "name": "中華基督教會柴灣堂幼兒園",
    "nameEn": "THE CHURCH OF CHRIST IN CHINA CHAI WAN CHURCH DAY NURSERY",
    "district": "港島",
    "district18": "東區",
    "address": "香港柴灣新翠花園政府合署２樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_566152000111",
      "edb_566152000112",
      "edb_566152000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "28965533",
    "website": "http://www.ccccwcdn.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_1332800001",
    "schoolCode": "133280",
    "campusCode": "0001",
    "name": "中華基督教會灣仔堂幼稚園",
    "nameEn": "THE CHURCH OF CHRIST IN CHINA WANCHAI CHURCH KINDERGARTEN",
    "district": "港島",
    "district18": "灣仔區",
    "address": "香港春園街竹居台",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_133280000111",
      "edb_133280000112",
      "edb_133280000113"
    ],
    "pedagogyTags": [
      "project_learn"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25279615",
    "website": "http://wck.ccc.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_2159290002",
    "schoolCode": "215929",
    "campusCode": "0002",
    "name": "卓基英文學校暨幼稚園",
    "nameEn": "CHERISH ENGLISH SCHOOL & KINDERGARTEN",
    "district": "港島",
    "district18": "中西區",
    "address": "香港堅尼地城西環邨東苑台地下及閣樓ＫＧ０１號舖",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_215929000211",
      "edb_215929000212",
      "edb_215929000213"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "28550080",
    "website": "http://www.cherish.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "low",
      "pedagogyConfidence": "medium",
      "languageConfidence": "high",
      "needsReview": true
    }
  },
  {
    "id": "edb_6023290001",
    "schoolCode": "602329",
    "campusCode": "0001",
    "name": "ABC PATHWAYS INTERNATIONAL KINDERGARTEN",
    "nameEn": "ABC PATHWAYS INTERNATIONAL KINDERGARTEN",
    "district": "港島",
    "district18": "東區",
    "address": "香港鰂魚涌英皇道１１２４號康山花園第８座及第９座地下",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_602329000111",
      "edb_602329000112"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "21101211",
    "website": "http://www.abcpathways.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "low",
      "languageConfidence": "high",
      "needsReview": true
    }
  },
  {
    "id": "edb_2161860002",
    "schoolCode": "216186",
    "campusCode": "0002",
    "name": "CARMEL SCHOOL",
    "nameEn": "CARMEL SCHOOL",
    "district": "港島",
    "district18": "東區",
    "address": "香港半山羅便臣道７０號雍景臺第一座地下兒童遊戲場及３樓至４樓（不包括幼兒中心）",
    "nature": "international",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM"
    ],
    "variantIds": [
      "edb_216186000211"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "22497600",
    "website": "http://www.carmel.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "low",
      "languageConfidence": "high",
      "needsReview": true
    }
  },
  {
    "id": "edb_5660800001",
    "schoolCode": "566080",
    "campusCode": "0001",
    "name": "CITY KIDS PRESCHOOL AND PLAYGROUP",
    "nameEn": "CITY KIDS PRESCHOOL AND PLAYGROUP",
    "district": "港島",
    "district18": "中西區",
    "address": "香港半山區波老道12號3樓東翼",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_566080000111",
      "edb_566080000112"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25224446",
    "website": "http://citykidshk.org",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "low",
      "languageConfidence": "high",
      "needsReview": true
    }
  },
  {
    "id": "edb_6092850001",
    "schoolCode": "609285",
    "campusCode": "0001",
    "name": "GUIDEPOST MONTESSORI INTERNATIONAL KINDERGARTEN (CHAI WAN)",
    "nameEn": "GUIDEPOST MONTESSORI INTERNATIONAL KINDERGARTEN (CHAI WAN)",
    "district": "港島",
    "district18": "東區",
    "address": "香港柴灣小西灣道九號富欣花園地下幼稚園舖(儲物室除外)",
    "nature": "international",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_609285000111",
      "edb_609285000112"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "",
    "website": "https://guidepost.hk/locations/chai-wan",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_6114840001",
    "schoolCode": "611484",
    "campusCode": "0001",
    "name": "GUIDEPOST MONTESSORI INTERNATIONAL KINDERGARTEN (KENNEDY TOWN)",
    "nameEn": "GUIDEPOST MONTESSORI INTERNATIONAL KINDERGARTEN (KENNEDY TOWN)",
    "district": "港島",
    "district18": "中西區",
    "address": "香港西環皇后大道西554-560號百好大樓地下C號舖部份、1樓及2樓",
    "nature": "international",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_611484000111",
      "edb_611484000112"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "36191136",
    "website": "https://www.guidepostmontessori.com/locations/kennedy-town-hk",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5980890001",
    "schoolCode": "598089",
    "campusCode": "0001",
    "name": "GUIDEPOST MONTESSORI INTERNATIONAL KINDERGARTEN (POK FU LAM)",
    "nameEn": "GUIDEPOST MONTESSORI INTERNATIONAL KINDERGARTEN (POK FU LAM)",
    "district": "港島",
    "district18": "南區",
    "address": "香港薄扶林置富花園置富南區廣場101號舖(課室1除外)",
    "nature": "international",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_598089000111",
      "edb_598089000112"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "21770001",
    "website": "https://www.guidepostmontessori.com/schools/pok-fu-lam-hk",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5649580001",
    "schoolCode": "564958",
    "campusCode": "0001",
    "name": "GUIDEPOST MONTESSORI INTERNATIONAL PRE-SCHOOL (HAPPY VALLEY HAWTHORN ROAD)",
    "nameEn": "GUIDEPOST MONTESSORI INTERNATIONAL PRE-SCHOOL (HAPPY VALLEY HAWTHORN ROAD)",
    "district": "港島",
    "district18": "灣仔區",
    "address": "香港跑馬地荷塘道2號地下",
    "nature": "international",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_564958000111",
      "edb_564958000112"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25750042",
    "website": "https://guidepost.hk/locations/happyvalley-hawthornroad",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5947250001",
    "schoolCode": "594725",
    "campusCode": "0001",
    "name": "GUIDEPOST MONTESSORI INTERNATIONAL PRE-SCHOOL (MID-LEVELS)",
    "nameEn": "GUIDEPOST MONTESSORI INTERNATIONAL PRE-SCHOOL (MID-LEVELS)",
    "district": "港島",
    "district18": "中西區",
    "address": "香港堅道110-118號安峰大廈1樓至2樓",
    "nature": "international",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_594725000111",
      "edb_594725000112"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25491211",
    "website": "https://guidepost.hk/locations/mid-levels",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_6022560001",
    "schoolCode": "602256",
    "campusCode": "0001",
    "name": "GUIDEPOST MONTESSORI INTERNATIONAL PRE-SCHOOL (REPULSE BAY)",
    "nameEn": "GUIDEPOST MONTESSORI INTERNATIONAL PRE-SCHOOL (REPULSE BAY)",
    "district": "港島",
    "district18": "南區",
    "address": "香港淺水灣海灘道35號2樓A2-H舖",
    "nature": "international",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_602256000111",
      "edb_602256000112"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "28120274",
    "website": "http://www.woodlandschools.com",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5455890001",
    "schoolCode": "545589",
    "campusCode": "0001",
    "name": "HIGHGATE HOUSE SCHOOL - THE PEAK",
    "nameEn": "HIGHGATE HOUSE SCHOOL - THE PEAK",
    "district": "港島",
    "district18": "中西區",
    "address": "香港山頂道１００－１０４號牛奶公司商場Ｂ座２字樓６號舖（包括幼兒中心）",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_545589000111",
      "edb_545589000112"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "28496336",
    "website": "http://www.highgatehouse.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "low",
      "languageConfidence": "high",
      "needsReview": true
    }
  },
  {
    "id": "edb_2162160001",
    "schoolCode": "216216",
    "campusCode": "0001",
    "name": "KOREAN INTERNATIONAL SCHOOL",
    "nameEn": "KOREAN INTERNATIONAL SCHOOL",
    "district": "港島",
    "district18": "東區",
    "address": "香港西灣河鯉景道５５號（內地段８８０２）",
    "nature": "international",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_216216000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25695500",
    "website": "http://www.kis.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "low",
      "languageConfidence": "high",
      "needsReview": true
    }
  },
  {
    "id": "edb_6149040001",
    "schoolCode": "614904",
    "campusCode": "0001",
    "name": "LES PETITS LASCARS FRENCH INTERNATIONAL PRESCHOOL",
    "nameEn": "LES PETITS LASCARS FRENCH INTERNATIONAL PRESCHOOL",
    "district": "港島",
    "district18": "中西區",
    "address": "香港中環威靈頓街56及58號威寧大厦3樓301及302室(逢星期一至星期五下午四時十五分至下午九時；逢星期六及星期日上午八時至下午九時；逢七月一日至八月三十一日星期一至星期日上午八時至下午九時除外)",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_614904000111",
      "edb_614904000112"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25268666",
    "website": "https://hkkidsacademy.edu.hk/les-petits-lascars",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "low",
      "languageConfidence": "high",
      "needsReview": true
    }
  },
  {
    "id": "edb_2149490005",
    "schoolCode": "214949",
    "campusCode": "0005",
    "name": "LYC'EE FRANCAIS INTERNATIONAL (FRENCH INTERNATIONAL SCHOOL)",
    "nameEn": "LYC'EE FRANCAIS INTERNATIONAL (FRENCH INTERNATIONAL SCHOOL)",
    "district": "港島",
    "district18": "東區",
    "address": "1 CHEUNG MAN ROAD CHAI WAN HONG KONG",
    "nature": "international",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_214949000513"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25776217",
    "website": "https://www.fis.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "low",
      "languageConfidence": "high",
      "needsReview": true
    }
  },
  {
    "id": "edb_2149490007",
    "schoolCode": "214949",
    "campusCode": "0007",
    "name": "LYC'EE FRANCAIS INTERNATIONAL (FRENCH INTERNATIONAL SCHOOL)",
    "nameEn": "LYC'EE FRANCAIS INTERNATIONAL (FRENCH INTERNATIONAL SCHOOL)",
    "district": "港島",
    "district18": "東區",
    "address": "28 TONG YIN STREET, TSEUNG KWAN O, NEW TERRITORIES (EXCLUDING THE SWIMMING POOL ON 2ND FLOOR)",
    "nature": "international",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_214949000713"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "36187200",
    "website": "https://www.fis.edu.hk/en",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "low",
      "languageConfidence": "high",
      "needsReview": true
    }
  },
  {
    "id": "edb_5654660001",
    "schoolCode": "565466",
    "campusCode": "0001",
    "name": "MONTESSORI FOR CHILDREN (NURSERY)",
    "nameEn": "MONTESSORI FOR CHILDREN (NURSERY)",
    "district": "港島",
    "district18": "南區",
    "address": "香港赤柱大潭村1033 錦鳳宛A",
    "nature": "international",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_565466000111",
      "edb_565466000112"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "holistic"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "28139589",
    "website": "http://www.montessori.edu.sg",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5780530001",
    "schoolCode": "578053",
    "campusCode": "0001",
    "name": "MULBERRY HOUSE INTERNATIONAL KINDERGARTEN SOUTHSIDE",
    "nameEn": "MULBERRY HOUSE INTERNATIONAL KINDERGARTEN SOUTHSIDE",
    "district": "港島",
    "district18": "南區",
    "address": "香港香港仔海傍道3號逸港居地下1及2號舖",
    "nature": "international",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_578053000111",
      "edb_578053000112"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "3591106555980555",
    "website": "https://mulberryhousekg.com",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "low",
      "languageConfidence": "high",
      "needsReview": true
    }
  },
  {
    "id": "edb_2157240001",
    "schoolCode": "215724",
    "campusCode": "0001",
    "name": "SMALL WORLD CHRISTIAN KINDERGARTEN",
    "nameEn": "SMALL WORLD CHRISTIAN KINDERGARTEN",
    "district": "港島",
    "district18": "中西區",
    "address": "香港波老道１０號地下",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_215724000111",
      "edb_215724000112"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25250922",
    "website": "http://www.swck.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "low",
      "languageConfidence": "high",
      "needsReview": true
    }
  },
  {
    "id": "edb_6072150001",
    "schoolCode": "607215",
    "campusCode": "0001",
    "name": "WILDERNESS INTERNATIONAL KINDERGARTEN",
    "nameEn": "WILDERNESS INTERNATIONAL KINDERGARTEN",
    "district": "港島",
    "district18": "中西區",
    "address": "香港堅尼地城士美菲路85號寶德大廈地下",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_607215000111",
      "edb_607215000112"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25959066",
    "website": "http://www.wilderness.asia",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "low",
      "languageConfidence": "high",
      "needsReview": true
    }
  },
  {
    "id": "edb_5358180003",
    "schoolCode": "535818",
    "campusCode": "0003",
    "name": "安菲爾國際幼稚園",
    "nameEn": "ANFIELD INTERNATIONAL KINDERGARTEN",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍九龍塘金巴倫道5號A座地下 1樓通道及內置樓梯 B座地下及1樓",
    "nature": "international",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_535818000311",
      "edb_535818000312",
      "edb_535818000313"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27943668",
    "website": "http://www.anfield.com.hk",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "low",
      "languageConfidence": "high",
      "needsReview": true
    }
  },
  {
    "id": "edb_5358180002",
    "schoolCode": "535818",
    "campusCode": "0002",
    "name": "安菲爾國際幼稚園",
    "nameEn": "ANFIELD INTERNATIONAL KINDERGARTEN",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍紅磡海逸徑８號海逸豪園一期Ｌ２幼稚園",
    "nature": "international",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_535818000211",
      "edb_535818000212",
      "edb_535818000213"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27663882",
    "website": "http://www.anfield.com.hk",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "low",
      "languageConfidence": "high",
      "needsReview": true
    }
  },
  {
    "id": "edb_5714900001",
    "schoolCode": "571490",
    "campusCode": "0001",
    "name": "栢基國際幼稚園(九龍)",
    "nameEn": "PARKVIEW INTERNATIONAL PRE-SCHOOL (KOWLOON)",
    "district": "九龍",
    "district18": "油尖旺區",
    "address": "九龍柯士甸道西1號九龍站平台(包括幼兒中心共用範圍)",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "ib",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_571490000111",
      "edb_571490000112",
      "edb_571490000113"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "play_explore"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "28126801",
    "website": "",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5666910001",
    "schoolCode": "566691",
    "campusCode": "0001",
    "name": "保良局陳黎惠蓮幼稚園",
    "nameEn": "PO LEUNG KUK CHAN LAI WAI LIN KINDERGARTEN",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍九龍城馬頭圍道188-194號康年閣地下 1樓及2樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_566691000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "play_explore",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "english",
      "native_english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23647170",
    "website": "http://www.poleungkuk.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5639430001",
    "schoolCode": "563943",
    "campusCode": "0001",
    "name": "保良局方譚遠良（慈雲山）幼稚園",
    "nameEn": "PO LEUNG KUK FONG TAM YUEN LEUNG (TSZ WAN SHAN) KINDERGARTEN",
    "district": "九龍",
    "district18": "黃大仙區",
    "address": "九龍慈雲山慈民邨民泰樓地下１－２及５－１２號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_563943000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "project_learn",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "english",
      "native_english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23277561",
    "website": "http://www.poleungkuk.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5163090001",
    "schoolCode": "516309",
    "campusCode": "0001",
    "name": "保良局方王錦全幼稚園",
    "nameEn": "PO LEUNG KUK MRS FONG WONG KAM CHUEN KINDERGARTEN",
    "district": "九龍",
    "district18": "觀塘區",
    "address": "九龍油塘高超道高俊苑C座地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_516309000111",
      "edb_516309000112",
      "edb_516309000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "bilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "",
    "website": "https://www.plkkgs.edu.hk/plkfwkckg",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5637900001",
    "schoolCode": "563790",
    "campusCode": "0001",
    "name": "保良局黃樹雄幼稚園",
    "nameEn": "PO LEUNG KUK KIM HUYNH KINDERGARTEN",
    "district": "九龍",
    "district18": "觀塘區",
    "address": "九龍坪石邨黃石樓１２５－１３２號地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_563790000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "play_explore",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "english",
      "native_english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23206671",
    "website": "http://www.poleungkuk.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_3258210001",
    "schoolCode": "325821",
    "campusCode": "0001",
    "name": "保良局金卿幼稚園",
    "nameEn": "PO LEUNG KUK KAM HING KINDERGARTEN",
    "district": "九龍",
    "district18": "黃大仙區",
    "address": "九龍鑽石山鳳德邨鳳鑽苑地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_325821000111",
      "edb_325821000112",
      "edb_325821000113"
    ],
    "pedagogyTags": [
      "project_learn"
    ],
    "languageEnv": [
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23220133",
    "website": "https://www.plkkgs.edu.hk/plkkhkg/hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_6042590001",
    "schoolCode": "604259",
    "campusCode": "0001",
    "name": "保良局李樹福幼稚園",
    "nameEn": "PO LEUNG KUK LEE SHU FOOK KINDERGARTEN",
    "district": "九龍",
    "district18": "觀塘區",
    "address": "九龍順安邨安頌樓地下2號舖及商業大樓1座地下及1樓2號舖",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_604259000111",
      "edb_604259000112",
      "edb_604259000113"
    ],
    "pedagogyTags": [
      "holistic"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23866983",
    "website": "",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5639350001",
    "schoolCode": "563935",
    "campusCode": "0001",
    "name": "保良局李筱參幼稚園",
    "nameEn": "PO LEUNG KUK LEE SIU CHAN KINDERGARTEN",
    "district": "九龍",
    "district18": "觀塘區",
    "address": "九龍觀塘順利邨社區中心６字樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_563935000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "play_explore",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "english",
      "native_english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23439038",
    "website": "http://www.poleungkuk.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_3259880001",
    "schoolCode": "325988",
    "campusCode": "0001",
    "name": "保良局李徐松聲紀念幼稚園",
    "nameEn": "PO LEUNG KUK LI TSUI CHUNG SING MEMORIAL KINDERGARTEN",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍紅磡佛光街５號家盛樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_325988000111",
      "edb_325988000112",
      "edb_325988000113"
    ],
    "pedagogyTags": [
      "play_explore"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "2330550623031623",
    "website": "https://www.plkkgs.edu.hk/plkltcsmkg/en",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5961160001",
    "schoolCode": "596116",
    "campusCode": "0001",
    "name": "保良局梁安琪幼稚園",
    "nameEn": "PO LEUNG KUK ANGELA LEONG ON KEI KINDERGARTEN",
    "district": "九龍",
    "district18": "深水埗區",
    "address": "九龍深水埗石硤尾邨美盛樓一樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_596116000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "play_explore",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "english",
      "native_english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27787182",
    "website": "http://kgn.poleungkuk.org.hk/tc/953/page.html",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5639270001",
    "schoolCode": "563927",
    "campusCode": "0001",
    "name": "保良局林丁麗玲幼稚園",
    "nameEn": "PO LEUNG KUK LAM TING LAI LING KINDERGARTEN",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍紅磡家維邨家安樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_563927000111",
      "edb_563927000112",
      "edb_563927000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "play_explore",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "english",
      "native_english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23649480",
    "website": "http://www.poleungkuk.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5487230001",
    "schoolCode": "548723",
    "campusCode": "0001",
    "name": "保良局劉陳小寶幼稚園",
    "nameEn": "PO LEUNG KUK LAU CHAN SIU PO KINDERGARTEN",
    "district": "九龍",
    "district18": "深水埗區",
    "address": "九龍長沙灣富昌邨富潤樓(第十六座)平台",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_548723000111",
      "edb_548723000112",
      "edb_548723000113"
    ],
    "pedagogyTags": [
      "holistic"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "22674531",
    "website": "https://www.plkkgs.edu.hk/plklcspkg",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5638030001",
    "schoolCode": "563803",
    "campusCode": "0001",
    "name": "保良局呂陳慧貞幼稚園",
    "nameEn": "PO LEUNG KUK LUI CHAN WAI CHING KINDERGARTEN",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍何文田常盛街常樂邨常樂樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_563803000111",
      "edb_563803000112",
      "edb_563803000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "play_explore",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "english",
      "native_english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27613431",
    "website": "http://www.poleungkuk.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5638200001",
    "schoolCode": "563820",
    "campusCode": "0001",
    "name": "保良局呂錦泰幼稚園",
    "nameEn": "PO LEUNG KUK LUI KAM TAI KINDERGARTEN",
    "district": "九龍",
    "district18": "油尖旺區",
    "address": "九龍大角咀鐵樹街４３號海康大廈第２座２樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_563820000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "play_explore",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "english",
      "native_english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23953623",
    "website": "http://www.poleungkuk.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5391040001",
    "schoolCode": "539104",
    "campusCode": "0001",
    "name": "保良局譚歐陽少芳紀念幼稚園",
    "nameEn": "PO LEUNG KUK TAM AU-YEUNG SIU FONG MEMORIAL KINDERGARTEN",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍紅磡黃埔花園第七期地下3B舖",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_539104000111",
      "edb_539104000112"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english",
      "cantonese",
      "bilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23113871",
    "website": "https://www.plkkgs.edu.hk/plktaysfmkg",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5638110001",
    "schoolCode": "563811",
    "campusCode": "0001",
    "name": "保良局王少清幼稚園",
    "nameEn": "PO LEUNG KUK WONG SIU CHING KINDERGARTEN",
    "district": "九龍",
    "district18": "黃大仙區",
    "address": "九龍黃大仙彩雲邨社區中心６字樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_563811000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "project_learn",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "english",
      "native_english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27553438",
    "website": "http://www.poleungkuk.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5637300001",
    "schoolCode": "563730",
    "campusCode": "0001",
    "name": "保良局吳寶玲幼稚園",
    "nameEn": "PO LEUNG KUK NG PO LING KINDERGARTEN",
    "district": "九龍",
    "district18": "觀塘區",
    "address": "九龍觀塘翠屏道翠屏邨翠桃樓21至34號平台",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_563730000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "play_explore",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "english",
      "native_english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27271405",
    "website": "http://www.poleungkuk.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5639190001",
    "schoolCode": "563919",
    "campusCode": "0001",
    "name": "保良局謝黃沛涓幼稚園",
    "nameEn": "PO LEUNG KUK TSE WONG PUI KUEN KINDERGARTEN",
    "district": "九龍",
    "district18": "黃大仙區",
    "address": "九龍慈雲山慈樂邨樂安樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_563919000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "play_explore",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "english",
      "native_english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23522843",
    "website": "http://www.poleungkuk.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5639510001",
    "schoolCode": "563951",
    "campusCode": "0001",
    "name": "保良局鄭關巧妍幼稚園",
    "nameEn": "PO LEUNG KUK CHENG KWAN HOW YIN KINDERGARTEN",
    "district": "九龍",
    "district18": "觀塘區",
    "address": "九龍藍田德田邨德康樓１樓２號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_563951000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "play_explore",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "english",
      "native_english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27092280",
    "website": "http://www.poleungkuk.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5640440001",
    "schoolCode": "564044",
    "campusCode": "0001",
    "name": "寶血幼稚園（深水埗）",
    "nameEn": "PRECIOUS BLOOD KINDERGARTEN (SHAM SHUI PO)",
    "district": "九龍",
    "district18": "深水埗區",
    "address": "九龍深水埗元洲街１２３號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_564044000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "play_explore",
      "holistic"
    ],
    "languageEnv": [
      "trilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23862586",
    "website": "http://www.pbn.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5640360001",
    "schoolCode": "564036",
    "campusCode": "0001",
    "name": "博愛醫院陳徐鳳蘭幼稚園",
    "nameEn": "POK OI HOSPITAL CHAN HSU FONG LAM KINDERGARTEN",
    "district": "九龍",
    "district18": "觀塘區",
    "address": "九龍藍田廣田邨廣田商場２０４室",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_564036000113"
    ],
    "pedagogyTags": [
      "project_learn"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23491588",
    "website": "http://www.pokoi.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5640010001",
    "schoolCode": "564001",
    "campusCode": "0001",
    "name": "博愛醫院任永賢夫人幼稚園",
    "nameEn": "POK OI HOSPITAL MRS. YAM WING YIN KINDERGARTEN",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍紅磡海逸豪園23座地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_564001000113"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "play_explore",
      "project_learn"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23333279",
    "website": "http://www.pokoi.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5666830001",
    "schoolCode": "566683",
    "campusCode": "0001",
    "name": "博愛醫院施淑鎮幼稚園",
    "nameEn": "POK OI HOSPITAL SY SIOK CHUN KINDERGARTEN",
    "district": "九龍",
    "district18": "觀塘區",
    "address": "觀塘翠屏北邨翠楣樓地下一號單位",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_566683000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "project_learn",
      "language_dev"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english",
      "native_english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27720811",
    "website": "http://www.pokoi.org.hk/kindergarten",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5364820001",
    "schoolCode": "536482",
    "campusCode": "0001",
    "name": "崇真會白田美善幼稚園",
    "nameEn": "TSUNG TSIN MISSION PAK TIN GRACEFUL KINDERGARTEN",
    "district": "九龍",
    "district18": "深水埗區",
    "address": "九龍石硤尾白田邨盛田樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_536482000111",
      "edb_536482000112",
      "edb_536482000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "31522533",
    "website": "http://www.ptgraceful.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5146590001",
    "schoolCode": "514659",
    "campusCode": "0001",
    "name": "崇真小學暨幼稚園",
    "nameEn": "TSUNG TSIN PRIMARY SCHOOL AND KINDERGARTEN",
    "district": "九龍",
    "district18": "深水埗區",
    "address": "九龍大埔道58號東翼教學大樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_514659000111",
      "edb_514659000112",
      "edb_514659000113"
    ],
    "pedagogyTags": [
      "project_learn",
      "project_learn",
      "language_dev",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english",
      "bilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27773679",
    "website": "http://www.ttpskg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5426010001",
    "schoolCode": "542601",
    "campusCode": "0001",
    "name": "慈正邨菩提幼稚園",
    "nameEn": "TSZ CHING ESTATE BODHI SIKSA KINDERGARTEN",
    "district": "九龍",
    "district18": "黃大仙區",
    "address": "九龍慈雲山慈正邨正明樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_542601000111",
      "edb_542601000112",
      "edb_542601000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "language_dev"
    ],
    "languageEnv": [
      "putonghua",
      "english",
      "native_english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "",
    "website": "http://www.tcebsk.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_6044450001",
    "schoolCode": "604445",
    "campusCode": "0001",
    "name": "德萃幼稚園（紅磡）",
    "nameEn": "ST. HILARY'S KINDERGARTEN (HUNG HOM)",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍紅磡寶其利街１２１號城中匯地下入口、１樓、２樓及２樓平台",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_604445000111",
      "edb_604445000112"
    ],
    "pedagogyTags": [],
    "languageEnv": [],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23389097",
    "website": "http://kindergarten.sthilarys.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "low",
      "languageConfidence": "low",
      "needsReview": true
    }
  },
  {
    "id": "edb_6019850001",
    "schoolCode": "601985",
    "campusCode": "0001",
    "name": "德福英文幼稚園",
    "nameEn": "TELFORD GARDENS ENGLISH KINDERGARTEN",
    "district": "九龍",
    "district18": "觀塘區",
    "address": "九龍九龍灣德福花園平台三樓(K4課室除外)",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_601985000111",
      "edb_601985000112"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "english",
      "bilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27575749",
    "website": "http://www.telfordeducation.com",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_3247360001",
    "schoolCode": "324736",
    "campusCode": "0001",
    "name": "德福幼稚園",
    "nameEn": "TELFORD GARDENS KINDERGARTEN",
    "district": "九龍",
    "district18": "觀塘區",
    "address": "九龍觀塘九龍灣德福花園",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_324736000111",
      "edb_324736000112",
      "edb_324736000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27575749",
    "website": "http://www.telfordeducation.com",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5881300001",
    "schoolCode": "588130",
    "campusCode": "0001",
    "name": "德望小學暨幼稚園",
    "nameEn": "GOOD HOPE PRIMARY SCHOOL CUM KINDERGARTEN",
    "district": "九龍",
    "district18": "黃大仙區",
    "address": "九龍扎山道３８１－３８３號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_588130000111",
      "edb_588130000112"
    ],
    "pedagogyTags": [],
    "languageEnv": [],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23202269",
    "website": "http://www.ghs.edu.hk/kg/en/home",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "low",
      "languageConfidence": "low",
      "needsReview": true
    }
  },
  {
    "id": "edb_1335820001",
    "schoolCode": "133582",
    "campusCode": "0001",
    "name": "德信幼稚園",
    "nameEn": "TAK SUN KINDERGARTEN",
    "district": "九龍",
    "district18": "油尖旺區",
    "address": "九龍柯士甸道103號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_133582000111",
      "edb_133582000112"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "putonghua",
      "english",
      "native_english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27241674",
    "website": "http://www.taksunkg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_3255110002",
    "schoolCode": "325511",
    "campusCode": "0002",
    "name": "德貞幼稚園",
    "nameEn": "TACK CHING KINDERGARTEN",
    "district": "九龍",
    "district18": "深水埗區",
    "address": "九龍深水埗福榮街168號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_325511000211",
      "edb_325511000212"
    ],
    "pedagogyTags": [
      "project_learn",
      "language_dev"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27293212",
    "website": "https://www.tckg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_2162080001",
    "schoolCode": "216208",
    "campusCode": "0001",
    "name": "地利亞英文小學暨幼稚園",
    "nameEn": "DELIA ENGLISH PRIMARY SCHOOL & KINDERGARTEN",
    "district": "九龍",
    "district18": "深水埗區",
    "address": "九龍美孚新邨百老匯街８４至８６號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_216208000111",
      "edb_216208000112",
      "edb_216208000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "2742202727443960",
    "website": "http://www.deliakg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "low",
      "pedagogyConfidence": "medium",
      "languageConfidence": "high",
      "needsReview": true
    }
  },
  {
    "id": "edb_2162080002",
    "schoolCode": "216208",
    "campusCode": "0002",
    "name": "地利亞英文小學暨幼稚園",
    "nameEn": "DELIA ENGLISH PRIMARY SCHOOL & KINDERGARTEN",
    "district": "九龍",
    "district18": "深水埗區",
    "address": "九龍美孚新邨第８期１３８號舖",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_216208000211",
      "edb_216208000212",
      "edb_216208000213"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27422610",
    "website": "http://www.deliakg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "low",
      "pedagogyConfidence": "medium",
      "languageConfidence": "high",
      "needsReview": true
    }
  },
  {
    "id": "edb_3165040001",
    "schoolCode": "316504",
    "campusCode": "0001",
    "name": "第一幼稚園",
    "nameEn": "A-ONE KINDERGARTEN",
    "district": "九龍",
    "district18": "黃大仙區",
    "address": "九龍彩虹邨金漢樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_316504000111",
      "edb_316504000112",
      "edb_316504000113"
    ],
    "pedagogyTags": [
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23204880",
    "website": "https://a-onekg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5635360001",
    "schoolCode": "563536",
    "campusCode": "0001",
    "name": "東華三院陳嫺幼兒園",
    "nameEn": "TWGHS CHAN HAN NURSERY SCHOOL",
    "district": "九龍",
    "district18": "觀塘區",
    "address": "九龍秀茂坪（一）邨秀富樓地下２號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_563536000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "language_dev"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23405982",
    "website": "http://www.tungwahcsd.org",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5635520001",
    "schoolCode": "563552",
    "campusCode": "0001",
    "name": "東華三院方肇彝幼兒園",
    "nameEn": "TWGHS FONG SHIU YEE NURSERY SCHOOL",
    "district": "九龍",
    "district18": "黃大仙區",
    "address": "九龍龍翔道天馬苑商場２樓Ｆ１２號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_563552000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "language_dev"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23200336",
    "website": "http://www.tungwahcsd.org",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_6055300001",
    "schoolCode": "605530",
    "campusCode": "0001",
    "name": "東華三院何藍瓊纓幼稚園",
    "nameEn": "TWGHS LUCINA LAAM HO KINDERGARTEN",
    "district": "九龍",
    "district18": "觀塘區",
    "address": "九龍觀塘安達邨安達商場地下高層",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_605530000111",
      "edb_605530000112",
      "edb_605530000113"
    ],
    "pedagogyTags": [
      "project_learn",
      "project_learn",
      "language_dev"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english",
      "bilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "",
    "website": "",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5171270001",
    "schoolCode": "517127",
    "campusCode": "0001",
    "name": "東華三院黃士心幼稚園",
    "nameEn": "TUNG WAH GROUP OF HOSPITALS WONG SEE SUM KINDERGARTEN",
    "district": "九龍",
    "district18": "觀塘區",
    "address": "九龍觀塘翠屏邨翠樂樓Ａ及Ｂ翼地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_517127000111",
      "edb_517127000112",
      "edb_517127000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23480285",
    "website": "http://www.twghwsskg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5635790001",
    "schoolCode": "563579",
    "campusCode": "0001",
    "name": "東華三院羅黃碧珊幼兒園",
    "nameEn": "TWGHS LO WONG PIK SHAN NURSERY SCHOOL",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍何文田愛民邨保民樓地下425-434室",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_563579000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27129383",
    "website": "https://lwpsns.tungwahcsd.org/tc/home",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5641760001",
    "schoolCode": "564176",
    "campusCode": "0001",
    "name": "東華三院群芳幼兒園",
    "nameEn": "TWGHS KWAN FONG NURSERY SCHOOL",
    "district": "九龍",
    "district18": "黃大仙區",
    "address": "九龍黃大仙竹園南邨富園樓地下１２０－１２９號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_564176000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23516718",
    "website": "http://www.tungwahcsd.org",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_6153150001",
    "schoolCode": "615315",
    "campusCode": "0001",
    "name": "東華三院譚錦球伉儷幼稚園",
    "nameEn": "TWGHS MR. & MRS. TAM KAM KAU KINDERGARTEN",
    "district": "九龍",
    "district18": "深水埗區",
    "address": "九龍長沙灣凱樂苑凱碧閣(A座)地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_615315000111",
      "edb_615315000112",
      "edb_615315000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "language_dev"
    ],
    "languageEnv": [
      "trilingual",
      "english",
      "bilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26777266",
    "website": "https://www.tkk-kindergarten.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_3254140002",
    "schoolCode": "325414",
    "campusCode": "0002",
    "name": "東華三院韋祥智紀念幼稚園",
    "nameEn": "TWGHS WAI CHEUNG CHI MEMORIAL KINDERGARTEN",
    "district": "九龍",
    "district18": "黃大仙區",
    "address": "九龍啟鑽苑啟濤閣地下KG01室",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_325414000211",
      "edb_325414000212",
      "edb_325414000213"
    ],
    "pedagogyTags": [
      "project_learn",
      "language_dev"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "",
    "website": "https://wcc-kindergarten.edu.hk/?lang=en",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5425040001",
    "schoolCode": "542504",
    "campusCode": "0001",
    "name": "多多國際幼稚園（九龍塘）",
    "nameEn": "TUTOR TIME INTERNATIONAL KINDERGARTEN (KOWLOON TONG)",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍九龍塘多實街１號１樓（包括幼兒中心）",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_542504000111",
      "edb_542504000112"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23370822",
    "website": "http://www.tutortime.com.hk/en/home",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "low",
      "languageConfidence": "high",
      "needsReview": true
    }
  },
  {
    "id": "edb_5937880001",
    "schoolCode": "593788",
    "campusCode": "0001",
    "name": "楓葉小熊加拿大國際幼稚園(油塘)",
    "nameEn": "MAPLE BEAR CANADIAN INTERNATIONAL KINDERGARTEN (YAU TONG)",
    "district": "九龍",
    "district18": "觀塘區",
    "address": "九龍油塘草園街8號嘉賢居1樓及地下高層G5及G5A舖",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_593788000111",
      "edb_593788000112"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "english",
      "bilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27176336",
    "website": "https://www.maplebear.hk",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "medium",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_3247870001",
    "schoolCode": "324787",
    "campusCode": "0001",
    "name": "佛教曾果成中英文幼稚園",
    "nameEn": "BUDDHIST TSANG KOR SING ANGLO-CHINESE KINDERGARTEN",
    "district": "九龍",
    "district18": "深水埗區",
    "address": "九龍麗閣邨麗萱樓３樓平台",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_324787000111",
      "edb_324787000112",
      "edb_324787000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "2361126723611268",
    "website": "http://www.tsangkorsing.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_6008900001",
    "schoolCode": "600890",
    "campusCode": "0001",
    "name": "佛教陳策文伉儷幼稚園",
    "nameEn": "BUDDHIST MR. & MRS. CHAN CHART MAN KINDERGARTEN",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍承啟道２８號德朗邨幼稚園",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_600890000111",
      "edb_600890000112",
      "edb_600890000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "project_learn",
      "language_dev",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27951008",
    "website": "http://www.bccm.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5659460001",
    "schoolCode": "565946",
    "campusCode": "0001",
    "name": "佛教慈慧幼兒園",
    "nameEn": "BUDDHIST CHI WAI DAY NURSERY",
    "district": "九龍",
    "district18": "觀塘區",
    "address": "九龍觀塘雲漢邨漢松樓地下３號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_565946000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23456832",
    "website": "http://www.hkbuddhist.org/bcwdn",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_3256780001",
    "schoolCode": "325678",
    "campusCode": "0001",
    "name": "佛教傅康幼稚園",
    "nameEn": "BUDDHIST FOO HONG KINDERGARTEN",
    "district": "九龍",
    "district18": "黃大仙區",
    "address": "九龍黃大仙下邨龍逸樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_325678000111",
      "edb_325678000112",
      "edb_325678000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "language_dev"
    ],
    "languageEnv": [
      "trilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23261456",
    "website": "http://www.bfhkwts.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_3234970001",
    "schoolCode": "323497",
    "campusCode": "0001",
    "name": "佛教金麗幼稚園",
    "nameEn": "BUDDHIST KAM LAI KINDERGARTEN",
    "district": "九龍",
    "district18": "觀塘區",
    "address": "九龍藍田康雅苑A及B座地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_323497000111",
      "edb_323497000112"
    ],
    "pedagogyTags": [
      "play_explore",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23465162",
    "website": "http://www.buddhist-kam-lai-kg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_3250900001",
    "schoolCode": "325090",
    "campusCode": "0001",
    "name": "港澳信義會錫安紀念幼稚園",
    "nameEn": "HONG KONG AND MACAU LUTHERAN CHURCH SHEK ON MEMORIAL KINDERGARTEN",
    "district": "九龍",
    "district18": "黃大仙區",
    "address": "九龍黃大仙蒲崗村道１１號鍚安樓２及３樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_325090000111",
      "edb_325090000112",
      "edb_325090000113"
    ],
    "pedagogyTags": [
      "project_learn"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english",
      "native_english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23283681",
    "website": "http://hkmlcsok.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_2161780001",
    "schoolCode": "216178",
    "campusCode": "0001",
    "name": "港青基信國際幼稚園",
    "nameEn": "YMCA OF HONG KONG CHRISTIAN INTERNATIONAL KINDERGARTEN",
    "district": "九龍",
    "district18": "油尖旺區",
    "address": "九龍梳士巴利道４１號香港基督教青年會２樓",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_216178000111",
      "edb_216178000112",
      "edb_216178000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "22687766",
    "website": "http://www.ymcaikg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "low",
      "languageConfidence": "high",
      "needsReview": true
    }
  },
  {
    "id": "edb_5655200001",
    "schoolCode": "565520",
    "campusCode": "0001",
    "name": "港青基信幼兒學校（農圃道）",
    "nameEn": "YMCA OF HONG KONG CHRISTIAN NURSERY SCHOOL (FARM ROAD)",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍九龍城農圃道１１號帝庭豪園地下（部份）",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_565520000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "language_dev"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "22468234",
    "website": "http://www.ymcahk.org.hk/cnsfr/tc/home/index.html",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5997000001",
    "schoolCode": "599700",
    "campusCode": "0001",
    "name": "港青基信幼稚園（啟晴）",
    "nameEn": "YMCA OF HONG KONG CHRISTIAN KINDERGARTEN (KAI CHING)",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍九龍城沐虹街１２號啟晴邨賞晴樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_599700000111",
      "edb_599700000112",
      "edb_599700000113"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "play_explore",
      "holistic"
    ],
    "languageEnv": [
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23415262",
    "website": "http://www.ymcahk.org.hk/ckkc",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_3223000001",
    "schoolCode": "322300",
    "campusCode": "0001",
    "name": "根德園幼稚園",
    "nameEn": "KENTVILLE KINDERGARTEN",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍根德道９號地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_322300000111",
      "edb_322300000112"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23367286",
    "website": "http://www.kentville.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "low",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": true
    }
  },
  {
    "id": "edb_3223000002",
    "schoolCode": "322300",
    "campusCode": "0002",
    "name": "根德園幼稚園",
    "nameEn": "KENTVILLE KINDERGARTEN",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍多實街５－７號地下及１樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_322300000211",
      "edb_322300000212"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23386422",
    "website": "http://www.kentville.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "low",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": true
    }
  },
  {
    "id": "edb_3242480001",
    "schoolCode": "324248",
    "campusCode": "0001",
    "name": "官塘浸信會幼稚園",
    "nameEn": "KWUN TONG BAPTIST CHURCH KINDERGARTEN",
    "district": "九龍",
    "district18": "觀塘區",
    "address": "九龍 觀塘 功樂道83號 地下(部份)及4樓至5樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_324248000111",
      "edb_324248000112",
      "edb_324248000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23424008",
    "website": "http://www.ktbckg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_3197750001",
    "schoolCode": "319775",
    "campusCode": "0001",
    "name": "觀塘循道幼稚園",
    "nameEn": "KWUN TONG METHODIST KINDERGARTEN",
    "district": "九龍",
    "district18": "觀塘區",
    "address": "觀塘牛頭角道花園大廈玉蓮台第３座２－０７１室",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_319775000111",
      "edb_319775000112",
      "edb_319775000113"
    ],
    "pedagogyTags": [
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23423062",
    "website": "http://www.ktmk.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_6135090001",
    "schoolCode": "613509",
    "campusCode": "0001",
    "name": "光愛樂幼稚園(安泰)",
    "nameEn": "LIGHT AND LOVE HOME HAPPY KINDERGARTEN (ON TAI)",
    "district": "九龍",
    "district18": "觀塘區",
    "address": "九龍觀塘安泰邨景泰樓地下高層",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_613509000111",
      "edb_613509000112",
      "edb_613509000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "project_learn",
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23685077",
    "website": "https://www.llhhk.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_2151200001",
    "schoolCode": "215120",
    "campusCode": "0001",
    "name": "國際英文幼稚園",
    "nameEn": "ST. CATHERINE'S INTERNATIONAL KINDERGARTEN",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍九龍塘羅福道四及六號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_215120000111",
      "edb_215120000112"
    ],
    "pedagogyTags": [
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "trilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "2337734423377680",
    "website": "http://www.stcatherines.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_2151200002",
    "schoolCode": "215120",
    "campusCode": "0002",
    "name": "國際英文幼稚園",
    "nameEn": "ST. CATHERINE'S INTERNATIONAL KINDERGARTEN",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍九龍塘雅息士道１號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_215120000211",
      "edb_215120000212"
    ],
    "pedagogyTags": [
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "trilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23377273",
    "website": "http://www.stcatherines.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_6272750001",
    "schoolCode": "627275",
    "campusCode": "0001",
    "name": "哈羅小獅幼稚園",
    "nameEn": "HARROW LITTLE LIONS KINDERGARTEN",
    "district": "九龍",
    "district18": "觀塘區",
    "address": "九龍觀塘道55號地下G—05號舖及一樓L1—05，L1—06及L1—07號舖及二樓L2—03及L2—04號舖",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_627275000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "",
    "website": "",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "low",
      "languageConfidence": "high",
      "needsReview": true
    }
  },
  {
    "id": "edb_6077030001",
    "schoolCode": "607703",
    "campusCode": "0001",
    "name": "漢迪國際幼稚園",
    "nameEn": "KENDALL INTERNATIONAL PRESCHOOL",
    "district": "九龍",
    "district18": "深水埗區",
    "address": "九龍長沙灣福榮街２２８號寓‧弍捌地下",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_607703000111",
      "edb_607703000112"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23288223",
    "website": "http://www.kendall.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "medium",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_6160010001",
    "schoolCode": "616001",
    "campusCode": "0001",
    "name": "漢師幼稚園(龍總)",
    "nameEn": "HKVNS ALUMNI ASSOCIATION KINDERGARTEN (KCC)",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍何文田自由道2號九龍總商會大廈地下(部分)及一樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_616001000111",
      "edb_616001000112",
      "edb_616001000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "project_learn",
      "language_dev",
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23847272",
    "website": "",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5360240001",
    "schoolCode": "536024",
    "campusCode": "0001",
    "name": "何文田浸信會幼稚園",
    "nameEn": "HOMANTIN BAPTIST CHURCH KINDERGARTEN",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍何文田南村第五座適文樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_536024000111",
      "edb_536024000112",
      "edb_536024000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "project_learn",
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "22420024",
    "website": "http://www.hmtbck.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5650160001",
    "schoolCode": "565016",
    "campusCode": "0001",
    "name": "何文田循道衛理楊震幼兒學校",
    "nameEn": "HOMANTIN YANG MEMORIAL METHODIST PRE-SCHOOL",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍何文田邨靜文樓地下１室",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "WD"
    ],
    "variantIds": [
      "edb_565016000111",
      "edb_565016000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "22420678",
    "website": "http://www.hmtps.org",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5653690001",
    "schoolCode": "565369",
    "campusCode": "0001",
    "name": "花園大廈浸信會幼兒學校",
    "nameEn": "GARDEN ESTATE BAPTIST NURSERY SCHOOL",
    "district": "九龍",
    "district18": "觀塘區",
    "address": "九龍觀塘牛頭角道２９７號花園大廈玉蓮台２座２樓３７室",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_565369000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "project_learn",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "trilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23454340",
    "website": "http://www.gebns.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_3230550001",
    "schoolCode": "323055",
    "campusCode": "0001",
    "name": "歡樂創意幼稚園(觀塘分校)",
    "nameEn": "FUN CREATIVE KINDERGARTEN (KWUN TONG BRANCH)",
    "district": "九龍",
    "district18": "觀塘區",
    "address": "坪石邨金石樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_323055000111",
      "edb_323055000112",
      "edb_323055000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "project_learn",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23236363",
    "website": "http://www.pingshekkingslandkg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_6241950001",
    "schoolCode": "624195",
    "campusCode": "0001",
    "name": "匯成勞士施羅孚伉儷慈善基金幼稚園",
    "nameEn": "IBEL RUSY AND PURVIZ SHROFF CHARITABLE FOUNDATION KINDERGARTEN",
    "district": "九龍",
    "district18": "油尖旺區",
    "address": "九龍尖沙咀廣東道188號港景滙商場1樓119—121號舖",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_624195000111",
      "edb_624195000112"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23977868",
    "website": "",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5667480001",
    "schoolCode": "566748",
    "campusCode": "0001",
    "name": "滙豐幼兒學校",
    "nameEn": "WAYFOONG NURSERY SCHOOL",
    "district": "九龍",
    "district18": "油尖旺區",
    "address": "九龍大角咀深旺道１號３座高層地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_566748000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "22884922",
    "website": "http://www.hkcschild.edu.hk/wfns",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "low",
      "languageConfidence": "low",
      "needsReview": true
    }
  },
  {
    "id": "edb_3232680001",
    "schoolCode": "323268",
    "campusCode": "0001",
    "name": "基督教佈道中心樂富幼稚園",
    "nameEn": "CHRISTIAN EVANGELICAL CENTRE LOK FU KINDERGARTEN",
    "district": "九龍",
    "district18": "黃大仙區",
    "address": "九龍聯合道198號樂富邨樂謙樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_323268000111",
      "edb_323268000112",
      "edb_323268000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23388236",
    "website": "http://www.lokfukg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5381320001",
    "schoolCode": "538132",
    "campusCode": "0001",
    "name": "基督教恩苗東九龍幼稚園",
    "nameEn": "GRACEFIELD EAST KOWLOON CHRISTIAN KINDERGARTEN",
    "district": "九龍",
    "district18": "黃大仙區",
    "address": "九龍黃大仙上邨倡善樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_538132000111",
      "edb_538132000112",
      "edb_538132000113"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "language_dev"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "22164106",
    "website": "https://gracefield.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5646560001",
    "schoolCode": "564656",
    "campusCode": "0001",
    "name": "基督教家庭服務中心德田幼稚園",
    "nameEn": "CHRISTIAN FAMILY SERVICE CENTRE TAK TIN KINDERGARTEN",
    "district": "九龍",
    "district18": "觀塘區",
    "address": "九龍藍田康雅苑停車場頂樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_564656000113"
    ],
    "pedagogyTags": [
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "trilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27752881",
    "website": "http://www.cfsc.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5646640001",
    "schoolCode": "564664",
    "campusCode": "0001",
    "name": "基督教家庭服務中心趣樂幼稚園",
    "nameEn": "CHRISTIAN FAMILY SERVICE CENTRE CHEERLAND KINDERGARTEN",
    "district": "九龍",
    "district18": "觀塘區",
    "address": "九龍觀塘翠屏道３號３樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_564664000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "play_explore",
      "project_learn",
      "project_learn",
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23893363",
    "website": "http://www.cfsc.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_6102910001",
    "schoolCode": "610291",
    "campusCode": "0001",
    "name": "基督教家庭服務中心楊蔡慧嫻紀念幼稚園",
    "nameEn": "CHRISTIAN FAMILY SERVICE CENTRE YEOH CHOY WAI HAAN MEMORIAL KINDERGARTEN",
    "district": "九龍",
    "district18": "觀塘區",
    "address": "九龍觀塘安達邨謙達樓與正達樓之間地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_610291000111",
      "edb_610291000112",
      "edb_610291000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25074811",
    "website": "https://ycwh.cfsc.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5669500001",
    "schoolCode": "566950",
    "campusCode": "0001",
    "name": "基督教聯合醫務協會幼兒學校",
    "nameEn": "UNITED CHRISTIAN MEDICAL SERVICE NURSERY SCHOOL",
    "district": "九龍",
    "district18": "觀塘區",
    "address": "九龍觀塘協和街１３０號基督教聯合醫院Ｊ座（陳國本大樓）１樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_566950000113"
    ],
    "pedagogyTags": [
      "project_learn",
      "project_learn"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23472286",
    "website": "http://www.hkcschild.edu.hk/ucmsns",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_3230800001",
    "schoolCode": "323080",
    "campusCode": "0001",
    "name": "基督教挪威差會主辦信義中英文幼稚園",
    "nameEn": "N-M-S' LUTHERAN KINDERGARTEN",
    "district": "九龍",
    "district18": "深水埗區",
    "address": "九龍又一村瑰麗路３６號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_323080000111",
      "edb_323080000112",
      "edb_323080000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "holistic"
    ],
    "languageEnv": [
      "bilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "2778073427779207",
    "website": "http://www.elchk.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5637810001",
    "schoolCode": "563781",
    "campusCode": "0001",
    "name": "基督教香港崇真會安基幼兒學校",
    "nameEn": "TSUNG TSIN MISSION OF HONG KONG ON KEI NURSERY SCHOOL",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍紅磡黃埔花園第５期青樺苑第９座平台",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_563781000113"
    ],
    "pedagogyTags": [
      "holistic"
    ],
    "languageEnv": [
      "putonghua",
      "english",
      "native_english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27647050",
    "website": "http://www.ttmssd.org/oi",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_6131690001",
    "schoolCode": "613169",
    "campusCode": "0001",
    "name": "基督教香港崇真會安康幼兒學校(順寧道)",
    "nameEn": "TSUNG TSIN MISSION OF HONG KONG ON HONG NURSERY SCHOOL (SHUN NING ROAD)",
    "district": "九龍",
    "district18": "深水埗區",
    "address": "九龍深水埗順寧道273號日輝商場1樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_613169000113"
    ],
    "pedagogyTags": [
      "holistic"
    ],
    "languageEnv": [
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27796861",
    "website": "https://oh.ttmssd.org",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5640600001",
    "schoolCode": "564060",
    "campusCode": "0001",
    "name": "基督教香港崇真會安強幼兒學校",
    "nameEn": "TSUNG TSIN MISSION OF HONG KONG ON KEUNG NURSERY SCHOOL",
    "district": "九龍",
    "district18": "黃大仙區",
    "address": "九龍鑽石山鳳德邨鳳德社區中心５樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_564060000113"
    ],
    "pedagogyTags": [
      "holistic"
    ],
    "languageEnv": [
      "putonghua",
      "english",
      "native_english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23210580",
    "website": "http://www.ttmssd.org/ok",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5637490001",
    "schoolCode": "563749",
    "campusCode": "0001",
    "name": "基督教香港崇真會安怡幼兒學校",
    "nameEn": "TSUNG TSIN MISSION OF HONG KONG ON YEE NURSERY SCHOOL",
    "district": "九龍",
    "district18": "觀塘區",
    "address": "九龍油塘高怡邨高盛樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_563749000113"
    ],
    "pedagogyTags": [
      "holistic"
    ],
    "languageEnv": [
      "putonghua",
      "english",
      "native_english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27276468",
    "website": "http://www.ttmssd.org/oe",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5648340001",
    "schoolCode": "564834",
    "campusCode": "0001",
    "name": "基督教香港信義會靈安幼兒學校",
    "nameEn": "ELCHK LING ON NURSERY SCHOOL",
    "district": "九龍",
    "district18": "觀塘區",
    "address": "九龍藍田啓田道７１號藍田（西區）社區中心６樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_564834000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27756767",
    "website": "http://lons.elchk.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5645670001",
    "schoolCode": "564567",
    "campusCode": "0001",
    "name": "基督教香港信義會馬頭圍幼兒學校",
    "nameEn": "ELCHK, MA TAU WAI NURSERY SCHOOL",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍馬頭圍邨夜合樓115， 117及118號地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_564567000113"
    ],
    "pedagogyTags": [
      "project_learn",
      "project_learn"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27128648",
    "website": "http://www.lphccs.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_3256350001",
    "schoolCode": "325635",
    "campusCode": "0001",
    "name": "基督教香港信義會南昌幼稚園",
    "nameEn": "EVANGELICAL LUTHERAN CHURCH OF HONG KONG NAM CHEONG KINDERGARTEN",
    "district": "九龍",
    "district18": "深水埗區",
    "address": "九龍深水埗南昌邨第一座昌頌樓及ＫＧ０１室户外活動場地",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_325635000111",
      "edb_325635000112",
      "edb_325635000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore"
    ],
    "languageEnv": [
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "",
    "website": "http://www.elchkkg.edu.hk/nam-cheong",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5645750001",
    "schoolCode": "564575",
    "campusCode": "0001",
    "name": "基督教香港信義會啟業幼兒學校",
    "nameEn": "ELCHK, KAI YIP NURSERY SCHOOL",
    "district": "九龍",
    "district18": "觀塘區",
    "address": "九龍九龍灣啓業邨啓寧樓地下15-18及24-27號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_564575000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27579529",
    "website": "http://www.lphccs.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5779870001",
    "schoolCode": "577987",
    "campusCode": "0001",
    "name": "基督教小樹苗幼稚園",
    "nameEn": "CHRISTIAN LITTLE TREE KINDERGARTEN",
    "district": "九龍",
    "district18": "觀塘區",
    "address": "九龍牛頭角彩盈邨盈樂樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_577987000111",
      "edb_577987000112"
    ],
    "pedagogyTags": [
      "project_learn",
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "36950118",
    "website": "https://www.littletree.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_3252440001",
    "schoolCode": "325244",
    "campusCode": "0001",
    "name": "基督教小天使(麗晶)幼稚園",
    "nameEn": "CHRISTIAN LITTLE ANGEL KINDERGARTEN RICHLAND GARDENS",
    "district": "九龍",
    "district18": "觀塘區",
    "address": "九龍九龍灣宏光道８０號麗晶花園第２１－２２座地下Ｃ２號（包括幼兒中心）",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_325244000111",
      "edb_325244000112",
      "edb_325244000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27550198",
    "website": "http://www.clakrg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_6141140001",
    "schoolCode": "614114",
    "campusCode": "0001",
    "name": "基督教宣道會安泰幼稚園",
    "nameEn": "CHRISTIAN & MISSIONARY ALLIANCE ON TAI KINDERGARTEN",
    "district": "九龍",
    "district18": "觀塘區",
    "address": "九龍觀塘安泰邨和泰樓地下高層",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_614114000111",
      "edb_614114000112",
      "edb_614114000113"
    ],
    "pedagogyTags": [
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "",
    "website": "",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5658730001",
    "schoolCode": "565873",
    "campusCode": "0001",
    "name": "基督教宣道會富山幼兒學校",
    "nameEn": "CHRISTIAN & MISSIONARY ALLIANCE FU SHAN NURSERY SCHOOL",
    "district": "九龍",
    "district18": "黃大仙區",
    "address": "九龍蒲崗村道富山邨富信樓地庫１層１－６號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_565873000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23512833",
    "website": "http://www.fushan.cmasshk.org",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5491690001",
    "schoolCode": "549169",
    "campusCode": "0001",
    "name": "基督教中國佈道會恩恩創意幼稚園",
    "nameEn": "EVANGELIZE CHINA FELLOWSHIP BLESSINGS CREATIVITY KINDERGARTEN",
    "district": "九龍",
    "district18": "黃大仙區",
    "address": "九龍慈雲山慈康邨",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_549169000111",
      "edb_549169000112",
      "edb_549169000113"
    ],
    "pedagogyTags": [
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "29975299",
    "website": "http://www.ecfbck.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_3159070001",
    "schoolCode": "315907",
    "campusCode": "0001",
    "name": "基督教中心幼稚園",
    "nameEn": "CHRISTIAN YOUTH CENTRE KINDERGARTEN",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍九龍塘窩打老道１０３號地下（包括幼兒中心）",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_315907000111",
      "edb_315907000112"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "project_learn",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english",
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23370072",
    "website": "http://www.cyckg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5958370001",
    "schoolCode": "595837",
    "campusCode": "0001",
    "name": "基督教中心幼稚園(油塘)",
    "nameEn": "CHRISTIAN YOUTH CENTRE KINDERGARTEN (YAU TONG)",
    "district": "九龍",
    "district18": "觀塘區",
    "address": "九龍油塘邨第五期三樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_595837000111",
      "edb_595837000112",
      "edb_595837000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "project_learn",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english",
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23489699",
    "website": "http://www.cyckg.edu.hk/yautong",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_2101960001",
    "schoolCode": "210196",
    "campusCode": "0001",
    "name": "基督堂幼稚園",
    "nameEn": "CHRIST CHURCH KINDERGARTEN",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍塘志士達道5號二至四字樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM"
    ],
    "variantIds": [
      "edb_210196000111"
    ],
    "pedagogyTags": [
      "project_learn"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23373229",
    "website": "http://www.cckg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5970310001",
    "schoolCode": "597031",
    "campusCode": "0001",
    "name": "伽利利國際幼稚園",
    "nameEn": "GALILEE INTERNATIONAL KINDERGARTEN",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍何文田太平道2號太平花園地下部分及一樓",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_597031000111",
      "edb_597031000112"
    ],
    "pedagogyTags": [],
    "languageEnv": [],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23903000",
    "website": "http://www.gis.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "low",
      "pedagogyConfidence": "low",
      "languageConfidence": "low",
      "needsReview": true
    }
  },
  {
    "id": "edb_3241590001",
    "schoolCode": "324159",
    "campusCode": "0001",
    "name": "佳寶幼稚園",
    "nameEn": "GUIDEPOSTS KINDERGARTEN",
    "district": "九龍",
    "district18": "深水埗區",
    "address": "九龍美孚新邨萬事達廣場５號Ｂ平台",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_324159000111",
      "edb_324159000112",
      "edb_324159000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27432800",
    "website": "http://www.guideposts.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_6185270001",
    "schoolCode": "618527",
    "campusCode": "0001",
    "name": "佳寶幼稚園(南昌分校)",
    "nameEn": "GUIDEPOSTS KINDERGARTEN (NAM CHEONG BRANCH)",
    "district": "九龍",
    "district18": "深水埗區",
    "address": "九龍深水埗深旺道38號海達邨海榮樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_618527000111",
      "edb_618527000112"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26811208",
    "website": "http://www.guideposts.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5318980001",
    "schoolCode": "531898",
    "campusCode": "0001",
    "name": "迦南幼稚園（富榮花園）",
    "nameEn": "CANNAN KINDERGARTEN (CHARMING GARDEN)",
    "district": "九龍",
    "district18": "油尖旺區",
    "address": "九龍旺角海庭道８號富榮花園１２座幼稚園地下及一樓（包括幼兒中心）",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_531898000111",
      "edb_531898000112"
    ],
    "pedagogyTags": [
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "english",
      "bilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "21756202",
    "website": "http://www.cannan.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5755180001",
    "schoolCode": "575518",
    "campusCode": "0001",
    "name": "迦南幼稚園(黃埔花園)",
    "nameEn": "CANNAN KINDERGARTEN (WHAMPOA GARDEN)",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍紅磡黃埔花園第十期部分商場平台地下(不包括幼兒中心)",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_575518000111",
      "edb_575518000112"
    ],
    "pedagogyTags": [
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "english",
      "bilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23303336",
    "website": "http://www.cannan.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5319100001",
    "schoolCode": "531910",
    "campusCode": "0001",
    "name": "迦南幼稚園（九龍塘）",
    "nameEn": "CANNAN KINDERGARTEN (KOWLOON TONG)",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍九龍塘金巴倫道９及１１號地下部分及１樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_531910000111",
      "edb_531910000112"
    ],
    "pedagogyTags": [
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "english",
      "bilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23383262",
    "website": "http://www.cannan.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_2160540001",
    "schoolCode": "216054",
    "campusCode": "0001",
    "name": "迦南幼稚園(麗港城)",
    "nameEn": "CANNAN KINDERGARTEN (LAGUNA CITY)",
    "district": "九龍",
    "district18": "觀塘區",
    "address": "九龍觀塘茶果嶺道麗港城第二期地下低層１樓（不包括幼兒中心）",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_216054000111",
      "edb_216054000112"
    ],
    "pedagogyTags": [
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "english",
      "bilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27176667",
    "website": "http://www.cannan.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5651300001",
    "schoolCode": "565130",
    "campusCode": "0001",
    "name": "迦南幼稚園(窩打老道)",
    "nameEn": "CANNAN KINDERGARTEN (WATERLOO ROAD)",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍九龍塘窩打老道１１１號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_565130000111",
      "edb_565130000112"
    ],
    "pedagogyTags": [
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "english",
      "bilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23360006",
    "website": "http://www.cannan.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5377130001",
    "schoolCode": "537713",
    "campusCode": "0001",
    "name": "劍鳴幼稚園",
    "nameEn": "KEEN MIND KINDERGARTEN",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍九龍塘金巴倫道１３號地下（包括幼兒中心）",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_537713000111",
      "edb_537713000112"
    ],
    "pedagogyTags": [],
    "languageEnv": [],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23380832",
    "website": "http://www.keenmind.com.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "low",
      "languageConfidence": "low",
      "needsReview": true
    }
  },
  {
    "id": "edb_2148680001",
    "schoolCode": "214868",
    "campusCode": "0001",
    "name": "金巴倫英文幼稚園",
    "nameEn": "ST. NICHOLAS' ENGLISH KINDERGARTEN",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍金巴倫道５７號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_214868000111",
      "edb_214868000112"
    ],
    "pedagogyTags": [
      "special_curriculum"
    ],
    "languageEnv": [
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23373888",
    "website": "http://www.stnicholas.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5655630001",
    "schoolCode": "565563",
    "campusCode": "0001",
    "name": "浸信會愛羣社會服務處培殷幼兒學校",
    "nameEn": "BAPTIST OI KWAN SOCIAL SERVICE PUI YAN PRE-PRIMARY SCHOOL",
    "district": "九龍",
    "district18": "深水埗區",
    "address": "九龍長沙灣幸福街一號地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_565563000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23600999",
    "website": "http://www.bokss.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5198630003",
    "schoolCode": "519863",
    "campusCode": "0003",
    "name": "京斯敦國際幼稚園",
    "nameEn": "KINGSTON INTERNATIONAL KINDERGARTEN",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍九龍塘金巴倫道１２號地下及１樓",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "ib",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_519863000311",
      "edb_519863000312"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "play_explore"
    ],
    "languageEnv": [
      "putonghua",
      "english",
      "bilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23379049",
    "website": "https://www.kingston.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5508920001",
    "schoolCode": "550892",
    "campusCode": "0001",
    "name": "晶晶幼稚園（順利分校）",
    "nameEn": "JING JING KINDERGARTEN (SHUN LEE BRANCH)",
    "district": "九龍",
    "district18": "觀塘區",
    "address": "九龍利安道３２號順利紀律部隊宿舍２樓１５Ａ舖（包括幼兒中心）",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_550892000111",
      "edb_550892000112"
    ],
    "pedagogyTags": [
      "project_learn",
      "project_learn",
      "project_learn",
      "language_dev",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "english",
      "bilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "34094481",
    "website": "http://www.jingjing.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_3240780001",
    "schoolCode": "324078",
    "campusCode": "0001",
    "name": "九龍城浸信會幼稚園",
    "nameEn": "KOWLOON CITY BAPTIST CHURCH KINDERGARTEN",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍亞皆老街２０６號三及四樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_324078000111",
      "edb_324078000112",
      "edb_324078000113"
    ],
    "pedagogyTags": [
      "project_learn",
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "putonghua",
      "english",
      "native_english",
      "bilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27131875",
    "website": "https://www.kcbckg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_3249300002",
    "schoolCode": "324930",
    "campusCode": "0002",
    "name": "九龍迦南中英文幼稚園",
    "nameEn": "KOWLOON CANNAN ANGLO-CHINESE KINDERGARTEN",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍土瓜灣九龍城道6號津匯地下A舖及九龍城道8號津匯1樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_324930000211",
      "edb_324930000212"
    ],
    "pedagogyTags": [
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "english",
      "bilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23362096",
    "website": "",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_1381770001",
    "schoolCode": "138177",
    "campusCode": "0001",
    "name": "九龍禮賢學校",
    "nameEn": "KOWLOON RHENISH SCHOOL",
    "district": "九龍",
    "district18": "深水埗區",
    "address": "九龍又一村石竹路２Ａ號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_138177000111",
      "edb_138177000112"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "project_learn",
      "language_dev",
      "holistic",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "trilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23806011",
    "website": "http://www.krs.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5645240001",
    "schoolCode": "564524",
    "campusCode": "0001",
    "name": "九龍靈糧堂幼兒園",
    "nameEn": "KOWLOON LING LIANG CHURCH DAY NURSERY",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍九龍城嘉林邊道1號4樓及5樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_564524000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "project_learn",
      "holistic",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23372575",
    "website": "http://www.kllck.edu.hk/kllcdn",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_3246800001",
    "schoolCode": "324680",
    "campusCode": "0001",
    "name": "九龍靈糧堂幼稚園",
    "nameEn": "KOWLOON LING LIANG CHURCH KINDERGARTEN",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍九龍城嘉林邊道１號３樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_324680000111",
      "edb_324680000112"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "project_learn",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "2338834423372575",
    "website": "http://www.kllck.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_6071500002",
    "schoolCode": "607150",
    "campusCode": "0002",
    "name": "九龍真光中學(幼稚園部)",
    "nameEn": "KOWLOON TRUE LIGHT SCHOOL (KINDERGARTEN SECTION)",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍紅磡黃埔花園第七期地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_607150000211",
      "edb_607150000212"
    ],
    "pedagogyTags": [
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "putonghua",
      "english",
      "cantonese",
      "native_english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27558800",
    "website": "",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5631700001",
    "schoolCode": "563170",
    "campusCode": "0001",
    "name": "救世軍白田幼兒學校",
    "nameEn": "THE SALVATION ARMY PAK TIN NURSERY SCHOOL",
    "district": "九龍",
    "district18": "深水埗區",
    "address": "九龍深水埗白雲街白田邨富田樓C翼地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_563170000113"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "project_learn",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27783588",
    "website": "https://salvationarmy.org.hk/esd/ptnsc",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5665350001",
    "schoolCode": "566535",
    "campusCode": "0001",
    "name": "救世軍卜凱賽琳幼兒學校",
    "nameEn": "THE SALVATION ARMY CATHERINE BOOTH NURSERY SCHOOL",
    "district": "九龍",
    "district18": "油尖旺區",
    "address": "九龍油麻地永星里11號救世軍總部2字樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_566535000113"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "project_learn",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23327963",
    "website": "https://salvationarmy.org.hk/esd/cbns",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_3251980001",
    "schoolCode": "325198",
    "campusCode": "0001",
    "name": "救世軍陳昆棟幼稚園",
    "nameEn": "THE SALVATION ARMY CHAN KWAN TUNG KINDERGARTEN",
    "district": "九龍",
    "district18": "油尖旺區",
    "address": "九龍油麻地永星里十一號救世軍總部地下及一樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_325198000111",
      "edb_325198000112"
    ],
    "pedagogyTags": [
      "project_learn"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "",
    "website": "http://www.salvationarmy.org.hk/esd/cktkg",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5629390001",
    "schoolCode": "562939",
    "campusCode": "0001",
    "name": "救世軍海富幼兒學校",
    "nameEn": "THE SALVATION ARMY HOI FU NURSERY SCHOOL",
    "district": "九龍",
    "district18": "油尖旺區",
    "address": "九龍旺角海富苑海寧閣地下Ｂ及Ｃ翼",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_562939000113"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "project_learn",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "21482477",
    "website": "https://www.salvationarmy.org.hk/esd/hfns/?langcode=zh-hant",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5630640001",
    "schoolCode": "563064",
    "campusCode": "0001",
    "name": "救世軍樂民幼兒學校",
    "nameEn": "THE SALVATION ARMY LOK MAN NURSERY SCHOOL",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍土瓜灣樂民新邨H座2樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_563064000113"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "project_learn",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23651994",
    "website": "http://salvationarmy.org.hk/esd/lmns",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5629550001",
    "schoolCode": "562955",
    "campusCode": "0001",
    "name": "救世軍荔枝角幼兒學校",
    "nameEn": "THE SALVATION ARMY LAI CHI KOK NURSERY SCHOOL",
    "district": "九龍",
    "district18": "油尖旺區",
    "address": "九龍荔枝角道150-174號1樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_562955000113"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "project_learn",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27875788",
    "website": "https://salvationarmy.org.hk/esd/lckns",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5233640001",
    "schoolCode": "523364",
    "campusCode": "0001",
    "name": "救世軍平田幼稚園",
    "nameEn": "THE SALVATION ARMY PING TIN KINDERGARTEN",
    "district": "九龍",
    "district18": "觀塘區",
    "address": "九龍藍田平田邨平誠樓地下(包括幼兒中心)",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_523364000111",
      "edb_523364000112"
    ],
    "pedagogyTags": [
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27755332",
    "website": "http://salvationarmy.org.hk/esd/ptkg",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_6156410001",
    "schoolCode": "615641",
    "campusCode": "0001",
    "name": "救世軍蘇屋幼稚園",
    "nameEn": "THE SALVATION ARMY SO UK KINDERGARTEN",
    "district": "九龍",
    "district18": "深水埗區",
    "address": "九龍深水埗蘇屋邨彩雀樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_615641000111",
      "edb_615641000112",
      "edb_615641000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "putonghua"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "",
    "website": "https://www.salvationarmy.org.hk/esd/sukg/?langcode=zh-hant",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5953650001",
    "schoolCode": "595365",
    "campusCode": "0001",
    "name": "救世軍中原慈善基金油塘幼稚園",
    "nameEn": "THE SALVATION ARMY CENTALINE CHARITY FUND YAU TONG KINDERGARTEN",
    "district": "九龍",
    "district18": "觀塘區",
    "address": "九龍油塘油麗邨停車場大廈四樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_595365000111",
      "edb_595365000112",
      "edb_595365000113"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "project_learn",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "28843830",
    "website": "http://www.salvationarmy.org.hk/esd/ccfytkg",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5654740001",
    "schoolCode": "565474",
    "campusCode": "0001",
    "name": "駿發花園浸信會幼兒學校",
    "nameEn": "PROSPEROUS GARDEN BAPTIST NURSERY SCHOOL",
    "district": "九龍",
    "district18": "油尖旺區",
    "address": "九龍油麻地東莞街１４號地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_565474000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "project_learn",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27700661",
    "website": "http://www.pgbn.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_3257910001",
    "schoolCode": "325791",
    "campusCode": "0001",
    "name": "康盈中英文幼稚園",
    "nameEn": "HONG YING ANGLO-CHINESE KINDERGARTEN",
    "district": "九龍",
    "district18": "觀塘區",
    "address": "九龍德田邨康盈苑地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_325791000111",
      "edb_325791000112",
      "edb_325791000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27723243",
    "website": "http://www.hongyingkid.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5240340002",
    "schoolCode": "524034",
    "campusCode": "0002",
    "name": "藍田靈糧幼稚園",
    "nameEn": "LAM TIN LING LIANG KINDERGARTEN",
    "district": "九龍",
    "district18": "觀塘區",
    "address": "九龍觀塘麗港城麗港街１２號Ａ區地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_524034000211",
      "edb_524034000212"
    ],
    "pedagogyTags": [
      "project_learn",
      "project_learn",
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "28056699",
    "website": "http://www.lingliang.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_2162670001",
    "schoolCode": "216267",
    "campusCode": "0001",
    "name": "朗思國際幼稚園",
    "nameEn": "THINK INTERNATIONAL KINDERGARTEN",
    "district": "九龍",
    "district18": "觀塘區",
    "address": "九龍藍田茶果嶺道９９號麗港城第３期幼稚園校舍地下（包括幼兒中心）",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_216267000111",
      "edb_216267000112",
      "edb_216267000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "language_dev"
    ],
    "languageEnv": [
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27274747",
    "website": "http://www.think.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "low",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": true
    }
  },
  {
    "id": "edb_6127820001",
    "schoolCode": "612782",
    "campusCode": "0001",
    "name": "朗思國際幼稚園(南昌)",
    "nameEn": "THINK INTERNATIONAL KINDERGARTEN (NAM CHEONG)",
    "district": "九龍",
    "district18": "深水埗區",
    "address": "九龍深水埗深旺道28號V WALK地下G26室",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_612782000111",
      "edb_612782000112",
      "edb_612782000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "21572111",
    "website": "http://www.think.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "low",
      "languageConfidence": "high",
      "needsReview": true
    }
  },
  {
    "id": "edb_3259290001",
    "schoolCode": "325929",
    "campusCode": "0001",
    "name": "樂富禮賢會幼稚園",
    "nameEn": "LOK FU RHENISH CHURCH KINDERGARTEN",
    "district": "九龍",
    "district18": "黃大仙區",
    "address": "九龍橫頭磡邨宏偉樓地下１－９室",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_325929000111",
      "edb_325929000112",
      "edb_325929000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23364705",
    "website": "http://lfkg.rhenish.org",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5992630001",
    "schoolCode": "599263",
    "campusCode": "0001",
    "name": "樂沛兒幼稚園",
    "nameEn": "HONG KONG NOBEL PRESCHOOL",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍窩打老道６５－６５Ｄ號年豐樓地下Ｂ２舖、一樓及二樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_599263000111",
      "edb_599263000112"
    ],
    "pedagogyTags": [
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23387899",
    "website": "http://www.nobelpreschool.org",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_6235800001",
    "schoolCode": "623580",
    "campusCode": "0001",
    "name": "樂善堂董清波幼稚園",
    "nameEn": "LOK SIN TONG TUNG CHING BOR KINDERGARTEN",
    "district": "九龍",
    "district18": "深水埗區",
    "address": "九龍深水埗白田邨朗田樓1樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_623580000111",
      "edb_623580000112",
      "edb_623580000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "project_learn",
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "putonghua",
      "bilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "",
    "website": "",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_3253170001",
    "schoolCode": "325317",
    "campusCode": "0001",
    "name": "樂善堂顧李覺鮮幼稚園",
    "nameEn": "LOK SIN TONG KU LEE KWOK SIN KINDERGARTEN",
    "district": "九龍",
    "district18": "黃大仙區",
    "address": "竹園南邨雅園樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_325317000111",
      "edb_325317000112",
      "edb_325317000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "project_learn",
      "project_learn",
      "language_dev",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "2328987523289891",
    "website": "http://www.loksintongkg.edu.hk/lst_kuleekwoksin",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5460380001",
    "schoolCode": "546038",
    "campusCode": "0001",
    "name": "樂善堂文吳泳沂幼稚園",
    "nameEn": "LOK SIN TONG MAN NG WING YEE KINDERGARTEN",
    "district": "九龍",
    "district18": "觀塘區",
    "address": "九龍秀茂坪邨秀華樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_546038000111",
      "edb_546038000112",
      "edb_546038000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23548809",
    "website": "https://www.loksintongkg.edu.hk/lst_manngwingyee",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_6014030001",
    "schoolCode": "601403",
    "campusCode": "0001",
    "name": "樂希幼兒學校",
    "nameEn": "HARTS PRESCHOOL",
    "district": "九龍",
    "district18": "油尖旺區",
    "address": "九龍界限街６８號曉珀‧御地下及一樓全層",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_601403000111",
      "edb_601403000112"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23382878",
    "website": "http://www.hartspreschool.com",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5643970001",
    "schoolCode": "564397",
    "campusCode": "0001",
    "name": "禮賢會樂富幼兒園",
    "nameEn": "LOK FU RHENISH NURSERY",
    "district": "九龍",
    "district18": "黃大仙區",
    "address": "九龍橫頭磡邨宏祖樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_564397000113"
    ],
    "pedagogyTags": [
      "holistic"
    ],
    "languageEnv": [
      "putonghua",
      "english",
      "native_english",
      "bilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23380538",
    "website": "http://lfkg.ppe.rhenish.org",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5644860001",
    "schoolCode": "564486",
    "campusCode": "0001",
    "name": "禮賢會順天幼兒園",
    "nameEn": "SHUN TIN RHENISH NURSERY",
    "district": "九龍",
    "district18": "觀塘區",
    "address": "九龍觀塘順天邨天韻樓低座地下１９－３１號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_564486000113"
    ],
    "pedagogyTags": [
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english",
      "native_english",
      "bilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27902765",
    "website": "http://stc.wd.rhenish.org",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5644000001",
    "schoolCode": "564400",
    "campusCode": "0001",
    "name": "禮賢會新蒲崗幼兒園",
    "nameEn": "SAN PO KONG RHENISH NURSERY",
    "district": "九龍",
    "district18": "黃大仙區",
    "address": "九龍新蒲崗崇齡街33號新蒲崗廣場地下A23-A26 A36-42 A48-52 A53A-A56",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_564400000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english",
      "native_english",
      "bilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23261336",
    "website": "http://spk.wd.rhenish.org",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5482780002",
    "schoolCode": "548278",
    "campusCode": "0002",
    "name": "鯉魚門循道衞理幼稚園",
    "nameEn": "LEI YUE MUN METHODIST KINDERGARTEN",
    "district": "九龍",
    "district18": "觀塘區",
    "address": "九龍觀塘鯉魚門邨鯉興樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_548278000211",
      "edb_548278000212",
      "edb_548278000213"
    ],
    "pedagogyTags": [
      "project_learn",
      "project_learn",
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "34177010",
    "website": "http://www.lymmkg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5656950001",
    "schoolCode": "565695",
    "campusCode": "0001",
    "name": "路德會包美達幼兒園",
    "nameEn": "MARTHA BOSS LUTHERAN DAY NURSERY",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍何文田忠孝街８９號包美達社區中心４樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_565695000113"
    ],
    "pedagogyTags": [
      "project_learn"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english",
      "native_english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "21999412",
    "website": "http://marthaboss-nursery.hklss.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5238950001",
    "schoolCode": "523895",
    "campusCode": "0001",
    "name": "路德會陳蒙恩幼稚園",
    "nameEn": "CHAN MUNG YAN LUTHERAN KINDERGARTEN",
    "district": "九龍",
    "district18": "觀塘區",
    "address": "九龍觀塘秀茂坪曉麗苑曉安閣（Ｅ座）地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_523895000111",
      "edb_523895000112"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23402839",
    "website": "http://www.cmyl.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_3211920001",
    "schoolCode": "321192",
    "campusCode": "0001",
    "name": "路德會救恩幼稚園",
    "nameEn": "REDEMPTION LUTHERAN KINDERGARTEN",
    "district": "九龍",
    "district18": "黃大仙區",
    "address": "九龍睦鄰街１３號地下至二樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_321192000111",
      "edb_321192000112",
      "edb_321192000113"
    ],
    "pedagogyTags": [
      "special_curriculum"
    ],
    "languageEnv": [
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23261546",
    "website": "http://www.rlk.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_3252360001",
    "schoolCode": "325236",
    "campusCode": "0001",
    "name": "路德會沙崙堂幼稚園",
    "nameEn": "SHARON LUTHERAN CHURCH KINDERGARTEN",
    "district": "九龍",
    "district18": "觀塘區",
    "address": "九龍牛頭角樂華北邨勤華樓４樓４０５－４１５號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_325236000111",
      "edb_325236000112",
      "edb_325236000113"
    ],
    "pedagogyTags": [
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27563398",
    "website": "http://www.sharonlutheran.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5239330001",
    "schoolCode": "523933",
    "campusCode": "0001",
    "name": "路德會沙崙堂幼稚園（慈愛分校）",
    "nameEn": "SHARON LUTHERAN CHURCH KINDERGARTEN (TSZ OI BRANCH)",
    "district": "九龍",
    "district18": "黃大仙區",
    "address": "九龍黃大仙慈雲山慈愛苑停車場頂層",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_523933000111",
      "edb_523933000112",
      "edb_523933000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23260280",
    "website": "http://www.sharonlutheran.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_3257320001",
    "schoolCode": "325732",
    "campusCode": "0001",
    "name": "路德會聖腓力堂幼稚園",
    "nameEn": "ST. PHILIP LUTHERAN CHURCH KINDERGARTEN",
    "district": "九龍",
    "district18": "觀塘區",
    "address": "觀塘翠屏邨翠桉樓平台",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_325732000111",
      "edb_325732000112",
      "edb_325732000113"
    ],
    "pedagogyTags": [
      "play_explore"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "",
    "website": "http://www.splck.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_6106230001",
    "schoolCode": "610623",
    "campusCode": "0001",
    "name": "瑪歌瑞特國際幼稚園",
    "nameEn": "MAGART INTERNATIONAL KINDERGARTEN",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍紅磡黃埔花園7期地下3A舖",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "british",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_610623000111",
      "edb_610623000112",
      "edb_610623000113"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "play_explore",
      "project_learn"
    ],
    "languageEnv": [
      "putonghua",
      "english",
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27869314",
    "website": "http://magartedu.com",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_2876950002",
    "schoolCode": "287695",
    "campusCode": "0002",
    "name": "美國國際學校",
    "nameEn": "AMERICAN INTERNATIONAL SCHOOL",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍九龍塘窩打老道117 119 121 123 125及129號",
    "nature": "international",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "WD"
    ],
    "variantIds": [
      "edb_287695000211",
      "edb_287695000213"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23045077",
    "website": "http://www.ais.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "low",
      "languageConfidence": "high",
      "needsReview": true
    }
  },
  {
    "id": "edb_5656870001",
    "schoolCode": "565687",
    "campusCode": "0001",
    "name": "美雅幼兒園",
    "nameEn": "MAY NGA NURSERY",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍土瓜灣炮仗街１４６及１４６Ａ號地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_565687000111",
      "edb_565687000112",
      "edb_565687000113"
    ],
    "pedagogyTags": [
      "project_learn",
      "project_learn"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27147763",
    "website": "http://www.maynga.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_3250400001",
    "schoolCode": "325040",
    "campusCode": "0001",
    "name": "美雅幼稚園",
    "nameEn": "MAY NGA KINDERGARTEN",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍土瓜灣炮仗街１４８及１４８Ａ號地下及炮仗街１４６－１５０號１樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_325040000111",
      "edb_325040000112",
      "edb_325040000113"
    ],
    "pedagogyTags": [
      "project_learn",
      "project_learn"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27112631",
    "website": "http://www.maynga.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_3257750002",
    "schoolCode": "325775",
    "campusCode": "0002",
    "name": "美雅幼稚園(分校)",
    "nameEn": "MAY NGA KINDERGARTEN (BRANCH)",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍土瓜灣下鄉道89號地下A舖",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_325775000211",
      "edb_325775000212",
      "edb_325775000213"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27647319",
    "website": "https://www.maynga.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "low",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": true
    }
  },
  {
    "id": "edb_3257750001",
    "schoolCode": "325775",
    "campusCode": "0001",
    "name": "美雅幼稚園(分校)",
    "nameEn": "MAY NGA KINDERGARTEN (BRANCH)",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍土瓜灣下鄉道91號1樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_325775000111",
      "edb_325775000112",
      "edb_325775000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27647319",
    "website": "https://www.maynga.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "low",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": true
    }
  },
  {
    "id": "edb_5754100001",
    "schoolCode": "575410",
    "campusCode": "0001",
    "name": "民生書院幼稚園",
    "nameEn": "MUNSANG COLLEGE KINDERGARTEN",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍東寶庭道8號A座地下至三樓，F座地下至三樓及F座新翼地下F102及二樓F202室",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_575410000111",
      "edb_575410000112"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "project_learn"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "36553500",
    "website": "http://www.munsang.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_1337870001",
    "schoolCode": "133787",
    "campusCode": "0001",
    "name": "閩光書院",
    "nameEn": "AMOY COLLEGE",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍天光道14號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_133787000111",
      "edb_133787000112",
      "edb_133787000113"
    ],
    "pedagogyTags": [
      "project_learn",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27112463",
    "website": "https://amoy.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5659620001",
    "schoolCode": "565962",
    "campusCode": "0001",
    "name": "明愛鯉魚門幼兒學校",
    "nameEn": "CARITAS NURSERY SCHOOL - LEI YUE MUN",
    "district": "九龍",
    "district18": "觀塘區",
    "address": "九龍觀塘鯉魚門邨鯉生樓地下Ｂ及Ｃ翼",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_565962000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "22465002",
    "website": "http://lymns.caritas.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5660200001",
    "schoolCode": "566020",
    "campusCode": "0001",
    "name": "明愛啓幼幼兒學校",
    "nameEn": "CARITAS KAI YAU NURSERY SCHOOL",
    "district": "九龍",
    "district18": "黃大仙區",
    "address": "九龍東頭邨富東樓地下１－８號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_566020000113"
    ],
    "pedagogyTags": [
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23822660",
    "website": "https://kyns.caritas.org.hk/index.aspx",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5660040001",
    "schoolCode": "566004",
    "campusCode": "0001",
    "name": "明愛油塘幼兒學校",
    "nameEn": "CARITAS NURSERY SCHOOL - YAU TONG",
    "district": "九龍",
    "district18": "觀塘區",
    "address": "九龍油塘鯉魚門道６０號第２層平台",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_566004000113"
    ],
    "pedagogyTags": [
      "project_learn",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27171098",
    "website": "http://ytns.caritas.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5834210001",
    "schoolCode": "583421",
    "campusCode": "0001",
    "name": "明慧國際幼稚園(太子分校)",
    "nameEn": "MING WAI INTERNATIONAL KINDERGARTEN (PRINCE EDWARD BRANCH)",
    "district": "九龍",
    "district18": "油尖旺區",
    "address": "九龍運動場道１５號京華大廈地下６號舖及一樓１－５室",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_583421000111",
      "edb_583421000112",
      "edb_583421000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "putonghua",
      "english",
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25222688",
    "website": "http://www.mingwai.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5338580001",
    "schoolCode": "533858",
    "campusCode": "0001",
    "name": "明我幼稚園（奧運校）",
    "nameEn": "DOMINIC SAVIO KINDERGARTEN (OLYMPIC BRANCH)",
    "district": "九龍",
    "district18": "油尖旺區",
    "address": "九龍旺角西海富苑海韻閣地下０１－０９室",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_533858000111",
      "edb_533858000112"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25680180",
    "website": "http://www.dominicsaviokg.org",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5506630001",
    "schoolCode": "550663",
    "campusCode": "0001",
    "name": "平安福音堂幼稚園(牛頭角)",
    "nameEn": "PEACE EVANGELICAL CENTRE KINDERGARTEN (NGAU TAU KOK)",
    "district": "九龍",
    "district18": "觀塘區",
    "address": "九龍觀塘牛頭角上邨第一期常滿樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_550663000111",
      "edb_550663000112",
      "edb_550663000113"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "play_explore",
      "holistic"
    ],
    "languageEnv": [
      "bilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27769285",
    "website": "http://www.peck.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_6249180001",
    "schoolCode": "624918",
    "campusCode": "0001",
    "name": "啓基幼稚園",
    "nameEn": "CHAN'S CREATIVE KINDERGARTEN",
    "district": "九龍",
    "district18": "深水埗區",
    "address": "九龍界限街71號舊翼",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_624918000111",
      "edb_624918000112",
      "edb_624918000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "",
    "website": "",
    "dataQuality": {
      "curriculumConfidence": "low",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": true
    }
  },
  {
    "id": "edb_5447440001",
    "schoolCode": "544744",
    "campusCode": "0001",
    "name": "啓思小學附屬幼稚園",
    "nameEn": "CREATIVE PRIMARY SCHOOL'S KINDERGARTEN",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍九龍塘牛津道2A號地下(遊戲場 幼稚園辦公室／接待處 遊戲／音樂室)1樓(課室101-109 茶房 女洗手間男洗手間 走廊)",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_544744000111",
      "edb_544744000112"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23361212",
    "website": "",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5660710001",
    "schoolCode": "566071",
    "campusCode": "0001",
    "name": "啓思幼兒園（匯景）",
    "nameEn": "CREATIVE DAY NURSERY (SCENEWAY)",
    "district": "九龍",
    "district18": "觀塘區",
    "address": "九龍藍田茜發道匯景花園１樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_566071000111",
      "edb_566071000112",
      "edb_566071000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "holistic",
      "holistic",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27178811",
    "website": "http://www.creative.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_3239260001",
    "schoolCode": "323926",
    "campusCode": "0001",
    "name": "啓思幼稚園",
    "nameEn": "CREATIVE KINDERGARTEN",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍律倫街６號地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_323926000111",
      "edb_323926000112",
      "edb_323926000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "holistic",
      "holistic",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23361139",
    "website": "http://www.creative.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "low",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": true
    }
  },
  {
    "id": "edb_3258640001",
    "schoolCode": "325864",
    "campusCode": "0001",
    "name": "啓思幼稚園(匯景花園)",
    "nameEn": "CREATIVE KINDERGARTEN (SCENEWAY GARDEN)",
    "district": "九龍",
    "district18": "觀塘區",
    "address": "九龍藍田匯景花園",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_325864000111",
      "edb_325864000112",
      "edb_325864000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "holistic",
      "holistic",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27178686",
    "website": "http://www.creative.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_6162810001",
    "schoolCode": "616281",
    "campusCode": "0001",
    "name": "啟文幼稚園",
    "nameEn": "CLEMENT KINDERGARTEN",
    "district": "九龍",
    "district18": "油尖旺區",
    "address": "九龍大角咀港灣豪庭廣場地下G65—70號舖",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_616281000111",
      "edb_616281000112",
      "edb_616281000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "21529393",
    "website": "https://www.clement.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5642490001",
    "schoolCode": "564249",
    "campusCode": "0001",
    "name": "仁愛堂陳鄭玉而幼稚園",
    "nameEn": "YAN OI TONG CHAN CHENG YUK YEE KINDERGARTEN",
    "district": "九龍",
    "district18": "油尖旺區",
    "address": "九龍尖沙咀柯士甸道西１號１樓１０４室",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_564249000113"
    ],
    "pedagogyTags": [
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "trilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "21997343",
    "website": "http://ppe.yot.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5670510001",
    "schoolCode": "567051",
    "campusCode": "0001",
    "name": "仁愛堂龐盧淑燕幼稚園",
    "nameEn": "YAN OI TONG PONG LO SHUK YIN KINDERGARTEN",
    "district": "九龍",
    "district18": "深水埗區",
    "address": "九龍深水埗海麗邨海麗商場1樓114號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_567051000111",
      "edb_567051000112",
      "edb_567051000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "language_dev",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "bilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "35146333",
    "website": "http://ppe.yot.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5648690001",
    "schoolCode": "564869",
    "campusCode": "0001",
    "name": "嗇色園主辦可愛幼兒園",
    "nameEn": "HO OI DAY NURSERY (SPONSORED BY SIK SIK YUEN)",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍九龍城九龍城道55號同興花園地下1A 1B 2A及2B舖",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_564869000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english",
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27608360",
    "website": "https://www.hooikg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_3256430001",
    "schoolCode": "325643",
    "campusCode": "0001",
    "name": "嗇色園主辦可德幼稚園",
    "nameEn": "HO TAK KINDERGARTEN (SPONSORED BY SIK SIK YUEN)",
    "district": "九龍",
    "district18": "黃大仙區",
    "address": "九龍竹園北邨第５期松園樓第８座地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_325643000111",
      "edb_325643000112",
      "edb_325643000113"
    ],
    "pedagogyTags": [
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23500721",
    "website": "http://www.siksikyuen.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5234290001",
    "schoolCode": "523429",
    "campusCode": "0001",
    "name": "嗇色園主辦可立幼稚園",
    "nameEn": "HO LAP KINDERGARTEN (SPONSORED BY SIK SIK YUEN)",
    "district": "九龍",
    "district18": "黃大仙區",
    "address": "九龍黃大仙慈雲山慈樂邨樂信樓地下Ｂ及Ｃ翼",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_523429000111",
      "edb_523429000112",
      "edb_523429000113"
    ],
    "pedagogyTags": [
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23248201",
    "website": "http://www.siksikyuen.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_3244260001",
    "schoolCode": "324426",
    "campusCode": "0001",
    "name": "善一堂安逸幼稚園",
    "nameEn": "SHIN YAT TONG ON YAT KINDERGARTEN",
    "district": "九龍",
    "district18": "觀塘區",
    "address": "順安邨安逸樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_324426000111",
      "edb_324426000112",
      "edb_324426000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "project_learn",
      "project_learn",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23451222",
    "website": "http://www.syt.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_2160700001",
    "schoolCode": "216070",
    "campusCode": "0001",
    "name": "深培中英文幼稚園",
    "nameEn": "SEMPLE KINDERGARTEN",
    "district": "九龍",
    "district18": "油尖旺區",
    "address": "九龍大角咀柳樹街１０號地下（部分）、一樓全層、二樓（部分）及三樓全層",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_216070000111",
      "edb_216070000112",
      "edb_216070000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "",
    "website": "http://www.semplekg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_3258300001",
    "schoolCode": "325830",
    "campusCode": "0001",
    "name": "深水埗德善幼稚園",
    "nameEn": "SHAM SHUI PO TAK SHIN KINDERGARTEN",
    "district": "九龍",
    "district18": "深水埗區",
    "address": "九龍通州街200號一樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_325830000111",
      "edb_325830000112",
      "edb_325830000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27283997",
    "website": "https://www.ssptakshin.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_3174030002",
    "schoolCode": "317403",
    "campusCode": "0002",
    "name": "深水埗浸信會幼稚園",
    "nameEn": "SHAM SHUI PO BAPTIST CHURCH KINDERGARTEN",
    "district": "九龍",
    "district18": "深水埗區",
    "address": "九龍深水埗廣利道４號１樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_317403000211",
      "edb_317403000212",
      "edb_317403000213"
    ],
    "pedagogyTags": [
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27201173",
    "website": "",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_1337790001",
    "schoolCode": "133779",
    "campusCode": "0001",
    "name": "神召第一幼稚園",
    "nameEn": "FIRST ASSEMBLY OF GOD KINDERGARTEN",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍亞皆老街123號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_133779000111",
      "edb_133779000112",
      "edb_133779000113"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "play_explore",
      "project_learn",
      "project_learn"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27132395",
    "website": "https://faogkg.edu.hk/",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5321690001",
    "schoolCode": "532169",
    "campusCode": "0001",
    "name": "聖安當幼稚園",
    "nameEn": "ST. ANTONIUS KINDERGARTEN",
    "district": "九龍",
    "district18": "觀塘區",
    "address": "九龍觀塘油塘道１號１樓（不包括音樂室及禮堂）",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_532169000111",
      "edb_532169000112"
    ],
    "pedagogyTags": [
      "project_learn",
      "project_learn",
      "project_learn"
    ],
    "languageEnv": [
      "putonghua",
      "english",
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23490221",
    "website": "http://www.stakg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_3195620001",
    "schoolCode": "319562",
    "campusCode": "0001",
    "name": "聖巴拿巴堂幼稚園",
    "nameEn": "ST. BARNABAS' CHURCH KINDERGARTEN",
    "district": "九龍",
    "district18": "觀塘區",
    "address": "瑞和街七十一號地下至三樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_319562000111",
      "edb_319562000112",
      "edb_319562000113"
    ],
    "pedagogyTags": [
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23894218",
    "website": "http://www.sbckg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_3233570001",
    "schoolCode": "323357",
    "campusCode": "0001",
    "name": "聖多馬堂幼稚園",
    "nameEn": "ST. THOMAS' CHURCH KINDERGARTEN",
    "district": "九龍",
    "district18": "深水埗區",
    "address": "九龍石硤尾下邨第２４座１０１－１１６室",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_323357000111",
      "edb_323357000112",
      "edb_323357000113"
    ],
    "pedagogyTags": [
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27794201",
    "website": "http://www.stckg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_3255460001",
    "schoolCode": "325546",
    "campusCode": "0001",
    "name": "聖公會慈光堂柯佩璋幼稚園",
    "nameEn": "S.K.H. KINDLY LIGHT CHURCH OR PUI CHEUNG KINDERGARTEN",
    "district": "九龍",
    "district18": "黃大仙區",
    "address": "九龍竹園北邨桐園樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_325546000111",
      "edb_325546000112",
      "edb_325546000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "project_learn",
      "project_learn",
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english",
      "native_english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23254254",
    "website": "http://www.skhklcopc.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_3259370001",
    "schoolCode": "325937",
    "campusCode": "0001",
    "name": "聖公會慈光堂聖匠幼稚園",
    "nameEn": "S.K.H. KINDLY LIGHT CHURCH HOLY CARPENTER KINDERGARTEN",
    "district": "九龍",
    "district18": "觀塘區",
    "address": "九龍藍田康栢苑停車場大廈七樓一號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_325937000111",
      "edb_325937000112",
      "edb_325937000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "project_learn",
      "project_learn",
      "language_dev"
    ],
    "languageEnv": [
      "putonghua",
      "english",
      "native_english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "2347798823477262",
    "website": "http://www.skhklchc.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_6078860001",
    "schoolCode": "607886",
    "campusCode": "0001",
    "name": "聖公會慈光堂聖匠幼稚園(分校)",
    "nameEn": "S.K.H. KINDLY LIGHT CHURCH HOLY CARPENTER KINDERGARTEN (BRANCH)",
    "district": "九龍",
    "district18": "觀塘區",
    "address": "九龍藍田碧雲道139號康栢苑停車場大廈7樓2號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_607886000111",
      "edb_607886000112",
      "edb_607886000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "project_learn",
      "language_dev"
    ],
    "languageEnv": [
      "putonghua",
      "english",
      "native_english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23477322",
    "website": "http://br.skhklchc.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_3252520001",
    "schoolCode": "325252",
    "campusCode": "0001",
    "name": "聖公會深水埗基愛堂幼稚園",
    "nameEn": "SHENG KUNG HUI SHAM SHUI PO KEI OI CHURCH KINDERGARTEN",
    "district": "九龍",
    "district18": "深水埗區",
    "address": "九龍李鄭屋邨忠孝樓高座第１座",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_325252000111",
      "edb_325252000112",
      "edb_325252000113"
    ],
    "pedagogyTags": [
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23612184",
    "website": "http://www.skhkock.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_3256000001",
    "schoolCode": "325600",
    "campusCode": "0001",
    "name": "聖公會聖三一堂曾肇添幼稚園",
    "nameEn": "S.K.H. HOLY TRINITY CHURCH TSANG SHIU TIM KINDERGARTEN",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍馬頭涌道１３５號地下至二樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_325600000111",
      "edb_325600000112"
    ],
    "pedagogyTags": [
      "holistic",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27138109",
    "website": "http://www.tstkg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5975380002",
    "schoolCode": "597538",
    "campusCode": "0002",
    "name": "聖姬莉國際幼稚園",
    "nameEn": "SAINT BRIGIT INTERNATIONAL KINDERGARTEN",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍九龍城獅子石道29-31號金倫樓地下及1樓",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_597538000211",
      "edb_597538000212"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23375255",
    "website": "http://www.stbrigit.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "medium",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_3124790001",
    "schoolCode": "312479",
    "campusCode": "0001",
    "name": "聖羅撒幼稚園",
    "nameEn": "ST. ROSE OF LIMA'S KINDERGARTEN",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍界限街１０４號Ａ地下至２樓及界限街１０４號課室１－４、電腦室、體育用品儲存室、餐具室、活動室１－４、英文室及地下至１樓有蓋操場",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_312479000111",
      "edb_312479000112"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23383138",
    "website": "http://www.roselima.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_3246470001",
    "schoolCode": "324647",
    "campusCode": "0001",
    "name": "聖馬可堂白普理幼稚園",
    "nameEn": "ST. MARK'S CHURCH BRADBURY KINDERGARTEN",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍何文田石鼓街９號地下，２至４樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_324647000111",
      "edb_324647000112",
      "edb_324647000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27613191",
    "website": "http://stmarkschurch.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5643890001",
    "schoolCode": "564389",
    "campusCode": "0001",
    "name": "聖母潔心會福音秀茂坪幼稚園",
    "nameEn": "SISTERS OF THE IMMACULATE HEART OF MARY GOSPEL SAU MAU PING KINDERGARTEN",
    "district": "九龍",
    "district18": "觀塘區",
    "address": "九龍秀茂坪邨秀裕樓地下Ｂ及Ｃ翼",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_564389000113"
    ],
    "pedagogyTags": [
      "play_explore"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23460072",
    "website": "http://smp.sihm.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5643700001",
    "schoolCode": "564370",
    "campusCode": "0001",
    "name": "聖母潔心會黃大仙幼稚園",
    "nameEn": "SISTERS OF THE IMMACULATE HEART OF MARY WONG TAI SIN KINDERGARTEN",
    "district": "九龍",
    "district18": "黃大仙區",
    "address": "九龍黃大仙正德街１０４號黃大仙社區中心５樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_564370000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23211574",
    "website": "http://wts.sihm.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5286250001",
    "schoolCode": "528625",
    "campusCode": "0001",
    "name": "聖母幼稚園",
    "nameEn": "OUR LADY'S KINDERGARTEN",
    "district": "九龍",
    "district18": "黃大仙區",
    "address": "九龍黃大仙沙田㘭道１１３號及１１３－１１５號新翼大樓地下至四樓全層及五樓會議室",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_528625000111",
      "edb_528625000112"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23207544",
    "website": "http://www.olk.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_2124660004",
    "schoolCode": "212466",
    "campusCode": "0004",
    "name": "聖若望英文書院",
    "nameEn": "ST. JOHANNES COLLEGE",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍九龍塘窩打老道１０９號地下至一樓及１４３號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_212466000413"
    ],
    "pedagogyTags": [],
    "languageEnv": [],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23362926",
    "website": "http://www.st-johannes.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "low",
      "languageConfidence": "low",
      "needsReview": true
    }
  },
  {
    "id": "edb_3251800001",
    "schoolCode": "325180",
    "campusCode": "0001",
    "name": "聖三一中心幼稚園",
    "nameEn": "HOLY TRINITY CENTRE KINDERGARTEN",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍九龍城馬頭涌道１３９號地下１樓及２樓（包括幼兒中心）",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_325180000113"
    ],
    "pedagogyTags": [
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "trilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27154265",
    "website": "http://www.htckg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5373490001",
    "schoolCode": "537349",
    "campusCode": "0001",
    "name": "聖文嘉幼稚園",
    "nameEn": "ST. MONICA'S KINDERGARTEN",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍何文田冠熹苑地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_537349000111",
      "edb_537349000112",
      "edb_537349000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "language_dev"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "22420082",
    "website": "http://www.stmonicaskg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5433900001",
    "schoolCode": "543390",
    "campusCode": "0001",
    "name": "順德聯誼總會梁潔華幼稚園",
    "nameEn": "SHUN TAK FRATERNAL ASSOCIATION LEUNG KIT WAH KINDERGARTEN",
    "district": "九龍",
    "district18": "觀塘區",
    "address": "九龍秀茂坪寶琳路寶達邨達峰樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_543390000111",
      "edb_543390000112",
      "edb_543390000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "language_dev"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "29974411",
    "website": "http://www.stfalkwkg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_2156780001",
    "schoolCode": "215678",
    "campusCode": "0001",
    "name": "太陽島英文幼稚園",
    "nameEn": "SUN ISLAND ENGLISH KINDERGARTEN",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍土瓜灣炮仗街１５２號寶峰大廈地下低層、地下及１樓（包括幼兒中心）",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_215678000111",
      "edb_215678000112",
      "edb_215678000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "english",
      "native_english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27145545",
    "website": "http://www.sunisland.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5235260002",
    "schoolCode": "523526",
    "campusCode": "0002",
    "name": "太陽島英文幼稚園﹝樂民﹞",
    "nameEn": "SUN ISLAND ENGLISH KINDERGARTEN (LOK MAN)",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍靠背壟道１５２號樂民新村Ｆ座一樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_523526000211",
      "edb_523526000212",
      "edb_523526000213"
    ],
    "pedagogyTags": [
      "play_explore",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "english",
      "native_english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24251303",
    "website": "",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5554360001",
    "schoolCode": "555436",
    "campusCode": "0001",
    "name": "太陽島幼稚園（港灣豪庭分校）",
    "nameEn": "SUN ISLAND KINDERGARTEN (METRO HARBOUR BRANCH)",
    "district": "九龍",
    "district18": "油尖旺區",
    "address": "九龍大角咀港灣豪庭廣場地下幼稚園範圍（九龍內地段１１１２７）",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_555436000111",
      "edb_555436000112"
    ],
    "pedagogyTags": [
      "play_explore",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "english",
      "native_english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25536556",
    "website": "http://www.sunisland.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_3256940001",
    "schoolCode": "325694",
    "campusCode": "0001",
    "name": "天主教彩霞邨潔心幼稚園",
    "nameEn": "CHOI HA ESTATE KIT SAM KINDERGARTEN",
    "district": "九龍",
    "district18": "觀塘區",
    "address": "九龍牛頭角彩霞邨停車場平台四號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_325694000111",
      "edb_325694000112",
      "edb_325694000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "language_dev",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23051443",
    "website": "http://www.sihm.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_3248330001",
    "schoolCode": "324833",
    "campusCode": "0001",
    "name": "天主教甘霖幼稚園",
    "nameEn": "KAM LAM CATHOLIC KINDERGARTEN",
    "district": "九龍",
    "district18": "黃大仙區",
    "address": "九龍黃大仙彩雲邨甘霖樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_324833000111",
      "edb_324833000112",
      "edb_324833000113"
    ],
    "pedagogyTags": [
      "project_learn"
    ],
    "languageEnv": [
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27567181",
    "website": "http://www.kamlamkg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_3257080001",
    "schoolCode": "325708",
    "campusCode": "0001",
    "name": "天主教聖雅各伯幼稚園",
    "nameEn": "ST. JAMES CATHOLIC KINDERGARTEN",
    "district": "九龍",
    "district18": "觀塘區",
    "address": "油塘嘉榮街八號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_325708000111",
      "edb_325708000112",
      "edb_325708000113"
    ],
    "pedagogyTags": [
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23489344",
    "website": "http://www.sjck.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5635100001",
    "schoolCode": "563510",
    "campusCode": "0001",
    "name": "天主教聖雲先幼兒學校",
    "nameEn": "ST VINCENT DE PAUL NURSERY SCHOOL",
    "district": "九龍",
    "district18": "觀塘區",
    "address": "九龍觀塘馬蹄徑５號寶峰大廈２樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_563510000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "play_explore",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23893228",
    "website": "https://www.svpdn.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5169290001",
    "schoolCode": "516929",
    "campusCode": "0001",
    "name": "旺角雅麗斯英文幼稚園",
    "nameEn": "MONG KOK AGNES ENGLISH KINDERGARTEN",
    "district": "九龍",
    "district18": "油尖旺區",
    "address": "九龍旺角亞皆老街五號地下至二樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_516929000111",
      "edb_516929000112"
    ],
    "pedagogyTags": [
      "project_learn",
      "project_learn"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23909988",
    "website": "http://www.mkagneskg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_6107710001",
    "schoolCode": "610771",
    "campusCode": "0001",
    "name": "威廉（睿智）幼稚園（黃埔）",
    "nameEn": "WILLIAM (SMART) KINDERGARTEN (WHAMPOA)",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍紅磡黃埔花園第七期地下Ｇ３Ｃ（２）號舖",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_610771000111",
      "edb_610771000112",
      "edb_610771000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23332886",
    "website": "http://www.william-inter-kg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5669000001",
    "schoolCode": "566900",
    "campusCode": "0001",
    "name": "維多利亞（何文田）國際幼兒園",
    "nameEn": "VICTORIA (HOMANTIN) INTERNATIONAL NURSERY",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍何文田迦密村街９號君逸山１樓",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "ib",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_566900000111",
      "edb_566900000112",
      "edb_566900000113"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "play_explore",
      "project_learn",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "putonghua",
      "english",
      "cantonese",
      "bilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27629130",
    "website": "http://www.victoria.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_6180390001",
    "schoolCode": "618039",
    "campusCode": "0001",
    "name": "維多利亞(何文田)國際幼稚園",
    "nameEn": "VICTORIA (HOMANTIN) INTERNATIONAL KINDERGARTEN",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍何文田迦密村街9號君逸山地下",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "ib",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_618039000111",
      "edb_618039000112"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "play_explore",
      "project_learn",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english",
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "21303630",
    "website": "",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5747080001",
    "schoolCode": "574708",
    "campusCode": "0001",
    "name": "維多利亞（君匯港）幼稚園",
    "nameEn": "VICTORIA (HARBOUR GREEN) KINDERGARTEN",
    "district": "九龍",
    "district18": "油尖旺區",
    "address": "九龍深旺道８號君匯港地下幼稚園",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_574708000111",
      "edb_574708000112",
      "edb_574708000113"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "project_learn",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "28851928",
    "website": "http://www.victoria.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5955430001",
    "schoolCode": "595543",
    "campusCode": "0001",
    "name": "蔚思幼稚園",
    "nameEn": "SOPHIE KINDERGARTEN",
    "district": "九龍",
    "district18": "油尖旺區",
    "address": "九龍海輝道8號浪澄灣廣場高層地下8號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_595543000111",
      "edb_595543000112",
      "edb_595543000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "28119929",
    "website": "http://www.sophiekg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "low",
      "languageConfidence": "low",
      "needsReview": true
    }
  },
  {
    "id": "edb_5845170001",
    "schoolCode": "584517",
    "campusCode": "0001",
    "name": "文娜雅拔幼稚園",
    "nameEn": "MANHABIT KINDERGARTEN",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍九龍塘金巴倫道４３號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_584517000111",
      "edb_584517000112"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "putonghua",
      "bilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23369638",
    "website": "http://www.manhabit.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5642900001",
    "schoolCode": "564290",
    "campusCode": "0001",
    "name": "五邑工商總會幼稚園",
    "nameEn": "FIVE DISTRICTS BUSINESS WELFARE ASSOCIATION KINDERGARTEN",
    "district": "九龍",
    "district18": "黃大仙區",
    "address": "九龍橫頭磡邨宏澤樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "WD"
    ],
    "variantIds": [
      "edb_564290000111",
      "edb_564290000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "project_learn",
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23374341",
    "website": "http://www.fdkg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5643030001",
    "schoolCode": "564303",
    "campusCode": "0001",
    "name": "五邑工商總會張祝珊幼稚園",
    "nameEn": "FIVE DISTRICTS BUSINESS WELFARE ASSOCIATION CHEUNG CHUK SHAN KINDERGARTEN",
    "district": "九龍",
    "district18": "黃大仙區",
    "address": "九龍鑽石山龍蟠苑商場第５層１０９室",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_564303000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "language_dev"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23273317",
    "website": "http://www.ccsn.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_3242640004",
    "schoolCode": "324264",
    "campusCode": "0004",
    "name": "西太平洋幼稚園",
    "nameEn": "WESTERN PACIFIC KINDERGARTEN",
    "district": "九龍",
    "district18": "深水埗區",
    "address": "九龍南昌街1號南昌一號地下(樓梯及升降機)、1樓2號舖與1樓及2樓平台",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_324264000411",
      "edb_324264000412"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "",
    "website": "https://www.wpk.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_2162750006",
    "schoolCode": "216275",
    "campusCode": "0006",
    "name": "香港澳洲國際學校",
    "nameEn": "AUSTRALIAN INTERNATIONAL SCHOOL HONG KONG",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍九龍塘羅福道３Ａ號",
    "nature": "international",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_216275000611",
      "edb_216275000612",
      "edb_216275000613"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23046078",
    "website": "http://www.aishk.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "low",
      "languageConfidence": "high",
      "needsReview": true
    }
  },
  {
    "id": "edb_5650910001",
    "schoolCode": "565091",
    "campusCode": "0001",
    "name": "香港保護兒童會百佳員工慈善基金幼兒學校",
    "nameEn": "HONG KONG SOCIETY FOR THE PROTECTION OF CHILDREN PARK'N SHOP STAFF CHARITABLE FUND NURSERY SCHOOL",
    "district": "九龍",
    "district18": "油尖旺區",
    "address": "九龍旺角砵蘭街３８７號６樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_565091000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23990909",
    "website": "http://www.hkspc.org",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5653000001",
    "schoolCode": "565300",
    "campusCode": "0001",
    "name": "香港保護兒童會砵蘭街幼兒學校",
    "nameEn": "HONG KONG SOCIETY FOR THE PROTECTION OF CHILDREN PORTLAND STREET NURSERY SCHOOL",
    "district": "九龍",
    "district18": "油尖旺區",
    "address": "九龍旺角砵蘭街３８７號４樓及頂樓（洗衣房）",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_565300000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23915681",
    "website": "http://www.hkspc.org",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5649310001",
    "schoolCode": "564931",
    "campusCode": "0001",
    "name": "香港保護兒童會滙豐銀行慈善基金幼兒學校",
    "nameEn": "HONG KONG SOCIETY FOR THE PROTECTION OF CHILDREN HONG KONG BANK FOUNDATION NURSERY SCHOOL",
    "district": "九龍",
    "district18": "油尖旺區",
    "address": "九龍油麻地眾坊街梁顯利油麻地社區中心６字樓及天台",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_564931000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23856699",
    "website": "http://www.hkspc.org",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5652290001",
    "schoolCode": "565229",
    "campusCode": "0001",
    "name": "香港保護兒童會馬頭涌幼兒學校",
    "nameEn": "HONG KONG SOCIETY FOR THE PROTECTION OF CHILDREN MA TAU CHUNG NURSERY SCHOOL",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍九龍城馬頭涌道１０７號２樓及３樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_565229000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27110787",
    "website": "http://www.hkspc.org",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5652100001",
    "schoolCode": "565210",
    "campusCode": "0001",
    "name": "香港保護兒童會譚雅士伉儷幼兒學校",
    "nameEn": "HONG KONG SOCIETY FOR THE PROTECTION OF CHILDREN MR & MRS THOMAS TAM NURSERY SCHOOL",
    "district": "九龍",
    "district18": "觀塘區",
    "address": "九龍觀塘茶果嶺道茜草灣鄰里社區中心３樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_565210000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23479286",
    "website": "http://www.hkspc.org",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5652880001",
    "schoolCode": "565288",
    "campusCode": "0001",
    "name": "香港保護兒童會新航黃埔幼兒學校",
    "nameEn": "HONG KONG SOCIETY FOR THE PROTECTION OF CHILDREN SIA WHAMPOA NURSERY SCHOOL",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍紅磡黃埔花園翠楊苑１樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_565288000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23650558",
    "website": "http://www.hkspc.org",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5644780001",
    "schoolCode": "564478",
    "campusCode": "0001",
    "name": "香港保護兒童會長沙灣幼兒學校",
    "nameEn": "HONG KONG SOCIETY FOR THE PROTECTION OF CHILDREN CHEUNG SHA WAN NURSERY SCHOOL",
    "district": "九龍",
    "district18": "深水埗區",
    "address": "九龍長沙灣發祥街５５號長沙灣社區中心５字樓及天台操場",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_564478000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23615516",
    "website": "http://www.hkspc.org",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5650670001",
    "schoolCode": "565067",
    "campusCode": "0001",
    "name": "香港保護兒童會中銀幼兒學校",
    "nameEn": "HONG KONG SOCIETY FOR THE PROTECTION OF CHILDREN BOC NURSERY SCHOOL",
    "district": "九龍",
    "district18": "油尖旺區",
    "address": "九龍大角咀奧海城海輝道１１號地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_565067000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "22714015",
    "website": "http://www.hkspc.org",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_3256860001",
    "schoolCode": "325686",
    "campusCode": "0001",
    "name": "香港伯特利教會基甸幼稚園",
    "nameEn": "HONG KONG BETHEL CHURCH GIDEON KINDERGARTEN",
    "district": "九龍",
    "district18": "黃大仙區",
    "address": "九龍樂富邨樂東樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "WD"
    ],
    "variantIds": [
      "edb_325686000111",
      "edb_325686000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23362577",
    "website": "http://www.bcgideon.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "low",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": true
    }
  },
  {
    "id": "edb_3258560001",
    "schoolCode": "325856",
    "campusCode": "0001",
    "name": "香港創價幼稚園",
    "nameEn": "HONG KONG SOKA KINDERGARTEN",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍慕禮道四號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_325856000111",
      "edb_325856000112",
      "edb_325856000113"
    ],
    "pedagogyTags": [
      "play_explore"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23366090",
    "website": "http://www.soka.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_3257160001",
    "schoolCode": "325716",
    "campusCode": "0001",
    "name": "香港道教聯合會圓玄幼稚園(東頭邨)",
    "nameEn": "HONG KONG TAOIST ASSOCIATION YUEN YUEN KINDERGARTEN (TUNG TAU ESTATE)",
    "district": "九龍",
    "district18": "黃大仙區",
    "address": "九龍東頭邨欣東樓９－１４號地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_325716000111",
      "edb_325716000112",
      "edb_325716000113"
    ],
    "pedagogyTags": [
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27183637",
    "website": "http://www.yuenyuenkg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5653930001",
    "schoolCode": "565393",
    "campusCode": "0001",
    "name": "香港基督教服務處大坑東幼兒學校",
    "nameEn": "HONG KONG CHRISTIAN SERVICE TAI HANG TUNG NURSERY SCHOOL",
    "district": "九龍",
    "district18": "深水埗區",
    "address": "九龍大坑東棠蔭街大坑東社區中心４樓及天台",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_565393000113"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "project_learn",
      "project_learn",
      "project_learn"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27778020",
    "website": "http://www.hkcschild.edu.hk/thtns",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5654150001",
    "schoolCode": "565415",
    "campusCode": "0001",
    "name": "香港基督教服務處觀塘幼兒學校",
    "nameEn": "HONG KONG CHRISTIAN SERVICE KWUN TONG NURSERY SCHOOL",
    "district": "九龍",
    "district18": "觀塘區",
    "address": "九龍觀塘翠屏道１７號觀塘社區中心５樓及天台",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_565415000113"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "play_explore",
      "project_learn",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23891866",
    "website": "http://www.hkcschild.edu.hk/ktns",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5654230001",
    "schoolCode": "565423",
    "campusCode": "0001",
    "name": "香港基督教服務處雋匯幼兒學校",
    "nameEn": "HONG KONG CHRISTIAN SERVICE CENTRAL NURSERY SCHOOL",
    "district": "九龍",
    "district18": "油尖旺區",
    "address": "九龍上海街５５７號旺角綜合大樓３樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_565423000113"
    ],
    "pedagogyTags": [
      "project_learn",
      "project_learn"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23802320",
    "website": "http://www.hkcschild.edu.hk/cns",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_6056620001",
    "schoolCode": "605662",
    "campusCode": "0001",
    "name": "香港基督教服務處雋樂幼稚園",
    "nameEn": "HONG KONG CHRISTIAN SERVICE PARIO KINDERGARTEN",
    "district": "九龍",
    "district18": "觀塘區",
    "address": "九龍牛頭角下邨貴華樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_605662000111",
      "edb_605662000112",
      "edb_605662000113"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "project_learn",
      "project_learn"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23231215",
    "website": "",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5654070001",
    "schoolCode": "565407",
    "campusCode": "0001",
    "name": "香港基督教服務處李鄭屋幼兒學校",
    "nameEn": "HONG KONG CHRISTIAN SERVICE LEI CHENG UK NURSERY SCHOOL",
    "district": "九龍",
    "district18": "深水埗區",
    "address": "九龍深水埗李鄭屋邨信義樓平台３１６號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_565407000113"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "project_learn",
      "project_learn",
      "project_learn"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23612355",
    "website": "http://www.hkcschild.edu.hk/lcuns",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5667050001",
    "schoolCode": "566705",
    "campusCode": "0001",
    "name": "香港基督教服務處石硤尾幼兒學校",
    "nameEn": "HONG KONG CHRISTIAN SERVICE SHEK KIP MEI NURSERY SCHOOL",
    "district": "九龍",
    "district18": "深水埗區",
    "address": "九龍深水埗窩仔街石硤尾邨第２３座１樓２０１－２１８號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_566705000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "project_learn",
      "language_dev"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27791891",
    "website": "http://www.hkcschild.edu.hk/skmns",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5644510001",
    "schoolCode": "564451",
    "campusCode": "0001",
    "name": "香港基督教女青年會彩雲幼兒學校",
    "nameEn": "HONG KONG YOUNG WOMEN'S CHRISTIAN ASSOCIATION CHOI WAN NURSERY SCHOOL",
    "district": "九龍",
    "district18": "黃大仙區",
    "address": "九龍彩雲邨銀河樓地下１０９－１１４號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_564451000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "english",
      "native_english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27551546",
    "website": "http://nscw.ywca.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_3259530001",
    "schoolCode": "325953",
    "campusCode": "0001",
    "name": "香港基督教女青年會宏恩幼稚園",
    "nameEn": "HONG KONG Y.W.C.A ATHENA KINDERGARTEN",
    "district": "九龍",
    "district18": "深水埗區",
    "address": "九龍深水埗怡靖苑閒靜閣１－８號地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_325953000111",
      "edb_325953000112",
      "edb_325953000113"
    ],
    "pedagogyTags": [
      "project_learn"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27281122",
    "website": "https://kga.ywca.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5644430001",
    "schoolCode": "564443",
    "campusCode": "0001",
    "name": "香港基督教女青年會紹邦幼兒學校",
    "nameEn": "HONG KONG YOUNG WOMEN'S CHRISTIAN ASSOCIATION SHIU PONG NURSERY SCHOOL",
    "district": "九龍",
    "district18": "深水埗區",
    "address": "九龍又一村海棠路６６號地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_564443000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english",
      "native_english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "34431678",
    "website": "http://nssp.ywca.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5655040001",
    "schoolCode": "565504",
    "campusCode": "0001",
    "name": "香港基督教女青年會信望幼兒學校",
    "nameEn": "HONG KONG YOUNG WOMEN'S CHRISTIAN ASSOCIATION FAITH HOPE NURSERY SCHOOL",
    "district": "九龍",
    "district18": "黃大仙區",
    "address": "九龍黃大仙下邨龍康樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_565504000113"
    ],
    "pedagogyTags": [
      "holistic",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23225308",
    "website": "http://nsfh.ywca.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5645160001",
    "schoolCode": "564516",
    "campusCode": "0001",
    "name": "香港基督教女青年會趙靄華幼兒學校",
    "nameEn": "HONG KONG YOUNG WOMEN'S CHRISTIAN ASSOCIATION CHIU OI WAH NURSERY SCHOOL",
    "district": "九龍",
    "district18": "深水埗區",
    "address": "九龍深水埗元州邨元豐樓Ｂ及Ｃ翼地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_564516000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "project_learn"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23866339",
    "website": "http://nscow.ywca.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5967870001",
    "schoolCode": "596787",
    "campusCode": "0001",
    "name": "香港靈糧堂秀德幼稚園",
    "nameEn": "HONG KONG LING LIANG CHURCH SAU TAK KINDERGARTEN",
    "district": "九龍",
    "district18": "深水埗區",
    "address": "九龍荔枝角道８７３號一號．西九龍西九龍薈一樓６－８號舖",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_596787000111",
      "edb_596787000112"
    ],
    "pedagogyTags": [
      "project_learn",
      "project_learn",
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "35202238",
    "website": "http://www.lingliang.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_6018610001",
    "schoolCode": "601861",
    "campusCode": "0001",
    "name": "香港靈糧堂秀德幼稚園(二校)",
    "nameEn": "HONG KONG LING LIANG CHURCH SAU TAK KINDERGARTEN(CAMPUS 2)",
    "district": "九龍",
    "district18": "深水埗區",
    "address": "九龍荔枝角道873號一號．西九龍西九龍薈一樓2-3，5，9-13，15-19號舖",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_601861000111",
      "edb_601861000112"
    ],
    "pedagogyTags": [
      "project_learn",
      "project_learn",
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "35202238",
    "website": "",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_3116500001",
    "schoolCode": "311650",
    "campusCode": "0001",
    "name": "香港路德會觀塘幼稚園",
    "nameEn": "HONG KONG LUTHERAN CHURCH KWUN TONG KINDERGARTEN",
    "district": "九龍",
    "district18": "觀塘區",
    "address": "九龍觀塘馬蹄徑２號地下至一樓（不包括１３號課室及一樓樓梯旁辦公室）",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_311650000111",
      "edb_311650000112",
      "edb_311650000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23893179",
    "website": "http://ktlk.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_6069790001",
    "schoolCode": "606979",
    "campusCode": "0001",
    "name": "香港墨爾文國際幼稚園",
    "nameEn": "MALVERN COLLEGE PRE-SCHOOL HONG KONG",
    "district": "九龍",
    "district18": "油尖旺區",
    "address": "九龍西九龍友翔道1號中港薈地下G09-G12號舖",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_606979000111",
      "edb_606979000112",
      "edb_606979000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "38984660",
    "website": "http://www.malvernpreschool.hk",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "low",
      "languageConfidence": "high",
      "needsReview": true
    }
  },
  {
    "id": "edb_3244770001",
    "schoolCode": "324477",
    "campusCode": "0001",
    "name": "香港培道小學",
    "nameEn": "POOI TO PRIMARY SCHOOL",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍馬頭涌福祥街3號(包括2號樓梯旁加建校舍及露天遊戲場內的加建校舍(地下至天台)九龍內段8638號及新教育大樓)",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_324477000111",
      "edb_324477000112"
    ],
    "pedagogyTags": [
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27112933",
    "website": "http://www.ptps.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5133500001",
    "schoolCode": "513350",
    "campusCode": "0001",
    "name": "香港培正小學",
    "nameEn": "PUI CHING PRIMARY SCHOOL",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍窩打老道80號K座地庫2層至15樓及A座5樓至天台花園及培正道九龍內地段3056(不包括E座及G座)",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_513350000111",
      "edb_513350000112"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27142562",
    "website": "http://www.pcps.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5633230001",
    "schoolCode": "563323",
    "campusCode": "0001",
    "name": "香港青年協會青樂幼稚園（油麻地）",
    "nameEn": "THE HONG KONG FEDERATION OF YOUTH GROUPS CHING LOK KINDERGARTEN (YAUMATEI)",
    "district": "九龍",
    "district18": "油尖旺區",
    "address": "九龍油麻地渡船街28號寶時商業中心地下3號 8-13號及1樓1-10號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_563323000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23856868",
    "website": "http://clymt.hkfyg.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5941300001",
    "schoolCode": "594130",
    "campusCode": "0001",
    "name": "香港青年協會鄭堅固幼稚園",
    "nameEn": "THE HONG KONG FEDERATION OF YOUTH GROUPS KK CHENG KINDERGARTEN",
    "district": "九龍",
    "district18": "觀塘區",
    "address": "九龍牛頭角彩興路８號彩德邨彩誠樓地下１號舖",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_594130000111",
      "edb_594130000112",
      "edb_594130000113"
    ],
    "pedagogyTags": [
      "project_learn",
      "project_learn",
      "language_dev"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "",
    "website": "https://kkc.hkfyg.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5647290001",
    "schoolCode": "564729",
    "campusCode": "0001",
    "name": "香港聖公會基愛幼兒學校",
    "nameEn": "HONG KONG SHENG KUNG HUI KEI OI NURSERY SCHOOL",
    "district": "九龍",
    "district18": "深水埗區",
    "address": "九龍深水埗麗閣邨麗菊樓地下１０３－１１６及１１８室",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_564729000113"
    ],
    "pedagogyTags": [
      "project_learn"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27297991",
    "website": "http://www.kons.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5634630001",
    "schoolCode": "563463",
    "campusCode": "0001",
    "name": "香港小童群益會樂緻幼稚園(黃大仙)",
    "nameEn": "THE BOYS' AND GIRLS' CLUBS ASSOCIATION OF HONG KONG CHEERLAND KINDERGARTEN (WONG TAI SIN)",
    "district": "九龍",
    "district18": "黃大仙區",
    "address": "九龍黃大仙上邨達善樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_563463000111",
      "edb_563463000112",
      "edb_563463000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "holistic",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "22164216",
    "website": "http://nursery.bgca.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5634550001",
    "schoolCode": "563455",
    "campusCode": "0001",
    "name": "香港小童群益會樂緻幼稚園（九龍灣）",
    "nameEn": "THE BOYS' AND GIRLS' CLUBS ASSOCIATION OF HONG KONG CHEERLAND KINDERGARTEN (KOWLOON BAY)",
    "district": "九龍",
    "district18": "觀塘區",
    "address": "九龍九龍灣宏開道８號其士商業中心地下１１－１３號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_563455000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27962122",
    "website": "http://nursery.bgca.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5661600001",
    "schoolCode": "566160",
    "campusCode": "0001",
    "name": "香港學生輔助會寶達幼兒園",
    "nameEn": "HONG KONG STUDENT AID SOCIETY PO TAT NURSERY",
    "district": "九龍",
    "district18": "觀塘區",
    "address": "九龍秀茂坪寶達邨達欣樓地下Ｂ＆Ｃ翼",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_566160000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "29974601",
    "website": "http://www.potat-nursery.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5500350001",
    "schoolCode": "550035",
    "campusCode": "0001",
    "name": "香港幼稚園協會幼兒學校",
    "nameEn": "HONG KONG KINDERGARTEN ASSOCIATION PRE-SCHOOL",
    "district": "九龍",
    "district18": "黃大仙區",
    "address": "九龍彩雲邨紫霄樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_550035000111",
      "edb_550035000112",
      "edb_550035000113"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "play_explore",
      "project_learn",
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "putonghua",
      "english",
      "native_english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27582008",
    "website": "http://www.hkkaps.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_1328700001",
    "schoolCode": "132870",
    "campusCode": "0001",
    "name": "協恩中學附屬幼稚園",
    "nameEn": "HEEP YUNN SCHOOL PRIVATE KINDERGARTEN",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍農圃道１號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_132870000111",
      "edb_132870000112"
    ],
    "pedagogyTags": [
      "play_explore"
    ],
    "languageEnv": [
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27146098",
    "website": "http://www.hykg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5669690001",
    "schoolCode": "566969",
    "campusCode": "0001",
    "name": "協康會康苗幼兒園",
    "nameEn": "HEEP HONG SOCIETY HEALTHY KIDS NURSERY SCHOOL",
    "district": "九龍",
    "district18": "油尖旺區",
    "address": "九龍旺角海富苑海欣閣地下部分及１樓部分",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_566969000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "play_explore",
      "project_learn",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27862990",
    "website": "http://www.heephong.org",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5991820001",
    "schoolCode": "599182",
    "campusCode": "0001",
    "name": "新加坡卓薈國際幼稚園(界限街)",
    "nameEn": "CHATSWORTH INTERNATIONAL KINDERGARTEN (BOUNDARY STREET)",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍界限街166-166A地下(9號課室除外)一樓及二樓",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_599182000111",
      "edb_599182000112",
      "edb_599182000113"
    ],
    "pedagogyTags": [
      "play_explore"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25603322",
    "website": "https://chatsworthinternational.hk",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5636170001",
    "schoolCode": "563617",
    "campusCode": "0001",
    "name": "新九龍婦女會慈雲山幼兒園",
    "nameEn": "NEW KOWLOON WOMEN ASSOCIATION TSZ WAN SHAN NURSERY",
    "district": "九龍",
    "district18": "黃大仙區",
    "address": "九龍慈雲山慈正邨正旭樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_563617000113"
    ],
    "pedagogyTags": [
      "project_learn",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23200444",
    "website": "http://www.newklnwa.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5636090001",
    "schoolCode": "563609",
    "campusCode": "0001",
    "name": "新九龍婦女會樂華幼兒園",
    "nameEn": "NEW KOWLOON WOMEN ASSOCIATION LOK WAH NURSERY",
    "district": "九龍",
    "district18": "觀塘區",
    "address": "九龍牛頭角振華道樂華社區中心６樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_563609000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27962535",
    "website": "http://www.newklnwa.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_2162590001",
    "schoolCode": "216259",
    "campusCode": "0001",
    "name": "信生中英文幼稚園",
    "nameEn": "SHUN SANG ANGLO-CHINESE KINDERGARTEN",
    "district": "九龍",
    "district18": "黃大仙區",
    "address": "G/F, WINGS B & C, ON YAN HOUSE, TSZ ON COURT, TSZ WAN SHAN, KOWLOON.",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_216259000111",
      "edb_216259000112"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23231074",
    "website": "http://www.ssack.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5328000001",
    "schoolCode": "532800",
    "campusCode": "0001",
    "name": "宣道會雷蔡群樂幼稚園",
    "nameEn": "CHRISTIAN ALLIANCE LOUEY CHOY KWAN LOK KINDERGARTEN",
    "district": "九龍",
    "district18": "深水埗區",
    "address": "九龍深水埗元州邨元盛樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_532800000111",
      "edb_532800000112",
      "edb_532800000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "language_dev",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "english",
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24204718",
    "website": "http://www.calcklkg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5231780001",
    "schoolCode": "523178",
    "campusCode": "0001",
    "name": "宣道會秀茂坪陳李詠貞幼稚園",
    "nameEn": "CHRISTIAN ALLIANCE SAU MAU PING CHEN LEE WING TSING KINDERGARTEN",
    "district": "九龍",
    "district18": "觀塘區",
    "address": "九龍觀塘秀茂坪曉麗苑Ａ座（曉天閣）地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_523178000111",
      "edb_523178000112",
      "edb_523178000113"
    ],
    "pedagogyTags": [
      "project_learn",
      "project_learn"
    ],
    "languageEnv": [
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "29524488",
    "website": "http://www.caclwtkg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_1388350003",
    "schoolCode": "138835",
    "campusCode": "0003",
    "name": "宣道幼稚園",
    "nameEn": "THE ALLIANCE KINDERGARTEN",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍蘭開夏道２號一樓部份及二樓部份",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_138835000311",
      "edb_138835000312"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "34430200",
    "website": "http://www.ktak.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_3236830001",
    "schoolCode": "323683",
    "campusCode": "0001",
    "name": "宣美幼稚園",
    "nameEn": "SUEN MEI KINDERGARTEN",
    "district": "九龍",
    "district18": "深水埗區",
    "address": "九龍美孚新邨第４期百老匯街７９號２樓部分（幼兒中心專用範圍除外）",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_323683000111",
      "edb_323683000112",
      "edb_323683000113"
    ],
    "pedagogyTags": [
      "project_learn",
      "language_dev"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27424925",
    "website": "http://www.smkg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_6174740001",
    "schoolCode": "617474",
    "campusCode": "0001",
    "name": "學之園幼稚園(奧運)",
    "nameEn": "LEARNING HABITAT KINDERGARTEN (OLYMPIC)",
    "district": "九龍",
    "district18": "油尖旺區",
    "address": "九龍大角咀海帆道11號凱帆薈5樓1A號舖",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_617474000111",
      "edb_617474000112"
    ],
    "pedagogyTags": [
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "english",
      "bilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25015560",
    "website": "https://www.learninghabitat.org",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5612070001",
    "schoolCode": "561207",
    "campusCode": "0001",
    "name": "學之園幼稚園（凱帆薈）",
    "nameEn": "LEARNING HABITAT KINDERGARTEN (HAMPTON LOFT)",
    "district": "九龍",
    "district18": "油尖旺區",
    "address": "九龍大角咀海帆道１１號凱帆薈５樓２號舖（包括幼兒中心）",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_561207000111",
      "edb_561207000112",
      "edb_561207000113"
    ],
    "pedagogyTags": [
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "english",
      "bilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25015105",
    "website": "http://www.learninghabitat.org",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_6095280001",
    "schoolCode": "609528",
    "campusCode": "0001",
    "name": "學之園幼稚園（昇御海逸）",
    "nameEn": "LEARNING HABITAT KINDERGARTEN (CHATHAM LV)",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍紅磡漆咸道北３８８號昇御門地下Ｇ０６－Ｇ２６",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_609528000111",
      "edb_609528000112"
    ],
    "pedagogyTags": [
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "english",
      "bilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23631500",
    "website": "",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_6152500001",
    "schoolCode": "615250",
    "campusCode": "0001",
    "name": "學之園幼稚園(星匯居)",
    "nameEn": "LEARNING HABITAT KINDERGARTEN (THE SPARKLE)",
    "district": "九龍",
    "district18": "深水埗區",
    "address": "九龍長沙灣通州街500號星匯居商業發展項目1樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_615250000111",
      "edb_615250000112"
    ],
    "pedagogyTags": [
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "english",
      "bilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25010136",
    "website": "http://learninghabitat.org",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_3258800001",
    "schoolCode": "325880",
    "campusCode": "0001",
    "name": "循道衛理聯合教會主恩堂幼稚園",
    "nameEn": "GRACE METHODIST CHURCH KINDERGARTEN",
    "district": "九龍",
    "district18": "黃大仙區",
    "address": "九龍馬仔坑天宏苑停車場大廈二字樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "WD"
    ],
    "variantIds": [
      "edb_325880000111",
      "edb_325880000113"
    ],
    "pedagogyTags": [
      "project_learn",
      "language_dev"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23204188",
    "website": "http://www.grace.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5177120001",
    "schoolCode": "517712",
    "campusCode": "0001",
    "name": "雅各中英文幼稚園（深水埗校）",
    "nameEn": "JAMES ANGLO-CHINESE KINDERGARTEN (SHAM SHUI PO)",
    "district": "九龍",
    "district18": "深水埗區",
    "address": "九龍深水埗順寧道１６號樂年花園地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_517712000111",
      "edb_517712000112",
      "edb_517712000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23868877",
    "website": "http://www.jameskg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "low",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": true
    }
  },
  {
    "id": "edb_6044700001",
    "schoolCode": "604470",
    "campusCode": "0001",
    "name": "雅士圖國際幼稚園",
    "nameEn": "ARISTLE INTERNATIONAL KINDERGARTEN",
    "district": "九龍",
    "district18": "深水埗區",
    "address": "九龍大埔道２２及２６號翠峰２８地下及１樓２號舖及地下１號舖",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_604470000111",
      "edb_604470000112"
    ],
    "pedagogyTags": [
      "play_explore"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23232982",
    "website": "https://www.aik.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_3251470006",
    "schoolCode": "325147",
    "campusCode": "0006",
    "name": "耀中國際學校",
    "nameEn": "YEW CHUNG INTERNATIONAL SCHOOL",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍九龍塘森麻實道3及3號A地下及1樓及森麻實道22號地下至1樓",
    "nature": "international",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_325147000611",
      "edb_325147000612",
      "edb_325147000613"
    ],
    "pedagogyTags": [
      "project_learn"
    ],
    "languageEnv": [
      "bilingual",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23363028",
    "website": "http://www.ycis-hk.com",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5661280001",
    "schoolCode": "566128",
    "campusCode": "0001",
    "name": "耀中國際幼稚園（根德道）",
    "nameEn": "YEW CHUNG INTERNATIONAL CHILDREN'S HOUSE (KENT ROAD)",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍九龍塘根德道２９號地下及１樓",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_566128000111",
      "edb_566128000112",
      "edb_566128000113"
    ],
    "pedagogyTags": [
      "project_learn"
    ],
    "languageEnv": [
      "bilingual",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23378258",
    "website": "http://www.ycis-hk.com",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5661100001",
    "schoolCode": "566110",
    "campusCode": "0001",
    "name": "耀中國際幼稚園（窩打老道）",
    "nameEn": "YEW CHUNG INTERNATIONAL CHILDREN'S HOUSE (WATERLOO ROAD)",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍九龍塘窩打老道１５１－１５３號地下",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_566110000113"
    ],
    "pedagogyTags": [
      "project_learn"
    ],
    "languageEnv": [
      "bilingual",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23374240",
    "website": "http://www.ycis-hk.com",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5671400001",
    "schoolCode": "567140",
    "campusCode": "0001",
    "name": "耀中幼稚園（森麻實道）",
    "nameEn": "YEW CHUNG CHILDREN'S HOUSE (SOMERSET ROAD)",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍九龍塘森麻實道２０號",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_567140000111",
      "edb_567140000112",
      "edb_567140000113"
    ],
    "pedagogyTags": [
      "project_learn"
    ],
    "languageEnv": [
      "bilingual",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23368255",
    "website": "http://www.ycis-hk.com",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_6177410001",
    "schoolCode": "617741",
    "campusCode": "0001",
    "name": "茵晴幼稚園",
    "nameEn": "IMPERIAL CHILDREN KINDERGARTEN",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍九龍城福佬村道18號1樓B舖(星期一至星期日上午八時至下午一時)",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM"
    ],
    "variantIds": [
      "edb_617741000111"
    ],
    "pedagogyTags": [],
    "languageEnv": [],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "",
    "website": "http://ick.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "low",
      "languageConfidence": "low",
      "needsReview": true
    }
  },
  {
    "id": "edb_5951440001",
    "schoolCode": "595144",
    "campusCode": "0001",
    "name": "永樂創新英文幼稚園",
    "nameEn": "JONATHAN INNOVATIVE ENGLISH KINDERGARTEN",
    "district": "九龍",
    "district18": "黃大仙區",
    "address": "九龍鑽石山龍蟠苑商場第ＯＴ／ＫＧ０１號舖",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_595144000111",
      "edb_595144000112",
      "edb_595144000113"
    ],
    "pedagogyTags": [
      "project_learn"
    ],
    "languageEnv": [
      "trilingual",
      "english",
      "bilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27996300",
    "website": "http://www.joninnoschool.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5650240001",
    "schoolCode": "565024",
    "campusCode": "0001",
    "name": "油麻地循道衛理楊震幼兒學校",
    "nameEn": "YAUMATEI YANG MEMORIAL METHODIST PRE-SCHOOL",
    "district": "九龍",
    "district18": "油尖旺區",
    "address": "九龍窩打老道５４號３樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_565024000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "22510866",
    "website": "http://www.yymmps.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_1338500001",
    "schoolCode": "133850",
    "campusCode": "0001",
    "name": "又一村學校",
    "nameEn": "YAU YAT CHUEN SCHOOL",
    "district": "九龍",
    "district18": "深水埗區",
    "address": "九龍又一村壽菊路２號及新翼",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_133850000111",
      "edb_133850000112",
      "edb_133850000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23812949",
    "website": "http://www.yycskg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5283660001",
    "schoolCode": "528366",
    "campusCode": "0001",
    "name": "圓玄幼稚園(平田邨)",
    "nameEn": "YUEN YUEN KINDERGARTEN (PING TIN ESTATE)",
    "district": "九龍",
    "district18": "觀塘區",
    "address": "九龍藍田平田邨平善樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_528366000111",
      "edb_528366000112",
      "edb_528366000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "language_dev",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "22437116",
    "website": "http://www.yuenyuenkg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5818520001",
    "schoolCode": "581852",
    "campusCode": "0001",
    "name": "約克國際幼稚園",
    "nameEn": "YORK INTERNATIONAL KINDERGARTEN",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍九龍塘金巴倫道五十一號（不包括天台）",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "british",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_581852000111",
      "edb_581852000112"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "play_explore",
      "project_learn"
    ],
    "languageEnv": [
      "trilingual",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23361483",
    "website": "http://www.york.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5818520003",
    "schoolCode": "581852",
    "campusCode": "0003",
    "name": "約克國際幼稚園",
    "nameEn": "YORK INTERNATIONAL KINDERGARTEN",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍九龍塘雅息士道２號地下（有效日期至二零一九年七月三十一日，包括當天）",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_581852000311",
      "edb_581852000312"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23361483",
    "website": "http://www.york.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "low",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": true
    }
  },
  {
    "id": "edb_3228220002",
    "schoolCode": "322822",
    "campusCode": "0002",
    "name": "約克英文小學暨幼稚園(九龍塘)",
    "nameEn": "YORK ENGLISH PRIMARY SCHOOL & KINDERGARTEN (KOWLOON TONG)",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍九龍塘九龍內地段744號金巴倫道49號地下及1樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_322822000211",
      "edb_322822000212"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "play_explore",
      "project_learn"
    ],
    "languageEnv": [
      "trilingual",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23361083",
    "website": "http://www.york.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "low",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": true
    }
  },
  {
    "id": "edb_2154490001",
    "schoolCode": "215449",
    "campusCode": "0001",
    "name": "約克中英文幼稚園",
    "nameEn": "YORK ENGLISH & CHINESE KINDERGARTEN",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍約道１４號地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_215449000111",
      "edb_215449000112"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23382544",
    "website": "http://www.york.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "low",
      "pedagogyConfidence": "low",
      "languageConfidence": "high",
      "needsReview": true
    }
  },
  {
    "id": "edb_6201490001",
    "schoolCode": "620149",
    "campusCode": "0001",
    "name": "長沙灣街坊福利會林譚燕華幼稚園(麗翠苑)",
    "nameEn": "CHEUNG SHA WAN KAI FONG WELFARE ASSOCIATION LAM TAM YIN WAH KINDERGARTEN (LAI TSUI COURT)",
    "district": "九龍",
    "district18": "深水埗區",
    "address": "九龍長沙灣荔枝角道608號麗翠苑麗翠商場一樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_620149000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23862826",
    "website": "https://www.lamtyw.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5325500002",
    "schoolCode": "532550",
    "campusCode": "0002",
    "name": "智樂幼稚園",
    "nameEn": "CHE LOK KINDERGARTEN",
    "district": "九龍",
    "district18": "深水埗區",
    "address": "九龍深水埗大南街２２１號地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_532550000211",
      "edb_532550000212",
      "edb_532550000213"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "21915488",
    "website": "https://www.chelok.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5325500001",
    "schoolCode": "532550",
    "campusCode": "0001",
    "name": "智樂幼稚園",
    "nameEn": "CHE LOK KINDERGARTEN",
    "district": "九龍",
    "district18": "深水埗區",
    "address": "九龍深水埗南昌街72號兆昌大廈 地下A2及B舖、1樓AB及C舖",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_532550000111",
      "edb_532550000112",
      "edb_532550000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "21915488",
    "website": "https://www.chelok.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5229100001",
    "schoolCode": "522910",
    "campusCode": "0001",
    "name": "中華傳道會基石幼稚園",
    "nameEn": "CNEC CHRISTIAN KINDERGARTEN",
    "district": "九龍",
    "district18": "觀塘區",
    "address": "九龍秀茂坪第三座秀康樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_522910000111",
      "edb_522910000112",
      "edb_522910000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23406063",
    "website": "http://www.cnecckg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_3232500001",
    "schoolCode": "323250",
    "campusCode": "0001",
    "name": "中華基督教會基法幼稚園",
    "nameEn": "THE CHURCH OF CHRIST IN CHINA KEI FAAT KINDERGARTEN",
    "district": "九龍",
    "district18": "觀塘區",
    "address": "九龍觀塘月華街３４號地下下層３樓４樓及５樓及地下下層１樓電腦室",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_323250000111",
      "edb_323250000112"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23898948",
    "website": "http://kfk.ccc.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_3248090001",
    "schoolCode": "324809",
    "campusCode": "0001",
    "name": "中華基督教會基華幼稚園",
    "nameEn": "THE CHURCH OF CHRIST IN CHINA KEI WA KINDERGARTEN",
    "district": "九龍",
    "district18": "觀塘區",
    "address": "九龍觀塘啓業邨啓寧樓地下G1-G14室",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_324809000111",
      "edb_324809000112",
      "edb_324809000113"
    ],
    "pedagogyTags": [
      "holistic"
    ],
    "languageEnv": [
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27560781",
    "website": "http://kwk.ccc.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_3247950001",
    "schoolCode": "324795",
    "campusCode": "0001",
    "name": "中華基督教會基真幼稚園",
    "nameEn": "THE CHURCH OF CHRIST IN CHINA KEI CHUN KINDERGARTEN",
    "district": "九龍",
    "district18": "深水埗區",
    "address": "九龍深水埗麗閣邨麗蘿樓地下１１４－１２７號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_324795000111",
      "edb_324795000112",
      "edb_324795000113"
    ],
    "pedagogyTags": [
      "holistic"
    ],
    "languageEnv": [
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "",
    "website": "http://kck.ccc.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_3195110001",
    "schoolCode": "319511",
    "campusCode": "0001",
    "name": "中華基督教會深愛堂幼稚園",
    "nameEn": "THE CHURCH OF CHRIST IN CHINA SHUM OI CHURCH KINDERGARTEN",
    "district": "九龍",
    "district18": "深水埗區",
    "address": "九龍石硤尾窩仔街80號地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_319511000111",
      "edb_319511000112",
      "edb_319511000113"
    ],
    "pedagogyTags": [
      "project_learn"
    ],
    "languageEnv": [
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "",
    "website": "",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5470690001",
    "schoolCode": "547069",
    "campusCode": "0001",
    "name": "中華基督教會望覺堂賢貞幼稚園",
    "nameEn": "C C C MONGKOK CHURCH JEANNETTE KINDERGARTEN",
    "district": "九龍",
    "district18": "油尖旺區",
    "address": "九龍旺角弼街56號望覺基督教大樓地下及一樓(不包括課室1、5及6(逢星期六下午二時三十分至四時)及課室1、3、4、5、6及7(逢星期日上午十一時至下午十二時三十分))及三樓(不包括課室1、2及3(逢星期六下午二時三十分至四時及逢星期日上午九時三十分至下午十二時三十分))",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_547069000111",
      "edb_547069000112",
      "edb_547069000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn"
    ],
    "languageEnv": [
      "trilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23941142",
    "website": "http://mkcjk.ccc.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_1321520001",
    "schoolCode": "132152",
    "campusCode": "0001",
    "name": "中華基督教會協和幼稚園",
    "nameEn": "THE CHURCH OF CHRIST IN CHINA HEEP WOH KINDERGARTEN",
    "district": "九龍",
    "district18": "深水埗區",
    "address": "九龍西洋菜街231號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_132152000111",
      "edb_132152000112"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "project_learn",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "bilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27779618",
    "website": "http://www.heepwohkg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5665600001",
    "schoolCode": "566560",
    "campusCode": "0001",
    "name": "竹園區神召會南昌康樂幼兒學校",
    "nameEn": "PENTECOSTAL CHURCH OF HONG KONG NAM CHEONG NURSERY SCHOOL",
    "district": "九龍",
    "district18": "深水埗區",
    "address": "九龍深水埗南昌邨南昌社區中心５樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_566560000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "project_learn",
      "language_dev",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "2725929223866264",
    "website": "http://namcheongns.pchk.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_6228690001",
    "schoolCode": "622869",
    "campusCode": "0001",
    "name": "卓爾中英文幼稚園",
    "nameEn": "SMART KIDS ANGLO-CHINESE KINDERGARTEN",
    "district": "九龍",
    "district18": "油尖旺區",
    "address": "九龍尖沙咀彌敦道136A號地下及一樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_622869000111",
      "edb_622869000112",
      "edb_622869000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "holistic"
    ],
    "languageEnv": [
      "trilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23676680",
    "website": "https://www.smartkidskg.edu.hk/en/index.php",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_3225800001",
    "schoolCode": "322580",
    "campusCode": "0001",
    "name": "鑽石山浸信會美欣幼稚園",
    "nameEn": "DIAMOND HILL BAPTIST CHURCH BRIGHT BLOSSOMS KINDERGARTEN",
    "district": "九龍",
    "district18": "觀塘區",
    "address": "九龍坪石邨黃石樓地下１０４一１０５及１０９一１１６室",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_322580000111",
      "edb_322580000112",
      "edb_322580000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "project_learn",
      "project_learn",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23238731",
    "website": "http://www.dhbcbbkg.org",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5303790001",
    "schoolCode": "530379",
    "campusCode": "0001",
    "name": "鑽石山靈糧幼稚園",
    "nameEn": "DIAMOND HILL LING LIANG KINDERGARTEN",
    "district": "九龍",
    "district18": "黃大仙區",
    "address": "九龍鑽石山龍蟠街３號星河明居平台２樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_530379000111",
      "edb_530379000112"
    ],
    "pedagogyTags": [
      "project_learn",
      "project_learn",
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "29559797",
    "website": "http://www.lingliang.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_6038640002",
    "schoolCode": "603864",
    "campusCode": "0002",
    "name": "ABC PATHWAYS INTERNATIONAL KINDERGARTEN (WHAMPOA GARDEN)",
    "nameEn": "ABC PATHWAYS INTERNATIONAL KINDERGARTEN (WHAMPOA GARDEN)",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍紅磡海逸道8號海逸坊低層地下LG01A舖、高層地下UG45A、UG45B及UG45C舖",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_603864000211",
      "edb_603864000212",
      "edb_603864000213"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "21109993",
    "website": "http://www.abcpathways.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "low",
      "languageConfidence": "high",
      "needsReview": true
    }
  },
  {
    "id": "edb_5936300001",
    "schoolCode": "593630",
    "campusCode": "0001",
    "name": "KOHITSUJI KINDERGARTEN",
    "nameEn": "KOHITSUJI KINDERGARTEN",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "SHOP 1, G/F., SITE 10, WHAMPOA GARDEN, HUNGHOM, KOWLOON",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_593630000111",
      "edb_593630000112",
      "edb_593630000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23306677",
    "website": "http://kohitsujiyouchien.com",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "low",
      "languageConfidence": "high",
      "needsReview": true
    }
  },
  {
    "id": "edb_2152440002",
    "schoolCode": "215244",
    "campusCode": "0002",
    "name": "KOWLOON BAPTIST CHURCH KINDERGARTEN",
    "nameEn": "KOWLOON BAPTIST CHURCH KINDERGARTEN",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍嘉林邊道45—47號慈光樓地下及美光樓地庫部份(男及女洗手間)",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_215244000211",
      "edb_215244000212"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23366213",
    "website": "https://www.kbck.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "medium",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_2152440001",
    "schoolCode": "215244",
    "campusCode": "0001",
    "name": "KOWLOON BAPTIST CHURCH KINDERGARTEN",
    "nameEn": "KOWLOON BAPTIST CHURCH KINDERGARTEN",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍九龍塘聯合道３００號夾層及１樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_215244000111",
      "edb_215244000112"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23366213",
    "website": "http://www.kbck.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "low",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": true
    }
  },
  {
    "id": "edb_5583460003",
    "schoolCode": "558346",
    "campusCode": "0003",
    "name": "LITTLE BUDS KINDERGARTEN",
    "nameEn": "LITTLE BUDS KINDERGARTEN",
    "district": "九龍",
    "district18": "油尖旺區",
    "address": "九龍渡船街1-4號金霞閣地下E室 閣樓E室及一樓E室",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_558346000311",
      "edb_558346000312"
    ],
    "pedagogyTags": [
      "project_learn",
      "language_dev"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "35862830",
    "website": "http://littlebuds.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5866250001",
    "schoolCode": "586625",
    "campusCode": "0001",
    "name": "ST. CATHERINE'S KINDERGARTEN (HARBOUR PLACE)",
    "nameEn": "ST. CATHERINE'S KINDERGARTEN (HARBOUR PLACE)",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍紅磡愛景街８號海濱南岸一樓幼稚園",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_586625000111",
      "edb_586625000112"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26706600",
    "website": "http://www.stcatherines.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5261000001",
    "schoolCode": "526100",
    "campusCode": "0001",
    "name": "YORK ENGLISH PRE-SCHOOL",
    "nameEn": "YORK ENGLISH PRE-SCHOOL",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍九龍塘施他佛道14號地下(Yｏｒｋ Iｎｔｅｒｎａｔｉｏｎａｌ Pｒｅ—Sｃｈｏｏｌ地下(部份)户外遊戲場地除外)",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_526100000111",
      "edb_526100000112",
      "edb_526100000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23361119",
    "website": "http://www.york.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "low",
      "pedagogyConfidence": "low",
      "languageConfidence": "high",
      "needsReview": true
    }
  },
  {
    "id": "edb_5784790001",
    "schoolCode": "578479",
    "campusCode": "0001",
    "name": "YORK INTERNATIONAL PRE-SCHOOL",
    "nameEn": "YORK INTERNATIONAL PRE-SCHOOL",
    "district": "九龍",
    "district18": "九龍城區",
    "address": "九龍九龍塘施他佛道14號地下(部份)及1樓",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_578479000111",
      "edb_578479000112"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23372388",
    "website": "http://www.york.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "low",
      "languageConfidence": "high",
      "needsReview": true
    }
  },
  {
    "id": "edb_6046150001",
    "schoolCode": "604615",
    "campusCode": "0001",
    "name": "YORK MONTESSORI INTERNATIONAL PRE-SCHOOL (MEI FOO)",
    "nameEn": "YORK MONTESSORI INTERNATIONAL PRE-SCHOOL (MEI FOO)",
    "district": "九龍",
    "district18": "深水埗區",
    "address": "九龍美孚新邨第一期百老匯街1-12、14-25、27、29及31號平台及地下",
    "nature": "international",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_604615000111",
      "edb_604615000112",
      "edb_604615000113"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "play_explore",
      "project_learn"
    ],
    "languageEnv": [
      "trilingual",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23380680",
    "website": "http://www.york.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "low",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": true
    }
  },
  {
    "id": "edb_6014970001",
    "schoolCode": "601497",
    "campusCode": "0001",
    "name": "611生命樹幼稚園",
    "nameEn": "611 TREE OF LIFE KINDERGARTEN",
    "district": "新界",
    "district18": "荃灣區",
    "address": "新界荃灣怡樂街2-12號海濱花園D平台",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_601497000111",
      "edb_601497000112"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "trilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "39568611",
    "website": "https://www.611tol.edu.hk/tc",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_6156330001",
    "schoolCode": "615633",
    "campusCode": "0001",
    "name": "艾蒙特國際幼稚園",
    "nameEn": "EIS INTERNATIONAL PRE-SCHOOL",
    "district": "新界",
    "district18": "元朗區",
    "address": "新界元朗新田新圍村一號",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_615633000111",
      "edb_615633000112",
      "edb_615633000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "28897680",
    "website": "",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "low",
      "languageConfidence": "high",
      "needsReview": true
    }
  },
  {
    "id": "edb_5651990002",
    "schoolCode": "565199",
    "campusCode": "0002",
    "name": "安基司國際幼兒園",
    "nameEn": "ANCHORS INTERNATIONAL NURSERY",
    "district": "新界",
    "district18": "大埔區",
    "address": "新界大埔紅林路１號滌濤山",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_565199000211",
      "edb_565199000212",
      "edb_565199000213"
    ],
    "pedagogyTags": [
      "project_learn",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26506660",
    "website": "http://www.anchors.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5651990001",
    "schoolCode": "565199",
    "campusCode": "0001",
    "name": "安基司國際幼兒園",
    "nameEn": "ANCHORS INTERNATIONAL NURSERY",
    "district": "新界",
    "district18": "大埔區",
    "address": "新界大埔翠樂街８號富萊花園Ｇ０７Ｂ舖部份地下及２樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_565199000111",
      "edb_565199000112",
      "edb_565199000113"
    ],
    "pedagogyTags": [
      "project_learn",
      "project_learn"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26665650",
    "website": "http://www.anchors.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_6220600001",
    "schoolCode": "622060",
    "campusCode": "0001",
    "name": "安基司學校附屬國際幼稚園",
    "nameEn": "ANCHORS ACADEMY AFFILIATED INTERNATIONAL KINDERGARTEN",
    "district": "新界",
    "district18": "元朗區",
    "address": "新界元朗錦田北高埔徑1號教學大樓2樓",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "british",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_622060000111",
      "edb_622060000112",
      "edb_622060000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "holistic"
    ],
    "languageEnv": [
      "putonghua",
      "english",
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "",
    "website": "",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5360670001",
    "schoolCode": "536067",
    "campusCode": "0001",
    "name": "安基司幼稚園",
    "nameEn": "ANCHORS KINDERGARTEN",
    "district": "新界",
    "district18": "大埔區",
    "address": "新界大埔翠樂街８號富來花園Ｇ０７Ｂ舖地下至二樓（幼兒中心專用部份除外）",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_536067000111",
      "edb_536067000112",
      "edb_536067000113"
    ],
    "pedagogyTags": [
      "project_learn",
      "project_learn"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26644133",
    "website": "http://www.anchors.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5824170001",
    "schoolCode": "582417",
    "campusCode": "0001",
    "name": "安基司幼稚園（粉嶺）",
    "nameEn": "ANCHORS KINDERGARTEN (FANLING)",
    "district": "新界",
    "district18": "北區",
    "address": "新界粉嶺聯捷街２－１０號榮輝中心１樓ＡＢ及２樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_582417000111",
      "edb_582417000112",
      "edb_582417000113"
    ],
    "pedagogyTags": [
      "project_learn"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26762199",
    "website": "http://www.anchors.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_6229820001",
    "schoolCode": "622982",
    "campusCode": "0001",
    "name": "奧基英文幼稚園",
    "nameEn": "OASIS ENGLISH KINDERGARTEN",
    "district": "新界",
    "district18": "葵青區",
    "address": "新界葵涌華景山路9號華景商場地下21號舖及1樓1號舖",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_622982000111",
      "edb_622982000112"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "",
    "website": "https://oasiskindergarten.com",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "low",
      "languageConfidence": "high",
      "needsReview": true
    }
  },
  {
    "id": "edb_2316900001",
    "schoolCode": "231690",
    "campusCode": "0001",
    "name": "栢基海韻幼稚園",
    "nameEn": "PARKVIEW RHINE GARDEN PRE-SCHOOL",
    "district": "新界",
    "district18": "荃灣區",
    "address": "新界深井海韻花園第１座１樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_231690000111",
      "edb_231690000112",
      "edb_231690000113"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "play_explore"
    ],
    "languageEnv": [
      "putonghua",
      "english",
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24919082",
    "website": "http://www.pipsrg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_6164430001",
    "schoolCode": "616443",
    "campusCode": "0001",
    "name": "栢基幼稚園(康城)",
    "nameEn": "PARKVIEW PRE-SCHOOL (LOHAS)",
    "district": "新界",
    "district18": "西貢區",
    "address": "新界將軍澳康城路1號日出康城7期3樓幼稚園",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_616443000111",
      "edb_616443000112"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "putonghua",
      "english",
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26311299",
    "website": "https://www.pips.edu.hk/lohas/index.asp",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5398720001",
    "schoolCode": "539872",
    "campusCode": "0001",
    "name": "保良局蔡冠深幼稚園",
    "nameEn": "PO LEUNG KUK CHOI KOON SHUM KINDERGARTEN",
    "district": "新界",
    "district18": "屯門區",
    "address": "新界屯門青松觀道３３號澤豐花園地下及二樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_539872000111",
      "edb_539872000112"
    ],
    "pedagogyTags": [
      "project_learn",
      "language_dev"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24602112",
    "website": "https://www.plkkgs.edu.hk/plkckskg",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5639780001",
    "schoolCode": "563978",
    "campusCode": "0001",
    "name": "保良局蔡繼有幼稚園",
    "nameEn": "PO LEUNG KUK CHOI KAI YAU KINDERGARTEN",
    "district": "新界",
    "district18": "西貢區",
    "address": "新界將軍澳彩明苑彩富閣地下Ｂ及Ｃ座",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_563978000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "play_explore",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "english",
      "native_english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "31439039",
    "website": "http://www.poleungkuk.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_1584530001",
    "schoolCode": "158453",
    "campusCode": "0001",
    "name": "保良局曹金霖夫人幼稚園",
    "nameEn": "PO LEUNG KUK MRS. CHAO KING LIN KINDERGARTEN",
    "district": "新界",
    "district18": "葵青區",
    "address": "新界青衣長安邨安潤樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_158453000111",
      "edb_158453000112",
      "edb_158453000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "project_learn"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24314904",
    "website": "https://www.plkkgs.edu.hk/plkcklkg",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_1590340001",
    "schoolCode": "159034",
    "campusCode": "0001",
    "name": "保良局曾星如幼稚園",
    "nameEn": "PO LEUNG KUK CHAN SENG YEE KINDERGARTEN",
    "district": "新界",
    "district18": "元朗區",
    "address": "新界元朗天水圍天瑞邨瑞心樓第2座地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_159034000111",
      "edb_159034000112",
      "edb_159034000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24470133",
    "website": "https://www.plkkgs.edu.hk/plkcsykg",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_1574490001",
    "schoolCode": "157449",
    "campusCode": "0001",
    "name": "保良局鄧碧雲紀念幼稚園",
    "nameEn": "PO LEUNG KUK TANG BIK WAN MEMORIAL KINDERGARTEN",
    "district": "新界",
    "district18": "大埔區",
    "address": "新界大埔廣福邨廣義樓118–131號地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_157449000111",
      "edb_157449000112",
      "edb_157449000113"
    ],
    "pedagogyTags": [
      "project_learn"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26562016",
    "website": "https://www.plkkgs.edu.hk/plktbwmkg",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5636760001",
    "schoolCode": "563676",
    "campusCode": "0001",
    "name": "保良局方譚遠良幼稚園",
    "nameEn": "PO LEUNG KUK FONG TAM YUEN LEUNG KINDERGARTEN",
    "district": "新界",
    "district18": "荃灣區",
    "address": "新界荃灣青山道九咪半麗城花園第１座高層地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_563676000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "play_explore",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "english",
      "native_english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24111799",
    "website": "http://www.poleungkuk.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_1592040001",
    "schoolCode": "159204",
    "campusCode": "0001",
    "name": "保良局方王換娣幼稚園",
    "nameEn": "PO LEUNG KUK FONG WONG WOON TAI KINDERGARTEN",
    "district": "新界",
    "district18": "西貢區",
    "address": "新界將軍澳常寧路2號厚德邨TKO Gａｔｅｗａｙ東翼地下KG02號舖",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_159204000111",
      "edb_159204000112"
    ],
    "pedagogyTags": [
      "play_explore",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27063633",
    "website": "https://www.plkkgs.edu.hk/plkfwwtkg",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_1582400001",
    "schoolCode": "158240",
    "campusCode": "0001",
    "name": "保良局馮梁結紀念幼稚園",
    "nameEn": "PO LEUNG KUK FUNG LEUNG KIT MEMORIAL KINDERGARTEN",
    "district": "新界",
    "district18": "沙田區",
    "address": "新界沙田馬鞍山恆安邨恆月樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_158240000111",
      "edb_158240000112",
      "edb_158240000113"
    ],
    "pedagogyTags": [
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26423100",
    "website": "https://www.plkkgs.edu.hk/plkflkkg/hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_6057350001",
    "schoolCode": "605735",
    "campusCode": "0001",
    "name": "保良局郭羅桂珍幼稚園",
    "nameEn": "PO LEUNG KUK ELEANOR KWOK LAW KWAI CHUN KINDERGARTEN",
    "district": "新界",
    "district18": "元朗區",
    "address": "新界元朗洪福邨第五座洪塱樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_605735000111",
      "edb_605735000112"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "play_explore",
      "play_explore",
      "project_learn",
      "project_learn",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24667666",
    "website": "https://www.plkkgs.edu.hk/plkeklkckg/hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5639940001",
    "schoolCode": "563994",
    "campusCode": "0001",
    "name": "保良局李俊駒伉儷幼稚園",
    "nameEn": "PO LEUNG KUK MR. & MRS. CHARLIE LEE KINDERGARTEN",
    "district": "新界",
    "district18": "葵青區",
    "address": "新界葵涌葵盛東邨盛逸樓平台Ｂ及Ｃ座",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_563994000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "english",
      "native_english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24192734",
    "website": "http://www.poleungkuk.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_1586230002",
    "schoolCode": "158623",
    "campusCode": "0002",
    "name": "保良局廖烈正幼稚園",
    "nameEn": "PO LEUNG KUK THOMAS LIU LIT CHING KINDERGARTEN",
    "district": "新界",
    "district18": "屯門區",
    "address": "新界屯門菁田邨菁喜樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_158623000211",
      "edb_158623000212"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "project_learn",
      "project_learn",
      "holistic",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24550445",
    "website": "",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5649820001",
    "schoolCode": "564982",
    "campusCode": "0001",
    "name": "保良局廖笑霞幼稚園",
    "nameEn": "PO LEUNG KUK LIU SEW HAR KINDERGARTEN",
    "district": "新界",
    "district18": "元朗區",
    "address": "新界元朗水車館街44號地下1-8號店",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_564982000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "project_learn"
    ],
    "languageEnv": [
      "english",
      "native_english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24790999",
    "website": "http://kgn.poleungkuk.org.hk/tc/1088/page.html",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5637220001",
    "schoolCode": "563722",
    "campusCode": "0001",
    "name": "保良局劉進幼稚園",
    "nameEn": "PO LEUNG KUK LAU CHUN KINDERGARTEN",
    "district": "新界",
    "district18": "大埔區",
    "address": "新界大埔廣福邨廣禮樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_563722000111",
      "edb_563722000112",
      "edb_563722000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "play_explore",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "english",
      "native_english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26532932",
    "website": "http://www.poleungkuk.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5666750001",
    "schoolCode": "566675",
    "campusCode": "0001",
    "name": "保良局呂陳慧貞（葵芳）幼稚園",
    "nameEn": "PO LEUNG KUK LUI CHAN WAI CHING (KWAI FONG) KINDERGARTEN",
    "district": "新界",
    "district18": "葵青區",
    "address": "新界葵涌葵芳邨葵安樓地下１５－２２號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_566675000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "play_explore",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "english",
      "native_english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24216021",
    "website": "http://www.poleungkuk.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5653180001",
    "schoolCode": "565318",
    "campusCode": "0001",
    "name": "保良局倪文玲(蝴蝶灣)幼稚園",
    "nameEn": "PO LEUNG KUK MALINA NGAI (BUTTERFLY BAY) KINDERGARTEN",
    "district": "新界",
    "district18": "屯門區",
    "address": "新界屯門蝴蝶灣社區中心6樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_565318000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "play_explore",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "english",
      "native_english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24673121",
    "website": "http://www.poleungkuk.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5639600001",
    "schoolCode": "563960",
    "campusCode": "0001",
    "name": "保良局倪文玲(友愛)幼稚園",
    "nameEn": "PO LEUNG KUK MALINA NGAI (YAU OI) KINDERGARTEN",
    "district": "新界",
    "district18": "屯門區",
    "address": "新界屯門友愛邨第6座愛禮樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_563960000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "project_learn",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "english",
      "native_english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24514336",
    "website": "http://www.poleungkuk.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5427680001",
    "schoolCode": "542768",
    "campusCode": "0001",
    "name": "保良局譚華正夫人幼稚園",
    "nameEn": "PO LEUNG KUK MRS TAM WAH CHING KINDERGARTEN",
    "district": "新界",
    "district18": "葵青區",
    "address": "九龍荔枝角華荔邨賞荔樓７字樓７０３室",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_542768000111",
      "edb_542768000112",
      "edb_542768000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "21210201",
    "website": "https://www.plkkgs.edu.hk/plkmtwckg",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5653260001",
    "schoolCode": "565326",
    "campusCode": "0001",
    "name": "保良局唐楚男(瀝源)幼稚園",
    "nameEn": "PO LEUNG KUK TONG CHOR NAM (LEK YUEN) KINDERGARTEN",
    "district": "新界",
    "district18": "沙田區",
    "address": "新界沙田瀝源邨貴和樓2樓223至232室",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_565326000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26920428",
    "website": "http://www.poleungkuk.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_1578130001",
    "schoolCode": "157813",
    "campusCode": "0001",
    "name": "保良局田家炳幼稚園",
    "nameEn": "PO LEUNG KUK TIN KA PING KINDERGARTEN",
    "district": "新界",
    "district18": "葵青區",
    "address": "新界青衣島長康邨青盛苑Ｏ座地下第一層",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_157813000111",
      "edb_157813000112"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24974487",
    "website": "http://www.plkkgs.edu.hk/plktkpkg",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_1573760001",
    "schoolCode": "157376",
    "campusCode": "0001",
    "name": "保良局田家炳兆康幼稚園",
    "nameEn": "PO LEUNG KUK TIN KA PING SIU HONG KINDERGARTEN",
    "district": "新界",
    "district18": "屯門區",
    "address": "新界屯門兆康苑商場三樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_157376000111",
      "edb_157376000112"
    ],
    "pedagogyTags": [
      "project_learn",
      "project_learn",
      "language_dev",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "bilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24668131",
    "website": "https://www.plkkgs.edu.hk/plktkpshkg",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_1567790001",
    "schoolCode": "156779",
    "campusCode": "0001",
    "name": "保良局吳多泰幼稚園",
    "nameEn": "PO LEUNG KUK NG TOR TAI KINDERGARTEN",
    "district": "新界",
    "district18": "沙田區",
    "address": "新界沙田穗禾苑商場38G",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_156779000111",
      "edb_156779000112"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "project_learn",
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english",
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26972162",
    "website": "https://www.plkkgs.edu.hk/plknttkg",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5163840002",
    "schoolCode": "516384",
    "campusCode": "0002",
    "name": "保良局葉吳彬彬皇后山幼稚園",
    "nameEn": "PO LEUNG KUK YIP NG BUN BUN QUEEN'S HILL KINDERGARTEN",
    "district": "新界",
    "district18": "北區",
    "address": "新界粉嶺皇后山邨皇順樓平台",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_516384000211",
      "edb_516384000212",
      "edb_516384000213"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english",
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26699813",
    "website": "https://www.plkkgs.edu.hk/plkynbbqhkg/hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_1582320002",
    "schoolCode": "158232",
    "campusCode": "0002",
    "name": "保良局葉吳彬彬幼稚園",
    "nameEn": "PO LEUNG KUK YIP NG BUN BUN KINDERGARTEN",
    "district": "新界",
    "district18": "西貢區",
    "address": "新界將軍澳雍明苑雍明商場1樓KG01號舖",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_158232000211",
      "edb_158232000212",
      "edb_158232000213"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "play_explore",
      "holistic",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27010822",
    "website": "https://www.plkkgs.edu.hk/plkynbbkg",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5234450002",
    "schoolCode": "523445",
    "campusCode": "0002",
    "name": "保良局張潘美意幼稚園",
    "nameEn": "PO LEUNG KUK CHEUNG POON MEI YEE KINDERGARTEN",
    "district": "新界",
    "district18": "離島區",
    "address": "新界大嶼山東涌富東廣場一樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_523445000211",
      "edb_523445000212",
      "edb_523445000213"
    ],
    "pedagogyTags": [
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "21090033",
    "website": "https://www.plkkgs.edu.hk/plkcpmykg",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_1584880001",
    "schoolCode": "158488",
    "campusCode": "0001",
    "name": "保良局張心瑜幼稚園",
    "nameEn": "PO LEUNG KUK FIONA CHEUNG SUM YU KINDERGARTEN",
    "district": "新界",
    "district18": "葵青區",
    "address": "新界荃灣大窩口邨富靜樓２０８－２１４號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_158488000111",
      "edb_158488000112",
      "edb_158488000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "language_dev"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24800662",
    "website": "https://www.plkkgs.edu.hk/plkfcsykg",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5637570001",
    "schoolCode": "563757",
    "campusCode": "0001",
    "name": "保良局志沛幼稚園",
    "nameEn": "PO LEUNG KUK CHI PUI KINDERGARTEN",
    "district": "新界",
    "district18": "荃灣區",
    "address": "新界葵涌梨木樹邨第２座２字樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_563757000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24267643",
    "website": "http://www.poleungkuk.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_1587800001",
    "schoolCode": "158780",
    "campusCode": "0001",
    "name": "保良局莊啓程夫人幼稚園",
    "nameEn": "PO LEUNG KUK MRS. VICWOOD K.T. CHONG KINDERGARTEN",
    "district": "新界",
    "district18": "北區",
    "address": "新界粉嶺華明邨耀明樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_158780000111",
      "edb_158780000112",
      "edb_158780000113"
    ],
    "pedagogyTags": [
      "project_learn",
      "project_learn"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26750012",
    "website": "https://www.plkkgs.edu.hk/plkmrsvckg",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_2313630001",
    "schoolCode": "231363",
    "campusCode": "0001",
    "name": "比華利中英文幼稚園",
    "nameEn": "BEVERLY ANGLO-CHINESE KINDERGARTEN",
    "district": "新界",
    "district18": "西貢區",
    "address": "新界西貢將軍澳將軍澳地段６號康盛花園第５座地下（部分）及低層地下（部分）（包括幼兒中心）",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_231363000111",
      "edb_231363000112",
      "edb_231363000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "bilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27027728",
    "website": "http://www.deborah.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_2310880001",
    "schoolCode": "231088",
    "campusCode": "0001",
    "name": "比諾中英文幼稚園",
    "nameEn": "BILOK ANGLO-CHINESE KINDERGARTEN",
    "district": "新界",
    "district18": "北區",
    "address": "新界上水石湖墟龍琛路２６－２８號地下至二樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_231088000111",
      "edb_231088000112",
      "edb_231088000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26702775",
    "website": "http://www.bilok-holford.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "low",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": true
    }
  },
  {
    "id": "edb_5640280001",
    "schoolCode": "564028",
    "campusCode": "0001",
    "name": "博愛醫院陳潘佩清紀念幼稚園",
    "nameEn": "POK OI HOSPITAL CHAN POON PUI CHING MEMORIAL KINDERGARTEN",
    "district": "新界",
    "district18": "元朗區",
    "address": "新界元朗朗屏邨賀屏樓9座地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_564028000113"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "play_explore",
      "project_learn",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24420776",
    "website": "https://kindergarten.pokoi.org.hk/CPPC/tc/index.php",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5640100001",
    "schoolCode": "564010",
    "campusCode": "0001",
    "name": "博愛醫院朱國京夫人紀念幼稚園",
    "nameEn": "POK OI HOSPITAL MRS. CHU KWOK KING MEMORIAL KINDERGARTEN",
    "district": "新界",
    "district18": "元朗區",
    "address": "新界元朗天水圍天瑞邨瑞滿樓B及C座地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_564010000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26173572",
    "website": "https://kindergarten.pokoi.org.hk/CKK/tc",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5594150001",
    "schoolCode": "559415",
    "campusCode": "0001",
    "name": "博士山（香港）國際幼稚園",
    "nameEn": "BOX HILL (HK) INTERNATIONAL KINDERGARTEN",
    "district": "新界",
    "district18": "沙田區",
    "address": "新界馬鞍山恆明街２號聽濤雅苑１期第１０座地下",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_559415000111",
      "edb_559415000112"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27506323",
    "website": "https://boxhill.edu.hk/mos",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "low",
      "languageConfidence": "high",
      "needsReview": true
    }
  },
  {
    "id": "edb_5817390002",
    "schoolCode": "581739",
    "campusCode": "0002",
    "name": "博士山(香港)國際幼稚園-火炭",
    "nameEn": "BOX HILL (HK) INTERNATIONAL KINDERGARTEN-FO TAN",
    "district": "新界",
    "district18": "沙田區",
    "address": "新界沙田火炭坳背灣街1號星凱．堤岸地下幼稚園",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_581739000211",
      "edb_581739000212"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26882161",
    "website": "",
    "dataQuality": {
      "curriculumConfidence": "low",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": true
    }
  },
  {
    "id": "edb_5817390001",
    "schoolCode": "581739",
    "campusCode": "0001",
    "name": "博士山（香港）國際幼稚園－火炭",
    "nameEn": "BOX HILL (HK) INTERNATIONAL KINDERGARTEN-FO TAN",
    "district": "新界",
    "district18": "沙田區",
    "address": "新界沙田火炭銀禧薈平台３２７號",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_581739000111",
      "edb_581739000112"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26882161",
    "website": "https://boxhill.edu.hk/ft",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "low",
      "languageConfidence": "high",
      "needsReview": true
    }
  },
  {
    "id": "edb_5818360002",
    "schoolCode": "581836",
    "campusCode": "0002",
    "name": "博士山(香港)國際幼稚園-將軍澳",
    "nameEn": "BOX HILL (HK) INTERNATIONAL KINDERGARTEN - TSEUNG KWAN O",
    "district": "新界",
    "district18": "西貢區",
    "address": "新界將軍澳翠嶺路48號翠嶺峰商場地下2及3號舖及一樓",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_581836000211",
      "edb_581836000212",
      "edb_581836000213"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26230023",
    "website": "http://www.boxhill.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "low",
      "languageConfidence": "high",
      "needsReview": true
    }
  },
  {
    "id": "edb_1564260001",
    "schoolCode": "156426",
    "campusCode": "0001",
    "name": "崇基幼稚園",
    "nameEn": "SUNG KEI KINDERGARTEN",
    "district": "新界",
    "district18": "葵青區",
    "address": "BLOCK 6, GR. FL. KWAI SHING WEST ESTATE, KWAI CHUNG, N.T.",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_156426000111",
      "edb_156426000112",
      "edb_156426000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24271128",
    "website": "http://www.sungkeikg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "low",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": true
    }
  },
  {
    "id": "edb_1585260001",
    "schoolCode": "158526",
    "campusCode": "0001",
    "name": "崇真會美善幼稚園",
    "nameEn": "TSUNG TSIN MISSION GRACEFUL KINDERGARTEN",
    "district": "新界",
    "district18": "西貢區",
    "address": "將軍澳寶林邨寶德樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_158526000111",
      "edb_158526000112",
      "edb_158526000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "holistic",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27015588",
    "website": "http://www.ttmgkg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5405790001",
    "schoolCode": "540579",
    "campusCode": "0001",
    "name": "崇真會美善幼稚園（馬鞍山）",
    "nameEn": "TSUNG TSIN MISSION GRACEFUL KINDERGARTEN (MA ON SHAN)",
    "district": "新界",
    "district18": "沙田區",
    "address": "新界沙田馬鞍山錦泰苑錦泰商場1樓OT KG01室(包括幼兒中心)",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_540579000111",
      "edb_540579000112",
      "edb_540579000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "language_dev"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "31247322",
    "website": "http://www.mosgraceful.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_1560190001",
    "schoolCode": "156019",
    "campusCode": "0001",
    "name": "慈光幼稚園",
    "nameEn": "BENEVOLENT LIGHT KINDERGARTEN",
    "district": "新界",
    "district18": "沙田區",
    "address": "新界沙田瀝源邨壽全樓地下７座",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_156019000111",
      "edb_156019000112",
      "edb_156019000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26916377",
    "website": "http://www.belight.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "low",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": true
    }
  },
  {
    "id": "edb_1584700001",
    "schoolCode": "158470",
    "campusCode": "0001",
    "name": "翠林邨浸信會幼稚園",
    "nameEn": "TSUI LAM ESTATE BAPTIST KINDERGARTEN",
    "district": "新界",
    "district18": "西貢區",
    "address": "新界將軍澳翠林邨雅林樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_158470000111",
      "edb_158470000112",
      "edb_158470000113"
    ],
    "pedagogyTags": [
      "project_learn"
    ],
    "languageEnv": [
      "english",
      "native_english",
      "bilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27024711",
    "website": "http://www.tlebk.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5375270001",
    "schoolCode": "537527",
    "campusCode": "0001",
    "name": "翠茵小宇宙幼稚園",
    "nameEn": "GREENVILLE KIDS' WORLD KINDERGARTEN",
    "district": "新界",
    "district18": "西貢區",
    "address": "新界將軍澳銀澳路一號新寶城商場一樓１０８號舖（包括幼兒中心）",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_537527000111",
      "edb_537527000112",
      "edb_537527000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "22743355",
    "website": "http://www.greenvillekids.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "low",
      "pedagogyConfidence": "low",
      "languageConfidence": "low",
      "needsReview": true
    }
  },
  {
    "id": "edb_1511570001",
    "schoolCode": "151157",
    "campusCode": "0001",
    "name": "大埔浸信會幼稚園",
    "nameEn": "TAI PO BAPTIST KINDERGARTEN",
    "district": "新界",
    "district18": "大埔區",
    "address": "新界大埔鄉事會坊３２－３８號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_151157000111",
      "edb_151157000112"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "project_learn",
      "language_dev"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26512311",
    "website": "http://tpbkg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5441670001",
    "schoolCode": "544167",
    "campusCode": "0001",
    "name": "大埔浸信會幼稚園天澤邨分校",
    "nameEn": "TAI PO BAPTIST KINDERGARTEN TIN CHAK ESTATE BRANCH",
    "district": "新界",
    "district18": "元朗區",
    "address": "新界元朗天水圍天澤邨澤星樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_544167000111",
      "edb_544167000112",
      "edb_544167000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "project_learn",
      "holistic",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24863300",
    "website": "https://www.tpbkg-tceb.edu.hk/tc/index.php",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_1591660001",
    "schoolCode": "159166",
    "campusCode": "0001",
    "name": "大埔浸信會幼稚園運頭塘邨分校",
    "nameEn": "TAI PO BAPTIST KINDERGARTEN WAN TAU TONG ESTATE BRANCH",
    "district": "新界",
    "district18": "大埔區",
    "address": "新界大埔運頭塘邨運亨樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_159166000111",
      "edb_159166000112",
      "edb_159166000113"
    ],
    "pedagogyTags": [
      "project_learn",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26380018",
    "website": "http://www.wtt-baptistkg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_1508600003",
    "schoolCode": "150860",
    "campusCode": "0003",
    "name": "大埔禮賢會幼稚園",
    "nameEn": "TAI PO RHENISH CHURCH KINDERGARTEN",
    "district": "新界",
    "district18": "大埔區",
    "address": "新界大埔富蝶邨鳳蝶樓地下1號幼稚園",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_150860000311",
      "edb_150860000312",
      "edb_150860000313"
    ],
    "pedagogyTags": [
      "play_explore"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26574168",
    "website": "",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_1508600002",
    "schoolCode": "150860",
    "campusCode": "0002",
    "name": "大埔禮賢會幼稚園",
    "nameEn": "TAI PO RHENISH CHURCH KINDERGARTEN",
    "district": "新界",
    "district18": "大埔區",
    "address": "新界大埔汀角路7號地下及1-2字樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_150860000211",
      "edb_150860000212",
      "edb_150860000213"
    ],
    "pedagogyTags": [
      "play_explore"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "21440708",
    "website": "http://www.rcktp.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_1588280001",
    "schoolCode": "158828",
    "campusCode": "0001",
    "name": "大埔商會幼稚園",
    "nameEn": "TAI PO MERCHANTS ASSOCIATION KINDERGARTEN",
    "district": "新界",
    "district18": "大埔區",
    "address": "新界大埔富亨邨第二座地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_158828000111",
      "edb_158828000112",
      "edb_158828000113"
    ],
    "pedagogyTags": [
      "language_dev"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26643280",
    "website": "http://www.tpmak.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_1588950001",
    "schoolCode": "158895",
    "campusCode": "0001",
    "name": "大埔循道衛理幼稚園",
    "nameEn": "TAI PO METHODIST KINDERGARTEN",
    "district": "新界",
    "district18": "大埔區",
    "address": "新界大埔富亨邨亨翠樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_158895000111",
      "edb_158895000112",
      "edb_158895000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "language_dev"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26607536",
    "website": "http://www.tpmk.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_2315170001",
    "schoolCode": "231517",
    "campusCode": "0001",
    "name": "大衛幼稚園",
    "nameEn": "DAVID (EXODUS) KINDERGARTEN",
    "district": "新界",
    "district18": "沙田區",
    "address": "新界沙田大圍顯泰街瑞峰花園平台",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_231517000111",
      "edb_231517000112"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26990100",
    "website": "http://www.davidexodus.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "low",
      "languageConfidence": "high",
      "needsReview": true
    }
  },
  {
    "id": "edb_5671160001",
    "schoolCode": "567116",
    "campusCode": "0001",
    "name": "德寶國際幼兒學校（寶盈花園）",
    "nameEn": "DEBORAH INTERNATIONAL PRE-SCHOOL (BAUHINIA GARDEN)",
    "district": "新界",
    "district18": "西貢區",
    "address": "新界將軍澳唐俊街１１號寶盈花園幼稚園大樓地下（部分）",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_567116000111",
      "edb_567116000112",
      "edb_567116000113"
    ],
    "pedagogyTags": [
      "holistic"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "34034393",
    "website": "http://www.deborah.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "low",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": true
    }
  },
  {
    "id": "edb_5671080001",
    "schoolCode": "567108",
    "campusCode": "0001",
    "name": "德寶國際幼兒學校（將軍澳）",
    "nameEn": "DEBORAH INTERNATIONAL PRE-SCHOOL (TSEUNG KWAN O)",
    "district": "新界",
    "district18": "西貢區",
    "address": "新界將軍澳唐明街１號富康花園幼稚園大樓地下（部分）",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_567108000111",
      "edb_567108000112",
      "edb_567108000113"
    ],
    "pedagogyTags": [
      "holistic"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "22177933",
    "website": "http://www.deborah.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "low",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": true
    }
  },
  {
    "id": "edb_5301310002",
    "schoolCode": "530131",
    "campusCode": "0002",
    "name": "德寶英文幼稚園（將軍澳）",
    "nameEn": "DEBORAH ENGLISH KINDERGARTEN (TSEUNG KWAN O)",
    "district": "新界",
    "district18": "西貢區",
    "address": "新界將軍澳唐俊街１１號寶盈花園幼稚園大樓（幼兒中心專用部份除外）",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_530131000211",
      "edb_530131000212",
      "edb_530131000213"
    ],
    "pedagogyTags": [
      "holistic"
    ],
    "languageEnv": [
      "english",
      "bilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "22177933",
    "website": "http://www.deborah.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "low",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": true
    }
  },
  {
    "id": "edb_5301310001",
    "schoolCode": "530131",
    "campusCode": "0001",
    "name": "德寶英文幼稚園（將軍澳）",
    "nameEn": "DEBORAH ENGLISH KINDERGARTEN (TSEUNG KWAN O)",
    "district": "新界",
    "district18": "西貢區",
    "address": "新界將軍澳富康花園幼稚園大樓（將軍澳地段５０號）（幼兒中心專用部份除外）",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_530131000111",
      "edb_530131000112",
      "edb_530131000113"
    ],
    "pedagogyTags": [
      "holistic"
    ],
    "languageEnv": [
      "english",
      "bilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "22177933",
    "website": "http://www.deborah.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "low",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": true
    }
  },
  {
    "id": "edb_6162900001",
    "schoolCode": "616290",
    "campusCode": "0001",
    "name": "德萃幼稚園(馬鞍山)",
    "nameEn": "ST. HILARY'S KINDERGARTEN (MA ON SHAN)",
    "district": "新界",
    "district18": "沙田區",
    "address": "新界沙田馬鞍山鞍駿街15號雅濤居1樓4-12號舖",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_616290000111",
      "edb_616290000112"
    ],
    "pedagogyTags": [],
    "languageEnv": [],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23381780",
    "website": "http://kindergarten.sthilarys.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "low",
      "languageConfidence": "low",
      "needsReview": true
    }
  },
  {
    "id": "edb_6020000001",
    "schoolCode": "602000",
    "campusCode": "0001",
    "name": "德怡國際幼稚園(元朗)",
    "nameEn": "TOPKIDS INTERNATIONAL KINDERGARTEN (YUEN LONG)",
    "district": "新界",
    "district18": "元朗區",
    "address": "新界元朗元朗泰祥街14號盛發大廈地下(部份)及1樓",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_602000000111",
      "edb_602000000112",
      "edb_602000000113"
    ],
    "pedagogyTags": [
      "holistic"
    ],
    "languageEnv": [
      "putonghua",
      "english",
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "",
    "website": "",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5635600001",
    "schoolCode": "563560",
    "campusCode": "0001",
    "name": "東華三院方麗明幼兒園",
    "nameEn": "TWGHS FONG LAI MING NURSERY SCHOOL",
    "district": "新界",
    "district18": "大埔區",
    "address": "新界大埔墟鄉事會街大埔社區中心６樓及天台",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_563560000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "language_dev"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26532393",
    "website": "http://www.tungwah.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5641500001",
    "schoolCode": "564150",
    "campusCode": "0001",
    "name": "東華三院方譚遠良幼兒園",
    "nameEn": "TWGHS FONG TAM YUEN LEUNG NURSERY SCHOOL",
    "district": "新界",
    "district18": "屯門區",
    "address": "新界屯門田景邨田裕樓地下１－５號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_564150000113"
    ],
    "pedagogyTags": [
      "language_dev"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24610774",
    "website": "http://www.tungwahcsd.org",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_1567440001",
    "schoolCode": "156744",
    "campusCode": "0001",
    "name": "東華三院高德根紀念幼稚園",
    "nameEn": "T.W.G.HS. KO TECK KIN MEMORIAL KINDERGARTEN",
    "district": "新界",
    "district18": "屯門區",
    "address": "新界屯門友愛邨愛明樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_156744000111",
      "edb_156744000112",
      "edb_156744000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "language_dev",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24501336",
    "website": "http://www.twghktkkg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5635440001",
    "schoolCode": "563544",
    "campusCode": "0001",
    "name": "東華三院洪王家琪幼兒園",
    "nameEn": "TWGHS HUNG WONG KAR GEE NURSERY SCHOOL",
    "district": "新界",
    "district18": "北區",
    "address": "新界粉嶺祥華邨祥和樓地下１０４－１０８及１１３－１１５號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_563544000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "language_dev"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26761308",
    "website": "http://www.tungwah.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_1573090001",
    "schoolCode": "157309",
    "campusCode": "0001",
    "name": "東華三院洪王家琪幼稚園",
    "nameEn": "TUNG WAH GROUP OF HOSPITALS HUNG WONG KAR GEE KINDERGARTEN",
    "district": "新界",
    "district18": "大埔區",
    "address": "新界大埔大元邨泰德樓三樓309-316室",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_157309000111",
      "edb_157309000112",
      "edb_157309000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "project_learn",
      "language_dev"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english",
      "native_english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26655111",
    "website": "http://www.twghhwkgkg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_1589760001",
    "schoolCode": "158976",
    "campusCode": "0001",
    "name": "東華三院黃朱惠芬幼稚園",
    "nameEn": "TUNG WAH GROUP OF HOSPITALS WONG CHU WAI FUN KINDERGARTEN",
    "district": "新界",
    "district18": "元朗區",
    "address": "新界天水圍天耀邨耀康樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_158976000111",
      "edb_158976000112",
      "edb_158976000113"
    ],
    "pedagogyTags": [
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24450423",
    "website": "http://www.twghwcwfkg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5641250001",
    "schoolCode": "564125",
    "campusCode": "0001",
    "name": "東華三院九龍崇德社幼兒園",
    "nameEn": "TWGHS ZONTA CLUB OF KOWLOON NURSERY SCHOOL",
    "district": "新界",
    "district18": "元朗區",
    "address": "新界天水圍天悅邨服務設施大樓1樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_564125000113"
    ],
    "pedagogyTags": [
      "language_dev"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24480031",
    "website": "https://zckns.tungwahcsd.org/tc/page/home-page",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_1580540001",
    "schoolCode": "158054",
    "campusCode": "0001",
    "name": "東華三院李黃慶祥紀念幼稚園",
    "nameEn": "TUNG WAH GROUP OF HOSPITALS LEE WONG HING-CHEUNG MEMORIAL KINDERGARTEN",
    "district": "新界",
    "district18": "屯門區",
    "address": "新界屯門山景邨第三期景麗樓（第９座）地下Ａ及Ｂ翼",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_158054000111",
      "edb_158054000112",
      "edb_158054000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "project_learn",
      "project_learn",
      "language_dev",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24617380",
    "website": "http://www.twghlwhckg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_1589840001",
    "schoolCode": "158984",
    "campusCode": "0001",
    "name": "東華三院力勤幼稚園",
    "nameEn": "TUNG WAH GROUP OF HOSPITALS NICKON KINDERGARTEN",
    "district": "新界",
    "district18": "西貢區",
    "address": "新界將軍澳浩明苑地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_158984000111",
      "edb_158984000112",
      "edb_158984000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27060202",
    "website": "http://www.twghnkkg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_1567520001",
    "schoolCode": "156752",
    "campusCode": "0001",
    "name": "東華三院廖恩德紀念幼稚園",
    "nameEn": "TUNG WAH GROUP OF HOSPITALS LIU YAN TAK MEMORIAL KINDERGARTEN",
    "district": "新界",
    "district18": "沙田區",
    "address": "新界沙田禾輋邨美和樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_156752000111",
      "edb_156752000112",
      "edb_156752000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "language_dev"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26060533",
    "website": "http://www.twghlytkg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_1575110001",
    "schoolCode": "157511",
    "campusCode": "0001",
    "name": "東華三院呂馮鳳紀念幼稚園",
    "nameEn": "TUNG WAH GROUP OF HOSPITALS LUI FUNG FAUNG MEMORIAL KINDERGARTEN",
    "district": "新界",
    "district18": "沙田區",
    "address": "新界沙田隆亨邨賞心樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_157511000111",
      "edb_157511000112",
      "edb_157511000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26979973",
    "website": "http://www.twghlffkg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_6110930001",
    "schoolCode": "611093",
    "campusCode": "0001",
    "name": "東華三院馬陳家歡幼稚園",
    "nameEn": "TWGHS KATHERINE MA KINDERGARTEN",
    "district": "新界",
    "district18": "屯門區",
    "address": "新界屯門欣田邨逸田樓（第２座）地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_611093000111",
      "edb_611093000112"
    ],
    "pedagogyTags": [
      "play_explore",
      "language_dev",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english",
      "bilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "28857313",
    "website": "http://www.katherine-kindergarten.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_1573840001",
    "schoolCode": "157384",
    "campusCode": "0001",
    "name": "東華三院馬陳景霞幼稚園",
    "nameEn": "TUNG WAH GROUP OF HOSPITALS CHAN KING HAR KINDERGARTEN",
    "district": "新界",
    "district18": "沙田區",
    "address": "新界沙田新翠邨新月樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_157384000111",
      "edb_157384000112",
      "edb_157384000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "language_dev"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26044380",
    "website": "http://www.twghckhkg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5641090001",
    "schoolCode": "564109",
    "campusCode": "0001",
    "name": "東華三院南九龍獅子會幼兒園",
    "nameEn": "TWGHS LIONS CLUB OF SOUTH KOWLOON NURSERY SCHOOL",
    "district": "新界",
    "district18": "沙田區",
    "address": "新界沙田馬鞍山頌安邨頌和樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_564109000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26303555",
    "website": "http://www.tungwah.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5635950001",
    "schoolCode": "563595",
    "campusCode": "0001",
    "name": "東華三院田家炳幼兒園",
    "nameEn": "TWGHS TIN KA PING NURSERY SCHOOL",
    "district": "新界",
    "district18": "屯門區",
    "address": "新界屯門蝴蝶邨蝶翎樓2樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_563595000113"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "play_explore",
      "language_dev"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24667454",
    "website": "https://tkpns.tungwahcsd.org/tc/page/home",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5425470001",
    "schoolCode": "542547",
    "campusCode": "0001",
    "name": "東華三院王胡麗明幼稚園",
    "nameEn": "TUNG WAH GROUP OF HOSPITALS WONG WU LAI MING KINDERGARTEN",
    "district": "新界",
    "district18": "葵青區",
    "address": "新界葵涌石籬（二）邨石富樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_542547000111",
      "edb_542547000112",
      "edb_542547000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "language_dev",
      "language_dev",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "putonghua",
      "english",
      "bilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "31266606",
    "website": "http://www.twghwwlmkg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_3257670002",
    "schoolCode": "325767",
    "campusCode": "0002",
    "name": "東華三院文頴怡幼稚園",
    "nameEn": "TWGHS GINNY MAN KINDERGARTEN",
    "district": "新界",
    "district18": "北區",
    "address": "新界粉嶺皇后山邨皇匯樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_325767000211",
      "edb_325767000212",
      "edb_325767000213"
    ],
    "pedagogyTags": [
      "play_explore",
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23484438",
    "website": "https://www.twghfsftkg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5593850001",
    "schoolCode": "559385",
    "campusCode": "0001",
    "name": "東華三院香港華都獅子會幼稚園",
    "nameEn": "TWGHS LIONS CLUB OF METROPOLITAN HONG KONG KINDERGARTEN",
    "district": "新界",
    "district18": "西貢區",
    "address": "新界將軍澳健明邨明宙樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_559385000111",
      "edb_559385000112",
      "edb_559385000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "language_dev",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "31883565",
    "website": "http://www.twghlcmkg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5641410001",
    "schoolCode": "564141",
    "campusCode": "0001",
    "name": "東華三院香港鑪峯獅子會幼兒園",
    "nameEn": "TWGHS LIONS CLUB OF THE PEAK HONG KONG NURSERY SCHOOL",
    "district": "新界",
    "district18": "葵青區",
    "address": "新界葵盛西邨第10座地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_564141000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24270128",
    "website": "https://lcphkns.tungwahcsd.org/en/homepage",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_1585340001",
    "schoolCode": "158534",
    "campusCode": "0001",
    "name": "東華三院徐展堂幼稚園",
    "nameEn": "TUNG WAH GROUP OF HOSPITALS TSUI TSIN TONG KINDERGARTEN",
    "district": "新界",
    "district18": "北區",
    "address": "新界上水天平邨第六座天喜樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_158534000111",
      "edb_158534000112",
      "edb_158534000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "trilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26713399",
    "website": "http://www.twghtttkg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5422960001",
    "schoolCode": "542296",
    "campusCode": "0001",
    "name": "東涌浸信會幼稚園",
    "nameEn": "TUNG CHUNG BAPTIST KINDERGARTEN",
    "district": "新界",
    "district18": "離島區",
    "address": "新界大嶼山東涌逸東邨２號停車場四樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_542296000111",
      "edb_542296000112",
      "edb_542296000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "31417101",
    "website": "http://www.tcbaptkg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5430040001",
    "schoolCode": "543004",
    "campusCode": "0001",
    "name": "東涌天主教幼稚園",
    "nameEn": "TUNG CHUNG CATHOLIC KINDERGARTEN",
    "district": "新界",
    "district18": "離島區",
    "address": "新界大嶼山東涌逸東邨２號停車場２樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_543004000111",
      "edb_543004000112",
      "edb_543004000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english",
      "native_english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "31417355",
    "website": "http://www.tungchungckg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_6057940001",
    "schoolCode": "605794",
    "campusCode": "0001",
    "name": "多多國際幼稚園（形點）",
    "nameEn": "TUTOR TIME INTERNATIONAL KINDERGARTEN (YOHO)",
    "district": "新界",
    "district18": "元朗區",
    "address": "新界元朗元龍街９號形點地下及閣樓Ｇ０１１號舖",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_605794000111",
      "edb_605794000112"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23928188",
    "website": "http://www.tutortime.com.hk",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "low",
      "languageConfidence": "high",
      "needsReview": true
    }
  },
  {
    "id": "edb_1562300001",
    "schoolCode": "156230",
    "campusCode": "0001",
    "name": "粉嶺浸信會呂明才幼稚園",
    "nameEn": "FANLING BAPTIST CHURCH LUI MING CHOI KINDERGARTEN",
    "district": "新界",
    "district18": "北區",
    "address": "新界粉嶺沙頭角道３號（１０１課室及有蓋操場除外）",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_156230000111",
      "edb_156230000112"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english",
      "native_english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26694315",
    "website": "http://www.fbclmckg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_1534510001",
    "schoolCode": "153451",
    "campusCode": "0001",
    "name": "粉嶺神召會幼稚園",
    "nameEn": "THE FANLING ASSEMBLIES OF GOD KINDERGARTEN",
    "district": "新界",
    "district18": "北區",
    "address": "新界粉嶺馬會道３０１號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_153451000111",
      "edb_153451000112"
    ],
    "pedagogyTags": [
      "project_learn",
      "project_learn"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26698202",
    "website": "http://www.aogkg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_6136650001",
    "schoolCode": "613665",
    "campusCode": "0001",
    "name": "楓葉小熊加拿大國際幼稚園",
    "nameEn": "MAPLE BEAR CANADIAN INTERNATIONAL KINDERGARTEN",
    "district": "新界",
    "district18": "西貢區",
    "address": "新界將軍澳唐賢街29號藍塘傲地下7號舖",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_613665000111",
      "edb_613665000112",
      "edb_613665000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "english",
      "bilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "28134887",
    "website": "https://www.maplebear.hk",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "medium",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_6163110001",
    "schoolCode": "616311",
    "campusCode": "0001",
    "name": "楓葉小熊加拿大國際幼稚園(康城)",
    "nameEn": "MAPLE BEAR CANADIAN INTERNATIONAL KINDERGARTEN (LOHAS)",
    "district": "新界",
    "district18": "西貢區",
    "address": "新界將軍澳康城路1號日出康城領都L1樓幼稚園",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_616311000111",
      "edb_616311000112"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "english",
      "bilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26998588",
    "website": "https://www.maplebear.hk",
    "dataQuality": {
      "curriculumConfidence": "low",
      "pedagogyConfidence": "medium",
      "languageConfidence": "high",
      "needsReview": true
    }
  },
  {
    "id": "edb_1583640001",
    "schoolCode": "158364",
    "campusCode": "0001",
    "name": "鳳溪幼稚園",
    "nameEn": "FUNG KAI KINDERGARTEN",
    "district": "新界",
    "district18": "北區",
    "address": "新界上水馬會道２１號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_158364000111",
      "edb_158364000112"
    ],
    "pedagogyTags": [
      "play_explore"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26719919",
    "website": "http://fkkgfungkai.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5414270001",
    "schoolCode": "541427",
    "campusCode": "0001",
    "name": "佛教慈光幼稚園",
    "nameEn": "BUDDHIST CHI KWONG KINDERGARTEN",
    "district": "新界",
    "district18": "元朗區",
    "address": "新界天水圍天悅邨服務設施大樓三樓二號幼稚園",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_541427000111",
      "edb_541427000112"
    ],
    "pedagogyTags": [
      "project_learn"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26179981",
    "website": "http://www.bckkg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_1572520001",
    "schoolCode": "157252",
    "campusCode": "0001",
    "name": "佛教沈東福幼稚園",
    "nameEn": "BUDDHIST SUM TUNG FOOK KINDERGARTEN",
    "district": "新界",
    "district18": "北區",
    "address": "新界上水彩園邨彩湖樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_157252000111",
      "edb_157252000112",
      "edb_157252000113"
    ],
    "pedagogyTags": [
      "project_learn",
      "project_learn",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26727258",
    "website": "http://www.sumtungfookkg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5175180001",
    "schoolCode": "517518",
    "campusCode": "0001",
    "name": "佛教張梅桂幼稚園",
    "nameEn": "BUDDHIST CHEUNG MUI KWAI KINDERGARTEN",
    "district": "新界",
    "district18": "離島區",
    "address": "新界大嶼山大澳龍田邨第二期幼稚園座KG01室",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_517518000111",
      "edb_517518000112",
      "edb_517518000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn"
    ],
    "languageEnv": [
      "trilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "29856544",
    "website": "https://www.bcmk.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5562200001",
    "schoolCode": "556220",
    "campusCode": "0001",
    "name": "佛教真如李琴芝紀念幼稚園",
    "nameEn": "BUDDHIST CHUN YUE LEE KAM ZI MEMORIAL KINDERGARTEN",
    "district": "新界",
    "district18": "離島區",
    "address": "新界大嶼山東涌逸東商場二樓五號幼稚園校舍",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_556220000111",
      "edb_556220000112",
      "edb_556220000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24322088",
    "website": "http://www.bcykgtc.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_1524980001",
    "schoolCode": "152498",
    "campusCode": "0001",
    "name": "福來邨錦全幼稚園",
    "nameEn": "FUK LOY CHUEN KAM CHUEN KINDERGARTEN",
    "district": "新界",
    "district18": "荃灣區",
    "address": "新界荃灣福來邨永康樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_152498000111",
      "edb_152498000112",
      "edb_152498000113"
    ],
    "pedagogyTags": [
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "",
    "website": "",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_1589090001",
    "schoolCode": "158909",
    "campusCode": "0001",
    "name": "富亨浸信會呂郭碧鳳幼稚園",
    "nameEn": "FU HENG BAPTIST LUI KWOK PAT FONG KINDERGARTEN",
    "district": "新界",
    "district18": "大埔區",
    "address": "新界大埔富亨邨亨泰樓第一座地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_158909000111",
      "edb_158909000112",
      "edb_158909000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore"
    ],
    "languageEnv": [
      "english",
      "bilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26608128",
    "website": "http://www.fuhengkg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_1562720001",
    "schoolCode": "156272",
    "campusCode": "0001",
    "name": "富瑤幼稚園",
    "nameEn": "FU YIU KINDERGARTEN",
    "district": "新界",
    "district18": "葵青區",
    "address": "新界葵涌麗瑤邨富瑤樓地下南西及北翼",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_156272000111",
      "edb_156272000112",
      "edb_156272000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27451312",
    "website": "http://www.fy.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5639000001",
    "schoolCode": "563900",
    "campusCode": "0001",
    "name": "港九街坊婦女會丁孫慧珠幼稚園",
    "nameEn": "HONG KONG & KOWLOON KAIFONG WOMEN'S ASSOCIATION TING SUN HUI CHIU KINDERGARTEN",
    "district": "新界",
    "district18": "沙田區",
    "address": "新界沙田美林邨美楊樓１０１－１１６號地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_563900000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26056575",
    "website": "http://www.tshckg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_1575970001",
    "schoolCode": "157597",
    "campusCode": "0001",
    "name": "港九街坊婦女會孫方中幼稚園",
    "nameEn": "HONG KONG & KOWLOON KAIFONG WOMEN'S ASSOCIATION SUN FONG CHUNG KINDERGARTEN",
    "district": "新界",
    "district18": "沙田區",
    "address": "新界沙田隆亨邨慧心樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_157597000111",
      "edb_157597000112",
      "edb_157597000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26989517",
    "website": "http://www.sfckglh.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5643200001",
    "schoolCode": "564320",
    "campusCode": "0001",
    "name": "港九街坊婦女會孫方中幼稚園（穗禾苑）",
    "nameEn": "HONG KONG & KOWLOON KAIFONG WOMEN'S ASSOCIATION SUN FONG CHUNG KINDERGARTEN (SUI WO COURT)",
    "district": "新界",
    "district18": "沙田區",
    "address": "新界沙田穗禾苑商場３７號地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_564320000113"
    ],
    "pedagogyTags": [
      "play_explore"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26041381",
    "website": "http://www.sfckgsw.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5428300001",
    "schoolCode": "542830",
    "campusCode": "0001",
    "name": "觀塘浸信會彩明幼稚園",
    "nameEn": "KWUN TONG BAPTIST CHURCH CHOI MING KINDERGARTEN",
    "district": "新界",
    "district18": "西貢區",
    "address": "新界將軍澳彩明苑彩耀閣地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_542830000111",
      "edb_542830000112",
      "edb_542830000113"
    ],
    "pedagogyTags": [
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "english",
      "native_english",
      "bilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23457744",
    "website": "http://www.choiming.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_6219860001",
    "schoolCode": "621986",
    "campusCode": "0001",
    "name": "光愛樂幼稚園(顯徑)",
    "nameEn": "LIGHT AND LOVE HOME HAPPY KINDERGARTEN (HIN KENG)",
    "district": "新界",
    "district18": "沙田區",
    "address": "新界沙田顯徑邨顯貴樓地下KG01及G01舖",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_621986000111",
      "edb_621986000112",
      "edb_621986000113"
    ],
    "pedagogyTags": [
      "language_dev",
      "language_dev"
    ],
    "languageEnv": [
      "bilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "",
    "website": "https://llhome.org.hk/chi/llhhkghk_home.html",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_1587040001",
    "schoolCode": "158704",
    "campusCode": "0001",
    "name": "廣林浸信會呂郭碧鳳幼稚園",
    "nameEn": "KWONG LAM BAPTIST LUI KWOK PAT FONG KINDERGARTEN",
    "district": "新界",
    "district18": "沙田區",
    "address": "新界沙田廣林苑興林閣地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_158704000111",
      "edb_158704000112",
      "edb_158704000113"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "project_learn",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26353036",
    "website": "http://www.kwonglambaptist-kg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5272110001",
    "schoolCode": "527211",
    "campusCode": "0001",
    "name": "國民學校中英文幼稚園",
    "nameEn": "KWOK MAN SCHOOL ANGLO-CHINESE KINDERGARTEN",
    "district": "新界",
    "district18": "離島區",
    "address": "香港長洲長碩路33號碧濤軒商業樓地下(包括幼兒中心)",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_527211000111",
      "edb_527211000112",
      "edb_527211000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn"
    ],
    "languageEnv": [
      "trilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "29810066",
    "website": "http://kmvn.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5908000001",
    "schoolCode": "590800",
    "campusCode": "0001",
    "name": "哈羅香港國際學校",
    "nameEn": "HARROW INTERNATIONAL SCHOOL HONG KONG",
    "district": "新界",
    "district18": "屯門區",
    "address": "新界屯門青盈路３８號",
    "nature": "international",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_590800000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "28249099",
    "website": "http://www.harrowschool.hk",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "low",
      "languageConfidence": "high",
      "needsReview": true
    }
  },
  {
    "id": "edb_5651050001",
    "schoolCode": "565105",
    "campusCode": "0001",
    "name": "海濱方方樂趣幼稚園",
    "nameEn": "RIVIERA FUNFUL KINDERGARTEN",
    "district": "新界",
    "district18": "荃灣區",
    "address": "新界荃灣海濱花園Ｅ號平台４字樓Ｂ室",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_565105000111",
      "edb_565105000112",
      "edb_565105000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24082861",
    "website": "http://www.funful.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "low",
      "languageConfidence": "low",
      "needsReview": true
    }
  },
  {
    "id": "edb_5375940001",
    "schoolCode": "537594",
    "campusCode": "0001",
    "name": "翰林幼稚園(天水圍)",
    "nameEn": "ACADEMY KINDERGARTEN (TIN SHUI WAI)",
    "district": "新界",
    "district18": "元朗區",
    "address": "新界天水圍天頌苑服務設施大樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_537594000111",
      "edb_537594000112",
      "edb_537594000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "22530099",
    "website": "https://www.academy.edu.hk/?lang=en",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5244410001",
    "schoolCode": "524441",
    "campusCode": "0001",
    "name": "合一堂單家傳紀念幼稚園",
    "nameEn": "HOP YAT CHURCH SHIN KA CHUEN MEMORIAL KINDERGARTEN",
    "district": "新界",
    "district18": "沙田區",
    "address": "新界沙田馬鞍山鞍誠街２６號（包括幼兒中心）",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_524441000111",
      "edb_524441000112",
      "edb_524441000113"
    ],
    "pedagogyTags": [
      "project_learn",
      "language_dev"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26441584",
    "website": "http://hyckg.ccc.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5654310001",
    "schoolCode": "565431",
    "campusCode": "0001",
    "name": "恒安浸信會幼兒學校",
    "nameEn": "HENG ON BAPTIST NURSERY SCHOOL",
    "district": "新界",
    "district18": "沙田區",
    "address": "新界沙田馬鞍山恒安邨恒星樓地下１－５號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "WD"
    ],
    "variantIds": [
      "edb_565431000111",
      "edb_565431000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore"
    ],
    "languageEnv": [
      "putonghua",
      "english",
      "native_english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26428939",
    "website": "http://www.hobns.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5198710002",
    "schoolCode": "519871",
    "campusCode": "0002",
    "name": "弘志幼稚園",
    "nameEn": "DISCOVERY MIND KINDERGARTEN",
    "district": "新界",
    "district18": "離島區",
    "address": "新界大嶼山愉景灣海澄湖畔路92號102號舖",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_519871000211",
      "edb_519871000212"
    ],
    "pedagogyTags": [],
    "languageEnv": [],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "29878088",
    "website": "https://discoverymind.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "low",
      "languageConfidence": "low",
      "needsReview": true
    }
  },
  {
    "id": "edb_5781930001",
    "schoolCode": "578193",
    "campusCode": "0001",
    "name": "弘志幼稚園(東涌)",
    "nameEn": "DISCOVERY MIND KINDERGARTEN (TUNG CHUNG)",
    "district": "新界",
    "district18": "離島區",
    "address": "新界東涌東涌海濱路８號海堤灣畔商場地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_578193000111",
      "edb_578193000112"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "putonghua",
      "english",
      "bilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "29878070",
    "website": "http://discoverymind.edu.hk/%e6%9d%b1%e6%b6%8c-%e5%b9%bc%e5%85%92%e5%9c%92%e5%8f%8a%e5%b9%bc%e7%a8%9a%e5%9c%92/?lang=zh-hant",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5647610001",
    "schoolCode": "564761",
    "campusCode": "0001",
    "name": "宏福幼稚園",
    "nameEn": "TIVOLI KINDERGARTEN",
    "district": "新界",
    "district18": "葵青區",
    "address": "新界青衣青怡花園青怡廣場１樓２１－２５號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_564761000111",
      "edb_564761000112",
      "edb_564761000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24322223",
    "website": "http://www.kindergarten.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "low",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": true
    }
  },
  {
    "id": "edb_6234740001",
    "schoolCode": "623474",
    "campusCode": "0001",
    "name": "宏福幼稚園(青富)",
    "nameEn": "TIVOLI KINDERGARTEN (CHING FU)",
    "district": "新界",
    "district18": "葵青區",
    "address": "新界青衣青富苑A座地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_623474000111",
      "edb_623474000112",
      "edb_623474000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "trilingual",
      "putonghua"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "",
    "website": "https://www.kindergarten.edu.hk/?lang=zh",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5191030001",
    "schoolCode": "519103",
    "campusCode": "0001",
    "name": "宏福中英文幼稚園",
    "nameEn": "TIVOLI ANGLO-CHINESE KINDERGARTEN",
    "district": "新界",
    "district18": "葵青區",
    "address": "新界青衣青敬路７５號宏福花園４座地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_519103000111",
      "edb_519103000112",
      "edb_519103000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "trilingual",
      "putonghua"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24326628",
    "website": "http://www.kindergarten.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5904010001",
    "schoolCode": "590401",
    "campusCode": "0001",
    "name": "宏廣國際幼稚園",
    "nameEn": "WELLCOME INTERNATIONAL KINDERGARTEN",
    "district": "新界",
    "district18": "屯門區",
    "address": "新界屯門藍地福亨村路８號豫豐花園地下幼稚園及幼兒園",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "british",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_590401000111",
      "edb_590401000112",
      "edb_590401000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "bilingual",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "28132121",
    "website": "https://wellcomekg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "medium",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5920800001",
    "schoolCode": "592080",
    "campusCode": "0001",
    "name": "歡樂創意幼稚園",
    "nameEn": "FUN CREATIVE KINDERGARTEN",
    "district": "新界",
    "district18": "西貢區",
    "address": "新界西貢將軍澳富寧花園第一座地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_592080000111",
      "edb_592080000112",
      "edb_592080000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "project_learn",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27027838",
    "website": "https://www.funcreative.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_1539310001",
    "schoolCode": "153931",
    "campusCode": "0001",
    "name": "惠平幼稚園",
    "nameEn": "WAI PENG KINDERGARTEN SCHOOL",
    "district": "新界",
    "district18": "離島區",
    "address": "新界坪洲志仁里８號Ｃ",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_153931000111",
      "edb_153931000112",
      "edb_153931000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "29830643",
    "website": "http://www.waipeng.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "low",
      "languageConfidence": "low",
      "needsReview": true
    }
  },
  {
    "id": "edb_5756400001",
    "schoolCode": "575640",
    "campusCode": "0001",
    "name": "基督教安得兒幼稚園",
    "nameEn": "CHRISTIAN ADRIANNE KINDERGARTEN",
    "district": "新界",
    "district18": "荃灣區",
    "address": "新界荃灣麗城花園第一期１座閣樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_575640000111",
      "edb_575640000112",
      "edb_575640000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24981200",
    "website": "http://www.christianadrianne.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5980380001",
    "schoolCode": "598038",
    "campusCode": "0001",
    "name": "基督教安得兒幼稚園(灣景)",
    "nameEn": "CHRISTIAN ADRIANNE KINDERGARTEN (BAYVIEW)",
    "district": "新界",
    "district18": "荃灣區",
    "address": "新界荃灣青山公路６３３號灣景花園地庫二層",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_598038000111",
      "edb_598038000112",
      "edb_598038000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24991233",
    "website": "http://www.christianadrianne.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5194990001",
    "schoolCode": "519499",
    "campusCode": "0001",
    "name": "基督教粉嶺神召會恩光幼稚園",
    "nameEn": "FANLING ASSEMBLY OF GOD CHURCH GRACE LIGHT KINDERGARTEN",
    "district": "新界",
    "district18": "北區",
    "address": "新界粉嶺景盛苑賢景閣地下Ｂ及Ｃ翼",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_519499000111",
      "edb_519499000112",
      "edb_519499000113"
    ],
    "pedagogyTags": [
      "project_learn",
      "project_learn",
      "holistic",
      "holistic",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "putonghua",
      "english",
      "native_english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26826933",
    "website": "http://www.gracelight.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5425980002",
    "schoolCode": "542598",
    "campusCode": "0002",
    "name": "基督教國際學校－幼稚園",
    "nameEn": "INTERNATIONAL CHRISTIAN SCHOOL - KINDERGARTEN",
    "district": "新界",
    "district18": "沙田區",
    "address": "新界沙田馬鞍山錦豐苑錦荷閣（Ｈ座）地下",
    "nature": "international",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_542598000211",
      "edb_542598000212"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "31561234",
    "website": "http://www.ics.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "medium",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5549010001",
    "schoolCode": "554901",
    "campusCode": "0001",
    "name": "基督教樂道幼稚園",
    "nameEn": "LOCK TAO CHRISTIAN KINDERGARTEN",
    "district": "新界",
    "district18": "西貢區",
    "address": "新界將軍澳健明邨彩明商場1號平台1號幼稚園校舍",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_554901000111",
      "edb_554901000112",
      "edb_554901000113"
    ],
    "pedagogyTags": [
      "project_learn",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "",
    "website": "http://www.locktao.org/kindergarten",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5438610001",
    "schoolCode": "543861",
    "campusCode": "0001",
    "name": "基督教神召會合一堂幼稚園",
    "nameEn": "ASSEMBLY OF GOD UNION CHURCH KINDERGARTEN",
    "district": "新界",
    "district18": "沙田區",
    "address": "新界沙田愉翠苑二期停車場及服務設施大樓一樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_543861000111",
      "edb_543861000112"
    ],
    "pedagogyTags": [
      "play_explore",
      "holistic"
    ],
    "languageEnv": [
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "22780022",
    "website": "https://www.aoguck.edu.hk/it-school/php/webcms/public/mainpage/main.php3",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5634980001",
    "schoolCode": "563498",
    "campusCode": "0001",
    "name": "基督教聖約教會司務道幼稚園",
    "nameEn": "THE MISSION COVENANT CHURCH SISTER ANNIE'S KINDERGARTEN",
    "district": "新界",
    "district18": "西貢區",
    "address": "新界將軍澳寶林邨寶泰樓地下Ａ翼及Ｂ翼１號及８號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "WD"
    ],
    "variantIds": [
      "edb_563498000111",
      "edb_563498000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27010939",
    "website": "http://www.mccsan.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5328350001",
    "schoolCode": "532835",
    "campusCode": "0001",
    "name": "基督教聖約教會小天使（天盛）幼稚園",
    "nameEn": "THE MISSION COVENANT CHURCH LITTLE ANGEL (TIN SHING) KINDERGARTEN",
    "district": "新界",
    "district18": "元朗區",
    "address": "新界天水圍天盛商場附翼１樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_532835000111",
      "edb_532835000112",
      "edb_532835000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english",
      "native_english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "21499005",
    "website": "https://www.mccts.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5640870001",
    "schoolCode": "564087",
    "campusCode": "0001",
    "name": "基督教香港崇真會安仁幼兒學校",
    "nameEn": "TSUNG TSIN MISSION OF HONG KONG ON YAN NURSERY SCHOOL",
    "district": "新界",
    "district18": "大埔區",
    "address": "新界大埔富善邨〈明雅苑停車場側〉",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_564087000113"
    ],
    "pedagogyTags": [
      "holistic"
    ],
    "languageEnv": [
      "putonghua",
      "english",
      "native_english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26612866",
    "website": "http://www.ttmssd.org/oy",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_6091370001",
    "schoolCode": "609137",
    "campusCode": "0001",
    "name": "基督教香港崇真會安頌幼稚園",
    "nameEn": "TSUNG TSIN MISSION OF HONG KONG ON CHUNG KINDERGARTEN",
    "district": "新界",
    "district18": "沙田區",
    "address": "新界沙田水泉澳邨修泉樓接鄰地下KG01號舖",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_609137000111",
      "edb_609137000112",
      "edb_609137000113"
    ],
    "pedagogyTags": [
      "holistic"
    ],
    "languageEnv": [
      "putonghua",
      "english",
      "native_english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "35953490",
    "website": "",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5645590001",
    "schoolCode": "564559",
    "campusCode": "0001",
    "name": "基督教香港信義會愛鄰幼兒學校",
    "nameEn": "ELCHK, OI LUN NURSERY SCHOOL",
    "district": "新界",
    "district18": "沙田區",
    "address": "新界沙田顯和里顯徑鄰里社區中心3樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_564559000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "project_learn"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26979238",
    "website": "http://www.lphccs.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5648180001",
    "schoolCode": "564818",
    "campusCode": "0001",
    "name": "基督教香港信義會健明幼兒學校",
    "nameEn": "ELCHK KIN MING NURSERY SCHOOL",
    "district": "新界",
    "district18": "西貢區",
    "address": "新界將軍澳健明邨明星樓地下Ｂ及Ｃ翼",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_564818000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn"
    ],
    "languageEnv": [
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "34285953",
    "website": "http://kmns.elchk.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5333510001",
    "schoolCode": "533351",
    "campusCode": "0001",
    "name": "基督教香港信義會將軍澳幼稚園",
    "nameEn": "ELCHK TSEUNG KWAN O KINDERGARTEN",
    "district": "新界",
    "district18": "西貢區",
    "address": "新界將軍澳唐明苑唐富閣地下Ｂ及Ｃ翼",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_533351000111",
      "edb_533351000112",
      "edb_533351000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "project_learn",
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "",
    "website": "http://www.elchktkokg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5648420001",
    "schoolCode": "564842",
    "campusCode": "0001",
    "name": "基督教香港信義會靈工幼兒學校",
    "nameEn": "ELCHK LING KUNG NURSERY SCHOOL",
    "district": "新界",
    "district18": "葵青區",
    "address": "新界青衣青衣邨宜居樓地下Ａ翼",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_564842000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "project_learn"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24970600",
    "website": "http://lkns.elchk.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_1512030001",
    "schoolCode": "151203",
    "campusCode": "0001",
    "name": "基督教香港信義會沙田信義幼稚園",
    "nameEn": "ELCHK SHATIN LUTHERAN KINDERGARTEN",
    "district": "新界",
    "district18": "沙田區",
    "address": "新界沙田大圍銅鑼灣山路１號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "WD"
    ],
    "variantIds": [
      "edb_151203000111",
      "edb_151203000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "trilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26044832",
    "website": "http://www.stlkg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5648260001",
    "schoolCode": "564826",
    "campusCode": "0001",
    "name": "基督教香港信義會頌安幼兒學校",
    "nameEn": "ELCHK CHUNG ON NURSERY SCHOOL",
    "district": "新界",
    "district18": "沙田區",
    "address": "新界馬鞍山錦豐苑錦蘭閣地下Ａ及Ｂ翼",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_564826000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23935674",
    "website": "http://cons.elchk.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5655710001",
    "schoolCode": "565571",
    "campusCode": "0001",
    "name": "基督教香港信義會天恩幼兒學校",
    "nameEn": "ELCHK GRACE NURSERY SCHOOL",
    "district": "新界",
    "district18": "葵青區",
    "address": "新界葵涌葵盛圍３６４號馮鎰社會服務大樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_565571000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24298181",
    "website": "http://gns.elchk.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_1576270002",
    "schoolCode": "157627",
    "campusCode": "0002",
    "name": "基督教香港信義會祥華幼稚園",
    "nameEn": "THE EVANGELICAL LUTHERAN CHURCH OF HONG KONG CHEUNG WAH KINDERGARTEN",
    "district": "新界",
    "district18": "北區",
    "address": "新界粉嶺祥華邨祥裕樓地下１０２－１０７室",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_157627000211",
      "edb_157627000212",
      "edb_157627000213"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26697531",
    "website": "",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_1576270001",
    "schoolCode": "157627",
    "campusCode": "0001",
    "name": "基督教香港信義會祥華幼稚園",
    "nameEn": "THE EVANGELICAL LUTHERAN CHURCH OF HONG KONG CHEUNG WAH KINDERGARTEN",
    "district": "新界",
    "district18": "北區",
    "address": "新界粉嶺祥華邨祥豐樓地下１０１－１０８及１１３－１１５室",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_157627000111",
      "edb_157627000112",
      "edb_157627000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26692883",
    "website": "http://www.elchkcw.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5226780001",
    "schoolCode": "522678",
    "campusCode": "0001",
    "name": "基督教小天使(錦豐)幼稚園",
    "nameEn": "CHRISTIAN LITTLE ANGEL KINDERGARTEN (KAM FUNG COURT)",
    "district": "新界",
    "district18": "沙田區",
    "address": "新界馬鞍山錦豐苑錦蕙閣地下(包括幼兒中心)",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_522678000111",
      "edb_522678000112",
      "edb_522678000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english",
      "native_english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26406783",
    "website": "http://www.clakkf.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5658060001",
    "schoolCode": "565806",
    "campusCode": "0001",
    "name": "基督教宣道會寶湖幼兒學校",
    "nameEn": "CHRISTIAN & MISSIONARY ALLIANCE PLOVER COVE NURSERY SCHOOL",
    "district": "新界",
    "district18": "大埔區",
    "address": "新界大埔寶湖道３號寶湖花園地下１０６號舖",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_565806000113"
    ],
    "pedagogyTags": [
      "project_learn"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26508223",
    "website": "http://plovercove.cmasshk.org",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_1552330002",
    "schoolCode": "155233",
    "campusCode": "0002",
    "name": "基督教宣道會大澳幼稚園",
    "nameEn": "CHRISTIAN & MISSIONARY ALLIANCE TAI O KINDERGARTEN",
    "district": "新界",
    "district18": "離島區",
    "address": "新界大嶼山大澳永安街８１、８３Ａ及８３Ｂ號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "WD"
    ],
    "variantIds": [
      "edb_155233000211",
      "edb_155233000213"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "language_dev"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "29856202",
    "website": "http://www.cmataiokg.com",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_1569490001",
    "schoolCode": "156949",
    "campusCode": "0001",
    "name": "基督教宣道會錦綉幼稚園",
    "nameEn": "CHRISTIAN & MISSIONARY ALLIANCE FAIRVIEW PARK KINDERGARTEN",
    "district": "新界",
    "district18": "元朗區",
    "address": "新界元朗錦繡花園市中心Ｄ及Ｅ座一樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_156949000111",
      "edb_156949000112",
      "edb_156949000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "trilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24716461",
    "website": "http://www.cmafvpkg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5658570001",
    "schoolCode": "565857",
    "campusCode": "0001",
    "name": "基督教宣道會沙田幼兒學校",
    "nameEn": "CHRISTIAN & MISSIONARY ALLIANCE SHATIN NURSERY SCHOOL",
    "district": "新界",
    "district18": "沙田區",
    "address": "新界沙田沙角邨金鶯樓地下１－１３號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_565857000113"
    ],
    "pedagogyTags": [
      "project_learn"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26489486",
    "website": "http://www.shatin.cmasshk.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5243280001",
    "schoolCode": "524328",
    "campusCode": "0001",
    "name": "基督教宣道會頌安幼稚園",
    "nameEn": "CHRISTIAN & MISSIONARY ALLIANCE JOYFUL PEACE KINDERGARTEN",
    "district": "新界",
    "district18": "沙田區",
    "address": "新界馬鞍山錦豐苑錦萱閣地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_524328000111",
      "edb_524328000112",
      "edb_524328000113"
    ],
    "pedagogyTags": [
      "project_learn",
      "project_learn",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26337300",
    "website": "http://www.joyfulk.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_1585770001",
    "schoolCode": "158577",
    "campusCode": "0001",
    "name": "基督教宣道會太和幼稚園",
    "nameEn": "CHRISTIAN & MISSIONARY ALLIANCE CHURCH TAI WO KINDERGARTEN",
    "district": "新界",
    "district18": "大埔區",
    "address": "新界大埔太和邨新和樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_158577000111",
      "edb_158577000112",
      "edb_158577000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "",
    "website": "http://www.cmtwkg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5658140001",
    "schoolCode": "565814",
    "campusCode": "0001",
    "name": "基督教宣道會天頌幼兒學校",
    "nameEn": "CHRISTIAN & MISSIONARY ALLIANCE TIN CHUNG NURSERY SCHOOL",
    "district": "新界",
    "district18": "元朗區",
    "address": "新界天水圍天頌苑服務設施大樓１字樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_565814000113"
    ],
    "pedagogyTags": [
      "project_learn"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "22530100",
    "website": "http://tinchung.cmasshk.org",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_1592550001",
    "schoolCode": "159255",
    "campusCode": "0001",
    "name": "基督教宣道會香港區聯會將軍澳宣道幼稚園",
    "nameEn": "CHRISTIAN & MISSIONARY ALLIANCE CHURCH UNION TSEUNG KWAN O ALLIANCE KINDERGARTEN",
    "district": "新界",
    "district18": "西貢區",
    "address": "新界西貢將軍澳裕明苑裕榮閣地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_159255000111",
      "edb_159255000112",
      "edb_159255000113"
    ],
    "pedagogyTags": [
      "project_learn"
    ],
    "languageEnv": [
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "",
    "website": "http://www.cmatkokg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5240260001",
    "schoolCode": "524026",
    "campusCode": "0001",
    "name": "基督教宣道會茵怡幼稚園",
    "nameEn": "CHRISTIAN AND MISSIONARY ALLIANCE CHURCH VERBENA KINDERGARTEN",
    "district": "新界",
    "district18": "西貢區",
    "address": "新界將軍澳貿泰路８號茵怡花園第七座平台１樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_524026000111",
      "edb_524026000112"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "project_learn"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "29970820",
    "website": "http://www.cmvkg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_1587630001",
    "schoolCode": "158763",
    "campusCode": "0001",
    "name": "基督徒信望愛堂華明幼稚園",
    "nameEn": "THE CHRISTIAN THE FAITH HOPE LOVE CHURCH WAH MING KINDERGARTEN",
    "district": "新界",
    "district18": "北區",
    "address": "新界粉嶺華明邨添明樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_158763000111",
      "edb_158763000112",
      "edb_158763000113"
    ],
    "pedagogyTags": [
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26771035",
    "website": "http://www.fhlwmkg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5542510001",
    "schoolCode": "554251",
    "campusCode": "0001",
    "name": "基督徒信望愛堂逸東幼稚園",
    "nameEn": "THE CHRISTIAN THE FAITH HOPE LOVE CHURCH YAT TUNG KINDERGARTEN",
    "district": "新界",
    "district18": "離島區",
    "address": "新界東涌逸東商場三樓六號幼稚園校舍",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_554251000111",
      "edb_554251000112",
      "edb_554251000113"
    ],
    "pedagogyTags": [
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "21090198",
    "website": "http://www.yatungkg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5412220001",
    "schoolCode": "541222",
    "campusCode": "0001",
    "name": "激活幼稚園",
    "nameEn": "GIGAMIND KINDERGARTEN",
    "district": "新界",
    "district18": "元朗區",
    "address": "新界天水圍天龍路９號嘉湖山莊美湖居Ｂ座（包括幼兒中心）",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_541222000111",
      "edb_541222000112",
      "edb_541222000113"
    ],
    "pedagogyTags": [
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "putonghua",
      "english",
      "cantonese",
      "bilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24469210",
    "website": "http://www.gigamind.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5727640001",
    "schoolCode": "572764",
    "campusCode": "0001",
    "name": "加州天地幼稚園",
    "nameEn": "SUNKIDS KINDERGARTEN",
    "district": "新界",
    "district18": "屯門區",
    "address": "新界屯門湖秀街2號悅湖山莊幼稚園2A號地下(幼稚園∕停車場大廈)",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_572764000111",
      "edb_572764000112",
      "edb_572764000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "putonghua"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24403088",
    "website": "https://sunkids.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_1569300001",
    "schoolCode": "156930",
    "campusCode": "0001",
    "name": "佳寶幼稚園(屯門分校)",
    "nameEn": "GUIDEPOSTS KINDERGARTEN (TUEN MUN BRANCH)",
    "district": "新界",
    "district18": "屯門區",
    "address": "新界屯門兆安苑定賢閣地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_156930000111",
      "edb_156930000112"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24516080",
    "website": "http://www.guideposts.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_1586580001",
    "schoolCode": "158658",
    "campusCode": "0001",
    "name": "佳寶幼稚園第二分校（建生邨）",
    "nameEn": "GUIDEPOSTS KINDERGARTEN 2ND BRANCH (KIN SANG ESTATE)",
    "district": "新界",
    "district18": "屯門區",
    "address": "新界屯門建生邨裕生樓Ａ及Ｂ翼地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_158658000111",
      "edb_158658000112",
      "edb_158658000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24607778",
    "website": "http://www.guideposts.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_1591900001",
    "schoolCode": "159190",
    "campusCode": "0001",
    "name": "佳寶幼稚園第三分校（天瑞邨）",
    "nameEn": "GUIDEPOSTS KINDERGARTEN 3RD BRANCH (TIN SHUI ESTATE)",
    "district": "新界",
    "district18": "元朗區",
    "address": "新界元朗天水圍天瑞邨第４期瑞林樓第十一座地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_159190000111",
      "edb_159190000112",
      "edb_159190000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "",
    "website": "http://www.guideposts.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5260100001",
    "schoolCode": "526010",
    "campusCode": "0001",
    "name": "迦南幼稚園(海濱花園)",
    "nameEn": "CANNAN KINDERGARTEN (RIVIERA GARDEN)",
    "district": "新界",
    "district18": "荃灣區",
    "address": "新界荃灣怡康街２－１２號海濱花園平台Ｂ（包括幼兒中心）",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_526010000111",
      "edb_526010000112"
    ],
    "pedagogyTags": [
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "english",
      "bilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24068111",
    "website": "http://www.cannan.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_6197870001",
    "schoolCode": "619787",
    "campusCode": "0001",
    "name": "迦南幼稚園(將軍澳)",
    "nameEn": "CANNAN KINDERGARTEN (TSEUNG KWAN O)",
    "district": "新界",
    "district18": "西貢區",
    "address": "新界將軍澳康城路1號日出康城第九期3樓幼稚園",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_619787000111",
      "edb_619787000112"
    ],
    "pedagogyTags": [
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "english",
      "bilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26711660",
    "website": "http://www.cannan.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_6096410001",
    "schoolCode": "609641",
    "campusCode": "0001",
    "name": "迦南幼稚園(景峰花園)",
    "nameEn": "CANNAN KINDERGARTEN (PRIME VIEW GARDEN)",
    "district": "新界",
    "district18": "屯門區",
    "address": "新界屯門景峰徑2號景峰花園第4座地下(部分)及第5座地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_609641000111",
      "edb_609641000112"
    ],
    "pedagogyTags": [
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "english",
      "bilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "",
    "website": "http://www.cannan.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5163760001",
    "schoolCode": "516376",
    "campusCode": "0001",
    "name": "迦南幼稚園﹝荃灣﹞",
    "nameEn": "CANNAN KINDERGARTEN (TSUEN WAN)",
    "district": "新界",
    "district18": "荃灣區",
    "address": "新界荃灣海盛路２８號祈德尊新邨商場一樓４號舖",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_516376000111",
      "edb_516376000112"
    ],
    "pedagogyTags": [
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "english",
      "bilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24116833",
    "website": "http://www.cannan.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5367680003",
    "schoolCode": "536768",
    "campusCode": "0003",
    "name": "珈琳幼稚園(屯門分校)",
    "nameEn": "KARLAM KINDERGARTEN (TUEN MUN BRANCH)",
    "district": "新界",
    "district18": "屯門區",
    "address": "新界屯門鄉事會路94—110號康利中心地下入口及一樓全層",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_536768000311",
      "edb_536768000312",
      "edb_536768000313"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24592929",
    "website": "https://www.karlam.edu.hk/tuenmun",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_2318860002",
    "schoolCode": "231886",
    "campusCode": "0002",
    "name": "珈琳中英文幼稚園",
    "nameEn": "KARLAM ANGLO-CHINESE KINDERGARTEN",
    "district": "新界",
    "district18": "元朗區",
    "address": "新界元朗安寧路59號地下-3樓(地下-2樓 包括幼兒中心)",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_231886000211",
      "edb_231886000212",
      "edb_231886000213"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24432877",
    "website": "http://www.karlam.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_2312660001",
    "schoolCode": "231266",
    "campusCode": "0001",
    "name": "嘉德麗中英文幼稚園",
    "nameEn": "CATILINE ANGLO-CHINESE KINDERGARTEN",
    "district": "新界",
    "district18": "沙田區",
    "address": "新界沙田第一城34，35及36座地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_231266000111",
      "edb_231266000112",
      "edb_231266000113"
    ],
    "pedagogyTags": [
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26463988",
    "website": "http://www.catiline.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5632850001",
    "schoolCode": "563285",
    "campusCode": "0001",
    "name": "嘉福浸信會幼兒園",
    "nameEn": "KA FUK BAPTIST CHURCH PRE-SCHOOL",
    "district": "新界",
    "district18": "北區",
    "address": "新界粉嶺嘉福邨福樂樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_563285000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26771696",
    "website": "http://www.kafuk.net",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_1576430001",
    "schoolCode": "157643",
    "campusCode": "0001",
    "name": "嘉言中英文幼稚園",
    "nameEn": "GREENVILLE ANGLO-CHINESE KINDERGARTEN",
    "district": "新界",
    "district18": "葵青區",
    "address": "新界葵涌新葵芳花園平台",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_157643000111",
      "edb_157643000112",
      "edb_157643000113"
    ],
    "pedagogyTags": [
      "project_learn"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24877334",
    "website": "http://www.greenville.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5628740001",
    "schoolCode": "562874",
    "campusCode": "0001",
    "name": "建生浸信會白普理幼兒園",
    "nameEn": "KIN SANG BAPTIST CHURCH BRADBURY PRE-SCHOOL",
    "district": "新界",
    "district18": "屯門區",
    "address": "新界屯門建生邨泰生樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_562874000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "language_dev",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24559803",
    "website": "http://www.ksbc.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5304170001",
    "schoolCode": "530417",
    "campusCode": "0001",
    "name": "將軍澳循道衛理幼稚園",
    "nameEn": "TSEUNG KWAN O METHODIST KINDERGARTEN",
    "district": "新界",
    "district18": "西貢區",
    "address": "新界將軍澳尚德邨尚禮樓(第六座)四樓平台A、B及C翼",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_530417000111",
      "edb_530417000112",
      "edb_530417000113"
    ],
    "pedagogyTags": [
      "language_dev"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "",
    "website": "http://tkomkg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_1587710003",
    "schoolCode": "158771",
    "campusCode": "0003",
    "name": "將軍澳英皇幼稚園",
    "nameEn": "JUNK BAY KINGSLAND KINDERGARTEN",
    "district": "新界",
    "district18": "西貢區",
    "address": "新界西貢將軍澳煜明苑焜明閣地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_158771000311",
      "edb_158771000312",
      "edb_158771000313"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "project_learn"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27052211",
    "website": "https://www.jbkingsland.com",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5241230001",
    "schoolCode": "524123",
    "campusCode": "0001",
    "name": "金巴崙長老會青草地幼稚園",
    "nameEn": "CUMBERLAND PRESBYTERIAN CHURCH GREEN PASTURE KINDERGARTEN",
    "district": "新界",
    "district18": "離島區",
    "address": "新界大嶼山東涌富東邨富東廣場二樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_524123000111",
      "edb_524123000112",
      "edb_524123000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "project_learn",
      "language_dev"
    ],
    "languageEnv": [
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "",
    "website": "http://www.gpkg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_1561910001",
    "schoolCode": "156191",
    "campusCode": "0001",
    "name": "金錢村何東幼稚園",
    "nameEn": "KAM TSIN VILLAGE HO TUNG KINDERGARTEN",
    "district": "新界",
    "district18": "北區",
    "address": "D.D. 92 KAM TSIN SHEUNG SHUI NEW TERRITORIES",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "WD"
    ],
    "variantIds": [
      "edb_156191000111",
      "edb_156191000113"
    ],
    "pedagogyTags": [
      "project_learn",
      "project_learn",
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "putonghua",
      "english",
      "native_english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26708802",
    "website": "http://www.ktvhtkg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5355830001",
    "schoolCode": "535583",
    "campusCode": "0001",
    "name": "浸信會華恩幼稚園",
    "nameEn": "BAPTIST CHURCH SHINING GRACE KINDERGARTEN",
    "district": "新界",
    "district18": "元朗區",
    "address": "新界元朗天水圍天華邨服務設施大樓三樓二號幼稚園",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_535583000111",
      "edb_535583000112",
      "edb_535583000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "22536088",
    "website": "http://www.bcsgkg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "low",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": true
    }
  },
  {
    "id": "edb_5875240001",
    "schoolCode": "587524",
    "campusCode": "0001",
    "name": "晶晶國際幼稚園",
    "nameEn": "JING JING INTERNATIONAL KINDERGARTEN",
    "district": "新界",
    "district18": "屯門區",
    "address": "新界屯門青海圍１８號置樂花園地下４７－５４號舖",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "british",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_587524000111",
      "edb_587524000112",
      "edb_587524000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24045266",
    "website": "https://www.jingjing.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5678920002",
    "schoolCode": "567892",
    "campusCode": "0002",
    "name": "晶晶幼稚園（屯門校）",
    "nameEn": "JING JING KINDERGARTEN (TUEN MUN BRANCH)",
    "district": "新界",
    "district18": "屯門區",
    "address": "新界屯門青翠徑７號金邦商場高層地下５、１０－１１、１３－２０及２３－２４號舖",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_567892000211",
      "edb_567892000212",
      "edb_567892000213"
    ],
    "pedagogyTags": [
      "project_learn",
      "project_learn",
      "project_learn",
      "language_dev",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "english",
      "bilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24574666",
    "website": "https://www.jingjing.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5198120001",
    "schoolCode": "519812",
    "campusCode": "0001",
    "name": "晶晶中英文幼稚園﹝洪水橋分校﹞",
    "nameEn": "JING JING ANGLO-CHINESE KINDERGARTEN (HUNG SHUI KIU BRANCH)",
    "district": "新界",
    "district18": "元朗區",
    "address": "新界元朗洪水橋丹桂村路１號麗虹花園地下４、５、６、１０、１１及１２號舖",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_519812000111",
      "edb_519812000112",
      "edb_519812000113"
    ],
    "pedagogyTags": [
      "project_learn",
      "project_learn",
      "project_learn",
      "language_dev",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "english",
      "bilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24796233",
    "website": "http://www.jingjing.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5166270001",
    "schoolCode": "516627",
    "campusCode": "0001",
    "name": "九龍城浸信會嘉福幼稚園",
    "nameEn": "KOWLOON CITY BAPTIST CHURCH KA FUK KINDERGARTEN",
    "district": "新界",
    "district18": "北區",
    "address": "新界粉嶺嘉盛苑嘉耀閣地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_516627000111",
      "edb_516627000112",
      "edb_516627000113"
    ],
    "pedagogyTags": [
      "project_learn",
      "language_dev",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "english",
      "bilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26754731",
    "website": "https://www.kafukkg.com",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_1585690001",
    "schoolCode": "158569",
    "campusCode": "0001",
    "name": "九龍城浸信會禧年幼稚園",
    "nameEn": "KOWLOON CITY BAPTIST CHURCH HAY NIEN KINDERGARTEN",
    "district": "新界",
    "district18": "沙田區",
    "address": "新界沙田廣源邨廣榕樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_158569000111",
      "edb_158569000112",
      "edb_158569000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "holistic",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "english",
      "native_english",
      "bilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26487073",
    "website": "http://www.haynienkg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5630990001",
    "schoolCode": "563099",
    "campusCode": "0001",
    "name": "救世軍大窩口幼兒學校",
    "nameEn": "THE SALVATION ARMY TAI WO HAU NURSERY SCHOOL",
    "district": "新界",
    "district18": "葵青區",
    "address": "新界大窩口邨富強樓2樓215 217 219及221-232室",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_563099000113"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "project_learn",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26147662",
    "website": "https://www.salvationarmy.org.hk/esd/twhns",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5631020001",
    "schoolCode": "563102",
    "campusCode": "0001",
    "name": "救世軍大元幼兒學校",
    "nameEn": "THE SALVATION ARMY TAI YUEN NURSERY SCHOOL",
    "district": "新界",
    "district18": "大埔區",
    "address": "新界大埔大元邨泰寧樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_563102000113"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "project_learn",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26649725",
    "website": "https://www.salvationarmy.org.hk/esd/tyns/?langcode=zh-hant",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_1576780001",
    "schoolCode": "157678",
    "campusCode": "0001",
    "name": "救世軍富強幼稚園",
    "nameEn": "THE SALVATION ARMY FU KEUNG KINDERGARTEN",
    "district": "新界",
    "district18": "葵青區",
    "address": "新界荃灣大窩口邨富強樓地下１２１－１４０室",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_157678000111",
      "edb_157678000112"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "play_explore"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26144481",
    "website": "http://www.salvationarmy.org.hk/esd/fkkg",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5631530001",
    "schoolCode": "563153",
    "campusCode": "0001",
    "name": "救世軍禾輋幼兒學校",
    "nameEn": "THE SALVATION ARMY WO CHE NURSERY SCHOOL",
    "district": "新界",
    "district18": "沙田區",
    "address": "新界沙田禾輋邨德和樓地下１０１－１１４室",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_563153000113"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "project_learn",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26040428",
    "website": "https://www.salvationarmy.org.hk/esd/wcns/?langcode=zh-hant",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5628660001",
    "schoolCode": "562866",
    "campusCode": "0001",
    "name": "救世軍錦田幼兒學校",
    "nameEn": "THE SALVATION ARMY KAM TIN NURSERY SCHOOL",
    "district": "新界",
    "district18": "元朗區",
    "address": "新界元朗錦田公路１０３號地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_562866000113"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "project_learn",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24423606",
    "website": "https://www.salvationarmy.org.hk/esd/ktns/?langcode=zh-hant",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5629630001",
    "schoolCode": "562963",
    "campusCode": "0001",
    "name": "救世軍梨木樹幼兒學校",
    "nameEn": "THE SALVATION ARMY LEI MUK SHUE NURSERY SCHOOL",
    "district": "新界",
    "district18": "荃灣區",
    "address": "新界荃灣梨木樹(一)邨楊樹樓地下B及C翼",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_562963000113"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "project_learn",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24202491",
    "website": "https://www.salvationarmy.org.hk/esd/lmsns/?langcode=zh-hant",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5630720001",
    "schoolCode": "563072",
    "campusCode": "0001",
    "name": "救世軍明德幼兒學校",
    "nameEn": "THE SALVATION ARMY MING TAK NURSERY SCHOOL",
    "district": "新界",
    "district18": "西貢區",
    "address": "新界將軍澳顯明苑B及C座地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_563072000113"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "project_learn",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26237555",
    "website": "http://www.salvationarmy.org.hk/esd/mtns",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_1592390001",
    "schoolCode": "159239",
    "campusCode": "0001",
    "name": "救世軍慶恩幼稚園",
    "nameEn": "THE SALVATION ARMY HING YAN KINDERGARTEN",
    "district": "新界",
    "district18": "西貢區",
    "address": "新界將軍澳常寧路2號厚德邨TKO Gａｔｅｗａｙ西翼地下KG01號舖",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_159239000111",
      "edb_159239000112"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27066222",
    "website": "http://www.salvationarmy.org.hk/esd/hykg",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5631290001",
    "schoolCode": "563129",
    "campusCode": "0001",
    "name": "救世軍荃灣幼兒學校",
    "nameEn": "THE SALVATION ARMY TSUEN WAN NURSERY SCHOOL",
    "district": "新界",
    "district18": "荃灣區",
    "address": "新界荃灣海盛路２２號祈德尊新邨１樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_563129000113"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "project_learn",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24171400",
    "website": "https://www.salvationarmy.org.hk/esd/twns/?langcode=zh-hant",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5630800001",
    "schoolCode": "563080",
    "campusCode": "0001",
    "name": "救世軍三聖幼兒學校",
    "nameEn": "THE SALVATION ARMY SAM SHING NURSERY SCHOOL",
    "district": "新界",
    "district18": "屯門區",
    "address": "新界屯門三聖邨滿漁樓側地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_563080000113"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "project_learn",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24520032",
    "website": "https://www.salvationarmy.org.hk/esd/ssns/?langcode=zh-hant",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_6056200001",
    "schoolCode": "605620",
    "campusCode": "0001",
    "name": "救世軍水泉澳幼稚園",
    "nameEn": "THE SALVATION ARMY SHUI CHUEN O KINDERGARTEN",
    "district": "新界",
    "district18": "沙田區",
    "address": "新界沙田水泉澳邨河泉樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_605620000111",
      "edb_605620000112",
      "edb_605620000113"
    ],
    "pedagogyTags": [
      "project_learn",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "36158710",
    "website": "http://www.salvationarmy.org.hk/esd/scokg",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5631100001",
    "schoolCode": "563110",
    "campusCode": "0001",
    "name": "救世軍天平幼兒學校",
    "nameEn": "THE SALVATION ARMY TIN PING NURSERY SCHOOL",
    "district": "新界",
    "district18": "北區",
    "address": "新界上水天平邨天賀樓Ｂ座１０６－１１０號地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_563110000113"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "project_learn",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26719972",
    "website": "https://www.salvationarmy.org.hk/esd/tpns/?langcode=zh-hant",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_1569730001",
    "schoolCode": "156973",
    "campusCode": "0001",
    "name": "救世軍田家炳幼稚園",
    "nameEn": "THE SALVATION ARMY TIN KA PING KINDERGARTEN",
    "district": "新界",
    "district18": "沙田區",
    "address": "新界沙田乙明邨街１５號地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_156973000111",
      "edb_156973000112"
    ],
    "pedagogyTags": [
      "project_learn"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26474227",
    "website": "http://www.salvationarmy.org.hk/esd/tkpkg",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_1585500001",
    "schoolCode": "158550",
    "campusCode": "0001",
    "name": "救世軍吳國偉紀念幼稚園",
    "nameEn": "THE SALVATION ARMY NG KWOK WAI MEMORIAL KINDERGARTEN",
    "district": "新界",
    "district18": "荃灣區",
    "address": "新界荃灣祈德尊新邨",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_158550000111",
      "edb_158550000112"
    ],
    "pedagogyTags": [
      "holistic"
    ],
    "languageEnv": [
      "putonghua"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24997639",
    "website": "https://www.salvationarmy.org.hk/esd/nkwkg",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5629470001",
    "schoolCode": "562947",
    "campusCode": "0001",
    "name": "救世軍乙明幼兒學校",
    "nameEn": "THE SALVATION ARMY JAT MIN NURSERY SCHOOL",
    "district": "新界",
    "district18": "沙田區",
    "address": "新界沙田乙明邨乙明邨街１５號２樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_562947000113"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "project_learn",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26474897",
    "website": "https://www.salvationarmy.org.hk/esd/jmns/?langcode=zh-hant",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_6129360001",
    "schoolCode": "612936",
    "campusCode": "0001",
    "name": "救世軍源林潔和幼稚園",
    "nameEn": "THE SALVATION ARMY ROSITA YUEN KINDERGARTEN",
    "district": "新界",
    "district18": "離島區",
    "address": "新界東涌迎東邨迎悅樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_612936000111",
      "edb_612936000112",
      "edb_612936000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "holistic"
    ],
    "languageEnv": [
      "putonghua"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23610128",
    "website": "https://www.salvationarmy.org.hk/esd/rykg",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5767430001",
    "schoolCode": "576743",
    "campusCode": "0001",
    "name": "救世軍中原慈善基金幼稚園",
    "nameEn": "THE SALVATION ARMY CENTALINE CHARITY FUND KINDERGARTEN",
    "district": "新界",
    "district18": "沙田區",
    "address": "新界沙田大圍美田邨美滿樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_576743000111",
      "edb_576743000112",
      "edb_576743000113"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "play_explore",
      "project_learn",
      "project_learn"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "28862340",
    "website": "http://www.salvationarmy.org.hk/esd/ccfkg",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5651130001",
    "schoolCode": "565113",
    "campusCode": "0001",
    "name": "康傑幼稚園〈馬鞍山〉",
    "nameEn": "GOOD HEALTH KINDERGARTEN (MA ON SHAN)",
    "district": "新界",
    "district18": "沙田區",
    "address": "新界沙田馬鞍山馬鞍台富寶花園１樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_565113000111",
      "edb_565113000112",
      "edb_565113000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "project_learn",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "trilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26411717",
    "website": "http://www.good-health.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_2316570001",
    "schoolCode": "231657",
    "campusCode": "0001",
    "name": "康傑中英文幼稚園(馬鞍山)",
    "nameEn": "GOOD HEALTH ANGLO-CHINESE KINDERGARTEN (MA ON SHAN)",
    "district": "新界",
    "district18": "沙田區",
    "address": "新界沙田馬鞍山馬鞍台富寶花園",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_231657000111",
      "edb_231657000112"
    ],
    "pedagogyTags": [
      "project_learn",
      "project_learn",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "trilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26411717",
    "website": "http://www.good-health.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_2316140001",
    "schoolCode": "231614",
    "campusCode": "0001",
    "name": "康傑中英文幼稚園(青衣)",
    "nameEn": "GOOD HEALTH ANGLO-CHINESE KINDERGARTEN (TSING YI)",
    "district": "新界",
    "district18": "葵青區",
    "address": "新界青衣青敬路７７號海悅花園商場２樓（部分）（包括幼兒中心）",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_231614000111",
      "edb_231614000112"
    ],
    "pedagogyTags": [
      "project_learn",
      "project_learn",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "trilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24978055",
    "website": "http://good-health.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_6099190001",
    "schoolCode": "609919",
    "campusCode": "0001",
    "name": "康傑中英文幼稚園(青衣南)",
    "nameEn": "GOOD HEALTH ANGLO-CHINESE KINDERGARTEN (TSING YI SOUTH)",
    "district": "新界",
    "district18": "葵青區",
    "address": "新界青衣細山路2-16號美景花園第11及12座商場L1及L2層",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_609919000111",
      "edb_609919000112",
      "edb_609919000113"
    ],
    "pedagogyTags": [
      "project_learn",
      "project_learn",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "trilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24882318",
    "website": "http://www.good-health.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5281530001",
    "schoolCode": "528153",
    "campusCode": "0001",
    "name": "葵盛禮賢會幼稚園",
    "nameEn": "KWAI SHING RHENISH CHURCH KINDERGARTEN",
    "district": "新界",
    "district18": "葵青區",
    "address": "新界葵涌葵盛東邨盛國樓地下Ｇ１室",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_528153000111",
      "edb_528153000112",
      "edb_528153000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24061029",
    "website": "http://kskg.ppe.rhenish.org",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_1555600001",
    "schoolCode": "155560",
    "campusCode": "0001",
    "name": "葵涌浸信會幼稚園",
    "nameEn": "KWAI CHUNG BAPTIST CHURCH KINDERGARTEN",
    "district": "新界",
    "district18": "葵青區",
    "address": "新界葵涌大隴街１４２號地段地下至２樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_155560000111",
      "edb_155560000112",
      "edb_155560000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24240864",
    "website": "http://www.kcbck.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5178280003",
    "schoolCode": "517828",
    "campusCode": "0003",
    "name": "萊恩英文幼稚園",
    "nameEn": "ST. LORRAINE ENGLISH KINDERGARTEN",
    "district": "新界",
    "district18": "元朗區",
    "address": "新界元朗和生圍加州花園商場中心地下Ｇ１舖",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "british",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_517828000311",
      "edb_517828000312"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "project_learn"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24823299",
    "website": "http://www.st-lorraine.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_1516960001",
    "schoolCode": "151696",
    "campusCode": "0001",
    "name": "萊恩幼稚園(元朗)",
    "nameEn": "ST. LORRAINE KINDERGARTEN (YUEN LONG)",
    "district": "新界",
    "district18": "元朗區",
    "address": "新界元朗西菁街１５號",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "british",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_151696000111",
      "edb_151696000112"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "project_learn"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24760091",
    "website": "http://www.st-lorraine.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5638380001",
    "schoolCode": "563838",
    "campusCode": "0001",
    "name": "藍如溪盛成皿教育基金邊陳之娟幼稚園",
    "nameEn": "ALICE LAN & VERA SHEN EDUCATION FUND DELIA PEI KINDERGARTEN",
    "district": "新界",
    "district18": "沙田區",
    "address": "新界沙田豐盛苑富盛閣Ｂ翼地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_563838000113"
    ],
    "pedagogyTags": [
      "play_explore"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26918504",
    "website": "http://www.alvsefdpk.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5638460001",
    "schoolCode": "563846",
    "campusCode": "0001",
    "name": "藍如溪盛成皿教育基金邊耀良幼稚園",
    "nameEn": "ALICE LAN & VERA SHEN EDUCATION FUND GORDON PEI KINDERGARTEN",
    "district": "新界",
    "district18": "荃灣區",
    "address": "新界荃灣沙咀道３２８號寶石大廈３座地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_563846000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn"
    ],
    "languageEnv": [
      "trilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24062062",
    "website": "http://www.alvsefgpk.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_1584100001",
    "schoolCode": "158410",
    "campusCode": "0001",
    "name": "朗屏邨聖恩幼稚園",
    "nameEn": "LONG PING ESTATE SING YAN KINDERGARTEN",
    "district": "新界",
    "district18": "元朗區",
    "address": "新界元朗朗屏邨鳳屏樓(第10座)地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_158410000111",
      "edb_158410000112",
      "edb_158410000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24733266",
    "website": "http://www.singyan.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5333600002",
    "schoolCode": "533360",
    "campusCode": "0002",
    "name": "朗思國際幼稚園（馬鞍山）",
    "nameEn": "THINK INTERNATIONAL KINDERGARTEN (MA ON SHAN)",
    "district": "新界",
    "district18": "沙田區",
    "address": "新界沙田馬鞍山新港城廣場２樓幼稚園校舍（包括幼兒中心）",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_533360000211",
      "edb_533360000212",
      "edb_533360000213"
    ],
    "pedagogyTags": [],
    "languageEnv": [],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26337800",
    "website": "http://www.think.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "low",
      "pedagogyConfidence": "low",
      "languageConfidence": "low",
      "needsReview": true
    }
  },
  {
    "id": "edb_6130880001",
    "schoolCode": "613088",
    "campusCode": "0001",
    "name": "樂必津法國幼稚園",
    "nameEn": "LOU PICHOUN FRENCH KINDERGARTEN",
    "district": "新界",
    "district18": "西貢區",
    "address": "新界將軍澳唐賢街29號藍塘傲地下1A、1B及2A舖",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_613088000111",
      "edb_613088000112",
      "edb_613088000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "28134277",
    "website": "",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "low",
      "languageConfidence": "high",
      "needsReview": true
    }
  },
  {
    "id": "edb_5229530001",
    "schoolCode": "522953",
    "campusCode": "0001",
    "name": "樂基幼兒學校(駿景園)",
    "nameEn": "HONG KONG (ASCOT) PRESCHOOL",
    "district": "新界",
    "district18": "沙田區",
    "address": "新界沙田駿景道１號駿景園地下（包括幼兒中心）",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_522953000111",
      "edb_522953000112"
    ],
    "pedagogyTags": [
      "holistic"
    ],
    "languageEnv": [
      "trilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23332939",
    "website": "http://www.hkpreschool.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "low",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": true
    }
  },
  {
    "id": "edb_1562050001",
    "schoolCode": "156205",
    "campusCode": "0001",
    "name": "樂景幼稚園",
    "nameEn": "LOK KING KINDERGARTEN",
    "district": "新界",
    "district18": "葵青區",
    "address": "新界葵涌荔景邨樂景樓南面地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_156205000111",
      "edb_156205000112",
      "edb_156205000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27426202",
    "website": "http://www.lokking.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5436160001",
    "schoolCode": "543616",
    "campusCode": "0001",
    "name": "樂善堂鄧德濂幼稚園",
    "nameEn": "LOK SIN TONG TANG TAK LIM KINDERGARTEN",
    "district": "新界",
    "district18": "屯門區",
    "address": "新界屯門富泰邨服務設施大樓１字樓第２號幼稚園校舍",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_543616000111",
      "edb_543616000112",
      "edb_543616000113"
    ],
    "pedagogyTags": [
      "project_learn",
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24537232",
    "website": "http://www.lstkgttl.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_3248840002",
    "schoolCode": "324884",
    "campusCode": "0002",
    "name": "樂善堂李賢義幼稚園",
    "nameEn": "LOK SIN TONG LEE YIN YEE KINDERGARTEN",
    "district": "新界",
    "district18": "沙田區",
    "address": "新界沙田水泉澳邨映泉樓二樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_324884000211",
      "edb_324884000212",
      "edb_324884000213"
    ],
    "pedagogyTags": [
      "play_explore"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27175830",
    "website": "http://presch-cms.pehk.com.hk/website/lst/index.php",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_1578640001",
    "schoolCode": "157864",
    "campusCode": "0001",
    "name": "樂善堂梁泳釗幼稚園",
    "nameEn": "LOK SIN TONG STEPHEN LEUNG KINDERGARTEN",
    "district": "新界",
    "district18": "沙田區",
    "address": "新界沙田美城苑暉誠閣地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_157864000111",
      "edb_157864000112",
      "edb_157864000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "language_dev",
      "holistic",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english",
      "native_english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26970877",
    "website": "https://www.lstslkg.edu.hk/tc",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_1588360001",
    "schoolCode": "158836",
    "campusCode": "0001",
    "name": "樂善堂張葉茂清幼稚園",
    "nameEn": "LOK SIN TONG CHEUNG YIP MOU CHING KINDERGARTEN",
    "district": "新界",
    "district18": "屯門區",
    "address": "新界屯門兆畦苑兆強閣地下１－５室及１１－１５室（Ａ及Ｂ翼）",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_158836000111",
      "edb_158836000112",
      "edb_158836000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "trilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "",
    "website": "http://www.lstcymck.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5646300001",
    "schoolCode": "564630",
    "campusCode": "0001",
    "name": "禮賢會荔景幼兒園",
    "nameEn": "LAI KING RHENISH NURSERY",
    "district": "新界",
    "district18": "葵青區",
    "address": "新界葵涌荔景邨第５座仰景樓２樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "WD"
    ],
    "variantIds": [
      "edb_564630000111",
      "edb_564630000113"
    ],
    "pedagogyTags": [
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english",
      "native_english",
      "bilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27421714",
    "website": "http://lkc.wd.rhenish.org",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5645080001",
    "schoolCode": "564508",
    "campusCode": "0001",
    "name": "禮賢會元朗幼兒園",
    "nameEn": "YUEN LONG RHENISH NURSERY",
    "district": "新界",
    "district18": "元朗區",
    "address": "新界元朗天水圍天耀邨天耀廣場1樓111室",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_564508000113"
    ],
    "pedagogyTags": [
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english",
      "native_english",
      "bilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24456306",
    "website": "http://ylc.wd.rhenish.org",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_1557050002",
    "schoolCode": "155705",
    "campusCode": "0002",
    "name": "力行幼稚園",
    "nameEn": "LICK HANG KINDERGARTEN",
    "district": "新界",
    "district18": "離島區",
    "address": "G/F FLAT C AND D 72-74 RURAL COMMITTEE ROAD MUI WO NEW TERRITORIES",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_155705000211",
      "edb_155705000212"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "project_learn",
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "",
    "website": "http://www.lickhang.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_1557050001",
    "schoolCode": "155705",
    "campusCode": "0001",
    "name": "力行幼稚園",
    "nameEn": "LICK HANG KINDERGARTEN",
    "district": "新界",
    "district18": "離島區",
    "address": "新界大嶼山梅窩南便圍３號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_155705000111",
      "edb_155705000112"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "project_learn",
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "29848239",
    "website": "http://www.lickhang.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_1569810001",
    "schoolCode": "156981",
    "campusCode": "0001",
    "name": "麗晶幼稚園分校",
    "nameEn": "REGENT'S KINDERGARTEN (BRANCH SCHOOL)",
    "district": "新界",
    "district18": "元朗區",
    "address": "新界元朗安樂路明珠樓二樓５Ｂ、６、７、８及９號（元朗大馬路元朗市地段９５）",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_156981000111",
      "edb_156981000112",
      "edb_156981000113"
    ],
    "pedagogyTags": [
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24772332",
    "website": "https://www.regentkg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5750110001",
    "schoolCode": "575011",
    "campusCode": "0001",
    "name": "鄰舍輔導會東欣幼兒園",
    "nameEn": "THE NEIGHBOURHOOD ADVICE-ACTION COUNCIL TUNG YAN DAY NURSERY",
    "district": "新界",
    "district18": "離島區",
    "address": "大嶼山東涌健東路１號映灣園第１５座１樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_575011000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "31945120",
    "website": "http://www.naac.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5663810001",
    "schoolCode": "566381",
    "campusCode": "0001",
    "name": "鄰舍輔導會東涌幼兒園",
    "nameEn": "THE NEIGHBOURHOOD ADVICE-ACTION COUNCIL TUNG CHUNG DAY NURSERY",
    "district": "新界",
    "district18": "離島區",
    "address": "香港大嶼山東涌逸東邨２號停車場１樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_566381000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "31522202",
    "website": "http://www.naac.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5663900001",
    "schoolCode": "566390",
    "campusCode": "0001",
    "name": "鄰舍輔導會粉嶺幼兒園",
    "nameEn": "THE NEIGHBOURHOOD ADVICE-ACTION COUNCIL FANLING DAY NURSERY",
    "district": "新界",
    "district18": "北區",
    "address": "新界粉嶺聯和墟和滿街８號帝庭軒商場１樓３７號舖",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_566390000113"
    ],
    "pedagogyTags": [
      "language_dev"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26762298",
    "website": "http://www.naac.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5663730001",
    "schoolCode": "566373",
    "campusCode": "0001",
    "name": "鄰舍輔導會元朗幼兒園",
    "nameEn": "THE NEIGHBOURHOOD ADVICE-ACTION COUNCIL YUEN LONG DAY NURSERY",
    "district": "新界",
    "district18": "元朗區",
    "address": "新界元朗牡丹街２３號康德閣地下（入口）及１樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_566373000113"
    ],
    "pedagogyTags": [
      "project_learn"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24711191",
    "website": "http://www.naac.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5657410001",
    "schoolCode": "565741",
    "campusCode": "0001",
    "name": "路德會陳恩美幼兒園",
    "nameEn": "CHAN EN MEI LUTHERAN DAY NURSERY",
    "district": "新界",
    "district18": "離島區",
    "address": "香港長洲大菜園道１５０號Ａ地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "WD"
    ],
    "variantIds": [
      "edb_565741000111",
      "edb_565741000113"
    ],
    "pedagogyTags": [
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "29810243",
    "website": "http://chanenmei-nursery.hklss.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_1578560001",
    "schoolCode": "157856",
    "campusCode": "0001",
    "name": "路德會恩石幼稚園",
    "nameEn": "ROCK OF AGES LUTHERAN KINDERGARTEN",
    "district": "新界",
    "district18": "葵青區",
    "address": "新界葵涌石籬一邨石秀樓地下１號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_157856000111",
      "edb_157856000112",
      "edb_157856000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "play_explore"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24874607",
    "website": "http://www.roalk.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5657840001",
    "schoolCode": "565784",
    "campusCode": "0001",
    "name": "路德會富泰幼兒園",
    "nameEn": "FU TAI LUTHERAN DAY NURSERY",
    "district": "新界",
    "district18": "屯門區",
    "address": "新界屯門富泰邨愛泰樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "WD"
    ],
    "variantIds": [
      "edb_565784000111",
      "edb_565784000113"
    ],
    "pedagogyTags": [
      "project_learn",
      "language_dev"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "31561255",
    "website": "http://www.futailutheran.org",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_1586740001",
    "schoolCode": "158674",
    "campusCode": "0001",
    "name": "路德會建生幼稚園",
    "nameEn": "KIN SANG LUTHERAN KINDERGARTEN",
    "district": "新界",
    "district18": "屯門區",
    "address": "新界屯門建生邨康生樓Ａ及Ｂ翼地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_158674000111",
      "edb_158674000112",
      "edb_158674000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24670220",
    "website": "https://www.kslk.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5657680001",
    "schoolCode": "565768",
    "campusCode": "0001",
    "name": "路德會景林幼兒園",
    "nameEn": "KING LAM LUTHERAN DAY NURSERY",
    "district": "新界",
    "district18": "西貢區",
    "address": "新界將軍澳景林邨景林鄰里社區中心３樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "WD"
    ],
    "variantIds": [
      "edb_565768000111",
      "edb_565768000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "language_dev",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27018234",
    "website": "http://presch-cms.pehk.com.hk/website/kinglam",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5657250001",
    "schoolCode": "565725",
    "campusCode": "0001",
    "name": "路德會良景幼兒園",
    "nameEn": "LEUNG KING LUTHERAN DAY NURSERY",
    "district": "新界",
    "district18": "屯門區",
    "address": "新界屯門良景邨良景邨社區中心５樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "WD"
    ],
    "variantIds": [
      "edb_565725000111",
      "edb_565725000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24656008",
    "website": "http://leungking-nursery.hklss.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5657170001",
    "schoolCode": "565717",
    "campusCode": "0001",
    "name": "路德會呂君博幼兒園",
    "nameEn": "LUI KWAN POK LUTHERAN DAY NURSERY",
    "district": "新界",
    "district18": "離島區",
    "address": "香港長洲教堂路7號地下及1樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "WD"
    ],
    "variantIds": [
      "edb_565717000111",
      "edb_565717000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "29810545",
    "website": "http://luikwanpok-nursery.hklss.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_1570740001",
    "schoolCode": "157074",
    "campusCode": "0001",
    "name": "路德會呂祥光幼稚園",
    "nameEn": "LUI CHEUNG KWONG LUTHERAN KINDERGARTEN",
    "district": "新界",
    "district18": "屯門區",
    "address": "新界屯門友愛邨愛廉樓高座地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_157074000111",
      "edb_157074000112",
      "edb_157074000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "holistic",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24587438",
    "website": "http://www.lckk.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5657090001",
    "schoolCode": "565709",
    "campusCode": "0001",
    "name": "路德會青衣城幼兒園",
    "nameEn": "MARITIME SQUARE LUTHERAN DAY NURSERY",
    "district": "新界",
    "district18": "葵青區",
    "address": "新界青衣青敬路３３號青衣城地下部份",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_565709000113"
    ],
    "pedagogyTags": [
      "holistic"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24490052",
    "website": "http://www.msl-web.net",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5657330001",
    "schoolCode": "565733",
    "campusCode": "0001",
    "name": "路德會長青幼兒園",
    "nameEn": "CHEUNG CHING LUTHERAN DAY NURSERY",
    "district": "新界",
    "district18": "葵青區",
    "address": "新界青衣長青邨青葵樓３樓３０９－３１４室",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "WD"
    ],
    "variantIds": [
      "edb_565733000111",
      "edb_565733000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "holistic"
    ],
    "languageEnv": [
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24358799",
    "website": "http://cheungching-nursery.hklss.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_1577160001",
    "schoolCode": "157716",
    "campusCode": "0001",
    "name": "綠楊幼稚園",
    "nameEn": "LUK YEUNG KINDERGARTEN",
    "district": "新界",
    "district18": "荃灣區",
    "address": "新界荃灣綠楊新邨綠楊坊平台２樓（包括幼兒中心）",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_157716000111",
      "edb_157716000112"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24998832",
    "website": "http://www.lukyeungkg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5239840002",
    "schoolCode": "523984",
    "campusCode": "0002",
    "name": "綠茵英文（國際）幼稚園（將軍澳）",
    "nameEn": "GREENFIELD ENGLISH (INTERNATIONAL) KINDERGARTEN (TSEUNG KWAN O)",
    "district": "新界",
    "district18": "西貢區",
    "address": "新界將軍澳地段２３號南豐廣場幼稚園基座部份地下及平台一樓（包括幼兒中心）",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_523984000211",
      "edb_523984000212",
      "edb_523984000213"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "22742238",
    "website": "http://www.greenfield.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "low",
      "languageConfidence": "high",
      "needsReview": true
    }
  },
  {
    "id": "edb_6043720001",
    "schoolCode": "604372",
    "campusCode": "0001",
    "name": "綠茵英文（國際）幼稚園（日出康城）",
    "nameEn": "GREENFIELD ENGLISH (INTERNATIONAL) KINDERGARTEN (LOHAS PARK)",
    "district": "新界",
    "district18": "西貢區",
    "address": "新界將軍澳日出康城３期緻藍天幼稚園座",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_604372000111",
      "edb_604372000112"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english",
      "cantonese",
      "native_english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "22464801",
    "website": "http://www.greenfield.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "medium",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5200710001",
    "schoolCode": "520071",
    "campusCode": "0001",
    "name": "馬鞍山靈糧幼稚園",
    "nameEn": "MA ON SHAN LING LIANG KINDERGARTEN",
    "district": "新界",
    "district18": "沙田區",
    "address": "新界沙田馬鞍山頌安邨頌德樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_520071000111",
      "edb_520071000112"
    ],
    "pedagogyTags": [
      "project_learn",
      "project_learn",
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "28817848",
    "website": "http://www.lingliang.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5662410001",
    "schoolCode": "566241",
    "campusCode": "0001",
    "name": "瑪歌瑞特國際幼稚園(粉嶺)",
    "nameEn": "MAGART INTERNATIONAL KINDERGARTEN (FANLING)",
    "district": "新界",
    "district18": "北區",
    "address": "新界粉嶺新運路33號粉嶺中心第1期A及B座地下",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_566241000111",
      "edb_566241000112",
      "edb_566241000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26778109",
    "website": "http://www.magartedu.com",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "low",
      "languageConfidence": "high",
      "needsReview": true
    }
  },
  {
    "id": "edb_6012500001",
    "schoolCode": "601250",
    "campusCode": "0001",
    "name": "麥克萊國際幼稚園",
    "nameEn": "MYNORS INTERNATIONAL KINDERGARTEN",
    "district": "新界",
    "district18": "北區",
    "address": "新界粉嶺馬適路綠悠軒商場1樓1-11號A舖",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_601250000111",
      "edb_601250000112",
      "edb_601250000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23557500",
    "website": "https://www.mynors.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "low",
      "languageConfidence": "high",
      "needsReview": true
    }
  },
  {
    "id": "edb_1525790001",
    "schoolCode": "152579",
    "campusCode": "0001",
    "name": "滿樂幼稚園",
    "nameEn": "MOON LOK KINDERGARTEN",
    "district": "新界",
    "district18": "荃灣區",
    "address": "荃灣海壩街滿樂大廈",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_152579000111",
      "edb_152579000112"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "project_learn",
      "project_learn",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24170231",
    "website": "http://www.abmsbc.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_6017210001",
    "schoolCode": "601721",
    "campusCode": "0001",
    "name": "懋柏禮國際幼稚園",
    "nameEn": "MULBERRY HOUSE INTERNATIONAL KINDERGARTEN",
    "district": "新界",
    "district18": "大埔區",
    "address": "新界大埔科進路23號逸瓏灣1期商場地下部份及低層地下幼稚園校舍",
    "nature": "international",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_601721000111",
      "edb_601721000112"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23119008",
    "website": "https://mulberryhousekg.com",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "low",
      "languageConfidence": "high",
      "needsReview": true
    }
  },
  {
    "id": "edb_5656790001",
    "schoolCode": "565679",
    "campusCode": "0001",
    "name": "美樂幼兒園（美樂花園校）",
    "nameEn": "MELODY NURSERY (MELODY GARDEN)",
    "district": "新界",
    "district18": "屯門區",
    "address": "新界屯門湖翠路２號美樂花園地下１８１號舖",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_565679000111",
      "edb_565679000112",
      "edb_565679000113"
    ],
    "pedagogyTags": [
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24045520",
    "website": "http://www.melody.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_1575030001",
    "schoolCode": "157503",
    "campusCode": "0001",
    "name": "美樂中英文幼稚園",
    "nameEn": "MELODY ANGLO-CHINESE KINDERGARTEN",
    "district": "新界",
    "district18": "屯門區",
    "address": "新界屯門湖翠路２號美樂花園地下１８０號舖",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_157503000111",
      "edb_157503000112",
      "edb_157503000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "",
    "website": "http://www.melody.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_2311850001",
    "schoolCode": "231185",
    "campusCode": "0001",
    "name": "美樂中英文幼稚園（景峰花園分校）",
    "nameEn": "MELODY ANGLO-CHINESE KINDERGARTEN (PRIME VIEW GARDEN BRANCH)",
    "district": "新界",
    "district18": "屯門區",
    "address": "新界屯門景峰花園第１及２座地下（包括幼兒中心）",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_231185000111",
      "edb_231185000112",
      "edb_231185000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "project_learn",
      "language_dev",
      "holistic",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24574433",
    "website": "http://www.melody-pvg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_1570580001",
    "schoolCode": "157058",
    "campusCode": "0001",
    "name": "美林邨道光幼稚園",
    "nameEn": "MEI LAM ESTATE TO KWONG KINDERGARTEN",
    "district": "新界",
    "district18": "沙田區",
    "address": "新界沙田美林邨美桃樓地下１３２及１３４－１４４室",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_157058000111",
      "edb_157058000112",
      "edb_157058000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26047486",
    "website": "http://meilam.tkyw.com",
    "dataQuality": {
      "curriculumConfidence": "low",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": true
    }
  },
  {
    "id": "edb_1566120002",
    "schoolCode": "156612",
    "campusCode": "0002",
    "name": "萌兒幼稚園",
    "nameEn": "MOE KINDERGARTEN",
    "district": "新界",
    "district18": "荃灣區",
    "address": "新界荃灣荃景圍86號荃灣中心二期11—14座商場E5—E73內A—1舖",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_156612000211",
      "edb_156612000212",
      "edb_156612000213"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "project_learn"
    ],
    "languageEnv": [
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "",
    "website": "https://moekindergarten202.wixsite.com/moekindergarten",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5659970001",
    "schoolCode": "565997",
    "campusCode": "0001",
    "name": "明愛翠林幼兒學校",
    "nameEn": "CARITAS NURSERY SCHOOL - TSUI LAM",
    "district": "新界",
    "district18": "西貢區",
    "address": "新界將軍澳翠林邨碧林樓３０６－３１３號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_565997000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27020076",
    "website": "http://tlns.caritas.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5659890001",
    "schoolCode": "565989",
    "campusCode": "0001",
    "name": "明愛打鼓嶺幼兒學校",
    "nameEn": "CARITAS NURSERY SCHOOL - TA KWU LING",
    "district": "新界",
    "district18": "北區",
    "address": "新界粉嶺打鼓嶺坪輋路明愛打鼓嶺中心地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_565989000113"
    ],
    "pedagogyTags": [
      "project_learn",
      "project_learn",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26743207",
    "website": "http://tklns.caritas.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5659700001",
    "schoolCode": "565970",
    "campusCode": "0001",
    "name": "明愛沙田幼兒學校",
    "nameEn": "CARITAS NURSERY SCHOOL - SHATIN",
    "district": "新界",
    "district18": "沙田區",
    "address": "新界沙田文禮路２３－２５號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_565970000113"
    ],
    "pedagogyTags": [
      "project_learn",
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26917175",
    "website": "http://stns.caritas.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_3205440002",
    "schoolCode": "320544",
    "campusCode": "0002",
    "name": "明愛聖方濟各幼稚園",
    "nameEn": "CARITAS ST. FRANCIS KINDERGARTEN",
    "district": "新界",
    "district18": "北區",
    "address": "新界上水寶石湖邨服務設施大樓二樓KG01室",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "WD"
    ],
    "variantIds": [
      "edb_320544000211",
      "edb_320544000213"
    ],
    "pedagogyTags": [
      "project_learn",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23286828",
    "website": "https://sfkg.caritas.org.hk/index.aspx",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5660470001",
    "schoolCode": "566047",
    "campusCode": "0001",
    "name": "明愛香港崇德社幼兒學校",
    "nameEn": "CARITAS ZONTA CLUB OF HONG KONG NURSERY SCHOOL",
    "district": "新界",
    "district18": "北區",
    "address": "新界粉嶺華明邨富明樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_566047000113"
    ],
    "pedagogyTags": [
      "project_learn",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26750099",
    "website": "http://zcns.caritas.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5670270001",
    "schoolCode": "567027",
    "campusCode": "0001",
    "name": "明雅國際幼兒學校",
    "nameEn": "MINK INTERNATIONAL PRE-SCHOOL",
    "district": "新界",
    "district18": "大埔區",
    "address": "新界大埔新興花園地下",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_567027000111",
      "edb_567027000112",
      "edb_567027000113"
    ],
    "pedagogyTags": [
      "holistic"
    ],
    "languageEnv": [
      "putonghua",
      "english",
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26654333",
    "website": "http://www.mink.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "low",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": true
    }
  },
  {
    "id": "edb_2311340001",
    "schoolCode": "231134",
    "campusCode": "0001",
    "name": "明雅中英文幼稚園",
    "nameEn": "MINK ANGLO-CHINESE KINDERGARTEN",
    "district": "新界",
    "district18": "大埔區",
    "address": "新界大埔大埔市地段第２６號第１７區新興花園地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_231134000111",
      "edb_231134000112",
      "edb_231134000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "bilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26654333",
    "website": "http://www.mink.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_1566980001",
    "schoolCode": "156698",
    "campusCode": "0001",
    "name": "南英幼稚園",
    "nameEn": "NAM YING KINDERGARTEN",
    "district": "新界",
    "district18": "離島區",
    "address": "新界坪洲永興街６７號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_156698000111",
      "edb_156698000112"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "play_explore",
      "play_explore",
      "play_explore",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "29838811",
    "website": "",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_6139160001",
    "schoolCode": "613916",
    "campusCode": "0001",
    "name": "培僑國際幼稚園",
    "nameEn": "PUI KIU INTERNATIONAL KINDERGARTEN",
    "district": "新界",
    "district18": "沙田區",
    "address": "新界沙田大涌橋路52號富豪花園商場2期1樓",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_613916000111",
      "edb_613916000112"
    ],
    "pedagogyTags": [
      "project_learn",
      "project_learn",
      "language_dev"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "35909990",
    "website": "http://hazelwood.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "low",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": true
    }
  },
  {
    "id": "edb_6223890001",
    "schoolCode": "622389",
    "campusCode": "0001",
    "name": "培僑國際幼稚園(碧濤花園)",
    "nameEn": "PUI KIU INTERNATIONAL KINDERGARTEN (PICTORIAL GARDEN)",
    "district": "新界",
    "district18": "沙田區",
    "address": "新界沙田安景街23號碧濤花園第二期平台幼稚園",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_622389000111",
      "edb_622389000112",
      "edb_622389000113"
    ],
    "pedagogyTags": [
      "project_learn",
      "project_learn",
      "language_dev"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "35909990",
    "website": "http://www.puikiukg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "low",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": true
    }
  },
  {
    "id": "edb_1584290001",
    "schoolCode": "158429",
    "campusCode": "0001",
    "name": "平安福音堂幼稚園",
    "nameEn": "PEACE EVANGELICAL CENTRE KINDERGARTEN",
    "district": "新界",
    "district18": "沙田區",
    "address": "新界沙田沙田正街１１－１７號偉華中心３樓Ａ幼稚園",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_158429000111",
      "edb_158429000112",
      "edb_158429000113"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "play_explore",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26954422",
    "website": "http://www.peck.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5461270001",
    "schoolCode": "546127",
    "campusCode": "0001",
    "name": "平安福音堂幼稚園(青衣)",
    "nameEn": "PEACE EVANGELICAL CENTRE KINDERGARTEN (TSING YI)",
    "district": "新界",
    "district18": "葵青區",
    "address": "新界青衣長宏邨宏正樓及宏毅樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_546127000111",
      "edb_546127000112",
      "edb_546127000113"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "play_explore",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24847481",
    "website": "http://www.peck.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5756660001",
    "schoolCode": "575666",
    "campusCode": "0001",
    "name": "平安福音堂幼稚園(天水圍)",
    "nameEn": "PEACE EVANGELICAL CENTRE KINDERGARTEN (TIN SHUI WAI)",
    "district": "新界",
    "district18": "元朗區",
    "address": "新界天水圍天晴邨綜合大樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_575666000111",
      "edb_575666000112",
      "edb_575666000113"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "project_learn"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24469277",
    "website": "http://www.peck.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5562460001",
    "schoolCode": "556246",
    "campusCode": "0001",
    "name": "啓思幼稚園(愛琴)",
    "nameEn": "CREATIVE KINDERGARTEN (AEGEAN COAST)",
    "district": "新界",
    "district18": "屯門區",
    "address": "新界屯門掃管笏管青路２號愛琴海岸１樓平台",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_556246000111",
      "edb_556246000112",
      "edb_556246000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "holistic",
      "holistic",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "29495028",
    "website": "http://www.creative.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5375780001",
    "schoolCode": "537578",
    "campusCode": "0001",
    "name": "啓思幼稚園(帝堡城)",
    "nameEn": "CREATIVE KINDERGARTEN (CASTELLO)",
    "district": "新界",
    "district18": "沙田區",
    "address": "新界沙田小瀝源路６９號帝堡城Ｌ５幼稚園校舍及Ｌ６入口大堂（包括幼兒中心）",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_537578000111",
      "edb_537578000112",
      "edb_537578000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "holistic",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "28822005",
    "website": "http://www.creative.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5527470001",
    "schoolCode": "552747",
    "campusCode": "0001",
    "name": "啓思幼稚園(馬灣)",
    "nameEn": "CREATIVE KINDERGARTEN (MA WAN)",
    "district": "新界",
    "district18": "荃灣區",
    "address": "新界馬灣珀麗道８號（包括幼兒中心）",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_552747000111",
      "edb_552747000112",
      "edb_552747000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "holistic",
      "holistic",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "29409228",
    "website": "http://www.creative.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5342260001",
    "schoolCode": "534226",
    "campusCode": "0001",
    "name": "啓思幼稚園（青衣）",
    "nameEn": "CREATIVE KINDERGARTEN (TSING YI)",
    "district": "新界",
    "district18": "葵青區",
    "address": "新界青衣寮肚路３號曉峰園平台入口大堂及停車場第１層（包括幼兒中心）",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_534226000111",
      "edb_534226000112",
      "edb_534226000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "holistic",
      "holistic",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "29428818",
    "website": "http://www.creative.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_1588520001",
    "schoolCode": "158852",
    "campusCode": "0001",
    "name": "啓思幼稚園(屯門分校)",
    "nameEn": "CREATIVE KINDERGARTEN (TUEN MUN BRANCH)",
    "district": "新界",
    "district18": "屯門區",
    "address": "新界屯門河興街５Ａ大興花園２期地下（包括幼兒中心）",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_158852000111",
      "edb_158852000112",
      "edb_158852000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "holistic",
      "holistic",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24692288",
    "website": "http://www.creative.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_6271780001",
    "schoolCode": "627178",
    "campusCode": "0001",
    "name": "啟思中英文幼稚園(馬鞍山)",
    "nameEn": "CREATIVE ANGLO-CHINESE KINDERGARTEN (MA ON SHAN)",
    "district": "新界",
    "district18": "沙田區",
    "address": "新界沙田馬鞍山馬鞍山中心A1—A舖及2樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_627178000111",
      "edb_627178000112",
      "edb_627178000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "holistic",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "",
    "website": "",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5364150001",
    "schoolCode": "536415",
    "campusCode": "0001",
    "name": "牽晴間培元英文幼稚園",
    "nameEn": "DAWNING VIEWS ELEMENTI ENGLISH KINDERGARTEN",
    "district": "新界",
    "district18": "北區",
    "address": "新界粉嶺一鳴路２３號牽晴間購物廣場地下Ｇ２２–２４號（包括幼兒中心）",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_536415000111",
      "edb_536415000112",
      "edb_536415000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "language_dev",
      "holistic",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "",
    "website": "http://www.elementiedu.org",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_1572360001",
    "schoolCode": "157236",
    "campusCode": "0001",
    "name": "青松湖景幼稚園",
    "nameEn": "CHING CHUNG WU KING KINDERGARTEN",
    "district": "新界",
    "district18": "屯門區",
    "address": "新界屯門湖景邨低層地下湖光樓﹝第二座﹞",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_157236000111",
      "edb_157236000112",
      "edb_157236000113"
    ],
    "pedagogyTags": [
      "project_learn",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english",
      "native_english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24651236",
    "website": "http://www.ccwkk.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5201440002",
    "schoolCode": "520144",
    "campusCode": "0002",
    "name": "青松裕雅幼稚園",
    "nameEn": "CHING CHUNG YU NGA KINDERGARTEN",
    "district": "新界",
    "district18": "離島區",
    "address": "新界東涌裕雅苑雅盛閣地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_520144000211",
      "edb_520144000212",
      "edb_520144000213"
    ],
    "pedagogyTags": [
      "play_explore",
      "holistic",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "trilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "28859168",
    "website": "https://www.ccynkg.edu.hk/background",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5341530001",
    "schoolCode": "534153",
    "campusCode": "0001",
    "name": "青衣商會將軍澳幼稚園",
    "nameEn": "TSING YI TRADE ASSOCIATION TSEUNG KWAN O KINDERGARTEN",
    "district": "新界",
    "district18": "西貢區",
    "address": "新界將軍澳和明苑Ａ座和逸閣地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_534153000111",
      "edb_534153000112",
      "edb_534153000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "22710099",
    "website": "http://www.tsingyitko.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5194480001",
    "schoolCode": "519448",
    "campusCode": "0001",
    "name": "青衣商會石蔭幼稚園",
    "nameEn": "TSING YI TRADE ASSOCIATION SHEK YAM KINDERGARTEN",
    "district": "新界",
    "district18": "葵青區",
    "address": "新界葵涌石蔭東邨蔭恆樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_519448000111",
      "edb_519448000112",
      "edb_519448000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24266885",
    "website": "http://www.sykg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "low",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": true
    }
  },
  {
    "id": "edb_5405600001",
    "schoolCode": "540560",
    "campusCode": "0001",
    "name": "青衣商會天水圍幼稚園",
    "nameEn": "TSING YI TRADE ASSOCIATION TIN SHUI WAI KINDERGARTEN",
    "district": "新界",
    "district18": "元朗區",
    "address": "新界天水圍天悅邨服務設施大樓３樓３號幼稚園",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_540560000111",
      "edb_540560000112",
      "edb_540560000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "project_learn",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "21499333",
    "website": "http://tytatswk.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_1580700001",
    "schoolCode": "158070",
    "campusCode": "0001",
    "name": "青衣商會幼稚園",
    "nameEn": "TSING YI TRADE ASSOCIATION KINDERGARTEN",
    "district": "新界",
    "district18": "葵青區",
    "address": "新界青衣島青華苑停車場大厦地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_158070000111",
      "edb_158070000112",
      "edb_158070000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24316666",
    "website": "http://tytakg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_1522690001",
    "schoolCode": "152269",
    "campusCode": "0001",
    "name": "全完堂幼稚園",
    "nameEn": "CHUEN YUEN CHURCH KINDERGARTEN",
    "district": "新界",
    "district18": "荃灣區",
    "address": "新界荃灣大屋街二至四號地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_152269000111",
      "edb_152269000112"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "holistic",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24920010",
    "website": "http://www.cychurch.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5493550001",
    "schoolCode": "549355",
    "campusCode": "0001",
    "name": "荃浸石籬幼稚園",
    "nameEn": "TSUEN WAN BAPTIST CHURCH SHEK LEI KINDERGARTEN",
    "district": "新界",
    "district18": "葵青區",
    "address": "新界葵涌石籬（二）邨石榮樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_549355000111",
      "edb_549355000112",
      "edb_549355000113"
    ],
    "pedagogyTags": [
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "29436611",
    "website": "http://www.twbcslk.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_1584960001",
    "schoolCode": "158496",
    "campusCode": "0001",
    "name": "荃灣浸信會幼稚園",
    "nameEn": "TSUEN WAN BAPTIST CHURCH KINDERGARTEN",
    "district": "新界",
    "district18": "荃灣區",
    "address": "新界荃灣青山道９９號地下及２樓（荃灣市地段２８４號）",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_158496000111",
      "edb_158496000112",
      "edb_158496000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "project_learn",
      "holistic",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "",
    "website": "",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5180770001",
    "schoolCode": "518077",
    "campusCode": "0001",
    "name": "荃灣商會邱健峰幼稚園",
    "nameEn": "TSUEN WAN TRADE ASSOCIATION YAU KIN FUNG KINDERGARTEN",
    "district": "新界",
    "district18": "葵青區",
    "address": "新界荃灣安蔭邨耀蔭樓地下Ｂ及Ｃ翼和德蔭樓地下Ｂ翼",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_518077000111",
      "edb_518077000112",
      "edb_518077000113"
    ],
    "pedagogyTags": [
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "putonghua",
      "english",
      "native_english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24226828",
    "website": "",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_1586400001",
    "schoolCode": "158640",
    "campusCode": "0001",
    "name": "荃灣商會鍾來幼稚園",
    "nameEn": "TSUEN WAN TRADE ASSOCIATION CHUNG LOI KINDERGARTEN",
    "district": "新界",
    "district18": "葵青區",
    "address": "青衣牙鷹洲街三號青雅苑地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_158640000111",
      "edb_158640000112",
      "edb_158640000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "trilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24333881",
    "website": "http://www.twtaclk.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_1590260001",
    "schoolCode": "159026",
    "campusCode": "0001",
    "name": "荃灣商會朱昌幼稚園",
    "nameEn": "TSUEN WAN TRADE ASSOCIATION CHU CHEONG KINDERGARTEN",
    "district": "新界",
    "district18": "葵青區",
    "address": "葵涌葵興邨興樂樓地下一號室",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_159026000111",
      "edb_159026000112",
      "edb_159026000113"
    ],
    "pedagogyTags": [
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24213313",
    "website": "",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_1539070001",
    "schoolCode": "153907",
    "campusCode": "0001",
    "name": "荃灣聖母幼稚園",
    "nameEn": "TSUEN WAN OUR LADY KINDERGARTEN",
    "district": "新界",
    "district18": "荃灣區",
    "address": "新界荃灣德華街３７－４１號地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_153907000111",
      "edb_153907000112"
    ],
    "pedagogyTags": [
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24900821",
    "website": "http://www.twolkg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5408110001",
    "schoolCode": "540811",
    "campusCode": "0001",
    "name": "仁愛堂鄧楊詠曼幼稚園",
    "nameEn": "YAN OI TONG DAN YANG WING MAN KINDERGARTEN",
    "district": "新界",
    "district18": "西貢區",
    "address": "新界將軍澳彩明苑彩貴閣地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_540811000111",
      "edb_540811000112",
      "edb_540811000113"
    ],
    "pedagogyTags": [
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "",
    "website": "https://ppe.yot.org.hk/kg04/index.php",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5642650001",
    "schoolCode": "564265",
    "campusCode": "0001",
    "name": "仁愛堂劉皇發幼稚園",
    "nameEn": "YAN OI TONG LAU WONG FAT KINDERGARTEN",
    "district": "新界",
    "district18": "屯門區",
    "address": "新界屯門啓民徑18號仁愛堂賽馬會社區及體育中心3樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_564265000113"
    ],
    "pedagogyTags": [
      "project_learn",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "english",
      "native_english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26557771",
    "website": "http://ppe.yot.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_1590930001",
    "schoolCode": "159093",
    "campusCode": "0001",
    "name": "仁愛堂彭鴻樟幼稚園",
    "nameEn": "YAN OI TONG PANG HUNG CHEUNG KINDERGARTEN",
    "district": "新界",
    "district18": "葵青區",
    "address": "新界荃灣大窩口邨富泰樓（第１５座）地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_159093000111",
      "edb_159093000112",
      "edb_159093000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24083000",
    "website": "http://ppe.yot.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5642730001",
    "schoolCode": "564273",
    "campusCode": "0001",
    "name": "仁愛堂田家炳幼稚園",
    "nameEn": "YAN OI TONG TIN KA PING KINDERGARTEN",
    "district": "新界",
    "district18": "屯門區",
    "address": "新界屯門兆康苑兆恒閣及兆順閣平台",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_564273000113"
    ],
    "pedagogyTags": [
      "holistic"
    ],
    "languageEnv": [
      "putonghua",
      "english",
      "native_english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24655719",
    "website": "http://ppe.yot.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5642570001",
    "schoolCode": "564257",
    "campusCode": "0001",
    "name": "仁愛堂吳黃鳳英幼稚園",
    "nameEn": "YAN OI TONG NG WONG FUNG YING KINDERGARTEN",
    "district": "新界",
    "district18": "元朗區",
    "address": "新界元朗天水圍天耀邨天耀社區中心５樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_564257000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24482316",
    "website": "http://ppe.yot.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_1570310001",
    "schoolCode": "157031",
    "campusCode": "0001",
    "name": "仁愛堂顏寶鈴幼稚園",
    "nameEn": "YAN OI TONG NGAN PO LING KINDERGARTEN",
    "district": "新界",
    "district18": "屯門區",
    "address": "新界屯門友愛邨愛義樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_157031000111",
      "edb_157031000112",
      "edb_157031000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "project_learn",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24585033",
    "website": "http://ppe.yot.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_1572790001",
    "schoolCode": "157279",
    "campusCode": "0001",
    "name": "仁愛堂葉德海幼稚園",
    "nameEn": "YAN OI TONG ALLAN YAP KINDERGARTEN",
    "district": "新界",
    "district18": "屯門區",
    "address": "新界屯門湖景邨湖畔樓低座地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_157279000111",
      "edb_157279000112",
      "edb_157279000113"
    ],
    "pedagogyTags": [
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "trilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24658112",
    "website": "http://ppe.yot.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5642810001",
    "schoolCode": "564281",
    "campusCode": "0001",
    "name": "仁愛堂張慕良夫人幼稚園",
    "nameEn": "YAN OI TONG MRS AUGUSTA CHEUNG KINDERGARTEN",
    "district": "新界",
    "district18": "大埔區",
    "address": "新界大埔運頭塘邨鄰里社區中心３樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_564281000113"
    ],
    "pedagogyTags": [
      "language_dev"
    ],
    "languageEnv": [
      "putonghua",
      "english",
      "native_english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26383082",
    "website": "http://ppe.yot.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_6185940001",
    "schoolCode": "618594",
    "campusCode": "0001",
    "name": "仁愛堂鄭丁港夫人幼稚園",
    "nameEn": "YAN OI TONG MRS CHENG TING KONG KINDERGARTEN",
    "district": "新界",
    "district18": "沙田區",
    "address": "新界沙田火炭桂地街20號駿洋邨駿洋商場地下KG01號舖",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_618594000111",
      "edb_618594000112",
      "edb_618594000113"
    ],
    "pedagogyTags": [
      "holistic"
    ],
    "languageEnv": [
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26824000",
    "website": "https://www.yotmctk.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5628900001",
    "schoolCode": "562890",
    "campusCode": "0001",
    "name": "仁濟醫院蔡百泰幼稚園",
    "nameEn": "YAN CHAI HOSPITAL CHOI PAT TAI KINDERGARTEN",
    "district": "新界",
    "district18": "荃灣區",
    "address": "新界荃灣仁濟街18號仁濟醫院綜合服務大樓1樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_562890000113"
    ],
    "pedagogyTags": [
      "project_learn",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24399661",
    "website": "https://www.ychcptkg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5634040001",
    "schoolCode": "563404",
    "campusCode": "0001",
    "name": "仁濟醫院董伯英幼稚園",
    "nameEn": "YAN CHAI HOSPITAL TUNG PAK YING KINDERGARTEN",
    "district": "新界",
    "district18": "葵青區",
    "address": "新界葵涌石籬一邨石泰樓Ｂ及Ｃ翼地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_563404000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24801953",
    "website": "http://www.ychtpy.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5633820001",
    "schoolCode": "563382",
    "campusCode": "0001",
    "name": "仁濟醫院九龍崇德社幼稚園",
    "nameEn": "YAN CHAI HOSPITAL ZONTA CLUB OF KOWLOON KINDERGARTEN",
    "district": "新界",
    "district18": "葵青區",
    "address": "新界青衣長亨邨亨業樓地下Ｂ翼及Ａ翼部份",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_563382000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24341420",
    "website": "http://www.ychzc.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5634200001",
    "schoolCode": "563420",
    "campusCode": "0001",
    "name": "仁濟醫院林李婉冰幼稚園",
    "nameEn": "YAN CHAI HOSPITAL NINA LAM KINDERGARTEN",
    "district": "新界",
    "district18": "元朗區",
    "address": "新界元朗天水圍天河路６號仁濟醫院第２４屆董事局社會服務中心地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_563420000113"
    ],
    "pedagogyTags": [
      "play_explore"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24452110",
    "website": "http://www.ychnlkg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5439180001",
    "schoolCode": "543918",
    "campusCode": "0001",
    "name": "仁濟醫院明德幼稚園",
    "nameEn": "YAN CHAI HOSPITAL MING TAK KINDERGARTEN",
    "district": "新界",
    "district18": "元朗區",
    "address": "新界元朗天水圍天恒邨第一座恒健樓地下Ｂ及Ｃ翼幼稚園",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_543918000111",
      "edb_543918000112",
      "edb_543918000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "language_dev"
    ],
    "languageEnv": [
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24865080",
    "website": "http://www.ychmtk.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5633740001",
    "schoolCode": "563374",
    "campusCode": "0001",
    "name": "仁濟醫院裘錦秋幼稚園",
    "nameEn": "YAN CHAI HOSPITAL JU CHING CHU KINDERGARTEN",
    "district": "新界",
    "district18": "葵青區",
    "address": "新界葵涌安蔭邨澤蔭樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_563374000113"
    ],
    "pedagogyTags": [
      "play_explore"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24801975",
    "website": "http://www.jcc.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5634120001",
    "schoolCode": "563412",
    "campusCode": "0001",
    "name": "仁濟醫院山景幼稚園",
    "nameEn": "YAN CHAI HOSPITAL SHAN KING KINDERGARTEN",
    "district": "新界",
    "district18": "屯門區",
    "address": "新界屯門山景邨第一期社區會堂側",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_563412000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "project_learn",
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english",
      "native_english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24551849",
    "website": "http://www.ychskkg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5391630002",
    "schoolCode": "539163",
    "campusCode": "0002",
    "name": "仁濟醫院嚴徐玉珊幼稚園",
    "nameEn": "YAN CHAI HOSPITAL YIM TSUI YUK SHAN KINDERGARTEN",
    "district": "新界",
    "district18": "屯門區",
    "address": "新界屯門和田邨和麗樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_539163000211",
      "edb_539163000212",
      "edb_539163000213"
    ],
    "pedagogyTags": [
      "project_learn"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "",
    "website": "",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5633900001",
    "schoolCode": "563390",
    "campusCode": "0001",
    "name": "仁濟醫院永隆幼稚園",
    "nameEn": "YAN CHAI HOSPITAL WING LUNG KINDERGARTEN",
    "district": "新界",
    "district18": "北區",
    "address": "新界上水彩園邨彩玉樓地下107-120 122及124",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_563390000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "project_learn",
      "project_learn",
      "language_dev",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "putonghua"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26797337",
    "website": "http://www.ychwl.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5633660001",
    "schoolCode": "563366",
    "campusCode": "0001",
    "name": "仁濟醫院友愛幼稚園",
    "nameEn": "YAN CHAI HOSPITAL YAU OI KINDERGARTEN",
    "district": "新界",
    "district18": "屯門區",
    "address": "新界屯門友愛邨愛暉樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_563366000113"
    ],
    "pedagogyTags": [
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24502143",
    "website": "http://www.ychyo.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_1590500001",
    "schoolCode": "159050",
    "campusCode": "0001",
    "name": "嗇色園主辦可瑞幼稚園",
    "nameEn": "HO SHUI KINDERGARTEN SPONSORED BY SIK SIK YUEN",
    "district": "新界",
    "district18": "元朗區",
    "address": "新界元朗天水圍天瑞邨瑞勝樓（第五座）地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_159050000111",
      "edb_159050000112",
      "edb_159050000113"
    ],
    "pedagogyTags": [
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24480368",
    "website": "http://www.hoshuikg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5257580001",
    "schoolCode": "525758",
    "campusCode": "0001",
    "name": "嗇色園主辦可正幼稚園",
    "nameEn": "HO CHING KINDERGARTEN (SPONSORED BY SIK SIK YUEN)",
    "district": "新界",
    "district18": "西貢區",
    "address": "新界將軍澳廣明苑廣寧閣(F座)地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_525758000111",
      "edb_525758000112",
      "edb_525758000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "project_learn",
      "language_dev",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "21782244",
    "website": "http://www.siksikyuen.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5638620001",
    "schoolCode": "563862",
    "campusCode": "0001",
    "name": "沙田靈光幼兒學校",
    "nameEn": "EMMANUEL CHURCH SHATIN NURSERY SCHOOL",
    "district": "新界",
    "district18": "沙田區",
    "address": "新界沙田廣源邨廣柏樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_563862000113"
    ],
    "pedagogyTags": [
      "project_learn",
      "project_learn",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "putonghua",
      "english",
      "native_english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26350536",
    "website": "http://www.ecsdn.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5561220001",
    "schoolCode": "556122",
    "campusCode": "0001",
    "name": "善一堂逸東幼稚園",
    "nameEn": "SHIN YAT TONG YAT TUNG KINDERGARTEN",
    "district": "新界",
    "district18": "離島區",
    "address": "新界東涌逸東邨逸東商場二期一樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_556122000111",
      "edb_556122000112",
      "edb_556122000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "project_learn",
      "project_learn",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26071291",
    "website": "http://www.hksytma.org.hk/11/kindergarten%20Yat%20Tung.htm",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5825300001",
    "schoolCode": "582530",
    "campusCode": "0001",
    "name": "善正幼稚園",
    "nameEn": "SIN CHING KINDERGARTEN",
    "district": "新界",
    "district18": "葵青區",
    "address": "新界葵涌荔景邨風景樓地下８號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "WD"
    ],
    "variantIds": [
      "edb_582530000111",
      "edb_582530000113"
    ],
    "pedagogyTags": [
      "project_learn",
      "project_learn"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "28689936",
    "website": "http://www.sck.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_1582080001",
    "schoolCode": "158208",
    "campusCode": "0001",
    "name": "上水惠州幼稚園(分校)",
    "nameEn": "SHEUNG SHUI WAI CHOW KINDERGARTEN (BRANCH)",
    "district": "新界",
    "district18": "北區",
    "address": "新界上水天平邨天祥樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_158208000111",
      "edb_158208000112",
      "edb_158208000113"
    ],
    "pedagogyTags": [
      "project_learn"
    ],
    "languageEnv": [
      "putonghua",
      "english",
      "native_english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26712968",
    "website": "http://www.sswckge.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_1574060001",
    "schoolCode": "157406",
    "campusCode": "0001",
    "name": "上水禮賢會幼稚園",
    "nameEn": "SHEUNG SHUI RHENISH CHURCH KINDERGARTEN",
    "district": "新界",
    "district18": "北區",
    "address": "新界上水彩園邨彩華樓地下101-107及109-111號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_157406000111",
      "edb_157406000112",
      "edb_157406000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26372929",
    "website": "",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_1508430001",
    "schoolCode": "150843",
    "campusCode": "0001",
    "name": "上水堂幼稚園",
    "nameEn": "SHEUNG SHUI CHURCH KINDERGARTEN",
    "district": "新界",
    "district18": "北區",
    "address": "新界上水馬會道２３號（課室Ａ至Ｅ除外）",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_150843000111",
      "edb_150843000112",
      "edb_150843000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "project_learn",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26721848",
    "website": "http://www.ssckg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_1577910001",
    "schoolCode": "157791",
    "campusCode": "0001",
    "name": "神召會華人同工聯會彩蒲幼稚園",
    "nameEn": "CHINESE CHRISTIAN WORKER'S FELLOWSHIP LTD. CHOI PO KINDERGARTEN",
    "district": "新界",
    "district18": "北區",
    "address": "新界上水彩蒲苑停車場大廈地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_157791000111",
      "edb_157791000112",
      "edb_157791000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26735088",
    "website": "http://www.choipokg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5190900001",
    "schoolCode": "519090",
    "campusCode": "0001",
    "name": "神召會華人同工聯會景盛幼稚園",
    "nameEn": "CHINESE CHRISTIAN WORKER'S FELLOWSHIP LIMITED, KING SHING KINDERGARTEN",
    "district": "新界",
    "district18": "北區",
    "address": "新界粉嶺景盛苑歡景閣地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_519090000111",
      "edb_519090000112",
      "edb_519090000113"
    ],
    "pedagogyTags": [
      "project_learn",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "",
    "website": "http://www.kingshingkg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5660120001",
    "schoolCode": "566012",
    "campusCode": "0001",
    "name": "神召會禮拜堂天澤幼兒園",
    "nameEn": "FIRST ASSEMBLY OF GOD CHURCH TIN CHAK NURSERY",
    "district": "新界",
    "district18": "元朗區",
    "address": "新界天水圍天澤邨澤辰樓Ｂ及Ｃ翼地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "WD"
    ],
    "variantIds": [
      "edb_566012000111",
      "edb_566012000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "project_learn"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24863456",
    "website": "http://tcn.faog.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_2315840001",
    "schoolCode": "231584",
    "campusCode": "0001",
    "name": "聖安多尼中英文幼稚園(麗城花園)",
    "nameEn": "ST. ANTHONY'S KINDERGARTEN (BELVEDERE GARDEN)",
    "district": "新界",
    "district18": "荃灣區",
    "address": "新界荃灣青山公路625號麗城花園第三期第1座平台",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_231584000111",
      "edb_231584000112",
      "edb_231584000113"
    ],
    "pedagogyTags": [
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24907311",
    "website": "https://www.belvedere-garden.stanthonyskg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5266650001",
    "schoolCode": "526665",
    "campusCode": "0001",
    "name": "聖公會荊冕堂葵涌幼稚園",
    "nameEn": "S.K.H. CROWN OF THORNS CHURCH KWAI CHUNG KINDERGARTEN",
    "district": "新界",
    "district18": "葵青區",
    "address": "新界葵涌邨春葵樓地下四號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_526665000111",
      "edb_526665000112",
      "edb_526665000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24240321",
    "website": "http://skhcotkg.edu.hk/kc",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_1530870001",
    "schoolCode": "153087",
    "campusCode": "0001",
    "name": "聖公會荊冕堂士德幼稚園",
    "nameEn": "S.K.H. CROWN OF THORNS CHURCH SADICK KINDERGARTEN",
    "district": "新界",
    "district18": "葵青區",
    "address": "新界荃灣德士古道６７－７３號地下至一樓及三樓至四樓部分",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_153087000111",
      "edb_153087000112",
      "edb_153087000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26145323",
    "website": "http://skhcotkg.edu.hk/sd",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_1581190001",
    "schoolCode": "158119",
    "campusCode": "0001",
    "name": "聖公會救主堂幼稚園",
    "nameEn": "SHENG KUNG HUI THE CHURCH OF OUR SAVIOUR KINDERGARTEN",
    "district": "新界",
    "district18": "大埔區",
    "address": "新界大埔廣福邨廣仁樓２１０–２１９號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_158119000111",
      "edb_158119000112",
      "edb_158119000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "trilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26511778",
    "website": "http://www.saviourkg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_1564930001",
    "schoolCode": "156493",
    "campusCode": "0001",
    "name": "聖公會靈風堂幼稚園",
    "nameEn": "S.K.H. HOLY SPIRIT CHURCH KINDERGARTEN",
    "district": "新界",
    "district18": "沙田區",
    "address": "118-129, SHUN WO HOUSE, WO CHE ESTATE, SHATIN NEW TERRITORIES",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_156493000111",
      "edb_156493000112",
      "edb_156493000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "project_learn",
      "language_dev",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26975622",
    "website": "",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_1574730001",
    "schoolCode": "157473",
    "campusCode": "0001",
    "name": "聖公會青山聖彼得堂山景邨幼稚園",
    "nameEn": "S.K.H. ST. PETER'S CHURCH SHAN KING ESTATE KINDERGARTEN",
    "district": "新界",
    "district18": "屯門區",
    "address": "新界屯門山景邨第一期景貴樓地下１至１１號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_157473000111",
      "edb_157473000112",
      "edb_157473000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english",
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24668366",
    "website": "http://www.spckg.edu.hk/shanking/shanking.html",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_1519470001",
    "schoolCode": "151947",
    "campusCode": "0001",
    "name": "聖公會青山聖彼得堂幼稚園",
    "nameEn": "S.K.H. ST. PETER'S CHURCH KINDERGARTEN (CASTLE PEAK)",
    "district": "新界",
    "district18": "屯門區",
    "address": "新界屯門青雲路",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_151947000111",
      "edb_151947000112",
      "edb_151947000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24619133",
    "website": "http://www.spckg.edu.hk/jing/jing.html",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_1591310001",
    "schoolCode": "159131",
    "campusCode": "0001",
    "name": "聖公會青山聖彼得堂兆麟苑幼稚園",
    "nameEn": "S.K.H. ST. PETER'S CHURCH CASTLE PEAK SIU LUN COURT KINDERGARTEN",
    "district": "新界",
    "district18": "屯門區",
    "address": "新界屯門兆麟苑商場地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_159131000111",
      "edb_159131000112",
      "edb_159131000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english",
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26182868",
    "website": "http://www.spckg.edu.hk/siulun/siulun.html",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5681040001",
    "schoolCode": "568104",
    "campusCode": "0001",
    "name": "聖公會聖基道幼兒園（葵涌）",
    "nameEn": "S K H ST CHRISTOPHER'S NURSERY (KWAI CHUNG)",
    "district": "新界",
    "district18": "葵青區",
    "address": "新界葵涌邨葵涌商場３樓平台１號單位",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_568104000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "22579331",
    "website": "http://www.skhkckg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5647100001",
    "schoolCode": "564710",
    "campusCode": "0001",
    "name": "聖公會聖馬提亞堂幼兒學校",
    "nameEn": "ST MATTHIAS' CHURCH NURSERY SCHOOL",
    "district": "新界",
    "district18": "元朗區",
    "address": "新界元朗水邊圍邨湖水樓１５－２０號地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_564710000113"
    ],
    "pedagogyTags": [
      "language_dev",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "putonghua",
      "english",
      "cantonese",
      "native_english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24799938",
    "website": "http://www.smcns.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_1546010001",
    "schoolCode": "154601",
    "campusCode": "0001",
    "name": "聖公會聖約瑟堂幼稚園",
    "nameEn": "S.K.H. ST. JOSEPH'S CHURCH KINDERGARTEN",
    "district": "新界",
    "district18": "元朗區",
    "address": "新界元朗八鄉吳家村８３Ａ號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_154601000111",
      "edb_154601000112"
    ],
    "pedagogyTags": [
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24882813",
    "website": "http://www.sjckg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_1567950001",
    "schoolCode": "156795",
    "campusCode": "0001",
    "name": "聖馬提亞堂肖珍幼稚園",
    "nameEn": "ST. MATTHIAS' CHURCH CHIU CHUN KINDERGARTEN",
    "district": "新界",
    "district18": "元朗區",
    "address": "新界元朗媽廟路九號地下至二樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_156795000111",
      "edb_156795000112"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "project_learn",
      "project_learn",
      "language_dev",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24794262",
    "website": "http://www.chiuchunkg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_1510090001",
    "schoolCode": "151009",
    "campusCode": "0001",
    "name": "聖母無玷聖心幼稚園",
    "nameEn": "IMMACULATE HEART OF MARY KINDERGARTEN",
    "district": "新界",
    "district18": "沙田區",
    "address": "新界沙田文禮路31-37號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_151009000111",
      "edb_151009000112"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "play_explore",
      "play_explore",
      "project_learn"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26914882",
    "website": "http://www.ihmk.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_1568410001",
    "schoolCode": "156841",
    "campusCode": "0001",
    "name": "聖斯德望天主教幼稚園",
    "nameEn": "ST. STEPHEN'S CATHOLIC KINDERGARTEN",
    "district": "新界",
    "district18": "葵青區",
    "address": "下葵涌榮芳路１４號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_156841000111",
      "edb_156841000112"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "putonghua"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24872723",
    "website": "http://www.stepckg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5661870001",
    "schoolCode": "566187",
    "campusCode": "0001",
    "name": "聖文嘉幼稚園(荃灣)",
    "nameEn": "ST MONICA'S KINDERGARTEN (TSUEN WAN)",
    "district": "新界",
    "district18": "荃灣區",
    "address": "新界荃灣麗城薈第二期第一座地下十二號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_566187000111",
      "edb_566187000112",
      "edb_566187000113"
    ],
    "pedagogyTags": [
      "language_dev"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24137320",
    "website": "http://stmonicatw.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_2315330001",
    "schoolCode": "231533",
    "campusCode": "0001",
    "name": "聖文嘉中英文幼稚園（荃灣）",
    "nameEn": "ST. MONICA'S ANGLO-CHINESE KINDERGARTEN (TSUEN WAN)",
    "district": "新界",
    "district18": "荃灣區",
    "address": "新界荃灣青山公路荃灣段６２０號麗城薈二期地下１１號舖幼稚園",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_231533000111",
      "edb_231533000112"
    ],
    "pedagogyTags": [
      "language_dev"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24155650",
    "website": "http://www.stmonicakg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5347900001",
    "schoolCode": "534790",
    "campusCode": "0001",
    "name": "世德幼稚園",
    "nameEn": "CASTAR KINDERGARTEN",
    "district": "新界",
    "district18": "元朗區",
    "address": "新界元朗天水圍天華邨服務設施大樓三樓一號幼稚園",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_534790000111",
      "edb_534790000112",
      "edb_534790000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "english",
      "native_english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "22536288",
    "website": "http://www.castar.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5656280001",
    "schoolCode": "565628",
    "campusCode": "0001",
    "name": "世德幼稚園（梨木樹）",
    "nameEn": "CASTAR KINDERGARTEN (LEI MUK SHUE)",
    "district": "新界",
    "district18": "荃灣區",
    "address": "新界葵涌梨木樹邨翠樹樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_565628000111",
      "edb_565628000112",
      "edb_565628000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "english",
      "native_english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "34469178",
    "website": "http://www.castar.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5659110001",
    "schoolCode": "565911",
    "campusCode": "0001",
    "name": "世佛會觀自在幼兒學校",
    "nameEn": "W.F.B. AVALOKITESVARA NURSERY SCHOOL",
    "district": "新界",
    "district18": "屯門區",
    "address": "新界屯門龍門居停車場１樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_565911000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "language_dev",
      "language_dev",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24495008",
    "website": "http://www.wfb.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5659030001",
    "schoolCode": "565903",
    "campusCode": "0001",
    "name": "世佛會文殊幼兒學校",
    "nameEn": "W.F.B. MANJUSRI NURSERY SCHOOL",
    "district": "新界",
    "district18": "葵青區",
    "address": "新界青衣長康邨康安樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_565903000111",
      "edb_565903000112",
      "edb_565903000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "language_dev",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "trilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24957897",
    "website": "https://www.wfb.edu.hk/man",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5658900001",
    "schoolCode": "565890",
    "campusCode": "0001",
    "name": "世佛會真言宗幼兒學校",
    "nameEn": "W.F.B. MANTRA INSTITUTE NURSERY SCHOOL",
    "district": "新界",
    "district18": "屯門區",
    "address": "新界屯門兆禧苑商埸地下２號舖",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_565890000113"
    ],
    "pedagogyTags": [
      "holistic"
    ],
    "languageEnv": [
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24573959",
    "website": "http://wfb.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_1583800001",
    "schoolCode": "158380",
    "campusCode": "0001",
    "name": "世界龍岡學校朱瑞蘭（中英文）幼稚園",
    "nameEn": "LUNG KONG WORLD FEDERATION SCHOOL LIMITED CHU SUI LAN ANGLO-CHINESE KINDERGARTEN",
    "district": "新界",
    "district18": "屯門區",
    "address": "新界屯門良景邨良傑樓地下１－１０號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_158380000111",
      "edb_158380000112",
      "edb_158380000113"
    ],
    "pedagogyTags": [
      "project_learn"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24562677",
    "website": "http://lkwfs.etlw.com.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_1581600001",
    "schoolCode": "158160",
    "campusCode": "0001",
    "name": "順德聯誼總會梁李秀娛沙田幼稚園",
    "nameEn": "SHUN TAK FRATERNAL ASSOCIATION LEUNG LEE SAU YU (SHATIN) KINDERGARTEN",
    "district": "新界",
    "district18": "沙田區",
    "address": "新界沙田顯徑邨顯德樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_158160000111",
      "edb_158160000112",
      "edb_158160000113"
    ],
    "pedagogyTags": [
      "project_learn",
      "language_dev",
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english",
      "bilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26993499",
    "website": "http://www.stfa-llsystkg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_1570900001",
    "schoolCode": "157090",
    "campusCode": "0001",
    "name": "順德聯誼總會屯門梁李秀娛幼稚園",
    "nameEn": "SHUN TAK FRATERNAL ASSOCIATION TUEN MUN LEUNG LEE SAU YU KINDERGARTEN",
    "district": "新界",
    "district18": "屯門區",
    "address": "新界屯門安定邨定康樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_157090000111",
      "edb_157090000112",
      "edb_157090000113"
    ],
    "pedagogyTags": [
      "project_learn",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "",
    "website": "http://www.tmllsykg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5739730001",
    "schoolCode": "573973",
    "campusCode": "0001",
    "name": "思百德國際幼稚園",
    "nameEn": "ZEBEDEE INTERNATIONAL PRESCHOOL",
    "district": "新界",
    "district18": "大埔區",
    "address": "新界大埔逸雅苑逸榮閣地下Ａ翼及Ｂ翼",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_573973000111",
      "edb_573973000112"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26503339",
    "website": "http://www.zebedee.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "medium",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5908600001",
    "schoolCode": "590860",
    "campusCode": "0001",
    "name": "思博幼稚園",
    "nameEn": "SWINDON KINDERGARTEN",
    "district": "新界",
    "district18": "荃灣區",
    "address": "新界荃灣沙咀道３２８號寶石大廈商場１０８號舖",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_590860000111",
      "edb_590860000112"
    ],
    "pedagogyTags": [],
    "languageEnv": [],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26176108",
    "website": "http://www.swindon.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "low",
      "languageConfidence": "low",
      "needsReview": true
    }
  },
  {
    "id": "edb_1585930001",
    "schoolCode": "158593",
    "campusCode": "0001",
    "name": "太平幼稚園",
    "nameEn": "TAI PING KINDERGARTEN",
    "district": "新界",
    "district18": "北區",
    "address": "新界上水太平邨平易樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_158593000111",
      "edb_158593000112",
      "edb_158593000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "language_dev",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "english",
      "native_english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26733199",
    "website": "http://www.taiping.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_2313470001",
    "schoolCode": "231347",
    "campusCode": "0001",
    "name": "太陽島英文幼稚園（葵興分校）",
    "nameEn": "SUN ISLAND ENGLISH KINDERGARTEN (KWAI HING BRANCH)",
    "district": "新界",
    "district18": "葵青區",
    "address": "葵興新葵興花園平台",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_231347000111",
      "edb_231347000112",
      "edb_231347000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "english",
      "native_english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24255003",
    "website": "http://www.sunisland.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5257310001",
    "schoolCode": "525731",
    "campusCode": "0001",
    "name": "太陽島英文幼稚園（西貢分校）",
    "nameEn": "SUN ISLAND ENGLISH KINDERGARTEN (SAI KUNG BRANCH)",
    "district": "新界",
    "district18": "西貢區",
    "address": "新界西貢翠塘路１號翠塘花園１１座地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_525731000111",
      "edb_525731000112",
      "edb_525731000113"
    ],
    "pedagogyTags": [
      "play_explore"
    ],
    "languageEnv": [
      "trilingual",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23391145",
    "website": "http://www.sunisland.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_2310100002",
    "schoolCode": "231010",
    "campusCode": "0002",
    "name": "太陽島英文幼稚園(元朗分校)",
    "nameEn": "SUN ISLAND ENGLISH KINDERGARTEN (YUEN LONG BRANCH)",
    "district": "新界",
    "district18": "元朗區",
    "address": "新界元朗朗日路8號形點IIL3樓號舖",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_231010000211",
      "edb_231010000212",
      "edb_231010000213"
    ],
    "pedagogyTags": [
      "play_explore",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "english",
      "native_english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24773277",
    "website": "http://www.sunisland.com.hk/chi/campus-yl.php",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5555760001",
    "schoolCode": "555576",
    "campusCode": "0001",
    "name": "太陽島幼稚園（東涌分校）",
    "nameEn": "SUN ISLAND KINDERGARTEN (TUNG CHUNG BRANCH)",
    "district": "新界",
    "district18": "離島區",
    "address": "新界東涌海濱路１２號藍天海岸地下Ｋ０１號舖",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_555576000111",
      "edb_555576000112"
    ],
    "pedagogyTags": [
      "play_explore",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "english",
      "native_english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24201068",
    "website": "http://www.sunisland.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_1577320001",
    "schoolCode": "157732",
    "campusCode": "0001",
    "name": "天純幼稚園",
    "nameEn": "PRISTINE KINDERGARTEN",
    "district": "新界",
    "district18": "元朗區",
    "address": "新界元朗元朗市地段第３７５號達輝徑華健大厦一樓Ｂ、Ｃ及Ｄ座",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_157732000111",
      "edb_157732000112"
    ],
    "pedagogyTags": [
      "project_learn",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24796867",
    "website": "http://www.pristine.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_1565150001",
    "schoolCode": "156515",
    "campusCode": "0001",
    "name": "天后中英文幼稚園",
    "nameEn": "REGINA COELI ANGLO-CHINESE KINDERGARTEN",
    "district": "新界",
    "district18": "屯門區",
    "address": "新界屯門大興邨興盛樓地下及二樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_156515000111",
      "edb_156515000112",
      "edb_156515000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "project_learn",
      "holistic",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24622949",
    "website": "http://www.rck.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_1567280001",
    "schoolCode": "156728",
    "campusCode": "0001",
    "name": "天后中英文幼稚園（二校）",
    "nameEn": "REGINA COELI ANGLO-CHINESE KINDERGARTEN (SECOND BRANCH)",
    "district": "新界",
    "district18": "屯門區",
    "address": "新界屯門三聖邨滿漁樓地下１１－１６號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_156728000111",
      "edb_156728000112",
      "edb_156728000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "",
    "website": "http://www.rck.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "low",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": true
    }
  },
  {
    "id": "edb_5379500001",
    "schoolCode": "537950",
    "campusCode": "0001",
    "name": "天樂幼稚園",
    "nameEn": "TALENT KINDERGARTEN",
    "district": "新界",
    "district18": "元朗區",
    "address": "新界元朗天水圍天龍路2號嘉湖山莊景湖居幼稚園校舍(包括幼兒中心)",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_537950000111",
      "edb_537950000112",
      "edb_537950000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "31522600",
    "website": "http://www.agneskg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5434890001",
    "schoolCode": "543489",
    "campusCode": "0001",
    "name": "天水圍宣道幼稚園",
    "nameEn": "TIN SHUI WAI ALLIANCE KINDERGARTEN",
    "district": "新界",
    "district18": "元朗區",
    "address": "新界元朗天水圍天恆邨第三座恆富樓地下Ｂ及Ｃ翼幼稚園",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_543489000111",
      "edb_543489000112",
      "edb_543489000113"
    ],
    "pedagogyTags": [
      "project_learn",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24865226",
    "website": "http://www.ttkg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_1585850001",
    "schoolCode": "158585",
    "campusCode": "0001",
    "name": "天主教大埔幼稚園",
    "nameEn": "TAI PO CATHOLIC KINDERGARTEN",
    "district": "新界",
    "district18": "大埔區",
    "address": "新界大埔寶雅苑家和閣地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "WD"
    ],
    "variantIds": [
      "edb_158585000111",
      "edb_158585000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "project_learn",
      "language_dev"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "",
    "website": "http://www.taipokg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_1592200001",
    "schoolCode": "159220",
    "campusCode": "0001",
    "name": "天主教領報幼稚園",
    "nameEn": "ANNUNCIATION CATHOLIC KINDERGARTEN",
    "district": "新界",
    "district18": "荃灣區",
    "address": "新界荃灣柴灣角安賢街十一號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_159220000111",
      "edb_159220000112"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24907893",
    "website": "http://www.ack.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_1515640001",
    "schoolCode": "151564",
    "campusCode": "0001",
    "name": "天主教露德聖母幼稚園",
    "nameEn": "OUR LADY OF LOURDES CATHOLIC KINDERGARTEN",
    "district": "新界",
    "district18": "離島區",
    "address": "新界南丫島第３約第１７０９地段",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_151564000111",
      "edb_151564000112",
      "edb_151564000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "29820359",
    "website": "http://www.ololckg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5597680001",
    "schoolCode": "559768",
    "campusCode": "0001",
    "name": "天主教聖安德肋幼稚園",
    "nameEn": "ST ANDREW'S CATHOLIC KINDERGARTEN",
    "district": "新界",
    "district18": "西貢區",
    "address": "新界西貢將軍澳常寧路第３７區",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_559768000111",
      "edb_559768000112"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "21748318",
    "website": "http://www.sackg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_6178490001",
    "schoolCode": "617849",
    "campusCode": "0001",
    "name": "天主教聖保祿幼兒園",
    "nameEn": "ST. PAUL'S CATHOLIC DAY NURSERY",
    "district": "新界",
    "district18": "大埔區",
    "address": "新界大埔運頭街28號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_617849000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "",
    "website": "http://www.spcn.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5325330001",
    "schoolCode": "532533",
    "campusCode": "0001",
    "name": "天主教聖多默幼稚園",
    "nameEn": "ST. THOMAS' CATHOLIC KINDERGARTEN",
    "district": "新界",
    "district18": "葵青區",
    "address": "新界青衣青綠街5號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_532533000111",
      "edb_532533000112",
      "edb_532533000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24499879",
    "website": "http://www.stthomas.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5430120001",
    "schoolCode": "543012",
    "campusCode": "0001",
    "name": "天主教聖葉理諾幼稚園",
    "nameEn": "ST. JEROME'S CATHOLIC KINDERGARTEN",
    "district": "新界",
    "district18": "元朗區",
    "address": "新界元朗天水圍天美街６號２樓及３樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_543012000111",
      "edb_543012000112",
      "edb_543012000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "project_learn",
      "holistic",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24864077",
    "website": "http://www.stjeromesckg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_1587470001",
    "schoolCode": "158747",
    "campusCode": "0001",
    "name": "田景邨浸信會呂郭碧鳳幼稚園",
    "nameEn": "TIN KING ESTATE BAPTIST LUI KWOK PAT FONG KINDERGARTEN",
    "district": "新界",
    "district18": "屯門區",
    "address": "新界屯門兆邦苑地下單位１－１０號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_158747000111",
      "edb_158747000112",
      "edb_158747000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn"
    ],
    "languageEnv": [
      "english",
      "native_english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24557187",
    "website": "http://www.tkkg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5980540001",
    "schoolCode": "598054",
    "campusCode": "0001",
    "name": "童樂天國際幼稚園",
    "nameEn": "MULBERRY TREE INTERNATIONAL KINDERGARTEN",
    "district": "新界",
    "district18": "沙田區",
    "address": "新界沙田沙角街8-12號花園城第一期三樓",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_598054000111",
      "edb_598054000112"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "special_curriculum",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "92215811",
    "website": "https://www.mulberrytree.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_6198500001",
    "schoolCode": "619850",
    "campusCode": "0001",
    "name": "維多利亞(海之戀)國際幼稚園",
    "nameEn": "VICTORIA (OCEAN PRIDE) INTERNATIONAL KINDERGARTEN",
    "district": "新界",
    "district18": "荃灣區",
    "address": "新界荃灣西大河道100號海之戀商場地下G36—G37及地下幼稚園",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "ib",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_619850000111",
      "edb_619850000112"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "play_explore",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english",
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "21866222",
    "website": "",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_1530360001",
    "schoolCode": "153036",
    "campusCode": "0001",
    "name": "西貢樂育幼稚園",
    "nameEn": "SAI KUNG LOK-YUK KINDERGARTEN",
    "district": "新界",
    "district18": "西貢區",
    "address": "西貢西貢墟普通道１９Ｅ",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_153036000111",
      "edb_153036000112",
      "edb_153036000113"
    ],
    "pedagogyTags": [
      "project_learn",
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27922245",
    "website": "http://www.sklokyuk.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5650590001",
    "schoolCode": "565059",
    "campusCode": "0001",
    "name": "香港保護兒童會蝴蝶邨幼兒學校",
    "nameEn": "HONG KONG SOCIETY FOR THE PROTECTION OF CHILDREN BUTTERFLY ESTATE NURSERY SCHOOL",
    "district": "新界",
    "district18": "屯門區",
    "address": "新界屯門蝴蝶邨蝶舞樓１２４－１３０號地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_565059000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24677755",
    "website": "http://www.hkspc.org",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5652370001",
    "schoolCode": "565237",
    "campusCode": "0001",
    "name": "香港保護兒童會林護幼兒學校",
    "nameEn": "HONG KONG SOCIETY FOR THE PROTECTION OF CHILDREN LAM WOO NURSERY SCHOOL",
    "district": "新界",
    "district18": "大埔區",
    "address": "新界大埔富亨邨富亨鄰里社區中心3樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_565237000113"
    ],
    "pedagogyTags": [
      "project_learn"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26607808",
    "website": "https://ns.hkspc.org/lw",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5652610001",
    "schoolCode": "565261",
    "campusCode": "0001",
    "name": "香港保護兒童會賽馬會學心幼兒學校",
    "nameEn": "HONG KONG SOCIETY FOR THE PROTECTION OF CHILDREN THE JOCKEY CLUB HOK SAM NURSERY SCHOOL",
    "district": "新界",
    "district18": "沙田區",
    "address": "新界沙田隆亨邨學心樓101-108號地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_565261000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26057360",
    "website": "https://ns.hkspc.org/jchs",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5652960001",
    "schoolCode": "565296",
    "campusCode": "0001",
    "name": "香港保護兒童會深井幼兒學校",
    "nameEn": "HONG KONG SOCIETY FOR THE PROTECTION OF CHILDREN SHAM TSENG NURSERY SCHOOL",
    "district": "新界",
    "district18": "荃灣區",
    "address": "新界青山公路３３號深井灣畔碧堤半島碧堤坊５樓５０１室",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_565296000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "31840359",
    "website": "http://www.hkspc.org",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5652020001",
    "schoolCode": "565202",
    "campusCode": "0001",
    "name": "香港保護兒童會聖誕老人愛心粉嶺幼兒學校",
    "nameEn": "HONG KONG SOCIETY FOR THE PROTECTION OF CHILDREN OPERATION SANTA CLAUS FANLING NURSERY SCHOOL",
    "district": "新界",
    "district18": "北區",
    "address": "新界粉嶺華心邨華冠樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_565202000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26764000",
    "website": "http://www.hkspc.org",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5652700001",
    "schoolCode": "565270",
    "campusCode": "0001",
    "name": "香港保護兒童會施吳淑敏幼兒學校",
    "nameEn": "HONG KONG SOCIETY FOR THE PROTECTION OF CHILDREN SZE WU SHU MIN NURSERY SCHOOL",
    "district": "新界",
    "district18": "西貢區",
    "address": "新界將軍澳廣明苑廣新閣B翼及C翼地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_565270000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "21783819",
    "website": "http://www.hkspc.org",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5650080001",
    "schoolCode": "565008",
    "campusCode": "0001",
    "name": "香港保護兒童會維景灣幼兒學校",
    "nameEn": "HONG KONG SOCIETY FOR THE PROTECTION OF CHILDREN OCEAN SHORES NURSERY SCHOOL",
    "district": "新界",
    "district18": "西貢區",
    "address": "九龍調景嶺澳景路８８號維景灣畔第三期ＬＧ２",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_565008000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27090307",
    "website": "http://www.hkspc.org",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5423260002",
    "schoolCode": "542326",
    "campusCode": "0002",
    "name": "香港道教聯合會蓬瀛通善皇后山幼稚園",
    "nameEn": "HONG KONG TAOIST ASSOCIATION FUNG YING TUNG SIN QUEEN'S HILL KINDERGARTEN",
    "district": "新界",
    "district18": "北區",
    "address": "新界粉嶺皇后山邨皇澄樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_542326000211",
      "edb_542326000212",
      "edb_542326000213"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "project_learn",
      "project_learn",
      "language_dev",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "21161235",
    "website": "https://fytsqhkg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_1570660001",
    "schoolCode": "157066",
    "campusCode": "0001",
    "name": "香港道教聯合會圓玄幼稚園",
    "nameEn": "HONG KONG TAOIST ASSOCIATION YUEN YUEN KINDERGARTEN",
    "district": "新界",
    "district18": "荃灣區",
    "address": "新界荃灣石圍角邨石桃樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_157066000111",
      "edb_157066000112",
      "edb_157066000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "language_dev",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24984636",
    "website": "http://www.yuenyuenkg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_1580620001",
    "schoolCode": "158062",
    "campusCode": "0001",
    "name": "香港道教聯合會圓玄幼稚園(富善邨)",
    "nameEn": "HONG KONG TAOIST ASSOCIATION YUEN YUEN KINDERGARTEN (FU SHIN ESTATE)",
    "district": "新界",
    "district18": "大埔區",
    "address": "新界大埔富善邨善美樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_158062000111",
      "edb_158062000112",
      "edb_158062000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "putonghua",
      "english",
      "bilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26614583",
    "website": "http://www.yuenyuenkg.edu.hk/fushin",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5846060001",
    "schoolCode": "584606",
    "campusCode": "0001",
    "name": "香港國際蒙特梭利學校",
    "nameEn": "DISCOVERY MONTESSORI SCHOOL",
    "district": "新界",
    "district18": "離島區",
    "address": "香港大嶼山愉景灣海澄湖畔路92號1樓101號舖及戶外遊戲場(5號課室除外)",
    "nature": "international",
    "curriculumCategory": "non_local",
    "curriculumType": "montessori",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_584606000111",
      "edb_584606000112",
      "edb_584606000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "29871201",
    "website": "",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "low",
      "languageConfidence": "high",
      "needsReview": true
    }
  },
  {
    "id": "edb_5196340001",
    "schoolCode": "519634",
    "campusCode": "0001",
    "name": "香港華人基督會煜明幼稚園",
    "nameEn": "THE HONG KONG CHINESE CHURCH OF CHRIST THE LIGHT KINDERGARTEN",
    "district": "新界",
    "district18": "西貢區",
    "address": "新界將軍澳煜明苑熹明閣地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "WD"
    ],
    "variantIds": [
      "edb_519634000111",
      "edb_519634000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "language_dev",
      "language_dev",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "putonghua",
      "english",
      "bilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "",
    "website": "http://hkccclk.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_6275500001",
    "schoolCode": "627550",
    "campusCode": "0001",
    "name": "香港基督教服務處雋樂幼兒學校(大埔)",
    "nameEn": "HONG KONG CHRISTIAN SERVICE PARIO NURSERY SCHOOL (TAI PO)",
    "district": "新界",
    "district18": "大埔區",
    "address": "新界大埔富蝶邨鳳蝶樓地下2號幼稚園",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_627550000113"
    ],
    "pedagogyTags": [
      "project_learn",
      "project_learn"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "28336600",
    "website": "http://hkcschild.edu.hk/tns",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_6141060001",
    "schoolCode": "614106",
    "campusCode": "0001",
    "name": "香港基督教服務處雋樂幼稚園(沙田)",
    "nameEn": "HONG KONG CHRISTIAN SERVICE PARIO KINDERGARTEN (SHATIN)",
    "district": "新界",
    "district18": "沙田區",
    "address": "新界沙田碩門邨2期喜碩樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_614106000111",
      "edb_614106000112",
      "edb_614106000113"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "project_learn",
      "project_learn"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23680688",
    "website": "http://pokgst.hkcschild.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5653770001",
    "schoolCode": "565377",
    "campusCode": "0001",
    "name": "香港基督教服務處天恒幼兒學校",
    "nameEn": "HONG KONG CHRISTIAN SERVICE TIN HENG NURSERY SCHOOL",
    "district": "新界",
    "district18": "元朗區",
    "address": "新界天水圍天恒邨恒貴樓地下Ｂ及Ｃ翼",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_565377000113"
    ],
    "pedagogyTags": [
      "project_learn",
      "project_learn",
      "language_dev"
    ],
    "languageEnv": [
      "trilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24865007",
    "website": "http://www.hkcschild.edu.hk/thns",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5629040001",
    "schoolCode": "562904",
    "campusCode": "0001",
    "name": "香港基督教女青年會安定幼兒學校",
    "nameEn": "HONG KONG YOUNG WOMEN'S CHRISTIAN ASSOCIATION ON TING NURSERY SCHOOL",
    "district": "新界",
    "district18": "屯門區",
    "address": "新界屯門安定邨安定／友愛社區中心６樓及天台遊戲場",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_562904000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "project_learn",
      "project_learn",
      "language_dev",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24580578",
    "website": "http://nsot.ywca.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5632340001",
    "schoolCode": "563234",
    "campusCode": "0001",
    "name": "香港基督教女青年會隆亨幼兒學校",
    "nameEn": "HONG KONG YOUNG WOMEN'S CHRISTIAN ASSOCIATION LUNG HANG NURSERY SCHOOL",
    "district": "新界",
    "district18": "沙田區",
    "address": "新界沙田隆亨邨隆亨社區中心６樓及天台遊戲場",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_563234000113"
    ],
    "pedagogyTags": [
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26067962",
    "website": "http://nslh.ywca.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_6235980001",
    "schoolCode": "623598",
    "campusCode": "0001",
    "name": "香港基督教女青年會青衣幼兒學校",
    "nameEn": "HONG KONG YOUNG WOMEN'S CHRISTIAN ASSOCIATION TSING YI NURSERY SCHOOL",
    "district": "新界",
    "district18": "葵青區",
    "address": "新界青衣長青邨青荷樓平台1樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_623598000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "project_learn",
      "project_learn",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "",
    "website": "",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_6150800001",
    "schoolCode": "615080",
    "campusCode": "0001",
    "name": "香港基督教女青年會趣沂幼稚園",
    "nameEn": "HONG KONG YOUNG WOMEN'S CHRISTIAN ASSOCIATION HELEN LEE KINDERGARTEN",
    "district": "新界",
    "district18": "離島區",
    "address": "新界東涌滿東邨滿樂坊一樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_615080000111",
      "edb_615080000112",
      "edb_615080000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "trilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23100950",
    "website": "https://kghl.ywca.org.hk/tc/index.html",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5632930001",
    "schoolCode": "563293",
    "campusCode": "0001",
    "name": "香港基督教女青年會荃灣幼兒學校",
    "nameEn": "HONG KONG YOUNG WOMEN'S CHRISTIAN ASSOCIATION TSUEN WAN NURSERY SCHOOL",
    "district": "新界",
    "district18": "荃灣區",
    "address": "新界荃灣大河道雅麗珊社區中心５樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_563293000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24909060",
    "website": "http://nstw.ywca.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5416130001",
    "schoolCode": "541613",
    "campusCode": "0001",
    "name": "香港教育大學幼兒發展中心(幼稚園部)",
    "nameEn": "THE EDUCATION UNIVERSITY OF HONG KONG EARLY CHILDHOOD LEARNING CENTRE (KINDERGARTEN SECTION)",
    "district": "新界",
    "district18": "大埔區",
    "address": "新界大埔露屏路１０號香港教育大學高級教職員宿舍地下Ｇ０２－Ｇ０５室（包括幼兒中心）",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_541613000111",
      "edb_541613000112",
      "edb_541613000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "project_learn"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "29481638",
    "website": "http://www.eduhk.hk/eclc",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5395540001",
    "schoolCode": "539554",
    "campusCode": "0001",
    "name": "香港浸信會聯會寶田幼稚園",
    "nameEn": "THE BAPTIST CONVENTION OF HONG KONG PO TIN KINDERGARTEN",
    "district": "新界",
    "district18": "屯門區",
    "address": "新界屯門寶田商場２樓２０２號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_539554000111",
      "edb_539554000112",
      "edb_539554000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "language_dev",
      "holistic",
      "holistic",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24555378",
    "website": "https://potinkg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5649230001",
    "schoolCode": "564923",
    "campusCode": "0001",
    "name": "香港浸信會聯會利安幼兒園",
    "nameEn": "THE BAPTIST CONVENTION OF HONG KONG LEE ON NURSERY",
    "district": "新界",
    "district18": "沙田區",
    "address": "新界沙田馬鞍山利安邨利興樓地下Ｇ１",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_564923000113"
    ],
    "pedagogyTags": [
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26422633",
    "website": "http://www.hkbcleeon.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_1587390001",
    "schoolCode": "158739",
    "campusCode": "0001",
    "name": "香港浸信會聯會香港西北扶輪社幼稚園",
    "nameEn": "THE BAPTIST CONVENTION OF HONG KONG ROTARY CLUB OF HONG KONG NORTHWEST KINDERGARTEN",
    "district": "新界",
    "district18": "西貢區",
    "address": "將軍澳景林邨景楠樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_158739000111",
      "edb_158739000112",
      "edb_158739000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "project_learn",
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english",
      "bilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27030981",
    "website": "http://www.bcrotaryclubkg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5959690001",
    "schoolCode": "595969",
    "campusCode": "0001",
    "name": "香港靈糧堂荃灣幼稚園",
    "nameEn": "HONG KONG LING LIANG CHURCH TSUEN WAN KINDERGARTEN",
    "district": "新界",
    "district18": "荃灣區",
    "address": "新界荃灣海濱花園平台C(第九至十二座)P層幼稚園及海濱花園C平台P層128—129號舖",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_595969000111",
      "edb_595969000112"
    ],
    "pedagogyTags": [
      "project_learn",
      "project_learn",
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24192966",
    "website": "http://www.lingliang.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_3249570002",
    "schoolCode": "324957",
    "campusCode": "0002",
    "name": "香港神託會培恩幼稚園",
    "nameEn": "STEWARDS POOI YAN KINDERGARTEN",
    "district": "新界",
    "district18": "西貢區",
    "address": "新界將軍澳彩明苑彩榮閣地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_324957000211",
      "edb_324957000212",
      "edb_324957000213"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "",
    "website": "http://www.spykg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_1592120001",
    "schoolCode": "159212",
    "campusCode": "0001",
    "name": "香港神託會培真幼稚園",
    "nameEn": "STEWARDS POOI CHUN KINDERGARTEN",
    "district": "新界",
    "district18": "沙田區",
    "address": "新界沙田馬鞍山利安邨利盛樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_159212000111",
      "edb_159212000112",
      "edb_159212000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26313354",
    "website": "http://www.pooichun.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5669260001",
    "schoolCode": "566926",
    "campusCode": "0001",
    "name": "香港聖公會東涌幼兒學校",
    "nameEn": "HONG KONG SHENG KUNG HUI TUNG CHUNG NURSERY SCHOOL",
    "district": "新界",
    "district18": "離島區",
    "address": "大嶼山東涌富東邨富東廣場3樓301室",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_566926000113"
    ],
    "pedagogyTags": [
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "21090118",
    "website": "http://www.tcns.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_1590000001",
    "schoolCode": "159000",
    "campusCode": "0001",
    "name": "香港聖公會基督顯現堂幼稚園",
    "nameEn": "HONG KONG SHENG KUNG HUI THE CHURCH OF THE EPIPHANY KINDERGARTEN",
    "district": "新界",
    "district18": "葵青區",
    "address": "新界青衣青綠街１號偉景花園",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_159000000111",
      "edb_159000000112",
      "edb_159000000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24356666",
    "website": "http://www.coekg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5648930001",
    "schoolCode": "564893",
    "campusCode": "0001",
    "name": "香港聖公會麥理浩夫人中心〈石蔭〉幼稚園",
    "nameEn": "HONG KONG SHENG KUNG HUI LADY MACLEHOSE CENTRE (SHEK YAM) KINDERGARTEN",
    "district": "新界",
    "district18": "葵青區",
    "address": "新界葵涌石蔭邨２期商場地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_564893000113"
    ],
    "pedagogyTags": [
      "project_learn",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "22765028",
    "website": "http://www.lmcsy.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5649070001",
    "schoolCode": "564907",
    "campusCode": "0001",
    "name": "香港聖公會麥理浩夫人中心幼稚園",
    "nameEn": "HONG KONG SHENG KUNG HUI LADY MACLEHOSE CENTRE KINDERGARTEN",
    "district": "新界",
    "district18": "葵青區",
    "address": "新界葵涌和宜合道２２號３樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_564907000113"
    ],
    "pedagogyTags": [
      "project_learn",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24273523",
    "website": "http://www.lmcdn.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5661790001",
    "schoolCode": "566179",
    "campusCode": "0001",
    "name": "香港聖公會青山聖彼得堂青雲路幼稚園",
    "nameEn": "HKSKH ST PETER'S CHURCH CASTLE PEAK TSING WUN ROAD KINDERGARTEN",
    "district": "新界",
    "district18": "屯門區",
    "address": "新界屯門青雲路２２號Ｃ座１樓及地下（部份）",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_566179000111",
      "edb_566179000112",
      "edb_566179000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24683237",
    "website": "https://www.skhspcmain.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5633070001",
    "schoolCode": "563307",
    "campusCode": "0001",
    "name": "香港聖公會聖西門大興幼兒學校",
    "nameEn": "HONG KONG SHENG KUNG HUI ST. SIMON'S TAI HING NURSERY SCHOOL",
    "district": "新界",
    "district18": "屯門區",
    "address": "新界屯門大興邨第一期商場地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_563307000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24623856",
    "website": "http://www.ssth.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5632770001",
    "schoolCode": "563277",
    "campusCode": "0001",
    "name": "香港聖公會聖西門良景幼兒學校",
    "nameEn": "HONG KONG SHENG KUNG HUI ST. SIMON'S LEUNG KING NURSERY SCHOOL",
    "district": "新界",
    "district18": "屯門區",
    "address": "新界屯門良景邨良智樓9-16號地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_563277000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24646939",
    "website": "http://www.sslk.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5632690001",
    "schoolCode": "563269",
    "campusCode": "0001",
    "name": "香港聖公會聖西門西貢幼兒學校",
    "nameEn": "HONG KONG SHENG KUNG HUI ST. SIMON'S SAI KUNG NURSERY SCHOOL",
    "district": "新界",
    "district18": "西貢區",
    "address": "新界西貢頓場村DD215地段",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_563269000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27920047",
    "website": "http://www.sssk.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5647020001",
    "schoolCode": "564702",
    "campusCode": "0001",
    "name": "香港聖公會夏瑞芸幼兒學校",
    "nameEn": "HONG KONG SHENG KUNG HUI HA SUI WAN NURSERY SCHOOL",
    "district": "新界",
    "district18": "元朗區",
    "address": "新界元朗天水圍天龍路４號地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_564702000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24469220",
    "website": "http://www.hswns.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5370980001",
    "schoolCode": "537098",
    "campusCode": "0001",
    "name": "香港五常法幼稚園",
    "nameEn": "HONG KONG 5-S KINDERGARTEN",
    "district": "新界",
    "district18": "北區",
    "address": "新界粉嶺馬適路３號綠悠軒商場２樓１－１０號舖（包括幼兒中心）",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_537098000111",
      "edb_537098000112",
      "edb_537098000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "trilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27210081",
    "website": "http://www.hk5skg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_6213660001",
    "schoolCode": "621366",
    "campusCode": "0001",
    "name": "香港西區婦女福利會何瑞棠紀念中英文幼稚園",
    "nameEn": "WOMEN'S WELFARE CLUB WESTERN DISTRICT HONG KONG DAVID WOO MEMORIAL ANGLO-CHINESE KINDERGARTEN",
    "district": "新界",
    "district18": "大埔區",
    "address": "新界大埔逸雅苑逸欣閣地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "WD"
    ],
    "variantIds": [
      "edb_621366000111",
      "edb_621366000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26511268",
    "website": "",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5654580001",
    "schoolCode": "565458",
    "campusCode": "0001",
    "name": "香港小童群益會樂緻幼稚園（將軍澳）",
    "nameEn": "THE BOYS' AND GIRLS' CLUBS ASSOCIATION OF HONG KONG CHEERLAND KINDERGARTEN (TSEUNG KWAN O)",
    "district": "新界",
    "district18": "西貢區",
    "address": "新界將軍澳唐明苑唐煌閣地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_565458000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "project_learn",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "21774831",
    "website": "http://nursery.bgca.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5695690001",
    "schoolCode": "569569",
    "campusCode": "0001",
    "name": "香港宣教會優質幼兒學校",
    "nameEn": "HKEC ELITE KINDERGARTEN",
    "district": "新界",
    "district18": "北區",
    "address": "新界粉嶺欣盛苑商場ＫＧ０１號舖",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_569569000111",
      "edb_569569000112",
      "edb_569569000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26764242",
    "website": "https://www.elite-kg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5391550003",
    "schoolCode": "539155",
    "campusCode": "0003",
    "name": "香港學堂國際學校",
    "nameEn": "HONG KONG ACADEMY",
    "district": "新界",
    "district18": "西貢區",
    "address": "新界西貢惠民路３３號",
    "nature": "international",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM"
    ],
    "variantIds": [
      "edb_539155000311"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26551111",
    "website": "http://www.hkacademy.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "low",
      "languageConfidence": "high",
      "needsReview": true
    }
  },
  {
    "id": "edb_5607400001",
    "schoolCode": "560740",
    "campusCode": "0001",
    "name": "香港中文大學校友會聯會陳震夏幼稚園",
    "nameEn": "CUHK FAA CHAN CHUN HA KINDERGARTEN",
    "district": "新界",
    "district18": "元朗區",
    "address": "新界天水圍天恩邨天恩商場頂層１號幼稚園",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_560740000111",
      "edb_560740000112",
      "edb_560740000113"
    ],
    "pedagogyTags": [
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "bilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "22544668",
    "website": "http://www.cchk.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_6003770001",
    "schoolCode": "600377",
    "campusCode": "0001",
    "name": "香港中文大學校友會聯會順龍仁澤幼稚園",
    "nameEn": "CUHK FAA SHUN LUNG YAN CHAK KINDERGARTEN",
    "district": "新界",
    "district18": "元朗區",
    "address": "新界元朗天水圍天靖街3號天盛苑服務設施大樓2樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_600377000111",
      "edb_600377000112"
    ],
    "pedagogyTags": [
      "play_explore",
      "holistic"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "28992344",
    "website": "",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_1588870001",
    "schoolCode": "158887",
    "campusCode": "0001",
    "name": "香港中文大學校友會聯會張煊昌幼稚園",
    "nameEn": "CUHK FEDERATION OF ALUMNI ASSOCIATIONS THOMAS CHEUNG KINDERGARTEN",
    "district": "新界",
    "district18": "沙田區",
    "address": "新界沙田馬鞍山錦英苑",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_158887000111",
      "edb_158887000112",
      "edb_158887000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "holistic",
      "holistic",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26401973",
    "website": "http://www.cuhkfaatckg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5871410001",
    "schoolCode": "587141",
    "campusCode": "0001",
    "name": "香海正覺蓮社佛教慧光嘉福幼稚園",
    "nameEn": "HHCKLA BUDDHIST WAI KWONG KA FUK KINDERGARTEN",
    "district": "新界",
    "district18": "北區",
    "address": "新界粉嶺嘉盛苑嘉揚閣地下KG01號舖",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_587141000111",
      "edb_587141000112",
      "edb_587141000113"
    ],
    "pedagogyTags": [
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "english",
      "native_english",
      "bilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26832227",
    "website": "http://www.bwkkfk.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_1587200001",
    "schoolCode": "158720",
    "campusCode": "0001",
    "name": "香海正覺蓮社佛教慧光幼稚園",
    "nameEn": "HHCKLA BUDDHIST WAI KWONG KINDERGARTEN",
    "district": "新界",
    "district18": "北區",
    "address": "粉嶺華明邨禮明樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_158720000111",
      "edb_158720000112",
      "edb_158720000113"
    ],
    "pedagogyTags": [
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26770813",
    "website": "http://www.bwkk.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5242040001",
    "schoolCode": "524204",
    "campusCode": "0001",
    "name": "香海正覺蓮社佛教林黃明慧幼稚園",
    "nameEn": "HHCKLA BUDDHIST LAM WONG MING WAI KINDERGARTEN",
    "district": "新界",
    "district18": "元朗區",
    "address": "新界天水圍天慈邨慈心樓Ｂ及Ｃ翼地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_524204000111",
      "edb_524204000112",
      "edb_524204000113"
    ],
    "pedagogyTags": [
      "project_learn",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "",
    "website": "http://www.blwmwk.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5878770001",
    "schoolCode": "587877",
    "campusCode": "0001",
    "name": "小大嶼山蒙特梭利幼稚園",
    "nameEn": "LITTLE LANTAU MONTESSORI KINDERGARTEN",
    "district": "新界",
    "district18": "離島區",
    "address": "新界大嶼山梅窩銀鑛灣路８號銀景中心地下１２及１３號舖",
    "nature": "international",
    "curriculumCategory": "non_local",
    "curriculumType": "montessori",
    "joinedKGP": false,
    "sessions": [
      "AM"
    ],
    "variantIds": [
      "edb_587877000111"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "36897033",
    "website": "https://www.littlelantaumontessori.com",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "low",
      "languageConfidence": "high",
      "needsReview": true
    }
  },
  {
    "id": "edb_5323550001",
    "schoolCode": "532355",
    "campusCode": "0001",
    "name": "小蜜蜂幼稚園",
    "nameEn": "BUSY BEES KINDERGARTEN",
    "district": "新界",
    "district18": "西貢區",
    "address": "九龍清水灣香港科技大學１８座地下",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_532355000111",
      "edb_532355000112"
    ],
    "pedagogyTags": [
      "play_explore"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23582142",
    "website": "http://busybees.webhost.ust.hk",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5999990001",
    "schoolCode": "599999",
    "campusCode": "0001",
    "name": "小牛頓中英文幼稚園",
    "nameEn": "LITTLE NEWTON ANGLO-CHINESE KINDERGARTEN",
    "district": "新界",
    "district18": "屯門區",
    "address": "新界屯門井財街１１Ａ號南光樓１樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_599999000111",
      "edb_599999000112",
      "edb_599999000113"
    ],
    "pedagogyTags": [
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "39552228",
    "website": "http://littlenewton.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_6125610001",
    "schoolCode": "612561",
    "campusCode": "0001",
    "name": "協康會上海總會康苗幼稚園",
    "nameEn": "HEEP HONG SOCIETY SHANGHAI FRATERNITY ASSOCIATION HEALTHY KIDS KINDERGARTEN",
    "district": "新界",
    "district18": "葵青區",
    "address": "新界葵涌葵芳邨葵德樓地下10—16號舖",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "WD"
    ],
    "variantIds": [
      "edb_612561000111",
      "edb_612561000113"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "play_explore",
      "project_learn"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english",
      "native_english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "37052251",
    "website": "https://www.heephong.org/sfahk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_6151700001",
    "schoolCode": "615170",
    "campusCode": "0001",
    "name": "心怡天地國際幼稚園(屯門)",
    "nameEn": "JOYFUL WORLD INTERNATIONAL KINDERGARTEN (TUEN MUN)",
    "district": "新界",
    "district18": "屯門區",
    "address": "新界屯門河興街10A號大興花園第二期商場2樓2—3號舖",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_615170000111",
      "edb_615170000112"
    ],
    "pedagogyTags": [
      "play_explore",
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "putonghua",
      "english",
      "bilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24928772",
    "website": "http://www.joyfulenglish.edu.hk/en/index.html",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_6121890001",
    "schoolCode": "612189",
    "campusCode": "0001",
    "name": "心怡天地國際幼稚園(元朗)",
    "nameEn": "JOYFUL WORLD INTERNATIONAL KINDERGARTEN (YUEN LONG)",
    "district": "新界",
    "district18": "元朗區",
    "address": "新界元朗鳳群街2號年發大廈1樓",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_612189000111",
      "edb_612189000112"
    ],
    "pedagogyTags": [
      "play_explore",
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "putonghua",
      "english",
      "bilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24939997",
    "website": "http://www.joyfulenglish.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5833400001",
    "schoolCode": "583340",
    "campusCode": "0001",
    "name": "心怡天地幼稚園",
    "nameEn": "JOYFUL WORLD KINDERGARTEN",
    "district": "新界",
    "district18": "荃灣區",
    "address": "新界荃灣荃景圍７６－８４號荃景花園１１－１２座地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_583340000111",
      "edb_583340000112"
    ],
    "pedagogyTags": [
      "play_explore",
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "putonghua",
      "english",
      "bilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24928555",
    "website": "http://www.joyfulenglish.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5977160001",
    "schoolCode": "597716",
    "campusCode": "0001",
    "name": "心怡天地幼稚園（麗城）",
    "nameEn": "JOYFUL WORLD KINDERGARTEN (BELVEDERE)",
    "district": "新界",
    "district18": "荃灣區",
    "address": "新界荃灣青山公路荃灣段６２０號麗城花園第二期麗城薈１樓１０１號－１１８號及部份地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_597716000111",
      "edb_597716000112"
    ],
    "pedagogyTags": [
      "play_explore",
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "putonghua",
      "english",
      "bilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "28060199",
    "website": "http://www.joyfulenglish.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5917770001",
    "schoolCode": "591777",
    "campusCode": "0001",
    "name": "心怡天地幼稚園(沙田)",
    "nameEn": "JOYFUL WORLD KINDERGARTEN (SHA TIN)",
    "district": "新界",
    "district18": "沙田區",
    "address": "新界沙田火炭樂景街２－１８號銀禧薈７樓７０１號舖",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_591777000111",
      "edb_591777000112"
    ],
    "pedagogyTags": [
      "play_explore",
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "putonghua",
      "english",
      "bilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24939009",
    "website": "http://www.joyfulenglish.edu.hk/en/index.html",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5663140001",
    "schoolCode": "566314",
    "campusCode": "0001",
    "name": "新界婦孺福利會博康幼兒學校",
    "nameEn": "NEW TERRITORIES WOMEN & JUVENILES WELFARE ASSOCIATION LIMITED POK HONG NURSERY SCHOOL",
    "district": "新界",
    "district18": "沙田區",
    "address": "新界沙田博康邨博安樓地下21-28號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_566314000113"
    ],
    "pedagogyTags": [
      "project_learn"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26499006",
    "website": "https://www.ntwjwaphns.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5663060001",
    "schoolCode": "566306",
    "campusCode": "0001",
    "name": "新界婦孺福利會粉嶺幼兒學校",
    "nameEn": "NEW TERRITORIES WOMEN & JUVENILES WELFARE ASSOCIATION LIMITED FANLING NURSERY SCHOOL",
    "district": "新界",
    "district18": "北區",
    "address": "新界粉嶺景盛苑俊景閣B及C翼地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_566306000113"
    ],
    "pedagogyTags": [
      "project_learn"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26820877",
    "website": "https://www.ntwjwaflns.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5307350001",
    "schoolCode": "530735",
    "campusCode": "0001",
    "name": "新界婦孺福利會梁省德中英文幼稚園",
    "nameEn": "NEW TERRITORIES WOMEN & JUVENILES WELFARE ASSOCIATION LIMITED LEUNG SING TAK ANGLO-CHINESE KINDERGARTEN",
    "district": "新界",
    "district18": "西貢區",
    "address": "新界將軍澳尚德邨尚明樓(第九座)四樓平台A，B及C翼",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_530735000111",
      "edb_530735000112",
      "edb_530735000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "project_learn",
      "project_learn"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "21770272",
    "website": "http://lstackg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5663300001",
    "schoolCode": "566330",
    "campusCode": "0001",
    "name": "新界婦孺福利會上水幼兒學校",
    "nameEn": "NEW TERRITORIES WOMEN & JUVENILES WELFARE ASSOCIATION LIMITED SHEUNG SHUI NURSERY SCHOOL",
    "district": "新界",
    "district18": "北區",
    "address": "新界上水龍運街2號北區社區會堂6樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_566330000113"
    ],
    "pedagogyTags": [
      "project_learn"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26725710",
    "website": "https://www.ntwjwassns.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5663490001",
    "schoolCode": "566349",
    "campusCode": "0001",
    "name": "新界婦孺福利會元朗幼兒學校",
    "nameEn": "NEW TERRITORIES WOMEN & JUVENILES WELFARE ASSOCIATION LIMITED YUEN LONG NURSERY SCHOOL",
    "district": "新界",
    "district18": "元朗區",
    "address": "新界元朗體育路4號元朗大會堂4樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_566349000113"
    ],
    "pedagogyTags": [
      "project_learn"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "29443443",
    "website": "https://www.ntwjwaylns.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5663220001",
    "schoolCode": "566322",
    "campusCode": "0001",
    "name": "新界婦孺福利會長發幼兒學校",
    "nameEn": "NEW TERRITORIES WOMEN & JUVENILES WELFARE ASSOCIATION LIMITED CHEUNG FAT NURSERY SCHOOL",
    "district": "新界",
    "district18": "葵青區",
    "address": "新界青衣長發邨長發社區中心5樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_566322000113"
    ],
    "pedagogyTags": [
      "project_learn"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24338184",
    "website": "https://www.ntwjwacfns.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_1583130001",
    "schoolCode": "158313",
    "campusCode": "0001",
    "name": "新界神召會懷恩幼稚園",
    "nameEn": "N.T. ASSEMBLIES OF GOD CHURCH WAI YAN KINDERGARTEN",
    "district": "新界",
    "district18": "元朗區",
    "address": "新界元朗西菁街興旺樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_158313000111",
      "edb_158313000112",
      "edb_158313000113"
    ],
    "pedagogyTags": [
      "project_learn"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24751995",
    "website": "http://waiyankin.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5636250001",
    "schoolCode": "563625",
    "campusCode": "0001",
    "name": "新九龍婦女會沙角幼兒園",
    "nameEn": "NEW KOWLOON WOMEN ASSOCIATION SHA KOK NURSERY",
    "district": "新界",
    "district18": "沙田區",
    "address": "新界沙田沙角邨美雁樓２８－４０號地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_563625000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26482509",
    "website": "http://www.newklnwa.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5636330001",
    "schoolCode": "563633",
    "campusCode": "0001",
    "name": "新九龍婦女會新翠幼兒園",
    "nameEn": "NEW KOWLOON WOMEN ASSOCIATION SUN CHUI NURSERY",
    "district": "新界",
    "district18": "沙田區",
    "address": "新界沙田新翠邨新偉樓地下１至８號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_563633000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26992386",
    "website": "http://www.newklnwa.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_1590420001",
    "schoolCode": "159042",
    "campusCode": "0001",
    "name": "宣道會陳李詠貞紀念幼稚園",
    "nameEn": "CHRISTIAN ALLIANCE CHEN LEE WING TSING MEMORIAL KINDERGARTEN",
    "district": "新界",
    "district18": "元朗區",
    "address": "新界天水圍天耀邨耀昌樓地下Ａ及Ｂ翼",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_159042000111",
      "edb_159042000112"
    ],
    "pedagogyTags": [
      "project_learn"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24458469",
    "website": "http://www.caclwtmk.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5342000001",
    "schoolCode": "534200",
    "campusCode": "0001",
    "name": "學之園幼稚園",
    "nameEn": "LEARNING HABITAT KINDERGARTEN",
    "district": "新界",
    "district18": "葵青區",
    "address": "新界青衣牙鷹洲街８號灝景灣第１期商場第１層（包括幼兒中心）",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_534200000111",
      "edb_534200000112"
    ],
    "pedagogyTags": [
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "english",
      "bilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25015500",
    "website": "http://learninghabitat.org",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_6123910001",
    "schoolCode": "612391",
    "campusCode": "0001",
    "name": "學之園幼稚園(海翩康城)",
    "nameEn": "LEARNING HABITAT KINDERGARTEN (PAPILLONS LP)",
    "district": "新界",
    "district18": "西貢區",
    "address": "新界將軍澳唐俊街21號翩滙坊地下12、15及16號舖",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_612391000111",
      "edb_612391000112"
    ],
    "pedagogyTags": [
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "english",
      "bilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23633005",
    "website": "https://www.learninghabitat.org",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_6042910001",
    "schoolCode": "604291",
    "campusCode": "0001",
    "name": "學之園幼稚園（迎海）",
    "nameEn": "LEARNING HABITAT KINDERGARTEN (DOUBLE COVE)",
    "district": "新界",
    "district18": "沙田區",
    "address": "新界沙田馬鞍山落禾沙烏溪沙路８號迎海３期１樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_604291000111",
      "edb_604291000112"
    ],
    "pedagogyTags": [
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "english",
      "bilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25015850",
    "website": "http://www.learninghabitat.org",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5107260001",
    "schoolCode": "510726",
    "campusCode": "0001",
    "name": "循道衛理聯合教會亞斯理幼稚園",
    "nameEn": "ASBURY METHODIST KINDERGARTEN",
    "district": "新界",
    "district18": "葵青區",
    "address": "新界荃灣大窩口（Ｆ課室及幼兒中心專用範圍除外）",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_510726000111",
      "edb_510726000112",
      "edb_510726000113"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "project_learn"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24296669",
    "website": "http://www.asburymkg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5638540001",
    "schoolCode": "563854",
    "campusCode": "0001",
    "name": "循理會白普理循理幼兒學校",
    "nameEn": "FREE METHODIST CHURCH BRADBURY CHUN LEI NURSERY SCHOOL",
    "district": "新界",
    "district18": "沙田區",
    "address": "新界沙田馬鞍山耀安邨耀和樓２樓４－９號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_563854000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26416338",
    "website": "http://cln.fmchk.org",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5543830001",
    "schoolCode": "554383",
    "campusCode": "0001",
    "name": "雅麗斯俊宏軒幼稚園",
    "nameEn": "AGNES KINDERGARTEN (GRANDEUR TERRACE)",
    "district": "新界",
    "district18": "元朗區",
    "address": "新界元朗天水圍俊宏軒幼稚園",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_554383000111",
      "edb_554383000112",
      "edb_554383000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "project_learn",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "34018128",
    "website": "http://www.agneskg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5986230001",
    "schoolCode": "598623",
    "campusCode": "0001",
    "name": "雅麗斯樂思幼稚園",
    "nameEn": "AGNES WISE KINDERGARTEN",
    "district": "新界",
    "district18": "元朗區",
    "address": "新界元朗青山公路洪水橋段６００號尚城地下及１樓幼稚園",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "WD"
    ],
    "variantIds": [
      "edb_598623000111",
      "edb_598623000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "35202342",
    "website": "http://www.agneskg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_2315920001",
    "schoolCode": "231592",
    "campusCode": "0001",
    "name": "雅麗斯英文幼稚園",
    "nameEn": "AGNES ENGLISH KINDERGARTEN",
    "district": "新界",
    "district18": "屯門區",
    "address": "新界屯門屯門市地段３３８號第１６區翠寧花園（幼兒中心專用範圍除外）",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_231592000111",
      "edb_231592000112",
      "edb_231592000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "project_learn",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24588193",
    "website": "https://www.agneskg.edu.hk/agnes",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5878690001",
    "schoolCode": "587869",
    "campusCode": "0001",
    "name": "耀基創藝幼稚園",
    "nameEn": "GLORIA CREATIVE KINDERGARTEN",
    "district": "新界",
    "district18": "北區",
    "address": "新界粉嶺和睦路9號海聯廣場地下72、73、75、76、77及79號舖",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_587869000111",
      "edb_587869000112",
      "edb_587869000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "project_learn",
      "project_learn",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "trilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26697339",
    "website": "http://gciedu.hk/home",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5972950001",
    "schoolCode": "597295",
    "campusCode": "0001",
    "name": "耀基創藝幼稚園（上水）",
    "nameEn": "GLORIA CREATIVE KINDERGARTEN (SHEUNG SHUI)",
    "district": "新界",
    "district18": "北區",
    "address": "新界上水鳳南路９號翠麗花園商場地下２３及２４號舖",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_597295000111",
      "edb_597295000112",
      "edb_597295000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "project_learn",
      "project_learn",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "trilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26697009",
    "website": "http://gciedu.hk/home",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_2313980001",
    "schoolCode": "231398",
    "campusCode": "0001",
    "name": "耀榮中英文幼稚園",
    "nameEn": "YIU WING ANGLO-CHINESE KINDERGARTEN",
    "district": "新界",
    "district18": "沙田區",
    "address": "新界沙田馬鞍山耀安邨耀榮樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_231398000111",
      "edb_231398000112",
      "edb_231398000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26417212",
    "website": "https://mos.tkyw.com",
    "dataQuality": {
      "curriculumConfidence": "low",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": true
    }
  },
  {
    "id": "edb_6135170001",
    "schoolCode": "613517",
    "campusCode": "0001",
    "name": "耀中國際幼稚園(將軍澳)",
    "nameEn": "YEW CHUNG INTERNATIONAL KINDERGARTEN (TSEUNG KWAN O)",
    "district": "新界",
    "district18": "西貢區",
    "address": "新界將軍澳至善街3號Sａｖａｎｎａｈ Pｌａｃｅ地下G10—G13、1樓119—123及125號舖",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_613517000111",
      "edb_613517000112",
      "edb_613517000113"
    ],
    "pedagogyTags": [
      "project_learn"
    ],
    "languageEnv": [
      "bilingual",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "37584112",
    "website": "https://www.ycis-hk.com/zh",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_1584610001",
    "schoolCode": "158461",
    "campusCode": "0001",
    "name": "伊斯蘭博愛幼稚園",
    "nameEn": "ISLAMIC POK OI KINDERGARTEN",
    "district": "新界",
    "district18": "葵青區",
    "address": "新界青衣島長安邨第２期安清樓１０８－１１４號地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_158461000111",
      "edb_158461000112",
      "edb_158461000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "holistic",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24324024",
    "website": "http://www.islamicpokoikg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5243600002",
    "schoolCode": "524360",
    "campusCode": "0002",
    "name": "殷翠幼稚園",
    "nameEn": "JADE KINDERGARTEN",
    "district": "新界",
    "district18": "元朗區",
    "address": "新界元朗大棠道崇正新村１５３號地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_524360000211",
      "edb_524360000212",
      "edb_524360000213"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24427729",
    "website": "https://sites.google.com/site/jadekindergartenmain",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_6003500001",
    "schoolCode": "600350",
    "campusCode": "0001",
    "name": "英基國際幼稚園(東涌)",
    "nameEn": "ESF INTERNATIONAL KINDERGARTEN (TUNG CHUNG)",
    "district": "新界",
    "district18": "離島區",
    "address": "新界東涌迎康街一號昇薈一樓",
    "nature": "international",
    "curriculumCategory": "non_local",
    "curriculumType": "ib",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_600350000111",
      "edb_600350000112"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "play_explore"
    ],
    "languageEnv": [
      "english",
      "bilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "37423500",
    "website": "https://www.tck.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5325410001",
    "schoolCode": "532541",
    "campusCode": "0001",
    "name": "英基國際幼稚園（青衣）",
    "nameEn": "ESF INTERNATIONAL KINDERGARTEN (TSING YI)",
    "district": "新界",
    "district18": "葵青區",
    "address": "新界青衣青敬路３３號地下及閣樓",
    "nature": "international",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_532541000111",
      "edb_532541000112"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24363355",
    "website": "https://www.tyk.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "low",
      "languageConfidence": "high",
      "needsReview": true
    }
  },
  {
    "id": "edb_5785090001",
    "schoolCode": "578509",
    "campusCode": "0001",
    "name": "英基國際幼稚園(烏溪沙)",
    "nameEn": "ESF INTERNATIONAL KINDERGARTEN (WU KAI SHA)",
    "district": "新界",
    "district18": "沙田區",
    "address": "新界沙田馬鞍山西沙路５９９號Ｌ１",
    "nature": "international",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_578509000111",
      "edb_578509000112"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24355291",
    "website": "https://www.wksk.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "low",
      "languageConfidence": "high",
      "needsReview": true
    }
  },
  {
    "id": "edb_5492400001",
    "schoolCode": "549240",
    "campusCode": "0001",
    "name": "英基雅柏國際幼稚園",
    "nameEn": "ESF ABACUS INTERNATIONAL KINDERGARTEN",
    "district": "新界",
    "district18": "西貢區",
    "address": "新界西貢清水灣道孟公屋村",
    "nature": "international",
    "curriculumCategory": "non_local",
    "curriculumType": "ib",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_549240000111",
      "edb_549240000112"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "play_explore"
    ],
    "languageEnv": [
      "english",
      "bilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27195712",
    "website": "https://abacus.lg.esf.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5906140001",
    "schoolCode": "590614",
    "campusCode": "0001",
    "name": "英揚樂兒中英文幼稚園",
    "nameEn": "ELITE KIDS ANGLO-CHINESE KINDERGARTEN",
    "district": "新界",
    "district18": "元朗區",
    "address": "新界元朗天水圍天麗苑Ａ座地下ＫＧ０１號舖",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_590614000111",
      "edb_590614000112",
      "edb_590614000113"
    ],
    "pedagogyTags": [
      "project_learn"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27110272",
    "website": "http://www.elitekg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5372250001",
    "schoolCode": "537225",
    "campusCode": "0001",
    "name": "英藝幼稚園",
    "nameEn": "ZENITH KINDERGARTEN",
    "district": "新界",
    "district18": "大埔區",
    "address": "新界大埔翠樂街6號菁泉雅居地下入口大堂及1樓10號及11號舖(包括幼兒中心)",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_537225000111",
      "edb_537225000112",
      "edb_537225000113"
    ],
    "pedagogyTags": [
      "play_explore"
    ],
    "languageEnv": [
      "trilingual",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26633311",
    "website": "https://zenithkindergarten.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_6072580001",
    "schoolCode": "607258",
    "campusCode": "0001",
    "name": "英藝幼稚園（將軍澳）",
    "nameEn": "ZENITH KINDERGARTEN (TSEUNG KWAN O)",
    "district": "新界",
    "district18": "西貢區",
    "address": "新界將軍澳至善街9號嘉悅地下7號舖部份及一樓部份",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_607258000111",
      "edb_607258000112",
      "edb_607258000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "22140068",
    "website": "http://www.zenith.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "low",
      "languageConfidence": "low",
      "needsReview": true
    }
  },
  {
    "id": "edb_5936800001",
    "schoolCode": "593680",
    "campusCode": "0001",
    "name": "英藝幼稚園(沙田)",
    "nameEn": "ZENITH KINDERGARTEN (SHATIN)",
    "district": "新界",
    "district18": "沙田區",
    "address": "新界沙田車公廟路溱岸８號地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_593680000111",
      "edb_593680000112",
      "edb_593680000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "22426838",
    "website": "http://www.zenith.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "low",
      "languageConfidence": "low",
      "needsReview": true
    }
  },
  {
    "id": "edb_6222650001",
    "schoolCode": "622265",
    "campusCode": "0001",
    "name": "英藝幼稚園(賞湖)",
    "nameEn": "ZENITH KINDERGARTEN (SHERWOOD)",
    "district": "新界",
    "district18": "元朗區",
    "address": "新界元朗天水圍天水圍市地段第2號餘段嘉湖山莊賞湖居地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_622265000111",
      "edb_622265000112",
      "edb_622265000113"
    ],
    "pedagogyTags": [
      "play_explore"
    ],
    "languageEnv": [
      "trilingual",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26901828",
    "website": "https://www.zenith.edu.hk/en/campus_gallery.php?campus=13&page=1",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_6248290001",
    "schoolCode": "624829",
    "campusCode": "0001",
    "name": "英藝幼稚園(兆康)",
    "nameEn": "ZENITH KINDERGARTEN (SIU HONG)",
    "district": "新界",
    "district18": "屯門區",
    "address": "新界屯門欣寶路8號NOVO LAND NOVO WALK地下29號舖",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_624829000111",
      "edb_624829000112",
      "edb_624829000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "",
    "website": "https://zenithkindergarten.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "low",
      "languageConfidence": "low",
      "needsReview": true
    }
  },
  {
    "id": "edb_5632260001",
    "schoolCode": "563226",
    "campusCode": "0001",
    "name": "幼聯主辦安泰幼兒學校",
    "nameEn": "CECES ORGANIZED AETNA PRESCHOOL",
    "district": "新界",
    "district18": "元朗區",
    "address": "新界元朗天水圍天盛苑天盛商場附翼地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_563226000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "22542442",
    "website": "http://www.ceces-aetna.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_1583210001",
    "schoolCode": "158321",
    "campusCode": "0001",
    "name": "元岡幼稚園",
    "nameEn": "YUEN KONG KINDERGARTEN",
    "district": "新界",
    "district18": "元朗區",
    "address": "新界元朗八鄉錦上路元崗村(丈量約份第106約地段)",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_158321000111",
      "edb_158321000112"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "project_learn",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "34831350",
    "website": "https://sites.google.com/view/yuenkongkg/%E9%A6%96%E9%A0%81",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5493040001",
    "schoolCode": "549304",
    "campusCode": "0001",
    "name": "元朗東莞同鄉會熊定嘉幼稚園",
    "nameEn": "YUEN LONG TUNG KOON DISTRICT ASSOCIATION HUNG TING KA KINDERGARTEN",
    "district": "新界",
    "district18": "元朗區",
    "address": "新界天水圍天恩邨天恩商場天台２號幼稚園",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_549304000111",
      "edb_549304000112",
      "edb_549304000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "21467733",
    "website": "http://www.tkhtkk.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_1591400001",
    "schoolCode": "159140",
    "campusCode": "0001",
    "name": "元朗公立中學校友會劉良驤紀念幼稚園",
    "nameEn": "YUEN LONG PUBLIC MIDDLE SCHOOL ALUMNI ASSOCIATION LAU LEUNG SHEUNG MEMORIAL KINDERGARTEN",
    "district": "新界",
    "district18": "元朗區",
    "address": "新界元朗天水圍天耀邨耀澤樓地下Ａ及Ｂ翼",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "WD"
    ],
    "variantIds": [
      "edb_159140000111",
      "edb_159140000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "project_learn",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24480816",
    "website": "http://www.ylallsk.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_1591580001",
    "schoolCode": "159158",
    "campusCode": "0001",
    "name": "元朗三育幼稚園",
    "nameEn": "YUEN LONG SAM YUK KINDERGARTEN",
    "district": "新界",
    "district18": "元朗區",
    "address": "新界元朗青山公路元朗段２６５－２６７號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_159158000111",
      "edb_159158000112"
    ],
    "pedagogyTags": [
      "play_explore",
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24763356",
    "website": "http://www.ylsyk.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_1590180001",
    "schoolCode": "159018",
    "campusCode": "0001",
    "name": "元朗商會幼稚園",
    "nameEn": "YUEN LONG MERCHANTS ASSOCIATION KINDERGARTEN",
    "district": "新界",
    "district18": "元朗區",
    "address": "新界天水圍天耀邨耀興樓地下Ａ及Ｂ翼",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_159018000111",
      "edb_159018000112",
      "edb_159018000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "trilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "",
    "website": "http://www.ylmakg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_1556240001",
    "schoolCode": "155624",
    "campusCode": "0001",
    "name": "元朗信義會生命幼稚園",
    "nameEn": "YUEN LONG LUTHERAN LIFE KINDERGARTEN",
    "district": "新界",
    "district18": "元朗區",
    "address": "新界元朗安信街丈量約分第120約地段第3713及3714號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_155624000111",
      "edb_155624000112"
    ],
    "pedagogyTags": [
      "play_explore",
      "language_dev",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24769363",
    "website": "http://www.lifekg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5453330001",
    "schoolCode": "545333",
    "campusCode": "0001",
    "name": "圓玄幼稚園(天逸邨)",
    "nameEn": "YUEN YUEN KINDERGARTEN (TIN YAT ESTATE)",
    "district": "新界",
    "district18": "元朗區",
    "address": "新界天水圍天逸邨停車場大樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_545333000111",
      "edb_545333000112",
      "edb_545333000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "21463111",
    "website": "http://www.yuenyuenkg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_1529780001",
    "schoolCode": "152978",
    "campusCode": "0001",
    "name": "長洲聖心幼稚園",
    "nameEn": "CHEUNG CHAU SACRED HEART KINDERGARTEN",
    "district": "新界",
    "district18": "離島區",
    "address": "新界長洲東灣",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_152978000111",
      "edb_152978000112",
      "edb_152978000113"
    ],
    "pedagogyTags": [
      "play_explore"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "29810506",
    "website": "http://www.ccshkg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_1588600001",
    "schoolCode": "158860",
    "campusCode": "0001",
    "name": "真理浸信會碧濤幼稚園",
    "nameEn": "TRUTH BAPTIST CHURCH PICTORIAL KINDERGARTEN",
    "district": "新界",
    "district18": "沙田區",
    "address": "新界沙田安景街19-21號碧濤花園平台",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_158860000111",
      "edb_158860000112",
      "edb_158860000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "project_learn",
      "language_dev",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26356933",
    "website": "https://www.tbcpl.edu.hk/?_gl=1*1qh34qx*_gcl_au*MTQ0Njk0MzM0OC4xNjk4MTk3NzAx",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5288110001",
    "schoolCode": "528811",
    "campusCode": "0001",
    "name": "真理浸信會恩典幼稚園",
    "nameEn": "TRUTH BAPTIST CHURCH GRACE KINDERGARTEN",
    "district": "新界",
    "district18": "沙田區",
    "address": "新界沙田沙角街7-11號翠華花園二樓(走廊段除外)",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_528811000111",
      "edb_528811000112"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26359433",
    "website": "http://www.truthbaptist.org.hk",
    "dataQuality": {
      "curriculumConfidence": "low",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": true
    }
  },
  {
    "id": "edb_5413890001",
    "schoolCode": "541389",
    "campusCode": "0001",
    "name": "真理浸信會富泰幼稚園",
    "nameEn": "TRUTH BAPTIST CHURCH EMPOWER KINDERGARTEN",
    "district": "新界",
    "district18": "屯門區",
    "address": "香港屯門屯貴路９號富泰邨服務設施大樓１字樓１號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_541389000111",
      "edb_541389000112",
      "edb_541389000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "project_learn",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "trilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26356996",
    "website": "http://www.truthbaptist.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5367090001",
    "schoolCode": "536709",
    "campusCode": "0001",
    "name": "真理浸信會何袁惠琼幼稚園",
    "nameEn": "TRUTH BAPTIST CHURCH HO YUEN WAI KING KINDERGARTEN",
    "district": "新界",
    "district18": "北區",
    "address": "新界粉嶺雍盛苑商場１０９號舖",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_536709000111",
      "edb_536709000112",
      "edb_536709000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26065599",
    "website": "http://www.tbcas.edu.hk/SCH04HY",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5647530002",
    "schoolCode": "564753",
    "campusCode": "0002",
    "name": "真理浸信會榮光幼兒園",
    "nameEn": "TRUTH BAPTIST CHURCH GLORY NURSERY",
    "district": "新界",
    "district18": "沙田區",
    "address": "新界沙田圍路９－１１號田園閣２樓平台",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_564753000211",
      "edb_564753000212",
      "edb_564753000213"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26359706",
    "website": "http://tbcas.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_1582590001",
    "schoolCode": "158259",
    "campusCode": "0001",
    "name": "真理浸信會幼稚園",
    "nameEn": "TRUTH BAPTIST CHURCH KINDERGARTEN",
    "district": "新界",
    "district18": "沙田區",
    "address": "新界沙田正街１１－１７號偉華中心三，四座三樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_158259000111",
      "edb_158259000112"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "trilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26063933",
    "website": "http://www.truthbaptist.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5634710001",
    "schoolCode": "563471",
    "campusCode": "0001",
    "name": "中國基督教播道會寶雅幼兒學校",
    "nameEn": "EVANGELICAL FREE CHURCH OF CHINA - PO NGA NURSERY SCHOOL",
    "district": "新界",
    "district18": "大埔區",
    "address": "新界大埔寶雅苑興和閣地下117-124室",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_563471000113"
    ],
    "pedagogyTags": [
      "play_explore"
    ],
    "languageEnv": [
      "trilingual",
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26509286",
    "website": "http://www.pnns.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5634800001",
    "schoolCode": "563480",
    "campusCode": "0001",
    "name": "中國基督教播道會厚恩堂厚恩幼兒學校",
    "nameEn": "EVANGELICAL FREE CHURCH OF CHINA - ABUNDANT GRACE CHURCH ABUNDANT GRACE NURSERY SCHOOL",
    "district": "新界",
    "district18": "西貢區",
    "address": "新界將軍澳厚德邨德裕樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_563480000113"
    ],
    "pedagogyTags": [
      "play_explore"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27043222",
    "website": "http://www.agns.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5667800001",
    "schoolCode": "566780",
    "campusCode": "0001",
    "name": "中國基督教播道會天恩幼兒學校",
    "nameEn": "EVANGELICAL FREE CHURCH OF CHINA - TIN YAN NURSERY SCHOOL",
    "district": "新界",
    "district18": "元朗區",
    "address": "新界天水圍天恩邨天恩商場1樓122號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_566780000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "21467891",
    "website": "http://www.tyns.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5633400001",
    "schoolCode": "563340",
    "campusCode": "0001",
    "name": "中國基督教播道會茵怡幼兒學校",
    "nameEn": "EVANGELICAL FREE CHURCH OF CHINA - VERBENA NURSERY SCHOOL",
    "district": "新界",
    "district18": "西貢區",
    "address": "新界將軍澳貿泰路8號茵怡花園第一座平台",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_563340000113"
    ],
    "pedagogyTags": [
      "project_learn",
      "language_dev"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "29970777",
    "website": "http://www.vns.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5664110001",
    "schoolCode": "566411",
    "campusCode": "0001",
    "name": "中華基督教會福幼第二幼稚園",
    "nameEn": "THE CHURCH OF CHRIST IN CHINA FUK YAU NO. II KINDERGARTEN",
    "district": "新界",
    "district18": "荃灣區",
    "address": "新界荃灣石圍角邨石蓮樓地下3-16 18及20號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_566411000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "holistic"
    ],
    "languageEnv": [
      "trilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24980926",
    "website": "http://fyn2kdc.ccc.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5664030001",
    "schoolCode": "566403",
    "campusCode": "0001",
    "name": "中華基督教會福幼幼稚園",
    "nameEn": "THE CHURCH OF CHRIST IN CHINA FUK YAU KINDERGARTEN",
    "district": "新界",
    "district18": "荃灣區",
    "address": "新界荃灣石圍角邨石翠樓地下１４－１７號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "WD"
    ],
    "variantIds": [
      "edb_566403000111",
      "edb_566403000113"
    ],
    "pedagogyTags": [
      "project_learn",
      "language_dev"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24166805",
    "website": "http://fykdc.ccc.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5599620001",
    "schoolCode": "559962",
    "campusCode": "0001",
    "name": "中華基督教會全完幼稚園",
    "nameEn": "THE CHURCH OF CHRIST IN CHINA CHUEN YUEN KINDERGARTEN",
    "district": "新界",
    "district18": "葵青區",
    "address": "新界葵涌葵涌邨葵涌商場三樓平台４號單位",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_559962000111",
      "edb_559962000112",
      "edb_559962000113"
    ],
    "pedagogyTags": [
      "project_learn"
    ],
    "languageEnv": [
      "trilingual",
      "english",
      "native_english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24011899",
    "website": "http://cyk.ccc.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_1572950001",
    "schoolCode": "157295",
    "campusCode": "0001",
    "name": "中華基督教會沙田堂博康幼稚園",
    "nameEn": "THE CHURCH OF CHRIST IN CHINA, SHATIN CHURCH POK HONG KINDERGARTEN",
    "district": "新界",
    "district18": "沙田區",
    "address": "新界沙田博康邨博文樓地下１４號，２０－３１號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_157295000111",
      "edb_157295000112",
      "edb_157295000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn"
    ],
    "languageEnv": [
      "trilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26494848",
    "website": "http://www.stcphk.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_1574900001",
    "schoolCode": "157490",
    "campusCode": "0001",
    "name": "中華基督教會屯門堂何福堂幼稚園",
    "nameEn": "HOH FUK TONG KINDERGARTEN (TUEN MUN CHURCH, THE CHURCH OF CHRIST IN CHINA, HONG KONG COUNCIL)",
    "district": "新界",
    "district18": "屯門區",
    "address": "新界屯門蝴蝶邨蝶舞樓第８座地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_157490000111",
      "edb_157490000112",
      "edb_157490000113"
    ],
    "pedagogyTags": [
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "putonghua",
      "english",
      "native_english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24675078",
    "website": "http://hftk.ccc.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5662920001",
    "schoolCode": "566292",
    "campusCode": "0001",
    "name": "中華基督教會屯門堂幼稚園",
    "nameEn": "THE CHURCH OF CHRIST IN CHINA TUEN MUN CHURCH KINDERGARTEN",
    "district": "新界",
    "district18": "屯門區",
    "address": "新界屯門井財街２９號地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_566292000113"
    ],
    "pedagogyTags": [
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "putonghua",
      "english",
      "native_english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24594477",
    "website": "http://tmckns.ccc.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5964420001",
    "schoolCode": "596442",
    "campusCode": "0001",
    "name": "中華基督教會屯門堂幼稚園二校",
    "nameEn": "THE CHURCH OF CHRIST IN CHINA TUEN MUN CHURCH NO. 2 KINDERGARTEN",
    "district": "新界",
    "district18": "屯門區",
    "address": "新界屯門井財街２９號１樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_596442000111",
      "edb_596442000112",
      "edb_596442000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "21520722",
    "website": "https://tmck2.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "low",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": true
    }
  },
  {
    "id": "edb_5286090001",
    "schoolCode": "528609",
    "campusCode": "0001",
    "name": "中華基督教會香港志道堂基博幼稚園(將軍澳)",
    "nameEn": "THE CHURCH OF CHRIST IN CHINA, HONG KONG CHI TO CHURCH KEI POK KINDERGARTEN (TSEUNG KWAN O)",
    "district": "新界",
    "district18": "西貢區",
    "address": "新界將軍澳廣明苑廣盈閣地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_528609000111",
      "edb_528609000112",
      "edb_528609000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "project_learn",
      "project_learn",
      "language_dev",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24330822",
    "website": "http://www.keipok.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_1585000001",
    "schoolCode": "158500",
    "campusCode": "0001",
    "name": "中華基督教會元朗堂朗屏邨真光幼稚園",
    "nameEn": "YUEN LONG CHURCH (CHURCH OF CHRIST IN CHINA) LONG PING ESTATE CHAN KWONG KINDERGARTEN",
    "district": "新界",
    "district18": "元朗區",
    "address": "新界元朗朗屏邨喜屏樓地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_158500000111",
      "edb_158500000112",
      "edb_158500000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "language_dev"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "",
    "website": "",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_1516290001",
    "schoolCode": "151629",
    "campusCode": "0001",
    "name": "中華基督教會元朗堂真光幼稚園",
    "nameEn": "YUEN LONG CHURCH (CHURCH OF CHRIST IN CHINA) CHAN KWONG KINDERGARTEN",
    "district": "新界",
    "district18": "元朗區",
    "address": "新界元朗屏信街５－７號丈量約份第１２０約地段第４０１１及元朗市地段３１",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_151629000111",
      "edb_151629000112"
    ],
    "pedagogyTags": [
      "play_explore",
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24765623",
    "website": "http://www.chankwong.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5708850001",
    "schoolCode": "570885",
    "campusCode": "0001",
    "name": "中華基督教會元朗堂真光幼稚園二校",
    "nameEn": "YUEN LONG CHURCH (CCC) CHAN KWONG NO. 2 KINDERGARTEN",
    "district": "新界",
    "district18": "元朗區",
    "address": "新界元朗屏信街９號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_570885000111",
      "edb_570885000112",
      "edb_570885000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "language_dev",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24765623",
    "website": "http://www.chankwong.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_5662500001",
    "schoolCode": "566250",
    "campusCode": "0001",
    "name": "中華基督教會元朗堂周宋主愛幼兒園",
    "nameEn": "YUEN LONG CHURCH (CHURCH OF CHRIST IN CHINA) CHOW SUNG CHU OI NURSERY SCHOOL",
    "district": "新界",
    "district18": "元朗區",
    "address": "新界元朗屏信街５號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_566250000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "play_explore",
      "project_learn",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24730092",
    "website": "http://www.ylccscons.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_1514240001",
    "schoolCode": "151424",
    "campusCode": "0001",
    "name": "中華基督教會長洲堂錦江幼稚園",
    "nameEn": "THE CHURCH OF CHRIST IN CHINA CHEUNG CHAU CHURCH KAM KONG KINDERGARTEN",
    "district": "新界",
    "district18": "離島區",
    "address": "新界長洲學校路１４號（幼兒中心專用範圍除外）",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_151424000111",
      "edb_151424000112",
      "edb_151424000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "trilingual"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "29812223",
    "website": "http://www.kamkongkg.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5646800001",
    "schoolCode": "564680",
    "campusCode": "0001",
    "name": "中華基督教青年會葵涌幼稚園",
    "nameEn": "CHINESE YMCA KWAI CHUNG KINDERGARTEN",
    "district": "新界",
    "district18": "葵青區",
    "address": "新界葵涌邨葵涌商場三樓平台３號",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_564680000111",
      "edb_564680000112",
      "edb_564680000113"
    ],
    "pedagogyTags": [
      "project_learn",
      "project_learn"
    ],
    "languageEnv": [
      "trilingual",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "22579025",
    "website": "http://www.kccymca.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5754290001",
    "schoolCode": "575429",
    "campusCode": "0001",
    "name": "中華基督教青年會上水幼稚園",
    "nameEn": "CHINESE Y.M.C.A. SHEUNG SHUI KINDERGARTEN",
    "district": "新界",
    "district18": "北區",
    "address": "新界上水清河邨清潤樓地下B翼及C翼",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_575429000111",
      "edb_575429000112",
      "edb_575429000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26635196",
    "website": "http://www.ymca.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5412300001",
    "schoolCode": "541230",
    "campusCode": "0001",
    "name": "中華基督教青年會幼稚園",
    "nameEn": "CHINESE Y.M.C.A. KINDERGARTEN",
    "district": "新界",
    "district18": "元朗區",
    "address": "新界天水圍天悅邨服務設施大樓二樓幼稚園",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_541230000111",
      "edb_541230000112",
      "edb_541230000113"
    ],
    "pedagogyTags": [
      "holistic"
    ],
    "languageEnv": [
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24452320",
    "website": "http://www.ymca.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5665860001",
    "schoolCode": "566586",
    "campusCode": "0001",
    "name": "竹園區神召會將軍澳康樂幼兒學校",
    "nameEn": "PENTECOSTAL CHURCH OF HONG KONG TSEUNG KWAN O NURSERY SCHOOL",
    "district": "新界",
    "district18": "西貢區",
    "address": "新界將軍澳尚德邨尚信樓４樓平台Ｂ及Ｃ翼",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_566586000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "project_learn",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "2178447221784475",
    "website": "http://tseungkwanons.pchk.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5665780001",
    "schoolCode": "566578",
    "campusCode": "0001",
    "name": "竹園區神召會太和康樂幼兒學校",
    "nameEn": "PENTECOSTAL CHURCH OF HONG KONG TAI WO NURSERY SCHOOL",
    "district": "新界",
    "district18": "大埔區",
    "address": "新界大埔太和邨太和鄰里社區中心３樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_566578000113"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "language_dev"
    ],
    "languageEnv": [
      "putonghua",
      "english",
      "native_english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26517772",
    "website": "http://taiwons.pchk.org.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5404980001",
    "schoolCode": "540498",
    "campusCode": "0001",
    "name": "主蔭幼稚園",
    "nameEn": "ANANI KINDERGARTEN",
    "district": "新界",
    "district18": "葵青區",
    "address": "新界葵涌石蔭邨石蔭商場平台Ｂ及Ｃ單位",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_540498000111",
      "edb_540498000112",
      "edb_540498000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "holistic",
      "holistic",
      "holistic"
    ],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "22760061",
    "website": "http://www.anani.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "medium",
      "needsReview": false
    }
  },
  {
    "id": "edb_2312400001",
    "schoolCode": "231240",
    "campusCode": "0001",
    "name": "卓思英文學校暨幼稚園(青怡分校)",
    "nameEn": "CHOICE ENGLISH SCHOOL & KINDERGARTEN (TSING YI BRANCH)",
    "district": "新界",
    "district18": "葵青區",
    "address": "新界青衣青怡花園第１座地下及１樓",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_231240000111",
      "edb_231240000112",
      "edb_231240000113"
    ],
    "pedagogyTags": [
      "play_explore",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24955595",
    "website": "http://www.choicekinder.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5973840002",
    "schoolCode": "597384",
    "campusCode": "0002",
    "name": "遵道幼稚園",
    "nameEn": "ABIDING KINDERGARTEN",
    "district": "新界",
    "district18": "元朗區",
    "address": "新界元朗丈量約份第１１５約地段第１０２號Ａ分段第１小分段地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_597384000211",
      "edb_597384000212"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24756996",
    "website": "http://www.abiding.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "low",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": true
    }
  },
  {
    "id": "edb_5973840001",
    "schoolCode": "597384",
    "campusCode": "0001",
    "name": "遵道幼稚園",
    "nameEn": "ABIDING KINDERGARTEN",
    "district": "新界",
    "district18": "元朗區",
    "address": "新界元朗丈量約份第１１５約南邊圍地段２３９號地下",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "non_kgp",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_597384000111",
      "edb_597384000112"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "24756996",
    "website": "http://www.abiding.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "low",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": true
    }
  },
  {
    "id": "edb_2309870001",
    "schoolCode": "230987",
    "campusCode": "0001",
    "name": "DISCOVERY BAY INTERNATIONAL SCHOOL",
    "nameEn": "DISCOVERY BAY INTERNATIONAL SCHOOL",
    "district": "新界",
    "district18": "離島區",
    "address": "新界大嶼山愉景灣",
    "nature": "international",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_230987000111",
      "edb_230987000112",
      "edb_230987000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "29877331",
    "website": "http://www.dbis.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "medium",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_6008140001",
    "schoolCode": "600814",
    "campusCode": "0001",
    "name": "DISCOVERY MONTESSORI ACADEMY",
    "nameEn": "DISCOVERY MONTESSORI ACADEMY",
    "district": "新界",
    "district18": "離島區",
    "address": "新界大嶼山愉景灣北1座",
    "nature": "international",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_600814000111",
      "edb_600814000112",
      "edb_600814000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "28129668",
    "website": "https://www.montessori-ami.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "low",
      "languageConfidence": "high",
      "needsReview": true
    }
  },
  {
    "id": "edb_5757550001",
    "schoolCode": "575755",
    "campusCode": "0001",
    "name": "GARDEN HOUSE WALDORF KINDERGARTEN",
    "nameEn": "GARDEN HOUSE WALDORF KINDERGARTEN",
    "district": "新界",
    "district18": "西貢區",
    "address": "新界清水灣銀線灣道７號銀線灣商場地下",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_575755000111",
      "edb_575755000112"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23581177",
    "website": "http://www.gardenhouse.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "low",
      "languageConfidence": "high",
      "needsReview": true
    }
  },
  {
    "id": "edb_5837740001",
    "schoolCode": "583774",
    "campusCode": "0001",
    "name": "GUIDEPOST MONTESSORI INTERNATIONAL KINDERGARTEN (CLEARWATER BAY)",
    "nameEn": "GUIDEPOST MONTESSORI INTERNATIONAL KINDERGARTEN (CLEARWATER BAY)",
    "district": "新界",
    "district18": "西貢區",
    "address": "新界西貢清水灣銀岬路2號銀線灣廣場7樓",
    "nature": "international",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_583774000111",
      "edb_583774000112"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "21856135",
    "website": "https://www.sunshinehouse.hk",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_6096250001",
    "schoolCode": "609625",
    "campusCode": "0001",
    "name": "GUIDEPOST MONTESSORI INTERNATIONAL KINDERGARTEN (DISCOVERY BAY)",
    "nameEn": "GUIDEPOST MONTESSORI INTERNATIONAL KINDERGARTEN (DISCOVERY BAY)",
    "district": "新界",
    "district18": "離島區",
    "address": "新界大嶼山愉景灣海澄湖畔路92號1樓106號舖",
    "nature": "international",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_609625000111",
      "edb_609625000112"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "21856134",
    "website": "",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5786300001",
    "schoolCode": "578630",
    "campusCode": "0001",
    "name": "GUIDEPOST MONTESSORI INTERNATIONAL PRE-SCHOOL (SAI KUNG)",
    "nameEn": "GUIDEPOST MONTESSORI INTERNATIONAL PRE-SCHOOL (SAI KUNG)",
    "district": "新界",
    "district18": "西貢區",
    "address": "新界西貢匡湖居購物中心地下D1 D2號舖及後院和D號舖(不包括D1 D2號舖及後院)",
    "nature": "international",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_578630000111",
      "edb_578630000112"
    ],
    "pedagogyTags": [
      "special_curriculum",
      "project_learn",
      "holistic"
    ],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25594855",
    "website": "http://www.woodlandschools.com",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "high",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_2309440001",
    "schoolCode": "230944",
    "campusCode": "0001",
    "name": "INTERNATIONAL COLLEGE HONG KONG HONG LOK YUEN (KINDERGARTEN SECTION)",
    "nameEn": "INTERNATIONAL COLLEGE HONG KONG HONG LOK YUEN (KINDERGARTEN SECTION)",
    "district": "新界",
    "district18": "大埔區",
    "address": "5 HONG LOK YUEN TWENTIETH STREET TAI PO NEW TERRITORIES",
    "nature": "international",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_230944000111",
      "edb_230944000112",
      "edb_230944000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "39553000",
    "website": "http://www.ichk.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "low",
      "languageConfidence": "high",
      "needsReview": true
    }
  },
  {
    "id": "edb_6153660001",
    "schoolCode": "615366",
    "campusCode": "0001",
    "name": "INVICTUS KINDERGARTEN",
    "nameEn": "INVICTUS KINDERGARTEN",
    "district": "新界",
    "district18": "西貢區",
    "address": "新界將軍澳唐俊街23號MONTEREY PLACE地下G27—G28號舖",
    "nature": "international",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "WD"
    ],
    "variantIds": [
      "edb_615366000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "36431868",
    "website": "http://www.invictus.edu.hk/tko",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "low",
      "languageConfidence": "high",
      "needsReview": true
    }
  },
  {
    "id": "edb_5900290001",
    "schoolCode": "590029",
    "campusCode": "0001",
    "name": "LA PETITE ENFANCE KINDERGARTEN",
    "nameEn": "LA PETITE ENFANCE KINDERGARTEN",
    "district": "新界",
    "district18": "離島區",
    "address": "新界大嶼山愉景灣海澄湖畔路92號一座寫字樓地下低層5、6及8號舖",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_590029000111",
      "edb_590029000112",
      "edb_590029000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "61677746",
    "website": "http://www.ecole-discovery.com",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "low",
      "languageConfidence": "high",
      "needsReview": true
    }
  },
  {
    "id": "edb_5647700001",
    "schoolCode": "564770",
    "campusCode": "0001",
    "name": "LEAPFROG KINDERGARTEN",
    "nameEn": "LEAPFROG KINDERGARTEN",
    "district": "新界",
    "district18": "西貢區",
    "address": "新界西貢北潭涌村１１號",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_564770000111",
      "edb_564770000112"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27911540",
    "website": "http://www.leapfrogkindergarten.org",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "low",
      "languageConfidence": "high",
      "needsReview": true
    }
  },
  {
    "id": "edb_6149980001",
    "schoolCode": "614998",
    "campusCode": "0001",
    "name": "LES PETITS LASCARS FRENCH INTERNATIONAL PRESCHOOL (TSEUNG KWAN O)",
    "nameEn": "LES PETITS LASCARS FRENCH INTERNATIONAL PRESCHOOL (TSEUNG KWAN O)",
    "district": "新界",
    "district18": "西貢區",
    "address": "新界將軍澳唐賢街33號Cａｐｒｉ Pｌａｃｅ地下G01號舖",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_614998000111",
      "edb_614998000112"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "25268666",
    "website": "http://hkkidsacademy.edu.hk/les-petits-lascars",
    "dataQuality": {
      "curriculumConfidence": "low",
      "pedagogyConfidence": "medium",
      "languageConfidence": "medium",
      "needsReview": true
    }
  },
  {
    "id": "edb_6084750001",
    "schoolCode": "608475",
    "campusCode": "0001",
    "name": "NORD ANGLIA INTERNATIONAL PRE-SCHOOL (SAI KUNG)",
    "nameEn": "NORD ANGLIA INTERNATIONAL PRE-SCHOOL (SAI KUNG)",
    "district": "新界",
    "district18": "西貢區",
    "address": "新界西貢康健路285號地下及1樓",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_608475000111",
      "edb_608475000112"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "39581488",
    "website": "http://www.nais.hk",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "low",
      "languageConfidence": "high",
      "needsReview": true
    }
  },
  {
    "id": "edb_2155200001",
    "schoolCode": "215520",
    "campusCode": "0001",
    "name": "NORWEGIAN INTERNATIONAL SCHOOL",
    "nameEn": "NORWEGIAN INTERNATIONAL SCHOOL",
    "district": "新界",
    "district18": "大埔區",
    "address": "新界大埔廣福道大埔平房及錦山路170號",
    "nature": "international",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_215520000111",
      "edb_215520000112",
      "edb_215520000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "putonghua",
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26380269",
    "website": "http://www.nis.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "medium",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_5426870001",
    "schoolCode": "542687",
    "campusCode": "0001",
    "name": "SAGARMATHA KINDERGARTEN",
    "nameEn": "SAGARMATHA KINDERGARTEN",
    "district": "新界",
    "district18": "元朗區",
    "address": "新界元朗青山公路１６２－１６８號聯昇樓２樓Ａ、Ｂ、Ｃ及Ｆ室",
    "nature": "non_profit",
    "curriculumCategory": "local",
    "curriculumType": "kgp",
    "joinedKGP": true,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_542687000111",
      "edb_542687000112"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "english",
      "cantonese"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "29440404",
    "website": "https://www.sagarmathakindergarten.com",
    "dataQuality": {
      "curriculumConfidence": "high",
      "pedagogyConfidence": "medium",
      "languageConfidence": "high",
      "needsReview": false
    }
  },
  {
    "id": "edb_2313710001",
    "schoolCode": "231371",
    "campusCode": "0001",
    "name": "SAI KUNG PRE-SCHOOL GROUP",
    "nameEn": "SAI KUNG PRE-SCHOOL GROUP",
    "district": "新界",
    "district18": "西貢區",
    "address": "西貢輋徑篤村一百五十九號",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_231371000111",
      "edb_231371000112"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "27917354",
    "website": "http://www.skip.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "low",
      "languageConfidence": "high",
      "needsReview": true
    }
  },
  {
    "id": "edb_6169900001",
    "schoolCode": "616990",
    "campusCode": "0001",
    "name": "YORK INTERNATIONAL PRE-SCHOOL (TUEN MUN)",
    "nameEn": "YORK INTERNATIONAL PRE-SCHOOL (TUEN MUN)",
    "district": "新界",
    "district18": "屯門區",
    "address": "新界屯門掃管笏路99號上源幼稚園校舍",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_616990000111",
      "edb_616990000112",
      "edb_616990000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "26380363",
    "website": "https://www.york.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "low",
      "pedagogyConfidence": "low",
      "languageConfidence": "low",
      "needsReview": true
    }
  },
  {
    "id": "edb_6214800001",
    "schoolCode": "621480",
    "campusCode": "0001",
    "name": "YORK INTERNATIONAL PRE-SCHOOL (WETLAND)",
    "nameEn": "YORK INTERNATIONAL PRE-SCHOOL (WETLAND)",
    "district": "新界",
    "district18": "元朗區",
    "address": "新界天水圍濕地公園路1號 WETLAND SEASONS BAY商場地下幼稚園",
    "nature": "non_profit",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM",
      "WD"
    ],
    "variantIds": [
      "edb_621480000111",
      "edb_621480000112",
      "edb_621480000113"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23372388",
    "website": "http://www.york.edu.hk/en/index.html",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "low",
      "languageConfidence": "high",
      "needsReview": true
    }
  },
  {
    "id": "edb_6097490001",
    "schoolCode": "609749",
    "campusCode": "0001",
    "name": "YORK MONTESSORI INTERNATIONAL PRE-SCHOOL (TSEUNG KWAN O)",
    "nameEn": "YORK MONTESSORI INTERNATIONAL PRE-SCHOOL (TSEUNG KWAN O)",
    "district": "新界",
    "district18": "西貢區",
    "address": "新界將軍澳常寧路10號安寧花園幼稚園／商業大樓1樓及地下32A-32B號舖",
    "nature": "international",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_609749000111",
      "edb_609749000112"
    ],
    "pedagogyTags": [],
    "languageEnv": [
      "english"
    ],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "36898779",
    "website": "http://www.york.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "medium",
      "pedagogyConfidence": "low",
      "languageConfidence": "high",
      "needsReview": true
    }
  },
  {
    "id": "edb_6054410001",
    "schoolCode": "605441",
    "campusCode": "0001",
    "name": "YORK MONTESSORI INTERNATIONAL PRE-SCHOOL (YUEN LONG)",
    "nameEn": "YORK MONTESSORI INTERNATIONAL PRE-SCHOOL (YUEN LONG)",
    "district": "新界",
    "district18": "元朗區",
    "address": "新界元朗錦田青山公路潭尾段１８號峻巒商場地下幼稚園校舍",
    "nature": "international",
    "curriculumCategory": "non_local",
    "curriculumType": "other",
    "joinedKGP": false,
    "sessions": [
      "AM",
      "PM"
    ],
    "variantIds": [
      "edb_605441000111",
      "edb_605441000112"
    ],
    "pedagogyTags": [],
    "languageEnv": [],
    "tuitionMin": 0,
    "tuitionMax": 0,
    "phone": "23689738",
    "website": "http://www.york.edu.hk",
    "dataQuality": {
      "curriculumConfidence": "low",
      "pedagogyConfidence": "low",
      "languageConfidence": "low",
      "needsReview": true
    }
  }
];

/**
 * Quick lookup by group ID
 */
export const kindergartenMap: Record<string, KindergartenEntry> = Object.fromEntries(
  kindergartens.map((k) => [k.id, k])
);

/**
 * Quick lookup by any variant ID (including session suffix)
 */
export const kindergartenByVariantId: Record<string, KindergartenEntry> = Object.fromEntries(
  kindergartens.flatMap((k) => k.variantIds.map((vid) => [vid, k]))
);

/**
 * Get kindergartens by nature
 */
export function getKindergartensByNature(nature: KGNature): KindergartenEntry[] {
  return kindergartens.filter((k) => k.nature === nature);
}

/**
 * Get kindergartens by curriculum category
 */
export function getKindergartensByCurriculumCategory(category: KGCurriculumCategory): KindergartenEntry[] {
  return kindergartens.filter((k) => k.curriculumCategory === category);
}

/**
 * Get kindergartens by curriculum type
 */
export function getKindergartensByCurriculumType(type: KGCurriculumType): KindergartenEntry[] {
  return kindergartens.filter((k) => k.curriculumType === type);
}

/**
 * Get kindergartens by pedagogy tag
 */
export function getKindergartensByPedagogy(tag: string): KindergartenEntry[] {
  return kindergartens.filter((k) => k.pedagogyTags.includes(tag));
}

/**
 * Get kindergartens by district
 */
export function getKindergartensByDistrict(district: string): KindergartenEntry[] {
  return kindergartens.filter((k) => k.district18 === district || k.district === district);
}

/**
 * Statistics
 */
export const kindergartenStats = {
  "total": 983,
  "byNature": {
    "international": 52,
    "non_profit": 931,
    "private": 0
  },
  "byCurriculumCategory": {
    "local": 837,
    "non_local": 146
  },
  "byCurriculumType": {
    "kgp": 712,
    "other": 118,
    "ib": 11,
    "non_kgp": 125,
    "montessori": 8,
    "british": 9
  },
  "byPedagogy": {
    "play_explore": 621,
    "project_learn": 684,
    "language_dev": 228,
    "holistic": 773,
    "special_curriculum": 98
  },
  "byLanguage": {
    "cantonese": 407,
    "english": 518,
    "native_english": 91,
    "putonghua": 239,
    "trilingual": 202,
    "bilingual": 89
  },
  "joinedKGP": 712,
  "withFees": 0,
  "needsReview": 139,
  "byDistrict": {
    "灣仔區": 30,
    "中西區": 44,
    "東區": 73,
    "南區": 34,
    "九龍城區": 91,
    "油尖旺區": 36,
    "黃大仙區": 43,
    "觀塘區": 75,
    "深水埗區": 53,
    "荃灣區": 37,
    "元朗區": 78,
    "大埔區": 36,
    "北區": 45,
    "葵青區": 62,
    "西貢區": 68,
    "屯門區": 65,
    "沙田區": 78,
    "離島區": 35
  }
};
