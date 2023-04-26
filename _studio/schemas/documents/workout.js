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
			type: 'array',
			of: [{ type : 'number' }]
		},
		{
			title: 'Date',
			name: 'date',
			type: 'dateTime',
		},
		{
			title: 'Description',
			name: 'description',
			type: 'string',
		},
		{
			title: 'Distance',
			name: 'distance',
			type: 'string',
		},
		{
			title: 'Duration',
			name: 'duration',
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
			type: 'string',
		}

	]
}