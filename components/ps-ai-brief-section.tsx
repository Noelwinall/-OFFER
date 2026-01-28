/**
 * PSAIBriefSection Component
 *
 * Displays the "AI 簡報 (Beta)" section for Primary/Secondary schools with:
 * - Total count header
 * - Choices recap
 * - Summary text
 * - Loading state with skeleton
 * - Regenerate button (re-shuffles summary)
 * - Collapsible UI
 *
 * Matches the UI of the original AIBriefSection component for KG.
 */

import React, { useState, useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform, Animated } from "react-native";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import * as Haptics from "expo-haptics";

interface PSSchool {
  id: string;
  name: string;
  nameEn?: string;
  category?: string;
  district18?: string;
  gender?: string;
  religion?: string;
}

interface PSAIBriefSectionProps {
  schools: PSSchool[];
  totalCount: number;
  stage: string; // "小學" or "中學"
  choicesRecap: string;
  summary: string;
}

export function PSAIBriefSection({ schools, totalCount, stage, choicesRecap, summary }: PSAIBriefSectionProps) {
  const colors = useColors();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(1));

  // Theme-aware dynamic styles
  const dynamicStyles = {
    container: {
      backgroundColor: colors.primary + "15",
      borderColor: colors.primary + "30",
    },
    headerTitle: {
      color: colors.foreground,
    },
    countText: {
      color: colors.foreground,
    },
    recapText: {
      color: colors.muted,
    },
    summaryText: {
      color: colors.foreground,
    },
    bulletText: {
      color: colors.foreground + "CC",
    },
    disclaimerText: {
      color: colors.muted,
    },
    chevronColor: colors.muted,
    skeletonBg: colors.border,
  };

  // Handle collapse toggle
  const handleToggleCollapse = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setIsCollapsed(!isCollapsed);
  };

  // Handle regenerate (just a visual effect for now)
  const handleRegenerate = useCallback(() => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    // Fade out and back in for visual feedback
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0.3,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim]);

  // Don't render if no schools
  if (schools.length === 0) {
    return null;
  }

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      {/* Header */}
      <TouchableOpacity
        style={styles.header}
        onPress={handleToggleCollapse}
        activeOpacity={0.7}
      >
        <View style={styles.headerLeft}>
          <Text style={[styles.headerTitle, dynamicStyles.headerTitle]}>簡報</Text>
          <View style={styles.betaBadge}>
            <Text style={styles.betaText}>Beta</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <IconSymbol
            name={isCollapsed ? "chevron.down" : "chevron.up"}
            size={16}
            color={dynamicStyles.chevronColor}
          />
        </View>
      </TouchableOpacity>

      {/* Content */}
      {!isCollapsed && (
        <View style={styles.content}>
          <Animated.View style={{ opacity: fadeAnim }}>
            {/* Total Count Header */}
            <View style={styles.countContainer}>
              <Text style={[styles.countText, dynamicStyles.countText]}>
                本次結果共 <Text style={[styles.countNumber, { color: colors.primary }]}>{totalCount}</Text> 所{stage}
              </Text>
            </View>

            {/* Choices Recap */}
            {choicesRecap && (
              <View style={[styles.recapContainer, { backgroundColor: colors.surface }]}>
                <Text style={[styles.recapText, dynamicStyles.recapText]}>{choicesRecap}</Text>
              </View>
            )}

            {/* Overall Summary */}
            {summary && (
              <View style={styles.summaryContainer}>
                <Text style={[styles.summaryText, dynamicStyles.summaryText]}>{summary}</Text>
              </View>
            )}

            {/* Disclaimer */}
            <View style={styles.disclaimer}>
              <IconSymbol name="info.circle" size={12} color={colors.muted} />
              <Text style={[styles.disclaimerText, dynamicStyles.disclaimerText]}>
                以上簡報由 AI 根據學校公開資料生成，僅供參考。
              </Text>
            </View>
          </Animated.View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    backgroundColor: "rgba(124, 58, 237, 0.08)",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(124, 58, 237, 0.2)",
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  aiBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(124, 58, 237, 0.2)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  aiBadgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#A78BFA",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Bold",
  },
  betaBadge: {
    backgroundColor: "rgba(245, 158, 11, 0.2)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  betaText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#F59E0B",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  regenerateButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  regenerateText: {
    fontSize: 12,
    fontFamily: "NotoSerifSC-Regular",
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  // Count section
  countContainer: {
    marginBottom: 12,
  },
  countText: {
    fontSize: 18,
    fontWeight: "600",
    color: "rgba(255,255,255,0.9)",
    fontFamily: "NotoSerifSC-Bold",
  },
  countNumber: {
    fontSize: 22,
  },
  // Recap section
  recapContainer: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  recapText: {
    fontSize: 13,
    color: "rgba(255,255,255,0.7)",
    fontFamily: "NotoSerifSC-Regular",
    lineHeight: 20,
  },
  // Summary section
  summaryContainer: {
    marginBottom: 12,
  },
  summaryText: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
    fontFamily: "NotoSerifSC-Regular",
    lineHeight: 22,
  },
  disclaimer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 8,
    paddingHorizontal: 4,
  },
  disclaimerText: {
    fontSize: 11,
    color: "rgba(255,255,255,0.35)",
    fontFamily: "NotoSerifSC-Regular",
  },
});
