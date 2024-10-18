import { Model, STRING, INTEGER } from 'sequelize';
import db from './index.js';
class KidModel extends Model {
}
KidModel.init({
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
}, {
    sequelize: db,
    modelName: 'Kid',
});
export default KidModel;
