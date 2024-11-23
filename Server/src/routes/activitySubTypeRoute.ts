import express from "express";
import ActivitySubTypeController from "../controllers/ActivitySubTypeController.js";

const router = express.Router();

router.get("/", ActivitySubTypeController.getAll);
router.get("/:id", ActivitySubTypeController.getById);
router.get("/activityType/:id", ActivitySubTypeController.getByActivityTypeId);

export default router;