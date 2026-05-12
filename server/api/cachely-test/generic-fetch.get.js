import { createCachelyFetch } from "@cachely-io/sdk"

const cachelyFetch = createCachelyFetch({
  tenant: "prismic",
  provider: "prismic"
})

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  const transform = Array.isArray(query.transform) ? query.transform[0] : query.transform

  const fetchToUse =
    transform === "none"
      ? cachelyFetch.with({ transform: undefined })
      : transform
        ? cachelyFetch.with({ transform })
        : cachelyFetch

  // 1. Fetch Prismic metadata first so we always use the current master ref.
  // This endpoint should NOT receive transform= because Cachely's Prismic
  // provider only applies AI transforms to /documents/search.
  const metadataResponse = await fetchToUse("https://cachely-io.cdn.prismic.io/api/v2")
  const metadata = await metadataResponse.json()

  const ref =
    metadata.refs?.find((item) => item.isMasterRef)?.ref || metadata.refs?.[0]?.ref

  if (!ref) {
    return {
      transform: transform || null,
      status: metadataResponse.status,
      error: "Could not resolve Prismic master ref",
      metadata
    }
  }

  // 2. Fetch one page_home document through Cachely.
  // If transform is czech/serbian, .with({ transform }) appends transform
  // only to this /documents/search request.
  const url =
    "https://cachely-io.cdn.prismic.io/api/v2/documents/search" +
    "?q=%5B%5Bat%28document.type%2C%20%22page_home%22%29%5D%5D" +
    "&pageSize=1" +
    "&ref=" +
    encodeURIComponent(ref)

  const response = await fetchToUse(url)
  const json = await response.json()

  return {
    transform: transform || null,
    ref,
    status: response.status,
    cachelyHeaders: {
      xCache: response.headers.get("x-cache"),
      xAiTransform: response.headers.get("x-ai-transform"),
      xAiTransformProfile: response.headers.get("x-ai-transform-profile"),
      xAiTransformRules: response.headers.get("x-ai-transform-rules"),
      xAiTransformFields: response.headers.get("x-ai-transform-fields")
    },
    firstResult: json.results?.[0]?.data ?? json
  }
})
