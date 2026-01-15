import React, { createContext, useReducer, ReactNode } from "react";

import type { Curriculum, Language, SchoolCategory, District, District18 } from "@/types/school";
import type { ExtendedCategory } from "@/constants/kg-nature";

// 排序選項類型
export type SortOption = "relevance" | "tuition_low" | "tuition_high" | "name_asc" | "name_desc";

export interface FilterState {
  tuitionRange: { min: number; max: number } | null;
  curriculum: Curriculum[];
  language: Language | null;
  category: ExtendedCategory[];  // Extended to include KG-specific categories
  district: District[];
  district18: District18[];  // 18區篩選
  sortBy: SortOption;
}

export type FilterAction =
  | { type: "SET_TUITION_RANGE"; payload: { min: number; max: number } }
  | { type: "CLEAR_TUITION_RANGE" }
  | { type: "TOGGLE_CURRICULUM"; payload: Curriculum }
  | { type: "SET_LANGUAGE"; payload: Language }
  | { type: "CLEAR_LANGUAGE" }
  | { type: "TOGGLE_CATEGORY"; payload: ExtendedCategory }
  | { type: "TOGGLE_DISTRICT"; payload: District }
  | { type: "TOGGLE_DISTRICT18"; payload: District18 }
  | { type: "CLEAR_DISTRICT18" }
  | { type: "SET_SORT"; payload: SortOption }
  | { type: "RESET_FILTERS" };

const initialState: FilterState = {
  tuitionRange: null,
  curriculum: [],
  language: null,
  category: [],
  district: [],
  district18: [],
  sortBy: "relevance",
};

function filterReducer(state: FilterState, action: FilterAction): FilterState {
  switch (action.type) {
    case "SET_TUITION_RANGE":
      return { ...state, tuitionRange: action.payload };

    case "CLEAR_TUITION_RANGE":
      return { ...state, tuitionRange: null };

    case "TOGGLE_CURRICULUM": {
      const updated = state.curriculum.includes(action.payload)
        ? state.curriculum.filter((c) => c !== action.payload)
        : [...state.curriculum, action.payload];
      return { ...state, curriculum: updated };
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
    state.tuitionRange !== null ||
    state.curriculum.length > 0 ||
    state.language !== null ||
    state.category.length > 0 ||
    state.district.length > 0 ||
    state.district18.length > 0
  );
}

/**
 * 獲取活躍篩選條件的人類可讀描述
 */
export function getFilterLabels(state: FilterState): string[] {
  const labels: string[] = [];

  if (state.tuitionRange) {
    const { min, max } = state.tuitionRange;
    if (max === Infinity) {
      labels.push(`學費: ${min.toLocaleString()} 以上`);
    } else {
      labels.push(`學費: ${min.toLocaleString()}-${max.toLocaleString()}`);
    }
  }

  if (state.curriculum.length > 0) {
    labels.push(`課程: ${state.curriculum.join(", ")}`);
  }

  if (state.language) {
    labels.push(`語言: ${state.language}`);
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
