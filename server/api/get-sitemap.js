export default cachedEventHandler(
  async (e) => {
    const cmsRoutesService = getCmsRoutesService()
    return await cmsRoutesService.getSitemap()
  },
  {
    name: "sitemap:smith-point",
    maxAge: 60 * 10 // cache URLs for 10 minutes
  }
)
