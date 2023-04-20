export default function loadMap(position) {
	const form = document.querySelector('.workout-form');
	const containerWorkouts = document.querySelector('.workouts');
	const inputType = document.querySelector('.workout-form__input--type');
	const inputDistance = document.querySelector('.workout-form__input--distance');
	const inputDuration = document.querySelector('.workout-form__input--duration');
	const inputCadence = document.querySelector('.workout-form__input--cadence');
	const inputElevation = document.querySelector('.workout-form__input--elevation');

	const {latitude, longitude} = position.coords;
	const userCoordinates = [longitude, latitude];


	let map, mapEvent;

	/**
	 * @TODO hide access token
	 */
	mapboxgl.accessToken = 'pk.eyJ1IjoidHlsc2EiLCJhIjoiY2xnbmppcndqMDBzazNkcGVld2gxcmVqMyJ9.y_xYrcqqEf_CD9mfOzHghg	';
	
	map = new mapboxgl.Map({
	container: 'map', // container ID
	style: 'mapbox://styles/mapbox/streets-v12', // style URL
	center: userCoordinates, // starting position [lng, lat]
	zoom: 13, // starting zoom
	});

	map.on('click', handleMapClick);
	form.addEventListener('submit', handleFormSubmit);


	function handleMapClick(event) {
		showWorkoutForm(event);
	}

	function handleFormSubmit(event) {
		newWorkout(event);
	}

	function showWorkoutForm(event) {
		mapEvent = event;
		form.classList.remove('hidden');
		inputDistance.focus();

	}

	function newWorkout(event) {
		event.preventDefault();

		const latitude = mapEvent.lngLat.lat;
		const longitude = mapEvent.lngLat.lng;
		const coordinates = [longitude, latitude]

		//Get data from form 

		//Check if data is valid

		//If activity is running, create running object

		//If activity is cycling, create cycling object

		//Add new object to workout array

		// Render workout on map as a marker
			//Create popup
			const popup = new mapboxgl.Popup({closeOnClick: false})
			.setText('workout')
			.setLngLat(coordinates)
			.addClassName('running-popup');
	
			//Add marker
			const marker = new mapboxgl.Marker({ color: 'var(--primary-color)'})
			.setLngLat(coordinates)
			.setPopup(popup)
			.addTo(map)

		//Render wokrout in list

		//Hide form + clear input fields

		//Clear input fields
		inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';

	}
		
}