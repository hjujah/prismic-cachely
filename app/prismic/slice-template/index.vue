<script setup>

// @see https://prismic.io/docs/technical-reference/prismicio-vue#slicezone
// ["slice", "index", "slices", "context"]
import { getSliceComponentProps } from '@prismicio/vue';
const props = defineProps(getSliceComponentProps());

const {
  getPrimary,
  items
} = useSlice(props.slice);

// example
const title = getPrimary('title')

</script>

<template>
  <!-- @TODO add className (modifier) -->
  <section
    class="slice slice--">

    <!-- @DEBUG -->
    <pre>{{ slice }}</pre>

  </section>
</template>
