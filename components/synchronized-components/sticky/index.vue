<script setup>
	import _props from "./props"
	const props = defineProps(_props)

	const emit = defineEmits(["update:progress"])
	const el = ref(null)
	const outerEl = ref(null)

	const { currentProgress } = useSticky({
		el,
		outerEl,
		emit,
		startOffset: computed(() => props.startOffset),
		endOffset: computed(() => props.endOffset),
		moveOffset: computed(() => props.moveOffset),
		noOverscroll: computed(() => props.noOverscroll),
		cssSticky: computed(() => props.cssSticky)
	})
</script>

<template>
	<div
		ref="outerEl"
		class="s-sticky-outer h-full relative">
		<div
			ref="el"
			:class="[
				's-sticky',
				{
					'sticky top-0': props.cssSticky
				}
			]">
			<slot :progress="currentProgress" />
		</div>
	</div>
</template>
