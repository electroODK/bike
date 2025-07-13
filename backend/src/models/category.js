
import { DataTypes } from 'sequelize';
import sequelize from '../utils/db.js';

const Category = sequelize.define('Category', {
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
  tableName: 'categories',
  timestamps: true,
});

export default Category;
