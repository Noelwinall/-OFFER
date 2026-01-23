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

// Report school card component
function ReportSchoolCard({
  school,
  matchScore,
  matchSummary,
  isFavorite,
  onPress,
  onFavoritePress,
  isLoading,
}: {
  school: School;
  matchScore: number;
  matchSummary: string;
  isFavorite: boolean;
  onPress: () => void;
  onFavoritePress: () => void;
  isLoading: boolean;
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
            color={isFavorite ? "#EF4444" : "rgba(255,255,255,0.5)"}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.schoolName}>{school.name}</Text>

      <View style={styles.tagsRow}>
        <View style={[styles.tag, { backgroundColor: getCategoryColor(school.category) }]}>
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
            <ActivityIndicator size="small" color="#00D9FF" />
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

function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    "國際": "#00D9FF",
    "資助": "#6B5B95",
    "直資": "#E8756F",
    "私立": "#7C3AED",
    "公立": "#3B82F6",
  };
  return colors[category] || "#6B7280";
}

export default function ReportScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
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
              <IconSymbol name="sparkles" size={20} color="#FFFFFF" />
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
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Regular",
    letterSpacing: 1,
  },
  titleSection: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
  },
  reportTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Bold",
    letterSpacing: 0.5,
  },
  reportSubtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.6)",
    fontFamily: "NotoSerifSC-Regular",
    marginTop: 8,
  },
  schoolCard: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  matchBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,217,255,0.15)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  matchScore: {
    fontSize: 16,
    fontWeight: "700",
    color: "#00D9FF",
    marginRight: 6,
  },
  matchLabel: {
    fontSize: 12,
    color: "#00D9FF",
    fontFamily: "NotoSerifSC-Regular",
  },
  schoolName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Regular",
    marginBottom: 10,
  },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 12,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  tagText: {
    fontSize: 12,
    color: "#FFFFFF",
    fontWeight: "500",
  },
  summaryContainer: {
    backgroundColor: "rgba(255,255,255,0.03)",
    borderRadius: 10,
    padding: 12,
    minHeight: 60,
  },
  summaryText: {
    fontSize: 14,
    color: "rgba(255,255,255,0.85)",
    lineHeight: 22,
    fontFamily: "NotoSerifSC-Regular",
  },
  summaryPlaceholder: {
    fontSize: 14,
    color: "rgba(255,255,255,0.4)",
    fontFamily: "NotoSerifSC-Regular",
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  loadingText: {
    fontSize: 14,
    color: "rgba(255,255,255,0.5)",
    fontFamily: "NotoSerifSC-Regular",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
  },
  emptyText: {
    color: "rgba(255,255,255,0.5)",
    textAlign: "center",
    fontFamily: "NotoSerifSC-Regular",
    fontSize: 16,
  },
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingTop: 16,
    backgroundColor: "rgba(15, 22, 41, 0.98)",
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.1)",
  },
  proButton: {
    borderRadius: 16,
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
    paddingVertical: 16,
    gap: 10,
  },
  proButtonText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Regular",
    letterSpacing: 0.5,
  },
  proBadge: {
    backgroundColor: "rgba(255,255,255,0.25)",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  proBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  proHint: {
    fontSize: 12,
    color: "rgba(255,255,255,0.5)",
    textAlign: "center",
    marginTop: 10,
    fontFamily: "NotoSerifSC-Regular",
  },
  disclaimerText: {
    fontSize: 11,
    color: "rgba(255,255,255,0.35)",
    textAlign: "center",
    fontFamily: "NotoSerifSC-Regular",
    marginTop: 8,
  },
});
