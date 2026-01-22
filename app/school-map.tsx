import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Modal } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useState, useMemo, useEffect, useCallback } from "react";
import { SCHOOLS } from "@/data/schools";
import { School, District } from "@/types/school";
import { SchoolMap, MapLegend } from "@/components/school-map";
import { MapSetStorage, FavoritesStorage, type MapSource, type MapSet } from "@/lib/storage";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

// Max pins/items to display for performance
const MAX_DISPLAY_ITEMS = 80;

// Source labels in zh-Hant
const SOURCE_LABELS: Record<MapSource, string> = {
  filters: "最近篩選",
  qa: "Q&A 結果",
  favorites: "我的收藏",
};

// 學校類型顏色（與地圖組件保持一致）
const CATEGORY_COLORS: Record<string, string> = {
  國際: "#00D9FF",
  直資: "#F59E0B",
  私立: "#8B5CF6",
  資助: "#22C55E",
  公立: "#6B7280",
};

export default function SchoolMapScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [viewMode, setViewMode] = useState<"map" | "list">("map");
  const [isLoading, setIsLoading] = useState(true);
  const [currentSet, setCurrentSet] = useState<MapSet | null>(null);
  const [availableSources, setAvailableSources] = useState<MapSource[]>([]);
  const [showSourceSheet, setShowSourceSheet] = useState(false);

  // Load current set on mount
  useEffect(() => {
    loadCurrentSet();
  }, []);

  const loadCurrentSet = async () => {
    setIsLoading(true);
    try {
      const set = await MapSetStorage.getCurrentSet();
      const sources = await MapSetStorage.getAvailableSources();
      setCurrentSet(set);
      setAvailableSources(sources);
    } catch (error) {
      console.error("Failed to load map set:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Convert school IDs to school objects
  const displaySchools = useMemo(() => {
    if (!currentSet || currentSet.schoolIds.length === 0) {
      return [];
    }
    const schoolMap = new Map(SCHOOLS.map((s) => [s.id, s]));
    const schools = currentSet.schoolIds
      .map((id) => schoolMap.get(id))
      .filter((s): s is School => s !== undefined);
    // Cap to MAX_DISPLAY_ITEMS
    return schools.slice(0, MAX_DISPLAY_ITEMS);
  }, [currentSet]);

  const totalCount = currentSet?.schoolIds.length || 0;

  const handleSchoolPress = (schoolId: string) => {
    router.push(`/school/${schoolId}` as any);
  };

  const handleSchoolSelect = (school: School) => {
    router.push(`/school/${school.id}` as any);
  };

  const handleGoToFilters = () => {
    router.push("/(tabs)/search" as any);
  };

  const handleGoToQA = () => {
    router.push("/quiz" as any);
  };

  const handleSourceSwitch = async (source: MapSource) => {
    await MapSetStorage.saveMapSource(source);
    setShowSourceSheet(false);
    await loadCurrentSet();
  };

  const renderSchoolItem = (school: School) => {
    const categoryColor = CATEGORY_COLORS[school.category] || "#6B7280";

    return (
      <TouchableOpacity
        key={school.id}
        style={styles.schoolItem}
        onPress={() => handleSchoolPress(school.id)}
        activeOpacity={0.7}
      >
        <View style={styles.schoolInfo}>
          <Text style={styles.schoolName} numberOfLines={1}>{school.name}</Text>
          <Text style={styles.schoolNameEn} numberOfLines={1}>{school.nameEn}</Text>
          <View style={styles.schoolMeta}>
            <View style={[styles.categoryTag, { backgroundColor: `${categoryColor}20` }]}>
              <Text style={[styles.categoryTagText, { color: categoryColor }]}>
                {school.category}
              </Text>
            </View>
            <View style={[styles.levelTag, { backgroundColor: "rgba(255,255,255,0.1)" }]}>
              <Text style={styles.levelTagText}>{school.level}</Text>
            </View>
          </View>
        </View>
        <IconSymbol name="chevron.right" size={16} color="rgba(255,255,255,0.3)" />
      </TouchableOpacity>
    );
  };

  // Empty state when no sets exist
  const renderEmptyState = () => (
    <View style={styles.emptyStateContainer}>
      <View style={styles.emptyStateCard}>
        <Text style={styles.emptyStateIcon}>🗺️</Text>
        <Text style={styles.emptyStateTitle}>先選一批學校，再看地圖</Text>
        <Text style={styles.emptyStateSubtitle}>
          篩選或回答問題後，就能在地圖上查看學校位置
        </Text>

        <TouchableOpacity
          style={styles.emptyStatePrimaryButton}
          onPress={handleGoToFilters}
          activeOpacity={0.85}
        >
          <Text style={styles.emptyStatePrimaryButtonText}>去篩選找學校</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.emptyStateSecondaryButton}
          onPress={handleGoToQA}
          activeOpacity={0.75}
        >
          <Text style={styles.emptyStateSecondaryButtonText}>用 Q&A 快速篩一遍</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Source switch bottom sheet
  const renderSourceSheet = () => (
    <Modal
      visible={showSourceSheet}
      transparent
      animationType="slide"
      onRequestClose={() => setShowSourceSheet(false)}
    >
      <TouchableOpacity
        style={styles.sheetOverlay}
        activeOpacity={1}
        onPress={() => setShowSourceSheet(false)}
      >
        <View style={styles.sheetContainer}>
          <View style={styles.sheetHandle} />
          <Text style={styles.sheetTitle}>切換顯示來源</Text>

          {availableSources.map((source) => {
            const isSelected = currentSet?.source === source;
            return (
              <TouchableOpacity
                key={source}
                style={[styles.sheetOption, isSelected && styles.sheetOptionSelected]}
                onPress={() => handleSourceSwitch(source)}
                activeOpacity={0.7}
              >
                <Text style={[styles.sheetOptionText, isSelected && styles.sheetOptionTextSelected]}>
                  {SOURCE_LABELS[source]}
                </Text>
                {isSelected && (
                  <IconSymbol name="checkmark" size={18} color="#00D9FF" />
                )}
              </TouchableOpacity>
            );
          })}

          <TouchableOpacity
            style={styles.sheetCancelButton}
            onPress={() => setShowSourceSheet(false)}
            activeOpacity={0.7}
          >
            <Text style={styles.sheetCancelText}>取消</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );

  // Loading state
  if (isLoading) {
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
          <Text style={styles.headerTitle}>學校在哪裡</Text>
          <View style={{ width: 40 }} />
        </View>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>載入中...</Text>
        </View>
      </View>
    );
  }

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
        <Text style={styles.headerTitle}>學校在哪裡</Text>
        {/* Header actions - only show when we have a set */}
        {currentSet ? (
          <View style={styles.headerActions}>
            {/* Adjust filters button */}
            <TouchableOpacity
              onPress={handleGoToFilters}
              style={styles.headerActionButton}
              activeOpacity={0.7}
            >
              <Text style={styles.headerActionIcon}>🎚️</Text>
            </TouchableOpacity>
            {/* Switch source button - only if multiple sources available */}
            {availableSources.length > 1 && (
              <TouchableOpacity
                onPress={() => setShowSourceSheet(true)}
                style={styles.headerActionButton}
                activeOpacity={0.7}
              >
                <Text style={styles.headerActionIcon}>🔄</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <View style={{ width: 40 }} />
        )}
      </View>

      {/* No set - show empty state */}
      {!currentSet ? (
        renderEmptyState()
      ) : (
        <ScrollView
          style={styles.content}
          contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Status bar showing current source */}
          <View style={styles.statusBar}>
            <Text style={styles.statusText}>
              已顯示：{SOURCE_LABELS[currentSet.source]}（{totalCount}）
            </Text>
            {/* View toggle */}
            <TouchableOpacity
              onPress={() => setViewMode(viewMode === "map" ? "list" : "map")}
              style={styles.viewToggle}
              activeOpacity={0.7}
            >
              <Text style={styles.viewToggleText}>
                {viewMode === "map" ? "📋 列表" : "🗺️ 地圖"}
              </Text>
            </TouchableOpacity>
          </View>

          {viewMode === "map" ? (
            <>
              {/* Map view */}
              <View style={styles.mapSection}>
                <SchoolMap
                  schools={displaySchools}
                  selectedDistrict="all"
                  onSchoolSelect={handleSchoolSelect}
                  height={Math.min(SCREEN_WIDTH - 32, 400)}
                />
                <MapLegend />
              </View>

              {/* School list below map */}
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>學校列表</Text>
                  <Text style={styles.schoolCount}>
                    {displaySchools.length}{totalCount > MAX_DISPLAY_ITEMS ? `/${totalCount}` : ""} 所
                  </Text>
                </View>

                <View style={styles.schoolList}>
                  {displaySchools.slice(0, 10).map(renderSchoolItem)}
                  {displaySchools.length > 10 && (
                    <TouchableOpacity
                      style={styles.showMoreButton}
                      onPress={() => setViewMode("list")}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.showMoreText}>
                        查看全部 {displaySchools.length} 所學校 →
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </>
          ) : (
            /* List view */
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>學校列表</Text>
                <Text style={styles.schoolCount}>
                  {displaySchools.length}{totalCount > MAX_DISPLAY_ITEMS ? `/${totalCount}` : ""} 所
                </Text>
              </View>

              <View style={styles.schoolList}>
                {displaySchools.map(renderSchoolItem)}
              </View>
            </View>
          )}

          {/* Tip */}
          <View style={styles.tipContainer}>
            <Text style={styles.tipIcon}>💡</Text>
            <Text style={styles.tipText}>
              {viewMode === "map"
                ? "點擊地圖上的標記可查看學校詳情"
                : "點擊學校卡片可查看詳細資訊"}
            </Text>
          </View>
        </ScrollView>
      )}

      {renderSourceSheet()}
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
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerActionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerActionIcon: {
    fontSize: 18,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  statusBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(0,217,255,0.1)",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(0,217,255,0.2)",
  },
  statusText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#00D9FF",
  },
  viewToggle: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  viewToggleText: {
    fontSize: 13,
    color: "#FFFFFF",
    fontWeight: "500",
  },
  mapSection: {
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  schoolCount: {
    fontSize: 14,
    color: "rgba(255,255,255,0.5)",
  },
  schoolList: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  schoolItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.05)",
  },
  schoolInfo: {
    flex: 1,
    marginRight: 12,
  },
  schoolName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 2,
  },
  schoolNameEn: {
    fontSize: 12,
    color: "rgba(255,255,255,0.5)",
    marginBottom: 8,
  },
  schoolMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  categoryTag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  categoryTagText: {
    fontSize: 11,
    fontWeight: "600",
  },
  levelTag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  levelTagText: {
    fontSize: 11,
    fontWeight: "500",
    color: "rgba(255,255,255,0.6)",
  },
  showMoreButton: {
    padding: 16,
    alignItems: "center",
    backgroundColor: "rgba(0,217,255,0.1)",
  },
  showMoreText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#00D9FF",
  },
  tipContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,217,255,0.1)",
    borderRadius: 12,
    padding: 14,
    gap: 10,
    marginTop: 8,
  },
  tipIcon: {
    fontSize: 16,
  },
  tipText: {
    flex: 1,
    fontSize: 13,
    color: "rgba(255,255,255,0.6)",
    lineHeight: 18,
  },
  // Empty state styles
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  emptyStateCard: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 24,
    padding: 32,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    width: "100%",
    maxWidth: 340,
  },
  emptyStateIcon: {
    fontSize: 64,
    marginBottom: 20,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  emptyStateSubtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.5)",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 28,
  },
  emptyStatePrimaryButton: {
    backgroundColor: "#00D9FF",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 25,
    width: "100%",
    marginBottom: 12,
    shadowColor: "#00D9FF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  emptyStatePrimaryButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0F1629",
    textAlign: "center",
    letterSpacing: 1,
  },
  emptyStateSecondaryButton: {
    backgroundColor: "transparent",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 25,
    width: "100%",
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.2)",
  },
  emptyStateSecondaryButtonText: {
    fontSize: 15,
    fontWeight: "500",
    color: "rgba(255,255,255,0.7)",
    textAlign: "center",
    letterSpacing: 0.5,
  },
  // Loading state
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: "rgba(255,255,255,0.5)",
  },
  // Source sheet styles
  sheetOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "flex-end",
  },
  sheetContainer: {
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
    marginBottom: 20,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 20,
    letterSpacing: 0.5,
  },
  sheetOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  sheetOptionSelected: {
    backgroundColor: "rgba(0,217,255,0.1)",
    borderColor: "rgba(0,217,255,0.3)",
  },
  sheetOptionText: {
    fontSize: 16,
    fontWeight: "500",
    color: "rgba(255,255,255,0.7)",
  },
  sheetOptionTextSelected: {
    color: "#00D9FF",
    fontWeight: "600",
  },
  sheetCancelButton: {
    paddingVertical: 16,
    marginTop: 10,
  },
  sheetCancelText: {
    fontSize: 15,
    fontWeight: "500",
    color: "rgba(255,255,255,0.5)",
    textAlign: "center",
  },
});
