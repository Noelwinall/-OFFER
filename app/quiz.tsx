import { useState, useContext, useMemo } from "react";
import { View, Text, TouchableOpacity, ScrollView, Platform, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FilterContext } from "@/lib/filter-context";
import { useColors } from "@/hooks/use-colors";
import type { Level, District18 } from "@/types/school";
import { ALL_DISTRICT18, DISTRICT18_TO_DISTRICT } from "@/types/school";
import type { KGSession, KGCurriculumCategoryFilter, KGCurriculumSubtypeFilter, KGPedagogyTag, KGLanguageEnv } from "@/constants/kg-filters";
import { KG_PEDAGOGY_OPTIONS } from "@/constants/kg-pedagogy";
import { schools } from "@/data/schools";
import { kindergartens } from "@/data/kg/kg-database";
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

// Q&A flow state
type QAModule = "stage_gate" | "kg" | "primary_secondary_placeholder";

// KG question IDs
type KGQuestionId = "session" | "budget" | "putonghua" | "curriculum" | "pedagogy" | "district";

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
      // Primary/Secondary - show placeholder
      setState({ ...state, module: "primary_secondary_placeholder" });
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

  // Handle back navigation
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

  // Render Primary/Secondary placeholder
  const renderPlaceholder = () => (
    <View style={styles.placeholderContainer}>
      <Text style={styles.placeholderIcon}>🚧</Text>
      <Text style={styles.placeholderTitle}>即將推出</Text>
      <Text style={styles.placeholderText}>
        小學及中學的選校問答正在開發中，{"\n"}
        敬請期待！
      </Text>
      <TouchableOpacity
        onPress={handleRestart}
        style={styles.restartButton}
        activeOpacity={0.7}
      >
        <Text style={styles.restartButtonText}>返回重新選擇</Text>
      </TouchableOpacity>
    </View>
  );

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

        {/* Progress bar (only for KG module) */}
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

        {/* Content */}
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {state.module === "stage_gate" && renderStageGate()}
          {state.module === "kg" && renderKGQuestion()}
          {state.module === "primary_secondary_placeholder" && renderPlaceholder()}
        </ScrollView>
        </View>
      </MaxWidthWrapper>
    </View>
  );
}
