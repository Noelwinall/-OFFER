import { useState, useEffect, useMemo, useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity, Platform, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";
import { SchoolCard } from "@/components/school-card";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SCHOOLS } from "@/data/schools";
import { getSortedRecommendations, calculateMatchScore, getMatchDescription } from "@/lib/recommendation";
import { FavoritesStorage, MapSetStorage } from "@/lib/storage";
import { groupSchoolsBySession, type GroupedSchool } from "@/lib/school-classification";
import type { QuizFilters, School } from "@/types/school";
import * as Haptics from "expo-haptics";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { UpgradeModal } from "@/components/upgrade-modal";
import { useColors } from "@/hooks/use-colors";
import { Spacing, SpacingPresets } from "@/constants/spacing";
import { BorderRadius, BorderRadiusPresets } from "@/constants/border-radius";
import { TypographyStyles } from "@/constants/typography";

export default function RecommendationScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colors = useColors();
  const params = useLocalSearchParams();
  const [recommendations, setRecommendations] = useState<School[]>([]);
  const [currentFilters, setCurrentFilters] = useState<QuizFilters>({});
  const [isRelaxedMatch, setIsRelaxedMatch] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  useEffect(() => {
    loadRecommendations();
    loadFavorites();
  }, [params]);

  // Save Q&A results to storage for Map screen
  useEffect(() => {
    if (recommendations.length > 0) {
      const schoolIds = recommendations.map((s) => s.id);
      MapSetStorage.saveQAResult(schoolIds);
    }
  }, [recommendations]);

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
    setRecommendations(results);
    
    // 檢查是否是放寬匹配（如果第一個結果的匹配度低於70%）
    if (results.length > 0) {
      const topScore = calculateMatchScore(results[0], filters);
      setIsRelaxedMatch(topScore < 70);
    }
  };

  const loadFavorites = async () => {
    const favs = await FavoritesStorage.getAll();
    setFavorites(favs);
  };

  // 合併幼稚園/小學同校不同班別（AM/PM/WD）
  const displayRecommendations = useMemo(() => {
    return groupSchoolsBySession(recommendations);
  }, [recommendations]);

  // 檢查合併後的學校是否被收藏
  const isSchoolFavorite = useCallback((item: GroupedSchool): boolean => {
    if (item.__variantIds && item.__variantIds.length > 0) {
      return item.__variantIds.some((id) => favorites.includes(id));
    }
    return favorites.includes(item.id);
  }, [favorites]);

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

  const handleRestart = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.back();
  };

  const handleBack = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.back();
  };

  const handleViewReport = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    // Navigate to simple report page with same params
    const queryString = Object.entries(params)
      .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
      .join("&");
    router.push(`/report?${queryString}` as any);
  };

  const handleProReport = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    // Navigate to pro report page with same params
    const queryString = Object.entries(params)
      .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
      .join("&");
    router.push(`/report-pro?${queryString}` as any);
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
    statsContainer: {
      paddingHorizontal: Spacing.xl,
      paddingVertical: Spacing.lg,
      borderBottomWidth: 1,
      borderBottomColor: colors.border + "80",
    },
    statsTitle: {
      ...TypographyStyles.title,
      fontSize: 24,
      fontWeight: TypographyStyles.heading.fontWeight,
      color: colors.foreground,
      letterSpacing: 0.5,
    },
    statsSubtitle: {
      ...TypographyStyles.small,
      fontSize: 14,
      color: colors.muted,
      marginTop: Spacing.sm,
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
      backgroundColor: colors.background + "F2",
      borderTopWidth: 1,
      borderTopColor: colors.border + "80",
    },
    proButton: {
      borderRadius: BorderRadiusPresets.card,
      overflow: "hidden",
      marginBottom: Spacing.sm,
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
      fontSize: 16,
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
    restartButton: {
      backgroundColor: colors.surface + "1A",
      paddingVertical: Spacing.md,
      borderRadius: BorderRadiusPresets.card,
      borderWidth: 1,
      borderColor: colors.border + "33",
      marginBottom: Spacing.sm,
    },
    restartButtonText: {
      ...TypographyStyles.body,
      fontSize: 15,
      fontWeight: "500",
      color: colors.foreground,
      textAlign: "center",
      letterSpacing: 1,
    },
    disclaimerText: {
      ...TypographyStyles.tiny,
      fontSize: 11,
      color: colors.muted + "59",
      textAlign: "center",
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
        {/* 頂部導航 */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <IconSymbol name="chevron.left" size={24} color={colors.foreground} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>推薦結果</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* 結果統計 */}
        <View style={styles.statsContainer}>
          <Text style={styles.statsTitle}>
            為您推薦 {displayRecommendations.length} 所學校
          </Text>
          {isRelaxedMatch && displayRecommendations.length > 0 && (
            <Text style={styles.statsSubtitle}>
              已放寬篩選條件，顯示部分匹配的學校
            </Text>
          )}
          {displayRecommendations.length === 0 && (
            <Text style={styles.statsSubtitle}>
              沒有找到符合條件的學校，請調整篩選條件
            </Text>
          )}
        </View>

        <FlatList
          data={displayRecommendations}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <SchoolCard
              school={item}
              isFavorite={isSchoolFavorite(item)}
              onPress={() => handleSchoolPress(item.id)}
              onFavoritePress={() => handleFavoriteToggle(item.id)}
              sessions={item.__sessions}
              showSessions={item.__showSessions}
            />
          )}
          contentContainerStyle={{ paddingVertical: 8, paddingBottom: 180 }}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>暫無推薦學校</Text>
            </View>
          }
        />

        {/* 底部按鈕 */}
        <View style={[styles.bottomContainer, { paddingBottom: insets.bottom + 16 }]}>
          {/* Pro Report Button */}
          <TouchableOpacity
            onPress={handleProReport}
            style={styles.proButton}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={["#7C3AED", "#5B21B6"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.proButtonGradient}
            >
              <IconSymbol name="sparkles" size={18} color={colors.foreground} />
              <Text style={styles.proButtonText}>深度报告和攻略</Text>
              <View style={styles.proBadge}>
                <Text style={styles.proBadgeText}>PRO</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleRestart}
            style={styles.restartButton}
            activeOpacity={0.8}
          >
            <Text style={styles.restartButtonText}>重新篩選</Text>
          </TouchableOpacity>

          <Text style={styles.disclaimerText}>
            資訊基於公開資料整理，僅供參考，以學校官方為準
          </Text>
        </View>
        </View>
      </MaxWidthWrapper>

      <UpgradeModal
        visible={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
      />
    </View>
  );
}
