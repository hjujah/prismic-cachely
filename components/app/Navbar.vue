<script setup>
  const props = defineProps({
    light: Boolean
  })

  const { getNavigationGroups, navHeader } = useAppNavigation()
  const navGroups = getNavigationGroups(navHeader)
</script>

<template>
  <nav class="app-navbar bg-white p-4 flex gap-2">
    <app-nav-item
      v-for="(item, index) in navGroups"
      :key="index"
      :item="item"
      :light="light">
    </app-nav-item>
  </nav>
</template>

<style scoped lang="scss"></style>
