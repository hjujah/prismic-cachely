import { createClient } from "@prismicio/client"
import { repositoryName } from "~/slicemachine.config.json"

/**
 * Prismic client
 *
 * @param {string} url
 * @param {object} options
 * @returns {Promise<object>}
 */
export default createClient(repositoryName)
