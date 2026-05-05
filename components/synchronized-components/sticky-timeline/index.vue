<script setup>
  import _props from "./props"
  const props = defineProps(_props)

  const emit = defineEmits(["update:progress"])
  const el = ref(null)
  const outerEl = ref(null)

  const { addToTimeline, innerBounds, elementBounds, currentProgress, isSticky } =
    useStickyTimeline({
      el,
      outerEl,
      emit,
      startOffset: computed(() => props.startOffset),
      endOffset: computed(() => props.endOffset),
      moveOffset: computed(() => props.moveOffset),
      noOverscroll: computed(() => props.noOverscroll),
      cssSticky: computed(() => props.cssSticky),
      disabled: computed(() => props.disabled)
    })
</script>

<template>
  <div
    ref="outerEl"
    class="s-sticky-timeline h-full relative">
    <div
      ref="el"
      :class="[
        's-sticky',
        innerClass,
        {
          'sticky top-0': cssSticky
        }
      ]">
      <slot :addToTimeline="addToTimeline" />
    </div>
  </div>
</template>
