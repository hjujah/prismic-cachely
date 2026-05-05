<script setup>
  import _props from "./props"
  const props = defineProps(_props)

  const position = ref("Below")
  const handleVisible = (opts) => {
    position.value = opts.visible ? "visible" : opts.position
  }

  const progress = computed(() =>
    position.value === "above" ? 1 : position.value === "Below" ? 0 : false
  )
</script>

<template>
  <s-scrolling-tween
    :progress="progress"
    class="synchronized-waypoint-scrolling-tween"
    :tag="tag"
    :no-overscroll="noOverscroll"
    :from="from"
    :debug="debug"
    :to="to"
    :start-offset="startOffset"
    :end-offset="endOffset">
    <s-waypoint
      :class="['synchronized-waypoint-scrolling-tween__inner-waypoint', props.innerClass]"
      @visible="handleVisible">
      <slot />
    </s-waypoint>
  </s-scrolling-tween>
</template>
