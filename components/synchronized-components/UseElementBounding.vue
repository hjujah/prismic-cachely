<template>
	<div ref="target"><slot :bounds="bounds" /></div>
</template>
<script setup>
	const target = ref()
	const bounds = useGetElementBounds(target)
</script>
