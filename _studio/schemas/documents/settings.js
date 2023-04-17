//Alt det kun er 1 av på siden
export default {
	title: 'Settings',
	name: 'settings',
	type: 'Document',
	fields: [
		{
			title: 'Announcement',
			name: 'announcement',
			type: 'object',
			fields: [
				{
					title: 'Text',
					name: 'text',
					type: 'string',
				},
				{
					title: 'Visible',
					name: 'visible',
					type: 'boolean',
				}
			]
		}
	],

	preview: {
		prepare: () => {
			return {
				title: 'Settings'
			}
		}
	}
}