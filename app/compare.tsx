import { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Platform } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useRouter } from "expo-router";
import { SCHOOLS } from "@/data/schools";
import { CompareStorage } from "@/lib/storage";
import { formatTuitionRange } from "@/types/school";
import type { School } from "@/types/school";
import * as Haptics from "expo-haptics";

export default function CompareScreen() {
  const router = useRouter();
  const [compareSchools, setCompareSchools] = useState<School[]>([]);

  useEffect(() => {
    loadCompareSchools();
  }, []);

  const loadCompareSchools = async () => {
    const compareIds = await CompareStorage.getAll();
    const schools = SCHOOLS.filter((school) => compareIds.includes(school.id));
    setCompareSchools(schools);
  };

  const handleClearAll = async () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    await CompareStorage.clear();
    router.back();
  };

  if (compareSchools.length === 0) {
    return (
      <ScreenContainer className="justify-center items-center">
        <Text className="text-muted">尚未加入對比學校</Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer edges={["top", "left", "right"]}>
      <View className="flex-1">
        <View className="px-6 py-4 border-b border-border">
          <Text className="text-2xl font-bold text-foreground">
            學校對比 ({compareSchools.length}/3)
          </Text>
        </View>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {/* 學校名稱 */}
          <CompareRow label="學校名稱">
            {compareSchools.map((school) => (
              <Text key={school.id} className="text-foreground font-semibold">
                {school.name}
              </Text>
            ))}
          </CompareRow>

          {/* 學校類型 */}
          <CompareRow label="學校類型">
            {compareSchools.map((school) => (
              <Text key={school.id} className="text-foreground">
                {school.category}
              </Text>
            ))}
          </CompareRow>

          {/* 學段 */}
          <CompareRow label="學段">
            {compareSchools.map((school) => (
              <Text key={school.id} className="text-foreground">
                {school.level}
              </Text>
            ))}
          </CompareRow>

          {/* 地區 */}
          <CompareRow label="地區">
            {compareSchools.map((school) => (
              <Text key={school.id} className="text-foreground">
                {school.district}
              </Text>
            ))}
          </CompareRow>

          {/* 學費 */}
          <CompareRow label="學費">
            {compareSchools.map((school) => (
              <Text key={school.id} className="text-foreground">
                {formatTuitionRange(school.tuitionMin, school.tuitionMax)}
              </Text>
            ))}
          </CompareRow>

          {/* 課程體系 */}
          <CompareRow label="課程體系">
            {compareSchools.map((school) => (
              <Text key={school.id} className="text-foreground">
                {school.curriculum.join(", ")}
              </Text>
            ))}
          </CompareRow>

          {/* 教學語言 */}
          <CompareRow label="教學語言">
            {compareSchools.map((school) => (
              <Text key={school.id} className="text-foreground">
                {school.language}
              </Text>
            ))}
          </CompareRow>

          {/* 學校亮點 */}
          <CompareRow label="學校亮點">
            {compareSchools.map((school) => (
              <View key={school.id} className="gap-1">
                {school.highlights.map((highlight, index) => (
                  <Text key={index} className="text-foreground text-sm">
                    • {highlight}
                  </Text>
                ))}
              </View>
            ))}
          </CompareRow>

          <View className="px-6 py-4">
            <Text className="text-xs text-muted text-center">
              資訊基於公開資料整理，僅供參考，以學校官方為準
            </Text>
          </View>
        </ScrollView>

        <View className="px-6 py-4 border-t border-border">
          <TouchableOpacity
            onPress={handleClearAll}
            className="bg-surface py-3 rounded-xl border border-border active:opacity-70"
          >
            <Text className="text-foreground text-base font-medium text-center">
              清空對比列表
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenContainer>
  );
}

function CompareRow({ label, children }: { label: string; children: React.ReactNode[] }) {
  return (
    <View className="px-6 py-4 border-b border-border">
      <Text className="text-sm text-muted mb-2">{label}</Text>
      <View className="flex-row gap-4">
        {children.map((child, index) => (
          <View key={index} className="flex-1">
            {child}
          </View>
        ))}
      </View>
    </View>
  );
}
