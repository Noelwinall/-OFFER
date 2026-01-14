# Phase R3-5: 2025/26 國際學校費用錄入報告

> **狀態**: 來源審計中（待確認 URL 後再錄入數字）
> **錄入日期**: 2026-01-14
> **學年**: 2025/26

## 目標學校清單（10 所）

以下學校 ID 已從 `data/schools.ts` 驗證：

| # | 中文名 | 英文名 | school.id | level | 來源 URL |
|---|--------|--------|-----------|-------|----------|
| 1 | 加拿大國際學校 | CANADIAN INTERNATIONAL SCHOOL | `edb_216011000523` | 小學 | [CDNIS Fees](https://www.cdnis.edu.hk/admissions/tuition-fees) |
| 2 | 加拿大國際學校 | CANADIAN INTERNATIONAL SCHOOL | `edb_216011000533` | 中學 | [CDNIS Fees](https://www.cdnis.edu.hk/admissions/tuition-fees) |
| 3 | 哈羅香港國際學校 | HARROW INTERNATIONAL SCHOOL HONG KONG | `edb_590800000123` | 小學 | [Harrow Fees](https://www.harrowhongkong.hk/his/admissions/fees/) |
| 4 | 哈羅香港國際學校 | HARROW INTERNATIONAL SCHOOL HONG KONG | `edb_590800000133` | 中學 | [Harrow Fees](https://www.harrowhongkong.hk/his/admissions/fees/) |
| 5 | KELLETT SCHOOL | KELLETT SCHOOL | `edb_215406000123` | 小學 | [Kellett Fees](https://www.kellettschool.com/admissions/fees-debenture-information) |
| 6 | KELLETT SCHOOL | KELLETT SCHOOL | `edb_215406000433` | 中學 | [Kellett Fees](https://www.kellettschool.com/admissions/fees-debenture-information) |
| 7 | ISLAND SCHOOL | ISLAND SCHOOL (ESF) | `edb_170399000133` | 中學 | [ESF Fee Levels 2025/26](https://www.esf.edu.hk/fee-levels-for-academic-year-2025-26-esf-schools/) |
| 8 | HONG KONG INTERNATIONAL SCHOOL | HONG KONG INTERNATIONAL SCHOOL | `edb_213772000123` | 小學 | [HKIS Fees](https://www.hkis.edu.hk/admissions/tuition-fees) |
| 9 | HONG KONG INTERNATIONAL SCHOOL | HONG KONG INTERNATIONAL SCHOOL | `edb_213772000233` | 中學 | [HKIS Fees](https://www.hkis.edu.hk/admissions/tuition-fees) |
| 10 | 德瑞國際學校 | GERMAN SWISS INTERNATIONAL SCHOOL | `edb_214558000133` | 中學 | [GSIS Fees](https://www.gsis.edu.hk/en/admissions/fees-and-debenture?section=school-fees) |

## 來源審計

### 1. CDNIS (加拿大國際學校)
- **URL**: https://www.cdnis.edu.hk/admissions/tuition-fees
- **Retrieved At**: 2026-01-14
- **Evidence Level**: SCHOOL_SITE
- **2025/26 確認**: ⬜ 待確認頁面標題是否明確顯示 "2025/26"
- **Tuition bands**: ⬜ 待錄入
- **Mandatory charges**: ⬜ 待確認是否有 Capital Levy

### 2. Harrow (哈羅香港國際學校)
- **URL**: https://www.harrowhongkong.hk/his/admissions/fees/
- **Retrieved At**: 2026-01-14
- **Evidence Level**: SCHOOL_SITE
- **2025/26 確認**: ⬜ 待確認
- **Tuition bands**: ⬜ 待錄入
- **Mandatory charges**: ⬜ 待確認 Capital Levy

### 3. Kellett School
- **URL**: https://www.kellettschool.com/admissions/fees-debenture-information
- **Retrieved At**: 2026-01-14
- **Evidence Level**: SCHOOL_SITE
- **2025/26 確認**: ⬜ 待確認
- **Tuition bands**: ⬜ 待錄入
- **Mandatory charges**: ⬜ 待確認 Annual Capital Levy

### 4. ESF Island School
- **URL**: https://www.esf.edu.hk/fee-levels-for-academic-year-2025-26-esf-schools/
- **Retrieved At**: 2026-01-14
- **Evidence Level**: SCHOOL_SITE
- **2025/26 確認**: ✅ URL 明確標明 "2025-26"
- **Tuition bands**: ⬜ 待錄入
- **Mandatory charges**: ESF 學校無 Capital Levy

### 5. HKIS (香港國際學校)
- **URL**: https://www.hkis.edu.hk/admissions/tuition-fees
- **Retrieved At**: 2026-01-14
- **Evidence Level**: SCHOOL_SITE
- **2025/26 確認**: ⬜ 待確認
- **Tuition bands**: ⬜ 待錄入
- **Mandatory charges**: ⬜ 待確認 Capital Levy

### 6. GSIS (德瑞國際學校)
- **URL**: https://www.gsis.edu.hk/en/admissions/fees-and-debenture?section=school-fees
- **Retrieved At**: 2026-01-14
- **Evidence Level**: SCHOOL_SITE
- **2025/26 確認**: ⬜ 待確認
- **Tuition bands**: ⬜ 待錄入
- **Mandatory charges**: ⬜ 待確認（據悉無年度 levy）

---

## 統計（待完成後更新）

| 指標 | 數量 |
|------|------|
| 錄入學校數 | 0 / 10 |
| 含 Mandatory Charges 的學校 | 0 |
| 僅 Tuition 的學校 | 0 |

## Skipped 列表

| 學校 | 原因 |
|------|------|
| (暫無) | - |

---

## 下一步

1. ⬜ 確認所有 URL 頁面顯示 "2025/26" 學年
2. ⬜ 逐校錄入 tuition bands（標註原文位置）
3. ⬜ 逐校錄入 mandatory charges（標註原文位置）
4. ⬜ 更新 `data/fees-2025-26.ts`
5. ⬜ 運行 `verify-fees-join.js` 確認 0 missing

---

*報告生成時間: 2026-01-14*
