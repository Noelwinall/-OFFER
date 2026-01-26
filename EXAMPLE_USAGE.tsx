/**
 * 🎨 Educational Background - 使用示例
 * 
 * 这个文件展示了如何在你的 App 中使用新的 Ivy League 背景
 */

import { EducationalBackground } from "@/components/educational-background";
import { View, Text, ScrollView } from "react-native";
import { SchoolCard } from "@/components/school-card";

// ========================================
// 示例 1: 在 Search 屏幕中使用
// ========================================
export function SearchScreenExample() {
  return (
    <EducationalBackground pattern="geometric">
      {/* 替换掉原来的 LinearGradient */}
      <ScrollView>
        <View style={{ padding: 16 }}>
          {/* 搜索框 */}
          <TextInput placeholder="搜索学校..." />
          
          {/* 学校卡片列表 */}
          <SchoolCard school={...} />
          <SchoolCard school={...} />
        </View>
      </ScrollView>
    </EducationalBackground>
  );
}

// ========================================
// 示例 2: 在 Favorites 屏幕中使用
// ========================================
export function FavoritesScreenExample() {
  return (
    <EducationalBackground pattern="geometric">
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>
          我的收藏
        </Text>
        <FlatList
          data={favoriteSchools}
          renderItem={({ item }) => <SchoolCard school={item} />}
        />
      </View>
    </EducationalBackground>
  );
}

// ========================================
// 示例 3: 在全局 Layout 中使用（推荐）
// ========================================
// 在 app/(tabs)/_layout.tsx 中
export function TabLayoutExample() {
  return (
    <EducationalBackground pattern="geometric">
      <Tabs>
        <Tabs.Screen name="index" />
        <Tabs.Screen name="search" />
        <Tabs.Screen name="favorites" />
      </Tabs>
    </EducationalBackground>
  );
}

// ========================================
// 示例 4: 切换不同的背景图案
// ========================================
export function PatternSwitchExample() {
  const [pattern, setPattern] = useState<"geometric" | "dots" | "books">("geometric");

  return (
    <EducationalBackground pattern={pattern}>
      <View>
        <Text>当前图案: {pattern}</Text>
        
        {/* 图案切换按钮（可选，给用户选择权） */}
        <View style={{ flexDirection: "row", gap: 8 }}>
          <Button title="几何" onPress={() => setPattern("geometric")} />
          <Button title="点阵" onPress={() => setPattern("dots")} />
          <Button title="书本" onPress={() => setPattern("books")} />
        </View>
        
        {/* 你的内容 */}
        <SchoolCard ... />
      </View>
    </EducationalBackground>
  );
}

// ========================================
// 示例 5: 在特定区域使用（局部背景）
// ========================================
export function PartialBackgroundExample() {
  return (
    <View style={{ flex: 1, backgroundColor: "#FAF8F5" }}>
      {/* 顶部区域使用普通背景 */}
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 28 }}>有Offer</Text>
      </View>
      
      {/* 只在学校列表区域使用教育背景 */}
      <EducationalBackground pattern="geometric">
        <ScrollView>
          <SchoolCard ... />
          <SchoolCard ... />
        </ScrollView>
      </EducationalBackground>
    </View>
  );
}

// ========================================
// 💡 最佳实践建议
// ========================================
/*
1. **推荐方案**：在全局 Layout 中使用 (示例 3)
   - 优点：一次配置，全站生效
   - 优点：保持一致的视觉体验
   
2. **如果需要不同屏幕用不同图案**：
   - Search 页面: "geometric" (现代感)
   - Favorites 页面: "books" (温馨感)
   - Settings 页面: "minimal" (专业感)

3. **图案选择建议**：
   - 从 "geometric" 开始（最安全的选择）
   - 如果用户反馈太花，切换到 "dots"
   - 如果想强化教育品牌，用 "books" 或 "campus"

4. **性能考虑**：
   - SVG 图案是矢量的，性能很好
   - 如果担心性能，使用 "dots" 或 "minimal"（最简单）

5. **Dark Mode**：
   - 所有图案自动支持 Dark Mode
   - 无需额外配置
*/

// ========================================
// 🔧 如何从现有代码迁移
// ========================================
/*
BEFORE (使用 LinearGradient):
```tsx
<LinearGradient colors={["#0F1629", "#1A1F3A"]} style={{ flex: 1 }}>
  <ScrollView>
    <SchoolCard ... />
  </ScrollView>
</LinearGradient>
```

AFTER (使用 EducationalBackground):
```tsx
<EducationalBackground pattern="geometric">
  <ScrollView>
    <SchoolCard ... />
  </ScrollView>
</EducationalBackground>
```

就这么简单！✨
*/
