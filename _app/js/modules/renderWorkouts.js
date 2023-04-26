export default function renderWorkouts(map, workouts) {
	const form = document.querySelector('.workout-form');

	map = map;
	workouts = workouts;
	/**
	 * @TODO fetch workouts from sanity and place on map
	 * @TODO move workoutForm functions to separate module and save workouts in sanity. From sanity they will be loaded here and displayed on map
	 */ 
 
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
				 <span class="workout__value">${workout.speed}</span>
				 <span class="workout__unit">km/h</span>
			 </div>
			 <div class="workout__details">
				 <span class="workout__icon">⛰</span>
				 <span class="workout__value">${workout.elevGain}</span>
				 <span class="workout__unit">m</span>
			 </div>
		 </li>
		 `;
 
		 form.insertAdjacentHTML('afterend', html);
	 }

	 renderHTML(workouts)

	 function renderHTML(workouts) {
		for (let index = 0; index < workouts.length; index++) {
			renderWorkoutMaker(workouts[index].coordinates, workouts[index].description)
			renderWorkoutList(workouts[index]);
		}
	 }
 
}