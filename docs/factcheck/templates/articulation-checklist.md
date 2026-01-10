# Articulation (升学衔接) Checklist

> 升学衔接核验清单模板
> 依据：BOSS.md v1 第四条

---

## 核验对象

| 项目 | 值 |
|------|-----|
| 学校 ID | |
| 学校名称 | |
| 核验日期 | |
| 核验人 | |

---

## Step 1: 确认升学衔接分类 (type)

### 核验问题

- [ ] 是否为教育局官方一条龙 (Through-train)？
- [ ] 是否为同一学校/体系的一贯制？
- [ ] 是否有校网/集团内升学安排？
- [ ] 是否有附属/联校升学优先？

### 分类结果

| 分类 | 勾选 |
|------|------|
| `EDB_THROUGH_TRAIN` | [ ] |
| `ALL_THROUGH_SCHOOL` | [ ] |
| `SCHOOL_NETWORK_CONTINUITY` | [ ] |
| `AFFILIATED_PRIORITY` | [ ] |
| `NONE` | [ ] |
| `UNKNOWN` | [ ] |

**选定分类**: ________________

---

## Step 2: 确认升学保证力度 (guarantee)

### 核验问题

- [ ] 官网/文件是否明确表示"保证升学"？
- [ ] 是否有条件要求（成绩、操行、面试）？
- [ ] 是否"视名额而定"？
- [ ] 文件是否未说明具体政策？

### 保证力度结果

| 力度 | 勾选 |
|------|------|
| `GUARANTEED` | [ ] |
| `CONDITIONAL` | [ ] |
| `SUBJECT_TO_AVAILABILITY` | [ ] |
| `NOT_STATED` | [ ] |

**选定力度**: ________________

---

## Step 3: 关联学校

| 关联学校名称 | 关联学校 ID | 关系描述 |
|--------------|-------------|----------|
| | | |
| | | |

---

## Step 4: Evidence (必填三件套)

| 项目 | 值 |
|------|-----|
| sourceUrl | |
| capturedAt | |
| confidence | HIGH / MEDIUM / LOW |

### 证据截图/摘要

```
（粘贴官网原文或截图描述）
```

---

## Step 5: 最终结论

| 项目 | 值 |
|------|-----|
| 核验状态 | PASS / FAIL / UNKNOWN / NEED_REVIEW |
| 风险级别 | AUTO-FIX / NEED-APPROVAL |
| 当前数据是否正确 | 是 / 否 / 无数据 |
| 建议修正值 | |

### 备注

```
（其他说明）
```

---

## UI 标签建议

根据核验结果，建议显示标签：

- [ ] 龍校（EDB）- 仅 EDB_THROUGH_TRAIN + HIGH confidence
- [ ] 一貫制 - ALL_THROUGH_SCHOOL
- [ ] 校網銜接 - SCHOOL_NETWORK_CONTINUITY
- [ ] 升學優先 - AFFILIATED_PRIORITY
- [ ] 不显示标签 - NONE / UNKNOWN / 无证据

---

*模板版本：v1*
