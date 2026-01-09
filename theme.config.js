/** @type {const} */
const themeColors = {
  // 主色調：深藍漸變背景
  primary: { light: '#00D9FF', dark: '#00D9FF' },
  background: { light: '#ffffff', dark: '#0F1629' },
  surface: { light: '#f5f5f5', dark: '#1A1F3A' },
  
  // 文字色：清晰對比
  foreground: { light: '#11181C', dark: '#FFFFFF' },
  muted: { light: '#687076', dark: '#D1D5DB' },
  
  // 邊框與分隔線
  border: { light: '#E5E7EB', dark: '#2D3548' },
  
  // 狀態色
  success: { light: '#22C55E', dark: '#4ADE80' },
  warning: { light: '#F59E0B', dark: '#FBBF24' },
  error: { light: '#EF4444', dark: '#F87171' },
  
  // 新增：次要強調色
  secondary: { light: '#6B5B95', dark: '#6B5B95' },
  accent: { light: '#E8756F', dark: '#E8756F' },
  
  // 新增：玻璃態效果色
  glass: { light: 'rgba(255, 255, 255, 0.1)', dark: 'rgba(255, 255, 255, 0.05)' },
};

module.exports = { themeColors };
