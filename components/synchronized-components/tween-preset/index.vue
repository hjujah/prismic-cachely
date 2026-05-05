<script setup>
  import presets from "@/config/animationPresets.js"
  import _props from "./props"
  const props = defineProps(_props)

  const { _from, _to } = useTweenPreset({
    presets,
    preset: computed(() => props.preset),
    from: computed(() => props.from),
    to: computed(() => props.to)
  })

  // Fighting the FOUT! - probably this part should be moved to some higher level component togheter with the CSS and the dynamic class
  // BUG - this is a hacky way to get the font loading to work properly
  // this seems to be vue 3.0 issue with dynamic classes that are being set in the store during the initial render
  const loaded = ref(false)
  onMounted(() => {
    loaded.value = fontsLoaded.value
  })

  const appStore = useAppStore()
  const { fontsLoaded } = storeToRefs(appStore)

  watch(fontsLoaded, () => {
    setTimeout(() => {
      loaded.value = fontsLoaded.value
    })
  })

  const el = ref(null)
  defineExpose({ el })
</script>

<template>
  <s-tween
    ref="el"
    :class="[
      's-tween-preset',
      {
        's-tween-preset--loaded': loaded
      }
    ]"
    :continuous="continuous"
    :tag="tag"
    :debug="debug"
    :from="_from"
    :to="_to"
    :paused="paused">
    <slot />
  </s-tween>
</template>

<style lang="scss" scoped>
  .s-tween-preset {
    will-change: v-bind(willChange);

    opacity: 0.00001;

    &--loaded {
      opacity: 1;
    }
  }
</style>
