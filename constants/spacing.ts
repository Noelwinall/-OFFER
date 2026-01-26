/**
 * Spacing System - 间距系统常量
 * 基于 8px 基准网格系统
 */

export const Spacing = {
  xs: 4,   // 极小间距（图标间距）
  sm: 8,   // 小间距（组件内部）
  md: 12,  // 中间距（标签、选项间）
  lg: 16,  // 大间距（分类间）
  xl: 24,  // 特大间距（区段间）
  "2xl": 32, // 超大间距（主要区段）
  "3xl": 48, // 极大间距（页面级间距）
} as const;

/**
 * 预设间距组合
 */
export const SpacingPresets = {
  // 卡片内边距
  cardPadding: Spacing.lg,        // 16px
  cardPaddingLarge: Spacing.xl,   // 24px
  
  // 卡片间距
  cardGap: Spacing.md,            // 12px
  cardGapLarge: Spacing.lg,       // 16px
  
  // 按钮内边距
  buttonPaddingVertical: Spacing.md,   // 12px
  buttonPaddingHorizontal: Spacing.lg, // 16px
  buttonPaddingLarge: Spacing.lg,      // 16px
  
  // 列表项间距
  listItemGap: Spacing.md,        // 12px
  listItemPadding: Spacing.lg,   // 16px
  
  // 页面边距
  pagePadding: Spacing.lg,       // 16px
  pagePaddingLarge: Spacing.xl,  // 24px
  
  // 区段间距
  sectionGap: Spacing.xl,         // 24px
  sectionGapLarge: Spacing["2xl"], // 32px
} as const;
