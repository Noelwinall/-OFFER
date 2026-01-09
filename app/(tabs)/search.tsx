import { useState, useEffect, useMemo, useContext } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, Platform, StyleSheet, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SchoolCard } from "@/components/school-card";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { FilterSheet } from "@/components/filter-sheet";
import { ActiveFilterTags } from "@/components/active-filter-tags";
import { useRouter } from "expo-router";
import { SCHOOLS } from "@/data/schools";
import { FavoritesStorage } from "@/lib/storage";
import { FilterContext } from "@/lib/filter-context";
import { filterSchools, sortSearchResults } from "@/lib/filter-logic";
import type { School } from "@/types/school";
import * as Haptics from "expo-haptics";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// 快捷功能入口
const QUICK_ACTIONS = [
  {
    id: "compare",
    title: "學校大PK",
    subtitle: "對比不同學校",
    icon: "⚔️",
    route: "/compare-guide",
    color: "#7C3AED",
  },
  {
    id: "map",
    title: "學校在哪裡",
    subtitle: "按地區查看",
    icon: "📍",
    route: "/school-map",
    color: "#10B981",
  },
  {
    id: "deadline",
    title: "申請截止日",
    subtitle: "重要時間線",
    icon: "⏰",
    route: "/deadlines",
    color: "#F59E0B",
  },
];

export default function SearchScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const filterContext = useContext(FilterContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilterSheet, setShowFilterSheet] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  if (!filterContext) {
    throw new Error("SearchScreen must be used within FilterProvider");
  }

  const { state: filters } = filterContext;

  useEffect(() => {
    loadFavorites();
  }, []);

  // 使用 useMemo 優化篩選邏輯
  const filteredSchools = useMemo(() => {
    const results = filterSchools(SCHOOLS, searchQuery, filters);
    return sortSearchResults(results, searchQuery, filters);
  }, [searchQuery, filters]);

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

  const handleOpenFilterSheet = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setShowFilterSheet(true);
  };

  const handleQuickAction = (route: string) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.push(route as any);
  };

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={["#0F1629", "#1a2744", "#1e3a5f", "#1a2744"]}
        locations={[0, 0.3, 0.7, 1]}
        style={StyleSheet.absoluteFill}
      />
      
      <View style={[styles.container, { paddingTop: insets.top }]}>
        {/* 頁面標題 */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>搜尋學校</Text>
          <Text style={styles.headerSubtitle}>探索香港優質學校</Text>
        </View>

        {/* 快捷功能入口 */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.quickActionsContainer}
        >
          {QUICK_ACTIONS.map((action) => (
            <TouchableOpacity
              key={action.id}
              style={styles.quickActionCard}
              onPress={() => handleQuickAction(action.route)}
              activeOpacity={0.7}
            >
              <View style={[styles.quickActionIconContainer, { backgroundColor: `${action.color}20` }]}>
                <Text style={styles.quickActionIcon}>{action.icon}</Text>
              </View>
              <Text style={styles.quickActionTitle}>{action.title}</Text>
              <Text style={styles.quickActionSubtitle}>{action.subtitle}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* 搜尋框 */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBox}>
            <IconSymbol name="magnifyingglass" size={20} color="rgba(255,255,255,0.5)" />
            <TextInput
              style={styles.searchInput}
              placeholder="搜尋學校名稱、地區或類型"
              placeholderTextColor="rgba(255,255,255,0.4)"
              value={searchQuery}
              onChangeText={setSearchQuery}
              returnKeyType="search"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <IconSymbol name="xmark" size={18} color="rgba(255,255,255,0.5)" />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={handleOpenFilterSheet}
              style={styles.filterButton}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <IconSymbol name="slider.horizontal.3" size={20} color="#00D9FF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* 活躍篩選標籤 */}
        <ActiveFilterTags />

        {/* 結果統計 */}
        <View style={styles.resultStats}>
          <Text style={styles.resultText}>
            找到 {filteredSchools.length} 所學校
          </Text>
        </View>

        {/* 篩選面板 */}
        <FilterSheet visible={showFilterSheet} onClose={() => setShowFilterSheet(false)} />

        {/* 學校列表 */}
        <FlatList
          data={filteredSchools}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <SchoolCard
              school={item}
              isFavorite={favorites.includes(item.id)}
              onPress={() => handleSchoolPress(item.id)}
              onFavoritePress={() => handleFavoriteToggle(item.id)}
            />
          )}
          contentContainerStyle={{ paddingVertical: 8, paddingBottom: 100 }}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>沒有找到符合條件的學校</Text>
            </View>
          }
        />

        {/* 免責聲明 */}
        <View style={styles.disclaimerContainer}>
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
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Bold",
    letterSpacing: 1,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.6)",
    fontFamily: "NotoSerifSC-Regular",
    marginTop: 4,
  },
  quickActionsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 12,
  },
  quickActionCard: {
    width: 100,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 16,
    padding: 12,
    alignItems: "center",
    marginRight: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  quickActionIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  quickActionIcon: {
    fontSize: 20,
  },
  quickActionTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Bold",
    textAlign: "center",
    marginBottom: 2,
  },
  quickActionSubtitle: {
    fontSize: 10,
    color: "rgba(255,255,255,0.5)",
    fontFamily: "NotoSerifSC-Regular",
    textAlign: "center",
  },
  searchContainer: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    gap: 12,
  },
  searchInput: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "NotoSerifSC-Regular",
  },
  filterButton: {
    paddingLeft: 12,
    borderLeftWidth: 1,
    borderLeftColor: "rgba(255,255,255,0.2)",
  },
  resultStats: {
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  resultText: {
    fontSize: 14,
    color: "rgba(255,255,255,0.6)",
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
  disclaimerContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: "rgba(15, 22, 41, 0.9)",
  },
  disclaimerText: {
    fontSize: 11,
    color: "rgba(255,255,255,0.35)",
    textAlign: "center",
    fontFamily: "NotoSerifSC-Regular",
  },
});
