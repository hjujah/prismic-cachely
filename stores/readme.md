


### Naming

- Use the name of the store and surround it with `use` and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
- The first argument is a unique id of the store across your application

```js
import { defineStore } from 'pinia'

export const useAlertsStore = defineStore('alerts', {
  // other options...
})
```

https://pinia.vuejs.org/core-concepts/#defining-a-store


### We use "Setup Stores"

Setup stores bring a lot more flexibility than Option Stores as you can create watchers within a store and freely use any composable.

> Note: using composables will get more complex when using SSR

```js
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})
```

https://pinia.vuejs.org/core-concepts/#setup-stores



You can define as many stores as you want and you should define each store in a different file

```js
// ❌ This won't work because it breaks reactivity
// it's the same as destructuring from `props`
const { name, doubleCount } = store
// name will always be "Eduardo"
// doubleCount will always be 0
```

https://pinia.vuejs.org/core-concepts/outside-component-usage.html#using-a-store-outside-of-a-component
