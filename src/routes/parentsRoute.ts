import express from "express";
import ParentsController from "../controllers/ParentsController.js";


const parentsRoute = express();

parentsRoute.use(express.json());

parentsRoute.get('/', ParentsController.getParents);
parentsRoute.get('/:id', ParentsController.getParent);
parentsRoute.post('/', ParentsController.createParent);
parentsRoute.put('/:id', ParentsController.updateParent);
parentsRoute.delete('/:id', ParentsController.deleteParent);

export default parentsRoute;