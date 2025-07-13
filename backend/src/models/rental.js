// models/rental.model.js

import { DataTypes } from 'sequelize';
import sequelize from '../utils/db.js';

const Rental = sequelize.define(
  'Rental',
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    bike_id: { type: DataTypes.INTEGER, allowNull: false },
    start_date: { type: DataTypes.DATE, allowNull: false },
    end_date: { type: DataTypes.DATE, allowNull: false },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    status: { type: DataTypes.STRING, defaultValue: 'active' },
  },
  {
    tableName: 'rentals',
    timestamps: true,
  }
);

export default Rental;
