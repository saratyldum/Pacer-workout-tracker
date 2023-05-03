import loadMap from "./modules/loadMap.js";
import fetchWorkouts from "./modules/fetchWorkouts.js";
import workoutForm from "./modules/workoutForm.js";
import renderWorkouts from "./modules/renderWorkouts.js";
import weeklyProgress from "./modules/weeklyProgress.js";
import dailyProgress from "./modules/dailyProgress.js";
import totalProgress from "./modules/totalProgress.js";
import deleteWorkout from "./modules/deleteWorkout.js";

const workouts = await fetchWorkouts();

if(navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(handleGeolocationSucess, errorPosition)
}

async function handleGeolocationSucess(position) {
	const map = loadMap(position);
	await renderWorkouts(map, workouts);
	await weeklyProgress();
	await dailyProgress();
	await totalProgress();
	workoutForm(map)
	await deleteWorkout()
}

function errorPosition() {
alert('Could not get your position')
}

