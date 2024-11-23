import KidModel from "../database/models/kidModel.js";
import ParentsModel from "../database/models/parentsModel.js";

class KidController {
    getKids = async (req: any, res: any) => {
        await KidModel.findAll({
            attributes: {
                exclude: ["createdAt", "updatedAt", "parentId"],
            },
            include: [{
                model: ParentsModel,
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
                as: "parent",
            }],
        }).then((kids) => {
            return res.status(200).json(kids);
        }).catch((err) => {
            return res.status(500).json(err);
        });
    }

    getKid = async (req: any, res: any) => {
        await KidModel.findOne({
            where: {
                id: req.params.id,
            },
            attributes: {
                exclude: ["createdAt", "updatedAt", "parentId"],
            },
            include: [{
                model: ParentsModel,
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
                as: "parent",
            }],
        }).then((kid) => {
            return res.status(200).json(kid);
        }).catch((err) => {
            return res.status(500).json(err);
        });
    }

    getKidByParent = async (req: any, res: any) => {
        await KidModel.findAll({
            where: {
                parentId: req.params.parentId,
            },
        }).then((kids) => {
            return res.status(200).json(kids);
        }).catch((err) => {
            return res.status(500).json(err);
        });
    }

    createKid = async (req: any, res: any) => {        
        await KidModel.create({...req.body, createdAt: new Date()}).then((kid) => {
            return res.status(201).json(kid);
        }).catch((err) => {
            return res.status(500).json(err);
        });
    }

    updateKid = async (req: any, res: any) => {
        await KidModel.update(req.body, {
            where: {
                id: req.params.id,
            },
        }).then((kid) => {
            return res.status(200).json(kid);
        }).catch((err) => {
            return res.status(500).json(err);
        });
    }
}

export default new KidController();