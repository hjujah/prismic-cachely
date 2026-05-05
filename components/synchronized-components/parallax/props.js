import scrollingTweenProps from "./../scrolling-tween/props"

export default {
  ...scrollingTweenProps,

  wrapped: {
    type: Boolean,
    default: true
  },
  factor: {
    type: Number,
    default: 0
  },
  ease: {
    type: String,
    default: "linear"
  },
  relativeToElement: {
    type: Boolean,
    default: false
  },
  noOffset: {
    type: Boolean,
    default: false
  },
  innerClass: {
    type: String,
    default: "w-full h-full"
  },

  disabled: {
    type: Boolean,
    default: false
  }
}
