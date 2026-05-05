<script setup>
  import _props from "./props"
  const props = defineProps(_props)

  // Video element ref and poster image state
  const video = ref(null)
  let cachedVideo = null

  let videoPoster = ref("")

  if (props.forcePoster) {
    videoPoster.value = props.posterUrl
  }

  // Events emitted by the component
  const emit = defineEmits([
    "onSeeking",
    "update:playing",
    "update:time",
    "update:duration",
    "update:playbackProgress",
    "update:currentTime",
    "update:isWaiting"
  ])

  // Track video duration
  const duration = ref(0)
  const isWaiting = ref(true)
  let waitingTimeout = null

  watch(
    isWaiting,
    (val) => {
      emit("update:isWaiting", val)
    },
    { immediate: true }
  )

  const stopWaiting = () => {
    clearTimeout(waitingTimeout)
    isWaiting.value = false
  }

  // Video event handlers
  const onClick = (e) => {}
  const onCanPlay = (e) => {
    stopWaiting()
    duration.value = video.value?.duration
    emit("update:duration", duration.value)
  }

  const onSeeking = (e) => {
    emit("onSeeking", e.target.currentTime)
  }

  const onWaiting = (e) => {
    waitingTimeout = setTimeout(() => {
      isWaiting.value = true
    }, 100)
  }

  // Handle video time updates and progress tracking
  const currentTime = ref(0)
  const onTimeupdate = (e) => {
    if (!video.value) {
      return
    }

    stopWaiting()
    currentTime.value = video.value.currentTime
  }

  // Calculate playback progress percentage
  const playbackProgress = computed(() => {
    return (currentTime.value / duration.value) * 100
  })

  // Emit progress updates
  watch(playbackProgress, (newVal) => {
    emit("update:playbackProgress", newVal)
    emit("update:time", currentTime.value)
  })

  // Handle initial autoplay
  if (props.autoplay) {
    emit("update:playing", true)
  }

  // Video control methods
  const seekTo = (time) => {
    video.value.currentTime = time
  }

  const onPause = (e) => {
    emit("update:playing", false)
  }

  const onPlay = (e) => {
    emit("update:playing", true)
  }

  const onCantplay = (e) => {
    emit("update:playing", false)
    videoPoster.value = props.posterUrl
    console.warn(`can't autoplay`, props.src)
  }

  const playVideo = (callback) => {
    if (!video.value) {
      return
    }

    let promise = video.value.play()
    if (promise !== undefined) {
      promise
        .then(() => {
          // typeof callback === "function" && callback()
        })
        .catch(onCantplay)
    }
  }

  const pauseVideo = () => {
    if (!video.value) {
      return
    }

    video.value.pause()
  }

  const muteVideo = (state) => {
    if (!video.value) {
      return
    }

    video.value.muted = state
  }

  // Watch for playing prop changes
  watch(
    () => props.playing,
    (val) => {
      if (val) {
        playVideo()
      } else {
        pauseVideo()
      }
    }
  )

  // Watch for muted prop changes
  watch(
    () => props.muted,
    (val) => {
      muteVideo(val)
    }
  )

  watch(
    () => props.src,
    (newVal) => {
      console.log("src changed", newVal)

      nextTick(() => {
        video.value.load()
      })
    }
  )

  // Handle initial play state on mount
  onMounted(() => {
    if (props.playing) {
      playVideo()
    } else {
      pauseVideo()
    }
  })

  onBeforeUnmount(() => {
    pauseVideo()

    cachedVideo = video.value
  })

  const destroyVideo = () => {
    if (cachedVideo) {
      cachedVideo.pause()

      // remove all sources
      const sources = cachedVideo.getElementsByTagName("source")
      while (sources.length > 0) {
        sources[0].parentNode.removeChild(sources[0])
      }

      try {
        cachedVideo.load()
      } catch (e) {
        console.warn("Error during video cleanup:", e)
      }
    }
  }

  onUnmounted(() => {
    setTimeout(destroyVideo, 500)
  })

  // Expose video control methods
  defineExpose({
    seekTo,
    playVideo,
    pauseVideo,
    onSeeking,
    muteVideo
  })
</script>

<template>
  <div class="contents">
    <video
      class="html-video"
      ref="video"
      @click="onClick"
      @canplaythrough="onCanPlay"
      @pause="onPause"
      @seeking="onSeeking"
      @timeupdate="onTimeupdate"
      @play="onPlay"
      @waiting="onWaiting"
      :preload="preload"
      :playsinline="playsinline"
      :autoplay="autoplay"
      :poster="videoPoster"
      :muted="muted"
      :loop="loop"
      :controls="controls">
      <source
        :src="src"
        type="video/mp4" />
    </video>
  </div>
</template>

<style lang="scss" scoped="">
  .html-video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
