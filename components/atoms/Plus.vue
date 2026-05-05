<script setup>
	const props = defineProps({
		active: {
			type: Boolean
		},
		color: {
			type: String,
			default: "black"
		},
		size: {
			type: String,
			default: "2rem"
		},
		lineWidth: {
			type: String,
			default: "2px"
		},
		close: {
			type: Boolean,
			default: false
		},
		hoverable: {
			type: Boolean,
			default: false
		}
	})

	const hovered = ref(false)

	const isActive = computed(() => {
		return props.active || (props.hoverable && hovered.value)
	})
</script>

<template>
	<div
		@mouseenter="hovered = true"
		@mouseleave="hovered = false"
		:class="{
			[`plus--${close ? 'close' : 'default'}--active`]: isActive,
			'plus--default': !close,
			'plus--close': close,
			'plus--hoverable': hoverable
		}"
		class="plus">
		<div class="relative w-full h-full inner-wrapper">
			<div class="plus__line plus__line--1 center" />
			<div class="plus__line plus__line--2 center" />
		</div>
	</div>
</template>

<style lang="scss" scoped>
	.plus {
		width: v-bind(size);
		height: v-bind(size);
		@apply transition-transform duration-500;

		&--hoverable {
			@apply cursor-pointer;
		}

		.plus__line {
			height: v-bind(lineWidth);
			background: v-bind(color);
			@apply w-full absolute transition-transform duration-500;

			&--2 {
				@apply left-1/2	top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90;
			}
		}

		&--close {
			@apply rotate-45;
			&--active {
				// @apply rotate-135;
			}
		}

		&--default {
			&--active {
				.plus__line--2 {
					@apply left-1/2	top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-0;
				}
			}
		}
		.inner-wrapper {
			@apply transition-transform duration-500;
			&:hover {
				@apply rotate-180;
			}
		}
	}
</style>
