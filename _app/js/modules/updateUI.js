import renderWorkouts from "./renderWorkouts.js";
import weeklyProgress from "./weeklyProgress.js";
import totalProgress from "./totalProgress.js";
import fetchWorkouts from "./fetchWorkouts.js";
import dailyProgress from "./dailyProgress.js"
import deleteWorkout from "./deleteWorkout.js";

export default async function updateUI(map, workout) {
	// const workouts = await fetchWorkouts();
		await weeklyProgress();
		await totalProgress();
		await dailyProgress();
		await deleteWorkout();
	}
}