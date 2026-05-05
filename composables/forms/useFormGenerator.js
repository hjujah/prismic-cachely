/*
  Form Generator Composable

  This composable provides form validation and navigation for a multi-step form wizard in Vue/Nuxt 3.

  Dependencies:
  - vee-validate: Form validation library
  - yup: Schema validation library
  - lodash-es: Utility library for accessing nested object properties

  Usage:
  - Import this composable and use it in your form component.
  - Pass the form scheme (array of groups) and an emit function as parameters to the composable.
  - Each group should have a "fields" object containing the form fields and their validation rules.
  - The emit function is used to emit the "submit" event with the form values when the form is submitted.
*/

import * as yup from "yup"
import { get, isEqual } from "lodash-es"

export default (form_scheme, emit, defaultClassValues) => {
  // Create rules object from form_scheme
  const rules = form_scheme.reduce((acc, group) => {
    for (const [key, value] of Object.entries(group.fields)) {
      acc[key] = value.rules
    }
    return acc
  }, {})

  // provide default class values for form elements
  provide(
    "defaultClassValues",
    computed(() => ({ ...defaultClassValues }))
  )

  // Create yup validation schema with rules
  const validationSchema = yup.object(rules)

  // Initialize form using useForm from vee-validate
  const { errors, errorBag, values } = useForm({ validationSchema })

  // Check if the form is valid and dirty
  const _isValid = useIsFormValid()
  const _isDirty = useIsFormDirty()
  const _isTouched = useIsFormTouched()

  const isValid = computed(() => _isValid.value && _isDirty.value)

  // Store the validation states for each group
  const groupStates = ref({})

  // Set the validation state for a specific group
  const setValid = (value, index) => (groupStates.value[index] = value)

  // Submit the form
  const submitForm = useSubmitForm((values, actions) => {
    emit("submit", values)
    // Reset the form
    actions.resetForm()
  })

  // Track the active group
  const activeGroup = ref(0)

  // Go to the next step (group)
  const nextStep = () => {
    if (!nextDisabled.value) {
      activeGroup.value++
    }
  }

  // Go to the previous step (group)
  const prevStep = () => {
    if (!prevDisabled.value) {
      activeGroup.value--
    }
  }

  // Check if the active group is valid
  const activeGroupValid = computed(() => !!groupStates.value[activeGroup.value])

  const nextDisabled = computed(() => {
    return !activeGroupValid.value || activeGroup.value == form_scheme.length - 1
  })

  const prevDisabled = computed(() => {
    return activeGroup.value == 0
  })

  watch(errorBag, (val, oldVal) => {
    if (_isTouched.value && !isEqual(val, oldVal)) {
      emit("onErrorChange", val)
    }
  })

  return {
    errors, // Validation errors
    errorBag, // Error bag object
    values, // Form values
    isValid, // Whether the form is valid and dirty
    activeGroup, // Currently active group
    activeGroupValid, // Whether the active group is valid
    nextDisabled, // Whether the next button is disabled
    prevDisabled, // Whether the previous button is disabled
    _isDirty, // Whether the form is dirty
    nextStep, // Function to go to the next step (group)
    prevStep, // Function to go to the previous step (group)
    setValid, // Function to set the validation state for a group
    submitForm // Function to submit the form,
  }
}
