import { createCachelyPrismicClient } from "@cachely-io/sdk/prismic"
import { repositoryName } from "~/slicemachine.config.json"

export const cachelyPrismicClient = createCachelyPrismicClient({
  repositoryName,
  tenant: "prismic",
  customDomain: true
})

export default cachelyPrismicClient
