export default (fn) => {
  let _fn = (e) => {
    if (e.key === "Escape") {
      fn()
    }
  }

  onMounted(() => {
    document.addEventListener("keydown", _fn)
  })

  onUnmounted(() => {
    document.removeEventListener("keydown", _fn)
  })
}
