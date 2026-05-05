/**
 * A Vue composition function that manages the state of a collapsible panel.
 *
 * @param {object} options - An object that contains the following properties:
 *   - index: The index of the panel in the parent component's array.
 *   - forceOpen: A ref that forces the panel to be open, regardless of other conditions.
 *   - individual: Whether or not this is an individually-controlled panel (as opposed to one of several).
 *   - emit: A function that emits an event with the new active index and height.
 *
 * @returns {object} An object that contains the following functions and values:
 *   - toggleActive: A function that toggles the open state of the panel and updates the active index/height if necessary.
 *   - isOpen: A computed property that determines whether the panel is currently open.
 */

import _isNumber from "lodash/isNumber"
import _isString from "lodash/isString"

export default ({ index, forceOpen, individual, emit }) => {
  const currentIndex = inject("a_currentIndex", 0)
  const open = ref(false)

  const isOpen = computed(() => {
    if (forceOpen.value) {
      // If the forceOpen is truthy, return its value
      return true
    } else if (individual) {
      // If the individual is truthy, return the open value
      return open.value
    } else if (_isNumber(currentIndex?.value) || _isString(currentIndex?.value)) {
      // If currentIndex.value is a number and it equals index, return true
      return currentIndex.value === index
    } else {
      // Otherwise, return false
      return false
    }
  })

  const setActive = (isOpen, index) => {
    if (individual) {
      open.value = isOpen
      return
    }

    emit("changeActive", isOpen ? index : null)
  }

  const toggleActive = (index) => {
    setActive(!open.value, index)
  }

  return { toggleActive, setActive, isOpen }
}
