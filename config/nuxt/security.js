const baseUrl = process.env.BASE_URL || "http://localhost:3000"

export default {
	/**
	 * Hide X-Powered-By header
	 * Nuxt-security module hides this header by default
	 */
	// hidePoweredBy: false,

	/**
	 * CORS Handler
	 *
	 * Set roules for Cross Origin Resource Sharing.
	 * This is a middleware based on built in H3 CORS functionality.
	 *
	 * Documentation:
	 * @SEE https://nuxt-security.vercel.app/documentation/middleware/cors-handler
	 *
	 * MDN Web Docs:
	 * @SEE https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
	 */
	// corsHandler: {
	// 	origin: baseUrl
	// 	// methods: '*',
	// 	// credentials: true
	// },

	// @NOTE important
	nonce: true,

	/**
	 * Headers:
	 * - strictTransportSecurity
	 * - crossOriginResourcePolicy
	 * - xFrameOptions
	 * - xContentTypeOptions
	 * - referrerPolicy
	 * - xXSSProtection
	 */
	headers: {
		/**
		 * Strict-Transport-Security
		 *
		 * The HTTP Strict-Transport-Security response header (often abbreviated as HSTS)
		 * informs browsers that the site should only be accessed using HTTPS, and that any
		 * future attempts to access it using HTTP should automatically be converted to HTTPS.
		 *
		 * By default, Nuxt Security will set following value for this header.
		 * ```
		 * Strict-Transport-Security: max-age=15552000; includeSubDomains;
		 * ```
		 *
		 * Refernt Max Age values:
		 * - 300 seconds = 5 minutes
		 * - 604800 seconds = 1 week
		 * - 2592000 seconds = 30 days
		 * - 15552000 seconds = 180 days
		 * - 31536000 seconds = 1 year
		 *
		 * Options:
		 * - maxAge: The time, in seconds, that the browser should remember that a site is only to be accessed using HTTPS.
		 * - includeSubdomains: If specified, this rule applies to all of the site's subdomains as well.
		 * - preload: When using preload, the max-age directive must be at least 31536000 (1 year), and the includeSubDomains directive must be present
		 *
		 * ## MUST READ: Deployment Recommendations
		 * @SEE https://hstspreload.org/#deployment-recommendations
		 *
		 * Documentation:
		 * @SEE https://nuxt-security.vercel.app/documentation/headers/stricttransportsecurity
		 *
		 * MDN Web Docs:
		 * @SEE https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
		 */
		strictTransportSecurity:
			process.env.NODE_ENV !== "development"
				? {
						maxAge: 300,
						includeSubdomains: true,
						preload: false
					}
				: false,

		/**
		 * Cross-Origin-Resource-Policy
		 *
		 * Protect against certain requests from other origins. CORP is a security feature
		 * that allows websites to specify which origins can load their resources. It is
		 * designed to prevent other websites from accessing a site's resources
		 * without permission.
		 *
		 * By default, Nuxt Security will set following value for this header.
		 * ```
		 * Cross-Origin-Resource-Policy: same-origin
		 * ```
		 *
		 * Options:
		 * - 'same-site': Only requests from the same Site can read the resource.
		 * - 'same-origin': Only requests from the same origin (i.e. scheme + host + port) can read the resource.
		 * - 'cross-origin': Requests from any origin (both same-site and cross-site) can read the resource.
		 * - false
		 *
		 * Documentation:
		 * @SEE https://nuxt-security.vercel.app/documentation/headers/crossoriginresourcepolicy
		 *
		 * MDN Web Docs:
		 * @SEE https://developer.mozilla.org/en-US/docs/Web/HTTP/Cross-Origin_Resource_Policy
		 */
		crossOriginResourcePolicy: "same-origin",

		// @NOTE this influence cross origin svgs (prismic svg images)
		crossOriginEmbedderPolicy: false,

		/**
		 * X-Frame-Options
		 *
		 * The X-Frame-Options HTTP response header can be used to indicate whether a browser
		 * should be allowed to render a page in a <frame>, <iframe>, <embed> or <object>.
		 * Sites can use this to avoid click-jacking attacks, by ensuring that their content
		 * is not embedded into other sites.
		 *
		 * By default, Nuxt Security will set following value for this header.
		 * ```
		 * X-Frame-Options: SAMEORIGIN
		 * ```
		 *
		 * Options:
		 * - DENY: The page cannot be displayed in a frame, regardless of the site attempting to do so.
		 * - SAMEORIGIN: The page can only be displayed if all ancestor frames are same origin to the page itself.
		 *
		 * Documentation:
		 * @SEE https://nuxt-security.vercel.app/documentation/headers/xframeoptions
		 *
		 * MDN Web Docs:
		 * @SEE https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
		 */
		xFrameOptions: "SAMEORIGIN",

		/**
		 * X-Content-Type-Options
		 *
		 * The X-Content-Type-Options response HTTP header is a marker used by the server
		 * to indicate that the MIME types advertised in the Content-Type headers should
		 * be followed and not be changed. The header allows you to avoid MIME type
		 * sniffing by saying that the MIME types are deliberately configured.
		 *
		 * By default, Nuxt Security will set following value for this header.
		 * ```
		 * X-Content-Type-Options: nosniff
		 * ```
		 *
		 * Options:
		 * - nosniff: Blocks a request if the request's MIME type does not match the type specified in the Content-Type header.
		 * - false
		 *
		 * Documentation:
		 * @SEE https://nuxt-security.vercel.app/documentation/headers/xcontenttypeoptions
		 *
		 * MDN Web Docs:
		 * @SEE https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
		 */
		xContentTypeOptions: "nosniff",

		/**
		 * Referrer-Policy
		 *
		 * The Referrer-Policy HTTP header controls how much referrer information (sent
		 * with the Referer header) should be included with requests. Aside from the
		 * HTTP header, you can set this policy in HTML.
		 *
		 * By default, Nuxt Security will set following value for this header.
		 * ```
		 * Referrer-Policy: no-referrer
		 * ```
		 *
		 * Options:
		 * - no-referrer: The Referer header will be omitted: sent requests do not include any referrer information.
		 * - (See documentation for more options)
		 *
		 * Documentation:
		 * @SEE https://nuxt-security.vercel.app/documentation/headers/referrerpolicy
		 *
		 * MDN Web Docs:
		 * @SEE https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
		 *
		 */
		referrerPolicy: "no-referrer",

		/**
		 * X-XSS-Protection
		 *
		 * Stop pages from loading when they detect reflected cross-site scripting (XSS).
		 *
		 * By default, Nuxt Security will set following value for this header.
		 * ```
		 * X-XSS-Protection: 0
		 * ```
		 *
		 * Options:
		 * - "0": Disables XSS filtering.
		 * - "1": Enables XSS filtering (usually default in browsers). If a cross-site scripting attack is detected, the browser will sanitize the page (remove the unsafe parts).
		 * - "1; mode=block": Enables XSS filtering. Rather than sanitizing the page, the browser will prevent rendering of the page if an attack is detected.
		 *
		 * Documentation:
		 * @SEE https://nuxt-security.vercel.app/documentation/headers/xxssprotection
		 *
		 * MDN Web Docs:
		 * @SEE https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-XSS-Protection
		 */
		xXSSProtection: "1; mode=block",

		/**
		 * Content Security Policy
		 *
		 * ```
		 * Content-Security-Policy:
		 * 	base-uri 'none';
		 *  default-src 'none';
		 *  connect-src 'self' https:;
		 *  font-src 'self' https: data:;
		 *  form-action 'self';
		 *  frame-ancestors 'self';
		 *  frame-src 'self';
		 *  img-src 'self' data:;
		 *  manifest-src 'self';
		 *  media-src 'self';
		 *  object-src 'none';
		 *  script-src-attr 'none';
		 *  style-src 'self' https: 'unsafe-inline';
		 *  script-src 'self' https: 'unsafe-inline' 'strict-dynamic' 'nonce-{{nonce}}';
		 *  upgrade-insecure-requests;
		 *  worker-src 'self';
		 * ```
		 *
		 * Documentations:
		 * @SEE https://nuxt-security.vercel.app/documentation/headers/csp#content-security-policy
		 *
		 * MDN Web Docs:
		 * @SEE https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
		 */
		contentSecurityPolicy: {
			/**
			 * CSP: base-uri
			 *
			 * Disables the use of the <base> element in your HTML documents
			 */
			"base-uri": ["'none'"],

			/**
			 * The default-src directive is a fallback for most other directives.
			 * If a specific directive (like script-src or img-src) is not specified,
			 * the browser will apply the default-src policy.
			 */
			// 'default-src': [ '*', "'self'", "'unsafe-inline'", "'unsafe-eval'", ],
			"default-src": [
				"'self'",
				"https:",
				"*.ometria.com",
				"*.prismic.io",
				"*.6sense.com",
				"*.typeform.com",
				"*.youtube.com",
				"youtube.com",
				"*.youtube-nocookie.com",
				"*.hubspot.com",
				"*.geoplugin.net",
				"ometria.workable.com",
				"*.hotjar.com",
				"player.vimeo.com",
				"cookie-cdn.cookiepro.com",
				"www.google.com",
				"www.google.co.uk",
				"w3.org"
			],

			/**
			 * The `script-src` directive controls which sources can be used to load scripts (JS)
			 *
			 * ## Enables CSP nonce support for scripts in SSR mode, supported by almost any browser (level 2)
			 * `'nonce-{{nonce}}'`
			 *
			 * ## Strict CSP via 'strict-dynamic', supported by most modern browsers (level 3)
			 * `'strict-dynamic'`
			 * - only works for the 'script-src' policy
			 * - cancels external whitelists, it's not possible to allow external scripts by name anymore
			 *
			 * Allow everything:
			 * ```
			 * [ '*', "'self'", "'unsafe-inline'", "'unsafe-eval'", ]
			 * ```
			 *
			 */
			// 'script-src': [ '*', "'self'", "'unsafe-inline'", "'unsafe-eval'", ],
			"script-src": [
				"'self'",
				"https:",

				"'wasm-unsafe-eval'", // CSP + Rive (WASM) Issue

				"'unsafe-inline'", // Fallback value, will be ignored by almost any browser (level 2)
				"'strict-dynamic'", // Strict CSP via 'strict-dynamic', supported by most modern browsers (level 3)
				"'nonce-{{nonce}}'", // Enables CSP nonce support for scripts in SSR mode, supported by almost any browser (level 2)

				// Canceled by 'strict-dynamic', keep for legacy support (level 1)
				"*.prismic.io",
				"*.hsforms.net",
				"*.hsforms.com",
				"js.hs-scripts.com",
				"js.hsleadflows.net",
				"js.hs-analytics.net",
				"js.hsadspixel.net",
				"js.hs-banner.com",
				"cookie-cdn.cookiepro.com",
				"*.typeform.com",
				"*.facebook.net",
				"www.googleadservices.com",
				"googleads.g.doubleclick.net",
				"www.google.com",
				"www.google.co.uk",
				"www.googletagmanager.com",
				"www.gstatic.com",
				"www.google-analytics.com",
				"secure.easy7bear.com",
				"s.adroll.com",
				"*.hotjar.com",
				"d.adroll.com",
				"j.6sc.co",
				"snap.licdn.com"
			],

			/**
			 * The `style-src` directive controls which sources can be used to load stylesheets (CSS)
			 *
			 */
			"style-src": ["'self'", "https:", "'unsafe-inline'"],

			/**
			 * CSP: connect-src
			 *
			 * The `connect-src` directive restricts the URLs which can be loaded using
			 * script interfaces.
			 *
			 */
			"connect-src": [
				"'self'",
				"https:",
				"ws:", // check if this is needed
				"cookie-cdn.cookiepro.com",
				"*.analytics.google.com",
				"*.google.com",
				"*.google.co.uk",
				"www.google-analytics.com",
				"*.6sense.com",
				"*.adroll.com",
				"*.ads.linkedin.com",
				"*.hubapi.com",
				"*.hubspot.com",
				"*.hsforms.com",
				"js.hs-scripts.com",
				"hubspot-forms-static-embed.s3.amazonaws.com",
				"*.oribi.io",
				"*.hotjar.io",
				"*.6sc.co",
				"*.hotjar.com",
				"secure.adnxs.com",
				"geolocation.onetrust.com",
				"c.6sc.co",
				"ib.adnxs.com",
				"cookiepro.blob.core.windows.net"
			],

			/**
			 * CSP: img-src
			 *
			 * The `img-src` directive specifies valid sources of images and favicons.
			 *
			 * Default value:
			 * ```
			 * img-src 'self' data:;
			 * ```
			 */
			"img-src": [
				"'self'",
				"data:",
				"*.prismic.io",
				"*.cookiepro.com",
				"*.hsforms.net",
				"*.hsforms.com",
				"track.hubspot.com",
				"px.ads.linkedin.com",
				"www.google.com",
				"www.google.rs",
				"www.facebook.com",
			],

			/**
			 * CSP: frame-ancestors
			 *
			 * The `frame-ancestors` directive controls from where the protected resource can embed frames
			 *
			 * Default value:
			 * ```
			 * frame-ancestors 'self';
			 * ```
			 */
			"frame-ancestors": ["'self'", "ometria.prismic.io"],

			/**
			 * CSP: frame-src
			 *
			 * The `frame-src` directive specifies valid sources for nested browsing contexts
			 * loading using elements such as <frame> and <iframe>.
			 *
			 * Default value:
			 * ```
			 * frame-src 'self';
			 * ```
			 */
			"frame-src": [
				"'self'",
				"ometria.prismic.io",
				"*.hsforms.net",
				"*.hsforms.com",
				"*.google.com"
			],

			/**
			 * CSP: child-src
			 *
			 * The `child-src` directive defines the valid sources for web workers and nested
			 * browsing contexts loaded using elements such as <frame> and <iframe>.
			 *
			 */
			"child-src": ["'self'", "*.hsforms.com"],

			/**
			 * CSP: media-src
			 *
			 * The media-src directive specifies valid sources for loading media using the
			 * <audio> and <video> elements.
			 *
			 * Default value:
			 * ```
			 * media-src 'self';
			 * ```
			 */
			"media-src": ["'self'", "ometria.cdn.prismic.io"],

			/**
			 * CSP: object-src
			 *
			 * The `object-src` directive specifies valid sources for the <object> and <embed> elements.
			 *
			 * Default value:
			 * ```
			 * object-src 'none';
			 * ```
			 */
			// 'object-src': [ 'none' ],

			/**
			 * CSP: font-src
			 *
			 * The `font-src` directive specifies valid sources for fonts loaded using @font-face.
			 *
			 * Default value:
			 * ```
			 * font-src 'self' https: data:;
			 * ```
			 */
			"font-src": ["'self'", "https:", "data:"],

			"worker-src": ["'self'"],

			"manifest-src": ["'self'"],

			"form-action": ["'self'", "forms.hsforms.com"],

			/**
			 * CSP: upgrade-insecure-requests
			 *
			 * The `upgrade-insecure-requests` directive instructs user agents to treat all
			 * of a site's insecure URLs (those served over HTTP) as though they have been
			 * replaced with secure URLs (those served over HTTPS).
			 */
			"upgrade-insecure-requests": process.env.NODE_ENV !== "development" ? true : false
		}
	}
}
