<script setup>
  const props = defineProps({
    item: Object,
    light: Boolean
  })

  const isLink = computed(() => !!props.item.data.link.slug)
  const component = isLink.value ? resolveComponent("PrismicLink") : "span"
</script>

<template>
  <div class="app-nav-item">
    <component
      :is="component"
      :field="item.data.link">
      <span v-html="item?.data?.title" />
    </component>
  </div>
</template>
