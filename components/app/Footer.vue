<script setup>
	const { app } = useAppStore()

	const { getNavigationGroups, navFooter } = useAppNavigation()
	const navItems = getNavigationGroups(navFooter)

	onMounted(() => {})
</script>

<template>
	<footer class="app-footer">
		<h1>footer</h1>

		<template v-for="(item, index) in navItems">
			<PrismicLink :field="item.data.link">
				<span v-html="item.data.title" />
			</PrismicLink>
		</template>
	</footer>
</template>

<style lang="scss">
	.app-footer {
	}
</style>
