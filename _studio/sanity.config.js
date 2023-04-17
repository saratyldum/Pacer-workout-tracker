import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';

import schemas from './schemas/schemas.js';
import settings from './structure/settings.js';
import blog from './structure/blog.js';

export default {
	title: 'Studio',

	projectId: '',
	dataset: '',

	plugins: [
		deskTool({
			title: '',
			name: ''
		}), 
		deskTool({
			title: 'Settings',
			name: 'settings',
			structure: settings
		}), 
		visionTool()
	],

	schema: {
		types: schemas,
	},
};
