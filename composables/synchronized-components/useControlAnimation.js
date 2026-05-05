export default () => {
	const tween = ref()
	const progress = ref(0)

	const onTweenUpdated = (t) => {
		tween.value = t

		tween.value.eventCallback("onUpdate", () => {
			progress.value = tween.value.progress()
		})
	}

	const togglePlaying = () => {
		if (!tween.value) {
			return
		}

		if (tween.value.paused()) {
			playTween()
		} else {
			pauseTween()
		}
	}

	const playTween = () => {
		tween.value.play()
	}

	const pauseTween = () => {
		tween.value.pause()
	}

	const seekTo = (val) => {
		tween.value.progress(val * 1)
	}

	return {
		tween,
		progress,
		onTweenUpdated,
		togglePlaying,
		playTween,
		pauseTween,
		seekTo
	}
}
