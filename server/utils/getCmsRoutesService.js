import CmsRoutesService from "@/services/cms/routes"

export default () => {
  const client = getPrismicClient()
  return new CmsRoutesService(client)
}
