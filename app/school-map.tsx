import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useState, useMemo } from "react";
import { SCHOOLS } from "@/data/schools";
import { School, District } from "@/types/school";
import { SchoolMap, MapLegend } from "@/components/school-map";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

// 地區數據
const DISTRICTS: { id: District | "all"; label: string; icon: string; color: string }[] = [
  { id: "all", label: "全部", icon: "🗺️", color: "#F59E0B" },
  { id: "港島", label: "港島區", icon: "🏝️", color: "#00D9FF" },
  { id: "九龍", label: "九龍區", icon: "🌆", color: "#7C3AED" },
  { id: "新界", label: "新界區", icon: "🏞️", color: "#10B981" },
];

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
  const [selectedDistrict, setSelectedDistrict] = useState<District | "all">("all");
  const [viewMode, setViewMode] = useState<"map" | "list">("map");

  // 按地區分組學校
  const schoolsByDistrict = useMemo(() => {
    const grouped: Record<District, School[]> = {
      "港島": [],
      "九龍": [],
      "新界": [],
    };
    SCHOOLS.forEach((school) => {
      if (grouped[school.district]) {
        grouped[school.district].push(school);
      }
    });
    return grouped;
  }, []);

  // 獲取地區統計
  const getDistrictStats = (district: District | "all") => {
    if (district === "all") {
      return { total: SCHOOLS.length };
    }
    return { total: schoolsByDistrict[district].length };
  };

  const handleSchoolPress = (schoolId: string) => {
    router.push(`/school/${schoolId}` as any);
  };

  const handleSchoolSelect = (school: School) => {
    router.push(`/school/${school.id}` as any);
  };

  const filteredSchools = selectedDistrict === "all" 
    ? SCHOOLS 
    : schoolsByDistrict[selectedDistrict];

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
        {/* 切換視圖按鈕 */}
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

      <ScrollView 
        style={styles.content}
        contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* 地區選擇標籤 */}
        <View style={styles.districtTabs}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.tabsContainer}>
              {DISTRICTS.map((district) => {
                const isSelected = selectedDistrict === district.id;
                const stats = getDistrictStats(district.id);
                return (
                  <TouchableOpacity
                    key={district.id}
                    style={[
                      styles.districtTab,
                      isSelected && { backgroundColor: district.color, borderColor: district.color },
                    ]}
                    onPress={() => setSelectedDistrict(district.id)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.tabIcon}>{district.icon}</Text>
                    <Text style={[styles.tabLabel, isSelected && styles.tabLabelActive]}>
                      {district.label}
                    </Text>
                    <View style={[styles.tabBadge, isSelected && styles.tabBadgeActive]}>
                      <Text style={[styles.tabBadgeText, isSelected && styles.tabBadgeTextActive]}>
                        {stats.total}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>

        {viewMode === "map" ? (
          <>
            {/* 互動式地圖 */}
            <View style={styles.mapSection}>
              <SchoolMap
                schools={SCHOOLS}
                selectedDistrict={selectedDistrict}
                onSchoolSelect={handleSchoolSelect}
                height={Math.min(SCREEN_WIDTH - 32, 400)}
              />
              <MapLegend />
            </View>

            {/* 地圖下方的學校快速列表 */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>
                  {selectedDistrict === "all" ? "所有學校" : `${selectedDistrict}學校`}
                </Text>
                <Text style={styles.schoolCount}>{filteredSchools.length} 所</Text>
              </View>
              
              <View style={styles.schoolList}>
                {filteredSchools.slice(0, 10).map(renderSchoolItem)}
                {filteredSchools.length > 10 && (
                  <TouchableOpacity
                    style={styles.showMoreButton}
                    onPress={() => setViewMode("list")}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.showMoreText}>
                      查看全部 {filteredSchools.length} 所學校 →
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </>
        ) : (
          /* 列表視圖 */
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                {selectedDistrict === "all" ? "所有學校" : `${selectedDistrict}學校`}
              </Text>
              <Text style={styles.schoolCount}>{filteredSchools.length} 所</Text>
            </View>
            
            <View style={styles.schoolList}>
              {filteredSchools.map(renderSchoolItem)}
            </View>
          </View>
        )}

        {/* 提示信息 */}
        <View style={styles.tipContainer}>
          <Text style={styles.tipIcon}>💡</Text>
          <Text style={styles.tipText}>
            {viewMode === "map" 
              ? "點擊地圖上的標記可查看學校詳情，使用上方標籤切換地區"
              : "點擊學校卡片可查看詳細資訊，點擊右上角切換回地圖視圖"}
          </Text>
        </View>
      </ScrollView>
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
  viewToggle: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  viewToggleText: {
    fontSize: 13,
    color: "#FFFFFF",
    fontWeight: "500",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  districtTabs: {
    marginBottom: 16,
  },
  tabsContainer: {
    flexDirection: "row",
    gap: 10,
    paddingVertical: 4,
  },
  districtTab: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    gap: 6,
  },
  tabIcon: {
    fontSize: 16,
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "rgba(255,255,255,0.7)",
  },
  tabLabelActive: {
    color: "#0F1629",
    fontWeight: "600",
  },
  tabBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  tabBadgeActive: {
    backgroundColor: "rgba(15,22,41,0.2)",
  },
  tabBadgeText: {
    fontSize: 11,
    fontWeight: "600",
    color: "rgba(255,255,255,0.7)",
  },
  tabBadgeTextActive: {
    color: "#0F1629",
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
});
