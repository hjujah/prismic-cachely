/**
 * A helper function that returns the correct Vue component based on its template or contentType ID.
 * @param {object} component - Object containing information of the component.
 * @returns {VueComponent} - Returns the resolved Vue component.
 */

import { get } from "lodash-es"

export default (component) => {
  let template = get(component, "template") || get(component, "slice_type")
  template = template.replace(/\_/g, "-")

  try {
    // Resolves and returns the Vue component based on the template value
    return resolveComponent(template)
  } catch (err) {
    console.log("component err:", template, err)
  }
}
