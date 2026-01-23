import { useState, useEffect, useCallback } from "react";
import { View, Text, ScrollView, TouchableOpacity, Platform } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useRouter } from "expo-router";
import { SCHOOLS } from "@/data/schools";
import { CompareStorage } from "@/lib/storage";
import { formatTuitionRange } from "@/types/school";
import type { School } from "@/types/school";
import * as Haptics from "expo-haptics";
import {
  type FeaturedCategory,
  FEATURED_CATEGORY_INFO,
  getFeaturedSchoolsForFree,
  getFeaturedSchoolsForPro,
  getNewRandomPair,
} from "@/lib/featured-compare";

// TODO: Replace with actual user auth state
const IS_PRO_USER = false;

export default function CompareScreen() {
  const router = useRouter();
  const [compareSchools, setCompareSchools] = useState<School[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<FeaturedCategory | null>(null);
  const [featuredSchools, setFeaturedSchools] = useState<School[]>([]);

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

  const handleSelectCategory = useCallback((category: FeaturedCategory) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setSelectedCategory(category);
    const schools = IS_PRO_USER
      ? getFeaturedSchoolsForPro(category)
      : getFeaturedSchoolsForFree(category);
    setFeaturedSchools(schools);
  }, []);

  const handleRefreshPair = useCallback(() => {
    if (!selectedCategory || IS_PRO_USER) return;
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    const newPair = getNewRandomPair(selectedCategory);
    setFeaturedSchools(newPair);
  }, [selectedCategory]);

  const handleBackToCategories = useCallback(() => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setSelectedCategory(null);
    setFeaturedSchools([]);
  }, []);

  // Empty state: Show featured categories
  if (compareSchools.length === 0) {
    return (
      <ScreenContainer edges={["top", "left", "right"]}>
        <FeaturedCompareView
          selectedCategory={selectedCategory}
          featuredSchools={featuredSchools}
          onSelectCategory={handleSelectCategory}
          onRefreshPair={handleRefreshPair}
          onBackToCategories={handleBackToCategories}
          isPro={IS_PRO_USER}
        />
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

/**
 * Featured Compare View - Shown when compare list is empty
 */
function FeaturedCompareView({
  selectedCategory,
  featuredSchools,
  onSelectCategory,
  onRefreshPair,
  onBackToCategories,
  isPro,
}: {
  selectedCategory: FeaturedCategory | null;
  featuredSchools: School[];
  onSelectCategory: (category: FeaturedCategory) => void;
  onRefreshPair: () => void;
  onBackToCategories: () => void;
  isPro: boolean;
}) {
  const categories: FeaturedCategory[] = ["KG", "INTERNATIONAL", "DSS"];

  // Show category selection
  if (!selectedCategory) {
    return (
      <View className="flex-1">
        <View className="px-6 py-4 border-b border-border">
          <Text className="text-2xl font-bold text-foreground">精選對比</Text>
          <Text className="text-sm text-muted mt-1">
            選擇類別，快速對比香港頂尖學校
          </Text>
        </View>

        <ScrollView className="flex-1 px-6 py-4" showsVerticalScrollIndicator={false}>
          <View className="gap-4">
            {categories.map((category) => {
              const info = FEATURED_CATEGORY_INFO[category];
              return (
                <TouchableOpacity
                  key={category}
                  onPress={() => onSelectCategory(category)}
                  className="bg-surface border border-border rounded-xl p-4 active:opacity-70"
                >
                  <Text className="text-lg font-semibold text-foreground">
                    {info.label}
                  </Text>
                  <Text className="text-sm text-muted mt-1">
                    {info.description}
                  </Text>
                  <View className="flex-row items-center mt-3">
                    <View className="bg-primary/10 px-2 py-1 rounded">
                      <Text className="text-xs text-primary font-medium">
                        {isPro ? "5間精選學校" : "2間隨機精選"}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          <View className="mt-6 p-4 bg-surface/50 rounded-xl border border-border">
            <Text className="text-sm text-muted text-center">
              {isPro
                ? "Pro 用戶可查看每個類別的 5 間精選學校"
                : "免費用戶可查看每個類別的 2 間隨機精選學校"}
            </Text>
            {!isPro && (
              <Text className="text-xs text-muted text-center mt-2">
                升級 Pro 解鎖更多精選學校對比
              </Text>
            )}
          </View>
        </ScrollView>
      </View>
    );
  }

  // Show featured schools comparison
  const categoryInfo = FEATURED_CATEGORY_INFO[selectedCategory];

  return (
    <View className="flex-1">
      <View className="px-6 py-4 border-b border-border">
        <View className="flex-row items-center gap-2">
          <TouchableOpacity onPress={onBackToCategories} className="active:opacity-70">
            <Text className="text-primary text-base">← 返回</Text>
          </TouchableOpacity>
        </View>
        <Text className="text-2xl font-bold text-foreground mt-2">
          {categoryInfo.label}
        </Text>
        <Text className="text-sm text-muted mt-1">
          {categoryInfo.description}
        </Text>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* 學校名稱 */}
        <CompareRow label="學校名稱">
          {featuredSchools.map((school) => (
            <Text key={school.id} className="text-foreground font-semibold">
              {school.name}
            </Text>
          ))}
        </CompareRow>

        {/* 學校類型 */}
        <CompareRow label="學校類型">
          {featuredSchools.map((school) => (
            <Text key={school.id} className="text-foreground">
              {school.category}
            </Text>
          ))}
        </CompareRow>

        {/* 學段 */}
        <CompareRow label="學段">
          {featuredSchools.map((school) => (
            <Text key={school.id} className="text-foreground">
              {school.level}
            </Text>
          ))}
        </CompareRow>

        {/* 地區 */}
        <CompareRow label="地區">
          {featuredSchools.map((school) => (
            <Text key={school.id} className="text-foreground">
              {school.district}
            </Text>
          ))}
        </CompareRow>

        {/* 學費 */}
        <CompareRow label="學費">
          {featuredSchools.map((school) => (
            <Text key={school.id} className="text-foreground">
              {formatTuitionRange(school.tuitionMin, school.tuitionMax)}
            </Text>
          ))}
        </CompareRow>

        {/* 課程體系 */}
        <CompareRow label="課程體系">
          {featuredSchools.map((school) => (
            <Text key={school.id} className="text-foreground">
              {school.curriculum.join(", ")}
            </Text>
          ))}
        </CompareRow>

        {/* 教學語言 */}
        <CompareRow label="教學語言">
          {featuredSchools.map((school) => (
            <Text key={school.id} className="text-foreground">
              {school.language}
            </Text>
          ))}
        </CompareRow>

        {/* 學校亮點 */}
        <CompareRow label="學校亮點">
          {featuredSchools.map((school) => (
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

      {/* Bottom action bar */}
      <View className="px-6 py-4 border-t border-border gap-3">
        {!isPro && (
          <TouchableOpacity
            onPress={onRefreshPair}
            className="bg-primary py-3 rounded-xl active:opacity-70"
          >
            <Text className="text-white text-base font-medium text-center">
              換一組
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={onBackToCategories}
          className="bg-surface py-3 rounded-xl border border-border active:opacity-70"
        >
          <Text className="text-foreground text-base font-medium text-center">
            選擇其他類別
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
