import { DataTypes } from 'sequelize';
import sequelize from '../utils/db.js'; 

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  phone_number: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
  },
  rented_bike_ids: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: true,
    defaultValue: [],
  },
  access_token: {
    type: DataTypes.TEXT,
  },
  refresh_token: {
    type: DataTypes.TEXT,
  },
}, {
  tableName: 'users',
  timestamps: true,
});

export default User;
