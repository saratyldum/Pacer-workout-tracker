import { sanityMutate  } from "../sanity.js";
import updateUI from "./updateUI.js";
export default async function workoutForm(map) {

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

	function handleInputTypeChange() {
		toggleElevationField();
	}

	function handleMapClick(event) {
		showWorkoutForm(event);
	}

	async function handleFormSubmit(event) {
		const workout = createNewWorkoutObject(event);
		await sendWorkoutToSanity(workout);

		hideWorkoutForm();
		await updateUI(map, workout);
	}

	function toggleElevationField() {
		inputElevation.closest('.workout-form__row').classList.toggle('workout-form__row--hidden');
		inputCadence.closest('.workout-form__row').classList.toggle('workout-form__row--hidden');
	}

	function showWorkoutForm(event) {
		mapEvent = event;
		form.classList.remove('hidden');
		inputDistance.focus();
	}

	function createNewWorkoutObject(event) {
		event.preventDefault();

		//helping functions
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
				return alert('Input have to be positive number'); //fiks bedre error meldinger

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
				return alert('Input have to be positive number'); //fiks bedre error meldinger
			
			const workout = createCyclingWorkoutObject(coordinates, distance, duration, elevGain, date, id);
			return workout;
		}
	}

	function setWorkoutDescription(type, date) {
		const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

		const description = `${type[0].toUpperCase()}${type.slice(1)} on ${
			months[date.getMonth()]
		 } ${date.getDate()}`;

		 return description;
	}

	function createRunningWorkoutObject(coordinates, distance, duration, cadence, date, id) {
		const type = 'running';
		const pace = calculatePace(duration, distance);
		const description = setWorkoutDescription(type, date);
		const running = {description, pace, coordinates, distance, duration, cadence, date, id, type};
		return running;
	}

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

	function hideWorkoutForm() {
		//Clear input fields
		inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';

		form.style.display = 'none';
		form.classList.add('hidden');
		setTimeout(() => (form.style.display = 'grid'), 1000);
	}

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
			console.error(error.message);
		}
	}
}