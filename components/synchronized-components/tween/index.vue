<script setup>
  /**
   * Component: s-tween
   *
   * This component provides animation capabilities using GSAP (GreenSock Animation Platform).
   * It allows animating HTML elements by defining the animation properties and options.
   * The component initializes the animation on mount and updates it when the animation properties change.
   *
   * Props:
   * - tag (String): The HTML tag name to use for the component wrapper (default: "div").
   * - from (Object): The initial animation properties.
   * - to (Object): The final animation properties.
   * - continuous (Boolean): Weather the animation should be continuous after changing to attributes or restart (default: true).
   * - paused (Boolean): Whether the animation should be initially paused (default: false).
   * - html (Boolean): Whether the animation targets HTML elements or the JS object (default: true).
   * - progress (Number): The current progress of the animation. Avoid changing this value frequently!  (default: 0)
   *
   * Usage:
   * The `s-tween` component is used to animate HTML elements. You can define the animation properties
   * using the `from` and `to` props.
   * Here's an example usage:
   *
   * <s-tween
   *   tag="h1"
   *   :from="{ opacity: 0 }"
   *   :to="{ opacity: 1 }"
   *   paused>
   * 		Hello!
   * </s-tween>
   */

  import _props from "./props"
  const props = defineProps(_props)

  const el = ref(null)
  const emit = defineEmits([
    "updated",
    "onCompleted",
    "onRepeated",
    "onReversed",
    "onUpdated"
  ])

  const { animatedObject, tween } = useTween({
    el: el,
    emit: emit,
    from: computed(() => props.from),
    to: computed(() => props.to),
    paused: computed(() => props.paused),
    html: computed(() => props.html),
    continuous: computed(() => props.continuous),
    delay: computed(() => props.delay),
    debug: computed(() => props.debug),
    progress: computed(() => props.progress),
    disabled: computed(() => props.disabled),
    addToTimeline: props.addToTimeline,
    onComplete: props.onComplete,
    onUpdate: props.onUpdate,
    onRepeat: props.onRepeat,
    onReverseComplete: props.onReverseComplete,
    onTweenAdded: props.onTweenAdded,
    labelOffset: props.labelOffset,
    addLabel: props.addLabel,
    label: props.label
  })

  defineExpose({
    el
  })
</script>

<template>
  <component
    :class="['s-tween', { 's-tween--html': html }]"
    ref="el"
    :is="tag">
    <slot :target="animatedObject" />
  </component>
</template>
