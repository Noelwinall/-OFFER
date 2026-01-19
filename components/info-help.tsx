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
 */

import { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  StyleSheet,
  Platform,
  Pressable,
} from "react-native";
import { INFO_TOPICS } from "@/constants/info-topics";

interface InfoHelpProps {
  topic: keyof typeof INFO_TOPICS;
}

export function InfoHelp({ topic }: InfoHelpProps) {
  const [showShort, setShowShort] = useState(false);
  const [showFull, setShowFull] = useState(false);

  const topicData = INFO_TOPICS[topic];
  if (!topicData) return null;

  const isWeb = Platform.OS === "web";

  // Web: hover shows short, click shows full
  // App: tap shows short with "全文" link, tap "全文" shows full

  const handlePress = () => {
    if (isWeb) {
      // Web: click opens full modal
      setShowFull(true);
      setShowShort(false);
    } else {
      // App: tap toggles short intro
      setShowShort(!showShort);
    }
  };

  const handleHoverIn = () => {
    if (isWeb) {
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

  return (
    <View style={styles.container}>
      {/* "?" Icon Button */}
      <Pressable
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
        <View style={styles.shortPopover}>
          <Text style={styles.shortTitle}>{topicData.title}</Text>
          <Text style={styles.shortText}>{topicData.short_intro}</Text>
          {/* App only: show "全文" link */}
          {!isWeb && (
            <TouchableOpacity onPress={handleShowFull} style={styles.fullLinkContainer}>
              <Text style={styles.fullLink}>全文</Text>
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
  container: {
    position: "relative",
    marginLeft: 4,
  },
  iconButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  questionMark: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  questionMarkText: {
    fontSize: 10,
    fontWeight: "700",
    color: "rgba(255,255,255,0.7)",
    lineHeight: 12,
  },
  // Short popover styles - positioned below icon, extending to the right
  shortPopover: {
    position: "absolute",
    top: 24,
    left: 0,
    width: 260,
    backgroundColor: "#1e293b",
    borderRadius: 12,
    padding: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    zIndex: 1000,
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
    color: "#e2e8f0",
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
    color: "rgba(255,255,255,0.5)",
    fontWeight: "500",
  },
  // Full modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  modalContent: {
    backgroundColor: "#1e293b",
    borderRadius: 16,
    maxWidth: 400,
    width: "100%",
    maxHeight: "80%",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    overflow: "hidden",
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
  modalText: {
    fontSize: 15,
    lineHeight: 24,
    color: "rgba(255,255,255,0.9)",
    fontFamily: "NotoSerifSC-Regular",
  },
});
