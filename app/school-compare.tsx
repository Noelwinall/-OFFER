import { View, Text, TouchableOpacity, StyleSheet, Platform, ScrollView, Modal, TextInput, FlatList, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useState, useCallback, useEffect, useMemo } from "react";
import { SCHOOLS } from "@/data/schools";
import { School, type Level, type District } from "@/types/school";
import * as Haptics from "expo-haptics";
import { FavoritesStorage } from "@/lib/storage";
import {
  type FeaturedCategory,
  FEATURED_CATEGORY_INFO,
  getFeaturedSchoolsForFree,
  getFeaturedSchoolsForPro,
  getNewRandomPair,
} from "@/lib/featured-compare";
import { NON_KG_CATEGORY_OPTIONS, KG_CATEGORY_OPTIONS } from "@/lib/school-classification";
import { CURRICULUM_V2_LABELS, INSTRUCTION_LANGUAGE_LABELS, type InstructionLanguage } from "@/types/school";

// Filter options for search modal
const STAGE_OPTIONS: { label: string; value: Level }[] = [
  { label: "幼稚園", value: "幼稚園" },
  { label: "小學", value: "小學" },
  { label: "中學", value: "中學" },
];

const DISTRICT_OPTIONS: { label: string; value: District }[] = [
  { label: "港島區", value: "港島" },
  { label: "九龍區", value: "九龍" },
  { label: "新界區", value: "新界" },
];

// TODO: Replace with actual user auth state
const IS_PRO_USER = false;

// Slot limits
const FREE_MAX_SLOTS = 2;
const PRO_DEFAULT_SLOTS = 5;
const PRO_MAX_SLOTS = 10;

// Compare dimensions
const COMPARE_DIMENSIONS = [
  { id: "fee", label: "學費", icon: "💰" },
  { id: "curriculum", label: "課程體系", icon: "📚" },
  { id: "language", label: "教學語言", icon: "🗣️" },
  { id: "district", label: "地區", icon: "📍" },
  { id: "category", label: "學校類型", icon: "🏫" },
];

export default function SchoolCompareScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Compare slots state
  const [compareSlots, setCompareSlots] = useState<(School | null)[]>(() => {
    // Initialize with empty slots
    const initialCount = IS_PRO_USER ? PRO_DEFAULT_SLOTS : FREE_MAX_SLOTS;
    return Array(initialCount).fill(null);
  });

  // Active featured category (for UI highlight)
  const [activeCategory, setActiveCategory] = useState<FeaturedCategory | null>(null);

  // Favorites state
  const [favorites, setFavorites] = useState<School[]>([]);

  // UI state
  const [showSlotPicker, setShowSlotPicker] = useState(false);
  const [pendingSchool, setPendingSchool] = useState<School | null>(null);
  const [expandedFavorite, setExpandedFavorite] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showPaywallModal, setShowPaywallModal] = useState(false);

  // Search modal state (for empty slot click)
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [targetSlotIndex, setTargetSlotIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter state for search modal
  const [filterStage, setFilterStage] = useState<Level | null>(null);
  const [filterDistrict, setFilterDistrict] = useState<District | null>(null);
  const [filterCategory, setFilterCategory] = useState<string | null>(null);

  const maxSlots = IS_PRO_USER ? PRO_MAX_SLOTS : FREE_MAX_SLOTS;

  // Load favorites on mount and set default category
  useEffect(() => {
    loadFavorites();
    // Default to KG (精選幼稚園) on mount
    handleSelectFeatured("KG");
  }, []);

  const loadFavorites = async () => {
    const favoriteIds = await FavoritesStorage.getAll();
    const favoriteSchools = SCHOOLS.filter(s => favoriteIds.includes(s.id));
    setFavorites(favoriteSchools);
  };

  // Filtered search results (with filters applied)
  const searchResults = useMemo(() => {
    let results = SCHOOLS;

    // Apply filters first
    if (filterStage) {
      results = results.filter(s => s.level === filterStage);
    }
    if (filterDistrict) {
      results = results.filter(s => s.district === filterDistrict);
    }
    if (filterCategory) {
      results = results.filter(s => s.category === filterCategory);
    }

    // Then apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      results = results.filter(s =>
        s.name.toLowerCase().includes(query) ||
        s.nameEn?.toLowerCase().includes(query) ||
        s.district.includes(query) ||
        s.category.includes(query)
      );
    }

    // If no query but has filters, show results
    if (!searchQuery.trim() && !filterStage && !filterDistrict && !filterCategory) {
      return [];
    }

    return results.slice(0, 30);
  }, [searchQuery, filterStage, filterDistrict, filterCategory]);

  // Get category options based on selected stage
  const getFilterCategoryOptions = () => {
    if (filterStage === "幼稚園") {
      return KG_CATEGORY_OPTIONS;
    }
    return NON_KG_CATEGORY_OPTIONS;
  };

  // Format curriculum for display
  const formatCurriculum = (school: School) => {
    if (school.curriculumV2 && school.curriculumV2.length > 0) {
      return school.curriculumV2.map(c => CURRICULUM_V2_LABELS[c] || c).join(", ");
    }
    return "—";
  };

  // Format instruction languages for display
  const formatLanguages = (school: School) => {
    if (school.instructionLanguages && school.instructionLanguages.length > 0) {
      return school.instructionLanguages.map(l => INSTRUCTION_LANGUAGE_LABELS[l] || l).join(", ");
    }
    return "—";
  };

  // Show toast message
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 2000);
  };

  // Handle featured category click - loads schools in-place
  const handleSelectFeatured = useCallback((category: FeaturedCategory) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    // Get featured schools for this category
    const featured = IS_PRO_USER
      ? getFeaturedSchoolsForPro(category)
      : getFeaturedSchoolsForFree(category);

    // Update slots in-place
    const newSlots: (School | null)[] = [...featured];
    const displayCount = IS_PRO_USER ? PRO_DEFAULT_SLOTS : FREE_MAX_SLOTS;
    while (newSlots.length < displayCount) {
      newSlots.push(null);
    }
    setCompareSlots(newSlots);
    setActiveCategory(category);
  }, []);

  // Refresh featured pair (for free users)
  const handleRefreshFeatured = useCallback(() => {
    if (!activeCategory || IS_PRO_USER) return;
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    const newPair = getNewRandomPair(activeCategory);
    const newSlots: (School | null)[] = [...newPair];
    while (newSlots.length < FREE_MAX_SLOTS) {
      newSlots.push(null);
    }
    setCompareSlots(newSlots);
  }, [activeCategory]);

  // Get current filled slots count
  const getFilledCount = () => compareSlots.filter(s => s !== null).length;

  // Check if school is already in compare
  const isInCompare = (schoolId: string) => compareSlots.some(s => s?.id === schoolId);

  // Handle empty slot click - open search modal
  const handleEmptySlotClick = useCallback((slotIndex: number) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setTargetSlotIndex(slotIndex);
    setSearchQuery("");
    // Reset filters when opening modal
    setFilterStage(null);
    setFilterDistrict(null);
    setFilterCategory(null);
    setShowSearchModal(true);
  }, []);

  // Add school to specific slot (from search modal)
  const handleAddToSlot = useCallback((school: School, slotIndex: number) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    if (isInCompare(school.id)) {
      showToast("已在對比中");
      return;
    }

    const newSlots = [...compareSlots];
    newSlots[slotIndex] = school;
    setCompareSlots(newSlots);
    setShowSearchModal(false);
    setTargetSlotIndex(null);
    setActiveCategory(null); // Clear active category since user manually changed
  }, [compareSlots]);

  // Add school to compare (from favorites)
  const handleAddToCompare = useCallback((school: School) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    if (isInCompare(school.id)) {
      showToast("已在對比中");
      return;
    }

    const filledCount = getFilledCount();

    if (filledCount < maxSlots) {
      // Find first empty slot and add
      const newSlots = [...compareSlots];
      const emptyIndex = newSlots.findIndex(s => s === null);
      if (emptyIndex !== -1) {
        newSlots[emptyIndex] = school;
      } else {
        newSlots.push(school);
      }
      setCompareSlots(newSlots);
      setExpandedFavorite(null);
      setActiveCategory(null);
    } else {
      // Slots full - show slot picker
      setPendingSchool(school);
      setShowSlotPicker(true);
    }
  }, [compareSlots, maxSlots]);

  // Replace slot with pending school
  const handleReplaceSlot = useCallback((slotIndex: number) => {
    if (!pendingSchool) return;

    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    const newSlots = [...compareSlots];
    newSlots[slotIndex] = pendingSchool;
    setCompareSlots(newSlots);
    setPendingSchool(null);
    setShowSlotPicker(false);
    setExpandedFavorite(null);
    setActiveCategory(null);
  }, [compareSlots, pendingSchool]);

  // Remove school from slot
  const handleRemoveFromSlot = useCallback((slotIndex: number) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    const newSlots = [...compareSlots];
    newSlots[slotIndex] = null;
    setCompareSlots(newSlots);
    setActiveCategory(null);
  }, [compareSlots]);

  // Navigate to school detail
  const handleGoToDetail = useCallback((school: School) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.push(`/school/${school.id}`);
  }, [router]);

  // Toggle favorite card expansion
  const handleToggleFavorite = useCallback((schoolId: string) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setExpandedFavorite(prev => prev === schoolId ? null : schoolId);
  }, []);

  // Open paywall modal
  const handleOpenPaywall = useCallback(() => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setShowPaywallModal(true);
  }, []);

  // Format fee display
  const formatFee = (min: number, max: number) => {
    if (min === 0 && max === 0) return "免費";
    if (min === max) return `HK$${(min / 1000).toFixed(0)}K`;
    return `HK$${(min / 1000).toFixed(0)}K - ${(max / 1000).toFixed(0)}K`;
  };

  const categories: FeaturedCategory[] = ["KG", "INTERNATIONAL", "DSS"];

  // Render featured categories (compact horizontal pills)
  const renderFeaturedSection = () => (
    <View style={styles.featuredSection}>
      <View style={styles.featuredHeader}>
        <Text style={styles.sectionTitle}>精選對比</Text>
        {!IS_PRO_USER && activeCategory && (
          <TouchableOpacity onPress={handleRefreshFeatured} style={styles.refreshButton}>
            <Text style={styles.refreshButtonText}>換一組</Text>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.featuredRow}
      >
        {categories.map((category) => {
          const info = FEATURED_CATEGORY_INFO[category];
          const isActive = activeCategory === category;
          return (
            <TouchableOpacity
              key={category}
              style={[styles.featuredPill, isActive && styles.featuredPillActive]}
              onPress={() => handleSelectFeatured(category)}
              activeOpacity={0.7}
            >
              <Text style={[styles.featuredPillText, isActive && styles.featuredPillTextActive]}>
                {info.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );

  // Render locked column for paywall (skeleton + CTA design)
  const renderLockedColumn = () => {
    // Total rows: 1 header + 5 dimensions + 1 highlights = 7 rows
    const totalDataRows = COMPARE_DIMENSIONS.length + 1; // +1 for highlights

    return (
      <TouchableOpacity
        style={styles.lockedColumn}
        onPress={handleOpenPaywall}
        activeOpacity={0.85}
      >
        {/* Header: Lock icon + 會員欄位 */}
        <View style={styles.lockedColumnHeader}>
          <Text style={styles.lockedColumnLock}>🔒</Text>
          <Text style={styles.lockedColumnHeaderText}>會員欄位</Text>
        </View>

        {/* Skeleton rows */}
        {Array.from({ length: totalDataRows }).map((_, index) => (
          <View key={index} style={styles.lockedColumnRow}>
            <View style={[
              styles.skeletonBar,
              index % 2 === 0 ? styles.skeletonBarLong : styles.skeletonBarShort
            ]} />
          </View>
        ))}

        {/* CTA Block */}
        <View style={styles.lockedColumnCTA}>
          <Text style={styles.lockedColumnCTATitle}>解鎖更多對比</Text>
          <Text style={styles.lockedColumnCTASubtitle}>升級會員可比較最多 10 間</Text>
          <View style={styles.lockedColumnCTAButton}>
            <Text style={styles.lockedColumnCTAButtonText}>查看會員方案</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // Render comparison table (TOP section)
  const renderComparisonTable = () => {
    const filledSlots = compareSlots.filter(s => s !== null) as School[];

    if (filledSlots.length === 0) {
      return (
        <View style={styles.emptyCompareSection}>
          <Text style={styles.emptyCompareIcon}>⚔️</Text>
          <Text style={styles.emptyCompareTitle}>選擇學校開始對比</Text>
          <Text style={styles.emptyCompareHint}>
            點擊上方精選類別，或點擊空位搜尋學校
          </Text>
        </View>
      );
    }

    // Show locked column for Free users
    const showLockedColumn = !IS_PRO_USER && filledSlots.length >= 1;

    return (
      <View style={styles.comparisonSection}>
        <Text style={styles.sectionTitle}>詳細對比</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.compareTableWrapper}>
            {/* Main table with real data */}
            <View style={styles.compareContainer}>
              {/* School names row */}
              <View style={styles.compareRow}>
                <View style={styles.dimensionCell}>
                  <Text style={styles.dimensionLabel}>學校</Text>
                </View>
                {filledSlots.map((school) => (
                  <View key={school.id} style={styles.schoolCell}>
                    <Text style={styles.schoolName} numberOfLines={2}>{school.name}</Text>
                  </View>
                ))}
              </View>

              {/* Compare dimensions */}
              {COMPARE_DIMENSIONS.map((dim) => (
                <View key={dim.id} style={styles.compareRow}>
                  <View style={styles.dimensionCell}>
                    <Text style={styles.dimensionIcon}>{dim.icon}</Text>
                    <Text style={styles.dimensionLabel}>{dim.label}</Text>
                  </View>
                  {filledSlots.map((school) => (
                    <View key={school.id} style={styles.valueCell}>
                      <Text style={styles.valueText}>
                        {dim.id === "fee" && formatFee(school.tuitionMin, school.tuitionMax)}
                        {dim.id === "curriculum" && formatCurriculum(school)}
                        {dim.id === "language" && formatLanguages(school)}
                        {dim.id === "district" && school.district}
                        {dim.id === "category" && school.category}
                      </Text>
                    </View>
                  ))}
                </View>
              ))}

              {/* Highlights */}
              <View style={styles.compareRow}>
                <View style={styles.dimensionCell}>
                  <Text style={styles.dimensionIcon}>✨</Text>
                  <Text style={styles.dimensionLabel}>亮點</Text>
                </View>
                {filledSlots.map((school) => (
                  <View key={school.id} style={styles.highlightCell}>
                    {school.highlights.slice(0, 2).map((h, i) => (
                      <Text key={i} style={styles.highlightText}>• {h}</Text>
                    ))}
                  </View>
                ))}
              </View>
            </View>

            {/* Locked column for Free users */}
            {showLockedColumn && renderLockedColumn()}
          </View>
        </ScrollView>

        <Text style={styles.disclaimer}>
          資訊基於公開資料整理，僅供參考，以學校官方為準
        </Text>
      </View>
    );
  };

  // Render a single compare slot
  const renderCompareSlot = (school: School | null, index: number, isBlurred: boolean = false) => {
    const slotLabel = IS_PRO_USER ? `${index + 1}` : (index === 0 ? "A" : "B");

    if (isBlurred) {
      // Clean paywall slot for Free users - no "???"
      return (
        <TouchableOpacity
          key="blurred-slot"
          style={styles.slotPaywall}
          onPress={handleOpenPaywall}
          activeOpacity={0.8}
        >
          <Text style={styles.slotPaywallLock}>🔒</Text>
          <Text style={styles.slotPaywallTitle}>解鎖更多</Text>
          <Text style={styles.slotPaywallSubtitle}>升級會員</Text>
        </TouchableOpacity>
      );
    }

    if (!school) {
      // Empty slot - clickable to open search
      return (
        <TouchableOpacity
          key={`empty-${index}`}
          style={styles.slotEmpty}
          onPress={() => handleEmptySlotClick(index)}
          activeOpacity={0.7}
        >
          <Text style={styles.slotLabel}>{slotLabel}</Text>
          <Text style={styles.slotEmptyIcon}>+</Text>
          <Text style={styles.slotEmptyText}>點擊添加</Text>
        </TouchableOpacity>
      );
    }

    // Filled slot
    return (
      <View key={school.id} style={styles.slotFilled}>
        <TouchableOpacity
          style={styles.slotRemoveButton}
          onPress={() => handleRemoveFromSlot(index)}
        >
          <Text style={styles.slotRemoveText}>×</Text>
        </TouchableOpacity>
        <Text style={styles.slotLabel}>{slotLabel}</Text>
        <Text style={styles.slotSchoolName} numberOfLines={2}>{school.name}</Text>
        <Text style={styles.slotSchoolInfo}>{school.category}</Text>
      </View>
    );
  };

  // Render compare slots row (MIDDLE section)
  const renderCompareSlots = () => {
    const displaySlots = compareSlots.slice(0, IS_PRO_USER ? compareSlots.length : FREE_MAX_SLOTS);

    return (
      <View style={styles.slotsSection}>
        <Text style={styles.sectionTitle}>對比欄位</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.slotsRow}
        >
          {displaySlots.map((school, index) => renderCompareSlot(school, index))}

          {/* Blurred paywall slot for Free users */}
          {!IS_PRO_USER && renderCompareSlot(null, 2, true)}
        </ScrollView>
      </View>
    );
  };

  // Render favorite card
  const renderFavoriteCard = (school: School) => {
    const isExpanded = expandedFavorite === school.id;
    const alreadyInCompare = isInCompare(school.id);

    return (
      <TouchableOpacity
        key={school.id}
        style={[styles.favoriteCard, isExpanded && styles.favoriteCardExpanded]}
        onPress={() => handleToggleFavorite(school.id)}
        activeOpacity={0.8}
      >
        <View style={styles.favoriteCardContent}>
          <Text style={styles.favoriteSchoolName} numberOfLines={1}>{school.name}</Text>
          <Text style={styles.favoriteSchoolInfo}>{school.category} · {school.district}</Text>
          {alreadyInCompare && (
            <View style={styles.inCompareBadge}>
              <Text style={styles.inCompareBadgeText}>已加入對比</Text>
            </View>
          )}
        </View>

        {isExpanded && (
          <View style={styles.favoriteActions}>
            <TouchableOpacity
              style={styles.favoriteActionButton}
              onPress={() => handleGoToDetail(school)}
            >
              <Text style={styles.favoriteActionText}>進入詳情頁</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.favoriteActionButton,
                styles.favoriteActionPrimary,
                alreadyInCompare && styles.favoriteActionDisabled
              ]}
              onPress={() => !alreadyInCompare && handleAddToCompare(school)}
              disabled={alreadyInCompare}
            >
              <Text style={[
                styles.favoriteActionText,
                styles.favoriteActionPrimaryText,
                alreadyInCompare && styles.favoriteActionDisabledText
              ]}>
                {alreadyInCompare ? "已在對比中" : "加入對比"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  // Render favorites section (BOTTOM section)
  const renderFavoritesSection = () => (
    <View style={styles.favoritesSection}>
      <Text style={styles.sectionTitle}>我的收藏 ({favorites.length})</Text>
      {favorites.length === 0 ? (
        <View style={styles.emptyFavorites}>
          <Text style={styles.emptyFavoritesText}>尚無收藏學校</Text>
          <Text style={styles.emptyFavoritesHint}>在搜尋頁面收藏學校後，可在此加入對比</Text>
        </View>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.favoritesRow}
        >
          {favorites.map(renderFavoriteCard)}
        </ScrollView>
      )}
    </View>
  );

  // Render search modal (for empty slot click)
  const renderSearchModal = () => {
    const hasFiltersOrQuery = searchQuery.trim() || filterStage || filterDistrict || filterCategory;

    return (
      <Modal
        visible={showSearchModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowSearchModal(false)}
      >
        <View style={styles.searchModalOverlay}>
          {/* Backdrop - click to close */}
          <Pressable
            style={styles.searchModalBackdrop}
            onPress={() => setShowSearchModal(false)}
          />

          <View style={[styles.searchModalContainer, { paddingBottom: insets.bottom + 16 }]}>
            {/* Handle bar */}
            <View style={styles.searchModalHandle}>
              <View style={styles.searchModalHandleBar} />
            </View>

            <View style={styles.searchModalHeader}>
              <Text style={styles.searchModalTitle}>
                添加學校到位置 {IS_PRO_USER ? (targetSlotIndex! + 1) : (targetSlotIndex === 0 ? "A" : "B")}
              </Text>
              <TouchableOpacity onPress={() => setShowSearchModal(false)}>
                <Text style={styles.searchModalClose}>×</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.searchInputContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="搜尋學校名稱..."
                placeholderTextColor="rgba(255,255,255,0.4)"
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoFocus
              />
            </View>

            {/* Filter section - 篩選條件 */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>篩選條件</Text>

              {/* Stage filter */}
              <View style={styles.filterRow}>
                <Text style={styles.filterLabel}>階段</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterChips}>
                  {STAGE_OPTIONS.map((option) => {
                    const isSelected = filterStage === option.value;
                    return (
                      <TouchableOpacity
                        key={option.value}
                        style={[styles.filterChip, isSelected && styles.filterChipSelected]}
                        onPress={() => {
                          if (Platform.OS !== "web") {
                            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                          }
                          setFilterStage(isSelected ? null : option.value);
                          // Clear category when stage changes
                          if (!isSelected) setFilterCategory(null);
                        }}
                      >
                        <Text style={[styles.filterChipText, isSelected && styles.filterChipTextSelected]}>
                          {option.label}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>

              {/* District filter */}
              <View style={styles.filterRow}>
                <Text style={styles.filterLabel}>地區</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterChips}>
                  {DISTRICT_OPTIONS.map((option) => {
                    const isSelected = filterDistrict === option.value;
                    return (
                      <TouchableOpacity
                        key={option.value}
                        style={[styles.filterChip, isSelected && styles.filterChipSelected]}
                        onPress={() => {
                          if (Platform.OS !== "web") {
                            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                          }
                          setFilterDistrict(isSelected ? null : option.value);
                        }}
                      >
                        <Text style={[styles.filterChipText, isSelected && styles.filterChipTextSelected]}>
                          {option.label}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>

              {/* Category filter */}
              <View style={styles.filterRow}>
                <Text style={styles.filterLabel}>類型</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterChips}>
                  {getFilterCategoryOptions().map((option) => {
                    const isSelected = filterCategory === option.value;
                    return (
                      <TouchableOpacity
                        key={option.value}
                        style={[styles.filterChip, isSelected && styles.filterChipSelected]}
                        onPress={() => {
                          if (Platform.OS !== "web") {
                            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                          }
                          setFilterCategory(isSelected ? null : option.value);
                        }}
                      >
                        <Text style={[styles.filterChipText, isSelected && styles.filterChipTextSelected]}>
                          {option.label}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>
            </View>

            {hasFiltersOrQuery ? (
              <FlatList
                data={searchResults}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                  const alreadyInCompare = isInCompare(item.id);
                  return (
                    <TouchableOpacity
                      style={[styles.searchResultItem, alreadyInCompare && styles.searchResultItemDisabled]}
                      onPress={() => !alreadyInCompare && handleAddToSlot(item, targetSlotIndex!)}
                      disabled={alreadyInCompare}
                    >
                      <View style={styles.searchResultInfo}>
                        <Text style={styles.searchResultName}>{item.name}</Text>
                        <Text style={styles.searchResultMeta}>
                          {item.category} · {item.district} · {item.level}
                        </Text>
                      </View>
                      {alreadyInCompare ? (
                        <Text style={styles.searchResultBadge}>已加入</Text>
                      ) : (
                        <Text style={styles.searchResultAdd}>+</Text>
                      )}
                    </TouchableOpacity>
                  );
                }}
                style={styles.searchResultsList}
                ListEmptyComponent={
                  <Text style={styles.searchNoResults}>沒有找到相關學校</Text>
                }
                ListHeaderComponent={
                  <Text style={styles.searchResultsCount}>
                    找到 {searchResults.length} 間學校
                  </Text>
                }
              />
            ) : (
              <View style={styles.searchHintContainer}>
                <Text style={styles.searchHint}>輸入關鍵字或選擇篩選條件</Text>
              </View>
            )}
          </View>
        </View>
      </Modal>
    );
  };

  // Render slot picker modal
  const renderSlotPicker = () => (
    <Modal
      visible={showSlotPicker}
      transparent
      animationType="fade"
      onRequestClose={() => setShowSlotPicker(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.slotPickerContainer}>
          <Text style={styles.slotPickerTitle}>選擇要替換的位置</Text>
          <Text style={styles.slotPickerSubtitle}>
            {pendingSchool?.name}
          </Text>

          <View style={styles.slotPickerOptions}>
            {compareSlots.slice(0, maxSlots).map((school, index) => (
              <TouchableOpacity
                key={index}
                style={styles.slotPickerOption}
                onPress={() => handleReplaceSlot(index)}
              >
                <Text style={styles.slotPickerOptionLabel}>
                  {IS_PRO_USER ? `位置 ${index + 1}` : (index === 0 ? "位置 A" : "位置 B")}
                </Text>
                <Text style={styles.slotPickerOptionSchool} numberOfLines={1}>
                  {school?.name || "空位"}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={styles.slotPickerCancel}
            onPress={() => {
              setShowSlotPicker(false);
              setPendingSchool(null);
            }}
          >
            <Text style={styles.slotPickerCancelText}>取消</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  // Render paywall modal
  const renderPaywallModal = () => (
    <Modal
      visible={showPaywallModal}
      transparent
      animationType="fade"
      onRequestClose={() => setShowPaywallModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.paywallModalContainer}>
          <Text style={styles.paywallModalTitle}>升級會員</Text>
          <Text style={styles.paywallModalText}>
            升級 Pro 會員可解鎖更多功能：
          </Text>
          <View style={styles.paywallFeatures}>
            <Text style={styles.paywallFeatureItem}>• 同時對比最多 10 間學校</Text>
            <Text style={styles.paywallFeatureItem}>• 查看完整精選學校列表</Text>
            <Text style={styles.paywallFeatureItem}>• 無限制使用 AI 學校顧問</Text>
          </View>

          <TouchableOpacity
            style={styles.paywallModalButton}
            onPress={() => {
              setShowPaywallModal(false);
              // TODO: Navigate to membership page
            }}
          >
            <Text style={styles.paywallModalButtonText}>了解更多</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.paywallModalClose}
            onPress={() => setShowPaywallModal(false)}
          >
            <Text style={styles.paywallModalCloseText}>稍後再說</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  // Render toast
  const renderToast = () => {
    if (!toastMessage) return null;

    return (
      <View style={styles.toastContainer}>
        <Text style={styles.toastText}>{toastMessage}</Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={["#0F1629", "#1a2744", "#1e3a5f", "#1a2744"]}
        locations={[0, 0.3, 0.7, 1]}
        style={StyleSheet.absoluteFill}
      />

      <View style={[styles.header, { paddingTop: insets.top }]}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <IconSymbol name="chevron.right" size={24} color="#FFFFFF" style={{ transform: [{ rotate: "180deg" }] }} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>心儀學校比一比</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 24 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Featured categories at top */}
        {renderFeaturedSection()}

        {/* TOP: Comparison table */}
        {renderComparisonTable()}

        {/* MIDDLE: Compare slots */}
        {renderCompareSlots()}

        {/* BOTTOM: Favorites section */}
        {renderFavoritesSection()}
      </ScrollView>

      {renderSearchModal()}
      {renderSlotPicker()}
      {renderPaywallModal()}
      {renderToast()}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Bold",
    letterSpacing: 1,
  },
  placeholder: {
    width: 40,
  },
  content: {
    paddingHorizontal: 16,
  },

  // Section title
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Bold",
    marginBottom: 12,
  },

  // Featured section
  featuredSection: {
    marginBottom: 20,
  },
  featuredHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  featuredRow: {
    flexDirection: "row",
    gap: 10,
  },
  featuredPill: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },
  featuredPillActive: {
    backgroundColor: "rgba(0,217,255,0.2)",
    borderColor: "#00D9FF",
  },
  featuredPillText: {
    fontSize: 14,
    color: "rgba(255,255,255,0.7)",
    fontFamily: "NotoSerifSC-Regular",
  },
  featuredPillTextActive: {
    color: "#00D9FF",
    fontWeight: "600",
  },
  refreshButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "rgba(0,217,255,0.15)",
    borderRadius: 12,
  },
  refreshButtonText: {
    fontSize: 12,
    color: "#00D9FF",
    fontWeight: "500",
  },

  // Empty compare state
  emptyCompareSection: {
    alignItems: "center",
    paddingVertical: 40,
    marginBottom: 20,
  },
  emptyCompareIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyCompareTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Bold",
    marginBottom: 8,
  },
  emptyCompareHint: {
    fontSize: 13,
    color: "rgba(255,255,255,0.5)",
    fontFamily: "NotoSerifSC-Regular",
    textAlign: "center",
  },

  // Comparison table
  comparisonSection: {
    marginBottom: 24,
  },
  compareContainer: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  compareRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.08)",
  },
  dimensionCell: {
    width: 70,
    padding: 10,
    backgroundColor: "rgba(0,217,255,0.1)",
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
  },
  dimensionIcon: {
    fontSize: 14,
  },
  dimensionLabel: {
    fontSize: 11,
    color: "#00D9FF",
    fontFamily: "NotoSerifSC-Regular",
    textAlign: "center",
  },
  schoolCell: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  schoolName: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Bold",
    textAlign: "center",
  },
  valueCell: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  valueText: {
    fontSize: 11,
    color: "rgba(255,255,255,0.8)",
    fontFamily: "NotoSerifSC-Regular",
    textAlign: "center",
  },
  highlightCell: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    gap: 2,
  },
  highlightText: {
    fontSize: 10,
    color: "rgba(255,255,255,0.7)",
    fontFamily: "NotoSerifSC-Regular",
  },
  disclaimer: {
    fontSize: 10,
    color: "rgba(255,255,255,0.4)",
    fontFamily: "NotoSerifSC-Regular",
    textAlign: "center",
    marginTop: 12,
  },
  compareTableWrapper: {
    flexDirection: "row",
    gap: 8,
  },

  // Locked column (paywall) - skeleton + CTA design
  lockedColumn: {
    width: 110,
    backgroundColor: "rgba(255,255,255,0.03)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    overflow: "hidden",
  },
  lockedColumnHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: "rgba(0,217,255,0.08)",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.06)",
  },
  lockedColumnLock: {
    fontSize: 12,
  },
  lockedColumnHeaderText: {
    fontSize: 11,
    color: "rgba(0,217,255,0.8)",
    fontFamily: "NotoSerifSC-Regular",
    fontWeight: "500",
  },
  lockedColumnRow: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.04)",
  },
  skeletonBar: {
    height: 10,
    borderRadius: 5,
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  skeletonBarLong: {
    width: "85%",
  },
  skeletonBarShort: {
    width: "60%",
  },
  lockedColumnCTA: {
    paddingVertical: 16,
    paddingHorizontal: 10,
    alignItems: "center",
    backgroundColor: "rgba(0,217,255,0.06)",
  },
  lockedColumnCTATitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#00D9FF",
    fontFamily: "NotoSerifSC-Bold",
    textAlign: "center",
    marginBottom: 4,
  },
  lockedColumnCTASubtitle: {
    fontSize: 9,
    color: "rgba(255,255,255,0.5)",
    fontFamily: "NotoSerifSC-Regular",
    textAlign: "center",
    marginBottom: 10,
  },
  lockedColumnCTAButton: {
    backgroundColor: "rgba(0,217,255,0.2)",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(0,217,255,0.4)",
  },
  lockedColumnCTAButtonText: {
    fontSize: 10,
    color: "#00D9FF",
    fontWeight: "600",
    fontFamily: "NotoSerifSC-Regular",
  },

  // Compare slots
  slotsSection: {
    marginBottom: 24,
  },
  slotsRow: {
    flexDirection: "row",
    gap: 12,
    paddingRight: 16,
  },
  slotFilled: {
    width: 120,
    height: 120,
    backgroundColor: "rgba(0,217,255,0.15)",
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: "rgba(0,217,255,0.3)",
    position: "relative",
  },
  slotEmpty: {
    width: 120,
    height: 120,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
  },
  slotPaywall: {
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "rgba(0,217,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(0,217,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
  },
  slotPaywallLock: {
    fontSize: 24,
    marginBottom: 8,
  },
  slotPaywallTitle: {
    fontSize: 13,
    color: "#00D9FF",
    fontWeight: "600",
    fontFamily: "NotoSerifSC-Bold",
    textAlign: "center",
  },
  slotPaywallSubtitle: {
    fontSize: 11,
    color: "rgba(255,255,255,0.5)",
    fontFamily: "NotoSerifSC-Regular",
    textAlign: "center",
    marginTop: 2,
  },
  slotLabel: {
    fontSize: 12,
    color: "rgba(255,255,255,0.5)",
    fontFamily: "NotoSerifSC-Regular",
    marginBottom: 4,
  },
  slotSchoolName: {
    fontSize: 13,
    fontWeight: "600",
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Bold",
    marginBottom: 4,
  },
  slotSchoolInfo: {
    fontSize: 11,
    color: "rgba(255,255,255,0.6)",
    fontFamily: "NotoSerifSC-Regular",
  },
  slotEmptyIcon: {
    fontSize: 24,
    color: "rgba(255,255,255,0.4)",
    marginBottom: 4,
  },
  slotEmptyText: {
    fontSize: 12,
    color: "rgba(255,255,255,0.4)",
    fontFamily: "NotoSerifSC-Regular",
  },
  slotRemoveButton: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  slotRemoveText: {
    fontSize: 14,
    color: "#FFFFFF",
    fontWeight: "600",
  },

  // Favorites
  favoritesSection: {
    marginBottom: 24,
  },
  favoritesRow: {
    flexDirection: "row",
    gap: 12,
    paddingRight: 16,
  },
  favoriteCard: {
    width: 160,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },
  favoriteCardExpanded: {
    backgroundColor: "rgba(255,255,255,0.12)",
    borderColor: "rgba(0,217,255,0.3)",
  },
  favoriteCardContent: {
    marginBottom: 0,
  },
  favoriteSchoolName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Bold",
    marginBottom: 4,
  },
  favoriteSchoolInfo: {
    fontSize: 12,
    color: "rgba(255,255,255,0.6)",
    fontFamily: "NotoSerifSC-Regular",
  },
  inCompareBadge: {
    backgroundColor: "rgba(0,217,255,0.2)",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginTop: 8,
  },
  inCompareBadgeText: {
    fontSize: 10,
    color: "#00D9FF",
    fontWeight: "500",
  },
  favoriteActions: {
    marginTop: 12,
    gap: 8,
  },
  favoriteActionButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "rgba(255,255,255,0.1)",
    alignItems: "center",
  },
  favoriteActionPrimary: {
    backgroundColor: "#00D9FF",
  },
  favoriteActionDisabled: {
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  favoriteActionText: {
    fontSize: 12,
    color: "#FFFFFF",
    fontWeight: "500",
  },
  favoriteActionPrimaryText: {
    color: "#0F1629",
  },
  favoriteActionDisabledText: {
    color: "rgba(255,255,255,0.4)",
  },
  emptyFavorites: {
    paddingVertical: 24,
    alignItems: "center",
  },
  emptyFavoritesText: {
    fontSize: 14,
    color: "rgba(255,255,255,0.5)",
    fontFamily: "NotoSerifSC-Regular",
    marginBottom: 4,
  },
  emptyFavoritesHint: {
    fontSize: 12,
    color: "rgba(255,255,255,0.3)",
    fontFamily: "NotoSerifSC-Regular",
    textAlign: "center",
  },

  // Search modal
  searchModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  searchModalContainer: {
    backgroundColor: "#1a2744",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: "80%",
    minHeight: "50%",
  },
  searchModalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
  },
  searchModalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Bold",
  },
  searchModalClose: {
    fontSize: 28,
    color: "#FFFFFF",
  },
  searchInputContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  searchInput: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Regular",
  },
  searchResultsList: {
    flex: 1,
  },
  searchResultItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.05)",
  },
  searchResultItemDisabled: {
    opacity: 0.5,
  },
  searchResultInfo: {
    flex: 1,
  },
  searchResultName: {
    fontSize: 15,
    fontWeight: "500",
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Bold",
    marginBottom: 2,
  },
  searchResultMeta: {
    fontSize: 12,
    color: "rgba(255,255,255,0.5)",
    fontFamily: "NotoSerifSC-Regular",
  },
  searchResultAdd: {
    fontSize: 24,
    color: "#00D9FF",
    fontWeight: "600",
    marginLeft: 12,
  },
  searchResultBadge: {
    fontSize: 12,
    color: "rgba(255,255,255,0.4)",
    fontFamily: "NotoSerifSC-Regular",
    marginLeft: 12,
  },
  searchNoResults: {
    textAlign: "center",
    color: "rgba(255,255,255,0.4)",
    fontSize: 14,
    fontFamily: "NotoSerifSC-Regular",
    paddingVertical: 40,
  },
  searchHintContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 40,
  },
  searchHint: {
    fontSize: 14,
    color: "rgba(255,255,255,0.4)",
    fontFamily: "NotoSerifSC-Regular",
  },
  searchModalBackdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  searchModalHandle: {
    alignItems: "center",
    paddingTop: 12,
    paddingBottom: 4,
  },
  searchModalHandleBar: {
    width: 40,
    height: 4,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 2,
  },
  searchResultsCount: {
    fontSize: 12,
    color: "rgba(255,255,255,0.5)",
    fontFamily: "NotoSerifSC-Regular",
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  // Filter section in search modal
  filterSection: {
    paddingHorizontal: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.08)",
  },
  filterSectionTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "rgba(255,255,255,0.7)",
    fontFamily: "NotoSerifSC-Bold",
    marginBottom: 12,
  },
  filterRow: {
    marginBottom: 10,
  },
  filterLabel: {
    fontSize: 11,
    color: "rgba(255,255,255,0.5)",
    fontFamily: "NotoSerifSC-Regular",
    marginBottom: 6,
  },
  filterChips: {
    flexDirection: "row",
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },
  filterChipSelected: {
    backgroundColor: "rgba(0,217,255,0.2)",
    borderColor: "#00D9FF",
  },
  filterChipText: {
    fontSize: 12,
    color: "rgba(255,255,255,0.6)",
    fontFamily: "NotoSerifSC-Regular",
  },
  filterChipTextSelected: {
    color: "#00D9FF",
    fontWeight: "500",
  },

  // Slot picker modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  slotPickerContainer: {
    backgroundColor: "#1a2744",
    borderRadius: 20,
    padding: 24,
    width: "100%",
    maxWidth: 320,
  },
  slotPickerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Bold",
    textAlign: "center",
    marginBottom: 8,
  },
  slotPickerSubtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.6)",
    fontFamily: "NotoSerifSC-Regular",
    textAlign: "center",
    marginBottom: 20,
  },
  slotPickerOptions: {
    gap: 12,
  },
  slotPickerOption: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
  },
  slotPickerOptionLabel: {
    fontSize: 12,
    color: "#00D9FF",
    fontWeight: "500",
    marginBottom: 4,
  },
  slotPickerOptionSchool: {
    fontSize: 14,
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Regular",
  },
  slotPickerCancel: {
    marginTop: 16,
    paddingVertical: 12,
    alignItems: "center",
  },
  slotPickerCancelText: {
    fontSize: 14,
    color: "rgba(255,255,255,0.6)",
    fontFamily: "NotoSerifSC-Regular",
  },

  // Paywall modal
  paywallModalContainer: {
    backgroundColor: "#1a2744",
    borderRadius: 20,
    padding: 24,
    width: "100%",
    maxWidth: 320,
    alignItems: "center",
  },
  paywallModalTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#00D9FF",
    fontFamily: "NotoSerifSC-Bold",
    marginBottom: 12,
  },
  paywallModalText: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
    fontFamily: "NotoSerifSC-Regular",
    textAlign: "center",
    marginBottom: 16,
  },
  paywallFeatures: {
    alignSelf: "stretch",
    marginBottom: 24,
  },
  paywallFeatureItem: {
    fontSize: 14,
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Regular",
    marginBottom: 8,
  },
  paywallModalButton: {
    backgroundColor: "#00D9FF",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 25,
    width: "100%",
    alignItems: "center",
  },
  paywallModalButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0F1629",
    fontFamily: "NotoSerifSC-Bold",
  },
  paywallModalClose: {
    marginTop: 12,
    paddingVertical: 8,
  },
  paywallModalCloseText: {
    fontSize: 14,
    color: "rgba(255,255,255,0.5)",
    fontFamily: "NotoSerifSC-Regular",
  },

  // Toast
  toastContainer: {
    position: "absolute",
    bottom: 100,
    left: 24,
    right: 24,
    backgroundColor: "rgba(0,0,0,0.8)",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  toastText: {
    fontSize: 14,
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Regular",
  },
});
