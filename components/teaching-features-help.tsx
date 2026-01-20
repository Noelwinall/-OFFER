/**
 * TeachingFeaturesHelp Component
 *
 * "?" popover showing the 5 pedagogy groups and their subcategory breakdowns.
 * Used in KG filter sheet and KG detail page.
 */

import { useState, useRef, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  StyleSheet,
  Platform,
  Pressable,
  useWindowDimensions,
} from "react-native";
import { KG_PEDAGOGY_BREAKDOWN } from "@/constants/kg-pedagogy";

const POPOVER_WIDTH = 300;
const POPOVER_MARGIN = 12;

interface PopoverPosition {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
}

export function TeachingFeaturesHelp() {
  const [showShort, setShowShort] = useState(false);
  const [showFull, setShowFull] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState<PopoverPosition>({ top: 24, left: 0 });
  const iconRef = useRef<View>(null);
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  const isWeb = Platform.OS === "web";

  const calculatePosition = useCallback(() => {
    if (!iconRef.current) {
      setPopoverPosition({ top: 24, left: 0 });
      return;
    }

    if (isWeb) {
      const node = iconRef.current as unknown as HTMLElement;
      if (node && node.getBoundingClientRect) {
        const rect = node.getBoundingClientRect();
        const iconCenterX = rect.left + rect.width / 2;

        let left: number | undefined;
        let right: number | undefined;

        const spaceOnRight = windowWidth - iconCenterX;
        const spaceOnLeft = iconCenterX;

        if (spaceOnRight >= POPOVER_WIDTH + POPOVER_MARGIN) {
          left = 0;
        } else if (spaceOnLeft >= POPOVER_WIDTH + POPOVER_MARGIN) {
          right = 0;
        } else {
          const idealLeft = -POPOVER_WIDTH / 2 + 8;
          const actualLeft = Math.max(
            POPOVER_MARGIN - rect.left,
            Math.min(idealLeft, windowWidth - rect.left - POPOVER_WIDTH - POPOVER_MARGIN)
          );
          left = actualLeft;
        }

        const spaceBelow = windowHeight - rect.bottom;
        const estimatedPopoverHeight = 200;

        let top: number | undefined;
        let bottom: number | undefined;

        if (spaceBelow >= estimatedPopoverHeight + POPOVER_MARGIN) {
          top = 24;
        } else {
          bottom = 24;
        }

        setPopoverPosition({ top, bottom, left, right });
      }
    } else {
      iconRef.current.measureInWindow((x, y, width, height) => {
        const iconCenterX = x + width / 2;
        const iconBottom = y + height;

        let left: number | undefined;
        let right: number | undefined;

        const spaceOnRight = windowWidth - iconCenterX;
        const spaceOnLeft = iconCenterX;

        if (spaceOnRight >= POPOVER_WIDTH + POPOVER_MARGIN) {
          left = 0;
        } else if (spaceOnLeft >= POPOVER_WIDTH + POPOVER_MARGIN) {
          right = 0;
        } else {
          left = Math.max(-x + POPOVER_MARGIN, -(POPOVER_WIDTH / 2) + 8);
        }

        const spaceBelow = windowHeight - iconBottom;
        const estimatedPopoverHeight = 200;

        let top: number | undefined;
        let bottom: number | undefined;

        if (spaceBelow >= estimatedPopoverHeight + POPOVER_MARGIN) {
          top = 24;
        } else {
          bottom = 24;
        }

        setPopoverPosition({ top, bottom, left, right });
      });
    }
  }, [windowWidth, windowHeight, isWeb]);

  const handlePress = () => {
    if (isWeb) {
      setShowFull(true);
      setShowShort(false);
    } else {
      if (!showShort) {
        calculatePosition();
      }
      setShowShort(!showShort);
    }
  };

  const handleHoverIn = () => {
    if (isWeb) {
      calculatePosition();
      setShowShort(true);
    }
  };

  const handleHoverOut = () => {
    if (isWeb) {
      setShowShort(false);
    }
  };

  const handleShowFull = () => {
    setShowShort(false);
    setShowFull(true);
  };

  const handleCloseFull = () => {
    setShowFull(false);
  };

  const handleCloseShort = () => {
    setShowShort(false);
  };

  const popoverPositionStyle: any = {
    position: "absolute" as const,
    width: POPOVER_WIDTH,
  };

  if (popoverPosition.top !== undefined) {
    popoverPositionStyle.top = popoverPosition.top;
  }
  if (popoverPosition.bottom !== undefined) {
    popoverPositionStyle.bottom = popoverPosition.bottom;
  }
  if (popoverPosition.left !== undefined) {
    popoverPositionStyle.left = popoverPosition.left;
  }
  if (popoverPosition.right !== undefined) {
    popoverPositionStyle.right = popoverPosition.right;
  }

  return (
    <View style={styles.container}>
      {/* "?" Icon Button */}
      <Pressable
        ref={iconRef}
        onPress={handlePress}
        onHoverIn={handleHoverIn}
        onHoverOut={handleHoverOut}
        style={styles.iconButton}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <View style={styles.questionMark}>
          <Text style={styles.questionMarkText}>?</Text>
        </View>
      </Pressable>

      {/* Short Intro Tooltip/Popover */}
      {showShort && (
        <View style={[styles.shortPopover, popoverPositionStyle]}>
          <Text style={styles.shortTitle}>教學特色分類</Text>
          <Text style={styles.shortText}>
            幼稚園教學特色分為 5 大類別，涵蓋不同的教育理念和方法。點擊查看詳細分類。
          </Text>
          {!isWeb && (
            <TouchableOpacity onPress={handleShowFull} style={styles.fullLinkContainer}>
              <Text style={styles.fullLink}>查看分類詳情</Text>
            </TouchableOpacity>
          )}
          {!isWeb && (
            <TouchableOpacity onPress={handleCloseShort} style={styles.closeShortButton}>
              <Text style={styles.closeShortText}>×</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Full Modal - Shows breakdown */}
      <Modal
        visible={showFull}
        transparent
        animationType="fade"
        onRequestClose={handleCloseFull}
      >
        <Pressable style={styles.modalOverlay} onPress={handleCloseFull}>
          <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>教學特色分類</Text>
              <TouchableOpacity onPress={handleCloseFull} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>×</Text>
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
              {KG_PEDAGOGY_BREAKDOWN.map((group, index) => (
                <View key={group.tag} style={[styles.groupContainer, index > 0 && styles.groupSeparator]}>
                  <Text style={styles.groupLabel}>{group.label}</Text>
                  <Text style={styles.groupDescription}>{group.description}</Text>
                  <View style={styles.subcategoriesContainer}>
                    {group.subcategories.map((sub, subIndex) => (
                      <View key={subIndex} style={styles.subcategoryItem}>
                        <Text style={styles.subcategoryBullet}>•</Text>
                        <Text style={styles.subcategoryText}>{sub}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              ))}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    marginLeft: 6,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  iconButton: {
    justifyContent: "center",
    alignItems: "center",
    height: 16,
    width: 16,
  },
  questionMark: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.4)",
  },
  questionMarkText: {
    fontSize: 10,
    fontWeight: "700",
    color: "rgba(255,255,255,0.8)",
    lineHeight: 12,
    textAlign: "center",
  },
  shortPopover: {
    backgroundColor: "#1a2744",
    borderRadius: 12,
    padding: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 12,
    borderWidth: 1.5,
    borderColor: "rgba(0, 217, 255, 0.3)",
    zIndex: 9999,
    opacity: 1,
  },
  shortTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#00D9FF",
    marginBottom: 8,
    fontFamily: "NotoSerifSC-Regular",
  },
  shortText: {
    fontSize: 13,
    lineHeight: 20,
    color: "#f1f5f9",
    fontFamily: "NotoSerifSC-Regular",
  },
  fullLinkContainer: {
    marginTop: 10,
    alignSelf: "flex-end",
  },
  fullLink: {
    fontSize: 13,
    color: "#00D9FF",
    textDecorationLine: "underline",
    fontFamily: "NotoSerifSC-Regular",
  },
  closeShortButton: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  closeShortText: {
    fontSize: 16,
    color: "rgba(255,255,255,0.6)",
    fontWeight: "500",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  modalContent: {
    backgroundColor: "#1a2744",
    borderRadius: 16,
    maxWidth: 420,
    width: "100%",
    maxHeight: "85%",
    borderWidth: 1,
    borderColor: "rgba(0, 217, 255, 0.2)",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 24,
    elevation: 16,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#00D9FF",
    fontFamily: "NotoSerifSC-Bold",
    flex: 1,
  },
  closeButton: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  closeButtonText: {
    fontSize: 20,
    color: "rgba(255,255,255,0.7)",
    fontWeight: "500",
    lineHeight: 22,
  },
  modalBody: {
    padding: 16,
  },
  groupContainer: {
    paddingVertical: 12,
  },
  groupSeparator: {
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.1)",
  },
  groupLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#00D9FF",
    fontFamily: "NotoSerifSC-Bold",
    marginBottom: 4,
  },
  groupDescription: {
    fontSize: 13,
    color: "rgba(255,255,255,0.7)",
    fontFamily: "NotoSerifSC-Regular",
    marginBottom: 10,
  },
  subcategoriesContainer: {
    paddingLeft: 8,
  },
  subcategoryItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  subcategoryBullet: {
    fontSize: 12,
    color: "rgba(255,255,255,0.5)",
    marginRight: 8,
    marginTop: 2,
  },
  subcategoryText: {
    fontSize: 13,
    color: "#f1f5f9",
    fontFamily: "NotoSerifSC-Regular",
    flex: 1,
  },
});
