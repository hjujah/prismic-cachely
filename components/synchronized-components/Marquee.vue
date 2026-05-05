<script setup>
  const props = defineProps({
    reversed: {
      type: Boolean,
      default: true
    },
    pauseOnHover: {
      type: Boolean,
      default: false
    },
    playOnHover: {
      type: Boolean,
      default: false
    },
    repeat: {
      type: [Number, String],
      default: 3
    },
    speed: {
      type: [Number, String],
      default: 1
    }
  })

  let paused = ref(false)

  const onEnter = () => {
    paused.value = props.pauseOnHover && !props.playOnHover
  }
  const onLeave = () => {
    paused.value = props.playOnHover && !props.pauseOnHover
  }

  onMounted(() => {
    setTimeout(() => {
      paused.value = props.playOnHover
    })
  })
</script>

<template>
  <s-timeline
    v-slot="{ addToTimeline }"
    :timelineOptions="{
      paused: paused,
      repeat: -1
    }"
    @mouseenter.native="onEnter"
    @mouseleave.native="onLeave"
    class="s-marquee !flex overflow-hidden w-full">
    <div
      v-for="index in repeat"
      :key="index">
      <s-tween
        @updated="addToTimeline"
        :from="{
          x: reversed ? '0%' : '-100%'
        }"
        :to="{
          x: reversed ? '-100%' : '0%',
          ease: 'linear',
          duration: speed
        }"
        class="marquee-inner-wrapper !inline-block items-center">
        <slot />
      </s-tween>
    </div>
  </s-timeline>
</template>

<style lang="scss" scoped>
  .s-marquee {
    white-space: nowrap;
    cursor: default;
    perspective: 1000px;

    .marquee-inner-wrapper {
      will-change: transform;
    }
  }
</style>
