import tweenPresetProps from "./../tween-preset/props"
import waypointTimelineProps from "./../waypoint-timeline/props"

export default {
	...tweenPresetProps,
	...waypointTimelineProps,

	tweenClass: {
		type: String
	}
}
