<script setup>
  const props = defineProps({})

  const { isMenuOpen, toggleMenu } = useAppMenu()

  const appStore = useAppStore()
  const { app } = useAppStore()
  const { fontsLoaded } = storeToRefs(appStore)

  const scrollingStore = useScrollingStore()
  const { navigationVisible, scrollingStarted } = storeToRefs(scrollingStore)

  const { getNavigationGroups, navHeader } = useAppNavigation()
  const navGroups = getNavigationGroups(navHeader)
</script>

<template>
  <header
    :class="{
      'app-header--has-background': scrollingStarted || isMenuOpen,
      'app-header--shrinked': scrollingStarted,
      'app-header--is-hidden': !navigationVisible || !fontsLoaded,
      'app-header--is-light': !scrollingStarted || isMenuOpen
    }"
    class="app-header fixed left-0 top-0 z-30 w-full text-black">
    <app-navbar
      :light="false"
      class="app-navbar hidden lg:flex grow-1" />
  </header>
</template>

<style lang="scss" scoped>
  .app-header {
    @apply transition-all duration-500;

    &--has-background {
      @apply bg-black;
    }

    &--shrinked {
    }

    &--is-hidden {
      @apply -translate-y-full;
    }
  }
</style>
