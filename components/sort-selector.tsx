import { useState, useContext } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet, Platform } from "react-native";
import { FilterContext, SORT_OPTIONS, type SortOption } from "@/lib/filter-context";
import { IconSymbol } from "@/components/ui/icon-symbol";
import * as Haptics from "expo-haptics";

export function SortSelector() {
  const filterContext = useContext(FilterContext);
  const [showModal, setShowModal] = useState(false);

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
        <IconSymbol name="arrow.up.arrow.down" size={16} color="#00D9FF" />
        <Text style={styles.sortButtonText}>{currentSort?.label || "排序"}</Text>
        <IconSymbol name="chevron.right" size={14} color="rgba(255,255,255,0.5)" style={{ transform: [{ rotate: "90deg" }] }} />
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
                <IconSymbol name="xmark" size={20} color="rgba(255,255,255,0.6)" />
              </TouchableOpacity>
            </View>

            <View style={styles.optionsList}>
              {SORT_OPTIONS.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.optionItem,
                    state.sortBy === option.value && styles.optionItemActive,
                  ]}
                  onPress={() => handleSelect(option.value)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.optionText,
                      state.sortBy === option.value && styles.optionTextActive,
                    ]}
                  >
                    {option.label}
                  </Text>
                  {state.sortBy === option.value && (
                    <IconSymbol name="checkmark" size={18} color="#00D9FF" />
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
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  sortButtonText: {
    fontSize: 13,
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Regular",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  modalContent: {
    width: "100%",
    maxWidth: 320,
    backgroundColor: "#1a2744",
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.08)",
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Bold",
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.08)",
    justifyContent: "center",
    alignItems: "center",
  },
  optionsList: {
    padding: 8,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
  },
  optionItemActive: {
    backgroundColor: "rgba(0, 217, 255, 0.1)",
  },
  optionText: {
    fontSize: 15,
    color: "rgba(255,255,255,0.8)",
    fontFamily: "NotoSerifSC-Regular",
  },
  optionTextActive: {
    color: "#00D9FF",
    fontWeight: "600",
    fontFamily: "NotoSerifSC-Bold",
  },
});
