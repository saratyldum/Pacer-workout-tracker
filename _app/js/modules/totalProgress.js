import { sanity } from "../sanity.js";

export default async function totalProgress() {
	const totalProgress = document.querySelector('.total-progress__stats--distance-value');
	const totalTime = document.querySelector('.total-progress__stats--time-value');

	const workouts = await fetchTotalProgress();
	calculateTotalProgress(workouts);

	async function fetchTotalProgress() {
		try {
			const query = `*[_type == 'workout']{
				distance,
				duration
			}`;
	
			const workouts = await sanity.fetch(query);
			return workouts;
		} catch(error) {
			console.error(error.message)
		}
	}

	function calculateTotalProgress(workouts) {
		let distance = [];
		let time = [];
		const initialValue = 0;

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