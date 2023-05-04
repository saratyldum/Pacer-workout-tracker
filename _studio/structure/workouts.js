export default Structure =>  {
	const { divider, editor, list, listItem, documentTypeListItem } = Structure;

	return list()
				.title('Pacer Content')
				.showIcons(false)
				.items([
					listItem()
					.title('Settings')
					.child(
						editor().id('settings').schemaType('settings')
					),
					listItem()
					.title('User')
					.child(
						editor().id('user').schemaType('user')
					),

					divider(),

					documentTypeListItem('workout'),
				])
}