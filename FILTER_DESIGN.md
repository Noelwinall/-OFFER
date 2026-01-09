# HK Edu App - 進階篩選功能設計文件

## 1. 設計概述

進階篩選功能旨在幫助家長透過多維度條件精準找到合適的學校，同時保持 UI 簡潔、不過度複雜。篩選面板採用 **Bottom Sheet（底部滑出面板）** 設計，符合 iOS HIG 規範，提供沉浸式的篩選體驗。

---

## 2. 篩選維度與交互設計

### 2.1 篩選維度清單

| 維度 | 類型 | 選項 | 預設值 | 說明 |
|------|------|------|--------|------|
| **學費範圍** | 雙向滑桿 | 0 - 500,000 HKD | 不限 | 家長可拖動滑桿選擇預算範圍 |
| **課程體系** | 多選框 | IB、DSE、國際課程、本地課程 | 不限 | 支援多選，家長可同時選擇多個課程 |
| **教學語言** | 單選框 | 英文為主、中文為主、雙語 | 不限 | 只能選一個，影響學校環境 |
| **學校類型** | 多選框 | 國際、資助、直資、私立、公立 | 不限 | 支援多選，可同時篩選多種類型 |
| **地區** | 多選框 | 港島、九龍、新界 | 不限 | 支援多選 |

---

## 3. UI 設計規範

### 3.1 篩選面板佈局

```
┌─────────────────────────────────────┐
│  ▬ 篩選                  ✕          │  ← 標題 + 關閉按鈕
├─────────────────────────────────────┤
│                                     │
│  📊 學費範圍                         │  ← 分類標題
│  ┌─────────────────────────────────┐│
│  │ ◄─────●─────────────────► 500k  ││  ← 雙向滑桿
│  │ 0 HKD              250k HKD      ││
│  └─────────────────────────────────┘│
│                                     │
│  🎓 課程體系                         │  ← 分類標題
│  ☑ IB 課程                          │  ← 多選框（已選）
│  ☐ DSE 課程                         │  ← 多選框（未選）
│  ☐ 國際課程                         │
│  ☐ 本地課程                         │
│                                     │
│  🌐 教學語言                         │  ← 分類標題
│  ◉ 英文為主                         │  ← 單選框（已選）
│  ○ 中文為主                         │
│  ○ 雙語環境                         │
│                                     │
│  🏫 學校類型                         │  ← 分類標題
│  ☑ 國際學校                         │
│  ☐ 資助學校                         │
│  ☐ 直資學校                         │
│  ☐ 私立學校                         │
│  ☐ 公立學校                         │
│                                     │
│  📍 地區                            │  ← 分類標題
│  ☐ 港島                            │
│  ☑ 九龍                            │
│  ☐ 新界                            │
│                                     │
├─────────────────────────────────────┤
│  [重置篩選]          [套用篩選]     │  ← 底部按鈕
└─────────────────────────────────────┘
```

### 3.2 色彩與排版規範

- **背景色**：`bg-background`（白色/深色自動適應）
- **分類標題**：`text-foreground` + `font-semibold` + `text-base`
- **選項文字**：`text-foreground` + `text-sm`
- **已選狀態**：`text-primary`（#0a7ea4）
- **未選狀態**：`text-muted`（#687076）
- **邊距**：`px-6 py-4`（與搜尋框保持一致）
- **分隔線**：`border-b border-border`

### 3.3 互動反饋

| 操作 | 反饋 | 實現 |
|------|------|------|
| 點擊篩選選項 | 視覺變化 + 觸覺反饋 | 勾選框狀態改變 + `Haptics.impactAsync(Light)` |
| 拖動滑桿 | 實時數值更新 | 顯示當前選中的範圍 |
| 點擊「套用篩選」 | 頁面重新加載結果 | 關閉面板 + 篩選結果更新 |
| 點擊「重置篩選」 | 所有選項恢復預設 | 清空所有篩選條件 |

---

## 4. 與搜尋功能的整合方式

### 4.1 搜尋頁面架構

```
搜尋頁面 (SearchScreen.tsx)
├── 搜尋框區域
│   ├── 文字輸入框
│   ├── 清空按鈕
│   └── 🎛️ 篩選按鈕 ← 新增
├── 活躍篩選標籤 ← 新增
│   └── 顯示已套用的篩選條件
├── 學校列表
│   └── FlatList（搜尋 + 篩選結果）
└── 底部 Bottom Sheet（篩選面板）
    └── FilterSheet 組件
```

### 4.2 數據流

```
用戶操作
    ↓
搜尋框 + 篩選按鈕
    ↓
FilterSheet 組件（狀態管理）
    ↓
FilterContext（全局篩選狀態）
    ↓
搜尋頁面重新篩選列表
    ↓
FlatList 更新顯示結果
```

### 4.3 篩選邏輯優先級

1. **文字搜尋**（高優先級）：先按名稱/地區/類型進行文字匹配
2. **進階篩選**（中優先級）：再按學費、課程、語言進行篩選
3. **排序**（低優先級）：最後按相關度排序

**實現方式**：

```typescript
// 偽代碼
const results = SCHOOLS
  .filter(school => matchesSearchQuery(school, searchQuery))  // 文字搜尋
  .filter(school => matchesAdvancedFilters(school, filters))  // 進階篩選
  .sort((a, b) => calculateRelevance(a, b, filters));         // 排序
```

---

## 5. 活躍篩選標籤設計

在搜尋框下方顯示已套用的篩選條件，方便家長一眼了解當前篩選狀態。

### 5.1 標籤樣式

```
搜尋框
┌──────────────────────────────────────┐
│ 🔍 搜尋學校名稱...        [✕]        │
└──────────────────────────────────────┘

活躍篩選標籤（可水平滾動）
┌──────────────────────────────────────┐
│ 學費: 0-50k ✕  IB課程 ✕  英文為主 ✕  │
└──────────────────────────────────────┘

篩選按鈕
┌──────────────────────────────────────┐
│ [🎛️ 進階篩選]  [重置全部]            │
└──────────────────────────────────────┘
```

### 5.2 標籤交互

- **點擊標籤上的 ✕**：移除該篩選條件
- **點擊「重置全部」**：清空所有篩選與搜尋
- **點擊「進階篩選」**：打開篩選面板

---

## 6. 技術實現方案

### 6.1 新增組件清單

| 組件名 | 功能 | 位置 |
|--------|------|------|
| `FilterSheet.tsx` | 篩選面板主體 | `components/` |
| `RangeSlider.tsx` | 學費範圍滑桿 | `components/ui/` |
| `CheckboxGroup.tsx` | 多選框組 | `components/ui/` |
| `RadioGroup.tsx` | 單選框組 | `components/ui/` |
| `ActiveFilterTags.tsx` | 活躍篩選標籤 | `components/` |
| `FilterContext.tsx` | 篩選狀態管理 | `lib/` |

### 6.2 狀態管理方案

使用 **React Context + useReducer** 管理篩選狀態：

```typescript
// FilterContext.tsx
interface FilterState {
  tuitionRange: { min: number; max: number } | null;
  curriculum: string[];
  language: string | null;
  category: string[];
  district: string[];
}

type FilterAction = 
  | { type: 'SET_TUITION_RANGE'; payload: { min: number; max: number } }
  | { type: 'TOGGLE_CURRICULUM'; payload: string }
  | { type: 'SET_LANGUAGE'; payload: string }
  | { type: 'TOGGLE_CATEGORY'; payload: string }
  | { type: 'TOGGLE_DISTRICT'; payload: string }
  | { type: 'RESET_FILTERS' };

export const FilterContext = createContext<{
  state: FilterState;
  dispatch: Dispatch<FilterAction>;
}>(...);
```

### 6.3 搜尋頁面整合

```typescript
// app/(tabs)/search.tsx
export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilterSheet, setShowFilterSheet] = useState(false);
  const { state: filters } = useContext(FilterContext);
  
  const filteredSchools = useMemo(() => {
    return SCHOOLS
      .filter(school => matchesSearchQuery(school, searchQuery))
      .filter(school => matchesAdvancedFilters(school, filters))
      .sort((a, b) => calculateRelevance(a, b, filters));
  }, [searchQuery, filters]);

  return (
    <ScreenContainer>
      {/* 搜尋框 */}
      <SearchBar 
        value={searchQuery}
        onChangeText={setSearchQuery}
        onFilterPress={() => setShowFilterSheet(true)}
      />
      
      {/* 活躍篩選標籤 */}
      <ActiveFilterTags filters={filters} />
      
      {/* 學校列表 */}
      <FlatList data={filteredSchools} ... />
      
      {/* 篩選面板 */}
      <FilterSheet 
        visible={showFilterSheet}
        onClose={() => setShowFilterSheet(false)}
      />
    </ScreenContainer>
  );
}
```

---

## 7. 使用者流程

### 7.1 典型場景：家長尋找港島地區、英文為主、學費 50k 以下的國際學校

1. 打開搜尋頁面
2. 點擊「進階篩選」按鈕 → 篩選面板打開
3. 調整學費滑桿至 0-50,000
4. 選擇「英文為主」
5. 勾選「國際學校」
6. 勾選「港島」
7. 點擊「套用篩選」
8. 面板關閉，頁面顯示符合條件的學校
9. 活躍篩選標籤顯示：「學費: 0-50k ✕ 英文為主 ✕ 國際學校 ✕ 港島 ✕」

### 7.2 移除單個篩選條件

- 點擊活躍篩選標籤上的 ✕ → 該條件被移除 → 列表重新篩選

### 7.3 重置所有篩選

- 點擊「重置全部」按鈕 → 所有篩選條件清空 → 顯示全部學校

---

## 8. 響應式設計考量

### 8.1 手機豎屏（9:16）

- Bottom Sheet 高度：屏幕的 80%
- 滑桿寬度：全寬 - 邊距
- 選項行高：48px（易於點擊）

### 8.2 手機橫屏（16:9）

- Bottom Sheet 高度：屏幕的 90%
- 可考慮並排顯示篩選選項（2 列）

### 8.3 平板（iPad）

- Bottom Sheet 改為 Modal 對話框（寬度 500px）
- 居中顯示

---

## 9. 無障礙設計

- 所有交互元素都有 `accessibilityLabel`
- 滑桿提供 `accessibilityHint`（當前值）
- 勾選框支援鍵盤導航
- 高對比度文字（WCAG AA 標準）

---

## 10. 性能優化

- **記憶化篩選結果**：使用 `useMemo` 避免不必要的重新計算
- **虛擬化列表**：使用 `FlatList` 的 `windowSize` 優化大列表渲染
- **防抖搜尋**：搜尋框輸入時使用 300ms 防抖
- **懶加載篩選面板**：只在用戶點擊時才初始化

---

## 11. 後續擴展空間

1. **保存篩選預設**：家長可保存常用的篩選組合
2. **篩選建議**：根據家長行為推薦篩選條件
3. **篩選歷史**：記錄最近使用的篩選條件
4. **高級篩選**：新增「入學年份」、「招生狀態」等條件
5. **篩選分享**：家長可分享篩選結果給其他家長

---

## 12. 設計檢查清單

- [ ] 篩選面板在 iOS 和 Android 上都能正常顯示
- [ ] 滑桿拖動流暢，無卡頓
- [ ] 多選/單選框響應迅速
- [ ] 活躍篩選標籤可水平滾動
- [ ] 「重置篩選」和「套用篩選」按鈕清晰可點擊
- [ ] 篩選結果實時更新
- [ ] 深色模式下顏色對比度足夠
- [ ] 所有交互都有觸覺反饋（Haptics）
- [ ] 篩選面板可通過向下滑動關閉
- [ ] 無篩選結果時顯示友好提示
