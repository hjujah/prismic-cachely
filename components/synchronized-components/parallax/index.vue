<!--
Parallax Component

This component provides a wrapper with parallax effects for its content. It utilizes the
"useParallax" composable to calculate the necessary values for creating the parallax effect.
The component accepts various props to customize the parallax behavior, including the
parallax factor, easing function, element wrapping, and overscroll behavior.

Props:
  - tag: The HTML tag to be used for the outer wrapper (default: "div").
  - wrapped: A boolean flag to indicate whether the content should be wrapped (default: true).
  - factor: The parallax factor (multiplier) for the content's movement (default: 0).
  - ease: The easing function to be used for the parallax animation (default: "linear").
  - relativeToElement: A boolean flag to calculate relative height based on the element (default: false).
  - noOverscroll: A boolean flag to disable overscroll behavior (default: true).
  - from: The starting values for the parallax animation (default: {}).
  - to: The target values for the parallax animation (default: {}).
  - debug: A boolean flag to enable debug information on the parallax effect (default: false).

Example Usage:
  <s-parallax
    tag="section"
    :wrapped="false"
    :factor="0.3"
    ease="ease-out"
    :relativeToElement="true"
    :noOverscroll="false"
    :from="{ opacity: 0' }"
    :to="{ opacity: 1 }"
    :debug="true">
    Your content here
  </s-parallax>
-->

<script setup>
  import _props from "./props"
  const props = defineProps(_props)

  const elementBounds = ref({})
  const { startOffset, endOffset, elStyle, move, elHeight } = useParallax({
    elementBounds,
    wrapped: props.wrapped,
    factor: props.factor,
    relativeToElement: props.relativeToElement,
    noOverscroll: props.noOverscroll,
    ignoreNoScale: props.ease !== "linear",
    noOffset: props.noOffset,
    disabled: computed(() => props.disabled)
  })

  const innerEl = ref(null)
  onMounted(() => {
    watch(
      elStyle,
      (val) => {
        innerEl.value.style.height = val.height
        innerEl.value.style.top = val.top
      },
      {
        immediate: true
      }
    )
  })
</script>

<template>
  <div
    :class="{
      'overflow-hidden h-full relative': wrapped
    }"
    class="synchronized-parallax">
    <s-scrolling-tween
      :disabled="disabled"
      :class="[
        {
          'h-full w-full absolute': wrapped,
          'relative h-full': !wrapped
        }
      ]"
      :inner-class="innerClass"
      :debug="debug"
      :progress="progress"
      :tag="tag"
      v-model:bounds="elementBounds"
      :no-overscroll="false"
      :startOffset="startOffset"
      :endOffset="endOffset"
      :from="{
        ...from,
        y: 0
      }"
      :to="{
        ...to,
        y: move,
        ease: ease
      }">
      <div
        ref="innerEl"
        class="relative">
        <slot />
      </div>
    </s-scrolling-tween>
  </div>
</template>
