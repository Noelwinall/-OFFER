import { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
  Modal,
  StyleSheet,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useFilter } from "@/lib/filter-context";
import { DISTRICT_TO_DISTRICT18, DISTRICT18_TO_DISTRICT, type District, type District18 } from "@/types/school";
import * as Haptics from "expo-haptics";

interface FilterSheetProps {
  visible: boolean;
  onClose: () => void;
}

const TUITION_PRESETS = [
  { label: "免費", min: 0, max: 0 },
  { label: "$5萬以下", min: 0, max: 50000 },
  { label: "$5-10萬", min: 50000, max: 100000 },
  { label: "$10-15萬", min: 100000, max: 150000 },
  { label: "$15-20萬", min: 150000, max: 200000 },
  { label: "$20萬以上", min: 200000, max: 500000 },
];

const CURRICULUM_OPTIONS = [
  { label: "IB 課程", value: "IB" as const },
  { label: "DSE 課程", value: "DSE" as const },
  { label: "IGCSE", value: "IGCSE" as const },
  { label: "A-Level", value: "A-Level" as const },
  { label: "AP 課程", value: "AP" as const },
  { label: "美式課程", value: "美式課程" as const },
  { label: "英式課程", value: "英式課程" as const },
];

const LANGUAGE_OPTIONS = [
  { label: "全英文", value: "全英文" as const },
  { label: "中英雙語", value: "中英雙語" as const },
  { label: "以中文為主", value: "以中文為主" as const },
];

const CATEGORY_OPTIONS = [
  { label: "國際學校", value: "國際" as const },
  { label: "直資學校", value: "直資" as const },
  { label: "私立學校", value: "私立" as const },
  { label: "資助學校", value: "資助" as const },
  { label: "公立學校", value: "公立" as const },
];

const DISTRICT_OPTIONS = [
  { label: "港島區", value: "港島" as const },
  { label: "九龍區", value: "九龍" as const },
  { label: "新界區", value: "新界" as const },
];

export function FilterSheet({ visible, onClose }: FilterSheetProps) {
  const { state, dispatch } = useFilter();
  const [localTuition, setLocalTuition] = useState<{ min: number; max: number } | null>(
    state.tuitionRange
  );

  // 同步外部狀態
  useEffect(() => {
    if (visible) {
      setLocalTuition(state.tuitionRange);
    }
  }, [visible, state.tuitionRange]);

  const triggerHaptic = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const handleApplyFilters = () => {
    triggerHaptic();
    if (localTuition) {
      dispatch({ type: "SET_TUITION_RANGE", payload: localTuition });
    } else {
      dispatch({ type: "CLEAR_TUITION_RANGE" });
    }
    onClose();
  };

  const handleResetFilters = () => {
    triggerHaptic();
    dispatch({ type: "RESET_FILTERS" });
    setLocalTuition(null);
  };

  const handleTuitionSelect = (min: number, max: number) => {
    triggerHaptic();
    if (localTuition?.min === min && localTuition?.max === max) {
      setLocalTuition(null);
    } else {
      setLocalTuition({ min, max });
    }
  };

  const isTuitionSelected = (min: number, max: number) => {
    return localTuition?.min === min && localTuition?.max === max;
  };

  // 計算活躍篩選數量
  const getActiveCount = () => {
    let count = 0;
    if (localTuition) count++;
    if (state.curriculum.length > 0) count++;
    if (state.language) count++;
    if (state.category.length > 0) count++;
    if (state.district.length > 0) count++;
    if (state.district18.length > 0) count++;
    return count;
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={onClose} />
        <View style={styles.sheetContainer}>
          <LinearGradient
            colors={["#1A2744", "#0F1629", "#0A0F1C"]}
            style={styles.sheet}
          >
            {/* 頂部把手 */}
            <View style={styles.handleContainer}>
              <View style={styles.handle} />
            </View>

            {/* 標題欄 */}
            <View style={styles.header}>
              <Text style={styles.title}>篩選學校</Text>
              <TouchableOpacity onPress={handleResetFilters}>
                <Text style={styles.resetText}>重置</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              style={styles.content}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.contentContainer}
            >
              {/* 學費範圍 */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>💰 學費範圍（每年）</Text>
                <View style={styles.chipContainer}>
                  {TUITION_PRESETS.map((preset) => (
                    <TouchableOpacity
                      key={preset.label}
                      style={[
                        styles.chip,
                        isTuitionSelected(preset.min, preset.max) && styles.chipSelected,
                      ]}
                      onPress={() => handleTuitionSelect(preset.min, preset.max)}
                    >
                      <Text
                        style={[
                          styles.chipText,
                          isTuitionSelected(preset.min, preset.max) && styles.chipTextSelected,
                        ]}
                      >
                        {preset.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* 學校類型 */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>🏫 學校類型</Text>
                <View style={styles.chipContainer}>
                  {CATEGORY_OPTIONS.map((option) => {
                    const isSelected = state.category.includes(option.value);
                    return (
                      <TouchableOpacity
                        key={option.value}
                        style={[styles.chip, isSelected && styles.chipSelected]}
                        onPress={() => {
                          triggerHaptic();
                          dispatch({ type: "TOGGLE_CATEGORY", payload: option.value });
                        }}
                      >
                        <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
                          {option.label}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

              {/* 地區（兩層篩選） */}
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={[styles.sectionTitle, { marginBottom: 0 }]}>📍 地區</Text>
                  {(state.district.length > 0 || state.district18.length > 0) && (
                    <TouchableOpacity
                      onPress={() => {
                        triggerHaptic();
                        // 只清除地區相關的篩選
                        dispatch({ type: "CLEAR_DISTRICT18" });
                        state.district.forEach(d => dispatch({ type: "TOGGLE_DISTRICT", payload: d }));
                      }}
                    >
                      <Text style={styles.clearText}>清除地區</Text>
                    </TouchableOpacity>
                  )}
                </View>

                {/* 第一層：三大區 */}
                <Text style={styles.subsectionTitle}>選擇大區</Text>
                <View style={styles.chipContainer}>
                  {DISTRICT_OPTIONS.map((option) => {
                    const isSelected = state.district.includes(option.value);
                    return (
                      <TouchableOpacity
                        key={option.value}
                        style={[styles.chip, isSelected && styles.chipSelected]}
                        onPress={() => {
                          triggerHaptic();
                          dispatch({ type: "TOGGLE_DISTRICT", payload: option.value });
                        }}
                      >
                        <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
                          {option.label}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>

                {/* 第二層：18區（始終顯示，不依賴三大區選擇） */}
                <View style={{ marginTop: 20 }}>
                  <View style={styles.sectionHeader}>
                    <Text style={styles.subsectionTitle}>
                      選擇分區（18區）{state.district18.length > 0 && ` - 已選 ${state.district18.length}`}
                    </Text>
                    {state.district18.length > 0 && (
                      <TouchableOpacity
                        onPress={() => {
                          triggerHaptic();
                          dispatch({ type: "CLEAR_DISTRICT18" });
                        }}
                      >
                        <Text style={styles.clearText}>清除已選分區</Text>
                      </TouchableOpacity>
                    )}
                  </View>

                  {/* 港島區 - 4區 */}
                  <View style={styles.district18Group}>
                    <Text style={styles.district18GroupLabel}>港島區</Text>
                    <View style={styles.chipContainer}>
                      {(["中西區", "東區", "南區", "灣仔區"] as District18[]).map((d18) => {
                        const isSelected = state.district18.includes(d18);
                        return (
                          <TouchableOpacity
                            key={d18}
                            style={[styles.chip, styles.chipSmall, isSelected && styles.chipSelected]}
                            onPress={() => {
                              triggerHaptic();
                              const parentRegion = DISTRICT18_TO_DISTRICT[d18];
                              if (!state.district.includes(parentRegion)) {
                                dispatch({ type: "TOGGLE_DISTRICT", payload: parentRegion });
                              }
                              dispatch({ type: "TOGGLE_DISTRICT18", payload: d18 });
                            }}
                          >
                            <Text style={[styles.chipText, styles.chipTextSmall, isSelected && styles.chipTextSelected]}>
                              {d18}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </View>

                  {/* 九龍區 - 5區 */}
                  <View style={styles.district18Group}>
                    <Text style={styles.district18GroupLabel}>九龍區</Text>
                    <View style={styles.chipContainer}>
                      {(["九龍城區", "觀塘區", "深水埗區", "黃大仙區", "油尖旺區"] as District18[]).map((d18) => {
                        const isSelected = state.district18.includes(d18);
                        return (
                          <TouchableOpacity
                            key={d18}
                            style={[styles.chip, styles.chipSmall, isSelected && styles.chipSelected]}
                            onPress={() => {
                              triggerHaptic();
                              const parentRegion = DISTRICT18_TO_DISTRICT[d18];
                              if (!state.district.includes(parentRegion)) {
                                dispatch({ type: "TOGGLE_DISTRICT", payload: parentRegion });
                              }
                              dispatch({ type: "TOGGLE_DISTRICT18", payload: d18 });
                            }}
                          >
                            <Text style={[styles.chipText, styles.chipTextSmall, isSelected && styles.chipTextSelected]}>
                              {d18}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </View>

                  {/* 新界區 - 9區 */}
                  <View style={styles.district18Group}>
                    <Text style={styles.district18GroupLabel}>新界區</Text>
                    <View style={styles.chipContainer}>
                      {(["離島區", "葵青區", "北區", "西貢區", "沙田區", "大埔區", "荃灣區", "屯門區", "元朗區"] as District18[]).map((d18) => {
                        const isSelected = state.district18.includes(d18);
                        return (
                          <TouchableOpacity
                            key={d18}
                            style={[styles.chip, styles.chipSmall, isSelected && styles.chipSelected]}
                            onPress={() => {
                              triggerHaptic();
                              const parentRegion = DISTRICT18_TO_DISTRICT[d18];
                              if (!state.district.includes(parentRegion)) {
                                dispatch({ type: "TOGGLE_DISTRICT", payload: parentRegion });
                              }
                              dispatch({ type: "TOGGLE_DISTRICT18", payload: d18 });
                            }}
                          >
                            <Text style={[styles.chipText, styles.chipTextSmall, isSelected && styles.chipTextSelected]}>
                              {d18}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </View>

                  {/* 提示文字 */}
                  <Text style={styles.hintText}>
                    可直接選擇任意分區（多選），系統自動推斷所屬大區
                  </Text>
                </View>
              </View>

              {/* 課程體系 */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>🎓 課程體系</Text>
                <View style={styles.chipContainer}>
                  {CURRICULUM_OPTIONS.map((option) => {
                    const isSelected = state.curriculum.includes(option.value);
                    return (
                      <TouchableOpacity
                        key={option.value}
                        style={[styles.chip, isSelected && styles.chipSelected]}
                        onPress={() => {
                          triggerHaptic();
                          dispatch({ type: "TOGGLE_CURRICULUM", payload: option.value });
                        }}
                      >
                        <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
                          {option.label}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

              {/* 教學語言 */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>🌐 教學語言</Text>
                <View style={styles.chipContainer}>
                  {LANGUAGE_OPTIONS.map((option) => {
                    const isSelected = state.language === option.value;
                    return (
                      <TouchableOpacity
                        key={option.value}
                        style={[styles.chip, isSelected && styles.chipSelected]}
                        onPress={() => {
                          triggerHaptic();
                          dispatch({ type: "SET_LANGUAGE", payload: option.value });
                        }}
                      >
                        <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
                          {option.label}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

              {/* 底部間距 */}
              <View style={{ height: 120 }} />
            </ScrollView>

            {/* 底部按鈕 */}
            <View style={styles.footer}>
              <TouchableOpacity style={styles.applyButton} onPress={handleApplyFilters}>
                <Text style={styles.applyButtonText}>
                  套用篩選{getActiveCount() > 0 ? ` (${getActiveCount()})` : ""}
                </Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  sheetContainer: {
    maxHeight: "85%",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: "hidden",
  },
  sheet: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    minHeight: 500,
  },
  handleContainer: {
    alignItems: "center",
    paddingTop: 12,
    paddingBottom: 8,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Bold",
  },
  resetText: {
    fontSize: 14,
    color: "#00D9FF",
    fontFamily: "NotoSerifSC-Regular",
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  section: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 14,
    fontFamily: "NotoSerifSC-Bold",
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
  },
  chipSelected: {
    backgroundColor: "rgba(0, 217, 255, 0.2)",
    borderColor: "#00D9FF",
  },
  chipText: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
    fontFamily: "NotoSerifSC-Regular",
  },
  chipTextSelected: {
    color: "#00D9FF",
    fontWeight: "600",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    paddingBottom: 40,
    backgroundColor: "rgba(15, 22, 41, 0.98)",
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
  },
  applyButton: {
    backgroundColor: "#00D9FF",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    shadowColor: "#00D9FF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F1629",
    fontFamily: "NotoSerifSC-Bold",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  clearText: {
    fontSize: 13,
    color: "#00D9FF",
    fontFamily: "NotoSerifSC-Regular",
  },
  subsectionTitle: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.6)",
    marginBottom: 10,
    fontFamily: "NotoSerifSC-Regular",
  },
  chipSmall: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  chipTextSmall: {
    fontSize: 13,
  },
  hintText: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.4)",
    marginTop: 8,
    fontFamily: "NotoSerifSC-Regular",
  },
  district18Group: {
    marginBottom: 12,
  },
  district18GroupLabel: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.5)",
    marginBottom: 8,
    fontFamily: "NotoSerifSC-Regular",
  },
});
