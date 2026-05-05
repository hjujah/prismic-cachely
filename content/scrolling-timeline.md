## Synchronized Scrolling Timeline

Description:
This component is a wrapper designed to be used with scroll-based animations. It provides functionality to track the progress of an element's scroll position within a specified range. The component allows you to define a custom tag for the outer element and set start and end offsets for calculating the progress. The component uses the "useScrollingElement" and "useTimeline" hooks to manage the progress and integrate with animations.

### Props:

- `tag` (String, default: "div"): The HTML tag to be used for the outer element.
- `startOffset` (Number, default: 0): The offset from the top of the viewport where progress starts.
- `endOffset` (Number, default: 0): The offset from the top of the viewport where progress ends.
- `progress` (Number or Boolean): The current progress value (0 to 1) or a boolean to use internal progress tracking. If a number is provided, it takes precedence over internal tracking.

### Emits:

- `update:bounds`: An event emitted when the component's bounding offsets change.
- `update:progress`: An event emitted when the progress value changes.

### Usage:

The Synchronized Scrolling Timeline is used by passing a slot with elements that need to be animated based on scroll progress. The "addToTimeline" prop is automatically provided to the slot, which you can use to add animation elements to the timeline created by the "useTimeline" hook.

### Example:

```html
<S-ScrollingTimeline
	tag="section"
	:startOffset="100"
	:endOffset="300"
	:progress="myCustomProgressValue"
	@update:bounds="handleBoundsUpdate"
	@update:progress="handleProgressUpdate">
	<s-tween
		from="{x: 100}"
		to="{x: 0}"
		:addToTimeline="addToTimeline">
		Animated content
	</s-tween>
</S-ScrollingTimeline>
```
