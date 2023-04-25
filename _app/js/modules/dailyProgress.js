export default function dailyProgress() {
	/**
	 * @TODO take distance for each day and add together to find what is 100% and change bar size based on daily distance relative to total. Differentiate between running and cycling. 
	 * @TODO reset every week
	 * @TODO fetch info from sanity
	 */
	const tabButtons = document.querySelectorAll('.daily-activities-tab-button');
	const tabContents = document.querySelectorAll('.daily-activities__tab-content');

	tabButtons.forEach(tabButton => {
		tabButton.addEventListener('click', handleTabButtonClick)
	})

	function handleTabButtonClick(tabButton) {
		tabButtons.forEach(tabButton => {
			tabButton.style.backgroundColor = 'var(--secondary-color-light)';
		})
		
		tabButton.currentTarget.style.backgroundColor = 'inherit';
	}

}