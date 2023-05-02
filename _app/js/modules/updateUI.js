import renderWorkouts from "./renderWorkouts.js";
import weeklyProgress from "./weeklyProgress.js";
import totalProgress from "./totalProgress.js";
import fetchWorkouts from "./fetchWorkouts.js";

export default async function updateUI(map) {
	const workouts = await fetchWorkouts();
	await renderHTMl(map, workouts)
	
	async function renderHTMl(map, workouts) {
		renderWorkouts(map, workouts);
		await weeklyProgress();
		await totalProgress();

	}
}