import { DataTypes, Model } from "sequelize";
import { IParent } from "../../interfaces/IParent.js";
import db from "../config/database.js";

class ParentsModel extends Model implements IParent {
  id!: number;
  userName!: string;
  role!: string;
  createdAt!: Date;
}

ParentsModel.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "user_name",
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  sequelize: db,
  modelName: "parents",
  timestamps: false,
  createdAt: "created_at",
});

export default ParentsModel;
  