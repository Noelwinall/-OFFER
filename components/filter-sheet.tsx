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
import { DISTRICT_TO_DISTRICT18, DISTRICT18_TO_DISTRICT, type District, type District18, type Level } from "@/types/school";
import { NON_KG_CATEGORY_OPTIONS, KG_CATEGORY_OPTIONS } from "@/constants/kg-nature";
import { InfoHelp } from "@/components/info-help";
import * as Haptics from "expo-haptics";

interface FilterSheetProps {
  visible: boolean;
  onClose: () => void;
}

// 1. Stage (階段) options
const STAGE_OPTIONS: { label: string; value: Level }[] = [
  { label: "幼稚園", value: "幼稚園" },
  { label: "小學", value: "小學" },
  { label: "中學", value: "中學" },
];

// 2. School Type options - imported from @/constants/kg-nature
// NON_KG_CATEGORY_OPTIONS: 國際/私立/直資/資助/公立 (for 小學/中學)
// KG_CATEGORY_OPTIONS: 國際/私立幼稚園/非牟利幼稚園 (for 幼稚園 only)

// 3. District options
const DISTRICT_OPTIONS: { label: string; value: District }[] = [
  { label: "港島區", value: "港島" },
  { label: "九龍區", value: "九龍" },
  { label: "新界區", value: "新界" },
];

// 4. Curriculum V2 options (data-driven from school_curriculums)
import type { CurriculumV2, InstructionLanguage, SchoolGender } from "@/types/school";

const CURRICULUM_V2_OPTIONS: { label: string; value: CurriculumV2 }[] = [
  { label: "本地課程（DSE）", value: "HK_LOCAL" },
  { label: "IB", value: "IB" },
  { label: "英國課程", value: "BRITISH" },
  { label: "美國課程", value: "AMERICAN" },
  { label: "加拿大課程", value: "CANADIAN" },
  { label: "澳洲課程", value: "AUSTRALIAN" },
  { label: "其他國際課程", value: "OTHER_INTL" },
  { label: "雙軌（本地+國際）", value: "DUAL_TRACK" },
];

// 5. Instruction Language options (Medium of Instruction)
const INSTRUCTION_LANGUAGE_OPTIONS: { label: string; value: InstructionLanguage }[] = [
  { label: "英文", value: "ENGLISH" },
  { label: "粵語", value: "CANTONESE" },
  { label: "普通話", value: "PUTONGHUA" },
  { label: "法文", value: "FRENCH" },
  { label: "德文", value: "GERMAN" },
  { label: "日文", value: "JAPANESE" },
  { label: "韓文", value: "KOREAN" },
  { label: "西班牙文", value: "SPANISH" },
];

// 6. School Gender options (only BOYS and GIRLS - MIXED is excluded from filter)
const GENDER_OPTIONS: { label: string; value: SchoolGender }[] = [
  { label: "男校", value: "BOYS" },
  { label: "女校", value: "GIRLS" },
];

export function FilterSheet({ visible, onClose }: FilterSheetProps) {
  const { state, dispatch } = useFilter();

  const triggerHaptic = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const handleApplyFilters = () => {
    triggerHaptic();
    onClose();
  };

  const handleResetFilters = () => {
    triggerHaptic();
    dispatch({ type: "RESET_FILTERS" });
  };

  // Get category options based on selected stage
  // Stage=幼稚園: 國際/私立幼稚園/非牟利幼稚園 (3 options only)
  // Stage=小學/中學 or no stage: 國際/私立/直資/資助/公立 (5 options)
  const getCategoryOptions = () => {
    if (state.stage === "幼稚園") {
      return KG_CATEGORY_OPTIONS;
    }
    return NON_KG_CATEGORY_OPTIONS;
  };

  // 計算活躍篩選數量
  const getActiveCount = () => {
    let count = 0;
    if (state.stage) count++;
    if (state.category.length > 0) count++;
    if (state.district.length > 0) count++;
    if (state.district18.length > 0) count++;
    if (state.curriculumV2.length > 0) count++;
    if (state.instructionLanguages.length > 0) count++;
    if (state.gender.length > 0) count++;
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
              contentContainerStyle={styles.contentContainer}
              showsVerticalScrollIndicator={true}
              nestedScrollEnabled={true}
              bounces={true}
              scrollEventThrottle={16}
              keyboardShouldPersistTaps="handled"
            >
              {/* 1. 階段 (Stage) */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>📚 階段</Text>
                <View style={styles.chipContainer}>
                  {STAGE_OPTIONS.map((option) => {
                    const isSelected = state.stage === option.value;
                    return (
                      <TouchableOpacity
                        key={option.value}
                        style={[styles.chip, isSelected && styles.chipSelected]}
                        onPress={() => {
                          triggerHaptic();
                          dispatch({ type: "SET_STAGE", payload: option.value });
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

              {/* 2. 學校類型 (School Type) */}
              <View style={styles.section}>
                <View style={styles.sectionTitleRow}>
                  <Text style={[styles.sectionTitle, styles.sectionTitleInline]}>🏫 學校類型</Text>
                  <InfoHelp topic="school_types" />
                </View>
                <View style={styles.chipContainer}>
                  {getCategoryOptions().map((option) => {
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

              {/* 3. 地區 (District/Region) */}
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={[styles.sectionTitle, { marginBottom: 0 }]}>📍 地區</Text>
                  {(state.district.length > 0 || state.district18.length > 0) && (
                    <TouchableOpacity
                      onPress={() => {
                        triggerHaptic();
                        dispatch({ type: "CLEAR_DISTRICT18" });
                        state.district.forEach(d => dispatch({ type: "TOGGLE_DISTRICT", payload: d }));
                      }}
                    >
                      <Text style={styles.clearText}>清除地區</Text>
                    </TouchableOpacity>
                  )}
                </View>

                {/* 三大區 */}
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

                {/* 18區 */}
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

                  {/* 港島區 */}
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

                  {/* 九龍區 */}
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

                  {/* 新界區 */}
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

                  <Text style={styles.hintText}>
                    可直接選擇任意分區（多選），系統自動推斷所屬大區
                  </Text>
                </View>
              </View>

              {/* 4. 課程體系 (Curriculum V2) */}
              <View style={styles.section}>
                <View style={styles.sectionTitleRow}>
                  <Text style={[styles.sectionTitle, styles.sectionTitleInline]}>🎓 課程體系</Text>
                  <InfoHelp topic="curriculum" />
                </View>
                <View style={styles.chipContainer}>
                  {CURRICULUM_V2_OPTIONS.map((option) => {
                    const isSelected = state.curriculumV2.includes(option.value);
                    return (
                      <TouchableOpacity
                        key={option.value}
                        style={[styles.chip, isSelected && styles.chipSelected]}
                        onPress={() => {
                          triggerHaptic();
                          dispatch({ type: "TOGGLE_CURRICULUM_V2", payload: option.value });
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

              {/* 5. 授課語言 (Instruction Language / Medium of Instruction) */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>🌐 授課語言</Text>
                <View style={styles.chipContainer}>
                  {INSTRUCTION_LANGUAGE_OPTIONS.map((option) => {
                    const isSelected = state.instructionLanguages.includes(option.value);
                    return (
                      <TouchableOpacity
                        key={option.value}
                        style={[styles.chip, isSelected && styles.chipSelected]}
                        onPress={() => {
                          triggerHaptic();
                          dispatch({ type: "TOGGLE_INSTRUCTION_LANGUAGE", payload: option.value });
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

              {/* 6. 男/女校 (School Gender) */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>👫 男/女校</Text>
                <View style={styles.chipContainer}>
                  {GENDER_OPTIONS.map((option) => {
                    const isSelected = state.gender.includes(option.value);
                    return (
                      <TouchableOpacity
                        key={option.value}
                        style={[styles.chip, isSelected && styles.chipSelected]}
                        onPress={() => {
                          triggerHaptic();
                          dispatch({ type: "TOGGLE_GENDER", payload: option.value });
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
              <View style={{ height: 140 }} />
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
    flex: 1,
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
    paddingBottom: 20,
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
  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 14,
  },
  // Remove marginBottom when sectionTitle is inside sectionTitleRow
  sectionTitleInline: {
    marginBottom: 0,
  },
});
