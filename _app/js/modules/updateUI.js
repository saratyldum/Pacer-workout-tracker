import renderWorkouts from "./renderWorkouts.js";
import weeklyProgress from "./weeklyProgress.js";
import totalProgress from "./totalProgress.js";
import fetchWorkouts from "./fetchWorkouts.js";
import dailyProgress from "./dailyProgress.js"

export default async function updateUI(map, workout) {
	// const workouts = await fetchWorkouts();
	// console.log(workouts);
	await renderHTMl(map, workout)
	
	async function renderHTMl(map, workout) {
		renderWorkouts(map, [workout]);
		await weeklyProgress();
		await totalProgress();
		await dailyProgress();

	}
}