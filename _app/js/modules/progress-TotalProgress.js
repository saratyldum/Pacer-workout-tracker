import { reducer } from "./helperFunction-reducer.js";

export default async function progressTotalProgress(workouts) {
	const totalProgressContainer = document.querySelector('.total-progress__stats--distance-value');
	const totalTimeContainer = document.querySelector('.total-progress__stats--time-value');

	calculateTotalProgress(workouts);

	/**
	 * Calculates the users total distance and total time they have spend in activity.
	 * 
	 * @param {array} workouts all workouts done by user, fetched from sanity
	 */
	function calculateTotalProgress(workouts) {
		const initialValue = 0;

		let distance = [];
		let time = [];

		for (const workout of workouts) {
			distance.push(workout.distance);
			time.push(workout.duration);
		}

		const totalDistance = distance.reduce(reducer, initialValue);
		const totalTime = ((time.reduce(reducer, initialValue)) / 60).toFixed(1);

		totalProgressContainer.textContent= `${totalDistance}km`;
		totalTimeContainer.textContent =`${totalTime}hr`;
	}

}