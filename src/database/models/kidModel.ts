import { DataTypes, Model } from "sequelize";
import IKid from "../../interfaces/Ikid.js";
import db from "../config/database.js";
import ParentsModel from "./parentsModel.js";

class KidModel extends Model implements IKid {
    id!: number;
    parentId!: number;
    gender!: string;
    createdAt!: Date;
}

KidModel.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    parentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "parent_id",
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "created_at",
    }
}, {
    sequelize: db,
    modelName: "kid",
    tableName: "kid",
    timestamps: false,
});


KidModel.belongsTo(ParentsModel, {
    foreignKey: "parentId", // FK em 'kid'
    targetKey: "id", // Chave alvo em 'ParentsModel'
});


ParentsModel.hasMany(KidModel, {
    foreignKey: "parentId", // Mesma FK usada no 'KidModel'
});

export default KidModel;