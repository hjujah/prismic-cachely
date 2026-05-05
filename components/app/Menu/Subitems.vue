<script setup>
	const props = defineProps({
		items: Array,
		title: String
	})

	const emit = defineEmits(["close"])
	const closeSubitems = () => emit("close")
	const { toggleMenu } = useAppMenu()
</script>

<template>
	<div class="fixed w-full h-full top-0 left-0 bg-white z-50">
		<app-menu-header class="mb-4 menu-padding border-b border-slate-300">
			<template #logo>
				<div class="absolute w-full h-full bg-white top-0 left-0">
					<button @click="closeSubitems">
						<img
							src="/img/arrow-right-black.svg"
							alt="Back"
							class="w-4 h-4" />
					</button>
				</div>
			</template>

			<h3
				class="grow-1 text-center text-14"
				v-html="title"></h3>

			<div class="basis-0 flex-1 flex justify-end">
				<a-plus
					@click="toggleMenu"
					size="1rem"
					:close="true" />
			</div>
		</app-menu-header>

		<app-megamenu-group
			class="menu-padding !pr-16"
			:items="items" />
	</div>
</template>
