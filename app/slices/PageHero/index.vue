<script setup lang="ts">
  import type { Content } from "@prismicio/client"

  const { slice } = defineProps(getSliceComponentProps<Content.PageHeroSlice>())
</script>

<template>
  <o-page-hero
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    :image="slice.primary.image"
    :headline="slice.primary.headline"
    :text="slice.primary.text" />
</template>
