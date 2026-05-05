export default {
  waypointOptions: {
    type: [Object],
    default: () => ({
      rootMargin: "0px 0px -1px 0px"
    })
  },
  horizontal: {
    type: [Boolean],
    default: false
  },
  tag: {
    type: [String],
    default: "div"
  },

  debug: {
    type: Boolean,
    default: false
  }
}
