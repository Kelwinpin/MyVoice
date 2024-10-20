import ActivitiesModel from "../database/models/activitiesModel.js";

class ActivitiesController {
    getActivities = async (req: any, res: any) => {
        await ActivitiesModel.findAll().then((activities) => {
            return res.status(200).json(activities);
        }).catch((err) => {
            return res.status(500).json(err);
        });
    }

    getActivityByType = async (req: any, res: any) => {
        await ActivitiesModel.findAll({
            where: {
                type: req.params.typeId,
            },
        }).then((activities) => {
            return res.status(200).json(activities);
        }).catch((err) => {
            return res.status(500).json(err);
        });
    }

    getActivity = async (req: any, res: any) => {
        await ActivitiesModel.findByPk(req.params.id).then((activity) => {
            return res.status(200).json(activity);
        }).catch((err) => {
            return res.status(500).json(err);
        });
    }

    createActivity = async (req: any, res: any) => {
        await ActivitiesModel.create({...req.body, createdAt: new Date()}).then((activity) => {
            return res.status(201).json(activity);
        }).catch((err) => {
            return res.status(500).json(err);
        });
    }

    updateActivity = async (req: any, res: any) => {
        await ActivitiesModel.update(req.body, {
            where: {
                id: req.params.id,
            },
        }).then((activity) => {
            return res.status(200).json(activity);
        }).catch((err) => {
            return res.status(500).json(err);
        });
    }
}


export default new ActivitiesController();