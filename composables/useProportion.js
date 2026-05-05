javascript
/**
 * Generates responsive proportion values based on a provided object
 * @param {string|number|Object} proportionObj - The object containing proportion values
 * @return {Object} - An object with proportional values for each screen breakpoint
 */
import _isString from "lodash/isString"
import _isNumber from "lodash/isNumber"
import _isObject from "lodash/isObject"
import _each from "lodash/each"
import _get from "lodash/get"

import resolveConfig from "tailwindcss/resolveConfig"
import tailwindConfig from "@/tailwind.config.js"

export default (proportionObj) => {
	// If proportionObj is falsy, return undefined
	if (!proportionObj) {
		return
	}

	// Initialize proportion to 0
	let proportion = ref(0)

	// Get the full Tailwind CSS config
	const fullConfig = resolveConfig(tailwindConfig)
	// Get the screen breakpoints from the config
	const screens = fullConfig.theme.screens
	// Override the default "sm" screen breakpoint with "xs"
	screens.xs = "0px"

	/**
	 * Generates the proportional values for each screen breakpoint
	 * @param {Object} proportionObj - The object containing proportion values
	 * @return {Object} - An object with proportional values for each screen breakpoint
	 */
	const generateProportions = (proportionObj) => {
		let vars = {}

		_each(screens, (value, breakpoint) => {
			// Proportion is same for all breakpoints
			if (_isString(proportionObj) || _isNumber(proportionObj)) {
				vars[breakpoint] = `${proportionObj * 100}%`
			}
			// Exact match for a breakpoint
			else if (_get(proportionObj, breakpoint)) {
				vars[breakpoint] = `${proportionObj[breakpoint] * 100}%`
			}
			// Find the previous breakpoint with a value set
			else if (_isObject(proportionObj)) {
				let loc = Object.keys(screens).indexOf(breakpoint)
				for (let i = loc; i >= 0; --i) {
					let previousBreakpoint = Object.keys(screens)[i]
					let previousProportion = proportionObj[previousBreakpoint]
					if (previousProportion) {
						vars[breakpoint] = `${previousProportion * 100}%`
						return
					}
				}
			}
		})

		return vars
	}

	return generateProportions(proportionObj)
}
