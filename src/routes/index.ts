import express from 'express';
import kidsRoute from './kidsRoute.js';
import activitiesRoute from './activitiesRoute.js';
import parentsRoute from './parentsRoute.js';

const routes = express();

routes.use('/kids', kidsRoute);
routes.use('/parents', parentsRoute);
routes.use('/activities', activitiesRoute);

export default routes;