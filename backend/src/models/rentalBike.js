import { DataTypes } from 'sequelize';
import sequelize from '../utils/db.js';

const RentalBike = sequelize.define('RentalBike', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  rental_id: { type: DataTypes.INTEGER, allowNull: false },
  bike_id: { type: DataTypes.INTEGER, allowNull: false },
}, {
  tableName: 'rental_bikes',
  timestamps: false,
});

export default RentalBike;
