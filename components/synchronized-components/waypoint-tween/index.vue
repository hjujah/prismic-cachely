<script setup>
	/**
	 * Component: s-waypoint-tween
	 */

	import _props from "./props"
	const props = defineProps(_props)
</script>

<template>
	<s-waypoint-timeline
		class="s-waypoint-tween"
		:waitForFonts="waitForFonts"
		:tag="tag"
		v-slot="{ addToTimeline }">
		<s-tween-preset
			:class="tweenClass"
			@updated="addToTimeline"
			:from="from"
			:to="to"
			:preset="preset">
			<slot :addToTimeline="addToTimeline" />
		</s-tween-preset>
	</s-waypoint-timeline>
</template>
