<script setup></script>

<template>
	<main>
		<s-lenis>
			<section class="p-12 prose prose-slate prose-sm">
				<ContentDoc path="/scrolling-timeline" />
			</section>

			<s-scrolling-timeline
				:no-overscroll="true"
				v-slot="{ addToTimeline }"
				v-for="i in 500"
				:key="i"
				:from="{
					scale: 0.5,
					rotate: 0
				}"
				:to="{
					scale: 1,
					rotate: 180
				}"
				class="h-[50vh] w-full bg-orange-400 overflow-hidden my-20 relative">
				<s-tween
					:from="{ rotate: 20, scale: 2 }"
					:to="{ rotate: 0, scale: 1 }"
					@updated="addToTimeline">
					<img
						class="w-full h-full"
						src="/img/sample.jpg" />
				</s-tween>

				<s-tween
					class="absolute top-24 text-white z-20"
					:from="{ x: 120 }"
					:to="{ x: -0 }"
					@updated="addToTimeline">
					<h1>Or move this too!!!</h1>
				</s-tween>

				<s-tween
					class="absolute top-48 text-white z-20"
					:from="{ scale: 1.5, y: 100, transformOrigin: 'left' }"
					:to="{ scale: 1, y: 0, transformOrigin: 'left' }"
					@updated="addToTimeline">
					<h1>And scale or do whatever!</h1>
				</s-tween>
			</s-scrolling-timeline>
		</s-lenis>
	</main>
</template>
