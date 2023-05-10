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

	showErrorMessage(errorMessage)

	closeButton.addEventListener('click', removeErrorMessage)

	function showErrorMessage(errorMessage) {
		errorContainer.style.display = 'flex';
		errorMessageContainer.textContent = errorMessage;
		header.classList.add('error');
		closeButton.focus();
	}

	function removeErrorMessage() {
		errorContainer.style.display = 'none';
		header.classList.remove('error')
	}

}