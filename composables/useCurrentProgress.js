/**
 * Calculates the progress of each slide depending on the main current progress from 1 to 0,
 * the number of slides and the index of the slide. It ignores the first slide and only calculates
 * the progress of the second slide and the rest from the beginning.
 *
 * @param {number} numSlides - The total number of slides
 * @returns {object} An object with a calculateSlideProgress method that takes in two arguments
 */

export default (currentProgress, slideIndex, numSlides) => {
	const slideProgress = 1 / numSlides
	const slideStart = slideIndex * slideProgress

	// Calculate progress of current slide based on main progress
	let progressInCurrentSlide = (currentProgress - slideStart) / slideProgress

	// Clamp progress to be between 0 and 1
	progressInCurrentSlide = Math.min(1, Math.max(progressInCurrentSlide, 0))

	return progressInCurrentSlide
}

// export default (numSlides) => {
// 	const calculateSlideProgress = (currentProgress, slideIndex) => {
// 		// Skip the first slide and always return 1 for it
// 		if (slideIndex === 0) {
// 			return 0
// 		}

// 		const slideProgress = 1 / (numSlides - 1)
// 		const slideStart = (slideIndex - 1) * slideProgress

// 		// Calculate progress of current slide based on main progress
// 		let progressInCurrentSlide = (currentProgress - slideStart) / slideProgress

// 		// Clamp progress to be between 0 and 1
// 		progressInCurrentSlide = Math.min(1, Math.max(progressInCurrentSlide, 0))

// 		return progressInCurrentSlide
// 	}

// 	return { calculateSlideProgress }
// }
