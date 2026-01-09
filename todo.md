# HK Edu App - 功能清單

## Phase 1: 設計產品架構與介面規劃
- [x] 建立 design.md 設計文件
- [x] 建立 todo.md 功能追蹤清單

## Phase 2: 建立資料庫結構與準備示範學校數據
- [x] 設計學校資料結構（TypeScript 類型定義）
- [x] 準備示範學校數據（25 所學校）
- [x] 建立資料存取層（LocalStorage 封裝）

## Phase 3: 實現統一學校卡片組件與核心 UI 體系
- [x] 建立統一學校卡片組件（SchoolCard.tsx）
- [x] 建立底部 Tab 導航（首頁、搜尋、收藏、探索）
- [x] 新增必要圖標映射（heart.fill, magnifyingglass, star.fill 等）
- [ ] 建立通用篩選面板組件（FilterSheet.tsx）
- [ ] 更新主題配色（theme.config.js）

## Phase 4: 開發問答引導模式（MVP 核心功能）
- [x] 建立問答引導流程組件（QuizFlow.tsx）
- [x] 實現問題進度條
- [x] 實現問題選項選擇邏輯
- [x] 實現「不確定」跳過功能
- [x] 建立推薦結果頁（RecommendationScreen.tsx）
- [x] 實現推薦演算法（基於規則篩選）

## Phase 5: 開發傳統檢索模式與學校詳情頁
- [x] 建立學校列表頁（SearchScreen.tsx）
- [x] 實現搜尋框功能
- [x] 實現多條件篩選功能（基本搜尋）
- [x] 建立學校詳情頁（SchoolDetailScreen.tsx）
- [x] 實現申請連結複製功能

## Phase 6: 實現收藏與對比功能
- [x] 建立收藏頁（FavoritesScreen.tsx）
- [x] 實現收藏新增/移除邏輯（LocalStorage）
- [x] 建立對比頁（CompareScreen.tsx）
- [x] 實現對比表格（最多 3 所學校）
- [ ] 實現列印/分享對比功能（略，非核心功能）

## Phase 7: 開發滑卡探索模式（最小實現）
- [x] 建立滑卡探索頁佔位符（即將推出提示）
- [ ] 實現左滑/右滑手勢（略，P2 優先級）
- [ ] 實現每日滑動次數限制（略，P2 優先級）
- [ ] 實現滑卡動畫效果（略，P2 優先級）

## Phase 8: 整合測試與優化用戶體驗
- [x] 測試所有核心用戶流程（問答引導、搜尋、收藏、對比）
- [x] 優化按鈕反饋與觸覺回饋（已整合 Haptics）
- [x] 新增免責聲明到所有頁面
- [x] 優化深色模式支援（使用 NativeWind 主題）
- [ ] 修復已知 Bug（expo-clipboard 安裝問題）

## Phase 9: 生成品牌資產並交付完整應用程式
- [x] 生成 App Logo（正方形圖標）
- [x] 更新 app.config.ts 品牌資訊
- [x] 複製 Logo 到所有必要位置
- [x] 修復 TypeScript 路由錯誤
- [x] 建立單元測試並驗證核心功能
- [x] 建立最終 Checkpoint (v5222e5c1)
- [x] 交付完整應用程式

## Phase 10: 進階篩選功能設計與實現
- [ ] 設計篩選面板 UI（Bottom Sheet 樣式）
- [ ] 實現學費範圍滑桿（RangeSlider）
- [ ] 實現多選課程體系（Checkbox Group）
- [ ] 實現教學語言單選（Radio Group）
- [ ] 實現篩選面板狀態管理（Context/useState）
- [ ] 整合篩選到搜尋頁面
- [ ] 實現「重置篩選」與「套用篩選」按鈕
- [ ] 測試篩選邏輯與 UI 互動


## Phase 11: UI 美化升級（專業活力風格）
- [x] 設計穩重活力風格配色方案
- [x] 更新主題配置（theme.config.js）
- [x] 重新設計首頁組件
- [x] 優化學校卡片設計
- [ ] 更新按鈕與交互元素
- [ ] 新增漸變與視覺效果
- [x] 測試深色模式適配
- [ ] 保存最終版本 Checkpoint

## Phase 12: 修復首頁深藍漸變背景
- [x] 強制首頁使用深藍漸變背景（使用 expo-linear-gradient）
- [x] 實現玻璃態按鈕效果
- [x] 新增推薦功能卡片
- [x] 新增頂部 Logo 區域

## Phase 13: 優化深藍漸變與高級感字體
- [x] 優化深藍漸變效果（更接近設計稿）
- [x] 使用高級感中文字體（PingFang SC）
- [x] 調整字體粗細與間距
- [x] 優化按鈕與卡片視覺效果

## Phase 14: 更換楷體字體
- [ ] 將標題字體更換為楷體
- [ ] 測試楷體在不同設備上的顯示效果

## Phase 15: 專業感字體方案推薦
- [x] 設計三種專業感字體方案
- [x] 生成字體效果預覽圖
- [x] 實現方案 1：思源宋體 - 優雅書卷氣
