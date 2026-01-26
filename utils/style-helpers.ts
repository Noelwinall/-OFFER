/**
 * Style Helpers - 样式工具函数
 * 提供常用的样式计算和工具函数
 */

/**
 * 计算颜色的亮度（用于判断文字颜色）
 * 返回 0-255 之间的值，值越大越亮
 */
function getLuminance(hex: string): number {
  // 移除 # 号
  const rgb = hex.replace("#", "");
  
  // 转换为 RGB
  const r = parseInt(rgb.substring(0, 2), 16);
  const g = parseInt(rgb.substring(2, 4), 16);
  const b = parseInt(rgb.substring(4, 6), 16);
  
  // 计算相对亮度（使用 WCAG 公式）
  const [rs, gs, bs] = [r, g, b].map((val) => {
    val = val / 255;
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });
  
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * 根据背景色返回合适的文字颜色（白色或黑色）
 * 确保文字与背景有足够的对比度
 */
export function getContrastColor(backgroundColor: string): string {
  // 处理 rgba 格式
  if (backgroundColor.startsWith("rgba")) {
    // 提取 RGB 值
    const match = backgroundColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (match) {
      const r = parseInt(match[1]);
      const g = parseInt(match[2]);
      const b = parseInt(match[3]);
      // 计算亮度
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
      return brightness > 128 ? "#000000" : "#FFFFFF";
    }
  }
  
  // 处理 hex 格式
  if (backgroundColor.startsWith("#")) {
    const luminance = getLuminance(backgroundColor);
    // 阈值 0.5，大于则用黑色，小于则用白色
    return luminance > 0.5 ? "#000000" : "#FFFFFF";
  }
  
  // 默认返回白色（安全选择）
  return "#FFFFFF";
}

/**
 * 合并样式数组，过滤掉 undefined 和 null
 */
export function combineStyles(...styles: any[]) {
  return styles.filter((style) => style != null);
}

/**
 * 创建半透明颜色
 */
export function withOpacity(color: string, opacity: number): string {
  // 处理 hex 颜色
  if (color.startsWith("#")) {
    const hex = color.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  
  // 处理 rgba 颜色
  if (color.startsWith("rgba")) {
    return color.replace(/[\d.]+\)$/g, `${opacity})`);
  }
  
  // 默认返回原色
  return color;
}
