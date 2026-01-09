import { View, Text, TouchableOpacity, Platform, ScrollView } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useRouter } from "expo-router";
import { useColors } from "@/hooks/use-colors";
import * as Haptics from "expo-haptics";

/**
 * 首頁 - 問答引導模式入口
 * 穩重活力風格設計
 */
export default function HomeScreen() {
  const router = useRouter();
  const colors = useColors();

  const handleStartQuiz = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    router.push("/quiz");
  };

  const handleBrowseAll = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.push("/(tabs)/search");
  };

  const handleExplore = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.push("/(tabs)/explore");
  };

  return (
    <ScreenContainer className="flex-1" containerClassName="bg-background">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 justify-center px-6 py-8 gap-10">
          {/* Hero Section - 標題與描述 */}
          <View className="items-center gap-4">
            <Text
              className="text-5xl font-bold text-center"
              style={{ color: colors.foreground, lineHeight: 56 }}
            >
              找到最適合該子的學校
            </Text>
            <Text
              className="text-base text-center leading-relaxed"
              style={{ color: colors.muted }}
            >
              5 個問題，精準推薦香港優質學校
            </Text>
          </View>

          {/* 主按鈕 - 開始選校 */}
          <View className="gap-3">
            <TouchableOpacity
              onPress={handleStartQuiz}
              className="py-4 rounded-full active:opacity-90"
              style={{
                backgroundColor: colors.primary,
                shadowColor: colors.primary,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 5,
              }}
            >
              <Text
                className="text-lg font-semibold text-center"
                style={{ color: colors.background }}
              >
                開始選校
              </Text>
            </TouchableOpacity>

            {/* 次要按鈕 - 瀏覽所有學校 */}
            <TouchableOpacity
              onPress={handleBrowseAll}
              className="py-3 rounded-full border-2 active:opacity-80"
              style={{
                borderColor: colors.primary,
                backgroundColor: "transparent",
              }}
            >
              <Text
                className="text-base font-semibold text-center"
                style={{ color: colors.primary }}
              >
                瀏覽所有學校
              </Text>
            </TouchableOpacity>

            {/* 第三按鈕 - 探索學校 */}
            <TouchableOpacity
              onPress={handleExplore}
              className="py-3 rounded-full border active:opacity-70"
              style={{
                borderColor: colors.border,
                backgroundColor: colors.surface,
              }}
            >
              <Text
                className="text-base font-semibold text-center"
                style={{ color: colors.foreground }}
              >
                探索學校
              </Text>
            </TouchableOpacity>
          </View>

          {/* 推薦功能卡片 */}
          <View className="gap-3 mt-4">
            <Text
              className="text-sm font-semibold px-2"
              style={{ color: colors.muted }}
            >
              推薦功能
            </Text>
            <View className="flex-row gap-3">
              <TouchableOpacity
                onPress={handleBrowseAll}
                className="flex-1 p-4 rounded-2xl active:opacity-70"
                style={{
                  backgroundColor: colors.surface,
                  borderWidth: 1,
                  borderColor: colors.border,
                }}
              >
                <Text
                  className="text-sm font-semibold text-center"
                  style={{ color: colors.foreground }}
                >
                  📚 最新文章
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleBrowseAll}
                className="flex-1 p-4 rounded-2xl active:opacity-70"
                style={{
                  backgroundColor: colors.surface,
                  borderWidth: 1,
                  borderColor: colors.border,
                }}
              >
                <Text
                  className="text-sm font-semibold text-center"
                  style={{ color: colors.foreground }}
                >
                  👨‍👩‍👧 家長指南
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* 免責聲明 */}
          <View className="mt-auto">
            <Text
              className="text-xs text-center leading-relaxed"
              style={{ color: colors.muted }}
            >
              資訊基於公開資料整理，僅供參考，以學校官方為準
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
