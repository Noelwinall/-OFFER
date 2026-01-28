/**
 * InfoHelp Component - Educational "?" Pop-ups
 *
 * Displays a "?" icon that shows educational content about HK school concepts.
 *
 * Web UX:
 * - Hover "?" => show short_intro tooltip
 * - Click "?" => open full modal with full_text
 *
 * App UX:
 * - Tap "?" => show short_intro with "全文" link
 * - Tap "全文" => open full modal with full_text
 *
 * Features:
 * - Collision detection: popover stays within viewport
 * - Solid background with proper visibility
 * - Inline alignment with label text
 */

import { useState, useRef, useCallback, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  StyleSheet,
  Platform,
  Pressable,
  Dimensions,
  useWindowDimensions,
} from "react-native";
import { INFO_TOPICS } from "@/constants/info-topics";
import { useColors } from "@/hooks/use-colors";

interface InfoHelpProps {
  topic: keyof typeof INFO_TOPICS;
}

const POPOVER_WIDTH = 260;
const POPOVER_MARGIN = 12; // Safe margin from screen edges

interface PopoverPosition {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
}

export function InfoHelp({ topic }: InfoHelpProps) {
  const colors = useColors();
  const [showShort, setShowShort] = useState(false);
  const [showFull, setShowFull] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState<PopoverPosition>({ top: 24, left: 0 });
  const iconRef = useRef<View>(null);
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  const topicData = INFO_TOPICS[topic];
  if (!topicData) return null;

  const isWeb = Platform.OS === "web";

  // Calculate optimal popover position based on anchor location
  const calculatePosition = useCallback(() => {
    if (!iconRef.current) {
      setPopoverPosition({ top: 24, left: 0 });
      return;
    }

    if (isWeb) {
      // Web: use getBoundingClientRect
      const node = iconRef.current as unknown as HTMLElement;
      if (node && node.getBoundingClientRect) {
        const rect = node.getBoundingClientRect();
        const iconCenterX = rect.left + rect.width / 2;
        const iconBottom = rect.bottom;
        const iconTop = rect.top;

        // Calculate horizontal position
        let left: number | undefined;
        let right: number | undefined;

        const spaceOnRight = windowWidth - iconCenterX;
        const spaceOnLeft = iconCenterX;

        if (spaceOnRight >= POPOVER_WIDTH + POPOVER_MARGIN) {
          // Enough space on right - position to the right
          left = 0;
        } else if (spaceOnLeft >= POPOVER_WIDTH + POPOVER_MARGIN) {
          // Enough space on left - position to the left
          right = 0;
        } else {
          // Not enough space on either side - center and clamp
          const idealLeft = -POPOVER_WIDTH / 2 + 8;
          const actualLeft = Math.max(
            POPOVER_MARGIN - rect.left,
            Math.min(idealLeft, windowWidth - rect.left - POPOVER_WIDTH - POPOVER_MARGIN)
          );
          left = actualLeft;
        }

        // Calculate vertical position
        const spaceBelow = windowHeight - iconBottom;
        const estimatedPopoverHeight = 120; // Approximate height

        let top: number | undefined;
        let bottom: number | undefined;

        if (spaceBelow >= estimatedPopoverHeight + POPOVER_MARGIN) {
          // Enough space below
          top = 24;
        } else {
          // Open above
          bottom = 24;
        }

        setPopoverPosition({ top, bottom, left, right });
      }
    } else {
      // React Native: use measureInWindow
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
          // Center as best we can
          left = Math.max(-x + POPOVER_MARGIN, -(POPOVER_WIDTH / 2) + 8);
        }

        const spaceBelow = windowHeight - iconBottom;
        const estimatedPopoverHeight = 150;

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

  // Build popover position style
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
          <Text style={[styles.shortTitle, { color: colors.primary }]}>{topicData.title}</Text>
          <Text style={styles.shortText}>{topicData.short_intro}</Text>
          {/* App only: show "全文" link */}
          {!isWeb && (
            <TouchableOpacity onPress={handleShowFull} style={styles.fullLinkContainer}>
              <Text style={[styles.fullLink, { color: colors.primary }]}>全文</Text>
            </TouchableOpacity>
          )}
          {/* Close button for app */}
          {!isWeb && (
            <TouchableOpacity onPress={handleCloseShort} style={styles.closeShortButton}>
              <Text style={styles.closeShortText}>×</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Full Text Modal */}
      <Modal
        visible={showFull}
        transparent
        animationType="fade"
        onRequestClose={handleCloseFull}
      >
        <Pressable style={styles.modalOverlay} onPress={handleCloseFull}>
          <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{topicData.title}</Text>
              <TouchableOpacity onPress={handleCloseFull} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>×</Text>
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
              <Text style={styles.modalText}>{topicData.full_text}</Text>
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  // Container: inline-flex behavior for proper alignment with text
  container: {
    position: "relative",
    marginLeft: 6,
    // Ensure inline alignment - these help with vertical centering
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  // Icon button: centered, same height as typical text line
  iconButton: {
    justifyContent: "center",
    alignItems: "center",
    height: 16,
    width: 16,
  },
  // Question mark circle
  questionMark: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "rgba(0, 217, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(0, 217, 255, 0.6)",
  },
  questionMarkText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#00D9FF",
    lineHeight: 12,
    textAlign: "center",
  },
  // Short popover styles - solid background, visible shadow
  shortPopover: {
    backgroundColor: "#FFF9F0",
    borderRadius: 12,
    padding: 14,
    // Strong shadow for visibility
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 12,
    // Visible border
    borderWidth: 1.5,
    borderColor: "rgba(0, 217, 255, 0.3)",
    zIndex: 9999,
    // Ensure no transparency
    opacity: 1,
  },
  shortTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    fontFamily: "NotoSerifSC-Regular",
    // color will be set dynamically
  },
  shortText: {
    fontSize: 13,
    lineHeight: 20,
    color: "#2D2013",
    fontFamily: "NotoSerifSC-Regular",
  },
  fullLinkContainer: {
    marginTop: 10,
    alignSelf: "flex-end",
  },
  fullLink: {
    fontSize: 13,
    textDecorationLine: "underline",
    fontFamily: "NotoSerifSC-Regular",
    // color will be set dynamically
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
    color: "#706B5E",
    fontWeight: "500",
  },
  // Full modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  modalContent: {
    backgroundColor: "#FFF9F0",
    borderRadius: 16,
    maxWidth: 400,
    width: "100%",
    maxHeight: "80%",
    borderWidth: 1,
    borderColor: "rgba(0, 217, 255, 0.2)",
    overflow: "hidden",
    // Shadow for depth
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
    borderBottomColor: "#E8E2D5",
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
    backgroundColor: "#E8E2D5",
  },
  closeButtonText: {
    fontSize: 20,
    color: "#2D2013",
    fontWeight: "500",
    lineHeight: 22,
  },
  modalBody: {
    padding: 16,
  },
  modalText: {
    fontSize: 15,
    lineHeight: 24,
    color: "#2D2013",
    fontFamily: "NotoSerifSC-Regular",
  },
});
