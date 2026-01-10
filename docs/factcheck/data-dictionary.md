# Data Dictionary

> 字段核验口径表
> 版本：v1 clean
> 依据：BOSS.md v1

---

## 字段定义与核验规则

### 基础信息

| 字段 | 类型 | 定义 | 来源 | 判断规则 |
|------|------|------|------|----------|
| `id` | string | 学校唯一标识 | 系统生成 | 格式 `sch_XXXXX`，全局唯一 |
| `name` | string | 中文校名 | 学校官网 / EDB | 与官方注册名一致 |
| `nameEn` | string | 英文校名 | 学校官网 / EDB | 与官方英文名一致 |
| `searchKeywords` | string[] | 搜索关键字 | 常用简称 | 包含 ESF、YCIS 等常用缩写 |

### 分类信息

| 字段 | 类型 | 定义 | 来源 | 判断规则 |
|------|------|------|------|----------|
| `category` | enum | 学校类型 | EDB | 國際 / 資助 / 直資 / 私立 / 公立 |
| `district` | enum | 地区 | 地址推导 | 港島 / 九龍 / 新界 |
| `level` | enum | 学段 | 学校官网 / EDB | 幼稚園 / 小學 / 中學 |

### 学费信息（强制 Evidence）

| 字段 | 类型 | 定义 | 来源 | 判断规则 |
|------|------|------|------|----------|
| `tuitionMin` | number | 学费下限 (HKD/年) | 学校官网收费页 | 必须有 Evidence 三件套 |
| `tuitionMax` | number | 学费上限 (HKD/年) | 学校官网收费页 | 必须有 Evidence 三件套 |

**特殊语义**：
- `0 + 0` 且 `category` 为 公立/資助 → 显示"免學費（政府資助）"
- `0 + 0` 且其他类型 → 显示"待確認"

### 课程与语言

| 字段 | 类型 | 定义 | 来源 | 判断规则 |
|------|------|------|------|----------|
| `curriculum` | enum[] | 课程体系 | 学校官网 | IB / DSE / IGCSE / A-Level / AP 等 |
| `language` | enum | 教学语言 | 学校官网 | 全英文 / 中英雙語 / 以中文為主 |

### 联系信息

| 字段 | 类型 | 定义 | 来源 | 判断规则 |
|------|------|------|------|----------|
| `address` | string | 中文地址 | 学校官网 | 完整可定位地址 |
| `phone` | string | 电话 | 学校官网 | 8位香港电话 |
| `website` | string | 官网 URL | 学校官网 | https:// 开头，可访问 |
| `applicationLink` | string | 申请页 URL | 学校官网 | 指向申请/招生页面 |

### 地理信息

| 字段 | 类型 | 定义 | 来源 | 判断规则 |
|------|------|------|------|----------|
| `latitude` | number | 纬度 | Geocoding | 22.1 - 22.6 (香港范围) |
| `longitude` | number | 经度 | Geocoding | 113.8 - 114.5 (香港范围) |

### 其他

| 字段 | 类型 | 定义 | 来源 | 判断规则 |
|------|------|------|------|----------|
| `highlights` | string[] | 亮点 (2-3条) | 学校官网 | 客观可验证描述 |
| `applicationMaterials` | string[] | 申请材料 | 学校官网 | 官方要求清单 |

---

## 升学衔接模块（articulation）

> 按 BOSS.md 第四条定义，强制 Evidence

### 升学衔接分类 (type)

| 值 | 定义 | 示例 |
|----|------|------|
| `EDB_THROUGH_TRAIN` | 教育局官方一条龙 | 拔萃男書院附屬小學 → 拔萃男書院 |
| `ALL_THROUGH_SCHOOL` | 同校/同体系一贯制 | 弘立書院 K-12 |
| `SCHOOL_NETWORK_CONTINUITY` | 校网/集团内升学 | ESF 体系内 |
| `AFFILIATED_PRIORITY` | 附属/联校升学优先 | 聖保羅男女附屬小學 |
| `NONE` | 无升学衔接 | - |
| `UNKNOWN` | 未知/待确认 | - |

### 升学保证力度 (guarantee)

| 值 | 定义 |
|----|------|
| `GUARANTEED` | 明确保证 (automatic progression) |
| `CONDITIONAL` | 需成绩/操行/面试 |
| `SUBJECT_TO_AVAILABILITY` | 视名额 |
| `NOT_STATED` | 文件未说明 |

### Evidence 要求

```yaml
articulation:
  type: "EDB_THROUGH_TRAIN"
  guarantee: "GUARANTEED"
  linkedSchoolIds: ["sch_00123"]
  evidence:
    sourceUrl: "https://..."
    capturedAt: "2026-01-10"
    confidence: "HIGH"
```

---

## Evidence Confidence 定义

| 级别 | 定义 | 来源示例 |
|------|------|----------|
| `HIGH` | 官方一手来源，明确表述 | 学校官网收费表、EDB 学校搜索 |
| `MEDIUM` | 官方来源但表述模糊，或需推断 | 官网有提及但无具体数字 |
| `LOW` | 非官方来源或已过期 | 新闻报道、往年数据 |

---

## 核验优先来源

### Tier 1（最优先）
- 学校官方网站
- 教育局学校搜索 (https://www.edb.gov.hk/tc/sch-admin/)

### Tier 2（辅助）
- 政府公报
- 学校年报

### 禁止
- 论坛 (EK Forum, Baby Kingdom)
- 第三方汇总站
- 无来源资料

---

*字典版本：v1 clean*
*依据：BOSS.md v1*
