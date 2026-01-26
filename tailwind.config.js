const { themeColors } = require("./theme.config");
const plugin = require("tailwindcss/plugin");

const tailwindColors = Object.fromEntries(
  Object.entries(themeColors).map(([name, swatch]) => [
    name,
    {
      DEFAULT: `var(--color-${name})`,
      light: swatch.light,
      dark: swatch.dark,
    },
  ]),
);

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  // Scan all component and app files for Tailwind classes
  content: ["./app/**/*.{js,ts,tsx}", "./components/**/*.{js,ts,tsx}", "./lib/**/*.{js,ts,tsx}", "./hooks/**/*.{js,ts,tsx}"],

  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: tailwindColors,
      // 🎨 Soft Minimalist Design System (from UI Place image)
      borderRadius: {
        'card': '24px',        // rounded-3xl equivalent
        'tag': '12px',         // rounded-xl equivalent
        'button': '20px',      // rounded-2xl+ equivalent
      },
      boxShadow: {
        'soft': '0 8px 24px rgba(0, 0, 0, 0.06)',      // Soft diffused shadow
        'soft-lg': '0 12px 32px rgba(0, 0, 0, 0.08)',  // Larger soft shadow
        'soft-sm': '0 4px 16px rgba(0, 0, 0, 0.04)',   // Small soft shadow
      },
    },
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant("light", ':root:not([data-theme="dark"]) &');
      addVariant("dark", ':root[data-theme="dark"] &');
    }),
  ],
};
