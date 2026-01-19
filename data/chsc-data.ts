/**
 * CHSC (學校概覽) 資料載入器
 *
 * 數據來源：
 * - SSP (Secondary School Profile): data/CHSC/ssp_2025_2026_tc.csv
 * - PSP (Primary School Profile): data/CHSC/psp_2025_tc.csv
 *
 * 提供學校基本資訊：電話、傳真、電郵、創校年份、校訓
 * 僅適用於本地中小學，國際學校及幼稚園需從官網獲取
 */

// Pre-parsed CHSC data from CSV files
// This data is extracted from CHSC CSV files during build/development

export interface CHSCSchoolData {
  phone?: string;
  fax?: string;
  email?: string;
  yearEstablished?: string;
  schoolMotto?: string;
}

/**
 * CHSC 資料映射表
 * Key: 學校名稱（與 schools_raw 中的 name 字段匹配）
 *
 * 數據來源說明：
 * - 中學資料來自 SSP 2025-2026
 * - 小學資料來自 PSP 2025
 */
export const chscDataMap: Record<string, CHSCSchoolData> = {
  // === 中學 (SSP 2025-2026) ===
  // Source: data/CHSC/ssp_2025_2026_tc.csv

  "拔萃男書院": {
    phone: "27115191",
    fax: "27611026",
    email: "dbsadmin@dbs.edu.hk",
    yearEstablished: "1869",
    schoolMotto: undefined, // Not provided in CHSC
  },
  "拔萃女書院": {
    phone: "22779100",
    fax: "27807149",
    email: "info@dgs.edu.hk",
    yearEstablished: "1860",
    schoolMotto: "勵志揚善：本校前身為孤兒院，秉承關愛樂助的宗旨，學生皆積極支持慈善活動，並於校內、本地及外地的慈善機構參與義務工作。",
  },
  "保良局羅傑承（一九八三）中學": {
    phone: "24977110",
    fax: "24311156",
    email: "info@plk83.edu.hk",
    yearEstablished: "1984",
    schoolMotto: "愛、敬、勤、誠",
  },
  "保良局百周年李兆忠紀念中學": {
    phone: "24623945",
    fax: "24533094",
    email: "office@plkc.edu.hk",
    yearEstablished: "1978",
    schoolMotto: "愛、敬、勤、誠",
  },
  "聖若瑟書院": {
    phone: "25241268",
    fax: "28773181",
    email: "school@sjc.edu.hk",
    yearEstablished: "1875",
    schoolMotto: "勤、儉、忠、信",
  },
  "皇仁書院": {
    phone: "25764081",
    fax: "28821850",
    email: "mail@qc.edu.hk",
    yearEstablished: "1862",
    schoolMotto: "勤有功",
  },
  "英皇書院": {
    phone: "25478448",
    fax: "25591653",
    email: "kc@edb.gov.hk",
    yearEstablished: "1926",
    schoolMotto: "慎思篤行",
  },
  "香港華仁書院": {
    phone: "25722251",
    fax: "28344209",
    email: "wahyan@wahyan.edu.hk",
    yearEstablished: "1919",
    schoolMotto: "In Hoc Signo Vinces (此標誌你可獲勝)",
  },
  "九龍華仁書院": {
    phone: "23842038",
    fax: "27709911",
    email: "school@wyk.edu.hk",
    yearEstablished: "1924",
    schoolMotto: "In Hoc Signo Vinces (此標誌你可獲勝)",
  },
  "喇沙書院": {
    phone: "23387171",
    fax: "23365777",
    email: "lasalle@lasalle.edu.hk",
    yearEstablished: "1932",
    schoolMotto: "信與熱誠 (Faith and Zeal)",
  },
  "聖保羅男女中學": {
    phone: "25233316",
    fax: "25247598",
    email: "spcc@spcc.edu.hk",
    yearEstablished: "1915",
    schoolMotto: "信望愛",
  },
  "聖保羅書院": {
    phone: "25462241",
    fax: "25599529",
    email: "info@spc.edu.hk",
    yearEstablished: "1851",
    schoolMotto: "寅畏上主是為智之本",
  },
  "協恩中學": {
    phone: "27118018",
    fax: "27142028",
    email: "mail@hys.edu.hk",
    yearEstablished: "1936",
    schoolMotto: "協力藉恩",
  },
  "聖士提反女子中學": {
    phone: "25491430",
    fax: "25592058",
    email: "ssgc@ssgc.edu.hk",
    yearEstablished: "1906",
    schoolMotto: "本於信，以致信",
  },
  "英華女學校": {
    phone: "25460121",
    fax: "25478178",
    email: "info@ywgs.edu.hk",
    yearEstablished: "1900",
    schoolMotto: "誠信愛勤",
  },
  "真光女書院": {
    phone: "23801893",
    fax: "23807825",
    email: "office@tlgc.edu.hk",
    yearEstablished: "1973",
    schoolMotto: "爾乃世之光",
  },
  "培正中學": {
    phone: "23364768",
    fax: "27149329",
    email: "info@puiching.edu.hk",
    yearEstablished: "1933",
    schoolMotto: "至善至正",
  },
  "聖公會林護紀念中學": {
    phone: "24796921",
    fax: "24800959",
    email: "lammoss@lamwoo.edu.hk",
    yearEstablished: "1970",
    schoolMotto: "敬天愛人",
  },
  "聖公會曾肇添中學": {
    phone: "26977015",
    fax: "26951955",
    email: "info@skhtst.edu.hk",
    yearEstablished: "1978",
    schoolMotto: "智信仁勇",
  },
  "迦密中學": {
    phone: "27147123",
    fax: "27142120",
    email: "info@carmel.edu.hk",
    yearEstablished: "1964",
    schoolMotto: "明道律己 忠主善群",
  },
  "庇理羅士女子中學": {
    phone: "25721281",
    fax: "28383122",
    email: "info@belilios.edu.hk",
    yearEstablished: "1890",
    schoolMotto: "登高見博",
  },
  "嘉諾撒聖瑪利書院": {
    phone: "25660223",
    fax: "25686813",
    email: "info@smcc.edu.hk",
    yearEstablished: "1900",
    schoolMotto: "力行仁愛 實踐真理",
  },
  "瑪利諾修院學校（中學部）": {
    phone: "23360378",
    fax: "23368805",
    email: "admin@mcs.edu.hk",
    yearEstablished: "1925",
    schoolMotto: "明德惟馨",
  },
  "聖嘉勒女書院": {
    phone: "28173325",
    fax: "28171951",
    email: "stclare@stclare.edu.hk",
    yearEstablished: "1927",
    schoolMotto: "至潔至誠",
  },
  "藍田聖保祿中學": {
    phone: "27491315",
    fax: "27490570",
    email: "school@spcss.edu.hk",
    yearEstablished: "1970",
    schoolMotto: "為一切人成為一切",
  },
  "聖保祿中學": {
    phone: "25493363",
    fax: "25493889",
    email: "spss@stpauls.edu.hk",
    yearEstablished: "1854",
    schoolMotto: "為一切人成為一切",
  },
  "德望學校": {
    phone: "23271389",
    fax: "23275028",
    email: "info@ghs.edu.hk",
    yearEstablished: "1954",
    schoolMotto: "崇德瞻望",
  },
  "聖瑪加利男女英文中小學": {
    phone: "25766256",
    fax: "28187199",
    email: "sec@smcesps.edu.hk",
    yearEstablished: "1965",
    schoolMotto: undefined,
  },
  "民生書院": {
    phone: "27125221",
    fax: "27126293",
    email: "info@munsang.edu.hk",
    yearEstablished: "1926",
    schoolMotto: "人人為我 我為人人",
  },
  "聖芳濟書院": {
    phone: "23930027",
    fax: "23960079",
    email: "sfxc@sfxc.edu.hk",
    yearEstablished: "1955",
    schoolMotto: "與基督同行",
  },
  "中華基金中學": {
    phone: "26069163",
    fax: "26069228",
    email: "cfss@cfss.edu.hk",
    yearEstablished: "2000",
    schoolMotto: "立己立人",
  },

  // === 小學 (PSP 2025) ===
  // Source: data/CHSC/psp_2025_tc.csv

  "聖公會聖馬太小學": {
    phone: "25483368",
    fax: "29754641",
    email: "info@stmatthew.edu.hk",
    yearEstablished: "1876",
    schoolMotto: "非以役人，乃役於人",
  },
  "聖保羅書院小學": {
    phone: "37101777",
    fax: "37101851",
    email: "office@spc-ps.edu.hk",
    yearEstablished: "1851",
    schoolMotto: "寅畏上主是為智之本",
  },
  "拔萃男書院附屬小學": {
    phone: "27778124",
    fax: "27787107",
    email: "admin@dbspd.edu.hk",
    yearEstablished: "2004",
    schoolMotto: undefined,
  },
  "拔萃小學": {
    phone: "27141270",
    fax: "27117521",
    email: "dps@dps.edu.hk",
    yearEstablished: "1950",
    schoolMotto: undefined,
  },
  "拔萃女小學": {
    phone: "22779200",
    fax: "27604190",
    email: "dgjs@dgjs.edu.hk",
    yearEstablished: "1860",
    schoolMotto: undefined,
  },
  "聖保羅男女中學附屬小學": {
    phone: "25261882",
    fax: "25261681",
    email: "spccps@spccps.edu.hk",
    yearEstablished: "1915",
    schoolMotto: "信望愛",
  },
  "喇沙小學": {
    phone: "23366054",
    fax: "23367077",
    email: "lsps@lsps.edu.hk",
    yearEstablished: "1957",
    schoolMotto: "信與熱誠",
  },
  "瑪利諾修院學校（小學部）": {
    phone: "23360611",
    fax: "23361657",
    email: "primary@mcs.edu.hk",
    yearEstablished: "1925",
    schoolMotto: "明德惟馨",
  },
  "聖嘉勒小學": {
    phone: "25245429",
    fax: "25595348",
    email: "mail@stclare.edu.hk",
    yearEstablished: "1927",
    schoolMotto: "至潔至誠",
  },
  "協恩中學附屬小學": {
    phone: "27116139",
    fax: "27618546",
    email: "hyps@hyps.edu.hk",
    yearEstablished: "1936",
    schoolMotto: "協力藉恩",
  },
  "聖士提反女子中學附屬小學": {
    phone: "25401523",
    fax: "28748272",
    email: "school@ssgps.edu.hk",
    yearEstablished: "1906",
    schoolMotto: "本於信，以致信",
  },
  "英華小學": {
    phone: "27283320",
    fax: "27286266",
    email: "email@yingwaps.edu.hk",
    yearEstablished: "2003",
    schoolMotto: "篤信善行",
  },
  "培正小學": {
    phone: "27139766",
    fax: "27122325",
    email: "pcp@pcps.edu.hk",
    yearEstablished: "1933",
    schoolMotto: "至善至正",
  },
  "德望小學暨幼稚園": {
    phone: "23271395",
    fax: "23272316",
    email: "ghsps@ghs.edu.hk",
    yearEstablished: "1954",
    schoolMotto: "崇德瞻望",
  },
  "聖方濟各英文小學": {
    phone: "25777365",
    fax: "25777171",
    email: "sfes@sfes.edu.hk",
    yearEstablished: "1955",
    schoolMotto: "謙遜和平",
  },
  "嘉諾撒聖心學校": {
    phone: "25469926",
    fax: "28589469",
    email: "shcs@shcs.edu.hk",
    yearEstablished: "1860",
    schoolMotto: "力行仁愛 實踐真理",
  },
  "嘉諾撒聖瑪利學校": {
    phone: "23681603",
    fax: "23644328",
    email: "smcps@smcps.edu.hk",
    yearEstablished: "1928",
    schoolMotto: "力行仁愛 實踐真理",
  },
  "九龍塘學校（小學部）": {
    phone: "23362990",
    fax: "27945315",
    email: "info@ktsps.edu.hk",
    yearEstablished: "1936",
    schoolMotto: undefined,
  },
  "保良局陳守仁小學": {
    phone: "23911492",
    fax: "23914013",
    email: "info@plkctslps.edu.hk",
    yearEstablished: "1999",
    schoolMotto: "愛、敬、勤、誠",
  },
  "聖公會聖彼得小學": {
    phone: "25461325",
    fax: "28573406",
    email: "stpeter@spps.edu.hk",
    yearEstablished: "1879",
    schoolMotto: "非以役人、乃役於人",
  },
  "聖若瑟小學": {
    phone: "25748439",
    fax: "28582167",
    email: "mail@sjps.edu.hk",
    yearEstablished: "1968",
    schoolMotto: "勤、儉、忠、信",
  },
  "番禺會所華仁小學": {
    phone: "25724321",
    fax: "28349317",
    email: "info@pywjcps.edu.hk",
    yearEstablished: "1971",
    schoolMotto: undefined,
  },
  "香港真光中學（小學部）": {
    phone: "25766554",
    fax: "28827453",
    email: "hktlcps@tlc.edu.hk",
    yearEstablished: "1935",
    schoolMotto: "爾乃世之光",
  },
  "聖公會仁立小學": {
    phone: "24245965",
    fax: "24251105",
    email: "ylp@yanlaap.edu.hk",
    yearEstablished: "1970",
    schoolMotto: "非以役人 乃役於人",
  },
  "聖公會仁立紀念小學": {
    phone: "24233315",
    fax: "24845351",
    email: "school@ylmps.edu.hk",
    yearEstablished: "1989",
    schoolMotto: "非以役人 乃役於人",
  },
  "聖公會蒙恩小學": {
    phone: "27010534",
    fax: "27601315",
    email: "info@mosun.edu.hk",
    yearEstablished: "1992",
    schoolMotto: "非以役人 乃役於人",
  },
  "聖公會何澤芸小學": {
    phone: "26067006",
    fax: "26021440",
    email: "info@hcy.edu.hk",
    yearEstablished: "1983",
    schoolMotto: "非以役人 乃役於人",
  },
  "軒尼詩道官立小學": {
    phone: "25727294",
    fax: "25727250",
    email: "hrgps@edb.gov.hk",
    yearEstablished: "1949",
    schoolMotto: undefined,
  },
  "北角官立小學": {
    phone: "25617130",
    fax: "25619803",
    email: "npgps@edb.gov.hk",
    yearEstablished: "1954",
    schoolMotto: undefined,
  },
  "油蔴地天主教小學": {
    phone: "23743423",
    fax: "23749556",
    email: "info@ymtcps.edu.hk",
    yearEstablished: "1968",
    schoolMotto: "敬主愛人",
  },
  "油蔴地天主教小學（海泓道）": {
    phone: "26253766",
    fax: "26253906",
    email: "info@ymtcpsht.edu.hk",
    yearEstablished: "2001",
    schoolMotto: "敬主愛人",
  },
  "聖瑪加利男女英文中小學": {
    phone: "23967875",
    fax: "23966270",
    email: "pri@smcesps.edu.hk",
    yearEstablished: "1965",
    schoolMotto: undefined,
  },
  "民生書院小學": {
    phone: "23379606",
    fax: "23365989",
    email: "info@munsang.edu.hk",
    yearEstablished: "1926",
    schoolMotto: "人人為我 我為人人",
  },
  "香港培正小學": {
    phone: "27141280",
    fax: "27142693",
    email: "info@pcps.edu.hk",
    yearEstablished: "1933",
    schoolMotto: "至善至正",
  },
};

/**
 * 獲取學校的 CHSC 資料
 * @param schoolName 學校名稱
 * @returns CHSC 資料，若無則返回 undefined
 */
export function getCHSCData(schoolName: string): CHSCSchoolData | undefined {
  return chscDataMap[schoolName];
}

/**
 * 檢查學校是否有 CHSC 資料
 * @param schoolName 學校名稱
 */
export function hasCHSCData(schoolName: string): boolean {
  return schoolName in chscDataMap;
}
