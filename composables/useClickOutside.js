export default function useDetectOutsideClick(element, callback) {
  if (!element) return

  const listener = (event) => {
    if (
      event.target !== element.value &&
      event.composedPath().includes(element.value)
    ) {
      return
    }
    if (typeof callback === "function") {
      callback()
    }
  }

  onMounted(() => {
    window.addEventListener("click", listener)
  })
  onBeforeUnmount(() => {
    window.removeEventListener("click", listener)
  })

  return { listener }
}
