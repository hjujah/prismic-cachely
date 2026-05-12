import { createCachelyPrismicClient } from "@cachely-io/sdk/prismic"
import { repositoryName } from "~/slicemachine.config.json"

export const cachelyPrismicClient = createCachelyPrismicClient({
  repositoryName,
  tenant: "prismic",
  customDomain: true
  // cachelyEndpoint: "https://prismic-cachely.synchronized.studio/~api/api/v2"
})

export default cachelyPrismicClient
