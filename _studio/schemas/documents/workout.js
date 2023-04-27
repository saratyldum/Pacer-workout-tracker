export default {
	title: 'Workout',
	name: 'workout',
	type: 'document',
	fields: [
		{
			title: 'Coordinates',
			name: 'coordinates',
			description: 'long and long',
			type: 'array',
			of: [{ type : 'number' }]
		},
		{
			title: 'Date',
			name: 'date',
			type: 'datetime',
		},
		{
			title: 'Description',
			name: 'description',
			type: 'string',
		},
		{
			title: 'Distance',
			name: 'distance',
			description: 'In km',
			type: 'number',
		},
		{
			title: 'Duration',
			name: 'duration',
			description: 'In minutes',
			type: 'number',
		},
		{
			title: 'Type',
			name: 'type',
			type: 'string',
		},
		{
			title: 'Elevation gain',
			name: 'elevGain',
			type: 'number',
		},
		{
			title: 'Cadence',
			name: 'cadence',
			description: 'step/min',
			type: 'number',
		},
		{
			title: 'Pace',
			name: 'pace',
			type: 'number',
		},
		{
			title: 'Speed',
			name: 'speed',
			type: 'number',
		}

	]
}