// @TODO add documentation
// @TODO test / check for bugs

export function parseFormDataForValidation(data) {
	if (!data) {
		return {}
	}

	let parsed = {}
	Object.keys(data).forEach((key) => {
		parsed[key] = data[key][0]
	})
	
	return parsed
}
