export default Structure =>  {
	const { divider, editor, list, listItem, documentTypeListItem } = Structure;

	return list()
				.title('Workouts')
				.showIcons(false)
				.items([
					documentTypeListItem('workout'),
					documentTypeListItem('activity'),

					divider(),

					listItem()
					.title('Settings')
					.child(
						editor().id('settings').schemaType('settings')
					),
				])
}