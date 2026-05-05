/**
 * useWaypointTimeline Composable
 *
 * This composable function provides a convenient way to manage animations triggered by
 * elements entering or exiting the viewport. It leverages Vue 3's Composition API and integrates
 * with GSAP timelines for smooth and controlled animations.
 *
 * Key Features:
 * - Supports both vertical and horizontal scroll-based animations.
 * - Delays animation until fonts are loaded if `waitForFonts` is true.
 * - Allows reversing animations either immediately or with a configurable delay.
 * - Includes a debug mode to log visibility changes for troubleshooting.
 *
 * Parameters:
 * - element: The target DOM element for the waypoint.
 * - emit: Event emitter for communication within Vue components.
 * - waypointOptions: Custom options for the waypoint's behavior.
 * - horizontal: Boolean indicating if the scroll direction is horizontal (default is vertical).
 * - waitForFonts: Boolean to delay animations until fonts are fully loaded (default: true).
 * - immediateReverse: Boolean to instantly reverse the animation when the element is not visible (default: true).
 * - playInBothDirections: Boolean to enable animations in both directions (entering and leaving the viewport, default: false).
 * - reverseOptions: Configuration object for the reverse animation (e.g., duration, easing).
 * - timelineOptions: GSAP timeline configuration object (e.g., paused state).
 * - debug: Boolean to enable or disable debug logging.
 *
 * Returns:
 * - An object containing `addToTimeline`, `timeline`, `visible`, and `isNotBelow`, which can be used
 *   to control and monitor the animation state within your components.
 *
 * Usage:
 * Import this composable into your Vue 3 components to handle smooth, scroll-based animations
 * tied to the visibility of specific elements. Ideal for complex interaction designs where
 * visibility triggers are critical.
 *
 * @composable useWaypointTimeline
 */

export default ({
  element,
  emit,
  waypointOptions = ref({}),
  horizontal = ref(false),
  waitForFonts = ref(true),
  immediateReverse = ref(true),
  disabled = ref(false),
  playInBothDirections = ref(false),
  reverseOptions = ref(false),
  playOnce = ref(false),
  timelineOptions = ref({
    // paused: true
  }),
  debug = false
}) => {
  const appStore = useAppStore()
  const { fontsLoaded } = storeToRefs(appStore)

  const { addToTimeline, timeline } = useTimeline({
    options: timelineOptions,
    disabled,
    emit
  })

  watch(fontsLoaded, () => {
    nextTick(() => {
      timeline.value.pause().progress(0)
      if (isNotBelow.value && timeline.value && waitForFonts.value) {
        timeline.value.play(0)
      }
    })
  })

  const onVisible = (opts) => {
    if (debug) {
      console.log("onVisible [waypoint-timeline]", opts.visible)
    }

    if (playInBothDirections.value) {
      toggleAnimations(opts)
    }
  }

  const onNotBelow = (opts) => {
    if (debug) {
      console.log("isNotBelow [waypoint-timeline]", opts.visible)
    }

    if (!playInBothDirections.value) {
      toggleAnimations(opts)
    }
  }

  const animationPlayed = ref(false)

  const toggleAnimations = (opts) => {
    if (!timeline.value) {
      console.warn("timeline is missing")
      return
    }

    // don't run the animation if the timeline is paused
    // if (timeline.value.paused) {
    //   return
    // }

    // don't run the animation if the fonts haven't loaded yet and waitForFonts is true
    if (waitForFonts.value && !fontsLoaded.value) {
      return
    }

    // don't run the animation if the animation has already been played and playOnce is true
    if (playOnce.value && animationPlayed.value) {
      return
    }

    animationPlayed.value = true

    if (opts.visible) {
      timeline.value.play(0)
    } else if (immediateReverse.value) {
      timeline.value.pause().progress(0)
    } else {
      timeline.value.reverse().tweenTo(0, reverseOptions.value)
    }
  }

  const { visible, isNotBelow } = useWaypoint({
    element,
    emit,
    horizontal,
    options: waypointOptions,
    onVisible,
    onNotBelow,
    debug
  })

  return { addToTimeline, timeline, visible, isNotBelow }
}
