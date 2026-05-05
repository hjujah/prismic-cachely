import formidable from "formidable"

/**
 * Retrieves form data and files from an HTTP event.
 * 
 * Depending on the request content type, this method will either:
 * - use the `formidable` library to parse the request body for 'multipart/form-data'
 * - use the `readBody` method to read the request body for `application/json`
 * 
 * For `readBody` method, see:
 * https://nuxt.com/docs/guide/directory-structure/server#handling-requests-with-body
 * 
 *
 * @param {object} event - The event object containing the request information.
 * @returns {Promise<object>} - An object containing the form data and files (if any).
 * @throws {Error} - If the headers are invalid or missing.
 */
export const getFormData = async (event) => {
	// Retrieve headers from the event
	const headers = getRequestHeaders(event)
	// console.log("getFormData - HEADERS:", headers)

	// Retrieve the 'content-type' header value
	const contentType = headers["content-type"]

	// Check if the 'content-type' header is empty or missing
	if (!contentType) {
		throw apiError.invalidHeaders()
	}

	let data = {
		fields: null,
		files: null
	}

	// Check if the request contains multipart/form-data
	let isMultipart = contentType.includes("multipart/form-data")

	// Read the request body based on whether it is multipart or not
	if (isMultipart) {
		data = await parseMultipartNodeRequest(event.node.req)
	} else {
		data.fields = await readBody(event)
	}

	// Return an object containing the form data and files (if any)
	return data
}

// START HELPER --------------------------------------------------------------------------
/**
 * Helper method that parses the fields object, by iterating over each key and value pair
 *
 * @description
 *        => If the value is an array, method check its length to determine
 *           how to assign the value to the parsedFields object
 *           - If the array has a single value, method assigns that value to the parsedFields object
 *           - If the array has multiple values, method assigns the entire array to the parsedFields object
 *        => Otherwise, for non-array values, method assigns the value directly to the parsedFields object
 *
 * @param {Object} fields - the fields object needed to be parsed
 *
 * @returns {Object} - the parsedFields object
 */

const parseFields = (fields) => {
	const parsedFields = {}
	// Iterate over each key in the fields object
	for (const [key, value] of Object.entries(fields)) {
		// Check if the value is an array
		if (Array.isArray(value)) {
			// If the array has a single value, assign that value to the parsedFields object
			parsedFields[key] = value.length === 1 ? value[0] : value
		} else {
			// For non-array values, assign the value directly to the parsedFields object
			parsedFields[key] = value
		}
	}
	return parsedFields
}

// END HELPER --------------------------------------------------------------------------

/**
 * This method parses a multipart/form-data Node.js request using the `formidable` library.
 *
 * @see {@link https://github.com/node-formidable/formidable/}
 *
 * @param {http.IncomingMessage} req - the Node.js request object to be parsed
 * @param {Object} [opts={}] - an optional parsing options for `formidable` library
 * @returns {Promise}
 *          - it resolves to an object containing the parsed fields and files
 *          - otherwise, if there is an error while parsing the request, the promise is rejected
 */
export const parseMultipartNodeRequest = async (req, opts = {}) => {
	return new Promise((resolve, reject) => {
		const defaultOptions = {
			multiples: true,
			keepExtensions: true,
			maxFiles: 1,
			maxFileSize: 5 * 1024 * 1024, // 5mb
			maxTotalFileSize: 5 * 1024 * 1024 // 5mb
			// filter: function ({name, originalFilename, mimetype}) {
			//   // keep only images
			//   return mimetype && mimetype.includes("image");
			// }
		}

		// extend default options
		let options = Object.assign(defaultOptions, opts)

		const form = formidable(options)

		form.parse(req, (error, fields, files) => {
			if (error) {
				console.log('[getFormData.js] parseMultipartNodeRequest error', error)
				reject(error)
				return
			}

			/**
			 * Normalize the output
			 * @see https://github.com/node-formidable/formidable/blob/master/src/Formidable.js [lines: 206-216]
			 **/

			const parsedFields = parseFields(fields)

			resolve({
				files,
				fields: parsedFields
			})
		})
	})
}
