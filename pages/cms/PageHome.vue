<script setup>
  import { components } from "~/slices"

  let startTime = performance.now()

  const { query } = useRoute()

  const config = useRuntimeConfig()

  const { client } = usePrismic()
  import fetchLinks from "@/config/pageFetchLinks"

  const { data: page, error } = await useAsyncData("home", async () => {
    try {
      return await client.getSingle("page_home", {
        fetchLinks
      })
    } catch (err) {
      console.warn("Error fetching page", err)
    }
  })

  console.info(`homepage loading took ${performance.now() - startTime} milliseconds.`)

  handlePageError(page, error)

  usePageMeta(page)

  const slices = getSlices(page.value)
</script>

<template>
  <main class="page page--home">
    <s-lenis class="overflow-x-hidden">
      <SliceZone
        v-once
        :components="components"
        :slices="slices" />
      <AppFooter />
    </s-lenis>
  </main>
</template>
