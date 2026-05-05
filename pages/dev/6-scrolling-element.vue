<script setup></script>

<template>
	<main>
		<s-lenis>
			<!-- <section class="p-12 prose prose-slate prose-sm">
				<ContentDoc path="/scrolling-element" />
			</section> -->

			<s-scrolling-element
				:debug="true"
				v-for="i in 500"
				:key="i"
				:no-overscroll="true"
				class="bg-orange-500 p-12 m-12 h-[30vw] w-[30vw]">
			</s-scrolling-element>
		</s-lenis>
	</main>
</template>
