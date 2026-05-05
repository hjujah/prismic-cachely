export default (page, sliceName) => {
	const otherSlices = computed(() =>
		page.value.slices?.filter((slice) => slice.slice_type !== sliceName)
	)
	const slices = computed(() =>
		page.value.slices?.filter((slice) => slice.slice_type === sliceName)
	)

	return {
		otherSlices,
		slices
	}
}
