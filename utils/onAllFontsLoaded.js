/**
 * This code imports the each function from the Lodash library and uses
 * the useTheme() hook to get the theme object in order to load all fonts defined
 * in the theme. The function takes a callback function which is called after all
 * the fonts have been loaded.
 */
import { each } from "lodash-es"

// Import only part which is required to allow tree-shaking
// import { theme } from '#tailwind-config'

export default (callback) => {
  const { theme } = useTheme()
  const startTime = performance.now()

  /**
   * onMounted hook that loads all fonts defined in the theme using onFontLoaded helper function
   */
  onMounted(() => {
    each(theme.fontFamily, (value) => loadFont(value[0]))

    document.fonts.ready.then(() => {
      console.info(`loading fonts took ${performance.now() - startTime} milliseconds.`)
      callback && callback()
    })
  })
}
