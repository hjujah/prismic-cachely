export default {
  tag: {
    type: String,
    default: "div"
  },
  timelineOptions: {
    type: Object,
    default: () => ({})
  },
  progress: {
    type: Number,
    default: 0
  }
}
