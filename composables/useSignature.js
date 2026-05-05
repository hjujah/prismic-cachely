export default () => {
	onMounted(() => {
		let darkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
		let color = darkTheme ? "white" : "black"

		console.info(
			"%c ↘ Synchronized",
			`font-size: 30px;color: ${color}; text-align: center; font-family: sans-serif;`,
			"\n",
			"\n",
			"made by https://synchronized.studio"
		)
	})
}
