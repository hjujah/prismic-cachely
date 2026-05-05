export default ({ orientation, el, emit, delay }) => {
	useTween({
		el,
		emit,
		to: ref({
			opacity: 0,
			scale: 1.1,
			x: orientation == "Left" ? -25 : 25,
			transformOrigin: `bottom ${orientation == "Left" ? "right" : "left"}`,
			duration: 0.25,
			delay,
			ease: "linear",
			clearProps: "auto"
		}),
		paused: computed(() => false)
	})
}
