<script setup>
	const props = defineProps({
		name: {
			type: String,
			required: true
		},
		label: {
			type: String
		},
		placeholder: {
			type: String
		},
		type: {
			type: String,
			default: "text"
		},
		labelClass: {
			type: String,
			default: ""
		},
		errorMessageClass: {
			type: String,
			default: ""
		},
		inputClass: {
			type: String,
			default: ""
		},
		rules: {
			type: Object
		},
		value: {
			type: String
		},
		onBlur: {
			type: Function,
			default: () => {}
		}
	})

	const emit = defineEmits(["change", "onValid"])
	const { uid, errorMessage, value, handleBlur, handleChange, errorVisible } = useFormInput({
		name: props.name,
		initialValue: props.value,
		rules: props.rules,
		onBlur: props.onBlur,
		emit: emit
	})
</script>

<template>
	<div class="form-input form-input--text-area">
		<label
			v-if="label"
			:class="labelClass"
			:for="uid"
			v-html="label" />

		<textarea
			rows="14"
			:class="inputClass"
			@input="handleChange"
			@blur="handleBlur"
			:id="uid"
			:placeholder="placeholder"
			:value="value"
			:name="name" />

		<span
			v-if="errorVisible"
			v-html="errorMessage"
			:class="errorMessageClass" />
	</div>
</template>
