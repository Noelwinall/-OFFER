# School Data Mapping v0

> 字段映射规则文档
> 数据源：EDB baseline-schools.csv
> 版本：v0 (最小可用)
> 依据：BOSS.md v1

---

## 数据源

| 来源 | 文件 | 学校数 |
|------|------|--------|
| EDB School Location and Information | baseline-schools.csv | 3,510 |

---

## 字段映射表

### 1. id 生成规则

```
id = "edb_" + officialId
```

**示例**：
- officialId: `513709000123` → id: `edb_513709000123`

**说明**：
- 使用 EDB 官方 SCHOOL NO. 作为基础
- 添加 `edb_` 前缀标识数据来源
- 保证唯一性和可追溯性

---

### 2. category 映射

| EDB financeType | → | category |
|-----------------|---|----------|
| AIDED | → | 資助 |
| GOVERNMENT | → | 公立 |
| DIRECT SUBSIDY SCHEME | → | 直資 |
| PRIVATE | → | 私立 |
| PRIVATE INDEPENDENT | → | 私立 |
| ESF | → | 國際 |
| INTERNATIONAL | → | 國際 |
| *其他/空值* | → | 私立 (默认) |

**映射代码**：
```javascript
function mapCategory(financeType) {
  const map = {
    'AIDED': '資助',
    'GOVERNMENT': '公立',
    'DIRECT SUBSIDY SCHEME': '直資',
    'DSS': '直資',
    'PRIVATE': '私立',
    'PRIVATE INDEPENDENT': '私立',
    'ESF': '國際',
    'INTERNATIONAL': '國際',
  };
  return map[financeType?.toUpperCase()] || '私立';
}
```

---

### 3. district 映射

| EDB district | → | district (三大区) |
|--------------|---|-------------------|
| CENTRAL AND WESTERN | → | 港島 |
| EASTERN | → | 港島 |
| SOUTHERN | → | 港島 |
| WAN CHAI | → | 港島 |
| KOWLOON CITY | → | 九龍 |
| KWUN TONG | → | 九龍 |
| SHAM SHUI PO | → | 九龍 |
| WONG TAI SIN | → | 九龍 |
| YAU TSIM MONG | → | 九龍 |
| ISLANDS | → | 新界 |
| KWAI TSING | → | 新界 |
| NORTH | → | 新界 |
| SAI KUNG | → | 新界 |
| SHA TIN | → | 新界 |
| TAI PO | → | 新界 |
| TSUEN WAN | → | 新界 |
| TUEN MUN | → | 新界 |
| YUEN LONG | → | 新界 |
| *其他/空值* | → | 九龍 (默认) |

**映射代码**：
```javascript
function mapDistrict(district) {
  const hkIsland = ['CENTRAL AND WESTERN', 'EASTERN', 'SOUTHERN', 'WAN CHAI',
                    '中西區', '東區', '南區', '灣仔區'];
  const kowloon = ['KOWLOON CITY', 'KWUN TONG', 'SHAM SHUI PO', 'WONG TAI SIN', 'YAU TSIM MONG',
                   '九龍城區', '觀塘區', '深水埗區', '黃大仙區', '油尖旺區'];
  const nt = ['ISLANDS', 'KWAI TSING', 'NORTH', 'SAI KUNG', 'SHA TIN', 'TAI PO', 'TSUEN WAN', 'TUEN MUN', 'YUEN LONG',
              '離島區', '葵青區', '北區', '西貢區', '沙田區', '大埔區', '荃灣區', '屯門區', '元朗區'];

  const d = (district || '').toUpperCase();
  if (hkIsland.some(x => d.includes(x.toUpperCase()))) return '港島';
  if (kowloon.some(x => d.includes(x.toUpperCase()))) return '九龍';
  if (nt.some(x => d.includes(x.toUpperCase()))) return '新界';
  return '九龍'; // 默认
}
```

---

### 4. level 映射

| EDB schoolType/level | → | level |
|----------------------|---|-------|
| KINDERGARTEN | → | 幼稚園 |
| KINDERGARTEN-CUM-CHILD CARE CENTRE | → | 幼稚園 |
| PRIMARY | → | 小學 |
| SECONDARY | → | 中學 |
| *其他/空值* | → | 小學 (默认) |

**映射代码**：
```javascript
function mapLevel(level) {
  const l = (level || '').toUpperCase();
  if (l.includes('KINDERGARTEN') || l.includes('幼稚園') || l.includes('幼兒')) return '幼稚園';
  if (l.includes('PRIMARY') || l.includes('小學')) return '小學';
  if (l.includes('SECONDARY') || l.includes('中學')) return '中學';
  return '小學'; // 默认
}
```

---

### 5. searchKeywords 生成规则

**机械规则（不推断）**：

1. 中文名称（原样）
2. 英文名称（原样）
3. 中文名称分词（按常见分隔符）
4. 英文名称首字母缩写（如超过 3 个单词）

**示例**：
```
name: "聖保羅男女中學"
nameEn: "St. Paul's Co-educational College"

searchKeywords: [
  "聖保羅男女中學",
  "St. Paul's Co-educational College",
  "SPCC"  // 首字母缩写
]
```

**不生成的内容**：
- 不推断别名
- 不添加非官方缩写
- 不翻译

---

### 6. 待确认字段处理

| 字段 | v0 处理方式 | 说明 |
|------|-------------|------|
| tuitionMin | 0 | 配合 category 显示"待確認"或"免學費" |
| tuitionMax | 0 | 同上 |
| curriculum | [] | 空数组 |
| language | "以中文為主" | 本地学校默认值 |
| highlights | [] | 不生成 |
| applicationMaterials | [] | 不生成 |
| applicationLink | "" | 空字符串 |

**学费显示逻辑（已有）**：
- `0 + 0` 且 category=公立/資助 → "免學費（政府資助）"
- `0 + 0` 且其他类型 → "待確認"

---

### 7. 坐标处理

| EDB 字段 | 处理方式 |
|----------|----------|
| LATITUDE | 直接使用（度数格式） |
| LONGITUDE | 直接使用（度数格式） |
| *空值* | 设为 0 |

**注意**：EDB 数据中坐标格式可能有重复列，取第一个有效值。

---

## 字段完整映射表

| School 字段 | 来源 | 处理方式 |
|-------------|------|----------|
| id | officialId | `"edb_" + officialId` |
| name | officialNameZh | 直接使用 |
| nameEn | officialNameEn | 直接使用，缺失则空字符串 |
| searchKeywords | name + nameEn | 机械生成 |
| category | financeType | 映射表 |
| district | district | 映射表 (18区→3区) |
| level | schoolType | 映射表 |
| tuitionMin | - | 0 (待确认语义) |
| tuitionMax | - | 0 (待确认语义) |
| curriculum | - | [] (空数组) |
| language | - | "以中文為主" (默认) |
| highlights | - | [] (不生成) |
| address | addressZh | 直接使用 |
| phone | telephone | 直接使用 |
| website | website | 直接使用，N.A.→空字符串 |
| applicationMaterials | - | [] (不生成) |
| applicationLink | - | "" (空字符串) |
| latitude | latitude | 直接使用 |
| longitude | longitude | 直接使用 |

---

## 数据质量标记

v0 数据的已知限制：

| 字段 | 数据质量 | 说明 |
|------|----------|------|
| id, name, nameEn | HIGH | EDB 官方 |
| category, district, level | HIGH | EDB 官方 + 映射 |
| address, phone | HIGH | EDB 官方 |
| website | MEDIUM | EDB 可能过期 |
| latitude, longitude | HIGH | EDB 官方 |
| tuition | UNKNOWN | 未采集 |
| curriculum, language | UNKNOWN | 未采集 |
| highlights | N/A | 不生成 |
| articulation | N/A | 不生成 |

---

*文档版本：v0*
*生成时间：2026-01-10*
*依据：BOSS.md v1*
