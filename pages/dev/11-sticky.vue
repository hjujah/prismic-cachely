<script setup></script>

<template>
	<main class="page overflow-hidden">
		<s-lenis>
			<div class="h-[50vh] bg-pink w-full"></div>

			<div
				v-for="i in 2"
				:key="i"
				class="row mx-20">
				<div class="px-20 py-20 text-black bg-slate-100 basis-1/2">
					<p v-for="i in 20">
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam ab numquam
						quaerat ducimus, animi minus libero maiores magnam. Quasi adipisci aspernatur
						iure architecto tempore cumque non dolores! Sed, fuga soluta.
					</p>
				</div>

				<div class="basis-1/2">
					<s-sticky
						:cssSticky="true"
						:startOffset="0"
						:endOffset="0"
						v-slot="{ progress }">
						<section class="p-12 bg-slate-50">
							<ContentDoc
								class="prose prose-slate"
								path="/sticky" />
							progress :{{ progress }}

							<s-timeline
								:progress="progress"
								:timelineOptions="{ paused: true }"
								v-slot="{ addToTimeline }">
								<s-tween
									@updated="addToTimeline"
									:from="{
										x: 100
									}"
									:to="{
										x: 0,
										duration: 1.5
									}">
									I am animated using the Synchronized Tween component!
								</s-tween>

								<s-tween
									@updated="addToTimeline"
									:from="{
										y: 500,
										scale: 0,
										rotate: 180
									}"
									:to="{
										y: 0,
										scale: 1,
										rotate: 0,
										duration: 1.5
									}">
									I am animated using the Synchronized Tween component!
								</s-tween>
							</s-timeline>
						</section>
					</s-sticky>
				</div>

				<div class="px-10 py-80 text-black bg-slate-300 w-[100vw] h-36"></div>
			</div>

			<div>
				<div class="h-[20vh] bg-pink"></div>
			</div>
		</s-lenis>
	</main>
</template>

<style lang="scss" scoped>
	.sticky-wrapper {
		height: 300vh;
	}
</style>
