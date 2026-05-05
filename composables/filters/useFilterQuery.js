import { pick } from "lodash-es"

export default (filterFields) => {
  const route = useRoute()

  const filterQuery = computed(() => {
    return pick(route.query, filterFields)
  })

  const sortQuery = computed(() => {
    return route.query.sort
  })

  return { filterQuery, sortQuery, route }
}
