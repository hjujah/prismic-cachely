export default (id) => {
	const route = useRoute()
	const isSelected = computed(() => route.hash === `#${sanitize(id)}`)
	return isSelected
}
