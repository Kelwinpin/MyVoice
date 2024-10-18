import KidModel from "../database/models/kidModel.js";
class KidController {
    getAllKids(res, req) {
        const kids = KidModel.findAll();
        return res.status(200).json(kids);
    }
}
export default new KidController();
