<template>
	<transition
		@enter="enter"
		@leave="leave"
		:mode="mode"
		:css="false">
		<slot></slot>
	</transition>
</template>

<script setup>
	import { gsap } from "gsap"

	const props = defineProps({
		duration: {
			default: 0.4,
			type: Number
		},
		delay: {
			default: 0,
			type: Number
		},
		mode: {
			type: [Boolean, String],
			default: "default"
		},
		to: {
			type: Number,
			default: 1
		}
	})

	const enter = (el, onComplete) => {
		el.classList.add("pointer-events-auto")

		gsap.fromTo(
			el,
			{
				opacity: 0
			},
			{
				opacity: props.to,
				overwrite: true,
				duration: props.duration,
				ease: "Power2.easeOut",
				onComplete
			}
		)
	}

	const leave = (el, onComplete) => {
		el.classList.add("pointer-events-none")

		gsap.to(el, {
			opacity: 0,
			overwrite: true,
			duration: props.duration,
			delay: props.delay,
			ease: "Power1.easeIn",
			onComplete
		})
	}
</script>
