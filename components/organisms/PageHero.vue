<script setup lang="ts">
  import type { ImageField, RichTextField } from "@prismicio/client"

  const { image, headline, text } = defineProps<{
    image: ImageField
    headline: RichTextField
    text: RichTextField
  }>()
</script>

<template>
  <section class="o-page-hero">
    <div class="o-page-hero__media">
      <s-picture
        :image="image"
        :use-original-ratio="false"
        sizes="sm:100vw md:100vw lg:100vw xl:100vw"
        object-fit="cover"
        class="o-page-hero__image" />
    </div>

    <div class="o-page-hero__overlay" />

    <div class="o-page-hero__content">
      <PrismicRichText
        :field="headline"
        class="o-page-hero__headline" />
      <PrismicRichText
        :field="text"
        class="o-page-hero__text" />
    </div>
  </section>
</template>

<style lang="scss" scoped>
  .o-page-hero {
    position: relative;
    width: 100%;
    color: #fff;

    &__media {
      position: relative;
      width: 100%;
      height: 100vh;
      overflow: hidden;
    }

    &__image {
      width: 100%;
      height: 100%;
    }

    &__overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        to top,
        rgba(0, 0, 0, 0.75) 0%,
        rgba(0, 0, 0, 0.3) 50%,
        rgba(0, 0, 0, 0) 100%
      );
      pointer-events: none;
    }

    &__content {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      max-width: 900px;
      padding: 4rem 3rem;
    }

    &__headline {
      :deep(h1) {
        margin: 0 0 1.25rem;
        color: #fff;
        font-size: clamp(3rem, 8vw, 7rem);
        font-weight: 700;
        line-height: 1.05;
        letter-spacing: -0.02em;
      }
    }

    &__text {
      :deep(p) {
        max-width: 60ch;
        margin: 0;
        color: rgba(255, 255, 255, 0.85);
        font-size: clamp(1rem, 1.5vw, 1.25rem);
        line-height: 1.6;
      }
    }
  }
</style>
