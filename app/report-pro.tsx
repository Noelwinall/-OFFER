import { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SCHOOLS } from "@/data/schools";
import {
  getSortedRecommendations,
  calculateMatchScore,
  getMatchDescription,
} from "@/lib/recommendation";
import type { QuizFilters, School } from "@/types/school";
import * as Haptics from "expo-haptics";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { trpc } from "@/lib/trpc";
import { UpgradeModal } from "@/components/upgrade-modal";
import { BlurredProPreview } from "@/components/blurred-pro-preview";
import { useColors } from "@/hooks/use-colors";
import { Spacing, SpacingPresets } from "@/constants/spacing";
import { BorderRadius, BorderRadiusPresets } from "@/constants/border-radius";
import { TypographyStyles } from "@/constants/typography";

// Pro report school analysis component
function ProSchoolAnalysis({
  school,
  matchScore,
  analysis,
  colors,
  styles,
}: {
  school: School;
  matchScore: number;
  analysis: {
    personalizedAnalysis: string;
    strengths: string[];
    considerations: string[];
    applicationTips: string;
  };
  colors: ReturnType<typeof useColors>;
  styles: ReturnType<typeof StyleSheet.create>;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.analysisCard}>
      <TouchableOpacity
        onPress={() => setExpanded(!expanded)}
        activeOpacity={0.8}
      >
        <View style={styles.analysisHeader}>
          <View style={styles.analysisHeaderLeft}>
            <View style={styles.matchBadge}>
              <Text style={styles.matchScore}>{matchScore}%</Text>
            </View>
            <Text style={styles.schoolName} numberOfLines={2}>
              {school.name}
            </Text>
          </View>
          <IconSymbol
            name={expanded ? "chevron.up" : "chevron.down"}
            size={20}
            color={colors.muted}
          />
        </View>
      </TouchableOpacity>

      {expanded && (
        <View style={styles.analysisContent}>
          {/* Personalized Analysis */}
          <View style={styles.analysisSection}>
            <View style={styles.sectionHeader}>
              <IconSymbol name="person.fill" size={16} color={colors.primary} />
              <Text style={styles.sectionTitle}>個人化分析</Text>
            </View>
            <Text style={styles.analysisText}>{analysis.personalizedAnalysis}</Text>
          </View>

          {/* Strengths */}
          <View style={styles.analysisSection}>
            <View style={styles.sectionHeader}>
              <IconSymbol name="checkmark.circle.fill" size={16} color={colors.success} />
              <Text style={styles.sectionTitle}>優勢</Text>
            </View>
            {analysis.strengths.map((strength, index) => (
              <View key={index} style={styles.bulletPoint}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletText}>{strength}</Text>
              </View>
            ))}
          </View>

          {/* Considerations */}
          <View style={styles.analysisSection}>
            <View style={styles.sectionHeader}>
              <IconSymbol name="exclamationmark.triangle.fill" size={16} color={colors.warning} />
              <Text style={styles.sectionTitle}>需要考慮</Text>
            </View>
            {analysis.considerations.map((consideration, index) => (
              <View key={index} style={styles.bulletPoint}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletText}>{consideration}</Text>
              </View>
            ))}
          </View>

          {/* Application Tips */}
          <View style={styles.analysisSection}>
            <View style={styles.sectionHeader}>
              <IconSymbol name="lightbulb.fill" size={16} color="#7C3AED" />
              <Text style={styles.sectionTitle}>申請建議</Text>
            </View>
            <Text style={styles.analysisText}>{analysis.applicationTips}</Text>
          </View>
        </View>
      )}
    </View>
  );
}

export default function ReportProScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colors = useColors();
  const params = useLocalSearchParams();
  const [recommendations, setRecommendations] = useState<School[]>([]);
  const [currentFilters, setCurrentFilters] = useState<QuizFilters>({});
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  // Get pro preview to check membership
  const proPreviewQuery = trpc.report.getProPreview.useQuery(
    {
      filters: currentFilters,
      schoolIds: recommendations.map((s) => s.id),
      locale: "zh-TW",
    },
    {
      enabled: recommendations.length > 0,
    }
  );

  // Generate pro report mutation
  const generateProMutation = trpc.report.generatePro.useMutation({
    onError: (error) => {
      if (error.message === "UPGRADE_REQUIRED") {
        setShowUpgradeModal(true);
      }
    },
  });

  const isProMember = proPreviewQuery.data?.isProMember ?? false;

  useEffect(() => {
    loadRecommendations();
  }, [params]);

  useEffect(() => {
    // Auto-generate report if user is Pro
    if (isProMember && recommendations.length > 0 && !generateProMutation.data) {
      generateProMutation.mutate({
        filters: currentFilters,
        schoolIds: recommendations.slice(0, 10).map((s) => s.id),
        locale: "zh-TW",
      });
    }
  }, [isProMember, recommendations.length]);

  const loadRecommendations = () => {
    const filters: QuizFilters = {};

    if (params.level) filters.level = params.level as any;
    if (params.district) filters.district = params.district as any;
    if (params.category) filters.category = params.category as any;
    if (params.curriculum) filters.curriculum = params.curriculum as any;
    if (params.language) filters.language = params.language as any;
    if (params.tuitionMin && params.tuitionMax) {
      filters.tuitionRange = {
        min: parseInt(params.tuitionMin as string, 10),
        max: parseInt(params.tuitionMax as string, 10),
      };
    }

    setCurrentFilters(filters);
    const results = getSortedRecommendations(SCHOOLS, filters);
    setRecommendations(results.slice(0, 10)); // Top 10 for pro report
  };

  const handleBack = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.back();
  };

  const handleUpgrade = () => {
    setShowUpgradeModal(true);
  };

  const reportData = generateProMutation.data;
  const isLoading = generateProMutation.isPending || proPreviewQuery.isLoading;

  // Define styles inside component to access colors
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: Spacing.lg,
      paddingVertical: Spacing.md,
    },
    backButton: {
      width: 40,
      height: 40,
      alignItems: "center",
      justifyContent: "center",
    },
    headerCenter: {
      flexDirection: "row",
      alignItems: "center",
      gap: Spacing.sm,
    },
    headerTitle: {
      ...TypographyStyles.heading,
      fontSize: 18,
      color: colors.foreground,
      letterSpacing: 1,
    },
    proBadgeHeader: {
      backgroundColor: "#7C3AED",
      paddingHorizontal: Spacing.sm,
      paddingVertical: 2,
      borderRadius: BorderRadius.xs,
    },
    proBadgeHeaderText: {
      ...TypographyStyles.tiny,
      fontSize: 10,
      fontWeight: TypographyStyles.heading.fontWeight,
      color: colors.foreground,
    },
    loadingContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: Spacing["2xl"],
    },
    loadingText: {
      ...TypographyStyles.heading,
      fontSize: 18,
      color: colors.foreground,
      marginTop: Spacing.xl,
    },
    loadingSubtext: {
      ...TypographyStyles.small,
      fontSize: 14,
      color: colors.muted,
      marginTop: Spacing.sm,
    },
    summarySection: {
      marginHorizontal: Spacing.lg,
      marginTop: Spacing.lg,
      marginBottom: Spacing.sm,
      backgroundColor: colors.primary + "14",
      borderRadius: BorderRadiusPresets.card,
      padding: Spacing.xl,
      borderWidth: 1,
      borderColor: colors.primary + "33",
    },
    summaryText: {
      ...TypographyStyles.body,
      fontSize: 15,
      color: colors.foreground + "E6",
      lineHeight: 24,
    },
    section: {
      marginHorizontal: Spacing.lg,
      marginTop: Spacing.xl,
    },
    sectionHeaderLarge: {
      flexDirection: "row",
      alignItems: "center",
      gap: Spacing.sm,
      marginBottom: Spacing.lg,
    },
    sectionTitleLarge: {
      ...TypographyStyles.heading,
      fontSize: 18,
      color: colors.foreground,
    },
    analysisCard: {
      backgroundColor: colors.surface + "0D",
      borderRadius: BorderRadius.md,
      marginBottom: Spacing.md,
      borderWidth: 1,
      borderColor: colors.border + "80",
      overflow: "hidden",
    },
    analysisHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: Spacing.lg,
    },
    analysisHeaderLeft: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
      gap: Spacing.md,
    },
    matchBadge: {
      backgroundColor: colors.primary + "26",
      paddingHorizontal: Spacing.sm,
      paddingVertical: Spacing.xs,
      borderRadius: BorderRadius.md,
    },
    matchScore: {
      ...TypographyStyles.body,
      fontSize: 14,
      fontWeight: TypographyStyles.heading.fontWeight,
      color: colors.primary,
    },
    schoolName: {
      ...TypographyStyles.body,
      fontSize: 16,
      fontWeight: TypographyStyles.heading.fontWeight,
      color: colors.foreground,
      flex: 1,
    },
    analysisContent: {
      padding: Spacing.lg,
      paddingTop: 0,
      borderTopWidth: 1,
      borderTopColor: colors.border + "14",
    },
    analysisSection: {
      marginTop: Spacing.lg,
    },
    sectionHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: Spacing.sm,
      marginBottom: Spacing.sm,
    },
    sectionTitle: {
      ...TypographyStyles.body,
      fontSize: 14,
      fontWeight: TypographyStyles.heading.fontWeight,
      color: colors.foreground + "E6",
    },
    analysisText: {
      ...TypographyStyles.body,
      fontSize: 14,
      color: colors.foreground + "BF",
      lineHeight: 22,
    },
    bulletPoint: {
      flexDirection: "row",
      marginVertical: 3,
    },
    bullet: {
      ...TypographyStyles.body,
      fontSize: 14,
      color: colors.muted,
      marginRight: Spacing.sm,
      width: 12,
    },
    bulletText: {
      ...TypographyStyles.body,
      fontSize: 14,
      color: colors.foreground + "BF",
      flex: 1,
      lineHeight: 20,
    },
    strategyCard: {
      backgroundColor: colors.surface + "0D",
      borderRadius: BorderRadius.md,
      padding: Spacing.lg,
      marginBottom: Spacing.md,
      borderWidth: 1,
      borderColor: colors.border + "14",
    },
    strategyLabel: {
      ...TypographyStyles.caption,
      fontSize: 13,
      fontWeight: TypographyStyles.heading.fontWeight,
      color: colors.success,
      marginBottom: Spacing.sm,
    },
    strategyText: {
      ...TypographyStyles.body,
      fontSize: 14,
      color: colors.foreground + "D9",
      lineHeight: 22,
    },
    actionItem: {
      flexDirection: "row",
      alignItems: "flex-start",
      backgroundColor: colors.surface + "0D",
      borderRadius: BorderRadius.md,
      padding: Spacing.md,
      marginBottom: Spacing.sm,
      gap: Spacing.md,
    },
    actionStep: {
      width: 28,
      height: 28,
      borderRadius: BorderRadius.full,
      alignItems: "center",
      justifyContent: "center",
    },
    actionStepText: {
      ...TypographyStyles.body,
      fontSize: 14,
      fontWeight: TypographyStyles.heading.fontWeight,
      color: colors.foreground,
    },
    actionContent: {
      flex: 1,
    },
    actionText: {
      ...TypographyStyles.body,
      fontSize: 14,
      color: colors.foreground + "D9",
      lineHeight: 20,
    },
    actionPriority: {
      ...TypographyStyles.caption,
      fontSize: 12,
      marginTop: Spacing.xs,
    },
    disclaimer: {
      ...TypographyStyles.caption,
      fontSize: 12,
      color: colors.muted + "66",
      textAlign: "center",
      marginHorizontal: Spacing.xl,
      marginTop: Spacing["2xl"],
      marginBottom: Spacing.xl,
      lineHeight: 18,
    },
  });

  // Show blurred preview for non-Pro users
  if (!isProMember && !isLoading) {
    return (
      <>
        <BlurredProPreview
          schools={recommendations}
          filters={currentFilters}
          onUpgrade={handleUpgrade}
          onBack={handleBack}
        />
        <UpgradeModal
          visible={showUpgradeModal}
          onClose={() => setShowUpgradeModal(false)}
        />
      </>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={[colors.background, colors.surface, colors.background]}
        locations={[0, 0.5, 1]}
        style={StyleSheet.absoluteFill}
      />

      <MaxWidthWrapper>
        <View style={[styles.container, { paddingTop: insets.top }]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <IconSymbol name="chevron.left" size={24} color={colors.foreground} />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>深度报告</Text>
            <View style={styles.proBadgeHeader}>
              <Text style={styles.proBadgeHeaderText}>PRO</Text>
            </View>
          </View>
          <View style={{ width: 40 }} />
        </View>

        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#7C3AED" />
            <Text style={styles.loadingText}>正在生成深度報告...</Text>
            <Text style={styles.loadingSubtext}>AI 正在分析學校數據</Text>
          </View>
        ) : reportData ? (
          <ScrollView
            contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}
            showsVerticalScrollIndicator={false}
          >
            {/* Executive Summary */}
            <View style={styles.summarySection}>
              <View style={styles.sectionHeaderLarge}>
                <IconSymbol name="doc.text.fill" size={20} color={colors.primary} />
                <Text style={styles.sectionTitleLarge}>總體建議</Text>
              </View>
              <Text style={styles.summaryText}>{reportData.summary}</Text>
            </View>

            {/* School Analyses */}
            <View style={styles.section}>
              <View style={styles.sectionHeaderLarge}>
                <IconSymbol name="building.2.fill" size={20} color="#7C3AED" />
                <Text style={styles.sectionTitleLarge}>學校詳細分析</Text>
              </View>
              {reportData.schools.map((schoolData) => {
                const school = recommendations.find((s) => s.id === schoolData.id);
                if (!school) return null;
                return (
                  <ProSchoolAnalysis
                    key={schoolData.id}
                    school={school}
                    matchScore={schoolData.matchScore}
                    analysis={{
                      personalizedAnalysis: schoolData.personalizedAnalysis,
                      strengths: schoolData.strengths,
                      considerations: schoolData.considerations,
                      applicationTips: schoolData.applicationTips,
                    }}
                    colors={colors}
                    styles={styles}
                  />
                );
              })}
            </View>

            {/* Strategy Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeaderLarge}>
                <IconSymbol name="flag.fill" size={20} color={colors.success} />
                <Text style={styles.sectionTitleLarge}>申請策略</Text>
              </View>

              <View style={styles.strategyCard}>
                <Text style={styles.strategyLabel}>首選推薦</Text>
                <Text style={styles.strategyText}>
                  {reportData.strategy.topRecommendation}
                </Text>
              </View>

              <View style={styles.strategyCard}>
                <Text style={styles.strategyLabel}>備選學校</Text>
                {reportData.strategy.backupSchools.map((backup, index) => (
                  <View key={index} style={styles.bulletPoint}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.bulletText}>{backup}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.strategyCard}>
                <Text style={styles.strategyLabel}>申請時間規劃</Text>
                <Text style={styles.strategyText}>
                  {reportData.strategy.applicationTimeline}
                </Text>
              </View>

              <View style={styles.strategyCard}>
                <Text style={styles.strategyLabel}>準備建議</Text>
                <Text style={styles.strategyText}>
                  {reportData.strategy.preparationAdvice}
                </Text>
              </View>
            </View>

            {/* Action Plan */}
            <View style={styles.section}>
              <View style={styles.sectionHeaderLarge}>
                <IconSymbol name="checklist" size={20} color={colors.warning} />
                <Text style={styles.sectionTitleLarge}>行動計劃</Text>
              </View>

              {reportData.actionPlan.map((action) => (
                <View key={action.step} style={styles.actionItem}>
                  <View
                    style={[
                      styles.actionStep,
                      {
                        backgroundColor:
                          action.priority === "high"
                            ? colors.error
                            : action.priority === "medium"
                            ? colors.warning
                            : colors.success,
                      },
                    ]}
                  >
                    <Text style={styles.actionStepText}>{action.step}</Text>
                  </View>
                  <View style={styles.actionContent}>
                    <Text style={styles.actionText}>{action.action}</Text>
                    <Text
                      style={[
                        styles.actionPriority,
                        {
                          color:
                            action.priority === "high"
                              ? colors.error
                              : action.priority === "medium"
                              ? colors.warning
                              : colors.success,
                        },
                      ]}
                    >
                      {action.priority === "high"
                        ? "高優先級"
                        : action.priority === "medium"
                        ? "中優先級"
                        : "低優先級"}
                    </Text>
                  </View>
                </View>
              ))}
            </View>

            {/* Disclaimer */}
            <Text style={styles.disclaimer}>
              以上報告由 AI 根據公開資料生成，僅供參考。實際申請請以學校官方資訊為準。
            </Text>
          </ScrollView>
        ) : null}
        </View>
      </MaxWidthWrapper>

      <UpgradeModal
        visible={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
      />
    </View>
  );
}
