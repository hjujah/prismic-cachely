/**
 * Generates a map of field names to labels from a form schema
 *
 * @param {Array} formSchema
 *
 *      @NOTE
 *          => the form schema contains groups (with fields)
 *          => `groups` refers to the individual objects within the array
 *          => each group represents section of fields within the form
 *          => within each group, the `fields` is an object that contains key - value pairs, including desired label
 *
 * @returns {Object} - represents generated label map (field -> label)
 */

export const getLabelMap = (formSchema) => {
	const labelMap = {}

	formSchema.forEach((group) => {

		for (const [field, { label }] of Object.entries(group.fields)) {
			labelMap[field] = field
		}
	})

	return labelMap
}
