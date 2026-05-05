<script setup>
  import _props from "./props"
  const props = defineProps(_props)

  const el = ref(null)
  const videoEl = ref(null)

  const seekTo = (time) => {
    videoEl.value?.seekTo(time)
  }

  defineExpose({
    seekTo,
    el
  })

  const paused = ref(false)

  const isPlaying = (visible) => {
    if (paused.value) {
      return false
    }

    return props.autoplay && visible
  }

  const emit = defineEmits(["visible", "isNotBelow"])
  const toggleVisible = (opts) => {
    if (props.restartOnVisible) {
      videoEl.value?.seekTo(0)
    }

    emit("visible", opts)
  }
  const toggleNotBelow = (opts) => emit("isNotBelow", opts)
</script>

<template>
  <s-waypoint
    ref="el"
    @visible="toggleVisible"
    @isNotBelow="toggleNotBelow"
    v-slot="{ visible }"
    v-if="src">
    <s-html-video
      ref="videoEl"
      :forcePoster="forcePoster"
      :posterUrl="posterUrl"
      :preload="preload"
      :playsinline="playsinline"
      :src="`${src}`"
      :controls="controls"
      :loop="loop"
      :muted="muted"
      :autoplay="autoplay && visible"
      :playing="isPlaying(visible)"
      :class="[videoClass, { active: playing == true }]" />

    <slot
      :playing="isPlaying(visible)"
      :visible="visible"></slot>
  </s-waypoint>
</template>
