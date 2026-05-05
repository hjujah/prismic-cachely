<script setup>
  const props = defineProps({
    name: {
      type: String,
      required: true
    },
    label: {
      type: String
    },
    type: {
      type: String,
      default: "text"
    },
    labelClass: {
      type: String
    },
    errorMessageClass: {
      type: String
    },
    inputClass: {
      type: String,
      default: ""
    },
    rules: {
      type: Object
    },
    options: {
      type: Array
    },
    multiple: {
      type: Boolean,
      default: false
    },
    onBlur: {
      type: Function,
      default: () => {}
    }
  })

  const emit = defineEmits(["change", "onValid"])
  const { uid, errorMessage, value, handleBlur, handleChange, errorVisible } =
    useFormInput({
      name: props.name,
      initialValue: props.value,
      rules: props.rules,
      onBlur: props.onBlur,
      emit: emit
    })

  const model = ref([])
  watch(model, (val) => {
    if (props.multiple) {
      value.value = val
      return
    }

    // if not multiple select last value
    value.value = val[val.length - 1]

    // keep only one selected
    model.value = val.length > 1 ? val.slice(-1) : val
  })
</script>

<template>
  <div class="form-input__text">
    <label
      v-html="label"
      :class="['form-input__text__label', labelClass]" />

    <label
      v-for="option in options"
      :class="inputClass"
      :for="uid"
      class="form-input__text__label">
      <input
        @input="handleChange"
        @blur="handleBlur"
        :id="uid"
        :name="name"
        :value="option"
        v-model="model"
        type="checkbox" />
      <span v-html="option" />
    </label>

    <span
      v-if="errorVisible"
      v-html="errorMessage"
      :class="errorMessageClass" />
  </div>
</template>
