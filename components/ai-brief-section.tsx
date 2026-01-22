/**
 * AIBriefSection Component
 *
 * Displays the "AI 簡報 (Beta)" section with:
 * - Safe batch summary for ENTIRE result set (free + pro)
 * - Total count header
 * - Choices recap
 * - Insights bullets
 * - Watch-out items
 * - Loading state with skeleton
 * - Regenerate button
 *
 * NOTE: Enhanced per-school briefs are triggered from SchoolCard, not here.
 */

import React, { useState, useEffect, useCallback, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform, Animated } from "react-native";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { getKgSafeBatchSummary, toSchoolForBrief } from "@/lib/services/briefs";
import type { SafeBatchSummary, KGBriefPreferences, KGSchoolForBrief } from "@/lib/services/briefs";
import type { GroupedSchool } from "@/lib/school-classification";
import { FilterContext } from "@/lib/filter-context";
import { kindergartens } from "@/data/kg/kg-database";
import type { KGSession } from "@/constants/kg-filters";
import * as Haptics from "expo-haptics";

// Create a map for quick KG lookup
const kgMap = new Map<string, typeof kindergartens[0]>();
for (const kg of kindergartens) {
  kgMap.set(kg.id, kg);
  for (const variantId of kg.variantIds) {
    kgMap.set(variantId, kg);
  }
}

interface AIBriefSectionProps {
  schools: GroupedSchool[];
}

export function AIBriefSection({ schools }: AIBriefSectionProps) {
  const filterContext = useContext(FilterContext);
  const [isLoading, setIsLoading] = useState(true);
  const [summary, setSummary] = useState<SafeBatchSummary | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  // Extract preferences from filter context
  const getPreferences = useCallback((): KGBriefPreferences => {
    if (!filterContext) return {};

    const { state } = filterContext;
    return {
      sessions: state.kgSession.length > 0 ? state.kgSession : undefined,
      curriculumCategory: state.kgCurriculumCategory.length > 0 ? state.kgCurriculumCategory : undefined,
      curriculumType: state.kgCurriculumType.length > 0 ? state.kgCurriculumType : undefined,
      languageEnv: state.kgLanguageEnv.length > 0 ? state.kgLanguageEnv : undefined,
      pedagogy: state.kgPedagogy.length > 0 ? state.kgPedagogy : undefined,
      districts: state.district18.length > 0 ? state.district18 : undefined,
    };
  }, [filterContext]);

  // Prepare ALL school data for summary generation
  const prepareSchoolsForBrief = useCallback((schools: GroupedSchool[]): KGSchoolForBrief[] => {
    return schools.map(school => {
      // Look up full KG data
      const kgData = kgMap.get(school.id);
      if (kgData) {
        return toSchoolForBrief(kgData);
      }
      // Fallback if not found in KG database
      return {
        id: school.id,
        name: school.name,
        nameEn: school.nameEn || "",
        district18: school.district18 || "",
        sessions: (school.__sessions || []) as KGSession[],
        curriculumCategory: "unknown",
        curriculumType: null,
        pedagogyTags: [],
        languageEnv: [],
        tuitionMin: 0,
        tuitionMax: 0,
        dataQuality: {
          curriculumConfidence: "low" as const,
          pedagogyConfidence: "low" as const,
          languageConfidence: "low" as const,
          needsReview: true,
        },
      };
    });
  }, []);

  // Generate safe batch summary
  const generateSummary = useCallback(async () => {
    setIsLoading(true);
    setSummary(null);

    // Fade out
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start();

    try {
      const preferences = getPreferences();
      const schoolsForBrief = prepareSchoolsForBrief(schools);

      const result = await getKgSafeBatchSummary({
        stage: "kg",
        preferences,
        schools: schoolsForBrief,
      });

      setSummary(result);

      // Fade in
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } catch (error) {
      console.error("Failed to generate summary:", error);
    } finally {
      setIsLoading(false);
    }
  }, [schools, getPreferences, prepareSchoolsForBrief, fadeAnim]);

  // Generate summary when schools change
  useEffect(() => {
    if (schools.length > 0) {
      generateSummary();
    }
  }, [schools, generateSummary]);

  // Handle regenerate
  const handleRegenerate = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    generateSummary();
  };

  // Handle collapse toggle
  const handleToggleCollapse = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setIsCollapsed(!isCollapsed);
  };

  // Don't render if no schools
  if (schools.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <TouchableOpacity
        style={styles.header}
        onPress={handleToggleCollapse}
        activeOpacity={0.7}
      >
        <View style={styles.headerLeft}>
          <View style={styles.aiBadge}>
            <IconSymbol name="sparkles" size={12} color="#7C3AED" />
            <Text style={styles.aiBadgeText}>AI</Text>
          </View>
          <Text style={styles.headerTitle}>AI 簡報</Text>
          <View style={styles.betaBadge}>
            <Text style={styles.betaText}>Beta</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.regenerateButton}
            onPress={handleRegenerate}
            disabled={isLoading}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <IconSymbol
              name="arrow.clockwise"
              size={14}
              color={isLoading ? "rgba(255,255,255,0.3)" : "#00D9FF"}
            />
            <Text style={[styles.regenerateText, isLoading && styles.regenerateTextDisabled]}>
              重新生成
            </Text>
          </TouchableOpacity>
          <IconSymbol
            name={isCollapsed ? "chevron.down" : "chevron.up"}
            size={16}
            color="rgba(255,255,255,0.5)"
          />
        </View>
      </TouchableOpacity>

      {/* Content */}
      {!isCollapsed && (
        <View style={styles.content}>
          {isLoading ? (
            // Loading skeleton
            <View style={styles.skeletonContainer}>
              {/* Count skeleton */}
              <View style={styles.countSkeleton}>
                <View style={styles.skeletonLine} />
              </View>
              {/* Recap skeleton */}
              <View style={styles.recapSkeleton}>
                <View style={styles.skeletonLine} />
                <View style={[styles.skeletonLine, styles.skeletonLineShort]} />
              </View>
              {/* Insights skeleton */}
              <View style={styles.insightsSkeleton}>
                <View style={[styles.skeletonLine, styles.skeletonLineMedium]} />
                <View style={[styles.skeletonLine, styles.skeletonLineShort]} />
                <View style={[styles.skeletonLine, styles.skeletonLineMedium]} />
              </View>
            </View>
          ) : summary ? (
            <Animated.View style={{ opacity: fadeAnim }}>
              {/* Total Count Header */}
              <View style={styles.countContainer}>
                <Text style={styles.countText}>
                  本次結果共 <Text style={styles.countNumber}>{summary.totalCount}</Text> 間幼稚園
                </Text>
              </View>

              {/* Choices Recap */}
              <View style={styles.recapContainer}>
                <Text style={styles.recapText}>{summary.choicesRecap}</Text>
              </View>

              {/* Overall Summary */}
              <View style={styles.summaryContainer}>
                <Text style={styles.summaryText}>{summary.overallSummary}</Text>
              </View>

              {/* Insights Section */}
              {summary.insights.length > 0 && (
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <IconSymbol name="chart.bar.fill" size={14} color="#10B981" />
                    <Text style={styles.sectionTitle}>結果分析</Text>
                  </View>
                  <View style={styles.bulletList}>
                    {summary.insights.map((insight, i) => (
                      <View key={i} style={styles.bulletItem}>
                        <Text style={styles.bulletDot}>•</Text>
                        <Text style={styles.bulletText}>{insight}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}

              {/* Watch Out Section */}
              {summary.watchOut.length > 0 && (
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <IconSymbol name="exclamationmark.triangle.fill" size={14} color="#F59E0B" />
                    <Text style={styles.sectionTitleWarning}>資料待確認</Text>
                  </View>
                  <View style={styles.bulletList}>
                    {summary.watchOut.map((item, i) => (
                      <View key={i} style={styles.bulletItem}>
                        <Text style={styles.bulletDotWarning}>•</Text>
                        <Text style={styles.bulletTextWarning}>{item}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}

              {/* Disclaimer */}
              <View style={styles.disclaimer}>
                <IconSymbol name="info.circle" size={12} color="rgba(255,255,255,0.3)" />
                <Text style={styles.disclaimerText}>
                  以上簡報由 AI 根據學校公開資料生成，僅供參考。
                </Text>
              </View>
            </Animated.View>
          ) : null}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
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
    color: "#00D9FF",
    fontFamily: "NotoSerifSC-Regular",
  },
  regenerateTextDisabled: {
    color: "rgba(255,255,255,0.3)",
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
    color: "#00D9FF",
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
    marginBottom: 16,
  },
  summaryText: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
    fontFamily: "NotoSerifSC-Regular",
    lineHeight: 22,
  },
  // Section styles
  section: {
    marginBottom: 12,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#10B981",
    fontFamily: "NotoSerifSC-Regular",
  },
  sectionTitleWarning: {
    fontSize: 13,
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
    marginBottom: 4,
  },
  bulletDot: {
    fontSize: 12,
    color: "#10B981",
    marginRight: 8,
    marginTop: 2,
  },
  bulletDotWarning: {
    fontSize: 12,
    color: "#F59E0B",
    marginRight: 8,
    marginTop: 2,
  },
  bulletText: {
    flex: 1,
    fontSize: 13,
    color: "rgba(255,255,255,0.75)",
    fontFamily: "NotoSerifSC-Regular",
    lineHeight: 19,
  },
  bulletTextWarning: {
    flex: 1,
    fontSize: 13,
    color: "rgba(255,255,255,0.6)",
    fontFamily: "NotoSerifSC-Regular",
    lineHeight: 19,
  },
  disclaimer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 12,
    paddingHorizontal: 4,
  },
  disclaimerText: {
    fontSize: 11,
    color: "rgba(255,255,255,0.35)",
    fontFamily: "NotoSerifSC-Regular",
  },
  // Skeleton styles
  skeletonContainer: {
    opacity: 0.7,
  },
  countSkeleton: {
    marginBottom: 12,
  },
  recapSkeleton: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  insightsSkeleton: {
    marginTop: 8,
  },
  skeletonLine: {
    height: 14,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 4,
    marginBottom: 8,
  },
  skeletonLineShort: {
    width: "60%",
    marginBottom: 0,
  },
  skeletonLineMedium: {
    width: "80%",
  },
});
