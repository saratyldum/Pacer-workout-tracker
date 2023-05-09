import { sanity } from "../sanity.js";
import handleError from "./handleError.js";

export default async function progressFetchUserInformation() {
	let user;
	try {
		const query = `*[_type == 'user'][0] {
			userName,
			'userImage': userImage.asset -> url
		}`
		
		const user = await sanity.fetch(query);
		return user
	} catch(error) {
		handleError(error.message)
	}

	return user;
}
