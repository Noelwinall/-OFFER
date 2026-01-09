import { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Platform } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { SchoolCard } from "@/components/school-card";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SCHOOLS } from "@/data/schools";
import { getSortedRecommendations } from "@/lib/recommendation";
import { FavoritesStorage } from "@/lib/storage";
import type { QuizFilters, School } from "@/types/school";
import * as Haptics from "expo-haptics";

export default function RecommendationScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [recommendations, setRecommendations] = useState<School[]>([]);
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

    const results = getSortedRecommendations(SCHOOLS, filters);
    setRecommendations(results);
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

  const handleRestart = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.back();
  };

  return (
    <ScreenContainer edges={["top", "left", "right"]}>
      <View className="flex-1">
        <View className="px-6 py-4 border-b border-border">
          <Text className="text-2xl font-bold text-foreground">
            為您推薦 {recommendations.length} 所學校
          </Text>
          {recommendations.length === 0 && (
            <Text className="text-muted mt-2">
              沒有找到符合條件的學校，請調整篩選條件
            </Text>
          )}
        </View>

        <FlatList
          data={recommendations}
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
              <Text className="text-muted text-center">暫無推薦學校</Text>
            </View>
          }
        />

        <View className="px-6 py-4 border-t border-border">
          <TouchableOpacity
            onPress={handleRestart}
            className="bg-surface py-3 rounded-xl border border-border active:opacity-70"
          >
            <Text className="text-foreground text-base font-medium text-center">
              重新篩選
            </Text>
          </TouchableOpacity>
        </View>

        <View className="px-6 pb-4">
          <Text className="text-xs text-muted text-center">
            資訊基於公開資料整理，僅供參考，以學校官方為準
          </Text>
        </View>
      </View>
    </ScreenContainer>
  );
}
