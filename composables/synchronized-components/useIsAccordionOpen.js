import { isNumber, isString } from "lodash-es"

export default ({ index, forceOpen, individual }) => {
  const currentIndex = inject("a_currentIndex", 0)
  const open = ref(false)

  const isOpen = computed(() => {
    if (forceOpen?.value) {
      // If the forceOpen is truthy, return its value
      return true
    } else if (individual) {
      // If the individual is truthy, return the open value
      return open.value
    } else if (isNumber(currentIndex?.value) || isString(currentIndex?.value)) {
      // If currentIndex.value is a number and it equals index, return true
      return currentIndex.value === index
    } else {
      // Otherwise, return false
      return false
    }
  })

  return { isOpen, currentIndex, open }
}
