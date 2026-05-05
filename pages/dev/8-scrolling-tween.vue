<script setup></script>

<template>
	<main class="prose prose-slate prose-sm">
		<s-lenis>
			<section class="p-12 bg-slate-100">
				<ContentDoc path="/scrolling-tween" />
			</section>

			<s-scrolling-tween
				:no-overscroll="true"
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
				class="h-[50vh] w-full bg-orange-400 overflow-hidden my-20">
				<img
					class="w-full h-full"
					src="/img/sample.jpg" />
			</s-scrolling-tween>
		</s-lenis>
	</main>
</template>
