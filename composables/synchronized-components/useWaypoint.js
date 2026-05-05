/**
 * Intersection Observer Composable
 *
 * This Vue.js composition function sets up an Intersection Observer to detect the visibility of an element within the viewport.
 * It provides reactivity for tracking the visibility status and position of the observed element, and emits events when visibility changes.
 *
 * @param {Object} options - The options for the Intersection Observer (Optional, default: {}).
 * @param {Object} element - The Vue ref holding the element to observe.
 * @param {Boolean} horizontal - Whether to observe the element's horizontal intersection (Optional, default: false).
 * @param {Function} emit - The Vue emit function to trigger events.
 *
 * @returns {Object} - An object containing the following reactive properties:
 *   - visible {ref} - A reactive boolean indicating whether the observed element is currently intersecting the viewport.
 *   - isNotBelow {ref} - A reactive boolean indicating whether the observed element is intersecting the viewport from one direction.
 *   - position {ref} - A reactive string indicating the position of the observed element relative to the viewport ("above" or "below").
 */

export default ({
  element,
  options,
  horizontal = ref(false),
  onVisible,
  onNotBelow,
  emit,
  debug = false
}) => {
  const { height: appHeight, width: appWidth } = useWindowSize()

  let initialized = false
  const visible = ref(false)
  const isNotBelow = ref(false)
  const position = ref("below")

  let observer

  const referenceSize = computed(() =>
    horizontal.value ? appWidth.value : appHeight.value
  )

  const initObserver = () => {
    try {
      initialized = false
      observer && observer.disconnect()

      // if (debug) {
      //   console.log("observer initialized:", element.value, options.value)
      // }

      observer = new IntersectionObserver(callback, options.value)
      observer.observe(element.value)
    } catch (err) {
      console.warn("[waypoint] observer not supported", err, element.value, options.value)
      visible.value = isNotBelow.value = true
    }
  }

  const getPosition = (current) => {
    return current < 0 ? "above" : "below"
  }

  const callback = (entries) => {
    if (!element.value || !referenceSize.value) return

    let entry = entries[0]
    const current = horizontal.value
      ? entry.boundingClientRect.x
      : entry.boundingClientRect.y

    if (debug) {
      console.log(
        "current debug:",
        current,
        referenceSize.value,
        entry.boundingClientRect.height
      )
    }

    if (!initialized) {
      initialized = true

      isNotBelow.value = current <= referenceSize.value
      visible.value = entry.isIntersecting
      position.value = getPosition(current)

      return
    }

    const referenceElementSize = horizontal.value
      ? entry.boundingClientRect.width
      : entry.boundingClientRect.height

    if (current >= 0 || current > -referenceElementSize) {
      isNotBelow.value = entry.isIntersecting
    }

    if (current != 0) {
      visible.value = entry.isIntersecting
    }

    position.value = getPosition(current)
  }

  onMounted(() => {
    setTimeout(initObserver, 50)
  })

  onUnmounted(() => {
    if (observer) observer.disconnect()
  })

  watch(options, initObserver)

  watch(
    visible,
    (currentValue, oldValue) => {
      if (typeof oldValue === "undefined" && !currentValue) return

      const opts = {
        el: element.value,
        visible: currentValue,
        position: position.value
      }

      emit && emit("visible", opts)
      onVisible && onVisible(opts)
    },
    {
      immediate: true
    }
  )

  watch(
    isNotBelow,
    (currentValue, oldValue) => {
      if (typeof oldValue === "undefined" && !currentValue) return

      const opts = {
        el: element.value,
        visible: currentValue,
        position: position.value
      }

      emit && emit("isNotBelow", opts)
      onNotBelow && onNotBelow(opts)
    },
    {
      immediate: true
    }
  )

  useResizeObserver(element, initObserver)

  return { visible, isNotBelow, position }
}
