import { DataTypes } from 'sequelize';
import sequelize from '../utils/db.js';

const Rental = sequelize.define('Rental', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },

  start_station_id: { type: DataTypes.INTEGER, allowNull: false },
  end_station_id: { type: DataTypes.INTEGER, allowNull: true }, 
  start_date: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  end_date: { type: DataTypes.DATE, allowNull: true },

  price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },

  status: {
    type: DataTypes.ENUM('active', 'finished', 'cancelled'),
    defaultValue: 'active'
  },
}, {
  tableName: 'rentals',
  timestamps: true,
});

export default Rental;
