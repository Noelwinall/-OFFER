import { View, Text, ScrollView, TouchableOpacity, Platform } from "react-native";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useFilter, getFilterLabels } from "@/lib/filter-context";
import { useColors } from "@/hooks/use-colors";
import * as Haptics from "expo-haptics";

export function ActiveFilterTags() {
  const colors = useColors();
  const { state, dispatch } = useFilter();

  const labels = getFilterLabels(state);

  if (labels.length === 0) {
    return null;
  }

  const handleRemoveFilter = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    dispatch({ type: "RESET_FILTERS" });
  };

  return (
    <View className="px-6 py-3 border-b border-border">
      <View className="flex-row items-center justify-between mb-2">
        <Text className="text-xs text-muted">活躍篩選</Text>
        <TouchableOpacity onPress={handleRemoveFilter} hitSlop={8}>
          <Text className="text-xs text-primary font-medium">清空全部</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="gap-2"
      >
        {labels.map((label, index) => (
          <View
            key={index}
            className="bg-primary/10 px-3 py-1.5 rounded-full flex-row items-center gap-2"
          >
            <Text className="text-xs text-primary font-medium">{label}</Text>
            <TouchableOpacity
              onPress={() => {
                if (Platform.OS !== "web") {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }
                // 移除該篩選條件的邏輯
                // 這裡需要根據 label 類型移除相應的篩選
              }}
              hitSlop={6}
            >
              <IconSymbol name="xmark" size={14} color={colors.primary} />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
