<script setup>
  import { components } from "~/slices"
  const route = useRoute()

  import fetchLinks from "@/config/pageFetchLinks"

  const { client } = usePrismic()
  const {
    data: page,
    pending,
    error
  } = await useAsyncData(`page-${route.meta.uid}`, async () => {
    return await client.getByUID("page_default", route.meta.uid, {
      fetchLinks
    })
  })
  handlePageError(page, error)

  // @TODO create composables ie. usePageHome / usePage
  usePageMeta(page)
</script>

<template>
  <main class="page page--default">
    <s-lenis :class="`overflow-x-hidden`">
      <SliceZone
        v-once
        :components="components"
        :slices="page.data.slices" />

      <app-footer />
    </s-lenis>
  </main>
</template>
