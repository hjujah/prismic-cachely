export default {
	// 	injectRegister: "auto",
	registerType: "autoUpdate",
	manifest: {
		name: "InHouse",
		short_name: "InHouse",
		start_url: "/",
		theme_color: "#ffffff",
		icons: [
			{
				src: "/favicon.png",
				sizes: "180x180",
				type: "image/png"
			},
			{
				src: "/favicon.png",
				sizes: "512x512",
				type: "image/png"
			},
			{
				src: "/favicon.png",
				sizes: "512x512",
				type: "image/png",
				purpose: "any maskable"
			}
		]
	},
	workbox: {
		navigateFallback: "/",
		globPatterns: ["**/*.{js,css,html,png,svg,ico}"]
	},
	client: {
		installPrompt: true,
		// you don't need to include this: only for testing purposes
		// if enabling periodic sync for update use 1 hour or so (periodicSyncForUpdates: 3600)
		periodicSyncForUpdates: 20
	},
	devOptions: {
		enabled: true,
		suppressWarnings: true,
		navigateFallbackAllowlist: [/^\/$/],
		type: "module"
	}
}
