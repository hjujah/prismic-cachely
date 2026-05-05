import { get } from "lodash-es"

/**
 *
 * @param {Object} slice Prismic Slice Object
 * @returns {
 *  getPrimary: (field) => String,
 *  items: Array
 * }
 */
export function useSlice(slice) {
  const { primary, items } = slice

  /**
   *
   * @param {String} field
   * @returns
   */
  const getPrimary = (field) => {
    return get(primary, field, null)
  }

  return {
    getPrimary,
    items: items || []
  }
}
