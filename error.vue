<script setup>
  const props = defineProps({
    error: Object
  })

  const handleError = () => clearError({ redirect: "/" })

  const isDev = process.dev
</script>
<template>
  <div
    class="intro h-screen w-screen overflow-hidden bg-white text-black fixed flex items-center justify-center">
    <pre
      v-if="isDev"
      class="text-black whitespace-pre-line fixed top-0 left-0"
      >{{ error }}</pre
    >

    <div class="text-center">
      <s-tween-preset
        tag="p"
        preset="fadeUp"
        class="uppercase title-black"
        >404 Page not found</s-tween-preset
      >

      <s-tween-preset
        preset="fadeUp"
        :to="{
          delay: 0.15
        }"
        class="flex gap-12 mt-12 justify-center">
        <nuxt-link :to="'/'">
          <a-button
            text="Back to home"
            variation="black"
            paddingX="1em"
            backgroundColor="black"
            class="uppercase hover:text-white transition-all duration-500" />
        </nuxt-link>
      </s-tween-preset>
    </div>
  </div>
</template>
