<script setup>
	const dropdownVisible = ref(false)

	const props = defineProps({
		click: Boolean,
		visible: Boolean,
		togglerClass: String
	})

	const emit = defineEmits(["update:visible"])
	watch(dropdownVisible, (visible) => emit("update:visible", visible))

	watch(
		() => props.visible,
		(visible) => {
			dropdownVisible.value = visible
		}
	)

	const handleClick = (value) => {
		if (props.click) {
			dropdownVisible.value = !dropdownVisible.value
		}
	}

	const handleEnter = (value) => {
		if (!props.click) openDropdown()
	}

	const handleLeave = (value) => {
		// if (!props.click) _closeDropdown()
		_closeDropdown()
	}

	let t
	const openDropdown = (value) => {
		t && clearTimeout(t)
		dropdownVisible.value = true
	}

	const _closeDropdown = (value) => {
		t = setTimeout(closeDropdown, 150)
	}

	const closeDropdown = () => (dropdownVisible.value = false)
</script>

<template>
	<div
		tabindex="0"
		@mouseleave="handleLeave"
		class="dropdown-component relative">
		<div
			:class="togglerClass"
			class="cursor-pointer h-full"
			@click="handleClick"
			@mouseenter="handleEnter">
			<slot
				:visible="dropdownVisible"
				:closeDropdown="closeDropdown"
				name="toggler" />
		</div>

		<t-fade>
			<div
				class="content-wrapper absolute top-full z-10"
				v-show="dropdownVisible">
				<slot
					:closeDropdown="closeDropdown"
					:visible="dropdownVisible"
					name="dropdown" />
			</div>
		</t-fade>
	</div>
</template>

<style lang="scss" scoped>
	.content-wrapper {
		width: calc(100% + 1rem);
		left: -0.5rem;
	}
</style>
