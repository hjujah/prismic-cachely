export default (element, callback, fixed) => {
	const scrollTop = inject("scrollTop", 0)
	const bounds = ref({})
	const { $bus } = useNuxtApp()

	const update = () => {
		if (!element.value) {
			return
		}

		let el = element.value instanceof HTMLElement ? element.value : element.value.$el

		if (!el) {
			console.warn("[useGetElementBounds.js] Element not found")
			return
		}

		bounds.value = el.getBoundingClientRect()

		if (!fixed) {
			bounds.value.y += scrollTop.value || 0
		}

		// remove gsap offset
		// const gsapY = parseFloat(el._gsap?.y)
		// if (!isNaN(gsapY)) {
		// 	bounds.value.y -= gsapY
		// }
		// if (Math.round(bounds.value.y) == 0) {
		// 	bounds.value.y = 0
		// }

		callback && callback(bounds.value)
	}

	useResizeObserver(element, update)

	onMounted(() => {
		$bus.$on("resize", update)

		setTimeout(() => {
			if (!element.value) {
				return console.warn("[useGetElementBounds.js] Element not found")
			}

			let el = element.value instanceof HTMLElement ? element.value : element.value.$el
			let scroller = el.closest instanceof Function ? el.closest(".scroller") : null

			useResizeObserver(scroller, update)
		})
	})

	onUnmounted(() => {
		$bus.$off("resize", update)
	})

	return bounds
}
