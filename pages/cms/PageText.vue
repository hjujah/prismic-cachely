<script setup>
  const route = useRoute()

  import pageFetchLinks from "~/config/pageFetchLinks"

  const { client } = usePrismic()
  const {
    data: page,
    pending,
    error
  } = await useAsyncData(route.name, async () => {
    return await client.getByUID("page_text", route.name, {
      fetchLinks: pageFetchLinks
    })
  })
  handlePageError(page, error)
  // @TODO create composables ie. usePageHome / usePage
  usePageMeta(page)
</script>

<template>
  <main class="page page--text overflow-hidden">
    <s-lenis class="bg-beige">
      <div
        class="page--text__wrapper text-red px-4 pt-28 sm:pt-48 md:pt-52 lg:pt-52 sm:px-12 py-20 sm:py-36 max-w-[1200px] mx-auto">
        <h1 class="uppercase sm:text-center text-24 sm:text-50 md:text-65 mb-8 sm:mb-24">
          {{ getField(page, "title") }}
        </h1>

        <div class="page--text__content text-14 sm:text-22 md:text-24 font-ttfors">
          <PrismicRichText :field="getField(page, 'text')" />
        </div>
      </div>
      <keep-alive>
        <app-footer v-once />
      </keep-alive>
    </s-lenis>
  </main>
</template>

<style scoped lang="scss">
  .page--text :deep(.not-homepage-hidden) {
    @apply hidden;
  }
  .app-footer :deep(.background-and-content-wrapper) {
    margin-top: 0;
  }

  .page--text__content {
    &:deep(h2) {
      @apply text-14 sm:text-22 md:text-24 mt-1 sm:mt-12 sm:mb-2;
    }

    &:deep(p) {
      @apply py-2;
    }

    &:deep(ul) {
      @apply list-disc list-inside;
    }

    &:deep(ol) {
      @apply list-decimal list-inside;
    }
  }
</style>
