import renderWorkouts from "./renderWorkouts.js";
import weeklyProgress from "./weeklyProgress.js";
import totalProgress from "./totalProgress.js";
import fetchWorkouts from "./fetchWorkouts.js";
import dailyProgress from "./dailyProgress.js"
import deleteWorkout from "./deleteWorkout.js";

export default async function updateUI(map, workout) {
	await renderHTMl(map, workout)
	
	/**
	 * Runs most modules to update the UI whenever a new workout has been submitted or deleted.
	 * 
	 * @param {object} map the map on the site, from Mapbox
	 * @param {object} workout the one new workout that has been submited from the form. Gets sent as an array
	 * because that is what the renderWorkouts module takes as a parameter.
	 */
	async function renderHTMl(map, workout) {
		const workouts = await fetchWorkouts();

		if(map !== undefined && workout !== undefined) {
			await renderWorkouts(map, [workout]);
		}

		await weeklyProgress(workouts);
		totalProgress(workouts);
		dailyProgress(workouts);
		await deleteWorkout();
	}
}