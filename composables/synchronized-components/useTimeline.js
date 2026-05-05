/**
 * UseTimeline
 *
 * This composable provides functionality to create and manage GSAP timelines in a Vue component.
 *
 * @param {Object} options - The options object to configure the GSAP timeline.
 * @param {Object} progress - The progress object to control the timeline's progress.
 * @param {Function} emit - The emit function to send events from the composable.
 *
 * @returns {Object} An object containing the following functions and properties:
 *   - addToTimeline: A function to add a GSAP tween to the timeline.
 *   - timeline: The GSAP timeline instance.
 */

import { gsap } from "gsap"
import _isEqual from "lodash/isEqual"

// Define a composable function that manages GSAP timelines
export default ({
  options = ref({}),
  progress = ref(false),
  onTimelineCreated = () => {},
  disabled = ref(false),
  emit
}) => {
  // The GSAP timeline instance
  const timeline = shallowRef(false)

  // Pause the timeline and remove CSS properties for the targeted elements
  const pauseAndRemoveProperties = () => {
    console.log("pause and remove timeline props")

    if (!timeline.value) {
      return
    }

    timeline.value.progress(0)
    timeline.value.pause()

    clearPropsTimeline(timeline.value)
  }

  const clearPropsTimeline = (timeline) => {
    // Iterate through tweens in the timeline
    timeline.getChildren().forEach((tween) => {
      try {
        if (typeof tween.getChildren === "function") {
          clearPropsTimeline(tween)
        } else {
          // Get the target element of each tween
          const targetElement = tween.targets()

          // Remove all CSS properties from the target element
          gsap.set(targetElement, { clearProps: "all" })
        }
      } catch (e) {
        console.warn("Error removing properties:", e, tween)
      }
    })
  }

  watch(disabled, (val) => {
    if (val) {
      pauseAndRemoveProperties()
    } else {
      let p = Number.isFinite(progress.value) ? progress.value : 0

      timeline.value.progress(1)
      nextTick(() => timeline.value.progress(p))
    }
  })

  // Watch for changes in the 'options' object
  watch(options, (opts, oldOpts) => {
    // If the timeline is not yet initialized, do nothing
    if (!timeline.value) {
      return
    }

    // If the new 'options' are the same as the old ones, do nothing
    if (_isEqual(opts, oldOpts)) {
      return
    }

    // Update the timeline with new 'repeat', 'duration', and 'paused' options
    if (opts.repeat) {
      timeline.value.repeat(opts.repeat)
    }

    if (opts.duration) {
      timeline.value.duration(opts.duration)
    }

    if (opts.paused === true) {
      timeline.value.pause()
    } else if (opts.paused === false) {
      timeline.value.play()
    }
  })

  // Watch for changes in the 'progress' object
  watch(progress, (val) => {
    // If the timeline is not yet initialized, do nothing
    if (!timeline.value || disabled?.value === true) {
      return
    }

    // Update the timeline's progress based on the new value
    timeline.value.progress(val)
  })

  // Function to create the GSAP timeline
  const createTimeline = () => {
    // If the timeline is already initialized, do nothing and return
    if (timeline.value) {
      return
    }

    // Create a new GSAP timeline with the provided 'options' and set the progress based on 'progress' value
    let tl = gsap.timeline(options.value)
    tl.progress(progress.value)

    // Emit a "created" event with the new timeline
    emit && emit("created", tl)

    onTimelineCreated && onTimelineCreated(tl)

    // Return the newly created timeline
    return tl
  }

  const addLabel = (label, labelOffset = "+=0") => {
    if (!timeline.value) {
      console.warn("[adding label] timeline is not yet initialized")
      return
    }

    timeline.value.addLabel(label, labelOffset)
  }

  // Function to add a GSAP tween to the timeline with an optional delay
  const addToTimeline = (tween, delay = 0) => {
    // If the timeline is not yet initialized, warn and create a new timeline
    if (!timeline.value) {
      console.warn("timeline is not yet initialized")
      timeline.value = createTimeline()
    }

    // Add the provided tween to the timeline with the specified delay
    timeline.value.add(tween, delay)

    // Emit an "updated" event with the updated timeline
    emit && emit("updated", timeline.value)

    // Return the updated timeline
    return timeline.value
  }

  // When the component is mounted, create the GSAP timeline
  onMounted(() => {
    timeline.value = createTimeline()

    if (disabled.value) {
      setTimeout(pauseAndRemoveProperties)
    }
  })

  // Return the functions and properties that can be used externally
  return {
    addToTimeline,
    addLabel,
    timeline
  }
}
