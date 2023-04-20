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
			const coordinates = [longitude, latitude]

			addFeatures(coordinates)
		}

		function addFeatures(coordinates) {
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