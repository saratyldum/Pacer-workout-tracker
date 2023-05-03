import fetchWorkouts from "./fetchWorkouts.js";
export default async function renderWorkouts(map, workouts) {
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
		for (let index = 0; index < workouts.length; index++) {
			renderWorkoutMaker(workouts[index].coordinates, workouts[index].description)
			renderWorkoutList(workouts[index]);
			// const workoutDOMElement = renderWorkoutList(workouts[index]);
			// form.appendChild(workoutDOMElement);
		}
	 }

	 /**
	  * Renders workout on the map as a marker using Mapbox
	  * 
	  * @param {array} coordinates - coordinates from when the user clicked on the map to create a new workout.
	  * @param {string} description - description of the workout.
	  */
	 function renderWorkoutMaker(coordinates, description) {
		 //Creates popup
		 const popup = new mapboxgl.Popup({closeOnClick: false})
		 .setText(description)
		 .setLngLat(coordinates)
		 .addClassName('running-popup');
 
		 //Adds the marker
		 const marker = new mapboxgl.Marker({ color: 'var(--primary-color)'})
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
	 function renderWorkoutList(workout) {
		 //SKRIV	i OM!!!!
		 let html = `
		 <li class="workout workout--${workout.type}" data-id="${(workout._id || workout.id)}">
			 <h2 class="workout__title">${workout.description}</h2>
			 <button class="workout__delete-button"><img src="./_app/assets/icons/delete.png" alt="Delete workout"></button>
			 <div class="workout__details">
				 <span class="workout__icon">${
				 workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
				 }</span>
				 <span class="workout__value">${workout.distance}</span>
				 <span class="workout__unit">km</span>
			 </div>
			 <div class="workout__details">
				 <span class="workout__icon">⏱</span>
				 <span class="workout__value">${workout.duration}</span>
				 <span class="workout__unit">min</span>
			 </div>
		 `;
 
		 if (workout.type === 'running')
		 html += `
			 <div class="workout__details">
				 <span class="workout__icon">⚡️</span>
				 <span class="workout__value">${workout.pace.toFixed(1)}</span>

				 <span class="workout__unit">min/km</span>
			 </div>
			 <div class="workout__details">
				 <span class="workout__icon">🦶🏼</span>
				 <span class="workout__value">${workout.cadence}</span>
				 <span class="workout__unit">spm</span>
			 </div>
		 </li>
		 `;
 
		 if (workout.type === 'cycling')
		 html += `
			 <div class="workout__details">
				 <span class="workout__icon">⚡️</span>
				 <span class="workout__value">${workout.speed}</span>
				 <span class="workout__unit">km/h</span>
			 </div>
			 <div class="workout__details">
				 <span class="workout__icon">⛰</span>
				 <span class="workout__value">${workout.elevGain}</span>
				 <span class="workout__unit">m</span>
			 </div>
		 </li>
		 `;
 
		 form.insertAdjacentHTML('afterend', html);
	 }
}