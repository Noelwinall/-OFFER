import { useState, useEffect, useMemo, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
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
import { FavoritesStorage } from "@/lib/storage";
import type { QuizFilters, School } from "@/types/school";
import { CURRICULUM_V2_LABELS } from "@/types/school";
import * as Haptics from "expo-haptics";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { trpc } from "@/lib/trpc";
import { useColors } from "@/hooks/use-colors";
import { Spacing, SpacingPresets } from "@/constants/spacing";
import { BorderRadius, BorderRadiusPresets } from "@/constants/border-radius";
import { TypographyStyles } from "@/constants/typography";

// Report school card component
function ReportSchoolCard({
  school,
  matchScore,
  matchSummary,
  isFavorite,
  onPress,
  onFavoritePress,
  isLoading,
  colors,
  styles,
}: {
  school: School;
  matchScore: number;
  matchSummary: string;
  isFavorite: boolean;
  onPress: () => void;
  onFavoritePress: () => void;
  isLoading: boolean;
  colors: ReturnType<typeof useColors>;
  styles: ReturnType<typeof StyleSheet.create>;
}) {
  const matchDescription = getMatchDescription(matchScore);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.schoolCard}
      activeOpacity={0.85}
    >
      <View style={styles.cardHeader}>
        <View style={styles.matchBadge}>
          <Text style={styles.matchScore}>{matchScore}%</Text>
          <Text style={styles.matchLabel}>{matchDescription}</Text>
        </View>
        <TouchableOpacity onPress={onFavoritePress} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <IconSymbol
            name={isFavorite ? "heart.fill" : "heart"}
            size={22}
            color={isFavorite ? colors.error : colors.muted}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.schoolName}>{school.name}</Text>

      <View style={styles.tagsRow}>
        <View style={[styles.tag, { backgroundColor: getCategoryColor(school.category, colors) }]}>
          <Text style={styles.tagText}>{school.category}</Text>
        </View>
        <View style={[styles.tag, { backgroundColor: "#0D9488" }]}>
          <Text style={styles.tagText}>{school.district}</Text>
        </View>
        {school.curriculumV2?.[0] && (
          <View style={[styles.tag, { backgroundColor: "#6366F1" }]}>
            <Text style={styles.tagText}>{CURRICULUM_V2_LABELS[school.curriculumV2[0]] || school.curriculumV2[0]}</Text>
          </View>
        )}
      </View>

      <View style={styles.summaryContainer}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color={colors.primary} />
            <Text style={styles.loadingText}>正在生成分析...</Text>
          </View>
        ) : matchSummary ? (
          <Text style={styles.summaryText}>{matchSummary}</Text>
        ) : (
          <Text style={styles.summaryPlaceholder}>點擊查看詳情</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

export default function ReportScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colors = useColors();
  const params = useLocalSearchParams();
  const [recommendations, setRecommendations] = useState<School[]>([]);
  const [currentFilters, setCurrentFilters] = useState<QuizFilters>({});
  const [favorites, setFavorites] = useState<string[]>([]);
  const [summaries, setSummaries] = useState<Record<string, string>>({});

  // Generate simple report mutation
  const generateReportMutation = trpc.report.generateSimple.useMutation({
    onSuccess: (data) => {
      const newSummaries: Record<string, string> = {};
      data.schools.forEach((s) => {
        newSummaries[s.id] = s.matchSummary;
      });
      setSummaries(newSummaries);
    },
    onError: (error) => {
      console.error("Failed to generate report:", error);
    },
  });

  useEffect(() => {
    loadRecommendations();
    loadFavorites();
  }, [params]);

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
    const topResults = results.slice(0, 20); // Top 20 for report
    setRecommendations(topResults);

    // Auto-generate report if we have results
    if (topResults.length > 0) {
      generateReportMutation.mutate({
        filters,
        schoolIds: topResults.map((s) => s.id),
        locale: "zh-TW",
      });
    }
  };

  const loadFavorites = async () => {
    const favs = await FavoritesStorage.getAll();
    setFavorites(favs);
  };

  const handleFavoriteToggle = async (schoolId: string) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    await FavoritesStorage.toggle(schoolId);
    await loadFavorites();
  };

  const handleSchoolPress = (schoolId: string) => {
    router.push(`/school/${schoolId}`);
  };

  const handleBack = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.back();
  };

  const handleUpgradeToPro = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    // Navigate to pro report page with same params
    const queryString = Object.entries(params)
      .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
      .join("&");
    router.push(`/report-pro?${queryString}` as any);
  };

  // Get category color (some colors not in theme, keep as is)
  const getCategoryColor = (category: string, themeColors: ReturnType<typeof useColors>): string => {
    const categoryColors: Record<string, string> = {
      "國際": themeColors.primary,
      "資助": "#6B5B95", // Keep custom color
      "直資": "#E8756F", // Keep custom color
      "私立": "#7C3AED", // Keep custom color
      "公立": "#3B82F6", // Keep custom color
    };
    return categoryColors[category] || themeColors.muted;
  };

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
    headerTitle: {
      ...TypographyStyles.heading,
      fontSize: 18,
      color: colors.foreground,
      letterSpacing: 1,
    },
    titleSection: {
      paddingHorizontal: Spacing.xl,
      paddingVertical: Spacing.xl,
      borderBottomWidth: 1,
      borderBottomColor: colors.border + "80",
    },
    reportTitle: {
      ...TypographyStyles.title,
      fontSize: 26,
      fontWeight: TypographyStyles.heading.fontWeight,
      color: colors.foreground,
      letterSpacing: 0.5,
    },
    reportSubtitle: {
      ...TypographyStyles.small,
      fontSize: 14,
      color: colors.muted,
      marginTop: Spacing.sm,
    },
    schoolCard: {
      backgroundColor: colors.surface + "0D",
      borderRadius: BorderRadiusPresets.card,
      padding: Spacing.lg,
      marginVertical: Spacing.sm,
      borderWidth: 1,
      borderColor: colors.border + "80",
    },
    cardHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: Spacing.md,
    },
    matchBadge: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.primary + "26",
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.xs,
      borderRadius: BorderRadius.full,
    },
    matchScore: {
      ...TypographyStyles.body,
      fontSize: 16,
      fontWeight: TypographyStyles.heading.fontWeight,
      color: colors.primary,
      marginRight: Spacing.xs,
    },
    matchLabel: {
      ...TypographyStyles.caption,
      fontSize: 12,
      color: colors.primary,
    },
    schoolName: {
      ...TypographyStyles.heading,
      fontSize: 18,
      color: colors.foreground,
      marginBottom: Spacing.sm,
    },
    tagsRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: Spacing.xs,
      marginBottom: Spacing.md,
    },
    tag: {
      paddingHorizontal: Spacing.sm,
      paddingVertical: Spacing.xs,
      borderRadius: BorderRadius.sm,
    },
    tagText: {
      ...TypographyStyles.caption,
      fontSize: 12,
      color: colors.foreground,
      fontWeight: "500",
    },
    summaryContainer: {
      backgroundColor: colors.surface + "08",
      borderRadius: BorderRadius.md,
      padding: Spacing.md,
      minHeight: 60,
    },
    summaryText: {
      ...TypographyStyles.body,
      fontSize: 14,
      color: colors.foreground + "D9",
      lineHeight: 22,
    },
    summaryPlaceholder: {
      ...TypographyStyles.body,
      fontSize: 14,
      color: colors.muted + "66",
    },
    loadingContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: Spacing.sm,
    },
    loadingText: {
      ...TypographyStyles.body,
      fontSize: 14,
      color: colors.muted,
    },
    emptyContainer: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: Spacing["3xl"],
    },
    emptyText: {
      ...TypographyStyles.body,
      color: colors.muted,
      textAlign: "center",
      fontSize: 16,
    },
    bottomContainer: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      paddingHorizontal: Spacing.xl,
      paddingTop: Spacing.lg,
      backgroundColor: colors.background + "FA",
      borderTopWidth: 1,
      borderTopColor: colors.border + "80",
    },
    proButton: {
      borderRadius: BorderRadiusPresets.card,
      overflow: "hidden",
      shadowColor: "#7C3AED",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.4,
      shadowRadius: 12,
      elevation: 8,
    },
    proButtonGradient: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: Spacing.lg,
      gap: Spacing.sm,
    },
    proButtonText: {
      ...TypographyStyles.body,
      fontSize: 17,
      fontWeight: TypographyStyles.heading.fontWeight,
      color: colors.foreground,
      letterSpacing: 0.5,
    },
    proBadge: {
      backgroundColor: colors.foreground + "40",
      paddingHorizontal: Spacing.sm,
      paddingVertical: 2,
      borderRadius: BorderRadius.xs,
    },
    proBadgeText: {
      ...TypographyStyles.tiny,
      fontSize: 10,
      fontWeight: TypographyStyles.heading.fontWeight,
      color: colors.foreground,
    },
    proHint: {
      ...TypographyStyles.caption,
      fontSize: 12,
      color: colors.muted,
      textAlign: "center",
      marginTop: Spacing.sm,
    },
    disclaimerText: {
      ...TypographyStyles.tiny,
      fontSize: 11,
      color: colors.muted + "59",
      textAlign: "center",
      fontFamily: "NotoSerifSC-Regular",
      marginTop: Spacing.sm,
    },
  });

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
          <Text style={styles.headerTitle}>推薦報告</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Report Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.reportTitle}>您的學校推薦報告</Text>
          <Text style={styles.reportSubtitle}>
            根據您的篩選條件，為您匹配了 {recommendations.length} 所學校
          </Text>
        </View>

        {/* School List */}
        <FlatList
          data={recommendations}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ReportSchoolCard
              school={item}
              matchScore={calculateMatchScore(item, currentFilters)}
              matchSummary={summaries[item.id] || ""}
              isFavorite={favorites.includes(item.id)}
              onPress={() => handleSchoolPress(item.id)}
              onFavoritePress={() => handleFavoriteToggle(item.id)}
              isLoading={generateReportMutation.isPending && !summaries[item.id]}
              colors={colors}
              styles={styles}
            />
          )}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 220 }}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>暫無推薦學校</Text>
            </View>
          }
        />

        {/* Bottom CTA */}
        <View style={[styles.bottomContainer, { paddingBottom: insets.bottom + 16 }]}>
          <TouchableOpacity
            onPress={handleUpgradeToPro}
            style={styles.proButton}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={["#7C3AED", "#5B21B6"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.proButtonGradient}
            >
              <IconSymbol name="sparkles" size={20} color={colors.foreground} />
              <Text style={styles.proButtonText}>深度报告和攻略</Text>
              <View style={styles.proBadge}>
                <Text style={styles.proBadgeText}>PRO</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          <Text style={styles.proHint}>
            獲取個人化分析、申請策略、行動計劃
          </Text>

          <Text style={styles.disclaimerText}>
            資訊基於公開資料整理，僅供參考，以學校官方為準
          </Text>
        </View>
        </View>
      </MaxWidthWrapper>
    </View>
  );
}
