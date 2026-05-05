export default {
	// The private keys which are only available within server-side
	apiSecret: "123",

	// Keys within public, will be also exposed to the client-side
	public: {
		baseUrl: process.env.BASE_URL,
		disabledCache: process.env.DISABLE_CACHE,
		staging: process.env.STAGING
	}
}
