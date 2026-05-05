/**
 * Waits for a font to be loaded and then executes a callback function.
 * @param {Function} callback - The callback function to be executed once the font is loaded.
 */
export default async (fontFamily, callback) => {
	if (document.fonts.check(`1em ${fontFamily}`)) {
		return
	}

	const el = document.createElement("span")

	setStyle(el, {
		fontFamily,
		visibility: "hidden",
		position: "absolute",
		top: "-10000px",
		left: "-10000px"
	})

	el.innerHTML = "abcdefghijklmnopqrstuvwxyz0123456789"
	document.body.appendChild(el)

	try {
		await document.fonts.load(`1em ${fontFamily}`)
		el.remove()
		callback && callback()
	} catch (error) {
		console.error(`Failed to load font: ${fontFamily}`, error)
	}
}
