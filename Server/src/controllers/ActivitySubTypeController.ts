import ActivitySubTypeModel from "../database/models/activitySubTypeModel.js";
import ActivityTypeModel from "../database/models/activityTypeModel.js";

class ActivitySubTypeController {
  getAll = async (req: any, res: any) => {
    const activitySubTypes = await ActivitySubTypeModel.findAll();
    res.status(200).json(activitySubTypes);
  };

  getById = async (req: any, res: any) => {
    const activitySubType = await ActivitySubTypeModel.findByPk(req.params.id);
    res.status(200).json(activitySubType);
  };

  getByActivityTypeId = async (req: any, res: any) => {
    const activitySubType = await ActivitySubTypeModel.findAll({
      where: {
        activityTypeId: req.params.id,
      },
      include: [
        {
          model: ActivityTypeModel,
          as: "activityType",
        },
      ],
    });
    res.status(200).json(activitySubType);
  };
}

export default new ActivitySubTypeController();