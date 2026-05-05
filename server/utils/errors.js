/**
 * Generate specific types of errors.
 */
export const apiError = {
	
	/**
	 * Generates a validation error with a 422 status code.
	 * @param {object} errors - The validation errors.
	 * @returns {Error} - The generated validation error with all validation errors listed in `error.data`.
	 */
	validation: (details) => {
		return createError({
			statusCode: 422,
			statusMessage: 'Unprocessable Entity',
			data: details
		})
	}, 
	
	/**
	 * Generates an bad request error with a 400 status code.
	 * @returns {Error} - The generated bad request error with error details in `error.data`.
	 */
	mailchimpError: (details) => {
		return createError({
			statusCode: 400,
			statusMessage: 'Bad request',
			data: details
		})
	}, 
	
	/**
	 * Generates an internal server error with a 500 status code.
	 * @returns {Error} - The generated internal server error.
	 */
	internal: () => {
		return createError({
			statusCode: 500,
			statusMessage: 'Unexpected Error'
		})
	},
	
	/**
	 * Generates an error indicating invalid headers with a 400 status code.
	 * @returns {Error} - The generated error for invalid headers.
	 */
	invalidHeaders: () => {
		return createError({
			statusCode: 400,
			statusMessage: 'Bad Request',
			data: { 
				error: "Content-type is required in headers" 
			}
		})
	},

}
