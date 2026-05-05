import { each, cloneDeep } from "lodash-es"

export default ({ presets, from, to, clearProps = "auto", paused, preset }) => {
  const selectedPreset = computed(() => {
    let _preset = cloneDeep(presets[preset.value])

    // no preset found
    if (!_preset) {
      return [from.value, to.value]
    }

    // override FROM animation if something is provided trough prop
    each(from.value, (value, key) => {
      _preset[0][key] = value
    })

    // override TO animation if something is provided trough prop
    each(to.value, (value, key) => {
      _preset[1][key] = value
    })

    // console.log("ima!!!", _preset)

    return _preset
  })

  // from animation values - preset or props
  const _from = computed(() => {
    return selectedPreset.value ? selectedPreset.value[0] : from
  })

  // to animation values - preset or props
  const _to = computed(() => {
    return selectedPreset.value
      ? selectedPreset.value[1]
      : {
          ...to,
          paused: paused,
          clearProps: clearProps,
          overwrite: "auto"
        }
  })

  return {
    _from,
    _to
  }
}
