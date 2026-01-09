import { useState, useEffect, useMemo, useContext } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, Platform } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
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
import { useColors } from "@/hooks/use-colors";

export default function SearchScreen() {
  const router = useRouter();
  const colors = useColors();
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

  return (
    <ScreenContainer edges={["top", "left", "right"]}>
      <View className="flex-1">
        {/* 搜尋框 */}
        <View className="px-6 py-4 border-b border-border">
          <View className="flex-row items-center bg-surface rounded-xl px-4 py-3 border border-border gap-2">
            <IconSymbol name="magnifyingglass" size={20} color={colors.muted} />
            <TextInput
              className="flex-1 text-foreground"
              placeholder="搜尋學校名稱、地區或類型"
              placeholderTextColor={colors.muted}
              value={searchQuery}
              onChangeText={setSearchQuery}
              returnKeyType="search"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery("")}
              >
                <IconSymbol name="xmark" size={18} color={colors.muted} />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={handleOpenFilterSheet}
              className="pl-2 border-l border-border"
              hitSlop={8}
            >
              <IconSymbol name="slider.horizontal.3" size={20} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* 活躍篩選標籤 */}
        <ActiveFilterTags />

        {/* 結果統計 */}
        <View className="px-6 py-3">
          <Text className="text-sm text-muted">
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
          contentContainerStyle={{ paddingVertical: 8 }}
          ListEmptyComponent={
            <View className="items-center justify-center py-20">
              <Text className="text-muted text-center">沒有找到符合條件的學校</Text>
            </View>
          }
        />

        {/* 免責聲明 */}
        <View className="px-6 py-3 border-t border-border">
          <Text className="text-xs text-muted text-center">
            資訊基於公開資料整理，僅供參考，以學校官方為準
          </Text>
        </View>
      </View>
    </ScreenContainer>
  );
}
