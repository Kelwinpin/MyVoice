import KidActivityModel from "../database/models/kidActivityModel.js";

class KidActivityController {
    getKidActivities = async (req: any, res: any) => {
        await KidActivityModel.findAll().then((kidActivities) => {
            return res.status(200).json(kidActivities);
        }).catch((err) => {
            return res.status(500).json(err);
        });
    }

    getKidActivity = async (req: any, res: any) => {
        await KidActivityModel.findByPk(req.params.id).then((kidActivity) => {
            return res.status(200).json(kidActivity);
        }).catch((err) => {
            return res.status(500).json(err);
        });
    }

    createKidActivity = async (req: any, res: any) => {
        await KidActivityModel.create({...req.body}).then((kidActivity) => {
            return res.status(201).json(kidActivity);
        }).catch((err) => {
            return res.status(500).json(err);
        });
    }
}

export default new KidActivityController();