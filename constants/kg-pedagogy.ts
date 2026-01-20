/**
 * KG Teaching Features (Pedagogy) Constants
 *
 * 5 high-level groups with underlying subcategory breakdowns.
 * Used for filtering and "?" popover display.
 */

/** Pedagogy tag type (matches kg-database.ts) */
export type KGPedagogyTag = "special_curriculum" | "play_explore" | "project_learn" | "language_dev" | "holistic";

/** Pedagogy filter options (5 groups) */
export const KG_PEDAGOGY_OPTIONS: { label: string; value: KGPedagogyTag }[] = [
  { label: "特色課程", value: "special_curriculum" },
  { label: "遊戲探索", value: "play_explore" },
  { label: "專題學習", value: "project_learn" },
  { label: "語言發展", value: "language_dev" },
  { label: "全人發展", value: "holistic" },
];

/** Labels for display */
export const KG_PEDAGOGY_LABELS: Record<KGPedagogyTag, string> = {
  special_curriculum: "特色課程",
  play_explore: "遊戲探索",
  project_learn: "專題學習",
  language_dev: "語言發展",
  holistic: "全人發展",
};

/**
 * Detailed breakdown of each pedagogy category
 * Used for "?" popover display
 */
export interface PedagogyBreakdown {
  tag: KGPedagogyTag;
  label: string;
  description: string;
  subcategories: string[];
}

export const KG_PEDAGOGY_BREAKDOWN: PedagogyBreakdown[] = [
  {
    tag: "special_curriculum",
    label: "特色課程",
    description: "採用特定教育理念或國際認可課程體系",
    subcategories: [
      "蒙特梭利 (Montessori)",
      "瑞吉歐 (Reggio Emilia)",
      "高瞻課程 (HighScope)",
      "華德福 (Waldorf)",
      "IB PYP (國際文憑)",
    ],
  },
  {
    tag: "play_explore",
    label: "遊戲探索",
    description: "以遊戲和探索為核心的學習方式",
    subcategories: [
      "遊戲中學習",
      "活動教學",
      "感官探索",
      "多感官學習",
      "探究式學習",
    ],
  },
  {
    tag: "project_learn",
    label: "專題學習",
    description: "以專題或主題統整各學習領域",
    subcategories: [
      "專題研習",
      "方案教學 (Project Approach)",
      "主題教學",
      "建構式學習",
    ],
  },
  {
    tag: "language_dev",
    label: "語言發展",
    description: "重視語言能力培養和閱讀興趣",
    subcategories: [
      "繪本教學",
      "全語文教學",
      "閱讀培養",
    ],
  },
  {
    tag: "holistic",
    label: "全人發展",
    description: "注重兒童身心靈全面均衡發展",
    subcategories: [
      "兒童為本教育",
      "品德教育",
      "多元智能",
      "藝術教育",
      "小組學習",
      "混齡教學",
      "STEM/STEAM/創客教育",
    ],
  },
];

/**
 * Get breakdown for a specific pedagogy tag
 */
export function getPedagogyBreakdown(tag: KGPedagogyTag): PedagogyBreakdown | undefined {
  return KG_PEDAGOGY_BREAKDOWN.find((b) => b.tag === tag);
}
