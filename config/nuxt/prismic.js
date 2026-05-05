// https://v3.prismic.nuxtjs.org/configuration
import config from "./../../slicemachine.config.json"

export default {
	endpoint: config.repositoryName,
	linkResolver: "~/app/prismic/linkResolver"
}
