/**
 * Scroll Tracking Hook
 *
 * This hook provides utilities for tracking the scrolling progress and position
 * of a given element within the viewport. It calculates the start and end positions
 * based on the element's bounding box, window height, and optional start/end offsets.
 * The scroll progress is updated as the user scrolls, and it can be accessed as a
 * reactive variable.
 *
 * @param {Object} params - The hook parameters.
 * @param {Ref} params.el - The Vue ref representing the element to track.
 * @param {Ref} [params.startOffset=ref(0)] - Optional ref for the starting offset.
 * @param {Ref} [params.endOffset=ref(0)] - Optional ref for the ending offset.
 * @param {Ref} [params.noOverscroll=ref(true)] - If the progress should start from 0 for above the fold elements.
 * @param {Ref} [params.progress=ref(false)] - Optional ref for the forcing the progress. Good for performance when out of viewport.
 * @param {Function} params.emit - The Vue emit function for updating the parent component.
 *
 * @returns {Object} - An object containing reactive variables:
 *   - currentProgress: The current scroll progress (0.0 to 1.0) of the tracked element.
 *   - elementBounds: The reactive bounding box of the tracked element.
 *   - start: The calculated starting position for tracking the element on the screen.
 *   - end: The calculated ending position for tracking the element on the screen.
 */

export default ({
  el,
  startOffset = ref(0),
  endOffset = ref(0),
  progress = ref(false),
  noOverscroll = ref(true),
  preset = ref(false),
  emit
}) => {
  // get reactive window height
  const windowHeight = useWindowHeight()

  // get element bounds
  const elementBounds = useGetElementBounds(el)

  //is above the fold and overscroll is disabled
  const _noOverscroll = computed(
    () => noOverscroll.value && elementBounds.value.y < windowHeight.value
  )
  const distanceFromStart = computed(() =>
    _noOverscroll.value ? elementBounds?.value?.y - windowHeight.value : 0
  )

  // inject scrolling position from parent component
  const scrollTop = inject("scrollTop", 0)
  const totalScroll = inject("totalScroll", 0)

  // presets for usual use cases
  const presetOffset = computed(() => {
    if (preset.value === "reachTop") {
      return {
        start: 0,
        end: -elementBounds?.value?.height
      }
    } else if (preset.value === "reachBottom") {
      return {
        start: 0,
        end: -windowHeight.value
      }
    } else if (preset.value == "fromBottom") {
      return {
        start: elementBounds?.value?.height,
        end: -elementBounds?.value?.height
      }
    } else {
      return {
        start: 0,
        end: 0
      }
    }
  })

  // calculate starting position for tracking element on screen
  // how many pixels needed to scroll so element would touch the bottom of the screen plus the start offset
  const start = computed(() => {
    return (
      elementBounds?.value?.y -
      windowHeight.value +
      startOffset.value -
      distanceFromStart.value +
      presetOffset.value.start
    )
  })

  // calculate ending position for tracking element on screen
  const end = computed(() =>
    Math.min(
      start.value +
        elementBounds?.value?.height +
        windowHeight.value +
        endOffset.value +
        distanceFromStart.value -
        startOffset.value +
        presetOffset.value.end,
      totalScroll.value
    )
  )

  // calculate scroll progress based on start and end positions
  const currentProgress = computed(() => {
    return typeof progress.value === "number"
      ? progress.value
      : calcProgress(start.value, end.value, scrollTop.value)
  })

  const ended = computed(() => currentProgress.value === 1)

  // watch and update bounds and progress if emit is defined
  if (emit) {
    watch(elementBounds, (bounds) => {
      emit("update:bounds", bounds)
    })

    watch(currentProgress, (progress) => {
      emit("update:progress", progress)
    })
  }

  // return relevant variables
  return {
    currentProgress,
    elementBounds,
    scrollTop,
    start,
    end,
    ended
  }
}
