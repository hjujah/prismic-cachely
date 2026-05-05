import client from "./../../../app/prismic/client"
import fetchLinks from "./../../../config/pageFetchLinks"
import { useStorage } from "#internal/nitro"

export default defineCachedEventHandler(
  async (event) => {
    const query = getQuery(event)
    try {
      let data = await client.getSingle(query.type, {
        fetchLinks
      })

      return data
    } catch (err) {
      console.log(err)
      return err
    }
  },
  {
    name: "prismic:single",
    maxAge: 60 * 15,
    getKey: async (event) => {
      const { type, invalidateCache } = getQuery(event)

      const key = `prismic:${type}:costanoa-website`

      if (invalidateCache === "true") {
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
