import { mapValues, find, get } from "lodash-es"

export const useAppStore = defineStore("app", () => {
  // state ---------------------------------------------------------------------

  /**
   * Prismic object
   * @see '@/customtypes/app'
   */
  const app = ref(null)

  const isMenuOpen = ref(false)

  const headerBounds = ref(null)

  // @TODO complete
  const fontsLoaded = ref(false)

  const ipAddress = ref("")
  const host = ref("")

  const initialVh = ref(0)

  const savedScrollingPosition = ref(null)

  // actions -------------------------------------------------------------------
  const load = async () => {
    try {
      let startTime = performance.now()

      const { query: routeQuery } = useRoute()

      const query = {}

      if (
        routeQuery.invalidateCache === "true" ||
        process.env.NODE_ENV === "development" ||
        process.env.DISABLE_CACHE === "true"
      ) {
        query.invalidateCache = true
      }

      if (routeQuery.debug) {
        query.debug = routeQuery.debug
      }

      const { data } = await useFetch(`/api/cms/get-app`, {
        query
      })

      let app_data = data.value?.app?.data
      app_data.navigationGroups = data.value?.navigation_groups

      if (!data) {
        throw new Error(`[app:store] Can't fetch the App custom type`)
      }

      app.value = app_data

      console.info(`app loading took ${performance.now() - startTime} milliseconds.`)
    } catch (error) {
      console.error(`[app:store] load function error`, error.message)
      throw new Error(`Can't load the App due to the unexpected error`)
    }
  }

  // ---------------------------------------------------------------------------

  return {
    app,
    headerBounds,
    isMenuOpen,
    fontsLoaded,
    savedScrollingPosition,
    initialVh,
    ipAddress,
    host,
    load
  }
})
