/**
 * Calculates the progress between start, end and current values.
 * @param {number} start - The starting value.
 * @param {number} end - The ending value.
 * @param {number} current - The current value.
 * @returns {number} - The progress as a decimal value between 0 and 1.
 */

export default (start, end, current) => {
	const totalRange = end - start
	const currentRange = current - start
	const progress = currentRange / totalRange

	// clamp progres bewteen 0 and 1
	return Math.min(Math.max(progress, 0), 1)
}
