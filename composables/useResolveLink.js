/**
 * Resolves the component and component props based on the provided link.
 * @param {Object} link - The link object.
 * @returns {Object} - An object containing the resolved component and component props.
 */
export default (link) => {
	const linkComponentType = computed(() => {
		if (!link) return null
		return link.link_type === "Web" ? "NuxtLink" : "PrismicLink"
	})

	const componentProps = computed(() => {
		if (!link) return {}
		if (link.link_type === "Web") {
			return {
				to: link.url
			}
		}
		return {
			field: link
		}
	})

	return { linkComponentType, componentProps }
}
