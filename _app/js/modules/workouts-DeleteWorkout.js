import { sanityMutate  } from "../sanity.js";
import handleError from "./handleError.js";
import updateUI from "./updateUI.js";

export default async function workoutsDeleteWorkout() {
	const deleteButtons = document.querySelectorAll('.workout__delete-button');

	deleteButtons.forEach(deleteButton => {
		deleteButton.addEventListener('click', handleDeleteButtonClick);
	})

	async function handleDeleteButtonClick(event) {
		const workoutElement = event.target.closest('.workout');
		const workoutID = workoutElement.dataset.id;

		await deleteWorkoutFromSanity(workoutID);
		renderHTML(workoutElement, workoutID)
		await updateUI();
	}

	/**
	 * Takes the workoutID of the workout element being deleted and removes the element from sanity. 
	 * The code architecture is borrowed from Alejandro Rojas.
	 * 
	 * @param {string} workoutID - the unique ID of the workout being deleted
	 * @see sendWorkoutToSanity() - under the workouts-workoutForm.js module for an explanation of the muatate function
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
	 * Removed the workout element from the list and its marker.
	 * 
	 * @param {object} workoutElement the workout object clicked
	 * @param {string} workoutID the ID of the workout element clicked
	 */
	function renderHTML(workoutElement, workoutID) {
		console.log(typeof workoutID);
		const marker = document.getElementById(workoutID);
		
		if(marker !== null) marker.remove();

		workoutElement.remove();
	}

}