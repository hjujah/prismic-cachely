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
  <s-parallax
    :progress="progress"
    class="synchronized-waypoint-parallax"
    :tag="props.tag"
    :relativeToElement="props.relativeToElement"
    :ease="props.ease"
    :wrapped="props.wrapped"
    :factor="props.factor"
    :no-overscroll="props.noOverscroll"
    :from="props.from"
    :to="props.to"
    :no-offset="props.noOffset">
    <s-waypoint
      :class="innerClass"
      @visible="handleVisible">
      <slot />
    </s-waypoint>
  </s-parallax>
</template>
