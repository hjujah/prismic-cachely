<script setup>
  const store = useAppStore()
  const { openPeoplePopup, openFormPopup, openReportPopup } = storeToRefs(store)

  const route = useRoute()
  const reportPopupIsOpen = computed(() => route.hash == "#report-abuse")

  const { isMenuOpen } = useAppMenu()

  onMounted(() => {
  	// Initial check in case the hash is already present on load
  })
</script>

<template>
  <div class="layout base">
    <div>
      <!-- App header -->
      <app-header />
    </div>

    <!-- Page Content -->
    <slot />
  </div>
</template>
