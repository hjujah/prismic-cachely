/**
 * This module exports the resolved Tailwind configuration object.
 *
 * @module resolvedTailwindConfig
 */
import resolveConfig from "tailwindcss/resolveConfig"
import tailwindConfig from "@/tailwind.config.js"
export default () => resolveConfig(tailwindConfig)
