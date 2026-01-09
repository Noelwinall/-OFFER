import { View, Text, TouchableOpacity, Platform } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";

/**
 * 首頁 - 問答引導模式入口
 */
export default function HomeScreen() {
  const router = useRouter();

  const handleStartQuiz = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.push("/quiz");
  };

  return (
    <ScreenContainer className="justify-center items-center px-6">
      <View className="w-full max-w-md gap-8">
        {/* Hero Section */}
        <View className="items-center gap-3">
          <Text className="text-4xl font-bold text-foreground text-center">
            找到最適合孩子的學校
          </Text>
          <Text className="text-base text-muted text-center leading-relaxed">
            5 個問題，精準推薦香港優質學校
          </Text>
        </View>

        {/* 主按鈕 - 開始選校 */}
        <TouchableOpacity
          onPress={handleStartQuiz}
          className="bg-primary py-4 rounded-2xl active:opacity-80"
          style={{ transform: [{ scale: 1 }] }}
        >
          <Text className="text-white text-lg font-semibold text-center">
            開始選校
          </Text>
        </TouchableOpacity>

        {/* 次要入口 */}
        <View className="gap-3">
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/search")}
            className="bg-surface py-3 rounded-xl border border-border active:opacity-70"
          >
            <Text className="text-foreground text-base font-medium text-center">
              瀏覽所有學校
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/(tabs)/explore")}
            className="bg-surface py-3 rounded-xl border border-border active:opacity-70"
          >
            <Text className="text-foreground text-base font-medium text-center">
              探索學校
            </Text>
          </TouchableOpacity>
        </View>

        {/* 免責聲明 */}
        <Text className="text-xs text-muted text-center mt-8">
          資訊基於公開資料整理，僅供參考，以學校官方為準
        </Text>
      </View>
    </ScreenContainer>
  );
}
