import { createGtm } from "@gtm-support/vue-gtm"
import appConfig from "~/config/app"

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.use(
		createGtm({
			id: appConfig.GTM_id,
			defer: false,
			compatibility: false,
			enabled: true,
			debug: false,
			loadScript: true,
			vueRouter: useRouter(),
			trackOnNextTick: false
		})
	)
})
