/**
 * Creates a message greeting the user using the information about the user existing in Sanity.
 * 
 * @param {object} userInfo The user info fetched from Sanity Studio
 */
export default function progressGenerateUserGreeting(userInfo) {
	const userContainer = document.querySelector('.user');

	/**
	 * Renders at least once after loading the module for the first time.
	 * 
	 * @see renderHTML()
	 */
	renderHTML()

	function formatUserName(userInfo) {
		const userName = userInfo.userName;
		const userNameArray = userName.split(' ');
		const firstName = userNameArray[0];

		return firstName;
	}

	function createUserDOMElement(firstName) {
		const userImage = document.createElement('img');
		const userMessage = document.createElement('div');
	
		userImage.classList = 'user__image';
		userImage.setAttribute('src', userInfo.userImage);
		userImage.setAttribute('alt', 'User Profile Image');
	
		userMessage.classList = 'user__message';
		userMessage.innerHTML = `Hello, <strong>${firstName}</strong>`;

		return [userImage, userMessage]
	
	}

	function renderHTML() {
		const firstName = formatUserName(userInfo);
		const [userImage, userMessage] = createUserDOMElement(firstName);

		userContainer.append(userImage, userMessage)
	}
}