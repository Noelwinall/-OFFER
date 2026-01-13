/**
 * 學校資料類型定義
 */

export type SchoolCategory = "國際" | "資助" | "直資" | "私立" | "公立";
export type District = "港島" | "九龍" | "新界";
export type District18 =
  | "中西區" | "東區" | "南區" | "灣仔區"           // 港島 (4)
  | "九龍城區" | "觀塘區" | "深水埗區" | "黃大仙區" | "油尖旺區"  // 九龍 (5)
  | "離島區" | "葵青區" | "北區" | "西貢區" | "沙田區" | "大埔區" | "荃灣區" | "屯門區" | "元朗區"; // 新界 (9)
export type Level = "幼稚園" | "小學" | "中學";
export type Curriculum = "IB" | "DSE" | "IGCSE" | "A-Level" | "AP" | "美式課程" | "英式課程" | "德式課程" | "澳洲課程" | "新加坡課程" | "法式課程" | "加拿大課程" | "其他";
export type Language = "全英文" | "中英雙語" | "以中文為主";

export interface School {
  id: string;
  name: string;
  nameEn: string; // 英文名稱
  searchKeywords: string[]; // 搜索關鍵字（包含英文簡稱、別名等）
  category: SchoolCategory;
  district: District;
  district18: District18; // 18區詳細地區
  level: Level;
  tuitionMin: number; // 學費下限（港幣/年）
  tuitionMax: number; // 學費上限（港幣/年）
  curriculum: Curriculum[];
  language: Language;
  highlights: string[]; // 亮點描述（2-3 條）
  address: string;
  phone: string;
  website: string;
  applicationMaterials: string[]; // 申請材料清單
  applicationLink: string; // 申請連結
  latitude: number; // 緯度
  longitude: number; // 經度
}

/**
 * 問答引導篩選條件
 */
export interface QuizFilters {
  level?: Level;
  district?: District;
  tuitionRange?: {
    min: number;
    max: number;
  };
  category?: SchoolCategory;
  curriculum?: Curriculum;
  language?: Language;
}

/**
 * 學費區間選項
 */
export const TUITION_RANGES = [
  { label: "免費", min: 0, max: 0 },
  { label: "$20,000 以下", min: 1, max: 20000 },
  { label: "$20,000-$50,000", min: 20000, max: 50000 },
  { label: "$50,000-$100,000", min: 50000, max: 100000 },
  { label: "$100,000 以上", min: 100000, max: Infinity },
] as const;

/**
 * 格式化學費區間顯示
 */
export function formatTuitionRange(min: number, max: number, category?: SchoolCategory): string {
  if (min === 0 && max === 0) {
    if (category === "公立" || category === "資助") {
      return "免學費（政府資助）";
    }
    return "待確認";
  }
  if (max === Infinity) return `$${min.toLocaleString()} 以上`;
  if (min === max) return `$${min.toLocaleString()}`;
  return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
}

/**
 * 18區 → 三大區映射
 */
export const DISTRICT18_TO_DISTRICT: Record<District18, District> = {
  // 港島 (4)
  "中西區": "港島",
  "東區": "港島",
  "南區": "港島",
  "灣仔區": "港島",
  // 九龍 (5)
  "九龍城區": "九龍",
  "觀塘區": "九龍",
  "深水埗區": "九龍",
  "黃大仙區": "九龍",
  "油尖旺區": "九龍",
  // 新界 (9)
  "離島區": "新界",
  "葵青區": "新界",
  "北區": "新界",
  "西貢區": "新界",
  "沙田區": "新界",
  "大埔區": "新界",
  "荃灣區": "新界",
  "屯門區": "新界",
  "元朗區": "新界",
};

/**
 * 三大區 → 18區列表映射
 */
export const DISTRICT_TO_DISTRICT18: Record<District, District18[]> = {
  "港島": ["中西區", "東區", "南區", "灣仔區"],
  "九龍": ["九龍城區", "觀塘區", "深水埗區", "黃大仙區", "油尖旺區"],
  "新界": ["離島區", "葵青區", "北區", "西貢區", "沙田區", "大埔區", "荃灣區", "屯門區", "元朗區"],
};

/**
 * 所有18區列表（按三大區分組排序）
 */
export const ALL_DISTRICT18: District18[] = [
  // 港島
  "中西區", "東區", "南區", "灣仔區",
  // 九龍
  "九龍城區", "觀塘區", "深水埗區", "黃大仙區", "油尖旺區",
  // 新界
  "離島區", "葵青區", "北區", "西貢區", "沙田區", "大埔區", "荃灣區", "屯門區", "元朗區",
];
