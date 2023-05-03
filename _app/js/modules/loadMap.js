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

	let map;

	/**
	 * Please note:
	 * 	I am very aware of the fact that I am exposing my token, allowing anyone to use it.
	 * 	This is a problem when it comes to frontend projects and it' only implemented like this 
	 *		in this final project for the sake of simplicity.
	 * 
	 * @TODO hide access token
	 */
	mapboxgl.accessToken = 'pk.eyJ1IjoidHlsc2EiLCJhIjoiY2xnbmppcndqMDBzazNkcGVld2gxcmVqMyJ9.y_xYrcqqEf_CD9mfOzHghg	';
	
	/**
	 * Creates a map using Mapbox and centers it on the users coordinates. These coordinates comes from the
	 * Geolocation API of the computer.
	 * 
	 * Returns the map
	 * 
	 * @see main.js module
	 */
	map = new mapboxgl.Map({
	container: 'map', // container ID
	style: 'mapbox://styles/mapbox/streets-v12', // style URL
	center: userCoordinates, // starting position [lng, lat]
	zoom: 13, // starting zoom
	});

	return map;
}