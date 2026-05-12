<script setup>
  import { components } from "~/slices"

  import { cachelyPrismicClient } from "@/app/prismic/client"

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
</script>
<template>
  <main class="page page--home">
    <s-lenis class="overflow-x-hidden">
      <SliceZone
        :components="components"
        :slices="slices" />
      <AppFooter />
    </s-lenis>
  </main>
</template>
