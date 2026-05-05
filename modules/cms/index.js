import { defineNuxtModule, resolveAlias, extendPages } from "nuxt/kit"

import { logger } from "./lib"

import prismicClient from "~/app/prismic/client"
import CmsRoutesService from "~/services/cms/routes"
import routesConfig from "~/config/routes"

import { pascalCase } from "~/utils/strings"

// CONSTANTS
const CMS_PAGES_DIR = "pages/cms"

export default defineNuxtModule({
  meta: {
    name: "cms"
  },
  async setup(options, nuxt) {
    // debug
    let countCmsRoutes = 0

    extendPages(async (pages) => {
      const cmsRoutesService = new CmsRoutesService(prismicClient)

      // get pages from cms
      // const urls = await cmsRoutesService.getRoutes()

      let urls = [] // Declare the urls variable with default empty array

      // @TODO avoid re-fetching urls on every build or HMR in dev environment
      // - try to read the cache file
      // - if not found, fetch the urls and save to cache file
      urls = await cmsRoutesService.getRoutes()
      countCmsRoutes += urls.length

      const excludedRoutes = routesConfig.excludedRoutes || []

      // @NOTE all pages + all articles are registered here
      // extend pages (register routes) - cms pages
      urls.forEach((item) => {
        if (excludedRoutes.includes(item.url)) {
          console.debug(`[module:cmsRoutes] exclude route: ${item.url}`)
          return
        }

        pages.push({
          path: item.url,
          name: item.url,
          meta: {
            _type: "page",
            documentType: item.type,
            uid: item.uid,
            id: item.id
          },
          file: resolveAlias(`~/${CMS_PAGES_DIR}/${item.component}.vue`)
        })
      })

      // Create routes for articles (ie. blog_post)
      for (const [key, value] of Object.entries(routesConfig.articles)) {
        // get parent page url (by parent type)
        const parent = urls.find((page) => page.type === value.parent)
        if (parent) {
          const component = pascalCase(value.template ?? key)

          const route = {
            path: `${parent.url}/:uid`,
            name: key, // document type
            meta: {
              _type: "article",
              documentType: key
            },
            file: resolveAlias(`~/${CMS_PAGES_DIR}/${component}.vue`)
          }

          pages.push(route)
          countCmsRoutes += 1
        } else {
          console.warn(
            `[module:cmsRoutes] Parent url not found for article type '${key}' (parent: ${value.parent})`
          )
        }
      }

      logger.info(
        `CMS routes: \`${countCmsRoutes}\` (of total \`${pages.length}\` pages)`
      )

      // debug pages (routes)
      // console.table(pages.map(page => ({
      //   path: page.path,
      //   file: page.file
      // })))
    })
  }
})
