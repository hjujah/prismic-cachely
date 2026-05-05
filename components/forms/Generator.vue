<script setup>
	/**
	 * FormGenerator.vue
	 *
	 * This component is a form generator that utilizes the useFormGenerator composable for form validation and navigation in a multi-step form wizard.
	 *
	 * Props:
	 * - formScheme (Array): The form scheme, which is an array of groups where each group represents a step in the form wizard. Each group should have a "fields" object containing the form fields and their validation rules.
	 * - useSteps (Boolean): Optional prop to enable or disable the step-by-step navigation feature.
	 * - submitText (String): Optional prop to set the text for the submit button.
	 * - nextText (String): Optional prop to set the text for the next button.
	 * - prevText (String): Optional prop to set the text for the previous button.
	 *
	 * Events:
	 * - submit: Custom event emitted when the form is submitted. The event payload contains the form values.
	 *
	 * Slots:
	 * - prev: Slot for the previous step button. Exposes the prevStep function as a prop.
	 * - next: Slot for the next step button. Exposes the nextStep function as a prop.
	 * - button: Slot for the submit button.
	 *
	 * Example usage:
	 * <FormGenerator :formScheme="formScheme" :useSteps="true" @submit="handleFormSubmit">
	 *   <template #controls="{ prevStep, nextStep, prevDisabled, nextDisabled }">
	 *     <a @click="prevStep">Previous</a>
	 *     <a @click="nextStep">Next</a>
	 *   </template>
	 *   <template #button>
	 *     <button type="submit">Submit</button>
	 *   </template>
	 * </FormGenerator>
	 */

	import _isEqual from "lodash/isEqual"
	const emit = defineEmits(["submit", "onErrorChange"])

	const props = defineProps({
		formScheme: {
			type: Array,
			required: true
		},

		defaultClasses: {
			type: Object,
			default: () => ({
				element: "",
				errorMessage: "",
				label: "",
				input: ""
			})
		},

		useSteps: {
			type: Boolean
		},
		submitText: {
			type: String,
			default: "Submit"
		},
		nextText: {
			type: String,
			default: "Next"
		},
		prevText: {
			type: String,
			default: "Previous"
		},

		onInputBlur: {
			type: Function,
			default: () => () => {}
		}
	})

	const {
		submitForm,
		activeGroup,
		nextStep,
		prevStep,
		setValid,
		nextDisabled,
		prevDisabled,
		isValid,
		errorBag,
		errors
	} = useFormGenerator(props.formScheme, emit, props.defaultClasses)
</script>

<template>
	<form
		class="form"
		@submit.prevent="submitForm">
		<f-group
			:onInputBlur="onInputBlur"
			v-for="(group, index) in formScheme"
			:key="index"
			@onValid="setValid($event, index)"
			v-show="index == activeGroup || !useSteps"
			:fields="group.fields"
			:class="group.class">
		</f-group>

		<slot
			v-if="useSteps"
			name="controls"
			:prevDisabled="prevDisabled"
			:prevStep="prevStep"
			:nextStep="nextStep"
			:nextDisabled="nextDisabled">
			<div class="form__controls-wrapper">
				<a
					class="form__controls form__controls--prev"
					v-if="!prevDisabled"
					v-html="prevText"
					@click.prevent="prevStep"></a>

				<a
					class="form__controls form__controls--next"
					v-if="!nextDisabled"
					v-html="nextText"
					@click.prevent="nextStep"></a>
			</div>
		</slot>

		<slot
			:isValid="isValid"
			:errorBag="errorBag"
			name="button">
			<button
				v-if="isValid"
				class="form__submit-button"
				v-html="submitText"
				type="submit"></button>
		</slot>

		<slot />
	</form>
</template>
