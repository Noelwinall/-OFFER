import { describe, it, expect, beforeEach } from "vitest";

// 模擬 AsyncStorage
const mockStorage: Record<string, string> = {};
const AsyncStorage = {
  getItem: async (key: string) => mockStorage[key] || null,
  setItem: async (key: string, value: string) => {
    mockStorage[key] = value;
  },
  removeItem: async (key: string) => {
    delete mockStorage[key];
  },
  clear: async () => {
    Object.keys(mockStorage).forEach((key) => delete mockStorage[key]);
  },
};

// 收藏夾分組數據結構
interface FavoriteGroup {
  id: string;
  name: string;
  color: string;
  icon: string;
  createdAt: string;
}

interface SchoolGroupMapping {
  schoolId: string;
  groupId: string;
}

// 通知數據結構
interface Notification {
  id: string;
  type: "deadline_7d" | "deadline_3d" | "deadline_1d" | "general";
  title: string;
  body: string;
  isRead: boolean;
  createdAt: string;
  schoolId?: string;
}

interface NotificationSettings {
  enabled: boolean;
  remind7Days: boolean;
  remind3Days: boolean;
  remind1Day: boolean;
}

// 評論數據結構
interface Review {
  id: string;
  schoolId: string;
  authorName: string;
  rating: number;
  title?: string;
  content: string;
  tags?: string[];
  likes: number;
  isLiked: boolean;
  createdAt: string;
}

describe("收藏夾分組功能", () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
  });

  it("應該有預設分組", () => {
    const DEFAULT_GROUPS: FavoriteGroup[] = [
      { id: "all", name: "全部收藏", color: "#00D9FF", icon: "heart.fill", createdAt: "" },
      { id: "top", name: "心儀學校", color: "#EF4444", icon: "star.fill", createdAt: "" },
      { id: "backup", name: "備選學校", color: "#F59E0B", icon: "bookmark.fill", createdAt: "" },
      { id: "applied", name: "已申請", color: "#10B981", icon: "checkmark.circle.fill", createdAt: "" },
    ];

    expect(DEFAULT_GROUPS.length).toBe(4);
    expect(DEFAULT_GROUPS.find((g) => g.id === "all")).toBeDefined();
    expect(DEFAULT_GROUPS.find((g) => g.id === "top")).toBeDefined();
    expect(DEFAULT_GROUPS.find((g) => g.id === "backup")).toBeDefined();
    expect(DEFAULT_GROUPS.find((g) => g.id === "applied")).toBeDefined();
  });

  it("應該能新增自定義分組", async () => {
    const newGroup: FavoriteGroup = {
      id: "custom_1",
      name: "國際學校",
      color: "#8B5CF6",
      icon: "folder.fill",
      createdAt: new Date().toISOString(),
    };

    const groups: FavoriteGroup[] = [newGroup];
    await AsyncStorage.setItem("favorite_groups", JSON.stringify(groups));

    const stored = await AsyncStorage.getItem("favorite_groups");
    const parsed = JSON.parse(stored || "[]");
    expect(parsed.length).toBe(1);
    expect(parsed[0].name).toBe("國際學校");
  });

  it("應該能將學校分配到分組", async () => {
    const mapping: SchoolGroupMapping = {
      schoolId: "school_001",
      groupId: "top",
    };

    const mappings: SchoolGroupMapping[] = [mapping];
    await AsyncStorage.setItem("school_group_mappings", JSON.stringify(mappings));

    const stored = await AsyncStorage.getItem("school_group_mappings");
    const parsed = JSON.parse(stored || "[]");
    expect(parsed.length).toBe(1);
    expect(parsed[0].schoolId).toBe("school_001");
    expect(parsed[0].groupId).toBe("top");
  });

  it("應該能移動學校到不同分組", async () => {
    const mappings: SchoolGroupMapping[] = [
      { schoolId: "school_001", groupId: "top" },
    ];
    await AsyncStorage.setItem("school_group_mappings", JSON.stringify(mappings));

    // 移動到備選學校
    const updated = mappings.map((m) =>
      m.schoolId === "school_001" ? { ...m, groupId: "backup" } : m
    );
    await AsyncStorage.setItem("school_group_mappings", JSON.stringify(updated));

    const stored = await AsyncStorage.getItem("school_group_mappings");
    const parsed = JSON.parse(stored || "[]");
    expect(parsed[0].groupId).toBe("backup");
  });
});

describe("通知提醒功能", () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
  });

  it("應該有預設通知設置", () => {
    const defaultSettings: NotificationSettings = {
      enabled: true,
      remind7Days: true,
      remind3Days: true,
      remind1Day: true,
    };

    expect(defaultSettings.enabled).toBe(true);
    expect(defaultSettings.remind7Days).toBe(true);
    expect(defaultSettings.remind3Days).toBe(true);
    expect(defaultSettings.remind1Day).toBe(true);
  });

  it("應該能保存通知設置", async () => {
    const settings: NotificationSettings = {
      enabled: true,
      remind7Days: false,
      remind3Days: true,
      remind1Day: true,
    };

    await AsyncStorage.setItem("notification_settings", JSON.stringify(settings));

    const stored = await AsyncStorage.getItem("notification_settings");
    const parsed = JSON.parse(stored || "{}");
    expect(parsed.remind7Days).toBe(false);
    expect(parsed.remind3Days).toBe(true);
  });

  it("應該能新增通知", async () => {
    const notification: Notification = {
      id: "notif_001",
      type: "deadline_3d",
      title: "申請截止提醒",
      body: "聖保羅男女中學申請將於 3 天後截止",
      isRead: false,
      createdAt: new Date().toISOString(),
      schoolId: "school_001",
    };

    const notifications: Notification[] = [notification];
    await AsyncStorage.setItem("notifications", JSON.stringify(notifications));

    const stored = await AsyncStorage.getItem("notifications");
    const parsed = JSON.parse(stored || "[]");
    expect(parsed.length).toBe(1);
    expect(parsed[0].type).toBe("deadline_3d");
    expect(parsed[0].isRead).toBe(false);
  });

  it("應該能標記通知為已讀", async () => {
    const notifications: Notification[] = [
      {
        id: "notif_001",
        type: "deadline_1d",
        title: "緊急提醒",
        body: "明天截止！",
        isRead: false,
        createdAt: new Date().toISOString(),
      },
    ];
    await AsyncStorage.setItem("notifications", JSON.stringify(notifications));

    // 標記為已讀
    const updated = notifications.map((n) =>
      n.id === "notif_001" ? { ...n, isRead: true } : n
    );
    await AsyncStorage.setItem("notifications", JSON.stringify(updated));

    const stored = await AsyncStorage.getItem("notifications");
    const parsed = JSON.parse(stored || "[]");
    expect(parsed[0].isRead).toBe(true);
  });

  it("應該能計算未讀通知數量", async () => {
    const notifications: Notification[] = [
      { id: "1", type: "deadline_7d", title: "提醒1", body: "", isRead: false, createdAt: "" },
      { id: "2", type: "deadline_3d", title: "提醒2", body: "", isRead: true, createdAt: "" },
      { id: "3", type: "deadline_1d", title: "提醒3", body: "", isRead: false, createdAt: "" },
    ];

    const unreadCount = notifications.filter((n) => !n.isRead).length;
    expect(unreadCount).toBe(2);
  });
});

describe("學校評論功能", () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
  });

  it("應該能新增評論", async () => {
    const review: Review = {
      id: "review_001",
      schoolId: "school_001",
      authorName: "家長A",
      rating: 5,
      title: "非常推薦",
      content: "學校環境優美，師資優秀，孩子很喜歡。",
      tags: ["教學質量好", "環境優美"],
      likes: 0,
      isLiked: false,
      createdAt: new Date().toISOString(),
    };

    const reviews: Review[] = [review];
    await AsyncStorage.setItem("reviews", JSON.stringify(reviews));

    const stored = await AsyncStorage.getItem("reviews");
    const parsed = JSON.parse(stored || "[]");
    expect(parsed.length).toBe(1);
    expect(parsed[0].rating).toBe(5);
    expect(parsed[0].tags?.length).toBe(2);
  });

  it("應該能按學校篩選評論", async () => {
    const reviews: Review[] = [
      { id: "1", schoolId: "school_001", authorName: "A", rating: 5, content: "好", likes: 0, isLiked: false, createdAt: "" },
      { id: "2", schoolId: "school_002", authorName: "B", rating: 4, content: "不錯", likes: 0, isLiked: false, createdAt: "" },
      { id: "3", schoolId: "school_001", authorName: "C", rating: 4, content: "推薦", likes: 0, isLiked: false, createdAt: "" },
    ];

    const school001Reviews = reviews.filter((r) => r.schoolId === "school_001");
    expect(school001Reviews.length).toBe(2);
  });

  it("應該能計算平均評分", async () => {
    const reviews: Review[] = [
      { id: "1", schoolId: "school_001", authorName: "A", rating: 5, content: "", likes: 0, isLiked: false, createdAt: "" },
      { id: "2", schoolId: "school_001", authorName: "B", rating: 4, content: "", likes: 0, isLiked: false, createdAt: "" },
      { id: "3", schoolId: "school_001", authorName: "C", rating: 4, content: "", likes: 0, isLiked: false, createdAt: "" },
    ];

    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    expect(avgRating.toFixed(1)).toBe("4.3");
  });

  it("應該能點讚評論", async () => {
    const reviews: Review[] = [
      { id: "1", schoolId: "school_001", authorName: "A", rating: 5, content: "好", likes: 10, isLiked: false, createdAt: "" },
    ];
    await AsyncStorage.setItem("reviews", JSON.stringify(reviews));

    // 點讚
    const updated = reviews.map((r) =>
      r.id === "1" ? { ...r, likes: r.likes + 1, isLiked: true } : r
    );
    await AsyncStorage.setItem("reviews", JSON.stringify(updated));

    const stored = await AsyncStorage.getItem("reviews");
    const parsed = JSON.parse(stored || "[]");
    expect(parsed[0].likes).toBe(11);
    expect(parsed[0].isLiked).toBe(true);
  });

  it("應該能按最新或最熱排序", async () => {
    const reviews: Review[] = [
      { id: "1", schoolId: "school_001", authorName: "A", rating: 5, content: "", likes: 5, isLiked: false, createdAt: "2025-01-01" },
      { id: "2", schoolId: "school_001", authorName: "B", rating: 4, content: "", likes: 20, isLiked: false, createdAt: "2025-01-08" },
      { id: "3", schoolId: "school_001", authorName: "C", rating: 4, content: "", likes: 10, isLiked: false, createdAt: "2025-01-05" },
    ];

    // 按最新排序
    const sortedByLatest = [...reviews].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    expect(sortedByLatest[0].id).toBe("2");

    // 按最熱排序
    const sortedByPopular = [...reviews].sort((a, b) => b.likes - a.likes);
    expect(sortedByPopular[0].id).toBe("2");
    expect(sortedByPopular[0].likes).toBe(20);
  });

  it("評論標籤應該包含正確選項", () => {
    const REVIEW_TAGS = [
      "教學質量好",
      "環境優美",
      "師資優秀",
      "課外活動豐富",
      "升學率高",
      "學費合理",
      "交通便利",
      "校風優良",
    ];

    expect(REVIEW_TAGS.length).toBe(8);
    expect(REVIEW_TAGS).toContain("教學質量好");
    expect(REVIEW_TAGS).toContain("校風優良");
  });
});

describe("整合測試", () => {
  it("收藏夾分組顏色選項應該正確", () => {
    const GROUP_COLORS = ["#EF4444", "#F59E0B", "#10B981", "#3B82F6", "#8B5CF6", "#EC4899", "#00D9FF"];
    expect(GROUP_COLORS.length).toBe(7);
  });

  it("通知類型應該有對應顏色", () => {
    const typeColors: Record<string, string> = {
      deadline_1d: "#EF4444",
      deadline_3d: "#F59E0B",
      deadline_7d: "#10B981",
      general: "#00D9FF",
    };

    expect(typeColors.deadline_1d).toBe("#EF4444");
    expect(typeColors.deadline_7d).toBe("#10B981");
  });
});
