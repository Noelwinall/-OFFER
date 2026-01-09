import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useState } from "react";
import { SCHOOLS } from "@/data/schools";
import { School, Language } from "@/types/school";

// 對比維度
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
  const [selectedSchools, setSelectedSchools] = useState<School[]>([]);
  const [showSchoolPicker, setShowSchoolPicker] = useState(false);

  const handleSelectSchool = (school: School) => {
    if (selectedSchools.length < 3 && !selectedSchools.find(s => s.id === school.id)) {
      setSelectedSchools([...selectedSchools, school]);
    }
    setShowSchoolPicker(false);
  };

  const handleRemoveSchool = (schoolId: string) => {
    setSelectedSchools(selectedSchools.filter(s => s.id !== schoolId));
  };

  const formatFee = (min: number, max: number) => {
    if (min === 0 && max === 0) return "免費";
    if (min === max) return `HK$${(min / 1000).toFixed(0)}K`;
    return `HK$${(min / 1000).toFixed(0)}K - ${(max / 1000).toFixed(0)}K`;
  };

  const getLanguageLabelFromChinese = (lang: Language) => {
    return lang;
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      international: "國際學校",
      dss: "直資學校",
      private: "私立學校",
      aided: "資助學校",
      public: "公立學校",
    };
    return labels[category] || category;
  };

  const getLanguageLabel = (lang: string) => {
    const labels: Record<string, string> = {
      english: "英文為主",
      chinese: "中文為主",
      bilingual: "雙語教學",
    };
    return labels[lang] || lang;
  };

  const getDistrictLabel = (district: string) => {
    const labels: Record<string, string> = {
      hk_island: "港島",
      kowloon: "九龍",
      new_territories: "新界",
    };
    return labels[district] || district;
  };

  const renderCompareTable = () => {
    if (selectedSchools.length === 0) {
      return (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>⚔️</Text>
          <Text style={styles.emptyTitle}>選擇學校開始對比</Text>
          <Text style={styles.emptySubtitle}>最多可同時對比 3 所學校</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setShowSchoolPicker(true)}
            activeOpacity={0.7}
          >
            <Text style={styles.addButtonText}>+ 添加學校</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.compareContainer}>
        {/* 學校名稱行 */}
        <View style={styles.compareRow}>
          <View style={styles.dimensionCell}>
            <Text style={styles.dimensionLabel}>學校</Text>
          </View>
          {selectedSchools.map((school) => (
            <View key={school.id} style={styles.schoolCell}>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemoveSchool(school.id)}
              >
                <Text style={styles.removeButtonText}>×</Text>
              </TouchableOpacity>
              <Text style={styles.schoolName} numberOfLines={2}>{school.name}</Text>
            </View>
          ))}
          {selectedSchools.length < 3 && (
            <TouchableOpacity
              style={styles.addSchoolCell}
              onPress={() => setShowSchoolPicker(true)}
            >
              <Text style={styles.addSchoolText}>+ 添加</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* 對比維度行 */}
        {COMPARE_DIMENSIONS.map((dim) => (
          <View key={dim.id} style={styles.compareRow}>
            <View style={styles.dimensionCell}>
              <Text style={styles.dimensionIcon}>{dim.icon}</Text>
              <Text style={styles.dimensionLabel}>{dim.label}</Text>
            </View>
            {selectedSchools.map((school) => (
              <View key={school.id} style={styles.valueCell}>
                <Text style={styles.valueText}>
                  {dim.id === "fee" && formatFee(school.tuitionMin, school.tuitionMax)}
                  {dim.id === "curriculum" && school.curriculum.join(", ")}
                  {dim.id === "language" && school.language}
                  {dim.id === "district" && school.district}
                  {dim.id === "category" && school.category}
                </Text>
              </View>
            ))}
            {selectedSchools.length < 3 && <View style={styles.emptyCell} />}
          </View>
        ))}

        {/* 亮點對比 */}
        <View style={styles.compareRow}>
          <View style={styles.dimensionCell}>
            <Text style={styles.dimensionIcon}>✨</Text>
            <Text style={styles.dimensionLabel}>亮點</Text>
          </View>
          {selectedSchools.map((school) => (
            <View key={school.id} style={styles.highlightCell}>
              {school.highlights.slice(0, 2).map((h, i) => (
                <Text key={i} style={styles.highlightText}>• {h}</Text>
              ))}
            </View>
          ))}
          {selectedSchools.length < 3 && <View style={styles.emptyCell} />}
        </View>
      </View>
    );
  };

  const renderSchoolPicker = () => {
    if (!showSchoolPicker) return null;

    const availableSchools = SCHOOLS.filter(
      (s: School) => !selectedSchools.find((sel: School) => sel.id === s.id)
    );

    return (
      <View style={styles.pickerOverlay}>
        <View style={styles.pickerContainer}>
          <View style={styles.pickerHeader}>
            <Text style={styles.pickerTitle}>選擇學校</Text>
            <TouchableOpacity onPress={() => setShowSchoolPicker(false)}>
              <Text style={styles.pickerClose}>×</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={availableSchools}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.pickerItem}
                onPress={() => handleSelectSchool(item)}
              >
                <Text style={styles.pickerItemName}>{item.name}</Text>
                <Text style={styles.pickerItemInfo}>
                  {getCategoryLabel(item.category)} · {getDistrictLabel(item.district)}
                </Text>
              </TouchableOpacity>
            )}
            style={styles.pickerList}
          />
        </View>
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
        <Text style={styles.headerTitle}>學校大PK</Text>
        <View style={styles.placeholder} />
      </View>

      <FlatList
        data={[1]}
        renderItem={() => renderCompareTable()}
        keyExtractor={() => "compare"}
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 24 }]}
        showsVerticalScrollIndicator={false}
      />

      {renderSchoolPicker()}
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
  emptyState: {
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Bold",
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.5)",
    fontFamily: "NotoSerifSC-Regular",
    marginBottom: 24,
  },
  addButton: {
    backgroundColor: "#00D9FF",
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 25,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0F1629",
    fontFamily: "NotoSerifSC-Bold",
  },
  compareContainer: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 20,
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
    width: 80,
    padding: 12,
    backgroundColor: "rgba(0,217,255,0.1)",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  dimensionIcon: {
    fontSize: 16,
  },
  dimensionLabel: {
    fontSize: 12,
    color: "#00D9FF",
    fontFamily: "NotoSerifSC-Regular",
    textAlign: "center",
  },
  schoolCell: {
    flex: 1,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  schoolName: {
    fontSize: 13,
    fontWeight: "600",
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Bold",
    textAlign: "center",
  },
  removeButton: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  removeButtonText: {
    fontSize: 14,
    color: "#FFFFFF",
  },
  addSchoolCell: {
    flex: 1,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
    borderLeftWidth: 1,
    borderLeftColor: "rgba(255,255,255,0.08)",
  },
  addSchoolText: {
    fontSize: 14,
    color: "#00D9FF",
    fontFamily: "NotoSerifSC-Regular",
  },
  valueCell: {
    flex: 1,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  valueText: {
    fontSize: 12,
    color: "rgba(255,255,255,0.8)",
    fontFamily: "NotoSerifSC-Regular",
    textAlign: "center",
  },
  highlightCell: {
    flex: 1,
    padding: 12,
    justifyContent: "center",
    gap: 4,
  },
  highlightText: {
    fontSize: 11,
    color: "rgba(255,255,255,0.7)",
    fontFamily: "NotoSerifSC-Regular",
  },
  emptyCell: {
    flex: 1,
  },
  pickerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "flex-end",
  },
  pickerContainer: {
    backgroundColor: "#1a2744",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: "70%",
  },
  pickerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
  },
  pickerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Bold",
  },
  pickerClose: {
    fontSize: 28,
    color: "#FFFFFF",
  },
  pickerList: {
    maxHeight: 400,
  },
  pickerItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.05)",
  },
  pickerItemName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Bold",
    marginBottom: 4,
  },
  pickerItemInfo: {
    fontSize: 13,
    color: "rgba(255,255,255,0.5)",
    fontFamily: "NotoSerifSC-Regular",
  },
});
