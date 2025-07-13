
import { DataTypes } from 'sequelize';
import sequelize from '../utils/db.js';

const Material = sequelize.define('Material', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  information: {
    type: DataTypes.TEXT,
  },
}, {
  tableName: 'materials',
  timestamps: true,
});

export default Material;
