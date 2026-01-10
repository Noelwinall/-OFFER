# Data Dictionary - HK Edu App

> 本文件定义每个字段的核验口径、可接受值、常见错误、优先来源。
> 根据 BOSS.md v1 规范制定。

---

## 1. 架构对比：预期 vs 实际

### 1.1 TypeScript 接口定义 (`types/school.ts`)

```typescript
interface School {
  id: string;
  name: string;
  nameEn: string;
  searchKeywords: string[];
  category: "國際" | "資助" | "直資" | "私立" | "公立";
  district: "港島" | "九龍" | "新界";
  level: "幼稚園" | "小學" | "中學";
  tuitionMin: number;
  tuitionMax: number;
  curriculum: Curriculum[];
  language: "全英文" | "中英雙語" | "以中文為主";
  highlights: string[];
  address: string;
  phone: string;
  website: string;
  applicationMaterials: string[];
  applicationLink: string;
  latitude: number;
  longitude: number;
}
```

### 1.2 实际数据结构 (`data/schools.ts`)

```typescript
// 实际数据中的字段（与接口不一致）
{
  id: string;
  name: string;
  nameEn: string;
  type: string;           // ❌ 接口中是 category
  level: string;
  district: string;       // 18区细分，非 港島/九龍/新界
  region: string;         // ❌ 接口中无此字段
  address: string;
  addressEn: string;      // ❌ 接口中无此字段
  tuition: number;        // ❌ 接口中是 tuitionMin/tuitionMax
  curriculum: string;     // ❌ 接口中是数组
  language: string;
  gender: string;         // ❌ 接口中无此字段
  religion: string;       // ❌ 接口中无此字段
  fundingType: string;    // ❌ 接口中无此字段
  website: string;
  applicationLink: string;
  phone: string;
  latitude: number;
  longitude: number;
  searchKeywords: string[];
  features: string[];     // ❌ 接口中是 highlights
}
```

### 1.3 架构不一致摘要

| 接口字段 | 实际字段 | 状态 |
|----------|----------|------|
| `category` | `type` + `fundingType` | **MISMATCH** |
| `district` (港島/九龍/新界) | `district` (18区) + `region` | **MISMATCH** |
| `tuitionMin` / `tuitionMax` | `tuition` (单一数值) | **MISMATCH** |
| `curriculum[]` | `curriculum` (单一字符串) | **MISMATCH** |
| `highlights[]` | `features[]` | **RENAME** |
| `applicationMaterials[]` | *(缺失)* | **MISSING** |
| *(无)* | `addressEn` | **EXTRA** |
| *(无)* | `gender` | **EXTRA** |
| *(无)* | `religion` | **EXTRA** |

---

## 2. 字段核验口径

### 2.1 `id`

| 属性 | 值 |
|------|-----|
| **格式** | `sch_XXXXX`（5位数字，零填充） |
| **唯一性** | 必须全局唯一 |
| **可接受值** | 正则：`^sch_\d{5}$` |
| **常见错误** | 重复 ID、格式不规范 |
| **优先来源** | 系统生成，无需外部验证 |
| **核验难度** | LOW（自动化） |

### 2.2 `name`

| 属性 | 值 |
|------|-----|
| **格式** | 中文学校全称 |
| **可接受值** | 非空字符串，应与教育局/学校官网一致 |
| **常见错误** | 名称拼写错误、使用非官方名称、合成名称 |
| **优先来源** | 1. 学校官网 2. 教育局学校搜索 |
| **核验难度** | MEDIUM |
| **当前状态** | ⚠️ **CRITICAL**: 大量合成名称如 "XX國際XX區幼稚園（第N校）" |

### 2.3 `nameEn`

| 属性 | 值 |
|------|-----|
| **格式** | 英文学校全称 |
| **可接受值** | 非空字符串，应与官方英文名一致 |
| **常见错误** | 拼写错误、直译而非官方名称 |
| **优先来源** | 1. 学校官网 2. 教育局学校搜索 |
| **核验难度** | MEDIUM |

### 2.4 `searchKeywords`

| 属性 | 值 |
|------|-----|
| **格式** | 字符串数组 |
| **可接受值** | 常用简称、别名（如 ESF、YCIS、DBS） |
| **常见错误** | 遗漏常用简称、包含无关关键词 |
| **优先来源** | 学校官网、家长常用称呼 |
| **核验难度** | LOW |

### 2.5 `category` / `type` / `fundingType`

| 属性 | 值 |
|------|-----|
| **接口定义** | `"國際" \| "資助" \| "直資" \| "私立" \| "公立"` |
| **实际数据** | `type`: "國際學校" 等；`fundingType`: "私立" 等 |
| **可接受值** | 必须符合教育局官方分类 |
| **常见错误** | 分类错误、混淆直资与资助 |
| **优先来源** | 教育局学校搜索（权威） |
| **核验难度** | MEDIUM |
| **当前状态** | ⚠️ 架构不一致，需统一 |

### 2.6 `district` / `region`

| 属性 | 值 |
|------|-----|
| **接口定义** | `"港島" \| "九龍" \| "新界"` |
| **实际数据** | 18区细分 + region 字段 |
| **可接受值** | 必须符合香港行政区划 |
| **常见错误** | 区域错配 |
| **优先来源** | 学校地址 → 区域映射 |
| **核验难度** | LOW（可自动化） |

### 2.7 `level`

| 属性 | 值 |
|------|-----|
| **格式** | `"幼稚園" \| "小學" \| "中學"` |
| **可接受值** | 必须符合实际学段 |
| **常见错误** | 一条龙学校仅标注单一学段 |
| **优先来源** | 学校官网、教育局 |
| **核验难度** | LOW |

### 2.8 `tuitionMin` / `tuitionMax` / `tuition`

| 属性 | 值 |
|------|-----|
| **单位** | HKD / 年（按 BOSS.md 第六条） |
| **接口定义** | `tuitionMin` + `tuitionMax` |
| **实际数据** | 单一 `tuition` 字段 |
| **特殊语义** | `0 + 0` → 公立/资助显示"免學費（政府資助）"，其他显示"待確認" |
| **常见错误** | 数值不准确、缺少范围 |
| **优先来源** | 学校官网收费页面（**强制 Evidence**） |
| **核验难度** | HIGH |
| **Evidence 要求** | **必须三件套**：`sourceUrl`, `capturedAt`, `confidence` |

### 2.9 `curriculum`

| 属性 | 值 |
|------|-----|
| **接口定义** | 数组，可多选 |
| **实际数据** | 单一字符串 |
| **可接受值** | IB, DSE, IGCSE, A-Level, AP, 美式課程, 英式課程... |
| **常见错误** | 课程名称不规范、遗漏多重课程 |
| **优先来源** | 学校官网课程页面 |
| **核验难度** | MEDIUM |

### 2.10 `language`

| 属性 | 值 |
|------|-----|
| **格式** | `"全英文" \| "中英雙語" \| "以中文為主"` |
| **实际数据** | "全英文", "雙語" 等（不完全一致） |
| **可接受值** | 必须符合枚举 |
| **常见错误** | 分类模糊 |
| **优先来源** | 学校官网 |
| **核验难度** | MEDIUM |

### 2.11 `highlights` / `features`

| 属性 | 值 |
|------|-----|
| **格式** | 字符串数组，2-3 条亮点 |
| **可接受值** | 客观、可验证的特色描述 |
| **常见错误** | 主观夸大、营销语言 |
| **优先来源** | 学校官网、媒体报道 |
| **核验难度** | HIGH（主观性强） |
| **BOSS.md 约束** | 不得"为了看起来完整而假精确" |

### 2.12 `address`

| 属性 | 值 |
|------|-----|
| **格式** | 完整中文地址 |
| **可接受值** | 真实、可定位的地址 |
| **常见错误** | 地址不完整、占位符地址 |
| **优先来源** | 学校官网、Google Maps |
| **核验难度** | LOW |
| **当前状态** | ⚠️ **CRITICAL**: 全部为假地址（"某街道XX號"） |

### 2.13 `phone`

| 属性 | 值 |
|------|-----|
| **格式** | 8位香港电话号码 |
| **可接受值** | 正则：`^\d{8}$` 或带区号格式 |
| **常见错误** | 格式不规范、号码无效 |
| **优先来源** | 学校官网 |
| **核验难度** | LOW（格式可自动化，有效性需人工） |

### 2.14 `website`

| 属性 | 值 |
|------|-----|
| **格式** | 完整 URL（https://） |
| **可接受值** | 可访问的真实学校官网 |
| **常见错误** | URL 无效、指向错误网站、占位符 URL |
| **优先来源** | 教育局学校搜索、Google |
| **核验难度** | LOW（可自动化检测） |
| **当前状态** | ⚠️ **CRITICAL**: 全部为占位符（school1.edu.hk 等） |

### 2.15 `applicationLink`

| 属性 | 值 |
|------|-----|
| **格式** | 完整 URL |
| **可接受值** | 指向学校申请页面的有效链接 |
| **常见错误** | 链接失效、指向首页而非申请页 |
| **优先来源** | 学校官网 |
| **核验难度** | MEDIUM |
| **当前状态** | ⚠️ **CRITICAL**: 全部为占位符 |

### 2.16 `applicationMaterials`

| 属性 | 值 |
|------|-----|
| **格式** | 字符串数组 |
| **可接受值** | 申请所需材料清单 |
| **当前状态** | ⚠️ 实际数据中**缺失此字段** |
| **核验难度** | HIGH |

### 2.17 `latitude` / `longitude`

| 属性 | 值 |
|------|-----|
| **格式** | 浮点数 |
| **可接受值** | 香港范围：lat 22.1-22.6, lng 113.8-114.5 |
| **常见错误** | 坐标与地址不匹配、精度不足 |
| **优先来源** | Google Maps Geocoding |
| **核验难度** | LOW（可自动化） |
| **当前状态** | ⚠️ 需验证是否与地址匹配 |

---

## 3. 新增字段（BOSS.md 第四条：升学衔接）

### 3.1 `articulation` 模块（待新增）

根据 BOSS.md v1 第四条，需新增升学衔接字段：

```typescript
interface ArticulationInfo {
  // 升学衔接分类
  type:
    | "EDB_THROUGH_TRAIN"      // 教育局官方一条龙
    | "ALL_THROUGH_SCHOOL"     // 同校/同体系一贯制
    | "SCHOOL_NETWORK_CONTINUITY"  // 校网/集团内升学
    | "AFFILIATED_PRIORITY"    // 附属/联校升学优先
    | "NONE"
    | "UNKNOWN";

  // 升学保证力度
  guarantee:
    | "GUARANTEED"             // 明确保证
    | "CONDITIONAL"            // 需成绩/操行/面试
    | "SUBJECT_TO_AVAILABILITY" // 视名额
    | "NOT_STATED";            // 文件未说明

  // 衔接学校（如适用）
  linkedSchoolIds?: string[];

  // Evidence（强制三件套）
  evidence: {
    sourceUrl: string;
    capturedAt: string;        // ISO 8601 日期
    confidence: "HIGH" | "MEDIUM" | "LOW";
  };
}
```

**当前状态**: ⚠️ 实际数据中**完全缺失此模块**

---

## 4. Evidence 要求

### 4.1 强制 Evidence 字段（按 BOSS.md）

| 字段 | Evidence 要求 |
|------|---------------|
| `tuitionMin` / `tuitionMax` | **必须**：sourceUrl + capturedAt + confidence |
| `articulation` | **必须**：sourceUrl + capturedAt + confidence |

### 4.2 其他字段

- 不强制 Evidence 三件套
- 但必须以"可核验来源"为依据
- 优先来源：学校官网 > 教育局页面
- 禁止使用：论坛、第三方汇总站（仅作线索）

---

## 5. 核验状态枚举

| 状态 | 含义 |
|------|------|
| `PASS` | 字段值正确，有可靠来源 |
| `FAIL` | 字段值明确错误 |
| `UNKNOWN` | 无法从权威来源验证 |
| `NEED_REVIEW` | 需人工审核确认 |

---

## 6. 风险分级

| 风险等级 | 含义 | 处理方式 |
|----------|------|----------|
| `AUTO-FIX` | 低风险，客观可核验 | 可自动修正 |
| `NEED-APPROVAL` | 高风险，主观/争议 | 需老板确认 |

### AUTO-FIX 适用场景

- 无效链接修复
- 电话格式标准化
- 地址明显错别字
- 经纬度明显不合理
- 英文名拼写错误
- category/level 明显填错且有官网/EDB 明确依据

### NEED-APPROVAL 适用场景

- tuition 数值变更
- articulation 类型与 guarantee
- language/curriculum 模糊表述
- highlights 主观描述
- 任何无明确官方依据的变更

---

*文档版本：v1.0*
*生成时间：2026-01-10*
*依据：BOSS.md v1*
