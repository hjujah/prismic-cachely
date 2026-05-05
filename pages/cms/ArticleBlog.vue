<script setup>
  import _filter from "lodash/filter"
  import { components } from "~/slices"

  import fetchLinks from "@/config/pageFetchLinks"

  const route = useRoute()
  const uid = route.params?.uid || route.name
  const article_type = route.meta.type

  const { client } = usePrismic()
  const { data: page, error } = await useAsyncData(
    uid,
    async () => await client.getByUID(article_type, uid, { fetchLinks })
  )

  handlePageError(page, error)

  // @TODO create composables ie. usePageHome / usePage
  usePageMeta(page)
</script>

<template>
  <div :class="`page page--${article_type}`">
    <s-lenis class="pt-30">
      article blog:

      <PrismicRichText
        class="text-140"
        :field="page.data.title" />
      <!-- SLICE ZONE -->
      <SliceZone
        v-once
        :components="components"
        :slices="page.data.slices" />
      <!-- END :: SLICE ZONE -->

      <app-footer />
    </s-lenis>
  </div>
</template>
