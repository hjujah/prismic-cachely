<script setup>
	/**
	 * This is a component for animating SVG paths to simulate drawing lines.
	 * It uses the `DrawSVGPlugin` from the gsap library to perform the animations.
	 *
	 * Props:
	 * - duration: The total duration (in seconds) of the line animation (default is 1.4)
	 * - ease: The gsap easing function to use for the animation (default is "Power2.easeOut")
	 * - delay: The amount of time (in seconds) to wait before starting the animation (default is 0)
	 * - paused: A boolean flag indicating whether the animation should start paused (default is true)
	 *
	 * Events:
	 * - addTween(tween, delay): Emits an event with the gsap tween and delay used by parent components to add this animation to a timeline
	 *
	 * Usage:
	 * <DrawSvg :duration="2" :delay="1.5" @addTween="(tween, delay) => timeline.add(tween, delay)">
	 *   <svg class="my-svg">
	 *     <path class="drawing" d="M5 20 l215 0" />
	 *     <path class="drawing" d="M10 40 l215 0" data-reversed="true" />
	 *   </svg>
	 * </DrawSvg>
	 */

	import { gsap } from "gsap"
	import { DrawSVGPlugin } from "gsap/DrawSVGPlugin"
	import _each from "lodash/each"

	gsap.registerPlugin(DrawSVGPlugin)

	const props = defineProps({
		duration: {
			default: 1.4,
			type: Number
		},
		ease: {
			default: "Power2.easeInOut",
			type: String
		},
		delay: {
			default: 0,
			type: Number
		},
		paused: {
			default: false,
			type: Boolean
		},
		parallel: {
			default: false,
			type: Boolean
		}
	})

	const loaded = ref(false)
	const el = ref(null)
	let tween = null

	const initLineTimeline = () => {
		let consecutiveLines = el.value.querySelectorAll(".drawing")
		const lineTimeline = gsap.timeline({ paused: props.paused })

		_each(consecutiveLines, (line) => {
			let from = line.dataset.reversed ? "100% 100%" : "0%"
			let to = line.dataset.reversed ? "0% 100%" : "100%"
			let duration = line.getTotalLength()

			let offset = props.parallel ? 0 : ">"

			lineTimeline.fromTo(
				line,
				{
					drawSVG: from
				},
				{
					duration,
					drawSVG: to,
					ease: props.ease
				},
				offset
			)
		})

		lineTimeline.duration(props.duration)
		return lineTimeline
	}

	const emit = defineEmits(["addTween"])
	onMounted(() => {
		tween = initLineTimeline()

		nextTick(() => {
			loaded.value = true
			emit("addTween", tween, props.delay)
		})
	})
</script>

<template>
	<div
		ref="el"
		:class="{
			'opacity-0': !loaded
		}"
		class="line-anim-comp draw-svg">
		<slot />
	</div>
</template>
