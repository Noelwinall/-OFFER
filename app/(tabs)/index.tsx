import { View, Text, TouchableOpacity, Platform, ScrollView, StyleSheet, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useState, useEffect, useCallback } from "react";
import { HomeHeroBackground } from "@/components/home-hero-background";
import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";
import { IntroLetterModal } from "@/components/intro-letter-modal";
import { IntroLetterStorage } from "@/lib/storage";
import { useColors } from "@/hooks/use-colors";
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
  const colors = useColors();
  const [showIntroLetter, setShowIntroLetter] = useState(false);

  useEffect(() => {
    IntroLetterStorage.isDismissed().then((dismissed) => {
      if (!dismissed) {
        setShowIntroLetter(true);
      }
    });
  }, []);

  const handleDismissIntroLetter = useCallback(() => {
    setShowIntroLetter(false);
    IntroLetterStorage.dismiss();
  }, []);

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

  const handleFeaturePress = (route: string) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.push(route as any);
  };

  return (
    <HomeHeroBackground style="infographic">
      <SafeAreaView style={styles.safeArea}>
        <MaxWidthWrapper>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
          {/* 頂部 Logo */}
          <View style={styles.logoContainer}>
            <Text style={[styles.logoHK, { color: (colors as any).accent }]}>有</Text>
            <Text style={[styles.logoText, { color: colors.foreground }]}>OFFER</Text>
          </View>

          {/* Hero Section */}
          <View style={styles.heroSection}>
            <Text style={[styles.heroTitle, { color: colors.foreground }]}>
              孩子香港上學{"\n"}不發愁
            </Text>
            <Text style={[styles.heroSubtitle, { color: colors.muted }]}>
              一站式香港申校APP
            </Text>
          </View>

          {/* 按鈕區域 */}
          <View style={styles.buttonContainer}>
            {/* 主按鈕 - 問答選校 */}
            <TouchableOpacity
              onPress={handleStartQuiz}
              style={[styles.primaryButton, { backgroundColor: (colors as any).accent, shadowColor: (colors as any).accent }]}
              activeOpacity={0.85}
            >
              <Text style={styles.primaryButtonText}>問答選校</Text>
              <Text style={[styles.primaryButtonSubtext, { color: colors.background + "BF" }]}>先做幾題 MC，選校範圍睇清啲</Text>
            </TouchableOpacity>

            {/* 次要按鈕 - 條件篩選學校 */}
            <TouchableOpacity
              onPress={handleBrowseAll}
              style={[styles.secondaryButton, { borderColor: (colors as any).accent }]}
              activeOpacity={0.75}
            >
              <Text style={[styles.secondaryButtonText, { color: (colors as any).accent }]}>條件篩選學校</Text>
              <Text style={[styles.secondaryButtonSubtext, { color: colors.muted }]}>你話篩乜就篩乜</Text>
            </TouchableOpacity>
          </View>

          {/* 快捷功能 2x2 格子 */}
          <View style={styles.quickActionsSection}>
            <View style={styles.quickActionsGrid}>
              {QUICK_ACTION_CARDS.map((card) => (
                <TouchableOpacity
                  key={card.id}
                  onPress={() => handleFeaturePress(card.route)}
                  style={[styles.quickActionCard, { borderColor: colors.border }]}
                  activeOpacity={0.8}
                >
                  <Text style={styles.quickActionIcon}>{card.icon}</Text>
                  <Text style={[styles.quickActionTitle, { color: colors.foreground }]}>{card.title}</Text>
                  <Text style={[styles.quickActionSubtitle, { color: colors.muted }]}>{card.subtitle}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* 免責聲明 */}
          <View style={styles.disclaimerContainer}>
            <Text style={[styles.disclaimerText, { color: colors.muted + "99" }]}>
              資訊基於公開資料整理，僅供參考，以學校官方為準
            </Text>
          </View>
        </ScrollView>
        </MaxWidthWrapper>
      </SafeAreaView>
      <IntroLetterModal
        visible={showIntroLetter}
        onDismiss={handleDismissIntroLetter}
      />
    </HomeHeroBackground>
  );
}

const styles = StyleSheet.create({
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
    letterSpacing: 2,
    fontFamily: "NotoSerifSC-Bold",
  },
  logoText: {
    fontSize: 20,
    fontWeight: "400",
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
    textAlign: "center",
    lineHeight: 50,
    marginBottom: 16,
    letterSpacing: 2,
    fontFamily: "NotoSerifSC-Bold",
  },
  heroSubtitle: {
    fontSize: 15,
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
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 30,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },
  primaryButtonText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#FAF8F5",
    textAlign: "center",
    letterSpacing: 2,
    fontFamily: "NotoSerifSC-Bold",
  },
  primaryButtonSubtext: {
    fontSize: 12,
    fontWeight: "400",
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
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    letterSpacing: 1,
    fontFamily: "NotoSerifSC-Bold",
  },
  secondaryButtonSubtext: {
    fontSize: 11,
    fontWeight: "400",
    textAlign: "center",
    marginTop: 3,
    letterSpacing: 0.5,
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
    backgroundColor: "rgba(255, 255, 255, 0.75)",
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    minHeight: 120,
  },
  quickActionIcon: {
    fontSize: 28,
    marginBottom: 12,
  },
  quickActionTitle: {
    fontSize: 15,
    fontWeight: "600",
    letterSpacing: 0.5,
    fontFamily: "NotoSerifSC-Bold",
    marginBottom: 6,
  },
  quickActionSubtitle: {
    fontSize: 12,
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
    textAlign: "center",
    lineHeight: 18,
    letterSpacing: 0.5,
    fontFamily: "NotoSerifSC-Regular",
  },
});
