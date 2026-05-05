// https://router.vuejs.org/api/interfaces/routeroptions.html

export default {
	routes: (_routes) => {
		const isDev = process.env.NODE_ENV === "development"

		// const config = useRuntimeConfig()

		const routes = _routes.filter((route) => {
			return isDev || !route.path.startsWith("/dev")
		})

		// PUSH MORE ROUTES HERE
		// routes.push({
		// 	name: "job-detail",
		// 	path: "/careers/job",
		// 	component: () => import("~/pages/JobDetail.vue").then((r) => r.default || r)
		// })

		return routes
	},

	scrollBehavior(to, from, savedPosition) {
		// save position when navigating next/back in browser history
		// used later in page transition
		const appStore = useAppStore()
		const { savedScrollingPosition } = storeToRefs(appStore)
		savedScrollingPosition.value = savedPosition
		if (savedPosition) return

		// scroll to anchors
		if (
			to.hash &&
			to.path == from.path &&
			process.client &&
			typeof document !== "undefined"
		) {
			// removed since it was not working on the pagination change on news listing
			// const hash = to.hash.startsWith("#") ? to.hash.slice(1) : to.hash

			if (!to.hash) {
				return { top: 0, left: 0 }
			}

			const scrollToElement = document.querySelector(to.hash)

			if (!scrollToElement) {
				console.log("usao ovde", scrollToElement, to, to.hash)
				let scrollTo = to.hash == "#top" ? 0 : scrollToElement
				return
			}

			const { $bus } = useNuxtApp()

			setTimeout(() => {
				$bus.$emit("scrollTo", scrollToElement)
			}, 0)

			return { top: scrollToElement.offsetTop, left: 0 }
		}

		return
	}
}
