/**
 * generateHtmlDataTable - Generates an HTML table from a given data object.
 *
 * This function takes a data object, an optional keyMap for custom key labels,
 * and additional options to generate an HTML table. It escapes HTML entities in
 * keys and values to prevent potential security vulnerabilities.
 *
 * @param {Object} data - The data object to be displayed in the HTML table.
 * @param {Object} keyMap - (Optional) A mapping of keys to custom labels for display.
 * @param {Object} options - (Optional) Additional options for customizing the HTML table.
 *
 * @returns {string} Returns a string containing the generated HTML table.
 *
 * @example
 * ```javascrpit
 * const data = { name: "John", age: 30, city: "London" };
 * const keyMap = { name: "Full Name", age: "Age", city: "Location" };
 * const htmlTable = generateHtmlDataTable(data, keyMap, { /* additional options * / });
 * console.log(htmlTable);
 * ```
 */
import { escape } from "lodash-es"

export function generateHtmlDataTable(data, keyMap = {}, options = {}) {
  let html = ""

  // Start building the HTML table structure.
  html +=
    '<table border="0" cellpadding="0" cellspacing="0" role="presentation" align="center" style="width:100%; margin-bottom:24px">'
  html += "<tbody>"

  // Iterate through the data object to create table rows.
  for (const [key, value] of Object.entries(data)) {
    // Use custom label from keyMap if available, otherwise escape the key.
    let _key = key in keyMap ? keyMap[key] : escape(key)

    // Escape the value to prevent HTML injection, or use an empty string if null or undefined.
    let _value = value ? escape(value) : ""

    // Build the HTML row with escaped key and value.
    html += `
<tr>
  <td style="width: 120px;border:solid 1px #dadce0;direction:rtl;font-size:0;padding:12px 24px;text-align:left;vertical-align:top">
    <div style="font-size:13px;font-weight:700;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;overflow:hidden;word-wrap:break-word;">${_key}</div>
  </td>
  <td style="border:solid 1px #dadce0;direction:rtl;font-size:0;padding:12px 24px;text-align:left;vertical-align:top">
    <div style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;margin:0;overflow:hidden;word-wrap:break-word;white-space:pre-wrap;">${_value}</div>
  </td>
</tr>
    `
  }

  // Close the table body and table tags.
  html += "</tbody>"
  html += "</table>"

  // Return the generated HTML table string.
  return html
}
