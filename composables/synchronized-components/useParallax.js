/**
 * Parallax Composable
 *
 * This composable calculates the necessary values for creating a parallax effect on a
 * given element. It calculates the start and end offsets based on various factors such
 * as window dimensions, element properties, and user-defined factors. The composable
 * supports both wrapped and unwrapped elements and allows for customizing the parallax
 * behavior with options like noScale, ignoreNoScale, and noOverscroll.
 *
 * @param {Object} params - The composable parameters.
 * @param {Ref} params.elementBounds - The reactive ref representing the element's bounding box.
 * @param {Boolean} params.wrapped - A boolean indicating whether the element is wrapped.
 * @param {Number} params.factor - The parallax factor (multiplier) for the element's movement.
 * @param {Boolean} params.ignoreNoScale - A boolean flag to ignore scaling constraints.
 * @param {Boolean} params.relativeToElement - A boolean flag to calculate relative height based on the element.
 * @param {Boolean} params.noOverscroll - A boolean flag to disable overscroll behavior.
 * @param {Boolean} params.noOffset - A boolean flag to disable parallax offsetting.
 *
 * @returns {Object} - An object containing reactive variables:
 *   - elHeight: The calculated height of the parallax element.
 *   - elTop: The calculated top offset for the parallax effect.
 *   - move: The calculated movement value based on the parallax factor and other factors.
 *   - elStyle: An object containing CSS styles for the parallax element (height and top).
 *   - startOffset: The calculated starting offset for the parallax effect.
 *   - endOffset: The calculated ending offset for the parallax effect.
 */

export default ({
	elementBounds,
	wrapped,
	factor,

	ignoreNoScale,
	relativeToElement,
	noOverscroll,
	noOffset,

	disabled
}) => {
	// get window dimensions
	const height = useWindowHeight()

	const { isMobileOrTablet } = useDevice()

	//is above the fold and overscroll is disabled
	const _noOverscroll = computed(
		() => noOverscroll && elementBounds.value.y < height.value
	)
	const _distanceFromStart = computed(() => elementBounds?.value?.y - height.value)

	// start offset for the parallax
	const startOffset = computed(() => {
		let offset = 0

		if (_noOverscroll.value) {
			offset -= _distanceFromStart.value
		}

		// if element is wrapped don't add the top offset since it's oveflowing
		if (wrapped) {
			return offset
		}

		// add top offset for unwrapped elements
		return offset + elTop.value
	})

	// end offset for the parallax
	const endOffset = computed(() => {
		let offset = 0

		if (!wrapped) {
			offset += move.value + elTop.value
		}

		return offset
	})

	// calculate move value
	const appStore = useAppStore()
	const { initialVh } = storeToRefs(appStore)
	const move = computed(() => {
		let relativeHeight = relativeToElement ? elementBounds.value.height : height.value

		if (process.client && isMobileOrTablet) {
			relativeHeight = initialVh.value * 100
		}

		return isFinite(relativeHeight) ? Math.ceil(relativeHeight * factor) : 0
	})

	const theOffset = computed(() => {
		let h = process.client && isMobileOrTablet ? initialVh.value * 100 : height.value

		let totalroad = Math.max(h, elementBounds.value.height) + elementBounds.value.height
		let totalroad2 = totalroad - elementBounds.value.height

		let y = totalroad2 / totalroad

		return -move.value * y
	})

	// calculate element top offset
	const elTop = computed(() => {
		if (disabled?.value) {
			return 0
		}

		if (noOffset) return 0

		if (!wrapped) {
			return 0
		}

		// if element is not wrapped and noOverscroll return 0
		if (!wrapped && _noOverscroll.value) return 0

		// if wrapped element is touching the top of the element
		if (wrapped && elementBounds.value.y == 0 && _noOverscroll.value) {
			return 0
		}

		return theOffset.value
	})

	// calculate element height
	const elHeight = computed(() => {
		let elHeight = Math.ceil(elementBounds.value.height)

		// if element is not wrapped or it shouldn't be scaled return the element height
		if (!wrapped || noScale.value || disabled?.value) {
			return elementBounds.value.height || "auto"
		}

		let windowH = height.value
		if (process.client && isMobileOrTablet) {
			windowH = initialVh.value * 100
		}

		// @TODO REFACTOR
		let totalroad =
			Math.max(windowH, elementBounds.value.height) + elementBounds.value.height
		let totalroad2 = totalroad - windowH + elementBounds.value.height
		let y = 1 - totalroad2 / totalroad

		return elHeight + y * move.value
	})

	// check if scaling is disabled
	const noScale = computed(() => {
		return height.value == elementBounds?.value.height && factor > 0 && !ignoreNoScale
	})

	const elStyle = computed(() => {
		if (process.server) {
			return
		}

		return {
			height:
				wrapped && elHeight.value && elHeight.value != "auto"
					? `${elHeight.value}px`
					: "auto",
			top: elTop.value ? `${elTop.value}px` : "auto"
		}
	})

	// return relevant variables
	return {
		elHeight,
		elTop,
		move,
		elStyle,
		startOffset,
		endOffset
	}
}
