import { DataTypes } from 'sequelize';
import sequelize from '../utils/db.js';

const Station = sequelize.define('Station', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  location: { type: DataTypes.STRING, allowNull: false },
  capacity: { type: DataTypes.INTEGER, defaultValue: 10 },
}, {
  tableName: 'stations',
  timestamps: true,
});

export default Station;
