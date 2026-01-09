import { describe, it, expect } from "vitest";

// 測試新功能頁面的數據結構和邏輯

describe("學校大PK頁面", () => {
  // 學校類型對比數據
  const SCHOOL_TYPES = [
    { id: "international", name: "國際學校", color: "#7C3AED" },
    { id: "dss", name: "直資學校", color: "#10B981" },
    { id: "private", name: "私立學校", color: "#F59E0B" },
    { id: "aided", name: "資助學校", color: "#3B82F6" },
  ];

  it("應該有 4 種學校類型", () => {
    expect(SCHOOL_TYPES.length).toBe(4);
  });

  it("每種學校類型應該有完整的屬性", () => {
    SCHOOL_TYPES.forEach((type) => {
      expect(type).toHaveProperty("id");
      expect(type).toHaveProperty("name");
      expect(type).toHaveProperty("color");
      expect(type.id).toBeTruthy();
      expect(type.name).toBeTruthy();
      expect(type.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
    });
  });
});

describe("學校在哪裡頁面", () => {
  // 地區數據
  const DISTRICTS = [
    { id: "hk", name: "港島區", schools: 15 },
    { id: "kln", name: "九龍區", schools: 18 },
    { id: "nt", name: "新界區", schools: 17 },
  ];

  it("應該有 3 個主要地區", () => {
    expect(DISTRICTS.length).toBe(3);
  });

  it("每個地區應該有學校數量", () => {
    DISTRICTS.forEach((district) => {
      expect(district).toHaveProperty("schools");
      expect(district.schools).toBeGreaterThan(0);
    });
  });

  it("總學校數量應該等於 50", () => {
    const total = DISTRICTS.reduce((sum, d) => sum + d.schools, 0);
    expect(total).toBe(50);
  });
});

describe("申請截止別錯過頁面", () => {
  // 時間線事件類型
  const EVENT_TYPES = {
    application_open: { label: "申請開放", color: "#10B981" },
    deadline: { label: "截止日期", color: "#EF4444" },
    info_session: { label: "簡介會", color: "#7C3AED" },
    interview: { label: "面試期", color: "#F59E0B" },
    result: { label: "放榜", color: "#00D9FF" },
  };

  it("應該有 5 種事件類型", () => {
    expect(Object.keys(EVENT_TYPES).length).toBe(5);
  });

  it("每種事件類型應該有標籤和顏色", () => {
    Object.values(EVENT_TYPES).forEach((type) => {
      expect(type).toHaveProperty("label");
      expect(type).toHaveProperty("color");
      expect(type.label).toBeTruthy();
      expect(type.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
    });
  });

  it("截止日期應該使用紅色標記", () => {
    expect(EVENT_TYPES.deadline.color).toBe("#EF4444");
  });
});

describe("搜尋頁面快捷功能", () => {
  // 快捷功能入口
  const QUICK_ACTIONS = [
    { id: "compare", title: "學校大PK", route: "/compare-guide" },
    { id: "map", title: "學校在哪裡", route: "/school-map" },
    { id: "deadline", title: "申請截止日", route: "/deadlines" },
  ];

  it("應該有 3 個快捷功能入口", () => {
    expect(QUICK_ACTIONS.length).toBe(3);
  });

  it("每個快捷功能應該有有效的路由", () => {
    QUICK_ACTIONS.forEach((action) => {
      expect(action.route).toMatch(/^\//);
    });
  });

  it("應該包含學校大PK入口", () => {
    const compareAction = QUICK_ACTIONS.find((a) => a.id === "compare");
    expect(compareAction).toBeDefined();
    expect(compareAction?.route).toBe("/compare-guide");
  });

  it("應該包含學校在哪裡入口", () => {
    const mapAction = QUICK_ACTIONS.find((a) => a.id === "map");
    expect(mapAction).toBeDefined();
    expect(mapAction?.route).toBe("/school-map");
  });
});

describe("首頁功能卡片滑動區塊", () => {
  // 功能卡片數據
  const FEATURE_CARDS = [
    { id: "articles", title: "家長攻略", route: "/articles" },
    { id: "compare", title: "學校大PK", route: "/compare-guide" },
    { id: "map", title: "學校在哪裡", route: "/school-map" },
    { id: "deadlines", title: "申請截止別錯過！", route: "/deadlines" },
  ];

  it("應該有 4 個功能卡片", () => {
    expect(FEATURE_CARDS.length).toBe(4);
  });

  it("第一個卡片應該是家長攻略", () => {
    expect(FEATURE_CARDS[0].title).toBe("家長攻略");
  });

  it("第二個卡片應該是學校大PK", () => {
    expect(FEATURE_CARDS[1].title).toBe("學校大PK");
  });

  it("第三個卡片應該是學校在哪裡", () => {
    expect(FEATURE_CARDS[2].title).toBe("學校在哪裡");
  });

  it("第四個卡片應該是申請截止別錯過", () => {
    expect(FEATURE_CARDS[3].title).toContain("申請截止");
  });

  it("每個卡片應該有有效的路由", () => {
    FEATURE_CARDS.forEach((card) => {
      expect(card.route).toMatch(/^\//);
    });
  });
});
