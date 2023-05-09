export default function toggleStarterMessage(state) {
	const starterMessageContainer = document.querySelector('.addWorkoutMessage');
	const starterMessage = state;

	if(starterMessage === true) {
		starterMessageContainer.style.display = 'block'
	} else (
		starterMessageContainer.style.display = 'none'
	)
}