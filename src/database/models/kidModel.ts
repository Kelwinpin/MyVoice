
import { Model, STRING, INTEGER } from 'sequelize';
import db from './index.js';

interface IKid {
  id: number;
  name: string;
  age: number;
  gender: string;
}

class KidModel extends Model implements IKid {
  id!: number;
  name!: string;
  age!: number;
  gender!: string;
}

KidModel.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: STRING,
      allowNull: false,
    },
    age: {
      type: INTEGER,
      allowNull: false,
    },
    gender: {
      type: STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'Kid',
  },
);

export type { IKid };
export default KidModel;
