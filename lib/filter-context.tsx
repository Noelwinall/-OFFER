import React, { createContext, useReducer, ReactNode } from "react";

import type { Curriculum, CurriculumV2, InstructionLanguage, Language, SchoolCategory, District, District18, Level, SchoolGender } from "@/types/school";
import type { ExtendedCategory } from "@/constants/kg-nature";
import type { KGSession, KGCurriculumCategoryFilter, KGCurriculumSubtypeFilter, KGPedagogyTag, KGLanguageEnv } from "@/constants/kg-filters";

// 排序選項類型
export type SortOption = "relevance" | "tuition_low" | "tuition_high" | "name_asc" | "name_desc";

export interface FilterState {
  stage: Level | null;  // 階段篩選：幼稚園/小學/中學
  category: ExtendedCategory[];  // Extended to include KG-specific categories
  district: District[];
  district18: District18[];  // 18區篩選
  curriculum: Curriculum[];
  curriculumV2: CurriculumV2[];  // V2 課程篩選（Primary/Secondary only）
  instructionLanguages: InstructionLanguage[];  // 授課語言篩選（Primary/Secondary only）
  gender: SchoolGender[];  // 學校性別篩選（Primary/Secondary only, excludes MIXED）
  language: Language | null;
  sortBy: SortOption;
  // KG-specific filters
  kgSession: KGSession[];  // 時段篩選：AM/PM/WD
  kgCurriculumCategory: KGCurriculumCategoryFilter[];  // 課程 Level 1：local/non_local
  kgCurriculumType: KGCurriculumSubtypeFilter[];  // 課程 Level 2：kgp/non_kgp/ib/montessori/british/other
  kgPedagogy: KGPedagogyTag[];  // 教學特色（5 groups）
  kgLanguageEnv: KGLanguageEnv[];  // 語言環境
}

export type FilterAction =
  | { type: "SET_STAGE"; payload: Level }
  | { type: "CLEAR_STAGE" }
  | { type: "TOGGLE_CURRICULUM"; payload: Curriculum }
  | { type: "TOGGLE_CURRICULUM_V2"; payload: CurriculumV2 }
  | { type: "TOGGLE_INSTRUCTION_LANGUAGE"; payload: InstructionLanguage }
  | { type: "TOGGLE_GENDER"; payload: SchoolGender }
  | { type: "SET_LANGUAGE"; payload: Language }
  | { type: "CLEAR_LANGUAGE" }
  | { type: "TOGGLE_CATEGORY"; payload: ExtendedCategory }
  | { type: "TOGGLE_DISTRICT"; payload: District }
  | { type: "TOGGLE_DISTRICT18"; payload: District18 }
  | { type: "CLEAR_DISTRICT18" }
  | { type: "SET_SORT"; payload: SortOption }
  | { type: "RESET_FILTERS" }
  // KG-specific actions
  | { type: "TOGGLE_KG_SESSION"; payload: KGSession }
  | { type: "TOGGLE_KG_CURRICULUM_CATEGORY"; payload: KGCurriculumCategoryFilter }
  | { type: "TOGGLE_KG_CURRICULUM_TYPE"; payload: KGCurriculumSubtypeFilter }
  | { type: "TOGGLE_KG_PEDAGOGY"; payload: KGPedagogyTag }
  | { type: "TOGGLE_KG_LANGUAGE_ENV"; payload: KGLanguageEnv }
  | { type: "CLEAR_KG_FILTERS" };

const initialState: FilterState = {
  stage: null,
  category: [],
  district: [],
  district18: [],
  curriculum: [],
  curriculumV2: [],
  instructionLanguages: [],
  gender: [],
  language: null,
  sortBy: "relevance",
  // KG-specific filters
  kgSession: [],
  kgCurriculumCategory: [],
  kgCurriculumType: [],
  kgPedagogy: [],
  kgLanguageEnv: [],
};

function filterReducer(state: FilterState, action: FilterAction): FilterState {
  switch (action.type) {
    case "SET_STAGE": {
      // Toggle stage: click same stage again to deselect
      const newStage = state.stage === action.payload ? null : action.payload;
      const wasKG = state.stage === "幼稚園";
      const isKG = newStage === "幼稚園";

      // Clear filters based on stage transition
      if (isKG && !wasKG) {
        // Switching TO KG: clear non-KG filters
        return {
          ...state,
          stage: newStage,
          // Clear non-KG specific filters
          curriculumV2: [],
          instructionLanguages: [],
          gender: [],
          // Clear non-KG categories but keep 國際
          category: state.category.filter((c) => c === "國際"),
        };
      } else if (!isKG && wasKG) {
        // Switching FROM KG: clear KG-specific filters
        return {
          ...state,
          stage: newStage,
          // Clear KG-specific categories
          category: state.category.filter((c) => c !== "私立幼稚園" && c !== "非牟利幼稚園"),
          // Clear KG-specific filters
          kgSession: [],
          kgCurriculumCategory: [],
          kgCurriculumType: [],
          kgPedagogy: [],
          kgLanguageEnv: [],
        };
      } else if (!isKG) {
        // Not in KG mode: ensure KG categories are cleared
        return {
          ...state,
          stage: newStage,
          category: state.category.filter((c) => c !== "私立幼稚園" && c !== "非牟利幼稚園"),
        };
      }
      return { ...state, stage: newStage };
    }

    case "CLEAR_STAGE":
      return {
        ...state,
        stage: null,
        // Clear KG-specific categories and filters when clearing stage
        category: state.category.filter((c) => c !== "私立幼稚園" && c !== "非牟利幼稚園"),
        kgSession: [],
        kgCurriculumCategory: [],
        kgCurriculumType: [],
        kgPedagogy: [],
        kgLanguageEnv: [],
      };

    case "TOGGLE_CURRICULUM": {
      const updated = state.curriculum.includes(action.payload)
        ? state.curriculum.filter((c) => c !== action.payload)
        : [...state.curriculum, action.payload];
      return { ...state, curriculum: updated };
    }

    case "TOGGLE_CURRICULUM_V2": {
      const updated = state.curriculumV2.includes(action.payload)
        ? state.curriculumV2.filter((c) => c !== action.payload)
        : [...state.curriculumV2, action.payload];
      return { ...state, curriculumV2: updated };
    }

    case "TOGGLE_INSTRUCTION_LANGUAGE": {
      const updated = state.instructionLanguages.includes(action.payload)
        ? state.instructionLanguages.filter((l) => l !== action.payload)
        : [...state.instructionLanguages, action.payload];
      return { ...state, instructionLanguages: updated };
    }

    case "TOGGLE_GENDER": {
      const updated = state.gender.includes(action.payload)
        ? state.gender.filter((g) => g !== action.payload)
        : [...state.gender, action.payload];
      return { ...state, gender: updated };
    }

    case "SET_LANGUAGE":
      return {
        ...state,
        language: state.language === action.payload ? null : action.payload,
      };

    case "CLEAR_LANGUAGE":
      return { ...state, language: null };

    case "TOGGLE_CATEGORY": {
      const updated = state.category.includes(action.payload)
        ? state.category.filter((c) => c !== action.payload)
        : [...state.category, action.payload];
      return { ...state, category: updated };
    }

    case "TOGGLE_DISTRICT": {
      const updated = state.district.includes(action.payload as District)
        ? state.district.filter((d) => d !== action.payload)
        : [...state.district, action.payload as District];
      return { ...state, district: updated };
    }

    case "TOGGLE_DISTRICT18": {
      const updated = state.district18.includes(action.payload)
        ? state.district18.filter((d) => d !== action.payload)
        : [...state.district18, action.payload];
      return { ...state, district18: updated };
    }

    case "CLEAR_DISTRICT18":
      return { ...state, district18: [] };

    case "SET_SORT":
      return { ...state, sortBy: action.payload };

    case "RESET_FILTERS":
      return initialState;

    // KG-specific filter actions
    case "TOGGLE_KG_SESSION": {
      const updated = state.kgSession.includes(action.payload)
        ? state.kgSession.filter((s) => s !== action.payload)
        : [...state.kgSession, action.payload];
      return { ...state, kgSession: updated };
    }

    case "TOGGLE_KG_CURRICULUM_CATEGORY": {
      const updated = state.kgCurriculumCategory.includes(action.payload)
        ? state.kgCurriculumCategory.filter((c) => c !== action.payload)
        : [...state.kgCurriculumCategory, action.payload];
      // When deselecting a category, also clear its subtypes
      let newTypes = state.kgCurriculumType;
      if (!updated.includes(action.payload)) {
        // Removing category - clear its subtypes
        if (action.payload === "local") {
          newTypes = newTypes.filter((t) => t !== "kgp" && t !== "non_kgp");
        } else if (action.payload === "non_local") {
          newTypes = newTypes.filter((t) => t !== "ib" && t !== "montessori" && t !== "british" && t !== "other");
        }
      }
      return { ...state, kgCurriculumCategory: updated, kgCurriculumType: newTypes };
    }

    case "TOGGLE_KG_CURRICULUM_TYPE": {
      const updated = state.kgCurriculumType.includes(action.payload)
        ? state.kgCurriculumType.filter((t) => t !== action.payload)
        : [...state.kgCurriculumType, action.payload];
      return { ...state, kgCurriculumType: updated };
    }

    case "TOGGLE_KG_PEDAGOGY": {
      const updated = state.kgPedagogy.includes(action.payload)
        ? state.kgPedagogy.filter((p) => p !== action.payload)
        : [...state.kgPedagogy, action.payload];
      return { ...state, kgPedagogy: updated };
    }

    case "TOGGLE_KG_LANGUAGE_ENV": {
      const updated = state.kgLanguageEnv.includes(action.payload)
        ? state.kgLanguageEnv.filter((l) => l !== action.payload)
        : [...state.kgLanguageEnv, action.payload];
      return { ...state, kgLanguageEnv: updated };
    }

    case "CLEAR_KG_FILTERS":
      return {
        ...state,
        kgSession: [],
        kgCurriculumCategory: [],
        kgCurriculumType: [],
        kgPedagogy: [],
        kgLanguageEnv: [],
      };

    default:
      return state;
  }
}

interface FilterContextType {
  state: FilterState;
  dispatch: React.Dispatch<FilterAction>;
}

export const FilterContext = createContext<FilterContextType | undefined>(
  undefined
);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(filterReducer, initialState);

  return (
    <FilterContext.Provider value={{ state, dispatch }}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  const context = React.useContext(FilterContext);
  if (!context) {
    throw new Error("useFilter must be used within FilterProvider");
  }
  return context;
}

/**
 * 檢查是否有任何活躍的篩選條件
 */
export function hasActiveFilters(state: FilterState): boolean {
  return (
    state.stage !== null ||
    state.category.length > 0 ||
    state.district.length > 0 ||
    state.district18.length > 0 ||
    state.curriculum.length > 0 ||
    state.curriculumV2.length > 0 ||
    state.instructionLanguages.length > 0 ||
    state.gender.length > 0 ||
    state.language !== null ||
    // KG-specific filters
    state.kgSession.length > 0 ||
    state.kgCurriculumCategory.length > 0 ||
    state.kgCurriculumType.length > 0 ||
    state.kgPedagogy.length > 0 ||
    state.kgLanguageEnv.length > 0
  );
}

/**
 * 獲取活躍篩選條件的人類可讀描述
 */
export function getFilterLabels(state: FilterState): string[] {
  const labels: string[] = [];

  if (state.stage) {
    labels.push(`階段: ${state.stage}`);
  }

  if (state.category.length > 0) {
    labels.push(`類型: ${state.category.join(", ")}`);
  }

  if (state.district.length > 0) {
    labels.push(`大區: ${state.district.join(", ")}`);
  }

  if (state.district18.length > 0) {
    labels.push(`分區: ${state.district18.join(", ")}`);
  }

  if (state.curriculumV2.length > 0) {
    const { CURRICULUM_V2_LABELS } = require("@/types/school");
    const curriculumLabels = state.curriculumV2.map((c) => CURRICULUM_V2_LABELS[c] || c);
    labels.push(`課程: ${curriculumLabels.join(", ")}`);
  }

  if (state.instructionLanguages.length > 0) {
    const { INSTRUCTION_LANGUAGE_LABELS } = require("@/types/school");
    const langLabels = state.instructionLanguages.map((l) => INSTRUCTION_LANGUAGE_LABELS[l] || l);
    labels.push(`授課語言: ${langLabels.join(", ")}`);
  }

  if (state.gender.length > 0) {
    const { SCHOOL_GENDER_LABELS } = require("@/types/school");
    const genderLabels = state.gender.map((g) => SCHOOL_GENDER_LABELS[g] || g);
    labels.push(`學校性別: ${genderLabels.join(", ")}`);
  }

  if (state.language) {
    labels.push(`語言: ${state.language}`);
  }

  // KG-specific filter labels
  if (state.kgSession.length > 0) {
    const { KG_SESSION_LABELS } = require("@/constants/kg-filters");
    const sessionLabels = state.kgSession.map((s) => KG_SESSION_LABELS[s] || s);
    labels.push(`時段: ${sessionLabels.join(", ")}`);
  }

  if (state.kgCurriculumCategory.length > 0 || state.kgCurriculumType.length > 0) {
    const { KG_CURRICULUM_CATEGORY_LABELS, KG_CURRICULUM_SUBTYPE_LABELS } = require("@/constants/kg-filters");
    const parts: string[] = [];
    state.kgCurriculumCategory.forEach((c) => parts.push(KG_CURRICULUM_CATEGORY_LABELS[c] || c));
    state.kgCurriculumType.forEach((t) => parts.push(KG_CURRICULUM_SUBTYPE_LABELS[t] || t));
    labels.push(`課程: ${parts.join(", ")}`);
  }

  if (state.kgPedagogy.length > 0) {
    const { KG_PEDAGOGY_LABELS } = require("@/constants/kg-filters");
    const pedagogyLabels = state.kgPedagogy.map((p) => KG_PEDAGOGY_LABELS[p] || p);
    labels.push(`教學特色: ${pedagogyLabels.join(", ")}`);
  }

  if (state.kgLanguageEnv.length > 0) {
    const { KG_LANGUAGE_ENV_LABELS } = require("@/constants/kg-filters");
    const langEnvLabels = state.kgLanguageEnv.map((l) => KG_LANGUAGE_ENV_LABELS[l] || l);
    labels.push(`語言環境: ${langEnvLabels.join(", ")}`);
  }

  return labels;
}

/**
 * 排序選項配置
 */
export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "relevance", label: "相關度" },
  { value: "tuition_low", label: "學費由低到高" },
  { value: "tuition_high", label: "學費由高到低" },
  { value: "name_asc", label: "名稱 A-Z" },
  { value: "name_desc", label: "名稱 Z-A" },
];
