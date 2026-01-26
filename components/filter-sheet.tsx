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
import { useColors } from "@/hooks/use-colors";
import { DISTRICT_TO_DISTRICT18, DISTRICT18_TO_DISTRICT, type District, type District18, type Level } from "@/types/school";
import { NON_KG_CATEGORY_OPTIONS, KG_CATEGORY_OPTIONS } from "@/lib/school-classification";
import { InfoHelp } from "@/components/info-help";
import { TeachingFeaturesHelp } from "@/components/teaching-features-help";
import {
  KG_SESSION_OPTIONS,
  KG_CURRICULUM_CATEGORY_OPTIONS,
  KG_LOCAL_SUBTYPE_OPTIONS,
  KG_NON_LOCAL_SUBTYPE_OPTIONS,
  KG_PEDAGOGY_OPTIONS,
  KG_LANGUAGE_ENV_OPTIONS,
} from "@/constants/kg-filters";
import * as Haptics from "expo-haptics";
import { Typography } from "@/components/ui/typography";
import { Spacing, SpacingPresets } from "@/constants/spacing";
import { BorderRadius, BorderRadiusPresets } from "@/constants/border-radius";
import { TypographyStyles } from "@/constants/typography";

interface FilterSheetProps {
  visible: boolean;
  onClose: () => void;
  /** District to pre-select and lock (from Map navigation) */
  lockedDistrict?: District18 | null;
  /** Callback when filters are applied (used by Map to handle results internally) */
  onApply?: () => void;
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

export function FilterSheet({ visible, onClose, lockedDistrict, onApply }: FilterSheetProps) {
  const { state, dispatch } = useFilter();
  const colors = useColors();

  // Define styles inside component to access colors
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
      borderTopLeftRadius: BorderRadius.xl,
      borderTopRightRadius: BorderRadius.xl,
      overflow: "hidden",
    },
    sheet: {
      flex: 1,
      borderTopLeftRadius: BorderRadius.xl,
      borderTopRightRadius: BorderRadius.xl,
      minHeight: 500,
    },
    handleContainer: {
      alignItems: "center",
      paddingTop: Spacing.md,
      paddingBottom: Spacing.sm,
    },
    handle: {
      width: 40,
      height: 4,
      backgroundColor: colors.border + "4D",
      borderRadius: BorderRadius.xs,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: Spacing.xl,
      paddingBottom: Spacing.lg,
      borderBottomWidth: 1,
      borderBottomColor: colors.border + "1A",
    },
    title: {
      ...TypographyStyles.title,
      color: colors.foreground,
    },
    resetText: {
      ...TypographyStyles.caption,
      color: colors.primary,
    },
    content: {
      flex: 1,
    },
    contentContainer: {
      paddingHorizontal: Spacing.xl,
      paddingTop: Spacing.xl,
      paddingBottom: Spacing.xl,
    },
    section: {
      marginBottom: Spacing["2xl"],
    },
    sectionTitle: {
      ...TypographyStyles.heading,
      color: colors.foreground,
      marginBottom: SpacingPresets.buttonPaddingVertical,
    },
    chipContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: Spacing.md,
    },
    chip: {
      paddingHorizontal: Spacing.lg,
      paddingVertical: Spacing.md,
      borderRadius: BorderRadiusPresets.buttonPill,
      backgroundColor: colors.surface + "14",
      borderWidth: 1,
      borderColor: colors.border + "26",
    },
    chipSelected: {
      backgroundColor: colors.primary + "33",
      borderColor: colors.primary,
    },
    chipText: {
      ...TypographyStyles.caption,
      color: colors.muted,
    },
    chipTextSelected: {
      fontWeight: TypographyStyles.heading.fontWeight,
      color: colors.primary,
    },
    footer: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      padding: Spacing.xl,
      paddingBottom: Spacing["3xl"],
      backgroundColor: colors.surface,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    applyButton: {
      paddingVertical: Spacing.lg,
      borderRadius: BorderRadiusPresets.button,
      alignItems: "center",
      backgroundColor: colors.primary,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 4,
    },
    applyButtonText: {
      ...TypographyStyles.body,
      fontWeight: TypographyStyles.title.fontWeight,
      color: colors.background,
    },
    sectionHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 14,
    },
    clearText: {
      ...TypographyStyles.caption,
      fontSize: 13,
      color: colors.primary,
    },
    subsectionTitle: {
      ...TypographyStyles.caption,
      fontSize: 13,
      color: colors.muted,
      marginBottom: Spacing.md,
    },
    chipSmall: {
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.sm,
    },
    chipTextSmall: {
      ...TypographyStyles.caption,
      fontSize: 13,
    },
    hintText: {
      ...TypographyStyles.caption,
      fontSize: 13,
      color: colors.muted + "66",
      marginTop: Spacing.sm,
    },
    district18Group: {
      marginBottom: 12,
    },
    district18GroupLabel: {
      ...TypographyStyles.small,
      color: colors.muted + "80",
      marginBottom: Spacing.sm,
    },
    sectionTitleRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      marginBottom: 14,
    },
    sectionTitleInline: {
      marginBottom: 0,
    },
    lockedDistrictContainer: {
      marginTop: 8,
    },
    lockedDistrictBadge: {
      flexDirection: "row",
      alignItems: "center",
      gap: Spacing.sm,
      backgroundColor: colors.primary + "26",
      paddingHorizontal: Spacing.lg,
      paddingVertical: Spacing.md,
      borderRadius: BorderRadiusPresets.button,
      borderWidth: 1,
      borderColor: colors.primary + "4D",
    },
    lockedDistrictText: {
      ...TypographyStyles.body,
      fontWeight: TypographyStyles.heading.fontWeight,
      color: colors.primary,
      flex: 1,
    },
    lockedLabel: {
      flexDirection: "row",
      alignItems: "center",
      gap: Spacing.xs,
      backgroundColor: colors.surface + "1A",
      paddingHorizontal: Spacing.sm,
      paddingVertical: Spacing.xs,
      borderRadius: BorderRadius.sm,
    },
    lockedLabelText: {
      ...TypographyStyles.tiny,
      fontSize: 11,
      color: colors.muted,
    },
    lockedHintText: {
      ...TypographyStyles.small,
      color: colors.muted + "66",
      marginTop: Spacing.sm,
      fontFamily: "NotoSerifSC-Regular",
    },
  });

  const triggerHaptic = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const handleApplyFilters = () => {
    triggerHaptic();
    if (onApply) {
      onApply();
    } else {
      onClose();
    }
  };

  // Check if district is locked (from Map navigation)
  const isDistrictLocked = !!lockedDistrict;

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
    // KG-specific filters
    if (state.kgSession.length > 0) count++;
    if (state.kgCurriculumCategory.length > 0 || state.kgCurriculumType.length > 0) count++;
    if (state.kgPedagogy.length > 0) count++;
    if (state.kgLanguageEnv.length > 0) count++;
    return count;
  };

  // Check if we're in KG mode
  const isKGMode = state.stage === "幼稚園";

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
            colors={[colors.surface, colors.background]}
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
                        style={[
                          styles.chip,
                          isSelected && styles.chipSelected
                        ]}
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
                        style={[
                          styles.chip,
                          isSelected && styles.chipSelected
                        ]}
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
                  {!isDistrictLocked && (state.district.length > 0 || state.district18.length > 0) && (
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

                {/* Locked district indicator (from Map navigation) */}
                {isDistrictLocked ? (
                  <View style={styles.lockedDistrictContainer}>
                    <View style={styles.lockedDistrictBadge}>
                      <IconSymbol name="mappin.circle.fill" size={18} color={colors.primary} />
                      <Text style={styles.lockedDistrictText}>{lockedDistrict}</Text>
                      <View style={styles.lockedLabel}>
                        <IconSymbol name="lock.fill" size={12} color={colors.muted + "99"} />
                        <Text style={styles.lockedLabelText}>已鎖定</Text>
                      </View>
                    </View>
                    <Text style={styles.lockedHintText}>
                      從地圖選擇的地區，可調整其他篩選條件
                    </Text>
                  </View>
                ) : (
                  <>
                    {/* 三大區 */}
                    <Text style={styles.subsectionTitle}>選擇大區</Text>
                    <View style={styles.chipContainer}>
                      {DISTRICT_OPTIONS.map((option) => {
                        const isSelected = state.district.includes(option.value);
                        return (
                          <TouchableOpacity
                            key={option.value}
                            style={[
                          styles.chip,
                          isSelected && styles.chipSelected
                        ]}
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
                  </>
                )}
              </View>

              {/* KG-specific filters (when stage = 幼稚園) */}
              {isKGMode && (
                <>
                  {/* 3. 時段 (Session) - KG only */}
                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>🕐 時段</Text>
                    <View style={styles.chipContainer}>
                      {KG_SESSION_OPTIONS.map((option) => {
                        const isSelected = state.kgSession.includes(option.value);
                        return (
                          <TouchableOpacity
                            key={option.value}
                            style={[
                          styles.chip,
                          isSelected && styles.chipSelected
                        ]}
                            onPress={() => {
                              triggerHaptic();
                              dispatch({ type: "TOGGLE_KG_SESSION", payload: option.value });
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

                  {/* 4. 課程 (Curriculum - 2-level hierarchy) - KG only */}
                  <View style={styles.section}>
                    <View style={styles.sectionTitleRow}>
                      <Text style={[styles.sectionTitle, styles.sectionTitleInline]}>🎓 課程</Text>
                      <InfoHelp topic="curriculum" />
                    </View>

                    {/* Level 1: Category (local / non_local) */}
                    <Text style={styles.subsectionTitle}>課程類別</Text>
                    <View style={styles.chipContainer}>
                      {KG_CURRICULUM_CATEGORY_OPTIONS.map((option) => {
                        const isSelected = state.kgCurriculumCategory.includes(option.value);
                        return (
                          <TouchableOpacity
                            key={option.value}
                            style={[
                          styles.chip,
                          isSelected && styles.chipSelected
                        ]}
                            onPress={() => {
                              triggerHaptic();
                              dispatch({ type: "TOGGLE_KG_CURRICULUM_CATEGORY", payload: option.value });
                            }}
                          >
                            <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
                              {option.label}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>

                    {/* Level 2: Subtypes (shown when parent category is selected) */}
                    {state.kgCurriculumCategory.includes("local") && (
                      <View style={{ marginTop: 16 }}>
                        <Text style={styles.subsectionTitle}>本地課程類型</Text>
                        <View style={styles.chipContainer}>
                          {KG_LOCAL_SUBTYPE_OPTIONS.map((option) => {
                            const isSelected = state.kgCurriculumType.includes(option.value);
                            return (
                              <TouchableOpacity
                                key={option.value}
                                style={[styles.chip, styles.chipSmall, isSelected && styles.chipSelected]}
                                onPress={() => {
                                  triggerHaptic();
                                  dispatch({ type: "TOGGLE_KG_CURRICULUM_TYPE", payload: option.value });
                                }}
                              >
                                <Text style={[styles.chipText, styles.chipTextSmall, isSelected && styles.chipTextSelected]}>
                                  {option.label}
                                </Text>
                              </TouchableOpacity>
                            );
                          })}
                        </View>
                      </View>
                    )}

                    {state.kgCurriculumCategory.includes("non_local") && (
                      <View style={{ marginTop: 16 }}>
                        <Text style={styles.subsectionTitle}>非本地課程類型</Text>
                        <View style={styles.chipContainer}>
                          {KG_NON_LOCAL_SUBTYPE_OPTIONS.map((option) => {
                            const isSelected = state.kgCurriculumType.includes(option.value);
                            return (
                              <TouchableOpacity
                                key={option.value}
                                style={[styles.chip, styles.chipSmall, isSelected && styles.chipSelected]}
                                onPress={() => {
                                  triggerHaptic();
                                  dispatch({ type: "TOGGLE_KG_CURRICULUM_TYPE", payload: option.value });
                                }}
                              >
                                <Text style={[styles.chipText, styles.chipTextSmall, isSelected && styles.chipTextSelected]}>
                                  {option.label}
                                </Text>
                              </TouchableOpacity>
                            );
                          })}
                        </View>
                      </View>
                    )}
                  </View>

                  {/* 5. 教學特色 (Teaching Features - 5 groups) - KG only */}
                  <View style={styles.section}>
                    <View style={styles.sectionTitleRow}>
                      <Text style={[styles.sectionTitle, styles.sectionTitleInline]}>📚 教學特色</Text>
                      <TeachingFeaturesHelp />
                    </View>
                    <View style={styles.chipContainer}>
                      {KG_PEDAGOGY_OPTIONS.map((option) => {
                        const isSelected = state.kgPedagogy.includes(option.value);
                        return (
                          <TouchableOpacity
                            key={option.value}
                            style={[
                          styles.chip,
                          isSelected && styles.chipSelected
                        ]}
                            onPress={() => {
                              triggerHaptic();
                              dispatch({ type: "TOGGLE_KG_PEDAGOGY", payload: option.value });
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

                  {/* 6. 語言環境 (Teaching Language) - KG only */}
                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>🌐 語言環境</Text>
                    <View style={styles.chipContainer}>
                      {KG_LANGUAGE_ENV_OPTIONS.map((option) => {
                        const isSelected = state.kgLanguageEnv.includes(option.value);
                        return (
                          <TouchableOpacity
                            key={option.value}
                            style={[
                          styles.chip,
                          isSelected && styles.chipSelected
                        ]}
                            onPress={() => {
                              triggerHaptic();
                              dispatch({ type: "TOGGLE_KG_LANGUAGE_ENV", payload: option.value });
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
                </>
              )}

              {/* Primary/Secondary filters (when stage != 幼稚園) */}
              {!isKGMode && (
                <>
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
                            style={[
                          styles.chip,
                          isSelected && styles.chipSelected
                        ]}
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
                            style={[
                          styles.chip,
                          isSelected && styles.chipSelected
                        ]}
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
                            style={[
                          styles.chip,
                          isSelected && styles.chipSelected
                        ]}
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
                </>
              )}

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

