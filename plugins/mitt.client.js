// Import the mitt event emitter library
import mitt from "mitt"

// Create a new event emitter instance
const emitter = mitt()

// Export a Nuxt plugin that provides event bus functionality
export default defineNuxtPlugin((nuxtApp) => {
  // Add a 'once' method to handle one-time events
  // This will automatically remove the listener after first execution
  emitter.once = (type, handler) => {
    const fn = (...args) => {
      emitter.off(type, fn) // Remove the listener
      handler(args) // Execute the handler with arguments
    }

    emitter.on(type, fn) // Register the one-time listener
  }

  // Provide the event bus methods to the Nuxt app
  // $on - Register an event listener
  // $once - Register a one-time event listener
  // $off - Remove an event listener
  // $emit - Emit an event
  nuxtApp.provide("bus", {
    $on: emitter.on,
    $once: emitter.once,
    $off: emitter.off,
    $emit: emitter.emit
  })
})
