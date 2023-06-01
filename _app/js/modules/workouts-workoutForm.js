import { sanityMutate  } from "../sanity.js";
import { updateUI } from "../main.js";
import handleError from "./handleError.js";
import toggleStarterMessage from "./toggleStarterMessage.js";

/**
 * Shows the workout form whenever the user clicks on the map and creates new workout objects when user submits
 * form with workout data. The new workout object then gets sent to Sanity.
 * 
 * @param {object} map - map object from MApbox
 */
export default async function workoutsWorkoutForm(map) {
	const form = document.querySelector('.workout-form');
	const inputType = document.querySelector('.workout-form__input--type');
	const inputDistance = document.querySelector('.workout-form__input--distance');
	const inputDuration = document.querySelector('.workout-form__input--duration');
	const inputCadence = document.querySelector('.workout-form__input--cadence');
	const inputElevation = document.querySelector('.workout-form__input--elevation');
	let mapEvent;

	inputType.addEventListener('change', handleInputTypeChange);
	map.on('click', handleMapClick);
	form.addEventListener('submit', handleFormSubmit);

	function handleInputTypeChange(event) {
		renderHTML(event);
	}

	/**
	 * Saves the click event in the global mapEvent variable so the that we can access the coordinates data
	 * when creating a new workout object after a workout form is submitted. Also renders html to show the workout form.
	 * 
	 * @param {object} event the click event from when user clicks the map
	 * @see createNewWorkoutObject() - to see the use of the mapEvent
	 */
	function handleMapClick(event) {
		mapEvent = event;
		renderHTML(event);
	}

	/**
	 * When a workout form is submitted, a new workout object is created and sent to Sanity and the UI gets updated.
	 * @param {object} event the submit event
	 */
	async function handleFormSubmit(event) {
		event.preventDefault();
		const workout = createNewWorkoutObject();

		//sends workout to Sanity
		if (workout !== undefined) await sendWorkoutToSanity(workout);
		// renders workout form html
		renderHTML(event);
		// runs most modules to update the rest of the UI with the newly added workout
		await updateUI(map, workout);
	}

	/**
	 * Checks what event has occured and renders the html accordingly.
	 * @param {object} event 
	 */
	function renderHTML(event) {
		//Toggles between the Cadence and Elevation Gain input fields depending on what the user has chosen.
		if (event.type === 'change') {
			inputElevation.closest('.workout-form__row').classList.toggle('workout-form__row--hidden');
			inputCadence.closest('.workout-form__row').classList.toggle('workout-form__row--hidden');
		} else if (event.type === 'click') {
			//Removes starter message if it is visible
			toggleStarterMessage(false);

			// Shows the workout form when the user clicks on the map
			form.classList.remove('hidden');
			inputDistance.focus();
		} else if (event.type === 'submit') {
			//Clear input fields
			inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';

			//Hide workout form
			form.style.display = 'none';
			form.classList.add('hidden');
			setTimeout(() => (form.style.display = 'grid'), 1000);
		}
	}


	/**
	 * Creates a new workout object based on the users input in the form. There are separate functions creating a
	 * running object and a cycling object based on the activity chosen.
	 * 
	 * @see createRunningWorkoutObject()
	 * @see createCyclingWorkoutObject()
	 * @see handleError.js module for error handling
	 * 
	 * @returns the workout object
	 */
	function createNewWorkoutObject() {
		//helping functions to check that all inputs are valid
		const isValidInputs = (...inputs) => inputs.every(input => Number.isFinite(input)); //les mer om isFinite
		const allPositive = (...inputs) => inputs.every(input => input > 0);

		//Get data from form 
		const type = inputType.value;
		const distance = +inputDistance.value; //+ converts String to Number
		const duration = +inputDuration.value;
		const latitude = mapEvent.lngLat.lat;
		const longitude = mapEvent.lngLat.lng;
		const coordinates = [longitude, latitude]
		const date = new Date();
		const id = (Date.now() + '').slice(-10);
		
		//If activity is running, create running object
		if (type === 'running') {
			const cadence = +inputCadence.value;

			//Check if data is valid
			if (
				!isValidInputs(distance, duration, cadence) || 
				!allPositive(distance, duration, cadence)
			)
				return handleError('All inputs have to be positive numbers');	

			const workout = createRunningWorkoutObject(coordinates, distance, duration, cadence, date, id);
			return workout;
		}

		//If activity is cycling, create cycling object
		if (type === 'cycling') {
			const elevGain = +inputElevation.value;
			//Check if data is valid
			if (
				!isValidInputs(distance, duration, elevGain) ||
				!allPositive(distance, duration)
			) 
				return handleError('Distance and duration have to be positive numbers. Elevation Gain can be positive or negative.')
			
			const workout = createCyclingWorkoutObject(coordinates, distance, duration, elevGain, date, id);
			return workout;
		}
	}

	/**
	 * Creates a description for the workout that has been submitted.
	 * 
	 * @param {string} type 
	 * @param {object} date 
	 * @returns the workout decription string
	 */
	function setWorkoutDescription(type, date) {
		const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		const description = `${type[0].toUpperCase()}${type.slice(1)} on ${months[date.getMonth()]} ${date.getDate()}`;
		return description;
	}

	/**
	 * Creates a running object based on the input values gathered from the workout form 
	 * 
	 * @param {array} coordinates - an array of the coordinates from where on the map the user clicked
	 * @param {number} distance - the distance value
	 * @param {number} duration - duration value 
	 * @param {number} cadence - cadence vale
	 * @param {object} date - date value
	 * @param {string} id - id value
	 * 
	 * @returns running object
	 */
	function createRunningWorkoutObject(coordinates, distance, duration, cadence, date, id) {
		const type = 'running';
		const pace = calculatePace(duration, distance);
		const description = setWorkoutDescription(type, date);
		const running = {description, pace, coordinates, distance, duration, cadence, date, id, type};
		return running;
	}

		/**
	 * Creates a cycling object based on the input values gathered from the workout form 
	 * 
	 * @param {array} coordinates - an array of the coordinates from where on the map the user clicked
	 * @param {number} distance - the distance value
	 * @param {number} duration - duration value 
	 * @param {number} elevGain - elevation gain vale
	 * @param {object} date - date value
	 * @param {string} id - id value
	 * 
	 * @returns cycling object
	 */
	function createCyclingWorkoutObject(coordinates, distance, duration, elevGain, date, id) {
		const type = 'cycling';
		const speed = calculateSpeed(distance, duration);
		const description = setWorkoutDescription(type, date);
		const cycling = {description, speed, coordinates, distance, duration, elevGain, date, id, type};
		return cycling;
	}

	function calculatePace(duration, distance) {
		// min/km
		const pace = duration / distance;
		return pace;
	}

	function calculateSpeed(distance, duration) {
		// km/h
		const speed = distance / (duration / 60);
		return speed;
	}

	/**
	 * 	/// THE MUTATE METHODS CODE IS BORROWED FROM ALEJANDRO ROJAS ///
	 * 	The mutate method is written to work with the "mutate" endpoint
	 * 	from Sanity's HTTP API: 
	 * 	https://www.sanity.io/docs/http-mutations#afccc1b9ef78
	 * 
	 * 	Basic usage: pass an array of mutations (transactions), using
	 * 	the same example from the documentation:
	 * 
	 * 	const mutations = [
	 * 		{"createOrReplace": {
	 * 			"_id": "person-1",
	 * 			"_type": "person",
	 * 			"name": "John Appleseed"
	 * 		}},
	 * 		{"createOrReplace": {
	 * 			"_id": "person-2",
	 * 			"_type": "person",
	 * 			"name": "Carrie Anderton"
	 * 		}}
	 * 	]
	 * 
	 * 	You can also set the param "dryRun" to true to test the mutation.
	 * 	The client will return a copy of the affected document(s) *as if* 
	 * 	they were mutated, but without affecting the actual document(s) 
	 * 	stored in your dataset.
	 * 
	 * 	https://www.sanity.io/docs/http-mutations#952b77deb110
	 * 	https://www.sanity.io/docs/http-mutations#692cd4bdd9f7
	 * 
	 * 	const params = {
	 * 		returnIds: false;
	 * 		returnDocuments: false;
	 * 		dryRun: false;
	 * 	}
	 * 
	 * 	const result = await sanity.mutate(mutations, params);
	 * 
	 *  @see handleError.js module for error handling
	 */
	async function sendWorkoutToSanity(workout) {
		try {
			const mutations = [
				{
					'createOrReplace': {
						_type: 'workout',
						_id: workout.id,
						coordinates: workout.coordinates,
						date: workout.date,
						description: workout.description,
						distance: workout.distance,
						duration: workout.duration,
						type: workout.type,
						elevGain: workout.elevGain,
						cadence: workout.cadence,
						pace: workout.pace,
						speed: workout.speed
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