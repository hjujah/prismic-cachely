<script setup>
  import { createCachelyFetch } from "@cachely-io/sdk"

  const cachelyFetch = createCachelyFetch({
    tenant: "prismic",
    provider: "prismic",
    transform: "czech"
  })

  const { data: page, error } = await useAsyncData("test-czech-page", async () => {
    const url = new URL("https://cachely-io.cdn.prismic.io/api/v2/documents/search")

    url.searchParams.set("ref", "afnyWRIAACYAf0t7")
    url.searchParams.set("q", `[[at(document.id, "afnwfBIAACUAf0fG")]]`)

    const res = await cachelyFetch(url.toString())
    const json = await res.json()

    if (!res.ok || !json.results?.[0]) {
      throw new Error("Cachely transform did not return a Prismic document")
    }

    return json.results[0]
  })
</script>

<template>
  <main style="padding: 40px; color: white; background: black; min-height: 100vh">
    <h1>Cachely AI Transform Demo</h1>

    <pre v-if="error">{{ error }}</pre>

    <article v-else-if="page">
      <h2>{{ page.data.title }}</h2>

      <section
        v-for="slice in page.data.slices"
        :key="slice.id"
        style="margin-top: 24px">
        <h3 v-if="slice.primary?.headline?.[0]?.text">
          {{ slice.primary.headline[0].text }}
        </h3>

        <p v-if="slice.primary?.text?.[0]?.text">
          {{ slice.primary.text[0].text }}
        </p>

        <img
          v-if="slice.primary?.image?.url"
          :src="slice.primary.image.url"
          style="max-width: 520px; width: 100%; margin-top: 20px" />
      </section>
    </article>
  </main>
</template>
