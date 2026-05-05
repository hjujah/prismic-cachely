# Parallax Component

**Props:**

- `tag` (String, default: "div")
- `wrapped` (Boolean, default: true)
- `factor` (Number, default: 0)
- `ease` (String, default: "Power2.easeOut")
- `offset` (Number or Boolean, default: false)
- `relativeToElement` (Boolean, default: false)
- `extraProps` (Array of objects with properties: `prop` (String), `from` (Number), `to` (Number))

**Computed properties:**

- `elStyle` (Object with `top` and `height` CSS properties)
- `_extraProps` (Object with `from` and `to` properties based on `extraProps` array)
