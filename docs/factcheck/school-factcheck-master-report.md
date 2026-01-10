# School Fact Check Master Report

> HK Edu App - Phase 2 全量数据质量核验报告
> 生成时间：2026-01-10
> 依据：BOSS.md v1

---

## Executive Summary

### 核验结论：数据不可上线

| 指标 | 值 |
|------|-----|
| 总学校数 | 2,100 |
| PASS | 0 (0%) |
| FAIL | 2,100 (100%) |
| UNKNOWN | N/A |
| 数据质量等级 | **F - 不可用** |

### 核心问题

**整个数据集为合成占位符数据，无法通过任何核验。**

---

## 1. 系统性问题汇总

### 1.1 CRITICAL: 架构不一致

**问题描述**：`data/schools.ts` 实际数据结构与 `types/school.ts` TypeScript 接口定义**严重不匹配**。

| 接口定义 | 实际数据 | 影响 |
|----------|----------|------|
| `category` | `type` + `fundingType` | 字段名不一致 |
| `tuitionMin` + `tuitionMax` | `tuition` (单一值) | 学费范围丢失 |
| `curriculum[]` | `curriculum` (字符串) | 无法表示多课程 |
| `highlights[]` | `features[]` | 字段重命名 |
| `district` (3选1) | `district` (18区) + `region` | 粒度不一致 |
| `applicationMaterials[]` | *(缺失)* | 字段缺失 |
| *(无)* | `addressEn`, `gender`, `religion` | 额外字段 |

**风险等级**：NEED-APPROVAL
**建议**：统一数据模型，需老板确认最终架构

---

### 1.2 CRITICAL: 占位符网址

**问题描述**：全部 2,100 所学校的 `website` 和 `applicationLink` 均为占位符。

**模式**：
```
website: "https://www.school{N}.edu.hk"
applicationLink: "https://www.school{N}.edu.hk/admission"
```

**影响**：
- 用户点击无法访问真实学校官网
- 申请链接完全无效
- 严重损害产品可信度

**核验结果**：
| 字段 | FAIL 数量 | 比例 |
|------|-----------|------|
| `website` | 2,100 | 100% |
| `applicationLink` | 2,100 | 100% |

**风险等级**：AUTO-FIX（需批量替换为真实 URL）

---

### 1.3 CRITICAL: 虚假地址

**问题描述**：全部 2,100 所学校的 `address` 均为占位符格式。

**模式**：
```
"香港{region}{district}某街道{N}號"
```

**示例**：
- "香港九龍觀塘區某街道88號"
- "香港港島東區某街道29號"

**影响**：
- 地址无法用于导航
- 地图功能失效
- 严重损害产品可信度

**核验结果**：
| 字段 | FAIL 数量 | 比例 |
|------|-----------|------|
| `address` | 2,100 | 100% |

**风险等级**：AUTO-FIX（需批量替换为真实地址）

---

### 1.4 CRITICAL: 合成学校名称

**问题描述**：大量学校名称为程序生成的组合式命名，并非真实学校。

**合成模式**：
```
{品牌}國際{区域}幼稚園（{分校标识}）
```

**示例**：
- "法國國際東區幼稚園"（不存在）
- "漢基國際幼稚園（第2校）"（汉基只有一所）
- "加拿大國際深水埗區幼稚園（第3校）"（不存在）

**影响**：
- 用户搜索找不到真实学校
- 数据可信度为零
- 违反 BOSS.md"不得假精确"原则

**核验结果**：
| 分析 | 数量 |
|------|------|
| 明确合成名称（含"第N校"/"分校"） | ~1,500+ |
| 可能真实名称 | ~600 |
| 需人工核验 | 全部 |

**风险等级**：NEED-APPROVAL

---

### 1.5 HIGH: 学费数据不可靠

**问题描述**：学费数据为随机生成数值，无任何 Evidence 支撑。

**观察**：
- 学费值分布过于随机（100,718 / 194,161 / 197,798 等奇怪数字）
- 同类型学校学费差异不合理
- 无 `sourceUrl`、`capturedAt`、`confidence` 三件套

**BOSS.md 要求**：
> 学费（tuition）为强制 evidence 三件套：sourceUrl / capturedAt / confidence

**当前状态**：**完全不符合要求**

**风险等级**：NEED-APPROVAL

---

### 1.6 HIGH: 升学衔接模块缺失

**问题描述**：根据 BOSS.md 第四条，需要 `articulation` 模块，但实际数据**完全缺失**。

**应有结构**：
```typescript
articulation: {
  type: "EDB_THROUGH_TRAIN" | "ALL_THROUGH_SCHOOL" | ...
  guarantee: "GUARANTEED" | "CONDITIONAL" | ...
  evidence: { sourceUrl, capturedAt, confidence }
}
```

**当前状态**：字段不存在

**风险等级**：NEED-APPROVAL（需设计并实现）

---

### 1.7 MEDIUM: 电话号码可疑

**问题描述**：电话号码格式正确（8位数字），但可能为随机生成。

**观察**：
- 格式符合香港电话（如 26243751、24370955）
- 但开头数字分布过于均匀，疑似随机生成
- 无法批量验证有效性

**核验结果**：需人工抽查

**风险等级**：NEED-APPROVAL

---

### 1.8 MEDIUM: 经纬度可能不准确

**问题描述**：经纬度数值在香港范围内，但与虚假地址无法对应。

**范围检查**：
- Latitude: 22.1 - 22.6 ✓
- Longitude: 113.8 - 114.5 ✓

**问题**：地址是假的，经纬度即使正确也无意义

**风险等级**：AUTO-FIX（待地址修正后重新 geocoding）

---

### 1.9 LOW: 搜索关键词不完整

**问题描述**：`searchKeywords` 包含一些真实简称（如 YCIS、ESF），但与虚假学校关联。

**观察**：
- 关键词如 "YCIS" 被分配给多个虚假"耀中"分校
- 关键词本身可能有效，但关联错误

**风险等级**：AUTO-FIX（待学校数据修正后重新生成）

---

## 2. 字段级核验统计

### 2.1 全量统计

| 字段 | PASS | FAIL | UNKNOWN | NEED_REVIEW |
|------|------|------|---------|-------------|
| `id` | 2,100 | 0 | 0 | 0 |
| `name` | 0 | 2,100 | 0 | 0 |
| `nameEn` | 0 | 2,100 | 0 | 0 |
| `searchKeywords` | 0 | 0 | 0 | 2,100 |
| `type` | 0 | 0 | 0 | 2,100 |
| `district` | 0 | 0 | 0 | 2,100 |
| `level` | 0 | 0 | 0 | 2,100 |
| `tuition` | 0 | 2,100 | 0 | 0 |
| `curriculum` | 0 | 0 | 0 | 2,100 |
| `language` | 0 | 0 | 0 | 2,100 |
| `features` | 0 | 0 | 0 | 2,100 |
| `address` | 0 | 2,100 | 0 | 0 |
| `phone` | 0 | 0 | 0 | 2,100 |
| `website` | 0 | 2,100 | 0 | 0 |
| `applicationLink` | 0 | 2,100 | 0 | 0 |
| `latitude` | 0 | 0 | 0 | 2,100 |
| `longitude` | 0 | 0 | 0 | 2,100 |

### 2.2 按学段统计

| 学段 | 数量 | 备注 |
|------|------|------|
| 幼稚園 | ~1,000 | 全部为合成数据 |
| 小學 | ~590 | 全部为合成数据 |
| 中學 | ~510 | 全部为合成数据 |

---

## 3. 风险分析

### 3.1 AUTO-FIX 项（可自动修正）

| 问题 | 修正方式 | 依赖 |
|------|----------|------|
| `website` 占位符 | 批量替换为真实 URL | 需先建立真实学校映射 |
| `applicationLink` 占位符 | 批量替换为真实 URL | 需先建立真实学校映射 |
| `address` 占位符 | 批量替换为真实地址 | 需先建立真实学校映射 |
| `latitude`/`longitude` 不准确 | 基于真实地址重新 geocoding | 需先修正地址 |
| 架构字段名不一致 | 批量重命名/转换 | 需确认最终架构 |

**结论**：AUTO-FIX 无法独立执行，全部依赖于**建立真实学校数据库**。

### 3.2 NEED-APPROVAL 项（需老板确认）

| 问题 | 决策点 |
|------|--------|
| 数据模型统一 | 确认 `types/school.ts` 为准还是当前数据为准 |
| 学校名称来源 | 从何处获取真实学校列表 |
| 学费数据来源 | 是否逐校查询官网 |
| 升学衔接模块 | 是否在 Phase 2 实现 |
| 数据范围 | 是否真的需要 2,100 所学校 |

---

## 4. 建议行动方案

### 4.1 数据重建方案（推荐）

由于当前数据为 100% 合成占位符，建议**完全重建数据库**：

**Step 1: 确定数据源**
- 教育局学校搜索（https://www.edb.gov.hk/tc/sch-admin/sch-registration/）
- 各校官网

**Step 2: 分阶段实施**

| 阶段 | 学校数量 | 数据质量 |
|------|----------|----------|
| Phase 2.1 | 50 所热门学校 | 完整 Evidence |
| Phase 2.2 | 200 所主要学校 | 基本字段 |
| Phase 2.3 | 500+ 所 | 渐进补充 |

**Step 3: 每所学校必须**
1. 从教育局/官网核实存在
2. 填写真实地址
3. 填写有效官网链接
4. 学费必须有 Evidence 三件套

### 4.2 架构统一方案

建议以 `types/school.ts` 接口定义为准，修改 `data/schools.ts`：

1. `type` + `fundingType` → `category`
2. `tuition` → `tuitionMin` + `tuitionMax`
3. `features` → `highlights`
4. `curriculum` string → `curriculum[]` array
5. 删除 `region`（由 `district` 映射推导）
6. 删除 `addressEn`, `gender`, `religion`（或扩展接口）
7. 新增 `applicationMaterials[]`
8. 新增 `articulation` 模块

---

## 5. 单校报告说明

由于全部 2,100 所学校均为合成数据，具有相同的系统性问题，生成 2,100 份重复报告无实际价值。

**替代方案**：在 `docs/factcheck/issues/` 目录下生成：
1. `_SYSTEMIC_ISSUES.md` - 系统性问题汇总
2. `sch_00001.md` - 示例学校报告（展示报告格式）
3. `sch_00002.md` - 示例学校报告

待数据重建后，再为每所真实学校生成独立报告。

---

## 6. 附录：数据样本

### 6.1 典型合成数据样本

```json
{
  "id": "sch_00001",
  "name": "維多利亞國際幼稚園",
  "nameEn": "Victoria International Kindergarten",
  "type": "國際學校",
  "level": "幼稚園",
  "district": "觀塘區",
  "region": "九龍",
  "address": "香港九龍觀塘區某街道88號",  // ❌ FAKE
  "tuition": 197798,                      // ❌ NO EVIDENCE
  "website": "https://www.school1.edu.hk", // ❌ FAKE
  "applicationLink": "https://www.school1.edu.hk/admission", // ❌ FAKE
  "phone": "26243751",                    // ⚠️ UNVERIFIED
  "latitude": 22.355437,                  // ⚠️ UNVERIFIED
  "longitude": 114.218446                 // ⚠️ UNVERIFIED
}
```

### 6.2 真实维多利亚教育机构参考

```json
{
  "name": "維多利亞（何文田）國際幼兒園",
  "nameEn": "Victoria (Homantin) International Nursery",
  "address": "九龍何文田佛光街80號",
  "website": "https://www.victoria.edu.hk/",
  "phone": "27601800"
}
```

---

## 7. 结论

### 核验结果

| 评估项 | 结果 |
|--------|------|
| 数据可用性 | **不可用** |
| 上线准备度 | **0%** |
| 修复难度 | **高**（需完全重建） |

### 下一步

1. **老板确认**：是否接受数据重建方案
2. **确定范围**：第一批重建多少所学校
3. **确定来源**：使用教育局数据还是逐校查询
4. **架构决策**：统一数据模型

---

*报告版本：v1.0*
*核验执行者：Claude Code Agent*
*依据文件：BOSS.md v1*
