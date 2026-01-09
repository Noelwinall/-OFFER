import { View, Text, TouchableOpacity, StyleSheet, FlatList, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useState, useMemo } from "react";
import { SCHOOLS } from "@/data/schools";
import { School, District } from "@/types/school";

// 地區數據
const DISTRICTS: { id: District; label: string; icon: string; color: string }[] = [
  { id: "港島", label: "港島區", icon: "🏝️", color: "#00D9FF" },
  { id: "九龍", label: "九龍區", icon: "🌆", color: "#7C3AED" },
  { id: "新界", label: "新界區", icon: "🏞️", color: "#10B981" },
];

export default function SchoolMapScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);

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
  const getDistrictStats = (district: District) => {
    const schools = schoolsByDistrict[district];
    const categories = new Set(schools.map(s => s.category));
    return {
      total: schools.length,
      categories: categories.size,
    };
  };

  const handleSchoolPress = (schoolId: string) => {
    router.push(`/school/${schoolId}` as any);
  };

  const renderDistrictCard = (district: typeof DISTRICTS[0]) => {
    const stats = getDistrictStats(district.id);
    const isSelected = selectedDistrict === district.id;

    return (
      <TouchableOpacity
        key={district.id}
        style={[
          styles.districtCard,
          isSelected && { borderColor: district.color, borderWidth: 2 },
        ]}
        onPress={() => setSelectedDistrict(isSelected ? null : district.id)}
        activeOpacity={0.7}
      >
        <View style={[styles.districtIconContainer, { backgroundColor: `${district.color}20` }]}>
          <Text style={styles.districtIcon}>{district.icon}</Text>
        </View>
        <Text style={styles.districtLabel}>{district.label}</Text>
        <View style={styles.districtStats}>
          <Text style={[styles.districtCount, { color: district.color }]}>{stats.total}</Text>
          <Text style={styles.districtCountLabel}>所學校</Text>
        </View>
        <Text style={styles.districtCategoryCount}>{stats.categories} 種類型</Text>
      </TouchableOpacity>
    );
  };

  const renderSchoolItem = ({ item }: { item: School }) => {
    const districtData = DISTRICTS.find(d => d.id === item.district);
    
    return (
      <TouchableOpacity
        style={styles.schoolItem}
        onPress={() => handleSchoolPress(item.id)}
        activeOpacity={0.7}
      >
        <View style={styles.schoolInfo}>
          <Text style={styles.schoolName} numberOfLines={1}>{item.name}</Text>
          <View style={styles.schoolMeta}>
            <View style={[styles.categoryTag, { backgroundColor: `${districtData?.color || "#00D9FF"}20` }]}>
              <Text style={[styles.categoryTagText, { color: districtData?.color || "#00D9FF" }]}>
                {item.category}
              </Text>
            </View>
            <Text style={styles.schoolAddress} numberOfLines={1}>{item.address}</Text>
          </View>
        </View>
        <IconSymbol name="chevron.right" size={16} color="rgba(255,255,255,0.3)" />
      </TouchableOpacity>
    );
  };

  const filteredSchools = selectedDistrict 
    ? schoolsByDistrict[selectedDistrict] 
    : SCHOOLS;

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
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* 地區選擇卡片 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>選擇地區</Text>
          <View style={styles.districtGrid}>
            {DISTRICTS.map(renderDistrictCard)}
          </View>
        </View>

        {/* 學校列表 */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {selectedDistrict ? `${selectedDistrict}學校` : "所有學校"}
            </Text>
            <Text style={styles.schoolCount}>{filteredSchools.length} 所</Text>
          </View>
          
          <View style={styles.schoolList}>
            {filteredSchools.map((school) => (
              <View key={school.id}>
                {renderSchoolItem({ item: school })}
              </View>
            ))}
          </View>
        </View>

        {/* 提示信息 */}
        <View style={styles.tipContainer}>
          <Text style={styles.tipIcon}>💡</Text>
          <Text style={styles.tipText}>
            點擊地區卡片可篩選該區學校，再次點擊取消篩選
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
    fontFamily: "NotoSerifSC-Bold",
    letterSpacing: 1,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
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
    fontFamily: "NotoSerifSC-Bold",
    marginBottom: 16,
  },
  schoolCount: {
    fontSize: 14,
    color: "rgba(255,255,255,0.5)",
    fontFamily: "NotoSerifSC-Regular",
    marginBottom: 16,
  },
  districtGrid: {
    flexDirection: "row",
    gap: 12,
  },
  districtCard: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  districtIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  districtIcon: {
    fontSize: 24,
  },
  districtLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Bold",
    marginBottom: 8,
  },
  districtStats: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 2,
  },
  districtCount: {
    fontSize: 24,
    fontWeight: "700",
    fontFamily: "NotoSerifSC-Bold",
  },
  districtCountLabel: {
    fontSize: 12,
    color: "rgba(255,255,255,0.5)",
    fontFamily: "NotoSerifSC-Regular",
  },
  districtCategoryCount: {
    fontSize: 11,
    color: "rgba(255,255,255,0.4)",
    fontFamily: "NotoSerifSC-Regular",
    marginTop: 4,
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
    fontFamily: "NotoSerifSC-Bold",
    marginBottom: 6,
  },
  schoolMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  categoryTag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  categoryTagText: {
    fontSize: 11,
    fontWeight: "500",
    fontFamily: "NotoSerifSC-Regular",
  },
  schoolAddress: {
    flex: 1,
    fontSize: 12,
    color: "rgba(255,255,255,0.4)",
    fontFamily: "NotoSerifSC-Regular",
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
    fontFamily: "NotoSerifSC-Regular",
    lineHeight: 18,
  },
});
