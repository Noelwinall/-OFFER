# Fact Check Framework

> HK Edu App 数据核验框架
> 版本：zero-inference v1
> 依据：BOSS.md v1

---

## 目的

确保学校数据的**准确性、可溯源性、零推断**。

| 原则 | 说明 |
|------|------|
| 准确 | 数据必须与权威来源一致 |
| 可溯源 | 每条关键数据必须有 Evidence |
| 零推断 | 无官方原文 = UNKNOWN，不得猜测 |

---

## 证据优先级

### Tier 1（可作为 Evidence）

| 来源 | 示例 |
|------|------|
| 学校官网 | https://www.example.edu.hk/fees |
| 教育局 (EDB) | https://www.edb.gov.hk/... |
| 政府公报 | https://www.gld.gov.hk/... |

### Tier 2（仅作参考）

| 来源 | 用途 |
|------|------|
| 媒体报道 | 线索，需官方确认 |
| 学校年报 | 辅助验证 |

### 禁止来源

| 来源 | 原因 |
|------|------|
| 论坛 (EK Forum, Baby Kingdom) | 非官方 |
| 第三方汇总站 | 未经核实 |
| 家长口述 | 无法验证 |

---

## 零推断原则

### 核心规则

1. **无官方原文 → UNKNOWN**
   - 不得根据"常理"推断
   - 不得根据"类似学校"推断
   - 不得根据"以前是这样"推断

2. **模糊表述 → UNKNOWN**
   - 官方说"约 XXX" → 记录原文，标 UNKNOWN
   - 官方说"视情况而定" → 记录原文，标 UNKNOWN

3. **过期信息 → UNKNOWN**
   - 超过 12 个月的数据需重新核验
   - capturedAt 必须记录

### 字段默认状态

| 类型 | 默认状态 |
|------|----------|
| 学费 (tuition) | UNKNOWN（除非有官网截图/链接） |
| 升学衔接 (articulation) | UNKNOWN（除非有官方声明） |
| 课程 (curriculum) | UNKNOWN（除非官网明确列出） |
| 其他字段 | 按 data-dictionary.md 规则 |

---

## Evidence 格式

### 强制 Evidence 字段

学费和升学衔接必须有完整 Evidence：

```yaml
evidence:
  sourceUrl: "https://..."     # 必填
  capturedAt: "2026-01-10"     # 必填，ISO 日期
  confidence: "HIGH"           # HIGH / MEDIUM / LOW
  rawText: "原文摘录..."       # 建议填写
```

### Confidence 定义

| 级别 | 定义 |
|------|------|
| HIGH | 官方明确表述，无歧义 |
| MEDIUM | 官方有提及但表述模糊 |
| LOW | 需推断或来源非最新 |

---

## 目录结构

```
docs/factcheck/
├── README.md              # 本文件
├── data-dictionary.md     # 字段定义与核验规则
└── templates/
    ├── master-issues.csv      # 问题清单模板
    ├── evidence-record.csv    # 证据记录模板
    └── per-school-issue.md    # 单校问题模板
```

---

## 工作流程

1. **发现问题** → 记录到 master-issues.csv
2. **收集证据** → 记录到 evidence-record.csv
3. **单校详情** → 使用 per-school-issue.md 模板
4. **修正数据** → 需 Evidence，commit message 说明来源

---

*框架版本：zero-inference v1*
*依据：BOSS.md v1*
