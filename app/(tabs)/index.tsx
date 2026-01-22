import { View, Text, TouchableOpacity, Platform, ScrollView, StyleSheet, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

// 2x2 快捷功能卡片數據
const QUICK_ACTION_CARDS = [
  {
    id: "map",
    title: "學校在哪裡",
    subtitle: "一眼睇清分佈",
    icon: "🗺️",
    route: "/school-map",
  },
  {
    id: "compare",
    title: "心儀學校比一比",
    subtitle: "選校更有底",
    icon: "⚖️",
    route: "/school-compare",
  },
  {
    id: "deadline",
    title: "申請截止別錯過",
    subtitle: "關鍵日子唔好漏",
    icon: "📅",
    route: "/deadlines",
  },
  {
    id: "articles",
    title: "家長攻略",
    subtitle: "少踩坑・更省心",
    icon: "📚",
    route: "/articles",
  },
];

/**
 * 首頁 - 問答引導模式入口
 * 穩重活力風格設計 - 思源宋體 + 真實配圖
 */
export default function HomeScreen() {
  const router = useRouter();

  const handleStartQuiz = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    router.push("/quiz");
  };

  const handleBrowseAll = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.push("/(tabs)/search");
  };

  const handleExplore = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.push("/swipe-explore");
  };

  const handleFeaturePress = (route: string) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.push(route as any);
  };

  return (
    <View style={styles.container}>
      {/* 深藍漸變背景 - 優化版本，更接近設計稿 */}
      <LinearGradient
        colors={["#0F1629", "#1a2744", "#1e3a5f", "#1a2744"]}
        locations={[0, 0.3, 0.7, 1]}
        style={StyleSheet.absoluteFillObject}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 0.8, y: 1 }}
      />
      
      {/* 裝飾性曲線背景 - 模擬設計稿中的波浪效果 */}
      <View style={styles.curveDecoration1} />
      <View style={styles.curveDecoration2} />
      
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* 頂部 Logo */}
          <View style={styles.logoContainer}>
            <Text style={styles.logoHK}>有</Text>
            <Text style={styles.logoText}>OFFER</Text>
          </View>

          {/* Hero Section */}
          <View style={styles.heroSection}>
            <Text style={styles.heroTitle}>
              孩子香港上學{"\n"}不發愁
            </Text>
            <Text style={styles.heroSubtitle}>
              一站式香港申校APP
            </Text>
          </View>

          {/* 按鈕區域 */}
          <View style={styles.buttonContainer}>
            {/* 主按鈕 - 我問你答選學校 */}
            <TouchableOpacity
              onPress={handleStartQuiz}
              style={styles.primaryButton}
              activeOpacity={0.85}
            >
              <Text style={styles.primaryButtonText}>我問你答選學校</Text>
              <Text style={styles.primaryButtonSubtext}>5個問題，篩選出你心儀的學校</Text>
            </TouchableOpacity>

            {/* 次要按鈕 - 我是靠譜父母 */}
            <TouchableOpacity
              onPress={handleBrowseAll}
              style={styles.secondaryButton}
              activeOpacity={0.75}
            >
              <Text style={styles.secondaryButtonText}>我是靠譜父母</Text>
              <Text style={styles.secondaryButtonSubtext}>通過條件檢索學校</Text>
            </TouchableOpacity>

            {/* 第三按鈕 - 碰碰運氣劃一劃 */}
            <TouchableOpacity
              onPress={handleExplore}
              style={styles.tertiaryButton}
              activeOpacity={0.7}
            >
              <Text style={styles.tertiaryButtonText}>碰碰運氣劃一劃</Text>
            </TouchableOpacity>
          </View>

          {/* 快捷功能 2x2 格子 */}
          <View style={styles.quickActionsSection}>
            <View style={styles.quickActionsGrid}>
              {QUICK_ACTION_CARDS.map((card) => (
                <TouchableOpacity
                  key={card.id}
                  onPress={() => handleFeaturePress(card.route)}
                  style={styles.quickActionCard}
                  activeOpacity={0.8}
                >
                  <Text style={styles.quickActionIcon}>{card.icon}</Text>
                  <Text style={styles.quickActionTitle}>{card.title}</Text>
                  <Text style={styles.quickActionSubtitle}>{card.subtitle}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* 免責聲明 */}
          <View style={styles.disclaimerContainer}>
            <Text style={styles.disclaimerText}>
              資訊基於公開資料整理，僅供參考，以學校官方為準
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F1629",
  },
  curveDecoration1: {
    position: "absolute",
    top: "25%",
    left: -50,
    right: -50,
    height: 300,
    backgroundColor: "rgba(30, 58, 95, 0.35)",
    borderRadius: 200,
    transform: [{ rotate: "-5deg" }, { scaleX: 1.3 }],
  },
  curveDecoration2: {
    position: "absolute",
    top: "35%",
    left: -30,
    right: -30,
    height: 250,
    backgroundColor: "rgba(26, 39, 68, 0.4)",
    borderRadius: 180,
    transform: [{ rotate: "3deg" }, { scaleX: 1.2 }],
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 48,
    paddingHorizontal: 28,
  },
  logoHK: {
    fontSize: 20,
    fontWeight: "700",
    color: "#00D9FF",
    letterSpacing: 2,
    fontFamily: "NotoSerifSC-Bold",
  },
  logoText: {
    fontSize: 20,
    fontWeight: "400",
    color: "#FFFFFF",
    letterSpacing: 1,
    fontFamily: "NotoSerifSC-Regular",
  },
  heroSection: {
    alignItems: "center",
    marginBottom: 48,
    paddingHorizontal: 28,
  },
  heroTitle: {
    fontSize: 38,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 50,
    marginBottom: 16,
    letterSpacing: 2,
    fontFamily: "NotoSerifSC-Bold",
  },
  heroSubtitle: {
    fontSize: 15,
    color: "rgba(255, 255, 255, 0.6)",
    textAlign: "center",
    lineHeight: 22,
    letterSpacing: 1,
    fontFamily: "NotoSerifSC-Regular",
  },
  buttonContainer: {
    gap: 14,
    marginBottom: 48,
    paddingHorizontal: 28,
  },
  primaryButton: {
    backgroundColor: "#00D9FF",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 30,
    shadowColor: "#00D9FF",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },
  primaryButtonText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#0F1629",
    textAlign: "center",
    letterSpacing: 2,
    fontFamily: "NotoSerifSC-Bold",
  },
  primaryButtonSubtext: {
    fontSize: 12,
    fontWeight: "400",
    color: "rgba(15, 22, 41, 0.6)",
    textAlign: "center",
    marginTop: 4,
    letterSpacing: 0.5,
    fontFamily: "NotoSerifSC-Regular",
  },
  secondaryButton: {
    backgroundColor: "transparent",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: "#00D9FF",
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#00D9FF",
    textAlign: "center",
    letterSpacing: 1,
    fontFamily: "NotoSerifSC-Bold",
  },
  secondaryButtonSubtext: {
    fontSize: 11,
    fontWeight: "400",
    color: "rgba(0, 217, 255, 0.6)",
    textAlign: "center",
    marginTop: 3,
    letterSpacing: 0.5,
    fontFamily: "NotoSerifSC-Regular",
  },
  tertiaryButton: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    paddingVertical: 16,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
  },
  tertiaryButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#FFFFFF",
    textAlign: "center",
    letterSpacing: 1,
    fontFamily: "NotoSerifSC-Regular",
  },
  quickActionsSection: {
    marginBottom: 32,
    paddingHorizontal: 28,
  },
  quickActionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 14,
  },
  quickActionCard: {
    width: "48%",
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    minHeight: 120,
  },
  quickActionIcon: {
    fontSize: 28,
    marginBottom: 12,
  },
  quickActionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
    letterSpacing: 0.5,
    fontFamily: "NotoSerifSC-Bold",
    marginBottom: 6,
  },
  quickActionSubtitle: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.55)",
    letterSpacing: 0.3,
    fontFamily: "NotoSerifSC-Regular",
    lineHeight: 18,
  },
  disclaimerContainer: {
    marginTop: "auto",
    paddingTop: 24,
    paddingHorizontal: 28,
  },
  disclaimerText: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.35)",
    textAlign: "center",
    lineHeight: 18,
    letterSpacing: 0.5,
    fontFamily: "NotoSerifSC-Regular",
  },
});
