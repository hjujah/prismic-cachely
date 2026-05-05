<script setup>
  const props = defineProps({
    tag: {
      type: String,
      default: "div"
    },
    global: {
      type: Boolean,
      default: true
    },
    factor: {
      type: Number,
      default: 1
    },
    duration: {
      type: Number,
      default: 2
    }
  })

  const target = ref(null)

  const { width, height } = useWindowSize()

  const { x, y, elementX, elementY, elementWidth, elementHeight, isOutside } =
    useMouseInElement(target)

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

  const _x = computed(() => (props.global ? x.value : elementX.value))
  const _y = computed(() => (props.global ? y.value : elementY.value))

  const _width = computed(() => (props.global ? width.value : elementWidth.value))
  const _height = computed(() => (props.global ? height.value : elementHeight.value))

  const xPercentage = computed(() => clamp(_x.value / _width.value, 0, 1))
  const yPercentage = computed(() => clamp(_y.value / _height.value, 0, 1))

  const move = computed(() => _width.value * props.factor)

  const to = computed(() => ({
    x: xPercentage.value * move.value - move.value / 2,
    y: yPercentage.value * move.value - move.value / 2,
    opacity: 1,
    duration: props.duration,
    overwrite: true,
    ease: "Power4.easeOut"
  }))

  const emit = defineEmits(["updated", "update:value"])
  const { animatedObject } = useTween({
    el: target,
    emit: emit,
    to: to,
    continuous: ref(true)
  })

  const elStyle = computed(() => ({
    // left: `${move.value * -0.5}px`,
    // top: `${move.value * -0.5}px`
  }))
</script>

<template>
  <!-- :style="elStyle" -->
  <div
    class="mouse-parallax"
    ref="target"
    :tag="tag">
    <slot />
  </div>
</template>
