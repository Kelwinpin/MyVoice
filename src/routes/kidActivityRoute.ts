import express from "express";
import KidActivityController from "../controllers/KidActivityController.js";

const kidActivityRoute = express();

kidActivityRoute.use(express.json());

kidActivityRoute.get('/', KidActivityController.getKidActivities);
kidActivityRoute.get('/:id', KidActivityController.getKidActivity);
kidActivityRoute.post('/', KidActivityController.createKidActivity);

export default kidActivityRoute;