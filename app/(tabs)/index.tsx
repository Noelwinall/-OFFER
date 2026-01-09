import { View, Text, TouchableOpacity, Platform, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import * as Haptics from "expo-haptics";

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
    router.push("/(tabs)/explore");
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
            <Text style={styles.logoHK}>HK</Text>
            <Text style={styles.logoText}> Edu App</Text>
          </View>

          {/* Hero Section */}
          <View style={styles.heroSection}>
            <Text style={styles.heroTitle}>
              找到最適合該{"\n"}子的學校
            </Text>
            <Text style={styles.heroSubtitle}>
              5 個問題，精準推薦香港優質學校
            </Text>
          </View>

          {/* 按鈕區域 */}
          <View style={styles.buttonContainer}>
            {/* 主按鈕 - 開始選校 */}
            <TouchableOpacity
              onPress={handleStartQuiz}
              style={styles.primaryButton}
              activeOpacity={0.85}
            >
              <Text style={styles.primaryButtonText}>開始選校</Text>
            </TouchableOpacity>

            {/* 次要按鈕 - 瀏覽所有學校 */}
            <TouchableOpacity
              onPress={handleBrowseAll}
              style={styles.secondaryButton}
              activeOpacity={0.75}
            >
              <Text style={styles.secondaryButtonText}>瀏覽所有學校</Text>
            </TouchableOpacity>

            {/* 第三按鈕 - 探索學校 */}
            <TouchableOpacity
              onPress={handleExplore}
              style={styles.tertiaryButton}
              activeOpacity={0.7}
            >
              <Text style={styles.tertiaryButtonText}>探索學校</Text>
            </TouchableOpacity>
          </View>

          {/* 推薦功能卡片 - 帶真實配圖 */}
          <View style={styles.featuresSection}>
            <View style={styles.featureRow}>
              <TouchableOpacity
                onPress={handleBrowseAll}
                style={styles.featureCard}
                activeOpacity={0.7}
              >
                <Image
                  source={require("@/assets/images/feature-articles.png")}
                  style={styles.featureImage}
                  contentFit="cover"
                />
                <View style={styles.featureOverlay}>
                  <View style={styles.featureLabelContainer}>
                    <Text style={styles.featureLabelIcon}>📚</Text>
                    <Text style={styles.featureText}>最新文章</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleBrowseAll}
                style={styles.featureCard}
                activeOpacity={0.7}
              >
                <Image
                  source={require("@/assets/images/feature-guide.png")}
                  style={styles.featureImage}
                  contentFit="cover"
                />
                <View style={styles.featureOverlay}>
                  <View style={styles.featureLabelContainer}>
                    <Text style={styles.featureLabelIcon}>👨‍👩‍👧</Text>
                    <Text style={styles.featureText}>家長指南</Text>
                  </View>
                </View>
              </TouchableOpacity>
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
    paddingHorizontal: 28,
    paddingBottom: 100,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 48,
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
  },
  heroTitle: {
    fontSize: 40,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 52,
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
  },
  primaryButton: {
    backgroundColor: "#00D9FF",
    paddingVertical: 18,
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
    fontFamily: "NotoSerifSC-Regular",
  },
  secondaryButton: {
    backgroundColor: "transparent",
    paddingVertical: 16,
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
  featuresSection: {
    marginBottom: 48,
  },
  featureRow: {
    flexDirection: "row",
    gap: 14,
  },
  featureCard: {
    flex: 1,
    height: 140,
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  featureImage: {
    width: "100%",
    height: "100%",
  },
  featureOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(15, 22, 41, 0.5)",
    justifyContent: "flex-end",
    padding: 14,
  },
  featureLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  featureLabelIcon: {
    fontSize: 16,
  },
  featureText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#FFFFFF",
    letterSpacing: 0.5,
    fontFamily: "NotoSerifSC-Regular",
  },
  disclaimerContainer: {
    marginTop: "auto",
    paddingTop: 24,
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
