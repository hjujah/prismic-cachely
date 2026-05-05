<script setup>
  /**
   * @module AccordionItem
   * @desc A Vue component representing a individual accordion item.
   *
   * @typedef {Object} Props
   * @prop {Boolean} forceOpen - Whether or not to force the accordion item to stay open.
   * @prop {Number, String} index - The index of this accordion item.
   * @prop {Boolean} individual - Whether or not this is a individual accordion item that can only be opened one at a time.
   * @prop {Number} duration - The duration of the animation in seconds.
   * @prop {String} ease - The easing function for the animation.
   * @prop {String} hash - The unique id of the accordion
   * @prop {Boolean} useHash - Whether or not to use the hash to determine if the accordion item should be open.
   * @prop {Object} contentFromAnimation - The starting animation properties for the content.
   * @prop {Object} contentToAnimation - The ending animation properties for the content.
   */

  const props = defineProps({
    forceOpen: Boolean,
    hoverable: Boolean,
    index: [Number, String],
    individual: Boolean,
    hash: String,
    useHash: Boolean,

    useClick: {
      type: Boolean,
      default: true
    },

    duration: {
      type: Number,
      default: 1
    },
    ease: {
      type: String,
      default: "Power2.easeInOut"
    },

    contentFromAnimation: {
      type: Object,
      default: () => ({
        opacity: 0,
        y: 0
      })
    },
    contentToAnimation: {
      type: Object,
      default: () => ({
        opacity: 1,
        y: 0,
        delay: 0.5,
        duration: 0.5
      })
    }
  })

  const emit = defineEmits(["changeActive", "update:isOpen"])

  const forceOpen = computed(() => {
    if (props.useHash && useSelectedHash(props.hash).value) {
      return true
    }

    return props.forceOpen
  })

  const collapsableContent = ref(null)
  const { height: contentHeight } = useElementBounding(collapsableContent)

  const { isOpen, toggleActive, setActive } = useAccordionItem({
    emit,
    forceOpen: forceOpen,
    index: props.index,
    individual: props.individual
  })

  let timeline
  const onTimelineReady = (tl) => {
    timeline = tl
  }

  onMounted(() => {
    setTimeout(() => timeline && timeline.progress(isOpen.value ? 1 : 0))
  })

  const onMouseEnter = () => {
    props.hoverable && setActive(true, props.index)
  }

  const onMouseLeave = () => {
    props.hoverable && setActive(false, props.index)
  }

  watch(isOpen, (val) => {
    if (!timeline) {
      return
    }
    timeline[val ? "play" : "reverse"]()
    emit("update:isOpen", val)
  })
</script>

<template>
  <s-timeline
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    @created="onTimelineReady"
    :timelineOptions="{ paused: true }"
    v-slot="{ addToTimeline }"
    class="synchronized-accordion-item !block"
    :class="{ 'is-active': isOpen }">
    <div
      @click="useClick && toggleActive(index)"
      :class="{
        'cursor-pointer': useClick
      }"
      class="contents">
      <slot
        :isOpen="isOpen"
        name="title" />
    </div>

    <s-tween
      :from="{ height: 0 }"
      :to="{ height: contentHeight, ease, duration }"
      :class="{
        disabled: !isOpen
      }"
      @updated="addToTimeline"
      class="content-wrapper overflow-hidden relative">
      <s-tween
        @updated="addToTimeline"
        :from="contentFromAnimation"
        :to="contentToAnimation"
        class="top-0 w-full absolute content-inner"
        ref="collapsableContent">
        <slot
          :isOpen="isOpen"
          name="content" />
      </s-tween>
    </s-tween>
  </s-timeline>
</template>
