import { useState, useContext, useMemo } from "react";
import { View, Text, TouchableOpacity, ScrollView, Platform, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FilterContext, type ReligionFilter } from "@/lib/filter-context";
import { useColors } from "@/hooks/use-colors";
import type { Level, District18, SchoolCategory, SchoolGender, CurriculumV2 } from "@/types/school";
import { ALL_DISTRICT18, DISTRICT18_TO_DISTRICT } from "@/types/school";
import type { KGSession, KGCurriculumCategoryFilter, KGCurriculumSubtypeFilter, KGPedagogyTag, KGLanguageEnv } from "@/constants/kg-filters";
import { KG_PEDAGOGY_OPTIONS } from "@/constants/kg-pedagogy";
import { schools } from "@/data/schools";
import { kindergartens } from "@/data/kg/kg-database";
import { getOutstandingSchoolsByLevel, isOutstandingSchool } from "@/lib/outstanding-schools";
import * as Haptics from "expo-haptics";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Typography } from "@/components/ui/typography";
import { Spacing, SpacingPresets } from "@/constants/spacing";
import { BorderRadius, BorderRadiusPresets } from "@/constants/border-radius";
import { TypographyStyles } from "@/constants/typography";

/**
 * Q&A School Finder v1.1
 *
 * Stage Gate -> Kindergarten module (Primary/Secondary coming soon)
 *
 * KG Questions:
 * 1. 是否需要全日班？
 * 2. 預算是否有限？
 * 3. 是否需要普通話環境教授中文？
 * 4. 喜歡什麼類型的課程？
 * 5. 喜歡什麼教學特色？(multi-select) - SKIP if IB/英國/蒙特梭利
 * 6. 地區偏好？ - ONLY if results > 30
 */

// Create KG lookup map
const kgMap = new Map<string, typeof kindergartens[0]>();
for (const kg of kindergartens) {
  kgMap.set(kg.id, kg);
  for (const variantId of kg.variantIds) {
    kgMap.set(variantId, kg);
  }
}

const kgSchools = schools.filter(s => s.level === "幼稚園");

// Primary and Secondary schools
const primarySchools = schools.filter(s => s.level === "小學");
const secondarySchools = schools.filter(s => s.level === "中學");

// Adjacent districts mapping for fallback searches
const ADJACENT_DISTRICTS: Record<District18, District18[]> = {
  // 港島
  "中西區": ["灣仔區", "南區", "油尖旺區"],
  "東區": ["灣仔區", "南區", "西貢區"],
  "南區": ["中西區", "東區", "灣仔區", "離島區"],
  "灣仔區": ["中西區", "東區", "南區", "九龍城區"],
  // 九龍
  "九龍城區": ["油尖旺區", "黃大仙區", "觀塘區", "灣仔區"],
  "觀塘區": ["黃大仙區", "九龍城區", "西貢區"],
  "深水埗區": ["油尖旺區", "九龍城區", "黃大仙區", "葵青區", "沙田區"],
  "黃大仙區": ["九龍城區", "觀塘區", "深水埗區", "沙田區"],
  "油尖旺區": ["深水埗區", "九龍城區", "中西區"],
  // 新界
  "離島區": ["南區", "荃灣區", "葵青區", "屯門區"],
  "葵青區": ["深水埗區", "荃灣區", "離島區"],
  "北區": ["大埔區", "元朗區", "沙田區"],
  "西貢區": ["沙田區", "觀塘區", "東區"],
  "沙田區": ["大埔區", "西貢區", "黃大仙區", "深水埗區", "北區"],
  "大埔區": ["沙田區", "北區", "元朗區"],
  "荃灣區": ["葵青區", "屯門區", "離島區", "元朗區"],
  "屯門區": ["元朗區", "荃灣區", "離島區"],
  "元朗區": ["屯門區", "北區", "大埔區", "荃灣區"],
};

// Minimum schools threshold for fallback
const MIN_RESULTS_THRESHOLD = 5;

interface FallbackResult {
  districts: District18[];
  pedagogy: KGPedagogyTag[];
  hops: number;
  relaxedPedagogy: boolean;
  message: string;
}

// Get districts within N hops from starting district
function getDistrictsWithinHops(district: District18, maxHops: number): District18[] {
  const visited = new Set<District18>([district]);
  let frontier = [district];

  for (let hop = 0; hop < maxHops; hop++) {
    const nextFrontier: District18[] = [];
    for (const d of frontier) {
      for (const neighbor of ADJACENT_DISTRICTS[d]) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          nextFrontier.push(neighbor);
        }
      }
    }
    frontier = nextFrontier;
    if (frontier.length === 0) break;
  }

  return Array.from(visited);
}

// Calculate fallback for low/zero result cases using iterative hop expansion
function calculateFallback(
  session: KGSession[] | null,
  curriculumCategory: KGCurriculumCategoryFilter[] | null,
  curriculumType: KGCurriculumSubtypeFilter[] | null,
  languageEnv: KGLanguageEnv[] | null,
  pedagogy: KGPedagogyTag[],
  districts: District18[]
): FallbackResult {
  // If no district selected or multiple districts, no fallback needed
  if (districts.length !== 1) {
    return {
      districts,
      pedagogy,
      hops: 0,
      relaxedPedagogy: false,
      message: "",
    };
  }

  const district = districts[0];
  const MAX_HOPS = 6;

  // Try expanding hop by hop until we get enough results
  for (let hops = 0; hops <= MAX_HOPS; hops++) {
    const expandedDistricts = getDistrictsWithinHops(district, hops);
    const count = calculateResultCount(session, curriculumCategory, curriculumType, languageEnv, pedagogy, expandedDistricts);

    if (count >= MIN_RESULTS_THRESHOLD) {
      return {
        districts: expandedDistricts,
        pedagogy,
        hops,
        relaxedPedagogy: false,
        message: hops === 0 ? "" : "您所選的區域沒有足夠的匹配學校，我們為您選取了以下可能適合的學校",
      };
    }

    if (expandedDistricts.length >= 18) break;
  }

  // Relax pedagogy filter (if pedagogy was specified)
  if (pedagogy.length > 0) {
    for (let hops = 0; hops <= MAX_HOPS; hops++) {
      const expandedDistricts = getDistrictsWithinHops(district, hops);
      const count = calculateResultCount(session, curriculumCategory, curriculumType, languageEnv, [], expandedDistricts);

      if (count >= MIN_RESULTS_THRESHOLD) {
        return {
          districts: expandedDistricts,
          pedagogy: [],
          hops,
          relaxedPedagogy: true,
          message: "您所選的區域及教學特色沒有足夠的匹配學校，我們為您選取了以下可能適合的學校",
        };
      }

      if (expandedDistricts.length >= 18) break;
    }
  }

  // Last resort: return all districts with relaxed pedagogy
  return {
    districts: [],
    pedagogy: [],
    hops: -1,
    relaxedPedagogy: true,
    message: "您所選的條件沒有足夠的匹配學校，我們為您選取了以下可能適合的學校",
  };
}

// Calculate expected result count based on current filters
function calculateResultCount(
  session: KGSession[] | null,
  curriculumCategory: KGCurriculumCategoryFilter[] | null,
  curriculumType: KGCurriculumSubtypeFilter[] | null,
  languageEnv: KGLanguageEnv[] | null,
  pedagogy: KGPedagogyTag[],
  districts: District18[]
): number {
  return kgSchools.filter(school => {
    const kgData = kgMap.get(school.id);
    if (!kgData) return false;

    // Session filter
    if (session && session.length > 0) {
      if (!session.some(s => kgData.sessions.includes(s))) return false;
    }

    // Curriculum category filter
    if (curriculumCategory && curriculumCategory.length > 0) {
      if (!curriculumCategory.includes(kgData.curriculumCategory as KGCurriculumCategoryFilter)) {
        return false;
      }
    }

    // Curriculum type filter
    if (curriculumType && curriculumType.length > 0) {
      if (!curriculumType.includes(kgData.curriculumType as KGCurriculumSubtypeFilter)) {
        return false;
      }
    }

    // Language environment filter (putonghua = exclude cantonese-only)
    if (languageEnv && languageEnv.length > 0) {
      const isPutonghuaFilter = languageEnv.includes("putonghua");
      if (isPutonghuaFilter && languageEnv.length === 1) {
        const isCantoneseOnly = kgData.languageEnv.length === 1 && kgData.languageEnv[0] === "cantonese";
        if (isCantoneseOnly) return false;
      } else {
        if (!languageEnv.some(l => kgData.languageEnv.includes(l))) return false;
      }
    }

    // Pedagogy filter
    if (pedagogy.length > 0) {
      if (!pedagogy.some(p => kgData.pedagogyTags.includes(p))) return false;
    }

    // District18 filter
    if (districts.length > 0) {
      if (!districts.includes(school.district18 as District18)) return false;
    }

    return true;
  }).length;
}

// Calculate expected result count for Primary/Secondary based on current filters
function calculatePSResultCount(
  stage: "小學" | "中學" | null,
  category: SchoolCategory[] | null,
  gender: SchoolGender[] | null,
  curriculum: CurriculumV2[] | null,
  religion: ReligionFilter[] | null,
  districts: District18[]
): number {
  const baseSchools = stage === "小學" ? primarySchools : stage === "中學" ? secondarySchools : [];

  return baseSchools.filter(school => {
    // Category filter
    if (category && category.length > 0) {
      if (!category.includes(school.category)) return false;
    }

    // Gender filter
    if (gender && gender.length > 0) {
      if (!gender.includes(school.gender)) return false;
    }

    // Curriculum filter
    if (curriculum && curriculum.length > 0) {
      // School must have at least one of the selected curricula
      if (!curriculum.some(c => school.curriculumV2.includes(c))) return false;
    }

    // Religion filter
    if (religion && religion.length > 0) {
      const schoolReligion = school.religion;
      // Handle "無宗教" filter
      if (religion.includes("無宗教")) {
        // Include schools with no religion OR schools matching other selected religions
        const otherReligions = religion.filter(r => r !== "無宗教");
        if (!schoolReligion && otherReligions.length === 0) {
          // Only "無宗教" selected, include schools with no religion
          // Continue to next filter
        } else if (!schoolReligion) {
          // School has no religion and other religions selected - include it
          // Continue to next filter
        } else if (otherReligions.length > 0 && otherReligions.includes(schoolReligion as ReligionFilter)) {
          // School has religion matching other selections - include it
          // Continue to next filter
        } else if (!schoolReligion) {
          // School has no religion - include it
          // Continue to next filter
        } else {
          return false;
        }
      } else {
        // No "無宗教" selected, must match one of the selected religions
        if (!schoolReligion || !religion.includes(schoolReligion as ReligionFilter)) return false;
      }
    }

    // District18 filter
    if (districts.length > 0) {
      if (!districts.includes(school.district18 as District18)) return false;
    }

    return true;
  }).length;
}

// Get filtered schools for Primary/Secondary
function getPSFilteredSchools(
  stage: "小學" | "中學" | null,
  category: SchoolCategory[] | null,
  gender: SchoolGender[] | null,
  curriculum: CurriculumV2[] | null,
  religion: ReligionFilter[] | null,
  districts: District18[]
): typeof schools {
  const baseSchools = stage === "小學" ? primarySchools : stage === "中學" ? secondarySchools : [];

  return baseSchools.filter(school => {
    // Category filter
    if (category && category.length > 0) {
      if (!category.includes(school.category)) return false;
    }

    // Gender filter
    if (gender && gender.length > 0) {
      if (!gender.includes(school.gender)) return false;
    }

    // Curriculum filter
    if (curriculum && curriculum.length > 0) {
      if (!curriculum.some(c => school.curriculumV2.includes(c))) return false;
    }

    // Religion filter
    if (religion && religion.length > 0) {
      const schoolReligion = school.religion;
      if (religion.includes("無宗教")) {
        const otherReligions = religion.filter(r => r !== "無宗教");
        if (otherReligions.length === 0 && schoolReligion) return false;
        if (otherReligions.length > 0 && schoolReligion && !otherReligions.includes(schoolReligion as ReligionFilter)) return false;
      } else {
        if (!schoolReligion || !religion.includes(schoolReligion as ReligionFilter)) return false;
      }
    }

    // District18 filter
    if (districts.length > 0) {
      if (!districts.includes(school.district18 as District18)) return false;
    }

    return true;
  });
}

// Calculate fallback for Primary/Secondary using iterative hop expansion
function calculatePSFallback(
  stage: "小學" | "中學" | null,
  category: SchoolCategory[] | null,
  gender: SchoolGender[] | null,
  curriculum: CurriculumV2[] | null,
  religion: ReligionFilter[] | null,
  districts: District18[]
): { districts: District18[]; hops: number; message: string } {
  // If no district selected or multiple districts, no fallback needed
  if (districts.length !== 1) {
    return { districts, hops: 0, message: "" };
  }

  const district = districts[0];
  const MAX_HOPS = 6;

  // Try expanding hop by hop until we get enough results
  for (let hops = 0; hops <= MAX_HOPS; hops++) {
    const expandedDistricts = getDistrictsWithinHops(district, hops);
    const count = calculatePSResultCount(stage, category, gender, curriculum, religion, expandedDistricts);

    if (count >= PS_MIN_RESULTS_THRESHOLD) {
      return {
        districts: expandedDistricts,
        hops,
        message: hops === 0 ? "" : "您所選的區域沒有足夠的匹配學校，我們為您選取了附近區域的學校",
      };
    }

    if (expandedDistricts.length >= 18) break;
  }

  // Last resort: return all districts
  return {
    districts: [],
    hops: -1,
    message: "您所選的條件沒有足夠的匹配學校，我們為您推薦以下學校",
  };
}

// Q&A flow state
type QAModule = "stage_gate" | "kg" | "ps" | "ps_results";

// KG question IDs
type KGQuestionId = "session" | "budget" | "putonghua" | "curriculum" | "pedagogy" | "district";

// Primary/Secondary question IDs - New branching flow
type PSQuestionId =
  | "care_about"           // Q1: 地區/校網 vs 學校類型 vs 我不確定
  | "district_select"      // Route A: Q3A - Select district
  | "category_in_district" // Route A: Q4A - School type (in selected district)
  | "gender_route_a"       // Route A: Q5Aa - Gender (non-international)
  | "religion_route_a"     // Route A: Q6Aa - Religion (non-international)
  | "outstanding_select"   // Route A: Q7Aa - Outstanding schools multi-select
  | "curriculum_intl_a"    // Route A: Q5Ab - Curriculum (international)
  | "budget"               // Route B: Q3B - Budget preference
  | "category_intl_b"      // Route B: After budget=國際 - School type (國際/私立)
  | "curriculum_intl_b"    // Route B: Curriculum for international
  | "gender_route_b"       // Route B: Q4Ba - Gender (性价比 path)
  | "religion_route_b"     // Route B: Q5Ba - Religion (性价比 path)
  | "district_from_results"; // Route B: Q6Ba - District from remaining schools

// PS Route type
type PSRoute = "A" | "B" | null;

// Minimum schools threshold for stop condition
const PS_MIN_RESULTS_THRESHOLD = 5;

// Curricula that should skip pedagogy question
const SKIP_PEDAGOGY_CURRICULA: KGCurriculumSubtypeFilter[] = ["ib", "british", "montessori"];

// Threshold for showing district question
const DISTRICT_THRESHOLD = 30;

interface QAState {
  module: QAModule;
  kgQuestionId: KGQuestionId;
  // KG answers
  kgSession: KGSession[] | null;
  kgCurriculumCategory: KGCurriculumCategoryFilter[] | null;
  kgCurriculumType: KGCurriculumSubtypeFilter[] | null;
  kgLanguageEnv: KGLanguageEnv[] | null;
  kgPedagogy: KGPedagogyTag[];
  kgDistricts: District18[];
  // Primary/Secondary answers - New branching flow
  psStage: "小學" | "中學" | null;
  psQuestionId: PSQuestionId;
  psRoute: PSRoute;
  psCategory: SchoolCategory[] | null;
  psGender: SchoolGender[] | null;
  psCurriculum: CurriculumV2[] | null;
  psReligion: ReligionFilter[] | null;
  psDistricts: District18[];
  psSelectedOutstanding: string[]; // Selected outstanding school IDs
  psIsInternationalPath: boolean; // Whether user chose international in Route A
  // Results
  psResultSchools: typeof schools;
  psFallbackMessage: string;
}

const initialState: QAState = {
  module: "stage_gate",
  kgQuestionId: "session",
  kgSession: null,
  kgCurriculumCategory: null,
  kgCurriculumType: null,
  kgLanguageEnv: null,
  kgPedagogy: [],
  kgDistricts: [],
  // PS initial state - New branching flow
  psStage: null,
  psQuestionId: "care_about",
  psRoute: null,
  psCategory: null,
  psGender: null,
  psCurriculum: null,
  psReligion: null,
  psDistricts: [],
  psSelectedOutstanding: [],
  psIsInternationalPath: false,
  psResultSchools: [],
  psFallbackMessage: "",
};

// KG Question flow order
const KG_QUESTION_ORDER: KGQuestionId[] = ["session", "budget", "putonghua", "curriculum", "pedagogy", "district"];

// KG Question definitions
const KG_QUESTIONS: Record<KGQuestionId, {
  title: string;
  question: string;
  subtitle?: string;
  multiSelect?: boolean;
  options: { label: string; value: string }[];
}> = {
  session: {
    title: "時段需求",
    question: "是否需要全日班？",
    options: [
      { label: "需要", value: "need_wd" },
      { label: "不一定", value: "no_preference" },
    ],
  },
  budget: {
    title: "學費預算",
    question: "預算是否有限？",
    options: [
      { label: "是", value: "limited" },
      { label: "否", value: "flexible" },
    ],
  },
  putonghua: {
    title: "語言環境",
    question: "是否需要普通話環境教授中文？",
    options: [
      { label: "是", value: "yes" },
      { label: "不一定", value: "no_preference" },
    ],
  },
  curriculum: {
    title: "課程偏好",
    question: "喜歡什麼類型的課程？",
    options: [
      { label: "本地", value: "local" },
      { label: "IB", value: "ib" },
      { label: "英國", value: "british" },
      { label: "蒙特梭利", value: "montessori" },
      { label: "其它國際課程", value: "other" },
    ],
  },
  pedagogy: {
    title: "教學特色",
    question: "喜歡什麼教學特色？",
    subtitle: "可多選",
    multiSelect: true,
    options: KG_PEDAGOGY_OPTIONS.map((opt) => ({
      label: opt.label,
      value: opt.value,
    })),
  },
  district: {
    title: "地區偏好",
    question: "我們喜歡您的鬆弛感，那至少選個地區吧！",
    subtitle: "(您孩子大概在哪上學應該知道吧？)",
    multiSelect: false,
    options: [], // Districts rendered separately with grouping
  },
};

// District options grouped by region
const DISTRICT_GROUPS = [
  {
    region: "港島",
    districts: ["中西區", "東區", "南區", "灣仔區"] as District18[],
  },
  {
    region: "九龍",
    districts: ["九龍城區", "觀塘區", "深水埗區", "黃大仙區", "油尖旺區"] as District18[],
  },
  {
    region: "新界",
    districts: ["離島區", "葵青區", "北區", "西貢區", "沙田區", "大埔區", "荃灣區", "屯門區", "元朗區"] as District18[],
  },
];

// Primary/Secondary Question definitions - New branching flow
const PS_QUESTIONS: Record<PSQuestionId, {
  title: string;
  question: string;
  questionPrimary?: string; // Alternative question text for primary schools
  subtitle?: string;
  multiSelect?: boolean;
  options: { label: string; value: string; description?: string }[];
}> = {
  // Q1: What do you care about more?
  care_about: {
    title: "選校考量",
    question: "您更在意？",
    options: [
      { label: "地區", value: "district", description: "先選區域，再看學校類型" },
      { label: "學校類型", value: "category", description: "先選類型，再看地區" },
      { label: "我不確定", value: "unsure", description: "讓我們引導您" },
    ],
  },

  // Route A: Q3A - District selection
  district_select: {
    title: "地區偏好",
    question: "您希望在哪個區域上學？",
    questionPrimary: "您希望在哪個校網/區域上學？",
    subtitle: "選擇一個區域",
    options: [], // Districts rendered separately
  },

  // Route A: Q4A - School type in selected district
  category_in_district: {
    title: "學校類型",
    question: "在您選擇的區域內，傾向哪種類型的學校？",
    options: [], // Options generated dynamically based on available types in district
  },

  // Route A: Q5Aa - Gender (non-international path)
  gender_route_a: {
    title: "學校性別",
    question: "是否傾向男校/女校？",
    options: [
      { label: "男校", value: "BOYS" },
      { label: "女校", value: "GIRLS" },
      { label: "無所謂", value: "no_preference" },
    ],
  },

  // Route A: Q6Aa - Religion (non-international path)
  religion_route_a: {
    title: "宗教偏好",
    question: "是否有宗教傾向？",
    options: [], // Options generated dynamically based on available religions
  },

  // Route A: Q7Aa - Outstanding schools multi-select
  outstanding_select: {
    title: "精選學校",
    question: "該地區有我們的一些精選學校",
    subtitle: "可多選您感興趣的學校",
    multiSelect: true,
    options: [], // Options generated dynamically
  },

  // Route A: Q5Ab - Curriculum (international path)
  curriculum_intl_a: {
    title: "課程偏好",
    question: "傾向於哪種課程？",
    options: [
      { label: "IB", value: "IB" },
      { label: "英國課程", value: "BRITISH" },
      { label: "美國課程", value: "AMERICAN" },
      { label: "其他國際課程", value: "OTHER_INTL" },
      { label: "不限", value: "no_preference" },
    ],
  },

  // Route B: Q3B - Budget preference
  budget: {
    title: "預算考量",
    question: "預算是否有限？",
    options: [
      { label: "性價比更重要", value: "value", description: "資助、直資、官立學校" },
      { label: "國際學校", value: "international", description: "國際學校、私立學校" },
    ],
  },

  // Route B: Category for international (after budget=international)
  category_intl_b: {
    title: "學校類型",
    question: "您想要哪種類型的學校？",
    options: [
      { label: "國際學校", value: "國際", description: "多元文化、國際課程" },
      { label: "私立學校", value: "私立", description: "小班教學、特色課程" },
      { label: "不限", value: "no_preference", description: "國際+私立都可以" },
    ],
  },

  // Route B: Curriculum for international path
  curriculum_intl_b: {
    title: "課程偏好",
    question: "傾向於哪種課程？",
    options: [
      { label: "IB", value: "IB" },
      { label: "英國課程", value: "BRITISH" },
      { label: "美國課程", value: "AMERICAN" },
      { label: "本地課程", value: "HK_LOCAL" },
      { label: "其他國際課程", value: "OTHER_INTL" },
      { label: "不限", value: "no_preference" },
    ],
  },

  // Route B: Q4Ba - Gender (性价比 path)
  gender_route_b: {
    title: "學校性別",
    question: "是否傾向男校/女校？",
    options: [
      { label: "男校", value: "BOYS" },
      { label: "女校", value: "GIRLS" },
      { label: "無所謂", value: "no_preference" },
    ],
  },

  // Route B: Q5Ba - Religion (性价比 path)
  religion_route_b: {
    title: "宗教偏好",
    question: "是否有宗教傾向？",
    options: [], // Options generated dynamically
  },

  // Route B: Q6Ba - District from remaining schools
  district_from_results: {
    title: "地區選擇",
    question: "以下的地區可能有你心儀的學校，選擇一個地區？",
    subtitle: "僅顯示有符合條件學校的區域",
    options: [], // Options generated dynamically
  },
};

export default function QuizScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colors = useColors();
  const filterContext = useContext(FilterContext);
  const [state, setState] = useState<QAState>(initialState);

  if (!filterContext) {
    throw new Error("QuizScreen must be used within FilterProvider");
  }

  const { dispatch } = filterContext;

  // Define styles inside component to access colors
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: Spacing.lg,
      paddingVertical: Spacing.md,
    },
    backButton: {
      width: 40,
      height: 40,
      alignItems: "center",
      justifyContent: "center",
    },
    headerTitle: {
      ...TypographyStyles.heading,
      fontSize: 18,
      color: colors.foreground,
      letterSpacing: 1,
    },
    restartIconButton: {
      width: 40,
      height: 40,
      alignItems: "center",
      justifyContent: "center",
    },
    progressContainer: {
      paddingHorizontal: Spacing.xl,
      paddingTop: Spacing.sm,
      paddingBottom: Spacing.lg,
    },
    progressBar: {
      height: 4,
      backgroundColor: colors.border,
      borderRadius: BorderRadius.xs,
      overflow: "hidden",
    },
    progressFill: {
      height: "100%",
      borderRadius: BorderRadius.xs,
      // backgroundColor will be set dynamically
    },
    progressText: {
      ...TypographyStyles.small,
      color: colors.muted,
      textAlign: "center",
      marginTop: Spacing.sm,
    },
    scrollView: {
      flex: 1,
      paddingHorizontal: Spacing.xl,
    },
    questionContainer: {
      paddingVertical: Spacing.xl,
    },
    questionTitle: {
      ...TypographyStyles.caption,
      letterSpacing: 2,
      marginBottom: Spacing.sm,
      // color will be set dynamically
    },
    questionSubtitle: {
      ...TypographyStyles.title,
      fontSize: 26,
      color: colors.foreground,
      lineHeight: 36,
      marginBottom: Spacing.sm,
    },
    questionHint: {
      ...TypographyStyles.caption,
      color: colors.muted,
      marginBottom: Spacing.xl,
    },
    optionsContainer: {
      gap: Spacing.md,
      marginTop: Spacing.lg,
    },
    optionButton: {
      backgroundColor: colors.surface,
      paddingVertical: Spacing.xl,
      paddingHorizontal: Spacing.xl,
      borderRadius: BorderRadiusPresets.card,
      borderWidth: 1,
      borderColor: colors.border,
    },
    optionButtonSelected: {
      // backgroundColor and borderColor will be set dynamically
    },
    optionText: {
      ...TypographyStyles.body,
      fontSize: 17,
      fontWeight: TypographyStyles.heading.fontWeight,
      color: colors.foreground,
      textAlign: "center",
      letterSpacing: 0.5,
    },
    optionTextSelected: {
      // color will be set dynamically
    },
    checkboxRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 12,
    },
    checkbox: {
      width: 24,
      height: 24,
      borderRadius: BorderRadius.sm,
      borderWidth: 2,
      borderColor: colors.border,
      alignItems: "center",
      justifyContent: "center",
    },
    checkboxSelected: {
      // backgroundColor and borderColor will be set dynamically
    },
    completeButton: {
      marginTop: Spacing["2xl"],
      paddingVertical: Spacing.lg,
      borderRadius: BorderRadiusPresets.card,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 12,
      elevation: 8,
      // backgroundColor and shadowColor will be set dynamically
    },
    completeButtonText: {
      ...TypographyStyles.body,
      fontSize: 17,
      fontWeight: TypographyStyles.heading.fontWeight,
      color: "#FAF8F5",
      textAlign: "center",
      letterSpacing: 1,
    },
    resultHint: {
      marginTop: 24,
      alignItems: "center",
    },
    resultHintText: {
      ...TypographyStyles.caption,
      color: colors.muted,
    },
    placeholderContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 80,
      paddingHorizontal: 24,
    },
    placeholderIcon: {
      fontSize: 64,
      marginBottom: 24,
    },
    placeholderTitle: {
      fontSize: 24,
      fontWeight: "700",
      color: colors.foreground,
      fontFamily: "NotoSerifSC-Bold",
      marginBottom: 12,
    },
    placeholderText: {
      fontSize: 16,
      color: colors.muted,
      fontFamily: "NotoSerifSC-Regular",
      textAlign: "center",
      lineHeight: 26,
      marginBottom: 32,
    },
    restartButton: {
      backgroundColor: colors.surface,
      paddingVertical: 16,
      paddingHorizontal: 32,
      borderRadius: BorderRadius.lg,
      borderWidth: 1,
      borderColor: colors.border,
    },
    restartButtonText: {
      fontSize: 16,
      fontWeight: "500",
      color: colors.foreground,
      textAlign: "center",
      fontFamily: "NotoSerifSC-Regular",
    },
    // District selection styles
    districtGroup: {
      marginTop: 20,
    },
    districtGroupLabel: {
      fontSize: 13,
      color: colors.muted,
      fontFamily: "NotoSerifSC-Regular",
      marginBottom: Spacing.sm,
      letterSpacing: 1,
    },
    districtGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: Spacing.sm,
    },
    districtButton: {
      backgroundColor: colors.surface,
      paddingVertical: Spacing.md,
      paddingHorizontal: Spacing.lg,
      borderRadius: BorderRadius.md,
      borderWidth: 1,
      borderColor: colors.border,
    },
    districtButtonText: {
      fontSize: 15,
      fontWeight: "500",
      color: colors.foreground,
      fontFamily: "NotoSerifSC-Regular",
    },
  });

  // Determine which questions to show based on answers
  const getActiveQuestions = (): KGQuestionId[] => {
    const questions: KGQuestionId[] = ["session", "budget", "putonghua", "curriculum"];

    // Check if we should skip pedagogy
    const shouldSkipPedagogy = state.kgCurriculumType &&
      state.kgCurriculumType.some(t => SKIP_PEDAGOGY_CURRICULA.includes(t));

    if (!shouldSkipPedagogy) {
      questions.push("pedagogy");
    }

    // Check if we need district question (calculated after pedagogy or curriculum if skipped)
    const resultCount = calculateResultCount(
      state.kgSession,
      state.kgCurriculumCategory,
      state.kgCurriculumType,
      state.kgLanguageEnv,
      state.kgPedagogy,
      []
    );

    if (resultCount > DISTRICT_THRESHOLD) {
      questions.push("district");
    }

    return questions;
  };

  // Calculate progress
  const activeQuestions = useMemo(() => {
    if (state.module !== "kg") return [];
    return getActiveQuestions();
  }, [state.module, state.kgCurriculumType, state.kgPedagogy, state.kgSession, state.kgCurriculumCategory, state.kgLanguageEnv]);

  const currentQuestionIndex = activeQuestions.indexOf(state.kgQuestionId);
  const totalSteps = state.module === "kg" ? activeQuestions.length : 1;
  const currentStep = state.module === "kg" ? currentQuestionIndex + 1 : 1;
  const progress = state.module === "stage_gate" ? 0 : (currentStep / totalSteps) * 100;

  // Get next question ID
  const getNextQuestionId = (currentId: KGQuestionId, newState: QAState): KGQuestionId | null => {
    // Recalculate active questions with new state
    const shouldSkipPedagogy = newState.kgCurriculumType &&
      newState.kgCurriculumType.some(t => SKIP_PEDAGOGY_CURRICULA.includes(t));

    const resultCount = calculateResultCount(
      newState.kgSession,
      newState.kgCurriculumCategory,
      newState.kgCurriculumType,
      newState.kgLanguageEnv,
      newState.kgPedagogy,
      []
    );

    const questions: KGQuestionId[] = ["session", "budget", "putonghua", "curriculum"];
    if (!shouldSkipPedagogy) {
      questions.push("pedagogy");
    }
    if (resultCount > DISTRICT_THRESHOLD) {
      questions.push("district");
    }

    const currentIndex = questions.indexOf(currentId);
    if (currentIndex < questions.length - 1) {
      return questions[currentIndex + 1];
    }
    return null;
  };

  // Get previous question ID
  const getPrevQuestionId = (currentId: KGQuestionId): KGQuestionId | null => {
    const currentIndex = activeQuestions.indexOf(currentId);
    if (currentIndex > 0) {
      return activeQuestions[currentIndex - 1];
    }
    return null;
  };

  // Handle Stage Gate selection
  const handleStageSelect = (stage: Level) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    if (stage === "幼稚園") {
      // Enter KG module
      setState({ ...state, module: "kg", kgQuestionId: "session" });
    } else {
      // Enter Primary/Secondary module - New branching flow starts with "care_about"
      setState({
        ...state,
        module: "ps",
        psStage: stage as "小學" | "中學",
        psQuestionId: "care_about",
        psRoute: null,
        psCategory: null,
        psGender: null,
        psCurriculum: null,
        psReligion: null,
        psDistricts: [],
        psSelectedOutstanding: [],
        psIsInternationalPath: false,
      });
    }
  };

  // Handle KG question answers
  const handleKGAnswer = (questionId: KGQuestionId, value: string) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    let newState = { ...state };

    switch (questionId) {
      case "session":
        if (value === "need_wd") {
          newState.kgSession = ["WD"];
        } else {
          newState.kgSession = null; // No preference - don't set filter
        }
        break;

      case "budget":
        if (value === "limited") {
          // Budget limited => KGP (local + kgp subtype)
          newState.kgCurriculumCategory = ["local"];
          newState.kgCurriculumType = ["kgp"];
        } else {
          // Budget flexible => Non-KGP (local + non_kgp subtype)
          newState.kgCurriculumCategory = ["local"];
          newState.kgCurriculumType = ["non_kgp"];
        }
        break;

      case "putonghua":
        if (value === "yes") {
          newState.kgLanguageEnv = ["putonghua"];
        } else {
          newState.kgLanguageEnv = null; // No preference
        }
        break;

      case "curriculum":
        // This may override the budget question's curriculum setting
        if (value === "local") {
          // Keep existing local subtype from budget question if set
          newState.kgCurriculumCategory = ["local"];
          // Don't override kgCurriculumType if already set by budget question
        } else {
          // Non-local options override budget question's local setting
          newState.kgCurriculumCategory = ["non_local"];
          newState.kgCurriculumType = [value as KGCurriculumSubtypeFilter];
        }
        break;
    }

    // Determine next question
    const nextQuestionId = getNextQuestionId(questionId, newState);

    if (nextQuestionId) {
      newState.kgQuestionId = nextQuestionId;
      setState(newState);
    } else {
      // No more questions - complete the flow
      completeKGFlow(newState);
    }
  };

  // Handle multi-select toggle for pedagogy
  const handlePedagogyToggle = (value: KGPedagogyTag) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    const newPedagogy = state.kgPedagogy.includes(value)
      ? state.kgPedagogy.filter((p) => p !== value)
      : [...state.kgPedagogy, value];

    setState({ ...state, kgPedagogy: newPedagogy });
  };

  // Complete KG flow and apply filters
  const completeKGFlow = (finalState: QAState) => {
    // Calculate fallback if needed for low/zero results
    const fallback = calculateFallback(
      finalState.kgSession,
      finalState.kgCurriculumCategory,
      finalState.kgCurriculumType,
      finalState.kgLanguageEnv,
      finalState.kgPedagogy,
      finalState.kgDistricts
    );

    // Reset all filters first
    dispatch({ type: "RESET_FILTERS" });

    // Set stage to KG
    dispatch({ type: "SET_STAGE", payload: "幼稚園" });

    // Apply session filter
    if (finalState.kgSession) {
      finalState.kgSession.forEach((session) => {
        dispatch({ type: "TOGGLE_KG_SESSION", payload: session });
      });
    }

    // Apply curriculum category
    if (finalState.kgCurriculumCategory) {
      finalState.kgCurriculumCategory.forEach((cat) => {
        dispatch({ type: "TOGGLE_KG_CURRICULUM_CATEGORY", payload: cat });
      });
    }

    // Apply curriculum type
    if (finalState.kgCurriculumType) {
      finalState.kgCurriculumType.forEach((type) => {
        dispatch({ type: "TOGGLE_KG_CURRICULUM_TYPE", payload: type });
      });
    }

    // Apply language environment
    if (finalState.kgLanguageEnv) {
      finalState.kgLanguageEnv.forEach((lang) => {
        dispatch({ type: "TOGGLE_KG_LANGUAGE_ENV", payload: lang });
      });
    }

    // Apply pedagogy tags (use fallback pedagogy which may be relaxed)
    if (fallback.pedagogy.length > 0) {
      fallback.pedagogy.forEach((tag) => {
        dispatch({ type: "TOGGLE_KG_PEDAGOGY", payload: tag });
      });
    }

    // Apply district18 filter (use fallback districts which may be expanded)
    if (fallback.districts.length > 0) {
      fallback.districts.forEach((district) => {
        dispatch({ type: "TOGGLE_DISTRICT18", payload: district });
      });
    }

    // Navigate to search with fallback message if applicable
    if (fallback.message) {
      router.replace({
        pathname: "/(tabs)/search",
        params: { fallbackMessage: fallback.message },
      });
    } else {
      router.replace("/(tabs)/search");
    }
  };

  // Handle completing multi-select questions
  const handleCompleteMultiSelect = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }

    const nextQuestionId = getNextQuestionId(state.kgQuestionId, state);
    if (nextQuestionId) {
      setState({ ...state, kgQuestionId: nextQuestionId });
    } else {
      completeKGFlow(state);
    }
  };

  // Calculate current PS result count
  const currentPSResultCount = useMemo(() => {
    if (state.module !== "ps" && state.module !== "ps_results") return 0;
    return calculatePSResultCount(
      state.psStage,
      state.psCategory,
      state.psGender,
      state.psCurriculum,
      state.psReligion,
      state.psDistricts
    );
  }, [state.psStage, state.psCategory, state.psGender, state.psCurriculum, state.psReligion, state.psDistricts, state.module]);

  // Get current filtered schools for PS
  const currentPSFilteredSchools = useMemo(() => {
    if (state.module !== "ps" && state.module !== "ps_results") return [];
    return getPSFilteredSchools(
      state.psStage,
      state.psCategory,
      state.psGender,
      state.psCurriculum,
      state.psReligion,
      state.psDistricts
    );
  }, [state.psStage, state.psCategory, state.psGender, state.psCurriculum, state.psReligion, state.psDistricts, state.module]);

  // Get available categories in selected district
  const getAvailableCategoriesInDistrict = (): SchoolCategory[] => {
    const baseSchools = state.psStage === "小學" ? primarySchools : secondarySchools;
    const filtered = baseSchools.filter(s => state.psDistricts.length === 0 || state.psDistricts.includes(s.district18 as District18));
    const categories = [...new Set(filtered.map(s => s.category))];
    return categories;
  };

  // Get available religions from filtered schools
  const getAvailableReligions = (): string[] => {
    const religions = [...new Set(currentPSFilteredSchools.map(s => s.religion || "無宗教"))];
    return religions.sort((a, b) => {
      if (a === "無宗教") return 1;
      if (b === "無宗教") return -1;
      return a.localeCompare(b);
    });
  };

  // Get districts with remaining schools (for Route B Q6Ba)
  const getDistrictsWithSchools = (): District18[] => {
    const districts = [...new Set(currentPSFilteredSchools.map(s => s.district18 as District18))];
    return districts.sort((a, b) => {
      const countA = currentPSFilteredSchools.filter(s => s.district18 === a).length;
      const countB = currentPSFilteredSchools.filter(s => s.district18 === b).length;
      return countB - countA;
    });
  };

  // Get outstanding schools in selected district
  const getOutstandingSchoolsInDistrict = (): typeof schools => {
    const level = state.psStage as "中學" | "小學";
    const outstandingSchools = getOutstandingSchoolsByLevel(level);
    return outstandingSchools.filter(s =>
      state.psDistricts.length === 0 || state.psDistricts.includes(s.district18 as District18)
    );
  };

  // Check if should stop and show results (≤5 schools)
  const shouldStopAndShowResults = (schoolCount: number): boolean => {
    return schoolCount <= PS_MIN_RESULTS_THRESHOLD && schoolCount > 0;
  };

  // Handle PS question answers - New branching flow
  const handlePSAnswer = (questionId: PSQuestionId, value: string) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    let newState = { ...state };

    switch (questionId) {
      // Q1: What do you care about?
      case "care_about":
        if (value === "district") {
          // Route A: District-first
          newState.psRoute = "A";
          newState.psQuestionId = "district_select";
        } else {
          // Route B: Budget-first (both "category" and "unsure" go here)
          newState.psRoute = "B";
          newState.psQuestionId = "budget";
        }
        setState(newState);
        return;

      // Route A: District selection
      case "district_select":
        newState.psDistricts = [value as District18];
        // Check count after district selection
        const countAfterDistrict = calculatePSResultCount(
          newState.psStage, newState.psCategory, newState.psGender,
          newState.psCurriculum, newState.psReligion, newState.psDistricts
        );
        if (shouldStopAndShowResults(countAfterDistrict)) {
          completePSFlow(newState);
          return;
        }
        newState.psQuestionId = "category_in_district";
        setState(newState);
        return;

      // Route A: Category in district
      case "category_in_district":
        if (value === "no_preference") {
          newState.psCategory = null;
        } else {
          newState.psCategory = [value as SchoolCategory];
        }
        newState.psIsInternationalPath = value === "國際" || value === "私立";

        // Check count
        const countAfterCategory = calculatePSResultCount(
          newState.psStage, newState.psCategory, newState.psGender,
          newState.psCurriculum, newState.psReligion, newState.psDistricts
        );
        if (shouldStopAndShowResults(countAfterCategory)) {
          completePSFlow(newState);
          return;
        }

        // Branch based on international vs local
        if (newState.psIsInternationalPath) {
          newState.psQuestionId = "curriculum_intl_a";
        } else {
          newState.psQuestionId = "gender_route_a";
        }
        setState(newState);
        return;

      // Route A: Gender (non-international)
      case "gender_route_a":
        if (value !== "no_preference") {
          newState.psGender = [value as SchoolGender];
        }
        const countAfterGenderA = calculatePSResultCount(
          newState.psStage, newState.psCategory, newState.psGender,
          newState.psCurriculum, newState.psReligion, newState.psDistricts
        );
        if (shouldStopAndShowResults(countAfterGenderA)) {
          completePSFlow(newState);
          return;
        }
        newState.psQuestionId = "religion_route_a";
        setState(newState);
        return;

      // Route A: Religion (non-international)
      case "religion_route_a":
        if (value !== "no_preference") {
          newState.psReligion = [value as ReligionFilter];
        }
        const countAfterReligionA = calculatePSResultCount(
          newState.psStage, newState.psCategory, newState.psGender,
          newState.psCurriculum, newState.psReligion, newState.psDistricts
        );
        if (shouldStopAndShowResults(countAfterReligionA)) {
          completePSFlow(newState);
          return;
        }
        // Check if there are outstanding schools in this district
        const outstandingInDistrict = getOutstandingSchoolsByLevel(newState.psStage as "中學" | "小學")
          .filter(s => newState.psDistricts.includes(s.district18 as District18));
        if (outstandingInDistrict.length > 0 && countAfterReligionA > PS_MIN_RESULTS_THRESHOLD) {
          newState.psQuestionId = "outstanding_select";
        } else {
          completePSFlow(newState);
          return;
        }
        setState(newState);
        return;

      // Route A: Curriculum (international path)
      case "curriculum_intl_a":
        if (value !== "no_preference") {
          newState.psCurriculum = [value as CurriculumV2];
        }
        completePSFlow(newState);
        return;

      // Route B: Budget preference
      case "budget":
        if (value === "value") {
          // 性价比 - exclude international & private
          newState.psCategory = null; // Will filter to 資助, 直資, 公立 in the filter logic
          // Set flag to exclude international/private
          newState.psIsInternationalPath = false;
          const countAfterBudget = calculatePSResultCount(
            newState.psStage,
            ["資助", "直資", "公立"] as SchoolCategory[], // Explicitly filter
            newState.psGender,
            newState.psCurriculum,
            newState.psReligion,
            newState.psDistricts
          );
          // Store the actual filter
          newState.psCategory = ["資助", "直資", "公立"] as SchoolCategory[];
          if (shouldStopAndShowResults(countAfterBudget)) {
            completePSFlow(newState);
            return;
          }
          newState.psQuestionId = "gender_route_b";
        } else {
          // International - narrow to 國際 & 私立
          newState.psIsInternationalPath = true;
          newState.psQuestionId = "category_intl_b";
        }
        setState(newState);
        return;

      // Route B: Category for international
      case "category_intl_b":
        if (value === "no_preference") {
          newState.psCategory = ["國際", "私立"] as SchoolCategory[];
        } else {
          newState.psCategory = [value as SchoolCategory];
        }
        const countAfterCategoryB = calculatePSResultCount(
          newState.psStage, newState.psCategory, newState.psGender,
          newState.psCurriculum, newState.psReligion, newState.psDistricts
        );
        if (shouldStopAndShowResults(countAfterCategoryB)) {
          completePSFlow(newState);
          return;
        }
        newState.psQuestionId = "curriculum_intl_b";
        setState(newState);
        return;

      // Route B: Curriculum for international
      case "curriculum_intl_b":
        if (value !== "no_preference") {
          newState.psCurriculum = [value as CurriculumV2];
        }
        const countAfterCurriculumB = calculatePSResultCount(
          newState.psStage, newState.psCategory, newState.psGender,
          newState.psCurriculum, newState.psReligion, newState.psDistricts
        );
        if (shouldStopAndShowResults(countAfterCurriculumB)) {
          completePSFlow(newState);
          return;
        }
        // After curriculum, show district selection for international path
        newState.psQuestionId = "district_from_results";
        setState(newState);
        return;

      // Route B: Gender (性价比 path)
      case "gender_route_b":
        if (value !== "no_preference") {
          newState.psGender = [value as SchoolGender];
        }
        const countAfterGenderB = calculatePSResultCount(
          newState.psStage, newState.psCategory, newState.psGender,
          newState.psCurriculum, newState.psReligion, newState.psDistricts
        );
        if (shouldStopAndShowResults(countAfterGenderB)) {
          completePSFlow(newState);
          return;
        }
        newState.psQuestionId = "religion_route_b";
        setState(newState);
        return;

      // Route B: Religion (性价比 path)
      case "religion_route_b":
        if (value !== "no_preference") {
          newState.psReligion = [value as ReligionFilter];
        }
        const countAfterReligionB = calculatePSResultCount(
          newState.psStage, newState.psCategory, newState.psGender,
          newState.psCurriculum, newState.psReligion, newState.psDistricts
        );
        if (shouldStopAndShowResults(countAfterReligionB)) {
          completePSFlow(newState);
          return;
        }
        // Show district selection from remaining schools
        newState.psQuestionId = "district_from_results";
        setState(newState);
        return;

      // Route B: District from results
      case "district_from_results":
        newState.psDistricts = [value as District18];
        completePSFlow(newState);
        return;
    }
  };

  // Handle PS district selection (for district_select question)
  const handlePSDistrictSelect = (district: District18) => {
    handlePSAnswer("district_select", district);
  };

  // Handle outstanding schools toggle (multi-select)
  const handleOutstandingToggle = (schoolId: string) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    const newSelected = state.psSelectedOutstanding.includes(schoolId)
      ? state.psSelectedOutstanding.filter(id => id !== schoolId)
      : [...state.psSelectedOutstanding, schoolId];

    setState({ ...state, psSelectedOutstanding: newSelected });
  };

  // Complete outstanding selection
  const handleCompleteOutstandingSelect = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    completePSFlow(state);
  };

  // Complete PS flow and show results or go to filters
  const completePSFlow = (finalState: QAState) => {
    // Calculate fallback if needed for district expansion
    const fallback = calculatePSFallback(
      finalState.psStage,
      finalState.psCategory,
      finalState.psGender,
      finalState.psCurriculum,
      finalState.psReligion,
      finalState.psDistricts
    );

    // Get filtered schools with expanded districts
    let filteredSchools = getPSFilteredSchools(
      finalState.psStage,
      finalState.psCategory,
      finalState.psGender,
      finalState.psCurriculum,
      finalState.psReligion,
      fallback.districts.length > 0 ? fallback.districts : finalState.psDistricts
    );

    // If user selected outstanding schools, prioritize them
    if (finalState.psSelectedOutstanding.length > 0) {
      // Filter to only selected outstanding schools
      filteredSchools = filteredSchools.filter(s =>
        finalState.psSelectedOutstanding.includes(s.id)
      );
    }

    // If still > 5 schools after all questions and expansion, go to Filters
    if (filteredSchools.length > PS_MIN_RESULTS_THRESHOLD) {
      // Apply filters and go to search page
      applyPSFiltersAndNavigate(finalState, fallback);
      return;
    }

    // Show results page with <= 5 schools
    setState({
      ...finalState,
      module: "ps_results",
      psDistricts: fallback.districts.length > 0 ? fallback.districts : finalState.psDistricts,
      psResultSchools: filteredSchools,
      psFallbackMessage: fallback.message,
    });
  };

  // Apply PS filters and navigate to search
  const applyPSFiltersAndNavigate = (finalState: QAState, fallback: { districts: District18[]; hops: number; message: string }) => {
    // Reset all filters first
    dispatch({ type: "RESET_FILTERS" });

    // Set stage
    if (finalState.psStage) {
      dispatch({ type: "SET_STAGE", payload: finalState.psStage });
    }

    // Apply category filter
    if (finalState.psCategory) {
      finalState.psCategory.forEach((cat) => {
        dispatch({ type: "TOGGLE_CATEGORY", payload: cat });
      });
    }

    // Apply gender filter
    if (finalState.psGender) {
      finalState.psGender.forEach((g) => {
        dispatch({ type: "TOGGLE_GENDER", payload: g });
      });
    }

    // Apply curriculum filter
    if (finalState.psCurriculum) {
      finalState.psCurriculum.forEach((curr) => {
        dispatch({ type: "TOGGLE_CURRICULUM_V2", payload: curr });
      });
    }

    // Apply religion filter
    if (finalState.psReligion) {
      finalState.psReligion.forEach((rel) => {
        dispatch({ type: "TOGGLE_RELIGION", payload: rel });
      });
    }

    // Apply district18 filter (use fallback districts which may be expanded)
    const districtsToApply = fallback.districts.length > 0 ? fallback.districts : finalState.psDistricts;
    if (districtsToApply.length > 0) {
      districtsToApply.forEach((district) => {
        dispatch({ type: "TOGGLE_DISTRICT18", payload: district });
      });
    }

    // Navigate to search with fallback message if applicable
    if (fallback.message) {
      router.replace({
        pathname: "/(tabs)/search",
        params: { fallbackMessage: fallback.message },
      });
    } else {
      router.replace("/(tabs)/search");
    }
  };

  // Handle back navigation - Updated for branching flow
  const handleBack = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    if (state.module === "stage_gate") {
      router.back();
    } else if (state.module === "kg") {
      const prevQuestionId = getPrevQuestionId(state.kgQuestionId);
      if (prevQuestionId) {
        setState({ ...state, kgQuestionId: prevQuestionId });
      } else {
        // Go back to stage gate
        setState({ ...initialState });
      }
    } else if (state.module === "ps") {
      // Handle branching flow back navigation
      let newState = { ...state };

      switch (state.psQuestionId) {
        case "care_about":
          // Go back to stage gate
          setState({ ...initialState });
          return;

        // Route A back navigation
        case "district_select":
          newState.psQuestionId = "care_about";
          newState.psRoute = null;
          break;
        case "category_in_district":
          newState.psQuestionId = "district_select";
          newState.psDistricts = [];
          break;
        case "gender_route_a":
          newState.psQuestionId = "category_in_district";
          newState.psCategory = null;
          break;
        case "religion_route_a":
          newState.psQuestionId = "gender_route_a";
          newState.psGender = null;
          break;
        case "outstanding_select":
          newState.psQuestionId = "religion_route_a";
          newState.psReligion = null;
          newState.psSelectedOutstanding = [];
          break;
        case "curriculum_intl_a":
          newState.psQuestionId = "category_in_district";
          newState.psCategory = null;
          newState.psIsInternationalPath = false;
          break;

        // Route B back navigation
        case "budget":
          newState.psQuestionId = "care_about";
          newState.psRoute = null;
          break;
        case "category_intl_b":
          newState.psQuestionId = "budget";
          newState.psIsInternationalPath = false;
          break;
        case "curriculum_intl_b":
          newState.psQuestionId = "category_intl_b";
          newState.psCategory = null;
          break;
        case "gender_route_b":
          newState.psQuestionId = "budget";
          newState.psCategory = null;
          break;
        case "religion_route_b":
          newState.psQuestionId = "gender_route_b";
          newState.psGender = null;
          break;
        case "district_from_results":
          if (state.psIsInternationalPath) {
            newState.psQuestionId = "curriculum_intl_b";
            newState.psCurriculum = null;
          } else {
            newState.psQuestionId = "religion_route_b";
            newState.psReligion = null;
          }
          break;

        default:
          setState({ ...initialState });
          return;
      }

      setState(newState);
    } else if (state.module === "ps_results") {
      // Go back to last PS question based on route
      if (state.psRoute === "A") {
        if (state.psSelectedOutstanding.length > 0 || state.psQuestionId === "outstanding_select") {
          setState({ ...state, module: "ps", psQuestionId: "outstanding_select", psSelectedOutstanding: [] });
        } else if (state.psIsInternationalPath) {
          setState({ ...state, module: "ps", psQuestionId: "curriculum_intl_a", psCurriculum: null });
        } else {
          setState({ ...state, module: "ps", psQuestionId: "religion_route_a", psReligion: null });
        }
      } else {
        setState({ ...state, module: "ps", psQuestionId: "district_from_results", psDistricts: [] });
      }
    } else {
      setState({ ...initialState });
    }
  };

  // Handle restart
  const handleRestart = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setState({ ...initialState });
  };

  // Calculate current result count for display
  const currentResultCount = useMemo(() => {
    if (state.module !== "kg") return 0;
    return calculateResultCount(
      state.kgSession,
      state.kgCurriculumCategory,
      state.kgCurriculumType,
      state.kgLanguageEnv,
      state.kgPedagogy,
      state.kgDistricts
    );
  }, [state]);

  // Render Stage Gate
  const renderStageGate = () => (
    <View style={styles.questionContainer}>
      <Text style={[styles.questionTitle, { color: colors.primary }]}>學段選擇</Text>
      <Text style={styles.questionSubtitle}>您孩子目標就讀哪個學段？</Text>

      <View style={styles.optionsContainer}>
        <TouchableOpacity
          onPress={() => handleStageSelect("幼稚園")}
          style={styles.optionButton}
          activeOpacity={0.7}
        >
          <Text style={styles.optionText}>幼稚園</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleStageSelect("小學")}
          style={styles.optionButton}
          activeOpacity={0.7}
        >
          <Text style={styles.optionText}>小學</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleStageSelect("中學")}
          style={styles.optionButton}
          activeOpacity={0.7}
        >
          <Text style={styles.optionText}>中學</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Calculate PS progress - Updated for branching flow
  const getPSProgress = (): { current: number; total: number } => {
    if (state.psRoute === "A") {
      // Route A: care_about -> district -> category -> gender/curriculum -> religion -> outstanding
      const routeASteps = ["care_about", "district_select", "category_in_district"];
      if (state.psIsInternationalPath) {
        routeASteps.push("curriculum_intl_a");
      } else {
        routeASteps.push("gender_route_a", "religion_route_a", "outstanding_select");
      }
      const idx = routeASteps.indexOf(state.psQuestionId);
      return { current: Math.max(idx + 1, 1), total: routeASteps.length };
    } else if (state.psRoute === "B") {
      // Route B: care_about -> budget -> ...
      const routeBSteps = ["care_about", "budget"];
      if (state.psIsInternationalPath) {
        routeBSteps.push("category_intl_b", "curriculum_intl_b", "district_from_results");
      } else {
        routeBSteps.push("gender_route_b", "religion_route_b", "district_from_results");
      }
      const idx = routeBSteps.indexOf(state.psQuestionId);
      return { current: Math.max(idx + 1, 1), total: routeBSteps.length };
    }
    return { current: 1, total: 5 }; // Default for care_about
  };

  const psProgressInfo = getPSProgress();
  const psProgress = (psProgressInfo.current / psProgressInfo.total) * 100;

  // Render PS district selection (Route A: district_select)
  const renderPSDistrictSelectQuestion = () => {
    const question = PS_QUESTIONS.district_select;
    const questionText = state.psStage === "小學" && question.questionPrimary
      ? question.questionPrimary
      : question.question;

    return (
      <View style={styles.questionContainer}>
        <Text style={[styles.questionTitle, { color: colors.primary }]}>{question.title}</Text>
        <Text style={styles.questionSubtitle}>{questionText}</Text>
        {question.subtitle && (
          <Text style={styles.questionHint}>{question.subtitle}</Text>
        )}

        {DISTRICT_GROUPS.map((group) => (
          <View key={group.region} style={styles.districtGroup}>
            <Text style={styles.districtGroupLabel}>{group.region}</Text>
            <View style={styles.districtGrid}>
              {group.districts.map((district) => (
                <TouchableOpacity
                  key={district}
                  onPress={() => handlePSDistrictSelect(district)}
                  style={styles.districtButton}
                  activeOpacity={0.7}
                >
                  <Text style={styles.districtButtonText}>{district.replace("區", "")}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </View>
    );
  };

  // Render PS category in district (Route A: category_in_district)
  const renderCategoryInDistrictQuestion = () => {
    const question = PS_QUESTIONS.category_in_district;
    const availableCategories = getAvailableCategoriesInDistrict();

    // Define display order and labels
    const categoryConfig: { value: SchoolCategory; label: string; description: string }[] = [
      { value: "國際", label: "國際學校", description: "多元文化、國際課程" },
      { value: "直資", label: "直資學校", description: "靈活課程、質素保證" },
      { value: "私立", label: "私立學校", description: "小班教學、特色課程" },
      { value: "資助", label: "資助學校", description: "政府資助、學費全免" },
      { value: "公立", label: "官立學校", description: "政府直營" },
    ];

    const options = categoryConfig.filter(c => availableCategories.includes(c.value));

    return (
      <View style={styles.questionContainer}>
        <Text style={[styles.questionTitle, { color: colors.primary }]}>{question.title}</Text>
        <Text style={styles.questionSubtitle}>{question.question}</Text>

        <View style={styles.optionsContainer}>
          {options.map((option) => (
            <TouchableOpacity
              key={option.value}
              onPress={() => handlePSAnswer("category_in_district", option.value)}
              style={styles.optionButton}
              activeOpacity={0.7}
            >
              <Text style={styles.optionText}>{option.label}</Text>
              <Text style={[styles.optionText, { fontSize: 13, color: colors.muted, marginTop: 4 }]}>
                {option.description}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            onPress={() => handlePSAnswer("category_in_district", "no_preference")}
            style={styles.optionButton}
            activeOpacity={0.7}
          >
            <Text style={styles.optionText}>不限</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.resultHint}>
          <Text style={styles.resultHintText}>
            目前符合條件：{currentPSResultCount} 所學校
          </Text>
        </View>
      </View>
    );
  };

  // Render religion question with dynamic options
  const renderReligionQuestion = (questionId: "religion_route_a" | "religion_route_b") => {
    const question = PS_QUESTIONS[questionId];
    const availableReligions = getAvailableReligions();

    return (
      <View style={styles.questionContainer}>
        <Text style={[styles.questionTitle, { color: colors.primary }]}>{question.title}</Text>
        <Text style={styles.questionSubtitle}>{question.question}</Text>

        <View style={styles.optionsContainer}>
          {availableReligions.map((religion) => (
            <TouchableOpacity
              key={religion}
              onPress={() => handlePSAnswer(questionId, religion)}
              style={styles.optionButton}
              activeOpacity={0.7}
            >
              <Text style={styles.optionText}>{religion}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            onPress={() => handlePSAnswer(questionId, "no_preference")}
            style={styles.optionButton}
            activeOpacity={0.7}
          >
            <Text style={styles.optionText}>不限</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.resultHint}>
          <Text style={styles.resultHintText}>
            目前符合條件：{currentPSResultCount} 所學校
          </Text>
        </View>
      </View>
    );
  };

  // Render outstanding schools multi-select (Route A: Q7Aa)
  const renderOutstandingSelectQuestion = () => {
    const question = PS_QUESTIONS.outstanding_select;
    const outstandingSchools = getOutstandingSchoolsInDistrict();

    return (
      <View style={styles.questionContainer}>
        <Text style={[styles.questionTitle, { color: colors.primary }]}>{question.title}</Text>
        <Text style={styles.questionSubtitle}>{question.question}</Text>
        {question.subtitle && (
          <Text style={styles.questionHint}>{question.subtitle}</Text>
        )}

        <View style={styles.optionsContainer}>
          {outstandingSchools.map((school) => {
            const isSelected = state.psSelectedOutstanding.includes(school.id);
            return (
              <TouchableOpacity
                key={school.id}
                onPress={() => handleOutstandingToggle(school.id)}
                style={[
                  styles.optionButton,
                  isSelected && { backgroundColor: colors.primary + "26", borderColor: colors.primary },
                ]}
                activeOpacity={0.7}
              >
                <View style={styles.checkboxRow}>
                  <View style={[styles.checkbox, isSelected && { backgroundColor: colors.primary, borderColor: colors.primary }]}>
                    {isSelected && (
                      <IconSymbol name="checkmark" size={14} color="#fff" />
                    )}
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.optionText, { textAlign: "left" }, isSelected && { color: colors.primary }]}>
                      {school.name}
                    </Text>
                    <Text style={{ fontSize: 12, color: colors.muted, marginTop: 2 }}>
                      {school.category} · {school.district18}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity
          onPress={handleCompleteOutstandingSelect}
          style={[styles.completeButton, { backgroundColor: colors.primary, shadowColor: colors.primary }]}
          activeOpacity={0.8}
        >
          <Text style={styles.completeButtonText}>
            {state.psSelectedOutstanding.length > 0
              ? `完成選擇 (${state.psSelectedOutstanding.length})`
              : "跳過此題"}
          </Text>
        </TouchableOpacity>

        <View style={styles.resultHint}>
          <Text style={styles.resultHintText}>
            目前符合條件：{currentPSResultCount} 所學校
          </Text>
        </View>
      </View>
    );
  };

  // Render district from results (Route B: Q6Ba)
  const renderDistrictFromResultsQuestion = () => {
    const question = PS_QUESTIONS.district_from_results;
    const districtsWithSchools = getDistrictsWithSchools();

    // Group districts by region
    const districtsByRegion: Record<string, District18[]> = {
      "港島": [],
      "九龍": [],
      "新界": [],
    };

    districtsWithSchools.forEach(district => {
      const region = DISTRICT18_TO_DISTRICT[district];
      if (districtsByRegion[region]) {
        districtsByRegion[region].push(district);
      }
    });

    return (
      <View style={styles.questionContainer}>
        <Text style={[styles.questionTitle, { color: colors.primary }]}>{question.title}</Text>
        <Text style={styles.questionSubtitle}>{question.question}</Text>
        {question.subtitle && (
          <Text style={styles.questionHint}>{question.subtitle}</Text>
        )}

        {Object.entries(districtsByRegion).map(([region, districts]) => {
          if (districts.length === 0) return null;
          return (
            <View key={region} style={styles.districtGroup}>
              <Text style={styles.districtGroupLabel}>{region}</Text>
              <View style={styles.districtGrid}>
                {districts.map((district) => {
                  const count = currentPSFilteredSchools.filter(s => s.district18 === district).length;
                  return (
                    <TouchableOpacity
                      key={district}
                      onPress={() => handlePSAnswer("district_from_results", district)}
                      style={styles.districtButton}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.districtButtonText}>
                        {district.replace("區", "")} ({count})
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          );
        })}

        {/* Skip district option */}
        <TouchableOpacity
          onPress={() => completePSFlow(state)}
          style={[styles.completeButton, { backgroundColor: colors.muted, shadowColor: colors.muted, marginTop: Spacing.xl }]}
          activeOpacity={0.8}
        >
          <Text style={styles.completeButtonText}>不限地區</Text>
        </TouchableOpacity>

        <View style={styles.resultHint}>
          <Text style={styles.resultHintText}>
            目前符合條件：{currentPSResultCount} 所學校
          </Text>
        </View>
      </View>
    );
  };

  // Render PS question - Updated for branching flow
  const renderPSQuestion = () => {
    // Handle special rendering for specific questions
    switch (state.psQuestionId) {
      case "district_select":
        return renderPSDistrictSelectQuestion();
      case "category_in_district":
        return renderCategoryInDistrictQuestion();
      case "religion_route_a":
      case "religion_route_b":
        return renderReligionQuestion(state.psQuestionId);
      case "outstanding_select":
        return renderOutstandingSelectQuestion();
      case "district_from_results":
        return renderDistrictFromResultsQuestion();
    }

    // Default rendering for standard questions
    const question = PS_QUESTIONS[state.psQuestionId];

    return (
      <View style={styles.questionContainer}>
        <Text style={[styles.questionTitle, { color: colors.primary }]}>{question.title}</Text>
        <Text style={styles.questionSubtitle}>{question.question}</Text>
        {question.subtitle && (
          <Text style={styles.questionHint}>{question.subtitle}</Text>
        )}

        <View style={styles.optionsContainer}>
          {question.options.map((option) => (
            <TouchableOpacity
              key={option.value}
              onPress={() => handlePSAnswer(state.psQuestionId, option.value)}
              style={styles.optionButton}
              activeOpacity={0.7}
            >
              <Text style={styles.optionText}>{option.label}</Text>
              {option.description && (
                <Text style={[styles.optionText, { fontSize: 13, color: colors.muted, marginTop: 4 }]}>
                  {option.description}
                </Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Show current result count hint (not on first question) */}
        {state.psQuestionId !== "care_about" && (
          <View style={styles.resultHint}>
            <Text style={styles.resultHintText}>
              目前符合條件：{currentPSResultCount} 所學校
            </Text>
          </View>
        )}
      </View>
    );
  };

  // Render PS results
  const renderPSResults = () => {
    const resultSchools = state.psResultSchools.slice(0, 5);

    return (
      <View style={styles.questionContainer}>
        <Text style={[styles.questionTitle, { color: colors.primary }]}>推薦結果</Text>
        <Text style={styles.questionSubtitle}>
          為您找到 {state.psResultSchools.length} 所符合條件的{state.psStage}
        </Text>

        {state.psFallbackMessage && (
          <View style={[styles.optionButton, { backgroundColor: colors.primary + "15", borderColor: colors.primary + "30", marginBottom: Spacing.lg }]}>
            <Text style={[styles.optionText, { color: colors.primary, fontSize: 14 }]}>
              {state.psFallbackMessage}
            </Text>
          </View>
        )}

        {/* AI Brief Section */}
        <View style={[styles.optionButton, { backgroundColor: colors.surface, marginBottom: Spacing.lg }]}>
          <Text style={[styles.questionTitle, { color: colors.primary, marginBottom: Spacing.sm }]}>AI 簡報</Text>
          <Text style={{ color: colors.foreground, lineHeight: 22 }}>
            根據您的條件，我們為您篩選了 {resultSchools.length} 所{state.psStage}。
            {state.psCategory && state.psCategory[0] && `這些學校都是${state.psCategory[0]}學校，`}
            {state.psGender && state.psGender[0] === "BOYS" && "均為男校，"}
            {state.psGender && state.psGender[0] === "GIRLS" && "均為女校，"}
            {state.psCurriculum && state.psCurriculum[0] && `提供${state.psCurriculum[0] === "HK_LOCAL" ? "本地課程（DSE）" : state.psCurriculum[0]}課程，`}
            {state.psReligion && state.psReligion[0] && state.psReligion[0] !== "無宗教" && `屬${state.psReligion[0]}學校，`}
            {state.psReligion && state.psReligion[0] === "無宗教" && "不設宗教背景，"}
            {state.psDistricts.length === 1 && `位於${state.psDistricts[0]}附近。`}
            {state.psDistricts.length === 0 && "遍布全港各區。"}
            {state.psDistricts.length > 1 && `位於${state.psDistricts.slice(0, 3).join("、")}等區域。`}
          </Text>
        </View>

        {/* School Cards */}
        {resultSchools.map((school) => (
          <TouchableOpacity
            key={school.id}
            style={[styles.optionButton, { marginBottom: Spacing.md }]}
            activeOpacity={0.7}
            onPress={() => router.push(`/school/${school.id}`)}
          >
            <Text style={[styles.optionText, { textAlign: "left", fontWeight: "700" }]}>{school.name}</Text>
            <Text style={[styles.optionText, { textAlign: "left", fontSize: 13, color: colors.muted, marginTop: 4 }]}>
              {school.nameEn}
            </Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
              <View style={{ backgroundColor: colors.primary, paddingHorizontal: 10, paddingVertical: 4, borderRadius: BorderRadius.sm }}>
                <Text style={{ color: "#fff", fontSize: 11, fontWeight: "600" }}>{school.category}</Text>
              </View>
              <View style={{ backgroundColor: colors.border, paddingHorizontal: 10, paddingVertical: 4, borderRadius: BorderRadius.sm }}>
                <Text style={{ color: colors.foreground, fontSize: 11, fontWeight: "600" }}>{school.district18}</Text>
              </View>
              {school.religion && (
                <View style={{ backgroundColor: colors.border, paddingHorizontal: 10, paddingVertical: 4, borderRadius: BorderRadius.sm }}>
                  <Text style={{ color: colors.foreground, fontSize: 11, fontWeight: "600" }}>{school.religion}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        ))}

        {/* Deep Report Entry (Membership-gated) */}
        <TouchableOpacity
          style={[styles.completeButton, { backgroundColor: colors.secondary, shadowColor: colors.secondary, marginTop: Spacing.lg }]}
          activeOpacity={0.8}
          onPress={() => {
            // TODO: Check membership and show upgrade modal or navigate to deep report
            router.push({
              pathname: "/report-pro",
              params: { schoolIds: resultSchools.map(s => s.id).join(",") },
            });
          }}
        >
          <Text style={[styles.completeButtonText, { color: colors.foreground }]}>
            📊 獲取深度報告 (Pro)
          </Text>
        </TouchableOpacity>

        {/* Go to Filters Button */}
        <TouchableOpacity
          style={[styles.completeButton, { backgroundColor: colors.primary, shadowColor: colors.primary, marginTop: Spacing.md }]}
          activeOpacity={0.8}
          onPress={() => applyPSFiltersAndNavigate(state, { districts: state.psDistricts, hops: 0, message: "" })}
        >
          <Text style={styles.completeButtonText}>
            打開篩選器查看更多
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  // Handle district selection (single-select, completes flow)
  const handleDistrictSelect = (district: District18) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    const newState = { ...state, kgDistricts: [district] };
    completeKGFlow(newState);
  };

  // Render district question with grouped UI
  const renderDistrictQuestion = () => {
    const question = KG_QUESTIONS.district;

    return (
      <View style={styles.questionContainer}>
        <Text style={[styles.questionTitle, { color: colors.primary }]}>{question.title}</Text>
        <Text style={styles.questionSubtitle}>{question.question}</Text>
        {question.subtitle && (
          <Text style={styles.questionHint}>{question.subtitle}</Text>
        )}

        {DISTRICT_GROUPS.map((group) => (
          <View key={group.region} style={styles.districtGroup}>
            <Text style={styles.districtGroupLabel}>{group.region}</Text>
            <View style={styles.districtGrid}>
              {group.districts.map((district) => (
                <TouchableOpacity
                  key={district}
                  onPress={() => handleDistrictSelect(district)}
                  style={styles.districtButton}
                  activeOpacity={0.7}
                >
                  <Text style={styles.districtButtonText}>{district.replace("區", "")}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Show current result count hint */}
        <View style={styles.resultHint}>
          <Text style={styles.resultHintText}>
            目前符合條件：{currentResultCount} 所學校
          </Text>
        </View>
      </View>
    );
  };

  // Render KG question
  const renderKGQuestion = () => {
    // Special rendering for district question
    if (state.kgQuestionId === "district") {
      return renderDistrictQuestion();
    }

    const question = KG_QUESTIONS[state.kgQuestionId];
    const isMultiSelect = question.multiSelect;

    // Get current selection for multi-select (pedagogy only now)
    const multiSelectValues = state.kgQuestionId === "pedagogy" ? state.kgPedagogy : [];

    return (
      <View style={styles.questionContainer}>
        <Text style={[styles.questionTitle, { color: colors.primary }]}>{question.title}</Text>
        <Text style={styles.questionSubtitle}>{question.question}</Text>
        {question.subtitle && (
          <Text style={styles.questionHint}>{question.subtitle}</Text>
        )}

        <View style={styles.optionsContainer}>
          {isMultiSelect ? (
            // Multi-select for pedagogy
            <>
              {question.options.map((option) => {
                const isSelected = multiSelectValues.includes(option.value as KGPedagogyTag);
                return (
                  <TouchableOpacity
                    key={option.value}
                    onPress={() => handlePedagogyToggle(option.value as KGPedagogyTag)}
                    style={[
                    styles.optionButton,
                    isSelected && [styles.optionButtonSelected, { backgroundColor: colors.primary + "26", borderColor: colors.primary }],
                  ]}
                    activeOpacity={0.7}
                  >
                    <View style={styles.checkboxRow}>
                      <View style={[styles.checkbox, isSelected && [styles.checkboxSelected, { backgroundColor: colors.primary, borderColor: colors.primary }]]}>
                        {isSelected && (
                          <IconSymbol name="checkmark" size={14} color={colors.foreground} />
                        )}
                      </View>
                      <Text style={[styles.optionText, isSelected && [styles.optionTextSelected, { color: colors.primary }]]}>
                        {option.label}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </>
          ) : (
            // Single-select for other questions (auto-advances, no selection state needed)
            question.options.map((option) => (
              <TouchableOpacity
                key={option.value}
                onPress={() => handleKGAnswer(state.kgQuestionId, option.value)}
                style={styles.optionButton}
                activeOpacity={0.7}
              >
                <Text style={styles.optionText}>{option.label}</Text>
              </TouchableOpacity>
            ))
          )}
        </View>

        {/* Show complete button for multi-select questions */}
        {isMultiSelect && (
          <TouchableOpacity
            onPress={handleCompleteMultiSelect}
            style={[styles.completeButton, { backgroundColor: colors.primary, shadowColor: colors.primary }]}
            activeOpacity={0.8}
          >
            <Text style={styles.completeButtonText}>
              {multiSelectValues.length > 0 ? "完成選擇" : "跳過此題"}
            </Text>
          </TouchableOpacity>
        )}

        {/* Show current result count hint */}
        {state.kgQuestionId !== "session" && (
          <View style={styles.resultHint}>
            <Text style={styles.resultHintText}>
              目前符合條件：{currentResultCount} 所學校
            </Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={[colors.background, colors.surface, colors.background]}
        locations={[0, 0.5, 1]}
        style={StyleSheet.absoluteFill}
      />

      <MaxWidthWrapper>
        <View style={[styles.container, { paddingTop: insets.top }]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <IconSymbol name="chevron.left" size={24} color={colors.foreground} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>選校問答</Text>
          <TouchableOpacity onPress={handleRestart} style={styles.restartIconButton}>
            <IconSymbol name="arrow.counterclockwise" size={20} color={colors.muted + "99"} />
          </TouchableOpacity>
        </View>

        {/* Progress bar (for KG and PS modules) */}
        {state.module === "kg" && (
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progress}%`, backgroundColor: colors.primary }]} />
            </View>
            <Text style={styles.progressText}>
              問題 {currentStep} / {totalSteps}
            </Text>
          </View>
        )}
        {state.module === "ps" && (
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${psProgress}%`, backgroundColor: colors.primary }]} />
            </View>
            <Text style={styles.progressText}>
              問題 {psProgressInfo.current} / {psProgressInfo.total}
            </Text>
          </View>
        )}

        {/* Content */}
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {state.module === "stage_gate" && renderStageGate()}
          {state.module === "kg" && renderKGQuestion()}
          {state.module === "ps" && renderPSQuestion()}
          {state.module === "ps_results" && renderPSResults()}
        </ScrollView>
        </View>
      </MaxWidthWrapper>
    </View>
  );
}
