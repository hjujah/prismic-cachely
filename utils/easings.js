export const Easing = {
	// no easing, no acceleration
	linear: (t) => t,
	// accelerating from zero velocity
	easeInQuad: (t) => t * t,
	// decelerating to zero velocity
	easeOutQuad: (t) => t * (2 - t),
	// acceleration until halfway, then deceleration
	easeInOutQuad: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
	// accelerating from zero velocity
	easeInCubic: (t) => t * t * t,
	// decelerating to zero velocity
	easeOutCubic: (t) => --t * t * t + 1,
	// acceleration until halfway, then deceleration
	easeInOutCubic: (t) => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1),
	// accelerating from zero velocity
	easeInQuart: (t) => t * t * t * t,
	// decelerating to zero velocity
	easeOutQuart: (t) => 1 - --t * t * t * t,
	// acceleration until halfway, then deceleration
	easeInOutQuart: (t) => (t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t),
	// accelerating from zero velocity
	easeInQuint: (t) => t * t * t * t * t,
	// decelerating to zero velocity
	easeOutQuint: (t) => 1 + --t * t * t * t * t,
	// acceleration until halfway, then deceleration
	easeInOutQuint: (t) => (t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t)
}

export const linear = (t) => Easing.linear(t)
export const easeInQuad = (t) => Easing.easeInQuad(t)
export const easeOutQuad = (t) => Easing.easeOutQuad(t)
export const easeInOutQuad = (t) => Easing.easeInOutQuad(t)
export const easeInCubic = (t) => Easing.easeInCubic(t)
export const easeOutCubic = (t) => Easing.easeOutCubic(t)
export const easeInOutCubic = (t) => Easing.easeInOutCubic(t)
export const easeInQuart = (t) => Easing.easeInQuart(t)
export const easeOutQuart = (t) => Easing.easeOutQuart(t)
export const easeInOutQuart = (t) => Easing.easeInOutQuart(t)
export const easeInQuint = (t) => Easing.easeInQuint(t)
export const easeOutQuint = (t) => Easing.easeOutQuint(t)
export const easeInOutQuint = (t) => Easing.easeInOutQuint(t)
