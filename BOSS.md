# 📜 BOSS.md
## HK Edu App · 老板指令总纲（v1）

> 本文件是 HK Edu App 项目的**最高执行指令**。
> 所有 Claude / agent 在本项目中的行为，必须以本文件为准。

---

## 一、项目定位（不可更改）

- 项目名称：HK Edu App
- 产品目标：
  **专业、可信、给家长「一目了然」的香港学校信息平台**
- 项目不是中介、不是营销站
- **准确性、可溯源、不过度承诺是最高原则**

---

## 二、分支与工作方式（硬规则）

1. **当前事实主线分支：`tuition-ui-fix`**
   - 所有工作默认在该分支进行
   - 未明确指示前，不合并到 `main`
2. 分支只是时间线，不代表完成度
3. 允许创建试验分支，但需说明目的

---

## 三、学校数据三层结构（必须遵守）

### 1️⃣ Canonical（主数据）
- 用于筛选 / 列表 / 排序
- 相对稳定
- 不做主观判断

### 2️⃣ Derived（派生）
- 由规则从 Canonical 推导
- 用于 UI 展示（标签、文案）
- **UI 禁止自行写判断逻辑**

### 3️⃣ Evidence（证据）
- 用于 fact check 与可信度展示
- **学费、升学衔接为强制证据项**
- 无证据 = 不贴标签 / 显示「待確認」

---

## 四、升学衔接（"龙校"）官方口径（v1 定稿）

### 4.1 升学衔接分类（Canonical）

只允许以下枚举：

- `EDB_THROUGH_TRAIN`
  教育局官方 Through-train 一条龙

- `ALL_THROUGH_SCHOOL`
  同一学校 / 同一体系的一贯制（如幼→中）

- `SCHOOL_NETWORK_CONTINUITY`
  校网 / 教育集团内升学（常见视名额）

- `AFFILIATED_PRIORITY`
  附属 / 联校 / 同办学团体升学优先

- `NONE` / `UNKNOWN`

---

### 4.2 升学保证力度（Canonical）

- `GUARANTEED`（明确保证 / automatic progression）
- `CONDITIONAL`（需成绩 / 操行 / 面试）
- `SUBJECT_TO_AVAILABILITY`（视名额）
- `NOT_STATED`（文件未说明）

---

### 4.3 Evidence（强制三件套）

升学衔接必须至少一条证据：

- `sourceUrl`
- `capturedAt`
- `confidence`（HIGH / MEDIUM / LOW）

⚠️ 论坛、家长经验：
- 不能作为证据
- 只能作为内部线索

---

## 五、UI 标签规则（Derived）

### 5.1 Badge 显示（列表 / 卡片，最多 2 个）

按强度排序：

1. **龍校（EDB）**
   - 仅当 `EDB_THROUGH_TRAIN` 且 evidence=HIGH

2. **一貫制**
   - `ALL_THROUGH_SCHOOL`

3. **校網銜接**
   - `SCHOOL_NETWORK_CONTINUITY`

4. **升學優先**
   - `AFFILIATED_PRIORITY`

❌ 产品中禁止出现「软龙」字样

---

### 5.2 无证据处理

- 不显示任何升学标签
- 详情页显示：
  **「升學衔接：待確認」**

---

## 六、学费规则（已锁）

1. `tuitionMin / tuitionMax` 单位固定为 **HKD / 年**
2. `0 + 0` 的语义：
   - 公立 / 资助 → `免學費（政府資助）`
   - 其它 → `待確認`
3. 学费判断集中在定义层
   - UI 禁止自行判断

---

## 七、Fact Check 总原则（Phase 2）

1. Fact check 覆盖所有学校、所有关键字段：
   - 类别 / 学段 / 课程
   - 语言
   - 学费
   - 升学衔接
   - 官网 / 申请链接
2. **只输出报告，不直接改主数据**
3. 不确定就标「待確認」，不得猜测
4. 所有输出必须：
   - 可审
   - 可回滚
   - 可追溯

---

## 八、Claude / Agent 行为约束

- 不得自行发明分类、标签、文案
- 不得为了"看起来完整"而假精确
- 不得越权做产品决策
- 若需调整模型：
  - 先说明
  - 再修改
  - 在 commit message 中解释原因

---

## 九、执行授权

### Phase 1（已授权）
- 在 `tuition-ui-fix` 分支
- 新增升学衔接模块（按本文件）

### Phase 2（已授权）
- 全量 fact check
- 输出到 `docs/factcheck/`
- 不改主数据

---

**本文件为 v1 定稿。**
任何规则调整，需先更新 BOSS.md，再执行其它变更。
