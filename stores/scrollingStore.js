export const useScrollingStore = defineStore("scrolling", () => {
	const scrollTop = ref(0)
	const scrollingDown = ref(true)
	const scrollingLeft = ref(true)
	const scrollingStarted = computed(() => scrollTop.value > 50)
	const navigationVisible = ref(true)
	const totalScroll = ref(0)
	const scrollingDisabled = ref(false)

	let prevScrollUp = 0

	// show menu after 100px of scrolling up
	const show_distance = 0

	watch(scrollTop, (val, oldVal) => {
		scrollingDown.value = val > oldVal
		navigationVisible.value = scrollingDown.value
			? !scrollingStarted.value
			: val < prevScrollUp - show_distance || !scrollingStarted.value
	})

	watch(scrollingDown, (val) => {
		if (!val) {
			prevScrollUp = scrollTop.value
		}
	})

	return {
		scrollTop,
		scrollingDown,
		scrollingLeft,
		scrollingStarted,
		navigationVisible,
		scrollingDisabled,
		totalScroll
	}
})
