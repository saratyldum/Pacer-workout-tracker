/**
 * These functions displays an error message for the user when an error has occured and allows the 
 * user to remove the error message after they have read it. 
 * 
 * @param {string} errorMessage the error message to be displayed to the user
 */
export default function handleError(errorMessage) {
	const errorContainer = document.querySelector('.error-box');
	const errorMessageContainer = document.querySelector('.error-box__message');
	const closeButton = document.querySelector('.error-box__close-button')
	const header = document.querySelector('.header');
	const logo = document.querySelector('.logo');
	let isVisible = false;

	showErrorMessage(errorMessage)

	closeButton.addEventListener('click', removeErrorMessage)

	function showErrorMessage(errorMessage) {
		isVisible = true;
		renderHTMl(isVisible)
	}

	function removeErrorMessage() {
		isVisible = false;
		renderHTMl(isVisible)
	}

	function renderHTMl(isVisible) {
		if (isVisible) {
			errorContainer.style.display = 'flex';
			errorMessageContainer.textContent = errorMessage;
			header.classList.add('error');
			logo.style.display = "none";
			closeButton.focus();
		} else {
			errorContainer.style.display = 'none';
			header.classList.remove('error');
			logo.style.display = "block";
		}
	}

}