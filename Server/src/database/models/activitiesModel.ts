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
    subType!: number;
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
    subType: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "sub_type",
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

ActivitiesModel.belongsTo(ActivityTypeModel, {
    foreignKey: "subType",
    targetKey: "id"
});

export default ActivitiesModel;