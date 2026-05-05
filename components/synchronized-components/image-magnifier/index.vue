<script setup>
	const props = defineProps({
		image: {
			type: Object
		},
		magnifierSize: {
			type: String,
			default: "16rem"
		},
		magnifierClass: {
			type: String,
			default: "absolute border border-lightGray bg-beige4 overflow-hidden z-20"
		}
	})

	const picture = ref(false)
	const { elementX, elementY, elementHeight, elementWidth, isOutside } =
		useMouseInElement(picture)

	const xPercentage = computed(() => elementX.value / elementWidth.value, 0, 1)
	const yPercentage = computed(() => elementY.value / elementHeight.value, 0, 1)

	const position_y = computed(() => {
		return mapRange(yPercentage.value, 0, 1, 0.2, 0.8)
	})

	const position_x = computed(() => {
		return mapRange(xPercentage.value, 0, 1, 0.1, 0.9)
	})

	const size = computed(() => {
		return {
			unit: props.magnifierSize.replace(/[\W\d]/g, ""),
			number: parseInt(props.magnifierSize)
		}
	})

	const magnifierStyle = computed(() => ({
		width: `${size.value.number}${size.value.unit}`,
		height: `${size.value.number}${size.value.unit}`,
		left: `${size.value.number / 2}${size.value.unit}`,
		top: `${size.value.number / 2}${size.value.unit}`
	}))

	const pictureStyle = computed(() => ({
		left: `${size.value.number / 2}${size.value.unit}`,
		top: `${size.value.number / 2}${size.value.unit}`
	}))
</script>

<template>
	<div class="relative h-full">
		<!-- SMALL IMAGE -->
		<s-tween
			:continuous="false"
			:to="{
				x: position_x * elementWidth,
				y: position_y * elementHeight,
				duration: 1,
				opacity: isOutside ? 0 : 1,
				scale: isOutside ? 0.3 : 1,
				ease: 'Power4.easeOut'
			}"
			:style="magnifierStyle"
			:class="magnifierClass">
			<s-tween
				class="absolute"
				:continuous="false"
				:to="{
					x: `${-xPercentage * 100}%`,
					y: `${-yPercentage * 100}%`,
					duration: 1,
					ease: 'Power4.easeOut'
				}">
				<s-picture
					:style="pictureStyle"
					class="h-[3000px] relative"
					innerClass="h-full"
					:useOriginalRatio="true"
					:image="image"
					sizes="sm:4000px md:4000px lg:4000px xl:4000px"
					:alt="image.alt" />
			</s-tween>
		</s-tween>
		<!-- END :: SMALL IMAGE -->

		<!-- BIG IMAGE -->
		<s-picture
			ref="picture"
			class="h-full w-[80vw] lg:w-auto"
			innerClass="h-full bg-beige4"
			:useOriginalRatio="true"
			:image="image"
			sizes="sm:1080px md:1080px lg:1080px xl:1920px"
			:alt="image.alt" />
		<!-- END :: BIG IMAGE -->
	</div>
</template>
