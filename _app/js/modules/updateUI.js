import progressWeeklyProgress from "./progress-WeeklyProgress.js";
import progressTotalProgress from "./progress-TotalProgress.js";
import progressDailyProgress from "./progress-DailyProgress.js"
import workoutsRenderWorkouts from "./workouts-renderWorkouts.js";
import workoutsFetchWorkouts from "./workouts-fetchWorkouts.js";
import workoutsDeleteWorkout from "./workouts-deleteWorkout.js";
import toggleStarterMessage from "./toggleStarterMessage.js";

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
		const workouts = await workoutsFetchWorkouts();

		if(map !== undefined && workout !== undefined) 
			await workoutsRenderWorkouts(map, [workout]);

		if (workouts.length === 0) {
			toggleStarterMessage(true)	
		}

		await progressWeeklyProgress(workouts);
		progressTotalProgress(workouts);
		progressDailyProgress(workouts);
		await workoutsDeleteWorkout();
	}
}