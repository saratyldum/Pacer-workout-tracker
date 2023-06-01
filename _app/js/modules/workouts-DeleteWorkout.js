import { sanityMutate  } from "../sanity.js";
import { updateUI } from "../main.js";
import handleError from "./handleError.js";

export default async function workoutsDeleteWorkout() {
	const deleteButtons = document.querySelectorAll('.workout__delete-button');

	deleteButtons.forEach(deleteButton => {
		deleteButton.addEventListener('click', handleDeleteButtonClick);
	})

	async function handleDeleteButtonClick(event) {
		const workoutElement = event.target.closest('.workout');
		const workoutID = workoutElement.dataset.id;

		// removes workout from Sanity
		await deleteWorkoutFromSanity(workoutID);
		// removes workout from list and from the map
		renderHTML(workoutElement, workoutID);
		// runs most modules to update the rest of the UI with the deleted workout
		await updateUI();
	}

	/**
	 * Takes the workoutID of the workout element being deleted and removes the element from sanity. 
	 * The code architecture is borrowed from Alejandro Rojas.
	 * 
	 * @param {string} workoutID - the unique ID of the workout being deleted
	 * @see sendWorkoutToSanity() - under the workouts-workoutForm.js module for an explanation of the muatate function
	 * @see handleError.js module for error handling
	 */
	async function deleteWorkoutFromSanity(workoutID) {
		try {
			const mutations = [
				{
					'delete': {
						id: workoutID,
					}
				}
			]

			const params = {
				dryRun: false
			}

			const result = await sanityMutate.mutate(mutations, params);

		} catch(error) {
			handleError(error.message)
		}
	}

	/**
	 * Removes the workout element from the list and its corresponding marker.
	 * 
	 * @param {object} workoutElement the workout object clicked
	 * @param {string} workoutID the ID of the workout element clicked
	 */
	function renderHTML(workoutElement, workoutID) {
		const marker = document.getElementById(workoutID);
		
		if(marker !== null) marker.remove();

		workoutElement.remove();
	}

}