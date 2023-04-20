export default function mapbox(userCoordinates) {
	/**
	 * @TODO hide access token
	 */
	mapboxgl.accessToken = 'pk.eyJ1IjoidHlsc2EiLCJhIjoiY2xnbmppcndqMDBzazNkcGVld2gxcmVqMyJ9.y_xYrcqqEf_CD9mfOzHghg	';
	
	const map = new mapboxgl.Map({
		container: 'map', // container ID
		style: 'mapbox://styles/mapbox/streets-v12', // style URL
		center: userCoordinates, // starting position [lng, lat]
		zoom: 13, // starting zoom
		});

		map.on('click', handleMapClick);

		function handleMapClick(event) {
			const latitude = event.lngLat.lat;
			const longitude = event.lngLat.lng;
			const markerCoordinates = [longitude, latitude]

			addMarker(markerCoordinates)
		}

		function addMarker(markerCoordinates) {
			const marker2 = new mapboxgl.Marker({ color: 'var(--primary-color)'})
			.setLngLat(markerCoordinates)
			.addTo(map)
		}

}