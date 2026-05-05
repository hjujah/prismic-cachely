<script setup>
	let timeline
	const onTimelineReady = (tl) => {
		timeline = tl

		timeline.eventCallback("onUpdate", () => {
			progress.value = timeline.progress()
		})
	}

	const playTween = () => {
		timeline.play()
	}

	const pauseTween = () => {
		timeline.pause()
	}

	const progress = ref(0)

	watch(progress, (p) => {
		timeline.progress(p)
	})
</script>

<template>
	<main class="p-20 row">
		<div class="basis-1/2 prose prose-slate prose-sm">
			<ContentDoc path="/timeline" />
		</div>

		<div class="basis-1/2">
			<s-timeline
				@created="onTimelineReady"
				:timelineOptions="{ paused: true }"
				v-slot="{ addToTimeline }">
				<input
					type="range"
					min="0"
					max="1"
					step="0.01"
					v-model="progress"
					class="slider !p-0"
					id="myRange" />
				<br />

				<button @click="playTween">Play</button>
				/ <button @click="pauseTween">Pause</button><br />
				the timeline <br />
				progress: {{ progress.toFixed(2) }}

				<s-tween-preset
					@updated="addToTimeline"
					preset="fadeUp">
					I use the Synchronized Tween Preset!
				</s-tween-preset>

				<s-tween
					@updated="addToTimeline"
					:from="{
						x: 500
					}"
					:to="{
						x: 0,
						duration: 1.5
					}"
					preset="fadeUp">
					I am animated using the Synchronized Tween component!
				</s-tween>
			</s-timeline>
		</div>
	</main>
</template>
