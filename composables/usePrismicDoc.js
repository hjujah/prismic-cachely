import linkResolver from "~/app/prismic/linkResolver"

export default (doc) => {
  const resolvedUrl = linkResolver(doc)
  return { resolvedUrl }
}
