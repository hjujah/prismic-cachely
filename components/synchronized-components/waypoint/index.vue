<!--
S-Waypoint

This Nuxt 3 component utilizes the "useWaypoint" composable to set up an Intersection Observer on its child element.
The Intersection Observer detects the visibility of the child element within the viewport and emits custom events when visibility changes.

@emit visible {Object} - Event emitted when the observed element's visibility status changes.
  - el {HTMLElement} - The DOM element being observed.
  - visible {Boolean} - Indicates whether the element is currently intersecting the viewport.
  - position {String} - The position of the observed element relative to the viewport ("above" or "Below").

@emit isNotBelow {Object} - Event emitted when the observed element's visibility from one direction changes.
  - el {HTMLElement} - The DOM element being observed.
  - visible {Boolean} - Indicates whether the element is currently intersecting the viewport from one direction.
  - position {String} - The position of the observed element relative to the viewport ("above" or "Below").

Props:
@prop {Boolean} [horizontal=false] - Whether to observe the element's horizontal intersection (Optional, default: false).
@prop {Object} [options={}] - The options for the Intersection Observer (Optional, default: {rootMargin: "0px 0px -1px 0px"}).

Slots:
@slot - The default slot where the content to be observed is placed.
  - isNotBelow {Boolean} - A reactive boolean indicating whether the observed element is not Below the viewport.
  - visible {Boolean} - A reactive boolean indicating whether the observed element is currently intersecting the viewport.

Example Usage:
<S-Waypoint :options="{ threshold: 0.5 }" @visible="onVisible" @isNotBelow="onisNotBelow">
  Your content here...
</S-Waypoint>
-->

<script setup>
  const emit = defineEmits(["visible", "isNotBelow"])
  const element = ref(null)

  import _props from "./props"
  const props = defineProps(_props)

  const { visible, isNotBelow } = useWaypoint({
    element,
    emit,
    horizontal: computed(() => props.horizontal),
    options: computed(() => props.waypointOptions)
  })
</script>

<template>
  <component
    :is="tag"
    ref="element">
    <slot
      :isNotBelow="isNotBelow"
      :visible="visible" />
  </component>
</template>
