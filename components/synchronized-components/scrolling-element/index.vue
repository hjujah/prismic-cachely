<!--
Scrolling Element Component

This component serves as a wrapper for elements that require tracking and responding to
scrolling behavior. It utilizes the "useScrollingElement" composable to calculate the
scroll progress and position of the wrapped element within the viewport. The component
provides options to set custom start and end offsets for tracking, and it can emit updates
on the element's bounding box and scroll progress.

Props:
  - tag: The HTML tag to be used for the outer wrapper (default: "div").
  - startOffset: The offset from the top at which the scrolling tracking should start (default: 0).
  - endOffset: The offset from the bottom at which the scrolling tracking should end (default: 0).
  - debug: A boolean flag to enable debug information on the scrolling progress (default: false).

Example Usage:
  <s-scrolling-element
    tag="section"
    :startOffset="100"
    :endOffset="50"
    :debug="true"
  >
    Your content here
  </s-scrolling-element>
-->

<script setup>
	import _props from "./props"
	const props = defineProps(_props)

	const el = ref(null)
	const emit = defineEmits(["update:bounds", "update:progress"])

	const { currentProgress, elementBounds, start, end } = useScrollingElement({
		el,
		startOffset: computed(() => props.startOffset),
		endOffset: computed(() => props.endOffset),
		noOverscroll: computed(() => props.noOverscroll),
		emit
	})
</script>

<template>
	<div
		class="scrolling-element relative"
		:tag="tag"
		ref="el">
		<slot :elementBounds="elementBounds" />

		<!-- DEBUG -->
		<client-only v-if="debug">
			<div class="absolute bottom-8">
				Start: {{ start }}<br />
				End: {{ end }}<br />
				Bounds:
				<pre>{{ elementBounds }}</pre>
				<br />
				<h3>Progress: {{ currentProgress.toFixed(3) }}</h3>
			</div>
		</client-only>
		<!-- END :: DEBUG -->
	</div>
</template>
