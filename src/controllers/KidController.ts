import KidModel from "../database/models/kidModel";

class KidController {
  getAllKids(res: any, req: any) {
    const kids = KidModel.findAll();
    return res.status(200).json(kids);
  }
}

export default new KidController();