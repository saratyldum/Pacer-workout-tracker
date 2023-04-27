import loadMap from "./modules/loadMap.js";
import fetchWorkouts from "./modules/fetchWorkouts.js";
// import getUserPosition from "./modules/getUserPosition.js";
import workoutForm from "./modules/workoutForm.js";
import weeklyProgress from "./modules/weeklyProgress.js";
import dailyProgress from "./modules/dailyProgress.js";
import renderWorkouts from "./modules/renderWorkouts.js"
import totalProgress from "./modules/totalProgress.js";

// mapbox(); få denne til å kjøre herfra, ikke fra userlocation

let map;
const workouts = await fetchWorkouts();

if(navigator.geolocation)
navigator.geolocation.getCurrentPosition(handleGeolocationSucess, errorPosition)

function handleGeolocationSucess(position) {
const map = loadMap(position)
renderWorkouts(map, workouts);
workoutForm(map)

}

function errorPosition() {
alert('Could not get your position')
}



// getUserPosition();
// workoutForm(); //return distance whenever a new workout is added
weeklyProgress(); //use distance to add onto progress bar
totalProgress();
// dailyProgress();