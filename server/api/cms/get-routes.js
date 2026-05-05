import client from "./../../../app/prismic/client"

import routesConfig from "./../../../config/routes"
import { useStorage } from "#internal/nitro"

export default defineCachedEventHandler(
  async (event) => {
    try {
      let results = []
      const types = routesConfig.pages

      for await (const type of types) {
        let res = await client.getAllByType(type)

        res = res.map((item) => ({
          id: item.id,
          type: item.type,
          uid: item.uid,
          lang: item.lang,
          data: { parent: item.data.parent }
        }))

        results.push(...res)
      }

      return results
    } catch (err) {
      console.log(err)
      return err
    }
  },
  {
    name: "cms:routes:starter",
    maxAge: 60 * 15,
    getKey: async (event) => {
      const { invalidateCache } = getQuery(event)
      const key = "cms:routes:costanoa"
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
