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

// Pro report school analysis component
function ProSchoolAnalysis({
  school,
  matchScore,
  analysis,
}: {
  school: School;
  matchScore: number;
  analysis: {
    personalizedAnalysis: string;
    strengths: string[];
    considerations: string[];
    applicationTips: string;
  };
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
            color="rgba(255,255,255,0.6)"
          />
        </View>
      </TouchableOpacity>

      {expanded && (
        <View style={styles.analysisContent}>
          {/* Personalized Analysis */}
          <View style={styles.analysisSection}>
            <View style={styles.sectionHeader}>
              <IconSymbol name="person.fill" size={16} color="#00D9FF" />
              <Text style={styles.sectionTitle}>個人化分析</Text>
            </View>
            <Text style={styles.analysisText}>{analysis.personalizedAnalysis}</Text>
          </View>

          {/* Strengths */}
          <View style={styles.analysisSection}>
            <View style={styles.sectionHeader}>
              <IconSymbol name="checkmark.circle.fill" size={16} color="#10B981" />
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
              <IconSymbol name="exclamationmark.triangle.fill" size={16} color="#F59E0B" />
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
        colors={["#0F1629", "#1a2744", "#1e3a5f", "#1a2744"]}
        locations={[0, 0.3, 0.7, 1]}
        style={StyleSheet.absoluteFill}
      />

      <View style={[styles.container, { paddingTop: insets.top }]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <IconSymbol name="chevron.left" size={24} color="#FFFFFF" />
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
                <IconSymbol name="doc.text.fill" size={20} color="#00D9FF" />
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
                  />
                );
              })}
            </View>

            {/* Strategy Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeaderLarge}>
                <IconSymbol name="flag.fill" size={20} color="#10B981" />
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
                <IconSymbol name="checklist" size={20} color="#F59E0B" />
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
                            ? "#EF4444"
                            : action.priority === "medium"
                            ? "#F59E0B"
                            : "#10B981",
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
                              ? "#EF4444"
                              : action.priority === "medium"
                              ? "#F59E0B"
                              : "#10B981",
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

      <UpgradeModal
        visible={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
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
    gap: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Regular",
    letterSpacing: 1,
  },
  proBadgeHeader: {
    backgroundColor: "#7C3AED",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  proBadgeHeaderText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  loadingText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    marginTop: 20,
    fontFamily: "NotoSerifSC-Regular",
  },
  loadingSubtext: {
    fontSize: 14,
    color: "rgba(255,255,255,0.5)",
    marginTop: 8,
    fontFamily: "NotoSerifSC-Regular",
  },
  summarySection: {
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    backgroundColor: "rgba(0,217,255,0.08)",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(0,217,255,0.2)",
  },
  summaryText: {
    fontSize: 15,
    color: "rgba(255,255,255,0.9)",
    lineHeight: 24,
    fontFamily: "NotoSerifSC-Regular",
  },
  section: {
    marginHorizontal: 16,
    marginTop: 24,
  },
  sectionHeaderLarge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 16,
  },
  sectionTitleLarge: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Bold",
  },
  analysisCard: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    overflow: "hidden",
  },
  analysisHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  analysisHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 12,
  },
  matchBadge: {
    backgroundColor: "rgba(0,217,255,0.15)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  matchScore: {
    fontSize: 14,
    fontWeight: "700",
    color: "#00D9FF",
  },
  schoolName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    flex: 1,
    fontFamily: "NotoSerifSC-Regular",
  },
  analysisContent: {
    padding: 16,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.08)",
  },
  analysisSection: {
    marginTop: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "rgba(255,255,255,0.9)",
    fontFamily: "NotoSerifSC-Regular",
  },
  analysisText: {
    fontSize: 14,
    color: "rgba(255,255,255,0.75)",
    lineHeight: 22,
    fontFamily: "NotoSerifSC-Regular",
  },
  bulletPoint: {
    flexDirection: "row",
    marginVertical: 3,
  },
  bullet: {
    fontSize: 14,
    color: "rgba(255,255,255,0.5)",
    marginRight: 8,
    width: 12,
  },
  bulletText: {
    fontSize: 14,
    color: "rgba(255,255,255,0.75)",
    flex: 1,
    lineHeight: 20,
    fontFamily: "NotoSerifSC-Regular",
  },
  strategyCard: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  strategyLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#10B981",
    marginBottom: 8,
    fontFamily: "NotoSerifSC-Regular",
  },
  strategyText: {
    fontSize: 14,
    color: "rgba(255,255,255,0.85)",
    lineHeight: 22,
    fontFamily: "NotoSerifSC-Regular",
  },
  actionItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    gap: 14,
  },
  actionStep: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  actionStepText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  actionContent: {
    flex: 1,
  },
  actionText: {
    fontSize: 14,
    color: "rgba(255,255,255,0.85)",
    lineHeight: 20,
    fontFamily: "NotoSerifSC-Regular",
  },
  actionPriority: {
    fontSize: 12,
    marginTop: 4,
    fontFamily: "NotoSerifSC-Regular",
  },
  disclaimer: {
    fontSize: 12,
    color: "rgba(255,255,255,0.4)",
    textAlign: "center",
    marginHorizontal: 24,
    marginTop: 32,
    marginBottom: 20,
    lineHeight: 18,
    fontFamily: "NotoSerifSC-Regular",
  },
});
