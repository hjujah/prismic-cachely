export default {
  tag: {
    type: [String],
    default: "div"
  },

  startOffset: {
    type: Number,
    default: 0
  },

  endOffset: {
    type: Number,
    default: 0
  },

  noOverscroll: {
    type: Boolean,
    default: true
  },

  preset: {
    type: [String, Boolean],
    default: false
  },

  debug: {
    type: Boolean,
    default: false
  }
}
