# S-Timeline

The `S-Timeline` component provides a wrapper around the GSAP timeline object. It initializes the timeline on mount and exposes an `addToTimeline` method that can be used to add tweens to the timeline.

## Props

- `options` (Object): The options object to pass to the GSAP timeline constructor.

## Emits

- `updated`: When the timeline is updated with a new tween.
- `created`: When the timeline is created.

## Usage

Here's an example usage of the `S-Timeline` component:

```vue
<template>
	<s-timeline v-slot="{ addToTimeline }">
		<s-tween
			class="my-header"
			@updated="addToTimeline(gsap.to([...]))">
			Hello!
		</s-tween>
	</s-timeline>
</template>
```
