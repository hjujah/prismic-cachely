/* Composable function to handle a form field
 * @param {Object} props - The properties of the field
 * @param {string} props.name - The name of the field
 * @param {Function} props.emit - The function to emit events
 * @param {string} props.initialValue - The initial value of the field
 * @param {Object} props.rules - The validation rules for the field
 * @returns {Object} - An object containing the unique ID of the field, the error message, the value of the field, the function to handle blur events, the function to handle change events, and the validity state of the field
 */

export default ({ name, emit, initialValue, rules, onBlur }) => {
	// Generate a unique ID for the field
	const uid = Math.random().toString(36).substr(2, 9)

	// Use the useField composable to handle the field's value, error message, and validation
	const {
		errorMessage,
		value,
		handleBlur: _handleBlur,
		handleChange
	} = useField(() => name, rules, {
		initialValue
	})

	// Use the useIsFieldValid and useIsFieldDirty composable functions to compute the validity and dirtiness of the field
	const _isValid = useIsFieldValid(name)
	const _isDirty = useIsFieldDirty(name)
	const _isTouched = useIsFieldTouched(name)

	// Compute the validity state of the field
	const isValid = computed(() => ({
		name: name,
		valid: _isValid.value
	}))

	const errorVisible = computed(() => {
		return _isTouched.value && errorMessage.value
	})

	// Watch for changes in the value of the field and emit the "change" event
	watch(value, (val) => emit("change", val))

	// Watch for changes in the validity state of the field and emit the "onValid" event
	watch(isValid, (val) => emit("onValid", val))

	// Emit the initial validity state of the field on component mount
	onMounted(() => {
		emit("onValid", isValid.value)
	})

	const handleBlur = (e) => {
		_handleBlur(e)
		onBlur && onBlur({ name, value: value.value, valid: isValid.value.valid })
	}

	// Return an object containing the unique ID of the field, the error message, the value of the field, the function to handle blur events, the function to handle change events, and the validity state of the field
	return {
		uid,
		errorMessage,
		value,
		handleBlur,
		handleChange,
		isValid,
		errorVisible,
		_isDirty,
		_isTouched,
		_isValid
	}
}
