# Consolidated Kindergarten Database

Generated: 2026-01-19T14:20:47.384Z

## Overview

| Metric | Count |
|--------|-------|
| Total Unique KGs | 983 |
| Session Variants | 2192 |
| Joined KGP (幼稚園教育計劃) | 712 |
| With Fees Data | 0 |
| Needs Review | 139 |

## By Nature

| Nature | Count | % |
|--------|-------|---|
| International | 52 | 5.3% |
| Non-profit (KGP) | 931 | 94.7% |
| Private | 0 | 0.0% |

## By Curriculum

| Curriculum | Count | % |
|------------|-------|---|
| local | 796 | 81.0% |
| non_local | 110 | 11.2% |
| unknown | 58 | 5.9% |
| ib | 11 | 1.1% |
| montessori_intl | 8 | 0.8% |

## Top Pedagogy Tags

| Tag | Count | % |
|-----|-------|---|
| holistic | 773 | 78.6% |
| project_learn | 684 | 69.6% |
| play_explore | 621 | 63.2% |
| language_dev | 228 | 23.2% |
| special_curriculum | 98 | 10.0% |

## Language Environment

| Language | Count | % |
|----------|-------|---|
| english | 518 | 52.7% |
| cantonese | 407 | 41.4% |
| putonghua | 239 | 24.3% |
| trilingual | 202 | 20.5% |
| native_english | 91 | 9.3% |
| bilingual | 89 | 9.1% |

## By District (18 Districts)

| District | Count |
|----------|-------|
| 九龍城區 | 91 |
| 元朗區 | 78 |
| 沙田區 | 78 |
| 觀塘區 | 75 |
| 東區 | 73 |
| 西貢區 | 68 |
| 屯門區 | 65 |
| 葵青區 | 62 |
| 深水埗區 | 53 |
| 北區 | 45 |
| 中西區 | 44 |
| 黃大仙區 | 43 |
| 荃灣區 | 37 |
| 油尖旺區 | 36 |
| 大埔區 | 36 |
| 離島區 | 35 |
| 南區 | 34 |
| 灣仔區 | 30 |

## Data Sources

1. **schools_raw.ts** - Basic school info, session variants (AM/PM/WD)
2. **EDB KGP Profile 2025** - Curriculum type, pedagogy, teaching methods
   - Source: https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/free-quality-kg-edu/KGP_2025_tc.csv
3. **instruction-language-map.ts** - Instruction language mapping
4. **school-metadata-map.ts** - Religion and other metadata

## Data Quality

Confidence levels:
- **high**: Direct match from authoritative data
- **medium**: Inferred from patterns/context
- **low**: Missing or ambiguous source data

Schools marked `needs_review` require manual verification.

## Files

| File | Description |
|------|-------------|
| `kg-database.ts` | TypeScript database with full types and helper functions |
| `kg-database.csv` | CSV export for data management (Excel-compatible) |
| `kg-summary.md` | This documentation file |
