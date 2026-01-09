import { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Platform } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { SchoolCard } from "@/components/school-card";
import { useRouter } from "expo-router";
import { SCHOOLS } from "@/data/schools";
import { FavoritesStorage, CompareStorage } from "@/lib/storage";
import type { School } from "@/types/school";
import * as Haptics from "expo-haptics";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

export default function FavoritesScreen() {
  const router = useRouter();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [favoriteSchools, setFavoriteSchools] = useState<School[]>([]);
  const [compareList, setCompareList] = useState<string[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
      loadCompareList();
    }, [])
  );

  const loadFavorites = async () => {
    const favs = await FavoritesStorage.getAll();
    setFavorites(favs);

    const schools = SCHOOLS.filter((school) => favs.includes(school.id));
    setFavoriteSchools(schools);
  };

  const loadCompareList = async () => {
    const list = await CompareStorage.getAll();
    setCompareList(list);
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

  const handleCompare = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.push("/compare");
  };

  return (
    <ScreenContainer edges={["top", "left", "right"]}>
      <View className="flex-1">
        <View className="px-6 py-4 border-b border-border">
          <Text className="text-2xl font-bold text-foreground">我的收藏</Text>
          <Text className="text-sm text-muted mt-1">
            已收藏 {favoriteSchools.length} 所學校
          </Text>
        </View>

        <FlatList
          data={favoriteSchools}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <SchoolCard
              school={item}
              isFavorite={true}
              onPress={() => handleSchoolPress(item.id)}
              onFavoritePress={() => handleFavoriteToggle(item.id)}
            />
          )}
          contentContainerStyle={{ paddingVertical: 8 }}
          ListEmptyComponent={
            <View className="items-center justify-center py-20">
              <Text className="text-muted text-center mb-2">尚未收藏任何學校</Text>
              <Text className="text-xs text-muted text-center">
                在學校卡片上點擊愛心圖標即可收藏
              </Text>
            </View>
          }
        />

        {compareList.length > 0 && (
          <View className="px-6 py-4 border-t border-border">
            <TouchableOpacity
              onPress={handleCompare}
              className="bg-primary py-3 rounded-xl active:opacity-80"
            >
              <Text className="text-white text-base font-semibold text-center">
                對比學校 ({compareList.length}/3)
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <View className="px-6 py-3">
          <Text className="text-xs text-muted text-center">
            資訊基於公開資料整理，僅供參考，以學校官方為準
          </Text>
        </View>
      </View>
    </ScreenContainer>
  );
}
