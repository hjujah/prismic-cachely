<script setup>
	// navigation object
	const { getNavigationGroups, navMain } = useAppNavigation()
	const navItems = getNavigationGroups(navMain)

	const store = useAppStore()
	const { openFormPopup } = storeToRefs(store)

	// app menu
	const { isMenuOpen, toggleMenu } = useAppMenu()
</script>

<template>
	<div class="app-menu">
		<a-plus
			@click="toggleMenu"
			:close="true"
			size="1rem" />

		<app-menu-item
			v-for="(item, index) in navItems"
			:key="item.id"
			:item="item" />
	</div>
</template>
<style scoped lang="scss">
	.app-menu {
	}
</style>
