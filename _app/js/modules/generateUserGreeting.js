export default function generateUserGreeting(userInfo) {
	console.log(userInfo);
	const userContainer = document.querySelector('.user');

	console.log(userContainer);

	function formatUserName(userInfo) {
		const userName = userInfo.userName;
		const userNameArray = userName.split(' ');
		const firstName = userNameArray[0];

		return firstName;
	}

	const userImage = document.createElement('img');
	const userMessage = document.createElement('div');

	userImage.classList = 'user__image';
	userImage.setAttribute('src', userInfo.userImage);
	userImage.setAttribute('alt', 'User Profile Image');

	userMessage.classList = 'user__message';
	userMessage.innerHTML = `Hello, <strong>${userInfo.userName}</strong>`;

	userContainer.append(userImage, userMessage)
}