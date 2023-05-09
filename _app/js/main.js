import mapLoadMap from "./modules/map-loadMap.js";
import progressFetchUserInformation from "./modules/progress-fetchUserInformation.js";
import progressGenerateUserGreeting from "./modules/progress-generateUserGreeting.js";
import progressWeeklyProgress from "./modules/progress-WeeklyProgress.js";
import progressDailyProgress from "./modules/progress-DailyProgress.js";
import progressTotalProgress from "./modules/progress-TotalProgress.js";

import workoutsFetchWorkouts from "./modules/workouts-fetchWorkouts.js";
import workoutsWorkoutForm from "./modules/workouts-workoutForm.js";
import workoutsRenderWorkouts from "./modules/workouts-renderWorkouts.js";
import workoutsDeleteWorkout from "./modules/workouts-deleteWorkout.js";
import handleError from "./modules/handleError.js";


const workouts = await workoutsFetchWorkouts();
const user = await progressFetchUserInformation();
progressGenerateUserGreeting(user);

/**
 * I decided to get the users location here instead of making a separate 
 * module because it is only being done once when the site has loaded and then not again. 
 * Because og that i thought it was unecessary to create a module that needs to be imported 
 * before it can run.
 */
if(navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(handleGeolocationSucess, errorPosition)
}


async function handleGeolocationSucess(position) {
	const map = mapLoadMap(position);
	await workoutsRenderWorkouts(map, workouts);
	await progressWeeklyProgress(workouts);
	progressDailyProgress(workouts);
	progressTotalProgress(workouts);
	workoutsWorkoutForm(map)
	await workoutsDeleteWorkout()
}

//fiks bedre error
function errorPosition() {
	handleError('Could not get your position')
}

