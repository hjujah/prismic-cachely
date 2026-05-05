import routesConfig from "~/config/routes"

/**
 * Prismic Link Resolver
 *
 * The link resolver is a user-defined function. It runs client-side.
 * It accepts a document object and returns the route for that document as a string.
 *
 * @see https://prismic.io/docs/route-resolver#link-resolver
 *
 * @param {Object} doc - Prismic document
 * @returns {string} - Resolved URL or null
 */
export default (doc) => {
  try {
    return resolveUrl(doc)
  } catch (error) {
    console.error("[prismic:linkResolver] error", error.message)
    return null
  }
}

// helpers
const isPage = (doc) => routesConfig.pages.includes(doc.type)
const isArticle = (doc) => Object.keys(routesConfig.articles).includes(doc.type)

/**
 * Resolve URL for a Prismic document
 *
 * @param {object} doc - Prismic document
 * @param {string} fallbackUrl - Fallback URL if document can't be resolved
 * @returns {string} - Resolved URL or fallback value
 */
const resolveUrl = (doc, fallbackUrl = null) => {
  if (!doc) {
    return fallbackUrl
  }

  // Get cmsRoutes from context - use tryUseNuxtApp to avoid exceptions
  // when context is unavailable (e.g., during preview resolution)
  const nuxtApp = tryUseNuxtApp()

  // If no Nuxt context is available, fall back to basic URL resolution
  if (!nuxtApp || !nuxtApp?.$cmsRoutes) {
    // console.warn('[prismic:linkResolver] No Nuxt context or cmsRoutes available, using fallback resolution')
    return resolveUrlBase(doc, fallbackUrl)
  }

  const { $cmsRoutes } = nuxtApp

  // Try to find the route by document id
  // (if the document is a page)
  const pageFound = $cmsRoutes.find((route) => route.id === doc.id)
  if (pageFound) {
    return pageFound.url
  }

  // Try to get parent type from routes config
  // (if the document is an article)
  const { parent: parentType } = routesConfig.articles[doc.type] ?? {}

  // If we couldn't find route by id (for pages)
  // and we couldn't find parent type (for articles)
  if (!parentType) {
    if (doc.link_type === "Document") {
      return `/${doc.uid}`
    } else {
      return fallbackUrl
    }
  }

  // Try to find parent route by type
  // (the document is an article)
  const parentFound = $cmsRoutes.find((route) => route.type === parentType)
  if (parentFound) {
    return `${parentFound.url}/${doc.uid}`
  }

  return fallbackUrl
}

/**
 * Basic URL resolution fallback when Nuxt context is unavailable
 *
 * @param {object} doc - Prismic document
 * @param {string} fallbackUrl - Fallback URL if document can't be resolved
 * @returns {string} - Resolved URL or fallback value
 */
const resolveUrlBase = (doc, fallbackUrl = null) => {
  if (!doc) {
    return fallbackUrl
  }

  // try to get routes from router
  const router = useRouter()
  const routes = router.getRoutes()

  if (doc.type === "page_home") {
    return "/"
  }

  if (isPage(doc)) {
    const pageFound = routes.find((route) => route?.meta?.id === doc.id)
    if (pageFound) {
      return pageFound.path
    }
  }

  // articles
  if (isArticle(doc)) {
    // try to get route where:
    // - meta._type is 'article' and
    // - meta.documentType is the same as the article type
    const articleRoute = routes.find(
      (route) =>
        route?.meta?._type === "article" && route?.meta?.documentType === doc.type
    )
    if (articleRoute) {
      // console.log('[prismic:linkResolver] resolveUrlBase -> article (article route)', articleRoute)
      return articleRoute.path.replace(":uid", doc.uid)
    }
  }

  // console.debug('[prismic:linkResolver] resolveUrlBase -> fallbackUrl', doc)
  return fallbackUrl
}
