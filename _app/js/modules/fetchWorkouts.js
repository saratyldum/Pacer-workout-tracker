import { sanity } from "../sanity.js";

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