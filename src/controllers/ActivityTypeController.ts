import ActivityTypeModel from "../database/models/activityTypeModel.js";

class ActivityTypeController {
    getActivityTypes = async (req: any, res: any) => {
        await ActivityTypeModel.findAll().then((activityTypes) => {
            return res.status(200).json(activityTypes);
        }).catch((err) => {
            return res.status(500).json(err);
        });
    }

    getActivityType = async (req: any, res: any) => {
        await ActivityTypeModel.findByPk(req.params.id).then((activityType) => {
            return res.status(200).json(activityType);
        }).catch((err) => {
            return res.status(500).json(err);
        });
    }

    createActivityType = async (req: any, res: any) => {
        await ActivityTypeModel.create({...req.body, createdAt: new Date()}).then((activityType) => {
            return res.status(201).json(activityType);
        }).catch((err) => {
            return res.status(500).json(err);
        });
    }

    updateActivityType = async (req: any, res: any) => {
        await ActivityTypeModel.update(req.body, {
            where: {
                id: req.params.id,
            },
        }).then((activityType) => {
            return res.status(200).json(activityType);
        }).catch((err) => {
            return res.status(500).json(err);
        });
    }
}

export default new ActivityTypeController();