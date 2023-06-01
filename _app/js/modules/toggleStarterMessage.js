/**
 * Shows a message if there are no workouts to be rendered to let the user know how to get started
 * with tracking their workouts. This is a separate module because it needs to be used in different cicumstances.
 * 
 * @param {boolean} state true or false depending if there are workouts to be rendered or not
 */
export default function toggleStarterMessage(state) {
	const starterMessageContainer = document.querySelector('.addWorkoutMessage');
	const starterMessageVisible = state;

	starterMessageVisible === true ? starterMessageContainer.style.display = 'block' : starterMessageContainer.style.display = 'none';
}