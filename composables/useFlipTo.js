export default ({ from, to, ease = ref("Power2.easeInOut") }) => {
	const toBounds = useGetElementBounds(to)
	const fromBounds = useGetElementBounds(from)

	const fromTransforms = computed(() => {
		return {
			width: fromBounds.value.width,
			height: fromBounds.value.height,
			top: 0
		}
	})

	const toTransforms = computed(() => {
		return {
			width: toBounds.value.width,
			height: toBounds.value.height,
			top: toBounds.value.top - fromBounds.value.top,
			ease: ease.value
		}
	})

	return { fromTransforms, toTransforms, fromBounds, toBounds }
}
