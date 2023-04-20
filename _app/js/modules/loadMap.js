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


	let map, mapEvent, description;
	let workouts = [];

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

		//helping functions
		const isValidInputs = (...inputs) => inputs.every(input => Number.isFinite(input)); //les mer om isFinite
		const allPositive = (...inputs) => inputs.every(input => input > 0);

		//Get data from form 
		const type = inputType.value;
		const distance = +inputDistance.value; //+ converts String to Number
		const duration = +inputDuration.value;
		const latitude = mapEvent.lngLat.lat;
		const longitude = mapEvent.lngLat.lng;
		const coordinates = [longitude, latitude]
		const date = new Date();
		const id = (Date.now() + '').slice(-10);
		
		//If activity is running, create running object
		if (type === 'running') {
			const cadence = +inputCadence.value;
			//Check if data is valid
			if (
				!isValidInputs(distance, duration, cadence) || 
				!allPositive(distance, duration, cadence)
			) 
				return alert('Input have to be positive number'); //fiks bedre error meldinger

			const workout = runningWorkout(coordinates, distance, duration, cadence, date, id)
			// workouts.push(workout);
			renderHTML(workout)
			// renderWorkoutMaker(coordinates, description);
			// renderWorkoutList(workout);
			// hideWorkoutForm();

		}

		//If activity is cycling, create cycling object
		if (type === 'cycling') {
			const elevation = +inputElevation.value;
			//Check if data is valid
			if (
				!isValidInputs(distance, duration, elevation) ||
				!allPositive(distance, duration)
			) 
				return alert('Input have to be positive number'); //fiks bedre error meldinger
			
			const workout = cyclingWorkout(coordinates, distance, duration, elevation, date, id)
			workouts.push(workout);
			renderHTML(workout);
			// renderWorkoutMaker(coordinates, description)
			// renderWorkoutList(workout);
			// hideWorkoutForm();
		}
	}

	// Render workout on map as a marker
	function renderWorkoutMaker(coordinates, description) {
		//Create popup
		const popup = new mapboxgl.Popup({closeOnClick: false})
		.setText(description)
		.setLngLat(coordinates)
		.addClassName('running-popup');

		//Add marker
		const marker = new mapboxgl.Marker({ color: 'var(--primary-color)'})
		.setLngLat(coordinates)
		.setPopup(popup)
		.addTo(map)
	}

	//Render wokrout in list
	function renderWorkoutList(workout) {
		//SKRIV OM!!!!
		console.log(workout);
		let html = `
		<li class="workout workout--${workout.type}" data-id="${workout.id}">
			<h2 class="workout__title">${workout.description}</h2>
			<div class="workout__details">
				<span class="workout__icon">${
				workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
				}</span>
				<span class="workout__value">${workout.distance}</span>
				<span class="workout__unit">km</span>
			</div>
			<div class="workout__details">
				<span class="workout__icon">⏱</span>
				<span class="workout__value">${workout.duration}</span>
				<span class="workout__unit">min</span>
			</div>
		`;

		if (workout.type === 'running')
		html += `
			<div class="workout__details">
				<span class="workout__icon">⚡️</span>
				<span class="workout__value">${workout.pace.toFixed(1)}</span>
				<span class="workout__unit">min/km</span>
			</div>
			<div class="workout__details">
				<span class="workout__icon">🦶🏼</span>
				<span class="workout__value">${workout.cadence}</span>
				<span class="workout__unit">spm</span>
			</div>
		</li>
		`;

		if (workout.type === 'cycling')
		html += `
			<div class="workout__details">
				<span class="workout__icon">⚡️</span>
				<span class="workout__value">${workout.speed.toFixed(1)}</span>
				<span class="workout__unit">km/h</span>
			</div>
			<div class="workout__details">
				<span class="workout__icon">⛰</span>
				<span class="workout__value">${workout.elevationGain}</span>
				<span class="workout__unit">m</span>
			</div>
		</li>
		`;

		form.insertAdjacentHTML('afterend', html);
	}

	function setDescription(type, date) {
		const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

		const description = `${type[0].toUpperCase()}${type.slice(1)} on ${
			months[date.getMonth()]
		 } ${date.getDate()}`;

		 return description;
	}

	function runningWorkout(coordinates, distance, duration, cadence, date, id) {
		const type = 'running';
		const pace = calculatePace(duration, distance);
		description = setDescription(type, date);
		const running = {description, pace, coordinates, distance, duration, cadence, date, id, type};
		return running;

	}

	function cyclingWorkout(coordinates, distance, duration, elevation, date, id) {
		const type = 'cycling';
		const speed = calculateSpeed(distance, duration);
		description = setDescription(type, date);
		const cycling = {description, speed, coordinates, distance, duration, elevation, date, id, type};
		return cycling;
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

	function hideWorkoutForm() {
		//Clear input fields
		inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';

		form.style.display = 'none';
		form.classList.add('hidden');
		setTimeout(() => (form.style.display = 'grid'), 1000);
	}


	function renderHTML(workout) {
		renderWorkoutMaker(workout.coordinates, workout.description);
		renderWorkoutList(workout);
		hideWorkoutForm();
	}
}