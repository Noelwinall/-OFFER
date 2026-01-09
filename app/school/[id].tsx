import { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Platform, Alert, Linking, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SCHOOLS } from "@/data/schools";
import { FavoritesStorage, CompareStorage } from "@/lib/storage";
import { formatTuitionRange } from "@/types/school";
import type { School } from "@/types/school";
import * as Haptics from "expo-haptics";
import * as Clipboard from "expo-clipboard";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SchoolDetailScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
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

  const handleBack = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.back();
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
      <View style={{ flex: 1 }}>
        <LinearGradient
          colors={["#0F1629", "#1a2744", "#1e3a5f", "#1a2744"]}
          locations={[0, 0.3, 0.7, 1]}
          style={StyleSheet.absoluteFill}
        />
        <View style={[styles.container, { paddingTop: insets.top, justifyContent: "center", alignItems: "center" }]}>
          <Text style={styles.emptyText}>找不到學校資訊</Text>
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
      
      <View style={[styles.container, { paddingTop: insets.top }]}>
        {/* 頂部導航 */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <IconSymbol name="chevron.left" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>學校詳情</Text>
          <TouchableOpacity onPress={handleFavoriteToggle} style={styles.favoriteButton}>
            <IconSymbol
              name="heart.fill"
              size={24}
              color={isFavorite ? "#EF4444" : "rgba(255,255,255,0.5)"}
            />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* 學校名稱 */}
          <View style={styles.titleContainer}>
            <Text style={styles.schoolName}>{school.name}</Text>
            <View style={styles.tagRow}>
              <View style={styles.tag}>
                <Text style={styles.tagText}>{school.category}</Text>
              </View>
              <View style={styles.tag}>
                <Text style={styles.tagText}>{school.district}</Text>
              </View>
            </View>
          </View>

          {/* 基本資訊 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>基本資訊</Text>
            <View style={styles.infoGrid}>
              <InfoRow label="學段" value={school.level} />
              <InfoRow label="學費" value={formatTuitionRange(school.tuitionMin, school.tuitionMax)} />
              <InfoRow label="課程體系" value={school.curriculum.join(", ")} />
              <InfoRow label="教學語言" value={school.language} />
            </View>
          </View>

          {/* 聯絡方式 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>聯絡方式</Text>
            <View style={styles.infoGrid}>
              <InfoRow label="地址" value={school.address} />
              <InfoRow label="電話" value={school.phone} />
              <TouchableOpacity onPress={handleOpenWebsite}>
                <InfoRow label="網站" value={school.website} isLink />
              </TouchableOpacity>
            </View>
          </View>

          {/* 學校亮點 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>學校亮點</Text>
            <View style={styles.highlightsContainer}>
              {school.highlights.map((highlight, index) => (
                <View key={index} style={styles.highlightRow}>
                  <Text style={styles.highlightBullet}>•</Text>
                  <Text style={styles.highlightText}>{highlight}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* 申請資訊 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>申請資訊</Text>
            <Text style={styles.materialsLabel}>所需材料：</Text>
            <View style={styles.materialsContainer}>
              {school.applicationMaterials.map((material, index) => (
                <Text key={index} style={styles.materialText}>
                  {index + 1}. {material}
                </Text>
              ))}
            </View>
            <TouchableOpacity
              onPress={handleCopyLink}
              style={styles.copyButton}
              activeOpacity={0.8}
            >
              <Text style={styles.copyButtonText}>複製申請連結</Text>
            </TouchableOpacity>
          </View>

          {/* 免責聲明 */}
          <View style={styles.disclaimerContainer}>
            <Text style={styles.disclaimerText}>
              資訊基於公開資料整理，僅供參考，以學校官方為準
            </Text>
          </View>
        </ScrollView>

        {/* 底部按鈕 */}
        <View style={[styles.bottomContainer, { paddingBottom: insets.bottom + 16 }]}>
          <TouchableOpacity
            onPress={handleAddToCompare}
            style={styles.compareButton}
            activeOpacity={0.8}
          >
            <Text style={styles.compareButtonText}>
              {isInCompare ? "從對比中移除" : "加入對比"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

function InfoRow({ label, value, isLink = false }: { label: string; value: string; isLink?: boolean }) {
  return (
    <View style={infoStyles.row}>
      <Text style={infoStyles.label}>{label}</Text>
      <Text style={[infoStyles.value, isLink && infoStyles.link]}>{value}</Text>
    </View>
  );
}

const infoStyles = StyleSheet.create({
  row: {
    flexDirection: "row",
    paddingVertical: 8,
  },
  label: {
    width: 80,
    color: "rgba(255,255,255,0.5)",
    fontFamily: "NotoSerifSC-Regular",
    fontSize: 14,
  },
  value: {
    flex: 1,
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Regular",
    fontSize: 14,
  },
  link: {
    color: "#00D9FF",
    textDecorationLine: "underline",
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Regular",
    letterSpacing: 1,
  },
  favoriteButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollView: {
    flex: 1,
  },
  titleContainer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
  },
  schoolName: {
    fontSize: 26,
    fontWeight: "700",
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Bold",
    lineHeight: 34,
    marginBottom: 12,
  },
  tagRow: {
    flexDirection: "row",
    gap: 8,
  },
  tag: {
    backgroundColor: "rgba(0, 217, 255, 0.15)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  tagText: {
    fontSize: 13,
    color: "#00D9FF",
    fontFamily: "NotoSerifSC-Regular",
  },
  section: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Bold",
    marginBottom: 12,
  },
  infoGrid: {
    gap: 4,
  },
  highlightsContainer: {
    gap: 8,
  },
  highlightRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  highlightBullet: {
    color: "#00D9FF",
    marginRight: 8,
    fontSize: 16,
  },
  highlightText: {
    flex: 1,
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Regular",
    fontSize: 14,
    lineHeight: 22,
  },
  materialsLabel: {
    fontSize: 14,
    color: "rgba(255,255,255,0.6)",
    fontFamily: "NotoSerifSC-Regular",
    marginBottom: 8,
  },
  materialsContainer: {
    gap: 4,
    marginBottom: 16,
  },
  materialText: {
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Regular",
    fontSize: 14,
    lineHeight: 22,
  },
  copyButton: {
    backgroundColor: "#00D9FF",
    paddingVertical: 16,
    borderRadius: 16,
    shadowColor: "#00D9FF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  copyButtonText: {
    color: "#0F1629",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    fontFamily: "NotoSerifSC-Regular",
    letterSpacing: 1,
  },
  disclaimerContainer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  disclaimerText: {
    fontSize: 11,
    color: "rgba(255,255,255,0.35)",
    textAlign: "center",
    fontFamily: "NotoSerifSC-Regular",
  },
  bottomContainer: {
    paddingHorizontal: 24,
    paddingTop: 16,
    backgroundColor: "rgba(15, 22, 41, 0.95)",
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.1)",
  },
  compareButton: {
    backgroundColor: "rgba(255,255,255,0.1)",
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  compareButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#FFFFFF",
    textAlign: "center",
    fontFamily: "NotoSerifSC-Regular",
    letterSpacing: 1,
  },
  emptyText: {
    color: "rgba(255,255,255,0.5)",
    fontFamily: "NotoSerifSC-Regular",
    fontSize: 16,
  },
});
