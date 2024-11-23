import ParentsModel from "../database/models/parentsModel.js";

class ParentsController {
    getParents = async (req: any, res: any) => {
        await ParentsModel.findAll().then((parents) => {
            return res.status(200).json(parents);
        }).catch((err) => {
            return res.status(500).json(err);
        });
    }

    getParent = async (req: any, res: any) => {
        await ParentsModel.findByPk(req.params.id).then((parent) => {
            return res.status(200).json(parent);
        }).catch((err) => {
            return res.status(500).json(err);
        });
    }

    createParent = async (req: any, res: any) => {
        console.log(req.body);
        
        await ParentsModel.create({...req.body, createdAt: new Date()}).then((parent) => {
            return res.status(201).json(parent);
        }).catch((err) => {
            return res.status(500).json(err);
        });
    }

    updateParent = async (req: any, res: any) => {
        await ParentsModel.update(req.body, {
            where: {
                id: req.params.id,
            },
        }).then((parent) => {
            return res.status(200).json(parent);
        }).catch((err) => {
            return res.status(500).json(err);
        });
    }

    deleteParent = async (req: any, res: any) => {
        await ParentsModel.destroy({
            where: {
                id: req.params.id,
            },
        }).then((parent) => {
            return res.status(200).json(parent);
        }).catch((err) => {
            return res.status(500).json(err);
        });
    }
}

export default new ParentsController();