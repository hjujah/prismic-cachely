import { object } from 'yup'

/**
 * Create Yup Validation Schema from form schema
 *
 * @param {Array} formSchema - The form schema is Array of objects
 * @returns {Object} - The Yup validation schema
 *
 */

function createValidationSchema(formSchema = []) {
	const validationObject = {}

	formSchema.forEach((group) => {
		let fields = group?.fields
		if (fields) {
			for (const [key, value] of Object.entries(fields)) {
				let fieldRules = value?.rules
				if (fieldRules) {
					validationObject[key] = fieldRules
				}
			}
		}
	}) 
	
	// return yup validation schema
	return object(validationObject)
}

/**
 * Validates form data against a given form schema.
 * 
 * @param {object} formSchema - The schema used for form validation.
 * @param {object} formData - The form data to be validated.
 * @throws {Error} - If the validation fails or an internal error occurs.
 *
 *    --- function call ---
 *  const validate = validate(formSchema, formData);
 */
export const validate = (formSchema, formData) => {
	try {
		// Create validation schema based on the form schema
		const validationSchema = createValidationSchema(formSchema) // Perform synchronous validation against the validation schema
		// Throws a ValidationError if the validation fails
		return validationSchema.validateSync(formData, { abortEarly: false })
	} catch (error) {
		/* If the error is of type ValidationError, throw a validation error with the error messages
		 * From yup docs:
		 *
		 * ValidationError(errors: string | Array<string>, value: any, path: string)
		 * Thrown on failed validations, with the following properties
		 * name: "ValidationError"
		 * type: the specific test type or test "name", that failed.
		 * value: The field value that was tested;
		 * params?: The test inputs, such as max value, regex, etc;
		 * path: a string, indicating where there error was thrown. path is empty at the root level.
		 * errors: array of error messages
		 * inner: in the case of aggregate errors, inner is an array of ValidationErrors throw earlier in the validation chain. When the abortEarly option is false this is where you can inspect each error thrown, alternatively, errors will have all of the messages from each inner error.
		 */
		if (error.name === "ValidationError") {
			throw apiError.validation(error.errors)
		} 
		
		// Otherwise, throw a new internal server error
		throw apiError.internal()
	}
}

export default validate
