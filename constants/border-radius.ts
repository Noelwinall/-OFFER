/**
 * Border Radius System - 圆角系统常量
 * 统一管理所有圆角值，确保视觉一致性
 */

export const BorderRadius = {
  xs: 4,      // 极小圆角（标签、小图标）
  sm: 6,      // 小圆角（标签、小按钮）
  md: 12,     // 中圆角（按钮、输入框）
  lg: 16,     // 大圆角（卡片、面板）
  xl: 20,     // 特大圆角（大卡片）
  "2xl": 24,  // 超大圆角（特殊卡片）
  full: 9999, // 完全圆角（药丸按钮）
} as const;

/**
 * 预设圆角组合
 */
export const BorderRadiusPresets = {
  // 标签圆角
  tag: BorderRadius.sm,        // 6px
  tagLarge: BorderRadius.md,   // 12px
  
  // 按钮圆角
  button: BorderRadius.md,    // 12px
  buttonLarge: BorderRadius.lg, // 16px
  buttonPill: BorderRadius.full, // 完全圆角
  
  // 卡片圆角
  card: BorderRadius.lg,       // 16px
  cardLarge: BorderRadius.xl,  // 20px
  cardExtra: BorderRadius["2xl"], // 24px
  
  // 输入框圆角
  input: BorderRadius.md,      // 12px
  inputLarge: BorderRadius.lg, // 16px
  
  // 模态框圆角
  modal: BorderRadius.xl,     // 20px
  modalLarge: BorderRadius["2xl"], // 24px
} as const;
