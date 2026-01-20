/**
 * KG Filter Constants
 *
 * Session and Language Environment filter options for kindergartens.
 */

// Re-export curriculum and pedagogy constants
export * from "./kg-curriculum";
export * from "./kg-pedagogy";

/** KG Session type (matches kg-database.ts) */
export type KGSession = "AM" | "PM" | "WD";

/** Session filter options */
export const KG_SESSION_OPTIONS: { label: string; value: KGSession }[] = [
  { label: "上午班", value: "AM" },
  { label: "下午班", value: "PM" },
  { label: "全日班", value: "WD" },
];

/** Session labels for display */
export const KG_SESSION_LABELS: Record<KGSession, string> = {
  AM: "上午班",
  PM: "下午班",
  WD: "全日班",
};

/** KG Language Environment type */
export type KGLanguageEnv = "cantonese" | "english" | "putonghua" | "trilingual" | "bilingual" | "native_english";

/** Language environment filter options (core selections) */
export const KG_LANGUAGE_ENV_OPTIONS: { label: string; value: KGLanguageEnv }[] = [
  { label: "粵語", value: "cantonese" },
  { label: "英語", value: "english" },
  { label: "普通話", value: "putonghua" },
  { label: "兩文三語", value: "trilingual" },
];

/** Full language environment labels */
export const KG_LANGUAGE_ENV_LABELS: Record<KGLanguageEnv, string> = {
  cantonese: "粵語",
  english: "英語",
  putonghua: "普通話",
  trilingual: "兩文三語",
  bilingual: "雙語",
  native_english: "英語為母語",
};

/**
 * Format language environment for display
 */
export function formatLanguageEnvDisplay(langs: string[]): string {
  if (!langs || langs.length === 0) return "";
  return langs
    .map((lang) => KG_LANGUAGE_ENV_LABELS[lang as KGLanguageEnv] || lang)
    .join("、");
}
