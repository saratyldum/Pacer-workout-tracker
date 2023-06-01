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
import toggleStarterMessage from "./modules/toggleStarterMessage.js";

/**
 * When the page loads the workouts and user information in Sanity gets fetched and the user greeting
 * gets rendered. The workouts get rendered only if the user allows the application to get their location data.
 * 
 * @see handleGeolocationSucess()
 */
const workouts = await workoutsFetchWorkouts();
const user = await progressFetchUserInformation();
progressGenerateUserGreeting(user);

/**
 * I decided to get the users location here instead of making a separate 
 * module because it is only being done once when the site has loaded and then not again,
 * and there are already a lot of modules to be imported on load.
 */
if(navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(handleGeolocationSucess, errorPosition)
}

/**
 * When the page loads most functions will have to run one time in order to get the UI updated based on
 * the data existing in Sanity Studio. For whenever a workout is added or deleted later on I have a separate
 * function running most functions again to update the UI with the updated workouts as the user uses the application. 
 * The function below runs only if user allows the application to get their position, if they decline
 * they will get an error message informing them about the need for their position to be able to
 * run the application.
 * 
 * @param {object} position the position gathered from users data
 * 
 * @see updateUI() 
 * @see errorPosition() for the error handling
 */
async function handleGeolocationSucess(position) {
	const map = mapLoadMap(position);
	// updateUI(map)
	
	await workoutsRenderWorkouts(map, workouts);
	await progressWeeklyProgress(workouts);
	progressDailyProgress(workouts);
	progressTotalProgress(workouts);
	workoutsWorkoutForm(map)
	await workoutsDeleteWorkout()
}

/**
 * If the application is not able to get the users location an error message will be displayed on the top
 * of the site. 
 * 
 * @see handleError.js module.
 */
function errorPosition() {
	handleError('Could not get your position')
}


/**
 * Runs most modules to update the UI whenever a new workout has been submitted or deleted. Get 
 * 
 * @param {object} map the map on the site, from Mapbox
 * @param {object} workout the one new workout that has been submited from the form. Gets sent as an array
 * because that is what the renderWorkouts module takes as a parameter.
 */
export async function updateUI(map, workout) {
	const workouts = await workoutsFetchWorkouts();

	if(map !== undefined && workout !== undefined) await workoutsRenderWorkouts(map, [workout]);

	if (workouts.length === 0) toggleStarterMessage(true);

	await progressWeeklyProgress(workouts);
	progressTotalProgress(workouts);
	progressDailyProgress(workouts);
	await workoutsDeleteWorkout();
}
