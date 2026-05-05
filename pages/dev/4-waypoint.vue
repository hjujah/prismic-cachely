<script setup></script>

<template>
  <main>
    <s-lenis>
      <section class="p-12 prose prose-slate prose-sm">
        <ContentDoc path="/waypoint" />
      </section>

      <s-waypoint
        v-slot="{ visible, isNotBelow }"
        :debug="true"
        v-for="i in 50"
        :key="i"
        :no-overscroll="true"
        class="bg-orange-500 p-12 m-12 h-[30vw] w-[30vw]">
        Visible: {{ visible }} / isNotBelow: {{ isNotBelow }}
      </s-waypoint>
    </s-lenis>
  </main>
</template>
