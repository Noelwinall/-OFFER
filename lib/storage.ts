import AsyncStorage from "@react-native-async-storage/async-storage";
import type { School } from "@/types/school";

/**
 * LocalStorage 封裝層
 * 用於管理收藏、對比、滑卡進度、分組、通知、評論等本地資料
 */

const KEYS = {
  FAVORITES: "@hk_edu_app:favorites",
  COMPARE: "@hk_edu_app:compare",
  SWIPE_COUNT: "@hk_edu_app:swipe_count",
  SWIPE_DATE: "@hk_edu_app:swipe_date",
  FAVORITE_GROUPS: "@hk_edu_app:favorite_groups",
  SCHOOL_GROUPS: "@hk_edu_app:school_groups",
  NOTIFICATIONS: "@hk_edu_app:notifications",
  NOTIFICATION_SETTINGS: "@hk_edu_app:notification_settings",
  REVIEWS: "@hk_edu_app:reviews",
  // Map screen storage keys
  MAP_FILTERS_IDS: "@hk_edu_app:map_filters_ids_v1",
  MAP_FILTERS_UPDATED: "@hk_edu_app:map_filters_updated_v1",
  MAP_QA_IDS: "@hk_edu_app:map_qa_ids_v1",
  MAP_QA_UPDATED: "@hk_edu_app:map_qa_updated_v1",
  MAP_SOURCE: "@hk_edu_app:map_source_v1",
} as const;

/**
 * 收藏分組類型
 */
export interface FavoriteGroup {
  id: string;
  name: string;
  color: string;
  icon: string;
  createdAt: string;
  isDefault?: boolean;
}

/**
 * 學校分組映射類型
 */
export interface SchoolGroupMapping {
  schoolId: string;
  groupId: string;
}

/**
 * 通知類型
 */
export interface Notification {
  id: string;
  schoolId: string;
  schoolName: string;
  type: "deadline_7d" | "deadline_3d" | "deadline_1d" | "custom";
  title: string;
  body: string;
  scheduledAt: string;
  isRead: boolean;
  createdAt: string;
}

/**
 * 通知設置類型
 */
export interface NotificationSettings {
  enabled: boolean;
  remind7Days: boolean;
  remind3Days: boolean;
  remind1Day: boolean;
}

/**
 * 評論類型
 */
export interface Review {
  id: string;
  schoolId: string;
  authorName: string;
  rating: number; // 1-5
  title: string;
  content: string;
  likes: number;
  isLiked: boolean;
  tags: string[];
  createdAt: string;
}

/**
 * 預設收藏分組
 */
export const DEFAULT_GROUPS: FavoriteGroup[] = [
  {
    id: "all",
    name: "全部收藏",
    color: "#00D9FF",
    icon: "heart.fill",
    createdAt: new Date().toISOString(),
    isDefault: true,
  },
  {
    id: "top_choice",
    name: "心儀學校",
    color: "#EF4444",
    icon: "star.fill",
    createdAt: new Date().toISOString(),
    isDefault: true,
  },
  {
    id: "backup",
    name: "備選學校",
    color: "#F59E0B",
    icon: "bookmark.fill",
    createdAt: new Date().toISOString(),
    isDefault: true,
  },
  {
    id: "applied",
    name: "已申請",
    color: "#10B981",
    icon: "checkmark.circle.fill",
    createdAt: new Date().toISOString(),
    isDefault: true,
  },
];

/**
 * 收藏功能
 */
export const FavoritesStorage = {
  async getAll(): Promise<string[]> {
    try {
      const data = await AsyncStorage.getItem(KEYS.FAVORITES);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Failed to load favorites:", error);
      return [];
    }
  },

  async add(schoolId: string): Promise<void> {
    try {
      const favorites = await this.getAll();
      if (!favorites.includes(schoolId)) {
        favorites.push(schoolId);
        await AsyncStorage.setItem(KEYS.FAVORITES, JSON.stringify(favorites));
      }
    } catch (error) {
      console.error("Failed to add favorite:", error);
    }
  },

  async remove(schoolId: string): Promise<void> {
    try {
      const favorites = await this.getAll();
      const filtered = favorites.filter((id) => id !== schoolId);
      await AsyncStorage.setItem(KEYS.FAVORITES, JSON.stringify(filtered));
      // 同時移除分組映射
      await FavoriteGroupsStorage.removeSchoolFromAllGroups(schoolId);
    } catch (error) {
      console.error("Failed to remove favorite:", error);
    }
  },

  async toggle(schoolId: string): Promise<boolean> {
    const favorites = await this.getAll();
    const isFavorite = favorites.includes(schoolId);
    if (isFavorite) {
      await this.remove(schoolId);
    } else {
      await this.add(schoolId);
    }
    return !isFavorite;
  },

  async isFavorite(schoolId: string): Promise<boolean> {
    const favorites = await this.getAll();
    return favorites.includes(schoolId);
  },
};

/**
 * 收藏分組功能
 */
export const FavoriteGroupsStorage = {
  async getGroups(): Promise<FavoriteGroup[]> {
    try {
      const data = await AsyncStorage.getItem(KEYS.FAVORITE_GROUPS);
      if (data) {
        return JSON.parse(data);
      }
      // 初始化預設分組
      await AsyncStorage.setItem(KEYS.FAVORITE_GROUPS, JSON.stringify(DEFAULT_GROUPS));
      return DEFAULT_GROUPS;
    } catch (error) {
      console.error("Failed to load favorite groups:", error);
      return DEFAULT_GROUPS;
    }
  },

  async addGroup(group: Omit<FavoriteGroup, "id" | "createdAt">): Promise<FavoriteGroup> {
    try {
      const groups = await this.getGroups();
      const newGroup: FavoriteGroup = {
        ...group,
        id: `custom_${Date.now()}`,
        createdAt: new Date().toISOString(),
      };
      groups.push(newGroup);
      await AsyncStorage.setItem(KEYS.FAVORITE_GROUPS, JSON.stringify(groups));
      return newGroup;
    } catch (error) {
      console.error("Failed to add group:", error);
      throw error;
    }
  },

  async updateGroup(groupId: string, updates: Partial<FavoriteGroup>): Promise<void> {
    try {
      const groups = await this.getGroups();
      const index = groups.findIndex((g) => g.id === groupId);
      if (index !== -1 && !groups[index].isDefault) {
        groups[index] = { ...groups[index], ...updates };
        await AsyncStorage.setItem(KEYS.FAVORITE_GROUPS, JSON.stringify(groups));
      }
    } catch (error) {
      console.error("Failed to update group:", error);
    }
  },

  async deleteGroup(groupId: string): Promise<void> {
    try {
      const groups = await this.getGroups();
      const filtered = groups.filter((g) => g.id !== groupId || g.isDefault);
      await AsyncStorage.setItem(KEYS.FAVORITE_GROUPS, JSON.stringify(filtered));
      // 移除該分組下的所有學校映射
      const mappings = await this.getSchoolMappings();
      const filteredMappings = mappings.filter((m) => m.groupId !== groupId);
      await AsyncStorage.setItem(KEYS.SCHOOL_GROUPS, JSON.stringify(filteredMappings));
    } catch (error) {
      console.error("Failed to delete group:", error);
    }
  },

  async getSchoolMappings(): Promise<SchoolGroupMapping[]> {
    try {
      const data = await AsyncStorage.getItem(KEYS.SCHOOL_GROUPS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Failed to load school mappings:", error);
      return [];
    }
  },

  async setSchoolGroup(schoolId: string, groupId: string): Promise<void> {
    try {
      const mappings = await this.getSchoolMappings();
      const existingIndex = mappings.findIndex((m) => m.schoolId === schoolId);
      if (existingIndex !== -1) {
        mappings[existingIndex].groupId = groupId;
      } else {
        mappings.push({ schoolId, groupId });
      }
      await AsyncStorage.setItem(KEYS.SCHOOL_GROUPS, JSON.stringify(mappings));
    } catch (error) {
      console.error("Failed to set school group:", error);
    }
  },

  async getSchoolGroup(schoolId: string): Promise<string | null> {
    try {
      const mappings = await this.getSchoolMappings();
      const mapping = mappings.find((m) => m.schoolId === schoolId);
      return mapping?.groupId || null;
    } catch (error) {
      console.error("Failed to get school group:", error);
      return null;
    }
  },

  async getSchoolsInGroup(groupId: string): Promise<string[]> {
    try {
      if (groupId === "all") {
        return await FavoritesStorage.getAll();
      }
      const mappings = await this.getSchoolMappings();
      return mappings.filter((m) => m.groupId === groupId).map((m) => m.schoolId);
    } catch (error) {
      console.error("Failed to get schools in group:", error);
      return [];
    }
  },

  async removeSchoolFromAllGroups(schoolId: string): Promise<void> {
    try {
      const mappings = await this.getSchoolMappings();
      const filtered = mappings.filter((m) => m.schoolId !== schoolId);
      await AsyncStorage.setItem(KEYS.SCHOOL_GROUPS, JSON.stringify(filtered));
    } catch (error) {
      console.error("Failed to remove school from groups:", error);
    }
  },
};

/**
 * 通知功能
 */
export const NotificationsStorage = {
  async getAll(): Promise<Notification[]> {
    try {
      const data = await AsyncStorage.getItem(KEYS.NOTIFICATIONS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Failed to load notifications:", error);
      return [];
    }
  },

  async add(notification: Omit<Notification, "id" | "createdAt" | "isRead">): Promise<Notification> {
    try {
      const notifications = await this.getAll();
      const newNotification: Notification = {
        ...notification,
        id: `notif_${Date.now()}`,
        isRead: false,
        createdAt: new Date().toISOString(),
      };
      notifications.push(newNotification);
      await AsyncStorage.setItem(KEYS.NOTIFICATIONS, JSON.stringify(notifications));
      return newNotification;
    } catch (error) {
      console.error("Failed to add notification:", error);
      throw error;
    }
  },

  async markAsRead(notificationId: string): Promise<void> {
    try {
      const notifications = await this.getAll();
      const index = notifications.findIndex((n) => n.id === notificationId);
      if (index !== -1) {
        notifications[index].isRead = true;
        await AsyncStorage.setItem(KEYS.NOTIFICATIONS, JSON.stringify(notifications));
      }
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  },

  async markAllAsRead(): Promise<void> {
    try {
      const notifications = await this.getAll();
      notifications.forEach((n) => (n.isRead = true));
      await AsyncStorage.setItem(KEYS.NOTIFICATIONS, JSON.stringify(notifications));
    } catch (error) {
      console.error("Failed to mark all notifications as read:", error);
    }
  },

  async delete(notificationId: string): Promise<void> {
    try {
      const notifications = await this.getAll();
      const filtered = notifications.filter((n) => n.id !== notificationId);
      await AsyncStorage.setItem(KEYS.NOTIFICATIONS, JSON.stringify(filtered));
    } catch (error) {
      console.error("Failed to delete notification:", error);
    }
  },

  async getUnreadCount(): Promise<number> {
    const notifications = await this.getAll();
    return notifications.filter((n) => !n.isRead).length;
  },

  async getSettings(): Promise<NotificationSettings> {
    try {
      const data = await AsyncStorage.getItem(KEYS.NOTIFICATION_SETTINGS);
      if (data) {
        return JSON.parse(data);
      }
      const defaultSettings: NotificationSettings = {
        enabled: true,
        remind7Days: true,
        remind3Days: true,
        remind1Day: true,
      };
      await AsyncStorage.setItem(KEYS.NOTIFICATION_SETTINGS, JSON.stringify(defaultSettings));
      return defaultSettings;
    } catch (error) {
      console.error("Failed to load notification settings:", error);
      return {
        enabled: true,
        remind7Days: true,
        remind3Days: true,
        remind1Day: true,
      };
    }
  },

  async updateSettings(settings: Partial<NotificationSettings>): Promise<void> {
    try {
      const currentSettings = await this.getSettings();
      const newSettings = { ...currentSettings, ...settings };
      await AsyncStorage.setItem(KEYS.NOTIFICATION_SETTINGS, JSON.stringify(newSettings));
    } catch (error) {
      console.error("Failed to update notification settings:", error);
    }
  },
};

/**
 * 評論功能
 */
export const ReviewsStorage = {
  async getAll(): Promise<Review[]> {
    try {
      const data = await AsyncStorage.getItem(KEYS.REVIEWS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Failed to load reviews:", error);
      return [];
    }
  },

  async getBySchool(schoolId: string): Promise<Review[]> {
    const reviews = await this.getAll();
    return reviews.filter((r) => r.schoolId === schoolId);
  },

  async add(review: Omit<Review, "id" | "createdAt" | "likes" | "isLiked">): Promise<Review> {
    try {
      const reviews = await this.getAll();
      const newReview: Review = {
        ...review,
        id: `review_${Date.now()}`,
        likes: 0,
        isLiked: false,
        createdAt: new Date().toISOString(),
      };
      reviews.push(newReview);
      await AsyncStorage.setItem(KEYS.REVIEWS, JSON.stringify(reviews));
      return newReview;
    } catch (error) {
      console.error("Failed to add review:", error);
      throw error;
    }
  },

  async toggleLike(reviewId: string): Promise<void> {
    try {
      const reviews = await this.getAll();
      const index = reviews.findIndex((r) => r.id === reviewId);
      if (index !== -1) {
        reviews[index].isLiked = !reviews[index].isLiked;
        reviews[index].likes += reviews[index].isLiked ? 1 : -1;
        await AsyncStorage.setItem(KEYS.REVIEWS, JSON.stringify(reviews));
      }
    } catch (error) {
      console.error("Failed to toggle like:", error);
    }
  },

  async delete(reviewId: string): Promise<void> {
    try {
      const reviews = await this.getAll();
      const filtered = reviews.filter((r) => r.id !== reviewId);
      await AsyncStorage.setItem(KEYS.REVIEWS, JSON.stringify(filtered));
    } catch (error) {
      console.error("Failed to delete review:", error);
    }
  },

  async getAverageRating(schoolId: string): Promise<number> {
    const reviews = await this.getBySchool(schoolId);
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return Math.round((sum / reviews.length) * 10) / 10;
  },
};

/**
 * 對比功能（最多 3 所學校）
 */
export const CompareStorage = {
  async getAll(): Promise<string[]> {
    try {
      const data = await AsyncStorage.getItem(KEYS.COMPARE);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Failed to load compare list:", error);
      return [];
    }
  },

  async add(schoolId: string): Promise<boolean> {
    try {
      const compareList = await this.getAll();
      if (compareList.length >= 3) {
        return false; // 已達上限
      }
      if (!compareList.includes(schoolId)) {
        compareList.push(schoolId);
        await AsyncStorage.setItem(KEYS.COMPARE, JSON.stringify(compareList));
      }
      return true;
    } catch (error) {
      console.error("Failed to add to compare:", error);
      return false;
    }
  },

  async remove(schoolId: string): Promise<void> {
    try {
      const compareList = await this.getAll();
      const filtered = compareList.filter((id) => id !== schoolId);
      await AsyncStorage.setItem(KEYS.COMPARE, JSON.stringify(filtered));
    } catch (error) {
      console.error("Failed to remove from compare:", error);
    }
  },

  async clear(): Promise<void> {
    try {
      await AsyncStorage.setItem(KEYS.COMPARE, JSON.stringify([]));
    } catch (error) {
      console.error("Failed to clear compare list:", error);
    }
  },

  async isInCompare(schoolId: string): Promise<boolean> {
    const compareList = await this.getAll();
    return compareList.includes(schoolId);
  },
};

/**
 * 滑卡進度（每日限制）
 */
export const SwipeStorage = {
  async getCount(): Promise<number> {
    try {
      const today = new Date().toDateString();
      const savedDate = await AsyncStorage.getItem(KEYS.SWIPE_DATE);

      // 如果日期不同，重置計數
      if (savedDate !== today) {
        await AsyncStorage.setItem(KEYS.SWIPE_DATE, today);
        await AsyncStorage.setItem(KEYS.SWIPE_COUNT, "0");
        return 0;
      }

      const count = await AsyncStorage.getItem(KEYS.SWIPE_COUNT);
      return count ? parseInt(count, 10) : 0;
    } catch (error) {
      console.error("Failed to get swipe count:", error);
      return 0;
    }
  },

  async increment(): Promise<number> {
    try {
      const count = await this.getCount();
      const newCount = count + 1;
      await AsyncStorage.setItem(KEYS.SWIPE_COUNT, newCount.toString());
      return newCount;
    } catch (error) {
      console.error("Failed to increment swipe count:", error);
      const currentCount = await this.getCount();
      return currentCount;
    }
  },

  async getRemainingCount(limit: number = 30): Promise<number> {
    const count = await this.getCount();
    return Math.max(0, limit - count);
  },
};

/**
 * Map 來源類型
 */
export type MapSource = "filters" | "qa" | "favorites";

/**
 * Map 顯示集合類型
 */
export interface MapSet {
  source: MapSource;
  schoolIds: string[];
  updatedAt: string | null;
}

/**
 * Map 學校集合存儲
 * 用於管理 Map 頁面顯示的學校來源
 */
export const MapSetStorage = {
  /**
   * 保存篩選結果
   */
  async saveFiltersResult(schoolIds: string[]): Promise<void> {
    try {
      await AsyncStorage.setItem(KEYS.MAP_FILTERS_IDS, JSON.stringify(schoolIds));
      await AsyncStorage.setItem(KEYS.MAP_FILTERS_UPDATED, new Date().toISOString());
    } catch (error) {
      console.error("Failed to save filters result:", error);
    }
  },

  /**
   * 獲取篩選結果
   */
  async getFiltersResult(): Promise<{ ids: string[]; updatedAt: string | null }> {
    try {
      const ids = await AsyncStorage.getItem(KEYS.MAP_FILTERS_IDS);
      const updatedAt = await AsyncStorage.getItem(KEYS.MAP_FILTERS_UPDATED);
      return {
        ids: ids ? JSON.parse(ids) : [],
        updatedAt: updatedAt || null,
      };
    } catch (error) {
      console.error("Failed to get filters result:", error);
      return { ids: [], updatedAt: null };
    }
  },

  /**
   * 保存 Q&A 結果
   */
  async saveQAResult(schoolIds: string[]): Promise<void> {
    try {
      await AsyncStorage.setItem(KEYS.MAP_QA_IDS, JSON.stringify(schoolIds));
      await AsyncStorage.setItem(KEYS.MAP_QA_UPDATED, new Date().toISOString());
    } catch (error) {
      console.error("Failed to save QA result:", error);
    }
  },

  /**
   * 獲取 Q&A 結果
   */
  async getQAResult(): Promise<{ ids: string[]; updatedAt: string | null }> {
    try {
      const ids = await AsyncStorage.getItem(KEYS.MAP_QA_IDS);
      const updatedAt = await AsyncStorage.getItem(KEYS.MAP_QA_UPDATED);
      return {
        ids: ids ? JSON.parse(ids) : [],
        updatedAt: updatedAt || null,
      };
    } catch (error) {
      console.error("Failed to get QA result:", error);
      return { ids: [], updatedAt: null };
    }
  },

  /**
   * 保存用戶選擇的 Map 來源
   */
  async saveMapSource(source: MapSource): Promise<void> {
    try {
      await AsyncStorage.setItem(KEYS.MAP_SOURCE, source);
    } catch (error) {
      console.error("Failed to save map source:", error);
    }
  },

  /**
   * 獲取用戶選擇的 Map 來源
   */
  async getMapSource(): Promise<MapSource | null> {
    try {
      const source = await AsyncStorage.getItem(KEYS.MAP_SOURCE);
      return source as MapSource | null;
    } catch (error) {
      console.error("Failed to get map source:", error);
      return null;
    }
  },

  /**
   * 按優先順序獲取當前應顯示的學校集合
   * 優先順序: 用戶選擇的來源 > 最近篩選 > Q&A 結果 > 收藏
   */
  async getCurrentSet(): Promise<MapSet | null> {
    try {
      const savedSource = await this.getMapSource();
      const filtersResult = await this.getFiltersResult();
      const qaResult = await this.getQAResult();
      const favorites = await FavoritesStorage.getAll();

      // 檢查用戶之前選擇的來源是否仍有效
      if (savedSource) {
        if (savedSource === "filters" && filtersResult.ids.length > 0) {
          return { source: "filters", schoolIds: filtersResult.ids, updatedAt: filtersResult.updatedAt };
        }
        if (savedSource === "qa" && qaResult.ids.length > 0) {
          return { source: "qa", schoolIds: qaResult.ids, updatedAt: qaResult.updatedAt };
        }
        if (savedSource === "favorites" && favorites.length > 0) {
          return { source: "favorites", schoolIds: favorites, updatedAt: null };
        }
      }

      // 按優先順序選擇
      if (filtersResult.ids.length > 0) {
        return { source: "filters", schoolIds: filtersResult.ids, updatedAt: filtersResult.updatedAt };
      }
      if (qaResult.ids.length > 0) {
        return { source: "qa", schoolIds: qaResult.ids, updatedAt: qaResult.updatedAt };
      }
      if (favorites.length > 0) {
        return { source: "favorites", schoolIds: favorites, updatedAt: null };
      }

      return null;
    } catch (error) {
      console.error("Failed to get current map set:", error);
      return null;
    }
  },

  /**
   * 獲取所有可用的來源（有數據的）
   */
  async getAvailableSources(): Promise<MapSource[]> {
    try {
      const sources: MapSource[] = [];
      const filtersResult = await this.getFiltersResult();
      const qaResult = await this.getQAResult();
      const favorites = await FavoritesStorage.getAll();

      if (filtersResult.ids.length > 0) sources.push("filters");
      if (qaResult.ids.length > 0) sources.push("qa");
      if (favorites.length > 0) sources.push("favorites");

      return sources;
    } catch (error) {
      console.error("Failed to get available sources:", error);
      return [];
    }
  },
};
