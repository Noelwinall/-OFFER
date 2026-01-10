# Data Dictionary

> 字段定义与核验规则
> 版本：zero-inference v1
> 依据：BOSS.md v1 + types/school.ts

---

## School 模型字段

### id

| 属性 | 值 |
|------|-----|
| 定义 | 学校唯一标识符 |
| 类型 | string |
| 可接受值 | `sch_XXXXX`（5位数字） |
| 权威来源 | 系统生成 |
| 核验方法 | 正则检查 + 唯一性检查 |
| 默认状态 | PASS（自动验证） |

---

### name

| 属性 | 值 |
|------|-----|
| 定义 | 学校中文全称 |
| 类型 | string |
| 可接受值 | 教育局注册名称 |
| 权威来源 | 1. 学校官网 2. EDB 学校搜索 |
| 核验方法 | 与官方注册名比对 |
| 默认状态 | **UNKNOWN**（除非有 EDB 确认） |

---

### nameEn

| 属性 | 值 |
|------|-----|
| 定义 | 学校英文全称 |
| 类型 | string |
| 可接受值 | 官方英文名 |
| 权威来源 | 1. 学校官网 2. EDB 学校搜索 |
| 核验方法 | 与官方英文名比对 |
| 默认状态 | **UNKNOWN**（除非有官方确认） |

---

### searchKeywords

| 属性 | 值 |
|------|-----|
| 定义 | 搜索关键字（简称、别名） |
| 类型 | string[] |
| 可接受值 | 常用简称（ESF, YCIS, DBS 等） |
| 权威来源 | 学校官网、常用称呼 |
| 核验方法 | 人工确认常用性 |
| 默认状态 | PASS（辅助字段） |

---

### category

| 属性 | 值 |
|------|-----|
| 定义 | 学校类型 |
| 类型 | enum |
| 可接受值 | `國際` / `資助` / `直資` / `私立` / `公立` |
| 权威来源 | EDB 学校搜索（权威） |
| 核验方法 | 比对 EDB 分类 |
| 默认状态 | **UNKNOWN**（除非有 EDB 确认） |

---

### district

| 属性 | 值 |
|------|-----|
| 定义 | 地区（三大区） |
| 类型 | enum |
| 可接受值 | `港島` / `九龍` / `新界` |
| 权威来源 | 地址推导 |
| 核验方法 | 地址 → 区域映射 |
| 默认状态 | PASS（可从地址推导） |

---

### level

| 属性 | 值 |
|------|-----|
| 定义 | 学段 |
| 类型 | enum |
| 可接受值 | `幼稚園` / `小學` / `中學` |
| 权威来源 | 学校官网 / EDB |
| 核验方法 | 确认实际开设学段 |
| 默认状态 | **UNKNOWN**（除非有官方确认） |

---

### tuitionMin / tuitionMax

| 属性 | 值 |
|------|-----|
| 定义 | 学费下限/上限（HKD/年） |
| 类型 | number |
| 可接受值 | 0 或正整数 |
| 权威来源 | 学校官网收费页面（**强制 Evidence**） |
| 核验方法 | 截图/链接官网收费表 |
| 默认状态 | **UNKNOWN**（除非有 Evidence 三件套） |

**特殊规则**（按 BOSS.md 第六条）：
- `0 + 0` 且 category=公立/資助 → 显示"免學費（政府資助）"
- `0 + 0` 且其他类型 → 显示"待確認"

---

### curriculum

| 属性 | 值 |
|------|-----|
| 定义 | 课程体系 |
| 类型 | enum[] |
| 可接受值 | IB / DSE / IGCSE / A-Level / AP / 美式課程 / 英式課程 / 德式課程 / 澳洲課程 / 新加坡課程 / 法式課程 / 加拿大課程 / 其他 |
| 权威来源 | 学校官网课程页面 |
| 核验方法 | 确认官网列出的课程 |
| 默认状态 | **UNKNOWN**（除非官网明确列出） |

---

### language

| 属性 | 值 |
|------|-----|
| 定义 | 教学语言 |
| 类型 | enum |
| 可接受值 | `全英文` / `中英雙語` / `以中文為主` |
| 权威来源 | 学校官网 |
| 核验方法 | 确认官网描述 |
| 默认状态 | **UNKNOWN**（除非官网明确说明） |

---

### highlights

| 属性 | 值 |
|------|-----|
| 定义 | 学校亮点（2-3条） |
| 类型 | string[] |
| 可接受值 | 客观、可验证的特色 |
| 权威来源 | 学校官网 |
| 核验方法 | 人工确认客观性 |
| 默认状态 | **UNKNOWN**（主观性强，需审核） |

---

### address

| 属性 | 值 |
|------|-----|
| 定义 | 学校地址 |
| 类型 | string |
| 可接受值 | 完整中文地址 |
| 权威来源 | 学校官网 / EDB |
| 核验方法 | 比对官方地址 |
| 默认状态 | **UNKNOWN**（除非有官方确认） |

---

### phone

| 属性 | 值 |
|------|-----|
| 定义 | 学校电话 |
| 类型 | string |
| 可接受值 | 8位香港电话 |
| 权威来源 | 学校官网 |
| 核验方法 | 格式检查 + 官网比对 |
| 默认状态 | PASS（格式正确即可） |

---

### website

| 属性 | 值 |
|------|-----|
| 定义 | 学校官网 URL |
| 类型 | string |
| 可接受值 | https:// 开头，可访问 |
| 权威来源 | 学校官网 / EDB |
| 核验方法 | 可访问性检查 |
| 默认状态 | **UNKNOWN**（除非可访问） |

---

### applicationMaterials

| 属性 | 值 |
|------|-----|
| 定义 | 申请所需材料 |
| 类型 | string[] |
| 可接受值 | 官方要求的材料清单 |
| 权威来源 | 学校官网招生页面 |
| 核验方法 | 比对官网要求 |
| 默认状态 | **UNKNOWN**（除非官网明确列出） |

---

### applicationLink

| 属性 | 值 |
|------|-----|
| 定义 | 申请页面 URL |
| 类型 | string |
| 可接受值 | 指向招生/申请页面的有效链接 |
| 权威来源 | 学校官网 |
| 核验方法 | 可访问性检查 + 内容确认 |
| 默认状态 | **UNKNOWN**（除非可访问） |

---

### latitude / longitude

| 属性 | 值 |
|------|-----|
| 定义 | 地理坐标 |
| 类型 | number |
| 可接受值 | lat: 22.1-22.6, lng: 113.8-114.5 |
| 权威来源 | Geocoding（基于地址） |
| 核验方法 | 范围检查 + 地址匹配 |
| 默认状态 | PASS（地址正确则可自动生成） |

---

## 升学衔接模块 (articulation)

> 按 BOSS.md 第四条定义，强制 Evidence

### articulation.type

| 可接受值 | 定义 |
|----------|------|
| `EDB_THROUGH_TRAIN` | 教育局官方一条龙 |
| `ALL_THROUGH_SCHOOL` | 同校/同体系一贯制 |
| `SCHOOL_NETWORK_CONTINUITY` | 校网/集团内升学 |
| `AFFILIATED_PRIORITY` | 附属/联校升学优先 |
| `NONE` | 无升学衔接 |
| `UNKNOWN` | 未知/待确认 |

**默认状态**：**UNKNOWN**（除非有官方声明）

### articulation.guarantee

| 可接受值 | 定义 |
|----------|------|
| `GUARANTEED` | 明确保证 |
| `CONDITIONAL` | 需成绩/操行/面试 |
| `SUBJECT_TO_AVAILABILITY` | 视名额 |
| `NOT_STATED` | 文件未说明 |

**默认状态**：**NOT_STATED**（除非官方明确）

### articulation.evidence

必须有完整三件套：
- sourceUrl
- capturedAt
- confidence

---

## 默认状态汇总

| 字段 | 默认状态 | 原因 |
|------|----------|------|
| id | PASS | 系统生成 |
| name | UNKNOWN | 需 EDB 确认 |
| nameEn | UNKNOWN | 需官方确认 |
| searchKeywords | PASS | 辅助字段 |
| category | UNKNOWN | 需 EDB 确认 |
| district | PASS | 可从地址推导 |
| level | UNKNOWN | 需官方确认 |
| tuitionMin/Max | UNKNOWN | 需 Evidence |
| curriculum | UNKNOWN | 需官网确认 |
| language | UNKNOWN | 需官网确认 |
| highlights | UNKNOWN | 主观性强 |
| address | UNKNOWN | 需官方确认 |
| phone | PASS | 格式正确即可 |
| website | UNKNOWN | 需可访问 |
| applicationMaterials | UNKNOWN | 需官网列出 |
| applicationLink | UNKNOWN | 需可访问 |
| latitude/longitude | PASS | 可自动生成 |
| articulation | UNKNOWN | 需 Evidence |

---

*字典版本：zero-inference v1*
*依据：BOSS.md v1*
