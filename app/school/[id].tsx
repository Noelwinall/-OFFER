import { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Platform, Alert, Linking } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SCHOOLS } from "@/data/schools";
import { FavoritesStorage, CompareStorage } from "@/lib/storage";
import { formatTuitionRange } from "@/types/school";
import type { School } from "@/types/school";
import * as Haptics from "expo-haptics";
import * as Clipboard from "expo-clipboard";

export default function SchoolDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [school, setSchool] = useState<School | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isInCompare, setIsInCompare] = useState(false);

  useEffect(() => {
    loadSchool();
    loadFavoriteStatus();
    loadCompareStatus();
  }, [params.id]);

  const loadSchool = () => {
    const found = SCHOOLS.find((s) => s.id === params.id);
    setSchool(found || null);
  };

  const loadFavoriteStatus = async () => {
    const status = await FavoritesStorage.isFavorite(params.id as string);
    setIsFavorite(status);
  };

  const loadCompareStatus = async () => {
    const status = await CompareStorage.isInCompare(params.id as string);
    setIsInCompare(status);
  };

  const handleFavoriteToggle = async () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    await FavoritesStorage.toggle(params.id as string);
    await loadFavoriteStatus();
  };

  const handleAddToCompare = async () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    if (isInCompare) {
      await CompareStorage.remove(params.id as string);
      await loadCompareStatus();
      return;
    }

    const success = await CompareStorage.add(params.id as string);
    if (success) {
      await loadCompareStatus();
    } else {
      Alert.alert("提示", "對比列表已滿（最多 3 所學校）");
    }
  };

  const handleCopyLink = async () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    if (school?.applicationLink) {
      await Clipboard.setStringAsync(school.applicationLink);
      Alert.alert("成功", "申請連結已複製到剪貼簿");
    }
  };

  const handleOpenWebsite = () => {
    if (school?.website) {
      Linking.openURL(school.website);
    }
  };

  if (!school) {
    return (
      <ScreenContainer className="justify-center items-center">
        <Text className="text-muted">找不到學校資訊</Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer edges={["top", "left", "right"]}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* 標題與收藏按鈕 */}
        <View className="px-6 py-4 border-b border-border">
          <View className="flex-row items-start justify-between">
            <Text className="text-2xl font-bold text-foreground flex-1 mr-4">
              {school.name}
            </Text>
            <TouchableOpacity onPress={handleFavoriteToggle} hitSlop={8}>
              <IconSymbol
                name="heart.fill"
                size={28}
                color={isFavorite ? "#EF4444" : "#9BA1A6"}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* 基本資訊 */}
        <View className="px-6 py-4 border-b border-border">
          <Text className="text-lg font-semibold text-foreground mb-3">基本資訊</Text>
          <View className="gap-2">
            <InfoRow label="學校類型" value={school.category} />
            <InfoRow label="學段" value={school.level} />
            <InfoRow label="地區" value={school.district} />
            <InfoRow label="學費" value={formatTuitionRange(school.tuitionMin, school.tuitionMax)} />
            <InfoRow label="課程體系" value={school.curriculum.join(", ")} />
            <InfoRow label="教學語言" value={school.language} />
          </View>
        </View>

        {/* 聯絡方式 */}
        <View className="px-6 py-4 border-b border-border">
          <Text className="text-lg font-semibold text-foreground mb-3">聯絡方式</Text>
          <View className="gap-2">
            <InfoRow label="地址" value={school.address} />
            <InfoRow label="電話" value={school.phone} />
            <TouchableOpacity onPress={handleOpenWebsite}>
              <InfoRow label="網站" value={school.website} isLink />
            </TouchableOpacity>
          </View>
        </View>

        {/* 學校亮點 */}
        <View className="px-6 py-4 border-b border-border">
          <Text className="text-lg font-semibold text-foreground mb-3">學校亮點</Text>
          <View className="gap-2">
            {school.highlights.map((highlight, index) => (
              <View key={index} className="flex-row items-start">
                <Text className="text-primary mr-2">•</Text>
                <Text className="text-foreground flex-1">{highlight}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* 申請資訊 */}
        <View className="px-6 py-4 border-b border-border">
          <Text className="text-lg font-semibold text-foreground mb-3">申請資訊</Text>
          <Text className="text-sm text-muted mb-2">所需材料：</Text>
          <View className="gap-1 mb-4">
            {school.applicationMaterials.map((material, index) => (
              <Text key={index} className="text-foreground">
                {index + 1}. {material}
              </Text>
            ))}
          </View>
          <TouchableOpacity
            onPress={handleCopyLink}
            className="bg-primary py-3 rounded-xl active:opacity-80"
          >
            <Text className="text-white text-base font-semibold text-center">
              複製申請連結
            </Text>
          </TouchableOpacity>
        </View>

        {/* 免責聲明 */}
        <View className="px-6 py-4">
          <Text className="text-xs text-muted text-center">
            資訊基於公開資料整理，僅供參考，以學校官方為準
          </Text>
        </View>
      </ScrollView>

      {/* 底部按鈕 */}
      <View className="px-6 py-4 border-t border-border">
        <TouchableOpacity
          onPress={handleAddToCompare}
          className="bg-surface py-3 rounded-xl border border-border active:opacity-70"
        >
          <Text className="text-foreground text-base font-medium text-center">
            {isInCompare ? "從對比中移除" : "加入對比"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
}

function InfoRow({ label, value, isLink = false }: { label: string; value: string; isLink?: boolean }) {
  return (
    <View className="flex-row">
      <Text className="text-muted w-20">{label}</Text>
      <Text className={`text-foreground flex-1 ${isLink ? "underline" : ""}`}>
        {value}
      </Text>
    </View>
  );
}
