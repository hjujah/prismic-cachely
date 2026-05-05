<script setup>
  const props = defineProps({
    bgColor: {
      type: Boolean
    }
  })
  const emit = defineEmits(["close"])
  const { isMobile } = useDevice()

  const el = ref(null)

  onMounted(() => {
    el.value.focus()
  })
</script>

<template>
  <div
    ref="el"
    tabindex="0"
    @keyup.esc="emit('close')"
    class="lightbox fixed w-full h-full top-0 left-0 backdrop-blur flex items-center justify-center z-20">
    <div class="w-full h-full">
      <slot />
    </div>
  </div>
</template>
