export default ({ el, startOffset, endOffset, outerEl, moveOffset, cssSticky, emit }) => {
	const { height } = useWindowSize()

	// get inner element dimensions
	const _innerBounds = useGetElementBounds(el)

	const innerBounds = computed(() => {
		let _bounds = _innerBounds.value
		_bounds.y = outerBounds.value.y

		return _bounds
	})

	// calculate total move of the element
	const move = computed(
		() => outerBounds.value.height - innerBounds.value.height - moveOffset.value
	)

	// calc start offset of the element
	const _startOffset = computed(
		() => startOffset.value + Math.min(height.value, innerBounds.value.y)
	)

	// calc end offset of the element
	const _endOffset = computed(() => {
		let end = move.value - outerBounds.value.height - height.value - endOffset.value
		// end -= props.cssSticky ? props.startOffset : 0
		// check this line in all use cases

		end -= startOffset.value

		return end
	})

	// get current progress of the element
	const { elementBounds: outerBounds, currentProgress } = useScrollingElement({
		el: outerEl,
		startOffset: _startOffset,
		endOffset: _endOffset
	})

	watch(currentProgress, (value) => {
		emit("update:progress", value)
	})

	const currentTop = computed(() => (cssSticky.value ? 0 : currentProgress.value * move.value))

	const elStyle = computed(() => ({
		transform: cssSticky.value ? "none" : `translate3d(0, ${currentTop.value}px, 0)`
	}))

	return {
		elStyle,
		currentProgress
	}
}
