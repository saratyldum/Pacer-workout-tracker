//Alt det kun er 1 av på siden
export default {
	title: 'Settings',
	name: 'settings',
	type: 'document',
	fields: [
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