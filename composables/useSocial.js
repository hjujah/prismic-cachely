import { get } from "lodash-es"

// map (name -> field)
const mapValues = {
  youtube: "social_youtube",
  twitter: "social_twitter",
  instagram: "social_instagram",
  facebook: "social_facebook",
  medium: "social_medium",
  linkedin: "social_linkedin"
}

// for (const [key, value] of Object.entries(mapValues)) {}

// @TODO document
export function useSocial() {
  const { app } = useAppStore()

  // create array of object
  const socialLinks = Object.keys(mapValues).map((key) => ({
    name: key,
    link: get(app, mapValues[key])
  }))

  const object = socialLinks.reduce(
    (obj, item) => Object.assign(obj, { [item.name]: item.link }),
    {}
  )

  return {
    socialLinks,
    ...object
  }
}
