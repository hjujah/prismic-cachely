<script setup>
	import _props from "./props"
	const props = defineProps(_props)

	const bounds = ref(false)

	const _endOffset = computed(() => {
		return props.preset == "reachTop" ? -bounds.value.height : 0
	})

	const _startOffset = computed(() => {
		return props.preset == "reachTop" ? 0 : 0
	})
</script>

<template>
	<s-scrolling-element
		:debug="debug"
		v-model:bounds="bounds"
		:startOffset="_startOffset"
		:endOffset="_endOffset">
		<slot />
	</s-scrolling-element>
</template>
