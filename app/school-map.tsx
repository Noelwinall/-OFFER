import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Modal, Platform, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useState, useMemo, useEffect, useCallback, useContext } from "react";
import { SCHOOLS } from "@/data/schools";
import type { School, District18 } from "@/types/school";
import { DISTRICT_MAP_DATA, calculateAllDistrictStats, REGION_COLORS, type DistrictStats, type DistrictMapInfo } from "@/lib/district-map-data";
import { MapSetStorage } from "@/lib/storage";
import { FilterContext } from "@/lib/filter-context";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const isWeb = Platform.OS === "web";

// Category display order and colors
const CATEGORY_ORDER: Array<{ key: string; label: string; color: string }> = [
  { key: "公立", label: "公立", color: "#6B7280" },
  { key: "資助", label: "資助", color: "#22C55E" },
  { key: "直資", label: "直資", color: "#F59E0B" },
  { key: "私立", label: "私立", color: "#8B5CF6" },
  { key: "國際", label: "國際", color: "#00D9FF" },
];

export default function SchoolMapScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const filterContext = useContext(FilterContext);

  // Selected district state (for mobile tap interaction)
  const [selectedDistrict, setSelectedDistrict] = useState<District18 | null>(null);
  // Hovered district (for web hover interaction)
  const [hoveredDistrict, setHoveredDistrict] = useState<District18 | null>(null);
  // Mobile bottom sheet visibility
  const [showMobileSheet, setShowMobileSheet] = useState(false);
  // Last results for bottom panel
  const [lastQAIds, setLastQAIds] = useState<string[]>([]);
  const [lastFilterIds, setLastFilterIds] = useState<string[]>([]);

  // Calculate all district stats on mount
  const districtStats = useMemo(() => calculateAllDistrictStats(SCHOOLS), []);

  // Load last results on mount
  useEffect(() => {
    loadLastResults();
  }, []);

  const loadLastResults = async () => {
    const [qaResult, filterResult] = await Promise.all([
      MapSetStorage.getQAResult(),
      MapSetStorage.getFiltersResult(),
    ]);
    setLastQAIds(qaResult.ids);
    setLastFilterIds(filterResult.ids);
  };

  // Get schools from IDs
  const getSchoolsFromIds = useCallback((ids: string[], limit: number = 5): School[] => {
    const schoolMap = new Map(SCHOOLS.map((s) => [s.id, s]));
    return ids
      .map((id) => schoolMap.get(id))
      .filter((s): s is School => s !== undefined)
      .slice(0, limit);
  }, []);

  const lastQASchools = useMemo(() => getSchoolsFromIds(lastQAIds, 5), [lastQAIds, getSchoolsFromIds]);
  const lastFilterSchools = useMemo(() => getSchoolsFromIds(lastFilterIds, 5), [lastFilterIds, getSchoolsFromIds]);

  // Handle district interaction
  const handleDistrictPress = (district: District18) => {
    if (isWeb) {
      // Web: single click opens filters
      openFiltersWithDistrict(district);
    } else {
      // Mobile: first tap selects, second tap opens filters
      if (selectedDistrict === district) {
        // Second tap on same district -> open filters
        openFiltersWithDistrict(district);
        setShowMobileSheet(false);
        setSelectedDistrict(null);
      } else {
        // First tap or different district -> select and show sheet
        setSelectedDistrict(district);
        setShowMobileSheet(true);
      }
    }
  };

  // Handle web hover
  const handleDistrictHover = (district: District18 | null) => {
    if (isWeb) {
      setHoveredDistrict(district);
    }
  };

  // Open filters with district pre-selected
  const openFiltersWithDistrict = (district: District18) => {
    // Set district in filter context
    if (filterContext) {
      // Clear existing district18 and set the new one
      filterContext.dispatch({ type: "CLEAR_DISTRICT18" });
      filterContext.dispatch({ type: "TOGGLE_DISTRICT18", payload: district });
    }
    // Navigate to search with filter sheet
    router.push({
      pathname: "/(tabs)/search",
      params: { openFilter: "true", lockedDistrict: district },
    } as any);
  };

  // Navigate to Q&A
  const handleGoToQA = () => {
    router.push("/quiz" as any);
  };

  // Navigate to filters
  const handleGoToFilters = () => {
    router.push("/(tabs)/search" as any);
  };

  // Render district card
  const renderDistrictCard = (district: DistrictMapInfo) => {
    const stats = districtStats.get(district.id);
    const isSelected = selectedDistrict === district.id;
    const isHovered = hoveredDistrict === district.id;
    const isHighlighted = isSelected || isHovered;

    return (
      <Pressable
        key={district.id}
        style={[
          styles.districtCard,
          isHighlighted && styles.districtCardHighlighted,
          { borderColor: isHighlighted ? district.color : "rgba(255,255,255,0.1)" },
        ]}
        onPress={() => handleDistrictPress(district.id)}
        onHoverIn={() => handleDistrictHover(district.id)}
        onHoverOut={() => handleDistrictHover(null)}
      >
        <View style={[styles.districtBadge, { backgroundColor: district.color }]}>
          <Text style={styles.districtBadgeText}>{stats?.total || 0}</Text>
        </View>
        <Text style={[styles.districtName, isHighlighted && { color: district.color }]}>
          {district.name}
        </Text>
        {isHighlighted && stats && (
          <Text style={styles.districtKgCount}>幼稚園：{stats.kindergarten}</Text>
        )}
      </Pressable>
    );
  };

  // Render stats popover (web hover)
  const renderStatsPopover = () => {
    if (!isWeb || !hoveredDistrict) return null;

    const districtInfo = DISTRICT_MAP_DATA.find((d) => d.id === hoveredDistrict);
    const stats = districtStats.get(hoveredDistrict);

    if (!districtInfo || !stats) return null;

    return (
      <View style={styles.popoverContainer}>
        <View style={[styles.popover, { borderColor: districtInfo.color }]}>
          <Text style={[styles.popoverTitle, { color: districtInfo.color }]}>
            {districtInfo.name}
          </Text>
          <Text style={styles.popoverStat}>幼稚園：{stats.kindergarten}</Text>
          <View style={styles.popoverCategoryRow}>
            <Text style={styles.popoverCategoryStat}>公立：{stats.byCategory["公立"]}</Text>
            <Text style={styles.popoverCategoryStat}>資助：{stats.byCategory["資助"]}</Text>
            <Text style={styles.popoverCategoryStat}>直資：{stats.byCategory["直資"]}</Text>
          </View>
          <View style={styles.popoverCategoryRow}>
            <Text style={styles.popoverCategoryStat}>私立：{stats.byCategory["私立"]}</Text>
            <Text style={styles.popoverCategoryStat}>國際：{stats.byCategory["國際"]}</Text>
          </View>
          <Text style={styles.popoverHint}>點擊以篩選</Text>
        </View>
      </View>
    );
  };

  // Render mobile bottom sheet
  const renderMobileSheet = () => {
    if (!showMobileSheet || !selectedDistrict) return null;

    const districtInfo = DISTRICT_MAP_DATA.find((d) => d.id === selectedDistrict);
    const stats = districtStats.get(selectedDistrict);

    if (!districtInfo || !stats) return null;

    return (
      <Modal
        visible={showMobileSheet}
        transparent
        animationType="slide"
        onRequestClose={() => {
          setShowMobileSheet(false);
          setSelectedDistrict(null);
        }}
      >
        <Pressable
          style={styles.sheetOverlay}
          onPress={() => {
            setShowMobileSheet(false);
            setSelectedDistrict(null);
          }}
        >
          <View style={styles.mobileSheet}>
            <View style={styles.sheetHandle} />

            <View style={[styles.sheetHeader, { borderBottomColor: districtInfo.color }]}>
              <Text style={[styles.sheetTitle, { color: districtInfo.color }]}>
                {districtInfo.name}
              </Text>
              <View style={[styles.sheetBadge, { backgroundColor: districtInfo.color }]}>
                <Text style={styles.sheetBadgeText}>{stats.total} 所學校</Text>
              </View>
            </View>

            <View style={styles.sheetStats}>
              <View style={styles.sheetStatRow}>
                <Text style={styles.sheetStatLabel}>幼稚園</Text>
                <Text style={styles.sheetStatValue}>{stats.kindergarten}</Text>
              </View>
              <View style={styles.sheetStatRow}>
                <Text style={styles.sheetStatLabel}>小學</Text>
                <Text style={styles.sheetStatValue}>{stats.primary}</Text>
              </View>
              <View style={styles.sheetStatRow}>
                <Text style={styles.sheetStatLabel}>中學</Text>
                <Text style={styles.sheetStatValue}>{stats.secondary}</Text>
              </View>
            </View>

            <View style={styles.sheetCategoryGrid}>
              {CATEGORY_ORDER.map((cat) => (
                <View key={cat.key} style={styles.sheetCategoryItem}>
                  <View style={[styles.sheetCategoryDot, { backgroundColor: cat.color }]} />
                  <Text style={styles.sheetCategoryLabel}>{cat.label}</Text>
                  <Text style={styles.sheetCategoryCount}>
                    {stats.byCategory[cat.key as keyof typeof stats.byCategory]}
                  </Text>
                </View>
              ))}
            </View>

            <TouchableOpacity
              style={[styles.sheetButton, { backgroundColor: districtInfo.color }]}
              onPress={() => handleDistrictPress(selectedDistrict)}
              activeOpacity={0.85}
            >
              <Text style={styles.sheetButtonText}>再點一次篩選此區學校</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    );
  };

  // Render bottom split panel
  const renderBottomPanel = () => (
    <View style={styles.bottomPanel}>
      <View style={styles.bottomPanelHeader}>
        <Text style={styles.bottomPanelTitle}>上次結果</Text>
      </View>

      <View style={styles.bottomPanelContent}>
        {/* Left column: Q&A results */}
        <View style={styles.bottomPanelColumn}>
          <Text style={styles.columnTitle}>上次 Q&A 結果</Text>
          {lastQASchools.length > 0 ? (
            <>
              {lastQASchools.map((school) => (
                <TouchableOpacity
                  key={school.id}
                  style={styles.miniSchoolItem}
                  onPress={() => router.push(`/school/${school.id}` as any)}
                >
                  <Text style={styles.miniSchoolName} numberOfLines={1}>
                    {school.name}
                  </Text>
                </TouchableOpacity>
              ))}
              {lastQAIds.length > 5 && (
                <TouchableOpacity
                  style={styles.viewAllButton}
                  onPress={() => router.push("/recommendation" as any)}
                >
                  <Text style={styles.viewAllText}>查看全部 {lastQAIds.length} 所 →</Text>
                </TouchableOpacity>
              )}
            </>
          ) : (
            <View style={styles.emptyColumn}>
              <Text style={styles.emptyText}>未有結果</Text>
              <TouchableOpacity style={styles.columnCTA} onPress={handleGoToQA}>
                <Text style={styles.columnCTAText}>去問答選校</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Right column: Filters results */}
        <View style={styles.bottomPanelColumn}>
          <Text style={styles.columnTitle}>上次篩選結果</Text>
          {lastFilterSchools.length > 0 ? (
            <>
              {lastFilterSchools.map((school) => (
                <TouchableOpacity
                  key={school.id}
                  style={styles.miniSchoolItem}
                  onPress={() => router.push(`/school/${school.id}` as any)}
                >
                  <Text style={styles.miniSchoolName} numberOfLines={1}>
                    {school.name}
                  </Text>
                </TouchableOpacity>
              ))}
              {lastFilterIds.length > 5 && (
                <TouchableOpacity
                  style={styles.viewAllButton}
                  onPress={handleGoToFilters}
                >
                  <Text style={styles.viewAllText}>查看全部 {lastFilterIds.length} 所 →</Text>
                </TouchableOpacity>
              )}
            </>
          ) : (
            <View style={styles.emptyColumn}>
              <Text style={styles.emptyText}>未有結果</Text>
              <TouchableOpacity style={styles.columnCTA} onPress={handleGoToFilters}>
                <Text style={styles.columnCTAText}>去條件篩選學校</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );

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
        <Text style={styles.headerTitle}>選擇地區</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: insets.bottom + 200 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Instruction */}
        <View style={styles.instruction}>
          <Text style={styles.instructionText}>
            {isWeb ? "懸停查看統計，點擊進入篩選" : "點擊地區查看詳情，再點一次進入篩選"}
          </Text>
        </View>

        {/* 港島 Region */}
        <View style={styles.regionSection}>
          <View style={styles.regionHeader}>
            <View style={[styles.regionDot, { backgroundColor: REGION_COLORS["港島"] }]} />
            <Text style={styles.regionTitle}>港島</Text>
          </View>
          <View style={styles.districtGrid}>
            {DISTRICT_MAP_DATA.filter((d) => d.region === "港島").map(renderDistrictCard)}
          </View>
        </View>

        {/* 九龍 Region */}
        <View style={styles.regionSection}>
          <View style={styles.regionHeader}>
            <View style={[styles.regionDot, { backgroundColor: REGION_COLORS["九龍"] }]} />
            <Text style={styles.regionTitle}>九龍</Text>
          </View>
          <View style={styles.districtGrid}>
            {DISTRICT_MAP_DATA.filter((d) => d.region === "九龍").map(renderDistrictCard)}
          </View>
        </View>

        {/* 新界 Region */}
        <View style={styles.regionSection}>
          <View style={styles.regionHeader}>
            <View style={[styles.regionDot, { backgroundColor: REGION_COLORS["新界"] }]} />
            <Text style={styles.regionTitle}>新界</Text>
          </View>
          <View style={styles.districtGrid}>
            {DISTRICT_MAP_DATA.filter((d) => d.region === "新界").map(renderDistrictCard)}
          </View>
        </View>

        {/* Bottom split panel */}
        {renderBottomPanel()}
      </ScrollView>

      {/* Web hover popover */}
      {renderStatsPopover()}

      {/* Mobile bottom sheet */}
      {renderMobileSheet()}
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
    letterSpacing: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  instruction: {
    backgroundColor: "rgba(0,217,255,0.1)",
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(0,217,255,0.2)",
  },
  instructionText: {
    fontSize: 14,
    color: "#00D9FF",
    textAlign: "center",
    fontWeight: "500",
  },
  regionSection: {
    marginBottom: 24,
  },
  regionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 8,
  },
  regionDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  regionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 1,
  },
  districtGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  districtCard: {
    width: (SCREEN_WIDTH - 32 - 20) / 3,
    minWidth: 100,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 16,
    padding: 14,
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.1)",
  },
  districtCardHighlighted: {
    backgroundColor: "rgba(255,255,255,0.1)",
    transform: [{ scale: 1.02 }],
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  districtBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  districtBadgeText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0F1629",
  },
  districtName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
    textAlign: "center",
  },
  districtKgCount: {
    fontSize: 11,
    color: "rgba(255,255,255,0.6)",
    marginTop: 4,
  },
  // Popover styles (web)
  popoverContainer: {
    position: "absolute",
    top: 120,
    right: 20,
    zIndex: 1000,
  },
  popover: {
    backgroundColor: "rgba(26, 39, 68, 0.95)",
    borderRadius: 16,
    padding: 16,
    minWidth: 200,
    borderWidth: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 10,
  },
  popoverTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },
  popoverStat: {
    fontSize: 15,
    color: "#FFFFFF",
    marginBottom: 8,
    fontWeight: "600",
  },
  popoverCategoryRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 4,
  },
  popoverCategoryStat: {
    fontSize: 13,
    color: "rgba(255,255,255,0.7)",
  },
  popoverHint: {
    fontSize: 12,
    color: "rgba(255,255,255,0.4)",
    marginTop: 12,
    textAlign: "center",
  },
  // Mobile sheet styles
  sheetOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "flex-end",
  },
  mobileSheet: {
    backgroundColor: "#1a2744",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 40,
  },
  sheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 16,
  },
  sheetHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 16,
    borderBottomWidth: 2,
    marginBottom: 16,
  },
  sheetTitle: {
    fontSize: 22,
    fontWeight: "700",
  },
  sheetBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  sheetBadgeText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#0F1629",
  },
  sheetStats: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  sheetStatRow: {
    alignItems: "center",
  },
  sheetStatLabel: {
    fontSize: 13,
    color: "rgba(255,255,255,0.6)",
    marginBottom: 4,
  },
  sheetStatValue: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  sheetCategoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 24,
  },
  sheetCategoryItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    width: "45%",
  },
  sheetCategoryDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  sheetCategoryLabel: {
    fontSize: 14,
    color: "rgba(255,255,255,0.7)",
  },
  sheetCategoryCount: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  sheetButton: {
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: "center",
  },
  sheetButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0F1629",
  },
  // Bottom panel styles
  bottomPanel: {
    marginTop: 16,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  bottomPanelHeader: {
    marginBottom: 12,
  },
  bottomPanelTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  bottomPanelContent: {
    flexDirection: "row",
    gap: 12,
  },
  bottomPanelColumn: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.03)",
    borderRadius: 12,
    padding: 12,
  },
  columnTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "rgba(255,255,255,0.6)",
    marginBottom: 10,
  },
  miniSchoolItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.05)",
  },
  miniSchoolName: {
    fontSize: 13,
    color: "#FFFFFF",
  },
  viewAllButton: {
    paddingTop: 10,
  },
  viewAllText: {
    fontSize: 12,
    color: "#00D9FF",
    fontWeight: "500",
  },
  emptyColumn: {
    alignItems: "center",
    paddingVertical: 16,
  },
  emptyText: {
    fontSize: 13,
    color: "rgba(255,255,255,0.4)",
    marginBottom: 12,
  },
  columnCTA: {
    backgroundColor: "rgba(0,217,255,0.15)",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(0,217,255,0.3)",
  },
  columnCTAText: {
    fontSize: 13,
    color: "#00D9FF",
    fontWeight: "600",
  },
});
