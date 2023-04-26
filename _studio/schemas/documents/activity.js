export default {
	title: 'Activity',
	name: 'activity',
	type: 'document',
	fields: [
		{
			title: 'Type',
			name: 'type',
			type: 'string',
			options: {
				list: [
					{ title: 'Running', value: 'running' },
					{ title: 'Cycling', value: 'cycling' },
				]
			}
		}
	]
}