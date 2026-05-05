/**
 * Composable: useScrollTimeline
 *
 * Description:
 * This composable function is designed to be used with scroll-based animations. It takes several
 * parameters and returns a timeline that manages the progress of the element's scroll position
 * within a specified range. The composable utilizes the "useScrollingElement" and "useTimeline"
 * hooks to handle the progress calculation and timeline management.
 *
 * Parameters:
 * - el (ref): A Vue ref representing the element to track the scroll progress.
 * - emit (Function): A Vue emit function to send events from the composable to the parent component.
 * - startOffset (Number): The offset from the top of the viewport where progress starts.
 * - endOffset (Number): The offset from the top of the viewport where progress ends.
 * - progress (ref): A Vue ref that holds the current progress value (0 to 1). If a number is provided,
 *   it takes precedence over internal tracking. This ref can be used to control the scroll progress
 *   externally.
 *
 * Returns:
 * The function returns a timeline object created using the "useTimeline" hook. The timeline manages
 * the progress and can be used to add animations based on the scroll progress.
 *
 * Usage:
 * Call this composable with the required parameters to create a timeline for your scroll-based
 * animations. The resulting timeline can be used to add animations to elements within your Vue
 * component.
 *
 * Example:
 * const el = ref(null)
 * const emit = defineEmits(["update:bounds", "update:progress"])
 * const progress = ref(0)
 *
 * const { addToTimeline } = useScrollTimeline({
 *   el,
 *   emit,
 *   startOffset: 100,
 *   endOffset: 300,
 *   progress
 * })
 *
 * Now, you can use the "addToTimeline" function to add animations to your elements
 * based on the scroll progress.
 */

export default ({
  el,
  emit,
  startOffset,
  endOffset,
  noOverscroll,
  progress,
  preset,
  disabled = ref(false)
}) => {
  const { currentProgress, elementBounds, start, end, ended } = useScrollingElement({
    el,
    startOffset,
    endOffset,
    emit,
    noOverscroll,
    preset,
    progress
  })

  const { addToTimeline } = useTimeline({
    options: ref({ paused: true }),
    progress: currentProgress,
    disabled: disabled
  })

  return { currentProgress, addToTimeline, elementBounds, start, end, ended }
}
