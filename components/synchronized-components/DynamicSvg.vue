<script setup>
	const props = defineProps({
		svgUrl: {
			type: String,
			required: true
		},
		innerClass: {
			type: String,
			default: ""
		}
	})

	// Reactive references for SVG content and loading state
	const svgContent = ref(null)
	const loading = ref(false)
	const aspectRatio = ref(null)

	// Function to remove width and height attributes from SVG string
	const removeWidthHeight = (svgString) => {
		return svgString.replace(/width="[^"]*"/g, "").replace(/height="[^"]*"/g, "")
	}

	// Function to add class to the SVG tag
	const addClassToSvg = (svgString, className) => {
		return svgString.replace("<svg", `<svg class="${className}"`)
	}

	// Function to extract viewBox and calculate aspect ratio
	const calculateAspectRatio = (svgString) => {
		const viewBoxMatch = svgString.match(/viewBox="([^"]*)"/)
		if (viewBoxMatch) {
			const viewBoxValues = viewBoxMatch[1].split(" ")
			const width = parseFloat(viewBoxValues[2])
			const height = parseFloat(viewBoxValues[3])
			if (width && height) {
				aspectRatio.value = width / height
			} else {
				aspectRatio.value = null
			}
		} else {
			aspectRatio.value = null
		}
	}

	// Function to fetch SVG content
	const fetchSvg = async (url, retries = 3) => {
		loading.value = true
		try {
			const cacheBuster = Date.now() // Generate a unique cache-busting value
			const response = await fetch(`${url}?cache=${cacheBuster}`)

			if (response.ok) {
				let svgString = await response.text()
				svgString = removeWidthHeight(svgString)
				svgString = addClassToSvg(svgString, props.innerClass)
				calculateAspectRatio(svgString)

				svgContent.value = svgString
			} else {
				console.error(`Error fetching SVG: ${url}`, response.statusText)
				svgContent.value = null
			}
		} catch (error) {
			console.error(`Error fetching SVG: ${url}`, error)
			if (retries > 0) {
				// Retry after a short delay
				setTimeout(() => fetchSvg(url, retries - 1), 1000)
			} else {
				svgContent.value = null
			}
		} finally {
			loading.value = false
		}
	}

	// Watch for changes in the svgUrl prop and fetch the SVG content
	watch(
		() => props.svgUrl,
		(newUrl) => {
			if (newUrl) {
				svgContent.value = null // Reset SVG content before fetching
				fetchSvg(newUrl)
			}
		},
		{ immediate: true }
	)

	// Watch for changes in the innerClass prop and update the SVG content
	watch(
		() => props.innerClass,
		(newClass) => {
			if (svgContent.value) {
				svgContent.value = addClassToSvg(svgContent.value, newClass)
			}
		}
	)
</script>

<template>
	<div
		v-if="!loading"
		class="a-dynamic-svg"
		:style="aspectRatio ? { aspectRatio: aspectRatio } : {}"
		v-html="svgContent"></div>
</template>
