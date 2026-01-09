# HK Edu App - 篩選面板詳細 UI 設計規範

## 1. 色彩系統

### 1.1 主色彩調色板

| 用途 | 淺色模式 | 深色模式 | 用途說明 |
|------|---------|---------|---------|
| **Primary (主色)** | `#0a7ea4` | `#0a7ea4` | 按鈕、已選狀態、重點強調 |
| **Background (背景)** | `#ffffff` | `#151718` | 面板背景 |
| **Surface (表面)** | `#f5f5f5` | `#1e2022` | 卡片、輸入框背景 |
| **Foreground (前景)** | `#11181C` | `#ECEDEE` | 主文字 |
| **Muted (淡化)** | `#687076` | `#9BA1A6` | 次要文字、提示 |
| **Border (邊框)** | `#E5E7EB` | `#334155` | 分隔線、邊框 |
| **Success (成功)** | `#22C55E` | `#4ADE80` | 成功狀態（預留） |
| **Error (錯誤)** | `#EF4444` | `#F87171` | 錯誤狀態（預留） |

### 1.2 色彩使用規則

**淺色模式**
```
背景: #ffffff
文字: #11181C (主) / #687076 (次) / #9BA1A6 (提示)
邊框: #E5E7EB
強調: #0a7ea4
```

**深色模式**
```
背景: #151718
文字: #ECEDEE (主) / #9BA1A6 (次) / #687076 (提示)
邊框: #334155
強調: #0a7ea4 (保持不變)
```

---

## 2. 字體系統

### 2.1 字體堆棧

```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", sans-serif;
```

### 2.2 字體大小與行高規範

| 用途 | 大小 | 粗細 | 行高 | 用例 |
|------|------|------|------|------|
| **標題 (Title)** | 20px | 700 (Bold) | 28px | 「進階篩選」標題 |
| **分類標題 (Section)** | 16px | 600 (Semibold) | 24px | 「💰 學費範圍」、「🎓 課程體系」 |
| **選項文字 (Option)** | 14px | 400 (Regular) | 20px | 「IB 課程」、「英文為主」 |
| **輔助文字 (Helper)** | 12px | 400 (Regular) | 16px | 「最低預算」、「最高預算」 |
| **標籤文字 (Tag)** | 12px | 500 (Medium) | 16px | 活躍篩選標籤內文字 |
| **按鈕文字 (Button)** | 16px | 600 (Semibold) | 24px | 「套用篩選」、「重置篩選」 |

### 2.3 字體樣式示例

```
標題: 20px Bold #11181C (淺) / #ECEDEE (深)
分類標題: 16px Semibold #11181C (淺) / #ECEDEE (深)
選項文字: 14px Regular #11181C (淺) / #ECEDEE (深)
輔助文字: 12px Regular #687076 (淺) / #9BA1A6 (深)
```

---

## 3. 排版與間距系統

### 3.1 間距單位（8px 基準）

| 級別 | 像素 | 用途 |
|------|------|------|
| `xs` | 4px | 極小間距（圖標間距） |
| `sm` | 8px | 小間距（組件內部） |
| `md` | 12px | 中間距（標籤、選項間） |
| `lg` | 16px | 大間距（分類間） |
| `xl` | 24px | 特大間距（區段間） |
| `2xl` | 32px | 超大間距（主要區段） |

### 3.2 篩選面板排版規範

```
┌─────────────────────────────────────────────┐
│ Padding: 24px (lg + lg)                     │
│                                             │
│ 進階篩選                          ✕         │  ← 標題: 20px Bold
│ Padding-bottom: 16px (lg)                   │
├─────────────────────────────────────────────┤
│ Border-bottom: 1px #E5E7EB                  │
├─────────────────────────────────────────────┤
│ Padding: 16px (lg)                          │
│                                             │
│ 💰 學費範圍                                 │  ← 分類標題: 16px Semibold
│ Margin-bottom: 12px (md)                    │
│                                             │
│ ┌─────────────────────────────────────────┐ │
│ │ 0 HKD          至          500k HKD     │ │  ← 輔助文字: 12px Regular
│ │ Margin-bottom: 12px (md)                │ │
│ │                                         │ │
│ │ 最低預算                                │ │  ← 標籤: 12px Regular
│ │ ◄─────●─────────────────────────►      │ │  ← 滑桿
│ │ Margin-bottom: 16px (lg)                │ │
│ │                                         │ │
│ │ 最高預算                                │ │
│ │ ◄─────────────────────●─────────►      │ │
│ └─────────────────────────────────────────┘ │
│ Margin-bottom: 24px (xl)                    │
├─────────────────────────────────────────────┤
│ Border-bottom: 1px #E5E7EB                  │
├─────────────────────────────────────────────┤
│ Padding: 16px (lg)                          │
│                                             │
│ 🎓 課程體系                                 │  ← 分類標題: 16px Semibold
│ Margin-bottom: 12px (md)                    │
│                                             │
│ ☑ IB 課程                                   │  ← 選項: 14px Regular + 勾選框
│ Padding-vertical: 8px (sm)                  │
│                                             │
│ ☐ DSE 課程                                  │
│ Padding-vertical: 8px (sm)                  │
│                                             │
│ ☐ 國際課程                                  │
│ Padding-vertical: 8px (sm)                  │
│                                             │
│ ☐ 本地課程                                  │
│ Margin-bottom: 24px (xl)                    │
├─────────────────────────────────────────────┤
│ ... 更多分類 ...                            │
├─────────────────────────────────────────────┤
│ Padding: 16px (lg)                          │
│                                             │
│ [重置篩選]          [套用篩選]              │
│ Gap: 12px (md)                              │
│ Margin-top: 16px (lg)                       │
│                                             │
└─────────────────────────────────────────────┘
```

---

## 4. 組件設計細節

### 4.1 標題欄 (Header)

```
┌─────────────────────────────────────┐
│ 進階篩選                      ✕     │
│ 20px Bold #11181C (淺)              │
│ 20px Bold #ECEDEE (深)              │
│ Padding: 16px (lg)                  │
│ Border-bottom: 1px #E5E7EB          │
└─────────────────────────────────────┘

尺寸:
- 高度: 56px (48px 內容 + 8px 上下邊距)
- 關閉按鈕: 24x24px, 右邊距 16px
- 標題距左邊: 16px
```

### 4.2 學費範圍滑桿 (RangeSlider)

```
┌─────────────────────────────────────┐
│ 💰 學費範圍                         │  ← 分類標題
│ Margin-bottom: 12px (md)            │
│                                     │
│ 0 HKD          至          500k HKD │  ← 當前值顯示
│ 12px Regular #687076 (淺)           │
│ 12px Regular #9BA1A6 (深)           │
│ Margin-bottom: 12px (md)            │
│                                     │
│ 最低預算                            │  ← 標籤
│ 12px Regular #687076 (淺)           │
│ Margin-bottom: 8px (sm)             │
│                                     │
│ ◄─────●─────────────────────────►  │  ← 滑桿
│ 高度: 40px                          │
│ 軌道顏色: #0a7ea4 (已選)            │
│ 軌道顏色: #E5E7EB (未選)            │
│ 滑塊顏色: #0a7ea4                   │
│ 滑塊大小: 24x24px                   │
│ Margin-bottom: 16px (lg)            │
│                                     │
│ 最高預算                            │
│ 12px Regular #687076 (淺)           │
│ Margin-bottom: 8px (sm)             │
│                                     │
│ ◄─────────────────────●──────────► │
│ 同上                                │
└─────────────────────────────────────┘
```

### 4.3 多選框 (CheckboxGroup)

```
┌─────────────────────────────────────┐
│ 🎓 課程體系                         │  ← 分類標題
│ Margin-bottom: 12px (md)            │
│                                     │
│ ☑ IB 課程                           │  ← 已選
│ 14px Regular #11181C (淺)           │
│ 14px Regular #ECEDEE (深)           │
│ Padding-vertical: 8px (sm)          │
│ 勾選框: 24x24px                     │
│ 勾選框邊框: 2px #0a7ea4             │
│ 勾選框背景: #0a7ea4                 │
│ 勾選框內圖標: ✓ (16px 白色)         │
│ 間距: 12px (md)                     │
│                                     │
│ ☐ DSE 課程                          │  ← 未選
│ 14px Regular #11181C (淺)           │
│ Padding-vertical: 8px (sm)          │
│ 勾選框邊框: 2px #E5E7EB             │
│ 勾選框背景: transparent             │
│                                     │
│ ☐ 國際課程                          │
│ ☐ 本地課程                          │
│                                     │
└─────────────────────────────────────┘
```

### 4.4 單選框 (RadioGroup)

```
┌─────────────────────────────────────┐
│ 🌐 教學語言                         │  ← 分類標題
│ Margin-bottom: 12px (md)            │
│                                     │
│ ◉ 英文為主                          │  ← 已選
│ 14px Regular #11181C (淺)           │
│ Padding-vertical: 8px (sm)          │
│ 單選框: 24x24px 圓形                │
│ 單選框邊框: 2px #0a7ea4             │
│ 單選框內圓點: 12x12px #0a7ea4       │
│ 間距: 12px (md)                     │
│                                     │
│ ○ 中文為主                          │  ← 未選
│ 14px Regular #11181C (淺)           │
│ Padding-vertical: 8px (sm)          │
│ 單選框邊框: 2px #E5E7EB             │
│ 單選框內: 空                        │
│                                     │
│ ○ 雙語環境                          │
│                                     │
└─────────────────────────────────────┘
```

### 4.5 底部按鈕 (Action Buttons)

```
┌─────────────────────────────────────┐
│ Padding: 16px (lg)                  │
│ Border-top: 1px #E5E7EB             │
│                                     │
│ [重置篩選]          [套用篩選]      │
│                                     │
│ 重置篩選:                           │
│ - 背景: #f5f5f5 (淺) / #1e2022 (深) │
│ - 文字: 16px Semibold #11181C (淺)  │
│ - 文字: 16px Semibold #ECEDEE (深)  │
│ - 邊框: 1px #E5E7EB                 │
│ - 高度: 48px                        │
│ - 圓角: 12px                        │
│ - 按下: opacity 0.7                 │
│ - 寬度: 45% (flex)                  │
│                                     │
│ 套用篩選:                           │
│ - 背景: #0a7ea4                     │
│ - 文字: 16px Semibold 白色          │
│ - 高度: 48px                        │
│ - 圓角: 12px                        │
│ - 按下: opacity 0.8                 │
│ - 寬度: 45% (flex)                  │
│ - Gap: 12px (md)                    │
│                                     │
└─────────────────────────────────────┘
```

---

## 5. 活躍篩選標籤設計

### 5.1 標籤容器

```
┌─────────────────────────────────────┐
│ 活躍篩選                  清空全部  │  ← 標籤: 12px Regular #687076
│ Padding: 12px (md)                  │
│ Border-bottom: 1px #E5E7EB          │
│                                     │
│ ┌──────────┐ ┌──────────┐ ┌──────┐ │
│ │學費: 0-50k✕│IB課程 ✕  │英文為主✕│
│ └──────────┘ └──────────┘ └──────┘ │
│ 可水平滾動                          │
│                                     │
└─────────────────────────────────────┘
```

### 5.2 單個標籤樣式

```
┌──────────────────┐
│ 學費: 0-50k  ✕  │
│ 背景: #0a7ea4/10 (10% 透明度)
│ 文字: 12px Medium #0a7ea4
│ 邊框: 無
│ 圓角: 16px (pill 形)
│ 高度: 28px
│ Padding: 8px (sm) 左右
│ Gap: 8px (sm) (文字與關閉按鈕)
│ 關閉按鈕: 14px ✕ #0a7ea4
│ 邊距: 8px (sm) 右側
└──────────────────┘
```

---

## 6. 互動狀態設計

### 6.1 按鈕狀態

| 狀態 | 背景 | 文字 | 邊框 | 說明 |
|------|------|------|------|------|
| **Normal** | #f5f5f5 (淺) | #11181C | 1px #E5E7EB | 預設狀態 |
| **Pressed** | #f5f5f5 | #11181C | 1px #E5E7EB | opacity: 0.7 |
| **Disabled** | #f5f5f5 | #9BA1A6 | 1px #E5E7EB | 不可用 |

### 6.2 勾選框狀態

| 狀態 | 邊框 | 背景 | 內容 | 說明 |
|------|------|------|------|------|
| **Unchecked** | 2px #E5E7EB | transparent | 無 | 預設 |
| **Checked** | 2px #0a7ea4 | #0a7ea4 | ✓ 白色 | 已選 |
| **Pressed** | 2px #0a7ea4 | #0a7ea4 | ✓ 白色 | opacity: 0.8 |

### 6.3 單選框狀態

| 狀態 | 邊框 | 背景 | 內圓點 | 說明 |
|------|------|------|--------|------|
| **Unchecked** | 2px #E5E7EB | transparent | 無 | 預設 |
| **Checked** | 2px #0a7ea4 | transparent | 12px #0a7ea4 | 已選 |
| **Pressed** | 2px #0a7ea4 | transparent | 12px #0a7ea4 | opacity: 0.8 |

---

## 7. 深色模式對比

### 7.1 淺色模式完整示例

```
背景: #ffffff
標題: #11181C (20px Bold)
分類標題: #11181C (16px Semibold)
選項文字: #11181C (14px Regular)
輔助文字: #687076 (12px Regular)
邊框: #E5E7EB
強調色: #0a7ea4
表面: #f5f5f5
```

### 7.2 深色模式完整示例

```
背景: #151718
標題: #ECEDEE (20px Bold)
分類標題: #ECEDEE (16px Semibold)
選項文字: #ECEDEE (14px Regular)
輔助文字: #9BA1A6 (12px Regular)
邊框: #334155
強調色: #0a7ea4 (保持不變)
表面: #1e2022
```

---

## 8. 響應式設計

### 8.1 手機豎屏 (9:16)

```
寬度: 100% (全屏)
最大寬度: 無限制
Bottom Sheet 高度: 80% 屏幕高度
邊距: 24px (lg) 左右
選項行高: 48px (易於點擊)
滑桿寬度: 全寬 - 邊距
```

### 8.2 手機橫屏 (16:9)

```
寬度: 100%
Bottom Sheet 高度: 90% 屏幕高度
邊距: 24px (lg) 左右
選項可考慮並排顯示 (2 列)
```

### 8.3 平板 (iPad)

```
寬度: 500px (固定)
位置: 居中
Bottom Sheet → Modal 對話框
邊距: 32px (2xl) 左右
```

---

## 9. 無障礙設計

### 9.1 文字對比度

| 組合 | 對比度 | WCAG 等級 |
|------|--------|----------|
| #11181C on #ffffff | 12.6:1 | AAA ✓ |
| #ECEDEE on #151718 | 11.2:1 | AAA ✓ |
| #687076 on #ffffff | 4.8:1 | AA ✓ |
| #9BA1A6 on #151718 | 4.5:1 | AA ✓ |
| #0a7ea4 on #ffffff | 4.2:1 | AA ✓ |

### 9.2 交互元素最小尺寸

- 勾選框: 24x24px (推薦 44x44px 觸擊區域)
- 單選框: 24x24px (推薦 44x44px 觸擊區域)
- 按鈕: 48px 高度 (推薦最小值)
- 文字: 最小 12px

### 9.3 標籤與提示

```
accessibilityLabel: "IB 課程"
accessibilityRole: "checkbox"
accessibilityState: { checked: true }
accessibilityHint: "點擊以選擇 IB 課程"
```

---

## 10. 動畫與過渡

### 10.1 Bottom Sheet 打開動畫

```
持續時間: 300ms
緩動函數: cubic-bezier(0.4, 0, 0.2, 1)
從下方滑入: translateY(100%) → translateY(0)
背景淡入: opacity(0) → opacity(0.5)
```

### 10.2 勾選框動畫

```
持續時間: 150ms
縮放: scale(0.95) → scale(1)
顏色變化: #E5E7EB → #0a7ea4
```

### 10.3 滑桿拖動反饋

```
即時更新數值顯示
無延遲 (0ms)
觸覺反饋: Light 衝擊
```

---

## 11. 設計檢查清單

- [ ] 所有文字大小符合規範（12px-20px）
- [ ] 所有色彩符合對比度標準（WCAG AA/AAA）
- [ ] 邊距使用 8px 基準系統
- [ ] 圓角統一為 12px (按鈕) 或 16px (標籤)
- [ ] 所有交互元素最小 44x44px 觸擊區域
- [ ] 深色模式顏色正確適配
- [ ] 動畫持續時間 150-300ms
- [ ] 所有交互都有觸覺反饋
- [ ] 標籤與提示完整
- [ ] 響應式設計適配所有屏幕尺寸

---

## 12. 開發實現指南

### 12.1 Tailwind CSS 類名對應

```tsx
// 標題
className="text-xl font-bold text-foreground"

// 分類標題
className="text-base font-semibold text-foreground"

// 選項文字
className="text-sm text-foreground"

// 輔助文字
className="text-xs text-muted"

// 邊框
className="border-b border-border"

// 勾選框
className="w-6 h-6 rounded border-2 items-center justify-center"

// 按鈕
className="bg-primary py-3 rounded-xl active:opacity-80"

// 標籤
className="bg-primary/10 px-3 py-1.5 rounded-full"
```

### 12.2 顏色變數

```tsx
const colors = useColors();

// 背景
backgroundColor: colors.background

// 文字
color: colors.foreground

// 邊框
borderColor: colors.border

// 強調
color: colors.primary

// 次要
color: colors.muted
```

### 12.3 間距常數

```tsx
const SPACING = {
  xs: 4,    // 極小
  sm: 8,    // 小
  md: 12,   // 中
  lg: 16,   // 大
  xl: 24,   // 特大
  '2xl': 32 // 超大
};
```

---

## 13. 設計資源

### 13.1 圖標清單

| 圖標 | 名稱 | 用途 |
|------|------|------|
| 💰 | money | 學費範圍標題 |
| 🎓 | graduation-cap | 課程體系標題 |
| 🌐 | globe | 教學語言標題 |
| 🏫 | school | 學校類型標題 |
| 📍 | location | 地區標題 |
| ✕ | xmark | 關閉按鈕 |
| ✓ | checkmark | 勾選框 |
| ◉ | circle-fill | 單選框已選 |
| ○ | circle | 單選框未選 |
| 🎛️ | slider.horizontal.3 | 篩選按鈕 |

### 13.2 字體資源

- **系統字體**：使用系統預設字體堆棧
- **字重**：400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)
- **行高**：1.4x - 1.6x 字體大小

---

## 14. 實現優先級

### 優先級 1（必須）
- [ ] 基礎色彩系統
- [ ] 字體大小與粗細
- [ ] 邊距與間距
- [ ] 勾選框與單選框
- [ ] 底部按鈕

### 優先級 2（應該）
- [ ] 動畫與過渡
- [ ] 觸覺反饋
- [ ] 深色模式完整支援
- [ ] 無障礙標籤

### 優先級 3（可以）
- [ ] 高級動畫效果
- [ ] 自訂字體
- [ ] 響應式平板設計

---

## 15. 常見問題

**Q: 為什麼選擇 #0a7ea4 作為主色？**
A: 這是 HK Edu App 的品牌色，代表教育、信任與專業。對比度達 4.2:1，符合 WCAG AA 標準。

**Q: 深色模式下為什麼主色不變？**
A: 主色 #0a7ea4 在深色背景上對比度仍達 4.2:1，無需調整。保持一致性提升品牌識別度。

**Q: 為什麼邊距基準是 8px？**
A: 8px 是業界標準，易於計算、縮放與維護。所有間距都是 8px 的倍數。

**Q: 如何在 Web 上實現？**
A: 使用 CSS Grid/Flexbox + CSS Variables，確保顏色與間距的一致性。

**Q: 如何測試無障礙性？**
A: 使用 axe DevTools、WAVE 或 Lighthouse 進行自動化測試，並進行手動屏幕閱讀器測試。
