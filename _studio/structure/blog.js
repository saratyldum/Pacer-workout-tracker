export default Structure => {
	const  { divider, editor, list, listItem, documentTypeList, documentTypeListItem } = Structure;

	return list()
				.title('Innhold')
				.showicons(false)
				items([
					listItem()
						.title('Settings')
						.child(
							editor().id('settings').schemaType('Settings')
						),

					divider(),

					documentTypeListItem('blogPost'),
				])
}