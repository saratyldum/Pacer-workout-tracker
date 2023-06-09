import { sanity } from "../sanity.js";
import handleError from "./handleError.js";

/**
 * 	/// THIS FETCH METHOD CODE ARCHITECTURE  IS BORROWED FROM ALEJANDRO ROJAS ///
 * 
 * 	Basic usage: The sanity fetch method works by passing a query, using the same structure as the documentation
 * 	and fetching the result from Sanity. 
 * 
 * 	@see handleError.js module for error handling
 * 	@returns all workouts fetched from Sanity
 */
export default async function workoutsFetchWorkouts() {
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
		return workouts;
	} catch(error) {
		handleError(error.message);
	}
	return workouts;
}