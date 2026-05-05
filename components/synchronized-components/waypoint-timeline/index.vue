<script setup>
  /**
   * Component: s-waypoint-timeline
   *
   * This component provides a way to animate its contents when it becomes visible in the viewport.
   * It uses the GSAP library for animations and the `s-waypoint` component to detect visibility.
   * The child content can add tweens to the timeline via a scoped slot.
   *
   * Props:
   * - tag (String): The HTML tag to render as the root element. Defaults to "div".
   * - waitForFonts (Boolean): Whether to wait for fonts to load before animating. Defaults to true.
   *
   * Emits:
   * - none
   *
   * Usage:
   *   <s-waypoint-timeline v-slot="{ addToTimeline }">
   *     <s-tween @addTween='addToTimeline' preset='fade'>Fade me when i enter the viewport!</s-tween>
   *     <s-tween @addTween='addToTimeline' :to='{delay: .2}' preset='fade'>Fade me TOO but later!</s-tween>
   *   </s-waypoint-timeline>
   */

  import _props from "./props"
  const props = defineProps(_props)

  const { isMobileOrTablet } = useDevice()

  const element = ref(null)

  const emit = defineEmits(["updated", "created", "visible", "isNotBelow"])

  const { addToTimeline, timeline, visible, isNotBelow } = useWaypointTimeline({
    element,
    emit,
    waitForFonts: computed(() => props.waitForFonts),
    playOnce: computed(() => isMobileOrTablet),
    playInBothDirections: computed(() => props.playInBothDirections),
    immediateReverse: computed(() => props.immediateReverse),
    reverseOptions: computed(() => props.reverseOptions),
    debug: props.debug,
    waypointOptions: computed(() => props.waypointOptions),
    horizontal: computed(() => props.horizontal),
    onTimelineCreated: props.onTimelineCreated,
    timelineOptions: computed(() => props.timelineOptions)
  })

  defineExpose({
    element
  })
</script>

<template>
  <component
    ref="element"
    class="s-waypoint-timeline"
    :class="{ visible, isNotBelow }"
    :is="tag">
    <slot
      :visible="visible"
      :addToTimeline="addToTimeline" />
  </component>
</template>
