import { get } from "lodash-es"

// @bug
export const getSlices = (doc) => get(doc, "data.slices")

export const getField = (doc, attr) => get(doc, `data.${attr}`)

export const getRelationPrimary = (slice, field, relationType) =>
  get(slice.primary, `${relationType}.data.${field}`, null)

export const getPrimary = (slice, field) => get(slice.primary, field, null)

export const getMediaUrl = (media, field) => get(media, `data.${field}.url`, null)

export function setStyle(elem, propertyObject) {
  for (let property in propertyObject) {
    elem.style[property] = propertyObject[property]
  }
}

// This function returns the value of the given attribute from an object
export const getAttr = (obj, attr) => {
  return get(obj, attr)
}

// this function returns external link or the url from a content relation
export const getLink = (item) => {
  return getAttr(item, "data.external_link") &&
    getAttr(item, "data.external_link").link_type == "Web"
    ? getAttr(item, "data.external_link")
    : item
}

// This function removes all HTML tags from a string except for the <br> tag
export const stripHtmlWithBreaks = (str) => {
  if (typeof str !== "string") {
    return ""
  }
  // Replacing all HTML tags except for the <br> tag with an empty string
  return str.replace(/<(?!br\s*\/?)[^>]+>/g, "")
}

// This function removes all HTML tags from a string
export const stripHtml = (str) => {
  if (typeof str !== "string") {
    return ""
  }
  return str.replace(/<(?:.|\n)*?>/gm, "").replace(/^\s+|\s+$/gm, "")
}

// This function creates a URL-friendly slug from a string
export const convertToSlug = (str) => {
  return typeof str == "string"
    ? str
        .toLowerCase() // Converting string to lowercase
        .replace(/ /g, "-") // Replacing all spaces with a hyphen
        .replace(/[^\w-]+/g, "") // Removing all non-word characters except hyphens
    : null // If string is null or undefined, return null
}

// function to sanitize the string for the url
export const sanitize = (str) => {
  return typeof str == "string"
    ? str
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "")
        .replace(/--+/g, "-")
        .replace(/^-+/, "")
        .replace(/-+$/, "")
    : null
}

export function getCSS(element, property) {
  return window.getComputedStyle(element, null).getPropertyValue(property)
}
