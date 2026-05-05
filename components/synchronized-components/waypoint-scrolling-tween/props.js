import scrollingTween_props from "../scrolling-tween/props"
import waypoint_props from "../waypoint/props"

export default {
	...scrollingTween_props,
	...waypoint_props,

	innerClass: {
		type: String,
		default: "w-full h-full"
	}
}
