<script setup>
	import { gsap } from "gsap"

	const props = defineProps({
		disableEventsOnLeave: {
			type: Boolean,
			default: true
		},
		mode: {
			type: [Boolean, String],
			default: "default"
		},
		css: {
			type: Boolean,
			default: false
		},
		appear: {
			type: Boolean,
			default: false
		},
		absolute: {
			type: Boolean,
			default: true
		},
		from: {
			type: Object,
			default: () => ({
				opacity: 0
			})
		},
		to: {
			type: Object,
			default: () => ({
				opacity: 1,
				duration: 0.8,
				ease: "Power1.easeIn",
				overwrite: true
			})
		},
		leave_to: {
			type: [Object, Boolean],
			default: () => ({
				opacity: 0,
				duration: 0.8,
				ease: "Power1.easeIn",
				overwrite: true
			})
		}
	})

	const enter = (el, onComplete) => {
		if (!props.to || props.to.duration == 0) return onComplete()

		// el.classList.add("pointer-events-auto")
		gsap.fromTo(el, { ...props.from, onComplete }, props.to)
	}

	const leave = (el, onComplete) => {
		props.disableEventsOnLeave && el.classList.add("pointer-events-none")

		if (props.mode == "default" && props.absolute)
			el.classList.add("!absolute", "top-0", "left-0")

		if (!props.leave_to || props.leave_to.duration == 0) return onComplete()

		gsap.to(el, { ...props.leave_to, onComplete })
	}
</script>

<template>
	<transition
		:mode="mode"
		@enter="enter"
		@leave="leave"
		:css="false">
		<slot></slot>
	</transition>
</template>
