import { View, Text, Pressable, StyleSheet, Platform } from "react-native";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import type { School } from "@/types/school";
import { formatTuitionRange } from "@/types/school";
import * as Haptics from "expo-haptics";

interface SchoolCardProps {
  school: School;
  isFavorite?: boolean;
  onPress?: () => void;
  onFavoritePress?: () => void;
}

/**
 * 統一學校卡片組件
 * 用於所有學校列表展示場景
 */
export function SchoolCard({
  school,
  isFavorite = false,
  onPress,
  onFavoritePress,
}: SchoolCardProps) {
  const colors = useColors();

  const handleFavoritePress = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onFavoritePress?.();
  };

  const handleCardPress = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onPress?.();
  };

  return (
    <Pressable
      onPress={handleCardPress}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
        },
        pressed && styles.cardPressed,
      ]}
    >
      {/* 學校名稱與收藏按鈕 */}
      <View className="flex-row items-start justify-between mb-1">
        <View className="flex-1 mr-2">
          <Text
            className="text-lg font-bold text-foreground"
            numberOfLines={2}
          >
            {school.name}
          </Text>
          {school.nameEn && (
            <Text
              className="text-xs text-muted mt-0.5"
              numberOfLines={1}
            >
              {school.nameEn}
            </Text>
          )}
        </View>
        <Pressable
          onPress={handleFavoritePress}
          hitSlop={8}
          style={({ pressed }) => [pressed && { opacity: 0.6 }]}
        >
          <IconSymbol
            name="heart.fill"
            size={24}
            color={isFavorite ? "#EF4444" : colors.muted}
          />
        </Pressable>
      </View>

      {/* 學校類型標籤 */}
      <View className="flex-row items-center mb-2">
        <View
          className="px-2 py-1 rounded"
          style={{ backgroundColor: getCategoryColor(school.category) }}
        >
          <Text className="text-xs font-semibold text-white">
            {school.category}
          </Text>
        </View>
        <Text className="text-xs text-muted ml-2">{school.level}</Text>
      </View>

      {/* 地區與學費 */}
      <View className="mb-3">
        <Text className="text-sm text-muted">
          {school.district} • {formatTuitionRange(school.tuitionMin, school.tuitionMax, school.category)}
        </Text>
        <Text className="text-xs text-muted mt-1" style={{ opacity: 0.6 }}>
          主要費用估算：學費 + 必要 levy / 建校費；不含校車、午餐等雜費。
        </Text>
      </View>

      {/* 亮點 Snapshot */}
      <View className="gap-1">
        {school.highlights.slice(0, 3).map((highlight, index) => (
          <View key={index} className="flex-row items-start">
            <Text className="text-muted mr-1">•</Text>
            <Text className="text-sm text-foreground flex-1" numberOfLines={1}>
              {highlight}
            </Text>
          </View>
        ))}
      </View>
    </Pressable>
  );
}

/**
 * 根據學校類型返回對應顏色 - 穩重活力風格
 */
function getCategoryColor(category: School["category"]): string {
  const colors: Record<School["category"], string> = {
    國際: "#00D9FF",
    資助: "#6B5B95",
    直資: "#E8756F",
    私立: "#7C3AED",
    公立: "#3B82F6",
  };
  return colors[category];
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardPressed: {
    opacity: 0.85,
  },
});
