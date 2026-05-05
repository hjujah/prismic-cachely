export default (callback) => {
	const appStore = useAppStore()
	const { fontsLoaded } = storeToRefs(appStore)
	watch(fontsLoaded, callback)
	onMounted(() => {
		if (fontsLoaded.value) {
			callback()
		}
	})
	return fontsLoaded
}
