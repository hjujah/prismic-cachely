# S-Tween-Preset

The `S-Tween-Preset` component is a Vue component that provides animation presets for easily animating elements in your Vue applications. It utilizes the `S-Tween` component for animation functionality.

## Props:

- `tag` (String): The HTML tag name to use for the component wrapper (default: "div").
- `preset` (String): The name of the preset animation to be used. Available presets can be found in the `animationPresets.js` file.
- `from` (Object): The initial animation properties. Overrides the preset animation if provided.
- `to` (Object): The final animation properties. Overrides the preset animation if provided.
- `paused` (Boolean): Whether the animation should be initially paused (default: false).
- `debug` (Boolean): Whether to enable debug mode for the animation (default: false).
- `clearProps` (String): The CSS properties to clear after animation completion (default: "transform").

## Usage:

Here's an example usage of the `S-Tween-Preset` component:

```vue
<template>
	<s-tween-preset
		tag="div"
		preset="fadeInOut"
		:from="{ opacity: 0 }"
		:to="{ opacity: 1, duration: 1000 }"
		:paused="false">
		<p>Hello, World!</p>
	</s-tween-preset>
</template>
```
