import { filter, map, intersection, each, isObject, orderBy, get } from "lodash-es"

/**
 * A custom composable function that filters and sorts a collection based on filter fields.
 * @param {Array} collection - The collection to filter and sort.
 * @param {Array} filterFields - The fields to filter the collection by.
 * @param {string} [fieldPrefix="data."] - The prefix to add to each field when accessing it in the collection.
 * @returns {Object} An object containing the filtered and sorted results, filter query, filter collection function, sort and filter function, and filter key.
 */
export default (collection, filterFields, fieldPrefix = "data.") => {
  /**
   * A reactive object that stores the filter query and sort query.
   */
  const { filterQuery, sortQuery } = useFilterQuery(filterFields)

  /**
   * Filters the collection based on the filter query.
   * @param {Array} collection - The collection to filter.
   * @param {string} keyToIgnore - The key to ignore when filtering.
   * @returns {Array} The filtered collection.
   */
  const filterCollection = (collection, keyToIgnore) => {
    if (!filterQuery.value) return collection

    return filter(collection, (c) => {
      let show = true

      each(filterQuery.value, (p, key) => {
        if (p && keyToIgnore != key) {
          let val = get(c, fieldPrefix + key)

          const selectedValues = p ? p.split(",") : []

          if (isObject(val)) {
            val = map(val, (v) =>
              typeof v == "string" ? sanitize(v) : sanitize(Object.values(v)[0])
            )
          } else if (val) {
            val = [sanitize(val)]
          }

          if (!intersection(selectedValues, val).length) {
            show = false
          }
        }
      })

      return show
    })
  }

  /**
   * Sorts and filters the items based on the sort query.
   * @param {Array} items - The items to sort and filter.
   * @returns {Array} The sorted and filtered items.
   */
  const sortAndFilter = (items) => {
    let filtered = filterCollection(items)

    if (sortQuery.value) {
      const s = sortQuery.value.split("_")
      const sortingValue = s[0]
      const sortingDirection = s[1] || "desc"

      filtered = orderBy(
        filtered,
        (item, key) => {
          let val = item.data[sortingValue]

          // TODO: Check if the value is the Date object
          return val
        },
        [sortingDirection]
      )
    }

    return filtered
  }

  /**
   * A computed property that returns the sorted and filtered results.
   */
  const results = computed(() => sortAndFilter(collection.value))

  /**
   * A computed property that returns the filter query as a string.
   */
  const filterKey = computed(() => JSON.stringify(filterQuery.value))

  return {
    results,
    filterQuery,
    filterCollection,
    sortAndFilter,
    filterKey
  }
}
