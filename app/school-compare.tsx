import { View, Text, TouchableOpacity, StyleSheet, Platform, ScrollView, Modal, TextInput, FlatList, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";
import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import { SCHOOLS } from "@/data/schools";
import { School } from "@/types/school";
import * as Haptics from "expo-haptics";
import { useColors } from "@/hooks/use-colors";
import { FavoritesStorage } from "@/lib/storage";
import { Typography } from "@/components/ui/typography";
import { Spacing, SpacingPresets } from "@/constants/spacing";
import { BorderRadius, BorderRadiusPresets } from "@/constants/border-radius";
import { TypographyStyles } from "@/constants/typography";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
  withTiming,
} from "react-native-reanimated";
import {
  type FeaturedCategory,
  FEATURED_CATEGORY_INFO,
  getFeaturedSchoolsForFree,
  getFeaturedSchoolsForPro,
  getNewRandomPair,
} from "@/lib/featured-compare";
import { CURRICULUM_V2_LABELS, INSTRUCTION_LANGUAGE_LABELS } from "@/types/school";

// TODO: Replace with actual user auth state
const IS_PRO_USER = false;

// Slot limits
const FREE_MAX_SLOTS = 2;
const PRO_DEFAULT_SLOTS = 5;
const PRO_MAX_SLOTS = 10;

// Slot dimensions for drag calculation
const SLOT_WIDTH = 120;
const SLOT_GAP = 12;

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
  const colors = useColors();

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

  // Drag state
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

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

  // Simple name search results - only show if query matches
  const searchResults = useMemo(() => {
    // If nothing typed, show nothing
    if (!searchQuery.trim()) {
      return [];
    }

    const query = searchQuery.toLowerCase();
    const results = SCHOOLS.filter(s =>
      s.name.toLowerCase().includes(query) ||
      s.nameEn?.toLowerCase().includes(query)
    );

    return results.slice(0, 20);
  }, [searchQuery]);


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

  // Swap two slots
  const handleSwapSlots = useCallback((fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex) return;
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    const newSlots = [...compareSlots];
    const temp = newSlots[fromIndex];
    newSlots[fromIndex] = newSlots[toIndex];
    newSlots[toIndex] = temp;
    setCompareSlots(newSlots);
    setActiveCategory(null);
  }, [compareSlots]);

  const categories: FeaturedCategory[] = ["KG", "INTERNATIONAL", "DSS"];

  // Render featured categories (compact horizontal pills)
  const renderFeaturedSection = () => (
    <View style={styles.featuredSection}>
      <View style={styles.featuredHeader}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>精選對比</Text>
        {!IS_PRO_USER && activeCategory && (
          <TouchableOpacity onPress={handleRefreshFeatured} style={[styles.refreshButton, { backgroundColor: colors.primary + "26" }]}>
            <Text style={[styles.refreshButtonText, { color: colors.primary }]}>換一組</Text>
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
              style={[
                styles.featuredPill,
                isActive && [styles.featuredPillActive, { backgroundColor: colors.primary + "33", borderColor: colors.primary }]
              ]}
              onPress={() => handleSelectFeatured(category)}
              activeOpacity={0.7}
            >
              <Text style={[styles.featuredPillText, isActive && [styles.featuredPillTextActive, { color: colors.primary }]]}>
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
          <Text style={[styles.lockedColumnCTATitle, { color: colors.primary }]}>解鎖更多對比</Text>
          <Text style={styles.lockedColumnCTASubtitle}>升級會員可比較最多 10 間</Text>
          <View style={[styles.lockedColumnCTAButton, { backgroundColor: colors.primary + "33", borderColor: colors.primary + "66" }]}>
            <Text style={[styles.lockedColumnCTAButtonText, { color: colors.primary }]}>查看會員方案</Text>
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
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>詳細對比</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.compareTableWrapper}>
            {/* Main table with real data */}
            <View style={styles.compareContainer}>
              {/* School names row */}
              <View style={styles.compareRow}>
                <View style={styles.dimensionCell}>
                  <Text style={[styles.dimensionLabel, { color: colors.primary }]}>學校</Text>
                </View>
                {filledSlots.map((school) => (
                  <View key={school.id} style={styles.schoolCell}>
                    <Text style={[styles.schoolName, { color: colors.foreground }]} numberOfLines={2}>{school.name}</Text>
                  </View>
                ))}
              </View>

              {/* Compare dimensions */}
              {COMPARE_DIMENSIONS.map((dim) => (
                <View key={dim.id} style={styles.compareRow}>
                  <View style={styles.dimensionCell}>
                    <Text style={styles.dimensionIcon}>{dim.icon}</Text>
                    <Text style={[styles.dimensionLabel, { color: colors.primary }]}>{dim.label}</Text>
                  </View>
                  {filledSlots.map((school) => (
                    <View key={school.id} style={styles.valueCell}>
                      <Text style={[styles.valueText, { color: colors.foreground }]}>
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
                  <Text style={[styles.dimensionLabel, { color: colors.primary }]}>亮點</Text>
                </View>
                {filledSlots.map((school) => (
                  <View key={school.id} style={styles.highlightCell}>
                    {school.highlights.slice(0, 2).map((h, i) => (
                      <Text key={i} style={[styles.highlightText, { color: colors.muted }]}>• {h}</Text>
                    ))}
                  </View>
                ))}
              </View>
            </View>

            {/* Locked column for Free users */}
            {showLockedColumn && renderLockedColumn()}
          </View>
        </ScrollView>

        <Text style={[styles.disclaimer, { color: colors.muted, opacity: 0.6 }]}>
          資訊基於公開資料整理，僅供參考，以學校官方為準
        </Text>
      </View>
    );
  };

  // Draggable slot component
  const DraggableSlot = ({ school, index, totalSlots }: { school: School | null; index: number; totalSlots: number }) => {
    const slotLabel = IS_PRO_USER ? `${index + 1}` : (index === 0 ? "A" : "B");
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const scale = useSharedValue(1);
    const zIndex = useSharedValue(0);
    const isDragging = useSharedValue(false);

    const panGesture = Gesture.Pan()
      .enabled(school !== null) // Only enable drag for filled slots
      .onStart(() => {
        isDragging.value = true;
        scale.value = withSpring(1.05);
        zIndex.value = 100;
        runOnJS(setDraggingIndex)(index);
        if (Platform.OS !== "web") {
          runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Light);
        }
      })
      .onUpdate((event) => {
        translateX.value = event.translationX;
        translateY.value = event.translationY;
      })
      .onEnd((event) => {
        // Calculate target slot based on horizontal movement
        const slotOffset = Math.round(event.translationX / (SLOT_WIDTH + SLOT_GAP));
        const targetIndex = Math.max(0, Math.min(totalSlots - 1, index + slotOffset));

        if (targetIndex !== index) {
          runOnJS(handleSwapSlots)(index, targetIndex);
        }

        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
        scale.value = withSpring(1);
        zIndex.value = 0;
        isDragging.value = false;
        runOnJS(setDraggingIndex)(null);
      });

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
      ],
      zIndex: zIndex.value,
      opacity: isDragging.value ? 0.9 : 1,
    }));

    // Highlight style when another slot is being dragged over this one
    const highlightStyle = useAnimatedStyle(() => {
      return {
        borderColor: draggingIndex !== null && draggingIndex !== index ? "rgba(0,217,255,0.5)" : "rgba(30, 58, 95, 0.2)",
      };
    });

    if (!school) {
      // Empty slot - clickable to open search (not draggable)
      return (
        <TouchableOpacity
          key={`empty-${index}`}
          style={styles.slotEmpty}
          onPress={() => handleEmptySlotClick(index)}
          activeOpacity={0.7}
        >
          <Text style={[styles.slotLabel, { color: colors.muted }]}>{slotLabel}</Text>
          <Text style={[styles.slotEmptyIcon, { color: colors.muted }]}>+</Text>
          <Text style={[styles.slotEmptyText, { color: colors.muted }]}>點擊添加</Text>
        </TouchableOpacity>
      );
    }

    // Filled slot - draggable
    return (
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.slotFilled, animatedStyle, highlightStyle]}>
          <TouchableOpacity
            style={styles.slotRemoveButton}
            onPress={() => handleRemoveFromSlot(index)}
          >
            <Text style={styles.slotRemoveText}>×</Text>
          </TouchableOpacity>
          <View style={styles.slotDragHandle}>
            <Text style={styles.slotDragIcon}>⋮⋮</Text>
          </View>
          <Text style={[styles.slotLabel, { color: colors.muted }]}>{slotLabel}</Text>
          <Text style={[styles.slotSchoolName, { color: colors.foreground }]} numberOfLines={2}>{school.name}</Text>
          <Text style={[styles.slotSchoolInfo, { color: colors.muted }]}>{school.category}</Text>
        </Animated.View>
      </GestureDetector>
    );
  };

  // Render paywall slot (not draggable)
  const renderPaywallSlot = () => (
    <TouchableOpacity
      key="blurred-slot"
      style={styles.slotPaywall}
      onPress={handleOpenPaywall}
      activeOpacity={0.8}
    >
      <Text style={styles.slotPaywallLock}>🔒</Text>
      <Text style={[styles.slotPaywallTitle, { color: colors.primary }]}>解鎖更多</Text>
      <Text style={[styles.slotPaywallSubtitle, { color: colors.muted }]}>升級會員</Text>
    </TouchableOpacity>
  );

  // Render compare slots row (MIDDLE section)
  const renderCompareSlots = () => {
    const displaySlots = compareSlots.slice(0, IS_PRO_USER ? compareSlots.length : FREE_MAX_SLOTS);

    return (
      <View style={styles.slotsSection}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>對比欄位</Text>
        <Text style={[styles.slotHint, { color: colors.muted }]}>長按拖動可調換位置</Text>
        <GestureHandlerRootView style={styles.slotsContainer}>
          <View style={styles.slotsRow}>
            {displaySlots.map((school, index) => (
              <DraggableSlot
                key={school?.id || `empty-${index}`}
                school={school}
                index={index}
                totalSlots={displaySlots.length}
              />
            ))}

            {/* Blurred paywall slot for Free users */}
            {!IS_PRO_USER && renderPaywallSlot()}
          </View>
        </GestureHandlerRootView>
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
          <Text style={[styles.favoriteSchoolName, { color: colors.foreground }]} numberOfLines={1}>{school.name}</Text>
          <Text style={[styles.favoriteSchoolInfo, { color: colors.muted }]}>{school.category} · {school.district}</Text>
          {alreadyInCompare && (
            <View style={styles.inCompareBadge}>
              <Text style={[styles.inCompareBadgeText, { color: colors.primary }]}>已加入對比</Text>
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
                { backgroundColor: colors.primary },
                alreadyInCompare && [styles.favoriteActionDisabled, { backgroundColor: colors.muted + "33" }]
              ]}
              onPress={() => !alreadyInCompare && handleAddToCompare(school)}
              disabled={alreadyInCompare}
            >
              <Text style={[
                styles.favoriteActionText,
                alreadyInCompare ? [styles.favoriteActionDisabledText, { color: colors.muted }] : styles.favoriteActionPrimaryText
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
      <Text style={[styles.sectionTitle, { color: colors.foreground }]}>我的收藏 ({favorites.length})</Text>
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

  // Render simple name search modal
  const renderSearchModal = () => {
    const hasQuery = searchQuery.trim().length > 0;

    return (
      <Modal
        visible={showSearchModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowSearchModal(false)}
      >
        <View style={styles.searchModalOverlay}>
          {/* Backdrop - click to close */}
          <Pressable
            style={styles.searchModalBackdrop}
            onPress={() => setShowSearchModal(false)}
          />

          <View style={[styles.searchPopupContainer, { paddingBottom: insets.bottom + 16 }]}>
            <View style={styles.searchPopupHeader}>
              <Text style={styles.searchPopupTitle}>搜尋學校</Text>
              <TouchableOpacity onPress={() => setShowSearchModal(false)}>
                <Text style={styles.searchModalClose}>×</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.searchInputContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="輸入學校名稱..."
                placeholderTextColor={colors.muted + "66"}
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoFocus
              />
            </View>

            {hasQuery ? (
              searchResults.length > 0 ? (
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
                            {item.category} · {item.district}
                          </Text>
                        </View>
                        {alreadyInCompare ? (
                          <Text style={styles.searchResultBadge}>已加入</Text>
                        ) : (
                          <Text style={styles.searchResultAddIcon}>+</Text>
                        )}
                      </TouchableOpacity>
                    );
                  }}
                  style={styles.searchResultsList}
                />
              ) : (
                <View style={styles.searchEmptyContainer}>
                  <Text style={styles.searchNoResults}>找不到相關學校</Text>
                </View>
              )
            ) : (
              <View style={styles.searchHintContainer}>
                <Text style={styles.searchHint}>輸入學校名稱開始搜尋</Text>
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
      <Pressable style={styles.modalOverlay} onPress={() => { setShowSlotPicker(false); setPendingSchool(null); }}>
        <Pressable style={styles.slotPickerContainer} onPress={(e) => e.stopPropagation()}>
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
                <Text style={[styles.slotPickerOptionLabel, { color: colors.primary }]}>
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
        </Pressable>
      </Pressable>
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
      <Pressable style={styles.modalOverlay} onPress={() => setShowPaywallModal(false)}>
        <Pressable style={styles.paywallModalContainer} onPress={(e) => e.stopPropagation()}>
          <Text style={[styles.paywallModalTitle, { color: colors.primary }]}>升級會員</Text>
          <Text style={styles.paywallModalText}>
            升級 Pro 會員可解鎖更多功能：
          </Text>
          <View style={styles.paywallFeatures}>
            <Text style={styles.paywallFeatureItem}>• 同時對比最多 10 間學校</Text>
            <Text style={styles.paywallFeatureItem}>• 查看完整精選學校列表</Text>
            <Text style={styles.paywallFeatureItem}>• 無限制使用 AI 學校顧問</Text>
          </View>

          <TouchableOpacity
            style={[styles.paywallModalButton, { backgroundColor: colors.primary }]}
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
        </Pressable>
      </Pressable>
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
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <MaxWidthWrapper>
        <View style={[styles.header, { paddingTop: insets.top }]}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={[styles.backButton, { backgroundColor: `${colors.foreground}1A` }]}
            activeOpacity={0.7}
          >
            <IconSymbol name="chevron.right" size={24} color={colors.foreground} style={{ transform: [{ rotate: "180deg" }] }} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.foreground }]}>心儀學校比一比</Text>
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
      </MaxWidthWrapper>

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
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    ...TypographyStyles.title,
    letterSpacing: 1,
  },
  placeholder: {
    width: 40,
  },
  content: {
    paddingHorizontal: Spacing.lg,
  },

  // Section title
  sectionTitle: {
    ...TypographyStyles.heading,
    marginBottom: Spacing.md,
    textAlign: "center",
  },

  // Featured section
  featuredSection: {
    marginBottom: Spacing.xl,
    alignItems: "center",
  },
  featuredHeader: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.md,
    gap: Spacing.lg,
  },
  featuredRow: {
    flexDirection: "row",
    gap: Spacing.md,
    justifyContent: "center",
  },
  featuredPill: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: BorderRadiusPresets.buttonPill,
    borderWidth: 1,
    borderColor: "#E8E2D5",
  },
  featuredPillActive: {
    // backgroundColor and borderColor will be set dynamically
  },
  featuredPillText: {
    ...TypographyStyles.caption,
    color: "#706B5E",
  },
  featuredPillTextActive: {
    fontWeight: TypographyStyles.heading.fontWeight,
    // color will be set dynamically
  },
  refreshButton: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadiusPresets.button,
    // backgroundColor will be set dynamically
  },
  refreshButtonText: {
    ...TypographyStyles.small,
    fontWeight: TypographyStyles.heading.fontWeight,
    // color will be set dynamically
  },

  // Empty compare state
  emptyCompareSection: {
    alignItems: "center",
    paddingVertical: Spacing["3xl"],
    marginBottom: Spacing.xl,
  },
  emptyCompareIcon: {
    fontSize: 48,
    marginBottom: Spacing.lg,
  },
  emptyCompareTitle: {
    ...TypographyStyles.heading,
    fontSize: 18,
    color: "#2D2013",
    marginBottom: Spacing.sm,
  },
  emptyCompareHint: {
    ...TypographyStyles.caption,
    fontSize: 13,
    color: "#8B8578",
    textAlign: "center",
  },

  // Comparison table
  comparisonSection: {
    marginBottom: Spacing.xl,
    alignItems: "center",
  },
  compareContainer: {
    backgroundColor: "rgba(255,255,255,0.6)",
    borderRadius: BorderRadiusPresets.card,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.08)",
  },
  compareRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.06)",
  },
  dimensionCell: {
    width: 70,
    padding: Spacing.md,
    backgroundColor: "rgba(30, 58, 95, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
  },
  dimensionIcon: {
    fontSize: TypographyStyles.caption.fontSize,
  },
  dimensionLabel: {
    ...TypographyStyles.tiny,
    fontSize: 11,
    textAlign: "center",
  },
  schoolCell: {
    flex: 1,
    padding: Spacing.md,
    justifyContent: "center",
    alignItems: "center",
  },
  schoolName: {
    ...TypographyStyles.small,
    fontWeight: TypographyStyles.heading.fontWeight,
    textAlign: "center",
  },
  valueCell: {
    flex: 1,
    padding: Spacing.md,
    justifyContent: "center",
    alignItems: "center",
  },
  valueText: {
    ...TypographyStyles.tiny,
    fontSize: 11,
    textAlign: "center",
  },
  highlightCell: {
    flex: 1,
    padding: Spacing.md,
    justifyContent: "center",
    gap: 2,
  },
  highlightText: {
    ...TypographyStyles.tiny,
  },
  disclaimer: {
    ...TypographyStyles.tiny,
    textAlign: "center",
    marginTop: Spacing.md,
  },
  compareTableWrapper: {
    flexDirection: "row",
    gap: Spacing.sm,
  },

  // Locked column (paywall) - skeleton + CTA design
  lockedColumn: {
    width: 110,
    backgroundColor: "rgba(255,255,255,0.03)",
    borderRadius: BorderRadiusPresets.card,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    overflow: "hidden",
  },
  lockedColumnHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.sm,
    backgroundColor: "rgba(0,217,255,0.08)",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.06)",
  },
  lockedColumnLock: {
    fontSize: TypographyStyles.small.fontSize,
  },
  lockedColumnHeaderText: {
    ...TypographyStyles.tiny,
    fontSize: 11,
    color: "rgba(0,217,255,0.8)",
    fontWeight: TypographyStyles.heading.fontWeight,
  },
  lockedColumnRow: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.04)",
  },
  skeletonBar: {
    height: 10,
    borderRadius: BorderRadius.xs,
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  skeletonBarLong: {
    width: "85%",
  },
  skeletonBarShort: {
    width: "60%",
  },
  lockedColumnCTA: {
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.md,
    alignItems: "center",
    backgroundColor: "rgba(0,217,255,0.06)",
  },
  lockedColumnCTATitle: {
    ...TypographyStyles.small,
    fontWeight: TypographyStyles.heading.fontWeight,
    textAlign: "center",
    marginBottom: Spacing.xs,
    // color will be set dynamically
  },
  lockedColumnCTASubtitle: {
    ...TypographyStyles.tiny,
    fontSize: 9,
    color: "#8B8578",
    textAlign: "center",
    marginBottom: Spacing.md,
  },
  lockedColumnCTAButton: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadiusPresets.button,
    borderWidth: 1,
    // backgroundColor and borderColor will be set dynamically
  },
  lockedColumnCTAButtonText: {
    ...TypographyStyles.tiny,
    fontWeight: TypographyStyles.heading.fontWeight,
    // color will be set dynamically
  },

  // Compare slots
  slotsSection: {
    marginBottom: Spacing.xl,
    alignItems: "center",
  },
  slotHint: {
    ...TypographyStyles.tiny,
    fontSize: 11,
    marginBottom: Spacing.md,
    opacity: 0.6,
  },
  slotsContainer: {
    width: "100%",
  },
  slotsRow: {
    flexDirection: "row",
    gap: Spacing.md,
    justifyContent: "center",
  },
  slotFilled: {
    width: 120,
    height: 120,
    backgroundColor: "rgba(30, 58, 95, 0.1)",
    borderRadius: BorderRadiusPresets.card,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: "rgba(30, 58, 95, 0.2)",
    position: "relative",
  },
  slotEmpty: {
    width: 120,
    height: 120,
    backgroundColor: "rgba(255,255,255,0.6)",
    borderRadius: BorderRadiusPresets.card,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
  },
  slotPaywall: {
    width: 120,
    height: 120,
    borderRadius: BorderRadiusPresets.card,
    backgroundColor: "rgba(30, 58, 95, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(30, 58, 95, 0.15)",
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.md,
  },
  slotPaywallLock: {
    fontSize: 24,
    marginBottom: Spacing.sm,
  },
  slotPaywallTitle: {
    ...TypographyStyles.caption,
    fontSize: 13,
    fontWeight: TypographyStyles.heading.fontWeight,
    textAlign: "center",
  },
  slotPaywallSubtitle: {
    ...TypographyStyles.tiny,
    fontSize: 11,
    textAlign: "center",
    marginTop: 2,
  },
  slotLabel: {
    ...TypographyStyles.small,
    marginBottom: Spacing.xs,
  },
  slotSchoolName: {
    ...TypographyStyles.caption,
    fontSize: 13,
    fontWeight: TypographyStyles.heading.fontWeight,
    marginBottom: Spacing.xs,
  },
  slotSchoolInfo: {
    ...TypographyStyles.tiny,
  },
  slotEmptyIcon: {
    fontSize: 24,
    marginBottom: Spacing.xs,
  },
  slotEmptyText: {
    ...TypographyStyles.small,
  },
  slotRemoveButton: {
    position: "absolute",
    top: Spacing.xs,
    right: Spacing.xs,
    width: 22,
    height: 22,
    borderRadius: BorderRadius.full,
    backgroundColor: "rgba(0,0,0,0.1)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  slotRemoveText: {
    fontSize: TypographyStyles.caption.fontSize,
    fontWeight: TypographyStyles.heading.fontWeight,
  },
  slotDragHandle: {
    position: "absolute",
    bottom: Spacing.sm,
    right: Spacing.sm,
    opacity: 0.4,
  },
  slotDragIcon: {
    fontSize: TypographyStyles.small.fontSize,
    color: "#666",
    letterSpacing: -2,
  },

  // Favorites
  favoritesSection: {
    marginBottom: Spacing.xl,
    alignItems: "center",
  },
  favoritesRow: {
    flexDirection: "row",
    gap: Spacing.md,
    justifyContent: "center",
  },
  favoriteCard: {
    width: 160,
    backgroundColor: "rgba(255,255,255,0.6)",
    borderRadius: BorderRadiusPresets.button,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.08)",
  },
  favoriteCardExpanded: {
    backgroundColor: "rgba(255,255,255,0.8)",
    borderColor: "rgba(30, 58, 95, 0.2)",
  },
  favoriteCardContent: {
    marginBottom: 0,
  },
  favoriteSchoolName: {
    ...TypographyStyles.caption,
    fontWeight: TypographyStyles.heading.fontWeight,
    marginBottom: Spacing.xs,
  },
  favoriteSchoolInfo: {
    ...TypographyStyles.small,
  },
  inCompareBadge: {
    backgroundColor: "rgba(30, 58, 95, 0.15)",
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
    alignSelf: "flex-start",
    marginTop: Spacing.sm,
  },
  inCompareBadgeText: {
    ...TypographyStyles.tiny,
    fontWeight: TypographyStyles.heading.fontWeight,
  },
  favoriteActions: {
    marginTop: Spacing.md,
    gap: Spacing.sm,
  },
  favoriteActionButton: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.sm,
    backgroundColor: "rgba(255,255,255,0.1)",
    alignItems: "center",
  },
  favoriteActionPrimary: {
    // backgroundColor will be set dynamically
  },
  favoriteActionDisabled: {
    // backgroundColor will be set dynamically using colors.muted
  },
  favoriteActionText: {
    ...TypographyStyles.small,
    color: "#FFFFFF",
    fontWeight: TypographyStyles.heading.fontWeight,
  },
  favoriteActionPrimaryText: {
    color: "#FAF8F5",
  },
  favoriteActionDisabledText: {
    // color will be set dynamically using colors.muted
  },
  emptyFavorites: {
    paddingVertical: Spacing.xl,
    alignItems: "center",
  },
  emptyFavoritesText: {
    ...TypographyStyles.caption,
    color: "#8B8578",
    marginBottom: Spacing.xs,
  },
  emptyFavoritesHint: {
    ...TypographyStyles.small,
    color: "#B0ABA3",
    textAlign: "center",
  },

  // Search popup (simplified)
  searchModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.xl,
  },
  searchModalBackdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  searchPopupContainer: {
    backgroundColor: "#FFF9F0",
    borderRadius: BorderRadiusPresets.modal,
    width: "100%",
    maxWidth: 360,
    maxHeight: "70%",
    overflow: "hidden",
  },
  searchPopupHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.md,
  },
  searchPopupTitle: {
    ...TypographyStyles.heading,
    fontSize: 18,
    color: "#2D2013",
  },
  searchModalClose: {
    fontSize: 28,
    color: "#706B5E",
  },
  searchInputContainer: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.md,
  },
  searchInput: {
    backgroundColor: "#FAF8F5",
    borderRadius: BorderRadiusPresets.button,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    ...TypographyStyles.body,
    fontSize: 15,
    color: "#2D2013",
    borderWidth: 1,
    borderColor: "#E8E2D5",
  },
  searchResultsList: {
    maxHeight: 300,
  },
  searchResultItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E2D5",
  },
  searchResultItemDisabled: {
    opacity: 0.5,
  },
  searchResultInfo: {
    flex: 1,
  },
  searchResultName: {
    ...TypographyStyles.caption,
    fontWeight: TypographyStyles.heading.fontWeight,
    color: "#2D2013",
    marginBottom: 2,
  },
  searchResultMeta: {
    ...TypographyStyles.tiny,
    fontSize: 11,
    color: "#8B8578",
  },
  searchResultAddIcon: {
    fontSize: 24,
    color: "#0a7ea4",
    fontWeight: "300",
    marginLeft: Spacing.md,
  },
  searchResultBadge: {
    ...TypographyStyles.small,
    color: "#9A9488",
    marginLeft: Spacing.md,
  },
  searchEmptyContainer: {
    alignItems: "center",
    paddingVertical: Spacing["2xl"],
  },
  searchNoResults: {
    textAlign: "center",
    color: "#8B8578",
    ...TypographyStyles.caption,
  },
  searchHintContainer: {
    alignItems: "center",
    paddingVertical: Spacing["2xl"],
  },
  searchHint: {
    ...TypographyStyles.caption,
    color: "#9A9488",
  },

  // Slot picker modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.xl,
  },
  slotPickerContainer: {
    backgroundColor: "#FFF9F0",
    borderRadius: BorderRadiusPresets.modal,
    padding: Spacing.xl,
    width: "100%",
    maxWidth: 320,
  },
  slotPickerTitle: {
    ...TypographyStyles.heading,
    fontSize: 18,
    color: "#2D2013",
    textAlign: "center",
    marginBottom: Spacing.sm,
  },
  slotPickerSubtitle: {
    ...TypographyStyles.caption,
    color: "#706B5E",
    textAlign: "center",
    marginBottom: Spacing.xl,
  },
  slotPickerOptions: {
    gap: Spacing.md,
  },
  slotPickerOption: {
    backgroundColor: "#FAF8F5",
    borderRadius: BorderRadiusPresets.button,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: "#E8E2D5",
  },
  slotPickerOptionLabel: {
    ...TypographyStyles.small,
    fontWeight: TypographyStyles.heading.fontWeight,
    marginBottom: Spacing.xs,
    // color will be set dynamically
  },
  slotPickerOptionSchool: {
    ...TypographyStyles.caption,
    color: "#2D2013",
  },
  slotPickerCancel: {
    marginTop: Spacing.lg,
    paddingVertical: Spacing.md,
    alignItems: "center",
  },
  slotPickerCancelText: {
    ...TypographyStyles.caption,
    color: "#706B5E",
  },

  // Paywall modal
  paywallModalContainer: {
    backgroundColor: "#FFF9F0",
    borderRadius: BorderRadiusPresets.modal,
    padding: Spacing.xl,
    width: "100%",
    maxWidth: 320,
    alignItems: "center",
  },
  paywallModalTitle: {
    ...TypographyStyles.title,
    fontSize: 22,
    marginBottom: Spacing.md,
    // color will be set dynamically
  },
  paywallModalText: {
    ...TypographyStyles.caption,
    color: "#706B5E",
    textAlign: "center",
    marginBottom: Spacing.lg,
  },
  paywallFeatures: {
    alignSelf: "stretch",
    marginBottom: Spacing.xl,
  },
  paywallFeatureItem: {
    ...TypographyStyles.caption,
    color: "#2D2013",
    marginBottom: Spacing.sm,
  },
  paywallModalButton: {
    // backgroundColor will be set dynamically
    paddingVertical: SpacingPresets.buttonPaddingVertical,
    paddingHorizontal: Spacing["2xl"],
    borderRadius: BorderRadiusPresets.buttonPill,
    width: "100%",
    alignItems: "center",
  },
  paywallModalButtonText: {
    ...TypographyStyles.body,
    fontWeight: TypographyStyles.heading.fontWeight,
    color: "#FAF8F5",
  },
  paywallModalClose: {
    marginTop: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  paywallModalCloseText: {
    ...TypographyStyles.caption,
    color: "#8B8578",
  },

  // Toast
  toastContainer: {
    position: "absolute",
    bottom: 100,
    left: Spacing.xl,
    right: Spacing.xl,
    backgroundColor: "rgba(0,0,0,0.8)",
    borderRadius: BorderRadiusPresets.button,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    alignItems: "center",
  },
  toastText: {
    ...TypographyStyles.caption,
    color: "#FFFFFF",
  },
});
