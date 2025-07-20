import { DataTypes } from 'sequelize';
import sequelize from '../utils/db.js';

const RentalBike = sequelize.define('RentalBike', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  rental_id: { type: DataTypes.INTEGER, allowNull: false },
  bike_id: { type: DataTypes.INTEGER, allowNull: false },

  is_helmet: { type: DataTypes.BOOLEAN, defaultValue: false },
  is_torch: { type: DataTypes.BOOLEAN, defaultValue: false },
  is_lock: { type: DataTypes.BOOLEAN, defaultValue: false },
}, {
  tableName: 'rental_bikes',
  timestamps: false,
});

export default RentalBike;
