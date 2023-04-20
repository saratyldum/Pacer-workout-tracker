export default function mapbox(userCoordinates) {
	const form = document.querySelector('.workout-form');
	const containerWorkouts = document.querySelector('.workouts');
	const inputType = document.querySelector('.workout-form__input--type');
	const inputDistance = document.querySelector('.workout-form__input--distance');
	const inputDuration = document.querySelector('.workout-form__input--duration');
	const inputCadence = document.querySelector('.workout-form__input--cadence');
	const inputElevation = document.querySelector('.workout-form__input--elevation');

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
		mapEvent = event;
		form.classList.remove('hidden');
		inputDistance.focus();
	}


	function handleFormSubmit(event) {
		event.preventDefault();
		const latitude = mapEvent.lngLat.lat;
		const longitude = mapEvent.lngLat.lng;
		const coordinates = [longitude, latitude]

		const popup = new mapboxgl.Popup({closeOnClick: false})
		.setText('workout')
		.setLngLat(coordinates)
		.addClassName('running-popup');

		const marker = new mapboxgl.Marker({ color: 'var(--primary-color)'})
		.setLngLat(coordinates)
		.setPopup(popup)
		.addTo(map)
	}

		
}