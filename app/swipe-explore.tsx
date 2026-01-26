import { useState, useCallback, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";
import { SCHOOLS } from "@/data/schools";
import { FavoritesStorage } from "@/lib/storage";
import type { School } from "@/types/school";
import { CURRICULUM_V2_LABELS, INSTRUCTION_LANGUAGE_LABELS } from "@/types/school";
import { useColors } from "@/hooks/use-colors";
import { Spacing, SpacingPresets } from "@/constants/spacing";
import { BorderRadius, BorderRadiusPresets } from "@/constants/border-radius";
import { TypographyStyles } from "@/constants/typography";
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

// 學校類型標籤顏色（部分顏色不在主题中，保留）
const getTypeColor = (category: string, themeColors: ReturnType<typeof useColors>): string => {
  const categoryColors: Record<string, string> = {
    "國際": "#7C3AED", // Keep custom color
    "直資": themeColors.success,
    "私立": themeColors.warning,
    "資助": "#3B82F6", // Keep custom color
    "公立": "#6B7280", // Keep custom color
  };
  return categoryColors[category] || themeColors.muted;
};

interface SwipeCardProps {
  school: School;
  index: number;
  totalCards: number;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  isTop: boolean;
  colors: ReturnType<typeof useColors>;
  styles: ReturnType<typeof StyleSheet.create>;
}

function SwipeCard({ school, index, totalCards, onSwipeLeft, onSwipeRight, isTop, colors, styles }: SwipeCardProps) {
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
          colors={[colors.surface, colors.background]}
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
          <View style={[styles.typeTag, { backgroundColor: `${getTypeColor(school.category, colors)}33` }]}>
            <Text style={[styles.typeTagText, { color: getTypeColor(school.category, colors) }]}>
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
  const colors = useColors();
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

  // Define styles inside component to access colors
  const styles = StyleSheet.create({
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: Spacing.lg,
      paddingBottom: Spacing.md,
    },
    backButton: {
      width: 40,
      height: 40,
      borderRadius: BorderRadius.full,
      backgroundColor: colors.surface + "1A",
      justifyContent: "center",
      alignItems: "center",
    },
    headerTitle: {
      ...TypographyStyles.heading,
      fontSize: 18,
      color: colors.foreground,
      letterSpacing: 1,
    },
    placeholder: {
      width: 40,
    },
    statsContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: Spacing.md,
      marginHorizontal: Spacing.xl,
      backgroundColor: colors.surface + "0D",
      borderRadius: BorderRadiusPresets.card,
      marginBottom: Spacing.lg,
    },
    statItem: {
      alignItems: "center",
      paddingHorizontal: Spacing.xl,
    },
    statNumber: {
      ...TypographyStyles.title,
      fontSize: 24,
      color: colors.foreground,
    },
    statLabel: {
      ...TypographyStyles.caption,
      fontSize: 12,
      color: colors.muted,
      marginTop: 2,
    },
    statDivider: {
      width: 1,
      height: 32,
      backgroundColor: colors.border + "80",
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
      borderRadius: BorderRadius.xl,
      overflow: "hidden",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.3,
      shadowRadius: 16,
      elevation: 10,
    },
    cardGradient: {
      flex: 1,
      padding: Spacing.xl,
      borderWidth: 1,
      borderColor: colors.border + "80",
      borderRadius: BorderRadius.xl,
    },
    likeLabel: {
      position: "absolute",
      top: Spacing.xl,
      right: Spacing.xl,
      backgroundColor: colors.primary + "33",
      paddingHorizontal: Spacing.lg,
      paddingVertical: Spacing.sm,
      borderRadius: BorderRadius.sm,
      borderWidth: 2,
      borderColor: colors.primary,
      transform: [{ rotate: "15deg" }],
    },
    likeLabelText: {
      ...TypographyStyles.heading,
      fontSize: 18,
      color: colors.primary,
    },
    nopeLabel: {
      position: "absolute",
      top: Spacing.xl,
      left: Spacing.xl,
      backgroundColor: colors.error + "33",
      paddingHorizontal: Spacing.lg,
      paddingVertical: Spacing.sm,
      borderRadius: BorderRadius.sm,
      borderWidth: 2,
      borderColor: colors.error,
      transform: [{ rotate: "-15deg" }],
    },
    nopeLabelText: {
      ...TypographyStyles.heading,
      fontSize: 18,
      color: colors.error,
    },
    typeTag: {
      alignSelf: "flex-start",
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.xs,
      borderRadius: BorderRadius.sm,
      marginBottom: Spacing.lg,
    },
    typeTagText: {
      ...TypographyStyles.caption,
      fontSize: 13,
      fontWeight: TypographyStyles.heading.fontWeight,
    },
    schoolName: {
      ...TypographyStyles.title,
      fontSize: 24,
      color: colors.foreground,
      marginBottom: Spacing.xs,
    },
    schoolLevel: {
      ...TypographyStyles.small,
      fontSize: 14,
      color: colors.muted,
      marginBottom: Spacing.xl,
    },
    infoSection: {
      gap: Spacing.sm,
      marginBottom: Spacing.xl,
    },
    infoRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: Spacing.sm,
    },
    infoIcon: {
      fontSize: 16,
    },
    infoText: {
      ...TypographyStyles.body,
      fontSize: 14,
      color: colors.foreground + "CC",
      flex: 1,
    },
    highlightsSection: {
      flex: 1,
    },
    highlightsTitle: {
      ...TypographyStyles.body,
      fontSize: 14,
      fontWeight: TypographyStyles.heading.fontWeight,
      color: colors.primary,
      marginBottom: Spacing.sm,
    },
    highlightsText: {
      ...TypographyStyles.body,
      fontSize: 14,
      color: colors.foreground + "B3",
      lineHeight: 22,
    },
    swipeHint: {
      alignItems: "center",
      paddingTop: Spacing.lg,
      borderTopWidth: 1,
      borderTopColor: colors.border + "80",
    },
    swipeHintText: {
      ...TypographyStyles.caption,
      fontSize: 13,
      color: colors.muted + "66",
    },
    actionsContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: Spacing.xl,
      gap: Spacing.xl,
    },
    actionButton: {
      width: 64,
      height: 64,
      borderRadius: BorderRadius.full,
      backgroundColor: colors.surface + "1A",
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: colors.border + "33",
    },
    likeButton: {
      backgroundColor: colors.primary + "1A",
      borderColor: colors.primary + "4D",
    },
    actionIcon: {
      fontSize: 24,
      color: colors.foreground,
    },
    actionLabel: {
      ...TypographyStyles.tiny,
      fontSize: 10,
      color: colors.muted,
      marginTop: 2,
    },
    detailButton: {
      paddingHorizontal: Spacing.xl,
      paddingVertical: Spacing.md,
      backgroundColor: colors.surface + "1A",
      borderRadius: BorderRadius.xl,
      borderWidth: 1,
      borderColor: colors.border + "33",
    },
    detailButtonText: {
      ...TypographyStyles.body,
      fontSize: 14,
      fontWeight: TypographyStyles.heading.fontWeight,
      color: colors.foreground,
    },
    finishedContainer: {
      alignItems: "center",
      padding: Spacing["2xl"],
    },
    finishedEmoji: {
      fontSize: 64,
      marginBottom: Spacing.lg,
    },
    finishedTitle: {
      ...TypographyStyles.title,
      fontSize: 28,
      color: colors.foreground,
      marginBottom: Spacing.md,
    },
    finishedText: {
      ...TypographyStyles.body,
      fontSize: 16,
      color: colors.muted,
      textAlign: "center",
      lineHeight: 24,
      marginBottom: Spacing["2xl"],
    },
    restartButton: {
      backgroundColor: colors.primary,
      paddingHorizontal: Spacing["2xl"],
      paddingVertical: Spacing.lg,
      borderRadius: BorderRadiusPresets.button,
      marginBottom: Spacing.lg,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 12,
      elevation: 8,
    },
    restartButtonText: {
      ...TypographyStyles.body,
      fontSize: 16,
      fontWeight: TypographyStyles.heading.fontWeight,
      color: colors.background,
    },
    viewFavoritesButton: {
      paddingHorizontal: Spacing["2xl"],
      paddingVertical: Spacing.md,
      borderRadius: BorderRadius.xl,
      borderWidth: 1,
      borderColor: colors.border + "4D",
    },
    viewFavoritesButtonText: {
      ...TypographyStyles.body,
      fontSize: 14,
      fontWeight: "500",
      color: colors.foreground,
    },
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <LinearGradient
          colors={[colors.background, colors.surface, colors.surface, colors.surface]}
          locations={[0, 0.3, 0.7, 1]}
          style={StyleSheet.absoluteFill}
        />

        <MaxWidthWrapper>
          {/* 頂部導航 */}
          <View style={[styles.header, { paddingTop: insets.top }]}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backButton}
              activeOpacity={0.7}
            >
              <IconSymbol name="chevron.right" size={24} color={colors.foreground} style={{ transform: [{ rotate: "180deg" }] }} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>碰碰運氣劃一劃</Text>
            <View style={styles.placeholder} />
          </View>
        </MaxWidthWrapper>

        <MaxWidthWrapper>
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
              <Text style={[styles.statNumber, { color: colors.primary }]}>{savedCount}</Text>
              <Text style={styles.statLabel}>已收藏</Text>
            </View>
          </View>
        </MaxWidthWrapper>

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
                  colors={colors}
                  styles={styles}
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
              <Text style={[styles.actionLabel, { color: colors.primary }]}>收藏</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </GestureHandlerRootView>
  );
}
