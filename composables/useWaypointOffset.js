export default (el, offset = 100, rootSelector = ".lenis") => {
  const { isMobileOrTablet } = useDevice()
  const { width } = useWindowSize()

  const _offset = computed(() => {
    if (!offset) return 0

    if (typeof offset === "string") {
      if (offset.includes("%")) {
        return offset.replace("%", "") * width.value * 0.01
      }

      return offset
    }

    return offset
  })

  const root = computed(() =>
    el.value?.closest instanceof Function ?
      el.value.closest(rootSelector)
    : null
  )

  const waypointOpts = computed(() => {
    if (isMobileOrTablet) return

    return {
      rootMargin: `0px 0px ${_offset.value}px 0px`,
      root: root.value
    }
  })

  return {
    waypointOpts,
    isMobileOrTablet,
    offset: _offset,
    root
  }
}
