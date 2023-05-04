import { sanity } from "../sanity.js";

export default function progressDailyProgress(workouts) {
	const tabButtons = document.querySelectorAll('.daily-activities-tab-button');
	const tabContents = document.querySelectorAll('.daily-activities__tab-content');
	const barContainers = document.querySelectorAll('.daily-activities__bar-container');
	const weeklyProgressNumber = document.querySelector('.daily-activities__tab-content--span'); //trenger kun 1 content
	const weeklyGoal = parseInt(document.querySelector('.weekly-goal__input').value, 10);

	/**
	 * change "This week" - value
	 */

	let allWorkouts = [];

	/**
	 * Creates new workout objects with the information we need to generate the daily progress bars.
	 * 
	 * Turns each workout date into a number between 0-6 depending on the day. This number correlates to each 
	 * progress bars' index so we know which workouts to render on which progress bar.
	 * 
	 * @see calculateBarHeight()
	 */
	for (const workout of workouts) {
		const day = new Date(workout.date).getDay()-1;
		allWorkouts.push({
			day: day,
			distance: workout.distance,
			type: workout.type
		})
	}

	/**
	 * Renders at least once after loading the module for the first time.
	 * 
	 * @see renderHTML()
	 */
	renderHTML()
	

	tabButtons.forEach(tabButton => {
		tabButton.addEventListener('click', handleTabButtonClick)
	})


	async function handleTabButtonClick(event) {
		const tabButton = event.currentTarget;
		renderHTML(tabButton);
	}

	/**
	 * Finds what acitivity tab has been clicked and makes changes to the DOM thereafter.
	 * Since running is the activity being displayed when the site is loaded, the default is that isCycling is false.
	 * This changes as the user clicks on one of the tabs making the tabs change color and the workout list filter based
	 * on the acitivity that is clicked. With the filtered workout list each days progress bar gets calculated.
	 * 
	 * @param {*} tabButton - The tab that has been clicked. This defines what activity needs to be shown in the DOM.
	 * 
	 * @see toggleTabColor()
	 * @see calculateBarHeight()
	 */

	function renderHTML(tabButton) {
		const thisWeekValueContainer = document.querySelector('.daily-activities__tab-content--span');

		let isCycling = false;

		if(tabButton !== undefined) {
			toggleTabColor(tabButton);
			isCycling = tabButton.classList.contains('daily-activities__cycling-tab');
		}

		if(isCycling) {
			const cyclingWorkouts = allWorkouts.filter(workout => workout.type === 'cycling');
			for (let index = 0; index < barContainers.length; index++) {
				calculateBarHeight(cyclingWorkouts, index)
			}
			const thisWeekValue = calculateWeeklyDistance(cyclingWorkouts);
			thisWeekValueContainer.textContent = `${thisWeekValue}km`;

		} else {
			const runningWorkouts = allWorkouts.filter(workout => workout.type === 'running');
			for (let index = 0; index < barContainers.length; index++) {
				calculateBarHeight(runningWorkouts, index)
			}
			const thisWeekValue = calculateWeeklyDistance(runningWorkouts)
			thisWeekValueContainer.textContent = `${thisWeekValue}km`
		}
	}

	function toggleTabColor(tabButton) {
		tabButtons.forEach(tabButton => {
			tabButton.style.backgroundColor = 'var(--secondary-color-light)';
		});

		tabButton.style.backgroundColor = 'inherit';
	}

	/**
	 * Filters throught the workouts and calculates the bar height depending on the users activities on the days with the 
	 * corresponding index numbers. The bars height is calculated as a percentage relevant to the weekly goal set by the user.
	 * 
	 * @param {array} workouts - filtered list of workouts
	 * @param {number} index - the index of the progress bar being calculated
	 */
	function calculateBarHeight(workouts, index) {
		const initialValue = 0;
		const oneDay = workouts.filter(day => day.day === index);

		let dailyDistances = [];

		for (const day of oneDay) {
			dailyDistances.push(day.distance)
		}

		const reducedDailyDistances = dailyDistances.reduce((accumulator, currentValue) => accumulator + currentValue, initialValue);
		const percentageOfWeekly = reducedDailyDistances / (weeklyGoal / 2) * 100;

		barContainers[index].firstElementChild.style.height = `${percentageOfWeekly > 0 ? percentageOfWeekly : 1}%`;
	}

	function calculateWeeklyDistance(workouts) {
		const initialValue = 0;
		let allDistances = [];

		for (const workout of workouts) {
			allDistances.push(workout.distance);
		}

		const reducedWeeklyDistances = allDistances.reduce((accumulator, currentValue) => accumulator + currentValue, initialValue);
		return reducedWeeklyDistances;
	}
	
}