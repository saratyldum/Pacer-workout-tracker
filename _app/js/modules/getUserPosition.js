import loadMap from "./loadMap.js";

export default function getUserPosition() {
	if(navigator.geolocation)
		navigator.geolocation.getCurrentPosition(handleGeolocationSucess, errorPosition)

	function handleGeolocationSucess(position) {
		loadMap(position)
	}

	function errorPosition() {
		alert('Could not get your position')
	}
}