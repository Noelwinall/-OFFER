# Phase R3-5: 2025/26 國際學校費用錄入報告

> **狀態**: 已完成（7 entries verified）
> **錄入日期**: 2026-01-14
> **學年**: 2025/26

## 目標學校清單（10 所）

以下學校 ID 已從 `data/schools.ts` 驗證：

| # | 中文名 | 英文名 | school.id | level | 狀態 |
|---|--------|--------|-----------|-------|------|
| 1 | 加拿大國際學校 | CANADIAN INTERNATIONAL SCHOOL | `edb_216011000523` | 小學 | ✅ 已錄入 |
| 2 | 加拿大國際學校 | CANADIAN INTERNATIONAL SCHOOL | `edb_216011000533` | 中學 | ✅ 已錄入 |
| 3 | 哈羅香港國際學校 | HARROW INTERNATIONAL SCHOOL HONG KONG | `edb_590800000123` | 小學 | ⏭️ 跳過 |
| 4 | 哈羅香港國際學校 | HARROW INTERNATIONAL SCHOOL HONG KONG | `edb_590800000133` | 中學 | ⏭️ 跳過 |
| 5 | KELLETT SCHOOL | KELLETT SCHOOL | `edb_215406000123` | 小學 | ✅ 已錄入 |
| 6 | KELLETT SCHOOL | KELLETT SCHOOL | `edb_215406000433` | 中學 | ✅ 已錄入 |
| 7 | ISLAND SCHOOL | ISLAND SCHOOL (ESF) | `edb_170399000133` | 中學 | ✅ 已錄入 |
| 8 | HONG KONG INTERNATIONAL SCHOOL | HONG KONG INTERNATIONAL SCHOOL | `edb_213772000123` | 小學 | ✅ 已錄入 |
| 9 | HONG KONG INTERNATIONAL SCHOOL | HONG KONG INTERNATIONAL SCHOOL | `edb_213772000233` | 中學 | ✅ 已錄入 |
| 10 | 德瑞國際學校 | GERMAN SWISS INTERNATIONAL SCHOOL | `edb_214558000133` | 中學 | ⏭️ 跳過 |

---

## 已錄入學校詳情

### 1. CDNIS 加拿大國際學校

**來源**: https://www.cdnis.edu.hk/admissions/tuition-fees
**學年確認**: ✅ 2025/26

#### 小學 (edb_216011000523)
| 年級 | 學費 (HKD) |
|------|------------|
| EY1 (Half Day) | $156,300 |
| EY2 (Full Day) | $203,100 |
| Prep–G2 | $210,900 |
| G3 | $191,800 |
| G4–G5 | $193,600 |
| G6 | $212,800 |

#### 中學 (edb_216011000533)
| 年級 | 學費 (HKD) |
|------|------------|
| G7–G8 | $216,600 |
| G9–G10 | $237,700 |
| G11–G12 | $254,300 |

**強制性費用**:
- Annual Capital Levy: $38,000/年（持有 debenture 可豁免）

---

### 2. Kellett School

**來源**: https://www.kellettschool.com/admissions/fees-debenture-information
**學年確認**: ✅ 2025/26

#### 小學 (edb_215406000123)
| 年級 | 學費 (HKD) |
|------|------------|
| Reception | $208,800 |
| Y1–Y6 | $214,200 |

#### 中學 (edb_215406000433)
| 年級 | 學費 (HKD) |
|------|------------|
| Y7–Y11 (I/GCSE) | $251,400 |
| Y12–Y13 (A Levels) | $267,100 |

**強制性費用**:
- Annual Capital Levy: $40,000/年（2025年8月31日後的新錄取需繳納；不可退還）

---

### 3. ESF Island School

**來源**: https://www.esf.edu.hk/fee-levels-for-academic-year-2025-26-esf-schools/
**學年確認**: ✅ 2025/26（URL 明確標明）

#### 中學 (edb_170399000133)
| 年級 | 學費 (HKD) |
|------|------------|
| Y7–Y10 | $181,100 |
| Y11 | $159,400 |
| Y12–Y13 | $167,600 |

**強制性費用**: 無

---

### 4. HKIS 香港國際學校

**來源**: https://www.hkis.edu.hk/admissions/tuition-fees
**學年確認**: ✅ 2025/26

#### 小學 (edb_213772000123)
| 年級 | 學費 (HKD) |
|------|------------|
| R1–G5 | $224,800 |

#### 中學 (edb_213772000233)
| 年級 | 學費 (HKD) |
|------|------------|
| G6–G8 (Middle School) | $236,200 |
| G9–G12 (High School) | $263,300 |

**強制性費用**:
- Annual Capital Levy: $23,000/年

---

## Skipped 列表

| 學校 | 原因 |
|------|------|
| 哈羅香港國際學校 (小學/中學) | URL 無法訪問 |
| 德瑞國際學校 | 無法確認 2025/26 學年數據 |

---

## 統計

| 指標 | 數量 |
|------|------|
| 錄入學校數 | 7 / 10 |
| 含 Mandatory Charges 的學校 | 6 |
| 僅 Tuition 的學校 | 1 (ESF) |

---

## 驗證結果

```
=== Phase R3-5: Fees Join Key Verification ===

Total school IDs in data/schools.ts: 3510
Fee entries in data/fees-2025-26.ts: 7

=== Verification Results ===

Valid keys (exist in schools.ts): 7
Missing keys (NOT in schools.ts): 0

Status: PASS
```

---

*報告生成時間: 2026-01-14*
