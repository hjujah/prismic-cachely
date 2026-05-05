export default (id, start) => {
	const { height } = useWindowSize()
	const { $bus } = useNuxtApp()
	let isSelected = useSelectedHash(id)

	watch(isSelected, (val) => {
		if (val) {
			$bus.$emit("scrollTo", start.value + height.value)
		}
	})
	onMounted(() => {
		if (isSelected.value) {
			setTimeout(() => {
				$bus.$emit("scrollTo", start.value + height.value)
			})
		}
	})
}
