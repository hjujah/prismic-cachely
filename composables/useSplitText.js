/**
 * This module is used to split text using the GSAP library, a high-performance animation library for JavaScript.
 * It wraps each character of the text in a `div` element, and can animate the appearance and disappearance of characters.
 *
 * @param {HTMLElement} el - The element to split the text of.
 * @param {Object} opts - An object with options for the SplitText plugin.
 * @param {Array|string} opts.type - Specifies what element to split the text into, can be "words", "chars", "lines", or an array of those types.
 * @param {boolean} opts.wrapped - When set to true, wraps each character in a `div` element.
 * @return {Object} - An object with the split `elements` and `animateSplit` function.
 */

import { gsap } from "gsap"

import { SplitText } from "gsap/SplitText"

gsap.registerPlugin(SplitText)

export default (
  el,
  opts = {
    type: "lines",
    linesClass: "split-line"
  }
) => {
  if (!el) {
    console.warn("no split element", el)
    return
  }

  let splitElements = ref(null)
  let mySplitText

  const splitText = () => {
    if (!el.value) {
      return
    }

    try {
      mySplitText && mySplitText.revert()
      mySplitText = new SplitText(el.value, opts)
      splitElements.value =
        mySplitText[opts.type instanceof Array ? opts.type[0] : opts.type]
    } catch (err) {
      console.log("split err:", err)
    }
  }

  useOnFontsLoaded(splitText)
  // useResize(splitText)

  return {
    splitElements
  }
}
