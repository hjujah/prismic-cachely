export default (slides, options) => {
  if (!slides) {
    console.warn("No slides provided to useSlider")

    return {
      currentIndex: ref(0),
      totalSlides: computed(() => 0),
      currentSlide: computed(() => null)
    }
  }

  const currentIndex = ref(0)

  const totalSlides = computed(() => slides.length)

  const getPreviousIndex = (loop) => {
    if (loop) {
      return (currentIndex.value - 1 + totalSlides.value) % totalSlides.value
    } else if (currentIndex.value - 1 !== 0) {
      return currentIndex.value - 1
    } else {
      return currentIndex.value
    }
  }

  const getNextIndex = (loop) => {
    if (loop) {
      return (currentIndex.value + 1) % totalSlides.value
    } else if (currentIndex.value + 1 !== totalSlides.value) {
      return currentIndex.value + 1
    } else {
      return currentIndex.value
    }
  }

  let interval
  const stopInterval = () => {
    clearInterval(interval)
  }

  const startInterval = () => {
    if (!options?.autoplay) return

    stopInterval()
    interval = setInterval(() => {
      goToNext(true)
    }, options?.autoplay)
  }

  onBeforeUnmount(() => {
    stopInterval()
  })

  onMounted(() => {
    startInterval()
  })

  const goToNext = (loop) => {
    currentIndex.value = getNextIndex(loop)
    startInterval()
  }

  const goToPrev = (loop) => {
    currentIndex.value = getPreviousIndex(loop)
    startInterval()
  }

  const goToSlide = (index) => {
    currentIndex.value = index
    startInterval()
  }

  const currentSlide = computed(() => slides[currentIndex.value])

  const previousSlide = computed(() => slides[getPreviousIndex()])

  const nextSlide = computed(() => slides[getNextIndex()])

  const previousSlideLooped = computed(() => slides[getPreviousIndex(true)])

  const nextSlideLooped = computed(() => slides[getNextIndex(true)])

  const isFirstSlide = computed(() => currentIndex.value === 0)

  const isLastSlide = computed(() => currentIndex.value === totalSlides.value - 1)

  return {
    currentIndex,
    totalSlides,
    currentSlide,
    previousSlide,
    nextSlide,
    previousSlideLooped,
    nextSlideLooped,
    isFirstSlide,
    isLastSlide,
    goToNext,
    goToPrev,
    goToSlide
  }
}
