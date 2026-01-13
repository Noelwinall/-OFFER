# Phase R3-3: District18 Integration Report

Generated: 2026-01-13T09:42:21.362Z

## Summary

| Metric | Value |
|--------|-------|
| Total schools | 3510 |
| Matched (with district18) | 3510 |
| Unmatched | 0 |
| Coverage rate | 100.0% |
| District corrections | 32 |

## District18 Distribution

| 18區 | 三大區 | 學校數 | 佔比 |
|------|--------|--------|------|
| 九龍城區 | 九龍 | 319 | 9.1% |
| 沙田區 | 新界 | 285 | 8.1% |
| 元朗區 | 新界 | 283 | 8.1% |
| 東區 | 港島 | 250 | 7.1% |
| 觀塘區 | 九龍 | 247 | 7.0% |
| 屯門區 | 新界 | 237 | 6.8% |
| 葵青區 | 新界 | 237 | 6.8% |
| 西貢區 | 新界 | 225 | 6.4% |
| 深水埗區 | 九龍 | 219 | 6.2% |
| 北區 | 新界 | 166 | 4.7% |
| 黃大仙區 | 九龍 | 151 | 4.3% |
| 大埔區 | 新界 | 148 | 4.2% |
| 中西區 | 港島 | 136 | 3.9% |
| 南區 | 港島 | 134 | 3.8% |
| 油尖旺區 | 九龍 | 127 | 3.6% |
| 離島區 | 新界 | 126 | 3.6% |
| 荃灣區 | 新界 | 114 | 3.2% |
| 灣仔區 | 港島 | 106 | 3.0% |

## Three-Region Distribution

| 三大區 | 學校數 | 佔比 |
|--------|--------|------|
| 港島 | 626 | 17.8% |
| 九龍 | 1063 | 30.3% |
| 新界 | 1821 | 51.9% |

## Data Sources

- EDB School Location CSV: `docs/factcheck/SCH_LOC_EDB_utf8.csv`
- Join Key: School No prefix (first 9 digits)

## Notes

- district18 field added to all matched schools
- district (3 regions) corrected for 32 schools to ensure consistency with district18 mapping
- 0 schools without School No could not be matched
