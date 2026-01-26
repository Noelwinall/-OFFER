/**
 * BriefCard Component
 *
 * Displays an AI-generated brief for a single kindergarten.
 * Shows fit highlights and watch-out items.
 */

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useRouter } from "expo-router";
import { useColors } from "@/hooks/use-colors";
import type { KGSchoolBrief } from "@/lib/services/briefs";

interface BriefCardProps {
  brief: KGSchoolBrief;
  index: number;
}

export function BriefCard({ brief, index }: BriefCardProps) {
  const router = useRouter();
  const colors = useColors();

  const handlePress = () => {
    router.push(`/school/${brief.schoolId}`);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={[styles.indexBadge, { backgroundColor: colors.primary + "33" }]}>
          <Text style={[styles.indexText, { color: colors.primary }]}>{index + 1}</Text>
        </View>
        <Text style={styles.schoolName} numberOfLines={2}>
          {brief.schoolName}
        </Text>
        <IconSymbol name="chevron.right" size={16} color="rgba(255,255,255,0.4)" />
      </View>

      {/* Fit Highlights */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <IconSymbol name="checkmark.circle.fill" size={14} color="#10B981" />
          <Text style={styles.sectionTitle}>適合原因</Text>
        </View>
        <View style={styles.bulletList}>
          {brief.fitHighlights.map((highlight, i) => (
            <View key={i} style={styles.bulletItem}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>{highlight}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Watch Out */}
      {brief.watchOut.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <IconSymbol name="exclamationmark.triangle.fill" size={14} color="#F59E0B" />
            <Text style={styles.sectionTitleWarning}>留意事項</Text>
          </View>
          <View style={styles.bulletList}>
            {brief.watchOut.map((item, i) => (
              <View key={i} style={styles.bulletItem}>
                <Text style={styles.bulletDotWarning}>•</Text>
                <Text style={styles.bulletTextWarning}>{item}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
}

/**
 * Loading skeleton for BriefCard
 */
export function BriefCardSkeleton() {
  return (
    <View style={[styles.container, styles.skeleton]}>
      {/* Header skeleton */}
      <View style={styles.header}>
        <View style={[styles.indexBadge, styles.skeletonBadge]} />
        <View style={styles.skeletonTitle} />
      </View>

      {/* Content skeleton */}
      <View style={styles.section}>
        <View style={styles.skeletonLine} />
        <View style={[styles.skeletonLine, styles.skeletonLineShort]} />
        <View style={styles.skeletonLine} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  skeleton: {
    opacity: 0.6,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 10,
  },
  indexBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor and color will be set dynamically
  },
  indexText: {
    fontSize: 12,
    fontWeight: "700",
    // color will be set dynamically
  },
  schoolName: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Bold",
  },
  section: {
    marginTop: 8,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 6,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#10B981",
    fontFamily: "NotoSerifSC-Regular",
  },
  sectionTitleWarning: {
    fontSize: 12,
    fontWeight: "600",
    color: "#F59E0B",
    fontFamily: "NotoSerifSC-Regular",
  },
  bulletList: {
    paddingLeft: 4,
  },
  bulletItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 3,
  },
  bulletDot: {
    fontSize: 12,
    color: "#10B981",
    marginRight: 6,
    marginTop: 1,
  },
  bulletDotWarning: {
    fontSize: 12,
    color: "#F59E0B",
    marginRight: 6,
    marginTop: 1,
  },
  bulletText: {
    flex: 1,
    fontSize: 13,
    color: "rgba(255,255,255,0.8)",
    fontFamily: "NotoSerifSC-Regular",
    lineHeight: 18,
  },
  bulletTextWarning: {
    flex: 1,
    fontSize: 13,
    color: "rgba(255,255,255,0.6)",
    fontFamily: "NotoSerifSC-Regular",
    lineHeight: 18,
  },
  // Skeleton styles
  skeletonBadge: {
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  skeletonTitle: {
    flex: 1,
    height: 18,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 4,
  },
  skeletonLine: {
    height: 14,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 4,
    marginBottom: 8,
  },
  skeletonLineShort: {
    width: "70%",
  },
});
