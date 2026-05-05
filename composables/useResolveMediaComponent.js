import _includes from "lodash/includes"

// if asset is the url show video if there is mp4 in the url
export default (asset) => {
	if (!asset) {
		return {
			isVideo: false,
			componentType: null
		}
	}

	const isVideo = computed(() => {
		return (
			// if string contains .mp4
			_includes(asset, ".mp4") ||
			// if string contains download-video (used by video)
			_includes(asset, "download-video") ||
			_includes(asset, ".vimeo") ||
			// if file.contentType is video
			_includes(getField(asset, "file.contentType"), "video")
		)
	})

	const componentType = isVideo.value ? "html-video" : "nuxt-picture"

	return { componentType, isVideo }
}
