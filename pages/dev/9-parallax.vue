<script setup></script>

<template>
	<main>
		<s-lenis>
			<!-- <div class="h-[100vh] w-full bg-orange-400">
				<s-parallax
					:wrapped="true"
					:noOverscroll="true"
					:factor="0.2">
					<img
						class="w-full h-full"
						src="/img/sample.jpg" />
				</s-parallax>
			</div> -->

			<s-parallax
				class="basis-1/4 z-20 relative"
				:noOverscroll="true"
				:wrapped="false"
				:factor="0.1">
				<div class="box-content px-10 py-80 text-black bg-violet-500 w-[32%] h-4"></div>
			</s-parallax>

			<div class="h-[100vh] w-full bg-orange-400">
				<s-parallax
					:wrapped="true"
					:noOverscroll="false"
					:factor="0.2">
					<img
						class="w-full h-full"
						src="/img/sample.jpg" />
				</s-parallax>
			</div>

			<s-parallax
				class="basis-1/4 z-10 relative relative"
				:noOverscroll="true"
				:wrapped="false"
				:factor="-0.1">
				<div class="box-content px-10 py-80 text-black bg-violet-500 w-[32%] h-4"></div>
			</s-parallax>

			<div class="h-[100vh] w-full bg-orange-400">
				<s-parallax
					:noOverscroll="true"
					:wrapped="true"
					:factor="0.2">
					<img
						class="w-full h-full"
						src="/img/sample.jpg" />
				</s-parallax>
			</div>

			<section class="p-12 bg-slate-100">
				<ContentDoc path="/parallax" />
			</section>

			<h2 class="my-8">Scroll for a demo</h2>

			<div
				v-for="i in 10"
				class="row my-20">
				<div class="h-[60vh] w-full bg-orange-400">
					<s-parallax
						:wrapped="true"
						:factor="0.2">
						<img
							class="w-full h-full"
							src="/img/sample.jpg" />
					</s-parallax>
				</div>

				<s-parallax
					class="basis-1/4 z-10 relative"
					:noOverscroll="true"
					:wrapped="false"
					:factor="-0.1">
					<div class="box-content px-10 py-80 text-black bg-violet-500 w-[32%] h-4"></div>
				</s-parallax>

				<s-parallax
					class="basis-1/4 z-10 relative"
					:noOverscroll="true"
					:wrapped="false"
					:factor="-0.3">
					<div class="box-content px-10 py-80 text-black bg-violet-500 w-[32%] h-4"></div>
				</s-parallax>

				<s-parallax
					class="basis-1/4 z-10 relative"
					:wrapped="false"
					:noOverscroll="true"
					:factor="0.4"
					:extraProps="[]">
					<div class="box-content px-10 py-80 text-black bg-violet-500 w-[32%] h-4"></div>
				</s-parallax>

				<div class="h-[40vh] w-full bg-orange-400 relative">
					<s-parallax
						:wrapped="true"
						:factor="0.2">
						<img
							class="w-full h-full"
							src="/img/sample.jpg" />
					</s-parallax>
				</div>
			</div>
		</s-lenis>
	</main>
</template>
