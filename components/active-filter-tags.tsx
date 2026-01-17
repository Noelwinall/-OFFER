import { View, Text, ScrollView, TouchableOpacity, Platform, StyleSheet } from "react-native";
import { useFilter, getFilterLabels, hasActiveFilters } from "@/lib/filter-context";
import type { District18, CurriculumV2, InstructionLanguage, SchoolGender } from "@/types/school";
import { CURRICULUM_V2_LABELS, INSTRUCTION_LANGUAGE_LABELS, SCHOOL_GENDER_LABELS } from "@/types/school";
import * as Haptics from "expo-haptics";

export function ActiveFilterTags() {
  const { state, dispatch } = useFilter();

  if (!hasActiveFilters(state)) {
    return null;
  }

  const triggerHaptic = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const handleClearAll = () => {
    triggerHaptic();
    dispatch({ type: "RESET_FILTERS" });
  };

  // 生成標籤列表
  const tags: { key: string; label: string; onRemove: () => void }[] = [];

  // 學費範圍
  if (state.tuitionRange) {
    const { min, max } = state.tuitionRange;
    let label = "";
    if (min === 0 && max === 0) {
      label = "免費";
    } else if (max >= 500000) {
      label = `$${(min / 10000).toFixed(0)}萬以上`;
    } else {
      label = `$${(min / 10000).toFixed(0)}-${(max / 10000).toFixed(0)}萬`;
    }
    tags.push({
      key: "tuition",
      label: `學費: ${label}`,
      onRemove: () => {
        triggerHaptic();
        dispatch({ type: "CLEAR_TUITION_RANGE" });
      },
    });
  }

  // 學校類型
  state.category.forEach((cat) => {
    tags.push({
      key: `category-${cat}`,
      label: cat,
      onRemove: () => {
        triggerHaptic();
        dispatch({ type: "TOGGLE_CATEGORY", payload: cat });
      },
    });
  });

  // 地區（三大區）
  state.district.forEach((dist) => {
    tags.push({
      key: `district-${dist}`,
      label: `${dist}區`,
      onRemove: () => {
        triggerHaptic();
        dispatch({ type: "TOGGLE_DISTRICT", payload: dist });
      },
    });
  });

  // 18區（分區）
  state.district18.forEach((d18) => {
    tags.push({
      key: `district18-${d18}`,
      label: d18,
      onRemove: () => {
        triggerHaptic();
        dispatch({ type: "TOGGLE_DISTRICT18", payload: d18 as District18 });
      },
    });
  });

  // 課程 V2
  state.curriculumV2.forEach((curr) => {
    tags.push({
      key: `curriculumV2-${curr}`,
      label: CURRICULUM_V2_LABELS[curr],
      onRemove: () => {
        triggerHaptic();
        dispatch({ type: "TOGGLE_CURRICULUM_V2", payload: curr as CurriculumV2 });
      },
    });
  });

  // 授課語言
  state.instructionLanguages.forEach((lang) => {
    tags.push({
      key: `instructionLang-${lang}`,
      label: INSTRUCTION_LANGUAGE_LABELS[lang],
      onRemove: () => {
        triggerHaptic();
        dispatch({ type: "TOGGLE_INSTRUCTION_LANGUAGE", payload: lang as InstructionLanguage });
      },
    });
  });

  // 學校性別
  state.gender.forEach((g) => {
    tags.push({
      key: `gender-${g}`,
      label: SCHOOL_GENDER_LABELS[g],
      onRemove: () => {
        triggerHaptic();
        dispatch({ type: "TOGGLE_GENDER", payload: g as SchoolGender });
      },
    });
  });

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {tags.map((tag) => (
          <TouchableOpacity
            key={tag.key}
            style={styles.tag}
            onPress={tag.onRemove}
          >
            <Text style={styles.tagText}>{tag.label}</Text>
            <Text style={styles.tagClose}>×</Text>
          </TouchableOpacity>
        ))}
        {tags.length > 1 && (
          <TouchableOpacity style={styles.clearAll} onPress={handleClearAll}>
            <Text style={styles.clearAllText}>清除全部</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  scrollContent: {
    gap: 8,
    paddingRight: 24,
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 217, 255, 0.15)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(0, 217, 255, 0.3)",
  },
  tagText: {
    fontSize: 13,
    color: "#00D9FF",
    fontFamily: "NotoSerifSC-Regular",
  },
  tagClose: {
    fontSize: 16,
    color: "#00D9FF",
    marginLeft: 6,
    fontWeight: "600",
  },
  clearAll: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
  },
  clearAllText: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.5)",
    fontFamily: "NotoSerifSC-Regular",
  },
});
