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
	renderHTML();

	/**
	 * Formats the user info into only being the first name 
	 * @param {object} userInfo - the user object from Sanity
	 * @returns users first name
	 */
	function formatUserName(userInfo) {
		const userName = userInfo.userName;
		const userNameArray = userName.split(' ');
		const firstName = userNameArray[0];

		return firstName;
	}

	/**
	 * Creates the user greeting DOMelement
	 * @param {string} firstName 
	 * @returns user image and the user message to be displayed
	 */
	function createUserDOMElement(firstName) {
		const userImage = document.createElement('img');
		const userMessage = document.createElement('div');
	
		userImage.classList = 'user__image';
		userImage.setAttribute('src', userInfo.userImage);
		userImage.setAttribute('alt', 'User Profile Image');
	
		userMessage.classList = 'user__message';
		userMessage.innerHTML = `Hello, <strong>${firstName}</strong>`;

		return [userImage, userMessage];
	
	}

	/**
	 * Renders the user greeting on the site
	 */
	function renderHTML() {
		const firstName = formatUserName(userInfo);
		const [userImage, userMessage] = createUserDOMElement(firstName);

		userContainer.append(userImage, userMessage);
	}
}