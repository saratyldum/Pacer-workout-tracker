import { sanityMutate  } from "../sanity.js";
import updateUI from "./updateUI.js";

export default async function deleteWorkout() {
	const deleteButtons = document.querySelectorAll('.workout__delete-button');

	deleteButtons.forEach(deleteButton => {
		deleteButton.addEventListener('click', handleDeleteButtonClick);
	})

	async function handleDeleteButtonClick(event) {
		const workoutElement = event.target.closest('.workout');
		const workoutID = workoutElement.dataset.id;
		await deleteWorkoutFromSanity(workoutID);
		workoutElement.remove();
		await updateUI();
	}

	async function deleteWorkoutFromSanity(workoutID) {
		console.log(workoutID);
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
			console.error(error.message);
		}
	}
}