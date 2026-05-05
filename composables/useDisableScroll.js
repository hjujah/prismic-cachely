export default () => {
  const scrollingStore = useScrollingStore()
  const { scrollingDisabled } = storeToRefs(scrollingStore)

  const disableScroll = () => {
    scrollingDisabled.value = true
  }

  const enableScroll = () => {
    scrollingDisabled.value = false
  }

  return { disableScroll, enableScroll, scrollingDisabled }
}
