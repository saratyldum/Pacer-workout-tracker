import { sanity } from "../sanity.js";
import { sanityMutate  } from "../sanity.js";
import handleError from "./handleError.js";

export default async function progressWeeklyProgress(workouts) {
	const progressBar = document.querySelector('.weekly-goal__progress-bar--bar');
	const weeklyDistanceDone = document.querySelector('.weekly-goal__progress-info--done');
	const weeklyDistanceRemaining = document.querySelector('.weekly-goal__progress-info--remaining');

	let goalInput = document.querySelector('.weekly-goal__input');
	let totalDistance;
	let weeklyValue = 0;
	let progressPerecentage;

	const weeklyGoal = await setWeeklyGoalUIValue();

	goalInput.addEventListener('keyup', handleGoalInputKeyup);

	renderHTML(weeklyGoal, workouts);

	async function handleGoalInputKeyup(event) {
		if(event.key == 'Enter') {
			weeklyValue = parseInt(goalInput.value, 10);

			await sendWeeklyGoalToSanity(weeklyValue);
			const weeklyGoal = await setWeeklyGoalUIValue();
			renderHTML(weeklyGoal, workouts)
		} else {
			return
		}
	}

	function renderHTML(weeklyGoal, workouts) {
		calculateDistances(weeklyGoal, workouts); 
		changeProgressBarWidth(weeklyGoal);
	}

	async function setWeeklyGoalUIValue() {
		const weeklyGoal = await fetchWeeklyGoal();
		goalInput.value = '';
		goalInput.value = weeklyGoal;
		return weeklyGoal;
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

	function calculateDistances(weeklyGoal, workouts) {
		const initialValue = 0;
		let distance = [];

		for (const workout of workouts) {
			distance.push(workout.distance)
		}

		const reducedDistance = distance.reduce((accumulator, currentValue) => accumulator + currentValue, initialValue);
		const distanceRemaining = parseInt((weeklyGoal - reducedDistance));

		totalDistance = reducedDistance;
		weeklyDistanceDone.textContent = reducedDistance;
		weeklyDistanceRemaining.textContent = distanceRemaining >= 0 ? distanceRemaining : 0;
	}

	function calculateProgressPercentage(weeklyGoal) {
		progressPerecentage = (totalDistance / weeklyGoal) * 100;
		return progressPerecentage;
	}

	function changeProgressBarWidth(weeklyGoal) {
		const progressBarWidth = calculateProgressPercentage(weeklyGoal);
		progressBar.style.width = `${progressBarWidth}%`;
	}

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