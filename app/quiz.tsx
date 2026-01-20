import { useState, useContext } from "react";
import { View, Text, TouchableOpacity, ScrollView, Platform, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FilterContext } from "@/lib/filter-context";
import type { Level } from "@/types/school";
import type { KGSession, KGCurriculumCategoryFilter, KGCurriculumSubtypeFilter, KGPedagogyTag, KGLanguageEnv } from "@/constants/kg-filters";
import { KG_PEDAGOGY_OPTIONS } from "@/constants/kg-pedagogy";
import * as Haptics from "expo-haptics";
import { IconSymbol } from "@/components/ui/icon-symbol";

/**
 * Q&A School Finder v1
 *
 * Stage Gate -> Kindergarten module (Primary/Secondary coming soon)
 *
 * KG Questions:
 * 1. 是否需要全日班？
 * 2. 預算是否有限？
 * 3. 是否需要普通話環境教授中文？
 * 4. 喜歡什麼類型的課程？
 * 5. 喜歡什麼教學特色？(multi-select)
 */

// Q&A flow state
type QAModule = "stage_gate" | "kg" | "primary_secondary_placeholder";

interface QAState {
  module: QAModule;
  kgStep: number;
  // KG answers
  kgSession: KGSession[] | null;
  kgCurriculumCategory: KGCurriculumCategoryFilter[] | null;
  kgCurriculumType: KGCurriculumSubtypeFilter[] | null;
  kgLanguageEnv: KGLanguageEnv[] | null;
  kgPedagogy: KGPedagogyTag[];
}

const initialState: QAState = {
  module: "stage_gate",
  kgStep: 0,
  kgSession: null,
  kgCurriculumCategory: null,
  kgCurriculumType: null,
  kgLanguageEnv: null,
  kgPedagogy: [],
};

// KG Question definitions
const KG_QUESTIONS = [
  {
    id: "session",
    title: "時段需求",
    question: "是否需要全日班？",
    options: [
      { label: "需要", value: "need_wd" },
      { label: "不一定", value: "no_preference" },
    ],
  },
  {
    id: "budget",
    title: "學費預算",
    question: "預算是否有限？",
    options: [
      { label: "是", value: "limited" },
      { label: "否", value: "flexible" },
    ],
  },
  {
    id: "putonghua",
    title: "語言環境",
    question: "是否需要普通話環境教授中文？",
    options: [
      { label: "是", value: "yes" },
      { label: "不一定", value: "no_preference" },
    ],
  },
  {
    id: "curriculum",
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
  {
    id: "pedagogy",
    title: "教學特色",
    question: "喜歡什麼教學特色？",
    subtitle: "可多選",
    multiSelect: true,
    options: KG_PEDAGOGY_OPTIONS.map((opt) => ({
      label: opt.label,
      value: opt.value,
    })),
  },
];

export default function QuizScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const filterContext = useContext(FilterContext);
  const [state, setState] = useState<QAState>(initialState);

  if (!filterContext) {
    throw new Error("QuizScreen must be used within FilterProvider");
  }

  const { dispatch } = filterContext;

  // Calculate progress
  const getTotalSteps = () => {
    if (state.module === "stage_gate") return 1;
    if (state.module === "kg") return 1 + KG_QUESTIONS.length;
    return 1;
  };

  const getCurrentStep = () => {
    if (state.module === "stage_gate") return 1;
    if (state.module === "kg") return 1 + state.kgStep + 1;
    return 1;
  };

  const progress = (getCurrentStep() / getTotalSteps()) * 100;

  // Handle Stage Gate selection
  const handleStageSelect = (stage: Level) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    if (stage === "幼稚園") {
      // Enter KG module
      setState({ ...state, module: "kg", kgStep: 0 });
    } else {
      // Primary/Secondary - show placeholder
      setState({ ...state, module: "primary_secondary_placeholder" });
    }
  };

  // Handle KG question answers
  const handleKGAnswer = (questionId: string, value: string) => {
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

    // Move to next question
    if (state.kgStep < KG_QUESTIONS.length - 1) {
      newState.kgStep = state.kgStep + 1;
      setState(newState);
    } else {
      // Last question (pedagogy) - complete the flow
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

    // Apply pedagogy tags
    if (finalState.kgPedagogy.length > 0) {
      finalState.kgPedagogy.forEach((tag) => {
        dispatch({ type: "TOGGLE_KG_PEDAGOGY", payload: tag });
      });
    }

    // Navigate to search (which will show filtered results)
    router.replace("/(tabs)/search");
  };

  // Handle completing pedagogy (last question)
  const handleCompletePedagogy = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    completeKGFlow(state);
  };

  // Handle back navigation
  const handleBack = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    if (state.module === "stage_gate") {
      router.back();
    } else if (state.module === "kg") {
      if (state.kgStep > 0) {
        setState({ ...state, kgStep: state.kgStep - 1 });
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

  // Render Stage Gate
  const renderStageGate = () => (
    <View style={styles.questionContainer}>
      <Text style={styles.questionTitle}>學段選擇</Text>
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

  // Render KG question
  const renderKGQuestion = () => {
    const question = KG_QUESTIONS[state.kgStep];
    const isLastQuestion = state.kgStep === KG_QUESTIONS.length - 1;

    return (
      <View style={styles.questionContainer}>
        <Text style={styles.questionTitle}>{question.title}</Text>
        <Text style={styles.questionSubtitle}>{question.question}</Text>
        {question.subtitle && (
          <Text style={styles.questionHint}>{question.subtitle}</Text>
        )}

        <View style={styles.optionsContainer}>
          {question.multiSelect ? (
            // Multi-select for pedagogy
            <>
              {question.options.map((option) => {
                const isSelected = state.kgPedagogy.includes(option.value as KGPedagogyTag);
                return (
                  <TouchableOpacity
                    key={option.value}
                    onPress={() => handlePedagogyToggle(option.value as KGPedagogyTag)}
                    style={[
                      styles.optionButton,
                      isSelected && styles.optionButtonSelected,
                    ]}
                    activeOpacity={0.7}
                  >
                    <View style={styles.checkboxRow}>
                      <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
                        {isSelected && (
                          <IconSymbol name="checkmark" size={14} color="#0F1629" />
                        )}
                      </View>
                      <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
                        {option.label}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </>
          ) : (
            // Single-select for other questions
            question.options.map((option) => (
              <TouchableOpacity
                key={option.value}
                onPress={() => handleKGAnswer(question.id, option.value)}
                style={styles.optionButton}
                activeOpacity={0.7}
              >
                <Text style={styles.optionText}>{option.label}</Text>
              </TouchableOpacity>
            ))
          )}
        </View>

        {/* Show complete button for multi-select (pedagogy) */}
        {isLastQuestion && question.multiSelect && (
          <TouchableOpacity
            onPress={handleCompletePedagogy}
            style={styles.completeButton}
            activeOpacity={0.8}
          >
            <Text style={styles.completeButtonText}>
              {state.kgPedagogy.length > 0 ? "完成選擇" : "跳過此題並完成"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={["#0F1629", "#1a2744", "#1e3a5f", "#1a2744"]}
        locations={[0, 0.3, 0.7, 1]}
        style={StyleSheet.absoluteFill}
      />

      <View style={[styles.container, { paddingTop: insets.top }]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <IconSymbol name="chevron.left" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>選校問答</Text>
          <TouchableOpacity onPress={handleRestart} style={styles.restartIconButton}>
            <IconSymbol name="arrow.counterclockwise" size={20} color="rgba(255,255,255,0.6)" />
          </TouchableOpacity>
        </View>

        {/* Progress bar (only for KG module) */}
        {state.module === "kg" && (
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progress}%` }]} />
            </View>
            <Text style={styles.progressText}>
              問題 {state.kgStep + 1} / {KG_QUESTIONS.length}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Regular",
    letterSpacing: 1,
  },
  restartIconButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  progressContainer: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 16,
  },
  progressBar: {
    height: 4,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#00D9FF",
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: "rgba(255,255,255,0.5)",
    textAlign: "center",
    marginTop: 8,
    fontFamily: "NotoSerifSC-Regular",
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 24,
  },
  questionContainer: {
    paddingVertical: 24,
  },
  questionTitle: {
    fontSize: 14,
    color: "#00D9FF",
    fontFamily: "NotoSerifSC-Regular",
    letterSpacing: 2,
    marginBottom: 8,
  },
  questionSubtitle: {
    fontSize: 26,
    fontWeight: "700",
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Bold",
    lineHeight: 36,
    marginBottom: 8,
  },
  questionHint: {
    fontSize: 14,
    color: "rgba(255,255,255,0.5)",
    fontFamily: "NotoSerifSC-Regular",
    marginBottom: 24,
  },
  optionsContainer: {
    gap: 12,
    marginTop: 16,
  },
  optionButton: {
    backgroundColor: "rgba(255,255,255,0.08)",
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
  },
  optionButtonSelected: {
    backgroundColor: "rgba(0, 217, 255, 0.15)",
    borderColor: "#00D9FF",
  },
  optionText: {
    fontSize: 17,
    fontWeight: "500",
    color: "#FFFFFF",
    textAlign: "center",
    fontFamily: "NotoSerifSC-Regular",
    letterSpacing: 0.5,
  },
  optionTextSelected: {
    color: "#00D9FF",
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
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxSelected: {
    backgroundColor: "#00D9FF",
    borderColor: "#00D9FF",
  },
  completeButton: {
    marginTop: 32,
    backgroundColor: "#00D9FF",
    paddingVertical: 16,
    borderRadius: 16,
    shadowColor: "#00D9FF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  completeButtonText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#0F1629",
    textAlign: "center",
    fontFamily: "NotoSerifSC-Bold",
    letterSpacing: 1,
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
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Bold",
    marginBottom: 12,
  },
  placeholderText: {
    fontSize: 16,
    color: "rgba(255,255,255,0.6)",
    fontFamily: "NotoSerifSC-Regular",
    textAlign: "center",
    lineHeight: 26,
    marginBottom: 32,
  },
  restartButton: {
    backgroundColor: "rgba(255,255,255,0.1)",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  restartButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#FFFFFF",
    textAlign: "center",
    fontFamily: "NotoSerifSC-Regular",
  },
});
