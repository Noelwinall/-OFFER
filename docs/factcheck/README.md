# Fact Check Framework

> HK Edu App 数据核验框架
> 版本：v1 clean
> 依据：BOSS.md v1

---

## 目标

确保 HK Edu App 中的学校数据：

1. **准确** - 与官方来源一致
2. **可溯源** - 每条关键数据有证据链
3. **不过度承诺** - 无证据则标"待確認"

---

## 核验范围

### 强制 Evidence 字段（三件套）

以下字段必须提供完整证据：

| 字段 | Evidence 要求 |
|------|---------------|
| `tuition` (学费) | sourceUrl + capturedAt + confidence |
| `articulation` (升学衔接) | sourceUrl + capturedAt + confidence |

### 其他字段

- 不强制三件套
- 但必须有可核验来源（学校官网优先，EDB 辅助）
- 禁止使用论坛/第三方汇总站作为证据

---

## 证据规则

### 可接受来源（按优先级）

1. **学校官网** - 最优先
2. **教育局 (EDB)** - 官方权威
3. **政府公报** - 法定文件

### 不可接受来源

- 论坛（如 EK Forum、Baby Kingdom）
- 第三方汇总站
- 家长口述/经验分享
- 未标注来源的资料

### Evidence 三件套格式

```yaml
evidence:
  sourceUrl: "https://www.example.edu.hk/fees"
  capturedAt: "2026-01-10"
  confidence: "HIGH"  # HIGH / MEDIUM / LOW
```

---

## 核验状态

| 状态 | 含义 | 处理方式 |
|------|------|----------|
| `PASS` | 已核验，数据正确 | 无需处理 |
| `FAIL` | 已核验，数据错误 | 需修正 |
| `UNKNOWN` | 无法核验 | 标"待確認" |
| `NEED_REVIEW` | 需人工确认 | 等待老板决策 |

---

## 风险分级

| 级别 | 含义 | 处理方式 |
|------|------|----------|
| `AUTO-FIX` | 低风险，客观可核验 | 可自动修正 |
| `NEED-APPROVAL` | 高风险，主观/争议 | 需老板确认 |

### AUTO-FIX 适用

- 链接格式修正
- 电话格式标准化
- 明显拼写错误
- 经纬度范围修正

### NEED-APPROVAL 适用

- 学费数值变更
- 升学衔接分类
- 学校分类变更
- 任何主观描述

---

## 如何提交核验结果

### Step 1: 使用模板

从 `templates/` 目录选择对应模板：
- 学费核验：`tuition-checklist.csv`
- 升学衔接：`articulation-checklist.md` / `.csv`
- 单校完整核验：`school-factcheck-issue-template.md`

### Step 2: 填写证据

- 每条数据填写 sourceUrl
- 记录 capturedAt（核验日期）
- 评估 confidence

### Step 3: 提交

- 将完成的核验文件放入 `docs/factcheck/reports/` (按需创建)
- 提交 PR 或直接 commit
- commit message 格式：`docs(factcheck): [scope] description`

---

## 目录结构

```
docs/factcheck/
├── README.md              # 本文件
├── data-dictionary.md     # 字段定义与核验规则
├── templates/             # 核验模板
│   ├── articulation-checklist.md
│   ├── articulation-checklist.csv
│   ├── tuition-checklist.csv
│   └── school-factcheck-issue-template.md
└── reports/               # 核验结果（按需创建）
```

---

## 原则（引自 BOSS.md）

- 不得自行发明分类、标签、文案
- 不得为了"看起来完整"而假精确
- 不得越权做产品决策
- 不确定就标「待確認」，不得猜测

---

*框架版本：v1 clean*
*依据：BOSS.md v1*
