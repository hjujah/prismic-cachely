<script setup>
	/**
	 * FormGroup.vue
	 *
	 * This component represents a group of form fields within a form. It manages the validation state of the fields within the group and emits an "onValid" event when the group becomes valid or invalid.
	 *
	 * Props:
	 * - fields (Object): The form fields within the group. Each field should have properties like "class", "rules", "name", "type", "label", "placeholder", and "component".
	 *
	 * Events:
	 * - onValid: Custom event emitted when the group becomes valid or invalid. The event payload contains the validity state of the group.
	 *
	 * Example usage:
	 * <f-group :fields="formFields" @onValid="handleGroupValid"></f-group>
	 */

	const props = defineProps({
		fields: {
			type: Object,
			required: true
		},
		onInputBlur: {
			type: Function,
			default: () => () => {}
		}
	})

	const emit = defineEmits(["onValid"])
	const { setValidState, getClass } = useFormGroup(props.fields, emit)
</script>

<template>
	<div class="form-group">
		<component
			@onValid="setValidState"
			:onBlur="onInputBlur"
			v-for="(field, name) in fields"
			:key="name"
			:field="field"
			:options="field.options"
			:class="getClass(field, 'element')"
			:input-class="getClass(field, 'input')"
			:error-message-class="getClass(field, 'errorMessage')"
			:label-class="getClass(field, 'label')"
			:rules="field.rules"
			:name="name"
			:value="field.value"
			:type="field.type"
			:label="field.label"
			:placeholder="field.placeholder"
			:is="`f-input-${field.component}`"></component>
	</div>
</template>
