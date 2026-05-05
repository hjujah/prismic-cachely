<script setup>
  /**
   * Picture Component
   *
   * Synchronized component that handles responsive image loading with waypoint detection.
   * Provides optimized image loading based on device capabilities and viewport visibility.
   * Supports both direct source URLs and Prismic image objects.
   *
   * Features:
   * - Lazy loading with waypoint detection
   * - Responsive image sizing
   * - Aspect ratio preservation option
   * - Mobile/tablet optimization
   * - Customizable image quality and density
   */

  // Component props definition
  const props = defineProps({
    image: {
      type: Object // Prismic image object
    },
    src: {
      type: String // Direct image URL
    },
    alt: {
      type: String // Image alt text
    },
    imgAttrs: {
      type: Object,
      default: () => ({}) // Additional image attributes
    },
    quality: {
      type: [Number, String],
      default: 80 // Image quality (1-100)
    },
    densities: {
      type: String,
      default: "1x" // Image pixel densities
    },
    sizes: {
      type: String,
      default: "sm:768px md:600px lg:600px xl:800px" // Responsive sizes
    },
    useOriginalRatio: {
      type: Boolean,
      default: false // Maintain original aspect ratio
    },
    multiplier: {
      type: Number,
      default: 1.25 // Size multiplier for high DPI screens
    },
    loading: {
      type: String,
      default: "lazy" // Image loading strategy
    },
    innerClass: {
      type: String // Additional classes for inner image
    },
    objectFit: {
      type: String,
      default: "cover" // Object fit for the image
    },
    sizeAuto: {
      type: Boolean,
      default: false // Automatically set the size of the image based on the dimensions of the image
    }
  })

  // Waypoint and visibility handling
  const el = ref(null)
  const { isMobileOrTablet } = useDevice()
  const waypointOpts = computed(() => {
    if (isMobileOrTablet) return

    let _el = el.value?.$el

    return {
      rootMargin: "0px 0px 800px 0px",
      root: _el?.closest instanceof Function ? _el.closest(".lenis") : null
    }
  })

  // Loading state management
  const _loading = ref(props.loading)
  const toggleVisible = (opts) => {
    if (opts.visible && !isMobileOrTablet) {
      _loading.value = "eager"
    }
  }

  // Calculate element style based on image dimensions
  const elStyle = computed(() => {
    try {
      if (props.useOriginalRatio && props.image) {
        return {
          aspectRatio: `${props.image?.dimensions?.width} / ${props.image?.dimensions?.height}`
        }
      }
    } catch (e) {
      console.warn("no dimensions:", props.image)
    }
  })

  // Compute final image attributes including positioning classes
  const imageAttributes = computed(() => {
    let classes = props.imgAttrs?.class
    let autoSize = props.sizeAuto ? " w-auto h-auto" : " w-full h-full"
    classes += props.useOriginalRatio ? " absolute w-full h-full top-0 left-0" : autoSize

    classes += ` object-${props.objectFit}`

    return {
      ...props.imgAttrs,
      width: props.image?.dimensions?.width,
      height: props.image?.dimensions?.height,
      class: classes
    }
  })

  // Force eager loading after timeout on non-mobile devices
  onMounted(() => {
    if (isMobileOrTablet) return

    setTimeout(() => {
      _loading.value = "eager"
    }, 5000)
  })

  defineExpose({
    el
  })
</script>

<template>
  <s-waypoint
    ref="el"
    :opts="waypointOpts"
    :style="elStyle"
    tag="figure"
    class="synchronized-waypoint-picture relative"
    @visible="toggleVisible">
    <nuxt-picture
      v-if="src || image?.url"
      :key="_loading"
      :densities="densities"
      :class="[
        innerClass,
        {
          absolute: useOriginalRatio,
          relative: !useOriginalRatio
        }
      ]"
      :loading="_loading"
      class="s-picture block h-full w-full"
      :imgAttrs="imageAttributes"
      :sizes="sizes"
      :quality="quality"
      :src="src || image?.url"
      :alt="alt || image?.alt" />
  </s-waypoint>
</template>
