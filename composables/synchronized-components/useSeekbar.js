export default ({ left, width, duration = ref(0) }) => {
  const hoveredProgress = ref(0)
  const selectedProgress = ref(0)
  const clicked = ref(false)

  const onTouchMove = (event) => {
    handleProgressMouseDown(event.touches[0])
    console.log(clicked.value, event.touches[0])
  }

  const handleProgressMouseDown = (event) => {
    clicked.value = true
    updateProgress(event)
  }

  const handleMouseMove = (event) => {
    handleProgressDrag(event)
    updateHoveredProgress(event)
  }

  const handleProgressDrag = (event) => {
    if (!clicked.value) return
    updateProgress(event)
  }

  const updateHoveredProgress = (event) => {
    const hoverX = event.clientX - left.value // X position of the mouse relative to the parent
    hoveredProgress.value = Math.min(
      Math.max((hoverX / width.value) * 100, 0),
      100
    )
  }

  const handleProgressMouseUp = () => {
    clicked.value = false
  }

  const handleMouseLeave = () => {
    clicked.value = false
    hoveredProgress.value = 0
  }

  const updateProgress = (event) => {
    const clickX = event.clientX - left.value // X position of the click relative to the parent
    const percentage = (clickX / width.value) * 100 // Convert to percentage
    selectedProgress.value = Math.min(Math.max(percentage, 0), 100) // Clamp to 0-100
  }

  const progressToTime = (progress) => {
    return (progress * duration.value) / 100
  }

  const hoveredTime = computed(() =>
    parseTime(progressToTime(hoveredProgress.value))
  )

  const selectedTime = computed(() => progressToTime(selectedProgress.value))

  return {
    hoveredProgress,
    selectedProgress,
    hoveredTime,
    selectedTime,
    onTouchMove,
    handleMouseMove,
    handleProgressMouseDown,
    handleProgressMouseUp,
    handleMouseLeave
  }
}
