/**
 * Browser-safe static theme values mirroring tailwind.config.js.
 * Do NOT import tailwindcss internals or tailwind.config.js here.
 *
 * screens = Tailwind v3 defaults + theme.extend.screens from tailwind.config.js
 * fontFamily = Tailwind v3 defaults (no custom fonts defined in config)
 */

export const screens = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
  "max-sm": { min: "0px", max: "639px" },
  "max-lg": { min: "375px", max: "1023px" },
  xxl: "1600px",
}

export const fontFamily = {
  sans: ["ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "Noto Sans", "sans-serif"],
  serif: ["ui-serif", "Georgia", "Cambria", "Times New Roman", "Times", "serif"],
  mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "Liberation Mono", "Courier New", "monospace"],
}
