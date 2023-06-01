/**
 * This function creats a map using Mapbox and centers it on the users coordinates. 
 * These coordinates comes from the Geolocation API of the computer.
 * 
 * @param {object} position the location data from the browsers Geolocator API.
 * @returns the map centered on the users location.
 */
export default function mapLoadMap(position) {
	const {latitude, longitude} = position.coords;
	const userCoordinates = [longitude, latitude];
	let map;

	/**
	 * Please note:
	 * 	I am very aware of the fact that I am exposing my token, allowing anyone to use it.
	 * 	This is a problem when it comes to frontend projects and it' only implemented like this 
	 *		in this final project for the sake of simplicity. In a real world project this is not how i would have
	 * 	proceeded.
	 */
	mapboxgl.accessToken = 'pk.eyJ1IjoidHlsc2EiLCJhIjoiY2xnbmppcndqMDBzazNkcGVld2gxcmVqMyJ9.y_xYrcqqEf_CD9mfOzHghg	';
	
	map = new mapboxgl.Map({
	container: 'map', // container ID
	style: 'mapbox://styles/mapbox/streets-v12',
	center: userCoordinates, // starting position [lng, lat]
	zoom: 12, // starting zoom
	});

	return map;
}