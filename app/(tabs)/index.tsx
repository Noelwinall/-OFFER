import { View, Text, TouchableOpacity, Platform, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";

/**
 * 首頁 - 問答引導模式入口
 * 穩重活力風格設計 - 深藍漸變背景
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
      {/* 深藍漸變背景 */}
      <LinearGradient
        colors={["#0F1629", "#1A1F3A", "#0F1629"]}
        style={StyleSheet.absoluteFillObject}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      
      {/* 裝飾性波浪背景 */}
      <View style={styles.waveDecoration} />
      
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* 頂部 Logo */}
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>HK Edu App</Text>
          </View>

          {/* Hero Section */}
          <View style={styles.heroSection}>
            <Text style={styles.heroTitle}>
              找到最適合該子的學校
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
              activeOpacity={0.9}
            >
              <Text style={styles.primaryButtonText}>開始選校</Text>
            </TouchableOpacity>

            {/* 次要按鈕 - 瀏覽所有學校 */}
            <TouchableOpacity
              onPress={handleBrowseAll}
              style={styles.secondaryButton}
              activeOpacity={0.8}
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

          {/* 推薦功能卡片 */}
          <View style={styles.featuresSection}>
            <View style={styles.featureRow}>
              <TouchableOpacity
                onPress={handleBrowseAll}
                style={styles.featureCard}
                activeOpacity={0.7}
              >
                <Text style={styles.featureIcon}>📚</Text>
                <Text style={styles.featureText}>最新文章</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleBrowseAll}
                style={styles.featureCard}
                activeOpacity={0.7}
              >
                <Text style={styles.featureIcon}>👨‍👩‍👧</Text>
                <Text style={styles.featureText}>家長指南</Text>
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
  waveDecoration: {
    position: "absolute",
    top: "30%",
    left: 0,
    right: 0,
    height: 200,
    backgroundColor: "rgba(0, 217, 255, 0.03)",
    borderRadius: 100,
    transform: [{ scaleX: 1.5 }],
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 16,
    marginBottom: 32,
  },
  logoText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    letterSpacing: 1,
  },
  heroSection: {
    alignItems: "center",
    marginBottom: 40,
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 48,
    marginBottom: 12,
  },
  heroSubtitle: {
    fontSize: 16,
    color: "#9CA3AF",
    textAlign: "center",
    lineHeight: 24,
  },
  buttonContainer: {
    gap: 12,
    marginBottom: 40,
  },
  primaryButton: {
    backgroundColor: "#00D9FF",
    paddingVertical: 16,
    borderRadius: 50,
    shadowColor: "#00D9FF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0F1629",
    textAlign: "center",
  },
  secondaryButton: {
    backgroundColor: "transparent",
    paddingVertical: 14,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#00D9FF",
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#00D9FF",
    textAlign: "center",
  },
  tertiaryButton: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    paddingVertical: 14,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  tertiaryButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    textAlign: "center",
  },
  featuresSection: {
    marginBottom: 40,
  },
  featureRow: {
    flexDirection: "row",
    gap: 12,
  },
  featureCard: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  featureIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  featureText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  disclaimerContainer: {
    marginTop: "auto",
    paddingTop: 20,
  },
  disclaimerText: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 18,
  },
});
