import { DataTypes, Model } from "sequelize";
import db from "../config/database.js";
import IKidActivity from "../../interfaces/IKidActivity.js";
import KidModel from "./kidModel.js";
import ActivitiesModel from "./activitiesModel.js";

class KidActivityModel extends Model implements IKidActivity {
    id!: number;
    kidId!: number;
    activityId!: number;
}

KidActivityModel.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    kidId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "kid_id",
    },
    activityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "activity_id",
    }
}, {
    sequelize: db,
    modelName: "kidActivity",
    tableName: "kid_activity",
    timestamps: false,
});

KidActivityModel.belongsTo(KidModel, {
    foreignKey: "kidId",
    targetKey: "id"
});

KidActivityModel.belongsTo(ActivitiesModel, {
    foreignKey: "activityId",
    targetKey: "id"
});

export default KidActivityModel;