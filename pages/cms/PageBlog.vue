<script setup>
  import { components } from "~/slices"

  const { client } = usePrismic()

  const { data, error } = await useAsyncData("page_blog", async () => {
    const [articles, page] = await Promise.all([
      client.getAllByType("article_blog"),
      client.getSingle("page_blog", { fetchLinks: [] })
    ])
    return { articles, page: page.data }
  })

  const { articles, page } = data.value

  handlePageError(page, error)

  const { results } = useFilterResults(articles, ["category"])

  usePageMeta(page)

  const PAGE_SIZE = 9
  const { paginated_items, onPageChange, currentPage } = useHashPagination(results, {
    page_size: PAGE_SIZE
  })

  const slices = getSlices(page.value)

  const onFilter = () => {}
  const onSort = () => {}
</script>

<template>
  <div class="page page--blog">
    <s-lenis>
      <!-- FILTERS -->
      <div>
        <!-- dropdownd filters -->
        <filters-dropdown
          @change="onFilter"
          :collection="articles"
          fieldPrefix="data."
          :filterFields="['category']"
          itemClass="-mt-px"
          field="category" />

        <!-- FILTERS -->
        <filters
          @change="onFilter"
          :collection="articles"
          :filterFields="['category']"
          itemClass="basis-1/5"
          field="category" />
        <!-- END :: FILTERS -->

        <!-- SORT -->
        <div class="basis-1/2 lg:basis-1/6">
          <filters-sort @change="onSort" />
        </div>
        <!-- END :: SORT -->
      </div>

      <!-- PAGINATION -->
      <s-pagination
        v-if="results.length > 8"
        :total="results.length"
        :pageSize="PAGE_SIZE"
        :currentPage="currentPage"
        :visiblePages="5"
        :onPageChange="onPageChange" />

      <pre>{{ paginated_items }}</pre>

      <!-- SliceZone -->
      <SliceZone
        v-once
        v-if="slices.length"
        :components="components"
        :slices="slices" />

      <app-footer />
    </s-lenis>
  </div>
</template>
