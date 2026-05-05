export default () => {
	const { orientation } = useScreenOrientation()
	const appStore = useAppStore()
	const { initialVh } = storeToRefs(appStore)

	const setInitialVh = (e) => {
		// setTimeout(() => {
		initialVh.value = window.innerHeight * 0.01
		document.documentElement.style.setProperty("--initial-vh", `${initialVh.value}px`)
		console.log("initialVh", initialVh.value, window.innerHeight)
		// })
	}

	// useHead({
	// 	htmlAttrs: {
	// 		style: "--initial-vh:1vh;"
	// 	}
	// })

	watch(orientation, (val, oldVal) => setTimeout(setInitialVh, 600))

	onBeforeMount(() => {
		let portrait = window.matchMedia("(orientation: portrait)")
		portrait.addEventListener("change", setInitialVh)

		setInitialVh()
	})
}
