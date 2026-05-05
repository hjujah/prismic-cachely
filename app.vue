<script setup>
  import { gsap } from "gsap"
  import appConfig from "~/config/app"

  const appStore = useAppStore()
  const loading = ref(true)

  const { isMobileOrTablet } = useDevice()

  useHead({
    htmlAttrs: {
      lang: "en"
    },

    title: appConfig.site_name
  })

  onAllFontsLoaded(() => {
    appStore.fontsLoaded = true

    setTimeout(() => {
      loading.value = false
    })
  })

  useSignature()
  useHighPerformance()
  useSetInitialVh()

  const animation = (onComplete, instant) => ({
    opacity: 0,
    duration: instant ? 0 : 0.6,
    delay: instant ? 0 : 0.1,
    onComplete
  })

  const pageTransition = {
    name: "page",
    onLeave: (el, onComplete) => {
      gsap.to(el, animation(onComplete, isMobileOrTablet))
    },
    onEnter: (el, onComplete) => {
      window.scrollTo(0, 0)
      gsap.from(el, animation(onComplete))
      appStore.isMenuOpen = false
    }
  }
</script>

<template>
  <div class="app text-16">
    <!-- <VitePwaManifest /> -->
    <NuxtLayout>
      <NuxtPage
        class="w-full h-full t-0 l-0"
        :transition="pageTransition" />
    </NuxtLayout>
  </div>
</template>
