<script setup>
	const _progress = ref(false)
	const paused = ref(false)

	const { onTweenUpdated, togglePlaying, playTween, pauseTween, progress, seekTo } =
		useControlAnimation()

	watch(_progress, (val) => {
		seekTo(val)
	})

	// NOTE: Potential performance issues here
	watch(progress, (val) => {
		_progress.value = val
	})
</script>

<template>
	<div>
		<s-tween
			:paused="paused"
			@updated="onTweenUpdated"
			:from="{ opacity: 0, x: 200 }"
			:to="{ opacity: 1, x: 0, duration: 12 }">
			Hello I am animated using the Synchronized Tween component!
		</s-tween>

		<div>
			<button @click="togglePlaying">Toggle playing</button>
			<br />
			<button @click="playTween">Play</button> -
			<button @click="pauseTween">Pause</button>
			<br />

			Progress: {{ progress }}
			<br />

			<input
				type="range"
				min="0"
				max="1"
				step="0.01"
				v-model="_progress"
				class="slider !p-0"
				id="myRange" />
		</div>
	</div>
</template>
