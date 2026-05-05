import * as prismic from "@prismicio/client"

import routesConfig from "~/config/routes"
import { pascalCase } from "~/utils/strings"
export default class CmsRoutesService {
  /**
   * @param {Object} client - Prismic client
   */
  constructor(client) {
    /**
     * hashmap of routes
     * { [document.id]: route.url }
     */
    this.hashmap = {}

    // cms fetch results
    this.results = []

    // resolved routes
    this.routes = []

    // prismic types
    this.pageTypes = [...routesConfig.pages]
    this.articleTypes = [...Object.keys(routesConfig.articles)]

    // cms client (prismic client)
    this.client = client
  }

  maybeAddLocale(route) {
    if (!routesConfig.multiLanguage) {
      return route
    }

    // get locale from doc
    let locale = route.lang

    if (routesConfig.defaultLocale == locale && route.type === "page_home") {
      return route
    }

    route.url = `/${locale}${route.url}`
    return route
  }

  parseUrl(document) {
    if (!document) {
      console.warn("no document to parse", document)
      return
    }

    const {
      id,
      type,
      uid, // slug
      lang,
      last_publication_date
    } = document

    let url

    if (type === "page_home") {
      url = "/"
    } else if (document.id in this.hashmap) {
      url = this.hashmap[document.id]
    } else {
      // try parent
      let parentUrl = ""
      const parent = document?.data?.parent

      if (parent?.id && document?.data?.parent?.type !== "broken_type") {
        let doc = this.results.find((doc) => doc.id === parent.id)

        parentUrl = this.parseUrl(doc).url
      } else {
        const { parent } = routesConfig.articles[document.type] ?? {}
        const parentFound = this.results.find((doc) => doc.type === parent)
        if (parentFound) {
          parentUrl = this.parseUrl(parentFound).url
        }
      }

      url = `${parentUrl}/${uid}`
      this.hashmap[document.id] = url
    }

    return {
      id,
      uid,
      url,
      lang,
      type,
      last_publication_date,
      component: pascalCase(document.type)
    }
  }

  parseSitemap(route) {
    const { url, last_publication_date } = route

    return {
      loc: url,
      changefreq: "daily",
      // priority: 0.8,
      lastmod: new Date(last_publication_date).toISOString()
    }
  }

  async getSitemap() {
    try {
      // 1) get all routes (pages + articles), parsed (with urls)
      let allRoutes = await this.getAllRoutes()

      // 2) parse data for sitemap
      const parsed = allRoutes.map(this.parseSitemap.bind(this))
      return parsed
    } catch (error) {
      console.error("Error fetching routes from Prismic:", error)
      return []
    }
  }

  async getRoutes() {
    try {
      // Always use API endpoint for client-side calls to avoid direct Prismic API usage
      // Server-side can use direct client, but client-side should use cached API
      if (import.meta.client || !this.client) {
        // console.info("[service:cmsRoutes] getRoutes - from /api/cms/get-routes")
        this.results = await $fetch("/api/cms/get-routes")
      } else {
        // Server-side with direct client (prismic api call)
        const pages = await this._fetchPages()
        this.results = [...pages]
      }

      // parse routes
      const parsed = this._getParsedRoutes(this.results)

      // set and return
      this.routes = parsed
      return parsed
    } catch (error) {
      console.error("[service:cmsRoutes] getRoutes error:", error)
      return []
    }
  }

  async getAllRoutes() {
    try {
      const [pages, articles] = await Promise.all([
        this._fetchPages(),
        this._fetchArticles()
      ])

      // we need to set this.results
      // parseUrl uses this.results and this.hashmap
      this.results = [...pages, ...articles]

      // parse routes
      const parsed = this._getParsedRoutes(this.results)

      // set and return
      this.routes = parsed
      return parsed
    } catch (error) {
      console.error("", error)
      return []
    }
  }

  _getParsedRoutes(routes) {
    if (!routes) {
      return []
    }

    let _routes = [...routes]

    // remove excluded pages
    const excludedPages = routesConfig.excludedPages || []
    if (excludedPages?.length > 0) {
      _routes = _routes.filter((route) => {
        return !excludedPages.includes(route.uid)
      })
    }

    // parse url and add locale
    _routes = _routes.map((route) => {
      let parsed = this.parseUrl.call(this, route)
      if (parsed) {
        parsed = this.maybeAddLocale.call(this, parsed)
      }
      return parsed
    })

    return _routes
  }

  // deprecated
  // @see /app/prismic/linkResolver.js
  resolveUrl() {
    console.warn(
      `[service:cmsRoutes] 'resolveUrl'is deprecated, you '~/app/prismic/linkResolver'`
    )
    return null
  }

  // --------------------------------------------
  // Fetch from Prismic

  /**
   * Fetch entries from Prismic
   *
   * @param {array} types - array of types to fetch
   * @returns {array} - array of entries
   */
  async _fetchEntries(types) {
    try {
      /**
       * We use `dangerouslyGetAll` to get all pages
       *
       * Perform a recursive query to fetch all matching documents from the API.
       * These results are not paginated. They return only an array of document objects.
       *
       * @note We use `fetch` in order to get only selected fields.
       * @note We use `fetchLinks` in order to get the parent of the page.
       *
       * @note getAllByType is using `dangerouslyGetAll` (with a document type filter).
       * @note Note that the get-all methods are throttled.
       * > After the first request is sent, they wait at least 500ms before sending each subsequent request.
       * > This will have no effect on queries returning fewer than 100 documents.
       *
       */
      const response = await this.client.dangerouslyGetAll({
        filters: [prismic.filter.any("document.type", types)],
        fetch: [
          /**
           * This is a quick fix to get empty data on all types.
           */
          ...types.map((type) => `${type}.uid`),
          /**
           * For pages with hierarchy, we need to get the parent field.
           * @todo extend routes config to make this more flexible.
           */
          `page_default.parent`
        ],
        fetchLinks: [
          /**
           * For pages with hierarchy, we need to fetch parent link.
           */
          `page_default.parent`
        ]
      })

      return response
    } catch (error) {
      console.error("[Service/CmsRoutes] _fetchEntries Error:", error)
      throw error
    }
  }

  async _fetchPages() {
    return await this._fetchEntries(this.pageTypes)
  }

  async _fetchArticles() {
    return await this._fetchEntries(this.articleTypes)
  }
}
