import { View, Text, TouchableOpacity } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useRouter } from "expo-router";

export default function ExploreScreen() {
  const router = useRouter();

  return (
    <ScreenContainer className="justify-center items-center px-6">
      <View className="items-center gap-4">
        <Text className="text-4xl">🎯</Text>
        <Text className="text-2xl font-bold text-foreground text-center">
          探索功能即將推出
        </Text>
        <Text className="text-muted text-center">
          滑卡探索模式正在開發中，敬請期待
        </Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className="bg-primary px-6 py-3 rounded-xl active:opacity-80 mt-4"
        >
          <Text className="text-white font-semibold">返回</Text>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
}
