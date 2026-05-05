export default ({ length, classMap, defaultValue }) => {
	const getClass = (index) => {
		const patternIndex = index % length
		return classMap[patternIndex] || defaultValue
	}

	return { getClass }
}
