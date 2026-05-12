/**
 * Returns a resolved-theme-like object for browser-safe access to Tailwind values.
 * Reads from utils/themeConfig.js — no Tailwind CJS internals in browser runtime.
 *
 * @module useTheme
 */
import { screens, fontFamily } from "@/utils/themeConfig.js"

export default () => ({
  theme: {
    screens,
    fontFamily,
  },
})
