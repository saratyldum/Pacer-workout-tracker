import { sanity } from "../sanity.js";
export default async function totalProgress() {
	const totalProgress = document.querySelector('.total-progress__stats--distance-value');
	const totalTime = document.querySelector('.total-progress__stats--time-value');

	const workouts = await fetchTotalProgress();
	calculateTotalProgress(workouts);


	async function fetchTotalProgress() {
		const query = `*[_type == 'workout']{
			distance,
			duration
		}`;

		const workouts = await sanity.fetch(query);
		console.log(workouts);

		return workouts;
	}

	function calculateTotalProgress(workouts) {
		let distance = [];
		let time = [];
		for (const workout of workouts) {
			distance.push(workout.distance);
			time.push(workout.duration);
		}

		const initialValue = 0;
		
		const reducedDistance = distance.reduce(
			(accumulator, currentValue) => accumulator + currentValue, initialValue
		);

		const reducedTime = ((time.reduce(
			(accumulator, currentValue) => accumulator + currentValue, initialValue
		)) / 60).toFixed(1);

		totalProgress.textContent= `${reducedDistance}km`;
		totalTime.textContent =`${reducedTime}hr`;

	}

	/**
	 * @TODO add together all distance and all time from workouts in sanity and display total numbers is UI.
	 * Fetch from sanity
	 */
}