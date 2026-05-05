/**
 * A Vue composition function that manages the active index of collapsible panels.
 *
 * @param {number|boolean} [startIndex=false] - The index of the panel that should be open on mount. Defaults to false (no panel open).
 * @param {boolean} [alwaysOneOpen=false] - Whether to always keep one panel open or allow all panels to be closed.
 *
 * @returns {object} An object that contains the following functions and values:
 *   - updateIndex: A function that updates the active index to the provided value.
 *   - changeActive: A function that changes the active index based on the provided object with "index"  property.
 *   - currentIndex: A ref that holds the current active index.
 */

import { isNumber } from "lodash-es"

export default ({ startIndex = false, alwaysOneOpen = false }) => {
  const currentIndex = ref(startIndex)

  const updateIndex = (i) => {
    currentIndex.value = i === currentIndex.value || typeof i == undefined ? -1 : i
  }

  const changeActive = (index) => {
    if (alwaysOneOpen && (!isNumber(index) || index === currentIndex.value)) return
    updateIndex(index)
  }

  provide(
    "a_currentIndex",
    computed(() => currentIndex.value)
  )

  return { changeActive, currentIndex }
}
