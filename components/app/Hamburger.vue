<template>
	<button
		role="button"
		aria-label="button"
		class="hamburger pr-0 min-w-0 inline-block border-0 m-0 focus:outline-none overflow-visible"
		type="button"
		:class="[
			{
				'hamburger--is-active': isMenuOpen || scrollingStarted
			},
			`hamburger--${theme}`
		]">
		<span
			class="hamburger-box w-[1.166rem] h-[.6rem] relative block cursor-pointer focus:outline-none">
			<span class="line line--1"></span>

			<!-- <span class="line line--2"></span> -->

			<span class="line line--3"></span>
		</span>
	</button>
</template>

<script setup>
	const props = defineProps({
		isMenuOpen: {
			type: Boolean
		},
		scrollingStarted: {
			type: Boolean
		},
		theme: {
			type: String,
			default: "light",
			validator: (value) => ["light", "dark"].includes(value)
		}
	})
</script>
<style lang="postcss" scoped="">
	.hamburger {
		.hamburger-box {
			.line {
				@apply absolute left-0 block w-full h-0.5 origin-center transition-all duration-500 bg-black;
				&--1 {
					@apply top-0;
				}

				&--2 {
					@apply top-2/4;
					transform: translate3d(0, -50%, 0);
				}

				&--3 {
					@apply bottom-0;
				}
			}
		}

		&--light {
			.line {
				@apply bg-white; 
			}
		}

		&--dark {
			.line {
				/* @apply bg-black; */
			}
		}

		&--is-active {
			.hamburger-box {
				.line{
					@apply bg-white;
				}
				.line--1 {
					@apply w-full top-2/4;
					transform: translate3d(0, -50%, 0) rotate(45deg) translateZ(0);
				}

				.line--2 {
					@apply opacity-0;
				}

				.line--3 {
					@apply w-full bottom-2/4;
					transform: translate3d(0, 50%, 0) rotate(-45deg) translateZ(0);
				}
			}
		}
	}
</style>
