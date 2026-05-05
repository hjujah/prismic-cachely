import tweenProps from "./../tween/props"

export default {
  ...tweenProps,

  preset: {
    type: String
  },

  willChange: {
    type: [String, Boolean],
    default: "opacity, transform"
  },

  clearProps: {
    type: String,
    default: "transform"
  }
}
