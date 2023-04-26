import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';

import schemas from './schemas/schemas.js';
import workouts from './structure/workouts.js';
import settings from './structure/settings.js';

export default {
	title: 'Pacer',

	projectId: 'qtf22vsb',
	dataset: 'production',

	plugins: [ 
		deskTool({
			title: 'Workouts',
			name: 'workouts',
			structure: workouts
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
