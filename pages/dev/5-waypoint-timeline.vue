<script setup></script>

<template>
	<main>
		<s-lenis>
			<section class="p-12 prose prose-slate prose-sm">
				<ContentDoc path="/waypoint-timeline" />
			</section>

			<s-waypoint-timeline
				v-slot="{ addToTimeline }"
				:debug="true"
				v-for="i in 100"
				:key="i"
				:no-overscroll="true">
				<s-tween-preset
					class="bg-orange-500 p-12 m-12 h-[30vw] w-[30vw]"
					@updated="addToTimeline"
					preset="fadeUp" />
			</s-waypoint-timeline>
		</s-lenis>
	</main>
</template>
