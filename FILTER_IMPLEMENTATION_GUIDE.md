# HK Edu App - 進階篩選功能完整實現指南

## 目錄

1. [快速開始](#快速開始)
2. [架構概述](#架構概述)
3. [組件實現](#組件實現)
4. [狀態管理](#狀態管理)
5. [搜尋邏輯](#搜尋邏輯)
6. [整合步驟](#整合步驟)
7. [測試清單](#測試清單)
8. [常見問題](#常見問題)

---

## 快速開始

### 前置條件

```bash
# 已安裝的依賴
- React Native 0.81
- Expo SDK 54
- TypeScript 5.9
- NativeWind 4.2

# 需要安裝的依賴
pnpm add @react-native-community/slider
pnpm add expo-haptics  # 已預裝
```

### 5 分鐘快速集成

```bash
# 1. 複製篩選相關檔案到專案
cp lib/filter-context.tsx app/
cp lib/filter-logic.ts app/
cp components/filter-sheet.tsx app/
cp components/active-filter-tags.tsx app/
cp components/ui/range-slider.tsx app/
cp components/ui/checkbox-group.tsx app/
cp components/ui/radio-group.tsx app/

# 2. 在根佈局中包裝 FilterProvider
# 編輯 app/_layout.tsx

# 3. 在搜尋頁面整合篩選功能
# 編輯 app/(tabs)/search.tsx

# 4. 測試篩選功能
pnpm test
```

---

## 架構概述

### 數據流圖

```
用戶輸入 (搜尋框 + 篩選按鈕)
    ↓
FilterContext (全局狀態)
    ↓
filterSchools() + sortSearchResults() (篩選邏輯)
    ↓
FlatList (顯示結果)
    ↓
SchoolCard (學校卡片)
```

### 文件結構

```
hk-edu-app/
├── lib/
│   ├── filter-context.tsx          # 狀態管理
│   ├── filter-logic.ts             # 篩選邏輯
│   └── storage.ts                  # LocalStorage
├── components/
│   ├── filter-sheet.tsx            # 篩選面板主組件
│   ├── active-filter-tags.tsx      # 活躍篩選標籤
│   ├── school-card.tsx             # 學校卡片
│   └── ui/
│       ├── range-slider.tsx        # 學費滑桿
│       ├── checkbox-group.tsx      # 多選框
│       ├── radio-group.tsx         # 單選框
│       └── icon-symbol.tsx         # 圖標映射
├── app/
│   ├── _layout.tsx                 # 根佈局 (需更新)
│   ├── (tabs)/
│   │   ├── search.tsx              # 搜尋頁面 (需更新)
│   │   └── ...
│   └── ...
└── types/
    └── school.ts                   # 類型定義
```

---

## 組件實現

### 1. FilterContext (狀態管理)

**位置**: `lib/filter-context.tsx`

**功能**:
- 管理全局篩選狀態
- 提供 dispatch 函數修改狀態
- 導出 useFilter hook

**狀態結構**:

```typescript
interface FilterState {
  tuitionRange: { min: number; max: number } | null;
  curriculum: string[];
  language: string | null;
  category: string[];
  district: string[];
}
```

**使用方式**:

```tsx
import { useFilter } from "@/lib/filter-context";

export function MyComponent() {
  const { state, dispatch } = useFilter();
  
  // 設定學費範圍
  dispatch({
    type: "SET_TUITION_RANGE",
    payload: { min: 0, max: 50000 }
  });
  
  // 切換課程
  dispatch({
    type: "TOGGLE_CURRICULUM",
    payload: "IB"
  });
}
```

### 2. FilterSheet (篩選面板)

**位置**: `components/filter-sheet.tsx`

**Props**:

```typescript
interface FilterSheetProps {
  visible: boolean;
  onClose: () => void;
}
```

**功能**:
- Bottom Sheet 樣式的篩選面板
- 5 個篩選維度
- 「套用篩選」和「重置篩選」按鈕

**使用方式**:

```tsx
import { FilterSheet } from "@/components/filter-sheet";
import { useState } from "react";

export function SearchScreen() {
  const [showFilterSheet, setShowFilterSheet] = useState(false);
  
  return (
    <>
      <TouchableOpacity onPress={() => setShowFilterSheet(true)}>
        <Text>打開篩選</Text>
      </TouchableOpacity>
      
      <FilterSheet
        visible={showFilterSheet}
        onClose={() => setShowFilterSheet(false)}
      />
    </>
  );
}
```

### 3. ActiveFilterTags (活躍篩選標籤)

**位置**: `components/active-filter-tags.tsx`

**功能**:
- 顯示已套用的篩選條件
- 支援單項移除
- 「清空全部」功能

**使用方式**:

```tsx
import { ActiveFilterTags } from "@/components/active-filter-tags";

export function SearchScreen() {
  return (
    <>
      {/* 搜尋框 */}
      <SearchBar />
      
      {/* 活躍篩選標籤 */}
      <ActiveFilterTags />
      
      {/* 學校列表 */}
      <FlatList />
    </>
  );
}
```

### 4. RangeSlider (學費範圍滑桿)

**位置**: `components/ui/range-slider.tsx`

**Props**:

```typescript
interface RangeSliderProps {
  min: number;              // 最小值
  max: number;              // 最大值
  step?: number;            // 步長 (預設 1000)
  minValue: number;         // 當前最小值
  maxValue: number;         // 當前最大值
  onMinChange: (value: number) => void;
  onMaxChange: (value: number) => void;
  formatLabel?: (value: number) => string;
}
```

**使用方式**:

```tsx
import { RangeSlider } from "@/components/ui/range-slider";
import { useState } from "react";

export function FilterPanel() {
  const [minTuition, setMinTuition] = useState(0);
  const [maxTuition, setMaxTuition] = useState(500000);
  
  return (
    <RangeSlider
      min={0}
      max={500000}
      step={10000}
      minValue={minTuition}
      maxValue={maxTuition}
      onMinChange={setMinTuition}
      onMaxChange={setMaxTuition}
      formatLabel={(v) => `${(v / 10000).toFixed(0)}萬`}
    />
  );
}
```

### 5. CheckboxGroup (多選框)

**位置**: `components/ui/checkbox-group.tsx`

**Props**:

```typescript
interface CheckboxGroupProps {
  options: { label: string; value: string }[];
  selected: string[];
  onToggle: (value: string) => void;
  title?: string;
}
```

**使用方式**:

```tsx
import { CheckboxGroup } from "@/components/ui/checkbox-group";

export function FilterPanel() {
  const [selected, setSelected] = useState<string[]>([]);
  
  return (
    <CheckboxGroup
      title="🎓 課程體系"
      options={[
        { label: "IB 課程", value: "IB" },
        { label: "DSE 課程", value: "DSE" },
      ]}
      selected={selected}
      onToggle={(value) => {
        setSelected(prev =>
          prev.includes(value)
            ? prev.filter(v => v !== value)
            : [...prev, value]
        );
      }}
    />
  );
}
```

### 6. RadioGroup (單選框)

**位置**: `components/ui/radio-group.tsx`

**Props**:

```typescript
interface RadioGroupProps {
  options: { label: string; value: string }[];
  selected: string | null;
  onSelect: (value: string) => void;
  title?: string;
}
```

**使用方式**:

```tsx
import { RadioGroup } from "@/components/ui/radio-group";

export function FilterPanel() {
  const [selected, setSelected] = useState<string | null>(null);
  
  return (
    <RadioGroup
      title="🌐 教學語言"
      options={[
        { label: "英文為主", value: "英文為主" },
        { label: "中文為主", value: "中文為主" },
      ]}
      selected={selected}
      onSelect={setSelected}
    />
  );
}
```

---

## 狀態管理

### FilterContext 詳解

**初始狀態**:

```typescript
const initialState: FilterState = {
  tuitionRange: null,
  curriculum: [],
  language: null,
  category: [],
  district: [],
};
```

**Action 類型**:

| Action | Payload | 說明 |
|--------|---------|------|
| `SET_TUITION_RANGE` | `{ min, max }` | 設定學費範圍 |
| `CLEAR_TUITION_RANGE` | - | 清除學費範圍 |
| `TOGGLE_CURRICULUM` | `string` | 切換課程 |
| `SET_LANGUAGE` | `string` | 設定教學語言 |
| `CLEAR_LANGUAGE` | - | 清除教學語言 |
| `TOGGLE_CATEGORY` | `string` | 切換學校類型 |
| `TOGGLE_DISTRICT` | `string` | 切換地區 |
| `RESET_FILTERS` | - | 重置所有篩選 |

**Reducer 邏輯**:

```typescript
function filterReducer(state: FilterState, action: FilterAction): FilterState {
  switch (action.type) {
    case "SET_TUITION_RANGE":
      return { ...state, tuitionRange: action.payload };
    
    case "TOGGLE_CURRICULUM":
      return {
        ...state,
        curriculum: state.curriculum.includes(action.payload)
          ? state.curriculum.filter(c => c !== action.payload)
          : [...state.curriculum, action.payload]
      };
    
    // ... 其他 cases
    
    case "RESET_FILTERS":
      return initialState;
  }
}
```

---

## 搜尋邏輯

### filterSchools 函數

**位置**: `lib/filter-logic.ts`

**功能**: 結合文字搜尋和進階篩選

```typescript
export function filterSchools(
  schools: School[],
  searchQuery: string,
  filters: FilterState
): School[] {
  return schools.filter((school) => {
    // 文字搜尋
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        school.name.toLowerCase().includes(query) ||
        school.district.toLowerCase().includes(query) ||
        school.category.toLowerCase().includes(query);
      if (!matchesSearch) return false;
    }

    // 進階篩選
    return matchesAdvancedFilters(school, filters);
  });
}
```

### matchesAdvancedFilters 函數

```typescript
export function matchesAdvancedFilters(
  school: School,
  filters: FilterState
): boolean {
  // 學費篩選
  if (filters.tuitionRange) {
    const { min, max } = filters.tuitionRange;
    const hasOverlap = school.tuitionMin <= max && school.tuitionMax >= min;
    if (!hasOverlap) return false;
  }

  // 課程篩選
  if (filters.curriculum.length > 0) {
    const hasMatchingCurriculum = filters.curriculum.some(c =>
      school.curriculum.includes(c)
    );
    if (!hasMatchingCurriculum) return false;
  }

  // 教學語言篩選
  if (filters.language && school.language !== filters.language) {
    return false;
  }

  // 學校類型篩選
  if (filters.category.length > 0) {
    if (!filters.category.includes(school.category)) return false;
  }

  // 地區篩選
  if (filters.district.length > 0) {
    if (!filters.district.includes(school.district)) return false;
  }

  return true;
}
```

### sortSearchResults 函數

```typescript
export function sortSearchResults(
  schools: School[],
  searchQuery: string,
  filters: FilterState
): School[] {
  return [...schools].sort((a, b) => {
    const scoreA = calculateSearchRelevance(a, searchQuery, filters);
    const scoreB = calculateSearchRelevance(b, searchQuery, filters);
    return scoreB - scoreA;
  });
}
```

---

## 整合步驟

### 步驟 1: 在根佈局中包裝 FilterProvider

**編輯**: `app/_layout.tsx`

```tsx
import { FilterProvider } from "@/lib/filter-context";
import { ThemeProvider } from "@/lib/theme-provider";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <FilterProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="(tabs)" />
          {/* ... 其他屏幕 */}
        </Stack>
      </FilterProvider>
    </ThemeProvider>
  );
}
```

### 步驟 2: 更新搜尋頁面

**編輯**: `app/(tabs)/search.tsx`

```tsx
import { useState, useEffect, useMemo, useContext } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, Platform } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { SchoolCard } from "@/components/school-card";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { FilterSheet } from "@/components/filter-sheet";
import { ActiveFilterTags } from "@/components/active-filter-tags";
import { useRouter } from "expo-router";
import { SCHOOLS } from "@/data/schools";
import { FavoritesStorage } from "@/lib/storage";
import { FilterContext } from "@/lib/filter-context";
import { filterSchools, sortSearchResults } from "@/lib/filter-logic";
import type { School } from "@/types/school";
import * as Haptics from "expo-haptics";
import { useColors } from "@/hooks/use-colors";

export default function SearchScreen() {
  const router = useRouter();
  const colors = useColors();
  const filterContext = useContext(FilterContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilterSheet, setShowFilterSheet] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  if (!filterContext) {
    throw new Error("SearchScreen must be used within FilterProvider");
  }

  const { state: filters } = filterContext;

  useEffect(() => {
    loadFavorites();
  }, []);

  // 使用 useMemo 優化篩選邏輯
  const filteredSchools = useMemo(() => {
    const results = filterSchools(SCHOOLS, searchQuery, filters);
    return sortSearchResults(results, searchQuery, filters);
  }, [searchQuery, filters]);

  const loadFavorites = async () => {
    const favs = await FavoritesStorage.getAll();
    setFavorites(favs);
  };

  const handleFavoriteToggle = async (schoolId: string) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    await FavoritesStorage.toggle(schoolId);
    await loadFavorites();
  };

  const handleSchoolPress = (schoolId: string) => {
    router.push(`/school/${schoolId}`);
  };

  const handleOpenFilterSheet = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setShowFilterSheet(true);
  };

  return (
    <ScreenContainer edges={["top", "left", "right"]}>
      <View className="flex-1">
        {/* 搜尋框 */}
        <View className="px-6 py-4 border-b border-border">
          <View className="flex-row items-center bg-surface rounded-xl px-4 py-3 border border-border gap-2">
            <IconSymbol name="magnifyingglass" size={20} color={colors.muted} />
            <TextInput
              className="flex-1 text-foreground"
              placeholder="搜尋學校名稱、地區或類型"
              placeholderTextColor={colors.muted}
              value={searchQuery}
              onChangeText={setSearchQuery}
              returnKeyType="search"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <IconSymbol name="xmark" size={18} color={colors.muted} />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={handleOpenFilterSheet}
              className="pl-2 border-l border-border"
              hitSlop={8}
            >
              <IconSymbol name="slider.horizontal.3" size={20} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* 活躍篩選標籤 */}
        <ActiveFilterTags />

        {/* 結果統計 */}
        <View className="px-6 py-3">
          <Text className="text-sm text-muted">
            找到 {filteredSchools.length} 所學校
          </Text>
        </View>

        {/* 學校列表 */}
        <FlatList
          data={filteredSchools}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <SchoolCard
              school={item}
              isFavorite={favorites.includes(item.id)}
              onPress={() => handleSchoolPress(item.id)}
              onFavoritePress={() => handleFavoriteToggle(item.id)}
            />
          )}
          contentContainerStyle={{ paddingVertical: 8 }}
          ListEmptyComponent={
            <View className="items-center justify-center py-20">
              <Text className="text-muted text-center">沒有找到符合條件的學校</Text>
            </View>
          }
        />

        {/* 篩選面板 */}
        <FilterSheet visible={showFilterSheet} onClose={() => setShowFilterSheet(false)} />

        {/* 免責聲明 */}
        <View className="px-6 py-3 border-t border-border">
          <Text className="text-xs text-muted text-center">
            資訊基於公開資料整理，僅供參考，以學校官方為準
          </Text>
        </View>
      </View>
    </ScreenContainer>
  );
}
```

### 步驟 3: 更新圖標映射

**編輯**: `components/ui/icon-symbol.tsx`

```typescript
const MAPPING = {
  "house.fill": "home",
  "paperplane.fill": "send",
  "chevron.left.forwardslash.chevron.right": "code",
  "chevron.right": "chevron-right",
  "heart.fill": "favorite",
  "magnifyingglass": "search",
  "xmark": "close",
  "slider.horizontal.3": "tune",
  "checkmark": "check",
  "star.fill": "star",
  // 新增圖標
} as IconMapping;
```

---

## 測試清單

### 功能測試

- [ ] 篩選面板正常打開/關閉
- [ ] 學費滑桿可正常拖動
- [ ] 多選框可正常勾選/取消
- [ ] 單選框只能選一個
- [ ] 「套用篩選」按鈕正常工作
- [ ] 「重置篩選」按鈕清空所有條件
- [ ] 活躍篩選標籤正確顯示
- [ ] 單項標籤移除功能正常
- [ ] 「清空全部」按鈕工作正常
- [ ] 搜尋結果正確篩選
- [ ] 搜尋結果按相關度排序

### UI/UX 測試

- [ ] 篩選面板在淺色模式下顯示正確
- [ ] 篩選面板在深色模式下顯示正確
- [ ] 所有文字大小符合規範
- [ ] 所有顏色對比度符合 WCAG 標準
- [ ] 所有交互元素有觸覺反饋
- [ ] 按鈕按下有視覺反饋
- [ ] 滑桿拖動流暢無卡頓
- [ ] 活躍標籤可水平滾動

### 性能測試

- [ ] 篩選 1000+ 學校時無卡頓
- [ ] 搜尋結果實時更新（< 100ms）
- [ ] 篩選面板打開動畫流暢
- [ ] 記憶體使用正常

### 無障礙測試

- [ ] 所有交互元素有 accessibilityLabel
- [ ] 屏幕閱讀器可正確讀取
- [ ] 鍵盤導航工作正常
- [ ] 文字對比度符合標準

### 跨平台測試

- [ ] iOS 上正常工作
- [ ] Android 上正常工作
- [ ] Web 上正常工作
- [ ] 豎屏顯示正確
- [ ] 橫屏顯示正確

---

## 常見問題

### Q1: 如何自訂篩選條件？

**A**: 編輯 `components/filter-sheet.tsx` 中的常數：

```typescript
const CURRICULUM_OPTIONS = [
  { label: "IB 課程", value: "IB" },
  { label: "DSE 課程", value: "DSE" },
  // 新增選項
];
```

### Q2: 如何改變滑桿的最小/最大值？

**A**: 編輯 `components/filter-sheet.tsx` 中的常數：

```typescript
const TUITION_MIN = 0;
const TUITION_MAX = 500000;  // 改為你需要的值
```

### Q3: 如何保存篩選條件到 LocalStorage？

**A**: 在 `lib/filter-context.tsx` 中添加持久化邏輯：

```typescript
useEffect(() => {
  // 保存到 LocalStorage
  AsyncStorage.setItem('filters', JSON.stringify(state));
}, [state]);

// 初始化時從 LocalStorage 讀取
const [state, dispatch] = useReducer(filterReducer, initialState, (initial) => {
  const saved = AsyncStorage.getItem('filters');
  return saved ? JSON.parse(saved) : initial;
});
```

### Q4: 如何新增篩選維度？

**A**: 
1. 在 `FilterState` 中新增欄位
2. 在 `filterReducer` 中新增 action
3. 在 `FilterSheet` 中新增 UI 組件
4. 在 `matchesAdvancedFilters` 中新增篩選邏輯

### Q5: 如何改變篩選面板的高度？

**A**: 編輯 `components/filter-sheet.tsx`：

```tsx
<View
  className="flex-1 mt-auto bg-background rounded-t-3xl"
  style={{ maxHeight: "85%" }}  // 改為你需要的百分比
>
```

### Q6: 如何禁用某個篩選選項？

**A**: 在 `CheckboxGroup` 或 `RadioGroup` 中添加 disabled 狀態：

```tsx
<TouchableOpacity
  disabled={isDisabled}
  onPress={() => handleToggle(value)}
  style={{ opacity: isDisabled ? 0.5 : 1 }}
>
```

### Q7: 如何新增篩選預設值？

**A**: 編輯 `lib/filter-context.tsx`：

```typescript
const initialState: FilterState = {
  tuitionRange: { min: 0, max: 100000 },  // 預設值
  curriculum: ["IB"],                     // 預設選中 IB
  language: "英文為主",                   // 預設選中英文
  category: [],
  district: [],
};
```

---

## 性能優化建議

### 1. 使用 useMemo 避免不必要的重新計算

```tsx
const filteredSchools = useMemo(() => {
  return filterSchools(SCHOOLS, searchQuery, filters);
}, [searchQuery, filters]);
```

### 2. 使用 useCallback 避免函數重新建立

```tsx
const handleToggle = useCallback((value: string) => {
  dispatch({ type: "TOGGLE_CURRICULUM", payload: value });
}, []);
```

### 3. 虛擬化長列表

```tsx
<FlatList
  data={filteredSchools}
  windowSize={10}
  maxToRenderPerBatch={10}
  updateCellsBatchingPeriod={50}
/>
```

### 4. 防抖搜尋輸入

```tsx
const [searchQuery, setSearchQuery] = useState("");
const [debouncedQuery, setDebouncedQuery] = useState("");

useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedQuery(searchQuery);
  }, 300);
  
  return () => clearTimeout(timer);
}, [searchQuery]);
```

---

## 部署檢查清單

- [ ] 所有 TypeScript 錯誤已解決
- [ ] 所有依賴已安裝
- [ ] 所有測試已通過
- [ ] 代碼已格式化
- [ ] 代碼已 lint 檢查
- [ ] 無控制台警告
- [ ] 無控制台錯誤
- [ ] 深色模式已測試
- [ ] 響應式設計已測試
- [ ] 無障礙性已測試

---

## 後續改進方向

1. **保存篩選預設**：允許用戶保存常用的篩選組合
2. **篩選建議**：根據用戶行為推薦篩選條件
3. **篩選歷史**：記錄最近使用的篩選條件
4. **高級篩選**：新增「入學年份」、「招生狀態」等條件
5. **篩選分享**：用戶可分享篩選結果給其他用戶
6. **篩選分析**：統計最受歡迎的篩選組合

---

## 支援與反饋

如有任何問題或建議，請提交 Issue 或聯絡開發團隊。

**最後更新**: 2026-01-09
**版本**: 1.0.0
