// models/user.model.js

import { DataTypes } from 'sequelize';
import sequelize from '../utils/db.js';

const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  phone_number: { type: DataTypes.STRING, allowNull: false, unique: true },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  access_token: { type: DataTypes.TEXT },
  refresh_token: { type: DataTypes.TEXT },
  status: { type: DataTypes.ENUM('active', 'inactive'), defaultValue: 'active' },
  role: { type: DataTypes.ENUM('user', 'admin'), defaultValue: 'user' },
}, {
  tableName: 'users',
  timestamps: true,
});

export default User;
