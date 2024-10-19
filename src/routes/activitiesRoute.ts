import express from "express";
import ActivitiesController from "../controllers/ActivitiesController.js";

const activitiesRoute = express();

activitiesRoute.use(express.json());

activitiesRoute.get('/', ActivitiesController.getActivities);
activitiesRoute.get('/:id', ActivitiesController.getActivity);
activitiesRoute.post('/', ActivitiesController.createActivity);
activitiesRoute.put('/:id', ActivitiesController.updateActivity);

export default activitiesRoute;