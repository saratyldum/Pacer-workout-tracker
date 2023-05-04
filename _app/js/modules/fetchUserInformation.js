import { sanity } from "../sanity.js";

export default async function fetchUserInformation() {

	try {
		const query = `*[_type == 'user'][0] {
			userName,
			'userImage': userImage.asset -> url
		}`
		
		const user = await sanity.fetch(query);
		return user
	} catch(error) {
		console.error(error.message);
	}

	return user;

}
