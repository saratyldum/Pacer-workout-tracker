export default async function progressTotalProgress(workouts) {
	const totalProgress = document.querySelector('.total-progress__stats--distance-value');
	const totalTime = document.querySelector('.total-progress__stats--time-value');

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

		const reducedDistance = distance.reduce(
			(accumulator, currentValue) => accumulator + currentValue, initialValue
		);

		const reducedTime = ((time.reduce(
			(accumulator, currentValue) => accumulator + currentValue, initialValue
		)) / 60).toFixed(1);

		totalProgress.textContent= `${reducedDistance}km`;
		totalTime.textContent =`${reducedTime}hr`;
	}

}