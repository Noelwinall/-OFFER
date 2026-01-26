import { useState, useContext } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet, Platform } from "react-native";
import { FilterContext, SORT_OPTIONS, type SortOption } from "@/lib/filter-context";
import { IconSymbol } from "@/components/ui/icon-symbol";
import * as Haptics from "expo-haptics";
import { useColors } from "@/hooks/use-colors";
import { Spacing, SpacingPresets } from "@/constants/spacing";
import { BorderRadius, BorderRadiusPresets } from "@/constants/border-radius";
import { TypographyStyles } from "@/constants/typography";

export function SortSelector() {
  const filterContext = useContext(FilterContext);
  const [showModal, setShowModal] = useState(false);
  const colors = useColors();

  if (!filterContext) {
    return null;
  }

  const { state, dispatch } = filterContext;
  const currentSort = SORT_OPTIONS.find((opt) => opt.value === state.sortBy);

  const handleSelect = (value: SortOption) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    dispatch({ type: "SET_SORT", payload: value });
    setShowModal(false);
  };

  const handleOpen = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setShowModal(true);
  };

  return (
    <>
      {/* 排序按鈕 */}
      <TouchableOpacity
        style={styles.sortButton}
        onPress={handleOpen}
        activeOpacity={0.7}
      >
        <IconSymbol name="arrow.up.arrow.down" size={16} color={colors.primary} />
        <Text style={styles.sortButtonText}>{currentSort?.label || "排序"}</Text>
        <IconSymbol name="chevron.right" size={14} color={colors.muted + "80"} style={{ transform: [{ rotate: "90deg" }] }} />
      </TouchableOpacity>

      {/* 排序選項彈窗 */}
      <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowModal(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>排序方式</Text>
              <TouchableOpacity
                onPress={() => setShowModal(false)}
                style={styles.closeButton}
              >
                <IconSymbol name="xmark" size={20} color={colors.muted + "99"} />
              </TouchableOpacity>
            </View>

            <View style={styles.optionsList}>
              {SORT_OPTIONS.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.optionItem,
                    state.sortBy === option.value && [styles.optionItemActive, { backgroundColor: colors.primary + "1A" }],
                  ]}
                  onPress={() => handleSelect(option.value)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.optionText,
                      state.sortBy === option.value && [styles.optionTextActive, { color: colors.primary }],
                    ]}
                  >
                    {option.label}
                  </Text>
                    {state.sortBy === option.value && (
                    <IconSymbol name="checkmark" size={18} color={colors.primary} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  sortButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.08)",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadiusPresets.buttonPill,
    gap: Spacing.sm,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  sortButtonText: {
    ...TypographyStyles.caption,
    fontSize: 13,
    color: "#2D2013",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.xl,
  },
  modalContent: {
    width: "100%",
    maxWidth: 320,
    backgroundColor: "#FFF9F0",
    borderRadius: BorderRadiusPresets.modal,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E8E2D5",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E2D5",
  },
  modalTitle: {
    ...TypographyStyles.body,
    fontSize: 17,
    fontWeight: TypographyStyles.heading.fontWeight,
    color: "#2D2013",
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.full,
    backgroundColor: "#E8E2D5",
    justifyContent: "center",
    alignItems: "center",
  },
  optionsList: {
    padding: Spacing.sm,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.lg,
    paddingVertical: SpacingPresets.buttonPaddingVertical,
    borderRadius: BorderRadiusPresets.button,
  },
  optionItemActive: {
    // backgroundColor will be set dynamically
  },
  optionText: {
    ...TypographyStyles.body,
    fontSize: 15,
    color: "#2D2013",
  },
  optionTextActive: {
    // color will be set dynamically
    fontWeight: TypographyStyles.heading.fontWeight,
  },
});
