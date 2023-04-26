//Alt det kun er 1 av på siden
export default {
	title: 'Settings',
	name: 'settings',
	type: 'document',
	fields: [
		{
			title: 'User Name',
			name: 'userName',
			type: 'string',
		},
		{
			title: 'User Image',
			name: 'userImage',
			type: 'image',
		},
		{
			title: 'Weekly goal',
			name: 'weeklyGoal',
			type: 'string',
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