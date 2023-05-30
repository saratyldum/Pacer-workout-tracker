import { sanity } from "../sanity.js";
import handleError from "./handleError.js";

/**
 * Fetches the user information and image from the Sanity Studio.
 * 
 * @see handleError.js module for error handling
 * @returns the user
 */
export default async function progressFetchUserInformation() {
	let user;
	
	try {
		const query = `*[_type == 'user'][0] {
			userName,
			'userImage': userImage.asset -> url
		}`;
		
		const user = await sanity.fetch(query);
		return user;
	} catch(error) {
		handleError(error.message);
	}

	return user;
}
