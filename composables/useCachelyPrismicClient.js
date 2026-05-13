import { createCachelyPrismicClient } from "@cachely-io/sdk/prismic"
import { repositoryName } from "~/slicemachine.config.json"

export function useCachelyPrismicClient() {
  const experiments = useCachelyExperiments()

  return createCachelyPrismicClient({
    repositoryName,
    tenant: "prismic",
    customDomain: true,
    experiments
  })
}
