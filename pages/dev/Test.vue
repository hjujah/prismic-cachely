<script setup>
	import * as yup from "yup"

	definePageMeta({
		layout: "microsite"
	})

	const form_scheme = [
		{
			class: "group-1 p-4 border-1 bg-gray-100",
			fields: {
				firstName: {
					value: null,
					rules: yup.string().required(),
					placeholder: "First Name",
					label: "First Name Label",
					component: "text",
					elementClass: "ELEMENTCLASS small",
					inputClass: "INPUTCLASS",
					labelClass: "LABELCLASS",
					errorMessageClass: "ERRORCLASS"
				},

				lastName: {
					value: null,
					rules: yup.string().required().min(4),
					placeholder: "Last Name",
					label: "Last Name Label",
					elementClass: "small",
					component: "text"
				},

				gender: {
					value: null,
					rules: yup.array().min(1),
					label: "Choose your gender",
					elementClass: "text-16 w-full",
					component: "checkbox",
					options: ["male", "female"]
				}
			}
		},

		{
			class: "group-2 p-4 border-1 bg-black-50",
			fields: {
				email: {
					value: null,
					rules: yup.string().required().email(),
					placeholder: "Email Address",
					label: "Email Label",
					elementClass: "small",
					component: "text",
					type: "email"
				}
			}
		}
	]

	const handleSubmit = (values) => {
		console.log("[testPage] on submit", values)
	}
</script>

<template>
	<main class="p-80 bg-slate-50">
		<div class="bg-green">
			<s-tween-preset preset="fadeUp">FADE ME UP!!!</s-tween-preset>

			<f-generator
				:default-classes="{
					element: 'defaultELEMENTCLASS',
					label: 'defaultLABELCLASS',
					input: 'defaultINPUTCLASS',
					errorMessage: 'defaultERRORMESSAGECLASS'
				}"
				:use-steps="true"
				:form-scheme="form_scheme"
				@submit="handleSubmit">
				<template #button="{ isValid }">
					valid: {{ isValid }}
					<button
						v-if="isValid"
						tag="button"
						text="sega mega"
						type="submit"></button>
				</template>

				<template #controls="{ prevStep, nextStep, prevDisabled, nextDisabled }">
					<div class="flex">
						<button
							v-if="!prevDisabled"
							@click.native="prevStep"
							text="prev"></button>

						<client-only>
							<teleport to="#next-wrapper">
								<button
									v-if="!nextDisabled"
									@click.native="nextStep"
									text="next"></button>
							</teleport>
						</client-only>
					</div>
				</template>
			</f-generator>
		</div>

		<div id="next-wrapper"></div>
	</main>
</template>
