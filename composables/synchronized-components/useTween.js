/**
 * useTween Composable
 *
 * A Vue composable that provides GSAP animation capabilities for HTML elements and objects.
 * Handles animation initialization, updates, and lifecycle management with support for
 * timeline integration and various animation controls.
 *
 * Features:
 * - Supports both HTML elements and object animations
 * - Timeline integration
 * - Progress control
 * - Pause/resume functionality
 * - Debug mode
 * - Automatic cleanup
 * - Event emission
 *
 * @param {Object} options - Configuration object
 * @param {Object | VueRef} options.el - Target HTML element or Vue ref
 * @param {Boolean} options.resetOnResize - Whether to reset animation on window resize
 * @param {Function} options.addToTimeline - Function to add tween to a GSAP timeline
 * @param {String} options.label - Label for the animation in timeline
 * @param {Function} options.addLabel - Function to add label to timeline
 * @param {Function} options.emit - Event emitter function
 * @param {Ref<Boolean>} options.html - Whether target is HTML element (default: true)
 * @param {Ref<Boolean>} options.paused - Whether animation starts paused (default: false)
 * @param {Ref<Object>} options.from - Starting animation properties
 * @param {Ref<Object>} options.to - Ending animation properties
 * @param {Ref<Number>} options.delay - Animation delay in seconds
 * @param {Function} options.onComplete - Completion callback
 * @param {Function} options.onUpdate - Update callback
 * @param {Function} options.onRepeat - Repeat callback
 * @param {Function} options.onReverseComplete - Reverse completion callback
 * @param {Ref<Number>} options.progress - Animation progress (0-1)
 * @param {Function} options.onTweenAdded - Callback when tween is added
 * @param {Boolean} options.debug - Enable debug logging
 * @param {Ref<Boolean>} options.continuous - Whether to restart from beginning on changes
 * @param {Ref<Boolean>} options.disabled - Disable and clear animation
 * @param {Boolean} options.isMounted - Whether component is already mounted
 *
 * @returns {Object} Returns animation control object
 * @returns {Ref} returns.animatedObject - Reference to animated element/object
 * @returns {Ref} returns.tween - Reference to GSAP tween instance
 */

import { isEqual, merge } from "lodash-es"
import { gsap } from "gsap"

export default ({
  el,
  resetOnResize,
  addToTimeline,
  addLabel,
  label,
  labelOffset = "+=0",
  emit,
  html = ref(true),
  paused = ref(false),
  from = ref(false),
  to = ref(false),
  delay = ref(0),
  onComplete,
  onUpdate,
  onRepeat,
  onReverseComplete,
  progress = ref(0),
  onTweenAdded,
  debug,
  continuous = ref(false),
  disabled = ref(false),
  isMounted
}) => {
  // Early return if element is missing
  if (!el) {
    console.warn("[S-Tween] Element (el) is required")
    return { animatedObject: null, tween: null }
  }

  // Reference to the tween instance
  const tween = shallowRef(null)

  // The element or reference being animated
  let animatedObject = html.value ? el : ref({ ...from.value })

  // ref animated object if not already refed
  if (!isRef(animatedObject)) {
    console.log("animatedObject is not ref", animatedObject)
    // animatedObject = ref(animatedObject)
  }

  // Dobavljamo trenutnu instancu
  const instance = getCurrentInstance()

  // Funkcija za proveru specifičnog emitera
  const hasListener = (eventName) => {
    const normalizedName = "on" + eventName.charAt(0).toUpperCase() + eventName.slice(1)
    return !!instance?.vnode.props?.[normalizedName]
  }

  /**
   * Initializes a new GSAP tween with current configuration
   * @returns {GSAPTween|null} - New tween instance or null if error
   */
  const initTween = () => {
    try {
      let _progress = progress.value

      // Clean up existing tween if not continuous
      if (!continuous?.value && tween.value) {
        _progress = tween.value.progress()
        tween.value.kill()
        tween.value = null
      }

      // Base animation properties
      const props = {
        overwrite: "auto",
        paused: paused?.value,
        onComplete: () => {
          onComplete && onComplete(tween.value)

          if (hasListener("onCompleted")) {
            emit("onCompleted", tween.value)
          }
        },
        onRepeat: () => {
          onRepeat && onRepeat(tween.value)

          if (hasListener("onRepeated")) {
            emit("onRepeated", tween.value)
          }
        },
        onUpdate: () => {
          onUpdate && onUpdate(tween.value)

          if (hasListener("onUpdated")) {
            emit("onUpdated", tween.value)
          }
        },
        onReverseComplete: () => {
          onReverseComplete && onReverseComplete()

          if (hasListener("onReversed")) {
            emit("onReversed", tween.value)
          }
        }
      }

      const _to = merge({}, props, to.value)
      const _from = merge({}, props, from.value)

      const hasFrom = Object.keys(from.value).length > 0
      const hasTo = Object.keys(to.value).length > 0

      // Create appropriate tween based on from/to values
      const _tween = !hasFrom
        ? gsap.to(animatedObject.value, _to)
        : !hasTo
          ? gsap.from(animatedObject.value, _from)
          : gsap.fromTo(animatedObject.value, from.value, _to)

      // Debug logging
      if (debug?.value) {
        console.log(
          "[S-Tween] FROM/TO animation:",
          animatedObject.value,
          from.value,
          to.value,
          el.value
        )
      }

      // Restore progress if not continuous
      if (!continuous?.value && _progress !== 0) {
        _tween.progress(_progress)
      }

      return _tween
    } catch (err) {
      console.error("[S-Tween] Initialization error:", err)
      return null
    }
  }

  /**
   * Creates and configures a new tween instance
   */
  const addTween = () => {
    if (!el.value) return

    tween.value = initTween()

    if (hasListener("updated")) {
      emit("updated", tween.value)
    }

    if (typeof onTweenAdded === "function") {
      onTweenAdded(tween.value)
    }

    if (typeof addToTimeline === "function") {
      addToTimeline(tween.value, delay.value)
    }

    if (typeof addLabel === "function") {
      addLabel(label, labelOffset)
    }
  }

  /**
   * Handles pause/play state changes
   * @param {Boolean} isPaused - Whether to pause or play
   */
  const handlePause = (isPaused) => {
    if (!tween.value) return

    try {
      tween.value[isPaused ? "pause" : "play"]()
    } catch (err) {
      console.error("[S-Tween] Pause/play error:", err)
    }
  }

  // Watch for state changes
  watch(paused, handlePause)

  const handler = (val, old) => {
    if (debug?.value) {
      console.log("[S-Tween] Property changed:", val, old)
    }
    if (!isEqual(val, old)) addTween()
  }

  watch(from, handler)
  watch(to, handler)
  watch(delay, handler)

  // Handle disabled state
  watch(
    disabled,
    (val) => {
      if (val) {
        tween.value && tween.value.progress(0).kill()
        gsap.set(animatedObject.value, { clearProps: "all" })
      } else {
        addTween()
      }
    },
    {
      immediate: true
    }
  )

  // Watch progress updates
  watch(progress, (val) => {
    if (!tween.value) return
    tween.value.progress(val)
  })

  // Handle resize if enabled
  if (resetOnResize) {
    useResize(addTween)
  }

  // Initialize on mount
  if (isMounted) {
    nextTick(addTween)
  } else {
    onMounted(() => {
      nextTick(addTween)
    })
  }

  // Cleanup on unmount
  onUnmounted(() => {
    if (tween.value) {
      tween.value.kill()
      tween.value = null
    }
  })

  return {
    animatedObject,
    tween
  }
}
