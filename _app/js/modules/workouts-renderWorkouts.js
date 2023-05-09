import fetchWorkouts from "./workouts-fetchWorkouts.js";
import toggleStarterMessage from "./toggleStarterMessage.js";

export default async function workoutsRenderWorkouts(map, workouts) {
	const form = document.querySelector('.workout-form');
	const containerWorkouts = document.querySelector('.workouts');
	map = map;

	const allWorkouts = 	await fetchWorkouts();

	containerWorkouts.addEventListener('click', handleContainerWorkoutsClick);

	/**
	 * Renders at least once after loading the module for the first time.
	 * 
	 * @see renderHTML()
	 */
	renderHTML(workouts);

	function handleContainerWorkoutsClick(event) {
		moveToPopup(event);
	}

	/**
	 * Finds the ID of the workout element that has been clicked and find the equivilant
	 *  workout object from sanity to get the workouts coordinates and center the map around the clicked workout.
	 * 
	 * @param {*} event - takes the click event from when user clicks on one of the workouts in the list
	 *
	 * @returns out of the function if there is no valid map or if there is no workout element found
	 */
	function moveToPopup(event) {
		if (!map) return;
		const workoutElement = event.target.closest('.workout');

		if (!workoutElement) return;

		const workout = allWorkouts.find(
		work => work._id === workoutElement.dataset.id
		);

		map.flyTo({
			center: workout.coordinates
		});
	}

	/**
	 * The only function that makes changes to the DOM. Every action and change to the DOM will be handled with this function.
	 * @param {array} workouts - an array of all workout objects to be rendered.
	 */

	function renderHTML(workouts) {
		if(workouts.length > 0) {
			for (let index = 0; index < workouts.length; index++) {
				renderWorkoutMaker(workouts[index].coordinates, workouts[index].description, (workouts[index]._id || workouts[index].id))
				createWorkoutListDOMElement(workouts[index]);
			}
		}else {
			toggleStarterMessage(true);
		}
	 }

	 /**
	  * Renders workout on the map as a marker using Mapbox
	  * 
	  * @param {array} coordinates - coordinates from when the user clicked on the map to create a new workout.
	  * @param {string} description - description of the workout.
	  */
	 function renderWorkoutMaker(coordinates, description, id) {
		 //Creates popup
		 const popup = new mapboxgl.Popup({closeOnClick: false})
		 .setText(description)
		 .setLngLat(coordinates)
		 .addClassName('running-popup');
 
		 //Adds the marker
		 const marker = document.createElement('div');
		 marker.setAttribute('id', id);
		 marker.style.backgroundImage = `url(/_app/assets/icons/marker.svg)`;
		 marker.style.width = '35px';
		 marker.style.height = '35px';
		 marker.style.backgroundSize = '100%';

		 new mapboxgl.Marker(marker)
		 .setLngLat(coordinates)
		 .setPopup(popup)
		 .addTo(map)
	 }
 
	 /**
	  * Creates a workout DOM element for each workout object
	  * .
	  * @param {object} workout 
	  * @returns the DOM element to be appended on the site
	  */
	 function createWorkoutListDOMElement(workout) {
		const workoutElement = document.createElement('li');
		const workoutDescription = document.createElement('h2');
		const deleteButton = document.createElement('button');
		const deleteIcon = document.createElement('img');

		const workoutDistanceDetailsBlock = document.createElement('div'); 
		const workoutTypeIcon  = document.createElement('span');
		const workoutDistanceValue = document.createElement('span');
		const workoutDistanceUnit = document.createElement('span');

		const workoutDurationDetailsBlock = document.createElement('div');
		const workoutDurationIcon = document.createElement('span');
		const workoutDurationValue = document.createElement('span');
		const workoutDurationUnit = document.createElement('span');

		workoutElement.className = `workout--${workout.type}`;
		workoutElement.classList.add('workout');
		workoutElement.dataset.id = `${workout._id || workout.id}`

		workoutDescription.classList = 'workout__title'
		workoutDescription.innerText = `${workout.description}`;

		deleteButton.classList = 'workout__delete-button';
		deleteIcon.setAttribute('src', './_app/assets/icons/delete.png');
		deleteIcon.setAttribute('alt', 'Delete workout');

		
		workoutDistanceDetailsBlock.classList = 'workout__details';
		workoutTypeIcon.classList = 'workout__icon';
		workoutTypeIcon.innerText = `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'}`;
		workoutTypeIcon.ariaHidden = 'true';
		workoutDistanceValue.classList = 'workout__value';
		workoutDistanceValue.innerText = `${workout.distance}`;
		workoutDistanceUnit.classList = 'workout__unit';
		workoutDistanceUnit.innerText = 'km';
		
		workoutDurationDetailsBlock.classList = 'workout__details';
		workoutDurationIcon.classList = 'workout__icon';
		workoutDurationIcon.innerText = '⏱';
		workoutDurationIcon.ariaHidden = 'true';

		workoutDurationValue.classList = 'workout__value';
		workoutDurationValue.innerText = `${workout.duration}`;
		workoutDurationUnit.classList = 'workout__unit';
		workoutDurationUnit.innerText = 'min';

		deleteButton.appendChild(deleteIcon);
		workoutDistanceDetailsBlock.append(workoutTypeIcon, workoutDistanceValue, workoutDistanceUnit);
		workoutDurationDetailsBlock.append(workoutDurationIcon, workoutDurationValue, workoutDurationUnit)

		workoutElement.append(workoutDescription, deleteButton, workoutDistanceDetailsBlock, workoutDurationDetailsBlock);

		if (workout.type === 'running') {
			const workoutRunningPaceDetailsBlock = document.createElement('div');
			const workoutRunningPaceIcon = document.createElement('span');
			const workoutRunningPaceValue = document.createElement('span');
			const workoutRunningPaceUnit = document.createElement('span');

			const workoutRunningCadenceDetailsBlock = document.createElement('div');
			const workoutRunningCadenceIcon = document.createElement('span');
			const workoutRunningCadenceValue = document.createElement('span');
			const workoutRunningCadenceUnit = document.createElement('span');

			workoutRunningPaceDetailsBlock.classList = 'workout__details';
			workoutRunningPaceIcon.classList = 'workout__icon';
			workoutRunningPaceIcon.innerText = '⚡️';
			workoutRunningPaceIcon.ariaHidden = 'true';
			workoutRunningPaceValue.classList = 'workout__value';
			workoutRunningPaceValue.innerText = `${workout.pace.toFixed(1)}`;
			workoutRunningPaceUnit.classList = 'workout__unit';
			workoutRunningPaceUnit.innerText = 'min/km';

			workoutRunningCadenceDetailsBlock.classList = 'workout__details';
			workoutRunningCadenceIcon.classList = 'workout__icon';
			workoutRunningCadenceIcon.innerText = '🦶🏼';
			workoutRunningCadenceIcon.ariaHidden = 'true';
			workoutRunningCadenceValue.classList = 'workout__value';
			workoutRunningCadenceValue.innerText = `${workout.cadence}`;
			workoutRunningCadenceUnit.classList = 'workout__unit';
			workoutRunningCadenceUnit.innerText = 'spm';

			workoutRunningPaceDetailsBlock.append(workoutRunningPaceIcon, workoutRunningPaceValue, workoutRunningPaceUnit);
			workoutRunningCadenceDetailsBlock.append(workoutRunningCadenceIcon, workoutRunningCadenceValue, workoutRunningCadenceUnit);

			workoutElement.append(workoutRunningPaceDetailsBlock, workoutRunningCadenceDetailsBlock);
			form.after(workoutElement);

		} else if(workout.type === 'cycling') {
			const workoutCyclingSpeedDetailsBlock = document.createElement('div');
			const workoutCyclingSpeedIcon = document.createElement('span');
			const workoutCyclingSpeedValue = document.createElement('span');
			const workoutCyclingSpeedUnit = document.createElement('span');

			const workoutCyclingElevGainDetailsBlock = document.createElement('div');
			const workoutCyclingElevGainIcon = document.createElement('span');
			const workoutCyclingElevGainValue = document.createElement('span');
			const workoutCyclingElevGainUnit = document.createElement('span');

			workoutCyclingSpeedDetailsBlock.classList = 'workout__details';
			workoutCyclingSpeedIcon.classList = 'workout__icon';
			workoutCyclingSpeedIcon.innerText = '⚡️';
			workoutCyclingSpeedValue.classList = 'workout__value';
			workoutCyclingSpeedValue.innerText = `${workout.speed}`;
			workoutCyclingSpeedUnit.classList = 'workout__unit';
			workoutCyclingSpeedUnit.innerText = 'km/h';

			workoutCyclingElevGainDetailsBlock.classList = 'workout__details';
			workoutCyclingElevGainIcon.classList = 'workout__icon';
			workoutCyclingElevGainIcon.innerText = '⛰';
			workoutCyclingElevGainValue.classList = 'workout__value';
			workoutCyclingElevGainValue.innerText = `${workout.elevGain}`;
			workoutCyclingElevGainUnit.classList = 'workout__unit';
			workoutCyclingElevGainUnit.innerText = 'm';

			workoutCyclingSpeedDetailsBlock.append(workoutCyclingSpeedIcon, workoutCyclingSpeedValue, workoutCyclingSpeedUnit);
			workoutCyclingElevGainDetailsBlock.append(workoutCyclingElevGainIcon, workoutCyclingElevGainValue, workoutCyclingElevGainUnit);

			workoutElement.append(workoutCyclingSpeedDetailsBlock, workoutCyclingElevGainDetailsBlock);
			form.after(workoutElement);
		}
	 }
}