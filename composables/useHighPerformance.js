import { gsap } from "gsap"

export default () => {
	onMounted(() => {
		const el = document.createElement("canvas")
		gsap.ticker.add(() => {
			try {
				el.getContext("webgl", { powerPreference: "high-performance" })
			} catch (e) {
				console.warn("something went wrong with forcing the high-performance")
			}
		})
	})
}
