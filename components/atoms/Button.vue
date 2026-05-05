<script setup>
	const props = defineProps({
		text: {
			type: String
		}
	})
</script>

<template>
	<button class="button-wrapper">
		<span
			class=""
			v-html="text" />
	</button>
</template>

<style lang="scss" scoped>
	.button-wrapper {
	}
</style>
