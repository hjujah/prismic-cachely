import stickyProps from "./../sticky/props"
import timelineProps from "./../timeline/props"

export default {
	...stickyProps,
	...timelineProps,

	innerClass: {
		type: String,
		default: ""
	}
}
