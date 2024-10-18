import KidController from "../controllers/KidController.js";
import express from "express";
const { getAllKids } = KidController;
const kidRoutes = express();
kidRoutes.use(express.json());
kidRoutes.get('/', getAllKids);
export default kidRoutes;
