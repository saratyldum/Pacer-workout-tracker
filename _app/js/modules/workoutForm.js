export default function workoutForm() {

	const form = document.querySelector('.workout-form');
	const containerWorkouts = document.querySelector('.workouts');
	const inputType = document.querySelector('.workout-form__input--type');
	const inputDistance = document.querySelector('.workout-form__input--distance');
	const inputDuration = document.querySelector('.workout-form__input--duration');
	const inputCadence = document.querySelector('.workout-form__input--cadence');
	const inputElevation = document.querySelector('.workout-form__input--elevation');

	let type;
	let coordinates; // [long, lat]
	let distance; // in km
	let duration; // in min

	inputType.addEventListener('change', handleInputTypeChange);
	

	function handleInputTypeChange() {
		toggleElevationField();
	}

	function toggleElevationField() {
		inputElevation.closest('.workout-form__row').classList.toggle('workout-form__row--hidden');
		inputCadence.closest('.workout-form__row').classList.toggle('workout-form__row--hidden');
	}

	function workouts(coordinates, distance, duration) {
		date = new Date();
		id = (Date.now() + '').slice(-10);
	}

	function setDescription() {
		const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


	}

	function runningWorkout(coordinates, distance, duration, cadence) {
		// const cadence = inputCadence.value;
		const pace = calculatePace(duration, distance);
	}

	function cyclingWorkout(coordinates, distance, duration, elevation) {
		// const elevation = inputElevation.value;
		const speed = calculateSpeed(distance, duration)
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

}