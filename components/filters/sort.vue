<script setup>
	const route = useRoute()

	const { getFilterUrl } = useFilters({
		field: "sort"
	})

	const sortOption = computed(() => {
		if (route.query.sort) {
			return route.query.sort.split("_")[1]
		} else return ""
	})

	const emit = defineEmits(["change"])
	watch(sortOption, (option) => {
		emit("change", option)
	})
</script>

<template>
	<s-dropdown class="sort">
		<template #toggler="{ visible }">
			<div>
				<span class="">DATE {{ sortOption }}</span>

				<!-- <nav-triangle
					class="duration-500"
					:class="{
						'rotate-180': visible
					}" /> -->
			</div>
		</template>

		<template #dropdown="{ closeDropdown }">
			<div class="flex flex-col">
				<nuxt-link
					class="option-title"
					:to="getFilterUrl('date_asc', 'sort')">
					asc
				</nuxt-link>

				<nuxt-link
					class="option-title"
					:to="getFilterUrl('date_desc', 'sort')">
					desc
				</nuxt-link>
			</div>
		</template>
	</s-dropdown>
</template>

<style lang="scss" scoped>
	.dropdown-filter {
	}
</style>
