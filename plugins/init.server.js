export default defineNuxtPlugin(async () => {
  const app = useAppStore()

  console.log("app load ...")
  await app.load()
})
