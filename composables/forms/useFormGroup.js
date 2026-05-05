/* Composable function to handle form validation for a group of fields
 * @param {Object} fields - The fields to validate
 * @param {Function} emit - The function to emit events
 * @returns {Object} - An object containing the default class values, the validity state of the group, and the function to set the validation state for a field
 */

export default (fields, emit) => {
	// Store the validation states of the fields
	const fieldsValidStates = ref({})

	const defaultClassValues = inject("defaultClassValues")

	// Compute the validity state of the group
	const isGroupValid = computed(() => {
		// Check if the number of fields with validation states matches the total number of fields
		let sameLength = Object.keys(fieldsValidStates.value).length == Object.keys(fields).length

		// Detect if there are any false values in the group's validation states
		const is_any_invalid = Object.values(fieldsValidStates.value).includes(false)

		return sameLength && !is_any_invalid
	})

	// Set the validation state for a field
	const setValidState = (obj) => {
		if (!obj.name) {
			console.warn("Field name is required", obj)
			return
		}

		fieldsValidStates.value[obj.name] = obj.valid
	}

	const getClass = (field, type) => {
		return `${defaultClassValues.value[type] ?? ""} ${field[`${type}Class`] ?? ""}`
	}

	// Watch for changes in the validity state of the group and emit the "onValid" event
	watch(isGroupValid, (val) => {
		emit("onValid", val)
	})

	// Emit the initial validity state of the group on component mount
	onMounted(() => {
		emit("onValid", isGroupValid.value)
	})

	return { defaultClassValues, isGroupValid, setValidState, getClass }
}
