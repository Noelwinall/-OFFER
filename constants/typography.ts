/**
 * Typography System - 字体系统常量
 * 统一管理所有字体大小、行高、字重等样式规范
 */

import { Platform } from "react-native";

export const Typography = {
  // 字体大小 (Font Sizes)
  sizes: {
    title: 20,      // 标题
    heading: 18,    // 副标题
    body: 16,       // 正文
    caption: 14,    // 说明文字
    small: 12,      // 小字
    tiny: 10,       // 极小字
  },

  // 行高 (Line Heights) - 基于字体大小的1.4-1.6倍
  lineHeights: {
    title: 28,      // 20px * 1.4
    heading: 26,    // 18px * 1.44
    body: 24,       // 16px * 1.5
    caption: 20,    // 14px * 1.43
    small: 16,      // 12px * 1.33
    tiny: 14,       // 10px * 1.4
  },

  // 字重 (Font Weights)
  weights: {
    regular: "400" as const,
    medium: "500" as const,
    semibold: "600" as const,
    bold: "700" as const,
  },

  // 字体族 (Font Families)
  families: {
    regular: "NotoSerifSC-Regular",
    bold: "NotoSerifSC-Bold",
    system: Platform.select({
      ios: "system-ui",
      default: "normal",
      web: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    }),
  },
} as const;

// 预设样式组合
export const TypographyStyles = {
  title: {
    fontSize: Typography.sizes.title,
    lineHeight: Typography.lineHeights.title,
    fontWeight: Typography.weights.bold,
    fontFamily: Typography.families.bold,
  },
  heading: {
    fontSize: Typography.sizes.heading,
    lineHeight: Typography.lineHeights.heading,
    fontWeight: Typography.weights.semibold,
    fontFamily: Typography.families.bold,
  },
  body: {
    fontSize: Typography.sizes.body,
    lineHeight: Typography.lineHeights.body,
    fontWeight: Typography.weights.regular,
    fontFamily: Typography.families.regular,
  },
  caption: {
    fontSize: Typography.sizes.caption,
    lineHeight: Typography.lineHeights.caption,
    fontWeight: Typography.weights.regular,
    fontFamily: Typography.families.regular,
  },
  small: {
    fontSize: Typography.sizes.small,
    lineHeight: Typography.lineHeights.small,
    fontWeight: Typography.weights.regular,
    fontFamily: Typography.families.regular,
  },
  tiny: {
    fontSize: Typography.sizes.tiny,
    lineHeight: Typography.lineHeights.tiny,
    fontWeight: Typography.weights.regular,
    fontFamily: Typography.families.regular,
  },
} as const;
