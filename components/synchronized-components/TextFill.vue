<!-- 
The TextFill component is a Vue component that scales the font size of a text to fill its container. 

Props:
- tag: The HTML tag to use for the text. Default is "h1".
- text: The text to display.
- inner_class: A CSS class to apply to the inner span element.

Example usage:
<template>
  <s-text-fill tag="h2" text="Hello World" inner_class="text-red-500" />
</template>
-->

<script setup>
  // Define props for the component
  const props = defineProps({
    tag: {
      type: String,
      default: "h1"
    },

    text: {
      type: String
    },

    inner_class: {
      type: String
    },

    maxSize: {
      type: String,
      default: "2000px"
    },

    minSize: {
      type: String,
      default: "1px"
    }
  })

  // Define reactive variables
  const fontSize = ref(null)
  const placeholder = ref(null)
  const headline = ref(null)

  const calcAndSetSize = (val) => {
    const elWidth = val[0]?.contentRect?.width
    const headlineWidth = headline?.value.offsetWidth
    const ratio = elWidth / headlineWidth

    let fs = window.getComputedStyle(headline.value).fontSize
    fs = fs.substring(0, fs.indexOf("px"))

    fontSize.value = Math.round(fs * ratio)
  }

  const fontSizeStyle = computed(
    () => `clamp(${props.minSize}, ${fontSize.value}px, ${props.maxSize})`
  )

  // Calculate the font size scale based on the width of the text and the width of the container
  useResizeObserver(placeholder, (val) => {
    calcAndSetSize(val)
    setTimeout(() => {
      calcAndSetSize(val)
    }, 100)
  })
</script>

<template>
  <component
    :is="tag"
    class="s-text-fill relative w-full">
    <span
      class="w-full absolute top-0 left-0 block"
      ref="placeholder"></span>
    <span
      ref="headline"
      class="relative inline-flex whitespace-nowrap"
      :class="inner_class">
      <span
        v-if="text"
        v-html="text" />
      <slot />
    </span>
  </component>
</template>

<style lang="scss">
  .s-text-fill {
    // span {
    font-size: v-bind(fontSizeStyle) !important;
    // }
  }
</style>
