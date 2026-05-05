import routesConfig from "@/config/routes"
import cmsRoutesService from "@/services/cms/routes"
import { pascalCase } from "@/utils/strings"

export default defineNuxtPlugin(async (nuxtApp) => {
  const router = useRouter()

  // Works in server and client
  // Only present during error page render, not during first render when error is about to happen
  const isErrorPage = Boolean(nuxtApp.payload?.error)
  if (isErrorPage) {
    return
  }

  const { data, error } = await useAsyncData(
    "routes",
    async () => {
      // create cmsRoutesService instance
      const routesService = new cmsRoutesService(null)
      // get routes
      return await routesService.getRoutes()
    },
    {
      deep: false
    }
  )

  const urls = data.value || []
  if (!urls || urls.length === 0) {
    console.warn("[plugin:cmsRoutes] missing routes", urls)
    return
  }

  // Create routes for each page (ie. home, blog)
  urls.forEach((item) => {
    if (routesConfig.excludedRoutes.includes(item.url)) {
      console.debug(`[plugin:cmsRoutes] exclude route: ${item.url}`)
      return
    }

    router.addRoute({
      path: item.url,
      name: item.url,
      meta: {
        _type: "page",
        documentType: item.type,
        uid: item.uid,
        id: item.id,
        breadcrumb: item.uid
      },
      component: () => import(`~/pages/cms/${item.component}.vue`)
    })
  })

  // Create routes for articles (ie. blog post, event, etc.)
  for (const [key, value] of Object.entries(routesConfig.articles)) {
    // get parent page url
    const parent = urls.find((page) => page.type === value.parent)
    // get component name
    let component = pascalCase(value.template ?? key)

    if (parent) {
      router.addRoute({
        path: `${parent.url}/:uid`,
        name: key,
        meta: {
          _type: "article",
          documentType: key,
          breadcrumb: key
        },
        component: () => import(`~/pages/cms/${component}.vue`)
      })
    } else {
      console.warn(
        `[plugin:cmsRoutes] Parent url not found for article type '${key}' (parent: ${value.parent})`
      )
    }
  }

  // provide routes to the app
  nuxtApp.provide("cmsRoutes", urls)

  // debug routes (paths)
  // console.info("[plugin:cmsRoutes] routes loaded", router.getRoutes().length)
  // console.table(router.getRoutes().map((r) => ({
  //   path: r.path,
  //   name: r.name,
  //   type: r.meta?.type,
  // })))
})
