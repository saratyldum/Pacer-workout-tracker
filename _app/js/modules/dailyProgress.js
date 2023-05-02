import { sanity } from "../sanity.js";

export default async function dailyProgress() {
	const tabButtons = document.querySelectorAll('.daily-activities-tab-button');
	const tabContents = document.querySelectorAll('.daily-activities__tab-content');
	const barContainers = document.querySelectorAll('.daily-activities__bar-container');
	const weeklyProgressNumber = document.querySelector('.daily-activities__tab-content--span'); //trenger kun 1 content
	const weeklyGoal = parseInt(document.querySelector('.weekly-goal__input').value, 10);

	const workouts = await fetchWorkouts();

	let allDays = [];

	for (const workout of workouts) {
		const day = new Date(workout.date).getDay()-1;
		allDays.push({
			day: day,
			distance: workout.distance,
			type: workout.type
		})
	}

	for (let index = 0; index < barContainers.length; index++) {
		calculateBarHeight(index);
	}

	function calculateBarHeight(index) {
		const initialValue = 0;
		const sameDay = allDays.filter(day => day.day === index);

		let dailyDistances = [];

		for (const day of sameDay) {
			dailyDistances.push(day.distance)
		}
		const reducedDaily = dailyDistances.reduce((accumulator, currentValue) => accumulator + currentValue, initialValue);
		const percentageOfWeekly = reducedDaily / weeklyGoal * 100;

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
	







	tabButtons.forEach(tabButton => {
		tabButton.addEventListener('click', handleTabButtonClick)
	})
	
	function handleTabButtonClick(tabButton) {
		tabButtons.forEach(tabButton => {
			tabButton.style.backgroundColor = 'var(--secondary-color-light)';
		})
		
		tabButton.currentTarget.style.backgroundColor = 'inherit';
	}
}