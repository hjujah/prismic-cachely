export default {
  src: {
    type: [String]
  },
  playsinline: {
    type: Boolean,
    default: true
  },
  preload: {
    type: [String],
    default: "metadata"
  },
  playing: {
    type: [Boolean]
  },
  muted: {
    type: [Boolean],
    default: true
  },
  loop: {
    type: [Boolean],
    default: false
  },
  controls: {
    type: [Boolean],
    default: false
  },
  autoplay: {
    type: [Boolean],
    default: true
  },
  posterUrl: {
    type: [String, Boolean]
  },
  forcePoster: {
    type: [Boolean],
    default: false
  },
  fit: {
    type: [String],
    default: "cover"
  }
}
