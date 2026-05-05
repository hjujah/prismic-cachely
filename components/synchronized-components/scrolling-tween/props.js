import scrollingTimelineProps from "./../scrolling-timeline/props"

export default {
  ...scrollingTimelineProps,

  from: {
    type: Object,
    default: () => ({})
  },

  to: {
    type: Object,
    default: () => ({})
  },

  disabled: {
    type: Boolean,
    default: false
  }
}
