<script setup>
  import _props from "./../html-video/props"

  const props = defineProps({
    ..._props,
    videoClass: {
      type: String,
      default: ""
    },
    controls: {
      type: Boolean,
      default: true
    },
    controlsClasses: {
      type: String,
      default: "fixed sm:absolute top-full w-full flex items-center mt-2"
    },
    addMuteControl: {
      type: Boolean,
      default: true
    },
    useNativeControls: {
      type: Boolean,
      default: false
    }
  })

  //define emits
  const emit = defineEmits(["onMuted", "onPlaying", "onSeek"])

  // define elements
  const seekbarEl = ref(null)
  const videoEl = ref(null)

  // define states
  const time = ref(0)
  const duration = ref(0)
  const playbackProgress = ref(0) // percentage

  // playing state
  const playing = ref(props.playing)
  watch(
    playing,
    (val) => {
      emit("onPlaying", val)
    },
    { immediate: true }
  )

  // muted state
  const muted = ref(props.muted)
  watch(muted, (val) => {
    emit("onMuted", val)
  })

  provide("currentTime", time)

  // define methods
  const togglePlaying = () => {
    playing.value = !playing.value
  }

  const toggleMuted = () => {
    muted.value = !muted.value
  }

  // SEEK BAR
  const { left, width } = useElementBounding(seekbarEl)
  const {
    hoveredProgress,
    selectedTime,
    hoveredTime,
    onTouchMove,
    handleMouseMove,
    handleProgressMouseDown,
    handleProgressMouseUp,
    handleMouseLeave
  } = useSeekbar({ left, width, duration })

  watch(selectedTime, (val) => {
    videoEl.value?.seekTo(val)
    emit("onSeek", val)
  })

  const onSeeking = (val) => {
    emit("onSeek", val)
  }

  defineExpose({
    videoPlayer: videoEl
  })

  const controlsHidden = ref(false)

  let controlsTimeout = null

  const hideControls = (timeout = 2500) => {
    controlsTimeout = setTimeout(() => {
      controlsHidden.value = true
    }, 2500)
  }

  const showControls = () => {
    controlsHidden.value = false
    clearTimeout(controlsTimeout)
    hideControls()
  }

  onMounted(() => {
    hideControls()
  })

  const isWaiting = ref(true)

  // const controlsEl = ref(null)
  // const el = ref(null)
  // useClickOutside(el, () => {
  //   console.log("click outside")
  //   hideControls(0)
  // })
</script>

<template>
  <div
    ref="el"
    @mousedown="showControls"
    @mouseenter="showControls"
    @mousemove="showControls"
    class="s-video-player">
    <s-html-video
      v-model:isWaiting="isWaiting"
      v-model:time="time"
      v-model:duration="duration"
      v-model:playing="playing"
      v-model:playbackProgress="playbackProgress"
      @onSeeking="onSeeking"
      ref="videoEl"
      :forcePoster="forcePoster"
      :posterUrl="posterUrl"
      :preload="preload"
      :playsinline="playsinline"
      :src="`${src}`"
      :controls="useNativeControls"
      :loop="loop"
      :muted="muted"
      :autoplay="autoplay"
      :class="[videoClass, { active: playing == true }]" />

    <!-- <t-fade> -->
    <div
      v-if="isWaiting"
      class="absolute center w-6 sm:w-10">
      <a-spinner />
    </div>
    <!-- </t-fade> -->

    <!-- CONTROLS -->
    <t-fade>
      <div
        ref="controlsEl"
        class="video-controls-wrapper flex"
        :class="controlsClasses"
        v-if="controls && !useNativeControls && !controlsHidden">
        <!-- PLAY / PAUSE -->
        <button
          class="w-6 h-6 sm:w-12 sm:h-12 hover:scale-95 active:scale-90 transition-transform duration-300"
          @click="togglePlaying">
          <img
            class="object-contain"
            v-if="!playing"
            :src="`/img/videoPlayer/play.svg`"
            alt="play" />
          <img
            v-else
            class="object-contain"
            :src="`/img/videoPlayer/pause.svg`"
            alt="pause" />
        </button>

        <!-- SEEK BAR -->
        <div
          ref="seekbarEl"
          @mousedown="handleProgressMouseDown"
          @mousemove="handleMouseMove"
          @touchmove="onTouchMove"
          @mouseup="handleProgressMouseUp"
          @mouseleave="handleMouseLeave"
          class="relative flex-grow h-4 mx-4 cursor-pointer">
          <t-fade :duration="0.25">
            <div
              v-if="hoveredProgress > 0"
              :style="{
                transform: `translateX(${hoveredProgress}%)`
              }"
              class="absolute bottom-full w-full left-0 text-left">
              <span class="inline-block text-10 sm:text-14 -translate-x-1/2">{{
                hoveredTime
              }}</span>
            </div>
          </t-fade>

          <!-- SEEK BAR BACKGROUND -->
          <div
            class="absolute center-y left-0 w-full h-1 progress-bar--hollow bg-white/10"></div>

          <!-- SEEK BAR HOVERED -->
          <div
            :style="{ clipPath: `inset(0 ${100 - hoveredProgress}% 0 0)` }"
            class="absolute center-y left-0 w-full h-1 progress-bar--hovered bg-gray3"></div>

          <!-- SEEK BAR ACTIVE -->
          <div
            :style="{ clipPath: `inset(0 ${100 - playbackProgress}% 0 0)` }"
            class="absolute center-y left-0 progress-bar--active w-full h-1 bg-white"></div>
        </div>

        <!-- TIMESTAMP -->
        <a-timestamp
          v-if="duration"
          :duration="duration" />

        <!-- MUTE -->
        <a-mute-button
          v-if="addMuteControl"
          :muted="muted"
          class="ml-4"
          @click="toggleMuted"></a-mute-button>

        <slot />
      </div>
    </t-fade>
  </div>
</template>
