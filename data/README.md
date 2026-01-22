# Data Architecture

## Overview

This folder contains all school data and mappings for the 有OFFER app.

```
┌─────────────────────────────────────────────────────────────────┐
│  RAW SOURCES (CSV)                                              │
│  ├── CHSC/           CHSC Primary & Secondary profiles          │
│  ├── kg/             EDB Kindergarten data                      │
│  └── *research/      Manual research & AI-assisted mapping      │
└─────────────────────────────────────────────────────────────────┘
                              ↓ (scripts/sync-*.ts)
┌─────────────────────────────────────────────────────────────────┐
│  COMPILED DATA (TypeScript)                                     │
│  ├── schools_raw.ts  SINGLE SOURCE OF TRUTH (3509 schools)     │
│  ├── schools.ts      Merged with all mappings                   │
│  ├── fees-2025-26.ts Fee data by school ID                     │
│  └── kg/kg-database.ts  KG-specific database                    │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  CLASSIFICATION (lib/school-classification/)                    │
│  ├── isInternational()       394 → 209 after grouping          │
│  ├── getKGNature()           international/private/non_profit   │
│  ├── groupSchoolsBySession() Merge AM/PM/WD variants           │
│  └── getSchoolGroup()        ESF membership                     │
└─────────────────────────────────────────────────────────────────┘
```

## Directory Structure

### Raw Sources (`CHSC/`, `kg/`, `*research/`)

| Folder | Source | Description |
|--------|--------|-------------|
| `CHSC/` | [CHSC Website](https://www.chsc.hk) | Primary & Secondary School Profiles |
| `kg/edb_kgp_2025_tc.csv` | EDB | Kindergarten scheme data |
| `MOI mapping research/` | Manual + AI | Medium of Instruction mapping |
| `curriculum mapping research/` | Manual + AI | Curriculum classification |
| `through train school mapping research/` | Manual | Through-train relationships |

### Compiled Data

| File | Records | Description |
|------|---------|-------------|
| `schools_raw.ts` | 3509 | **SINGLE SOURCE OF TRUTH** - All schools from EDB/CHSC |
| `schools.ts` | 3509 | Merged with mappings (MOI, gender, curriculum, etc.) |
| `fees-2025-26.ts` | ~3000 | Tuition fee data by school ID |
| `chsc-data.ts` | - | CHSC-specific data structures |
| `kg/kg-database.ts` | ~1000 | KG-specific extended data |

### Mappings (`mappings/`)

| File | Purpose |
|------|---------|
| `curriculum-map.ts` | CurriculumV2 classification (IB, DSE, IGCSE, etc.) |
| `gender-map.ts` | School gender (BOYS, GIRLS, MIXED) |
| `instruction-language-map.ts` | Medium of Instruction (ENGLISH, CHINESE, etc.) |
| `international-school-map.ts` | Generated list of international schools |
| `relationship-map.ts` | Through-train & feeder relationships |
| `school-metadata-map.ts` | Religion, school net, special school flags |

## Category Systems

### Kindergarten (幼稚園)

| Category | Chinese | Logic |
|----------|---------|-------|
| International | 國際 | `isInternational() === true` |
| Private KG | 私立幼稚園 | High fees (>$50K/year), non-KGP |
| Non-profit KG | 非牟利幼稚園 | KGP participant (default) |

### Primary/Secondary (小學/中學)

| Category | Chinese | Source |
|----------|---------|--------|
| International | 國際 | `isInternational() === true` |
| Private | 私立 | EDB category field |
| DSS | 直資 | EDB category field |
| Aided | 資助 | EDB category field |
| Government | 公立 | EDB category field |

## Classification Logic

All classification is centralized in `lib/school-classification/`:

```typescript
import {
  isInternational,      // Check if international school
  getKGNature,          // Get KG category
  groupSchoolsBySession, // Merge AM/PM/WD
  isEsfSchool,          // Check ESF membership
} from "@/lib/school-classification";
```

### International School Detection

1. **ESF Membership**: Canonical list of 22 ESF schools
2. **Pattern Matching**: ~90 patterns for standalone international schools

### Session Grouping

Schools with same name + level but different sessions (AM/PM/WD) are merged:
- Before grouping: 3509 entries
- After grouping: 2190 unique schools

## Regenerating Data

```bash
# Sync mappings from CSV
npx tsx scripts/sync-mappings.ts

# Generate school metadata
npx tsx scripts/generate-school-metadata.ts

# Regenerate international school list
npx tsx scripts/generate-intl-school-db.ts
```

## Important Notes

1. **Never edit `schools_raw.ts` directly** - It's generated from source data
2. **Classification logic lives in `lib/school-classification/`** - Not in data files
3. **Mappings are ID-based** - Use school ID as the key
4. **CSV files are authoritative** - TypeScript files are generated from them
