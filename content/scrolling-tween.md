## Component Name: ScrollingTween

Description:
This component combines the "s-scrolling-timeline" and "s-tween" components to create scroll-based animations. It allows you to define a custom tag for the tweened element and set the initial and final properties for the animation. The animation is controlled by the scroll progress within a specified range. The "s-scrolling-timeline" and "s-tween" components are expected to be available in the parent's component scope.

### Props:

- `tag` (String, default: "div"): The HTML tag to be used for the tweened element.
- `from` (Object, default: {}): The initial CSS properties for the animation.
- `to` (Object, default: {}): The final CSS properties for the animation.
- `startOffset` (Number, default: 0): The offset from the top of the viewport where animation starts.
- `endOffset` (Number, default: 0): The offset from the top of the viewport where animation ends.
- `progress` (Number or Boolean): The current progress value (0 to 1) or a boolean to use internal progress tracking. If a number is provided, it takes precedence over internal tracking.

### Slots:

- Default Slot: This slot can be used to wrap the content that you want to animate based on the scroll progress. The content will be tweened between the "from" and "to" states specified in the props.

### Usage:

The ScrollingTween component is designed to create scroll-based animations for specific elements. Wrap the elements you want to animate with the default slot, and they will be automatically tweened based on the scroll progress within the specified range.

### Example:

```html
<ScrollingTween
	tag="section"
	:from="{ opacity: 0, x: 100 }"
	:to="{ opacity: 1, x: 0 }"
	:startOffset="100"
	:endOffset="300"
	:progress="myCustomProgressValue">
	<!-- Animation content goes here -->
</ScrollingTween>
```
