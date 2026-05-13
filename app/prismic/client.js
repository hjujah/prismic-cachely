import {
  createCachelyPrismicClient,
  createCachelyExperimentTracker
} from "@cachely-io/sdk/prismic"
import { repositoryName } from "~/slicemachine.config.json"

export const cachelyExperiments = createCachelyExperimentTracker({
  tenant: "prismic"
})

export const cachelyPrismicClient = createCachelyPrismicClient({
  repositoryName,
  tenant: "prismic",
  customDomain: true,
  experiments: cachelyExperiments
  // cachelyEndpoint: "https://prismic-cachely.synchronized.studio/~api/api/v2"
})

export default cachelyPrismicClient
