import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { useState } from "react";
import { IntroLetterModal } from "@/components/intro-letter-modal";
import { Spacing } from "@/constants/spacing";
import { BorderRadius, BorderRadiusPresets } from "@/constants/border-radius";
import { TypographyStyles } from "@/constants/typography";

// 文章分類
const CATEGORIES = ["全部", "選校攻略", "面試技巧", "申請準備"];

// 文章數據
const ARTICLES = [
  {
    id: "1",
    title: "香港國際學校申請全攻略",
    subtitle: "從選校到面試，一文搞懂申請流程",
    category: "選校攻略",
    readTime: "8 分鐘",
    image: require("@/assets/images/feature-articles.png"),
    isNew: false,
  },
  {
    id: "2",
    title: "幼稚園面試必勝技巧",
    subtitle: "面試官最看重的5個能力",
    category: "面試技巧",
    readTime: "6 分鐘",
    image: require("@/assets/images/feature-guide.png"),
    isNew: false,
  },
  {
    id: "3",
    title: "IB vs DSE：如何選擇課程體系",
    subtitle: "深度分析兩大課程的優劣勢",
    category: "選校攻略",
    readTime: "10 分鐘",
    image: require("@/assets/images/feature-articles.png"),
    isNew: false,
  },
  {
    id: "4",
    title: "小一派位機制詳解",
    subtitle: "統一派位、自行分配全面解析",
    category: "選校攻略",
    readTime: "7 分鐘",
    image: require("@/assets/images/feature-guide.png"),
    isNew: true,
  },
  {
    id: "5",
    title: "直資學校 vs 資助學校",
    subtitle: "學費、教學、升學路徑大比拼",
    category: "選校攻略",
    readTime: "9 分鐘",
    image: require("@/assets/images/feature-articles.png"),
    isNew: true,
  },
  {
    id: "6",
    title: "小學面試常見問題及回答技巧",
    subtitle: "50道高頻面試題目精選",
    category: "面試技巧",
    readTime: "12 分鐘",
    image: require("@/assets/images/feature-guide.png"),
    isNew: true,
  },
  {
    id: "7",
    title: "如何準備Portfolio作品集",
    subtitle: "打造亮眼的申請材料",
    category: "申請準備",
    readTime: "8 分鐘",
    image: require("@/assets/images/feature-articles.png"),
    isNew: true,
  },
  {
    id: "8",
    title: "國際學校學費全覽",
    subtitle: "2024-2025學年最新學費一覽表",
    category: "選校攻略",
    readTime: "5 分鐘",
    image: require("@/assets/images/feature-guide.png"),
    isNew: true,
  },
];

export default function ArticlesScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colors = useColors();
  const [selectedCategory, setSelectedCategory] = useState("全部");
  const [showLetter, setShowLetter] = useState(false);

  // Define styles inside component to access colors
  const styles = StyleSheet.create({
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: Spacing.lg,
      paddingBottom: Spacing.lg,
    },
    backButton: {
      width: 40,
      height: 40,
      borderRadius: BorderRadius.full,
      backgroundColor: colors.surface,
      justifyContent: "center",
      alignItems: "center",
    },
    headerTitle: {
      ...TypographyStyles.heading,
      fontSize: 20,
      color: colors.foreground,
      letterSpacing: 1,
    },
    placeholder: {
      width: 40,
    },
    categoryContainer: {
      flexDirection: "row",
      paddingHorizontal: Spacing.lg,
      paddingBottom: Spacing.md,
      gap: Spacing.sm,
    },
    categoryTab: {
      paddingHorizontal: Spacing.lg,
      paddingVertical: Spacing.sm,
      borderRadius: BorderRadiusPresets.buttonPill,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
    },
    categoryTabActive: {
      backgroundColor: colors.primary + "26",
      borderColor: colors.primary,
    },
    categoryTabText: {
      ...TypographyStyles.caption,
      fontSize: 13,
      color: colors.muted,
    },
    categoryTabTextActive: {
      fontWeight: "600",
      color: colors.primary,
    },
    statsContainer: {
      paddingHorizontal: Spacing.xl,
      paddingBottom: Spacing.sm,
    },
    statsText: {
      ...TypographyStyles.caption,
      fontSize: 13,
      color: colors.muted,
    },
    listContent: {
      paddingHorizontal: Spacing.xl,
      gap: Spacing.lg,
    },
    firstCard: {
      marginTop: Spacing.sm,
    },
    articleCard: {
      backgroundColor: colors.surface,
      borderRadius: BorderRadiusPresets.card,
      overflow: "hidden",
      borderWidth: 1,
      borderColor: colors.border,
    },
    imageContainer: {
      position: "relative",
    },
    articleImage: {
      width: "100%",
      height: 160,
    },
    newBadge: {
      position: "absolute",
      top: Spacing.md,
      right: Spacing.md,
      paddingHorizontal: Spacing.sm,
      paddingVertical: Spacing.xs,
      borderRadius: BorderRadius.md,
      backgroundColor: colors.primary,
    },
    newBadgeText: {
      ...TypographyStyles.tiny,
      fontSize: 10,
      fontWeight: "700",
      color: colors.background,
      letterSpacing: 0.5,
    },
    articleContent: {
      padding: Spacing.lg,
      gap: Spacing.sm,
    },
    categoryBadge: {
      alignSelf: "flex-start",
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.xs,
      borderRadius: BorderRadius.md,
      borderWidth: 1,
      backgroundColor: colors.primary + "26",
      borderColor: colors.primary + "40",
    },
    categoryText: {
      ...TypographyStyles.caption,
      fontSize: 12,
      color: colors.primary,
    },
    articleTitle: {
      ...TypographyStyles.heading,
      fontSize: 18,
      color: colors.foreground,
      lineHeight: 26,
    },
    articleSubtitle: {
      ...TypographyStyles.body,
      fontSize: 14,
      color: colors.muted,
      lineHeight: 20,
    },
    readTime: {
      ...TypographyStyles.caption,
      fontSize: 12,
      color: colors.muted,
      marginTop: Spacing.xs,
    },
  });

  const filteredArticles = selectedCategory === "全部"
    ? ARTICLES
    : ARTICLES.filter((article) => article.category === selectedCategory);

  const renderCategoryTab = (category: string) => (
    <TouchableOpacity
      key={category}
      style={[
        styles.categoryTab,
        selectedCategory === category && styles.categoryTabActive,
      ]}
      onPress={() => setSelectedCategory(category)}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.categoryTabText,
          selectedCategory === category && styles.categoryTabTextActive,
        ]}
      >
        {category}
      </Text>
    </TouchableOpacity>
  );

  const renderArticle = ({ item, index }: { item: typeof ARTICLES[0]; index: number }) => (
    <TouchableOpacity
      style={[styles.articleCard, index === 0 && styles.firstCard]}
      activeOpacity={0.7}
      onPress={() => router.push(`/articles/${item.id}` as any)}
    >
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.articleImage} contentFit="cover" />
        {item.isNew && (
          <View style={styles.newBadge}>
            <Text style={styles.newBadgeText}>NEW</Text>
          </View>
        )}
      </View>
      <View style={styles.articleContent}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
        <Text style={styles.articleTitle} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.articleSubtitle} numberOfLines={2}>{item.subtitle}</Text>
        <Text style={styles.readTime}>📖 {item.readTime}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={[colors.background, colors.surface, colors.background]}
        locations={[0, 0.5, 1]}
        style={StyleSheet.absoluteFill}
      />

      <MaxWidthWrapper>
        <View style={[styles.header, { paddingTop: insets.top }]}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <IconSymbol name="chevron.right" size={24} color={colors.foreground} style={{ transform: [{ rotate: "180deg" }] }} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>家長攻略</Text>
        <View style={styles.placeholder} />
      </View>

      {/* 分類標籤 */}
      <View style={styles.categoryContainer}>
        {CATEGORIES.map(renderCategoryTab)}
      </View>

      {/* 文章統計 */}
      <View style={styles.statsContainer}>
        <Text style={styles.statsText}>
          共 {filteredArticles.length} 篇文章
        </Text>
      </View>

      <FlatList
        data={filteredArticles}
        renderItem={renderArticle}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[styles.listContent, { paddingBottom: insets.bottom + 24 }]}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          selectedCategory === "全部" ? (
            <TouchableOpacity
              style={[styles.articleCard, styles.firstCard, { borderColor: colors.primary + "40" }]}
              activeOpacity={0.7}
              onPress={() => setShowLetter(true)}
            >
              <View style={[styles.articleContent, { gap: 6 }]}>
                <View style={[styles.categoryBadge, { backgroundColor: colors.primary + "1A", borderColor: colors.primary + "30" }]}>
                  <Text style={[styles.categoryText, { fontWeight: "600" }]}>給家長的一封信</Text>
                </View>
                <Text style={styles.articleTitle} numberOfLines={2}>親愛的家長，這封信寫給正在為孩子奔走的你</Text>
                <Text style={styles.articleSubtitle} numberOfLines={2}>有Offer 的誕生初衷與願景</Text>
              </View>
            </TouchableOpacity>
          ) : null
        }
      />

      <IntroLetterModal
        visible={showLetter}
        onDismiss={() => setShowLetter(false)}
      />
      </MaxWidthWrapper>
    </View>
  );
}

