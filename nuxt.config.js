// https://nuxt.com/docs/api/configuration/nuxt-config

import components from "./config/nuxt/components"
import nitro from "./config/nuxt/nitro"
import fontLoader from "./config/nuxt/fontLoader"
// import pwa from "./config/nuxt/pwa"
import vite from "./config/nuxt/vite"
import tailwindcss from "./config/nuxt/tailwindcss"
import prismic from "./config/nuxt/prismic"
import sitemap from "./config/nuxt/sitemap"
import veeValidate from "./config/nuxt/veeValidate"
import image from "./config/nuxt/image"
import pinia from "./config/nuxt/pinia"
import imports from "./config/nuxt/imports"
import app from "./config/nuxt/app"
import modules from "./config/nuxt/modules"
import buildModules from "./config/nuxt/buildModules"
import build from "./config/nuxt/build"
import security from "./config/nuxt/security"
// import scripts from "./config/nuxt/scripts"
import runtimeConfig from "./config/nuxt/runtimeConfig"
import robots from "./config/nuxt/robots"

export default defineNuxtConfig({
  site: {
    url: process.env.BASE_URL
  },

  cachely: {
    tenant: "prismic",

    debug: true
  },

  devtools: {
    enabled: true,
    componentInspector: false
  },

  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag.includes("swiper")
    }
  },

  router: {
    options: {
      scrollBehaviorType: "smooth"
    }
  },

  runtimeConfig,
  imports,
  components,
  app,
  build,
  buildModules,
  modules,

  // NUXT MODULE SETTINGS
  robots,
  sitemap,
  security,
  fontLoader,
  // scripts,
  nitro,
  vite,
  prismic,
  //   pwa,
  veeValidate,
  pinia,
  image,
  tailwindcss,
  compatibilityDate: "2024-07-15"
})
