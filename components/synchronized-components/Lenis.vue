<script setup>
  import Lenis from "lenis"
  import { gsap } from "gsap"

  const { $bus } = useNuxtApp()
  const { isMobileOrTablet, isSafari } = useDevice()

  const scrollingStore = useScrollingStore()
  const { scrollingDisabled } = storeToRefs(scrollingStore)

  const props = defineProps({
    options: {
      type: Object,
      default: () => ({
        smoothWheel: true,
        // anchors: {
        //   duration: 1
        // },
        anchors: true,
        lerp: 0.15,
        autoResize: true
      })
    },
    preventEvents: {
      type: Boolean,
      default: false
    },
    forceWindowScroll: {
      type: Boolean,
      default: false
    },
    notWindowScroll: {
      type: Boolean,
      default: false
    },
    scrollerClass: {
      type: String,
      default: ""
    }
  })

  const isWindowScroll = computed(
    () => (props.forceWindowScroll || isMobileOrTablet) && !props.notWindowScroll
  )

  let scrollTop = ref(0)
  let el = ref(null)
  const scroller = ref(null)
  const lenis = ref(null)

  const route = useRoute()

  const onScrollTo = ({
    target,
    options = {
      immediate: false,
      duration: 1.4,
      force: true,
      onComplete: () => {
        // $bus.$emit("resize")
      }
    }
  }) => {
    if (!lenis.value) {
      return
    }

    // const scrollToElement = document.querySelector(to.hash)

    // if (!scrollToElement) return

    // const scrollingStore = useScrollingStore()
    // const { scrollTop } = storeToRefs(scrollingStore)

    // const bounds = scrollToElement ? scrollToElement.getBoundingClientRect() : {}
    // const offset = to.query.bottom ? window.innerHeight - bounds.height : -1

    // const style = getComputedStyle(scrollToElement)
    // target = bounds.top + scrollTop.value - offset - parseInt(style.marginTop)

    // console.log("hash onScrollTo", options)

    lenis.value.scrollTo(target, options)
  }

  // const hash = computed(() => route.hash)

  // watch(hash, (val) => {
  //   onScrollTo({
  //     target: val,
  //     options: {
  //       // immediate: true,
  //       force: true
  //     }
  //   })
  // })

  const lenisOptions = computed(() => {
    props.options.smoothWheel = !isSafari && !isMobileOrTablet

    return {
      ...props.options,
      wrapper: isWindowScroll.value ? window : el.value,
      content: isWindowScroll.value ? document.documentElement : scroller.value
    }
  })

  const updateScroll = (y) => {
    scrollingStore.scrollTop = scrollTop.value = y
  }

  const onSmoothScroll = (opts) => {
    updateScroll(opts.animatedScroll)
  }

  const stopped = ref(false)

  watch(scrollingDisabled, (val) => {
    if (!lenis.value) {
      return
    }

    if (isWindowScroll.value) {
      stopped.value = val
      document.body.style.overflow = val ? "hidden" : "visible"
    } else {
      if (val) {
        lenis.value.stop()
      } else {
        lenis.value.start()
      }
    }
  })

  const handleResize = () => {
    if (!lenis.value) {
      return
    }

    lenis.value.resize()

    total_scroll.value =
      lenis.value.dimensions.scrollHeight - lenis.value.dimensions.height
    scrollingStore.totalScroll = total_scroll.value
  }

  const lenisRaf = (time) => {
    const currentScroll = lenis.value.animatedScroll
    // const currentTime = performance.now()

    // Calculate momentum
    // calculateMomentum(currentScroll, currentTime)

    // Update scroll position
    updateScroll(currentScroll)
    lenis.value && lenis.value.raf(time * 1000)
  }

  // Optional: Log momentum
  // watch(scrollMomentum, (momentum) => {
  //   console.log("Scroll Momentum:", momentum)
  // })

  provide(
    "scrollTop",
    computed(() => scrollTop.value)
  )

  const initialized = ref(false)
  const initLenis = (el) => {
    console.log("initLenis", lenisOptions.value)

    lenis.value = new Lenis(lenisOptions.value)
    gsap.ticker.add(lenisRaf)
    lenis.value.on("scroll", onSmoothScroll)
    updateScroll(0)

    initialized.value = true

    if (scrollingDisabled.value) {
      lenis.value.stop()
    }

    if (isWindowScroll.value) {
      document.body.style.overflow = scrollingDisabled.value ? "hidden" : "visible"
      stopped.value = scrollingDisabled.value
    }

    if (props.preventEvents) {
      return
    }

    setTimeout(() => {
      route.hash &&
        onScrollTo({
          target: route.hash,
          options: {
            immediate: true,
            force: true
          }
        })
    }, 200)

    $bus.$on("scrollTo", onScrollTo)

    nextTick(() => {
      handleResize()
    })
  }

  onMounted(() => {
    setTimeout(() => {
      initLenis(el.value)
    }, 200)
  })

  const total_scroll = ref(0)

  useResizeObserver(scroller, handleResize)

  provide(
    "totalScroll",
    computed(() => total_scroll.value)
  )

  onBeforeUnmount(() => {
    gsap.ticker.remove(lenisRaf)

    if (props.preventEvents) {
      return
    }

    try {
      $bus.$off("scrollTo", onScrollTo)
    } catch (e) {
      console.log(e)
    }
  })
</script>

<template>
  <div
    ref="el"
    :class="[
      'lenis',
      {
        'desktop-version': !isWindowScroll,
        initialized: initialized && !stopped
      }
    ]">
    <div
      ref="scroller"
      :class="scrollerClass"
      class="scroller relative">
      <slot></slot>
    </div>

    <slot name="outside" />
  </div>
</template>

<style lang="scss" scoped>
  .lenis.desktop-version {
    position: fixed;
    height: 100%;
    width: 100%;

    &.initialized {
      overflow-x: hidden;
      overflow-y: visible;
    }
  }
</style>
