import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { IconSymbol } from "@/components/ui/icon-symbol";

// 文章詳情數據
const ARTICLE_DETAILS: Record<string, {
  title: string;
  subtitle: string;
  category: string;
  readTime: string;
  author: string;
  date: string;
  content: string[];
  image: any;
}> = {
  "1": {
    title: "香港國際學校申請全攻略",
    subtitle: "從選校到面試，一文搞懂申請流程",
    category: "選校攻略",
    readTime: "8 分鐘",
    author: "有OFFER編輯部",
    date: "2024年12月",
    image: require("@/assets/images/feature-articles.png"),
    content: [
      "香港國際學校一直是許多家長的首選，不僅因為其優質的教學環境，更因為其多元化的課程體系和國際化的視野。本文將為您詳細介紹香港國際學校的申請流程。",
      "## 一、了解香港國際學校類型",
      "香港的國際學校大致可分為以下幾類：",
      "**英基學校協會（ESF）**：香港最大的國際學校網絡，提供英式課程，學費相對較低。",
      "**私立國際學校**：如漢基國際學校、香港國際學校等，提供IB、AP等多種課程。",
      "**直資學校國際部**：部分直資學校設有國際課程部門。",
      "## 二、申請時間線",
      "大部分國際學校的申請時間為入學前一年的9月至12月。建議家長提前18個月開始準備。",
      "**9-10月**：研究學校、參加開放日",
      "**11-12月**：提交申請表、準備材料",
      "**1-3月**：參加面試和評估",
      "**4-5月**：收到錄取結果",
      "## 三、申請材料準備",
      "一般需要準備以下材料：",
      "• 填寫完整的申請表",
      "• 學生護照/身份證複印件",
      "• 近兩年成績單",
      "• 推薦信（部分學校要求）",
      "• 學生作品集（部分學校要求）",
      "## 四、面試準備要點",
      "國際學校面試通常包括學生面試和家長面試兩部分。",
      "**學生面試**：主要考察英語能力、邏輯思維、社交能力。",
      "**家長面試**：了解家庭教育理念、對學校的了解程度。",
      "## 五、常見問題解答",
      "**Q：沒有國際學校背景可以申請嗎？**",
      "A：可以。許多國際學校歡迎來自不同背景的學生，但需要通過英語能力測試。",
      "**Q：學費大概是多少？**",
      "A：香港國際學校學費差異較大，從每年10萬至25萬港幣不等。",
      "希望這篇攻略能幫助您更好地了解香港國際學校的申請流程。如有更多問題，歡迎使用「有OFFER」App的問答功能獲取個性化建議。",
    ],
  },
  "2": {
    title: "幼稚園面試必勝技巧",
    subtitle: "面試官最看重的5個能力",
    category: "面試技巧",
    readTime: "6 分鐘",
    author: "有OFFER編輯部",
    date: "2024年11月",
    image: require("@/assets/images/feature-guide.png"),
    content: [
      "幼稚園面試是孩子人生中的第一次「考試」，也是讓許多家長緊張的時刻。本文將分享面試官最看重的5個能力，幫助您和孩子做好充分準備。",
      "## 一、語言表達能力",
      "面試官會觀察孩子是否能清晰表達自己的想法。",
      "**準備建議**：",
      "• 日常多與孩子對話，鼓勵完整句子表達",
      "• 練習自我介紹：姓名、年齡、喜歡的事物",
      "• 不要死記硬背，保持自然",
      "## 二、社交互動能力",
      "學校希望看到孩子能與他人友好相處。",
      "**準備建議**：",
      "• 多帶孩子參加社交活動",
      "• 教導基本禮貌：打招呼、說謝謝",
      "• 練習與陌生人簡單交流",
      "## 三、專注力與聽從指令",
      "面試中會有簡單的任務，考察孩子能否專注完成。",
      "**準備建議**：",
      "• 在家練習簡單指令遊戲",
      "• 培養閱讀習慣，提升專注力",
      "• 避免過度依賴電子產品",
      "## 四、基本認知能力",
      "包括顏色、形狀、數字等基本概念。",
      "**準備建議**：",
      "• 通過遊戲學習顏色和形狀",
      "• 日常生活中融入數數練習",
      "• 不要給孩子過大壓力",
      "## 五、情緒管理能力",
      "面對陌生環境，孩子的情緒反應很重要。",
      "**準備建議**：",
      "• 提前帶孩子熟悉學校環境",
      "• 面試前保持正常作息",
      "• 家長保持平常心，避免焦慮傳遞給孩子",
      "## 家長面試注意事項",
      "許多學校也會面試家長，主要了解：",
      "• 選擇該校的原因",
      "• 家庭教育理念",
      "• 對孩子的期望",
      "記住，面試的目的是找到適合孩子的學校，而不是讓孩子「表演」。保持真實，展現孩子最自然的一面，往往是最好的策略。",
    ],
  },
  "3": {
    title: "IB vs DSE：如何選擇課程體系",
    subtitle: "深度分析兩大課程的優劣勢",
    category: "選校攻略",
    readTime: "10 分鐘",
    author: "有OFFER編輯部",
    date: "2024年10月",
    image: require("@/assets/images/feature-articles.png"),
    content: [
      "選擇IB還是DSE，是許多香港家長面臨的重要決定。本文將從多個角度分析兩種課程體系，幫助您做出明智選擇。",
      "## 一、課程概述",
      "**IB（International Baccalaureate）**",
      "國際文憑課程，全球認可度高，強調全人教育。",
      "**DSE（香港中學文憑考試）**",
      "香港本地課程，主要升讀香港及部分海外大學。",
      "## 二、課程結構對比",
      "**IB課程**：6個學科組 + 核心課程（TOK、EE、CAS）",
      "**DSE課程**：4個核心科目 + 2-3個選修科目",
      "## 三、評估方式",
      "**IB**：內部評估（30-50%）+ 外部考試",
      "**DSE**：主要依賴公開考試成績",
      "## 四、升學路徑",
      "**IB**：全球大學認可，特別適合海外升學",
      "**DSE**：香港本地大學優先，部分海外大學認可",
      "## 五、適合什麼樣的學生？",
      "**選擇IB如果孩子**：",
      "• 學習主動性強",
      "• 時間管理能力好",
      "• 有海外升學計劃",
      "• 喜歡探究式學習",
      "**選擇DSE如果孩子**：",
      "• 擅長考試",
      "• 計劃留港升學",
      "• 偏好專注特定科目",
      "## 六、費用考量",
      "IB課程學校學費普遍較高，每年約15-25萬港幣。",
      "DSE課程在資助學校可享受政府資助。",
      "## 結語",
      "沒有絕對的好壞，只有適合與否。建議家長根據孩子的特點、家庭規劃和經濟能力綜合考慮。",
    ],
  },
};

// 默認文章內容
const DEFAULT_ARTICLE = {
  title: "文章詳情",
  subtitle: "精彩內容即將呈現",
  category: "選校攻略",
  readTime: "5 分鐘",
  author: "有OFFER編輯部",
  date: "2024年12月",
  image: require("@/assets/images/feature-articles.png"),
  content: [
    "感謝您的關注！",
    "這篇文章正在撰寫中，敬請期待。",
    "您可以先瀏覽其他精彩內容，或使用「有OFFER」的問答功能獲取個性化選校建議。",
  ],
};

export default function ArticleDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();

  const article = ARTICLE_DETAILS[id || ""] || DEFAULT_ARTICLE;

  const renderContent = (text: string, index: number) => {
    if (text.startsWith("## ")) {
      return (
        <Text key={index} style={styles.heading}>
          {text.replace("## ", "")}
        </Text>
      );
    }
    if (text.startsWith("**") && text.endsWith("**")) {
      return (
        <Text key={index} style={styles.bold}>
          {text.replace(/\*\*/g, "")}
        </Text>
      );
    }
    if (text.startsWith("• ")) {
      return (
        <Text key={index} style={styles.bullet}>
          {text}
        </Text>
      );
    }
    if (text.startsWith("**Q：")) {
      return (
        <Text key={index} style={styles.question}>
          {text.replace(/\*\*/g, "")}
        </Text>
      );
    }
    if (text.startsWith("A：")) {
      return (
        <Text key={index} style={styles.answer}>
          {text}
        </Text>
      );
    }
    return (
      <Text key={index} style={styles.paragraph}>
        {text}
      </Text>
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
        <Text style={styles.headerTitle} numberOfLines={1}>{article.category}</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 40 }]}
        showsVerticalScrollIndicator={false}
      >
        <Image source={article.image} style={styles.heroImage} contentFit="cover" />

        <View style={styles.articleHeader}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{article.category}</Text>
          </View>
          <Text style={styles.title}>{article.title}</Text>
          <Text style={styles.subtitle}>{article.subtitle}</Text>
          <View style={styles.meta}>
            <Text style={styles.metaText}>{article.author}</Text>
            <Text style={styles.metaDot}>·</Text>
            <Text style={styles.metaText}>{article.date}</Text>
            <Text style={styles.metaDot}>·</Text>
            <Text style={styles.metaText}>📖 {article.readTime}</Text>
          </View>
        </View>

        <View style={styles.contentContainer}>
          {article.content.map((text, index) => renderContent(text, index))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>— 完 —</Text>
          <TouchableOpacity
            style={styles.moreButton}
            activeOpacity={0.7}
            onPress={() => router.back()}
          >
            <Text style={styles.moreButtonText}>查看更多攻略</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
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
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Bold",
    flex: 1,
    textAlign: "center",
    marginHorizontal: 16,
  },
  placeholder: {
    width: 40,
  },
  scrollContent: {
    paddingHorizontal: 0,
  },
  heroImage: {
    width: "100%",
    height: 220,
  },
  articleHeader: {
    padding: 24,
    gap: 12,
  },
  categoryBadge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(0, 217, 255, 0.15)",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 14,
  },
  categoryText: {
    fontSize: 13,
    color: "#00D9FF",
    fontFamily: "NotoSerifSC-Regular",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Bold",
    lineHeight: 36,
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255,255,255,0.6)",
    fontFamily: "NotoSerifSC-Regular",
    lineHeight: 24,
  },
  meta: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  metaText: {
    fontSize: 13,
    color: "rgba(255,255,255,0.4)",
    fontFamily: "NotoSerifSC-Regular",
  },
  metaDot: {
    fontSize: 13,
    color: "rgba(255,255,255,0.3)",
    marginHorizontal: 8,
  },
  contentContainer: {
    paddingHorizontal: 24,
    gap: 16,
  },
  paragraph: {
    fontSize: 16,
    color: "rgba(255,255,255,0.85)",
    fontFamily: "NotoSerifSC-Regular",
    lineHeight: 28,
  },
  heading: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Bold",
    marginTop: 16,
    marginBottom: 4,
  },
  bold: {
    fontSize: 16,
    fontWeight: "600",
    color: "#00D9FF",
    fontFamily: "NotoSerifSC-Bold",
    lineHeight: 26,
  },
  bullet: {
    fontSize: 15,
    color: "rgba(255,255,255,0.75)",
    fontFamily: "NotoSerifSC-Regular",
    lineHeight: 26,
    paddingLeft: 8,
  },
  question: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    fontFamily: "NotoSerifSC-Bold",
    lineHeight: 26,
    marginTop: 8,
  },
  answer: {
    fontSize: 15,
    color: "rgba(255,255,255,0.75)",
    fontFamily: "NotoSerifSC-Regular",
    lineHeight: 26,
    marginBottom: 8,
  },
  footer: {
    alignItems: "center",
    paddingVertical: 40,
    gap: 20,
  },
  footerText: {
    fontSize: 14,
    color: "rgba(255,255,255,0.3)",
    fontFamily: "NotoSerifSC-Regular",
  },
  moreButton: {
    backgroundColor: "#00D9FF",
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 25,
    shadowColor: "#00D9FF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  moreButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0F1629",
    fontFamily: "NotoSerifSC-Bold",
    letterSpacing: 1,
  },
});
