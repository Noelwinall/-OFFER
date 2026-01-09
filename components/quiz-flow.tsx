import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Platform } from "react-native";
import type { QuizFilters, Level, District, SchoolCategory, Curriculum, Language } from "@/types/school";
import { TUITION_RANGES } from "@/types/school";
import * as Haptics from "expo-haptics";

interface QuizFlowProps {
  onComplete: (filters: QuizFilters) => void;
}

interface Question {
  id: keyof QuizFilters;
  title: string;
  options: { label: string; value: any }[];
}

const QUESTIONS: Question[] = [
  {
    id: "level",
    title: "您孩子正在尋找哪個學段的學校？",
    options: [
      { label: "幼稚園", value: "幼稚園" as Level },
      { label: "小學", value: "小學" as Level },
      { label: "中學", value: "中學" as Level },
    ],
  },
  {
    id: "district",
    title: "您希望學校位於哪個地區？",
    options: [
      { label: "港島", value: "港島" as District },
      { label: "九龍", value: "九龍" as District },
      { label: "新界", value: "新界" as District },
    ],
  },
  {
    id: "tuitionRange",
    title: "您的學費預算範圍是？",
    options: TUITION_RANGES.map((range) => ({
      label: range.label,
      value: { min: range.min, max: range.max },
    })),
  },
  {
    id: "category",
    title: "您偏好哪種類型的學校？",
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
    title: "您希望學校提供哪種課程體系？",
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
    title: "您希望學校的教學語言是？",
    options: [
      { label: "全英文", value: "全英文" as Language },
      { label: "中英雙語", value: "中英雙語" as Language },
      { label: "以中文為主", value: "以中文為主" as Language },
    ],
  },
];

/**
 * 問答引導流程組件
 */
export function QuizFlow({ onComplete }: QuizFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [filters, setFilters] = useState<QuizFilters>({});

  const currentQuestion = QUESTIONS[currentStep];
  const progress = ((currentStep + 1) / QUESTIONS.length) * 100;

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
        onComplete(newFilters);
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
      onComplete(filters);
    }
  };

  const handleBack = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <View className="flex-1">
      {/* 進度條 */}
      <View className="px-6 pt-4 pb-2">
        <View className="h-1 bg-border rounded-full overflow-hidden">
          <View
            className="h-full bg-primary"
            style={{ width: `${progress}%` }}
          />
        </View>
        <Text className="text-xs text-muted mt-2 text-center">
          問題 {currentStep + 1} / {QUESTIONS.length}
        </Text>
      </View>

      {/* 問題卡片 */}
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        <View className="py-8">
          <Text className="text-2xl font-bold text-foreground mb-8 text-center">
            {currentQuestion.title}
          </Text>

          {/* 選項列表 */}
          <View className="gap-3">
            {currentQuestion.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleSelectOption(option.value)}
                className="bg-surface py-4 px-5 rounded-xl border border-border active:opacity-70"
              >
                <Text className="text-foreground text-base font-medium text-center">
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* 底部按鈕 */}
      <View className="px-6 pb-6 gap-3">
        <TouchableOpacity
          onPress={handleSkip}
          className="bg-muted/20 py-3 rounded-xl active:opacity-70"
        >
          <Text className="text-muted text-base font-medium text-center">
            不確定，跳過此題
          </Text>
        </TouchableOpacity>

        {currentStep > 0 && (
          <TouchableOpacity
            onPress={handleBack}
            className="py-2 active:opacity-70"
          >
            <Text className="text-primary text-sm font-medium text-center">
              返回上一題
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
