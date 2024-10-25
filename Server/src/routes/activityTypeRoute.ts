import express from "express";
import ActivityTypeController from "../controllers/ActivityTypeController.js";

const activitiesTypesRoute = express();

activitiesTypesRoute.use(express.json());

activitiesTypesRoute.get('/', ActivityTypeController.getActivityTypes);
activitiesTypesRoute.get('/:id', ActivityTypeController.getActivityType);
activitiesTypesRoute.post('/', ActivityTypeController.createActivityType);
activitiesTypesRoute.put('/:id', ActivityTypeController.updateActivityType);
activitiesTypesRoute.delete('/:id', ActivityTypeController.deleteActivityType);

export default activitiesTypesRoute;