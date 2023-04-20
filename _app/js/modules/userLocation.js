import mapbox from "./mapbox.js";

export default function userLocation() {

	if(navigator.geolocation)
		navigator.geolocation.getCurrentPosition(handleGeolocationSucess, errorPosition)

	function handleGeolocationSucess(position) {
		const userCoordinates = showPosition(position);
		mapbox(userCoordinates)

	}
	function showPosition(position) {
		const {latitude, longitude} = position.coords;
		const userCoordinates = [longitude, latitude];

		return userCoordinates;
	}

	function errorPosition() {
		alert('Could not get your position')
	}
}