const modules = [
  "@pinia/nuxt",
  "@nuxt/image",
  // "@nuxt/scripts",
  // "@nuxt/content",
  "@nuxtjs/tailwindcss",
  "@nuxtjs/device",
  "@nuxtjs/robots",
  "@nuxtjs/prismic",
  "@vueuse/nuxt",
  // "@vite-pwa/nuxt",
  "@vee-validate/nuxt",
  "nuxt-font-loader",
  "@nuxtjs/sitemap"
  // "nuxt-delay-hydration"
]

if (process.env.NODE_ENV !== "development") modules.push("nuxt-security")

export default modules
