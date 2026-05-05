export default {
	rules: [
		{
			UserAgent: "*"
		},
		{
			Disallow: process.env.STAGING == "true" ? "/" : ""
		},
		{
			Sitemap: `${process.env.BASE_URL}/sitemap.xml`
		}
	]
}
