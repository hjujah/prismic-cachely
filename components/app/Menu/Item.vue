<script setup>
  import prismicLinkResolver from "~/app/prismic/linkResolver"

  const props = defineProps({
    item: Object
  })

  const route = useRoute()
  const { closeMenu } = useAppMenu()

  const link = computed(() => getField(props.item, "link"))
  const resolvedUrl = computed(() => prismicLinkResolver(link.value))

  const handleClick = () => {
    if (resolvedUrl.value === route.path) {
      closeMenu()
    }
  }
</script>

<template>
  <div class="app-menu-item">
    <PrismicLink
      @click="handleClick"
      :field="link">
      <span v-html="getField(item, 'title')" />
    </PrismicLink>
  </div>
</template>
