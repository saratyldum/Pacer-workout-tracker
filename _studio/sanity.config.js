import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';

import schemas from './schemas/schemas.js';
import workouts from './structure/workouts.js';

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
		visionTool()
	],

	schema: {
		types: schemas,
	},
};
