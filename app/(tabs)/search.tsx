import { useState, useEffect, useMemo, useContext, useCallback } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, Platform, StyleSheet, ScrollView } from "react-native";
import { SchoolCard } from "@/components/school-card";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";
import { FilterSheet } from "@/components/filter-sheet";
import { ActiveFilterTags } from "@/components/active-filter-tags";
import { SortSelector } from "@/components/sort-selector";
import { AIBriefSection } from "@/components/ai-brief-section";
import { EnhancedBriefModal } from "@/components/enhanced-brief-modal";
import { canGenerateEnhanced, type UserPlan } from "@/lib/services/briefs";
import { UpgradeModal } from "@/components/upgrade-modal";
import { useRouter, useLocalSearchParams } from "expo-router";
import { schools } from "@/data/schools";
import { FavoritesStorage, MapSetStorage } from "@/lib/storage";
import { FilterContext, hasActiveFilters } from "@/lib/filter-context";
import { filterSchools, sortSearchResults } from "@/lib/filter-logic";
import type { School, Level, District18 } from "@/types/school";
import * as Haptics from "expo-haptics";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDebounce } from "@/hooks/use-debounce";
import { SCHOOL_TEXT } from "@/constants/school-text";
import { groupSchoolsBySession, type GroupedSchool } from "@/lib/school-classification";
import { useColors } from "@/hooks/use-colors";
import { Spacing, SpacingPresets } from "@/constants/spacing";
import { BorderRadius, BorderRadiusPresets } from "@/constants/border-radius";
import { TypographyStyles } from "@/constants/typography";

// Stage filter options for quick filter bar
const STAGE_OPTIONS: { label: string; value: Level }[] = [
  { label: "幼稚園", value: "幼稚園" },
  { label: "小學", value: "小學" },
  { label: "中學", value: "中學" },
];

// 快捷功能入口
const QUICK_ACTIONS = [
  {
    id: "compare",
    title: "心儀學校比一比",
    subtitle: "選校更有底",
    icon: "⚖️",
    route: "/school-compare",
    color: "#7C3AED",
  },
  {
    id: "map",
    title: "學校在哪裡",
    subtitle: "一眼睇清分佈",
    icon: "🗺️",
    route: "/school-map",
    color: "#10B981",
  },
  {
    id: "deadline",
    title: "申請截止別錯過",
    subtitle: "關鍵日子唔好漏",
    icon: "📅",
    route: "/deadlines",
    color: "#F59E0B",
  },
];

// Storage key for persisting search input on web
const SEARCH_INPUT_KEY = "search_input";

export default function SearchScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colors = useColors();
  const filterContext = useContext(FilterContext);
  const params = useLocalSearchParams<{ openFilter?: string; lockedDistrict?: string }>();

  // Initialize search input from sessionStorage on web
  const [searchInput, setSearchInput] = useState(() => {
    if (Platform.OS === "web" && typeof window !== "undefined") {
      return sessionStorage.getItem(SEARCH_INPUT_KEY) || "";
    }
    return "";
  });
  const [showFilterSheet, setShowFilterSheet] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  // Track locked district from Map navigation
  const [lockedDistrict, setLockedDistrict] = useState<District18 | null>(null);

  // Debounce search input (300ms)
  const debouncedSearch = useDebounce(searchInput, 300);

  // Persist search input to sessionStorage on web
  useEffect(() => {
    if (Platform.OS === "web" && typeof window !== "undefined") {
      if (searchInput) {
        sessionStorage.setItem(SEARCH_INPUT_KEY, searchInput);
      } else {
        sessionStorage.removeItem(SEARCH_INPUT_KEY);
      }
    }
  }, [searchInput]);

  if (!filterContext) {
    throw new Error("SearchScreen must be used within FilterProvider");
  }

  const { state: filters } = filterContext;

  // AI 深度分析 Modal 狀態
  const [aiModalVisible, setAiModalVisible] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState<{ id: string; name: string } | null>(null);
  
  // Upgrade Modal 狀態
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  // TODO: Replace with real user plan from auth/subscription context
  const userPlan: UserPlan = "free";

  // 判斷是否應顯示學校列表：有搜尋詞 OR 有活躍篩選條件
  const shouldShowList = debouncedSearch.trim().length > 0 || hasActiveFilters(filters);

  // 使用 useMemo 優化篩選邏輯 + 幼稚園/小學合併
  const displaySchools = useMemo(() => {
    const results = filterSchools(schools, debouncedSearch, filters);
    const sorted = sortSearchResults(results, debouncedSearch, filters);
    // 合併幼稚園/小學同校不同班別（AM/PM/WD）
    return groupSchoolsBySession(sorted);
  }, [debouncedSearch, filters]);

  useEffect(() => {
    loadFavorites();
  }, []);

  // Handle navigation from Map: auto-open filter sheet with locked district
  useEffect(() => {
    if (params.openFilter === "true" && params.lockedDistrict) {
      const district = params.lockedDistrict as District18;
      setLockedDistrict(district);
      setShowFilterSheet(true);
    }
  }, [params.openFilter, params.lockedDistrict]);

  // Save filter results to storage for Map screen
  useEffect(() => {
    if (shouldShowList && displaySchools.length > 0) {
      const schoolIds = displaySchools.map((s) => s.id);
      MapSetStorage.saveFiltersResult(schoolIds);
    }
  }, [shouldShowList, displaySchools]);

  /**
   * 檢查合併後的學校是否被收藏
   * 對於合併的幼稚園，檢查任一變體是否在收藏列表中
   */
  const isSchoolFavorite = useCallback((item: GroupedSchool): boolean => {
    if (item.__variantIds && item.__variantIds.length > 0) {
      return item.__variantIds.some((id) => favorites.includes(id));
    }
    return favorites.includes(item.id);
  }, [favorites]);

  // Handle AI 深度分析 button press
  const handleAIAnalysisPress = useCallback((schoolId: string, schoolName: string) => {
    // Check if user can access enhanced analysis
    const quota = canGenerateEnhanced(userPlan);
    if (!quota.allowed) {
      // Free user -> show upgrade modal
      setShowUpgradeModal(true);
      return;
    }
    // Pro user -> open modal
    setSelectedSchool({ id: schoolId, name: schoolName });
    setAiModalVisible(true);
  }, [userPlan]);

  // Close AI modal
  const handleCloseAIModal = useCallback(() => {
    setAiModalVisible(false);
    setSelectedSchool(null);
  }, []);

  // Handle upgrade press from modal
  const handleUpgradePress = useCallback(() => {
    setShowUpgradeModal(true);
  }, []);

  // Stable renderItem callback（支援幼稚園班別標籤，小學不顯示）
  const renderSchoolItem = useCallback(({ item }: { item: GroupedSchool }) => (
    <SchoolCard
      school={item}
      isFavorite={isSchoolFavorite(item)}
      onPress={() => handleSchoolPress(item.id)}
      onFavoritePress={() => handleFavoriteToggle(item.id)}
      sessions={item.__sessions}
      showSessions={item.__showSessions}
      showAIAnalysis={false}
    />
  ), [favorites, isSchoolFavorite, filters.stage]);

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

  const handleOpenFilterSheet = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setShowFilterSheet(true);
  };

  const handleQuickAction = (route: string) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.push(route as any);
  };

  const handleStageSelect = (stage: Level) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    filterContext.dispatch({ type: "SET_STAGE", payload: stage });
    // Open filter sheet after setting stage
    setShowFilterSheet(true);
  };

  return (
    <View style={{ flex: 1 }}>
      <MaxWidthWrapper>
        <View style={[styles.container, { paddingTop: insets.top }]}>
        {/* 頁面標題 */}
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: colors.foreground }]}>搜尋學校</Text>
          <Text style={[styles.headerSubtitle, { color: colors.muted }]}>探索香港優質學校</Text>
        </View>

        {/* 快捷功能入口 - 僅在無搜尋結果時顯示 */}
        {!shouldShowList && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.quickActionsContainer}
            style={{ maxHeight: 130 }}
          >
            {QUICK_ACTIONS.map((action) => (
              <TouchableOpacity
                key={action.id}
                style={styles.quickActionCard}
                onPress={() => handleQuickAction(action.route)}
                activeOpacity={0.7}
              >
                <View style={[styles.quickActionIconContainer, { backgroundColor: `${action.color}20` }]}>
                  <Text style={styles.quickActionIcon}>{action.icon}</Text>
                </View>
                <Text style={styles.quickActionTitle}>{action.title}</Text>
                <Text style={styles.quickActionSubtitle}>{action.subtitle}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        {/* 搜尋框 */}
        <View style={styles.searchContainer}>
          <View style={[styles.searchBox, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <IconSymbol name="magnifyingglass" size={20} color={colors.muted} />
            <TextInput
              style={[styles.searchInput, { color: colors.foreground }]}
              placeholder={SCHOOL_TEXT.SEARCH_PLACEHOLDER}
              placeholderTextColor={colors.muted}
              value={searchInput}
              onChangeText={setSearchInput}
              returnKeyType="search"
            />
            {searchInput.length > 0 && (
              <TouchableOpacity onPress={() => setSearchInput("")}>
                <IconSymbol name="xmark" size={18} color={colors.muted} />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={handleOpenFilterSheet}
              style={styles.filterButton}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <IconSymbol name="slider.horizontal.3" size={20} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* 活躍篩選標籤 */}
        <ActiveFilterTags />

        {/* 結果統計與排序 - 僅在有搜尋/篩選時顯示 */}
        {shouldShowList && (
          <View style={styles.resultStats}>
            <Text style={[styles.resultText, { color: colors.muted }]}>
              找到 {displaySchools.length} 所學校
            </Text>
            <SortSelector />
          </View>
        )}

        {/* 篩選面板 */}
        <FilterSheet
          visible={showFilterSheet}
          onClose={() => {
            setShowFilterSheet(false);
            // Clear locked district when closing
            if (lockedDistrict) {
              setLockedDistrict(null);
            }
          }}
          lockedDistrict={lockedDistrict}
        />

        {/* 學校列表 - 僅在有搜尋/篩選時顯示 */}
        {shouldShowList ? (
          <FlatList
            data={displaySchools}
            keyExtractor={(item) => item.id}
            renderItem={renderSchoolItem}
            contentContainerStyle={{ paddingVertical: 8, paddingBottom: 120 }}
            // Performance optimizations for 3510 schools
            initialNumToRender={12}
            maxToRenderPerBatch={15}
            windowSize={5}
            removeClippedSubviews={Platform.OS !== "web"}
            ListHeaderComponent={null}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={[styles.emptyText, { color: colors.muted }]}>
                  {debouncedSearch ? SCHOOL_TEXT.NO_RESULTS : SCHOOL_TEXT.EMPTY_LIST}
                </Text>
                {debouncedSearch && (
                  <Text style={[styles.emptyHint, { color: colors.muted, opacity: 0.7 }]}>{SCHOOL_TEXT.NO_RESULTS_HINT}</Text>
                )}
              </View>
            }
            ListFooterComponent={
              <View style={styles.listFooterDisclaimer}>
                <Text style={styles.disclaimerText}>{SCHOOL_TEXT.DATA_SOURCE}</Text>
                <Text style={styles.disclaimerText}>{SCHOOL_TEXT.DATA_DISCLAIMER}</Text>
              </View>
            }
          />
        ) : (
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeIcon}>🔍</Text>
            <Text style={[styles.welcomeTitle, { color: colors.foreground }]}>開始搜尋學校</Text>
            <Text style={[styles.welcomeText, { color: colors.muted }]}>
              輸入學校名稱，或先選取您想了解的學段，{"\n"}找到適合您的學校
            </Text>
            {/* 學段選擇按鈕 - 置中醒目 */}
            <View style={styles.stageButtonsContainer}>
              {STAGE_OPTIONS.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[styles.stageButton, { backgroundColor: `${colors.primary}26`, borderColor: `${colors.primary}66` }]}
                  onPress={() => handleStageSelect(option.value)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.stageButtonText, { color: colors.primary }]}>{option.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
            {/* 免責聲明 - 歡迎頁面底部 */}
            <View style={styles.welcomeDisclaimer}>
              <Text style={styles.disclaimerText}>{SCHOOL_TEXT.DATA_SOURCE}</Text>
              <Text style={styles.disclaimerText}>{SCHOOL_TEXT.DATA_DISCLAIMER}</Text>
            </View>
          </View>
        )}
        </View>
      </MaxWidthWrapper>

      {/* AI 深度分析 Modal */}
      {selectedSchool && (
        <EnhancedBriefModal
          visible={aiModalVisible}
          onClose={handleCloseAIModal}
          schoolId={selectedSchool.id}
          schoolName={selectedSchool.name}
          userPlan={userPlan}
          onUpgradePress={handleUpgradePress}
        />
      )}

      {/* 升級 Modal */}
      <UpgradeModal
        visible={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xs,
  },
  headerTitle: {
    ...TypographyStyles.title,
    fontSize: 28,
    letterSpacing: 1,
  },
  headerSubtitle: {
    ...TypographyStyles.caption,
    marginTop: Spacing.xs,
  },
  quickActionsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    gap: 6,
  },
  quickActionCard: {
    width: 90,
    height: 110,
    backgroundColor: "rgba(255,255,255,0.6)",
    borderRadius: BorderRadiusPresets.card,
    paddingVertical: 10,
    paddingHorizontal: 8,
    alignItems: "center",
    justifyContent: "flex-start",
    marginRight: 8,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.08)",
  },
  quickActionIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },
  quickActionIcon: {
    fontSize: 16,
  },
  quickActionTitle: {
    fontSize: 11,
    fontWeight: "600",
    fontFamily: "NotoSerifSC-Bold",
    textAlign: "center",
    marginBottom: 2,
    lineHeight: 14,
  },
  quickActionSubtitle: {
    fontSize: 9,
    fontFamily: "NotoSerifSC-Regular",
    textAlign: "center",
    lineHeight: 12,
  },
  searchContainer: {
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: BorderRadiusPresets.card,
    paddingHorizontal: Spacing.lg,
    paddingVertical: SpacingPresets.buttonPaddingVertical,
    borderWidth: 1,
    gap: Spacing.md,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: "NotoSerifSC-Regular",
  },
  filterButton: {
    paddingLeft: 12,
    borderLeftWidth: 1,
  },
  resultStats: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  resultText: {
    fontSize: 14,
    fontFamily: "NotoSerifSC-Regular",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
  },
  emptyText: {
    textAlign: "center",
    fontFamily: "NotoSerifSC-Regular",
    fontSize: 16,
  },
  emptyHint: {
    textAlign: "center",
    fontFamily: "NotoSerifSC-Regular",
    fontSize: 13,
    marginTop: 8,
  },
  listFooterDisclaimer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    marginTop: 16,
  },
  welcomeDisclaimer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    marginTop: 40,
  },
  disclaimerText: {
    fontSize: 11,
    color: "#706B5E",
    textAlign: "center",
    fontFamily: "NotoSerifSC-Regular",
    lineHeight: 16,
  },
  welcomeContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  welcomeIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: "600",
    fontFamily: "NotoSerifSC-Bold",
    marginBottom: 12,
    textAlign: "center",
  },
  welcomeText: {
    fontSize: 14,
    fontFamily: "NotoSerifSC-Regular",
    textAlign: "center",
    lineHeight: 22,
  },
  stageButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
    gap: 12,
  },
  stageButton: {
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 20,
    borderWidth: 1.5,
  },
  stageButtonText: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "NotoSerifSC-Bold",
  },
});
