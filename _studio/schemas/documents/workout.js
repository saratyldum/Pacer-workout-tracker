export default {
	title: 'Workout',
	name: 'workout',
	type: 'document',
	fields: [
		{
			title: 'id',
			name: 'id',
			type: 'number',
		},
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
			type: 'string',
		},
		{
			title: 'Duration',
			name: 'duration',
			description: 'In minutes',
			type: 'string',
		},
		{
			title: 'Type',
			name: 'type',
			type: 'reference',
			to: [{ type: 'activity' }]
		},
		{
			title: 'Elevation gain',
			name: 'elevGain',
			type: 'string',
		},
		{
			title: 'Cadence',
			name: 'cadence',
			description: 'step/min',
			type: 'string',
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