<script setup>
	const props = defineProps({
		url: {
			type: String
		},
		autoplay: {
			type: Boolean,
			default: false
		},
		loop: {
			type: Boolean,
			default: false
		},
		controls: {
			type: Boolean,
			default: false
		},
		volume: {
			type: Number,
			default: 1
		},
		playing: {
			type: Boolean,
			default: false
		}
	})
	const audio = ref(null) // Reference to the <audio> element
	const isPlaying = ref(props.playing) // Local state for play/pause

	// Sync the playing prop with local playback state
	watch(
		() => props.playing,
		(newVal) => {
			newVal ? playAudio() : pauseAudio()
		}
	)

	// Setup the audio on component mount
	onMounted(() => {
		audio.value.volume = props.volume
		if (props.autoplay) playAudio()
	})

	// Cleanup when the component unmounts
	onBeforeUnmount(() => {
		pauseAudio()
	})

	// Play the audio
	function playAudio() {
		audio.value.play().catch((err) => {
			console.error("Playback failed:", err)
		})
		isPlaying.value = true
	}

	// Pause the audio
	function pauseAudio() {
		audio.value.pause()
		isPlaying.value = false
	}

	// Toggle play/pause state on button click
	function togglePlay() {
		isPlaying.value ? pauseAudio() : playAudio()
	}
</script>

<template>
	<div class="sound-player">
		<audio
			ref="audio"
			:src="url"
			:loop="loop"
			:controls="controls"
			:autoplay="autoplay"
			:volume="volume"></audio>
	</div>
</template>
