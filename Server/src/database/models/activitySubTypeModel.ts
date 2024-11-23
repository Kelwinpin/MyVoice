import { DataTypes, Model } from "sequelize";
import IActivityType from "../../interfaces/IActivityType.js";
import db from "../config/database.js";
import ActivityTypeModel from "./activityTypeModel.js";

class ActivitySubTypeModel extends Model implements IActivityType {
    id!: number;
    name!: string;
    activityTypeId!: number;
}

ActivitySubTypeModel.init({
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
    activityTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "activity_type_id",
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: db,
    modelName: "activitySubType",
    tableName: "activity_sub_type",
    timestamps: false,
});

ActivitySubTypeModel.belongsTo(ActivityTypeModel, {
    foreignKey: "activityTypeId",
    as: "activityType",
});


export default ActivitySubTypeModel;