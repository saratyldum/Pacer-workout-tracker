import { sanity } from "../sanity.js";
import { sanityMutate  } from "../sanity.js";
import handleError from "./handleError.js";
import { reducer } from "./helperFunction-reducer.js";
import progressDailyProgress from "./progress-DailyProgress.js"


/**
 * Takes an array of workouts and renderes the weekly progress section accordingly. Ideally this data would reset at the beginning
 * of every week, but for the sake of simplicity that does not happen in this project.

 * @param {array} workouts the workouts to be rendered in the weekly progress section
 */

export default async function progressWeeklyProgress(workouts) {
	const progressBar = document.querySelector('.weekly-goal__progress-bar--bar');
	const weeklyDistanceDone = document.querySelector('.weekly-goal__progress-info--done');
	const weeklyDistanceRemaining = document.querySelector('.weekly-goal__progress-info--remaining');
	const goalInput = document.querySelector('.weekly-goal__input');
	const form = document.querySelector('.weekly-goal__goal');
	const weeklyGoal = await fetchWeeklyGoal();
	
	let totalDistanceTrained;
	let weeklyGoalValue = 0;
	
	form.addEventListener('submit', handleFormSubmit);

	async function handleFormSubmit(event) {
		event.preventDefault();
		weeklyGoalValue = parseInt(goalInput.value, 10);

		await sendWeeklyGoalToSanity(weeklyGoalValue);

		const weeklyGoal = await fetchWeeklyGoal();
		renderHTML(weeklyGoal, workouts)
	}


	/**
	 * Renders at least once after loading the module for the first time.
	 * 
	 * @see renderHTML()
	 */
	renderHTML(weeklyGoal, workouts);


	/**
	 * The only function that makes changes to the DOM. Every action and change to the DOM will be handled with this function.
	 * 
	 * @param {number} weeklyGoal the weekly goal fetched from Sanity
	 * @param {array} workouts the workouts to be rendered
	 */
	function renderHTML(weeklyGoal, workouts) {
		const [distanceDone, distanceRemaining] = calculateDistances(weeklyGoal, workouts); 
		const progressBarWidth = calculateProgressPercentage(weeklyGoal);

		//Sets the weekly goal value
		goalInput.value = '';
		goalInput.value = weeklyGoal;

		//Set the values for distance trained and the remaining distance according to the goal set by user
		weeklyDistanceDone.textContent = distanceDone;
		weeklyDistanceRemaining.textContent = distanceRemaining >= 0 ? distanceRemaining : 0;

		//changes the width of the progress bar
		progressBar.style.width = `${progressBarWidth}%`;

		progressDailyProgress(workouts);
	}

	/**
	 * Takes all distnces from the individual workouts and reduces them to one final total value before calcuating what 
	 * distance is remainig to reach the weekly goal.
	 * 
	 * @param {number} weeklyGoal the weekly goal fetched from Sanity
	 * @param {array} workouts the workouts to be rendered
	 * @returns total distances trained and the distance remaining to reach the goal
	 */
	function calculateDistances(weeklyGoal, workouts) {
		const initialValue = 0;
		let distance = [];

		for (const workout of workouts) {
			distance.push(workout.distance)
		}

		const reducedDistance = distance.reduce(reducer, initialValue);
		const distanceRemaining = parseInt((weeklyGoal - reducedDistance));

		totalDistanceTrained = reducedDistance;

		return [reducedDistance, distanceRemaining];
	}

	/**
	 * Calculated the users weekly progress in percentage in order to style the progress bars width.
	 * 
	 * @param {number} weeklyGoal the weekly goal fetched from Sanity
	 * @returns the progress percentage 
	 */
	function calculateProgressPercentage(weeklyGoal) {
		const progressPerecentage = (totalDistanceTrained / weeklyGoal) * 100;
		return progressPerecentage;
	}


	async function fetchWeeklyGoal() {
		try {
			const query = `*[_id == 'settings'][0]`
			const goal = await sanity.fetch(query);
			
			return goal.weeklyGoal;
		} catch(error) {
			handleError(error.message)
		}
	}

	/**
	 * Takes the weekly goal set by user and sends it to Sanity to update the database with the new value.
	 * The code architecture is borrowed from Alejandro Rojas. 
	 * 
	 * @param {number} goal the goal set by user.
	 * @see sendWorkoutToSanity() in workouts-workoutForm.js module for a more in depth comment on the mutate code
	 */
	async function sendWeeklyGoalToSanity(goal) {
		try {
			const mutations = [
				{
					'createOrReplace': {
						_type: 'settings',
						_id: 'settings',
						weeklyGoal: `${goal}`
					}
				}
			]

			const params = {
				dryRun: false
			}

			const result = await sanityMutate.mutate(mutations, params);

		} catch(error) {
			handleError(error.message)
		}
	}
}