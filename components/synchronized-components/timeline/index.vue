<script setup>
  /**
   * Component: s-timeline
   *
   * This component provides a wrapper around the GSAP timeline object.
   * It initializes the timeline on mount, and exposes an `addToTimeline` method
   * that can be used to add tweens to the timeline.
   *
   * Props
   * - options (Object): The options object to pass to the GSAP timeline constructor
   *
   * Emits:
   * - updated: When the timeline is updated with a new tween.
   * - created: When the timeline is created.
   *
   *
   * 	 * Usage:
   *   <s-timeline v-slot="{ addToTimeline }">
   *     <h1 ref="heading" class="my-header" @click="addToTimeline(gsap.to([...]))">Hello!</h1>
   *   </s-timeline>
   */

  import _props from "./props"
  const props = defineProps(_props)
  const emit = defineEmits(["updated", "created"])

  const { addToTimeline } = useTimeline({
    options: computed(() => props.timelineOptions),
    progress: computed(() => props.progress),
    emit
  })
</script>

<template>
  <component
    :is="tag"
    class="s-timeline">
    <slot :addToTimeline="addToTimeline" />
  </component>
</template>
