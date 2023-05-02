import loadMap from "./modules/loadMap.js";
import fetchWorkouts from "./modules/fetchWorkouts.js";
import workoutForm from "./modules/workoutForm.js";
import updateUI from "./modules/updateUI.js";

const workouts = await fetchWorkouts();

if(navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(handleGeolocationSucess, errorPosition)
}

function handleGeolocationSucess(position) {
	const map = loadMap(position);
	updateUI(map, workouts);
	workoutForm(map)
}

function errorPosition() {
alert('Could not get your position')
}
