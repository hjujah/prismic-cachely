import waypoint_props from "../waypoint/props"
import timeline_props from "../timeline/props"

export default {
  ...waypoint_props,
  ...timeline_props,

  playOnce: {
    type: Boolean,
    default: true
  },
  waitForFonts: {
    type: Boolean,
    default: true
  },

  immediateReverse: {
    type: Boolean,
    default: true
  },

  playInBothDirections: {
    type: Boolean,
    default: false
  },

  innerClass: String
}
