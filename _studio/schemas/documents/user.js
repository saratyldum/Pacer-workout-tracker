export default {
	title: 'User',
	name: 'user',
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
	],

	preview: {
		prepare: () => {
			return {
				title: 'User'
			}
		}
	}
}