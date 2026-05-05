/**
 * Fetches and returns the highest quality video URL from Vimeo or fallbacks to asset URL.
 *
 * @param {string} asset Asset URL to use as a fallback if Vimeo fetch fails
 * @param {string} vimeoId Vimeo video ID to fetch data from
 * @returns {object} The resolved media URL
 */

export default function useResolveMediaUrl(asset, vimeoId) {
	// fetch vimeo video
	let src = ref(null)

	const getData = async () => {
		try {
			const { data } = await useFetch(`/api/vimeo/${vimeoId}`, {
				pick: ["pictures", "files"]
			})
			const biggest = Object.values(data.value.files).sort((a, b) => a.width < b.width)
			src.value = getAttr(biggest, "[0].link")
		} catch (error) {
			console.warn("error fetching vimeo data", vimeoId, error)
			return error
		}
	}

	if (vimeoId) {
		getData()
	} else {
		src.value = getField(asset, "file.url") || asset
	}

	return src
}
