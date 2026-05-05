<script setup>
	const props = defineProps({
		collection: {
			type: Object,
			required: true
		},
		filterFields: {
			type: Array,
			default: () => []
		},
		itemClass: {
			type: String,
			default: "basis-1/5"
		},
		selectedItemClass: {
			type: String,
			default: "bg-blue text-white"
		},
		fieldPrefix: {
			type: String,
			default: ""
		},
		field: {
			type: String,
			default: ""
		},
		allWording: {
			type: String,
			default: "All"
		},
		filterOptions: {
			type: [Array, Object]
		}
	})

	const selectedOptions = ref([])

	const emit = defineEmits(["change"])
	watch(selectedOptions, (opts) => emit("change", opts))
</script>

<template>
	<s-dropdown
		class="dropdown-filter"
		:click="true">
		<template #toggler="{ visible }">
			<div class="flex justify-between items-center">
				<div
					:class="selectedItemClass"
					class="flex-grow flex justify-center text-14">
					<span>{{ selectedOptions[0] || allWording }}</span>
				</div>

				<div class="icon-wrapper h-full flex items-center">
					<img
						class="icon"
						:class="{
							'rotate-180': visible
						}"
						src="/img/arrow-right-black.svg"
						alt="close" />
				</div>
			</div>
		</template>

		<template #dropdown="{ closeDropdown }">
			<filters
				:options="filterOptions"
				class="flex-grow mt-4"
				@onClick="closeDropdown"
				filterWrapperClass="!flex-col"
				v-model:selectedOptions="selectedOptions"
				:allText="allWording"
				:collection="collection"
				:hideActive="false"
				:filterFields="filterFields"
				:itemClass="itemClass"
				:fieldPrefix="fieldPrefix"
				:field="field" />
		</template>
	</s-dropdown>
</template>

<style lang="scss" scoped>
	.dropdown-filter {
		.icon-wrapper {
			width: 0.5rem;
			height: 0.5rem;
			@screen md {
				width: 1rem;
				height: 1rem;
			}
			.icon {
				object-fit: contain;
			}
		}
	}
</style>
