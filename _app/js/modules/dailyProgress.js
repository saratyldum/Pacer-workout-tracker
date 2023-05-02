import { sanity } from "../sanity.js";

export default async function dailyProgress() {
	const tabButtons = document.querySelectorAll('.daily-activities-tab-button');
	const tabContents = document.querySelectorAll('.daily-activities__tab-content');
	const barContainers = document.querySelectorAll('.daily-activities__bar-container');
	const weeklyProgressNumber = document.querySelector('.daily-activities__tab-content--span'); //trenger kun 1 content
	const weeklyGoal = parseInt(document.querySelector('.weekly-goal__input').value, 10);

	/**
	 * change "This week" - value
	 */

	let allDays = [];

	const workouts = await fetchWorkouts();
	for (const workout of workouts) {
		const day = new Date(workout.date).getDay()-1;
		allDays.push({
			day: day,
			distance: workout.distance,
			type: workout.type
		})
	}

	renderHTML()
	
	tabButtons.forEach(tabButton => {
		tabButton.addEventListener('click', handleTabButtonClick)
	})


	async function handleTabButtonClick(event) {
		const tabButton = event.currentTarget;
		renderHTML(tabButton);
	}

	function renderHTML(tabButton) {
		console.log(tabButton);
		let isCycling = false;

		if(tabButton !== undefined) {
			toggleTabColor(tabButton);
			isCycling = tabButton.classList.contains('daily-activities__cycling-tab');
		}

		if(isCycling) {
			const cyclingWorkouts = allDays.filter(workout => workout.type === 'cycling');
			for (let index = 0; index < barContainers.length; index++) {
				calculateBarHeight(cyclingWorkouts, index)
			}
		} else {
			const runningWorkouts = allDays.filter(workout => workout.type === 'running');
			for (let index = 0; index < barContainers.length; index++) {
				calculateBarHeight(runningWorkouts, index)
			}
		}
	}

	function toggleTabColor(tabButton) {
		tabButtons.forEach(tabButton => {
			tabButton.style.backgroundColor = 'var(--secondary-color-light)';
		});

		tabButton.style.backgroundColor = 'inherit';
	}

	function calculateBarHeight(workouts, index) {
		const initialValue = 0;
		const oneDay = workouts.filter(day => day.day === index);

		let dailyDistances = [];

		for (const day of oneDay) {
			dailyDistances.push(day.distance)
		}

		const reducedDailyDistances = dailyDistances.reduce((accumulator, currentValue) => accumulator + currentValue, initialValue);
		const percentageOfWeekly = reducedDailyDistances / weeklyGoal * 100;

		barContainers[index].firstElementChild.style.height = `${percentageOfWeekly > 0 ? percentageOfWeekly : 1}%`;
	}
	
	async function fetchWorkouts() {
		const query = `*[_type == 'workout'] {
			distance,
			type,
			date
		}`
		
		const workouts = await sanity.fetch(query);
		return workouts;
	}
	
}