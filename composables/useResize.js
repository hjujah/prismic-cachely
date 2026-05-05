
export default (onResize) => {
	const appStore = useAppStore()
	const { fontsLoaded } = storeToRefs(appStore)

	onMounted(() => {
		window.addEventListener('resize', onResize)
		onResize()
	})

	onUnmounted(() => {
		window.removeEventListener('resize', onResize)
	})

	watch(fontsLoaded, () => {
		setTimeout(onResize)
	})

}
