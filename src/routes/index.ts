import express from 'express';
import kidsRoute from './kidsRoute.js';
import activitiesRoute from './activitiesRoute.js';
import parentsRoute from './parentsRoute.js';
import activitiesTypesRoute from './activityTypeRoute.js';
import kidActivityRoute from './kidActivityRoute.js';

const routes = express();

routes.use('/kids', kidsRoute);
routes.use('/parents', parentsRoute);
routes.use('/activities', activitiesRoute);
routes.use('/activityTypes', activitiesTypesRoute);
routes.use('/kidActivity', kidActivityRoute);

export default routes;