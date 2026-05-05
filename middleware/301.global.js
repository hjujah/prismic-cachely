import redirects from "../301.json"
export default defineNuxtRouteMiddleware((to, from) => {
	const redirect = redirects.find((r) => r.from === to.path)

	if (!redirect) return

	return navigateTo(redirect.to, { external: redirect.to.includes("http") })
})
