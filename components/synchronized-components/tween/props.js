export default {
  tag: {
    type: String,
    default: "div"
  },
  continuous: {
    type: Boolean,
    default: false
  },
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
  },
  onComplete: {
    type: Function,
    default: () => {}
  },
  onRepeat: {
    type: Function,
    default: () => {}
  },
  onUpdate: {
    type: Function,
    default: () => {}
  },
  onReverseComplete: {
    type: Function,
    default: () => {}
  },
  onTweenAdded: {
    type: Function,
    default: () => {}
  },
  paused: {
    type: Boolean,
    default: false
  },
  progress: {
    type: [Number, String],
    default: 0
  },
  html: {
    type: Boolean,
    default: true
  },
  debug: {
    type: Boolean,
    default: false
  },
  delay: {
    type: [Number, String],
    default: 0
  },
  addLabel: {
    type: Function
  },
  labelOffset: {
    type: [Number, String],
    default: "+=0"
  },
  label: {
    type: String
  },
  addToTimeline: {
    type: Function
  }
}
