import express from "express";
import KidController from "../controllers/KidController.js";

const kidsRoute = express();

kidsRoute.use(express.json());

kidsRoute.get('/', KidController.getKids);
kidsRoute.get('/:id', KidController.getKid);
kidsRoute.post('/', KidController.createKid);
kidsRoute.put('/:id', KidController.updateKid);

export default kidsRoute;