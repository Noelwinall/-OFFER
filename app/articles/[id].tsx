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
  "4": {
    title: "小一派位機制詳解",
    subtitle: "統一派位、自行分配全面解析",
    category: "選校攻略",
    readTime: "7 分鐘",
    author: "有OFFER編輯部",
    date: "2024年9月",
    image: require("@/assets/images/feature-guide.png"),
    content: [
      "香港小一派位制度對許多家長來說既複雜又重要。本文將為您詳細解析整個派位機制，助您為孩子選擇最合適的學校。",
      "## 一、小一派位制度概覽",
      "香港小一入學分為兩個階段：",
      "**自行分配學位**：約佔總學位的50%",
      "**統一派位**：約佔總學位的50%",
      "## 二、自行分配學位（9-11月）",
      "家長可為子女向任何一間官立或資助小學申請。",
      "**計分準則**：",
      "• 父/母/兄/姊在該校就讀或任職：20分",
      "• 父/母為該校校董：20分",
      "• 父/母/兄/姊為該校畢業生：10分",
      "• 首名出生子女：5分",
      "• 與學校同一學校網：10分",
      "• 適齡兒童（即翌年9月開課時年滿5歲8個月至7歲）：10分",
      "**重要提示**：",
      "• 只能申請一間學校",
      "• 必須親自遞交申請表",
      "• 結果約於11月公佈",
      "## 三、統一派位（1-6月）",
      "未獲自行分配學位的學生進入統一派位。",
      "**甲部**：不受校網限制，可選3間學校",
      "**乙部**：只能選本校網學校，最多選30間",
      "**派位原則**：",
      "• 先處理甲部選擇",
      "• 再處理乙部選擇",
      "• 以隨機編號決定優先次序",
      "## 四、選校策略建議",
      "**自行分配階段**：",
      "• 計算清楚分數，選擇有把握的學校",
      "• 了解學校往年收生情況",
      "**統一派位階段**：",
      "• 甲部選心儀學校，乙部要務實",
      "• 首三志願非常重要",
      "• 了解各校網的競爭程度",
      "## 五、常見問題",
      "**Q：可以跨區申請嗎？**",
      "A：自行分配階段可以，統一派位甲部可以，乙部只能選本校網。",
      "**Q：沒有計分優勢怎麼辦？**",
      "A：統一派位以隨機編號決定，每個孩子機會均等。",
      "## 結語",
      "小一派位是一個系統性的過程，建議家長提前了解規則，做好充分準備。",
    ],
  },
  "5": {
    title: "直資學校 vs 資助學校",
    subtitle: "學費、教學、升學路徑大比拼",
    category: "選校攻略",
    readTime: "9 分鐘",
    author: "有OFFER編輯部",
    date: "2024年8月",
    image: require("@/assets/images/feature-articles.png"),
    content: [
      "直資學校和資助學校是香港兩種主要的學校類型，各有特色。本文將從多個維度進行比較，幫助家長做出選擇。",
      "## 一、基本定義",
      "**直資學校（Direct Subsidy Scheme）**",
      "接受政府按學生人數資助，同時可收取學費，享有較大辦學自主權。",
      "**資助學校（Aided Schools）**",
      "主要由政府資助，不收取學費（中學可收取堂費），由辦學團體營運。",
      "## 二、學費比較",
      "**直資學校**：",
      "• 學費由數千至十多萬港幣不等",
      "• 可申請學費減免",
      "• 部分學校設有獎學金",
      "**資助學校**：",
      "• 小學免費",
      "• 中學只收取堂費（約數百至數千港幣）",
      "## 三、課程與教學",
      "**直資學校**：",
      "• 課程較靈活，可自行設計",
      "• 部分提供IB、IGCSE等國際課程",
      "• 師生比例通常較低",
      "• 設施一般較完善",
      "**資助學校**：",
      "• 主要跟隨本地課程",
      "• 教學質素參差，視乎學校",
      "• 班級人數較多",
      "## 四、收生方式",
      "**直資學校**：",
      "• 自行收生，不受校網限制",
      "• 可設入學試和面試",
      "• 競爭激烈",
      "**資助學校**：",
      "• 小一透過派位制度",
      "• 中一透過中學學位分配辦法",
      "• 部分設有自行分配學位",
      "## 五、升學路徑",
      "**直資學校**：",
      "• 部分設有一條龍升學",
      "• 海外升學支援較多",
      "• 校內成績認受性高",
      "**資助學校**：",
      "• 主要升讀本地大學",
      "• 需參加DSE公開試",
      "• 部分名校升學率高",
      "## 六、如何選擇？",
      "**選擇直資學校如果**：",
      "• 重視課程靈活性",
      "• 有海外升學計劃",
      "• 經濟能力許可",
      "**選擇資助學校如果**：",
      "• 希望節省教育開支",
      "• 計劃本地升學",
      "• 住所靠近心儀學校",
      "## 結語",
      "無論選擇哪種學校，最重要是適合孩子的發展需要。建議家長多參加學校開放日，實地了解學校氛圍。",
    ],
  },
  "6": {
    title: "小學面試常見問題及回答技巧",
    subtitle: "50道高頻面試題目精選",
    category: "面試技巧",
    readTime: "12 分鐘",
    author: "有OFFER編輯部",
    date: "2024年7月",
    image: require("@/assets/images/feature-guide.png"),
    content: [
      "小學面試是入學的重要環節，本文整理了50道高頻面試題目及回答技巧，幫助孩子從容應對。",
      "## 一、自我介紹類（10題）",
      "**1. 請介紹一下自己**",
      "技巧：包含姓名、年齡、就讀學校、興趣愛好，控制在1分鐘內。",
      "**2. 你最喜歡什麼？為什麼？**",
      "技巧：選擇具體的事物，說明原因，展現思考能力。",
      "**3. 你有什麼特長？**",
      "技巧：誠實回答，可以是運動、音樂、繪畫等。",
      "**4. 你長大後想做什麼？**",
      "技巧：不需要標準答案，重要的是能說出原因。",
      "**5. 你最好的朋友是誰？**",
      "技巧：描述朋友的特點和你們一起做的事情。",
      "## 二、家庭相關類（10題）",
      "**6. 你家有幾個人？**",
      "技巧：清楚說明家庭成員。",
      "**7. 爸爸媽媽做什麼工作？**",
      "技巧：簡單描述即可，不需要太詳細。",
      "**8. 你在家裡會幫忙做什麼？**",
      "技巧：說出具體的家務，展現責任感。",
      "**9. 週末你們家通常做什麼？**",
      "技巧：描述家庭活動，展現家庭氛圍。",
      "**10. 你最喜歡和誰一起玩？**",
      "技巧：可以是家人或朋友，說明原因。",
      "## 三、學習相關類（10題）",
      "**11. 你最喜歡什麼科目？**",
      "技巧：說出具體科目和喜歡的原因。",
      "**12. 你覺得學習難嗎？**",
      "技巧：誠實回答，可以說有些難但會努力。",
      "**13. 你每天怎麼溫習？**",
      "技巧：描述學習習慣，展現自律性。",
      "**14. 你最近讀了什麼書？**",
      "技巧：說出書名和簡單內容，展現閱讀習慣。",
      "**15. 你會說英文嗎？**",
      "技巧：可以用簡單英文自我介紹。",
      "## 四、情境應對類（10題）",
      "**16. 如果有人欺負你，你會怎麼做？**",
      "技巧：說會告訴老師或家長，不要說會打回去。",
      "**17. 如果你迷路了，你會怎麼做？**",
      "技巧：說會找警察叔叔或商店職員幫忙。",
      "**18. 如果朋友不和你玩，你會怎麼做？**",
      "技巧：說會問原因或找其他朋友玩。",
      "**19. 如果你做錯事，你會怎麼做？**",
      "技巧：說會道歉和改正。",
      "**20. 如果你撿到錢，你會怎麼做？**",
      "技巧：說會交給老師或警察。",
      "## 五、常識認知類（10題）",
      "**21-25. 顏色、形狀、數字相關問題**",
      "技巧：平時多練習基本認知。",
      "**26-30. 季節、天氣、動物相關問題**",
      "技巧：通過日常觀察和閱讀積累知識。",
      "## 六、創意思維類（10題）",
      "**31-35. 看圖說故事**",
      "技巧：觀察圖片細節，有邏輯地描述。",
      "**36-40. 如果你是...你會怎麼做？**",
      "技巧：發揮想像力，但要合理。",
      "**41-45. 這個東西可以用來做什麼？**",
      "技巧：說出多種用途，展現創意。",
      "**46-50. 你覺得為什麼...？**",
      "技巧：嘗試解釋原因，展現思考能力。",
      "## 面試小貼士",
      "• 保持眼神接觸",
      "• 說話清晰有禮貌",
      "• 不懂可以說「我不知道」",
      "• 不要背誦答案",
      "• 保持自然和微笑",
      "祝各位小朋友面試順利！",
    ],
  },
  "7": {
    title: "如何準備Portfolio作品集",
    subtitle: "打造亮眼的申請材料",
    category: "申請準備",
    readTime: "8 分鐘",
    author: "有OFFER編輯部",
    date: "2024年6月",
    image: require("@/assets/images/feature-articles.png"),
    content: [
      "作品集（Portfolio）是許多學校申請的重要材料，一份精心準備的作品集能讓孩子脫穎而出。本文將教您如何準備一份出色的作品集。",
      "## 一、什麼是Portfolio？",
      "Portfolio是展示孩子學習成果、興趣愛好和個人特質的材料集合，通常包括：",
      "• 學術作品",
      "• 藝術創作",
      "• 獎狀證書",
      "• 活動照片",
      "• 個人簡介",
      "## 二、Portfolio的重要性",
      "**對學校而言**：",
      "• 了解孩子的全面發展",
      "• 評估孩子的潛力",
      "• 看到成績單以外的特質",
      "**對孩子而言**：",
      "• 整理和反思學習歷程",
      "• 建立自信心",
      "• 學習自我展示",
      "## 三、Portfolio內容建議",
      "**學術類**：",
      "• 優秀作業樣本",
      "• 閱讀記錄",
      "• 專題研習報告",
      "**藝術類**：",
      "• 繪畫作品",
      "• 手工藝品照片",
      "• 音樂/舞蹈表演照片",
      "**活動類**：",
      "• 運動比賽照片",
      "• 社區服務記錄",
      "• 興趣班成果",
      "**獎項類**：",
      "• 學術獎狀",
      "• 比賽證書",
      "• 考級證書",
      "## 四、製作技巧",
      "**1. 精選內容**",
      "• 質量比數量重要",
      "• 選擇最能代表孩子的作品",
      "• 展示多方面發展",
      "**2. 排版設計**",
      "• 清晰整潔",
      "• 適當留白",
      "• 統一風格",
      "**3. 加入說明**",
      "• 每件作品附上簡短說明",
      "• 說明創作背景和意義",
      "• 展示孩子的思考過程",
      "**4. 時間順序**",
      "• 按時間或主題分類",
      "• 展示成長軌跡",
      "## 五、常見錯誤",
      "• 內容過多，沒有重點",
      "• 只放獎狀，缺乏作品",
      "• 過度包裝，失去真實",
      "• 家長代勞，缺乏孩子參與",
      "## 六、不同年齡的重點",
      "**幼稚園申請**：",
      "• 繪畫和手工作品",
      "• 生活照片",
      "• 簡單的自我介紹",
      "**小學申請**：",
      "• 學術作品樣本",
      "• 課外活動記錄",
      "• 獎項和證書",
      "## 結語",
      "Portfolio是孩子的「名片」，但不要為了製作Portfolio而給孩子太大壓力。最好的作品集是真實記錄孩子成長的點滴。",
    ],
  },
  "8": {
    title: "國際學校學費全覽",
    subtitle: "2024-2025學年最新學費一覽表",
    category: "選校攻略",
    readTime: "5 分鐘",
    author: "有OFFER編輯部",
    date: "2024年5月",
    image: require("@/assets/images/feature-guide.png"),
    content: [
      "香港國際學校學費差異較大，本文整理了2024-2025學年主要國際學校的學費資訊，供家長參考。",
      "## 一、頂級國際學校（年費 20萬+）",
      "**漢基國際學校**",
      "• 小學：約 HK$243,000/年",
      "• 中學：約 HK$280,000/年",
      "• 特點：雙語教學，IB課程",
      "**香港國際學校（HKIS）**",
      "• 小學：約 HK$230,000/年",
      "• 中學：約 HK$260,000/年",
      "• 特點：美式課程，AP課程",
      "**德瑞國際學校**",
      "• 小學：約 HK$220,000/年",
      "• 中學：約 HK$250,000/年",
      "• 特點：德式/英式雙軌課程",
      "## 二、中高端國際學校（年費 15-20萬）",
      "**弘立書院**",
      "• 小學：約 HK$198,000/年",
      "• 中學：約 HK$220,000/年",
      "• 特點：中英雙語，IB課程",
      "**耀中國際學校**",
      "• 小學：約 HK$180,000/年",
      "• 中學：約 HK$200,000/年",
      "• 特點：雙語教學，IB課程",
      "**加拿大國際學校**",
      "• 小學：約 HK$160,000/年",
      "• 中學：約 HK$180,000/年",
      "• 特點：加拿大課程，IB課程",
      "## 三、英基學校協會（年費 10-15萬）",
      "**英基小學**",
      "• 學費：約 HK$115,000/年",
      "• 特點：英式課程，性價比高",
      "**英基中學**",
      "• 學費：約 HK$133,000/年",
      "• 特點：IB課程，升學率高",
      "## 四、其他費用",
      "除學費外，還需考慮：",
      "• **債券/提名權**：部分學校要求購買，金額從數十萬至數百萬不等",
      "• **建校費**：每年約 HK$10,000-50,000",
      "• **校巴費**：每年約 HK$10,000-30,000",
      "• **午餐費**：每年約 HK$5,000-15,000",
      "• **校服費**：約 HK$3,000-8,000",
      "• **課外活動費**：視乎參加項目",
      "## 五、學費減免",
      "部分學校提供學費減免計劃：",
      "• 英基學校協會：設有學費減免計劃",
      "• 部分私立國際學校：設有獎學金",
      "• 直資學校：可申請學費減免",
      "## 六、選校建議",
      "• 學費只是考慮因素之一",
      "• 了解學校的教學理念和課程",
      "• 考慮長遠的教育開支",
      "• 參加學校開放日實地了解",
      "## 免責聲明",
      "以上學費資訊僅供參考，實際學費以各學校官方公佈為準。學費可能每年調整。",
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
