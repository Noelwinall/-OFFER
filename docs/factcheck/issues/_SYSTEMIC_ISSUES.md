# Systemic Issues Report

> 本文件记录影响全部 2,100 所学校的系统性问题。
> 单校报告中不再重复列出这些问题。

---

## 影响全部学校的问题

### ISSUE-SYS-001: 架构不一致

- **严重程度**: CRITICAL
- **影响范围**: 2,100 所学校
- **状态**: NEED-APPROVAL

**描述**：
`data/schools.ts` 实际数据结构与 `types/school.ts` TypeScript 接口定义不匹配。

**具体不一致**：
| 接口 | 实际 | 类型 |
|------|------|------|
| `category` | `type` + `fundingType` | 字段名 |
| `tuitionMin/Max` | `tuition` | 结构 |
| `curriculum[]` | `curriculum` (string) | 类型 |
| `highlights[]` | `features[]` | 字段名 |
| `applicationMaterials[]` | *(缺失)* | 缺失 |

---

### ISSUE-SYS-002: 占位符网址

- **严重程度**: CRITICAL
- **影响范围**: 2,100 所学校
- **状态**: AUTO-FIX (依赖真实数据)

**模式**：
```
website: "https://www.school{N}.edu.hk"
applicationLink: "https://www.school{N}.edu.hk/admission"
```

**示例**：
- sch_00001: https://www.school1.edu.hk
- sch_00100: https://www.school100.edu.hk

---

### ISSUE-SYS-003: 占位符地址

- **严重程度**: CRITICAL
- **影响范围**: 2,100 所学校
- **状态**: AUTO-FIX (依赖真实数据)

**模式**：
```
address: "香港{region}{district}某街道{N}號"
```

**示例**：
- "香港九龍觀塘區某街道88號"
- "香港港島東區某街道29號"

---

### ISSUE-SYS-004: 合成学校名称

- **严重程度**: CRITICAL
- **影响范围**: ~1,500+ 所学校
- **状态**: NEED-APPROVAL

**合成模式**：
```
{品牌}國際{区域}幼稚園（{分校标识}）
```

**示例**：
- "漢基國際幼稚園（第2校）" - 汉基实际只有一所
- "法國國際東區幼稚園" - 不存在此学校

---

### ISSUE-SYS-005: 学费无 Evidence

- **严重程度**: HIGH
- **影响范围**: 2,100 所学校
- **状态**: NEED-APPROVAL

**BOSS.md 要求**：
学费必须有 Evidence 三件套：`sourceUrl`, `capturedAt`, `confidence`

**当前状态**：
- 学费值为随机生成数字
- 无任何 Evidence 字段

---

### ISSUE-SYS-006: 升学衔接模块缺失

- **严重程度**: HIGH
- **影响范围**: 2,100 所学校
- **状态**: NEED-APPROVAL

**BOSS.md 要求**：
必须有 `articulation` 模块，包含 `type`, `guarantee`, `evidence`

**当前状态**：
字段完全不存在

---

### ISSUE-SYS-007: 电话号码未验证

- **严重程度**: MEDIUM
- **影响范围**: 2,100 所学校
- **状态**: NEED-REVIEW

**观察**：
- 格式正确（8位数字）
- 可能为随机生成
- 无法批量验证有效性

---

### ISSUE-SYS-008: 经纬度与地址不匹配

- **严重程度**: MEDIUM
- **影响范围**: 2,100 所学校
- **状态**: AUTO-FIX (依赖地址修正)

**观察**：
- 数值在香港范围内
- 但地址为占位符，无法验证准确性

---

## 系统性问题摘要

| ID | 问题 | 严重程度 | 状态 |
|----|------|----------|------|
| SYS-001 | 架构不一致 | CRITICAL | NEED-APPROVAL |
| SYS-002 | 占位符网址 | CRITICAL | AUTO-FIX |
| SYS-003 | 占位符地址 | CRITICAL | AUTO-FIX |
| SYS-004 | 合成学校名称 | CRITICAL | NEED-APPROVAL |
| SYS-005 | 学费无 Evidence | HIGH | NEED-APPROVAL |
| SYS-006 | 升学衔接缺失 | HIGH | NEED-APPROVAL |
| SYS-007 | 电话未验证 | MEDIUM | NEED-REVIEW |
| SYS-008 | 经纬度不匹配 | MEDIUM | AUTO-FIX |

---

*文档版本：v1.0*
*生成时间：2026-01-10*
