import { useState, useEffect, useMemo, useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity, Platform, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SchoolCard } from "@/components/school-card";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SCHOOLS } from "@/data/schools";
import { getSortedRecommendations, calculateMatchScore, getMatchDescription } from "@/lib/recommendation";
import { FavoritesStorage } from "@/lib/storage";
import { groupSchoolsBySession, type GroupedSchool } from "@/constants/session-grouping";
import type { QuizFilters, School } from "@/types/school";
import * as Haptics from "expo-haptics";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function RecommendationScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams();
  const [recommendations, setRecommendations] = useState<School[]>([]);
  const [currentFilters, setCurrentFilters] = useState<QuizFilters>({});
  const [isRelaxedMatch, setIsRelaxedMatch] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

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

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={["#0F1629", "#1a2744", "#1e3a5f", "#1a2744"]}
        locations={[0, 0.3, 0.7, 1]}
        style={StyleSheet.absoluteFill}
      />
      
      <View style={[styles.container, { paddingTop: insets.top }]}>
        {/* 頂部導航 */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <IconSymbol name="chevron.left" size={24} color="#FFFFFF" />
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
  statsContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
  },
  statsTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Bold",
    letterSpacing: 0.5,
  },
  statsSubtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.6)",
    fontFamily: "NotoSerifSC-Regular",
    marginTop: 8,
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
    backgroundColor: "rgba(15, 22, 41, 0.95)",
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.1)",
  },
  restartButton: {
    backgroundColor: "rgba(255,255,255,0.1)",
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    marginBottom: 12,
  },
  restartButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#FFFFFF",
    textAlign: "center",
    fontFamily: "NotoSerifSC-Regular",
    letterSpacing: 1,
  },
  disclaimerText: {
    fontSize: 11,
    color: "rgba(255,255,255,0.35)",
    textAlign: "center",
    fontFamily: "NotoSerifSC-Regular",
  },
});
