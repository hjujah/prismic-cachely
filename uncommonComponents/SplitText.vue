<script setup>
  import { gsap } from "gsap"
  import { debounce } from "lodash-es"

  const props = defineProps({
    tag: {
      type: String,
      default: "div"
    },
    splitOptions: {
      type: Object,
      default: () => ({
        type: "lines",
        linesClass: "split-line"
      })
    },
    text: {
      type: [Array, String],
      default: ""
    },
    innerTag: {
      type: String
    }
  })

  const el = ref(null)
  let { splitElements } = useSplitText(el, props.splitOptions)

  const animationProps = [
    {
      opacity: 0,
      y: "100%"
    },
    {
      opacity: 1,
      y: 0,
      duration: 1.2,
      stagger: 0.1,
      overwrite: true,
      ease: "Power3.easeOut",
      onStart: () => {
        console.log("onStart")
      }
    }
  ]

  const emit = defineEmits(["updated"])

  const appStore = useAppStore()
  const { fontsLoaded } = storeToRefs(appStore)

  const initialized = ref(false)

  const initTween = () => {
    if (!fontsLoaded.value) return

    if (!splitElements.value || !splitElements.value.length) return

    try {
      let tween = gsap.fromTo(splitElements.value, ...animationProps)

      emit("updated", tween)

      setTimeout(() => {
        initialized.value = true
      })

      return tween
    } catch (err) {
      console.log("split error:", err)
    }
  }

  const debouncedInitTween = debounce(initTween, 100)

  watch(fontsLoaded, debouncedInitTween)

  watch(splitElements, debouncedInitTween)

  const { unwrappedHeadline, tag: innerTagComputed } = useUnwrappedHeadline(props.text)
</script>

<template>
  <component
    class="s-split-text"
    :class="{
      'opacity-0': !initialized
    }"
    :is="tag">
    <component
      class="inline"
      ref="el"
      :is="innerTag || innerTagComputed"
      v-html="unwrappedHeadline" />
  </component>
</template>
