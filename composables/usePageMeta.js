import { get, size, isEmpty } from "lodash-es"
import appConfig from "~/config/app"

export default function usePageMeta(page, og_image) {
  const config = useRuntimeConfig()

  // Create computed properties for all meta values
  const pageData = computed(() => page?.value || null)

  const prefix = computed(() => (get(pageData.value, "data") ? "data." : ""))

  const metaTitle = computed(() => {
    if (!pageData.value) return ""

    let title = get(pageData.value, `${prefix.value}meta_title`)
    if (!size(title)) {
      title =
        get(pageData.value, `${prefix.value}title`) ||
        get(pageData.value, `${prefix.value}name`)
    }
    return title
  })

  const title = computed(() => `${appConfig.site_name} | ${stripHtml(metaTitle.value)}`)

  const ogTitle = computed(() => {
    if (!pageData.value) return title.value

    let ogTitle = get(pageData.value, `${prefix.value}og_title`)
    return size(ogTitle) ? ogTitle : title.value
  })

  const description = computed(() => {
    if (!pageData.value) return appConfig.site_description

    let desc = get(pageData.value, `${prefix.value}meta_description`)
    return size(desc) ? desc : appConfig.site_description
  })

  const ogDescription = computed(() => {
    if (!pageData.value) return description.value

    let ogDesc = get(pageData.value, `${prefix.value}og_description`)
    return size(ogDesc) ? ogDesc : description.value
  })

  const ogImage = computed(() => {
    if (!pageData.value) return appConfig.default_og_image

    let image = og_image || get(pageData.value, `${prefix.value}og_image.url`)
    return size(image) ? image : appConfig.default_og_image
  })

  const robots = computed(() =>
    config.public.staging === "true" ? "noindex, nofollow" : "index, follow"
  )

  // Set SEO meta tags with computed values
  useSeoMeta({
    title,
    ogTitle,
    description,
    ogDescription,
    ogImage,
    robots,
    twitterCard: "summary",
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: ogImage
  })
}
