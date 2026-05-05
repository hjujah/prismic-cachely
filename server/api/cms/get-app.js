import client from "./../../../app/prismic/client"
import fetchLinks from "./../../../config/appFetchLinks"
import { useStorage } from "#internal/nitro"

export default defineCachedEventHandler(
  async (event) => {
    try {
      let app_data = await client.getSingle("app", { fetchLinks })

      let navigation_groups_data = await client.getAllByType("navigation_group")

      return {
        app: app_data,
        navigation_groups: navigation_groups_data
      }
    } catch (err) {
      console.log(err)
      return err
    }
  },
  {
    name: "cms:app",
    maxAge: 60 * 15,
    getKey: async (event) => {
      const { invalidateCache } = getQuery(event)
      const key = "cms:app:costanoa"

      if (invalidateCache === "true") {
        console.log("clear cache 🗑️")
        const storage = useStorage("cache")
        await storage.removeItem(key)
      }
      return key
    },
    shouldBypassCache: (event) => {
      const { invalidateCache } = getQuery(event)
      return invalidateCache === "true" || invalidateCache === true
    }
  }
)
