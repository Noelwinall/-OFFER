import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Platform, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { QuizFilters, Level, District, SchoolCategory, Curriculum, Language } from "@/types/school";
import { TUITION_RANGES } from "@/types/school";
import * as Haptics from "expo-haptics";
import { IconSymbol } from "@/components/ui/icon-symbol";

interface Question {
  id: keyof QuizFilters;
  title: string;
  subtitle: string;
  options: { label: string; value: any }[];
}

const QUESTIONS: Question[] = [
  {
    id: "level",
    title: "學段選擇",
    subtitle: "您孩子正在尋找哪個學段的學校？",
    options: [
      { label: "幼稚園", value: "幼稚園" as Level },
      { label: "小學", value: "小學" as Level },
      { label: "中學", value: "中學" as Level },
    ],
  },
  {
    id: "district",
    title: "地區偏好",
    subtitle: "您希望學校位於哪個地區？",
    options: [
      { label: "港島", value: "港島" as District },
      { label: "九龍", value: "九龍" as District },
      { label: "新界", value: "新界" as District },
    ],
  },
  {
    id: "tuitionRange",
    title: "學費預算",
    subtitle: "您的學費預算範圍是？",
    options: TUITION_RANGES.map((range) => ({
      label: range.label,
      value: { min: range.min, max: range.max },
    })),
  },
  {
    id: "category",
    title: "學校類型",
    subtitle: "您偏好哪種類型的學校？",
    options: [
      { label: "國際學校", value: "國際" as SchoolCategory },
      { label: "資助學校", value: "資助" as SchoolCategory },
      { label: "直資學校", value: "直資" as SchoolCategory },
      { label: "私立學校", value: "私立" as SchoolCategory },
      { label: "公立學校", value: "公立" as SchoolCategory },
    ],
  },
  {
    id: "curriculum",
    title: "課程體系",
    subtitle: "您希望學校提供哪種課程體系？",
    options: [
      { label: "IB 課程", value: "IB" as Curriculum },
      { label: "DSE 課程", value: "DSE" as Curriculum },
      { label: "IGCSE 課程", value: "IGCSE" as Curriculum },
      { label: "A-Level 課程", value: "A-Level" as Curriculum },
      { label: "其他課程", value: "其他" as Curriculum },
    ],
  },
  {
    id: "language",
    title: "教學語言",
    subtitle: "您希望學校的教學語言是？",
    options: [
      { label: "全英文", value: "全英文" as Language },
      { label: "中英雙語", value: "中英雙語" as Language },
      { label: "以中文為主", value: "以中文為主" as Language },
    ],
  },
];

export default function QuizScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [currentStep, setCurrentStep] = useState(0);
  const [filters, setFilters] = useState<QuizFilters>({});

  const currentQuestion = QUESTIONS[currentStep];
  const progress = ((currentStep + 1) / QUESTIONS.length) * 100;

  const handleQuizComplete = (finalFilters: QuizFilters) => {
    const params = new URLSearchParams();
    
    if (finalFilters.level) params.set("level", finalFilters.level);
    if (finalFilters.district) params.set("district", finalFilters.district);
    if (finalFilters.category) params.set("category", finalFilters.category);
    if (finalFilters.curriculum) params.set("curriculum", finalFilters.curriculum);
    if (finalFilters.language) params.set("language", finalFilters.language);
    if (finalFilters.tuitionRange) {
      params.set("tuitionMin", finalFilters.tuitionRange.min.toString());
      params.set("tuitionMax", finalFilters.tuitionRange.max.toString());
    }

    router.push(`/recommendation?${params.toString()}`);
  };

  const handleSelectOption = (value: any) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    const newFilters = {
      ...filters,
      [currentQuestion.id]: value,
    };
    setFilters(newFilters);

    // 自動進入下一題
    if (currentStep < QUESTIONS.length - 1) {
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, 300);
    } else {
      // 完成所有問題
      setTimeout(() => {
        handleQuizComplete(newFilters);
      }, 300);
    }
  };

  const handleSkip = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleQuizComplete(filters);
    }
  };

  const handleBack = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      router.back();
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={["#0F1629", "#1a2744", "#1e3a5f", "#1a2744"]}
        locations={[0, 0.3, 0.7, 1]}
        style={StyleSheet.absoluteFill}
      />
      
      <View style={[styles.container, { paddingTop: insets.top }]}>
        {/* 頂部導航 */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <IconSymbol name="chevron.left" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>選校問答</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* 進度條 */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.progressText}>
            問題 {currentStep + 1} / {QUESTIONS.length}
          </Text>
        </View>

        {/* 問題卡片 */}
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.questionContainer}>
            <Text style={styles.questionTitle}>{currentQuestion.title}</Text>
            <Text style={styles.questionSubtitle}>{currentQuestion.subtitle}</Text>

            {/* 選項列表 */}
            <View style={styles.optionsContainer}>
              {currentQuestion.options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleSelectOption(option.value)}
                  style={styles.optionButton}
                  activeOpacity={0.7}
                >
                  <Text style={styles.optionText}>{option.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>

        {/* 底部按鈕 */}
        <View style={[styles.bottomContainer, { paddingBottom: insets.bottom + 16 }]}>
          <TouchableOpacity
            onPress={handleSkip}
            style={styles.skipButton}
            activeOpacity={0.7}
          >
            <Text style={styles.skipButtonText}>不確定，跳過此題</Text>
          </TouchableOpacity>
        </View>
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
    marginBottom: 32,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    backgroundColor: "rgba(255,255,255,0.08)",
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
  },
  optionText: {
    fontSize: 17,
    fontWeight: "500",
    color: "#FFFFFF",
    textAlign: "center",
    fontFamily: "NotoSerifSC-Regular",
    letterSpacing: 0.5,
  },
  bottomContainer: {
    paddingHorizontal: 24,
    paddingTop: 16,
    gap: 12,
  },
  skipButton: {
    backgroundColor: "rgba(255,255,255,0.1)",
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  skipButtonText: {
    fontSize: 15,
    fontWeight: "500",
    color: "rgba(255,255,255,0.6)",
    textAlign: "center",
    fontFamily: "NotoSerifSC-Regular",
  },
});
