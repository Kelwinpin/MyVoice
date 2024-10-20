import { DataTypes, Model } from "sequelize";
import IActivity from "../../interfaces/IActivity.js";
import db from "../config/database.js";
import ActivityTypeModel from "./activityTypeModel.js";

class ActivitiesModel extends Model implements IActivity {
    id!: number;
    image!: string;
    type!: number;
    description!: string;
    sound!: string;
    createdAt!: Date;
}


ActivitiesModel.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    sound: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
  sequelize: db,
  modelName: "activities",
  tableName: "activities",
  timestamps: false,
  createdAt: "created_at",
});

ActivitiesModel.belongsTo(ActivityTypeModel, {
    foreignKey: "type",
    targetKey: "id"
});

export default ActivitiesModel;