import { DataTypes, Model } from "sequelize";
import IActivityType from "../../interfaces/IActivityType.js";
import db from "../config/database.js";
import ActivitiesModel from "./activitiesModel.js";

class ActivityTypeModel extends Model implements IActivityType {
    id!: number;
    name!: string;
}

ActivityTypeModel.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: db,
    modelName: "activityType",
    tableName: "activity_type",
    timestamps: false,
});


export default ActivityTypeModel;