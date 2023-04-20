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



}