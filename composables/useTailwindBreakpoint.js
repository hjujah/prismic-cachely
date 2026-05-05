import _pickBy from "lodash/pickBy"
import _each from "lodash/each"

export default (breakpoint = "lg") => {
	const { theme } = useTheme()
	const { width: winWidth } = useWindowSize()

	const getActiveBreakpoint = (currentWidth) => {
		let allActive = _pickBy(theme.screens, (value) => currentWidth >= parseInt(value))

		let activeBreakpoint = Object.keys(allActive).reduce((a, b) =>
			parseInt(allActive[b]) > parseInt(allActive[a]) ? b : a
		)

		return activeBreakpoint
	}

	const breakpointActive = computed(
		() => winWidth?.value > parseInt(theme.screens[breakpoint])
	)

	const breakpointInactive = computed(
		() => winWidth?.value < parseInt(theme.screens[breakpoint])
	)

	const isExactBreakpointActive = computed(
		() => getActiveBreakpoint(winWidth?.value) === breakpoint
	)

	return { breakpointInactive, breakpointActive, isExactBreakpointActive }
}
