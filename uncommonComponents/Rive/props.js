import { _aspectRatio } from "#tailwind-config/theme"

export default {
	src: {
		type: String
	},
	initOnLoad: {
		type: Boolean,
		default: false
	},
	fit: {
		type: String,
		default: "Contain",
		validator: (value) => {
			return [
				"Contain",
				"Cover",
				"Fill",
				"FitWidth",
				"FitHeight",
				"None",
				"ScaleDown"
			].includes(value)
		}
	},
	innerClass: {
		type: String
	},
	loop: {
		type: Boolean,
		default: true
	}
}
