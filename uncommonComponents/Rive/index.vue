<script setup>
  import { Rive, Layout, Fit } from "@rive-app/canvas"
  import aspectRatios from "~/public/rive/rive-aspects"

  import _props from "./props"
  const props = defineProps(_props)

  const riveCanvas = ref(false)
  const riveAnimation = shallowRef({})

  const emit = defineEmits(["ready"])

  const element = ref(null)
  const { visible, isNotBelow } = useWaypoint({
    element,
    options: computed(() => ({
      rootMargin: "0px 0px 800px 0px",
      root:
        element.value?.closest instanceof Function
          ? element.value.closest(".lenis")
          : null
    }))
  })

  // INITIALISES RIVE ON CANVAS
  const initRive = () => {
    initialized.value = true

    riveAnimation.value = new Rive({
      canvas: riveCanvas.value,
      src: props.src,
      autoplay: false,
      loop: false,
      useOffscreenRenderer: true,
      layout: new Layout({ fit: Fit[props.fit] }),
      onLoad: () => {
        riveAnimation.value.resizeDrawingSurfaceToCanvas()

        setTimeout(() => {
          emit("ready")
        }, 200) // delay to make sure the animation is ready, but not sure why this is needed
      },

      onLoop: () => {
        if (!props.loop) {
          riveAnimation.value.pause()
        }
      }
    })
  }
  const extractedFileName = props.src.split("/").pop().replace(".riv", "")

  // RESETS AND PLAYS ANIMATIONS
  const playAnim = () => {
    if (!riveAnimation?.value) {
      return
    }

    try {
      if (riveAnimation.value.readyForPlaying) {
        riveAnimation.value.reset()
      }
      riveAnimation.value.play()
    } catch (e) {
      console.warn("Rive error:", e)
    }
  }
  //PAUSES ANIMATIONS
  const stopAnim = () => {
    if (riveAnimation && riveAnimation.value) {
      riveAnimation.value.pause()
    }
  }

  defineExpose({
    riveAnimation,
    stopAnim,
    playAnim
  })

  const initialized = ref(false)
  watch(visible, (val) => {
    if (!val) {
      stopAnim()
    } else if (!initialized.value) {
      initRive()
    }
  })

  onMounted(() => {
    if (props.initOnLoad) {
      initRive()
    }
  })
</script>
<template>
  <div
    ref="element"
    class="relative"
    :style="{
      'aspect-ratio': aspectRatios[extractedFileName] || 1
    }">
    <canvas
      :class="`rive--${extractedFileName}`"
      class="w-full h-full absolute top-0 left-0"
      ref="riveCanvas" />
  </div>
</template>
