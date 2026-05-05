<script setup>
  const props = defineProps({
    tag: {
      type: String,
      default: "div"
    },
    alwaysOneOpen: {
      type: Boolean,
      default: false
    },
    startIndex: {
      type: Number
    }
  })

  const { changeActive, currentIndex } = useAccordionWrapper({
    alwaysOneOpen: props.alwaysOneOpen,
    startIndex: props.startIndex
  })
</script>

<template>
  <component
    :is="tag"
    class="s-accordion-wrapper">
    <slot
      :currentIndex="currentIndex"
      :changeActive="changeActive" />
  </component>
</template>
