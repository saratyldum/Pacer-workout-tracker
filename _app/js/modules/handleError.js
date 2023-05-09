export default function handleError(errorMessage) {
	const errorContainer = document.querySelector('.error-box');
	const errorMessageContainer = document.querySelector('.error-box__message');
	const closeButton = document.querySelector('.error-box__close-button')
	const header = document.querySelector('.header');

	showErrorMessage(errorMessage)

	closeButton.addEventListener('click', removeErrorMessage)

	function showErrorMessage(errorMessage) {
		console.log(errorContainer);
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