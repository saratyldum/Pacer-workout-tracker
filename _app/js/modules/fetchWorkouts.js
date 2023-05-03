import { sanity } from "../sanity.js";

	/**
	 * 	/// THIS FETCH METHOD CODE IS BORROWED FROM ALEJANDRO ROJAS ///
	 * 
	 * 	Baseic usage: The sanity fetch method works by passing a query, using the same structure as the documentation
	 * 	and fetching the result from Sanity. 
	 */
export default async function fetchWorkouts() {
	let workouts; 
	try {
		const query = `*[_type == 'workout'] {
			_id,
			coordinates,
			date,
			description,
			distance,
			duration,
			elevGain,
			cadence,
			pace,
			speed,
			type,
		}`
		
		const workouts = await sanity.fetch(query);
		return workouts
	} catch(error) {
		console.error(error.message);
	}

	return workouts;
}