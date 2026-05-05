<script setup>
  import _props from "./props"
  const props = defineProps(_props)

  const rive = ref(0)
  const ready = ref(false)
  const visible = ref(false)
  const notBelow = ref(false)

  watch(rive, (val) => {
    if (val && visible.value) {
      val?.playAnim()
    }
  })

  const playOrPause = (isVisible) => {
    if (isVisible) {
      rive.value?.playAnim()
    } else if (typeof rive.value?.stopAnim === "function") {
      rive.value?.stopAnim()
    }
  }

  const onIsNotBelow = (data) => {
    notBelow.value = data.visible

    if (!ready.value) {
      return
    }

    if (!visible.value) {
      playOrPause(false)
      return
    }

    playOrPause(data.visible)
  }

  const onVisible = (data) => {
    visible.value = data.visible

    console.log("visible!")

    if (visible.value && props.loop) {
      playOrPause(true)
    }

    // if (!ready.value) {
    // 	return
    // }

    // playOrPause(data.visible)
  }

  const onReady = (visible) => {
    ready.value = true
    playOrPause(visible)
  }

  onMounted(() => {})
</script>

<template>
  <s-waypoint
    v-slot="{ addToTimeline, visible, isNotBelow }"
    @visible="onVisible"
    @isNotBelow="onIsNotBelow"
    class="m-waypoint-rive">
    <a-rive
      :class="[innerClass, 'w-full']"
      @ready="onReady(isNotBelow)"
      ref="rive"
      :initOnLoad="initOnLoad"
      :fit="fit"
      :src="src" />
  </s-waypoint>
</template>

<style lang="scss" scoped>
  .m-waypoint-rive {
  }
</style>
