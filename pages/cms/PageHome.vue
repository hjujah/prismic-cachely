<script setup>
  import { components } from "~/slices"

  import { cachelyExperiments, cachelyPrismicClient } from "@/app/prismic/client"

  import fetchLinks from "@/config/pageFetchLinks"

  const startTime = performance.now()

  const route = useRoute()

  const transform = computed(() => {
    const t = route.query.transform
    return Array.isArray(t) ? t[0] : t
  })

  const { data: page, error } = await useAsyncData(
    () => `home-${transform.value || "default"}`,

    () =>
      cachelyPrismicClient.getSingle("page_home", {
        fetchLinks,

        cachely: {
          transform: transform.value || null
        }
      })
  )

  console.info(`homepage loading took ${performance.now() - startTime} milliseconds.`)

  handlePageError(page, error)

  usePageMeta(page)

  const slices = computed(() => getSlices(page.value))

  onMounted(() => {
    cachelyExperiments.autoTrack()
  })
</script>

<template>
  <main class="page page--home">
    <s-lenis class="overflow-x-hidden">
      <SliceZone
        :components="components"
        :slices="slices" />

      <AppFooter />
    </s-lenis>

    <button
      class="cachely-experiment-cta"
      type="button"
      data-cachely-track="homepage_hero_cta_click"
      data-cachely-experiment-id="1"
      data-cachely-meta-cta="fixed_demo_cta">
      Track demo CTA
    </button>
  </main>
</template>

<style scoped>
  .cachely-experiment-cta {
    position: fixed;
    right: 24px;
    bottom: 24px;
    z-index: 9999;
    padding: 14px 18px;
    border: 1px solid rgb(255 255 255 / 20%);
    border-radius: 999px;
    background: #ffffff;
    color: #05050a;
    font-size: 14px;
    font-weight: 700;
    line-height: 1;
    box-shadow: 0 20px 60px rgb(0 0 0 / 35%);
    cursor: pointer;
  }

  .cachely-experiment-cta:hover {
    transform: translateY(-1px);
  }

  .cachely-experiment-cta:active {
    transform: translateY(0);
  }
</style>
