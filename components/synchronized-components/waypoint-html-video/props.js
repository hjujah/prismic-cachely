import htmlVideoProps from "./../html-video/props"
import waypointProps from "./../waypoint/props"

export default {
  ...htmlVideoProps,
  ...waypointProps,

  videoClass: {
    type: String,
    default: ""
  },

  restartOnVisible: {
    type: Boolean,
    default: false
  }
}
