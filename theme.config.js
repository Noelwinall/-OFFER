/** @type {const} */
const themeColors = {
  // 🎓 Primary Color - 统一主色
  // 根据设计文档 FILTER_UI_DESIGN.md，主色为 #0a7ea4
  primary: { light: '#0a7ea4', dark: '#0a7ea4' },        // Primary Blue (统一主色)
  secondary: { light: '#D4B896', dark: '#C9A779' },      // Warm Sand/Beige
  accent: { light: '#8B7355', dark: '#9A8169' },         // Leather Brown
  
  // 背景色：優雅奶油色（不是純白）with educational pattern
  background: { light: '#FAF8F5', dark: '#1A1614' },     // Off-white Cream / Dark Brown
  surface: { light: '#FFF9F0', dark: '#2A2420' },        // Warm White / Dark Surface
  
  // 文字色：清晰對比
  foreground: { light: '#2D2013', dark: '#F5F1E8' },     // Dark Brown / Cream Text
  muted: { light: '#706B5E', dark: '#B5AFA0' },          // Muted Taupe
  
  // 邊框與分隔線
  border: { light: '#E8E2D5', dark: '#3A3630' },         // Soft Beige Border
  
  // 狀態色
  success: { light: '#4ADE80', dark: '#22C55E' },
  warning: { light: '#F59E0B', dark: '#FBBF24' },
  error: { light: '#EF4444', dark: '#F87171' },
  
  // 玻璃態效果色（用於卡片覆蓋層）
  glass: { light: 'rgba(250, 248, 245, 0.85)', dark: 'rgba(42, 36, 32, 0.85)' },
};

module.exports = { themeColors };
