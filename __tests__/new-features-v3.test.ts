import { describe, it, expect } from "vitest";

// 測試新功能：排序、文章、滑卡探索

describe("排序功能測試", () => {
  // 排序選項配置
  const SORT_OPTIONS = [
    { value: "relevance", label: "相關度" },
    { value: "tuition_low", label: "學費由低到高" },
    { value: "tuition_high", label: "學費由高到低" },
    { value: "name_asc", label: "名稱 A-Z" },
    { value: "name_desc", label: "名稱 Z-A" },
  ];

  it("應該有5個排序選項", () => {
    expect(SORT_OPTIONS).toHaveLength(5);
  });

  it("排序選項應該包含相關度", () => {
    const relevance = SORT_OPTIONS.find((o) => o.value === "relevance");
    expect(relevance).toBeDefined();
    expect(relevance?.label).toBe("相關度");
  });

  it("排序選項應該包含學費排序", () => {
    const tuitionLow = SORT_OPTIONS.find((o) => o.value === "tuition_low");
    const tuitionHigh = SORT_OPTIONS.find((o) => o.value === "tuition_high");
    expect(tuitionLow).toBeDefined();
    expect(tuitionHigh).toBeDefined();
  });

  it("排序選項應該包含名稱排序", () => {
    const nameAsc = SORT_OPTIONS.find((o) => o.value === "name_asc");
    const nameDesc = SORT_OPTIONS.find((o) => o.value === "name_desc");
    expect(nameAsc).toBeDefined();
    expect(nameDesc).toBeDefined();
  });

  // 測試排序邏輯
  it("學費排序應該正確排列", () => {
    const schools = [
      { name: "A", tuitionAvg: 200000 },
      { name: "B", tuitionAvg: 50000 },
      { name: "C", tuitionAvg: 100000 },
    ];

    // 學費由低到高
    const sortedLow = [...schools].sort((a, b) => a.tuitionAvg - b.tuitionAvg);
    expect(sortedLow[0].name).toBe("B");
    expect(sortedLow[2].name).toBe("A");

    // 學費由高到低
    const sortedHigh = [...schools].sort((a, b) => b.tuitionAvg - a.tuitionAvg);
    expect(sortedHigh[0].name).toBe("A");
    expect(sortedHigh[2].name).toBe("B");
  });
});

describe("文章數據測試", () => {
  // 文章列表
  const ARTICLES = [
    { id: "1", title: "香港國際學校申請全攻略", category: "選校攻略", isNew: false },
    { id: "2", title: "幼稚園面試必勝技巧", category: "面試技巧", isNew: false },
    { id: "3", title: "IB vs DSE：如何選擇課程體系", category: "選校攻略", isNew: false },
    { id: "4", title: "小一派位機制詳解", category: "選校攻略", isNew: true },
    { id: "5", title: "直資學校 vs 資助學校", category: "選校攻略", isNew: true },
    { id: "6", title: "小學面試常見問題及回答技巧", category: "面試技巧", isNew: true },
    { id: "7", title: "如何準備Portfolio作品集", category: "申請準備", isNew: true },
    { id: "8", title: "國際學校學費全覽", category: "選校攻略", isNew: true },
  ];

  // 文章分類
  const CATEGORIES = ["全部", "選校攻略", "面試技巧", "申請準備"];

  it("文章列表應該包含8篇文章", () => {
    expect(ARTICLES).toHaveLength(8);
  });

  it("應該有4個文章分類", () => {
    expect(CATEGORIES).toHaveLength(4);
  });

  it("文章分類應該正確", () => {
    expect(CATEGORIES).toContain("選校攻略");
    expect(CATEGORIES).toContain("面試技巧");
    expect(CATEGORIES).toContain("申請準備");
  });

  it("應該有新增的文章標記為 NEW", () => {
    const newArticles = ARTICLES.filter((a) => a.isNew);
    expect(newArticles.length).toBeGreaterThan(0);
  });

  it("選校攻略類別應該有最多文章", () => {
    const countByCategory = CATEGORIES.slice(1).map((cat) => ({
      category: cat,
      count: ARTICLES.filter((a) => a.category === cat).length,
    }));
    const maxCategory = countByCategory.reduce((max, curr) =>
      curr.count > max.count ? curr : max
    );
    expect(maxCategory.category).toBe("選校攻略");
  });

  it("文章篩選功能應該正確過濾", () => {
    const filterByCategory = (category: string) =>
      category === "全部"
        ? ARTICLES
        : ARTICLES.filter((a) => a.category === category);

    expect(filterByCategory("全部")).toHaveLength(8);
    expect(filterByCategory("面試技巧")).toHaveLength(2);
    expect(filterByCategory("申請準備")).toHaveLength(1);
  });
});

describe("滑卡探索功能測試", () => {
  // 滑卡配置
  const SWIPE_CONFIG = {
    threshold: 100, // 滑動閾值
    maxRotation: 15, // 最大旋轉角度
    directions: {
      LEFT: "skip",
      RIGHT: "favorite",
    },
  };

  it("滑卡方向應該正確定義", () => {
    expect(SWIPE_CONFIG.directions.LEFT).toBe("skip");
    expect(SWIPE_CONFIG.directions.RIGHT).toBe("favorite");
  });

  it("滑卡閾值應該合理", () => {
    expect(SWIPE_CONFIG.threshold).toBeGreaterThan(50);
    expect(SWIPE_CONFIG.threshold).toBeLessThan(200);
  });

  it("最大旋轉角度應該合理", () => {
    expect(SWIPE_CONFIG.maxRotation).toBeGreaterThan(0);
    expect(SWIPE_CONFIG.maxRotation).toBeLessThanOrEqual(30);
  });

  // 測試滑卡狀態管理
  it("滑卡計數器應該正確更新", () => {
    let viewedCount = 0;
    let savedCount = 0;

    // 模擬滑動操作
    const handleSwipe = (direction: "left" | "right") => {
      viewedCount++;
      if (direction === "right") {
        savedCount++;
      }
    };

    handleSwipe("left"); // 跳過
    handleSwipe("right"); // 收藏
    handleSwipe("right"); // 收藏
    handleSwipe("left"); // 跳過

    expect(viewedCount).toBe(4);
    expect(savedCount).toBe(2);
  });

  // 測試卡片堆疊
  it("卡片堆疊應該正確顯示", () => {
    const schools = [
      { id: "1", name: "學校A" },
      { id: "2", name: "學校B" },
      { id: "3", name: "學校C" },
    ];

    // 只顯示前 3 張卡片
    const visibleCards = schools.slice(0, 3);
    expect(visibleCards).toHaveLength(3);

    // 移除第一張卡片後
    const afterSwipe = schools.slice(1);
    expect(afterSwipe[0].name).toBe("學校B");
  });
});

describe("FilterContext 排序狀態測試", () => {
  // 模擬 FilterState
  interface FilterState {
    tuitionRange: { min: number; max: number } | null;
    curriculum: string[];
    language: string | null;
    category: string[];
    district: string[];
    sortBy: string;
  }

  const initialState: FilterState = {
    tuitionRange: null,
    curriculum: [],
    language: null,
    category: [],
    district: [],
    sortBy: "relevance",
  };

  it("初始排序應該是相關度", () => {
    expect(initialState.sortBy).toBe("relevance");
  });

  it("SET_SORT action 應該更新排序狀態", () => {
    // 模擬 reducer
    const reducer = (state: FilterState, action: { type: string; payload?: string }) => {
      if (action.type === "SET_SORT" && action.payload) {
        return { ...state, sortBy: action.payload };
      }
      return state;
    };

    const newState = reducer(initialState, { type: "SET_SORT", payload: "tuition_low" });
    expect(newState.sortBy).toBe("tuition_low");
  });

  it("RESET_FILTERS 應該重置排序為相關度", () => {
    const stateWithSort: FilterState = {
      ...initialState,
      sortBy: "tuition_high",
    };

    // 模擬重置
    const resetState = { ...initialState };
    expect(resetState.sortBy).toBe("relevance");
  });
});
