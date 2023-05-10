/**
 * Shows a message if there are no workouts to be rendered to let the user know how to get started
 * with tracking their workouts.
 * 
 * @param {boolean} state true or false depending if there are workouts to be rendered or not
 */
export default function toggleStarterMessage(state) {
	const starterMessageContainer = document.querySelector('.addWorkoutMessage');
	const starterMessage = state;

	if(starterMessage === true) {
		starterMessageContainer.style.display = 'block'
	} else (
		starterMessageContainer.style.display = 'none'
	)
}