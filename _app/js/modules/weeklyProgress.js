import { sanity } from "../sanity.js";
import { sanityMutate  } from "../sanity.js";

export default  async function weeklyProgress() {
	const progressBar = document.querySelector('.weekly-goal__progress-bar--bar');
	const weeklyDistanceDone = document.querySelector('.weekly-goal__progress-info--done');
	const weeklyDistanceRemaining = document.querySelector('.weekly-goal__progress-info--remaining');

	let goalInput = document.querySelector('.weekly-goal__input');
	let progress = 0;
	let finalValue;
	let weeklyValue = 0;
	let progressPerecentage;

	// goalInput.addEventListener('keyup', handleGoalInputKeyup);

	const weeklyGoal = await setWeeklyGoal();
	const workouts = await fetchDistance();
	calculateDistance(workouts)
	changeProgressBarWidth(weeklyGoal);


	async function setWeeklyGoal() {
		const weeklyGoal = await fetchWeeklyGoal();
		goalInput.value = '';
		goalInput.value = weeklyGoal;
		return weeklyGoal;
	}


	async function fetchWeeklyGoal() {
		const query = `*[_id == 'settings'][0]`
		const goal = await sanity.fetch(query);
		return goal.weeklyGoal;
	}

	async function fetchDistance() {
		const query = `*[_type == 'workout']{
			distance
		}`;

		const workouts = await sanity.fetch(query);

		return workouts;
	}

	function calculateDistance(workouts) {
		let distance = [];
		for (const workout of workouts) {
			distance.push(workout.distance)
		}

		const initialValue = 0;
		
		const reducedDistance = distance.reduce(
			(accumulator, currentValue) => accumulator + currentValue, initialValue
		);

		finalValue = reducedDistance;
		weeklyDistanceDone.textContent = reducedDistance;
		console.log(weeklyGoal);
		weeklyDistanceRemaining.textContent = parseInt((weeklyGoal - reducedDistance));
	}


	function handleGoalInputKeyup(event) {
		console.log(event.key);
		if(event.key == 'Enter') {
			weeklyValue = parseInt(goalInput.value, 10);
			console.log(weeklyValue);
			changeProgressBarWidth();
			sendWeeklyGoalToSanity(weeklyValue);
			setWeeklyGoal();
		} else {
			return
		}
	}

	function calculateProgressPercentage(weeklyGoal) {
		progressPerecentage = (finalValue / weeklyGoal) * 100;
		return progressPerecentage;
	}

	function changeProgressBarWidth(weeklyGoal) {
		const progressBarWidth = calculateProgressPercentage(weeklyGoal);
		console.log(weeklyGoal);
		progressBar.style.width = `${progressBarWidth}%`;
	}

	async function sendWeeklyGoalToSanity(goal) {
		//FUNKER IKKE Å ENDRE??

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
			console.error(error.message);
		}
	}
}