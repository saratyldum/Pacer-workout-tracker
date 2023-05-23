import { reducer } from "./helperFunction-reducer.js";
/**
 * Takes an array of workouts and renderes the daily progress tab accordingly. Ideally this data would reset at the beginning
 * of every week, but for the sake of simplicity that does not happen in this project.
 * 
 * @param {array} workouts the workouts to be rendered on the daily progress bars
 */

export default function progressDailyProgress(workouts) {
	const tabButtons = document.querySelectorAll('.daily-activities-tab-button');
	const barContainers = document.querySelectorAll('.daily-activities__bar-container');
	const weeklyGoal = parseInt(document.querySelector('.weekly-goal__input').value, 10);

	let newWorkoutObjects = [];

	tabButtons.forEach(tabButton => {
		tabButton.addEventListener('click', handleTabButtonClick)
	})

	async function handleTabButtonClick(event) {
		const tabButton = event.currentTarget;
		renderHTML(tabButton);
	}
	
	/**
	 * Creates new workout objects with the information we need to render the daily progress bars and pushes it into
	 * a new array with 
	 * Turns each workout date into a number between 0-6 depending on the day of the week. This number correlates to each 
	 * progress bars' index so we know which workouts to render on which progress bar.
	 */
	for (const workout of workouts) {
		const day = new Date(workout.date).getDay()-1;
		
		newWorkoutObjects.push({
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

	/**
	 * The only function that makes changes to the DOM. Finds what acitivity tab has been clicked and makes changes to the DOM thereafter.
	 * Since running is the activity being displayed when the site is loaded, the default is that "isCycling" is false.
	 * This changes as the user clicks on one of the tabs making the tabs change color and the workouts filter based
	 * on the acitivity that is clicked. With the filtered workouts each days progress bar gets calculated.
	 * 
	 * @param {event} tabButton - The tab that has been clicked. This defines what activity needs to be shown in the DOM.
	 * 
	 * @see toggleTabColor()
	 * @see calculateBarHeight()
	 */

	 function renderHTML(tabButton) {
		const thisWeekValueContainer = document.querySelector('.daily-activities__tab-content--span');
		let thisWeeksActivityValue;
		let dailyPercentage;
		let isCycling = false;

		//Changes the tab clicked's color and the isCycling variable depending on whether the tab button clicked has the cycling class or not.
		if(tabButton !== undefined) {
			toggleTabColor(tabButton);
			isCycling = tabButton.classList.contains('daily-activities__cycling-tab');
		}

		//renders everything related to the cycling tab
		if(isCycling) {
			const cyclingWorkouts = newWorkoutObjects.filter(workout => workout.type === 'cycling');
			thisWeeksActivityValue = calculateWeeklyDistanceValue(cyclingWorkouts);
			
			for (let index = 0; index < barContainers.length; index++) {
				dailyPercentage = calculateBarHeight(cyclingWorkouts, index);
				barContainers[index].firstElementChild.style.height = `${dailyPercentage > 0 ? dailyPercentage : 1}%`;
			}
		//renders everything related to the running tab
		} else {
			const runningWorkouts = newWorkoutObjects.filter(workout => workout.type === 'running');
			thisWeeksActivityValue = calculateWeeklyDistanceValue(runningWorkouts)

			for (let index = 0; index < barContainers.length; index++) {
				dailyPercentage = calculateBarHeight(runningWorkouts, index);
				barContainers[index].firstElementChild.style.height = `${dailyPercentage > 0 ? dailyPercentage : 1}%`;
			}
		}

		//set the weeks distance value for the tab open
		thisWeekValueContainer.textContent = `${thisWeeksActivityValue}km`
	}

	function toggleTabColor(tabButton) {
		tabButtons.forEach(tabButton => {
			tabButton.style.backgroundColor = 'var(--secondary-color-light)';
		});
		tabButton.style.backgroundColor = 'inherit';
	}

	/**
	 * Filters throught the workouts and calculates the bar height depending on the users activities on the days with the 
	 * corresponding index numbers. Calculating the bar height relevant to the full weekly goal would make the bars very
	 * short as the daily activities obviously would be far for the goal for the whole week, therefor the bars 
	 * he bars height is calculated as a percentage relevant to half of the weekly goal set by the user.
	 * 
	 * @param {array} workouts - filtered list of workouts
	 * @param {number} index - the index of the progress bar being calculated
	 * @returns each days percentage relevant to the weekly goal
	 */
	function calculateBarHeight(workouts, index) {
		const initialValue = 0;
		const oneDay = workouts.filter(day => day.day === index);
		let dailyDistances = [];

		for (const day of oneDay) {
			dailyDistances.push(day.distance)
		}

		const reducedDailyDistances = dailyDistances.reduce(reducer, initialValue);
		const percentageOfWeekly = reducedDailyDistances / (weeklyGoal / 2) * 100;

		return percentageOfWeekly;
	}

	/**
	 * Takes the distances from each day and reduces them into one number being the total distance the user has trained with the given activity.
	 * 
	 * @param {array} workouts filtered list of workouts
	 * @returns the total weekly distance user has been cycling or running.
	 */
	function calculateWeeklyDistanceValue(workouts) {
		const initialValue = 0;
		let allDistances = [];

		for (const workout of workouts) {
			allDistances.push(workout.distance);
		}

		const reducedWeeklyDistances = allDistances.reduce(reducer, initialValue);
		return reducedWeeklyDistances;
	}
}