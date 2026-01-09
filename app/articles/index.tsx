import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useState } from "react";

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
  const [selectedCategory, setSelectedCategory] = useState("全部");

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
      />
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
  categoryContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 8,
  },
  categoryTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  categoryTabActive: {
    backgroundColor: "rgba(0, 217, 255, 0.15)",
    borderColor: "#00D9FF",
  },
  categoryTabText: {
    fontSize: 13,
    color: "rgba(255,255,255,0.6)",
    fontFamily: "NotoSerifSC-Regular",
  },
  categoryTabTextActive: {
    color: "#00D9FF",
    fontWeight: "600",
  },
  statsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  statsText: {
    fontSize: 13,
    color: "rgba(255,255,255,0.4)",
    fontFamily: "NotoSerifSC-Regular",
  },
  listContent: {
    paddingHorizontal: 20,
    gap: 16,
  },
  firstCard: {
    marginTop: 8,
  },
  articleCard: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
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
    top: 12,
    right: 12,
    backgroundColor: "#00D9FF",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  newBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#0F1629",
    letterSpacing: 0.5,
  },
  articleContent: {
    padding: 16,
    gap: 8,
  },
  categoryBadge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(0, 217, 255, 0.15)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    color: "#00D9FF",
    fontFamily: "NotoSerifSC-Regular",
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Bold",
    lineHeight: 26,
  },
  articleSubtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.6)",
    fontFamily: "NotoSerifSC-Regular",
    lineHeight: 20,
  },
  readTime: {
    fontSize: 12,
    color: "rgba(255,255,255,0.4)",
    fontFamily: "NotoSerifSC-Regular",
    marginTop: 4,
  },
});
