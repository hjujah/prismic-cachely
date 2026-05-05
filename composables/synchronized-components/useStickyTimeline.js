/**
 * Composable: useStickyTimeline
 */

export default ({
  el,
  outerEl,
  emit,
  startOffset,
  endOffset,
  moveOffset,
  noOverscroll,
  progress,
  disabled = ref(false)
}) => {
  const { currentProgress, innerBounds, elementBounds, stickyCurrentMove } = useSticky({
    el,
    outerEl,
    emit,
    startOffset,
    endOffset,
    moveOffset,
    noOverscroll,
    progress
  })

  const { addToTimeline, addLabel, timeline } = useTimeline({
    options: ref({ paused: true }),
    progress: currentProgress,
    disabled: disabled
  })

  provide("addToStickyTimeline", addToTimeline)
  provide("stickyProgress", currentProgress)

  return {
    currentProgress,
    innerBounds,
    elementBounds,
    addToTimeline,
    addLabel,
    timeline,
    stickyCurrentMove
  }
}
