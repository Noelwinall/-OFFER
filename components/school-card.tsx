import React from "react";
import { View, Text, Pressable, StyleSheet, Platform } from "react-native";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { isInternational } from "@/lib/international-schools";
import { formatTuitionDisplay } from "@/constants/school-text";
import type { School } from "@/types/school";
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
 * v0 字段: name/nameEn/category/level/district
 */
export const SchoolCard = React.memo(function SchoolCard({
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

      {/* 學校類型標籤 - 只显示 v0 字段 */}
      <View className="flex-row items-center flex-wrap gap-1">
        <View
          className="px-2 py-1 rounded"
          style={{ backgroundColor: getDisplayTypeColor(school) }}
        >
          <Text className="text-xs font-semibold text-white">
            {getDisplayType(school)}
          </Text>
        </View>
        <View className="px-2 py-1 rounded bg-gray-600/30">
          <Text className="text-xs text-muted">{school.level}</Text>
        </View>
        <View className="px-2 py-1 rounded bg-gray-600/30">
          <Text className="text-xs text-muted">{school.district}</Text>
        </View>
      </View>

      {/* 學費資訊 - R3-4 */}
      <Text className="text-xs text-muted mt-2">
        {formatTuitionDisplay(school.category, school.tuitionMin, school.tuitionMax)}
      </Text>
    </Pressable>
  );
}, (prev, next) =>
  prev.school.id === next.school.id &&
  prev.isFavorite === next.isFavorite
);

/**
 * 獲取學校顯示類型（國際學校優先）
 */
function getDisplayType(school: School): string {
  return isInternational(school) ? "國際" : school.category;
}

/**
 * 根據學校顯示類型返回對應顏色
 */
function getDisplayTypeColor(school: School): string {
  const colors: Record<string, string> = {
    國際: "#00D9FF",
    資助: "#6B5B95",
    直資: "#E8756F",
    私立: "#7C3AED",
    公立: "#3B82F6",
  };
  const displayType = getDisplayType(school);
  return colors[displayType] || colors["私立"];
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
