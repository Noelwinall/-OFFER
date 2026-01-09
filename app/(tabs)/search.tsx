import { useState, useEffect } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, Platform } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { SchoolCard } from "@/components/school-card";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useRouter } from "expo-router";
import { SCHOOLS } from "@/data/schools";
import { FavoritesStorage } from "@/lib/storage";
import type { School } from "@/types/school";
import * as Haptics from "expo-haptics";
import { useColors } from "@/hooks/use-colors";

export default function SearchScreen() {
  const router = useRouter();
  const colors = useColors();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSchools, setFilteredSchools] = useState<School[]>(SCHOOLS);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  useEffect(() => {
    filterSchools();
  }, [searchQuery]);

  const loadFavorites = async () => {
    const favs = await FavoritesStorage.getAll();
    setFavorites(favs);
  };

  const filterSchools = () => {
    if (!searchQuery.trim()) {
      setFilteredSchools(SCHOOLS);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = SCHOOLS.filter(
      (school) =>
        school.name.toLowerCase().includes(query) ||
        school.district.toLowerCase().includes(query) ||
        school.category.toLowerCase().includes(query)
    );
    setFilteredSchools(filtered);
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

  return (
    <ScreenContainer edges={["top", "left", "right"]}>
      <View className="flex-1">
        {/* 搜尋框 */}
        <View className="px-6 py-4 border-b border-border">
          <View className="flex-row items-center bg-surface rounded-xl px-4 py-3 border border-border">
            <IconSymbol name="magnifyingglass" size={20} color={colors.muted} />
            <TextInput
              className="flex-1 ml-2 text-foreground"
              placeholder="搜尋學校名稱、地區或類型"
              placeholderTextColor={colors.muted}
              value={searchQuery}
              onChangeText={setSearchQuery}
              returnKeyType="search"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <IconSymbol name="xmark" size={18} color={colors.muted} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* 結果統計 */}
        <View className="px-6 py-3">
          <Text className="text-sm text-muted">
            找到 {filteredSchools.length} 所學校
          </Text>
        </View>

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
