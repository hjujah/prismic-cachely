export default () => {
	const { height } = useWindowSize()
	const { isMobileOrTablet } = useDevice()

	const appStore = useAppStore()
	const { initialVh } = storeToRefs(appStore)

	const windowHeight = computed(() =>
		isMobileOrTablet ? initialVh.value * 100 : height.value
	)

	return windowHeight
}
