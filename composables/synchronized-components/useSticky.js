export default ({
  el,
  outerEl,
  startOffset = ref(0),
  endOffset = ref(0),
  noOverscroll = ref(true),
  progress = ref(false),
  emit
}) => {
  const { height } = useWindowSize()

  // get inner element dimensions but use y from outer element because the inner is sticky
  const _innerBounds = useGetElementBounds(el)
  const innerBounds = computed(() => {
    let _bounds = _innerBounds.value
    _bounds.y = elementBounds.value.y
    return _bounds
  })

  // calc start offset of the element
  const _startOffset = computed(() => {
    return Math.min(height.value, innerBounds.value.y) + startOffset.value
  })

  const _endOffset = computed(() => -innerBounds.value.height + endOffset.value)

  const { currentProgress, elementBounds } = useScrollingElement({
    el: outerEl,
    startOffset: _startOffset,
    endOffset: _endOffset,
    noOverscroll,
    progress
  })

  if (emit) {
    watch(currentProgress, (value) => {
      emit("update:progress", value)
    })
  }

  return { currentProgress, innerBounds, elementBounds }
}
