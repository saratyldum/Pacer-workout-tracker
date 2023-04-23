export default function weeklyProgress() {
	const progressBar = document.querySelector('.weekly-goal__progress');
	const goalInput = document.querySelector('.weekly-goal__input');
	let progress = 0;
	let finalValue = 10; //dette tallet må oppdateres når treninger addes
	let weeklyValue = 0;
	let progressPerecentage;

	goalInput.addEventListener('keyup', handleGoalInputKeyup);

	function handleGoalInputKeyup() {
		weeklyValue = parseInt(goalInput.value, 10);
		changeProgressBarWidth();
	}

	function calculateProgressPercentage() {
		progressPerecentage = (finalValue / weeklyValue) * 100;
		return progressPerecentage;
	}

	function changeProgressBarWidth() {
		const progressBarWidth = calculateProgressPercentage()
		progressBar.style.width = `${progressBarWidth}%`;
		console.log(progressBar);
	}
}