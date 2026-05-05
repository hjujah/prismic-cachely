<script setup></script>

<template>
	<main>
		<s-lenis>
			<section class="p-12 bg-slate-100">
				<ContentDoc path="/waypoint-parallax" />
			</section>

			<h2 class="my-8">Scroll for a demo</h2>

			<div
				v-for="i in 10"
				class="row my-20">
				<div class="h-[60vh] w-full bg-orange-400">
					<s-waypoint-parallax
						:wrapped="true"
						:factor="0.2">
						<img
							class="w-full h-full"
							src="/img/sample.jpg" />
					</s-waypoint-parallax>
				</div>

				<s-waypoint-parallax
					class="basis-1/4 z-10"
					:noOverscroll="false"
					:wrapped="false"
					:factor="-0.1">
					<div class="box-content px-10 py-80 text-black bg-violet-500 w-[32%] h-4"></div>
				</s-waypoint-parallax>

				<s-waypoint-parallax
					class="basis-1/4 z-10"
					:noOverscroll="false"
					:wrapped="false"
					:factor="-0.3">
					<div class="box-content px-10 py-80 text-black bg-violet-500 w-[32%] h-4"></div>
				</s-waypoint-parallax>

				<s-waypoint-parallax
					class="basis-1/4 z-10"
					:wrapped="false"
					:noOverscroll="false"
					:factor="0.4"
					:extraProps="[]">
					<div class="box-content px-10 py-80 text-black bg-violet-500 w-[32%] h-4"></div>
				</s-waypoint-parallax>

				<div class="h-[40vh] w-full bg-orange-400 relative">
					<s-waypoint-parallax
						:wrapped="true"
						:factor="0.2">
						<img
							class="w-full h-full"
							src="/img/sample.jpg" />
					</s-waypoint-parallax>
				</div>
			</div>
		</s-lenis>
	</main>
</template>
