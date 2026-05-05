//  Arguments:
//	collection:  Collection of data to be filtered from
//	field: The unique field from which data will be filtered from
//	filterFields: Filtering fields for the query string
//	multiple: Boolean to determine if more than one filter is accepted
//	preventRemovingAttribute: Boolean to determine if the selected option can be removed
//	removeOtherOptions: Boolean to determine if the other options are to be removed
//	singleFilterOnly: Boolean to determine if only a single filter can be used
//	urlPrefix: The URL prefix for the page
import {
  each,
  get,
  uniq,
  compact,
  isArray,
  isObject,
  includes,
  pick,
  size,
  map,
  trim,
  flattenDeep
} from "lodash-es"

export default ({
  options,
  collection,
  field,
  filterFields,
  multiple,
  preventRemovingAttribute,
  removeOtherOptions,
  singleFilterOnly,
  urlPrefix,
  fieldPrefix = "data."
}) => {
  const { filterQuery, route } = useFilterQuery(filterFields)

  // unique, compact, trim and sort options
  const compactAndSort = (array) => uniq(compact(map(array, trim))).sort()

  // Get unique options for given collection and field
  const getUniqueOpts = (collection, field) => {
    let opts = []

    each(collection, (item) => {
      let val = get(item, `${fieldPrefix}${field}`)

      if (isObject(val)) {
        each(val, (v) => opts.push(Object.values(v)[0]))
      } else if (isArray(val)) {
        each(val, (v) => opts.push(v))
      } else if (val) {
        opts.push(val)
      }
    })

    return compactAndSort(opts)
  }

  // Get unique filter options for given field
  const filterOptions = computed(() =>
    size(options) > 0 ? options : getUniqueOpts(collection, field)
  )

  // Get selected filter options
  const selectedOptions = computed(() => {
    let selected = []

    if (filterQuery.value) {
      let fields = Object.values(filterQuery.value)
      selected = compact(flattenDeep(fields.map((field) => field.split(","))))
    } else {
      let selected = get(route, `query.${field}`)

      if (!selected) {
        return []
      }

      if (multiple) {
        selected = selected.split(",")
      } else {
        selected = [selected]
      }
    }

    selected = selected.map((option) => {
      return filterOptions.value.find((opt) => {
        return sanitize(opt) === option
      })
    })

    return compactAndSort(selected)
  })

  // Check if given option is active or not
  const isActive = (option) => {
    return option && includes(selectedOptions.value, option)
  }

  const noFiltersSelected = computed(() => {
    return !size(filterQuery.value)
  })

  // Get URL to apply a filter
  const getFilterUrl = (value) => {
    if (!value) {
      return { query: null }
    }

    const query = { ...route.query }

    if (isActive(value) && preventRemovingAttribute) {
      return { query }
    }

    const slug = sanitize(value)

    if (removeOtherOptions) {
      return { query: { [field]: slug } }
    }

    const values = query[field] ? query[field].split(",") : []

    const index = values ? values.indexOf(slug) : -1
    if (index > -1) {
      values.splice(index, 1)
    } else if (slug) {
      values.push(slug)
    }

    let newQuery
    if (singleFilterOnly) {
      newQuery = {}
    } else {
      newQuery = query
    }

    newQuery[field] =
      query[field] == slug ? null : multiple && values ? values.join(",") : slug

    const obj = {
      query: newQuery
    }

    if (urlPrefix) {
      obj.path = urlPrefix
    }

    return obj
  }

  const isLink = (option) => {
    return hasOptions(option) || includes(selectedOptions.value, option)
  }

  const { filterCollection } = useFilterResults(collection, filterFields, "")

  const enabledOptions = computed(() => {
    let coll = filterCollection(collection, field)
    return getUniqueOpts(coll, field)
  })

  const hasOptions = (option) => {
    return includes(enabledOptions.value, option)
  }

  return {
    filterOptions,
    enabledOptions,
    selectedOptions,
    noFiltersSelected,
    getFilterUrl,
    isActive,
    isLink
  }
}
