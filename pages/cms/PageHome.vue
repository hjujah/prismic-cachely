<script setup>
  import { components } from "~/slices"

  import { cachelyPrismicClient } from "@/app/prismic/client"

  import fetchLinks from "@/config/pageFetchLinks"

  const CACHELY_EXPERIMENT_STORAGE_KEY = "cachely_active_experiment"
  const CACHELY_VISITOR_KEY = "cachely_visitor_id"
  const CACHELY_SESSION_KEY = "cachely_session_id"
  const CACHELY_TENANT_SLUG = "prismic"
  const CACHELY_GOAL_EVENT = "homepage_hero_cta_click"

  const startTime = performance.now()

  const route = useRoute()

  const transform = computed(() => {
    const t = route.query.transform
    return Array.isArray(t) ? t[0] : t
  })

  const { data: page, error } = await useAsyncData(
    () => `home-${transform.value || "default"}`,

    () =>
      cachelyPrismicClient.getSingle("page_home", {
        fetchLinks,

        cachely: {
          transform: transform.value || null
        }
      })
  )

  console.info(`homepage loading took ${performance.now() - startTime} milliseconds.`)

  handlePageError(page, error)

  usePageMeta(page)

  const slices = computed(() => getSlices(page.value))

  function getOrCreateId(key, prefix) {
    if (!import.meta.client) return null

    const existing = window.localStorage.getItem(key)

    if (existing) {
      return existing
    }

    const id = `${prefix}_${Math.random().toString(36).slice(2)}_${Date.now().toString(36)}`

    window.localStorage.setItem(key, id)

    return id
  }

  function rememberCachelyExperimentFromResponse(response) {
    if (!import.meta.client || !response?.headers) return

    const experimentId = response.headers.get("x-cachely-experiment-id")
    const variantId = response.headers.get("x-cachely-variant-id")
    const variantKey = response.headers.get("x-cachely-variant-key")
    const profile = response.headers.get("x-cachely-experiment-profile")

    if (!experimentId || !variantId || !variantKey) {
      return
    }

    const exposure = {
      experimentId: Number(experimentId),
      variantId: Number(variantId),
      variantKey,
      profile,
      capturedAt: new Date().toISOString()
    }

    window.sessionStorage.setItem(
      CACHELY_EXPERIMENT_STORAGE_KEY,
      JSON.stringify(exposure)
    )

    console.info("[Cachely experiment]", exposure)
  }

  async function captureCachelyExperimentHeaders() {
    if (!import.meta.client) return

    // Explicit ?transform= requests bypass experiments, so do not capture in that mode.
    if (transform.value) {
      console.info(
        "[Cachely experiment] skipped because explicit transform is active:",
        transform.value
      )
      return
    }

    const href = page.value?.href

    if (!href) {
      console.warn(
        "[Cachely experiment] page href missing, cannot capture experiment headers"
      )
      return
    }

    try {
      const prismicUrl = new URL(href)
      const cachelyUrl = new URL("/~api/documents/search", window.location.origin)

      prismicUrl.searchParams.forEach((value, key) => {
        cachelyUrl.searchParams.set(key, value)
      })

      cachelyUrl.searchParams.set("cachely_experiment_probe", "1")

      const response = await fetch(cachelyUrl.toString(), {
        method: "GET",
        credentials: "omit"
      })

      rememberCachelyExperimentFromResponse(response)
    } catch (err) {
      console.warn("[Cachely experiment] failed to capture headers", err)
    }
  }

  async function trackCachelyExperimentEvent(eventName, metadata = {}) {
    if (!import.meta.client) return

    const raw = window.sessionStorage.getItem(CACHELY_EXPERIMENT_STORAGE_KEY)

    if (!raw) {
      console.warn("[Cachely experiment] no active experiment stored")
      return
    }

    let exposure

    try {
      exposure = JSON.parse(raw)
    } catch {
      console.warn("[Cachely experiment] invalid stored experiment payload")
      return
    }

    if (!exposure?.experimentId || !exposure?.variantId || !exposure?.variantKey) {
      console.warn("[Cachely experiment] incomplete experiment payload", exposure)
      return
    }

    const payload = {
      tenantSlug: CACHELY_TENANT_SLUG,
      experimentId: exposure.experimentId,
      variantId: exposure.variantId,
      variantKey: exposure.variantKey,
      eventName,
      visitorId: getOrCreateId(CACHELY_VISITOR_KEY, "visitor"),
      sessionId: getOrCreateId(CACHELY_SESSION_KEY, "session"),
      url: window.location.href,
      referrer: document.referrer || "",
      metadata
    }

    try {
      const response = await fetch("https://app.cachely.io/api/ai-experiments/events", {
        method: "POST",
        credentials: "omit",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        console.warn("[Cachely experiment] event rejected", await response.text())
        return
      }

      const result = await response.json()

      console.info("[Cachely experiment] event tracked", result)
    } catch (err) {
      console.warn("[Cachely experiment] event tracking failed", err)
    }
  }

  function onExperimentCtaClick() {
    trackCachelyExperimentEvent(CACHELY_GOAL_EVENT, {
      cta: "fixed_demo_cta"
    })
  }

  onMounted(() => {
    captureCachelyExperimentHeaders()
  })
</script>

<template>
  <main class="page page--home">
    <s-lenis class="overflow-x-hidden">
      <SliceZone
        :components="components"
        :slices="slices" />

      <AppFooter />
    </s-lenis>

    <button
      class="cachely-experiment-cta"
      type="button"
      @click="onExperimentCtaClick">
      Track demo CTA
    </button>
  </main>
</template>

<style scoped>
  .cachely-experiment-cta {
    position: fixed;
    right: 24px;
    bottom: 24px;
    z-index: 9999;
    padding: 14px 18px;
    border: 1px solid rgb(255 255 255 / 20%);
    border-radius: 999px;
    background: #ffffff;
    color: #05050a;
    font-size: 14px;
    font-weight: 700;
    line-height: 1;
    box-shadow: 0 20px 60px rgb(0 0 0 / 35%);
    cursor: pointer;
  }

  .cachely-experiment-cta:hover {
    transform: translateY(-1px);
  }

  .cachely-experiment-cta:active {
    transform: translateY(0);
  }
</style>
