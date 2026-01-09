import AsyncStorage from "@react-native-async-storage/async-storage";
import type { School } from "@/types/school";

/**
 * LocalStorage 封裝層
 * 用於管理收藏、對比、滑卡進度等本地資料
 */

const KEYS = {
  FAVORITES: "@hk_edu_app:favorites",
  COMPARE: "@hk_edu_app:compare",
  SWIPE_COUNT: "@hk_edu_app:swipe_count",
  SWIPE_DATE: "@hk_edu_app:swipe_date",
} as const;

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
