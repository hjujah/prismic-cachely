# S-Tween

This component provides animation capabilities using GSAP (GreenSock Animation Platform). It allows animating HTML elements by defining the animation properties and options. The component initializes the animation on mount and updates it when the animation properties change.

## Props:

- `tag` (String): The HTML tag name to use for the component wrapper (default: "div").
- `from` (Object): The initial animation properties.
- `to` (Object): The final animation properties.
- `paused` (Boolean): Whether the animation should be initially paused (default: false).
- `html` (Boolean): Whether the animation targets HTML elements (default: true).

## Usage:

The `s-tween` component is used to animate HTML elements. You can define the animation properties using the `from` and `to` props.

Here's an example usage:

```vue
<s-tween tag="h2" :from="{ opacity: 0 }" :to="{ opacity: 1 }" v-html="Hello!" />
```
