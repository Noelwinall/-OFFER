import { useState, useCallback, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { SCHOOLS } from "@/data/schools";
import { FavoritesStorage } from "@/lib/storage";
import type { School } from "@/types/school";
import { CURRICULUM_V2_LABELS, INSTRUCTION_LANGUAGE_LABELS } from "@/types/school";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
  interpolate,
  Extrapolation,
} from "react-native-reanimated";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import * as Haptics from "expo-haptics";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const CARD_WIDTH = SCREEN_WIDTH - 48;
const CARD_HEIGHT = SCREEN_HEIGHT * 0.55;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;

// 隨機打亂學校順序
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// 學費格式化
const formatFee = (min: number, max: number): string => {
  if (min === 0 && max === 0) return "免費";
  if (min === max) {
    if (min >= 10000) {
      return `HK$${(min / 10000).toFixed(1)}萬/年`;
    }
    return `HK$${min.toLocaleString()}/年`;
  }
  return `HK$${(min / 10000).toFixed(1)}-${(max / 10000).toFixed(1)}萬/年`;
};

// Format curriculum for display
const formatCurriculum = (school: School): string => {
  if (school.curriculumV2 && school.curriculumV2.length > 0) {
    return school.curriculumV2.map(c => CURRICULUM_V2_LABELS[c] || c).join(" / ");
  }
  return "—";
};

// Format instruction languages for display
const formatLanguages = (school: School): string => {
  if (school.instructionLanguages && school.instructionLanguages.length > 0) {
    return school.instructionLanguages.map(l => INSTRUCTION_LANGUAGE_LABELS[l] || l).join(" / ");
  }
  return "—";
};

// 學校類型標籤顏色
const getTypeColor = (category: string): string => {
  const colors: Record<string, string> = {
    "國際": "#7C3AED",
    "直資": "#10B981",
    "私立": "#F59E0B",
    "資助": "#3B82F6",
    "公立": "#6B7280",
  };
  return colors[category] || "#6B7280";
};

interface SwipeCardProps {
  school: School;
  index: number;
  totalCards: number;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  isTop: boolean;
}

function SwipeCard({ school, index, totalCards, onSwipeLeft, onSwipeRight, isTop }: SwipeCardProps) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotation = useSharedValue(0);

  const resetPosition = useCallback(() => {
    translateX.value = withSpring(0);
    translateY.value = withSpring(0);
    rotation.value = withSpring(0);
  }, []);

  const handleSwipeComplete = useCallback((direction: "left" | "right") => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    if (direction === "left") {
      runOnJS(onSwipeLeft)();
    } else {
      runOnJS(onSwipeRight)();
    }
  }, [onSwipeLeft, onSwipeRight]);

  const gesture = Gesture.Pan()
    .enabled(isTop)
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY * 0.5;
      rotation.value = interpolate(
        event.translationX,
        [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        [-15, 0, 15],
        Extrapolation.CLAMP
      );
    })
    .onEnd((event) => {
      if (event.translationX > SWIPE_THRESHOLD) {
        translateX.value = withTiming(SCREEN_WIDTH * 1.5, { duration: 300 });
        rotation.value = withTiming(30, { duration: 300 });
        runOnJS(handleSwipeComplete)("right");
      } else if (event.translationX < -SWIPE_THRESHOLD) {
        translateX.value = withTiming(-SCREEN_WIDTH * 1.5, { duration: 300 });
        rotation.value = withTiming(-30, { duration: 300 });
        runOnJS(handleSwipeComplete)("left");
      } else {
        runOnJS(resetPosition)();
      }
    });

  const cardStyle = useAnimatedStyle(() => {
    const scale = isTop ? 1 : interpolate(index, [0, totalCards - 1], [1, 0.9]);
    const yOffset = isTop ? 0 : (totalCards - 1 - index) * 8;

    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value + yOffset },
        { rotate: `${rotation.value}deg` },
        { scale },
      ],
      zIndex: totalCards - index,
    };
  });

  const likeOpacity = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [0, SWIPE_THRESHOLD], [0, 1], Extrapolation.CLAMP),
  }));

  const nopeOpacity = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [-SWIPE_THRESHOLD, 0], [1, 0], Extrapolation.CLAMP),
  }));

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.card, cardStyle]}>
        <LinearGradient
          colors={["#1e3a5f", "#1a2744", "#0F1629"]}
          style={styles.cardGradient}
        >
          {/* 收藏標籤 */}
          <Animated.View style={[styles.likeLabel, likeOpacity]}>
            <Text style={styles.likeLabelText}>收藏</Text>
          </Animated.View>

          {/* 跳過標籤 */}
          <Animated.View style={[styles.nopeLabel, nopeOpacity]}>
            <Text style={styles.nopeLabelText}>跳過</Text>
          </Animated.View>

          {/* 學校類型標籤 */}
          <View style={[styles.typeTag, { backgroundColor: `${getTypeColor(school.category)}20` }]}>
            <Text style={[styles.typeTagText, { color: getTypeColor(school.category) }]}>
              {school.category}學校
            </Text>
          </View>

          {/* 學校名稱 */}
          <Text style={styles.schoolName}>{school.name}</Text>
          <Text style={styles.schoolLevel}>{school.level} · {school.district}</Text>

          {/* 學校信息 */}
          <View style={styles.infoSection}>
            <View style={styles.infoRow}>
              <Text style={styles.infoIcon}>📍</Text>
              <Text style={styles.infoText}>{school.address}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoIcon}>💰</Text>
              <Text style={styles.infoText}>{formatFee(school.tuitionMin, school.tuitionMax)}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoIcon}>📚</Text>
              <Text style={styles.infoText}>{formatCurriculum(school)}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoIcon}>🗣️</Text>
              <Text style={styles.infoText}>{formatLanguages(school)}</Text>
            </View>
          </View>

          {/* 學校亮點 */}
          <View style={styles.highlightsSection}>
            <Text style={styles.highlightsTitle}>學校亮點</Text>
            <Text style={styles.highlightsText} numberOfLines={3}>
              {school.highlights.join(" · ")}
            </Text>
          </View>

          {/* 操作提示 */}
          <View style={styles.swipeHint}>
            <Text style={styles.swipeHintText}>← 跳過 | 收藏 →</Text>
          </View>
        </LinearGradient>
      </Animated.View>
    </GestureDetector>
  );
}

export default function SwipeExploreScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [schools, setSchools] = useState<School[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [skippedCount, setSkippedCount] = useState(0);
  const [savedCount, setSavedCount] = useState(0);

  useEffect(() => {
    // 初始化時隨機打亂學校順序
    setSchools(shuffleArray(SCHOOLS));
  }, []);

  const handleSwipeLeft = useCallback(() => {
    setSkippedCount((prev) => prev + 1);
    setCurrentIndex((prev) => prev + 1);
  }, []);

  const handleSwipeRight = useCallback(async () => {
    const school = schools[currentIndex];
    if (school) {
      await FavoritesStorage.add(school.id);
      setSavedCount((prev) => prev + 1);
    }
    setCurrentIndex((prev) => prev + 1);
  }, [currentIndex, schools]);

  const handleButtonSwipe = useCallback(async (direction: "left" | "right") => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    if (direction === "left") {
      handleSwipeLeft();
    } else {
      await handleSwipeRight();
    }
  }, [handleSwipeLeft, handleSwipeRight]);

  const handleViewDetails = useCallback(() => {
    const school = schools[currentIndex];
    if (school) {
      router.push(`/school/${school.id}`);
    }
  }, [currentIndex, schools, router]);

  const handleRestart = useCallback(() => {
    setSchools(shuffleArray(SCHOOLS));
    setCurrentIndex(0);
    setSkippedCount(0);
    setSavedCount(0);
  }, []);

  const remainingCards = schools.length - currentIndex;
  const isFinished = currentIndex >= schools.length;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <LinearGradient
          colors={["#0F1629", "#1a2744", "#1e3a5f", "#1a2744"]}
          locations={[0, 0.3, 0.7, 1]}
          style={StyleSheet.absoluteFill}
        />

        {/* 頂部導航 */}
        <View style={[styles.header, { paddingTop: insets.top }]}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
            activeOpacity={0.7}
          >
            <IconSymbol name="chevron.right" size={24} color="#FFFFFF" style={{ transform: [{ rotate: "180deg" }] }} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>碰碰運氣劃一劃</Text>
          <View style={styles.placeholder} />
        </View>

        {/* 統計信息 */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{skippedCount}</Text>
            <Text style={styles.statLabel}>已跳過</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{remainingCards}</Text>
            <Text style={styles.statLabel}>剩餘</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: "#00D9FF" }]}>{savedCount}</Text>
            <Text style={styles.statLabel}>已收藏</Text>
          </View>
        </View>

        {/* 卡片區域 */}
        <View style={styles.cardsContainer}>
          {isFinished ? (
            <View style={styles.finishedContainer}>
              <Text style={styles.finishedEmoji}>🎉</Text>
              <Text style={styles.finishedTitle}>探索完成！</Text>
              <Text style={styles.finishedText}>
                你已瀏覽了所有 {schools.length} 所學校{"\n"}
                收藏了 {savedCount} 所學校
              </Text>
              <TouchableOpacity
                style={styles.restartButton}
                onPress={handleRestart}
                activeOpacity={0.8}
              >
                <Text style={styles.restartButtonText}>重新開始</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.viewFavoritesButton}
                onPress={() => router.push("/(tabs)/favorites")}
                activeOpacity={0.8}
              >
                <Text style={styles.viewFavoritesButtonText}>查看收藏</Text>
              </TouchableOpacity>
            </View>
          ) : (
            schools
              .slice(currentIndex, currentIndex + 3)
              .reverse()
              .map((school, index, arr) => (
                <SwipeCard
                  key={school.id}
                  school={school}
                  index={arr.length - 1 - index}
                  totalCards={arr.length}
                  onSwipeLeft={handleSwipeLeft}
                  onSwipeRight={handleSwipeRight}
                  isTop={index === arr.length - 1}
                />
              ))
          )}
        </View>

        {/* 底部操作按鈕 */}
        {!isFinished && (
          <View style={[styles.actionsContainer, { paddingBottom: insets.bottom + 20 }]}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleButtonSwipe("left")}
              activeOpacity={0.7}
            >
              <Text style={styles.actionIcon}>✕</Text>
              <Text style={styles.actionLabel}>跳過</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.detailButton}
              onPress={handleViewDetails}
              activeOpacity={0.7}
            >
              <Text style={styles.detailButtonText}>查看詳情</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.likeButton]}
              onPress={() => handleButtonSwipe("right")}
              activeOpacity={0.7}
            >
              <Text style={styles.actionIcon}>♥</Text>
              <Text style={[styles.actionLabel, { color: "#00D9FF" }]}>收藏</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 12,
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
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Bold",
    letterSpacing: 1,
  },
  placeholder: {
    width: 40,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    marginHorizontal: 24,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 16,
    marginBottom: 16,
  },
  statItem: {
    alignItems: "center",
    paddingHorizontal: 24,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Bold",
  },
  statLabel: {
    fontSize: 12,
    color: "rgba(255,255,255,0.5)",
    fontFamily: "NotoSerifSC-Regular",
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  cardsContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    position: "absolute",
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 24,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
  cardGradient: {
    flex: 1,
    padding: 24,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    borderRadius: 24,
  },
  likeLabel: {
    position: "absolute",
    top: 24,
    right: 24,
    backgroundColor: "rgba(0, 217, 255, 0.2)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#00D9FF",
    transform: [{ rotate: "15deg" }],
  },
  likeLabelText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#00D9FF",
    fontFamily: "NotoSerifSC-Bold",
  },
  nopeLabel: {
    position: "absolute",
    top: 24,
    left: 24,
    backgroundColor: "rgba(239, 68, 68, 0.2)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#EF4444",
    transform: [{ rotate: "-15deg" }],
  },
  nopeLabelText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#EF4444",
    fontFamily: "NotoSerifSC-Bold",
  },
  typeTag: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 16,
  },
  typeTagText: {
    fontSize: 13,
    fontWeight: "600",
    fontFamily: "NotoSerifSC-Bold",
  },
  schoolName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Bold",
    marginBottom: 4,
  },
  schoolLevel: {
    fontSize: 14,
    color: "rgba(255,255,255,0.6)",
    fontFamily: "NotoSerifSC-Regular",
    marginBottom: 20,
  },
  infoSection: {
    gap: 10,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  infoIcon: {
    fontSize: 16,
  },
  infoText: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
    fontFamily: "NotoSerifSC-Regular",
    flex: 1,
  },
  highlightsSection: {
    flex: 1,
  },
  highlightsTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#00D9FF",
    fontFamily: "NotoSerifSC-Bold",
    marginBottom: 8,
  },
  highlightsText: {
    fontSize: 14,
    color: "rgba(255,255,255,0.7)",
    fontFamily: "NotoSerifSC-Regular",
    lineHeight: 22,
  },
  swipeHint: {
    alignItems: "center",
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.1)",
  },
  swipeHintText: {
    fontSize: 13,
    color: "rgba(255,255,255,0.4)",
    fontFamily: "NotoSerifSC-Regular",
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    gap: 20,
  },
  actionButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(255,255,255,0.1)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  likeButton: {
    backgroundColor: "rgba(0, 217, 255, 0.1)",
    borderColor: "rgba(0, 217, 255, 0.3)",
  },
  actionIcon: {
    fontSize: 24,
    color: "#FFFFFF",
  },
  actionLabel: {
    fontSize: 10,
    color: "rgba(255,255,255,0.6)",
    fontFamily: "NotoSerifSC-Regular",
    marginTop: 2,
  },
  detailButton: {
    paddingHorizontal: 24,
    paddingVertical: 14,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  detailButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Bold",
  },
  finishedContainer: {
    alignItems: "center",
    padding: 32,
  },
  finishedEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  finishedTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Bold",
    marginBottom: 12,
  },
  finishedText: {
    fontSize: 16,
    color: "rgba(255,255,255,0.6)",
    fontFamily: "NotoSerifSC-Regular",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 32,
  },
  restartButton: {
    backgroundColor: "#00D9FF",
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 28,
    marginBottom: 16,
    shadowColor: "#00D9FF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  restartButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0F1629",
    fontFamily: "NotoSerifSC-Bold",
  },
  viewFavoritesButton: {
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  viewFavoritesButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Regular",
  },
});
